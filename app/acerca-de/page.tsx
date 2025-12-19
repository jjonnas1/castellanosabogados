import Link from "next/link";

export default function AcercaDe() {
  return (
    <main className="bg-canvas text-ink">
      <section className="section-shell border-b border-border/70 bg-gradient-to-br from-ink/7 via-surface to-subtle/30">
        <div className="container space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 underline-offset-4 hover:underline"
          >
            ← Volver a inicio
          </Link>
          <p className="pill w-fit">Acerca de</p>
          <h1 className="max-w-3xl">Firma boutique enfocada en riesgo penal en contratación estatal</h1>
          <p className="max-w-2xl text-lg text-muted">
            Lideramos acompañamientos discretos para juntas y comités, con documentación impecable y activación táctica cuando la decisión lo exige.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/servicios" className="btn-primary">
              Ver servicios
            </Link>
            <Link href="/contacto" className="btn-secondary">
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container grid gap-6 md:grid-cols-3">
          {["Criterio", "Control", "Tranquilidad"].map((value) => (
            <div key={value} className="card subtle space-y-2">
              <h3 className="text-lg font-semibold text-ink">{value}</h3>
              <p className="text-sm text-muted leading-relaxed">
                Operamos con confidencialidad y un método claro orientado a decisiones críticas y órganos de control.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
