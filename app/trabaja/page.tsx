// app/trabaja/page.tsx
export default function TrabajaPage() {
  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1 className="h2">Únete a Castellanos Abogados</h1>
        <p className="muted" style={{ marginBottom: 24 }}>
          Si eres abogado titulado en Colombia, con experiencia y vocación de servicio,
          puedes formar parte de nuestra red de especialistas. Trabaja de manera remota,
          atiende consultas legales verificadas y recibe pagos seguros por cada asesoría.
        </p>

        <ul style={{ marginBottom: 30 }}>
          <li>Verificamos tu tarjeta profesional y área de práctica.</li>
          <li>Recibirás acceso a tu panel para gestionar tus citas.</li>
          <li>Pagos automáticos por Wompi o transferencia bancaria.</li>
        </ul>

        <a href="/registro/abogado" className="btn btn--primary">
          Postularme como abogado
        </a>
      </div>
    </main>
  );
}
