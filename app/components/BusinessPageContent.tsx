"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import SiteHeader from "./SiteHeader";
import { enrichService, type ServiceArea } from "@/lib/serviceAreas";

export default function BusinessPageContent({
  services,
  hasError,
}: {
  services: ServiceArea[];
  hasError?: boolean;
}) {
  const { messages, locale } = useLanguage();
  const { business, navigation, home } = messages;
  const localizedServices = services.map((service) => enrichService(service, locale));

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />
      <section className="border-b border-border bg-surface">
        <div className="container section-shell space-y-5">
          <div className="space-y-3">
            <h1 className="max-w-4xl">{business.hero.title}</h1>
            <p className="max-w-3xl text-lg text-muted">{business.hero.subtitle}</p>
            <p className="max-w-3xl text-muted">{business.hero.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/agenda" className="btn-primary">
              {business.hero.ctaPrimary}
            </Link>
            <Link href="/metodologia" className="btn-secondary">
              {business.hero.ctaSecondary}
            </Link>
          </div>
          <div className="grid gap-3 text-sm text-muted sm:grid-cols-3">
            {business.hero.items.map((item) => (
              <div key={item} className="border-t border-border pt-3">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container space-y-6">
          <div className="space-y-2 text-center">
            <p className="pill mx-auto w-fit">{business.problems.title}</p>
            <h2>{business.problems.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {business.problems.items.map((item) => (
              <div key={item.title} className="card-shell bg-white p-6">
                <h3 className="text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container space-y-8">
          <div className="space-y-2">
            <p className="pill w-fit">{business.deliverables.title}</p>
            <h2>{business.deliverables.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {business.deliverables.items.map((item) => (
              <div key={item.title} className="card-shell bg-white p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">{item.title}</p>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {business.process.steps.map((step, index) => (
              <div key={step.title} className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{`0${index + 1}`}</p>
                <h3 className="text-lg text-ink">{step.title}</h3>
                <p className="text-sm text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <p className="pill w-fit">{business.fit.title}</p>
            <h2>{business.fit.forTitle}</h2>
            <ul className="space-y-2 text-sm text-muted">
              {business.fit.forItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="pill w-fit">{business.fit.notForTitle}</p>
            <h2>{business.fit.notForTitle}</h2>
            <ul className="space-y-2 text-sm text-muted">
              {business.fit.notForItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="container section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">{business.services.trainingTitle}</p>
            <h2>{business.services.trainingTitle}</h2>
            <p className="max-w-3xl text-muted">{business.services.trainingDescription}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {business.services.trainingModes.map((item) => (
                <div key={item} className="rounded-2xl bg-subtle px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary">
                {business.services.trainingCta}
              </Link>
              <Link href="/contacto" className="btn-secondary">
                {navigation.contact}
              </Link>
            </div>
          </div>
          <div className="card-shell bg-accent-50 p-8 text-ink shadow-soft">
            <p className="pill w-fit">{home.serviceAreas.trainingTitle}</p>
            <h3 className="mt-3 text-ink">{home.serviceAreas.trainingDescription}</h3>
            <p className="text-muted">{home.serviceAreas.trainingDescription}</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {home.serviceAreas.trainingItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">{home.serviceAreas.noteText}</p>
          </div>
        </div>
      </section>

      <section className="container section-shell space-y-8">
        {hasError && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {home.serviceAreas.noteText}
          </div>
        )}

        {localizedServices.length === 0 ? (
          <div className="card-shell bg-white px-6 py-10 text-center text-muted">
            <p className="text-lg font-semibold text-ink">{home.serviceAreas.statusInquiry}</p>
            <p className="mt-2">{home.serviceAreas.advisoryDescription}</p>
            <Link href="/agenda" className="mt-4 inline-block btn-primary">
              {home.serviceAreas.agendaTitle}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {localizedServices.map((service) => (
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
        )}
      </section>

      <section className="section-shell bg-surface">
        <div className="container space-y-6">
          <div className="space-y-2 text-center">
            <p className="pill mx-auto w-fit">{business.faq.title}</p>
            <h2>{business.faq.title}</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {business.faq.items.map((item) => (
              <details key={item.question} className="card-shell bg-white p-5">
                <summary className="cursor-pointer text-sm font-semibold text-ink">{item.question}</summary>
                <p className="mt-3 text-sm text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container text-center space-y-4">
          <h2>{business.hero.ctaPrimary}</h2>
          <p className="mx-auto max-w-2xl text-muted">{business.hero.description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/agenda" className="btn-primary">
              {business.hero.ctaPrimary}
            </Link>
            <Link href="/metodologia" className="btn-secondary">
              {business.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
