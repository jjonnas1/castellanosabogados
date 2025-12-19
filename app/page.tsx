import Link from "next/link";

const empresasBullets = [
  "Prevención y control del riesgo penal en decisiones clave.",
  "Documentación y trazabilidad con responsables definidos.",
  "Protocolos y reglas de actuación para comités y juntas.",
];

const personasBullets = [
  "Asesoría penal responsable para personas naturales.",
  "Definición de estrategia y evidencias prioritarias.",
  "Comunicación clara con la defensa y el entorno cercano.",
];

const pasos = [
  {
    title: "Diagnóstico inicial",
    detail: "Revisión rápida del contexto y delimitación del alcance penal.",
  },
  {
    title: "Criterios y trazabilidad",
    detail: "Controles, protocolos y responsables para sostener decisiones informadas.",
  },
  {
    title: "Acompañamiento continuo",
    detail: "Seguimiento estructurado y coordinación con los frentes legales involucrados.",
  },
];

export default function Home() {
  return (
    <div className="bg-canvas text-ink">
      <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-ink via-ink/95 to-accent-700 text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_76%_18%,rgba(255,255,255,0.08),transparent_32%)]"
          aria-hidden
        />
        <div className="container relative grid gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:py-16">
          <div className="space-y-5">
            <div className="space-y-3">
              <h1 className="max-w-3xl text-white">Gestión del riesgo penal para decisiones críticas</h1>
              <p className="max-w-2xl text-lg text-slate-100">
                Acompañamos a organizaciones y personas en escenarios penales sensibles, con método, trazabilidad y control de actuaciones.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/penal-empresas/servicios" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                Penal / Empresas
              </Link>
              <Link
                href="/penal-personas/servicios"
                className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                Penal / Personas
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-soft ring-1 ring-white/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">Sesión de riesgo penal</p>
                <h3 className="mt-2 text-white">Evaluación prioritaria</h3>
                <p className="text-sm text-slate-100">Delimitamos alcance, responsables y próximos pasos con trazabilidad.</p>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white ring-1 ring-white/20">
                Confidencial
              </span>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-100">
              {["Contexto inmediato y roles clave.", "Mapa de riesgo y dependencias críticas.", "Reglas iniciales de actuación documentadas."].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href="/penal-personas/asesoria"
                className="inline-flex items-center rounded-full bg-white px-4 py-2 font-semibold text-ink shadow-hover hover:-translate-y-[1px] hover:bg-slate-100"
              >
                Solicitar evaluación
              </Link>
              <Link href="/contacto" className="font-semibold text-slate-100 transition hover:text-white">
                Coordinar contacto directo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/70 bg-white">
        <div className="container space-y-10 py-14 md:py-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">Qué hacemos</p>
              <h2 className="max-w-3xl">Dos frentes específicos</h2>
              <p className="max-w-2xl text-muted">Enfocamos el trabajo según el tipo de decisión: organizaciones o personas naturales.</p>
            </div>
            <Link href="/contacto" className="btn-secondary">Contacto general</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[{ title: "Penal / Empresas", href: "/penal-empresas/servicios", bullets: empresasBullets }, { title: "Penal / Personas", href: "/penal-personas/servicios", bullets: personasBullets }].map((card) => (
              <article key={card.title} className="card-shell flex h-full flex-col justify-between gap-4 border border-border bg-subtle p-6 shadow-soft">
                <div className="space-y-3">
                  <h3>{card.title}</h3>
                  <ul className="space-y-2 text-sm text-muted">
                    {card.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-ink" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={card.href} className="btn-primary w-fit">Ver servicios</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/70 bg-subtle">
        <div className="container space-y-8 py-14 md:py-16">
          <div className="space-y-3">
            <p className="pill w-fit">Cómo trabajamos</p>
            <h2 className="max-w-2xl">Proceso estructurado</h2>
            <p className="max-w-2xl text-muted">Sesiones concisas, decisiones documentadas y seguimiento continuo.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pasos.map((step, idx) => (
              <div key={step.title} className="card-shell h-full border border-border bg-white p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">{idx + 1}</span>
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container space-y-6 py-12 md:py-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-ink">Contacto inmediato</h2>
            <p className="max-w-2xl text-sm text-muted">Selecciona el frente adecuado o coordina una evaluación prioritaria.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/penal-empresas/contacto" className="btn-secondary">Empresas</Link>
            <Link href="/penal-personas/asesoria" className="btn-primary">Personas</Link>
            <Link href="/contacto" className="btn-secondary">Contacto general</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/70 bg-subtle">
        <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 text-sm text-muted">
            <p className="font-semibold text-ink">Castellanos Abogados</p>
            <p>Gestión del riesgo penal para decisiones críticas.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-ink">
            <Link href="/">Inicio</Link>
            <Link href="/acerca-de">Acerca de</Link>
            <Link href="/contacto">Contacto</Link>
            <Link href="/terminos" className="text-muted">Términos</Link>
            <Link href="/privacidad" className="text-muted">Privacidad</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
