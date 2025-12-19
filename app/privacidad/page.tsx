import Link from "next/link";

export default function Privacidad() {
  return (
    <div className="bg-canvas text-ink">
      <section className="border-b border-border/70 bg-white">
        <div className="container space-y-4 py-14 md:py-16">
          <Link href="/" className="text-sm font-semibold text-accent-700 hover:underline">
            ← Volver a inicio
          </Link>
          <p className="pill w-fit">Privacidad</p>
          <h1 className="max-w-3xl">Política de privacidad</h1>
          <p className="max-w-2xl text-muted">
            Describe el manejo de datos personales y contactos. Sustituye este texto por la política oficial cuando esté lista.
          </p>
        </div>
      </section>
    </div>
  );
}
