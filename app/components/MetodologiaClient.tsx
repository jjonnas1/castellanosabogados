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

      {/* HERO */}
      <section className="section-shell border-b border-border/60 bg-ink dark:bg-[#0c111d] text-white">
        <div className="container max-w-3xl space-y-4">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
          <h1 className="text-white">{p.heroTitle}</h1>
          <p className="text-lg text-slate-200">{p.heroParagraph}</p>
        </div>
      </section>

      {/* PROCESO GENERAL */}
      <section className="section-shell bg-surface">
        <div className="container space-y-8">
          <div className="space-y-2">
            <p className="pill w-fit">{p.processBadge}</p>
            <h2>{p.processTitle}</h2>
          </div>

          <div className="max-w-2xl">
            <ol className="relative border-l-2 border-accent pl-8 space-y-10">
              {p.steps.map((hito) => (
                <li key={hito.when} className="relative">
                  <span
                    className="absolute -left-[41px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-accent"
                    aria-hidden
                  />
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-accent mb-0.5">
                    {hito.when}
                  </span>
                  <h3 className="text-base font-semibold text-ink">{hito.title}</h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{hito.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 max-w-2xl">
            <h3 className="text-base font-semibold text-ink">{p.modalityTitle}</h3>
            <ul className="space-y-2 text-sm text-muted">
              {p.modalityItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section-shell bg-canvas">
        <div className="container space-y-10">
          <div className="space-y-2">
            <p className="pill w-fit">{p.servicesBadge}</p>
            <h2>{p.servicesTitle}</h2>
            <p className="text-muted max-w-2xl">{p.servicesSubtitle}</p>
          </div>

          <div className="space-y-8">
            {serviceDetailList.map((svc) => (
              <article key={svc.slug} className="card-shell p-6 md:p-8 space-y-6">
                <div className="space-y-1">
                  <Link
                    href={`/servicios/${svc.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted hover:text-ink transition-colors"
                  >
                    {svc.title}
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3" aria-hidden>
                      <path d="M2.5 9.5 9.5 2.5M5 2.5h4.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <h3 className="text-xl text-ink">{svc.headline}</h3>
                  <p className="text-sm text-muted leading-relaxed">{svc.summary}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">{p.whenActivate}</p>
                    <ul className="space-y-1.5">
                      {svc.activation.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">{p.audience}</p>
                    <ul className="space-y-1.5">
                      {svc.audience.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">{p.deliverables}</p>
                    <ul className="space-y-1.5">
                      {svc.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={buildMailtoUrl({
                      area: svc.title,
                      source: "/metodologia",
                      subject: `Solicitud — ${svc.title}`,
                      message: `Hola, me interesa conocer más sobre el servicio de ${svc.title}.`,
                    })}
                    className="btn-secondary text-sm"
                  >
                    {p.requestInfo}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell bg-ink dark:bg-[#0c111d] text-white">
        <div className="container max-w-2xl space-y-5 text-center">
          <h2 className="text-white">{p.ctaTitle}</h2>
          <p className="text-slate-200">{p.ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
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

      {/* FOOTER */}
      <footer className="border-t border-border bg-canvas/90 py-8 backdrop-blur">
        <div className="container flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-base font-semibold text-ink">Castellanos Abogados</p>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="text-right text-muted">
            <p className="font-heading font-semibold text-ink">{t.footer.motto}</p>
            <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
