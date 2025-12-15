import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.88), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";
const executiveDesk =
  "linear-gradient(180deg, rgba(13,21,40,0.9), rgba(13,21,40,0.8)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2100&q=80')";
const skylineBackground =
  "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(17,37,68,0.75)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80')";
const counselSession =
  "linear-gradient(180deg, rgba(12,17,29,0.85), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1439778615639-28529f7628bc?auto=format&fit=crop&w=2000&q=80')";

const personalAdvisory =
  "linear-gradient(140deg, rgba(10,16,28,0.88), rgba(20,32,52,0.78)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80')";

export default async function Home() {
  const { data: services, error } = await fetchServiceAreas();
  const serviceList = services.map(enrichService);

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section
        id="riesgo-empresarial"
        className="relative overflow-hidden border-b border-border/60 text-white"
        style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.14),transparent_36%)]" aria-hidden />
        <div className="container section-shell relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
                Estrategia penal en contratación estatal
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-200">Comités · Juntas · Decisiones críticas</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-white max-w-3xl">Control penal para decisiones sensibles y juntas que no admiten improvisación</h1>
              <p className="max-w-2xl text-lg text-slate-100">
                Proveemos acompañamiento ejecutivo para líderes que requieren criterio inmediato, documentación impecable y activación táctica sin ruido.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                Solicitar evaluación estratégica
              </Link>
              <Link
                href="/como-trabajamos"
                className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                Ver cómo trabajamos
              </Link>
            </div>
            <div className="grid gap-4 text-sm text-slate-100 sm:grid-cols-3">
              {[
                { label: "Ámbito", value: "Contratación estatal, gobierno corporativo, órganos de control." },
                { label: "Enfoque", value: "Prevención penal, controles operativos, reacción táctica." },
                { label: "Ritmo", value: "Sesiones cortas, entregables ejecutivos, decisiones trazables." },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300">{item.label}</p>
                  <p className="mt-2 font-semibold leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 shadow-soft ring-1 ring-white/15">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-300">Modelo</p>
                <h3 className="mt-2 text-white">Documento de acompañamiento estratégico</h3>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white ring-1 ring-white/20">
                Confidencial
              </span>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-100">
              {["Decisiones sensibles con exposición penal inmediata.", "Mapas de riesgo y reglas de actuación listos para junta.", "Activación táctica ante incidentes con contención y coordinación."].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 text-xs uppercase tracking-[0.16em] text-slate-300 sm:grid-cols-3">
              {["Diagnóstico", "Protocolos", "Activación"].map((tag) => (
                <div key={tag} className="rounded-full bg-white/10 px-3 py-2 text-center">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface/80">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">Riesgo penal empresarial</p>
            <h2>Penal para empresas: contratación estatal y gobierno corporativo</h2>
            <p className="max-w-2xl">
              Nuestro foco exclusivo es la prevención y el control penal asociado a decisiones sensibles en contratación estatal y gobierno corporativo. Trabajamos con juntas, comités y representantes legales; los acompañamos con documentación ejecutiva y límites claros.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Modelo", body: "Ruta táctica y preventiva alineada con órganos de control y cumplimiento." },
                { title: "Delimitación", body: "No intervenimos en litigios ni asumimos representación judicial." },
                { title: "Activación", body: "Sesiones ejecutivas previo, durante y posterior a decisiones críticas." },
                { title: "Trazabilidad", body: "Entregables ejecutivos, minutas y soportes listos para auditoría." },
              ].map((item) => (
                <div key={item.title} className="card-shell bg-white px-5 py-5 shadow-soft/40">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-accent-700">{item.title}</p>
                  <p className="mt-2 text-sm font-semibold text-ink leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-muted shadow-soft/30">
              <span className="rounded-full bg-subtle px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-700">Línea paralela</span>
              Asesoría penal a personas se gestiona de forma separada y secundaria.
            </div>
          </div>
          <div
            className="relative card-shell overflow-hidden bg-ink p-0 text-white shadow-soft"
            style={{ backgroundImage: counselSession, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-accent-700/70" aria-hidden />
            <div className="relative grid gap-4 p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-200">
                <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">Foco principal</span>
                <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">Penal corporativo</span>
              </div>
              <h3 className="text-white">Acompañamiento ejecutivo para juntas y comités</h3>
              <p className="text-slate-100">
                Definimos ritmo, soportes y responsables en decisiones de alto impacto: minutas, protocolos activables, reportes para auditoría y coordinación con control interno.
              </p>
              <div className="grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/80">Activación</p>
                  <p className="mt-1 font-semibold">Alerta temprana y decisiones sensibles</p>
                  <p className="text-slate-200">Sesiones urgentes con responsables clave para definir alcance y controles.</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/80">Ejecución</p>
                  <p className="mt-1 font-semibold">Protocolos operativos y trazabilidad</p>
                  <p className="text-slate-200">Documentación ejecutiva, instrucciones puntuales y coordinación con compliance.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/servicios" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                  Detalle de servicios
                </Link>
                <Link href="/contacto" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                  Coordinar con junta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-accent-strong to-accent" aria-labelledby="alcance-title">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_72%_12%,rgba(255,255,255,0.12),transparent_38%)]" aria-hidden />
        <div className="container section-shell relative space-y-6 text-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Alcance</p>
              <h2 id="alcance-title" className="text-white">Delimitación del alcance de nuestros servicios</h2>
              <p className="max-w-3xl text-slate-100">
                Nuestro trabajo se centra en el asesoramiento estratégico y la prevención de riesgos. No asumimos representación litigiosa ni decisiones que correspondan al cliente.
              </p>
            </div>
            <Link href="/servicios" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
              Ver detalle de servicios
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "No intervenimos en litigios", body: "Nuestra intervención es estratégica y de preparación procesal en instancias previas." },
              { title: "No asumimos responsabilidad decisional", body: "Las decisiones y su implementación definen riesgos que recaen exclusivamente en el cliente." },
              { title: "No ejecutamos operativamente", body: "Nuestra labor se enfoca en documentación, monitoreo y supervisión del control interno." },
              { title: "No representamos equipos jurídicos internos", body: "Nuestra implementación se centra en el asesoramiento estratégico y la prevención de riesgos." },
            ].map((item) => (
              <div key={item.title} className="card-shell flex h-full flex-col justify-between bg-white/10 px-5 py-5 text-white ring-1 ring-white/15">
                <div>
                  <h3 className="text-white">{item.title}</h3>
                  <p className="mt-2 text-slate-100 leading-relaxed">{item.body}</p>
                </div>
                <span className="mt-4 inline-flex w-fit rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 ring-1 ring-white/20">
                  Acompañamiento estratégico
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="que-hacemos" className="section-shell bg-white">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-3">
            <p className="pill w-fit">Sección 2</p>
            <h2>Nuestra práctica</h2>
            <p className="max-w-2xl">
              Nos concentramos en decisiones y escenarios específicos que pueden generar exposición penal en contratación estatal. No improvisamos: definimos ritmo, responsables y soportes.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {["Enfoque por decisiones clave", "Prevención y estrategia", "Mapeo de riesgos y dependencias", "Coordinación con equipos internos"].map((item) => (
                <div key={item} className="card-shell bg-subtle px-4 py-4 shadow-soft/20">
                  <p className="text-ink font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-shell overflow-hidden bg-white p-0 shadow-soft/40">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[260px]" style={{ backgroundImage: executiveDesk, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/62 to-accent-700/62" aria-hidden />
                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                  <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Sección 4</p>
                  <h3 className="mt-3 text-white">Nuestro enfoque estratégico</h3>
                  <p className="mt-2 text-slate-100 text-sm">
                    Intervenimos en momentos críticos — previos, durante o posteriores a decisiones estratégicas — para prevenir, controlar o contener el riesgo penal.
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-ink">Asesoría estratégica en contratación estatal</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Nuestra firma se especializa en la gestión estratégica del riesgo penal. Acompañamos a juntas y representantes legales en decisiones críticas con documentación precisa y protocolos activables.
                </p>
                <div className="space-y-3 text-sm text-ink">
                  <div className="rounded-2xl bg-subtle px-4 py-3 ring-1 ring-border/70">
                    <p className="font-semibold">Maximice oportunidades</p>
                    <p className="text-muted">Decisiones críticas con gobierno corporativo sólido y trazable.</p>
                  </div>
                  <div className="rounded-2xl bg-subtle px-4 py-3 ring-1 ring-border/70">
                    <p className="font-semibold">Mitigue riesgos</p>
                    <p className="text-muted">Procesos y contratos bajo protocolos que reducen exposición penal.</p>
                  </div>
                  <div className="rounded-2xl bg-subtle px-4 py-3 ring-1 ring-border/70">
                    <p className="font-semibold">Garantice conformidad</p>
                    <p className="text-muted">Reportes ejecutivos, minutas y soportes alineados con auditoría y control.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/agenda" className="btn-primary">Solicitar evaluación estratégica</Link>
                  <Link href="/servicios" className="btn-secondary">Conocer servicios</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="relative overflow-hidden border-y border-border/60 bg-surface/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(31,54,93,0.08),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(15,23,42,0.06),transparent_34%)]" aria-hidden />
        <div className="container section-shell relative space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">Servicios empresariales</p>
              <h2>Áreas activas de riesgo penal corporativo</h2>
              <p className="max-w-2xl">
                Mostramos únicamente las áreas habilitadas en Supabase para empresas y órganos directivos. Priorizamos el ingreso por DRP-CE y escalamos cuando el comité lo exige.
              </p>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-muted shadow-soft/30">
                <span className="rounded-full bg-subtle px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-700">Línea separada</span>
                Asesoría penal a personas está disponible en <Link href="/personas" className="font-semibold text-ink underline-offset-4 hover:text-accent-700">/personas</Link>.
              </div>
            </div>
            <Link href="/agenda" className="btn-primary">
              Programar una sesión
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
                    className={`card-shell group flex h-full flex-col justify-between p-6 transition ${
                      isEntrada
                        ? "lg:col-span-2 bg-gradient-to-br from-ink to-accent-700 text-white ring-1 ring-white/10"
                        : "bg-white"
                    }`}
                  >
                    <div className="space-y-3">
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${isEntrada ? "text-white/80" : "text-accent-700"}`}>
                        {service.slug}
                      </p>
                      <h3 className={isEntrada ? "text-white" : "text-ink"}>{service.title}</h3>
                      <p className={`text-sm ${isEntrada ? "text-slate-100" : "text-muted"}`}>{service.description}</p>
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
                      <Link
                        href={`/servicios/${service.slug}`}
                        className={`font-semibold transition ${isEntrada ? "text-white/80 hover:text-white" : "text-muted hover:text-ink"}`}
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="como-trabajamos" className="section-shell bg-panel/60">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">Cómo trabajamos</p>
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
          <div className="card-shell relative overflow-hidden bg-gradient-to-b from-ink to-accent-700 p-8 text-white" style={{ backgroundImage: executiveDesk, backgroundSize: "cover", backgroundPosition: "center" }}>
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

      <section className="section-shell border-t border-border/70 bg-gradient-to-r from-panel to-surface/80">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">Asesoría a personas (línea secundaria)</p>
            <h2>Asesoría penal a personas naturales</h2>
            <p className="max-w-2xl">
              Mantenemos una línea separada y discreta para personas naturales con situaciones penales puntuales. No mezcla recursos con la operación empresarial ni altera nuestras prioridades corporativas.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Contexto privado y delimitado", "Evaluación rápida sin litigio", "Instrucciones claras y documentos base", "Derivación a aliados cuando se requiere representación"].map((item) => (
                <div key={item} className="card-shell bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/personas" className="btn-secondary">
                Ver línea personal
              </Link>
              <Link href="/contacto" className="btn-primary">
                Contacto directo
              </Link>
            </div>
            <p className="text-sm text-muted">Esta línea no sustituye asesoría corporativa ni implica representación judicial.</p>
          </div>
          <div
            className="card-shell relative overflow-hidden bg-ink p-0 text-white"
            style={{ backgroundImage: personalAdvisory, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-ink/82 via-ink/86 to-accent-700/72" aria-hidden />
            <div className="relative grid gap-4 p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-200">
                <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">Línea separada</span>
                <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">Confidencial</span>
              </div>
              <h3 className="text-white">Atención personalizada y delimitada</h3>
              <p className="text-slate-100">
                Evaluamos el caso, fijamos límites y, si se requiere representación litigiosa, articulamos aliados externos sin perder el control documental.
              </p>
              <div className="grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">Sesiones breves y privadas.</div>
                <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">Protocolos básicos y guías de actuación.</div>
              </div>
              <Link href="/personas" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                Acceder a la línea personal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="relative overflow-hidden section-shell" style={{ backgroundImage: skylineBackground, backgroundSize: "cover", backgroundPosition: "center" }}>
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
