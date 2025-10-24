export default function Page() {
  return (
    <main>
      <header className="wrap hero">
        <div className="hero__panel">
          <p className="kicker">Nueva · Asesoría virtual de 20 minutos</p>

          <h1 className="hero__title">
            Asesoría legal clara y cercana,<br />en menos de 20 minutos.
          </h1>

          <p className="hero__lead">
            Agenda en línea y conéctate por videollamada con un abogado experto en derecho colombiano.
            Precio y tiempo definidos. Sin traslados, sin complicaciones.
          </p>

          <div className="stack-s">
            <a className="btn btn--primary" href="/agenda">Agendar asesoría</a>
            <a className="btn" href="#servicios">Ver servicios</a>
          </div>

          <div className="stack-m note" aria-labelledby="why">
            <strong id="why">¿Por qué con nosotros?</strong>
            <ul>
              <li>Abogados verificados por especialidad.</li>
              <li>Agenda segura y confirmación por correo.</li>
              <li>Respuestas claras y accionables.</li>
            </ul>
          </div>
        </div>
      </header>

      <section id="servicios" className="wrap section">
        <h2 className="section__title">Servicios en línea</h2>
        <p className="section__lead">Todo lo necesario para una consulta eficiente y transparente.</p>

        <div className="grid">
          <article className="card">
            <h3>Agenda Online</h3>
            <p>Reserva en segundos desde cualquier dispositivo.</p>
          </article>

          <article className="card">
            <h3>Pago Seguro</h3>
            <p>Transacciones protegidas (pronto: Wompi/Stripe).</p>
          </article>

          <article className="card">
            <h3>Abogados Expertos</h3>
            <p>Profesionales verificados por área de práctica.</p>
          </article>

          <article className="card">
            <h3>Resumen y próximos pasos</h3>
            <p>Recibe un resumen claro tras la consulta.</p>
          </article>

          <article className="card">
            <h3>Recordatorios</h3>
            <p>Te avisamos antes de tu cita por correo.</p>
          </article>

          <article className="card">
            <h3>Facturación</h3>
            <p>Comprobantes electrónicos al instante.</p>
          </article>
        </div>

        <div className="stack-m cta">
          <div>
            <div className="cta__title">¿Listo para agendar?</div>
            <div className="cta__muted">Elige tu área legal y selecciona la hora disponible que más te convenga.</div>
          </div>
          <a className="btn btn--primary" href="/agenda">Agendar ahora</a>
        </div>
      </section>
    </main>
  );
}
