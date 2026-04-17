'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';

type Section = 'resumen' | 'clientes' | 'actualizaciones' | 'agenda' | 'consultas' | 'documentos' | 'exportar' | 'all';

export default function AdminWorkspace({ section = 'all', clientId }: { section?: Section; clientId?: string }) {
  // FORZAMOS READY A TRUE PARA QUE NUNCA SE QUEDE CARGANDO
  const [ready, setReady] = useState(true);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);

  const resolveAdmin = async () => {
    try {
      const { data: s, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (s.session) {
        setAdminId(s.session.user.id);
        setAdminToken(s.session.access_token);
        console.log("Sesión detectada correctamente:", s.session.user.email);
      } else {
        setLoadError("No se encontró una sesión activa en Supabase.");
      }
    } catch (err: any) {
      console.error("Error crítico de sesión:", err);
      setLoadError("Error de conexión: " + err.message);
    }
  };

  useEffect(() => {
    resolveAdmin();
  }, []);

  // Intentar cargar algo básico para probar conexión
  useEffect(() => {
    if (adminToken) {
      setDataLoading(true);
      fetch('/api/admin/workspace', {
        headers: { authorization: `Bearer ${adminToken}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.clients) setClients(data.clients);
        setDataLoading(false);
      })
      .catch(err => {
        setLoadError("Error cargando datos: " + err.message);
        setDataLoading(false);
      });
    }
  }, [adminToken]);

  return (
    <section className="p-6 text-slate-200">
      <div className="mb-8 p-4 bg-blue-900/20 border border-blue-500/50 rounded-xl">
        <h2 className="text-xl font-bold text-white">Estado del Sistema</h2>
        <p className="text-sm opacity-80">ID de Admin: {adminId || 'Buscando...'}</p>
        {adminToken ? (
          <p className="text-xs text-emerald-400 font-mono mt-1">✓ Token de acceso recibido</p>
        ) : (
          <p className="text-xs text-yellow-400 font-mono mt-1">⚠ Esperando token...</p>
        )}
      </div>

      {loadError && (
        <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 mb-6">
          <p className="font-bold">Aviso del Sistema:</p>
          <p className="text-sm">{loadError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-xs underline"
          >
            Reintentar carga completa
          </button>
        </div>
      )}

      <div className="grid gap-4">
        <article className="bg-[#111f35] border border-[#1e3a6e]/50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">Panel de Control: {section.toUpperCase()}</h3>
          {dataLoading ? (
            <p className="animate-pulse text-blue-400">Consultando base de datos...</p>
          ) : (
            <div className="mt-4">
              <p className="text-slate-400 mb-4">Conexión establecida. Resumen de datos:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-xs uppercase opacity-50">Clientes registrados</p>
                  <p className="text-2xl font-bold">{clients.length}</p>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
