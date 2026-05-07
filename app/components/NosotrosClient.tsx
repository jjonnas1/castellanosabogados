'use client';

import Image from 'next/image';
import SiteHeader from "@/app/components/SiteHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NosotrosClient() {
  const { t } = useLanguage();
  const p = t.pages.nosotros;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section className="section-shell bg-surface/70">
        <div className="container space-y-6">

          <div className="card-shell bg-white p-6">
            <p className="pill w-fit mb-3">{p.formationBadge}</p>
            <div className="space-y-1">
              <p className="text-base font-semibold text-ink">{p.degree1}</p>
              <p className="text-base font-semibold text-ink">{p.degree2}</p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <article className="card-shell bg-white p-8">
              <h1 className="text-2xl font-semibold text-ink">Jonatan Castellanos</h1>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-muted">{p.role}</p>

              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                {p.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="rounded-2xl border border-border bg-white p-4 shadow-soft/30">
              <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: '320px', height: '100%' }}>
                <Image
                  fill
                  src="/jonatan-castellanos.png"
                  alt="Jonatan Castellanos"
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
