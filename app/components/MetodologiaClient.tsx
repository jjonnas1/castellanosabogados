'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import WaIcon from "@/app/components/WaIcon";
import { serviceDetailList } from "@/lib/serviceDetails";
import { buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const heroBackground =
  "linear-gradient(140deg, rgba(12,17,29,0.93), rgba(28,42,60,0.84)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=75&fm=webp')";


export default function MetodologiaClient() {
  const { t } = useLanguage();
  const p = t.pages.metodologia;

  return (
    <main className="motion-public motion-inner editorial-page editorial-method bg-canvas text-ink">
      <SiteHeader />

      {/* Hero — oscuro con foto */}
      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0d1520]/60" aria-hidden />
        <div className="container section-shell relative">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="max-w-2xl space-y-6" data-reveal>
              <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
              <div className="space-y-4">
                <h1 className="text-white">{p.heroTitle}</h1>
                <p className="text-lg leading-relaxed text-slate-200">{p.heroParagraph}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={buildWhatsAppUrl({
                    area: "Metodología",
                    source: "/metodologia",
                    message: "Hola, quisiera agendar una consulta inicial.",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa"
                >
                  <WaIcon size={16} />
                  {p.ctaBtn}
                </a>
                <Link href="/servicios" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                  {p.viewAllServices}
                </Link>
              </div>
            </div>

            <div
              className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm"
              data-reveal
              data-reveal-delay="2"
            >
              <div className="p-7 space-y-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">{p.visualEyebrow}</p>
                  <p className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">{p.visualTitle}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {p.heroKpis.map((item) => (
                    <div key={item.value} className="rounded-2xl bg-white/[0.08] border border-white/15 p-4 text-center">
                      <p className="text-base font-bold text-white leading-tight sm:text-lg">{item.value}</p>
                      <p className="mt-1.5 text-[10px] text-white/45 leading-tight">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 px-7 py-5">
                <p className="text-xs text-white/30 leading-relaxed">Castellanos Abogados · Pereira, Risaralda</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Proceso: cuatro momentos en una sola línea de tiempo */}
      <section className="ed-section">
        <div className="ed-wrap">
          <div data-reveal>
            <p className="ed-eyebrow">{p.processBadge}</p>
            <h2 className="ed-h2">{p.processTitle}</h2>
            <p className="ed-lead">{p.processIntro}</p>
          </div>
          <div className="ed-cols" style={{ '--ed-cols': 4 } as React.CSSProperties}>
            {p.steps.map((step, index) => (
              <article key={step.title} className="ed-col" data-reveal>
                <span className="ed-col__num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p className="ed-col__kicker" style={{ marginTop: 8 }}>{step.when}</p>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modalidad */}
      <section className="ed-section ed--mist">
        <div className="ed-wrap ed-split">
          <div className="ed-split__head" data-reveal>
            <p className="ed-eyebrow">{p.modalityTitle}</p>
            <h2 className="ed-h2">Cómo nos coordinamos con usted</h2>
            <p className="ed-lead">
              Sin intermediarios, sin demoras. Un sistema de trabajo directo y documentado.
            </p>
          </div>
          <ol className="ed-rows">
            {p.modalityItems.map((item, idx) => (
              <li key={item} className="ed-row ed-row--plain" data-reveal>
                <span className="ed-row__num">{String(idx + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Principios */}
      <section className="ed-section ed--band">
        <div className="ed-wrap">
          <div data-reveal>
            <p className="ed-eyebrow">{p.principlesBadge}</p>
            <h2 className="ed-h2">{p.principlesTitle}</h2>
            <p className="ed-lead">{p.principlesSubtitle}</p>
          </div>
          <div className="ed-cols">
            {p.principles.map((item, idx) => (
              <article key={item.title} className="ed-col" data-reveal>
                <span className="ed-col__num">{String(idx + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios: índice de áreas */}
      <section className="ed-section">
        <div className="ed-wrap ed-split">
          <div className="ed-split__head" data-reveal>
            <p className="ed-eyebrow">{p.servicesBadge}</p>
            <h2 className="ed-h2">{p.servicesTitle}</h2>
            <p className="ed-lead">{p.servicesSubtitle}</p>
            <div className="ed-actions">
              <a
                href={buildWhatsAppUrl({
                  area: "Metodología",
                  source: "/metodologia",
                  message: "Hola, quisiera agendar una consulta.",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-btn ed-btn--wa"
              >
                <WaIcon size={16} />
                {p.ctaBtn}
              </a>
              <Link href="/servicios" className="ed-btn ed-btn--ghost">{p.viewAllServices}</Link>
            </div>
          </div>
          <ul className="ed-index">
            {serviceDetailList.slice(0, 8).map((svc) => (
              <li key={svc.slug} data-reveal>
                <Link href={`/servicios/${svc.slug}`}>
                  <span className="ed-index__title">{(t.header.serviceNames as Record<string, string>)[svc.slug] ?? svc.title}</span>
                  <span className="ed-index__sub">{svc.headline}</span>
                  <span className="ed-index__arrow" aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
