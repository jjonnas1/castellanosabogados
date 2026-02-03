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
  const serviceList = (Array.isArray(services) ? services : []).map(enrichService);

  return (
    <main>
      <SiteHeader />

      {/* HERO */}
      <section
        id="riesgo-empresarial"
        className="relative overflow-hidden border-b border-border/60 text-white"
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
        <div className="container section-shell relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
                Estrategia penal en contratación estatal
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-200">
                Comités · Juntas · Decisiones críticas
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-white max-w-3xl">
                Control penal para decisiones sensibles y juntas que no admiten improvisación
              </h1>
              <p className="max-w-2xl text-lg text-slate-100">
                Proveemos acompañamiento estratégico para líderes que requieren criterio inmediato, documentación
                impecable y activación táctica sin ruido.
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
              {[
                "Decisiones sensibles con exposición penal inmediata.",
                "Mapas de riesgo y reglas de actuación listos para junta.",
                "Activación táctica ante incidentes con contención y coordinación.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
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

      {/* BLOQUE SERVICIOS (SUPABASE) */}
      <section id="servicios" className="relative overflow-hidden border-y border-border/60 bg-surface/90">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(31,54,93,0.08),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(15,23,42,0.06),transparent_34%)]"
          aria-hidden
        />
        <div className="container section-shell relative space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">Servicios empresariales</p>
              <h2>Áreas activas de riesgo penal corporativo</h2>
              <p className="max-w-2xl">
                Mostramos únicamente las áreas habilitadas en Supabase para empresas y órganos directivos.
              </p>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm text-muted shadow-soft/30">
                <span className="rounded-full bg-subtle px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-700">
                  Línea separada
                </span>
                Asesoría penal a personas está disponible en{" "}
                <Link href="/personas" className="font-semibold text-ink underline-offset-4 hover:text-accent-700">
                  /personas
                </Link>
                .
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
                      <p
                        className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                          isEntrada ? "text-white/80" : "text-accent-700"
                        }`}
                      >
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
                        className={`font-semibold transition ${
                          isEntrada ? "text-white/90 hover:text-white" : "text-accent-700 hover:text-ink"
                        }`}
                      >
                        {isEntrada ? "Coordinar con junta" : "Consultar alcance"}
                      </Link>
                      <Link
                        href={`/servicios/${service.slug}`}
                        className={`font-semibold transition ${
                          isEntrada ? "text-white/80 hover:text-white" : "text-muted hover:text-ink"
                        }`}
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

      {/* FOOTER */}
      <footer className="border-t border-border bg-white/90 py-8 backdrop-blur">
        <div className="container flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-base font-semibold text-ink">Castellanos Abogados</p>
            <p>Firma · Riesgo penal en contratación estatal</p>
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
