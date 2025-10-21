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

    {/* Servicios en línea */}
<section className="services-block">
  <div className="wrap">
    <h2 className="services-title">Servicios en línea</h2>
    <p className="services-sub">Todo lo necesario para una consulta eficiente y transparente.</p>

    <div className="services-cards">
      {/* Destacada – ocupa 6/12 en desktop */}
      <a href="/agenda" className="svc-card svc--featured">
        <div className="svc-icon">📅</div>
        <div className="svc-content">
          <h3>Agenda Online</h3>
          <p>Reserva en segundos desde cualquier dispositivo.</p>
        </div>
      </a>

      {/* Dos tarjetas para completar la primera fila en desktop */}
      <div className="svc-card">
        <div className="svc-icon">💳</div>
        <div className="svc-content">
          <h3>Pago Seguro</h3>
          <p>Transacciones protegidas (pronto: Wompi/Stripe).</p>
        </div>
      </div>

      <div className="svc-card">
        <div className="svc-icon">⚖️</div>
        <div className="svc-content">
          <h3>Abogados Expertos</h3>
          <p>Profesionales verificados por área de práctica.</p>
        </div>
      </div>

      {/* Segunda fila: tres tarjetas más anchas (3×4 = 12) */}
      <div className="svc-card svc--wide">
        <div className="svc-icon">📝</div>
        <div className="svc-content">
          <h3>Resumen y próximos pasos</h3>
          <p>Recibe un resumen claro tras la consulta.</p>
        </div>
      </div>

      <div className="svc-card svc--wide">
        <div className="svc-icon">🔔</div>
        <div className="svc-content">
          <h3>Recordatorios</h3>
          <p>Te avisamos antes de tu cita por correo.</p>
        </div>
      </div>

      <div className="svc-card svc--wide">
        <div className="svc-icon">🧾</div>
        <div className="svc-content">
          <h3>Facturación</h3>
          <p>Comprobantes electrónicos al instante.</p>
        </div>
      </div>
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
