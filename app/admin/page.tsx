'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const uid = data.session?.user?.id;
      if (!uid) {
        window.location.href = '/cliente/acceso';
        return;
      }
      const { data: prof } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', uid)
        .maybeSingle();

      if (prof?.role === 'admin') setOk(true);
      else window.location.href = '/';
    })();
  }, []);

  if (ok === null) return <div className="wrap">Cargando…</div>;

  return (
    <main className="main section">
      <div className="wrap">
        <h1 className="h1">Panel de Administración</h1>
        <p className="muted">Aquí podrás ver todas las citas, abogados y clientes registrados.</p>
      </div>
    </main>
  );
}
