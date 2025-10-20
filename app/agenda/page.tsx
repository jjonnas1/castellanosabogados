export default function AgendaPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0b1220',   // azul muy oscuro
        color: '#e6edf6',        // texto claro
        padding: '32px',
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Agenda</h1>
      <p>Si ves este texto, el problema era CSS o imports previos.</p>
    </main>
  );
}
