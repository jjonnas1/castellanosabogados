import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contactLinks";

const roles = [
  {
    title: "Representantes legales",
    detail: "Decisiones sensibles con exposición penal inmediata. Definimos alcance definido, protocolos y documentación lista para junta.",
  },
  {
    title: "Juntas y comités",
    detail: "Sesiones de análisis para priorizar riesgos, coordinar responsables y dejar trazabilidad frente a órganos de control.",
  },
  {
    title: "Órganos de control interno",
    detail: "Alineamos protocolos con auditoría, cumplimiento y defensores del control, manteniendo independencia y registro.",
  },
  {
    title: "Aliados y proveedores críticos",
    detail: "Instrucciones y acuerdos que reducen exposición penal en contratación estatal y proyectos de alto impacto.",
  },
];

export default function AQuienServimosPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-ink via-ink/90 to-accent text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_72%_8%,rgba(255,255,255,0.12),transparent_36%)]" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">A quién servimos</p>
          <h1 className="max-w-3xl text-white">Actuamos con los responsables que toman decisiones</h1>
          <p className="max-w-3xl text-lg text-slate-100">
            Nos conectamos con quienes pueden activar controles inmediatos: representantes legales, juntas, comités y órganos de control.
            No trabajamos como firma litigante; somos acompañamiento estratégico y documental.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildMailtoUrl({
                area: "A quién servimos",
                source: "/a-quien-servimos",
                subject: "Solicitud de evaluación – A quién servimos",
                message: "Hola, deseo solicitar una evaluación estratégica.",
              })}
              className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
            >
              Solicitar evaluación
            </a>
            <a
              href={buildMailtoUrl({
                area: "A quién servimos",
                source: "/a-quien-servimos",
                subject: "Solicitud de coordinación con junta – A quién servimos",
                message: "Hola, necesito coordinar una sesión con junta o comité.",
              })}
              className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              Coordinar con junta
            </a>
          </div>
        </div>
      </header>

      <section className="container section-shell space-y-6">
        <div className="space-y-3">
          <p className="pill w-fit">Roles clave</p>
          <h2>Quiénes intervienen</h2>
          <p className="max-w-3xl text-muted">
            Articulamos responsables internos y externos para que cada decisión quede soportada y trazable.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((role) => (
            <div key={role.title} className="rounded-2xl border border-border bg-white p-6 shadow-soft/30">
              <h3 className="text-ink">{role.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{role.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/70">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-3">
            <p className="pill w-fit">Contextos</p>
            <h2>Escenarios frecuentes</h2>
            <p className="max-w-2xl text-muted">
              Decisiones de contratación, activación de pólizas, relaciones con órganos de control y preparación ante incidentes.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Contratación estatal compleja", "Investigaciones preliminares", "Crisis reputacional", "Cambio de gobierno o auditoría"].map(
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
            <h3 className="mt-3 text-ink">Coordina con el responsable adecuado</h3>
            <p className="mt-2 text-sm text-muted">Asignamos responsables, definimos soportes y dejamos rastro documental en la primera sesión.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl({
                  area: "A quién servimos",
                  source: "/a-quien-servimos",
                  message: "Hola, quisiera programar una sesión.",
                })}
                className="btn-primary"
              >
                Programar sesión
              </a>
              <Link href="/servicios" className="btn-secondary">
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
