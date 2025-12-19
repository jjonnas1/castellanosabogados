import Link from "next/link";

export default function Registro() {
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
          <p className="pill w-fit">Registro</p>
          <h1 className="max-w-3xl">Crear acceso para coordinación penal</h1>
          <p className="max-w-2xl text-lg text-muted">
            Ingresa tus datos para habilitar seguimiento de casos, documentación y coordinación de agenda.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/cliente/registro" className="btn-primary">
              Continuar con registro
            </Link>
            <Link href="/login" className="btn-secondary">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
