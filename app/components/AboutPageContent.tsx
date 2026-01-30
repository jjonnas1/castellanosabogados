"use client";

import Link from "next/link";

import SiteHeader from "./SiteHeader";
import { useLanguage } from "./LanguageProvider";

export default function AboutPageContent() {
  const { messages } = useLanguage();
  const { about, navigation } = messages;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-ink via-ink/90 to-accent text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_72%_8%,rgba(255,255,255,0.12),transparent_36%)]"
          aria-hidden
        />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{navigation.about}</p>
          <h1 className="max-w-3xl text-white">{about.hero.title}</h1>
          <p className="max-w-3xl text-lg text-slate-100">{about.hero.subtitle}</p>
          <p className="max-w-3xl text-slate-100">{about.hero.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              {navigation.signIn}
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

      <section className="border-b border-border bg-white/90">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-3">
            <p className="pill w-fit">{about.founder.title}</p>
            <h2>{about.founder.role}</h2>
            <div className="space-y-3 text-muted">
              {about.founder.paragraphs.map((p) => (
                <p key={p} className="max-w-3xl">
                  {p}
                </p>
              ))}
            </div>
            <div className="grid gap-2 text-sm text-muted">
              {about.founder.bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {bullet}
                </div>
              ))}
            </div>
            <Link href="/contacto" className="btn-secondary">
              {about.founder.cta}
            </Link>
          </div>
          <div className="card-shell bg-subtle p-8 shadow-soft/40">
            <div className="aspect-[4/3] rounded-2xl border border-border bg-white/60" aria-hidden />
            <p className="mt-3 text-sm text-muted">{about.founder.paragraphs[0]}</p>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>{about.values.title}</p>
              <p>{about.hero.subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-shell space-y-6">
        <div className="space-y-3">
          <p className="pill w-fit">{about.values.title}</p>
          <h2>{about.hero.subtitle}</h2>
          <p className="max-w-3xl text-muted">{about.hero.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {about.values.items.map((role) => (
            <div key={role.title} className="rounded-2xl border border-border bg-white p-6 shadow-soft/30">
              <h3 className="text-ink">{role.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{role.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
