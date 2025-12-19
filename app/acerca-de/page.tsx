import Link from "next/link";

const valores = [
  {
    title: "Criterio",
    detail: "Juicio jurídico para interpretar el riesgo penal y priorizar decisiones sin dilaciones.",
  },
  {
    title: "Método",
    detail: "Documentación, protocolos y responsables claros para garantizar trazabilidad.",
  },
  {
    title: "Control",
    detail: "Comunicación sobria y seguimiento constante para mantener las actuaciones bajo control.",
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
          <h1 className="max-w-3xl">Firma especializada en gestión del riesgo penal</h1>
          <p className="max-w-2xl text-lg text-muted">
            Acompañamos a organizaciones y personas en escenarios de riesgo penal, aportando criterio jurídico, método, trazabilidad y control para decisiones responsables.
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

      <section className="bg-white">
        <div className="container grid gap-8 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-3">
            <p className="pill w-fit">Fundador</p>
            <h2 className="max-w-2xl">Dirección jurídica con enfoque en decisiones críticas</h2>
            <p className="max-w-3xl text-muted">
              <strong>Nombre completo</strong> · Fundador y Director. Abogado con experiencia en el sector público y formación en lenguas modernas. Maneja varios idiomas como herramienta estratégica en contextos jurídicos complejos. Su trabajo se centra en criterio jurídico, responsabilidad y control del riesgo.
            </p>
          </div>
          <div className="card-shell flex h-full min-h-[240px] items-center justify-center border border-border bg-subtle p-6 text-muted shadow-soft">
            Espacio para fotografía profesional
          </div>
        </div>
      </section>
    </div>
  );
}
