import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.88), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";

export default async function Home() {
  const { data: services } = await fetchServiceAreas();
  const serviceList = services.map(enrichService);

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section
        className="relative overflow-hidden border-b border-border/60 text-white"
        style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/82 to-accent-700/70" aria-hidden />
        <div className="container section-shell relative space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">Riesgo penal empresarial</span>
            <span>Contratación estatal · juntas · decisiones críticas</span>
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-white">Asesoría penal estratégica para decisiones sensibles en contratación estatal</h1>
            <p className="text-lg text-slate-100">
              Acompañamos juntas, comités y representantes legales con criterios claros, documentación ejecutiva y protocolos activables.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              Solicitar evaluación
            </Link>
            <Link href="/servicios" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <p className="pill w-fit">Resumen ejecutivo</p>
            <h2>Qué ofrecemos</h2>
            <p className="max-w-2xl">
              Prevención penal, control de decisiones sensibles y acompañamiento en momentos críticos, con límites claros y trazabilidad.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Prevención penal", body: "Mapas de riesgo y lineamientos listos para junta." },
                { title: "Documentación ejecutiva", body: "Minutas, soportes y entregables para auditoría." },
                { title: "Activación táctica", body: "Protocolos de reacción ante incidentes críticos." },
                { title: "Sesiones breves", body: "Intervenciones ágiles con responsables clave." },
              ].map((item) => (
                <div key={item.title} className="card-shell bg-white px-5 py-5 shadow-soft/40">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-accent-700">{item.title}</p>
                  <p className="mt-2 text-sm font-semibold text-ink leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-shell bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-700">Límites claros</p>
            <h3 className="mt-3">Delimitación del alcance</h3>
            <p className="mt-2 text-sm text-muted">
              No asumimos litigio ni representación judicial. Nuestro trabajo es estratégico, preventivo y orientado a decisiones críticas.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
              <span className="rounded-full border border-border px-3 py-1">No litigios</span>
              <span className="rounded-full border border-border px-3 py-1">No ejecución operativa</span>
              <span className="rounded-full border border-border px-3 py-1">No representación judicial</span>
            </div>
            <Link href="/como-trabajamos" className="mt-6 inline-flex btn-secondary">
              Cómo trabajamos
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface/80">
        <div className="container space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">Servicios principales</p>
              <h2>Áreas activas de riesgo penal corporativo</h2>
              <p className="max-w-2xl">
                Mantenemos una lista breve y priorizada para comités y órganos directivos. Para detalle completo visita la sección de servicios.
              </p>
            </div>
            <Link href="/servicios" className="btn-primary">
              Ver todos los servicios
            </Link>
          </div>

          {serviceList.length === 0 ? (
            <div className="card-shell bg-white px-6 py-8 text-center text-muted">
              <p className="text-lg font-semibold text-ink">Servicios no disponibles por el momento</p>
              <p className="mt-2">Agenda una evaluación para definir el área correcta.</p>
              <Link href="/agenda" className="mt-4 inline-block btn-primary">
                Abrir agenda
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {serviceList.slice(0, 3).map((service) => (
                <article key={service.slug} className="card-shell flex flex-col gap-3 bg-white p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-700">{service.slug}</p>
                  <h3 className="text-lg font-heading font-semibold text-ink">{service.title}</h3>
                  <p className="text-sm text-muted">{service.description}</p>
                  <Link href={`/servicios/${service.slug}`} className="mt-auto text-sm font-semibold text-accent-700">
                    Ver detalle
                  </Link>
                </article>
              ))}
            </div>
          )}
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
