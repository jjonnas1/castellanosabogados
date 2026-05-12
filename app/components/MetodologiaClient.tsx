'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import { serviceDetailList } from "@/lib/serviceDetails";
import { buildMailtoUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MetodologiaClient() {
  const { t } = useLanguage();
  const p = t.pages.metodologia;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section className="section-shell bg-surface">
        <div className="container grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-2xl space-y-6">
            <p className="pill w-fit">{p.badge}</p>
            <div className="space-y-4">
              <h1>{p.heroTitle}</h1>
              <p className="text-lg leading-relaxed text-muted">{p.heroParagraph}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={buildMailtoUrl({
                  area: "Metodología",
                  source: "/metodologia",
                  subject: "Solicitud de consulta inicial",
                  message: "Hola, quisiera agendar una consulta inicial.",
                })}
                className="btn-primary"
              >
                {p.ctaBtn}
              </a>
              <Link href="/servicios" className="btn-secondary">
                {p.viewAllServices}
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0c111d] shadow-soft">
            <div className="p-7 space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">{p.visualEyebrow}</p>
                <p className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">{p.visualTitle}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {p.heroKpis.map((item) => (
                  <div key={item.value} className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 text-center">
                    <p className="text-base font-bold text-white leading-tight sm:text-lg">{item.value}</p>
                    <p className="mt-1.5 text-[10px] text-white/40 leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 px-7 py-5">
              <p className="text-xs text-white/25 leading-relaxed">Castellanos Abogados · Pereira, Risaralda</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container space-y-7">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="pill w-fit">{p.processBadge}</p>
              <h2>{p.processTitle}</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">{p.processIntro}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {p.steps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft/20">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">{step.when}</p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-xs font-bold text-ink">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg leading-snug text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <div className="space-y-3">
            <p className="pill w-fit">{p.principlesBadge}</p>
            <h2>{p.principlesTitle}</h2>
            <p className="text-muted">{p.principlesSubtitle}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {p.principles.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft/20">
                <span className="block h-1 w-10 rounded-full bg-ink" aria-hidden />
                <h3 className="mt-4 text-base leading-snug text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="pill w-fit">{p.servicesBadge}</p>
            <h2>{p.servicesTitle}</h2>
            <p className="text-muted">{p.servicesSubtitle}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {serviceDetailList.slice(0, 8).map((svc) => (
              <Link
                key={svc.slug}
                href={`/servicios/${svc.slug}`}
                className="group rounded-2xl border border-border bg-card p-5 shadow-soft/20 transition hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-hover"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{svc.title}</p>
                <h3 className="mt-3 text-base leading-snug text-ink">{svc.headline}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{svc.summary}</p>
                <span className="mt-5 inline-flex text-xs font-semibold text-accent-700 group-hover:text-ink">
                  {p.viewService}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-ink text-white dark:bg-[#0c111d]">
        <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-white">{p.ctaTitle}</h2>
            <p className="text-slate-200">{p.ctaSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildMailtoUrl({
                area: "Metodología",
                source: "/metodologia",
                subject: "Solicitud de consulta inicial",
                message: "Hola, quisiera agendar una consulta inicial.",
              })}
              className="btn-primary bg-white text-ink hover:bg-slate-100"
            >
              {p.ctaBtn}
            </a>
            <Link href="/servicios" className="btn-secondary border-white/50 text-white hover:bg-white/10">
              {p.viewAllServices}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
