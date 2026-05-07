'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';

const WA = 'https://wa.me/573148309306';
const INTERVAL = 5500;

const SLIDES = [
  {
    tag: 'Castellanos Abogados · Pereira',
    title: 'Firma jurídica integral en el Eje Cafetero con criterio técnico y acompañamiento real',
    body: 'Derecho penal, civil, familia, laboral, administrativo, ejecución de penas y tutelas. Diagnóstico claro y presencia en cada etapa de su proceso.',
    cta: 'Ver servicios',
    ctaHref: '/servicios',
    ctaSecondary: 'Consultar por WhatsApp',
    ctaSecondaryHref: WA + '?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios%20legales.',
    pill: 'Corporativo · Personas · Ejecución · Formación',
  },
  {
    tag: 'Derecho Laboral',
    title: 'Hacemos su liquidación laboral completa',
    body: 'Prima de servicios, cesantías, vacaciones e indemnización por despido. Si lo despidieron sin justa causa, calculamos exactamente cuánto le deben. No acepte menos.',
    cta: 'Consultar liquidación',
    ctaHref: WA + '?text=Hola%2C%20necesito%20que%20calculen%20mi%20liquidaci%C3%B3n%20laboral.',
    ctaSecondary: '314 830 9306',
    ctaSecondaryHref: WA,
    pill: 'Ley 789 de 2002 · Art. 64 CST',
  },
  {
    tag: 'Derecho de Familia',
    title: 'Fijamos y reclamamos cuotas de alimentos',
    body: 'Si el obligado no cumple, hay herramientas legales inmediatas: embargo de bienes, arresto por desacato y actualización de mora. Le asesoramos desde el primer día.',
    cta: 'Hablar con un abogado',
    ctaHref: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20en%20alimentos%20o%20custodia.',
    ctaSecondary: '314 830 9306',
    ctaSecondaryHref: WA,
    pill: 'Alimentos · Custodia · Divorcio',
  },
  {
    tag: 'Derecho Civil e Inmobiliario',
    title: '¿Le subieron el arriendo más de lo legal?',
    body: 'La Ley 820 de 2003 limita el incremento al IPC del año anterior. Todo cobro mayor es ilegal y puede revertirse. También tramitamos deudas, contratos y prescripciones.',
    cta: 'Revisar mi caso',
    ctaHref: WA + '?text=Hola%2C%20quiero%20revisar%20si%20mi%20incremento%20de%20arriendo%20es%20legal.',
    ctaSecondary: '314 830 9306',
    ctaSecondaryHref: WA,
    pill: 'Arriendos · Obligaciones · Contratos',
  },
  {
    tag: 'Derecho Penal · Ejecución de Penas',
    title: 'Defensa penal con estrategia y presencia real',
    body: 'Cuartos de pena, redenciones por trabajo y estudio, libertad condicional y prisión domiciliaria. Vigilamos los términos procesales para proteger su libertad.',
    cta: 'Consultar urgente',
    ctaHref: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20penal%20urgente.',
    ctaSecondary: '314 830 9306',
    ctaSecondaryHref: WA,
    pill: 'Penal · Ejecución de Penas · Tutela',
  },
];

export default function HeroCarrusel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(progress);
  progressRef.current = progress;

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

  // Progress tick
  useEffect(() => {
    if (paused) return;
    const tick = 60;
    const step = (tick / INTERVAL) * 100;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0;
        return p + step;
      });
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

      {/* Premium dark overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,17,29,0.92),rgba(17,37,68,0.86))]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.10),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.12),transparent_36%)]" aria-hidden />
      <div className="absolute -left-24 top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" aria-hidden />

      {/* Progress bar — top edge */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
        <div
          className="h-full bg-white/60"
          style={{ width: `${progress}%`, transition: 'width 60ms linear' }}
        />
      </div>

      {/* Content */}
      <div
        key={current}
        className="container section-shell relative z-10"
        style={{ animation: 'fadeSlideUp 0.45s ease forwards' }}
      >
        <div className="max-w-2xl space-y-7">
          {/* Pills */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
              {slide.tag}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-slate-300">
              {slide.pill}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-white leading-tight">{slide.title}</h1>

          {/* Body */}
          <p className="max-w-xl text-lg text-slate-200 leading-relaxed">{slide.body}</p>

          {/* CTAs */}
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
              href={slide.ctaSecondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary border-white/40 bg-white/10 text-white hover:bg-white/18 hover:text-white flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25d366] shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              {slide.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Dots + arrows — bottom */}
      <div className="relative z-10 flex items-center justify-start gap-5 container pb-8">
        <button onClick={prev} aria-label="Anterior"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition">
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M8 10L4 6l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="relative h-2 overflow-hidden rounded-full transition-all duration-300"
              style={{ width: i === current ? '36px' : '8px', background: 'rgba(255,255,255,0.25)' }}
            >
              {i === current && (
                <span
                  className="absolute left-0 top-0 h-full bg-white rounded-full"
                  style={{ width: `${progress}%`, transition: 'width 60ms linear' }}
                />
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
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
