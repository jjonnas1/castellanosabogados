'use client';

import Image from 'next/image';
import SiteHeader from "@/app/components/SiteHeader";
import { useLanguage } from "@/contexts/LanguageContext";


export default function NosotrosClient() {
  const { t } = useLanguage();
  const p = t.pages.nosotros;

  return (
    <main className="motion-public motion-inner editorial-page editorial-about bg-canvas text-ink">
      <SiteHeader />

      {/* Hero oscuro */}
      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(180,195,220,0.09),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(100,130,170,0.07),transparent_55%)]"
          aria-hidden
        />
        <div className="container section-shell relative about-hero-grid">
          <div className="space-y-6">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">
            Castellanos Abogados
          </p>
          <div className="space-y-3">
            <h1 className="text-white">Jonatan Castellanos</h1>
            <p className="text-lg font-medium uppercase tracking-[0.14em] text-slate-300">
              {p.role}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 max-w-3xl">
            <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                Pregrado
              </p>
              <p className="mt-1.5 text-sm font-semibold text-white">{p.degree1}</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                Licenciatura
              </p>
              <p className="mt-1.5 text-sm font-semibold text-white">{p.degree2}</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/5 px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                Sedes
              </p>
              <p className="mt-1.5 text-sm font-semibold text-white">
                Pereira · Manizales · Armenia
              </p>
            </div>
          </div>
          </div>
          <div className="about-hero-portrait">
            <Image
              fill
              priority
              src="/jonatan-castellanos-retrato-2026.jpg"
              alt="Retrato de Jonatan Castellanos, abogado fundador de Castellanos Abogados"
              sizes="(max-width: 860px) 260px, 360px"
            />
          </div>
        </div>
      </header>

      {/* Bio + Foto */}
      <section className="section-shell bg-surface/70">
        <div className="container max-w-3xl">
          <div className="space-y-5" data-reveal>
            <p className="pill w-fit">{p.formationBadge}</p>
            <h2 className="text-ink">Formación y trayectoria</h2>
            <div className="space-y-4">
              {p.bio.map((paragraph, idx) => (
                <p key={idx} className="text-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
