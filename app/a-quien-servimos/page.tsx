'use client';

import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AQuienServimosPage() {
  const { t } = useLanguage();
  const p = t.pages.aQuienServimos;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-ink via-ink/90 to-accent dark:from-[#0c111d] dark:via-[#0c111d]/90 dark:to-[#1f365d] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_72%_8%,rgba(255,255,255,0.12),transparent_36%)]" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
          <h1 className="max-w-3xl text-white">{p.heroTitle}</h1>
          <p className="max-w-3xl text-lg text-slate-100">{p.heroParagraph}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildMailtoUrl({
                area: "A quién servimos",
                source: "/a-quien-servimos",
                subject: "Solicitud de evaluación – A quién servimos",
                message: "Hola, deseo solicitar una evaluación estratégica.",
              })}
              data-wa-lead
              className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
            >
              {t.common.requestEval}
            </a>
            <a
              href={buildMailtoUrl({
                area: "A quién servimos",
                source: "/a-quien-servimos",
                subject: "Solicitud de orientación – A quién servimos",
                message: "Hola, necesito coordinar una sesión de orientación jurídica.",
              })}
              className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              {t.common.requestOrientation}
            </a>
          </div>
        </div>
      </header>

      <section className="container section-shell space-y-6">
        <div className="space-y-3">
          <p className="pill w-fit">{p.rolesBadge}</p>
          <h2>{p.rolesTitle}</h2>
          <p className="max-w-3xl text-muted">{p.rolesSubtitle}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {p.roles.map((role) => (
            <div key={role.title} className="rounded-2xl border border-border bg-white p-6 shadow-soft/30">
              <h3 className="text-ink">{role.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{role.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/70">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-3">
            <p className="pill w-fit">{p.contextsBadge}</p>
            <h2>{p.contextsTitle}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {p.contexts.map((item) => (
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
                  area: "A quién servimos",
                  source: "/a-quien-servimos",
                  message: "Hola, quisiera programar una sesión.",
                })}
                className="btn-primary"
              >
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
