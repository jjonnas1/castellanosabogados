import Link from "next/link";

export default function HomePage() {
  return (
    <main className="main">
      <section className="hero section">
        <div className="wrap">
          <div className="panel">
            <p className="kicker">Nueva · Asesoría virtual de 20 minutos</p>
            <h1 className="display">Asesoría legal clara y cercana,<br />en menos de 20 minutos.</h1>
            <p className="muted">
              Agenda en línea y conéctate por videollamada con un abogado experto en
              derecho colombiano. Precio y tiempo definidos. Sin traslados, sin complicaciones.
            </p>

            <div className="hero__cta">
              <Link href="/agenda" className="btn btn--primary">Agendar asesoría</Link>
              <Link href="/servicios" className="btn btn--ghost">Ver servicios</Link>
            </div>

            <div className="panel panel--lite">
              <h3 className="h3">¿Por qué con nosotros?</h3>
              <ul className="list">
                <li>Abogados verificados por especialidad.</li>
                <li>Agenda segura y confirmación por correo.</li>
                <li>Respuestas claras y accionables.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="services section">
        <div className="wrap">
          <h2 className="h2">Servicios en línea</h2>
          <p className="muted">Todo lo necesario para una consulta eficiente y transparente.</p>

          <div className="grid">
            <div className="card">
              <h3 className="card__title">Agenda Online</h3>
              <p className="card__text">Reserva en segundos desde cualquier dispositivo.</p>
            </div>
            <div className="card">
              <h3 className="card__title">Pago Seguro</h3>
              <p className="card__text">Transacciones protegidas (pronto: Wompi/Stripe).</p>
            </div>
            <div className="card">
              <h3 className="card__title">Abogados Expertos</h3>
              <p className="card__text">Profesionales verificados por área de práctica.</p>
            </div>
            <div className="card">
              <h3 className="card__title">Resumen y próximos pasos</h3>
              <p className="card__text">Recibe un resumen claro tras la consulta.</p>
            </div>
          </div>

          <div className="cta__panel">
            <div className="cta__copy">
              <strong>¿Listo para agendar?</strong>
              <p className="muted">Elige tu área legal y selecciona la hora disponible que más te convenga.</p>
            </div>
            <Link href="/agenda" className="btn btn--primary btn--lg">Agendar ahora</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
