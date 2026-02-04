// app/servicios/page.tsx
import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";
import { getServiceDetail } from "@/lib/serviceDetails";

const headerBackground =
  "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";

export default async function ServiciosPage() {
  const { data, error } = await fetchServiceAreas();

  const services = (Array.isArray(data) ? data : [])
    .map(enrichService)
    .map((service) => ({
      ...service,
      detail: getServiceDetail(service.slug),
    }));

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
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/70 to-accent-700/60" aria-hidden />
        <div className="container section-shell relative space-y-6">
          <div className="space-y-3">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">
              Servicios
            </p>
            <h1 className="text-white">Servicios de la firma</h1>
            <p className="max-w-2xl text-slate-100">
              Aquí encuentras las áreas activas y el acceso a los detalles por servicio.
              Si la conexión falla, puedes contactarnos y coordinamos el área correcta.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/contacto" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              Contacto
            </Link>
            <Link
              href="/"
              className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell space-y-8">
        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            No pudimos recuperar los servicios desde Supabase. Puedes contactarnos y te asignamos el área correcta.
          </div>
        )}

        {services.length === 0 ? (
          <div className="card-shell bg-white px-6 py-10 text-center text-muted">
            <p className="text-lg font-semibold text-ink">Servicios no disponibles por el momento</p>
            <p className="mt-2">Escríbenos y coordinamos tu necesidad.</p>
            <Link href="/contacto" className="mt-4 inline-block btn-primary">
              Abrir contacto
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.slug} className="card-shell flex h-full flex-col justify-between bg-white p-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700">
                    {service.slug}
                  </p>
                  <h3 className="text-lg font-heading font-semibold text-ink">{service.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{service.description}</p>

                  {service.detail && (
                    <div className="space-y-3 text-sm text-muted">
                      <div>
                        <p className="font-semibold text-ink">Cuándo se activa</p>
                        <ul className="mt-1 list-disc space-y-1 pl-4">
                          {service.detail.activation.slice(0, 2).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-ink">Entregables</p>
                        <ul className="mt-1 list-disc space-y-1 pl-4">
                          {service.detail.deliverables.slice(0, 2).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="font-semibold text-accent-700 transition hover:text-ink"
                  >
                    Ver detalle
                  </Link>

                  <Link
                    href="/contacto"
                    className="font-semibold text-muted transition hover:text-ink"
                  >
                    Consultar alcance
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
