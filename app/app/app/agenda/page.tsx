'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Agenda() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [when, setWhen] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string|null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Demo: guarda una solicitud en preintakes (sin pagos, sin auth)
    const { error } = await supabase
      .from('preintakes')
      .insert([{
        topic,
        description: `Solicitud desde web - correo: ${email} - horario preferido: ${when}`,
        attachments: []
      }]);

    if (error) {
      console.error(error);
      setMessage('Hubo un error creando la solicitud.');
    } else {
      setMessage('Solicitud registrada. Te contactaremos por correo para confirmar la hora.');
      setEmail(''); setTopic(''); setWhen('');
    }
    setLoading(false);
  };

  return (
    <main className="card">
      <h2>Agenda tu asesoría</h2>
      <p className="muted">Demo sin pagos: registramos tu solicitud y confirmamos por correo.</p>
      <form onSubmit={submit} className="grid">
        <div>
          <label>Tu correo</label>
          <input className="input" type="email" required value={email}
                 onChange={e=>setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com"/>
        </div>
        <div>
          <label>Tema / Área</label>
          <input className="input" value={topic} onChange={e=>setTopic(e.target.value)}
                 placeholder="Penal, Familia, Laboral, etc."/>
        </div>
        <div>
          <label>Horario preferido</label>
          <input className="input" value={when} onChange={e=>setWhen(e.target.value)}
                 placeholder="Ej: Martes 10:30 a.m."/>
        </div>
        <button className="btn" disabled={loading}>{loading?'Enviando…':'Enviar solicitud'}</button>
      </form>
      {message && <p style={{marginTop:16}}>{message}</p>}
    </main>
  );
}
