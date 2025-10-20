export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <p className="kicker">Asesoría virtual en 20 minutos</p>

          <h1 className="display">
            <span className="display__brand">CASTELLANOS</span> Abogados
          </h1>

          <p className="lead">
            Agenda tu cita, paga con seguridad y conéctate por videollamada. Servicio rápido,
            profesional y 100% online.
          </p>

          <div className="hero__cta">
            <a href="/agenda" className="btn btn--primary btn--lg">
              Agendar ahora →
            </a>
            <a href="#servicios" className="btn btn--ghost btn--lg">
              Ver servicios
            </a>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="services">
        <div className="wrap">
          <h2 className="h2">Servicios en línea</h2>
          <p className="muted center">
            Todo lo esencial para atenderte, sin desplazarte.
          </p>

          <div className="grid">
            <article className="card">
              <div className="card__icon">📅</div>
              <h3 className="card__title">Agenda Online</h3>
              <p className="card__text">
                Reserva en minutos, desde cualquier dispositivo.
              </p>
            </article>

            <article className="card">
              <div className="card__icon">🔒</div>
              <h3 className="card__title">Pago Seguro</h3>
              <p className="card__text">
                Integraciones de cobro confiables (Wompi pronto).
              </p>
            </article>

            <article className="card">
              <div className="card__icon">⚖️</div>
              <h3 className="card__title">Abogados Expertos</h3>
              <p className="card__text">
                Profesionales verificados en derecho colombiano.
              </p>
            </article>

            <article className="card">
              <div className="card__icon">🔔</div>
              <h3 className="card__title">Recordatorios</h3>
              <p className="card__text">
                Notificaciones automáticas antes de tu cita.
              </p>
            </article>

            <article className="card">
              <div className="card__icon">🧾</div>
              <h3 className="card__title">Facturación</h3>
              <p className="card__text">
                Comprobantes electrónicos al instante.
              </p>
            </article>

            <article className="card">
              <div className="card__icon">📊</div>
              <h3 className="card__title">Reportes</h3>
              <p className="card__text">
                Historial y seguimiento de tus asesorías.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta">
        <div className="wrap cta__panel">
          <div className="cta__copy">
            <h2 className="h2">¿Listo para tu asesoría?</h2>
            <p className="muted">
              Reserva ahora y recibe el enlace de videollamada al instante.
            </p>
          </div>
          <a href="/agenda" className="btn btn--primary btn--lg">Agendar ahora →</a>
        </div>
      </section>
    </>
  );
}
