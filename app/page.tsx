import Link from "next/link";
import { Suspense } from "react";

import SiteHeader from "./components/SiteHeader";
import { buildMailtoUrl, buildWhatsAppUrl, contactConfig } from "@/lib/contactLinks";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.88), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";
const skylineBackground =
  "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(17,37,68,0.75)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80')";
const executiveDesk =
  "linear-gradient(180deg, rgba(13,21,40,0.9), rgba(13,21,40,0.8)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2100&q=80')";

function ServiceSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-3 animate-fade-in">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="card-shell h-full animate-pulse bg-white p-6">
          <div className="h-3 w-24 rounded-full bg-subtle" />
          <div className="mt-4 h-6 w-3/4 rounded-full bg-subtle" />
          <div className="mt-3 h-4 w-full rounded-full bg-subtle" />
          <div className="mt-6 h-9 w-32 rounded-full bg-subtle" />
        </div>
      ))}
    </div>
  );
}

async function ServicesGrid() {
  const { data: services, error } = await fetchServiceAreas();
  const serviceList = services.map(enrichService);

  if (error) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        No pudimos conectar con Supabase. La lista de servicios puede no estar completa.
      </div>
    );
  }

  if (serviceList.length === 0) {
    return (
      <div className="mt-6 card-shell bg-white px-6 py-10 text-center text-muted">
        <p className="text-lg font-semibold text-ink">Servicios no disponibles por el momento</p>
        <p className="mt-2">Vuelve pronto o contáctanos para coordinar una revisión prioritaria.</p>
        <Link href="/contacto" className="mt-4 inline-block btn-primary">
          Contacto directo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {serviceList.map((service) => (
        <article
          key={service.slug}
          className="card-shell group flex h-full flex-col justify-between bg-white p-6 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-hover"
        >
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-700">{service.slug}</p>
            <h3 className="text-ink">{service.title}</h3>
            <p className="text-sm text-muted">{service.description}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            {service.slug ? (
              <Link href={`/servicios/${service.slug}`} className="btn-primary">
                Ver detalle
              </Link>
            ) : (
              <a
                href={buildWhatsAppUrl({
                  area: service.title,
                  source: "/",
                  message: "Hola, quisiera solicitar una evaluación estratégica.",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Solicitar por WhatsApp
              </a>
            )}
            <a
              href={buildMailtoUrl({
                area: service.title,
                source: "/",
                subject: `Solicitud de evaluación – ${service.title}`,
                message: "Hola, deseo solicitar una evaluación estratégica.",
              })}
              className="btn-secondary"
            >
              Solicitar
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

const serviceLines = [
  {
    title: "Corporativo · Contratación estatal",
    description:
      "Gestión de riesgo penal corporativo para juntas directivas y comités, con control preventivo y documentación especializada.",
    detailHref: "/penal-empresarial",
    area: "Corporativo",
  },
  {
    title: "Personas",
    description:
      "Orientación estratégica para personas naturales, con evaluación clara del caso y acompañamiento documental sin litigio directo.",
    detailHref: "/asesoria-personas",
    area: "Personas",
  },
  {
    title: "Ejecución de penas",
    description:
      "Acompañamiento técnico en etapa de ejecución, revisión de requisitos, beneficios y coordinación con el equipo jurídico.",
    detailHref: "/servicios",
    area: "Ejecución de penas",
  },
  {
    title: "Formación empresarial",
    description:
      "Programas de prevención y responsabilidad penal corporativa para equipos internos, comités y áreas de cumplimiento.",
    detailHref: "/servicios",
    area: "Formación",
  },
];

export default async function Home() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section
        className="relative overflow-hidden border-b border-border/60 text-white animate-gradient"
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
        <div className="absolute -left-24 top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" aria-hidden />

        <div className="container section-shell relative space-y-8">
          <div className="space-y-4 animate-fade-in-up">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Castellanos Abogados</p>
            <h1 className="text-white max-w-4xl">
              Asesoría penal estratégica para empresas y personas, con enfoque en control y trazabilidad.
            </h1>
            <p className="max-w-3xl text-lg text-slate-100">
              Contratación estatal y corporativo · Personas · Ejecución de penas · Formación empresarial.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 animate-fade-in-up delay-100">
            <Link href="/servicios" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              Ver servicios
            </Link>
            <a
              href={buildMailtoUrl({
                area: "General",
                source: "/",
                subject: "Solicitud de contacto – General",
                message: "Hola, quisiera recibir orientación general sobre sus servicios.",
              })}
              className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface/80">
        <div className="container space-y-6">
          <div className="space-y-2 animate-fade-in-up">
            <p className="pill w-fit">Líneas de servicio</p>
            <h2>Una firma con cuatro líneas de asesoría penal</h2>
            <p className="max-w-2xl text-muted">
              Cada línea cuenta con un equipo y un enfoque propio. Selecciona la que más se ajusta a tu necesidad.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceLines.map((line) => (
              <article key={line.title} className="card-shell flex h-full flex-col justify-between bg-white p-6">
                <div className="space-y-3">
                  <h3 className="text-lg text-ink">{line.title}</h3>
                  <p className="text-sm text-muted">{line.description}</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                  <Link href={line.detailHref} className="btn-secondary">
                    Ver detalle
                  </Link>
                  <a
                    href={buildMailtoUrl({
                      area: line.area,
                      source: "/",
                      subject: `Solicitud de contacto – ${line.area}`,
                      message: "Hola, quisiera solicitar información sobre esta línea.",
                    })}
                    className="btn-primary"
                  >
                    Solicitar
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="section-shell bg-panel/60">
        <div className="container space-y-6">
          <div className="space-y-2">
            <p className="pill w-fit">Servicios destacados</p>
            <h2>Servicios y áreas disponibles</h2>
            <p className="max-w-2xl text-muted">
              Estas son las áreas activas en este momento. Puedes explorar el detalle o solicitar una evaluación específica.
            </p>
          </div>

          <Suspense fallback={<ServiceSkeleton />}>
            <ServicesGrid />
          </Suspense>
        </div>
      </section>

      <section id="como-trabajamos" className="section-shell bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">Cómo trabajamos</p>
            <h2>Metodología clara, coordinación precisa</h2>
            <p className="max-w-2xl text-muted">
              Definimos alcance, responsables y documentación especializada para que cada decisión quede trazada con rigor.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {["Diagnóstico inicial", "Mapa de riesgos", "Sesiones de análisis", "Seguimiento especializado"].map((item) => (
                <div key={item} className="rounded-2xl border border-border bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                  {item}
                </div>
              ))}
            </div>

            <a
              href={buildWhatsAppUrl({
                area: "Metodología",
                source: "/",
                message: "Hola, quisiera programar una sesión para conocer la metodología.",
              })}
              className="btn-primary"
            >
              Programar sesión
            </a>
          </div>

          <div
            className="card-shell relative overflow-hidden bg-gradient-to-b from-ink to-accent-700 p-8 text-white"
            style={{ backgroundImage: executiveDesk, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/84 to-accent-700/80" aria-hidden />
            <div className="relative space-y-4">
              <h3>Alcance y límites</h3>
              <p className="text-slate-100">
                No asumimos defensa litigiosa masiva. Nuestro rol es estratégico, preventivo y documental, con coordinación efectiva con tus
                equipos internos.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-100">
                <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  Sesiones por videollamada o en sitio (según agenda).
                </div>
                <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  Reportes especializados, minutas y reglas de actuación.
                </div>
                <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  Coordinación con aliados técnicos y comunicaciones.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className="relative overflow-hidden section-shell"
        style={{ backgroundImage: skylineBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/82 to-accent-700/70" aria-hidden />
        <div className="container relative grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start text-white">
          <div className="space-y-4">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Contacto prioritario</p>
            <h2 className="text-white">Primer punto de control</h2>
            <p className="text-slate-100">
              Comparte el contexto esencial y coordinamos la disponibilidad más cercana. Si requieres activación inmediata, escribe directo al correo indicado.
            </p>
            <div className="space-y-2 text-sm text-slate-100">
              <p>
                <strong className="text-white">Correo directo:</strong>{" "}
                <a
                  href={buildMailtoUrl({
                    area: "Contacto prioritario",
                    source: "/#contacto",
                    subject: "Solicitud de contacto – Contacto prioritario",
                    message: "Hola, necesito coordinar una revisión prioritaria.",
                  })}
                  className="underline underline-offset-4"
                >
                  {contactConfig.email}
                </a>
              </p>
              <p>
                <strong className="text-white">Respuesta estimada:</strong> menos de 24 horas hábiles.
              </p>
            </div>
          </div>

          <form className="card-shell bg-white/90 p-8 text-ink backdrop-blur" action="/api/contact" method="post">
            <div className="grid gap-4">
              <input type="hidden" name="area" value="Contacto prioritario" />
              <input type="hidden" name="source" value="/#contacto" />
              <input type="hidden" name="intent" value="contacto-prioritario" />
              <input type="hidden" name="subject" value="Solicitud de contacto – Contacto prioritario" />
              <label className="text-sm font-semibold text-ink">
                Nombre y rol
                <input
                  name="name"
                  type="text"
                  placeholder="Ej. Representante legal, miembro de junta"
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
                />
              </label>

              <label className="text-sm font-semibold text-ink">
                Correo corporativo
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="nombre@empresa.com"
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
                />
              </label>

              <label className="text-sm font-semibold text-ink">
                Motivo prioritario
                <select
                  name="reason"
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
                >
                  <option>Evaluación inicial / DRP-CE</option>
                  <option>Escalamiento estratégico / AEC-CE</option>
                  <option>Incidente crítico / ICP-CE</option>
                  <option>Otro</option>
                </select>
              </label>

              <label className="text-sm font-semibold text-ink">
                Contexto breve (opcional)
                <textarea
                  name="message"
                  rows={4}
                  placeholder="3-4 líneas para entender la urgencia"
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
                />
              </label>

              <button type="submit" className="btn-primary justify-center">
                Enviar para revisión
              </button>

              <p className="text-xs text-muted">
                Formulario referencial. Para activación inmediata usa el correo directo.
              </p>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-border bg-white/90 py-8 backdrop-blur">
        <div className="container flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-base font-semibold text-ink">Castellanos Abogados</p>
            <p>Boutique especializada · Riesgo penal en contratación estatal</p>
          </div>
          <div className="text-right text-muted">
            <p className="font-heading font-semibold text-ink">Criterio • Control • Tranquilidad</p>
            <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
