'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import WaIcon from "@/app/components/WaIcon";
import { buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const DARK_GLOW = "radial-gradient(ellipse at 15% 0%, rgba(37,99,235,0.18) 0%, transparent 55%), #0d1528";

export default function AQuienServimosPage() {
  const { t } = useLanguage();
  const p = t.pages.aQuienServimos;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="text-white" style={{ background: DARK_GLOW }}>
        <div className="container section-shell space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
          <h1 className="max-w-3xl text-white">{p.heroTitle}</h1>
          <p className="max-w-3xl text-lg text-slate-200">{p.heroParagraph}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: "A quién servimos",
                source: "/a-quien-servimos",
                message: "Hola, quisiera solicitar una evaluación.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
            >
              <WaIcon size={16} />
              {t.common.requestEval}
            </a>
            <Link href="/servicios" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              {t.common.viewServices}
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-canvas">
        <div className="container section-shell space-y-8">
          <div className="space-y-3" data-reveal>
            <p className="pill w-fit">{p.rolesBadge}</p>
            <h2>{p.rolesTitle}</h2>
            <p className="max-w-3xl text-muted">{p.rolesSubtitle}</p>
          </div>
          <div className="divide-y divide-border">
            {p.roles.map((role, idx) => (
              <div
                key={role.title}
                className="flex gap-6 py-8 first:pt-2 last:pb-0"
                data-reveal
                data-reveal-delay={String(Math.min((idx % 3) + 1, 3))}
              >
                <span className="shrink-0 pt-0.5 text-2xl font-bold text-border tabular-nums leading-none select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-ink leading-snug">{role.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{role.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-border/50">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-3" data-reveal>
            <p className="pill w-fit">{p.contextsBadge}</p>
            <h2>{p.contextsTitle}</h2>
            <ul className="divide-y divide-border mt-4">
              {p.contexts.map((item) => (
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
                  area: "A quién servimos",
                  source: "/a-quien-servimos",
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
