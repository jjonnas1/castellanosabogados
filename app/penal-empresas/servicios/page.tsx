import Link from "next/link";

const servicios = [
  {
    title: "Prevención y gestión de riesgo penal",
    detail: "Evaluamos decisiones sensibles, roles y trazabilidad para reducir exposición penal." ,
  },
  {
    title: "Controles y documentación",
    detail: "Protocolos, actas y soportes con responsables definidos para juntas y comités.",
  },
  {
    title: "Reglas de actuación y acompañamiento",
    detail: "Criterios claros, alertas y coordinación para decisiones empresariales bajo presión.",
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
              <h1 className="max-w-3xl">Servicios para organizaciones</h1>
              <p className="max-w-2xl text-lg text-muted">
                Prevención, control documental y acompañamiento en decisiones corporativas con riesgo penal.
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
