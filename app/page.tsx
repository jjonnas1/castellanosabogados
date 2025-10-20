export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <h1>Asesoría legal clara y cercana, en menos de 20 minutos.</h1>
            <p>
              Agenda en línea y conéctate por videollamada con un abogado experto en derecho
              colombiano. Sin filas, sin traslados; respuestas claras para tomar decisiones con
              confianza.
            </p>
            <div className="hero__cta">
              <a className="btn" href="/agenda">Agendar asesoría</a>
              <a className="btn btn--ghost" href="/agenda#como-funciona">Cómo funciona</a>
            </div>
          </div>

          <aside className="hero__card">
            <strong>¿Por qué con nosotros?</strong>
            <div className="hero__list">
              <div className="hero__item">
                <span className="hero__dot" /> Abogados verificados y especializados.
              </div>
              <div className="hero__item">
                <span className="hero__dot" /> Agenda segura y confirmación por correo.
              </div>
              <div className="hero__item">
                <span className="hero__dot" /> Sin letra pequeña: precio y tiempo definidos.
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="container">
          <h2>Servicios en línea</h2>
          <p className="muted">Todo lo que necesitas para una asesoría eficiente.</p>

          <div className="features__grid">
            {[
              { title: "Agenda Online", text: "Reserva en segundos desde cualquier dispositivo." },
              { title: "Pago Seguro", text: "Transacciones protegidas (pronto: Wompi/Stripe)." },
              { title: "Abogados Expertos", text: "Profesionales verificados por especialidad." },
              { title: "Reportes", text: "Resumen claro de tu consulta y próximos pasos." },
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
                Selecciona tu área y elige la hora disponible que mejor te convenga.
              </p>
            </div>
            <a className="btn" href="/agenda">Agendar ahora</a>
          </div>
        </div>
      </section>
    </>
  );
}
