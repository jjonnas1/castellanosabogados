'use client';

import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const background =
  "linear-gradient(140deg, rgba(12,17,29,0.92), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=1200&q=75&fm=webp')";

export default function ComoTrabajamosPage() {
  const { t } = useLanguage();
  const p = t.pages.comoTrabajamos;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: background, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1528]/88 via-[#0d1528]/82 to-[#1f365d]/70" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
          <h1 className="max-w-3xl text-white">{p.heroTitle}</h1>
          <p className="max-w-3xl text-lg text-slate-100">{p.heroParagraph}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildMailtoUrl({
                area: "Metodología estructurada",
                source: "/como-trabajamos",
                subject: "Solicitud de evaluación – Metodología estructurada",
                message: "Hola, deseo solicitar una evaluación estratégica.",
              })}
              data-wa-lead
              className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
            >
              {p.requestBtn}
            </a>
            <Link href="/servicios" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              {p.viewServicesBtn}
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell space-y-8">
        <div className="space-y-3">
          <p className="pill w-fit">{p.routeBadge}</p>
          <h2>{p.routeTitle}</h2>
          <p className="max-w-3xl text-muted">{p.routeSubtitle}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {p.steps.map((step, idx) => (
            <div key={step.title} className="rounded-2xl border border-border bg-white p-6 shadow-soft/30">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted">
                <span className="rounded-full bg-subtle px-3 py-1 text-ink">{p.stepLabel} {idx + 1}</span>
                <span>{p.stepControl}</span>
              </div>
              <h3 className="mt-3 text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/70">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-3">
            <p className="pill w-fit">{p.scopeBadge}</p>
            <h2>{p.scopeTitle}</h2>
            <p className="max-w-2xl text-muted">{p.scopeSubtitle}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {p.scopeItems.map((item) => (
                <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink shadow-soft/30">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="card-shell bg-white p-8 shadow-soft/40">
            <p className="pill w-fit">{p.ctaBadge}</p>
            <h3 className="mt-3 text-ink">{p.ctaTitle}</h3>
            <p className="mt-2 text-sm text-muted">{p.ctaSubtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl({
                  area: "Metodología estructurada",
                  source: "/como-trabajamos",
                  message: "Hola, quisiera programar una sesión.",
                })}
                className="btn-primary"
              >
                {t.common.scheduleSession}
              </a>
              <a
                href={buildMailtoUrl({
                  area: "Metodología estructurada",
                  source: "/como-trabajamos",
                  subject: "Solicitud de orientación – Metodología estructurada",
                  message: "Hola, necesito coordinar una sesión de orientación jurídica.",
                })}
                className="btn-secondary"
              >
                {t.common.requestOrientation}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
