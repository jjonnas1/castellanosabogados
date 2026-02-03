"use client";

import Link from "next/link";

import SiteHeader from "./SiteHeader";
import { useLanguage } from "./LanguageProvider";

export default function MethodologyPageContent() {
  const { messages } = useLanguage();
  const { methodologyPage } = messages;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="border-b border-border bg-surface">
        <div className="container section-shell space-y-4">
          <p className="pill w-fit">{methodologyPage.hero.title}</p>
          <h1 className="max-w-3xl text-ink">{methodologyPage.hero.title}</h1>
          <p className="max-w-3xl text-muted">{methodologyPage.hero.subtitle}</p>
          <p className="text-sm text-muted">{methodologyPage.hero.note}</p>
        </div>
      </header>

      <section className="container section-shell grid gap-6 md:grid-cols-3">
        {methodologyPage.phases.map((phase, index) => (
          <div key={phase.title} className="card-shell bg-white p-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{`0${index + 1}`}</p>
            <h2 className="text-xl text-ink">{phase.title}</h2>
            <p className="text-sm text-muted">{phase.description}</p>
            <ul className="space-y-2 text-sm text-muted">
              {phase.deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="section-shell bg-surface">
        <div className="container space-y-6">
          <div className="space-y-2">
            <p className="pill w-fit">{methodologyPage.safeguards.title}</p>
            <h2>{methodologyPage.safeguards.title}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {methodologyPage.safeguards.items.map((item) => (
              <div key={item} className="card-shell bg-white p-5 text-sm text-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container space-y-6">
          <div className="space-y-2 text-center">
            <p className="pill mx-auto w-fit">{methodologyPage.faq.title}</p>
            <h2>{methodologyPage.faq.title}</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {methodologyPage.faq.items.map((item) => (
              <details key={item.question} className="card-shell bg-white p-5">
                <summary className="cursor-pointer text-sm font-semibold text-ink">{item.question}</summary>
                <p className="mt-3 text-sm text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container text-center space-y-4">
          <h2>{methodologyPage.cta.title}</h2>
          <p className="mx-auto max-w-2xl text-muted">{methodologyPage.cta.description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/agenda" className="btn-primary">
              {methodologyPage.cta.primary}
            </Link>
            <Link href="/" className="btn-secondary">
              {methodologyPage.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
