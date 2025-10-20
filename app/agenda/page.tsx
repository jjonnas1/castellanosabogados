'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AgendaPage() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Penal');
  const [when, setWhen] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('preintakes')
      .insert([{ email, topic, slot_ts: when }]);

    if (error) {
      setMessage('Hubo un error creando la solicitud.');
    } else {
      setMessage('Solicitud enviada con éxito. Recibirás confirmación por correo.');
      setEmail('');
      setTopic('Penal');
      setWhen('');
    }

    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0b3d91 0%, #0f52ba 100%)',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
          padding: '40px',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 24, textAlign: 'center' }}>
          Agenda tu asesoría
        </h2>

        <form onSubmit={submit} style={{ display: 'grid', gap: '16px' }}>
          <label>
            Tu correo:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                marginTop: '4px',
              }}
            />
          </label>

          <label>
            Tema / Área:
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                marginTop: '4px',
              }}
            >
              <option value="Penal">Penal</option>
              <option value="Civil">Civil</option>
              <option value="Laboral">Laboral</option>
              <option value="Familia">Familia</option>
            </select>
          </label>

          <label>
            Fecha y hora:
            <input
              type="datetime-local"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                marginTop: '4px',
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#fff',
              color: '#0b3d91',
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: '16px',
              textAlign: 'center',
              background: 'rgba(0,0,0,0.2)',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
