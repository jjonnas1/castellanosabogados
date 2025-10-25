'use client';

import { useState } from 'react';

export default function AgendaPage() {
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('Penal');
  const [slot, setSlot] = useState('Hoy 6:00 pm');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  async function handleSend() {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Solicitud de agenda',
          email,
          message: `Nueva solicitud de agenda:
- Área / Tema: ${area}
- Horario preferido: ${slot}
- Correo del usuario: ${email}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || 'No se pudo enviar.');

      setStatus({ ok: true, msg: 'Solicitud enviada. Te escribiremos al correo.' });
      setEmail('');
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || 'Error enviando la solicitud.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Agenda tu asesoría</h1>
        <p className="muted">Versión demo: selecciona área legal y te mostramos los siguientes pasos.</p>

        <div className="panel" style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
          <label>
            Tu correo
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label>
              Tema / Área
              <select value={area} onChange={e => setArea(e.target.value)}>
                <option>Penal</option>
                <option>Laboral</option>
                <option>Familia</option>
                <option>Civil</option>
                <option>Comercial</option>
                <option>Administrativo</option>
              </select>
            </label>
            <label>
              Horario preferido
              <select value={slot} onChange={e => setSlot(e.target.value)}>
                <option>Hoy 6:00 pm</option>
                <option>Mañana 8:30 am</option>
                <option>Mañana 11:00 am</option>
                <option>Miércoles 5:30 pm</option>
              </select>
            </label>
          </div>

          <div className="form-actions" style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--primary" onClick={handleSend} disabled={loading || !email}>
              {loading ? 'Enviando…' : 'Enviar solicitud'}
            </button>
            <a href="/" className="btn btn--ghost">Volver al inicio</a>
          </div>

          {status && (
            <p className={status.ok ? 'ok' : 'error'} style={{ marginTop: 4 }}>
              {status.msg}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
