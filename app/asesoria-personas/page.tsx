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
          <p className="max-w-3xl text-slate-100">
            La asesoría se centra en tomar decisiones responsables, documentar cada paso y coordinar con defensores cuando es necesario.
            Nos enfocamos en que la persona comprenda su exposición penal, actúe con prudencia y conserve trazabilidad de lo discutido.
          </p>
          <p className="max-w-3xl text-slate-100">
            Cada sesión queda registrada con instrucciones concretas, mensajes clave y responsables de seguimiento. No prometemos
            resultados; facilitamos criterios y límites claros para avanzar con orden y evitar pasos precipitadamente riesgosos.
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
          <p className="max-w-2xl text-muted">
            La disponibilidad que ve el cliente corresponde a la agenda real del abogado asociado. El pago se habilita cuando eliges un
            horario disponible y se genera el soporte de la reserva. Las sesiones pueden complementarse con notas escritas para facilitar
            la coordinación con tu defensa.
          </p>
          <p className="max-w-2xl text-muted">
            El proceso prioriza la comprensión y la anticipación: preparamos mensajes para terceros, documentos que respalden tu decisión
            y un plan de coordinación con defensores si el caso escala. También podemos emitir reportes breves para aliados de confianza.
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

      <section className="border-t border-border bg-surface/70">
        <div className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-3">
            <p className="pill w-fit">Proceso y expectativas</p>
            <h2>Cómo se desarrolla la asesoría</h2>
            <p className="max-w-2xl text-muted">
              La línea personal replica la misma disciplina que aplicamos a juntas y comités: agenda real, pagos al reservar y
              documentos de soporte. Así evitamos improvisación y mantenemos trazabilidad ante futuras revisiones o defensas.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Selección de horario disponible y pago habilitado al confirmarlo", "Sesión inicial para delimitar riesgo penal y acuerdos de confidencialidad", "Entrega de guías escritas, mensajes clave y pasos siguientes", "Coordinación con defensores si el caso requiere litigio"].map(
                (item) => (
                  <div key={item} className="rounded-2xl border border-border bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="card-shell bg-white p-8 shadow-soft/40">
            <p className="pill w-fit">Notas importantes</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden /> Cada sesión produce un registro privado y materiales de referencia.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden /> Si se requiere defensa litigiosa, articulamos aliados sin perder el control documental.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden /> Puedes solicitar la sesión en español o inglés según tu necesidad.</li>
            </ul>
            <p className="mt-4 text-xs text-muted">El objetivo es que tomes decisiones responsables, con soporte y claridad sobre los siguientes pasos.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary">Seleccionar horario</Link>
              <Link href="/contacto" className="btn-secondary">Hablar con el equipo</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
