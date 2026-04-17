import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contactLinks";

const background =
  "linear-gradient(140deg, rgba(12,17,29,0.92), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=2200&q=80')";

const steps = [
  {
    title: "Evaluación del caso",
    detail: "Revisión inicial del problema, contexto y documentos para identificar el camino jurídico adecuado.",
  },
  {
    title: "Análisis jurídico",
    detail: "Estudio técnico del caso según el área (civil, penal, laboral, familia o administrativo).",
  },
  {
    title: "Estrategia",
    detail: "Definición de la actuación: asesoría, trámite, escrito, defensa o acompañamiento.",
  },
  {
    title: "Actuación y seguimiento",
    detail: "Ejecución del plan con control directo, comunicación clara y seguimiento del caso.",
  },
];

export default function ComoTrabajamosPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: background, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/82 to-accent-700/70" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Metodología</p>
          <h1 className="max-w-3xl text-white">Metodología clara para decisiones jurídicas bien tomadas</h1>
          <p className="max-w-3xl text-lg text-slate-100">
            Cada asunto se aborda con análisis jurídico, estrategia y seguimiento directo. No importa el área: civil, penal, familia, laboral o
            administrativo, el enfoque es claro, ordenado y trazable desde el inicio.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildMailtoUrl({
                area: "Metodología estructurada",
                source: "/como-trabajamos",
                subject: "Solicitud de evaluación – Metodología estructurada",
                message: "Hola, deseo solicitar una evaluación estratégica.",
              })}
              data-wa-lead
              className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
            >
              Solicitar evaluación
            </a>
            <Link href="/servicios" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              Ver servicios
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell space-y-8">
        <div className="space-y-3">
          <p className="pill w-fit">Ruta</p>
          <h2>Cómo se trabaja cada caso</h2>
          <p className="max-w-3xl text-muted">
            Cada asunto sigue una metodología estructurada que permite entender el problema, definir la estrategia y actuar con claridad jurídica en
            cada etapa.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step, idx) => (
            <div key={step.title} className="rounded-2xl border border-border bg-white p-6 shadow-soft/30">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted">
                <span className="rounded-full bg-subtle px-3 py-1 text-ink">Paso {idx + 1}</span>
                <span>Control</span>
              </div>
              <h3 className="mt-3 text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/70">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-3">
            <p className="pill w-fit">Alcance</p>
            <h2>Acompañamiento jurídico claro y directo</h2>
            <p className="max-w-2xl text-muted">
              El servicio es personal y directo. Cada caso se maneja con criterio jurídico, organización y comunicación constante con el cliente.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Atención directa del abogado", "Documentación clara y organizada", "Estrategia definida desde el inicio", "Seguimiento continuo del caso"].map(
                (item) => (
                  <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink shadow-soft/30">
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="card-shell bg-white p-8 shadow-soft/40">
            <p className="pill w-fit">CTA</p>
            <h3 className="mt-3 text-ink">Activa la siguiente fase</h3>
            <p className="mt-2 text-sm text-muted">
              Definimos el siguiente paso en 48-72 horas con responsables y soportes claros.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl({
                  area: "Metodología estructurada",
                  source: "/como-trabajamos",
                  message: "Hola, quisiera programar una sesión.",
                })}
                className="btn-primary"
              >
                Programar sesión
              </a>
              <a
                href={buildMailtoUrl({
                  area: "Metodología estructurada",
                  source: "/como-trabajamos",
                  subject: "Solicitud de orientación – Metodología estructurada",
                  message: "Hola, necesito coordinar una sesión de orientación jurídica.",
                })}
                className="btn-secondary"
              >
                Solicitar orientación
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
