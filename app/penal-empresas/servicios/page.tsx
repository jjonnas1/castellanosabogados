import Link from "next/link";

const servicios = [
  {
    title: "Prevención y gestión de riesgo penal",
    detail: "Evaluamos decisiones de contratación estatal, roles y trazabilidad para reducir exposición penal.",
  },
  {
    title: "Controles y documentación ejecutiva",
    detail: "Protocolos, actas y soportes para juntas y comités con foco en evidencia y cumplimiento.",
  },
  {
    title: "Acompañamiento a junta y comité de crisis",
    detail: "Sesiones breves, definición de responsables y activación coordinada con equipos internos y externos.",
  },
];

export default function PenalEmpresasServicios() {
  return (
    <div className="bg-canvas text-ink">
      <section className="border-b border-border/70 bg-white">
        <div className="container space-y-6 py-14 md:py-18">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">Penal / Empresas</p>
              <h1 className="max-w-3xl">Servicios para organizaciones en contratación estatal</h1>
              <p className="max-w-2xl text-lg text-muted">
                Operamos como equipo de control penal preventivo: decisiones claras, documentación y reacción en crisis.
              </p>
            </div>
            <Link href="/" className="hidden text-sm font-semibold text-accent-700 underline-offset-4 hover:underline md:inline-flex">
              ← Inicio
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {servicios.map((item) => (
              <article key={item.title} className="card-shell h-full border border-border bg-subtle p-5 shadow-soft">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/penal-empresas/contacto" className="btn-primary">
              Coordinar contacto empresa
            </Link>
            <Link href="/contacto" className="btn-secondary">
              Contacto general
            </Link>
            <Link href="/" className="text-sm font-semibold text-muted underline-offset-4 hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
