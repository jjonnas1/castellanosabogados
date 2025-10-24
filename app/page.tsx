// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero-card wrap">
        <div className="hero-copy">
          <p className="kicker">Nueva · Asesoría virtual de 20 minutos</p>
          <h1>
            Asesoría legal clara y cercana, <br /> en menos de 20 minutos.
          </h1>
          <p className="lead">
            Agenda en línea y conéctate por videollamada con un abogado experto
            en derecho colombiano. Precio y tiempo definidos. Sin traslados, sin
            complicaciones.
          </p>
          <div className="cta-row">
            <Link href="/agenda" className="btn btn--primary">
              Agendar asesoría
            </Link>
            <Link href="/servicios" className="btn btn--ghost">
              Ver servicios
            </Link>
          </div>
        </div>

        <aside className="hero-note">
          <h3>¿Por qué con nosotros?</h3>
          <ul>
            <li>Abogados verificados por especialidad.</li>
            <li>Agenda segura y confirmación por correo.</li>
            <li>Respuestas claras y accionables.</li>
          </ul>
        </aside>
      </section>

      <section className="wrap section">
        <h2>Servicios en línea</h2>
        <p className="muted">
          Todo lo necesario para una consulta eficiente y transparente.
        </p>

        <div className="cards-4">
          <Link href="/agenda" className="card">
            <h3>Agenda Online</h3>
            <p>Reserva en segundos desde cualquier dispositivo.</p>
          </Link>
          <div className="card">
            <h3>Pago Seguro</h3>
            <p>Transacciones protegidas (pronto: Wompi/Stripe).</p>
          </div>
          <div className="card">
            <h3>Abogados Expertos</h3>
            <p>Profesionales verificados por área de práctica.</p>
          </div>
          <div className="card">
            <h3>Resumen y próximos pasos</h3>
            <p>Recibe un resumen claro tras la consulta.</p>
          </div>
        </div>

        <div className="cta-strip">
          <div>
            <strong>¿Listo para agendar?</strong>
            <p className="muted">
              Elige tu área legal y selecciona la hora disponible que más te
              convenga.
            </p>
          </div>
          <Link href="/agenda" className="btn btn--primary">
            Agendar ahora
          </Link>
        </div>
      </section>
    </>
  );
}
