export default function ContactoPage() {
  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Contacto</h1>
        <p className="muted">Déjanos un mensaje y te respondemos por correo.</p>

        <form className="panel" style={{display:"grid", gap:12, maxWidth:680}}>
          <label>
            Nombre
            <input type="text" placeholder="Tu nombre" />
          </label>
          <label>
            Correo
            <input type="email" placeholder="tucorreo@ejemplo.com" />
          </label>
          <label>
            Mensaje
            <textarea rows={5} placeholder="Cuéntanos brevemente tu caso…" />
          </label>
          <div>
            <button type="button" className="btn btn--primary">Enviar</button>
          </div>
        </form>
      </div>
    </main>
  );
}
