import Link from "next/link";
import { Suspense } from "react";
import SiteHeader from "./components/SiteHeader";
import ServiceCarousel from "./components/ServiceCarousel";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";

/* =========================
   BACKGROUNDS
========================= */
const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.88), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";
const skylineBackground =
  "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(17,37,68,0.75)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80')";

/* =========================
   SKELETON
========================= */
function ServiceSkeleton() {
  return (
    <div className="grid gap-5 lg:grid-cols-3 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card-shell bg-white p-6">
          <div className="h-3 w-24 rounded-full bg-subtle" />
          <div className="mt-4 h-6 w-3/4 rounded-full bg-subtle" />
          <div className="mt-3 h-4 w-full rounded-full bg-subtle" />
          <div className="mt-6 h-9 w-32 rounded-full bg-subtle" />
        </div>
      ))}
    </div>
  );
}

/* =========================
   SERVICES GRID
========================= */
async function ServicesGrid() {
  const { data: services, error } = await fetchServiceAreas();
  const serviceList = (Array.isArray(services) ? services : []).map(enrichService);

  if (error) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        No pudimos conectar con Supabase. La lista de servicios puede no estar completa.
      </div>
    );
  }

  if (serviceList.length === 0) {
    return (
      <div className="mt-6 card-shell bg-white px-6 py-10 text-center text-muted">
        <p className="text-lg font-semibold text-ink">Servicios no disponibles por el momento</p>
        <p className="mt-2">Vuelve pronto o contáctanos para agendar una revisión prioritaria.</p>
        <Link href="/contacto" className="mt-4 inline-block btn-primary">
          Contacto directo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {serviceList.map((service) => {
        const isEntrada = service.slug === "drp-ce";
        return (
          <article
            key={service.slug}
            className={`card-shell group flex h-full flex-col justify-between p-6 transition hover:-translate-y-1 hover:shadow-hover ${
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
              <p className={`text-sm ${isEntrada ? "text-slate-100" : "text-muted"}`}>
                {service.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <Link
                href="/agenda"
                className={`inline-flex items-center rounded-full px-4 py-2 font-semibold transition ${
                  isEntrada
                    ? "bg-white text-ink hover:bg-slate-100"
                    : "bg-ink text-white hover:bg-accent-700"
                }`}
              >
                {isEntrada ? "Ingresar evaluación" : "Solicitar"}
              </Link>
              <Link
                href="/contacto"
                className={`font-semibold ${
                  isEntrada ? "text-white/90 hover:text-white" : "text-accent-700 hover:text-ink"
                }`}
              >
                {isEntrada ? "Coordinar con junta" : "Consultar alcance"}
              </Link>
              <Link
                href={`/servicios/${service.slug}`}
                className={`font-semibold ${
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
  );
}

/* =========================
   HOME
========================= */
export default async function Home() {
  const { data: services } = await fetchServiceAreas();
  const serviceList = (Array.isArray(services) ? services : []).map(enrichService);

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      {/* HERO */}
      <section
        className="relative overflow-hidden border-b border-border/60 text-white"
        style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="container section-shell relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <h1 className="max-w-3xl text-white">
              Control penal para decisiones sensibles y juntas que no admiten improvisación ⚖️
            </h1>
            <p className="max-w-2xl text-lg text-slate-100">
              Acompañamiento estratégico para líderes que requieren criterio inmediato,
              documentación impecable y activación táctica sin ruido.
            </p>
            <div className="flex gap-4">
              <Link href="/agenda" className="btn-primary bg-white text-ink">
                Solicitar evaluación estratégica
              </Link>
              <Link
                href="/como-trabajamos"
                className="btn-secondary border-white/40 bg-white/10 text-white"
              >
                Ver cómo trabajamos
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-8">
            <ServiceCarousel
              items={serviceList.slice(0, 4).map((s) => ({
                title: s.title,
                description: s.description,
              }))}
            />
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section-shell bg-surface/90">
        <div className="container space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="pill w-fit">Servicios empresariales</p>
              <h2>Áreas activas de riesgo penal corporativo</h2>
            </div>
            <Link href="/agenda" className="btn-primary">
              Programar una sesión
            </Link>
          </div>

          <Suspense fallback={<ServiceSkeleton />}>
            <ServicesGrid />
          </Suspense>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        className="relative overflow-hidden section-shell text-white"
        style={{ backgroundImage: skylineBackground, backgroundSize: "cover" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 to-accent-700/70" />
        <div className="container relative grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2>Primer punto de control</h2>
            <p className="text-slate-100">
              Comparte el contexto esencial y coordinamos la disponibilidad más cercana.
            </p>
            <p className="text-sm">
              <strong>Correo directo:</strong> contacto@castellanosabogados.com
            </p>
          </div>

          <form
            action="/api/contact"
            method="post"
            className="card-shell bg-white/90 p-8 text-ink"
          >
            <div className="grid gap-4">
              <input name="name" placeholder="Nombre y rol" className="input" />
              <input name="email" type="email" required placeholder="Correo" className="input" />
              <textarea name="message" rows={4} placeholder="Contexto breve" className="input" />
              <button type="submit" className="btn-primary">
                Enviar para revisión
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-white/90 py-8">
        <div className="container flex justify-between text-sm text-muted">
          <p className="font-semibold text-ink">Castellanos Abogados</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}
