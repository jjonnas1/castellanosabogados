import Link from "next/link";

const servicios = [
  {
    title: "Asesoría penal personalizada",
    detail: "Análisis del contexto, riesgos inmediatos y plan de actuación con evidencia prioritaria.",
  },
  {
    title: "Definición de estrategia",
    detail: "Coordinación con defensa, preparación de intervenciones y orden de entrega documental.",
  },
  {
    title: "Seguimiento y comunicación",
    detail: "Actualizaciones periódicas para la persona y su entorno cercano con foco en decisiones informadas.",
  },
];

export default function PenalPersonasServicios() {
  return (
    <div className="bg-canvas text-ink">
      <section className="border-b border-border/70 bg-white">
        <div className="container space-y-6 py-14 md:py-18">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <p className="pill w-fit">Penal / Personas</p>
              <h1 className="max-w-3xl">Servicios para personas naturales</h1>
              <p className="max-w-2xl text-lg text-muted">
                Asesoría penal sobria y responsable para orientar cada decisión y la relación con la defensa.
              </p>
            </div>
            <Link href="/" className="hidden text-sm font-semibold text-accent-700 underline-offset-4 hover:underline md:inline-flex">
              ← Inicio
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {servicios.map((item) => (
              <article key={item.title} className="card-shell h-full border border-border bg-subtle p-5 shadow-soft">
                <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/penal-personas/asesoria" className="btn-primary">
              Solicitar asesoría
            </Link>
            <Link href="/auth/login" className="btn-secondary">
              Iniciar sesión
            </Link>
            <Link href="/" className="text-sm font-semibold text-muted underline-offset-4 hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
