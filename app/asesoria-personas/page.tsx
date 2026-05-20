'use client';

import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import WaIcon from "@/app/components/WaIcon";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const personalBackground =
  "linear-gradient(140deg, rgba(10,16,28,0.9), rgba(20,32,52,0.82)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=75&fm=webp')";

export default function AsesoriaPersonasPage() {
  const { t } = useLanguage();
  const p = t.pages.asesoriaPersonas;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: personalBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0d1528]/80" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
          <h1 className="max-w-3xl text-white">{p.heroTitle}</h1>
          <p className="max-w-3xl text-slate-100">{p.heroParagraph}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: "Asesoría a personas",
                source: "/asesoria-personas",
                message: "Hola, quisiera solicitar orientación penal.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
            >
              <WaIcon size={16} />
              {t.common.requestInfo}
            </a>
            <a
              href={buildMailtoUrl({
                area: "Asesoría a personas",
                source: "/asesoria-personas",
                subject: "Solicitud de contacto – Asesoría a personas",
                message: "Hola, necesito coordinar orientación penal.",
              })}
              className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              {t.common.directContact}
            </a>
          </div>
        </div>
      </header>

      <section className="bg-canvas">
      <div className="container section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-6" data-reveal>
          <div className="space-y-3">
            <p className="pill w-fit">{p.howBadge}</p>
            <h2>{p.howTitle}</h2>
            <p className="max-w-2xl text-muted">{p.howSubtitle}</p>
          </div>
          <ul className="divide-y divide-border">
            {p.features.map((item) => (
              <li key={item} className="flex items-start gap-4 py-4 first:pt-0">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-sm font-medium text-ink leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-2xl border border-border bg-white p-8 shadow-[0_4px_24px_rgba(15,23,42,0.07)]"
          data-reveal
          data-reveal-delay="2"
        >
          <p className="pill w-fit">{p.scopeBadge}</p>
          <h3 className="mt-3 text-xl font-semibold text-ink">{p.scopeTitle}</h3>
          <ul className="mt-5 divide-y divide-border">
            {p.scopeItems.map((item) => (
              <li key={item} className="flex items-start gap-3 py-3.5 first:pt-0 text-sm text-muted leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted/70 leading-relaxed border-t border-border pt-4">{p.scopeNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: "Asesoría a personas",
                source: "/asesoria-personas",
                message: "Hola, quisiera agendar una revisión de mi caso.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
            >
              <WaIcon size={16} />
              {p.scheduleBtn}
            </a>
            <Link href="/" className="btn-secondary">{p.backBtn}</Link>
          </div>
        </div>
      </div>
      </section>
    </main>
  );
}
