"use client";

import Link from "next/link";

import SiteHeader from "./SiteHeader";
import { useLanguage } from "./LanguageProvider";

export default function PeoplePageContent() {
  const { messages } = useLanguage();
  const { people, navigation, common } = messages;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="border-b border-border bg-surface">
        <div className="container section-shell space-y-5">
          <h1 className="max-w-3xl">{people.hero.title}</h1>
          <p className="max-w-3xl text-lg text-muted">{people.hero.subtitle}</p>
          <p className="max-w-3xl text-muted">{people.hero.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary">
              {people.hero.ctaPrimary}
            </Link>
            <Link href="/metodologia" className="btn-secondary">
              {people.hero.ctaSecondary}
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
          <ul className="space-y-2 text-sm text-muted">
            {people.flow.notes.map((note) => (
              <li key={note} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary">
              {people.hero.ctaPrimary}
            </Link>
            <Link href="/" className="btn-secondary">
              {common.backHome}
            </Link>
          </div>
        </div>
        <div className="card-shell bg-white p-8 shadow-soft/40">
          <p className="pill w-fit">{people.expectations.title}</p>
          <h3 className="mt-3 text-ink">{people.expectations.title}</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {people.expectations.items.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
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
            <Link href="/contacto" className="btn-secondary">
              {navigation.contact}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <p className="pill w-fit">{people.fit.title}</p>
            <h2>{people.fit.forTitle}</h2>
            <ul className="space-y-2 text-sm text-muted">
              {people.fit.forItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="pill w-fit">{people.fit.notForTitle}</p>
            <h2>{people.fit.notForTitle}</h2>
            <ul className="space-y-2 text-sm text-muted">
              {people.fit.notForItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
