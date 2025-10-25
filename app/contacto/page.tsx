'use client';
import { useState } from 'react';

export default function ContactoPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      message: String(fd.get('message') || ''),
    };

    setStatus('sending');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setStatus(res.ok ? 'ok' : 'error');
    if (res.ok) form.reset();
  }

  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Contacto</h1>
        <p className="muted">Déjanos un mensaje y te respondemos por correo.</p>

        <form onSubmit={onSubmit} className="panel" style={{ display: 'grid', gap: 12, maxWidth: 680 }}>
          <label>
            Nombre
            <input name="name" type="text" placeholder="Tu nombre" />
          </label>
          <label>
            Correo
            <input name="email" type="email" placeholder="tucorreo@ejemplo.com" required />
          </label>
          <label>
            Mensaje
            <textarea name="message" rows={5} placeholder="Cuéntanos brevemente tu caso…" required />
          </label>

          <div>
            <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando...' : 'Enviar'}
            </button>
          </div>

          {status === 'ok' && <p className="ok">✅ Mensaje enviado correctamente.</p>}
          {status === 'error' && <p className="error">❌ Error al enviar el mensaje. Intenta nuevamente.</p>}
        </form>
      </div>
    </main>
  );
}
