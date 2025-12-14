import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";

export default async function Home() {
  const { data: services, error } = await fetchServiceAreas();
  const serviceList = services.map(enrichService);

  return (
    <main className="bg-gradient-to-b from-white via-slate-50 to-[#eef3f9] pb-16">
      <SiteHeader />

      <section className="container section-shell grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-brand-800 shadow-soft ring-1 ring-brand-100">
            Boutique ejecutiva · Riesgo penal en contratación estatal
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Tranquilidad y control para decisiones sensibles en contratación estatal
          </h1>
          <p className="text-lg text-slate-700">
            Acompañamos a representantes legales y equipos directivos para anticipar, mitigar y administrar el riesgo penal asociado a decisiones de alto impacto.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/agenda"
              className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-800"
            >
              Agendar evaluación inicial
            </Link>
            <Link
              href="/servicios"
              className="rounded-full px-6 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              Ver servicios
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Cobertura</p>
              <p>Contratación estatal, gobierno corporativo, juntas y órganos de control.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Enfoque</p>
              <p>Prevención, controles y reacción táctica ante eventos críticos.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-3xl bg-brand-100 blur-2xl" aria-hidden />
          <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-3xl bg-slate-200 blur-3xl" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Modelo</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">Acompañamiento estratégico</h3>
                <p className="mt-3 text-sm text-slate-600">
                  Integramos prevención penal, control interno y gobierno corporativo para proteger decisiones clave.
                </p>
              </div>
              <span className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700">Confidencial</span>
            </div>
            <div className="mt-6 grid gap-4 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                Decisiones sensibles · contrataciones complejas · comités y juntas extraordinarias.
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
                Mapas de riesgo penal + reglas de actuación + preparación de vocerías y soportes.
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
                Activación táctica ante incidentes: contención, documentación y coordinación externa.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="que-hacemos" className="section-shell bg-white/70">
        <div className="container grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Qué hacemos</p>
            <h2 className="text-3xl font-semibold text-slate-900">Intervenimos donde las decisiones mueven riesgo</h2>
            <p className="text-slate-700">
              No somos un despacho penal masivo. Operamos como célula estratégica para juntas, representantes legales y equipos de cumplimiento que necesitan criterios accionables y trazables.
            </p>
            <ul className="grid gap-3 text-slate-800">
              <li className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-brand-600" aria-hidden />
                Decisiones de contratación estatal y gobierno corporativo con exposición penal.
              </li>
              <li className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-brand-600" aria-hidden />
                Configuración de controles y reglas de actuación frente a eventos sensibles.
              </li>
              <li className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-brand-600" aria-hidden />
                Coordinación táctica en incidentes críticos y escenarios de investigación.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-brand-50 to-white p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-slate-900">Para quién</h3>
            <p className="mt-3 text-slate-700">Órganos directivos, representantes legales y equipos de cumplimiento que exigen soporte ejecutivo, rápido y discreto.</p>
            <div className="mt-6 grid gap-4 text-sm text-slate-800">
              <div className="rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-brand-100">
                Comités de contratación y juntas extraordinarias.
              </div>
              <div className="rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-brand-100">
                Oficinas jurídicas, control interno y auditoría.
              </div>
              <div className="rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-brand-100">
                Equipos de asuntos públicos y relacionamiento con entes de control.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="container section-shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Servicios</p>
            <h2 className="text-3xl font-semibold text-slate-900">Áreas de práctica focalizadas</h2>
            <p className="mt-2 max-w-2xl text-slate-700">
              Mostramos únicamente las áreas habilitadas en Supabase. Cada tarjeta incluye un acceso directo para solicitar agenda.
            </p>
          </div>
          <Link href="/agenda" className="inline-flex rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-800">
            Programar una sesión
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            No pudimos conectar con Supabase. La lista de servicios puede no estar completa.
          </div>
        )}

        {serviceList.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-700 shadow-soft">
            <p className="text-lg font-semibold text-slate-900">Servicios no disponibles por el momento</p>
            <p className="mt-2">Vuelve pronto o contáctanos para agendar una revisión prioritaria.</p>
            <Link href="/contacto" className="mt-4 inline-block rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-800">
              Contacto directo
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {serviceList.map((service) => (
              <div
                key={service.slug}
                className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-soft"
              >
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{service.slug}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-700">{service.description}</p>
                </div>
                <Link
                  href="/agenda"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Solicitar
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="como-trabajamos" className="section-shell bg-white/70">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Cómo trabajamos</p>
            <h2 className="text-3xl font-semibold text-slate-900">Disciplina y límites claros</h2>
            <p className="text-slate-700">Operamos con procesos breves y medibles para mantener control y trazabilidad.</p>
            <ol className="space-y-3 text-sm text-slate-800">
              {[
                "Evaluación inicial de riesgo y alcance (20-30 minutos).",
                "Mapa de decisiones y controles aplicables a tu comité o junta.",
                "Acompañamiento puntual en hitos críticos y seguimiento ejecutable.",
                "Activación de protocolo de incidentes y coordinación con aliados especializados.",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                  <span className="mt-0.5 text-brand-700">●</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-soft">
            <h3 className="text-xl font-semibold">Alcance y límites</h3>
            <p className="mt-3 text-slate-200">No ofrecermos defensa penal litigiosa ni representación masiva. Nos enfocamos en prevención, control y coordinación estratégica.</p>
            <div className="mt-6 grid gap-3 text-sm text-slate-100">
              <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Sesiones por videollamada o en sitio (según agenda).</div>
              <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Reportes ejecutivos, minutas y reglas de actuación.</div>
              <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">Coordinación con aliados técnicos y comunicaciones.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="a-quien-servimos" className="container section-shell">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">A quién servimos</p>
            <h2 className="text-3xl font-semibold text-slate-900">Equipos que requieren criterio y control</h2>
            <p className="mt-3 text-slate-700">Acompañamos roles que necesitan decisiones serenas y documentación impecable.</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {["Representantes legales", "Miembros de junta", "Comités de contratación", "Direcciones jurídicas", "Auditoría y control interno", "Relaciones con entes de control"].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-soft">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-slate-900">Compromisos</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="mt-0.5 text-brand-700">●</span> Confidencialidad estricta y trazabilidad de hallazgos.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-brand-700">●</span> Entregables ejecutivos claros y accionables.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-brand-700">●</span> Disponibilidad prioritaria en incidentes críticos.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-brand-700">●</span> Coordinación con compliance, auditoría y comunicaciones.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contacto" className="section-shell bg-white/70">
        <div className="container grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Contacto</p>
            <h2 className="text-3xl font-semibold text-slate-900">Coordinemos una revisión prioritaria</h2>
            <p className="mt-3 text-slate-700">Déjanos tus datos y te responderemos con la disponibilidad más cercana. También puedes escribirnos para coordinar agenda ejecutiva.</p>
            <div className="mt-6 space-y-2 text-sm text-slate-700">
              <p><strong className="text-slate-900">Correo:</strong> contacto@castellanosabogados.com</p>
              <p><strong className="text-slate-900">Agenda:</strong> Respuesta en menos de 24 horas hábiles.</p>
            </div>
          </div>
          <form className="rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
            <div className="grid gap-4">
              <label className="text-sm font-semibold text-slate-800">
                Nombre completo
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </label>
              <label className="text-sm font-semibold text-slate-800">
                Correo corporativo
                <input
                  type="email"
                  placeholder="nombre@empresa.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </label>
              <label className="text-sm font-semibold text-slate-800">
                Interés
                <select className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100">
                  <option>Evaluación inicial</option>
                  <option>Agenda para junta o comité</option>
                  <option>Protocolo de incidentes</option>
                  <option>Otro</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-800">
                Contexto (opcional)
                <textarea
                  rows={4}
                  placeholder="Comparte el contexto en 3-4 líneas"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </label>
              <button
                type="button"
                className="mt-2 inline-flex justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Enviar mensaje
              </button>
              <p className="text-xs text-slate-500">Este formulario es referencial. Para coordinación inmediata usa el correo directo.</p>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="container flex flex-col gap-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-slate-900">Castellanos Abogados</p>
            <p>Boutique ejecutiva · Riesgo penal en contratación estatal</p>
          </div>
          <div className="text-right text-slate-700">
            <p className="font-semibold text-slate-900">Criterio • Control • Tranquilidad</p>
            <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
