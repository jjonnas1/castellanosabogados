'use client';

import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from "@/app/components/SiteHeader";
import WaIcon from "@/app/components/WaIcon";
import { buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const heroBg =
  "linear-gradient(150deg, rgba(12,17,29,0.97) 0%, rgba(20,30,46,0.94) 100%)";

export default function NosotrosClient() {
  const { t } = useLanguage();
  const p = t.pages.nosotros;

  return (
    <main className="bg-canvas text-ink">
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
            className="card-shell overflow-hidden"
            style={{ minHeight: "420px", position: "relative" }}
            data-reveal
            data-reveal-delay="2"
          >
            <Image
              fill
              src="/jonatan-castellanos-1200.jpg"
              alt="Jonatan Castellanos — Abogado en Pereira"
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-gradient-to-b from-white to-surface/70">
        <div className="container section-shell space-y-5 text-center" data-reveal>
          <p className="pill mx-auto w-fit">Contacto directo</p>
          <h2 className="text-ink">¿Tiene una situación jurídica?</h2>
          <p className="mx-auto max-w-2xl text-muted">
            Cuéntenos su caso. Revisamos el contexto, definimos el enfoque y le
            indicamos el siguiente paso con claridad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={buildWhatsAppUrl({
                area: "Nosotros",
                source: "/nosotros",
                message: "Hola, quisiera agendar una consulta.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
            >
              <WaIcon size={16} />
              Agendar consulta
            </a>
            <Link href="/servicios" className="btn-secondary">
              Ver servicios
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
