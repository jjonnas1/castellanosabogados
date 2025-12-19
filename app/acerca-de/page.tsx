import Link from "next/link";

const valores = [
  {
    title: "Criterio",
    detail: "Juicio ejecutivo para interpretar riesgo penal y priorizar decisiones sin dilaciones.",
  },
  {
    title: "Control",
    detail: "Documentación, protocolos y responsables claros para juntas y comités.",
  },
  {
    title: "Tranquilidad",
    detail: "Comunicación sobria, sin promesas, enfocada en mantener la operación bajo control.",
  },
];

export default function AcercaDe() {
  return (
    <div className="bg-canvas text-ink">
      <section className="border-b border-border/70 bg-white">
        <div className="container space-y-4 py-14 md:py-18">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 underline-offset-4 hover:underline"
          >
            ← Volver a inicio
          </Link>
          <p className="pill w-fit">Acerca de</p>
          <h1 className="max-w-3xl">Firma boutique enfocada en riesgo penal en contratación estatal</h1>
          <p className="max-w-2xl text-lg text-muted">
            Acompañamos a juntas y personas naturales en escenarios sensibles con método, trazabilidad y activación táctica cuando el tiempo es crítico.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/penal-empresas/servicios" className="btn-primary">
              Penal / Empresas
            </Link>
            <Link href="/penal-personas/servicios" className="btn-secondary">
              Penal / Personas
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border/70 bg-subtle">
        <div className="container grid gap-6 py-14 md:grid-cols-3">
          {valores.map((value) => (
            <div key={value.title} className="card-shell h-full border border-border bg-white p-6 shadow-soft">
              <p className="text-[12px] uppercase tracking-[0.16em] text-accent-700">{value.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
