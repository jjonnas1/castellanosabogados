// app/trabaja/page.tsx
export default function TrabajaPage() {
  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <h1 className="h1">Únete a Castellanos Abogados</h1>
        <p className="muted" style={{ fontSize: "1.1rem", marginBottom: 26 }}>
          Si eres abogado titulado en Colombia, con experiencia y vocación de servicio,
          puedes formar parte de nuestra red de especialistas. Trabaja de manera remota,
          atiende consultas legales verificadas y recibe pagos seguros por cada asesoría.
        </p>

        <ul style={{ lineHeight: 1.8, marginBottom: 34 }}>
          <li>✔️ Verificamos tu tarjeta profesional y área de práctica.</li>
          <li>✔️ Recibirás acceso a tu panel para gestionar tus citas.</li>
          <li>✔️ Pagos automáticos por Wompi o transferencia bancaria.</li>
        </ul>

        <a href="/registro/abogado" className="btn btn--primary">
          Postularme como abogado
        </a>
      </div>
    </main>
  );
}
