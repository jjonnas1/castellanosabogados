// app/agenda/page.tsx
export default function AgendaPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 48,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 28, margin: 0 }}>Agenda OK ✅</h1>
      <p style={{ opacity: 0.9, marginTop: 8 }}>
        Si ves este texto, /agenda renderiza correctamente.
      </p>
      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: 16,
          color: "#93c5fd",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Volver al inicio
      </a>
    </main>
  );
}
