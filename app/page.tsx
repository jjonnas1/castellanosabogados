export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero wrap">
        <div className="grid">
          <div>
            <span className="kicker">Nueva · Asesoría virtual de 20 minutos</span>
            <h1>Asesoría legal clara y cercana, en menos de 20 minutos.</h1>
            <p>
              Agenda en línea y conéctate por videollamada con un abogado experto en derecho
              colombiano. Precio y tiempo definidos. Sin traslados, sin complicaciones.
            </p>
            <div className="actions">
              <a href="/agenda" className="btn btn-primary">Agendar asesoría</a>
              <a href="#como-funciona" className="btn btn-ghost">Cómo funciona</a>
            </div>
          </div>

          <aside className="why">
            <h4>¿Por qué con nosotros?</h4>
            <ul>
              <li>Abogados verificados por especialidad.</li>
              <li>Agenda segura y confirmación por correo.</li>
              <li>Respuestas claras y accionables.</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section wrap" id="servicios">
        <h2>Servicios en línea</h2>
        <p className="lead">Todo lo necesario para una consulta eficiente y transparente.</p>

        <div className="cards">
          <article className="card">
            <h3 className="title">Agenda Online</h3>
            <p className="txt">Reserva en segundos desde cualquier dispositivo.</p>
          </article>

          <article className="card">
            <h3 className="title">Pago Seguro</h3>
            <p className="txt">Transacciones protegidas (pronto: Wompi/Stripe).</p>
          </article>

          <article className="card">
            <h3 className="title">Abogados Expertos</h3>
            <p className="txt">Profesionales verificados por área de práctica.</p>
          </article>

          <article className="card">
            <h3 className="title">Resumen y próximos pasos</h3>
            <p className="txt">Recibe un resumen claro tras la consulta.</p>
          </article>

          <article className="card">
            <h3 className="title">Recordatorios</h3>
            <p className="txt">Te avisamos antes de tu cita por correo.</p>
          </article>

          <article className="card">
            <h3 className="title">Facturación</h3>
            <p className="txt">Comprobantes electrónicos al instante.</p>
          </article>
        </div>

        <div className="cta mt-16">
          <div>
            <strong>¿Listo para agendar?</strong>
            <div className="txt" style={{color:'#56627A'}}>Elige tu área legal y la hora disponible que más te convenga.</div>
          </div>
          <a href="/agenda" className="btn btn-primary">Agendar ahora</a>
        </div>
      </section>

      <section id="como-funciona" className="wrap section">
        <h2>Cómo funciona</h2>
        <p className="lead">Selecciona área, fecha y hora. Completa un breve formulario. Recibe el enlace de videollamada.</p>
      </section>
    </>
  );
}
