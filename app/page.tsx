import Link from "next/link";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";

export default async function Home() {
  const { data: services, error } = await fetchServiceAreas();
  const serviceList = services.map(enrichService);

  return (
    <div className="bg-canvas text-ink">
      <section
        className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-ink via-ink/90 to-accent-700 text-white"
        id="resumen-servicios"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_76%_18%,rgba(255,255,255,0.08),transparent_30%)]" aria-hidden />
        <div className="container relative grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:py-20">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
                Firma boutique
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-200">Contratación estatal · Juntas · Crisis</span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-white">Riesgo penal controlado para decisiones críticas</h1>
              <p className="max-w-2xl text-lg text-slate-100">
                Activamos acompañamiento ejecutivo para juntas directivas y personas naturales en escenarios de riesgo penal vinculados a contratación estatal.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/penal-empresas/servicios" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                Penal / Empresas
              </Link>
              <Link href="/penal-personas/servicios" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                Penal / Personas
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-soft ring-1 ring-white/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">Sesión inicial</p>
                <h3 className="mt-2 text-white">Evaluación prioritaria</h3>
                <p className="text-sm text-slate-100">Delimitamos alcance, responsables y próximos pasos en minutos.</p>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white ring-1 ring-white/20">
                Confidencial
              </span>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-100">
              {["Contexto inmediato con responsables clave.", "Mapa de riesgo y dependencias sensibles.", "Reglas iniciales de actuación y entregables ejecutivos."].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link href="/penal-personas/asesoria" className="inline-flex items-center rounded-full bg-white px-4 py-2 font-semibold text-ink shadow-hover hover:-translate-y-[1px] hover:bg-slate-100">
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
        <div className="container py-14 md:py-18 space-y-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">Qué hacemos</p>
              <h2 className="max-w-3xl">Dos frentes, mismo criterio ejecutivo</h2>
              <p className="max-w-2xl text-muted">Enfocamos el acompañamiento según el perfil: organizaciones en contratación estatal o personas naturales.</p>
            </div>
            <Link href="/contacto" className="btn-secondary">Coordinar llamada</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[{
              title: "Penal / Empresas",
              href: "/penal-empresas/servicios",
              bullets: ["Prevención y gestión de riesgo penal.", "Documentación y controles operativos.", "Acompañamiento a juntas y comités."],
            },
            {
              title: "Penal / Personas",
              href: "/penal-personas/servicios",
              bullets: ["Asesoría penal a personas naturales.", "Definición de estrategia y evidencia.", "Coordinación con defensa y familia."],
            }].map((card) => (
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
        <div className="container py-14 md:py-18 space-y-8">
          <div className="space-y-3">
            <p className="pill w-fit">Cómo trabajamos</p>
            <h2 className="max-w-2xl">Proceso ejecutivo en tres pasos</h2>
            <p className="max-w-2xl text-muted">Sesiones breves, decisiones claras y trazabilidad documentada.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {["Evaluación prioritaria", "Mapa y controles", "Activación táctica"].map((step, idx) => (
              <div key={step} className="card-shell h-full border border-border bg-white p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">{idx + 1}</span>
                  <h3 className="text-lg font-semibold text-ink">{step}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {idx === 0 && "Revisión inmediata del contexto y responsables para definir reglas de actuación."}
                  {idx === 1 && "Diseño de controles, documentación clave y criterios de decisión para junta o comité."}
                  {idx === 2 && "Acompañamiento ejecutivo, coordinación con frentes legales y seguimiento continuo."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container py-14 md:py-18 space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="pill w-fit">Servicios activos</p>
              <h2 className="max-w-2xl">Disponibles según Supabase</h2>
              <p className="max-w-2xl text-muted">Si no se pueden cargar, mostramos un aviso para coordinar contacto directo.</p>
            </div>
            <Link href="/contacto" className="btn-secondary">Contacto directo</Link>
          </div>

          {error && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              No pudimos conectar con Supabase. La lista puede no estar completa.
            </div>
          )}

          {serviceList.length === 0 ? (
            <div className="card-shell bg-subtle px-6 py-10 text-center text-muted">
              <p className="text-lg font-semibold text-ink">Servicios no disponibles por el momento</p>
              <p className="mt-2">Coordina contacto directo para revisar tu caso.</p>
              <Link href="/contacto" className="mt-4 inline-flex btn-primary">
                Contacto
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-3">
              {serviceList.map((service) => {
                const isEntrada = service.slug === "drp-ce";
                return (
                  <article
                    key={service.slug}
                    className={`group flex h-full flex-col justify-between rounded-3xl border ${
                      isEntrada
                        ? "border-transparent bg-gradient-to-br from-ink to-accent-700 text-white shadow-soft/60 ring-1 ring-white/10 lg:col-span-2"
                        : "border-border bg-white text-ink shadow-soft/30"
                    } p-6 transition hover:-translate-y-[2px] hover:shadow-hover`}
                  >
                    <div className="space-y-3">
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${isEntrada ? "text-white/80" : "text-accent-700"}`}>
                        {service.slug}
                      </p>
                      <h3 className={isEntrada ? "text-white" : "text-ink"}>{service.title}</h3>
                      <p className={`text-sm leading-relaxed ${isEntrada ? "text-slate-100" : "text-muted"}`}>
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                      <Link
                        href="/penal-personas/asesoria"
                        className={`inline-flex items-center rounded-full px-4 py-2 font-semibold transition duration-200 ${
                          isEntrada
                            ? "bg-white text-ink shadow-hover hover:-translate-y-[1px] hover:bg-slate-100"
                            : "bg-ink text-white hover:-translate-y-[1px] hover:bg-accent-700"
                        }`}
                      >
                        {isEntrada ? "Ingresar evaluación" : "Solicitar"}
                      </Link>
                      <Link
                        href="/contacto"
                        className={`font-semibold transition ${isEntrada ? "text-white/90 hover:text-white" : "text-accent-700 hover:text-ink"}`}
                      >
                        {isEntrada ? "Coordinar con junta" : "Consultar alcance"}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-border/70 bg-subtle">
        <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-ink">Castellanos Abogados</p>
            <p className="text-sm text-muted">Criterio • Control • Tranquilidad</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-muted">
            <Link href="/">Inicio</Link>
            <Link href="/acerca-de">Acerca de</Link>
            <Link href="/contacto">Contacto</Link>
            <Link href="/terminos" className="opacity-80">Términos</Link>
            <Link href="/privacidad" className="opacity-80">Privacidad</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
