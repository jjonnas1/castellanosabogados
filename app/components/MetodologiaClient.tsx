'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import { serviceDetailList } from "@/lib/serviceDetails";
import { buildMailtoUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const controlPoints = [
  "Diagnóstico",
  "Ruta",
  "Documentos",
  "Términos",
  "Seguimiento",
  "Cierre",
];

const principles = [
  {
    title: "Claridad antes de actuar",
    detail: "Primero se entiende el problema, la etapa y el riesgo. Después se decide si conviene negociar, radicar, responder o esperar.",
  },
  {
    title: "Evidencia organizada",
    detail: "Cada documento, fecha y comunicación se ubica dentro de una ruta probatoria para evitar decisiones improvisadas.",
  },
  {
    title: "Seguimiento visible",
    detail: "El cliente conoce qué se hizo, qué falta y cuál es el siguiente movimiento relevante del caso.",
  },
];

const operatingMetrics = [
  ["24-48 h", "Lectura inicial y clasificación del asunto"],
  ["6 áreas", "Civil, familia, penal, ejecución, laboral y administrativo"],
  ["1 ruta", "Plan de actuación con responsables y soportes"],
];

export default function MetodologiaClient() {
  const { t } = useLanguage();
  const p = t.pages.metodologia;

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border/60 bg-[#08111f] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,17,31,0.98),rgba(23,42,70,0.88))]" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" aria-hidden />

        <div className="container section-shell relative grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="max-w-2xl space-y-6">
            <p className="inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white ring-1 ring-white/25">
              {p.badge}
            </p>
            <div className="space-y-4">
              <h1 className="text-white">{p.heroTitle}</h1>
              <p className="text-lg leading-relaxed text-slate-200">{p.heroParagraph}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {operatingMetrics.map(([value, label]) => (
                <div key={value} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-xl font-bold text-white">{value}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={buildMailtoUrl({
                  area: "Metodología",
                  source: "/metodologia",
                  subject: "Solicitud de consulta inicial",
                  message: "Hola, quisiera agendar una consulta inicial.",
                })}
                className="btn-primary bg-white text-ink hover:bg-slate-100"
              >
                {p.ctaBtn}
              </a>
              <Link href="/servicios" className="btn-secondary border-white/40 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                {p.viewAllServices}
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/15 bg-white/[0.08] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="rounded-[1.15rem] border border-white/10 bg-[#07111f]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Sistema de trabajo</p>
                  <p className="mt-1 text-sm font-semibold text-white">Expediente con control operativo</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-bold text-emerald-200 ring-1 ring-emerald-300/25">
                  Trazable
                </span>
              </div>

              <div className="grid gap-3 p-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    <span>Ruta del caso</span>
                    <span>67%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-2/3 rounded-full bg-white/70" />
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {["Revisión", "Estrategia", "Actuación"].map((item) => (
                      <div key={item} className="rounded-xl bg-white/[0.06] px-3 py-2 text-xs font-semibold text-slate-200">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {controlPoints.map((item, index) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200/70">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 px-5 py-4">
                <p className="text-sm leading-relaxed text-slate-300">
                  Cada actuación se organiza por fase, responsable, soporte documental y siguiente decisión.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <div className="space-y-3">
            <p className="pill w-fit">Criterio de trabajo</p>
            <h2>Una metodología jurídica no es una lista de pasos</h2>
            <p className="text-muted">
              Es una forma de tomar decisiones: saber qué probar, qué priorizar, qué documentar y cuándo actuar.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft/20">
                <span className="block h-1 w-10 rounded-full bg-accent-700" aria-hidden />
                <h3 className="mt-4 text-base leading-snug text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
          <div className="space-y-3 lg:sticky lg:top-24">
            <p className="pill w-fit">{p.processBadge}</p>
            <h2>{p.processTitle}</h2>
            <p className="text-muted">
              Una metodología simple de leer, pero suficientemente rigurosa para controlar riesgos,
              pruebas, términos y comunicación con el cliente.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {p.steps.map((hito, index) => (
              <article key={hito.when} className={`card-shell bg-white p-6 ${index === 0 ? "md:row-span-2" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-700">{hito.when}</p>
                    <h3 className="mt-2 text-lg leading-snug text-ink">{hito.title}</h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-sm font-bold text-ink">
                    {index + 1}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{hito.desc}</p>
                {index === 0 && (
                  <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Punto de partida</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Sin diagnóstico no hay estrategia: esta fase evita promesas genéricas y define el alcance real del trabajo.
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-canvas">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <p className="pill w-fit">{p.modalityTitle}</p>
            <h2>Atención clara, documentada y adaptable al caso</h2>
            <p className="max-w-xl text-muted">
              La forma de trabajo cambia según la urgencia, el área y la etapa del asunto, pero siempre conserva control documental y comunicación directa.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {p.modalityItems.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-card p-5 shadow-soft/20">
                <span className="block h-1 w-10 rounded-full bg-ink" aria-hidden />
                <p className="mt-4 text-sm leading-relaxed text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="container space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="pill w-fit">{p.servicesBadge}</p>
              <h2>{p.servicesTitle}</h2>
              <p className="text-muted">{p.servicesSubtitle}</p>
            </div>
            <Link href="/servicios" className="btn-secondary w-fit">
              {p.viewAllServices}
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {serviceDetailList.map((svc) => (
              <article key={svc.slug} className="card-shell flex h-full flex-col bg-white p-6">
                <div className="flex items-start justify-between gap-5">
                  <div className="space-y-2">
                    <Link
                      href={`/servicios/${svc.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-ink"
                    >
                      {svc.title}
                      <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3" aria-hidden>
                        <path d="M2.5 9.5 9.5 2.5M5 2.5h4.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <h3 className="text-xl leading-snug text-ink">{svc.headline}</h3>
                    <p className="text-sm leading-relaxed text-muted">{svc.summary}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 border-t border-border pt-5 md:grid-cols-3">
                  <MiniList title={p.whenActivate} items={svc.activation.slice(0, 2)} />
                  <MiniList title={p.audience} items={svc.audience.slice(0, 2)} />
                  <MiniList title={p.deliverables} items={svc.deliverables.slice(0, 2)} />
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href={buildMailtoUrl({
                      area: svc.title,
                      source: "/metodologia",
                      subject: `Solicitud - ${svc.title}`,
                      message: `Hola, me interesa conocer más sobre el servicio de ${svc.title}.`,
                    })}
                    className="btn-secondary text-sm"
                  >
                    {p.requestInfo}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-ink text-white dark:bg-[#0c111d]">
        <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-white">{p.ctaTitle}</h2>
            <p className="text-slate-200">{p.ctaSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildMailtoUrl({
                area: "Metodología",
                source: "/metodologia",
                subject: "Solicitud de consulta inicial",
                message: "Hola, quisiera agendar una consulta inicial.",
              })}
              className="btn-primary bg-white text-ink hover:bg-slate-100"
            >
              {p.ctaBtn}
            </a>
            <Link href="/servicios" className="btn-secondary border-white/50 text-white hover:bg-white/10">
              {p.viewAllServices}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
