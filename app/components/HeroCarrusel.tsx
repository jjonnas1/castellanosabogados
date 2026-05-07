'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  {
    tag: 'Derecho Laboral',
    title: 'Hacemos su liquidación laboral',
    body: 'Calculamos prima, cesantías, vacaciones e indemnización por despido. Que no le paguen de menos.',
    cta: 'Consultar liquidación',
    href: 'https://wa.me/573148309306?text=Hola%2C%20necesito%20que%20calculen%20mi%20liquidaci%C3%B3n%20laboral.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-blue-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
      </svg>
    ),
  },
  {
    tag: 'Derecho de Familia',
    title: 'Fijamos y reclamamos alimentos',
    body: 'Si el obligado no cumple con la cuota alimentaria, hay herramientas legales poderosas. Le asesoramos desde el primer día.',
    cta: 'Consultar caso de familia',
    href: 'https://wa.me/573148309306?text=Hola%2C%20necesito%20asesor%C3%ADa%20en%20alimentos%20o%20custodia.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-rose-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    tag: 'Derecho Civil',
    title: '¿Le subieron el arriendo ilegalmente?',
    body: 'El incremento está limitado por ley al IPC del año anterior. Cualquier cobro mayor es ilegal y puede revertirse.',
    cta: 'Revisar mi arrendamiento',
    href: 'https://wa.me/573148309306?text=Hola%2C%20quiero%20revisar%20si%20mi%20incremento%20de%20arriendo%20es%20legal.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-emerald-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
      </svg>
    ),
  },
  {
    tag: 'Derecho Penal',
    title: 'Defensa penal con estrategia real',
    body: 'Calculamos cuartos de pena, gestionamos redenciones y vigilamos los términos procesales para proteger su libertad.',
    cta: 'Hablar con un penalista',
    href: 'https://wa.me/573148309306?text=Hola%2C%20necesito%20asesor%C3%ADa%20penal%20urgente.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-violet-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    tag: 'Ejecución de Penas',
    title: 'Su familiar puede salir antes',
    body: 'Tramitamos redenciones por trabajo y estudio, prisión domiciliaria y libertad condicional. Cada día cuenta.',
    cta: 'Evaluar caso de libertad',
    href: 'https://wa.me/573148309306?text=Hola%2C%20quiero%20saber%20si%20mi%20familiar%20puede%20acceder%20a%20un%20beneficio.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-amber-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 1 1 8 0m-4 8v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z" />
      </svg>
    ),
  },
];

export default function HeroCarrusel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next, paused]);

  const slide = SLIDES[current];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-6 min-h-[220px] flex flex-col justify-between"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide content */}
      <div className="space-y-3 transition-all duration-300">
        <div className="flex items-center gap-2.5">
          {slide.icon}
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">{slide.tag}</span>
        </div>
        <h3 className="text-lg font-bold text-white leading-snug">{slide.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed">{slide.body}</p>
      </div>

      {/* CTA */}
      <div className="mt-5">
        <Link
          href={slide.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-white text-ink text-sm font-semibold px-4 py-2.5 hover:bg-slate-100 transition-colors shadow"
        >
          {slide.cta} →
        </Link>
      </div>

      {/* Dots + arrows */}
      <div className="mt-5 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={[
                'rounded-full transition-all duration-300',
                i === current
                  ? 'w-5 h-2 bg-white'
                  : 'w-2 h-2 bg-white/35 hover:bg-white/60',
              ].join(' ')}
            />
          ))}
        </div>
        {/* Arrows */}
        <div className="flex items-center gap-1">
          <button onClick={prev} aria-label="Anterior"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
              <path d="M8 10L4 6l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={next} aria-label="Siguiente"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
              <path d="M4 10l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
