import Link from "next/link";

export default function Terminos() {
  return (
    <div className="bg-canvas text-ink">
      <section className="border-b border-border/70 bg-white">
        <div className="container space-y-4 py-14 md:py-16">
          <Link href="/" className="text-sm font-semibold text-accent-700 hover:underline">
            ← Volver a inicio
          </Link>
          <p className="pill w-fit">Términos</p>
          <h1 className="max-w-3xl">Términos y condiciones</h1>
          <p className="max-w-2xl text-muted">
            Documento informativo de términos de uso del sitio. Ajusta este texto con las políticas formales de la firma.
          </p>
        </div>
      </section>
    </div>
  );
}
