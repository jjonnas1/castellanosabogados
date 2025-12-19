import Link from "next/link";

export default function PenalPersonasServicios() {
  return (
    <main className="bg-canvas text-ink">
      <section className="section-shell border-b border-border/70 bg-gradient-to-br from-ink/6 via-surface to-subtle/30">
        <div className="container space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 underline-offset-4 hover:underline"
          >
            ← Volver a inicio
          </Link>
          <p className="pill w-fit">Penal / Personas</p>
          <h1 className="max-w-3xl">Intervención penal personalizada para directivos y apoderados</h1>
          <p className="max-w-2xl text-lg text-muted">
            Acompañamiento estratégico para ejecutivos y representantes legales con riesgo penal asociado a decisiones en contratación estatal.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/penal-personas/asesoria" className="btn-primary">
              Solicitar asesoría
            </Link>
            <Link href="/contacto" className="btn-secondary">
              Contacto directo
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container grid gap-6 md:grid-cols-2">
          {["Servicios focalizados", "Cobertura ejecutiva"].map((title) => (
            <div key={title} className="card subtle space-y-3">
              <h3 className="text-lg font-semibold text-ink">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                Defensa penal, acompañamiento preventivo y preparación de declarantes con énfasis en documentación y coordinación con órganos de control.
              </p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <Link href="/registro" className="btn-secondary">
                  Registrarse
                </Link>
                <Link href="/login" className="text-accent-700 underline-offset-4 hover:underline">
                  Log in
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
