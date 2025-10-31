'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { Session } from '@supabase/supabase-js';

export default function AdminPage() {
  const [session, setSession] = useState<Session|null>(null);
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    supabase.auth.getSession().then(({data})=>setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e,s)=>setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      if (!session?.user?.id) return;
      const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).maybeSingle();
      setRole(data?.role ?? '');
    })();
  }, [session]);

  if (!session) { if (typeof window !== 'undefined') window.location.href='/cliente/acceso'; return null; }
  if (role !== 'admin') return <main className="main section"><div className="wrap"><h1 className="h1">Admin</h1><p>No autorizado.</p></div></main>;

  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Admin</h1>
        <p className="muted">Aquí administraremos áreas y citas (pendiente construir UI completa).</p>
      </div>
    </main>
  );
}
