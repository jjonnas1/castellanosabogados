import Link from "next/link";

export default function PenalEmpresasServicios() {
  return (
    <main className="bg-canvas text-ink">
      <section className="section-shell border-b border-border/70 bg-gradient-to-br from-ink/5 via-surface to-subtle/40">
        <div className="container space-y-4">
          <p className="pill w-fit">Penal / Empresas</p>
          <h1 className="max-w-3xl">Servicios ejecutivos para juntas y contratación estatal</h1>
          <p className="max-w-2xl text-lg text-muted">
            Arquitectura penal aplicada a decisiones de alto impacto: continuidad operativa, protección de reputación y control documental frente a órganos de control.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary">
              Solicitar evaluación
            </Link>
            <Link href="/contacto" className="btn-secondary">
              Contacto inmediato
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container grid gap-6 md:grid-cols-3">
          {["DRP-CE: Defensa y reacción penal en contratación estatal", "AEC-CE: Acompañamiento estratégico y controles", "ICP-CE: Investigación, compliance y protocolos"].map((item) => (
            <div key={item} className="card subtle space-y-3">
              <h3 className="text-lg font-semibold text-ink">{item}</h3>
              <p className="text-muted text-sm leading-relaxed">
                Modelos escalables según riesgo, con entregables ejecutivos y trazabilidad para comités y juntas directivas.
              </p>
              <Link href="/contacto" className="text-sm font-semibold text-accent-700 underline-offset-4 hover:underline">
                Coordinar ahora
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
