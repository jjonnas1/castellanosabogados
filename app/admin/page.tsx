'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { Session } from '@supabase/supabase-js';
import Link from 'next/link';

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
        <div className="grid gap-4 mt-6 md:grid-cols-2">
          <div className="panel">
            <h2 className="h3">Control de abogados asociados</h2>
            <p className="muted">Aprobar perfiles antes de que ofrezcan disponibilidad, asignar áreas y revocar accesos cuando sea necesario.</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="badge">Aprobación</span>
              <span className="badge">Bloqueos</span>
              <span className="badge">Idiomas</span>
            </div>
          </div>
          <div className="panel">
            <h2 className="h3">Agenda y pagos</h2>
            <p className="muted">Vista consolidada de agenda global, sobrescribir espacios críticos y validar pagos de asesorías individuales.</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="badge">Agenda global</span>
              <span className="badge">Pagos</span>
              <span className="badge">Capacitaciones</span>
            </div>
          </div>
          <div className="panel">
            <h2 className="h3">Capacitaciones corporativas</h2>
            <p className="muted">Gestionar solicitudes de charlas y jornadas para juntas y comités, coordinando agenda y responsables.</p>
            <Link className="btn btn--ghost mt-3" href="/administrativo/areas">Revisar áreas y cupos</Link>
          </div>
          <div className="panel">
            <h2 className="h3">Salud del sistema</h2>
            <p className="muted">Estados de sesiones, usuarios y disponibilidad sincronizada. Este bloque se conectará con métricas y alertas.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
