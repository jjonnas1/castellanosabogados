"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import SiteHeader from "./SiteHeader";

export default function HomeContent() {
  const { messages } = useLanguage();
  const { home } = messages;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section className="section-shell border-b border-border bg-canvas">
        <div className="container space-y-6">
          <div className="max-w-3xl space-y-4">
            <h1>{home.hero.title}</h1>
            <p className="text-lg text-muted">{home.hero.subtitle}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/agenda" className="btn-primary">
                {home.hero.ctaPrimary}
              </Link>
              <Link href="/metodologia" className="btn-secondary">
                {home.hero.ctaSecondary}
              </Link>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{home.hero.microcopy}</p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container max-w-3xl space-y-3 text-lg text-ink">
          {home.whatWeDo.map((line) => (
            <p key={line} className="text-ink">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container grid gap-6 md:grid-cols-2">
          {home.paths.map((path) => (
            <div key={path.title} className="space-y-3 border-b border-border pb-6 md:border-b-0 md:pb-0">
              <h2 className="text-2xl">{path.title}</h2>
              <p className="text-muted">{path.description}</p>
              <Link href={path.href} className="btn-secondary">
                {path.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-lg text-ink">{home.methodology.line}</p>
          <Link href="/metodologia" className="btn-secondary">
            {home.methodology.cta}
          </Link>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container space-y-4">
          <h2 className="max-w-2xl">{home.finalCta.title}</h2>
          <Link href="/agenda" className="btn-primary">
            {home.finalCta.ctaPrimary}
          </Link>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{home.finalCta.note}</p>
        </div>
      </section>
    </main>
  );
}
