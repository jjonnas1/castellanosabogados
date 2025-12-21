"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import { enrichService, type ServiceArea } from "@/lib/serviceAreas";
import { getServiceDetail } from "@/lib/serviceDetails";

const headerBackground =
  "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";

export default function ServicesPageContent({
  services,
  hasError,
}: {
  services: ServiceArea[];
  hasError?: boolean;
}) {
  const { messages, locale } = useLanguage();
  const { servicesPage, navigation, common, home } = messages;
  const primary = servicesPage.sections[0];
  const secondary = servicesPage.sections[1];
  const tertiary = servicesPage.sections[2];
  const localized = services
    .map((area) => enrichService(area, locale))
    .map((service) => ({ ...service, detail: getServiceDetail(service.slug) }));

  return (
    <main className="min-h-screen bg-canvas pb-16">
      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: headerBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/82 to-accent-700/70" aria-hidden />
        <div className="container relative flex flex-col gap-3 py-14">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{servicesPage.hero.title}</p>
          <h1 className="text-white">{servicesPage.hero.description}</h1>
          <p className="max-w-3xl text-slate-100">{servicesPage.hero.cta}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              {home.hero.ctaPrimary}
            </Link>
            <Link href="/" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              {common.backHome}
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-4">
          {primary && (
            <>
              <p className="pill w-fit">{primary.title}</p>
              <h2>{primary.body}</h2>
            </>
          )}
          {secondary && <p className="max-w-2xl text-muted">{secondary.body}</p>}
          <div className="grid gap-3 sm:grid-cols-2">
            {[primary, secondary, tertiary].filter(Boolean).map((item) => (
              <div key={item!.title} className="card-shell bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                <p className="text-ink">{item!.title}</p>
                <p className="text-muted text-xs leading-relaxed">{item!.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="card-shell overflow-hidden bg-gradient-to-b from-ink to-accent-700 p-0"
          style={{ backgroundImage: headerBackground, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="relative h-full w-full bg-gradient-to-b from-ink/80 via-ink/78 to-accent-700/82 p-8 text-white">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{servicesPage.hero.title}</p>
            {secondary && <h3 className="mt-3 text-white">{secondary.title}</h3>}
            {secondary && <p className="mt-2 max-w-xl text-slate-100">{secondary.body}</p>}
            <div className="mt-6 grid gap-3 text-sm text-slate-100">
              {[primary, tertiary].filter(Boolean).map((item) => (
                <div key={item!.title} className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                  {item!.title}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                {home.hero.ctaPrimary}
              </Link>
              <Link href="/" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                {common.backHome}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-shell space-y-8">
        {hasError && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {home.serviceAreas.noteText}
          </div>
        )}

        {localized.length === 0 ? (
          <div className="card-shell bg-white px-6 py-10 text-center text-muted">
            <p className="text-lg font-semibold text-ink">{home.serviceAreas.statusInquiry}</p>
            <p className="mt-2">{home.serviceAreas.advisoryDescription}</p>
            <Link href="/agenda" className="mt-4 inline-block btn-primary">
              {home.serviceAreas.agendaTitle}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {localized.map((service) => (
              <article key={service.slug} className="card-shell flex h-full flex-col justify-between bg-white p-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700">{service.slug}</p>
                  <h3 className="text-lg font-heading font-semibold text-ink">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{service.description}</p>
                  {service.detail && (
                    <div className="space-y-2 text-sm text-muted">
                      <div>
                        <p className="font-semibold text-ink">{home.serviceAreas.agendaTitle}</p>
                        <ul className="mt-1 space-y-1 list-disc pl-4">
                          {service.detail.activation.slice(0, 2).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-ink">{servicesPage.sections[1].title}</p>
                        <ul className="mt-1 space-y-1 list-disc pl-4">
                          {service.detail.deliverables.slice(0, 2).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={`/servicios/${service.slug}`} className="btn-secondary">
                    {home.serviceAreas.cta}
                  </Link>
                  <Link href="/agenda" className="btn-primary">
                    {home.serviceAreas.advisoryCta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
