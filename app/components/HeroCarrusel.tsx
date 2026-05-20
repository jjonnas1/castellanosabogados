'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.122 1.52 5.86L0 24l6.335-1.502A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.378l-.36-.213-3.732.885.899-3.628-.234-.373A9.772 9.772 0 0 1 2.182 12C2.182 6.568 6.568 2.182 12 2.182S21.818 6.568 21.818 12 17.432 21.818 12 21.818z" fill="#25D366"/>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
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
        className="container section-shell relative z-10 grid gap-8 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
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

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href={slide.ctaHref}
              className="btn-primary w-full justify-center bg-white !text-[#0d1528] shadow-hover hover:bg-slate-100 sm:w-auto sm:justify-start"
            >
              {slide.cta}
            </Link>
            <a
              href={slide.ctaWa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95 sm:w-auto"
            >
              <WhatsAppIcon size={16} />
              {slide.ctaWaLabel}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 space-y-5">
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

            <div className="pt-2 border-t border-white/10">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">{t.hero.contactNow}</p>
              <a
                href={slide.ctaWa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25d366] py-3 text-[15px] font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-[0.98]"
              >
                <WhatsAppIcon size={18} />
                <span className="font-bold">{PHONE_DISPLAY}</span>
              </a>
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
