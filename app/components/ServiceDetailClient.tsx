'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import WaIcon from "@/app/components/WaIcon";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ServiceDetail } from "@/lib/serviceDetails";

const DARK = "#121622";
const DARK_GLOW = `radial-gradient(ellipse at 15% 0%, rgba(180,195,220,0.12) 0%, transparent 55%), ${DARK}`;

export default function ServiceDetailClient({
  detail,
  backgroundImage,
}: {
  detail: ServiceDetail;
  backgroundImage: string;
}) {
  const { t } = useLanguage();
  const p = t.pages.servicioDetalle;
  const localizedDetail = (p.serviceCopy as Record<string, Partial<ServiceDetail>>)[detail.slug] ?? {};
  const displayDetail = { ...detail, ...localizedDetail };

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      {/* Header con imagen de fondo */}
      <header
        className="relative overflow-hidden text-white"
        style={{ backgroundImage, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ background: `${DARK}CC` }} aria-hidden />
        <div className="container section-shell relative space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-300">
            <Link href="/servicios" className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">
              {p.backToServices}
            </Link>
            {displayDetail.chips.map((chip) => (
              <span key={chip} className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">{chip}</span>
            ))}
          </div>
          <h1 className="text-white max-w-3xl">{displayDetail.headline}</h1>
          <p className="max-w-3xl text-slate-200 text-lg">{displayDetail.summary}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: detail.title,
                source: `/servicios/${detail.slug}`,
                message: `Hola, quisiera información sobre ${detail.title}.`,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
            >
              <WaIcon size={16} />
              {p.requestEval}
            </a>
            <Link href="/servicios" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              {p.backBtn}
            </Link>
          </div>
          <div className="grid gap-3 text-sm text-slate-200 md:grid-cols-3">
            {displayDetail.heroStats.map((stat) => (
              <div key={stat} className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">{stat}</div>
            ))}
          </div>
        </div>
      </header>

      {/* Contenido principal — bg-canvas igual que las reseñas del inicio */}
      <section className="bg-canvas">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-white p-7 shadow-[0_4px_20px_rgba(15,23,42,0.08)]" data-reveal>
              <p className="pill w-fit">{p.whenBadge}</p>
              <ul className="mt-5 divide-y divide-border">
                {displayDetail.activation.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5 first:pt-0 text-sm text-muted leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-white p-7 shadow-[0_4px_20px_rgba(15,23,42,0.08)]" data-reveal data-reveal-delay="1">
              <p className="pill w-fit">{p.forWhomBadge}</p>
              <ul className="mt-5 divide-y divide-border">
                {displayDetail.audience.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5 first:pt-0 text-sm text-muted leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8 shadow-[0_8px_28px_rgba(15,23,42,0.10)]" data-reveal data-reveal-delay="2">
            <p className="pill w-fit">{p.deliverablesBadge}</p>
            <h2 className="mt-3 text-ink">{p.deliverablesTitle}</h2>
            <p className="mt-2 text-muted text-sm leading-relaxed">{displayDetail.deliverablesIntro}</p>
            <ul className="mt-5 divide-y divide-border">
              {displayDetail.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3.5 first:pt-0 text-sm text-muted leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl({
                  area: detail.title,
                  source: `/servicios/${detail.slug}`,
                  message: "Hola, quisiera programar una sesión.",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
              >
                <WaIcon size={16} />
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
        </div>
      </section>

      {/* CTA final — idéntico al CTA del inicio */}
      <section className="section-shell text-white" style={{ background: DARK_GLOW }} data-reveal>
        <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400/60">Castellanos Abogados</p>
            <h2 className="text-white">¿Necesita asesoría en {displayDetail.title}?</h2>
            <p className="text-slate-300 text-lg">Cuéntenos su caso y definimos la ruta más adecuada para usted.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: detail.title,
                source: `/servicios/${detail.slug}`,
                message: `Hola, necesito asesoría sobre ${detail.title}.`,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
            >
              <WaIcon size={16} />
              {p.scheduleSession}
            </a>
            <Link href="/servicios" className="btn-secondary border-white/25 bg-white/8 text-white hover:bg-white/14 hover:text-white">
              {p.backToServices}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
