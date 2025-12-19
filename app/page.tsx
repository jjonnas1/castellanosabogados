import Link from "next/link";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";

const heroBackdrop =
  "linear-gradient(120deg, rgba(10,14,26,0.9), rgba(12,26,46,0.82)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=85')";
const dossierBackdrop =
  "linear-gradient(180deg, rgba(11,17,34,0.92), rgba(16,32,56,0.82)), url('https://images.unsplash.com/photo-1530023367847-a683933f4177?auto=format&fit=crop&w=2000&q=85')";
const boardroomBackdrop =
  "linear-gradient(180deg, rgba(14,18,30,0.88), rgba(12,26,46,0.8)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85')";
const skylineBackdrop =
  "linear-gradient(160deg, rgba(9,13,24,0.9), rgba(13,28,52,0.82)), url('https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=2100&q=85')";

export default async function Home() {
  const { data: services, error } = await fetchServiceAreas();
  const serviceList = services.map(enrichService);

  return (
    <main className="bg-canvas text-ink">
      <section
        id="resumen-servicios"
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: heroBackdrop, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_78%_12%,rgba(255,255,255,0.1),transparent_36%)]" aria-hidden />
        <div className="container section-shell relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
                Boutique ejecutiva
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-200">Contratación estatal · juntas · crisis</span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-white">Control penal para decisiones de contratación que exigen precisión inmediata</h1>
              <p className="max-w-2xl text-lg text-slate-100">
                Acompañamos a juntas y comités en escenarios de riesgo penal con criterio ejecutivo, documentación impecable y activación táctica cuando la ventana de maniobra es mínima.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                Solicitar evaluación prioritaria
              </Link>
              <Link href="/servicios" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                Ver áreas activas
              </Link>
            </div>
            <div className="grid gap-4 text-sm text-slate-100 sm:grid-cols-3">
              {[
                { label: "Ámbito", value: "Contratación estatal, gobierno corporativo, órganos de control." },
                { label: "Modo", value: "Prevención penal, controles operativos, reacción táctica." },
                { label: "Ritmo", value: "Sesiones cortas, entregables ejecutivos, trazabilidad." },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300">{item.label}</p>
                  <p className="mt-2 font-semibold leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative grid gap-4">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-7 shadow-soft ring-1 ring-white/15">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">Sesión inicial</p>
                  <h3 className="mt-2 text-white">Evaluación ejecutiva en 20 minutos</h3>
                </div>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white ring-1 ring-white/20">
                  Confidencial
                </span>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-100">
                {["Contexto inmediato con responsables clave.", "Mapa de riesgo y dependencias sensibles.", "Reglas iniciales de actuación y soportes.", "Agenda prioritaria para junta o comité."].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <Link href="/agenda" className="inline-flex items-center rounded-full bg-white px-4 py-2 font-semibold text-ink shadow-hover hover:-translate-y-[1px] hover:bg-slate-100">
                  Agendar ahora
                </Link>
                <Link href="/contacto" className="font-semibold text-slate-100 transition hover:text-white">
                  Coordinar con junta
                </Link>
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-7 shadow-soft"
              style={{ backgroundImage: dossierBackdrop, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ink/85 via-ink/82 to-accent-700/75" aria-hidden />
              <div className="relative space-y-3 text-slate-100">
                <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Documento reservado</p>
                <h3 className="text-white">Arquitectura de acompañamiento</h3>
                <p className="text-sm leading-relaxed">
                  Entregable ejecutivo con estructura, reglas y responsables para cada decisión. Diseñado para juntas, comités y órganos de control.
                </p>
                <div className="flex flex-wrap gap-2 text-[12px] uppercase tracking-[0.16em] text-slate-200">
                  {["Diagnóstico", "Protocolos", "Activación"].map((tag) => (
                    <span key={tag} className="rounded-full bg-white/12 px-3 py-1 ring-1 ring-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="arquitectura" className="section-shell bg-surface/90">
        <div className="container space-y-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">Arquitectura</p>
              <h2>Identidad y método de acompañamiento</h2>
              <p className="max-w-3xl text-muted">
                Operamos en capas: identidad estratégica, delimitación de alcance y activación puntual. Cada fase mantiene trazabilidad y soporte documental.
              </p>
            </div>
            <Link href="/agenda" className="btn-secondary">
              Solicitar evaluación
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="grid gap-4">
              {[{
                title: "Identidad de la firma",
                body: "Prevención y control penal en contratación estatal. Coordinamos con cumplimiento, auditoría y órganos de control.",
                tag: "Prevención",
              },
              {
                title: "Alcance definido",
                body: "Acompañamiento ejecutivo: no litigamos, no ejecutamos operativamente, no asumimos decisiones del cliente.",
                tag: "Límites",
              },
              {
                title: "Documentación y ritmo",
                body: "Sesiones cortas, minutas trazables y soportes listos para junta o comité extraordinario.",
                tag: "Trazabilidad",
              }].map((item) => (
                <div key={item.title} className="card-shell bg-white px-5 py-5 shadow-soft/35">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <p className="text-[12px] uppercase tracking-[0.16em] text-accent-700">{item.tag}</p>
                      <h3 className="text-ink">{item.title}</h3>
                      <p className="text-muted leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="card-shell overflow-hidden border border-border bg-gradient-to-b from-ink to-accent-700 p-0 text-white"
              style={{ backgroundImage: boardroomBackdrop, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="relative h-full w-full bg-gradient-to-b from-ink/82 via-ink/84 to-accent-700/76 p-8">
                <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Sesión ejecutiva</p>
                <h3 className="mt-3 text-white">Evaluación prioritaria</h3>
                <p className="mt-2 text-slate-100">
                  Delimitamos riesgo, responsables y próximos pasos en menos de 30 minutos para no frenar la operación.
                </p>
                <div className="mt-6 grid gap-3 text-sm text-slate-100">
                  {[
                    "Contexto inmediato con responsables clave.",
                    "Mapa de riesgo y dependencias críticas.",
                    "Reglas de actuación y entregables ejecutivos.",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                    Agendar ahora
                  </Link>
                  <Link href="/contacto" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                    Coordinar con junta
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="relative overflow-hidden border-y border-border/60 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(31,54,93,0.08),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(15,23,42,0.06),transparent_34%)]" aria-hidden />
        <div className="container section-shell relative space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">Servicios</p>
              <h2>Ingreso, escalamiento y activación</h2>
              <p className="max-w-2xl text-muted">
                Mostramos únicamente las áreas habilitadas en Supabase. Priorizamos DRP-CE como puerta de entrada y escalamos según la criticidad.
              </p>
            </div>
            <Link href="/servicios" className="btn-secondary">
              Ver detalle
            </Link>
          </div>

          {error && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              No pudimos conectar con Supabase. La lista de servicios puede no estar completa.
            </div>
          )}

          {serviceList.length === 0 ? (
            <div className="mt-6 card-shell bg-white px-6 py-10 text-center text-muted">
              <p className="text-lg font-semibold text-ink">Servicios no disponibles por el momento</p>
              <p className="mt-2">Vuelve pronto o contáctanos para agendar una revisión prioritaria.</p>
              <Link href="/contacto" className="mt-4 inline-block btn-primary">
                Contacto directo
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
                        : "border-border bg-subtle text-ink shadow-soft/30"
                    } p-6 transition hover:-translate-y-[2px] hover:shadow-hover`}
                  >
                    <div className="space-y-3">
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${isEntrada ? "text-white/80" : "text-accent-700"}`}>
                        {service.slug}
                      </p>
                      <h3 className={isEntrada ? "text-white" : "text-ink"}>{service.title}</h3>
                      <p className={`text-sm leading-relaxed ${isEntrada ? "text-slate-100" : "text-muted"}`}>{service.description}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                      <Link
                        href="/agenda"
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

      <section id="activacion" className="section-shell bg-panel/60">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">Activación</p>
            <h2>Proceso ejecutivo con límites claros</h2>
            <p>Secuencia corta, medible y documentada para mantener control y trazabilidad.</p>
            <div className="relative mt-6 grid gap-4">
              {[
                { title: "Evaluación", detail: "20-30 minutos para delimitar riesgo penal y alcance." },
                { title: "Mapa de riesgo", detail: "Dependencias críticas, reglas de actuación y soportes inmediatos." },
                { title: "Acompañamiento", detail: "Sesiones ejecutivas en hitos sensibles y seguimiento puntual." },
                { title: "Activación táctica", detail: "Protocolo de incidentes, contención y coordinación externa." },
              ].map((item, idx) => (
                <div key={item.title} className="card-shell relative flex gap-4 bg-white px-5 py-5 shadow-soft/30">
                  <div className="flex flex-col items-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                      {idx + 1}
                    </span>
                    {idx < 3 && <span className="mt-2 h-full w-px bg-border" aria-hidden />}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-shell relative overflow-hidden bg-gradient-to-b from-ink to-accent-700 p-8 text-white" style={{ backgroundImage: boardroomBackdrop, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/84 to-accent-700/80" aria-hidden />
            <div className="relative space-y-4">
              <h3>Alcance y límites</h3>
              <p className="text-slate-100">
                No ofrecemos defensa penal litigiosa ni representación masiva. Operamos en prevención, control y coordinación estratégica para decisiones sensibles.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-100">
                <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Sesiones por videollamada o en sitio (según agenda).</div>
                <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Reportes ejecutivos, minutas y reglas de actuación.</div>
                <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Coordinación con aliados técnicos y comunicaciones.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="a-quien-servimos" className="container section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-3">
            <p className="pill w-fit">A quién servimos</p>
            <h2>Roles que necesitan control inmediato</h2>
            <p>Intervenimos donde se decide rápido y se documenta con rigor.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {["Representantes legales", "Miembros de junta", "Comités de contratación", "Direcciones jurídicas", "Auditoría y control interno", "Relación con entes de control"].map((item) => (
                <div key={item} className="card-shell bg-white px-4 py-3 text-sm font-semibold text-ink shadow-soft/40">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="card-shell bg-white p-8">
            <h3>Compromisos</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-ink" aria-hidden /> Confidencialidad estricta y trazabilidad de hallazgos.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-ink" aria-hidden /> Entregables ejecutivos claros y accionables.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-ink" aria-hidden /> Disponibilidad prioritaria en incidentes críticos.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-ink" aria-hidden /> Coordinación con compliance, auditoría y comunicaciones.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className="relative overflow-hidden section-shell"
        style={{ backgroundImage: skylineBackdrop, backgroundSize: "cover", backgroundPosition: "center" }}
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
                <strong className="text-white">Correo directo:</strong> contacto@castellanosabogados.com
              </p>
              <p>
                <strong className="text-white">Respuesta estimada:</strong> menos de 24 horas hábiles.
              </p>
            </div>
          </div>
          <form className="card-shell bg-white/90 p-8 text-ink backdrop-blur">
            <div className="grid gap-4">
              <label className="text-sm font-semibold text-ink">
                Nombre y rol
                <input
                  type="text"
                  placeholder="Ej. Representante legal, miembro de junta"
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
                />
              </label>
              <label className="text-sm font-semibold text-ink">
                Correo corporativo
                <input
                  type="email"
                  placeholder="nombre@empresa.com"
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
                />
              </label>
              <label className="text-sm font-semibold text-ink">
                Motivo prioritario
                <select className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50">
                  <option>Evaluación inicial / DRP-CE</option>
                  <option>Escalamiento estratégico / AEC-CE</option>
                  <option>Incidente crítico / ICP-CE</option>
                  <option>Otro</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-ink">
                Contexto breve (opcional)
                <textarea
                  rows={4}
                  placeholder="3-4 líneas para entender la urgencia"
                  className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50"
                />
              </label>
              <button type="button" className="btn-primary justify-center">
                Enviar para revisión
              </button>
              <p className="text-xs text-muted">Formulario referencial. Para activación inmediata usa el correo directo.</p>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-border bg-white/90 py-8 backdrop-blur">
        <div className="container flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-base font-semibold text-ink">Castellanos Abogados</p>
            <p>Boutique ejecutiva · Riesgo penal en contratación estatal</p>
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
