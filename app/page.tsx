export default function Page() {
  return (
    <>
      {/* Topbar mínima */}
      <header className="topbar">
        <div className="container topbar-inner">
          <strong>Castellanos</strong>
          <nav style={{ display: "flex", gap: 10 }}>
            <a className="btn btn-ghost" href="/agenda">Agenda</a>
            <a className="btn btn-primary" href="/agenda">Agendar asesoría</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container grid">
          <div className="card">
            <span className="badge">Nueva · Asesoría virtual de 20 minutos</span>
            <h1 className="h1">Asesoría legal clara y cercana, en menos de 20 minutos.</h1>
            <p className="lead">
              Agenda en línea y conéctate por videollamada con un abogado experto en derecho
              colombiano. Precio y tiempo definidos. Sin traslados, sin complicaciones.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <a className="btn btn-primary" href="/agenda">Agendar asesoría</a>
              <a className="btn" href="#como-funciona">Cómo funciona</a>
            </div>
          </div>

          <aside className="card" aria-label="Por qué con nosotros">
            <p style={{ fontWeight: 700, marginTop: 0 }}>¿Por qué con nosotros?</p>
            <ul className="bullets" style={{ padding: 0, margin: 0, listStyle: "none" }}>
              <li><span className="dot" /> Abogados verificados por especialidad.</li>
              <li><span className="dot" /> Agenda segura y confirmación por correo.</li>
              <li><span className="dot" /> Respuestas claras y accionables.</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="section">
        <div className="container">
          <h2>Servicios en línea</h2>
          <p className="muted">Todo lo necesario para una consulta eficiente y transparente.</p>

          <div className="cards">
            <article className="tile">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="icon">📅</span>
                <h3 className="title">Agenda Online</h3>
              </div>
              <p>Reserva en segundos desde cualquier dispositivo.</p>
            </article>

            <article className="tile">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="icon">🔒</span>
                <h3 className="title">Pago Seguro</h3>
              </div>
              <p>Transacciones protegidas (pronto: Wompi/Stripe).</p>
            </article>

            <article className="tile">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="icon">⚖️</span>
                <h3 className="title">Abogados Expertos</h3>
              </div>
              <p>Profesionales verificados por área de práctica.</p>
            </article>

            <article className="tile">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="icon">📝</span>
                <h3 className="title">Resumen y próximos pasos</h3>
              </div>
              <p>Recibe un resumen claro tras la consulta.</p>
            </article>

            <article className="tile">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="icon">🔔</span>
                <h3 className="title">Recordatorios</h3>
              </div>
              <p>Te avisamos antes de tu cita por correo.</p>
            </article>

            <article className="tile">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="icon">🧾</span>
                <h3 className="title">Facturación</h3>
              </div>
              <p>Comprobantes electrónicos al instante.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA inferior */}
      <section className="cta">
        <div className="container">
          <div className="cta-panel">
            <div>
              <strong>¿Listo para agendar?</strong>
              <p className="muted" style={{ margin: "4px 0 0" }}>
                Elige tu área legal y selecciona la hora disponible que más te convenga.
              </p>
            </div>
            <a className="btn btn-primary" href="/agenda">Agendar ahora</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>© 2025 Castellanos Abogados · Orientación legal confiable.</div>
          <nav style={{ display: "flex", gap: 14 }}>
            <a className="muted" href="/agenda">Agenda</a>
            <a className="muted" href="#servicios">Servicios</a>
            <a className="muted" href="#como-funciona">Cómo funciona</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
