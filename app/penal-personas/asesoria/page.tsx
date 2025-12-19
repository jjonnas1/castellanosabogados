import Link from "next/link";

export default function PenalPersonasAsesoria() {
  return (
    <div className="bg-canvas text-ink">
      <section className="border-b border-border/70 bg-white">
        <div className="container space-y-8 py-14 md:py-18">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">Penal / Personas</p>
              <h1 className="max-w-3xl">Solicitar asesoría penal</h1>
              <p className="max-w-2xl text-lg text-muted">
                Revisión prioritaria para definir pasos inmediatos, documentación y comunicación con tu entorno cercano.
              </p>
            </div>
            <Link href="/" className="hidden text-sm font-semibold text-accent-700 underline-offset-4 hover:underline md:inline-flex">
              ← Inicio
            </Link>
          </div>

          <div className="card-shell space-y-4 border border-border bg-subtle p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-ink">Modalidad</h3>
            <ul className="space-y-2 text-sm text-muted">
              {["Sesión virtual o presencial según urgencia.", "Diagnóstico breve y plan de actuación.", "Coordinación posterior con defensa o familia si aplica."].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-ink" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contacto" className="btn-primary">
                Solicitar ahora
              </Link>
              <Link href="/auth/registro" className="btn-secondary">
                Registrarse
              </Link>
              <Link href="/auth/login" className="text-sm font-semibold text-muted underline-offset-4 hover:underline">
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
