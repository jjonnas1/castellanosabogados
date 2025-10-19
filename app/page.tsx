export default function Home() {
  return (
    <main className="grid">
      <section className="card">
        <h2>Asesoría legal virtual en 20 minutos</h2>
        <p>Agenda y conéctate con un abogado especializado en derecho colombiano.</p>
        <a className="btn" href="/agenda">Agenda ahora</a>
      </section>
      <section className="card">
        <h3>¿Cómo funciona?</h3>
        <ol>
          <li>Elige el área y el abogado.</li>
          <li>Selecciona fecha y hora.</li>
          <li>Completa el formulario previo.</li>
          <li>Recibe el enlace de videollamada.</li>
        </ol>
      </section>
    </main>
  );
}
