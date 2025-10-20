// app/page.tsx
export default function Home() {
  return (
    <main
      style={{
        padding: 48,
        display: "grid",
        gap: 16,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 32, margin: 0 }}>Castellanos Abogados ✅</h1>
      <p style={{ opacity: 0.9, margin: 0 }}>
        Asesoría legal virtual en 20 minutos. (Vista base sin CSS global)
      </p>
      <a
        href="/agenda"
        style={{
          display: "inline-block",
          marginTop: 16,
          background: "#2563eb",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: 10,
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        Ir a /agenda →
      </a>
    </main>
  );
}
