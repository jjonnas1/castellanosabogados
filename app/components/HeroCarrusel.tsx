'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const WA = 'https://wa.me/573148309306';
const INTERVAL = 5500;

const SLIDES = [
  {
    tag: 'Castellanos Abogados · Pereira',
    pill: 'Corporativo · Personas · Ejecución · Formación',
    title: 'Firma jurídica integral en el Eje Cafetero',
    body: 'Derecho penal, civil, familia, laboral, administrativo, ejecución de penas y tutelas. Diagnóstico claro y presencia en cada etapa de su proceso.',
    cta: 'Ver servicios',
    ctaHref: '/servicios',
    ctaWa: WA + '?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios%20legales.',
    ctaWaLabel: 'Consultar por WhatsApp',
    // Panel derecho
    panelTitle: '¿Necesita orientación legal?',
    panelBody: 'Atendemos en Pereira y todo el Eje Cafetero. Primera consulta de diagnóstico.',
    stats: [
      { label: 'Áreas de práctica', value: '8+' },
      { label: 'Atención WhatsApp', value: '24/7' },
      { label: 'Cobertura', value: 'Eje Cafetero' },
    ],
  },
  {
    tag: 'Derecho Laboral',
    pill: 'Ley 789 de 2002 · Art. 64 CST',
    title: 'Hacemos su liquidación laboral completa',
    body: 'Prima de servicios, cesantías, vacaciones e indemnización por despido. Si lo despidieron sin justa causa, calculamos exactamente cuánto le deben.',
    cta: 'Consultar liquidación',
    ctaHref: WA + '?text=Hola%2C%20necesito%20que%20calculen%20mi%20liquidaci%C3%B3n%20laboral.',
    ctaWa: WA + '?text=Hola%2C%20necesito%20que%20calculen%20mi%20liquidaci%C3%B3n%20laboral.',
    ctaWaLabel: '314 830 9306',
    panelTitle: 'Le calculamos lo que le deben',
    panelBody: 'Indemnización, prima, cesantías, intereses y sanción moratoria. Sin cobro anticipado.',
    stats: [
      { label: 'Sanción moratoria', value: '1 día/día' },
      { label: 'Término prescripción', value: '3 años' },
      { label: 'Contrato indefinido', value: 'Aplica Ley 789' },
    ],
  },
  {
    tag: 'Derecho de Familia',
    pill: 'Alimentos · Custodia · Divorcio',
    title: 'Fijamos y reclamamos cuotas de alimentos',
    body: 'Si el obligado no cumple, hay herramientas legales inmediatas: embargo de bienes, arresto por desacato y liquidación de mora.',
    cta: 'Hablar con un abogado',
    ctaHref: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20en%20alimentos%20o%20custodia.',
    ctaWa: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20en%20alimentos%20o%20custodia.',
    ctaWaLabel: '314 830 9306',
    panelTitle: 'Sus hijos tienen derecho',
    panelBody: 'Calculamos el valor de la cuota y actuamos de inmediato si el obligado incumple.',
    stats: [
      { label: 'Cuota orientativa', value: '20–50% ingreso' },
      { label: 'Mora', value: 'Se cobra con intereses' },
      { label: 'Medida inmediata', value: 'Arresto desacato' },
    ],
  },
  {
    tag: 'Derecho Civil e Inmobiliario',
    pill: 'Arriendos · Obligaciones · Contratos',
    title: '¿Le subieron el arriendo más de lo legal?',
    body: 'La Ley 820 de 2003 limita el incremento al IPC del año anterior. Cualquier cobro mayor es ilegal. También tramitamos deudas, contratos y prescripciones.',
    cta: 'Revisar mi caso',
    ctaHref: WA + '?text=Hola%2C%20quiero%20revisar%20si%20mi%20incremento%20de%20arriendo%20es%20legal.',
    ctaWa: WA + '?text=Hola%2C%20quiero%20revisar%20si%20mi%20incremento%20de%20arriendo%20es%20legal.',
    ctaWaLabel: '314 830 9306',
    panelTitle: 'Proteja su patrimonio',
    panelBody: 'Revisamos su contrato, calculamos el incremento legal y actuamos si hubo cobro excesivo.',
    stats: [
      { label: 'Incremento 2025', value: 'Máx. IPC 6.86%' },
      { label: 'Prescripción civil', value: '10 años ordinaria' },
      { label: 'Usura 2025', value: '≈ 29.5% anual' },
    ],
  },
  {
    tag: 'Derecho Penal · Ejecución de Penas',
    pill: 'Penal · Ejecución · Tutela',
    title: 'Defensa penal con estrategia y presencia real',
    body: 'Cuartos de pena, redenciones por trabajo y estudio, libertad condicional y prisión domiciliaria. Vigilamos cada término procesal.',
    cta: 'Consultar urgente',
    ctaHref: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20penal%20urgente.',
    ctaWa: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20penal%20urgente.',
    ctaWaLabel: '314 830 9306',
    panelTitle: 'Cada día en prisión cuenta',
    panelBody: 'Gestionamos redenciones, libertad condicional y domiciliaria con rigor técnico y seguimiento real.',
    stats: [
      { label: 'Redención', value: '2×1 trabajo/estudio' },
      { label: 'Libertad condicional', value: '60% pena cumplida' },
      { label: 'Términos fiscalía', value: 'Max. 270 días' },
    ],
  },
];

export default function HeroCarrusel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    const tick = 60;
    const step = (tick / INTERVAL) * 100;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + step));
    }, tick);
    return () => clearInterval(id);
  }, [paused, current]);

  useEffect(() => {
    if (progress >= 100 && !paused) next();
  }, [progress, paused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden border-b border-border/60 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background photo */}
      <Image
        src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1920&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />

      {/* Premium overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,17,29,0.92),rgba(17,37,68,0.86))]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.10),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.12),transparent_36%)]" aria-hidden />
      <div className="absolute -left-24 top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" aria-hidden />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
        <div className="h-full bg-white/60" style={{ width: `${progress}%`, transition: 'width 60ms linear' }} />
      </div>

      {/* Two-column layout */}
      <div
        key={current}
        className="container section-shell relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        style={{ animation: 'fadeSlideUp 0.45s ease forwards' }}
      >
        {/* LEFT — main content */}
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
              {slide.tag}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-slate-300">{slide.pill}</span>
          </div>

          <h1 className="text-white leading-tight max-w-xl">{slide.title}</h1>

          <p className="max-w-lg text-lg text-slate-200 leading-relaxed">{slide.body}</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={slide.ctaHref}
              target={slide.ctaHref.startsWith('http') ? '_blank' : undefined}
              rel={slide.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
            >
              {slide.cta}
            </Link>
            <a
              href={slide.ctaWa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary border-white/40 bg-white/10 text-white hover:bg-white/18 hover:text-white flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25d366] shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              {slide.ctaWaLabel}
            </a>
          </div>
        </div>

        {/* RIGHT — panel glassmorphism */}
        <div className="flex flex-col gap-3">
          {/* Contact card */}
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-5 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              Castellanos Abogados
            </p>
            <p className="text-base font-semibold text-white leading-snug">{slide.panelTitle}</p>
            <p className="text-sm text-slate-300 leading-relaxed">{slide.panelBody}</p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {slide.stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/8 border border-white/10 p-2.5 text-center">
                  <p className="text-xs font-bold text-white leading-tight">{s.value}</p>
                  <p className="text-[10px] text-white/50 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/15 pt-3 space-y-2">
              <p className="text-[11px] text-white/40 uppercase tracking-[0.14em]">Contáctenos ahora</p>
              <a
                href={WA + '?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios.'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-white py-3 text-[15px] font-semibold text-ink shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition hover:bg-slate-50 active:scale-[0.98]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#25d366] shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                314 830 9306
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dots + arrows */}
      <div className="relative z-10 flex items-center gap-5 container pb-8 pt-2">
        <button onClick={prev} aria-label="Anterior"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition">
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M8 10L4 6l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
              className="relative h-2 overflow-hidden rounded-full transition-all duration-300"
              style={{ width: i === current ? '36px' : '8px', background: 'rgba(255,255,255,0.25)' }}>
              {i === current && (
                <span className="absolute left-0 top-0 h-full bg-white rounded-full"
                  style={{ width: `${progress}%`, transition: 'width 60ms linear' }} />
              )}
            </button>
          ))}
        </div>

        <button onClick={next} aria-label="Siguiente"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition">
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M4 10l4-4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
