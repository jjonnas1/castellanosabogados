'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { Session } from '@supabase/supabase-js';

export default function ClientPanel() {
  const [session, setSession] = useState<Session|null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data})=>setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e,s)=>setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!session) {
    if (typeof window !== 'undefined') window.location.href = '/cliente/acceso';
    return null;
  }

  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Mi panel (cliente)</h1>
        <p className="muted">Aquí verás tus próximas citas y el historial (pendiente construir).</p>
        <div className="panel" style={{ marginTop: 16 }}>
          <h2 className="h3">Disponibilidad real</h2>
          <p className="muted">Las agendas visibles provienen directamente de la configuración del abogado asignado. El administrador puede bloquear espacios excepcionales.</p>
          <ul className="muted" style={{ marginTop: 10, lineHeight: 1.6 }}>
            <li>Selecciona un horario disponible y completa el pago para confirmar.</li>
            <li>Recibirás confirmación y podrás ver el enlace de conexión o punto de encuentro.</li>
            <li>Historial y comprobantes quedarán aquí para consulta.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

