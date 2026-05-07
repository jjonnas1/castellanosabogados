'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const WA = 'https://wa.me/573148309306';
const INTERVAL = 5500;

export default function HeroCarrusel() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDES = [
    {
      tag: 'Castellanos Abogados · Pereira',
      pill: 'Corporativo · Personas · Ejecución · Formación',
      title: t.hero.slide1.title,
      body: t.hero.slide1.subtitle,
      cta: t.hero.slide1.cta,
      ctaHref: '/servicios',
      ctaWa: WA + '?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios%20legales.',
      ctaWaLabel: t.contact.whatsapp,
      panelTitle: t.contact.title,
      panelBody: 'Atendemos en Pereira y todo el Eje Cafetero. Primera consulta de diagnóstico.',
      stats: [
        { label: t.hero.slide1.stats.item1.label, value: t.hero.slide1.stats.item1.value },
        { label: t.hero.slide1.stats.item2.label, value: t.hero.slide1.stats.item2.value },
        { label: t.hero.slide1.stats.item3.label, value: t.hero.slide1.stats.item3.value },
      ],
    },
    {
      tag: 'Derecho Laboral',
      pill: 'Ley 789 de 2002 · Art. 64 CST',
      title: t.hero.slide2.title,
      body: t.hero.slide2.subtitle,
      cta: t.hero.slide2.cta,
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
    }
  ];

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
    setProgress(0);
  }, [SLIDES.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, [SLIDES.length]);

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
      <Image
        src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1920&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,17,29,0.92),rgba(17,37,68,0.86))]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.10),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.12),transparent_36%)]" aria-hidden />

      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-20">
        <div className="h-full bg-white/60" style={{ width: `${progress}%`, transition: 'width 60ms linear' }} />
      </div>

      <div
        key={current}
        className="container section-shell relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        style={{ animation: 'fadeSlideUp 0.45s ease forwards' }}
      >
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
              {slide.ctaWaLabel}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-5 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              Castellanos Abogados
            </p>
            <p className="text-base font-semibold text-white leading-snug">{slide.panelTitle}</p>
            <p className="text-sm text-slate-300 leading-relaxed">{slide.panelBody}</p>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {slide.stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/8 border border-white/10 p-2.5 text-center">
                  <p className="text-xs font-bold text-white leading-tight">{s.value}</p>
                  <p className="text-[10px] text-white/50 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-5 container pb-8 pt-2">
        <button onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition">
          ←
        </button>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="relative h-2 overflow-hidden rounded-full transition-all duration-300"
              style={{ width: i === current ? '36px' : '8px', background: 'rgba(255,255,255,0.25)' }}>
              {i === current && (
                <span className="absolute left-0 top-0 h-full bg-white rounded-full"
                  style={{ width: `${progress}%`, transition: 'width 60ms linear' }} />
              )}
            </button>
          ))}
        </div>
        <button onClick={next} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition">
          →
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
