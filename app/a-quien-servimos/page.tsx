import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";

const roles = [
  {
    title: "Representantes legales",
    detail: "Decisiones sensibles con exposición penal inmediata. Definimos límites, protocolos y documentación lista para junta.",
  },
  {
    title: "Juntas y comités",
    detail: "Sesiones ejecutivas para priorizar riesgos, coordinar responsables y dejar trazabilidad frente a órganos de control.",
  },
  {
    title: "Órganos de control interno",
    detail: "Alineamos protocolos con auditoría, cumplimiento y defensores del control, manteniendo independencia y registro.",
  },
  {
    title: "Aliados y proveedores críticos",
    detail: "Instrucciones y acuerdos que reducen exposición penal en contratación estatal y proyectos de alto impacto.",
  },
];

export default function AQuienServimosPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-ink via-ink/90 to-accent text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_72%_8%,rgba(255,255,255,0.12),transparent_36%)]" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">A quién servimos</p>
          <h1 className="max-w-3xl text-white">Actuamos con los responsables que toman decisiones</h1>
          <p className="max-w-3xl text-lg text-slate-100">
            Nos conectamos con quienes pueden activar controles inmediatos: representantes legales, juntas, comités y órganos de control.
            No trabajamos como firma litigante; somos acompañamiento estratégico y documental.
          </p>
          <p className="max-w-3xl text-slate-100">
            La firma es dirigida por su fundador, abogado y licenciado en lenguas modernas con experiencia en el sector público y en análisis
            jurídico penal. Lidera personalmente la estrategia, maneja varios idiomas y mantiene la coordinación con los equipos de cada cliente.
            Espacio reservado para fotografía profesional.
          </p>
          <ul className="max-w-3xl space-y-2 text-sm text-slate-100">
            {["Gestión de riesgo penal con documentación y trazabilidad.", "Acompañamiento a juntas y comités en español o inglés.", "Coordinación con defensa y áreas internas sin promesas de resultado."]
              .map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-white" aria-hidden />
                  {item}
                </li>
              ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              Solicitar evaluación
            </Link>
            <Link href="/contacto" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              Coordinar con junta
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-white/90">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-3">
            <p className="pill w-fit">Fundador</p>
            <h2>Dirección jurídica y enfoque bilingüe</h2>
            <p className="max-w-3xl text-muted">
              La firma es dirigida por su fundador, abogado penal y licenciado en lenguas modernas. Cuenta con experiencia en el
              sector público y en análisis jurídico penal, maneja varios idiomas y lidera personalmente la estrategia para cada
              cliente. Coordina en español o inglés según la audiencia y mantiene el enlace con aliados cuando el caso lo
              requiere.
            </p>
            <p className="max-w-3xl text-muted">
              Mantiene control directo sobre la documentación, los mensajes clave y la preparación de juntas y comités. El
              espacio para fotografía profesional se conserva para reforzar cercanía y formalidad.
            </p>
            <div className="grid gap-2 text-sm text-muted">
              <div className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden /> Coordinación
                estratégica en español e inglés con órganos de gobierno corporativo.</div>
              <div className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden /> Experiencia en
                poder público y análisis penal aplicada a decisiones empresariales y personales.</div>
              <div className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden /> Alineación con
                compliance, auditoría y defensa para mantener trazabilidad.</div>
            </div>
          </div>
          <div className="card-shell bg-subtle p-8 shadow-soft/40">
            <div className="aspect-[4/3] rounded-2xl border border-border bg-white/60" aria-hidden />
            <p className="mt-3 text-sm text-muted">Espacio reservado para fotografía profesional.</p>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>Rol: Administrador del sistema con aprobación de abogados asociados y control de agenda y pagos.</p>
              <p>Interacción: coordina solicitudes de capacitación y valida la disponibilidad que ven los clientes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-shell space-y-6">
        <div className="space-y-3">
          <p className="pill w-fit">Roles clave</p>
          <h2>Quiénes intervienen</h2>
          <p className="max-w-3xl text-muted">
            Articulamos responsables internos y externos para que cada decisión quede soportada y trazable.
          </p>
          <p className="max-w-3xl text-muted">
            Cada rol recibe instrucciones específicas, bitácoras de seguimiento y, cuando aplica, sesiones de capacitación sobre
            gestión del riesgo penal en contratación estatal. El objetivo es que todos conozcan el alcance y las fronteras de la
            actuación penal antes de firmar o ejecutar.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((role) => (
            <div key={role.title} className="rounded-2xl border border-border bg-white p-6 shadow-soft/30">
              <h3 className="text-ink">{role.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{role.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/70">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-3">
            <p className="pill w-fit">Contextos</p>
            <h2>Escenarios frecuentes</h2>
            <p className="max-w-2xl text-muted">
              Decisiones de contratación, activación de pólizas, relaciones con órganos de control y preparación ante incidentes.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Contratación estatal compleja", "Investigaciones preliminares", "Crisis reputacional", "Cambio de gobierno o auditoría"].map(
                (item) => (
                  <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink shadow-soft/30">
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="card-shell bg-white p-8 shadow-soft/40">
            <p className="pill w-fit">CTA</p>
            <h3 className="mt-3 text-ink">Coordina con el responsable adecuado</h3>
            <p className="mt-2 text-sm text-muted">Asignamos responsables, definimos soportes y dejamos rastro documental en la primera sesión.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary">
                Programar sesión
              </Link>
              <Link href="/servicios" className="btn-secondary">
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
