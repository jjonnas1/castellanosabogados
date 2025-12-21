import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";
import { defaultLocale } from "@/lib/i18n/config";

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.9), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";

export default async function PenalEmpresarialPage() {
  const { data: services } = await fetchServiceAreas();
  const serviceList = services.map((service) => enrichService(service, defaultLocale));

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
            <p className="max-w-3xl text-slate-100">
              Las decisiones quedan soportadas con mapas de riesgo penal, actas ejecutivas y protocolos activables. Incorporamos
              capacitaciones para juntas, comités y áreas jurídicas sobre prevención, trazabilidad y coordinación frente a eventos
              críticos, sin desplazar al equipo interno ni prometer resultados.
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
            <p className="max-w-2xl text-muted">
              También desarrollamos charlas y capacitaciones internas para que las áreas de negocio, jurídico y compliance comprendan los
              riesgos penales asociados a contratación estatal y cómo documentarlos con rigor. La formación se integra al mismo plan de
              trabajo y queda registrada para auditoría.
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
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {["Lineamientos para juntas y comités en español o inglés.", "Registro de decisiones y validaciones con fecha y responsable.", "Protocolos para capacitación de equipos clave."].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
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

      <section className="border-y border-border bg-white">
        <div className="container section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <p className="pill w-fit">Capacitaciones y conferencias</p>
            <h2>Riesgo penal explicado a quienes deciden y operan</h2>
            <p className="max-w-3xl text-muted">
              La formación es una línea visible del servicio, no un complemento opcional. Diseñamos charlas y capacitaciones en
              español o inglés para juntas, comités, áreas jurídicas, compliance y equipos de proyectos. Cada sesión queda
              documentada con materiales, bitácoras y responsables para trazabilidad.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Charlas ejecutivas para juntas", "Capacitaciones internas y talleres", "Jornadas para comités y board", "Modalidad virtual o presencial", "Sesiones en español o inglés", "Materiales y registro para auditoría"].map(
                (item) => (
                  <div key={item} className="rounded-2xl bg-subtle px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                    {item}
                  </div>
                ),
              )}
            </div>
            <p className="max-w-3xl text-sm text-muted">
              Las solicitudes de capacitación ingresan al panel del administrador para coordinar agenda y alcance. Si se requiere
              combinación con asesoría a juntas, se integra al mismo calendario y documentación.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary">
                Coordinar sesión de capacitación
              </Link>
              <Link href="/contacto" className="btn-secondary">
                Solicitar propuesta detallada
              </Link>
            </div>
          </div>
          <div className="card-shell bg-ink text-white p-8 shadow-soft">
            <p className="pill w-fit bg-white/10 text-white ring-1 ring-white/20">Formato</p>
            <h3 className="mt-3 text-white">Integración con la agenda corporativa</h3>
            <p className="text-slate-100">
              El mismo orden operativo aplica a la formación: agenda validada por el administrador, disponibilidad configurada
              por el abogado asociado y confirmación visible para el cliente corporativo.
            </p>
            <ul className="mt-4 space-y-3 text-sm text-slate-100">
              {["Casos y ejemplos vinculados a contratación estatal.", "Protocolos de actuación compartidos antes y después de la sesión.", "Registro de asistencia y materiales como soporte de cumplimiento."].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-200">
              Las capacitaciones se activan sin pago automático; el administrador coordina condiciones y confirmaciones.
            </p>
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
            <p className="max-w-2xl text-muted">
              Cada intervención incorpora documentación de riesgo penal, minuta ejecutiva y, cuando se requiere, una sesión de formación para
              responsables internos. El objetivo es que la organización conserve criterio y trazabilidad aun cuando la defensa litigiosa se
              delegue a terceros.
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
