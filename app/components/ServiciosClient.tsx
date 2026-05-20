'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import { useLanguage } from "@/contexts/LanguageContext";

type Service = {
  slug: string;
  title: string;
  description: string;
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

  return (
    <main className="bg-canvas text-ink">
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
            <Link href="/" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              {p.backHome}
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-canvas">
        <div className="container section-shell space-y-8">
          {services.length === 0 ? (
            <div className="rounded-2xl border border-border bg-white px-6 py-10 text-center text-muted shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
              <p className="text-lg font-semibold text-ink">{p.empty}</p>
              <p className="mt-2">{p.emptySubtitle}</p>
              <Link href="/contacto" className="mt-4 inline-block btn-primary">{p.openContact}</Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <article key={service.slug} className="rounded-2xl border border-border bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)] flex h-full flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                      {service.slug}
                    </p>
                    <h3 className="text-lg font-heading font-semibold text-ink">{service.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{service.description}</p>

                    {service.detail && (
                      <div className="space-y-3 text-sm text-muted">
                        <div>
                          <p className="font-semibold text-ink">{p.whenActivated}</p>
                          <ul className="mt-1 list-disc space-y-1 pl-4">
                            {service.detail.activation.slice(0, 2).map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-ink">{p.deliverables}</p>
                          <ul className="mt-1 list-disc space-y-1 pl-4">
                            {service.detail.deliverables.slice(0, 2).map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
                    <Link href={`/servicios/${service.slug}`} className="font-semibold text-accent transition hover:text-ink">
                      {p.viewDetail}
                    </Link>
                    <Link href="/contacto" className="font-semibold text-muted transition hover:text-ink">
                      {p.consultScope}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
