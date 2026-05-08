'use client';

import { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const WA_NUMBER = '573148309306';

type Evaluator = {
  id: string;
  area: string;
  title: string;
  description: string;
  href: string;
  prompts: string[];
};

const EVALUATORS: Evaluator[] = [
  {
    id: 'ejecucion-penas',
    area: 'Ejecución de penas',
    title: 'Redenciones, términos y beneficios',
    description: 'Para familiares o personas condenadas que necesitan revisar tiempo físico, trabajo, estudio, libertad condicional o domiciliaria.',
    href: '/servicios/ejecucion-penas',
    prompts: ['Redención por trabajo o estudio', 'Libertad condicional', 'Prisión domiciliaria', 'Revisión de cómputo o términos'],
  },
  {
    id: 'penal',
    area: 'Penal',
    title: 'Riesgo penal y defensa temprana',
    description: 'Para citaciones, capturas, imputaciones, audiencias o decisiones urgentes donde se necesita una ruta de defensa clara.',
    href: '/servicios/penal-personas',
    prompts: ['Citación o indagación', 'Audiencia o captura', 'Medida de aseguramiento', 'Estrategia de defensa'],
  },
  {
    id: 'familia',
    area: 'Familia',
    title: 'Alimentos, custodia y acuerdos',
    description: 'Para revisar cuota alimentaria, deudas, custodia, visitas, divorcio o medidas de protección familiar.',
    href: '/servicios/familia',
    prompts: ['Cuota alimentaria', 'Alimentos en mora', 'Custodia o visitas', 'Divorcio o acuerdo familiar'],
  },
  {
    id: 'civil',
    area: 'Civil',
    title: 'Deudas, contratos y prescripción',
    description: 'Para obligaciones, arrendamientos, intereses, incumplimientos contractuales, prescripción o indexación.',
    href: '/servicios/civil',
    prompts: ['Deuda o intereses', 'Contrato incumplido', 'Arrendamiento', 'Prescripción o término'],
  },
  {
    id: 'laboral',
    area: 'Laboral',
    title: 'Liquidación y reclamación laboral',
    description: 'Para despidos, liquidaciones, prestaciones, salarios pendientes, sanción moratoria o conciliaciones.',
    href: '/servicios/laboral',
    prompts: ['Liquidación laboral', 'Despido sin justa causa', 'Salarios o prestaciones pendientes', 'Sanción moratoria'],
  },
  {
    id: 'administrativo',
    area: 'Administrativo',
    title: 'Recursos, sanciones y caducidad',
    description: 'Para actos administrativos, sanciones, recursos, términos de caducidad o actuaciones ante entidades públicas.',
    href: '/servicios/administrativo',
    prompts: ['Recurso administrativo', 'Sanción o requerimiento', 'Caducidad de acción', 'Entidad pública'],
  },
];

export default function PublicEvaluators() {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState(EVALUATORS[0].id);
  const [topic, setTopic] = useState(EVALUATORS[0].prompts[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const active = useMemo(
    () => EVALUATORS.find((item) => item.id === activeId) ?? EVALUATORS[0],
    [activeId],
  );

  function selectEvaluator(id: string) {
    const next = EVALUATORS.find((item) => item.id === id) ?? EVALUATORS[0];
    setActiveId(next.id);
    setTopic(next.prompts[0]);
    setError('');
  }

  const waMessage = encodeURIComponent([
    `Hola, necesito una revisión inicial en ${active.area}.`,
    `Tema: ${topic}.`,
    name.trim() ? `Nombre: ${name.trim()}.` : '',
    phone.trim() ? `Teléfono: ${phone.trim()}.` : '',
    summary.trim() ? `Resumen: ${summary.trim()}.` : '',
  ].filter(Boolean).join('\n'));
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  async function sendEvaluatorLead() {
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (cleanName.length < 2 || cleanPhone.replace(/\D/g, '').length < 6) {
      setError('Ingrese nombre y teléfono para enviar el contexto.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/leads/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: cleanName,
          telefono: cleanPhone,
          wa_url: waUrl,
          source_path: '/herramientas',
          link_text: `Evaluador: ${active.title}`,
          service_interest: active.area,
          language,
        }),
      });

      if (!response.ok) throw new Error('lead_error');
      window.location.href = waUrl;
    } catch {
      setError('No se pudo registrar la solicitud. Inténtelo nuevamente.');
      setSubmitting(false);
    }
  }

  return (
    <section className="px-4 py-14 bg-[#071223] border-y border-slate-800/70">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 max-w-3xl">
          <p className="inline-flex rounded-full border border-blue-800/50 bg-blue-950/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-300">
            Evaluación inicial
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Preclasifique su caso antes de escribir</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Seleccione el área, deje un resumen mínimo y WhatsApp se abrirá con el contexto organizado para revisar la ruta jurídica adecuada.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {EVALUATORS.map((item) => {
              const selected = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectEvaluator(item.id)}
                  className={[
                    'rounded-xl border p-4 text-left transition-all',
                    selected
                      ? 'border-blue-500/60 bg-blue-950/45 shadow-[0_18px_48px_rgba(15,64,140,.22)]'
                      : 'border-slate-800/80 bg-[#0b1929] hover:border-slate-600',
                  ].join(' ')}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{item.area}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.description}</p>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0b1929] p-5 shadow-[0_24px_70px_rgba(0,0,0,.28)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-slate-400">
                Área
                <input value={active.area} readOnly className="mt-1 w-full rounded-xl border border-slate-700 bg-[#071223] px-3 py-2.5 text-sm text-white outline-none" />
              </label>
              <label className="text-xs font-semibold text-slate-400">
                Tema
                <select value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-700 bg-[#071223] px-3 py-2.5 text-sm text-white outline-none">
                  {active.prompts.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-xs font-semibold text-slate-400">
                Nombre
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Su nombre" className="mt-1 w-full rounded-xl border border-slate-700 bg-[#071223] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600" />
              </label>
              <label className="text-xs font-semibold text-slate-400">
                Teléfono
                <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="300 000 0000" className="mt-1 w-full rounded-xl border border-slate-700 bg-[#071223] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600" />
              </label>
            </div>
            <label className="mt-4 block text-xs font-semibold text-slate-400">
              Resumen breve
              <textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={4} placeholder="Ej. fecha, entidad, etapa del proceso o documento que recibió." className="mt-1 w-full resize-none rounded-xl border border-slate-700 bg-[#071223] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600" />
            </label>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={sendEvaluatorLead}
                disabled={submitting}
                className="rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-[#062313] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Enviando...' : 'Enviar contexto por WhatsApp'}
              </button>
              <a href={active.href} className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white">
                Ver servicio
              </a>
            </div>
            {error && <p className="mt-3 text-xs font-semibold text-red-300">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
