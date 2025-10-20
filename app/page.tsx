export default function Home() {
  return (
    <>
      {/* HERO – claro, sin imágenes */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1>Asesoría legal clara y cercana, en menos de 20 minutos.</h1>
            <p>
              Agenda en línea y conéctate por videollamada con un abogado experto en derecho colombiano.
              Precio y tiempo definidos. Sin traslados, sin complicaciones.
            </p>
            <div className="hero__cta">
              <a className="btn" href="/agenda">Agendar asesoría</a>
              <a className="btn btn--ghost" href="/agenda#como-funciona">Cómo funciona</a>
            </div>
          </div>

          <aside className="hero__card stack-sm" aria-label="Ventajas">
            <strong>¿Por qué con nosotros?</strong>
            <div className="stack-xs">
              <div className="hero__item"><span className="hero__dot" /> Abogados verificados por especialidad.</div>
              <div className="hero__item"><span className="hero__dot" /> Agenda segura y confirmación por correo.</div>
              <div className="hero__item"><span className="hero__dot" /> Respuestas claras y accionables.</div>
            </div>
          </aside>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="servicios">
        <div className="container">
          <h2>Servicios en línea</h2>
          <p className="muted">Todo lo necesario para una consulta eficiente y transparente.</p>

          <div className="features__grid">
            {[
              { title: "Agenda Online", text: "Reserva en segundos desde cualquier dispositivo." },
              { title: "Pago Seguro", text: "Transacciones protegidas (pronto: Wompi/Stripe)." },
              { title: "Abogados Expertos", text: "Profesionales verificados por área de práctica." },
              { title: "Resumen y próximos pasos", text: "Recibe un resumen claro tras la consulta." },
              { title: "Recordatorios", text: "Te avisamos antes de tu cita por email." },
              { title: "Facturación", text: "Comprobantes electrónicos al instante." },
            ].map((f, i) => (
              <article className="card" key={i}>
                <div className="card__title">{f.title}</div>
                <p className="card__text">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta">
        <div className="container">
          <div className="cta__panel">
            <div>
              <strong>¿Listo para agendar?</strong>
              <p className="muted" style={{ margin: 0 }}>
                Elige tu área legal y selecciona la hora disponible que más te convenga.
              </p>
            </div>
            <a className="btn" href="/agenda">Agendar ahora</a>
          </div>
        </div>
      </section>
    </>
  );
}
