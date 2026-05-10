'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, Gavel, Mic, Pause, Play, Send, ShieldAlert } from 'lucide-react';
import AdminShell from '@/components/AdminShell';

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: {
    results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
  }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

function cop(val: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
}

function InputField({ label, value, onChange, type = 'number', placeholder }: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white
          placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition" />
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="mt-6 bg-[#111f35]/40 border border-dashed border-slate-800 rounded-xl p-8 text-center">
      <p className="text-slate-500 text-sm">Complete los datos y presione <span className="text-cyan-400">Calcular</span>.</p>
    </div>
  );
}

// ─── 1. Conversor UVT ─────────────────────────────────────────────────────────
const UVT_VALORES: Record<number, number> = {
  2024: 47065,
  2025: 49799,
  2023: 42412,
  2022: 38004,
  2021: 36308,
};

function CalcUVT() {
  const [anio, setAnio] = useState('2025');
  const [uvts, setUvts] = useState('');
  const [pesos, setPesos] = useState('');

  const valorUVT = UVT_VALORES[Number(anio)] ?? 49799;

  return (
    <div className="space-y-4">
      <div className="bg-cyan-900/20 border border-cyan-800/40 rounded-lg p-3 text-xs text-cyan-300">
        Convierte valores entre <strong>UVT y pesos colombianos</strong> según el año fiscal (DIAN).
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Año fiscal</label>
        <select value={anio} onChange={(e) => setAnio(e.target.value)}
          className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition">
          {Object.entries(UVT_VALORES).sort((a, b) => Number(b[0]) - Number(a[0])).map(([a, v]) => (
            <option key={a} value={a}>{a} — 1 UVT = {cop(v)}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">UVTs → Pesos</label>
          <input type="number" value={uvts} onChange={(e) => setUvts(e.target.value)} placeholder="ej: 1090"
            className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition" />
          {uvts && (
            <p className="text-cyan-400 font-semibold mt-2 text-sm">{cop(Number(uvts) * valorUVT)}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Pesos → UVTs</label>
          <input type="number" value={pesos} onChange={(e) => setPesos(e.target.value)} placeholder="ej: 50000000"
            className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition" />
          {pesos && (
            <p className="text-cyan-400 font-semibold mt-2 text-sm">{(Number(pesos) / valorUVT).toFixed(2)} UVTs</p>
          )}
        </div>
      </div>
      <div className="bg-[#0a1120] rounded-lg p-3 border border-slate-800">
        <p className="text-xs text-slate-400">1 UVT ({anio}) = <strong className="text-white">{cop(valorUVT)}</strong></p>
      </div>
    </div>
  );
}

// ─── 2. Costas procesales ─────────────────────────────────────────────────────
function CalcCostas() {
  const [cuantia, setCuantia] = useState('');
  const [resultado, setResultado] = useState<{ min: number; max: number } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const c = Number(cuantia);
    // Agencias en derecho: ~5% a 15% de la cuantía según Acuerdo PSAA16-10554 CSJ
    setResultado({ min: c * 0.05, max: c * 0.15 });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-cyan-900/20 border border-cyan-800/40 rounded-lg p-3 text-xs text-cyan-300">
        Estima las agencias en derecho y costas procesales según la cuantía del proceso (Acuerdo PSAA16-10554 CSJ).<br />
        El rango es orientativo; el juez tiene discrecionalidad para fijar el monto exacto.
      </div>
      <InputField label="Cuantía del proceso (COP)" value={cuantia} onChange={setCuantia} placeholder="ej: 50000000" />
      <button type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Estimar Costas
      </button>
      {resultado ? (
        <div className="mt-6 bg-gradient-to-br from-[#0a1f2a] to-[#0d1626] border border-cyan-500/30 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">Estimación de Agencias en Derecho</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a1120] rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Mínimo (5%)</p>
              <p className="text-xl font-bold text-white">{cop(resultado.min)}</p>
            </div>
            <div className="bg-[#0a1120] rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Máximo (15%)</p>
              <p className="text-xl font-bold text-white">{cop(resultado.max)}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-4">Cuantía del proceso: {cop(Number(cuantia))}</p>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── 3. Caducidad por tipo de acción ─────────────────────────────────────────
const CADUCIDADES = [
  { label: 'Nulidad y restablecimiento del derecho (contencioso)', meses: 48 },
  { label: 'Reparación directa (daño del Estado)', meses: 24 },
  { label: 'Contractual (contratos estatales)', meses: 24 },
  { label: 'Electoral', meses: 1 },
  { label: 'Disciplinaria (Procuraduría)', meses: 60 },
  { label: 'Acción de tutela (subsidiariedad)', meses: 0 }, // Inmediata
  { label: 'Acción popular (derechos colectivos)', meses: 0 }, // Sin caducidad formal
  { label: 'Habeas corpus', meses: 0 },
];

function CalcCaducidad() {
  const [fechaHecho, setFechaHecho] = useState('');
  const [tipoIdx, setTipoIdx] = useState(0);
  const [resultado, setResultado] = useState<{
    limite: string; diasRestantes: number; caducada: boolean; nota?: string;
  } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const tipo = CADUCIDADES[tipoIdx];
    if (tipo.meses === 0) {
      setResultado({ limite: 'Inmediata / Sin caducidad', diasRestantes: 0, caducada: false, nota: 'Esta acción no tiene término de caducidad definido en meses.' });
      return;
    }
    const inicio = new Date(fechaHecho + 'T00:00:00');
    const limite = new Date(inicio);
    limite.setMonth(limite.getMonth() + tipo.meses);
    const hoy = new Date();
    const diff = Math.floor((limite.getTime() - hoy.getTime()) / 86400000);
    setResultado({
      limite: limite.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
      diasRestantes: Math.abs(diff),
      caducada: diff < 0,
    });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-cyan-900/20 border border-cyan-800/40 rounded-lg p-3 text-xs text-cyan-300">
        Calcula la <strong>fecha de caducidad</strong> de una acción judicial contencioso-administrativa o especial.
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Tipo de acción</label>
        <select value={tipoIdx} onChange={(e) => setTipoIdx(Number(e.target.value))}
          className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition">
          {CADUCIDADES.map((c, i) => (
            <option key={i} value={i}>{c.label} {c.meses > 0 ? `(${c.meses} meses)` : '(inmediata)'}</option>
          ))}
        </select>
      </div>
      <InputField label="Fecha del hecho / conocimiento" value={fechaHecho} onChange={setFechaHecho} type="date" />
      <button type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Caducidad
      </button>
      {resultado ? (
        <div className={`mt-6 border rounded-xl p-6 ${resultado.caducada
          ? 'bg-gradient-to-br from-[#2a0f0f] to-[#0d1626] border-red-500/30'
          : 'bg-gradient-to-br from-[#0a1f2a] to-[#0d1626] border-cyan-500/30'}`}>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${resultado.caducada ? 'text-red-400' : 'text-cyan-400'}`}>
            {resultado.caducada ? '⚠ Acción CADUCADA' : resultado.nota ? '✓ Sin caducidad' : '✓ Acción VIGENTE'}
          </p>
          {resultado.nota
            ? <p className="text-slate-300 text-sm">{resultado.nota}</p>
            : <>
                <p className="text-2xl font-bold text-white mb-1">{resultado.limite}</p>
                <p className="text-sm text-slate-300">
                  {resultado.caducada
                    ? `Caducó hace ${resultado.diasRestantes} días.`
                    : `Restan ${resultado.diasRestantes} días.`}
                </p>
              </>
          }
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── 4. Asistente de Audiencia en vivo ────────────────────────────────────────
type HearingMode = 'civil' | 'laboral' | 'familia' | 'penal' | 'administrativo';
type Suggestion = {
  level: 'urgente' | 'riesgo' | 'estrategia' | 'nota';
  title: string;
  say: string;
  reason: string;
  origin?: 'local' | 'ai';
};

const HEARING_MODES: { key: HearingMode; label: string }[] = [
  { key: 'civil', label: 'Civil' },
  { key: 'laboral', label: 'Laboral' },
  { key: 'familia', label: 'Familia' },
  { key: 'penal', label: 'Penal' },
  { key: 'administrativo', label: 'Administrativo' },
];

const LEVEL_STYLES: Record<Suggestion['level'], string> = {
  urgente: 'border-red-500/50 bg-red-950/30 text-red-200',
  riesgo: 'border-amber-500/50 bg-amber-950/30 text-amber-200',
  estrategia: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-200',
  nota: 'border-slate-600 bg-slate-900/50 text-slate-200',
};

function AudienciaEnVivo() {
  const [mode, setMode] = useState<HearingMode>('civil');
  const [caseContext, setCaseContext] = useState('');
  const [transcript, setTranscript] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [status, setStatus] = useState('Listo para iniciar audiencia.');
  const [listening, setListening] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognitionLike | null>(null);
  const [source, setSource] = useState<'hybrid' | 'local' | null>(null);
  const [health, setHealth] = useState('Respaldo local listo.');
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const transcriptRef = useRef(transcript);
  const caseContextRef = useRef(caseContext);
  const modeRef = useRef(mode);
  const lastAnalyzedRef = useRef('');
  const analyzingRef = useRef(false);

  useEffect(() => { transcriptRef.current = transcript; }, [transcript]);
  useEffect(() => { caseContextRef.current = caseContext; }, [caseContext]);
  useEffect(() => { modeRef.current = mode; }, [mode]);

  const analyze = async (text = transcriptRef.current, quiet = false) => {
    if (analyzingRef.current) return false;
    const clean = text.trim();
    if (!clean) {
      setStatus('Pegue o dicte un fragmento de audiencia.');
      return false;
    }

    analyzingRef.current = true;
    const startedAt = Date.now();
    if (!quiet) setStatus('Analizando el último fragmento...');
    const recent = clean.split(/\s+/).slice(-260).join(' ');
    try {
      const res = await fetch('/api/admin/audiencia-asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: modeRef.current, caseContext: caseContextRef.current, transcript: recent }),
      });
      const data = await res.json();
      if (!data.ok) {
        setStatus(data.error || 'No se pudo analizar.');
        return false;
      }

      setLatencyMs(Date.now() - startedAt);
      setSuggestions(data.suggestions || []);
      setSource(data.source || null);
      setHealth(data.health || 'Sistema de respaldo activo.');
      setStatus(data.source === 'hybrid'
        ? 'Audiencia activa: IA conectada con respaldo local.'
        : 'Audiencia activa: respaldo local funcionando.');
      return true;
    } catch (error) {
      setStatus('No se pudo conectar con el analizador.');
      setHealth(error instanceof Error ? error.message : 'Error inesperado.');
      return false;
    } finally {
      analyzingRef.current = false;
    }
  };

  useEffect(() => {
    if (!autoMode) return;

    const timer = window.setInterval(async () => {
      const clean = transcriptRef.current.trim();
      const words = clean.split(/\s+/).filter(Boolean);
      if (words.length < 10) return;

      const recent = words.slice(-180).join(' ');
      if (recent === lastAnalyzedRef.current) return;

      const ok = await analyze(clean, true);
      if (ok) lastAnalyzedRef.current = recent;
    }, 7000);

    return () => window.clearInterval(timer);
  }, [autoMode]);

  const startDictation = () => {
    if (listening) return true;

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setStatus('Este navegador no soporta dictado. Use Chrome o pegue la transcripción.');
      return false;
    }

    const nextRecognition = new Recognition();
    nextRecognition.continuous = true;
    nextRecognition.interimResults = true;
    nextRecognition.lang = 'es-CO';
    nextRecognition.onresult = (event) => {
      let finalText = '';
      for (let i = 0; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) finalText += `${event.results[i][0].transcript} `;
      }
      if (finalText) setTranscript((current) => `${current} ${finalText}`.trim());
    };
    nextRecognition.onend = () => setListening(false);
    nextRecognition.start();
    setRecognition(nextRecognition);
    setListening(true);
    return true;
  };

  const stopDictation = () => {
    if (recognition) {
      recognition.stop();
    }
    setListening(false);
  };

  const toggleDictation = () => {
    if (listening) {
      stopDictation();
      setStatus(autoMode ? 'Audiencia activa, dictado pausado.' : 'Dictado pausado.');
      return;
    }

    if (startDictation()) setStatus('Dictado activo. El análisis automático depende del modo audiencia.');
  };

  const toggleAudience = () => {
    if (autoMode) {
      setAutoMode(false);
      stopDictation();
      setStatus('Audiencia pausada.');
      return;
    }

    const dictationStarted = startDictation();
    setAutoMode(true);
    setStatus(dictationStarted
      ? 'Audiencia activa. Analizo automáticamente cada pocos segundos.'
      : 'Audiencia activa en modo texto. Pegue transcripción y analizaré automáticamente.');
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Tipo de audiencia</label>
            <select value={mode} onChange={(e) => setMode(e.target.value as HearingMode)}
              className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition">
              {HEARING_MODES.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button type="button" onClick={toggleAudience}
              className={[
                'inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium transition',
                autoMode ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' : 'bg-emerald-600 text-white hover:bg-emerald-500',
              ].join(' ')}>
              {autoMode ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {autoMode ? 'Pausar audiencia' : 'Iniciar audiencia'}
            </button>
            <button type="button" onClick={toggleDictation}
              className={[
                'inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition',
                listening ? 'border-amber-500 bg-amber-500/15 text-amber-200' : 'border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800',
              ].join(' ')}>
              {listening ? <Pause className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {listening ? 'Pausar' : 'Dictar'}
            </button>
            <button type="button" onClick={() => analyze()}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-cyan-600 px-3 text-sm font-medium text-white transition hover:bg-cyan-500">
              <Send className="h-4 w-4" />
              Analizar
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Contexto del caso</label>
          <textarea value={caseContext} onChange={(e) => setCaseContext(e.target.value)}
            placeholder="Pretensiones, hechos clave, pruebas importantes, teoría del caso y riesgos."
            className="min-h-24 w-full resize-y rounded-lg border border-slate-700 bg-[#0a1120] px-3 py-2.5 text-sm text-white placeholder-slate-600 transition focus:border-cyan-500 focus:outline-none" />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Transcripción en vivo</label>
          <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)}
            placeholder="Pegue aquí lo que va diciendo el juez, contraparte o testigo. También puede usar dictado."
            className="min-h-56 w-full resize-y rounded-lg border border-slate-700 bg-[#0a1120] px-3 py-2.5 text-sm leading-6 text-white placeholder-slate-600 transition focus:border-cyan-500 focus:outline-none" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-[#0a1120] px-3 py-2.5">
          <div>
            <p className="text-xs font-medium text-slate-300">{status}</p>
            <p className="mt-1 text-[11px] text-slate-500">
              {health}{latencyMs !== null ? ` · Latencia: ${(latencyMs / 1000).toFixed(1)} s` : ''}
            </p>
          </div>
          <button type="button" onClick={() => { setTranscript(''); setSuggestions([]); setSource(null); setLatencyMs(null); lastAnalyzedRef.current = ''; }}
            className="text-xs font-medium text-slate-400 transition hover:text-white">
            Limpiar sesión
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-cyan-400" />
            <h2 className="text-sm font-semibold text-slate-100">Sugerencias rápidas</h2>
          </div>
          {source && (
            <span className="rounded-full border border-slate-700 px-2 py-1 text-[11px] uppercase tracking-wide text-slate-400">
              {source === 'hybrid' ? 'IA + respaldo' : 'Respaldo local'}
            </span>
          )}
        </div>

        {suggestions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-6 text-center">
            <Gavel className="mx-auto mb-3 h-8 w-8 text-slate-600" />
            <p className="text-sm text-slate-400">Las alertas aparecerán aquí después de analizar un fragmento.</p>
          </div>
        ) : suggestions.map((item, index) => (
          <article key={`${item.title}-${index}`} className={`rounded-xl border p-4 ${LEVEL_STYLES[item.level]}`}>
            <div className="mb-2 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-wider">{item.level} · {item.title}</p>
            </div>
            <p className="text-sm font-semibold leading-6 text-white">{item.say}</p>
            <p className="mt-2 text-xs leading-5 opacity-80">{item.reason}</p>
            {item.origin && (
              <p className="mt-3 text-[11px] uppercase tracking-wider opacity-60">
                {item.origin === 'ai' ? 'Origen: IA' : 'Origen: respaldo local'}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

// ─── Página ────────────────────────────────────────────────────────────────────
type Tab = 'uvt' | 'costas' | 'caducidad' | 'audiencia';

const TABS: { key: Tab; label: string; short: string }[] = [
  { key: 'uvt',       label: 'Conversor UVT',           short: '1' },
  { key: 'costas',    label: 'Costas Procesales',        short: '2' },
  { key: 'caducidad', label: 'Caducidad por Acción',     short: '3' },
  { key: 'audiencia', label: 'Audiencia en Vivo',        short: '4' },
];

export default function HerramientasAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('uvt');

  return (
    <AdminShell>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">Herramientas Generales</h1>
          <p className="text-sm text-slate-400 mt-1">
            Conversores y calculadoras de uso transversal — <span className="text-slate-300 font-medium">DIAN · CSJ · CPACA</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {TABS.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={[
                'flex flex-col items-start text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-all',
                activeTab === tab.key
                  ? 'border-cyan-500 bg-cyan-600 text-white'
                  : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800',
              ].join(' ')}>
              <span className="font-bold text-base leading-none mb-1">{tab.short}</span>
              <span className="leading-tight">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#111f35] border border-[#1e3a6e]/50 rounded-xl p-6 shadow-lg">
          {activeTab === 'uvt'       && <CalcUVT />}
          {activeTab === 'costas'    && <CalcCostas />}
          {activeTab === 'caducidad' && <CalcCaducidad />}
          {activeTab === 'audiencia' && <AudienciaEnVivo />}
        </div>

        <p className="text-xs text-slate-600 text-center mt-6">
          *Herramienta de uso interno — Castellanos Abogados.
        </p>
      </div>
    </AdminShell>
  );
}
