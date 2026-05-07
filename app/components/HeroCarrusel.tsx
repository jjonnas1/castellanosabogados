'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

const WA = 'https://wa.me/573148309306';

const SLIDES = [
  {
    tag: 'Castellanos Abogados · Pereira',
    title: 'Firma jurídica integral en el Eje Cafetero',
    body: 'Derecho penal, civil, familia, laboral, administrativo y ejecución de penas. Diagnóstico claro, estrategia definida y presencia en cada etapa de su proceso.',
    cta: 'Ver servicios',
    ctaHref: '/servicios',
    ctaStyle: 'primary',
    accent: 'from-[#0c111d] to-[#112544]',
  },
  {
    tag: 'Derecho Laboral',
    title: 'Hacemos su liquidación laboral completa',
    body: 'Prima de servicios, cesantías, vacaciones e indemnización por despido. Si lo despidieron sin justa causa, calculamos exactamente cuánto le deben.',
    cta: 'Consultar por WhatsApp',
    ctaHref: WA + '?text=Hola%2C%20necesito%20que%20calculen%20mi%20liquidaci%C3%B3n%20laboral.',
    ctaStyle: 'wa',
    accent: 'from-[#0c1e3a] to-[#0d2255]',
  },
  {
    tag: 'Derecho de Familia',
    title: 'Fijamos y reclamamos cuotas de alimentos',
    body: 'Si el obligado no paga, hay herramientas legales inmediatas: embargo, arresto por desacato, actualización de mora. Le asesoramos desde el primer día.',
    cta: 'Hablar con un abogado',
    ctaHref: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20en%20alimentos%20o%20custodia.',
    ctaStyle: 'wa',
    accent: 'from-[#1a0c1e] to-[#2a0d3a]',
  },
  {
    tag: 'Derecho Civil e Inmobiliario',
    title: '¿Le subieron el arriendo más de lo legal?',
    body: 'La ley limita el incremento al IPC del año anterior. Todo cobro mayor es ilegal. También tramitamos deudas civiles, prescripciones y contratos.',
    cta: 'Revisar mi caso',
    ctaHref: WA + '?text=Hola%2C%20quiero%20revisar%20si%20mi%20incremento%20de%20arriendo%20es%20legal.',
    ctaStyle: 'wa',
    accent: 'from-[#0c1e18] to-[#0d2d1a]',
  },
  {
    tag: 'Derecho Penal',
    title: 'Defensa penal con criterio técnico y real',
    body: 'Calculamos cuartos de pena, gestionamos redenciones, tramitamos libertad condicional y prisión domiciliaria. Su libertad es nuestra prioridad.',
    cta: 'Consultar urgente',
    ctaHref: WA + '?text=Hola%2C%20necesito%20asesor%C3%ADa%20penal%20urgente.',
    ctaStyle: 'wa',
    accent: 'from-[#130c1e] to-[#1e0d35]',
  },
];

export default function HeroCarrusel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 400);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  const slide = SLIDES[current];

  return (
    <section
      className={`relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${slide.accent} transition-all duration-700`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.07),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_40%)]" aria-hidden />
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-white/5 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-white/5 blur-3xl pointer-events-none" aria-hidden />

      {/* Slide content */}
      <div
        key={current}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-7"
        style={{ animation: 'fadeSlideUp 0.45s ease forwards' }}
      >
        {/* Tag */}
        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 ring-1 ring-white/20">
          {slide.tag}
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
          {slide.title}
        </h1>

        {/* Body */}
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
          {slide.body}
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href={slide.ctaHref}
            target={slide.ctaStyle === 'wa' ? '_blank' : undefined}
            rel={slide.ctaStyle === 'wa' ? 'noopener noreferrer' : undefined}
            className={
              slide.ctaStyle === 'wa'
                ? 'inline-flex items-center gap-2.5 bg-[#25d366] hover:bg-[#20bd5a] text-white font-bold px-7 py-4 rounded-2xl text-base shadow-xl transition-all active:scale-95'
                : 'inline-flex items-center gap-2.5 bg-white text-[#0c111d] hover:bg-slate-100 font-bold px-7 py-4 rounded-2xl text-base shadow-xl transition-all active:scale-95'
            }
          >
            {slide.ctaStyle === 'wa' && (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            )}
            {slide.cta}
          </Link>

          {/* WhatsApp number always visible */}
          <a
            href={WA + '?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios.'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25d366] shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            314 830 9306
          </a>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 flex items-center gap-6 pb-10">
        {/* Prev */}
        <button onClick={prev} aria-label="Anterior"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition">
          <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5">
            <path d="M8 10L4 6l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a slide ${i + 1}`}
              className={[
                'rounded-full transition-all duration-400',
                i === current
                  ? 'w-8 h-2.5 bg-white'
                  : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60',
              ].join(' ')}
            />
          ))}
        </div>

        {/* Next */}
        <button onClick={next} aria-label="Siguiente"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition">
          <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5">
            <path d="M4 10l4-4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
