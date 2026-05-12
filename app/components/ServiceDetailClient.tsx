'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ServiceDetail } from "@/lib/serviceDetails";

export default function ServiceDetailClient({
  detail,
  backgroundImage,
}: {
  detail: ServiceDetail;
  backgroundImage: string;
}) {
  const { t } = useLanguage();
  const p = t.pages.servicioDetalle;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1528]/88 via-[#0d1528]/82 to-[#1f365d]/70" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-200">
            <Link href="/servicios" className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">
              {p.backToServices}
            </Link>
            {detail.chips.map((chip) => (
              <span key={chip} className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">{chip}</span>
            ))}
          </div>
          <h1 className="text-white max-w-3xl">{detail.headline}</h1>
          <p className="max-w-3xl text-slate-100 text-lg">{detail.summary}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildMailtoUrl({
                area: detail.title,
                source: `/servicios/${detail.slug}`,
                subject: `Solicitud de evaluación – ${detail.title}`,
                message: "Hola, deseo solicitar una evaluación estratégica.",
              })}
              data-wa-lead
              className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
            >
              {p.requestEval}
            </a>
            <Link href="/servicios" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              {p.backBtn}
            </Link>
          </div>
          <div className="grid gap-3 text-sm text-slate-100 md:grid-cols-3">
            {detail.heroStats.map((stat) => (
              <div key={stat} className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">{stat}</div>
            ))}
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-6">
          <div className="card-shell bg-white p-6">
            <p className="pill w-fit">{p.whenBadge}</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {detail.activation.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-shell bg-white p-6">
            <p className="pill w-fit">{p.forWhomBadge}</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {detail.audience.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card-shell bg-white p-8 shadow-soft/40">
          <p className="pill w-fit">{p.deliverablesBadge}</p>
          <h2 className="mt-3 text-ink">{p.deliverablesTitle}</h2>
          <p className="mt-2 text-muted">{detail.deliverablesIntro}</p>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {detail.deliverables.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: detail.title,
                source: `/servicios/${detail.slug}`,
                message: "Hola, quisiera programar una sesión.",
              })}
              className="btn-primary"
            >
              {p.scheduleSession}
            </a>
            {['responsabilidad-penal-pj', 'capacitaciones-penal-pj'].includes(detail.slug) && (
              <a
                href={buildMailtoUrl({
                  area: detail.title,
                  source: `/servicios/${detail.slug}`,
                  subject: `Solicitud de coordinación con junta – ${detail.title}`,
                  message: "Hola, necesito coordinar una sesión con junta o comité.",
                })}
                className="btn-secondary"
              >
                {p.coordinateBoard}
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
