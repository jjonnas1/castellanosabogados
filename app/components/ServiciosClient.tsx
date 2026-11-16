'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildWhatsAppUrl } from "@/lib/contactLinks";

type Service = {
  slug: string;
  title: string;
  description: string;
  href?: string;
  detail?: {
    activation: string[];
    deliverables: string[];
  } | null;
};

const headerBackground =
  "linear-gradient(140deg, rgba(18,22,34,0.92), rgba(40,48,58,0.80)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=75&fm=webp')";

export default function ServiciosClient({ services }: { services: Service[]; error: boolean }) {
  const { t } = useLanguage();
  const p = t.pages.servicios;
  // Nombres de área en lenguaje claro (los mismos del menú), con el título de datos como respaldo.
  const names = t.header.serviceNames as Record<string, string>;

  return (
    <main className="motion-public motion-inner editorial-page editorial-services bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden text-white"
        style={{ backgroundImage: headerBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#121622]/80" aria-hidden />
        <div className="container section-shell relative space-y-6">
          <div className="space-y-3">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
            <h1 className="text-white">{p.heroTitle}</h1>
            <p className="max-w-2xl text-slate-200">{p.heroParagraph}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contacto" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              {p.contact}
            </Link>
            <a href={buildWhatsAppUrl({ area: 'Consulta jurídica', source: '/servicios' })} target="_blank" rel="noopener noreferrer" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              WhatsApp · 314 830 9306
            </a>
          </div>
        </div>
      </header>

      <section className="ed-section">
        <div className="ed-wrap">
          {services.length === 0 ? (
            <div className="ed-cta ed-cta--solo" style={{ color: 'inherit' }}>
              <div>
                <h2 className="ed-h2" style={{ marginTop: 0 }}>{p.empty}</h2>
                <p className="ed-lead">{p.emptySubtitle}</p>
              </div>
              <div className="ed-actions">
                <Link href="/contacto" className="ed-btn">{p.openContact}</Link>
              </div>
            </div>
          ) : (
            <div className="ed-catalog">
              {services.map((service) => (
                <article key={service.slug} className="ed-service" data-reveal>
                  <div>
                    <h3>{names[service.slug] ?? service.title}</h3>
                    <p className="ed-service__desc">{service.description}</p>
                    <div className="ed-service__links">
                      <Link href={service.href ?? `/servicios/${service.slug}`}>{p.viewDetail} →</Link>
                      {service.slug === 'derecho-migratorio' ? (
                        <a href={buildWhatsAppUrl({ area: 'Derecho migratorio', source: '/servicios' })} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a>
                      ) : (
                        <Link href="/contacto">{p.consultScope}</Link>
                      )}
                    </div>
                  </div>
                  {service.detail ? (
                    <>
                      <div>
                        <p className="ed-service__label">{p.whenActivated}</p>
                        <ul>
                          {service.detail.activation.slice(0, 3).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="ed-service__label">{p.deliverables}</p>
                        <ul>
                          {service.detail.deliverables.slice(0, 3).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
