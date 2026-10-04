'use client';

import Image from 'next/image';
import SiteHeader from "@/app/components/SiteHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const heroBg =
  "linear-gradient(90deg, rgba(17,14,15,0.92) 0%, rgba(17,14,15,0.68) 58%, rgba(17,14,15,0.48) 100%), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=82&fm=webp') center / cover";

export default function NosotrosClient() {
  const { t } = useLanguage();
  const p = t.pages.nosotros;

  return (
    <main className="motion-public motion-inner editorial-page editorial-about bg-canvas text-ink">
      <SiteHeader />

      {/* Hero oscuro */}
      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ background: heroBg }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(180,195,220,0.09),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(100,130,170,0.07),transparent_55%)]"
          aria-hidden
        />
        <div className="container section-shell relative space-y-6">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">
            {p.formationBadge}
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
      </header>

      {/* Bio + Foto */}
      <section className="section-shell bg-surface/70">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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

          <div
            className="card-shell relative aspect-[4/5] w-full overflow-hidden bg-[#0b0b0b]"
            data-reveal
            data-reveal-delay="2"
          >
            <Image
              fill
              src="/jonatan-castellanos-retrato-2026.jpg"
              alt="Retrato de Jonatan Castellanos, abogado de Castellanos Abogados"
              className="object-contain brightness-[1.12] contrast-[1.02]"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
