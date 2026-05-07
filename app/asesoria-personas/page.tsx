'use client';

import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1528]/88 via-[#0d1528]/82 to-[#1f365d]/70" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
          <h1 className="max-w-3xl text-white">{p.heroTitle}</h1>
          <p className="max-w-3xl text-slate-100">{p.heroParagraph}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildMailtoUrl({
                area: "Asesoría a personas",
                source: "/asesoria-personas",
                subject: "Solicitud de contacto – Asesoría a personas",
                message: "Hola, quisiera solicitar orientación personal.",
              })}
              data-wa-lead
              className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
            >
              {t.common.requestInfo}
            </a>
            <a
              href={buildMailtoUrl({
                area: "Asesoría a personas",
                source: "/asesoria-personas",
                subject: "Solicitud de contacto – Asesoría a personas",
                message: "Hola, necesito coordinar orientación en la línea personal.",
              })}
              className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              {t.common.directContact}
            </a>
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4">
          <p className="pill w-fit">{p.howBadge}</p>
          <h2>{p.howTitle}</h2>
          <p className="max-w-2xl text-muted">{p.howSubtitle}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {p.features.map((item) => (
              <div key={item} className="card-shell bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card-shell bg-white p-8 shadow-soft/40">
          <p className="pill w-fit">{p.scopeBadge}</p>
          <h3 className="mt-3 text-ink">{p.scopeTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {p.scopeItems.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">{p.scopeNote}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: "Asesoría a personas",
                source: "/asesoria-personas",
                message: "Hola, quisiera agendar una revisión.",
              })}
              className="btn-primary"
            >
              {p.scheduleBtn}
            </a>
            <Link href="/" className="btn-secondary">{p.backBtn}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
