'use client';

import SiteHeader from '@/app/components/SiteHeader';
import WaIcon from '@/app/components/WaIcon';
import EvaluadorTutela from '@/app/components/EvaluadorTutela';
import { buildWhatsAppUrl } from '@/lib/contactLinks';
import { useLanguage } from '@/contexts/LanguageContext';

// Contenido general sujeto a la revisión jurídica final del propietario.
const tutelaFaqs = [
  {
    question: '¿Cuándo puede evaluarse una tutela contra una EPS?',
    answer: 'Cuando una decisión, omisión o demora de la EPS puede estar afectando un derecho fundamental y los mecanismos ordinarios no ofrecen una protección eficaz para la situación concreta. Deben revisarse la urgencia, los soportes y la respuesta de la entidad.',
  },
  {
    question: '¿Qué documentos conviene reunir para una tutela de salud?',
    answer: 'La orden médica, la historia clínica relevante, las autorizaciones o negativas, las peticiones presentadas, las respuestas recibidas y cualquier prueba de la urgencia o del impacto que está causando la demora.',
  },
  {
    question: '¿Es obligatorio presentar la tutela por medio de abogado?',
    answer: 'No. La acción de tutela puede ser presentada directamente por la persona afectada o por quien actúe en su nombre. La asesoría jurídica puede ayudar a ordenar los hechos, identificar el derecho comprometido y anexar los soportes pertinentes.',
  },
  {
    question: '¿Cuánto puede tardar la decisión de tutela?',
    answer: 'El artículo 86 de la Constitución establece que entre la solicitud y su resolución no pueden transcurrir más de diez días. La atención de una medida provisional, la impugnación o el cumplimiento del fallo tienen dinámicas propias.',
  },
];

export default function TutelaClient() {
  const { t, language } = useLanguage();
  const p = t.pages.tutela;

  return (
    <main className="motion-public motion-inner editorial-page editorial-tutela min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tutelaFaqs.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }) }} />

      <section
        className="relative overflow-hidden border-b border-[#31584b] bg-[#112820] text-white"
        style={{ backgroundImage: 'radial-gradient(circle at 84% 20%, rgba(113,176,140,.22), transparent 38%), linear-gradient(125deg, #10241e 5%, #214838 100%)' }}
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
                href={buildWhatsAppUrl({
                  area: 'Tutelas',
                  source: '/tutela',
                  message: 'Hola, necesito orientación para preparar o presentar una tutela.',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="tutela-whatsapp inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-bold text-[#10241d] transition hover:bg-[#53e386] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366]"
              >
                <WaIcon size={18} />
                {p.evaluateCase}
              </a>
            </div>
          </div>

          <article className="tutela-hero-panel relative overflow-hidden border border-white/20 bg-white/10 p-7 text-white backdrop-blur-sm sm:p-9">
            <div className="relative space-y-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#ace4bf]">{p.strategicBadge}</p>
              <h2 className="text-2xl text-white">{p.strategicTitle}</h2>
              <p className="text-sm text-slate-100">{p.strategicText}</p>
              <div className="grid text-sm text-slate-100">
                {p.steps.map((item, index) => (
                  <div key={item} className="flex gap-4 border-t border-white/20 py-3">
                    <span className="font-semibold text-[#ace4bf]">0{index + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container grid gap-6 lg:grid-cols-2">
          <article className="border-l-2 border-[#3e665e] py-2 pl-6">
            <h2 className="text-2xl">{p.whenTitle}</h2>
            <p className="mt-3 text-muted">{p.whenText}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {p.whenItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="border-l-2 border-[#3e665e] py-2 pl-6">
            <h2 className="text-2xl">{p.howTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {p.howItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="tutela-soft-panel border border-[#dce8e1] bg-[#f6f9f7] p-6 sm:p-8 lg:col-span-2">
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

      {language === 'es' ? (
        <section className="section-shell border-t border-border/70 bg-white" id="preguntas-tutela">
          <div className="container">
            <div className="max-w-2xl">
              <p className="pill w-fit">Preguntas frecuentes</p>
              <h2 className="mt-3">Antes de presentar una tutela</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {tutelaFaqs.map((item) => (
                <article key={item.question} className="tutela-faq border-t border-[#b9cfc3] px-1 pt-5">
                  <h3 className="text-lg text-ink">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

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
          <form className="tutela-soft-panel grid gap-4 border border-[#dce8e1] bg-[#f6f9f7] p-6 sm:p-8" action="/api/contact" method="post">
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
            <button type="submit" className="tutela-submit inline-flex min-h-12 items-center justify-center rounded-full bg-[#173e2f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#245c45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173e2f]">{p.formSubmit}</button>
          </form>
        </div>
      </section>
    </main>
  );
}
