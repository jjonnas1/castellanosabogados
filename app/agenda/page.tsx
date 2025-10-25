// app/agenda/page.tsx
import Link from "next/link";

export default function AgendaPage() {
  return (
    <main className="section">
      <div className="wrap">
        <div className="panel panel--xl">
          <h1 className="h1">Agenda tu asesoría</h1>
          <p className="muted">
            Versión demo: selecciona el área legal y el horario y te mostramos los
            siguientes pasos.
          </p>

          <form className="form-grid mt-24">
            <label>
              Tu correo
              <input type="email" placeholder="tucorreo@ejemplo.com" />
            </label>

            <label>
              Tema / Área
              <select defaultValue="Penal">
                <option>Civil</option>
                <option>Familia</option>
                <option>Laboral</option>
                <option>Comercial</option>
                <option>Penal</option>
              </select>
            </label>

            <label>
              Horario preferido
              <select defaultValue="Miércoles 5:30 pm">
                <option>Lunes 9:00 am</option>
                <option>Martes 2:00 pm</option>
                <option>Miércoles 5:30 pm</option>
                <option>Jueves 11:00 am</option>
                <option>Viernes 4:30 pm</option>
              </select>
            </label>

            <div className="form-actions">
              <button type="button" className="btn btn--primary">Enviar solicitud</button>
              <Link href="/" className="btn btn--ghost">Volver al inicio</Link>
            </div>
          </form>
        </div>

        <div className="panel mt-24">
          <strong>¿Qué sigue?</strong>
          <ul className="list mt-8">
            <li>Confirmamos por correo tu fecha y hora.</li>
            <li>Recibes el enlace de videollamada.</li>
            <li>Tras la consulta, te enviamos un resumen y próximos pasos.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
