// app/agenda/page.tsx
import Link from "next/link";

export default function AgendaPage() {
  return (
    <main className="wrap section">
      <h1>Agenda tu asesoría</h1>
      <p className="muted">
        Versión demo: selecciona área legal y horario preferido; luego te
        mostramos los siguientes pasos.
      </p>

      <div className="panel">
        <form className="form-row">
          {/* correo */}
          <label>
            Tu correo
            <input type="email" placeholder="tucorreo@ejemplo.com" />
          </label>

          {/* selects alineados */}
          <div className="controls">
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
                <option>Lunes 10:00 am</option>
                <option>Martes 3:00 pm</option>
                <option>Miércoles 5:30 pm</option>
                <option>Jueves 9:00 am</option>
                <option>Viernes 2:00 pm</option>
              </select>
            </label>
          </div>

          {/* acciones */}
          <div className="form-actions">
            <button type="button" className="btn btn--primary">
              Enviar solicitud
            </button>
            <Link href="/" className="btn btn--ghost">
              Volver al inicio
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
