"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import { enrichService, type ServiceArea } from "@/lib/serviceAreas";
import SiteHeader from "./SiteHeader";

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.88), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";
const executiveDesk =
  "linear-gradient(180deg, rgba(13,21,40,0.9), rgba(13,21,40,0.8)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2100&q=80')";
const skylineBackground =
  "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(17,37,68,0.75)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80')";
const counselSession =
  "linear-gradient(180deg, rgba(12,17,29,0.85), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1439778615639-28529f7628bc?auto=format&fit=crop&w=2000&q=80')";
const personalAdvisory =
  "linear-gradient(140deg, rgba(10,16,28,0.88), rgba(20,32,52,0.78)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80')";

export default function HomeContent({ serviceList }: { serviceList: ServiceArea[] }) {
  const { messages, locale } = useLanguage();
  const { home, navigation } = messages;
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

      <section className="section-shell bg-surface/80">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">{home.businessFocus.pill}</p>
            <h2>{home.businessFocus.title}</h2>
            <div className="space-y-3 text-base text-muted">
              {home.businessFocus.paragraphs.map((p) => (
                <p key={p} className="max-w-3xl">
                  {p}
                </p>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {home.businessFocus.cards.map((card) => (
                <div key={card.title} className="card-shell bg-white">
                  <h3 className="text-lg text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted">{card.body}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
              <p className="font-semibold uppercase tracking-wide text-[11px] text-amber-700">{home.businessFocus.noteLabel}</p>
              <p className="mt-2 max-w-3xl leading-relaxed">{home.businessFocus.noteText}</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-soft">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink/80">
              {home.businessPanel.badges.map((badge) => (
                <span key={badge} className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
                  {badge}
                </span>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              <h3>{home.businessPanel.title}</h3>
              <div className="space-y-2 text-sm text-muted">
                {home.businessPanel.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {home.businessPanel.cards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-border bg-subtle px-4 py-3 text-sm">
                  <p className="font-semibold text-ink">{card.title}</p>
                  <p className="mt-2 text-muted">{card.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {home.businessPanel.ctas.map((cta) => (
                <Link key={cta.label} href={cta.href} className="btn-secondary">
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="pill w-fit bg-ink text-white ring-white/20">{home.serviceAreas.pill}</span>
            <span className="pill w-fit bg-amber-100 text-amber-900 ring-amber-200">{home.serviceAreas.noteLabel}</span>
          </div>
          <div className="space-y-3">
            <h2>{home.serviceAreas.title}</h2>
            <p className="max-w-3xl text-lg text-muted">{home.serviceAreas.description}</p>
          </div>
          <p className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm text-blue-900">
            <span className="font-semibold">{home.serviceAreas.noteLabel}: </span>
            {home.serviceAreas.noteText}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {localizedServices.map((service) => (
              <article key={service.slug} className="card-shell bg-subtle">
                <div className="flex items-start justify-between gap-3">
                  <p className="pill w-fit bg-ink text-white ring-ink/30">{home.serviceAreas.pill}</p>
                  <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-green-800">
                    {home.serviceAreas.statusActive}
                  </span>
                </div>
                <h3 className="text-lg text-ink">{service.title}</h3>
                <p className="text-sm text-muted">{service.description}</p>
                <div className="mt-4 grid gap-3 text-sm">
                  <Link href={`/servicios/${service.slug}`} className="btn-secondary">
                    {home.serviceAreas.cta}
                  </Link>
                  <Link href={`/servicios/${service.slug}`} className="btn-primary bg-ink text-white">
                    {home.serviceAreas.advisoryCta}
                  </Link>
                  <Link href="/contacto" className="btn-secondary">
                    {home.serviceAreas.trainingCta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-gradient-to-br from-ink via-ink/95 to-slate-900 text-white" style={{ backgroundImage: executiveDesk }}>
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{home.peopleLine.title}</p>
            <h2 className="text-white">{home.serviceAreas.advisoryTitle}</h2>
            <p className="text-lg text-slate-100">{home.serviceAreas.advisoryDescription}</p>
            <ul className="space-y-2 text-sm text-slate-200">
              {home.serviceAreas.advisoryItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-100">
              <span className="font-semibold uppercase tracking-[0.14em] text-[11px] text-slate-200">{home.serviceAreas.noteLabel}: </span>
              {home.serviceAreas.advisoryNote}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/asesoria-personas" className="btn-primary bg-white text-ink">
                {home.serviceAreas.advisoryCta}
              </Link>
              <Link href="/agenda" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
                {home.serviceAreas.advisoryTitle}
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-8 shadow-soft">
            <div className="space-y-3">
              <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{home.serviceAreas.trainingTitle}</p>
              <h3 className="text-white">{home.serviceAreas.trainingTitle}</h3>
              <p className="text-slate-100">{home.serviceAreas.trainingDescription}</p>
              <ul className="space-y-2 text-sm text-slate-100">
                {home.serviceAreas.trainingItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/penal-empresarial" className="btn-primary bg-white text-ink">
                {home.serviceAreas.trainingCta}
              </Link>
              <Link href="/contacto" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
                {home.serviceAreas.contactCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface/80">
        <div className="container space-y-8">
          <div className="space-y-3 max-w-3xl">
            <p className="pill w-fit">{home.motivations.title}</p>
            <h2>{home.deliveries.title}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {home.motivations.items.map((item) => (
              <div key={item.title} className="card-shell bg-white">
                <h3 className="text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {home.deliveries.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-white p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink/70">{item.title}</p>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas" style={{ backgroundImage: skylineBackground, backgroundSize: "cover" }}>
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4 text-white">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/20">{home.serviceAreas.agendaTitle}</p>
            <h2 className="text-white">{home.serviceAreas.agendaTitle}</h2>
            <p className="text-lg text-slate-100">{home.serviceAreas.agendaDescription}</p>
            <ul className="space-y-2 text-sm text-slate-100">
              {home.serviceAreas.agendaItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-slate-100">
              <span className="font-semibold uppercase tracking-[0.14em] text-[11px] text-slate-200">{home.serviceAreas.noteLabel}: </span>
              {home.serviceAreas.agendaNote}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary bg-white text-ink">
                {home.serviceAreas.advisoryCta}
              </Link>
              <Link href="/contacto" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
                {home.serviceAreas.contactCta}
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/5 p-8 text-white shadow-soft" style={{ backgroundImage: counselSession, backgroundSize: "cover" }}>
            <div className="space-y-3">
              <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/20">{home.peopleLine.title}</p>
              <h3 className="text-white">{home.peopleLine.title}</h3>
              <p className="text-slate-100">{home.peopleLine.paragraphs[0]}</p>
              <ul className="space-y-2 text-sm text-slate-100">
                {home.peopleLine.cards.map((card) => (
                  <li key={card.title} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                    <div>
                      <p className="font-semibold">{card.title}</p>
                      <p className="text-slate-200">{card.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/asesoria-personas" className="btn-primary bg-white text-ink">
                {home.serviceAreas.advisoryCta}
              </Link>
              <Link href="/login" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
                {navigation.login}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface/80" style={{ backgroundImage: personalAdvisory, backgroundSize: "cover" }}>
        <div className="container space-y-8 text-white">
          <div className="space-y-3 max-w-3xl">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{home.methodology.pill}</p>
            <h2 className="text-white">{home.methodology.title}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {home.methodology.pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">{pillar.title}</p>
                <p className="mt-2 text-sm text-slate-100">{pillar.body}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {home.methodology.steps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">{step.title}</p>
                <p className="mt-2 text-sm text-slate-100">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
