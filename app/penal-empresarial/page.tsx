import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.9), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";

export default async function PenalEmpresarialPage() {
  const { data: services } = await fetchServiceAreas();
  const serviceList = services.map(enrichService);

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.14),transparent_36%)]"
          aria-hidden
        />
        <div className="container section-shell relative space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">Penal empresarial</span>
            <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">Contratación estatal</span>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-white">Control penal para decisiones corporativas en contratación estatal</h1>
            <p className="max-w-3xl text-lg text-slate-100">
              Acompañamiento ejecutivo, documentación lista para junta y activación táctica cuando el riesgo penal se cruza con decisiones
              urgentes. Nos alineamos con comités, órganos de control y cumplimiento interno.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              Solicitar evaluación estratégica
            </Link>
            <Link href="/como-trabajamos" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              Ver metodología
            </Link>
          </div>
          <div className="grid gap-4 text-sm text-slate-100 sm:grid-cols-3">
            {["Alerta temprana y priorización", "Documentación ejecutiva y trazable", "Activación con responsables y comités"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
                {item}
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="section-shell bg-surface/70">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">Qué hacemos</p>
            <h2>Intervenciones que evitan improvisación</h2>
            <p className="max-w-2xl text-muted">
              Definimos ritmo, responsables, soportes y límites antes, durante y después de cada decisión sensible. No asumimos litigio, sí
              aseguramos criterio, trazabilidad y protocolos accionables.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Diseño de rutas ejecutivas", "Mapeo de riesgo penal", "Protocolos activables", "Coordinación con control interno"].map(
                (item) => (
                  <div key={item} className="card-shell bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="card-shell bg-white p-8 shadow-soft/40">
            <p className="pill w-fit">Modelo</p>
            <h3 className="mt-3 text-ink">Documento de acompañamiento estratégico</h3>
            <p className="mt-2 text-muted text-sm">
              Un solo documento vivo que alinea comités, define límites y activa protocolos. Incluye minutas, escenarios, mensajes clave y
              responsables. Mantiene un rastro claro para auditoría y órganos de control.
            </p>
            <div className="mt-5 grid gap-3 text-xs uppercase tracking-[0.16em] text-muted sm:grid-cols-3">
              {["Diagnóstico", "Protocolos", "Activación"].map((tag) => (
                <div key={tag} className="rounded-full bg-subtle px-3 py-2 text-center text-ink">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-white">
        <div className="container section-shell space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="pill w-fit">Servicios activos</p>
              <h2 className="text-ink">Portafolio penal corporativo</h2>
              <p className="max-w-2xl text-muted">
                Iniciamos por DRP-CE y escalamos a AEC-CE e ICP-CE según la madurez y la presión del caso. Todos los servicios mantienen
                límite: no litigio, sí control y trazabilidad.
              </p>
            </div>
            <Link href="/servicios" className="btn-secondary">
              Ver hub de servicios
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {serviceList.map((service) => (
              <div key={service.slug} className="card-shell flex h-full flex-col justify-between bg-subtle px-5 py-5 shadow-soft/30">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{service.title}</p>
                  <h3 className="text-ink">{service.name}</h3>
                  <p className="text-sm text-muted">{service.description}</p>
                </div>
                <Link
                  href={`/servicios/${service.slug}`}
                  className="btn-primary mt-4 justify-center"
                >
                  Activar {service.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface/70">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-3">
            <p className="pill w-fit">Cómo actuamos</p>
            <h2>Metodología breve y trazable</h2>
            <p className="max-w-2xl text-muted">
              Etapas cortas con entregables visibles para juntas y órganos de control. Cada fase puede activarse de forma independiente y
              mantiene registro ejecutivo.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {[{ title: "Evaluación", body: "Contexto, hipótesis de riesgo y responsables." }, { title: "Mapa de riesgo", body: "Matrices, dependencias y rutas de mitigación." }, { title: "Acompañamiento", body: "Sesiones ejecutivas con documentos listos." }, { title: "Activación", body: "Protocolos, mensajes y coordinación táctica." }].map(
                (item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-white px-4 py-4 shadow-soft/30">
                    <h3 className="text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.body}</p>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="card-shell bg-white p-8 shadow-soft/40">
            <p className="pill w-fit">Límites y alcance</p>
            <h3 className="mt-3 text-ink">Sin litigio, con documentación sólida</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {["No asumimos representación litigiosa.", "No reemplazamos equipos jurídicos internos.", "Actuamos en coordinación con compliance y auditoría.", "Si se requiere defensa, articulamos aliados manteniendo trazabilidad."].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary">
                Programar evaluación
              </Link>
              <Link href="/contacto" className="btn-secondary">
                Coordinar con junta
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-gradient-to-b from-white to-surface/70">
        <div className="container section-shell space-y-5 text-center">
          <p className="pill mx-auto w-fit">Activar ahora</p>
          <h2>Empecemos por DRP-CE y escale según el riesgo</h2>
          <p className="mx-auto max-w-3xl text-muted">
            Definimos el primer control en 48-72 horas y articulamos los pasos siguientes con tus responsables clave.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/agenda" className="btn-primary">
              Solicitar evaluación
            </Link>
            <Link href="/servicios" className="btn-secondary">
              Explorar servicios
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
