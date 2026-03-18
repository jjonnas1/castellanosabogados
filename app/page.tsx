// app/page.tsx
import Link from "next/link";

import SiteHeader from "./components/SiteHeader";
import { buildMailtoUrl, buildWhatsAppUrl, contactConfig } from "@/lib/contactLinks";

/* =========================
   BACKGROUNDS
========================= */
const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.88), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";
const executiveDesk =
  "linear-gradient(180deg, rgba(13,21,40,0.9), rgba(13,21,40,0.8)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2100&q=80')";
const skylineBackground =
  "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(17,37,68,0.75)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80')";

/* =========================
   HOME (EQUITATIVO)
========================= */
const serviceLines = [
  {
    title: "Penal Personas",
    description: "Estrategia penal para personas naturales con acompañamiento técnico en cada etapa.",
    href: "/servicios/penal-personas",
    area: "Penal Personas",
    intent: "linea-penal-personas",
  },
  {
    title: "Ejecución de Penas",
    description: "Gestión de beneficios, redenciones y seguimiento de términos en ejecución.",
    href: "/servicios/ejecucion-penas",
    area: "Ejecución de Penas",
    intent: "linea-ejecucion-penas",
  },
  {
    title: "Responsabilidad Penal PJ",
    description: "Prevención y defensa penal empresarial para personas jurídicas y juntas.",
    href: "/servicios/responsabilidad-penal-pj",
    area: "Responsabilidad Penal PJ",
    intent: "linea-rppj",
  },
  {
    title: "Capacitaciones Penal PJ",
    description: "Programas de formación en prevención y trazabilidad penal corporativa.",
    href: "/servicios/capacitaciones-penal-pj",
    area: "Capacitaciones Penal PJ",
    intent: "linea-capacitaciones",
  },
  {
    title: "Civil",
    description: "Conflictos patrimoniales, obligaciones y estrategia civil con enfoque probatorio.",
    href: "/servicios/civil",
    area: "Civil",
    intent: "linea-civil",
  },
  {
    title: "Familia",
    description: "Asuntos de custodia, alimentos, divorcio y medidas de protección familiar.",
    href: "/servicios/familia",
    area: "Familia",
    intent: "linea-familia",
  },
  {
    title: "Laboral",
    description: "Defensa y prevención en controversias laborales para empresas y trabajadores.",
    href: "/servicios/laboral",
    area: "Laboral",
    intent: "linea-laboral",
  },
  {
    title: "Administrativo",
    description: "Actuaciones y recursos ante entidades públicas y jurisdicción contenciosa.",
    href: "/servicios/administrativo",
    area: "Administrativo",
    intent: "linea-administrativo",
  },
];

export default async function Home() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      {/* HERO (transversal) */}
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

        <div className="container section-shell relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200 animate-fade-in-up">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
                Castellanos Abogados
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-200">
                Corporativo · Personas · Ejecución · Formación
              </span>
            </div>

            <div className="space-y-4 animate-fade-in-up delay-100">
              <h1 className="text-white max-w-3xl">
                Asesoría jurídica estratégica para personas y empresas
              </h1>
              <p className="max-w-2xl text-lg text-slate-100">
                Integramos análisis técnico, prevención de riesgos y acompañamiento integral en múltiples áreas de práctica.
                Selecciona el servicio que necesitas y coordinamos una primera sesión de orientación.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 animate-fade-in-up delay-200">
              <Link href="/servicios" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                Ver servicios
              </Link>
              <a
                href={buildMailtoUrl({
                  area: "General",
                  source: "/",
                  subject: "Solicitud de contacto – General",
                  message: "Hola, quisiera orientación general sobre sus servicios.",
                })}
                className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                Contactar por correo
              </a>
            </div>
          </div>

          {/* Panel de apoyo (presentación del despacho) */}
          <div
            className="card-shell relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 shadow-soft ring-1 ring-white/15 animate-fade-in-left delay-200"
            style={{ backgroundImage: executiveDesk, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-ink/78 via-ink/82 to-accent-700/70" aria-hidden />
            <div className="relative space-y-4 text-white">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200">Firma jurídica</p>
              <h3 className="text-white">Acompañamiento integral con criterio técnico y humano</h3>
              <p className="text-slate-100 text-sm">
                Atendemos asuntos de personas y empresas con enfoque preventivo, estratégico y de ejecución. Cada proceso
                se organiza con alcance, responsables y seguimiento claro.
              </p>
              <div className="mt-5 grid gap-3 text-sm text-slate-100">
                {["Diagnóstico inicial", "Plan de actuación", "Seguimiento continuo"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ÁREAS PRINCIPALES */}
      <section className="section-shell bg-surface/80">
        <div className="container space-y-6">
          <div className="space-y-2 animate-fade-in-up">
            <p className="pill w-fit">Áreas de práctica</p>
            <h2>Servicios jurídicos con cobertura integral</h2>
            <p className="max-w-2xl text-muted">
              Desde esta vista puedes ir directo a cada especialidad. Conservamos una oferta equilibrada para personas y
              empresas en todas las áreas activas del despacho.
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
                  <Link href={line.href} className="btn-secondary">
                    Ver detalle
                  </Link>

                  <a
                    href={buildMailtoUrl({
                      area: line.area,
                      source: "/",
                      subject: `Solicitud de contacto – ${line.area}`,
                      message: "Hola, quisiera solicitar orientación sobre esta línea.",
                      intent: line.intent,
                    })}
                    className="btn-primary"
                  >
                    Solicitar
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-start">
            <Link href="/servicios" className="btn-primary">
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJAMOS (CTA WhatsApp) */}
      <section id="como-trabajamos" className="section-shell bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">Cómo trabajamos</p>
            <h2>Metodología clara y coordinación precisa</h2>
            <p className="max-w-2xl text-muted">
              Definimos alcance, responsables y documentación para que cada decisión o actuación quede trazada con rigor.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {["Diagnóstico inicial", "Mapa de riesgos", "Sesiones de análisis", "Seguimiento especializado"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30"
                >
                  {item}
                </div>
              ))}
            </div>

            <a
              href={buildWhatsAppUrl({
                area: "Metodología",
                source: "/#como-trabajamos",
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
                Nuestro rol es estratégico, preventivo y documental. Si el caso exige defensa judicial, se articula con aliados externos,
                preservando control y coordinación con el cliente.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-100">
                <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Sesiones por videollamada o en sitio (según agenda).</div>
                <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Reportes, minutas y reglas de actuación.</div>
                <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Coordinación con aliados técnicos y comunicaciones.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO (form + mailto + hidden fields para área) */}
      <section
        id="contacto"
        className="relative overflow-hidden section-shell"
        style={{ backgroundImage: skylineBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/82 to-accent-700/70" aria-hidden />
        <div className="container relative grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start text-white">
          <div className="space-y-4">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Contacto</p>
            <h2 className="text-white">Primer punto de control</h2>
            <p className="text-slate-100">Comparte el contexto esencial y coordinamos la disponibilidad más cercana.</p>

            <div className="space-y-2 text-sm text-slate-100">
              <p>
                <strong className="text-white">Correo directo:</strong>{" "}
                <a
                  href={buildMailtoUrl({
                    area: "Contacto",
                    source: "/#contacto",
                    subject: "Solicitud de contacto – Contacto",
                    message: "Hola, necesito coordinar una revisión.",
                  })}
                  className="underline underline-offset-4"
                >
                  {contactConfig.email}
                </a>
              </p>

              <p>
                <strong className="text-white">WhatsApp:</strong>{" "}
                <a
                  href={buildWhatsAppUrl({
                    area: "Contacto",
                    source: "/#contacto",
                    message: "Hola, quisiera agendar una evaluación.",
                  })}
                  className="underline underline-offset-4"
                >
                  {contactConfig.whatsappDisplay ?? "Escribir por WhatsApp"}
                </a>
              </p>
            </div>
          </div>

          <form className="card-shell bg-white/90 p-8 text-ink backdrop-blur" action="/api/contact" method="post">
            <div className="grid gap-4">
              {/* contexto para que el correo llegue con área */}
              <input type="hidden" name="area" value="Contacto – Home" />
              <input type="hidden" name="source" value="/#contacto" />
              <input type="hidden" name="intent" value="contacto-home" />
              <input type="hidden" name="subject" value="Solicitud de contacto – Contacto (Home)" />

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
                Correo
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="nombre@correo.com"
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
                />
              </label>

              <label className="text-sm font-semibold text-ink">
                Motivo
                <select
                  name="reason"
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
                >
                  <option>Corporativo / Contratación estatal</option>
                  <option>Personas</option>
                  <option>Ejecución de penas</option>
                  <option>Formación empresarial</option>
                  <option>Otro</option>
                </select>
              </label>

              <label className="text-sm font-semibold text-ink">
                Contexto breve (opcional)
                <textarea
                  name="message"
                  rows={4}
                  placeholder="3–4 líneas para entender tu necesidad"
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
                />
              </label>

              <button type="submit" className="btn-primary justify-center">
                Enviar para revisión
              </button>

              <p className="text-xs text-muted">Para urgencias, usa el correo directo o WhatsApp.</p>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-white/90 py-8 backdrop-blur">
        <div className="container flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-base font-semibold text-ink">Castellanos Abogados</p>
            <p>Firma · Asesoría jurídica estratégica integral</p>
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
