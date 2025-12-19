import Link from "next/link";

export default function PenalPersonasAsesoria() {
  return (
    <main className="bg-canvas text-ink">
      <section className="section-shell border-b border-border/70 bg-gradient-to-r from-ink/8 via-surface to-subtle/30">
        <div className="container space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-700 underline-offset-4 hover:underline"
          >
            ← Volver a inicio
          </Link>
          <p className="pill w-fit">Asesoría</p>
          <h1 className="max-w-3xl">Sesión ejecutiva para personas con exposición penal</h1>
          <p className="max-w-2xl text-lg text-muted">
            Coordinamos una sesión prioritaria para mapear riesgo, delimitar exposición y definir los siguientes pasos con trazabilidad.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary">
              Agendar ahora
            </Link>
            <Link href="/contacto" className="btn-secondary">
              Coordinar por contacto
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {["Evaluación", "Mapa de riesgo", "Activación"].map((step, idx) => (
              <div key={step} className="card subtle space-y-2">
                <p className="text-[12px] uppercase tracking-[0.18em] text-muted">Paso {idx + 1}</p>
                <h3 className="text-lg font-semibold text-ink">{step}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Secuencia condensada para mantener control y comunicación clara con los responsables de decisión.
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-border bg-subtle/70 p-6">
            <h3 className="text-lg font-semibold text-ink">¿Prefieres registro previo?</h3>
            <p className="mt-2 text-sm text-muted">Registra tus datos para acelerar el onboarding y compartir antecedentes relevantes.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/registro" className="btn-secondary">
                Registrarse
              </Link>
              <Link href="/login" className="text-sm font-semibold text-accent-700 underline-offset-4 hover:underline">
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
