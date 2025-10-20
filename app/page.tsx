// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO tipo “app”, centrado y mobile-first */}
      <section className="hero">
        <img
          src="/logo.png"
          alt="Castellanos Abogados"
          className="hero-logo"
          loading="eager"
        />

        <h1>Asesoría Legal Virtual en 20&nbsp;Minutos</h1>
        <p>
          Orientación jurídica profesional desde donde estés. Conéctate con un abogado
          experto en derecho colombiano por videollamada.
        </p>

        <div className="hero__cta">
          <Link href="/agenda" className="btn-primary">Agendar asesoría</Link>
          <Link href="/agenda#como" className="btn-link">Cómo funciona</Link>
        </div>

        {/* Franja de “confianza” (chips) */}
        <div className="chips">
          <span className="chip">Sin pagos en demo</span>
          <span className="chip">Agenda confirmada por correo</span>
          <span className="chip">Privado y seguro</span>
        </div>
      </section>

      {/* “Tu próxima cita” estilo tarjeta grande (como tu referencia) */}
      <section className="next-card container">
        <div className="next-card__media" aria-hidden />
        <div className="next-card__content">
          <span className="kicker">Agenda tu próxima cita con:</span>
          <h3 className="h3">Un abogado especialista</h3>
          <p className="muted">Selecciona área, fecha y hora. Confirmación inmediata.</p>
          <div className="next-card__cta">
            <Link href="/agenda" className="btn-primary btn--block">Agendar</Link>
          </div>
        </div>
      </section>

      {/* Servicios (tarjetas suaves y consistentes) */}
      <section className="services">
        <div className="container">
          <h2>Servicios en línea</h2>

          <div className="grid">
            <article className="card">
              <span className="card__icon">📅</span>
              <h3 className="card__title">Agenda Online</h3>
              <p className="card__text">Reserva asesorías legales en cualquier momento.</p>
            </article>

            <article className="card">
              <span className="card__icon">💳</span>
              <h3 className="card__title">Pago Seguro</h3>
              <p className="card__text">Transacciones protegidas (pronto Wompi).</p>
            </article>

            <article className="card">
              <span className="card__icon">👨‍⚖️</span>
              <h3 className="card__title">Abogados Expertos</h3>
              <p className="card__text">Profesionales verificados en derecho colombiano.</p>
            </article>

            <article className="card">
              <span className="card__icon">📈</span>
              <h3 className="card__title">Reportes</h3>
              <p className="card__text">Historial y seguimiento de tus asesorías.</p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="cta container">
        <div className="cta__panel">
          <div>
            <h3 className="h3">¿Listo para resolver tu caso?</h3>
            <p className="muted">Agenda hoy y recibe el enlace de videollamada al instante.</p>
          </div>
          <Link href="/agenda" className="btn-primary">Agendar asesoría</Link>
        </div>
      </section>
    </>
  );
}
