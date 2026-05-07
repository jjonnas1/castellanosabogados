'use client';

import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import EvaluadorTutela from '@/app/components/EvaluadorTutela';
import { buildMailtoUrl, buildWhatsAppUrl } from '@/lib/contactLinks';
import { useLanguage } from '@/contexts/LanguageContext';

const tutelaHeroBackground =
  "linear-gradient(120deg, rgba(13,21,40,0.92), rgba(31,54,93,0.84)), url('https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1200&q=75&fm=webp')";

export default function TutelaClient() {
  const { t } = useLanguage();
  const p = t.pages.tutela;

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <section
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: tutelaHeroBackground, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.1),transparent_38%)]"
          aria-hidden
        />
        <div className="container section-shell relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
            <h1 className="max-w-3xl text-white">{p.heroTitle}</h1>
            <p className="max-w-3xl text-lg text-slate-100">{p.heroParagraph}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={buildMailtoUrl({
                  area: 'Tutelas',
                  source: '/tutela',
                  subject: 'Solicitud de orientación – Tutelas',
                  message: 'Hola, necesito orientación para preparar o presentar una tutela.',
                })}
                data-wa-lead
                className="btn-primary bg-white text-ink hover:bg-slate-100"
              >
                {t.common.requestInfo}
              </a>
              <Link href="/contacto" className="btn-secondary border-white/60 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                {t.common.goContact}
              </Link>
            </div>
          </div>

          <article className="card-shell relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-7 text-white">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1528]/60 via-[#0d1528]/70 to-[#0d1528]/80" aria-hidden />
            <div className="relative space-y-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200">{p.strategicBadge}</p>
              <h2 className="text-2xl text-white">{p.strategicTitle}</h2>
              <p className="text-sm text-slate-100">{p.strategicText}</p>
              <div className="grid gap-2 text-sm text-slate-100">
                {p.steps.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container grid gap-6 lg:grid-cols-2">
          <article className="card-shell bg-white p-6">
            <h2 className="text-2xl">{p.whenTitle}</h2>
            <p className="mt-3 text-muted">{p.whenText}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {p.whenItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="card-shell bg-white p-6">
            <h2 className="text-2xl">{p.howTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {p.howItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="card-shell bg-white p-6 lg:col-span-2">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl">{p.clearTitle}</h2>
                <p className="mt-3 text-muted">{p.clearText}</p>
              </div>
              <div>
                <h2 className="text-2xl">{p.epsTitle}</h2>
                <p className="mt-3 text-muted">{p.epsText}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell bg-surface/80" id="evaluador">
        <div className="container max-w-2xl space-y-4">
          <div className="space-y-2">
            <p className="pill w-fit">{p.evalBadge}</p>
            <h2>{p.evalTitle}</h2>
            <p className="text-muted">{p.evalSubtitle}</p>
          </div>
          <EvaluadorTutela />
        </div>
      </section>

      <section className="section-shell border-t border-border/70 bg-white" id="formulario-tutela">
        <div className="container max-w-2xl">
          <div className="space-y-2 mb-6">
            <p className="pill w-fit">{p.formBadge}</p>
            <h2>{p.formTitle}</h2>
            <p className="text-muted">{p.formSubtitle}</p>
          </div>
          <form className="card-shell bg-surface p-6 grid gap-4" action="/api/contact" method="post">
            <input type="hidden" name="area" value="Tutelas" />
            <input type="hidden" name="source" value="/tutela#formulario-tutela" />
            <input type="hidden" name="subject" value="Consulta de tutela" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-ink">
                {p.formName}
                <input name="name" type="text" placeholder={p.formNamePlaceholder} className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" />
              </label>
              <label className="text-sm font-semibold text-ink">
                {p.formContact}
                <input name="email" type="text" required placeholder={p.formContactPlaceholder} className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" />
              </label>
            </div>
            <label className="text-sm font-semibold text-ink">
              {p.formMessage}
              <textarea name="message" rows={4} required placeholder={p.formMessagePlaceholder} className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" />
            </label>
            <button type="submit" className="btn-primary justify-center">{p.formSubmit}</button>
          </form>
        </div>
      </section>

      <section className="section-shell border-t border-border/70 bg-surface/80" id="cta-tutelas">
        <div className="container">
          <article className="card-shell bg-white p-8 text-center">
            <p className="pill mx-auto w-fit">{p.ctaBadge}</p>
            <h2 className="mt-3">{p.ctaTitle}</h2>
            <p className="mt-3 text-muted">{p.ctaSubtitle}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href={buildMailtoUrl({
                  area: 'Tutelas',
                  source: '/tutela#cta-tutelas',
                  subject: 'Solicitud de contacto – Tutelas',
                  message: 'Hola, quiero agendar una revisión para un caso de tutela.',
                })}
                className="btn-primary"
              >
                {t.common.contactEmail}
              </a>
              <a
                href={buildWhatsAppUrl({
                  area: 'Tutelas',
                  source: '/tutela#cta-tutelas',
                  message: 'Hola, necesito orientación para una tutela por incumplimiento de EPS o entidad.',
                })}
                className="btn-secondary"
              >
                {t.common.contactWhatsApp}
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
