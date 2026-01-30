"use client";

import Link from "next/link";

import SiteHeader from "./SiteHeader";
import { useLanguage } from "./LanguageProvider";

const personalBackground =
  "linear-gradient(140deg, rgba(10,16,28,0.9), rgba(20,32,52,0.82)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80')";

export default function PeoplePageContent() {
  const { messages } = useLanguage();
  const { people, navigation, common, home } = messages;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: personalBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/82 to-accent-700/70" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{people.hero.subtitle}</p>
          <h1 className="max-w-3xl text-white">{people.hero.title}</h1>
          <p className="max-w-3xl text-slate-100">{people.hero.description}</p>
          <div className="grid gap-3 sm:grid-cols-2 text-sm text-slate-100">
            {people.hero.items.map((item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
                {item}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              {people.hero.ctaPrimary}
            </Link>
            <Link
              href="/contacto"
              className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              {navigation.contact}
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4">
          <p className="pill w-fit">{people.flow.title}</p>
          <h2>{people.flow.description}</h2>
          <div className="space-y-3 text-muted">
            {people.flow.steps.map((step) => (
              <p key={step.title} className="max-w-2xl">
                <span className="font-semibold text-ink">{step.title}: </span>
                {step.body}
              </p>
            ))}
          </div>
          <p className="max-w-2xl text-muted text-sm">{people.flow.notes.join(" ")}</p>
        </div>
        <div className="card-shell bg-white p-8 shadow-soft/40">
          <p className="pill w-fit">{people.expectations.title}</p>
          <h3 className="mt-3 text-ink">{people.hero.subtitle}</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {people.expectations.items.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                <div>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary">
              {people.hero.ctaPrimary}
            </Link>
            <Link href="/" className="btn-secondary">
              {common.backHome}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/70">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <p className="pill w-fit">{home.methodology.pill}</p>
            <h2>{home.methodology.title}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {home.methodology.pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl border border-border bg-white px-4 py-4 text-sm shadow-soft/30">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink/70">{pillar.title}</p>
                  <p className="mt-2 text-sm text-muted">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-shell bg-white p-8 shadow-soft/40">
            <p className="pill w-fit">{home.methodology.title}</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {home.methodology.steps.map((step) => (
                <li key={step.title} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  <div>
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary">
                {people.hero.ctaSecondary}
              </Link>
              <Link href="/contacto" className="btn-secondary">
                {navigation.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white/90">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <p className="pill w-fit">{home.serviceAreas.agendaTitle}</p>
            <h2>{home.serviceAreas.agendaTitle}</h2>
            <p className="max-w-2xl text-muted">{home.serviceAreas.agendaDescription}</p>
            <ul className="space-y-2 text-sm text-muted">
              {home.serviceAreas.agendaItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="rounded-2xl border border-border bg-subtle px-5 py-4 text-sm text-muted">
              <span className="font-semibold uppercase tracking-[0.14em] text-[11px] text-ink/70">
                {home.serviceAreas.noteLabel}:
              </span>{" "}
              {home.serviceAreas.agendaNote}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary">
                {people.hero.ctaPrimary}
              </Link>
              <Link href="/contacto" className="btn-secondary">
                {navigation.contact}
              </Link>
            </div>
          </div>

          <div className="card-shell bg-ink p-8 text-white shadow-soft">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/25">{home.peopleLine.title}</p>
            <h3 className="mt-3 text-white">{home.peopleLine.title}</h3>
            <p className="text-slate-100">{home.peopleLine.paragraphs[0]}</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-100">
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
            <div className="mt-6 flex flex-wrap gap-3">
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
    </main>
  );
}
