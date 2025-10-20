// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="wrap">
          <span className="kicker">Nueva · Asesoría virtual de 20 minutos</span>
          <h1 className="display">
            Asesoría legal clara y cercana, en menos de 20 minutos.
          </h1>
          <p className="lead">
            Agenda en línea y conéctate por videollamada con un abogado experto en
            derecho colombiano. Precio y tiempo definidos. Sin traslados, sin complicaciones.
          </p>
          <div className="hero__cta">
            <Link href="/agenda" className="btn btn--primary">Agendar asesoría</Link>
            <a href="#como-funciona" className="btn">Cómo funciona</a>
          </div>

          {/* Tarjeta de confianza */}
          <aside aria-label="Por qué con nosotros" style={{marginTop: 18}}>
            <div className="card" style={{maxWidth: 420}}>
              <div className="card__title">¿Por qué con nosotros?</div>
              <ul className="muted" style={{paddingLeft: 18, margin: 0, lineHeight: 1.6}}>
                <li>Abogados verificados por especialidad.</li>
                <li>Agenda segura y confirmación por correo.</li>
                <li>Respuestas claras y accionables.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services" id="servicios">
        <div className="wrap">
          <h2 className="h2 center">Servicios en línea</h2>
          <p className="muted center">
            Todo lo necesario para una consulta eficiente y transparente.
          </p>

          <div className="grid">
            <div className="card">
              <div className="card__icon">📅</div>
              <div className="card__title">Agenda Online</div>
              <p className="card__text">Reserva en segundos desde cualquier dispositivo.</p>
            </div>
            <div className="card">
              <div className="card__icon">💳</div>
              <div className="card__title">Pago Seguro</div>
              <p className="card__text">Transacciones protegidas (Wompi/Stripe).</p>
            </div>
            <div className="card">
              <div className="card__icon">⚖️</div>
              <div className="card__title">Abogados Expertos</div>
              <p className="card__text">Profesionales verificados por área de práctica.</p>
            </div>
            <div className="card">
              <div className="card__icon">📝</div>
              <div className="card__title">Resumen y próximos pasos</div>
              <p className="card__text">Recibe un resumen claro tras la consulta.</p>
            </div>
            <div className="card">
              <div className="card__icon">🔔</div>
              <div className="card__title">Recordatorios</div>
              <p className="card__text">Te avisamos antes de tu cita por correo.</p>
            </div>
            <div className="card">
              <div className="card__icon">🧾</div>
              <div className="card__title">Facturación</div>
              <p className="card__text">Comprobantes electrónicos al instante.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta" id="como-funciona" aria-labelledby="cta-title">
        <div className="wrap">
          <div className="cta__panel">
            <div className="cta__copy">
              <div className="h2" id="cta-title">¿Listo para agendar?</div>
              <div className="muted">Elige tu área legal y selecciona la hora disponible que te convenga.</div>
            </div>
            <Link href="/agenda" className="btn btn--primary btn--lg">Agendar ahora</Link>
          </div>
        </div>
      </section>
    </>
  );
}
