{/* === Servicios en línea === */}
<section className="section">
  <div className="wrap">
    <div className="section-head">
      <span className="eyebrow">Todo en un solo lugar</span>
      <h2 className="h2">Servicios en línea</h2>
      <p className="muted">
        Lo necesario para una consulta eficiente y transparente, disponible en web y app.
      </p>
    </div>

    <div className="service-grid">
      {/* 1 */}
      <article className="service-card">
        <div className="icon">📅</div>
        <h3>Agenda Online</h3>
        <p>Reserva en segundos desde cualquier dispositivo. Recibes confirmación por correo.</p>
        <a href="/agenda" className="btn btn--ghost btn-inline">Agendar</a>
      </article>

      {/* 2 */}
      <article className="service-card">
        <div className="icon">💳</div>
        <h3>Pago Seguro</h3>
        <p>Transacciones protegidas (Wompi/Stripe). Recibos y comprobantes automáticos.</p>
        <a href="/servicios" className="btn btn--ghost btn-inline">Ver opciones</a>
      </article>

      {/* 3 */}
      <article className="service-card">
        <div className="icon">👩‍⚖️</div>
        <h3>Abogados Expertos</h3>
        <p>Profesionales verificados por área de práctica. Asesoría clara y accionable.</p>
        <a href="/servicios" className="btn btn--ghost btn-inline">Explorar</a>
      </article>

      {/* 4 */}
      <article className="service-card">
        <div className="icon">🧾</div>
        <h3>Resumen y próximos pasos</h3>
        <p>Recibe un resumen breve de la consulta y qué hacer después.</p>
        <a href="/servicios" className="btn btn--ghost btn-inline">Cómo funciona</a>
      </article>

      {/* 5 (ancha) */}
      <article className="service-card span-2">
        <div className="icon">🔔</div>
        <h3>Recordatorios</h3>
        <p>Te avisamos antes de tu cita por correo. Reprograma en 1 clic si lo necesitas.</p>
      </article>

      {/* 6 (ancha) */}
      <article className="service-card span-2">
        <div className="icon">📄</div>
        <h3>Documentos y formatos</h3>
        <p>
          Si tu caso requiere trámite, te entregamos <strong>formatos y guías</strong> para continuar ante juzgados
          u otras entidades.
        </p>
      </article>
    </div>

    {/* Banda CTA */}
    <div className="cta-band">
      <div>
        <strong>¿Listo para agendar?</strong>
        <div className="muted">Elige tu área legal y la hora que más te convenga.</div>
      </div>
      <a href="/agenda" className="btn btn--primary">Agendar ahora</a>
    </div>
  </div>
</section>
