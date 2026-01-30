"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import { enrichService, type ServiceArea } from "@/lib/serviceAreas";

export default function ServicesPageContent({
  services,
  hasError,
}: {
  services: ServiceArea[];
  hasError?: boolean;
}) {
  const { messages, locale } = useLanguage();
  const { servicesPage, common, home } = messages;
  const primary = servicesPage.sections[0];
  const secondary = servicesPage.sections[1];
  const tertiary = servicesPage.sections[2];
  const localized = services.map((area) => enrichService(area, locale));

  return (
    <main className="min-h-screen bg-canvas pb-16">
      <header className="border-b border-border bg-surface">
        <div className="container flex flex-col gap-3 py-14">
          <p className="pill w-fit">{servicesPage.hero.title}</p>
          <h1>{servicesPage.hero.description}</h1>
          <p className="max-w-3xl text-muted">{servicesPage.hero.cta}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary">
              {home.hero.ctaPrimary}
            </Link>
            <Link href="/" className="btn-secondary">
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
        <div className="card-shell bg-accent-50 p-8">
          <p className="pill w-fit">{servicesPage.hero.title}</p>
          {secondary && <h3 className="mt-3 text-ink">{secondary.title}</h3>}
          {secondary && <p className="mt-2 max-w-xl text-muted">{secondary.body}</p>}
          <div className="mt-6 grid gap-3 text-sm text-muted">
            {[primary, tertiary].filter(Boolean).map((item) => (
              <div key={item!.title} className="rounded-[14px] border border-border bg-white/70 px-4 py-3">
                {item!.title}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary">
              {home.hero.ctaPrimary}
            </Link>
            <Link href="/" className="btn-secondary">
              {common.backHome}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container space-y-6">
          <div className="space-y-3 text-center">
            <p className="pill mx-auto w-fit">{home.serviceAreas.pill}</p>
            <h2>{home.serviceAreas.title}</h2>
            <p className="mx-auto max-w-3xl text-muted">{home.serviceAreas.description}</p>
          </div>
          {hasError && (
            <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {home.serviceAreas.noteText}
            </div>
          )}
          <p className="mx-auto max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm text-blue-900">
            <span className="font-semibold">{home.serviceAreas.noteLabel}: </span>
            {home.serviceAreas.noteText}
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {localized.map((service) => (
              <article key={service.slug} className="card-shell flex h-full flex-col justify-between bg-white p-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700">{service.slug}</p>
                  <h3 className="text-lg font-heading font-semibold text-ink">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{service.description}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={`/servicios/${service.slug}`} className="btn-secondary">
                    {home.serviceAreas.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="card-shell bg-white p-8">
            <div className="space-y-3">
              <p className="pill w-fit">{home.serviceAreas.advisoryTitle}</p>
              <h2 className="text-ink">{home.serviceAreas.advisoryTitle}</h2>
              <p className="text-muted">{home.serviceAreas.advisoryDescription}</p>
              <ul className="space-y-2 text-sm text-muted">
                {home.serviceAreas.advisoryItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/asesoria-personas" className="btn-primary">
                {home.serviceAreas.advisoryCta}
              </Link>
              <Link href="/agenda" className="btn-secondary">
                {home.serviceAreas.agendaTitle}
              </Link>
            </div>
          </div>

          <div className="card-shell bg-accent-50 p-8 text-ink">
            <div className="space-y-3">
              <p className="pill w-fit">{home.serviceAreas.trainingTitle}</p>
              <h2 className="text-ink">{home.serviceAreas.trainingTitle}</h2>
              <p className="text-muted">{home.serviceAreas.trainingDescription}</p>
              <ul className="space-y-2 text-sm text-muted">
                {home.serviceAreas.trainingItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/penal-empresarial" className="btn-primary">
                {home.serviceAreas.trainingCta}
              </Link>
              <Link href="/contacto" className="btn-secondary">
                {home.serviceAreas.contactCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container text-center space-y-4">
          <h2>{home.finalCta.title}</h2>
          {home.finalCta.description && (
            <p className="mx-auto max-w-2xl text-muted">{home.finalCta.description}</p>
          )}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/agenda" className="btn-primary">
              {home.finalCta.ctaPrimary}
            </Link>
            <Link href="/metodologia" className="btn-secondary">
              {home.finalCta.ctaSecondary}
            </Link>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{home.finalCta.note}</p>
        </div>
      </section>

    </main>
  );
}
