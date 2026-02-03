import Link from "next/link";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";
import { getServiceDetail } from "@/lib/serviceDetails";

const headerBackground =
  "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";

export default async function ServiciosPage() {
  const { data, error } = await fetchServiceAreas();
  const services = data.map(enrichService).map((service) => ({
    ...service,
    detail: getServiceDetail(service.slug),
  }));

  return (
    <main className="min-h-screen bg-canvas pb-16">
      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: headerBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/82 to-accent-700/70" aria-hidden />
        <div className="container relative flex flex-col gap-3 py-14">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Riesgo penal empresarial</p>
          <h1 className="text-white">Servicios ejecutivos en contratación estatal</h1>
          <p className="max-w-3xl text-slate-100">
            Revisa cada servicio en una pestaña desplegable con activación y entregables clave.
          </p>
          <div className="mt-3 flex gap-3">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              Solicitar evaluación estratégica
            </Link>
            <Link href="/" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell space-y-6">
        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            No pudimos recuperar los servicios. Por favor intenta más tarde o contáctanos.
          </div>
        )}

        <div className="space-y-4">
          <details className="card-shell bg-white px-6 py-4">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">Paso inmediato</p>
                  <h2 className="text-xl font-heading font-semibold text-ink">Solicitar evaluación</h2>
                  <p className="mt-1 text-sm text-muted">
                    Inicia con una sesión breve para delimitar riesgo, alcance y próximos pasos.
                  </p>
                </div>
                <span className="text-sm font-semibold text-accent-700">Abrir</span>
              </div>
            </summary>
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/60 pt-4 text-sm text-muted">
              <span className="rounded-full border border-border px-3 py-1">Sesión breve</span>
              <span className="rounded-full border border-border px-3 py-1">Diagnóstico inicial</span>
              <span className="rounded-full border border-border px-3 py-1">Plan de acción</span>
              <Link href="/agenda" className="btn-primary">
                Solicitar evaluación
              </Link>
            </div>
          </details>

          <details className="card-shell bg-white px-6 py-4">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">Línea secundaria</p>
                  <h2 className="text-xl font-heading font-semibold text-ink">Asesoría a personas</h2>
                  <p className="mt-1 text-sm text-muted">
                    Atención puntual para personas naturales con orientación y documentación base.
                  </p>
                </div>
                <span className="text-sm font-semibold text-accent-700">Abrir</span>
              </div>
            </summary>
            <div className="mt-4 grid gap-4 border-t border-border/60 pt-4 text-sm text-muted md:grid-cols-2">
              <div className="space-y-2">
                <p className="font-semibold text-ink">Qué incluye</p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>Evaluación confidencial breve.</li>
                  <li>Guía inmediata de actuación.</li>
                  <li>Documentación base de soporte.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-ink">Siguiente paso</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contacto" className="btn-primary">
                    Contacto directo
                  </Link>
                  <Link href="/agenda" className="btn-secondary">
                    Programar sesión
                  </Link>
                </div>
              </div>
            </div>
          </details>

          <details className="card-shell bg-white px-6 py-4">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">Línea principal</p>
                  <h2 className="text-xl font-heading font-semibold text-ink">Riesgo penal empresarial</h2>
                  <p className="mt-1 text-sm text-muted">
                    Servicios corporativos activos con activación, entregables y coordinación ejecutiva.
                  </p>
                </div>
                <span className="text-sm font-semibold text-accent-700">Abrir</span>
              </div>
            </summary>

            <div className="mt-4 border-t border-border/60 pt-4">
              {services.length === 0 ? (
                <div className="space-y-3 text-sm text-muted">
                  <p className="text-lg font-semibold text-ink">Servicios no disponibles por el momento</p>
                  <p>Agenda directamente para revisar tu necesidad y te asignaremos el área correcta.</p>
                  <Link href="/agenda" className="inline-flex btn-primary">
                    Abrir agenda
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service) => (
                    <details key={service.slug} className="rounded-2xl border border-border/60 bg-subtle/30 px-4 py-3">
                      <summary className="cursor-pointer list-none">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">
                              {service.slug}
                            </p>
                            <h3 className="text-lg font-heading font-semibold text-ink">{service.title}</h3>
                            <p className="mt-1 text-sm text-muted">{service.description}</p>
                          </div>
                          <span className="text-sm font-semibold text-accent-700">Ver detalle</span>
                        </div>
                      </summary>

                      <div className="mt-4 grid gap-4 border-t border-border/60 pt-4 text-sm text-muted lg:grid-cols-3">
                        <div className="space-y-2">
                          <p className="font-semibold text-ink">Cuándo se activa</p>
                          <ul className="list-disc space-y-1 pl-4">
                            {service.detail?.activation.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <p className="font-semibold text-ink">Entregables</p>
                          <ul className="list-disc space-y-1 pl-4">
                            {service.detail?.deliverables.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <p className="font-semibold text-ink">Siguiente paso</p>
                          <div className="flex flex-wrap gap-3">
                            <Link href="/agenda" className="btn-primary">
                              Solicitar evaluación
                            </Link>
                            <Link href={`/servicios/${service.slug}`} className="btn-secondary">
                              Página completa
                            </Link>
                          </div>
                          <Link href="/contacto" className="text-sm font-semibold text-accent-700">
                            Coordinar alcance
                          </Link>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
