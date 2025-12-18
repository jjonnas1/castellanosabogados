import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";
import { getServiceDetail } from "@/lib/serviceDetails";

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
  const serviceList = services
    .map(enrichService)
    .map((service) => ({
      ...service,
      detail: getServiceDetail(service.slug),
    }));

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section
        id="riesgo-empresarial"
        className="relative overflow-hidden border-b border-border/60 text-white"
        style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.14),transparent_36%)]"
          aria-hidden
        />
        <div className="container section-shell relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
                Estrategia penal en contratación estatal
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-200">Comités · Juntas · Decisiones críticas</span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-white">Control penal para decisiones sensibles y juntas que no admiten improvisación</h1>
              <p className="max-w-2xl text-lg text-slate-100">
                Acompañamiento ejecutivo para líderes que requieren criterio inmediato, documentación impecable y activación táctica sin ruido.
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

      <section className="section-shell bg-surface/90">
        <div className="container space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="pill w-fit">Servicios empresariales</p>
              <h2>Trilogía de servicios para riesgo penal corporativo</h2>
              <p className="max-w-3xl">
                Tres líneas diseñadas para juntas y representantes: ingreso por diagnóstico, escalamiento ejecutivo y activación en incidentes críticos. Lo demás vive en los enlaces de cada servicio.
              </p>
            </div>
            <Link href="/servicios" className="btn-secondary">
              Ver portafolio completo
            </Link>
          </div>

          {error && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              No pudimos conectar con Supabase. La lista puede ser parcial.
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                key: "drp-ce",
                title: "DRP-CE",
                badge: "Entrada obligatoria",
                detail: "Diagnóstico rápido de riesgo penal en contratación estatal con reglas claras para comité.",
              },
              {
                key: "aec-ce",
                title: "AEC-CE",
                badge: "Escalamiento",
                detail: "Acompañamiento ejecutivo y documentación para juntas y órganos de control internos.",
              },
              {
                key: "icp-ce",
                title: "ICP-CE",
                badge: "Incidente crítico",
                detail: "Activación táctica frente a incidentes penales, contención y coordinación de respuesta.",
              },
            ].map((group) => {
              const matched = serviceList.find((service) => service.slug === group.key);
              return (
                <article key={group.key} className="card-shell flex h-full flex-col justify-between bg-white p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-accent-700">
                      <span className="rounded-full bg-subtle px-3 py-1 font-semibold text-ink">{group.badge}</span>
                      <span className="font-semibold">{group.title}</span>
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-ink">{matched ? matched.title : "Servicio disponible"}</h3>
                    <p className="text-sm text-muted leading-relaxed">{matched?.description ?? group.detail}</p>
                    <ul className="space-y-1 text-sm text-muted">
                      {(matched?.detail?.activation ?? []).slice(0, 2).map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-700" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                    <Link href="/agenda" className="btn-primary">
                      Solicitar evaluación
                    </Link>
                    <Link href={matched ? `/servicios/${matched.slug}` : "/servicios"} className="btn-secondary">
                      Ver servicio
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="como-trabajamos" className="section-shell bg-white">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-3">
            <p className="pill w-fit">Cómo trabajamos</p>
            <h2>Proceso ejecutivo breve</h2>
            <p className="max-w-2xl">Cuatro pasos claros, pensados para decidir rápido y documentar todo.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { title: "1. Evaluación", detail: "20-30 minutos para delimitar riesgo y urgencia." },
                { title: "2. Ruta", detail: "Mapa de riesgos y reglas activables." },
                { title: "3. Acompañamiento", detail: "Sesiones ejecutivas y entregables listos para junta." },
                { title: "4. Activación", detail: "Protocolo de incidentes y coordinación táctica." },
              ].map((item) => (
                <div key={item.title} className="card-shell bg-subtle px-4 py-4 shadow-soft/30">
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/como-trabajamos" className="btn-secondary">
                Ver metodología
              </Link>
              <Link href="/agenda" className="btn-primary">
                Agendar
              </Link>
            </div>
          </div>
          <div
            className="card-shell bg-gradient-to-b from-ink to-accent-700 p-8 text-white"
            style={{ backgroundImage: counselSession, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="space-y-3">
              <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Control</p>
              <h3 className="text-white">Documentación y trazabilidad</h3>
              <p className="text-slate-100">
                Minutas ejecutivas, decisiones registradas y protocolos listos para activarse. Nada queda sin responsable ni fecha.
              </p>
              <ul className="space-y-2 text-sm text-slate-100">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden /> Sesiones breves con entregables inmediatos.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden /> Protocolos de incidente y reglas de actuación.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden /> Coordinación con compliance, auditoría y comunicaciones.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-t border-border/70 bg-surface/90">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-3">
            <p className="pill w-fit">Línea separada</p>
            <h2>Asesoría penal a personas</h2>
            <p className="max-w-2xl">
              Línea secundaria y discreta para asuntos personales. No interfiere con la operación empresarial.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Evaluación breve y confidencial", "Guías de actuación y documentos base", "Derivación a aliados para litigio", "Seguimiento con reportes claros"].map((item) => (
                <div key={item} className="card-shell bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/personas" className="btn-secondary">
                Ver detalle
              </Link>
              <Link href="/contacto" className="btn-primary">
                Contacto directo
              </Link>
            </div>
            <p className="text-sm text-muted">No sustituye asesoría corporativa ni implica representación judicial automática.</p>
          </div>
          <div className="card-shell bg-ink p-8 text-white" style={{ backgroundImage: personalAdvisory, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="space-y-3">
              <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Confidencial</p>
              <h3 className="text-white">Atención personal con límites claros</h3>
              <p className="text-slate-100">Si el caso requiere litigio, articulamos aliados externos manteniendo el control documental.</p>
              <Link href="/personas" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                Acceder a la línea personal
              </Link>
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
        <div className="container relative grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start text-white">
          <div className="space-y-3">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Contacto prioritario</p>
            <h2 className="text-white">Activa el primer control</h2>
            <p className="text-slate-100">Correo directo: contacto@castellanosabogados.com · respuesta en menos de 24 horas hábiles.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                Agendar ahora
              </Link>
              <Link href="/contacto" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                Ver formulario
              </Link>
            </div>
          </div>
          <div className="card-shell bg-white/90 p-6 text-ink backdrop-blur">
            <p className="text-sm font-semibold text-ink">Solicita revisión ejecutiva</p>
            <p className="text-sm text-muted">Usa el formulario completo en contacto o agenda la sesión inicial.</p>
            <div className="mt-4 grid gap-3 text-sm text-muted">
              <div className="rounded-2xl border border-border bg-white px-4 py-3">Evaluación inicial · DRP-CE</div>
              <div className="rounded-2xl border border-border bg-white px-4 py-3">Escalamiento ejecutivo · AEC-CE</div>
              <div className="rounded-2xl border border-border bg-white px-4 py-3">Incidente crítico · ICP-CE</div>
            </div>
          </div>
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
