'use client';

import Link from "next/link";
import SiteHeader from "./SiteHeader";
import HeroCarrusel from "./HeroCarrusel";
import { buildMailtoUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceHrefs = [
  "/servicios/penal-personas",
  "/servicios/ejecucion-penas",
  "/servicios/responsabilidad-penal-pj",
  "/servicios/capacitaciones-penal-pj",
  "/servicios/civil",
  "/servicios/familia",
  "/servicios/laboral",
  "/servicios/administrativo",
];

const serviceAreas = [
  "Penal Personas",
  "Ejecución de Penas",
  "Responsabilidad Penal PJ",
  "Capacitaciones Penal PJ",
  "Civil",
  "Familia",
  "Laboral",
  "Administrativo",
];

const serviceIntents = [
  "linea-penal-personas",
  "linea-ejecucion-penas",
  "linea-rppj",
  "linea-capacitaciones",
  "linea-civil",
  "linea-familia",
  "linea-laboral",
  "linea-administrativo",
];

const mobilePriority = [1, 0, 5];
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

export default function HomeClient() {
  const { t } = useLanguage();
  const p = t.pages.home;

  function serviceRequestLink(idx: number) {
    return buildMailtoUrl({
      area: serviceAreas[idx],
      source: "/",
      subject: `Solicitud de contacto – ${serviceAreas[idx]}`,
      message: "Hola, quisiera solicitar orientación sobre esta línea.",
      intent: serviceIntents[idx],
    });
  }

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />
      <HeroCarrusel />

      {/* ÁREAS DE PRÁCTICA */}
      <section className="section-shell overflow-hidden bg-surface">
        <div className="container space-y-7">
          <div className="max-w-2xl space-y-2">
            <p className="pill w-fit">{p.practiceBadge}</p>
            <h2 className="text-balance">{p.practiceTitle}</h2>
          </div>
          <div className="space-y-3 sm:hidden">
            <div className="grid gap-3">
              {mobilePriority.map((idx) => {
                const line = p.services[idx];
                return (
                  <article key={line.title} className="card-shell p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-700">
                      {serviceAreas[idx]}
                    </p>
                    <h3 className="mt-2 text-[21px] leading-snug text-ink">{line.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{line.description}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <a href={serviceRequestLink(idx)} className="btn-primary flex-1 px-4 py-2.5 text-xs">
                        {t.common.request}
                      </a>
                      <Link href={serviceHrefs[idx]} className="text-xs font-semibold text-muted underline-offset-4 hover:text-ink hover:underline">
                        {t.common.viewDetail}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <details className="card-shell overflow-hidden bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-ink">
                {t.common.viewServices}
                <svg className="h-4 w-4 shrink-0 text-muted" viewBox="0 0 12 8" fill="none" aria-hidden>
                  <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="divide-y divide-border border-t border-border">
                {p.services.map((line, idx) => (
                  <div key={line.title} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base leading-snug text-ink">{line.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{line.description}</p>
                      </div>
                      <Link href={serviceHrefs[idx]} className="shrink-0 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold text-ink">
                        {t.common.viewDetail}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-4">
            {p.services.map((line, idx) => (
              <article key={line.title} className="card-shell flex h-full flex-col justify-between p-5 sm:p-6">
                <div className="space-y-2.5">
                  <h3 className="text-[20px] leading-snug text-ink sm:text-lg">{line.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted sm:text-sm">{line.description}</p>
                </div>
                <div className="mt-5 grid gap-2 text-sm sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                  <Link href={serviceHrefs[idx]} className="btn-secondary w-full px-4 py-2.5 text-xs sm:w-auto sm:text-sm">{t.common.viewDetail}</Link>
                  <a
                    href={serviceRequestLink(idx)}
                    className="btn-primary w-full px-4 py-2.5 text-xs sm:w-auto sm:text-sm"
                  >
                    {t.common.request}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PORTAL DEL CLIENTE */}
      <section
        className="section-shell overflow-hidden bg-gradient-to-br from-panel via-surface to-panel border-y border-border/70 text-ink dark:bg-gradient-to-br dark:from-[#08111f] dark:via-[#162842] dark:to-[#0b1322] dark:border-slate-800 dark:text-white"
      >
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-xl space-y-6">
            <div className="space-y-3">
              <span className="inline-flex rounded-full bg-accent-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-700 ring-1 ring-accent-700/20 dark:bg-white/10 dark:text-white dark:ring-white/25">
                {p.portalBadge}
              </span>
              <h2 className="text-balance text-ink dark:text-white">{p.portalTitle}</h2>
              <p className="text-lg leading-relaxed text-muted dark:text-slate-300">{p.portalSubtitle}</p>
            </div>

            <div className="grid gap-3">
              {[p.portalFeature1, p.portalFeature2, p.portalFeature3].map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3 dark:border-white/10 dark:bg-white/[0.06] backdrop-blur">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white dark:bg-white dark:text-[#13233b]">
                    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M4 10.5 8 14l8-8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-sm leading-relaxed text-muted dark:text-slate-200">{feature}</p>
                </div>
              ))}
            </div>

            <Link
              href="/cliente/login"
              className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-accent-700 sm:w-auto dark:bg-white dark:text-[#101a2d] dark:shadow-[0_18px_45px_rgba(255,255,255,0.16)] dark:hover:bg-slate-100"
            >
              {p.portalLink}
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-blue-400/10 dark:bg-blue-400/15 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-panel p-3 shadow-soft dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
              <div className="rounded-[1.45rem] border border-border bg-card dark:border-white/10 dark:bg-[#07111f]">
                <div className="flex items-center justify-between border-b border-border dark:border-white/10 px-4 py-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-700 dark:text-blue-200/70">Panel del cliente</p>
                    <p className="mt-0.5 text-sm font-semibold text-ink dark:text-white">Expediente activo</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800 ring-1 ring-emerald-700/20 dark:bg-emerald-400/15 dark:text-emerald-200 dark:ring-emerald-300/25">
                    En seguimiento
                  </span>
                </div>

                <div className="grid gap-3 p-4 sm:grid-cols-[0.95fr_1.05fr]">
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-border bg-panel p-4 dark:border-white/10 dark:bg-white/[0.06]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Próxima cita</p>
                      <p className="mt-2 text-2xl font-bold text-ink dark:text-white">10:30 a. m.</p>
                      <p className="mt-1 text-xs text-muted dark:text-slate-400">Revisión de estrategia</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-panel p-4 dark:border-white/10 dark:bg-white/[0.06]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Documentos</p>
                      <div className="mt-3 space-y-2">
                        {['Poder firmado', 'Soportes del caso', 'Actuación reciente'].map((item) => (
                          <div key={item} className="flex items-center justify-between rounded-xl bg-card border border-border/50 px-3 py-2 text-xs text-muted dark:border-0 dark:bg-white/[0.06] dark:text-slate-200">
                            <span>{item}</span>
                            <span className="h-2 w-2 rounded-full bg-accent-500 dark:bg-blue-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-panel p-4 dark:border-white/10 dark:bg-white/[0.06]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Línea de tiempo</p>
                    <div className="mt-4 space-y-4">
                      {[
                        ['Hoy', 'Actualización cargada en el expediente'],
                        ['Ayer', 'Documento revisado por el abogado'],
                        ['Próximo', 'Cita agendada para seguimiento'],
                      ].map(([date, text]) => (
                        <div key={text} className="relative pl-5">
                          <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-accent-500 ring-4 ring-accent-500/10 dark:bg-blue-300 dark:ring-blue-300/10" />
                          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent-700 dark:text-blue-200">{date}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted dark:text-slate-200">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESEÑAS DE GOOGLE */}
      <section className="section-shell bg-canvas pb-24 sm:pb-[var(--section-space)]">
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="pill w-fit">{p.googleReviews.badge}</p>
              <h2 className="text-balance">{p.googleReviews.title}</h2>
              <p className="max-w-xl text-muted">{p.googleReviews.subtitle}</p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{p.googleReviews.ratingLabel}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-5xl font-bold leading-none text-ink">5.0</span>
                    <span className="flex text-lg text-amber-500" aria-label="5 estrellas">★★★★★</span>
                  </div>
                </div>
                <div className="pb-1">
                  <p className="text-sm font-semibold text-ink">{p.googleReviews.source}</p>
                  <p className="text-xs text-muted">{p.googleReviews.sourceNote}</p>
                </div>
              </div>
              <Link
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 w-full justify-center sm:w-auto"
              >
                {p.googleReviews.cta}
              </Link>
            </div>
          </div>

          {curatedGoogleReviews.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {curatedGoogleReviews.map((review) => (
                <article key={`${review.author}-${review.date}`} className="card-shell bg-white p-5">
                  <div className="flex text-sm text-amber-500" aria-label="5 estrellas">★★★★★</div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">“{review.text}”</p>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-sm font-semibold text-ink">{review.author}</p>
                    <p className="text-xs text-muted">{review.date}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-shell bg-canvas">
        <div className="container max-w-3xl space-y-6">
          <div className="space-y-2">
            <p className="pill w-fit">{p.faqBadge}</p>
            <h2>{p.faqTitle}</h2>
          </div>
          <div className="divide-y divide-border">
            {p.faq.map((item) => (
              <details key={item.q} className="group py-4">
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
    </main>
  );
}
