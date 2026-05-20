'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import WaIcon from "@/app/components/WaIcon";
import { buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const background =
  "linear-gradient(140deg, rgba(18,22,34,0.92), rgba(40,48,58,0.80)), url('https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=1200&q=75&fm=webp')";

export default function ComoTrabajamosPage() {
  const { t } = useLanguage();
  const p = t.pages.comoTrabajamos;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden text-white"
        style={{ backgroundImage: background, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#121622]/80" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
          <h1 className="max-w-3xl text-white">{p.heroTitle}</h1>
          <p className="max-w-3xl text-lg text-slate-200">{p.heroParagraph}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: "Metodología estructurada",
                source: "/como-trabajamos",
                message: "Hola, quisiera solicitar una evaluación estratégica.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
            >
              <WaIcon size={16} />
              {p.requestBtn}
            </a>
            <Link href="/servicios" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              {p.viewServicesBtn}
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-canvas">
        <div className="container section-shell space-y-10">
          <div className="space-y-3" data-reveal>
            <p className="pill w-fit">{p.routeBadge}</p>
            <h2>{p.routeTitle}</h2>
            <p className="max-w-3xl text-muted">{p.routeSubtitle}</p>
          </div>
          <div className="relative max-w-2xl">
            {p.steps.map((step, idx) => (
              <div
                key={step.title}
                className="flex gap-6 pb-12 last:pb-0"
                data-reveal
                data-reveal-delay={String(Math.min((idx % 3) + 1, 3))}
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white text-sm font-bold shrink-0">
                    {idx + 1}
                  </div>
                  {idx < p.steps.length - 1 && (
                    <div className="mt-3 w-px flex-1 bg-border min-h-[3rem]" />
                  )}
                </div>
                <div className="pt-1.5 pb-4 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{p.stepLabel} {idx + 1}</p>
                  <h3 className="text-ink leading-snug">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-border/50">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-3" data-reveal>
            <p className="pill w-fit">{p.scopeBadge}</p>
            <h2>{p.scopeTitle}</h2>
            <p className="max-w-2xl text-muted">{p.scopeSubtitle}</p>
            <ul className="divide-y divide-border mt-4">
              {p.scopeItems.map((item) => (
                <li key={item} className="flex items-center gap-3 py-3.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-sm font-medium text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-canvas p-8 shadow-[0_4px_20px_rgba(15,23,42,0.08)]" data-reveal data-reveal-delay="3">
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
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
              >
                <WaIcon size={16} />
                {t.common.scheduleSession}
              </a>
              <Link href="/servicios" className="btn-secondary">
                {t.common.viewServices}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
