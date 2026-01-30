"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import { enrichService, type ServiceArea } from "@/lib/serviceAreas";
import SiteHeader from "./SiteHeader";

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.88), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";
export default function HomeContent({ serviceList }: { serviceList: ServiceArea[] }) {
  const { messages, locale } = useLanguage();
  const { home } = messages;
  const localizedServices = serviceList.map((area) => enrichService(area, locale));

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section
        id="riesgo-empresarial"
        className="relative overflow-hidden border-b border-border/60 text-white"
        style={{
          backgroundImage: heroBackground,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.14),transparent_36%)]"
          aria-hidden
        />
        <div className="container section-shell relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              {home.hero.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="space-y-4 max-w-3xl">
              <h1 className="text-white">{home.hero.title}</h1>
              <p className="text-lg text-slate-100">{home.hero.paragraph1}</p>
              <p className="text-slate-100">{home.hero.paragraph2}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                {home.hero.ctaPrimary}
              </Link>
              <Link
                href="/como-trabajamos"
                className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                {home.hero.ctaSecondary}
              </Link>
            </div>

            <div className="grid gap-4 text-sm text-slate-100 sm:grid-cols-3">
              {home.hero.highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300">{item.label}</p>
                  <p className="mt-2 font-semibold leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 shadow-soft ring-1 ring-white/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">{home.hero.model.badge}</p>
                <h3 className="mt-2 text-white">{home.hero.model.title}</h3>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white ring-1 ring-white/20">
                {home.hero.model.badgeSecondary}
              </span>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-100">
              {home.hero.model.items.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 text-xs uppercase tracking-[0.16em] text-slate-300 sm:grid-cols-3">
              {home.hero.model.tags.map((tag) => (
                <div key={tag} className="rounded-full bg-white/10 px-3 py-2 text-center">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container space-y-10">
          <div className="space-y-3 text-center">
            <p className="pill mx-auto w-fit">{home.motivations.title}</p>
            <h2>{home.motivations.title}</h2>
            <p className="mx-auto max-w-3xl text-muted">{home.deliveries.title}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {home.motivations.items.map((item) => (
              <div key={item.title} className="card-shell bg-white p-6">
                <h3 className="text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {home.deliveries.items.map((item) => (
              <div key={item.title} className="card-shell bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/70">{item.title}</p>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </div>
            ))}
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
          <div className="grid gap-6 md:grid-cols-3">
            {localizedServices.slice(0, 3).map((service) => (
              <article key={service.slug} className="card-shell bg-white p-6">
                <h3 className="text-lg text-ink">{service.title}</h3>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
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
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/servicios" className="btn-secondary">
              {home.serviceAreas.cta}
            </Link>
            <Link href="/contacto" className="btn-primary">
              {home.serviceAreas.contactCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
