// app/contacto/page.tsx
export default function ContactoPage() {
  return (
    <main className="section">
      <div className="wrap">
        <h1 className="h1">Contacto</h1>
        <p className="muted">Déjanos un mensaje y te respondemos por correo.</p>

        <div className="panel mt-24">
          <form className="form-grid">
            <label>
              Nombre
              <input type="text" placeholder="Tu nombre" />
            </label>

            <label>
              Correo
              <input type="email" placeholder="tucorreo@ejemplo.com" />
            </label>

            <label style={{gridColumn: "span 12"}}>
              Mensaje
              <textarea placeholder="Cuéntanos brevemente tu caso…" />
            </label>

            <div className="form-actions">
              <button className="btn btn--primary" type="button">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
