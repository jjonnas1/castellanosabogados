import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";

const personalBackground =
  "linear-gradient(140deg, rgba(10,16,28,0.9), rgba(20,32,52,0.82)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80')";

export default function AsesoriaPersonasPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: personalBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/82 to-accent-700/70" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Línea secundaria</p>
          <h1 className="max-w-3xl text-white">Asesoría penal a personas naturales</h1>
          <p className="max-w-3xl text-slate-100">
            Intervención corta y confidencial para situaciones puntuales. No implica representación litigiosa y no interfiere con el foco
            corporativo de la firma.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              Solicitar orientación
            </Link>
            <Link href="/contacto" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              Contacto directo
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4">
          <p className="pill w-fit">Cómo te ayudamos</p>
          <h2>Intervención corta y clara</h2>
          <p className="max-w-2xl text-muted">
            Revisamos el caso, delimitamos alcance y entregamos instrucciones accionables. Si se requiere defensa judicial, articulamos
            aliados externos manteniendo el control documental.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Contexto y alcance en 20-30 minutos", "Guías de actuación y protocolos base", "Documentos y soportes listos para consulta", "Coordinación con aliados litigiosos cuando es necesario"].map(
              (item) => (
                <div key={item} className="card-shell bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
        <div className="card-shell bg-white p-8 shadow-soft/40">
          <p className="pill w-fit">Alcance</p>
          <h3 className="mt-3 text-ink">Lo que está incluido</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden /> Evaluación y lineamientos iniciales.</li>
            <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden /> Protocolos de actuación y mensajes clave.</li>
            <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden /> Coordinación con aliados para litigio cuando aplica.</li>
          </ul>
          <p className="mt-4 text-xs text-muted">No asumimos representación litigiosa. Nuestro rol es estratégico y documental.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary">Agendar revisión</Link>
            <Link href="/" className="btn-secondary">Volver al inicio</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
