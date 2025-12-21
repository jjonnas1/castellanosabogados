import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";
import { useLanguage } from "./components/LanguageProvider";

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

export default async function Home() {
  const { data: services } = await fetchServiceAreas();

  return <HomeContent serviceList={services} />;
}

function HomeContent({ serviceList }: { serviceList: Awaited<ReturnType<typeof fetchServiceAreas>>["data"] }) {
  "use client";
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

      <section className="section-shell bg-surface/80">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">{home.businessFocus.pill}</p>
            <h2>{home.businessFocus.title}</h2>
            {home.businessFocus.paragraphs.map((p) => (
              <p key={p} className="max-w-2xl">
                {p}
              </p>
            ))}
            <div className="grid gap-4 sm:grid-cols-2">
              {home.businessFocus.cards.map((item) => (
                <div key={item.title} className="card-shell bg-white px-5 py-5 shadow-soft/40">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-accent-700">{item.title}</p>
                  <p className="mt-2 text-sm font-semibold text-ink leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-muted shadow-soft/30">
              <span className="rounded-full bg-subtle px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-700">
                {home.businessFocus.noteLabel}
              </span>
              {home.businessFocus.noteText}
            </div>
          </div>

          <div
            className="relative card-shell overflow-hidden bg-ink p-0 text-white shadow-soft"
            style={{ backgroundImage: counselSession, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-accent-700/70" aria-hidden />
            <div className="relative grid gap-4 p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-200">
                {home.businessPanel.badges.map((badge) => (
                  <span key={badge} className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">
                    {badge}
                  </span>
                ))}
              </div>
              <h3 className="text-white">{home.businessPanel.title}</h3>
              {home.businessPanel.paragraphs.map((p) => (
                <p key={p} className="text-slate-100">
                  {p}
                </p>
              ))}
              <div className="grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                {home.businessPanel.cards.map((card) => (
                  <div key={card.title} className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/80">{card.title}</p>
                    <p className="mt-1 font-semibold">{card.body}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {home.businessPanel.ctas.map((cta) => (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className={
                      cta.href === "/servicios"
                        ? "btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
                        : "btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                    }
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="relative overflow-hidden border-y border-border/60 bg-surface/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(31,54,93,0.08),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(15,23,42,0.06),transparent_34%)]" aria-hidden />
        <div className="container section-shell relative space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">{home.serviceAreas.pill}</p>
              <h2>{home.serviceAreas.title}</h2>
              <p className="max-w-2xl">{home.serviceAreas.description}</p>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-muted shadow-soft/30">
                <span className="rounded-full bg-subtle px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-700">
                  {home.serviceAreas.noteLabel}
                </span>
                {home.serviceAreas.noteText}
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm text-muted">
              <Link href="/agenda" className="btn-primary">
                {home.serviceAreas.cta}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {localizedServices.map((area) => (
              <div key={area.slug} className="card-shell flex flex-col gap-3 bg-white px-4 py-4 shadow-soft/40">
                <div className="flex items-center justify-between gap-3">
                  <p className="pill text-xs">{area.slug.toUpperCase()}</p>
                  <span className="rounded-full bg-subtle px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-700">
                    {area.enabled ? home.serviceAreas.statusActive : home.serviceAreas.statusInquiry}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-ink">{area.title}</h3>
                <p className="text-sm text-muted">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-panel/40">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit bg-accent-50">{home.serviceAreas.advisoryTitle}</p>
            <h2>{home.serviceAreas.advisoryDescription}</h2>
            <p className="max-w-prose text-muted">{home.serviceAreas.advisoryNote}</p>
            <ul className="space-y-3 text-sm text-ink">
              {home.serviceAreas.advisoryItems.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft/20">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link href="/asesoria-personas" className="btn-primary">
                {home.serviceAreas.advisoryCta}
              </Link>
              <Link href="/contacto" className="btn-secondary">
                {home.serviceAreas.contactCta}
              </Link>
            </div>
          </div>

          <div className="card-shell space-y-4 bg-ink text-white" style={{ backgroundImage: personalAdvisory }}>
            <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/80 to-ink/90" aria-hidden />
            <div className="relative space-y-4 p-8">
              <p className="pill w-fit bg-white/10 text-white ring-1 ring-white/20">{home.serviceAreas.agendaTitle}</p>
              <h3 className="text-white">{home.serviceAreas.agendaDescription}</h3>
              <p className="text-slate-100">{home.serviceAreas.agendaNote}</p>
              <div className="space-y-3 text-sm text-slate-100">
                {home.serviceAreas.agendaItems.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="card-shell relative overflow-hidden bg-ink text-white" style={{ backgroundImage: executiveDesk }}>
            <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/82 to-accent-700/70" aria-hidden />
            <div className="relative space-y-4 p-8">
              <p className="pill w-fit bg-white/10 text-white ring-1 ring-white/20">{home.serviceAreas.trainingTitle}</p>
              <h3 className="text-white">{home.serviceAreas.trainingDescription}</h3>
              <div className="space-y-3 text-sm text-slate-100">
                {home.serviceAreas.trainingItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/penal-empresarial" className="btn-primary bg-white text-ink">
                {home.serviceAreas.trainingCta}
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="pill w-fit">{home.peopleLine.title}</p>
            {home.peopleLine.paragraphs.map((p) => (
              <p key={p} className="max-w-prose">
                {p}
              </p>
            ))}
            <div className="grid gap-4 sm:grid-cols-2">
              {home.peopleLine.cards.map((card) => (
                <div key={card.title} className="card-shell bg-white px-5 py-5 shadow-soft/40">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-accent-700">{card.title}</p>
                  <p className="mt-2 text-sm font-semibold text-ink leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="personas" className="section-shell bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit bg-accent-50">{home.methodology.pill}</p>
            <h2>{home.methodology.title}</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {home.methodology.pillars.map((pillar) => (
                <div key={pillar.title} className="rounded-2xl border border-border bg-subtle px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-accent-700">{pillar.title}</p>
                  <p className="mt-2 text-sm text-muted">{pillar.body}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {home.methodology.steps.map((step) => (
                <div key={step.title} className="card-shell h-full bg-white px-4 py-4 shadow-soft/40">
                  <p className="pill text-xs">{step.title}</p>
                  <p className="mt-2 text-sm text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-shell relative overflow-hidden bg-ink text-white" style={{ backgroundImage: skylineBackground }}>
            <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/82 to-ink/90" aria-hidden />
            <div className="relative space-y-4 p-8">
              <h3 className="text-white">{home.motivations.title}</h3>
              <div className="space-y-3 text-sm text-slate-100">
                {home.motivations.items.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/80">{item.title}</p>
                    <p className="mt-1 text-slate-100">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-panel/60">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">{home.deliveries.title}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {home.deliveries.items.map((item) => (
                <div key={item.title} className="card-shell bg-white px-4 py-4 shadow-soft/30">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-accent-700">{item.title}</p>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-shell bg-white p-6 shadow-soft/40">
            <h3 className="text-ink">{home.scenarios.title}</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {home.scenarios.items.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-subtle px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-accent-700">{item.title}</p>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
