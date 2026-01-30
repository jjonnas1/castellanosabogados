"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import SiteHeader from "./SiteHeader";
import { enrichService, type ServiceArea } from "@/lib/serviceAreas";

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.9), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";

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
      <section
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.14),transparent_36%)]"
          aria-hidden
        />
        <div className="container section-shell relative space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-200">
            {business.hero.items.map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">
                {item}
              </span>
            ))}
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-white">{business.hero.title}</h1>
            <p className="max-w-3xl text-lg text-slate-100">{business.hero.subtitle}</p>
            <p className="max-w-3xl text-slate-100">{business.hero.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              {business.hero.ctaPrimary}
            </Link>
            <Link
              href="/como-trabajamos"
              className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              {business.hero.ctaSecondary}
            </Link>
          </div>
          <div className="grid gap-4 text-sm text-slate-100 sm:grid-cols-3">
            {business.hero.items.map((item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface/70">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">{business.services.title}</p>
            <h2>{business.services.intro}</h2>
            <p className="max-w-2xl text-muted">{business.hero.description}</p>
            <p className="max-w-2xl text-muted">{business.services.trainingDescription}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {business.services.blocks.map((item) => (
                <div key={item.title} className="card-shell bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                  <p className="text-ink">{item.title}</p>
                  <p className="mt-1 text-muted text-xs leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-shell bg-white p-8 shadow-soft/40">
            <p className="pill w-fit">{home.serviceAreas.advisoryTitle}</p>
            <h3 className="mt-3 text-ink">{home.businessPanel.title}</h3>
            <p className="mt-2 text-muted text-sm leading-relaxed">{home.businessPanel.paragraphs[0]}</p>
            <p className="mt-2 text-muted text-sm leading-relaxed">{home.businessPanel.paragraphs[1]}</p>
            <div className="mt-4 grid gap-2 text-sm text-muted">
              {home.businessPanel.cards.map((card) => (
                <div key={card.title} className="flex gap-3 rounded-2xl border border-border bg-subtle px-4 py-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  <div>
                    <p className="font-semibold text-ink">{card.title}</p>
                    <p className="text-muted">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary">
                {business.hero.ctaPrimary}
              </Link>
              <Link href="/contacto" className="btn-secondary">
                {navigation.contact}
              </Link>
            </div>
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
          <div className="card-shell bg-ink p-8 text-white shadow-soft">
            <p className="pill w-fit bg-white/10 text-white ring-1 ring-white/20">{home.serviceAreas.trainingTitle}</p>
            <h3 className="mt-3 text-white">{home.serviceAreas.trainingDescription}</h3>
            <p className="text-slate-100">{home.serviceAreas.trainingDescription}</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-100">
              {home.serviceAreas.trainingItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-200">{home.serviceAreas.noteText}</p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card-shell bg-white p-6">
              <p className="pill w-fit">{home.motivations.title}</p>
              <h2 className="mt-3 text-ink">{home.motivations.title}</h2>
              <div className="mt-4 grid gap-3">
                {home.motivations.items.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-subtle px-4 py-3">
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-shell bg-white p-6">
              <p className="pill w-fit">{home.deliveries.title}</p>
              <h2 className="mt-3 text-ink">{home.deliveries.title}</h2>
              <div className="mt-4 grid gap-3">
                {home.deliveries.items.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-subtle px-4 py-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink/70">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="pill w-fit">{home.scenarios.title}</p>
              <h2>{home.scenarios.title}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {home.scenarios.items.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-white p-5 shadow-soft/30">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </div>
              ))}
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
