'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteHeader from "./SiteHeader";
import HeroCarrusel from "./HeroCarrusel";
import WaIcon from "@/app/components/WaIcon";
import { buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

function CountUp({ target = 5.0, decimals = 1, duration = 1400 }: { target?: number; decimals?: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  function animate() {
    triggered.current = true;
    setValue(0);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered.current) animate(); },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className="text-5xl font-bold leading-none text-ink cursor-default"
      onMouseEnter={animate}
    >
      {value.toFixed(decimals)}
    </span>
  );
}

const googleReviewsUrl = "https://www.google.com/search?q=Castellanos+Abogados&hl=es-419#mpd=~18107842463722114174/customers/reviews";
const curatedGoogleReviews: Array<{ author: string; date: string; text: string }> = [
  {
    author: "Felipe León",
    date: "Mayo 2026",
    text: "Excelente profesional, recomendado al 100% para confiar en él cualquier proceso en las diferentes áreas del derecho.",
  },
  {
    author: "Stefanía Hernández",
    date: "Abril 2026",
    text: "Excelente abogado, responsable, dedicado y muy profesional.",
  },
  {
    author: "Idaly Arrubla Melo",
    date: "Abril 2026",
    text: "Genial la atención y la diligencia en los trámites. Super recomendado.",
  },
  {
    author: "Alejo Santa",
    date: "Abril 2026",
    text: "Excelente persona con calidad humana muy profesional, con experiencia, hábil, capaz, sincero y diligente.",
  },
  {
    author: "Christian Camilo Ceballos",
    date: "Abril 2026",
    text: "Muy profesional, buen servicio. Muchas gracias.",
  },
  {
    author: "Esperanza Inés Isaza Maya",
    date: "Abril 2026",
    text: "Excelente atención. La asesoría brindada fue clara, oportuna y precisa. Da la confianza de ser atendido por una persona altamente calificada.",
  },
];

const DARK = "#121622";
const DARK_GLOW = `radial-gradient(ellipse at 15% 0%, rgba(180,195,220,0.12) 0%, transparent 55%), ${DARK}`;

export default function HomeClient() {
  const { t } = useLanguage();
  const p = t.pages.home;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />
      <HeroCarrusel />

      {/* ── SERVICIOS + PORTAL (oscuro) ───────────────────────────── */}
      <section className="section-shell overflow-hidden text-white" style={{ background: DARK_GLOW }}>
        <div className="container space-y-14">

          {/* Portal del cliente */}
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" data-reveal data-reveal-delay="1">
            <div className="max-w-xl space-y-6">
              <div className="space-y-3">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/20">
                  {p.portalBadge}
                </span>
                <h2 className="text-balance text-white">{p.portalTitle}</h2>
                <p className="text-lg leading-relaxed text-slate-300">{p.portalSubtitle}</p>
              </div>

              <div className="grid gap-3">
                {[p.portalFeature1, p.portalFeature2, p.portalFeature3].map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#121622]">
                      <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
                        <path d="M4 10.5 8 14l8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="text-sm leading-relaxed text-slate-200">{feature}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/cliente/login"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#121622] shadow-[0_8px_24px_rgba(255,255,255,0.12)] transition hover:-translate-y-0.5 hover:bg-slate-100 sm:w-auto"
              >
                {p.portalLink}
              </Link>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-10 text-center shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-white" aria-hidden>
                    <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.35" />
                    <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="mt-5 text-lg font-semibold text-white">Tu expediente, siempre disponible</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Documentos, actuaciones y citas del proceso, accesibles desde tu celular las 24 horas.
                </p>
                <span className="mt-5 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300">
                  Disponible 24/7
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ABOGADOS A DOMICILIO (destacado) ──────────────────────── */}
      <section className="section-shell bg-surface" data-reveal>
        <div className="container">
          <article
            className="relative overflow-hidden rounded-3xl px-6 py-8 text-white shadow-[0_18px_50px_rgba(123,30,43,0.28)] sm:px-12 sm:py-12"
            style={{ background: "linear-gradient(135deg,#7b1e2b 0%,#5c141f 100%)" }}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.14),transparent_45%),radial-gradient(circle_at_88%_0%,rgba(255,255,255,0.08),transparent_42%)]"
              aria-hidden
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white ring-1 ring-white/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Nuevo servicio
                </span>
                <h2 className="text-balance text-white">Abogados a domicilio</h2>
                <p className="text-lg leading-relaxed text-white/85">
                  Enviamos tu abogado a la casa, oficina o el lugar donde lo requieras. Atención jurídica presencial y
                  personalizada, sin que tengas que desplazarte.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/abogado-a-domicilio"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#7b1e2b] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Conocer el servicio
                </Link>
                <a
                  href={buildWhatsAppUrl({
                    area: "Abogados a domicilio",
                    source: "/#domicilio",
                    message: "Hola, quisiera solicitar una visita de abogado a domicilio.",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  <WaIcon size={16} />
                  Solicitar visita
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── RESEÑAS (claro) ───────────────────────────────────────── */}
      <section className="section-shell bg-canvas" data-reveal>
        <div className="container space-y-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="pill w-fit">{p.googleReviews.badge}</p>
              <h2 className="text-balance">{p.googleReviews.title}</h2>
              <p className="max-w-xl text-muted">{p.googleReviews.subtitle}</p>
            </div>
            <div className="shrink-0 rounded-2xl border border-border bg-white p-5 shadow-[0_2px_16px_rgba(15,23,42,0.07)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{p.googleReviews.ratingLabel}</p>
              <div className="mt-2 flex items-baseline gap-2.5">
                <CountUp target={5.0} />
                <span className="flex text-xl text-amber-400 leading-none" aria-label="5 estrellas">★★★★★</span>
              </div>
              <div className="mt-3 border-t border-border/60 pt-3">
                <p className="text-sm font-semibold text-ink">{p.googleReviews.source}</p>
                <p className="text-xs text-muted">{p.googleReviews.sourceNote}</p>
              </div>
              <Link
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 w-full justify-center sm:w-auto"
              >
                {p.googleReviews.cta}
              </Link>
            </div>
          </div>

          {curatedGoogleReviews.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {curatedGoogleReviews.map((review, idx) => (
                <article
                  key={`${review.author}-${review.date}`}
                  className="flex flex-col rounded-2xl border border-border bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]"
                  data-reveal
                  data-reveal-delay={String((idx % 3) + 1)}
                >
                  <div className="flex gap-0.5 text-amber-400 text-sm" aria-label="5 estrellas">★★★★★</div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">"{review.text}"</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{review.author}</p>
                      <p className="text-xs text-muted">{review.date}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ (blanco) ──────────────────────────────────────────── */}
      <section className="section-shell bg-white border-y border-border/50">
        <div className="container max-w-3xl space-y-6" data-reveal>
          <div className="space-y-2">
            <p className="pill w-fit">{p.faqBadge}</p>
            <h2>{p.faqTitle}</h2>
          </div>
          <div className="divide-y divide-border">
            {p.faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                  {item.q}
                  <svg className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" viewBox="0 0 12 8" fill="none" aria-hidden>
                    <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL (oscuro — idéntico a sección servicios) ─────── */}
      <section className="section-shell text-white" style={{ background: DARK_GLOW }} data-reveal>
        <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400/60">Castellanos Abogados</p>
            <h2 className="text-white">¿Listo para empezar?</h2>
            <p className="text-slate-300 text-lg">Cuéntenos su caso y definimos la ruta en 24-48 horas.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({ message: "Hola, necesito orientación jurídica." })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
            >
              <WaIcon size={16} />
              Contactar por WhatsApp
            </a>
            <Link href="/contacto" className="inline-flex items-center justify-center rounded-full border-2 border-white/50 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-white active:scale-95">
              Formulario de contacto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
