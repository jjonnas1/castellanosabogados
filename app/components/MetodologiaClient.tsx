'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import WaIcon from "@/app/components/WaIcon";
import { serviceDetailList } from "@/lib/serviceDetails";
import { buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const DARK_GLOW = "radial-gradient(ellipse at 15% 0%, rgba(180,195,220,0.12) 0%, transparent 55%), #121622";

export default function MetodologiaClient() {
  const { t } = useLanguage();
  const p = t.pages.metodologia;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      {/* Hero */}
      <section className="section-shell bg-canvas border-b border-border/50">
        <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-2xl space-y-6" data-reveal>
            <p className="pill w-fit">{p.badge}</p>
            <div className="space-y-4">
              <h1 className="text-ink">{p.heroTitle}</h1>
              <p className="text-lg leading-relaxed text-muted">{p.heroParagraph}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl({
                  area: "Metodología",
                  source: "/metodologia",
                  message: "Hola, quisiera agendar una consulta inicial.",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
              >
                <WaIcon size={16} />
                {p.ctaBtn}
              </a>
              <Link href="/servicios" className="btn-secondary">
                {p.viewAllServices}
              </Link>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
            style={{ background: "#121622" }}
            data-reveal
            data-reveal-delay="2"
          >
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

      {/* Process */}
      <section className="section-shell bg-white border-b border-border/50">
        <div className="container space-y-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between" data-reveal>
            <div className="max-w-2xl space-y-2">
              <p className="pill w-fit">{p.processBadge}</p>
              <h2>{p.processTitle}</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted">{p.processIntro}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {p.steps.map((step, index) => (
              <article
                key={step.title}
                className="flex flex-col gap-5 rounded-2xl bg-canvas border border-border p-8 shadow-[0_2px_12px_rgba(15,23,42,0.06)]"
                data-reveal
                data-reveal-delay={String((index % 2) + 1)}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                    {step.when}
                  </span>
                  <span className="text-5xl font-bold text-border tabular-nums leading-none select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-ink leading-snug">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modality */}
      <section className="section-shell bg-canvas border-b border-border/50">
        <div className="container grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <div className="space-y-3" data-reveal>
            <p className="pill w-fit">{p.modalityTitle}</p>
            <h2 className="text-ink leading-snug">Cómo nos coordinamos con usted</h2>
            <p className="text-muted text-sm leading-relaxed">
              Sin intermediarios, sin demoras. Un sistema de trabajo directo y documentado.
            </p>
          </div>
          <ul className="divide-y divide-border" data-reveal data-reveal-delay="2">
            {p.modalityItems.map((item, idx) => (
              <li key={item} className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
                <span className="shrink-0 pt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent/60 w-6">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-ink leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Principles */}
      <section className="section-shell bg-white border-b border-border/50">
        <div className="container space-y-10">
          <div className="space-y-3" data-reveal>
            <p className="pill w-fit">{p.principlesBadge}</p>
            <h2>{p.principlesTitle}</h2>
            <p className="max-w-2xl text-muted">{p.principlesSubtitle}</p>
          </div>
          <div className="divide-y divide-border max-w-3xl" data-reveal data-reveal-delay="1">
            {p.principles.map((item, idx) => (
              <div key={item.title} className="flex gap-8 py-8 first:pt-0 last:pb-0">
                <span className="shrink-0 text-4xl font-bold text-border tabular-nums leading-none select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-shell bg-canvas">
        <div className="container space-y-8">
          <div className="max-w-2xl space-y-2" data-reveal>
            <p className="pill w-fit">{p.servicesBadge}</p>
            <h2>{p.servicesTitle}</h2>
            <p className="text-muted">{p.servicesSubtitle}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serviceDetailList.slice(0, 8).map((svc, idx) => (
              <Link
                key={svc.slug}
                href={`/servicios/${svc.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_8px_24px_rgba(15,23,42,0.10)]"
                data-reveal
                data-reveal-delay={String((idx % 3) + 1)}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{svc.title}</p>
                <h3 className="mt-3 text-base font-semibold leading-snug text-ink">{svc.headline}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted flex-1">{svc.summary}</p>
                <span className="mt-5 inline-flex text-xs font-semibold text-accent group-hover:text-ink transition-colors">
                  {p.viewService} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell text-white" style={{ background: DARK_GLOW }} data-reveal>
        <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-300/60">Castellanos Abogados</p>
            <h2 className="text-white">{p.ctaTitle}</h2>
            <p className="text-slate-300">{p.ctaSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: "Metodología",
                source: "/metodologia",
                message: "Hola, quisiera agendar una consulta.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
            >
              <WaIcon size={16} />
              {p.ctaBtn}
            </a>
            <Link href="/servicios" className="btn-secondary border-white/25 bg-white/8 text-white hover:bg-white/14 hover:text-white">
              {p.viewAllServices}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
