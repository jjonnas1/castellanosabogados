// app/agenda/page.tsx
import Link from "next/link";

export default function AgendaPage() {
  return (
    <div className="wrap section">
      <h1>Agenda tu asesoría</h1>
      <p className="muted">
        Versión demo: selecciona área legal y te mostramos los siguientes pasos.
      </p>

      <div className="panel">
        <form className="form-grid">
          <label>
            Tu correo
            <input type="email" placeholder="tucorreo@ejemplo.com" />
          </label>
          <label>
            Tema / Área
            <select defaultValue="penal">
              <option value="penal">Penal</option>
              <option value="laboral">Laboral</option>
              <option value="civil">Civil</option>
              <option value="familia">Familia</option>
            </select>
          </label>
          <label>
            Horario preferido
            <select defaultValue="miercoles-530">
              <option value="lunes-9">Lunes 9:00 am</option>
              <option value="martes-230">Martes 2:30 pm</option>
              <option value="miercoles-530">Miércoles 5:30 pm</option>
              <option value="jueves-10">Jueves 10:00 am</option>
            </select>
          </label>
          <div className="form-actions">
            <button className="btn btn--primary" type="button">
              Enviar solicitud
            </button>
            <Link className="btn btn--ghost" href="/">
              Volver al inicio
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
