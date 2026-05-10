import { NextRequest, NextResponse } from 'next/server';

type HearingMode = 'civil' | 'laboral' | 'familia' | 'penal' | 'administrativo';
type AlertLevel = 'urgente' | 'riesgo' | 'estrategia' | 'nota';

type Suggestion = {
  level: AlertLevel;
  title: string;
  say: string;
  reason: string;
  origin?: 'local' | 'ai';
};

type PromptMessage = {
  role: 'system' | 'user';
  content: string;
};

type RadarDecision = {
  shouldCallAi: boolean;
  cleanedTranscript: string;
  reason: string;
  signals: string[];
};

const FILLER_WORDS = new Set([
  'hola', 'alo', 'aló', 'bueno', 'buenos', 'dias', 'días', 'tardes', 'noches',
  'si', 'sí', 'ok', 'okay', 'listo', 'perfecto', 'gracias', 'eh', 'mmm', 'aja', 'ajá',
]);

const LEGAL_SIGNALS: Array<{ label: string; pattern: RegExp; weight: number }> = [
  { label: 'prueba', pattern: /\b(prueba|pruebas|testimonial|documental|pericial|dictamen|inspecci[oó]n|decret[ao]|nieg[ao]|rechaz|inadmit|pertinen|conducen|utilidad)\b/i, weight: 3 },
  { label: 'recurso', pattern: /\b(recurso|reposici[oó]n|apelaci[oó]n|s[uú]plica|queja|impugn|recurr)\b/i, weight: 3 },
  { label: 'objecion', pattern: /\b(objeci[oó]n|objeto|sugestiva|impertinente|inconducente|capciosa|confusa|argumentativa)\b/i, weight: 3 },
  { label: 'interrogatorio', pattern: /\b(interrogatorio|contrainterrogatorio|testigo|declarante|juramento|pregunta|responda|manifest[oó]|afirm[oó]|neg[oó])\b/i, weight: 2 },
  { label: 'decision', pattern: /\b(auto|sentencia|decisi[oó]n|resuelve|ordena|dispone|declara|concede|niega|aprueba)\b/i, weight: 3 },
  { label: 'traslado', pattern: /\b(traslado|t[eé]rmino|d[ií]as|notificaci[oó]n|ejecutoria|vencimiento)\b/i, weight: 2 },
  { label: 'conciliacion', pattern: /\b(conciliaci[oó]n|acuerdo|propuesta|arreglo|transacci[oó]n|desistimiento)\b/i, weight: 2 },
  { label: 'hechos', pattern: /\b(hecho|hechos|confesi[oó]n|confiesa|acepta|reconoce|responsabilidad|pretensi[oó]n|excepci[oó]n)\b/i, weight: 2 },
  { label: 'medida', pattern: /\b(medida cautelar|embargo|secuestro|suspensi[oó]n|protecci[oó]n|amparo)\b/i, weight: 3 },
  { label: 'nulidad', pattern: /\b(nulidad|debido proceso|competencia|impedimento|recusaci[oó]n)\b/i, weight: 3 },
  { label: 'juez', pattern: /\b(juez|jueza|despacho|magistrad|tribunal|juzgado|audiencia)\b/i, weight: 1 },
];

const FALLBACK_RULES: Array<{
  level: AlertLevel;
  title: string;
  pattern: RegExp;
  say: string;
  reason: string;
}> = [
  {
    level: 'estrategia',
    title: 'Inicio de audiencia',
    pattern: /inici(ar|amos|emos)|reanudar|audiencia|presentes|comparec/i,
    say: 'Salude, identifíquese y deje claro a quién representa.',
    reason: 'Al iniciar o reanudar, conviene fijar presencia, representación y canal de comunicación.',
  },
  {
    level: 'urgente',
    title: 'Recurso',
    pattern: /recurso|reposici[oó]n|apelaci[oó]n|impugn|recurr/i,
    say: 'Sustente el recurso de inmediato: decisión atacada, error concreto y solicitud.',
    reason: 'Un recurso debe quedar claro en oportunidad, fundamento y petición.',
  },
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

function stripAccents(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function cleanTranscript(transcript: string) {
  const words = transcript
    .replace(/[^\p{L}\p{N}\s.,;:¿?¡!-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/\s+/);

  const compacted: string[] = [];
  let previous = '';
  let repeatCount = 0;

  for (const word of words) {
    const normalized = stripAccents(word.toLowerCase()).replace(/[^\p{L}\p{N}]/gu, '');
    if (!normalized) continue;

    if (normalized === previous) {
      repeatCount += 1;
      if (repeatCount <= 2) compacted.push(word);
      continue;
    }

    previous = normalized;
    repeatCount = 1;
    compacted.push(word);
  }

  return compacted.join(' ').trim();
}

function isMostlyFiller(transcript: string) {
  const normalizedWords = cleanTranscript(transcript)
    .split(/\s+/)
    .map((word) => stripAccents(word.toLowerCase()).replace(/[^\p{L}\p{N}]/gu, ''))
    .filter(Boolean);

  if (normalizedWords.length === 0) return true;
  const fillerCount = normalizedWords.filter((word) => FILLER_WORDS.has(word)).length;
  const uniqueCount = new Set(normalizedWords).size;

  return fillerCount / normalizedWords.length > 0.65 || (uniqueCount <= 4 && normalizedWords.length >= 10);
}

function inspectTranscript(transcript: string): RadarDecision {
  const cleanedTranscript = cleanTranscript(transcript);
  const words = cleanedTranscript.split(/\s+/).filter(Boolean);

  if (words.length < 12) {
    return {
      shouldCallAi: false,
      cleanedTranscript,
      reason: 'Bloque muy corto; radar local en escucha.',
      signals: [],
    };
  }

  if (isMostlyFiller(cleanedTranscript)) {
    return {
      shouldCallAi: false,
      cleanedTranscript,
      reason: 'Ruido, saludo o repetición sin contenido jurídico.',
      signals: [],
    };
  }

  const signals = LEGAL_SIGNALS.filter((signal) => signal.pattern.test(cleanedTranscript));
  const score = signals.reduce((sum, signal) => sum + signal.weight, 0);
  const hasDenseContent = words.length >= 55 && new Set(words.map((word) => stripAccents(word.toLowerCase()))).size >= 24;

  return {
    shouldCallAi: score >= 3 || hasDenseContent,
    cleanedTranscript,
    reason: score >= 3
      ? `Señales jurídicas detectadas: ${signals.map((signal) => signal.label).join(', ')}.`
      : hasDenseContent
        ? 'Bloque sustancial sin palabra clave clara; se consulta IA por contexto.'
        : 'Sin señal jurídica suficiente; se evita llamada a IA.',
    signals: signals.map((signal) => signal.label),
  };
}

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
- No respondas que falta contexto. Si el contexto es insuficiente, da una intervención procesal segura y genérica.
- No uses Markdown, LaTeX, llaves, símbolos raros ni texto corrupto. Usa español colombiano claro.
- Si escuchas "recurso", recomienda cómo sustentarlo o protegerlo procesalmente.
- Si escuchas inicio de audiencia, recomienda saludo, identificación y representación.
- Si no hay intervención clara, devuelve una nota breve de seguimiento sin pedir información adicional.
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

function promptToText(messages: PromptMessage[]) {
  return messages.map((message) => `${message.role.toUpperCase()}:\n${message.content}`).join('\n\n');
}

function normalizeSuggestion(input: Partial<Suggestion>): Suggestion {
  const levels: AlertLevel[] = ['urgente', 'riesgo', 'estrategia', 'nota'];
  const level = levels.includes(input.level as AlertLevel) ? input.level as AlertLevel : 'nota';
  const title = sanitizeText(input.title || 'Alerta', 80);
  const say = sanitizeText(input.say || 'Revise el último fragmento antes de intervenir.', 260);
  const reason = sanitizeText(input.reason || 'El fragmento requiere verificación.', 260);

  return {
    level,
    title,
    say,
    reason,
    origin: 'ai',
  };
}

function sanitizeText(value: string, maxLength: number) {
  return String(value)
    .replace(/[{}[\]`*_<>]/g, '')
    .replace(/\\[a-z]+/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function isLowValueAiSuggestion(suggestion: Suggestion) {
  const text = `${suggestion.title} ${suggestion.say} ${suggestion.reason}`.toLowerCase();
  return /falta de contexto|requerir informaci[oó]n|proporcione contexto|no se puede|no puedo|insuficiente informaci[oó]n/.test(text);
}

function mergeSuggestions(localSuggestions: Suggestion[], aiSuggestions: Suggestion[]) {
  const seen = new Set<string>();
  const usefulAiSuggestions = aiSuggestions.filter((item) => !isLowValueAiSuggestion(item));
  return [...localSuggestions.map((item) => ({ ...item, origin: 'local' as const })), ...usefulAiSuggestions]
    .filter((item) => {
      const key = `${item.level}-${item.title}-${item.say}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 4);
}

function getParsedSuggestions(text: string): Suggestion[] {
  const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();
  const parsed = JSON.parse(cleaned || '{"suggestions":[]}') as { suggestions?: Partial<Suggestion>[] };
  return (parsed.suggestions || []).slice(0, 3).map(normalizeSuggestion);
}

async function getOpenAISuggestions(messages: PromptMessage[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { suggestions: [], health: 'OpenAI sin API key.' };

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_HEARING_MODEL || 'gpt-5-mini',
      input: messages,
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
    const errorText = await response.text().catch(() => '');
    throw new Error(`OpenAI respondió ${response.status}${errorText ? `: ${errorText.slice(0, 180)}` : ''}`);
  }

  const data = await response.json();
  const text = data.output_text || data.output?.flatMap((item: { content?: Array<{ text?: string }> }) => item.content || [])
    .map((item: { text?: string }) => item.text)
    .filter(Boolean)
    .join('\n');

  return {
    suggestions: getParsedSuggestions(text || ''),
    health: 'OpenAI conectado. Reglas locales activas como respaldo.',
  };
}

async function getGeminiSuggestions(messages: PromptMessage[]) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { suggestions: [], health: 'Gemini sin API key.' };

  const model = process.env.GEMINI_HEARING_MODEL || 'gemini-2.5-flash-lite';
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: promptToText(messages) }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            suggestions: {
              type: 'ARRAY',
              maxItems: 3,
              items: {
                type: 'OBJECT',
                properties: {
                  level: { type: 'STRING', enum: ['urgente', 'riesgo', 'estrategia', 'nota'] },
                  title: { type: 'STRING' },
                  say: { type: 'STRING' },
                  reason: { type: 'STRING' },
                },
                required: ['level', 'title', 'say', 'reason'],
              },
            },
          },
          required: ['suggestions'],
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Gemini respondió ${response.status}${errorText ? `: ${errorText.slice(0, 180)}` : ''}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text).filter(Boolean).join('\n') || '';

  return {
    suggestions: getParsedSuggestions(text),
    health: 'Gemini conectado. Reglas locales activas como respaldo.',
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

  const aiProvider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const radar = inspectTranscript(transcript);
  const transcriptForAnalysis = radar.cleanedTranscript || transcript;
  const localSuggestions = fallbackSuggestions(transcriptForAnalysis).map((item) => ({ ...item, origin: 'local' as const }));
  const prompt = buildPrompt(mode, caseContext, transcriptForAnalysis) as PromptMessage[];

  if (!radar.shouldCallAi) {
    return NextResponse.json({
      ok: true,
      source: 'local',
      mode: 'radar',
      health: `Radar local: ${radar.reason}`,
      radar,
      suggestions: localSuggestions,
    });
  }

  if (!hasGemini && !hasOpenAI) {
    return NextResponse.json({
      ok: true,
      source: 'local',
      mode: 'respaldo',
      health: `Radar local detectó evento, pero no hay GEMINI_API_KEY ni OPENAI_API_KEY. ${radar.reason}`,
      radar,
      suggestions: localSuggestions,
    });
  }

  try {
    const primary = aiProvider === 'openai' && hasOpenAI
      ? await getOpenAISuggestions(prompt)
      : await getGeminiSuggestions(prompt);

    return NextResponse.json({
      ok: true,
      source: 'hybrid',
      mode: 'ia+respaldo',
      provider: aiProvider === 'openai' && hasOpenAI ? 'openai' : 'gemini',
      health: `${primary.health} Radar: ${radar.reason}`,
      radar,
      suggestions: mergeSuggestions(localSuggestions, primary.suggestions),
    });
  } catch (error) {
    if (aiProvider === 'gemini' && hasOpenAI) {
      try {
        const openai = await getOpenAISuggestions(prompt);
        return NextResponse.json({
          ok: true,
          source: 'hybrid',
          mode: 'ia+respaldo',
          provider: 'openai',
          health: `Gemini no respondió; OpenAI tomó el respaldo. ${openai.health} Radar: ${radar.reason}`,
          radar,
          suggestions: mergeSuggestions(localSuggestions, openai.suggestions),
        });
      } catch {
        // Fall through to local backup.
      }
    }

    return NextResponse.json({
      ok: true,
      source: 'local',
      mode: 'respaldo',
      health: error instanceof Error ? error.message : 'No se pudo consultar la IA.',
      radar,
      suggestions: localSuggestions,
    });
  }
}
