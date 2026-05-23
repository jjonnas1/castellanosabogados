'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

function WhatsAppIcon({ size = 18, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.122 1.52 5.86L0 24l6.335-1.502A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.378l-.36-.213-3.732.885.899-3.628-.234-.373A9.772 9.772 0 0 1 2.182 12C2.182 6.568 6.568 2.182 12 2.182S21.818 6.568 21.818 12 17.432 21.818 12 21.818z" fill={color}/>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill={color}/>
    </svg>
  );
}

const WA = 'https://wa.me/573148309306';
const PHONE_DISPLAY = '314 830 9306';
const INTERVAL = 5500;

export default function HeroCarrusel() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDES = ((t.hero as any).serviceSlides as Array<{
    tag: string; pill: string; title: string; subtitle: string;
    cta: string; href: string; whatsappText: string;
    panelTitle: string; panelBody: string;
    languages?: string[];
    stats: { item1: { label: string; value: string }; item2: { label: string; value: string }; item3: { label: string; value: string } };
  }>).map((s) => ({
    tag: s.tag,
    pill: s.pill,
    title: s.title,
    body: s.subtitle,
    cta: s.cta,
    ctaHref: s.href,
    ctaWa: `${WA}?text=${encodeURIComponent(s.whatsappText)}`,
    ctaWaLabel: PHONE_DISPLAY,
    panelTitle: s.panelTitle,
    panelBody: s.panelBody,
    languages: s.languages ?? [],
    stats: [
      { label: s.stats.item1.label, value: s.stats.item1.value },
      { label: s.stats.item2.label, value: s.stats.item2.value },
      { label: s.stats.item3.label, value: s.stats.item3.value },
    ],
  }));

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

  const [heroNombre, setHeroNombre] = useState('');
  const [heroCaso, setHeroCaso]     = useState('');
  const heroFormRef = useRef<HTMLFormElement>(null);

  function handleHeroSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = `Hola, soy ${heroNombre.trim() || 'un visitante de su página'}. Mi situación: ${heroCaso.trim() || '...'}`;
    window.open(`https://wa.me/573148309306?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setHeroNombre('');
    setHeroCaso('');
  }

  return (
    <section
      className="relative overflow-hidden border-b border-white/[0.06] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Imagen de fondo */}
      <Image
        src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1920&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-[1.02]"
        aria-hidden="true"
      />

      {/* Capas de overlay — más cálidas y profundas */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,10,16,0.96)_0%,rgba(18,24,36,0.90)_50%,rgba(10,14,22,0.94)_100%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_30%,rgba(201,168,76,0.07)_0%,transparent_45%),radial-gradient(ellipse_at_85%_10%,rgba(255,255,255,0.04)_0%,transparent_35%)]" aria-hidden />

      {/* Barra de progreso — acento dorado */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.06] z-20">
        <div
          className="h-full bg-gradient-to-r from-amber-300/70 to-amber-200/50 rounded-full"
          style={{ width: `${progress}%`, transition: 'width 60ms linear' }}
        />
      </div>

      {/* Contenido principal */}
      <div
        key={current}
        className="container section-shell relative z-10 grid gap-10 lg:gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
        style={{ animation: 'fadeSlideUp 0.45s ease forwards' }}
      >
        {/* ── Columna izquierda: copy ── */}
        <div className="space-y-7">
          {/* Badge + etiqueta de servicio */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
              {slide.tag}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">{slide.pill}</span>
          </div>

          <h1 className="text-white leading-tight max-w-xl">{slide.title}</h1>
          <p className="max-w-lg text-[17px] text-slate-300 leading-relaxed">{slide.body}</p>

          {slide.languages.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/35 mr-1">
                Atendemos en
              </span>
              {slide.languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-white/25 bg-white/[0.08] px-3.5 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          )}

          {/* CTAs — botón blanco premium + teléfono glass */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href={slide.ctaHref}
              className="btn-primary w-full justify-center bg-white !text-[#0a0c12] font-bold shadow-[0_8px_28px_rgba(255,255,255,0.15)] hover:bg-slate-100 hover:shadow-[0_12px_36px_rgba(255,255,255,0.20)] sm:w-auto sm:justify-start transition-all duration-200"
            >
              {slide.cta}
            </Link>
            <a
              href={slide.ctaWa}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/[0.10] px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/[0.18] hover:border-white/40 active:scale-95 sm:w-auto"
            >
              <WhatsAppIcon size={15} color="#4ade80" />
              {slide.ctaWaLabel}
            </a>
          </div>
        </div>

        {/* ── Columna derecha: formulario + panel ── */}
        <div className="flex flex-col gap-3">

          {/* Formulario de captación — premium, sin ring verde */}
          <form
            ref={heroFormRef}
            onSubmit={handleHeroSubmit}
            className="rounded-2xl bg-white/[0.97] backdrop-blur-xl p-5 space-y-3 shadow-[0_28px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)]"
          >
            <div className="flex items-center gap-2 pb-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                Consulta gratuita
              </p>
            </div>

            <input
              type="text"
              placeholder="Tu nombre"
              value={heroNombre}
              onChange={e => setHeroNombre(e.target.value)}
              className="w-full rounded-xl bg-gray-50 border border-gray-200/80 px-3.5 py-2.5 text-[16px] sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition"
            />
            <input
              type="text"
              placeholder="¿Cuál es tu situación legal?"
              value={heroCaso}
              onChange={e => setHeroCaso(e.target.value)}
              className="w-full rounded-xl bg-gray-50 border border-gray-200/80 px-3.5 py-2.5 text-[16px] sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-300/50 focus:border-slate-400 transition"
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#128c7e] hover:bg-[#0e7a6e] py-3 text-[14.5px] font-semibold text-white shadow-sm transition-all duration-200 active:scale-[0.98]"
            >
              <WhatsAppIcon size={16} />
              Escribir por WhatsApp
            </button>
            <p className="text-center text-[10.5px] text-gray-400">Sin compromiso · Respuesta en minutos</p>
          </form>

          {/* Panel informativo — dark glass */}
          <div className="rounded-2xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                Castellanos Abogados
              </p>
              <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-200/80">
                Pereira · Eje Cafetero
              </span>
            </div>
            <p className="text-[15px] font-semibold text-white leading-snug">{slide.panelTitle}</p>
            <p className="text-[13px] text-slate-300/80 leading-relaxed">{slide.panelBody}</p>

            <div className="grid grid-cols-3 gap-2 pt-0.5">
              {slide.stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/[0.09] bg-white/[0.05] p-2.5 text-center">
                  <p className="text-sm font-bold text-amber-200/90 leading-tight">{s.value}</p>
                  <p className="text-[10px] text-white/40 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Controles del carrusel ── */}
      <div className="relative z-10 flex items-center gap-4 container pb-8 pt-2">
        <button
          onClick={prev}
          aria-label="Diapositiva anterior"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-white/70 backdrop-blur-sm transition hover:bg-white/[0.15] hover:text-white hover:border-white/30"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a diapositiva ${i + 1}`}
              className="relative overflow-hidden rounded-full transition-all duration-300"
              style={{ width: i === current ? '32px' : '7px', height: '7px', background: i === current ? 'rgba(251,191,36,0.35)' : 'rgba(255,255,255,0.18)' }}
            >
              {i === current && (
                <span
                  className="absolute left-0 top-0 h-full bg-amber-300/80 rounded-full"
                  style={{ width: `${progress}%`, transition: 'width 60ms linear' }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Siguiente diapositiva"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-white/70 backdrop-blur-sm transition hover:bg-white/[0.15] hover:text-white hover:border-white/30"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        <span className="ml-auto text-[11px] font-semibold tabular-nums text-white/30">
          {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
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
