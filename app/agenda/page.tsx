import Link from "next/link";

export default function AgendaPage() {
  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Agenda tu asesoría</h1>
        <p className="muted">Versión demo: selecciona área legal y te mostramos los siguientes pasos.</p>

        <form className="panel" style={{display:"grid", gap:12, maxWidth:680}}>
          <label>
            Tu correo
            <input type="email" placeholder="tucorreo@ejemplo.com" />
          </label>

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
            <label>
              Tema / Área
              <select defaultValue="Penal">
                <option>Penal</option>
                <option>Civil</option>
                <option>Laboral</option>
                <option>Familia</option>
                <option>Comercial</option>
              </select>
            </label>
            <label>
              Horario preferido
              <select defaultValue="Miércoles 5:30 pm">
                <option>Hoy 3:00 pm</option>
                <option>Hoy 6:00 pm</option>
                <option>Miércoles 5:30 pm</option>
                <option>Jueves 10:00 am</option>
              </select>
            </label>
          </div>

          <div style={{display:"flex", gap:12}}>
            <button type="button" className="btn btn--primary">Enviar solicitud</button>
            <Link href="/" className="btn btn--ghost">Volver al inicio</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
