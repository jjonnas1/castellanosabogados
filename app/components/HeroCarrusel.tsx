'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

const WA = 'https://wa.me/573148309306';
const INTERVAL = 5000;

const SLIDES = [
  {
    tag: 'Castellanos Abogados · Pereira',
    title: 'Firma jurídica integral en el Eje Cafetero',
    body: 'Penal, civil, familia, laboral y ejecución de penas. Diagnóstico claro, estrategia definida.',
    cta: 'Ver servicios',
    ctaHref: '/servicios',
    ctaStyle: 'white',
    color: '#0f1e38',
  },
  {
    tag: '⚖ Derecho Laboral',
    title: 'Hacemos su liquidación laboral completa',
    body: 'Prima, cesantías, vacaciones e indemnización. Si lo despidieron sin justa causa, calculamos cuánto le deben.',
    cta: 'Consultar por WhatsApp',
    ctaHref: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20sobre%20mi%20liquidaci%C3%B3n%20laboral.',
    ctaStyle: 'wa',
    color: '#0c1d3a',
  },
  {
    tag: '👨‍👩‍👧 Derecho de Familia',
    title: 'Fijamos y reclamamos cuotas de alimentos',
    body: 'Si el obligado no paga, hay herramientas legales inmediatas: embargo y arresto por desacato.',
    cta: 'Hablar con un abogado',
    ctaHref: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20en%20alimentos%20o%20custodia.',
    ctaStyle: 'wa',
    color: '#1a0d2e',
  },
  {
    tag: '🏠 Derecho Civil',
    title: '¿Le subieron el arriendo más de lo legal?',
    body: 'El incremento está limitado por ley al IPC del año anterior. Todo cobro mayor puede revertirse.',
    cta: 'Revisar mi caso',
    ctaHref: WA + '?text=Hola%2C%20quiero%20revisar%20si%20mi%20incremento%20de%20arriendo%20es%20legal.',
    ctaStyle: 'wa',
    color: '#0c201a',
  },
  {
    tag: '🛡 Derecho Penal',
    title: 'Defensa penal con criterio técnico y real',
    body: 'Cuartos de pena, redenciones, libertad condicional y prisión domiciliaria. Su libertad es nuestra prioridad.',
    cta: 'Consultar urgente',
    ctaHref: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20penal%20urgente.',
    ctaStyle: 'wa',
    color: '#150d2a',
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
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  // Progress bar tick
  useEffect(() => {
    if (paused) return;
    const tick = 50; // ms
    const step = (tick / INTERVAL) * 100;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          return 0;
        }
        return p + step;
      });
    }, tick);
    return () => clearInterval(id);
  }, [paused, current]);

  // Auto-advance when progress hits 100
  useEffect(() => {
    if (progress >= 100 && !paused) {
      next();
    }
  }, [progress, paused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden border-b border-white/10 text-white"
      style={{ background: slide.color, transition: 'background 0.6s ease' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.06), transparent)' }} />

      {/* Progress bar — top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
        <div
          className="h-full bg-white/70 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide */}
      <div
        key={current}
        className="container relative z-10 flex flex-col items-center text-center py-20 md:py-24 gap-5 max-w-3xl mx-auto"
        style={{ animation: 'fadeUp 0.4s ease forwards' }}
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
          {slide.tag}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {slide.title}
        </h1>

        <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
          {slide.body}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
          {/* Main CTA */}
          <Link
            href={slide.ctaHref}
            target={slide.ctaStyle === 'wa' ? '_blank' : undefined}
            rel={slide.ctaStyle === 'wa' ? 'noopener noreferrer' : undefined}
            className={
              slide.ctaStyle === 'wa'
                ? 'inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#1fb85a] text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-lg transition-all active:scale-95'
                : 'inline-flex items-center gap-2 bg-white text-[#0f1e38] hover:bg-slate-100 font-semibold px-6 py-3 rounded-xl text-sm shadow-lg transition-all active:scale-95'
            }
          >
            {slide.ctaStyle === 'wa' && (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            )}
            {slide.cta}
          </Link>

          {/* WhatsApp number — always visible */}
          <a
            href={WA + '?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios.'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25d366] shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            314 830 9306
          </a>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 flex items-center justify-center gap-5 pb-8">
        <button onClick={prev} aria-label="Anterior"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition">
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M8 10L4 6l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dot progress indicators */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="relative h-2 overflow-hidden rounded-full transition-all duration-300"
              style={{ width: i === current ? '32px' : '8px', background: 'rgba(255,255,255,0.25)' }}
            >
              {i === current && (
                <span
                  className="absolute left-0 top-0 h-full bg-white rounded-full"
                  style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
