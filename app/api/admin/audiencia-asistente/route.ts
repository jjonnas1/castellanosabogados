import { NextRequest, NextResponse } from 'next/server';

type HearingMode = 'civil' | 'laboral' | 'familia' | 'penal' | 'administrativo';
type AlertLevel = 'urgente' | 'riesgo' | 'estrategia' | 'nota';

type Suggestion = {
  level: AlertLevel;
  title: string;
  say: string;
  reason: string;
};

const FALLBACK_RULES: Array<{
  level: AlertLevel;
  title: string;
  pattern: RegExp;
  say: string;
  reason: string;
}> = [
  {
    level: 'urgente',
    title: 'Decisión sobre prueba',
    pattern: /nieg[ao]|rechaz|inadmit|no decret/i,
    say: 'Solicite reposición y deje constancia de pertinencia, conducencia y utilidad.',
    reason: 'Cuando se niega una prueba, conviene reaccionar de inmediato para proteger el punto procesal.',
  },
  {
    level: 'riesgo',
    title: 'Admisión de hechos',
    pattern: /acepta|reconoce|confiesa|est[aá] de acuerdo/i,
    say: 'Aclare el alcance: “sin aceptar responsabilidad ni hechos no probados”.',
    reason: 'La formulación puede convertirse en una admisión amplia si no se delimita.',
  },
  {
    level: 'urgente',
    title: 'Pregunta objetable',
    pattern: /cierto que|verdad que|usted sabía que|no es cierto/i,
    say: 'Objete por sugestiva si es interrogatorio directo o pida reformulación.',
    reason: 'La pregunta parece incorporar la respuesta esperada.',
  },
  {
    level: 'estrategia',
    title: 'Falta precisión',
    pattern: /siempre|nunca|todos|nadie|normalmente|generalmente/i,
    say: 'Pida precisión: fecha, lugar, documento, persona presente y fuente de conocimiento.',
    reason: 'Las afirmaciones generales se debilitan con detalles verificables.',
  },
  {
    level: 'riesgo',
    title: 'Constancia',
    pattern: /fuera de registro|no queda grabado|continuemos|dejemos as[ií]/i,
    say: 'Solicite respetuosamente que la manifestación conste en acta o grabación.',
    reason: 'Lo relevante debe quedar incorporado al registro de la audiencia.',
  },
];

function fallbackSuggestions(transcript: string): Suggestion[] {
  const hits = FALLBACK_RULES
    .filter((rule) => rule.pattern.test(transcript))
    .slice(0, 3)
    .map(({ level, title, say, reason }) => ({ level, title, say, reason }));

  if (hits.length > 0) return hits;

  return [{
    level: 'nota',
    title: 'Seguimiento',
    say: 'Mantenga la escucha activa y anote hechos, fechas, documentos y contradicciones.',
    reason: 'No detecté un disparador procesal claro en el último fragmento.',
  }];
}

function buildPrompt(mode: HearingMode, caseContext: string, transcript: string) {
  return [
    {
      role: 'system',
      content: `Eres un asistente táctico para un abogado litigante en Colombia durante una audiencia judicial.
Tu trabajo es detectar riesgos, oportunidades y posibles intervenciones en vivo.
Responde SOLO JSON válido con esta forma:
{"suggestions":[{"level":"urgente|riesgo|estrategia|nota","title":"máx 5 palabras","say":"frase breve que el abogado podría decir","reason":"motivo en una frase"}]}
Reglas:
- No inventes normas, citas ni hechos.
- Prioriza recomendaciones útiles en menos de 8 segundos.
- Máximo 3 sugerencias.
- Cada "say" debe ser corto, respetuoso y listo para audiencia.
- Si no hay intervención clara, devuelve una nota breve de seguimiento.
- Tipo de audiencia: ${mode}.`,
    },
    {
      role: 'user',
      content: `Contexto del caso:
${caseContext || 'Sin contexto cargado todavía.'}

Último fragmento de audiencia:
${transcript}`,
    },
  ];
}

function normalizeSuggestion(input: Partial<Suggestion>): Suggestion {
  const levels: AlertLevel[] = ['urgente', 'riesgo', 'estrategia', 'nota'];
  const level = levels.includes(input.level as AlertLevel) ? input.level as AlertLevel : 'nota';

  return {
    level,
    title: String(input.title || 'Alerta').slice(0, 80),
    say: String(input.say || 'Revise el último fragmento antes de intervenir.').slice(0, 260),
    reason: String(input.reason || 'El fragmento requiere verificación.').slice(0, 260),
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as {
    mode?: HearingMode;
    caseContext?: string;
    transcript?: string;
  };

  const transcript = (body.transcript || '').trim();
  const caseContext = (body.caseContext || '').trim().slice(0, 6000);
  const mode = body.mode || 'civil';

  if (!transcript) {
    return NextResponse.json({ ok: false, error: 'No hay transcripción para analizar.' }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      source: 'fallback',
      suggestions: fallbackSuggestions(transcript),
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_HEARING_MODEL || 'gpt-5-mini',
        input: buildPrompt(mode, caseContext, transcript),
        text: {
          format: {
            type: 'json_schema',
            name: 'hearing_suggestions',
            schema: {
              type: 'object',
              additionalProperties: false,
              required: ['suggestions'],
              properties: {
                suggestions: {
                  type: 'array',
                  maxItems: 3,
                  items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['level', 'title', 'say', 'reason'],
                    properties: {
                      level: { type: 'string', enum: ['urgente', 'riesgo', 'estrategia', 'nota'] },
                      title: { type: 'string' },
                      say: { type: 'string' },
                      reason: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        ok: true,
        source: 'fallback',
        suggestions: fallbackSuggestions(transcript),
        warning: `OpenAI respondió ${response.status}`,
      });
    }

    const data = await response.json();
    const text = data.output_text || data.output?.flatMap((item: { content?: Array<{ text?: string }> }) => item.content || [])
      .map((item: { text?: string }) => item.text)
      .filter(Boolean)
      .join('\n');
    const parsed = JSON.parse(text || '{"suggestions":[]}') as { suggestions?: Partial<Suggestion>[] };
    const suggestions = (parsed.suggestions || []).slice(0, 3).map(normalizeSuggestion);

    return NextResponse.json({
      ok: true,
      source: 'openai',
      suggestions: suggestions.length ? suggestions : fallbackSuggestions(transcript),
    });
  } catch {
    return NextResponse.json({
      ok: true,
      source: 'fallback',
      suggestions: fallbackSuggestions(transcript),
    });
  }
}
