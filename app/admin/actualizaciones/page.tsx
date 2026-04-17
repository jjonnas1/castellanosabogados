'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import AdminShell from '@/components/AdminShell';
import AdminWorkspace from '@/app/components/AdminWorkspace';

export default function AdminActualizacionesPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Solo intentamos obtener la sesión de fondo para tener el token listo
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  return (
    <AdminShell>
      <div className="p-6">
        <h1 className="text-xl font-semibold text-slate-100 mb-6">Actualizaciones de Proceso</h1>
        
        {/* Renderizado directo: El Workspace se encarga de mostrar 
            el estado de los datos internamente */}
        <AdminWorkspace section="actualizaciones" />
      </div>
    </AdminShell>
  );
}
