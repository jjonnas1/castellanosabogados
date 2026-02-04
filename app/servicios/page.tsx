import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contactLinks";

const headerBackground =
  "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";

const serviceLines = [
  {
    title: "Penal Personas",
    slug: "penal-personas",
    summary:
      "Asesoría penal estratégica para personas naturales con alcance definido y control documental.",
    audience: ["Personas naturales", "Familias", "Equipos de apoyo personal"],
  },
  {
    title: "Ejecución de penas",
    slug: "ejecucion-penas",
    summary: "Seguimiento técnico para decisiones críticas en la etapa de ejecución de penas.",
    audience: ["Personas y familias", "Equipos jurídicos aliados", "Equipos de soporte"],
  },
  {
    title: "Responsabilidad Penal para Personas Jurídicas",
    slug: "responsabilidad-penal-pj",
    summary:
      "Prioridad estratégica: control preventivo, trazabilidad y gobernanza penal corporativa.",
    audience: ["Juntas directivas", "Comités de cumplimiento", "Direcciones jurídicas"],
  },
  {
    title: "Capacitaciones en Penal para Personas Jurídicas",
    slug: "capacitaciones-penal-pj",
    summary: "Formación técnica para equipos internos con foco preventivo y protocolos claros.",
    audience: ["Juntas y comités", "Equipos de cumplimiento", "Áreas de riesgos"],
  },
];

export default function ServiciosPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{
          backgroundImage: headerBackground,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.14),transparent_36%)]"
          aria-hidden
        />
        <div className="container section-shell relative space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">
              Servicios estratégicos
            </span>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-white">Cuatro líneas estratégicas de asesoría penal</h1>
            <p className="max-w-3xl text-lg text-slate-100">
              Integramos prevención, control y trazabilidad con enfoque técnico y estratégico en cada línea de servicio.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={buildWhatsAppUrl({
                area: "Servicios estratégicos",
                source: "/servicios",
                message: "Hola, quisiera solicitar una evaluación estratégica.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
            >
              Solicitar evaluación estratégica
            </a>
            <Link href="/" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="pill w-fit">Servicios principales</p>
            <h2 className="mt-3">Ejes estratégicos del despacho</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Cada línea incluye un enfoque claro, documentación especializada y coordinación con responsables clave.
            </p>
          </div>
          <a
            href={buildMailtoUrl({
              area: "Servicios estratégicos",
              source: "/servicios",
              subject: "Solicitud de evaluación – Servicios estratégicos",
              message: "Hola, deseo solicitar una evaluación estratégica.",
            })}
            className="btn-secondary"
          >
            Contacto por correo
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {serviceLines.map((service) => (
            <article key={service.slug} className="card-shell flex h-full flex-col justify-between bg-white p-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700">{service.slug}</p>
                <h3 className="text-lg font-heading font-semibold text-ink">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{service.summary}</p>
                <ul className="mt-4 grid gap-2 text-sm text-muted">
                  {service.audience.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
                <Link href={`/servicios/${service.slug}`} className="font-semibold text-accent-700 transition hover:text-ink">
                  Ver detalle
                </Link>
                <a
                  href={buildWhatsAppUrl({
                    area: service.title,
                    source: "/servicios",
                    message: "Hola, quisiera solicitar una evaluación estratégica.",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-muted transition hover:text-ink"
                >
                  Solicitar por WhatsApp
                </a>
                <a
                  href={buildMailtoUrl({
                    area: service.title,
                    source: "/servicios",
                    subject: `Solicitud de evaluación – ${service.title}`,
                    message: "Hola, deseo solicitar una evaluación estratégica.",
                  })}
                  className="font-semibold text-muted transition hover:text-ink"
                >
                  Solicitar por correo
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
