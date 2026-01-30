"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import SiteHeader from "./SiteHeader";

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.88), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";
export default function HomeContent() {
  const { messages } = useLanguage();
  const { home } = messages;

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
        <div className="container section-shell relative space-y-8">
          <div className="space-y-4 max-w-3xl">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{home.hero.label}</p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-slate-200">
              {home.hero.badges.map((badge) => (
                <span key={badge} className="rounded-[14px] bg-white/10 px-3 py-1 ring-1 ring-white/20">
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="text-white">{home.hero.titleA}</h1>
            <p className="text-lg text-slate-100">{home.hero.subtitleA}</p>
            <p className="text-sm text-slate-200">{home.hero.note}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              {home.hero.ctaPrimary}
            </Link>
            <Link
              href="/metodologia"
              className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              {home.hero.ctaSecondary}
            </Link>
          </div>

          <p className="text-xs uppercase tracking-[0.18em] text-slate-300">{home.hero.trustNote}</p>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container space-y-8">
          <div className="space-y-2 text-center">
            <p className="pill mx-auto w-fit">{home.outcomesTitle}</p>
            <h2>{home.outcomesTitle}</h2>
            <p className="mx-auto max-w-3xl text-muted">{home.hero.subtitleB}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {home.outcomes.map((item, index) => (
              <div key={item.title} className="card-shell bg-white p-5">
                <div className="flex items-center gap-3 text-sm font-semibold text-ink">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-border bg-subtle text-ink">
                    {index + 1}
                  </span>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container space-y-6">
          <div className="space-y-2 text-center">
            <p className="pill mx-auto w-fit">{home.howWeWork.title}</p>
            <h2>{home.howWeWork.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {home.howWeWork.steps.map((step, index) => (
              <div key={step.title} className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{`0${index + 1}`}</p>
                <h3 className="text-xl text-ink">{step.title}</h3>
                <p className="text-sm text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container space-y-6">
          <div className="space-y-3 text-center">
            <p className="pill mx-auto w-fit">{home.servicesPreview.title}</p>
            <h2>{home.servicesPreview.title}</h2>
            <p className="mx-auto max-w-3xl text-muted">{home.servicesPreview.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {home.servicesPreview.cards.map((card, index) => (
              <article key={card.title} className={`card-shell p-6 ${index === 1 ? "bg-subtle" : "bg-white"}`}>
                <h3 className="text-lg text-ink">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.body}</p>
                <Link href={card.href} className="mt-4 inline-flex btn-secondary">
                  {card.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="pill w-fit">{home.fit.title}</p>
            <h2>{home.fit.forTitle}</h2>
            <ul className="space-y-3 text-sm text-muted">
              {home.fit.forItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="pill w-fit">{home.fit.notForTitle}</p>
            <h2>{home.fit.notForTitle}</h2>
            <ul className="space-y-3 text-sm text-muted">
              {home.fit.notForItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container space-y-6">
          <div className="space-y-2 text-center">
            <p className="pill mx-auto w-fit">{home.faq.title}</p>
            <h2>{home.faq.title}</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {home.faq.items.map((item) => (
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
          <h2>{home.finalCta.title}</h2>
          <p className="mx-auto max-w-2xl text-muted">{home.finalCta.description}</p>
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
