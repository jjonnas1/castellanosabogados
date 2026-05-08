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

export default function HomeClient() {
  const { t } = useLanguage();
  const p = t.pages.home;

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
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {p.services.map((line, idx) => (
              <article key={line.title} className="card-shell flex h-full flex-col justify-between p-5 sm:p-6">
                <div className="space-y-2.5">
                  <h3 className="text-[20px] leading-snug text-ink sm:text-lg">{line.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted sm:text-sm">{line.description}</p>
                </div>
                <div className="mt-5 grid gap-2 text-sm sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                  <Link href={serviceHrefs[idx]} className="btn-secondary w-full px-4 py-2.5 text-xs sm:w-auto sm:text-sm">{t.common.viewDetail}</Link>
                  <a
                    href={buildMailtoUrl({
                      area: serviceAreas[idx],
                      source: "/",
                      subject: `Solicitud de contacto – ${serviceAreas[idx]}`,
                      message: "Hola, quisiera solicitar orientación sobre esta línea.",
                      intent: serviceIntents[idx],
                    })}
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
        className="section-shell text-white"
        style={{ background: "linear-gradient(120deg, rgba(12,17,29,0.95), rgba(17,37,68,0.92))" }}
      >
        <div className="container space-y-8">
          <div className="space-y-3 text-center">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
              {p.portalBadge}
            </span>
            <h2 className="text-white">{p.portalTitle}</h2>
            <p className="mx-auto max-w-xl text-slate-300">{p.portalSubtitle}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/8 p-6 text-center space-y-3 backdrop-blur">
              <span className="text-3xl">📄</span>
              <p className="text-sm text-slate-200">{p.portalFeature1}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/8 p-6 text-center space-y-3 backdrop-blur">
              <span className="text-3xl">🔔</span>
              <p className="text-sm text-slate-200">{p.portalFeature2}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/8 p-6 text-center space-y-3 backdrop-blur">
              <span className="text-3xl">📅</span>
              <p className="text-sm text-slate-200">{p.portalFeature3}</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/cliente/login"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {p.portalLink}
            </Link>
          </div>
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
