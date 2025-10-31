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
      </div>
    </main>
  );
}

