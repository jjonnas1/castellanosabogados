'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminShell from '@/components/AdminShell';
import { useAdminAuth } from '@/contexts/admin-auth';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Proceso {
  id: string;
  radicado: string;
  id_rama_judicial: string | null;
  nombre_cliente: string;
  contraparte: string | null;
  despacho: string | null;
  ciudad: string | null;
  tipo: string | null;
  estado: string;
  ultima_actuacion: string | null;
  fecha_ult_actuacion: string | null;
  notas: string | null;
  alerta_vencimiento: string | null;
  tipo_vencimiento: string | null;
  sincronizado_en: string | null;
  created_at: string;
  updated_at: string;
}

interface Actuacion {
  id: string;
  fecha: string;
  tipo: string;
  anotacion: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  con_documento: boolean;
  nueva: boolean;
}

function fmtFecha(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Bogota',
  });
}

function fmtFechaHora(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota',
  });
}

// ─── Campo editable ─────────────────────────────────────────────────────────────

function Campo({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm text-slate-200">{value || '—'}</p>
    </div>
  );
}

// ─── Badge estado ───────────────────────────────────────────────────────────────

function EstadoBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    'Activo':     'bg-emerald-900/50 text-emerald-300 border-emerald-800/40',
    'En trámite': 'bg-blue-900/50 text-blue-300 border-blue-800/40',
    'Archivado':  'bg-slate-800/60 text-slate-400 border-slate-700/40',
  };
  const cls = map[estado] ?? 'bg-red-900/40 text-red-300 border-red-800/40';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-medium ${cls}`}>
      {estado}
    </span>
  );
}

// ─── Tarjeta actuación ──────────────────────────────────────────────────────────

function ActuacionCard({
  act,
  token,
  onLeida,
}: {
  act: Actuacion;
  token: string;
  onLeida: (id: string) => void;
}) {
  const [marking, setMarking] = useState(false);

  async function marcarLeida() {
    setMarking(true);
    await fetch(`/api/admin/procesos/actuaciones/${act.id}/leer`, {
      method: 'PUT',
      headers: { authorization: `Bearer ${token}` },
    });
    onLeida(act.id);
    setMarking(false);
  }

  return (
    <div
      className={[
        'relative pl-6 pb-5 last:pb-0',
        'before:absolute before:left-[7px] before:top-2 before:bottom-0 before:w-px before:bg-[#1a2d4a] last:before:hidden',
      ].join(' ')}
    >
      {/* dot */}
      <div
        className={[
          'absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center',
          act.nueva
            ? 'border-red-500 bg-red-900/60'
            : 'border-[#1a2d4a] bg-[#0d1626]',
        ].join(' ')}
      >
        {act.nueva && <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
      </div>

      <div className={`rounded-xl border p-3 ${act.nueva ? 'bg-red-950/20 border-red-900/40' : 'bg-[#0b1929] border-[#1a2d4a]'}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-300">{fmtFecha(act.fecha)}</p>
            <p className="text-sm font-medium text-slate-100 mt-0.5">{act.tipo}</p>
            {act.anotacion && (
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{act.anotacion}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-2">
              {act.fecha_inicio && (
                <span className="text-[11px] text-slate-500">
                  Inicio: <span className="text-slate-400">{fmtFecha(act.fecha_inicio)}</span>
                </span>
              )}
              {act.fecha_fin && (
                <span className="text-[11px] text-slate-500">
                  Fin: <span className="text-slate-400">{fmtFecha(act.fecha_fin)}</span>
                </span>
              )}
              {act.con_documento && (
                <span className="text-[11px] text-blue-400 flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Con documento
                </span>
              )}
            </div>
          </div>
          {act.nueva && (
            <button
              onClick={marcarLeida}
              disabled={marking}
              className="flex-shrink-0 text-[11px] text-slate-500 hover:text-slate-300 border border-[#1a2d4a] hover:border-slate-600 rounded-lg px-2 py-1 transition-colors disabled:opacity-40"
            >
              {marking ? '…' : 'Leída'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function ProcesoDetallePage() {
  const { token } = useAdminAuth();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [proceso, setProceso]       = useState<Proceso | null>(null);
  const [actuaciones, setActuaciones] = useState<Actuacion[]>([]);
  const [loading, setLoading]       = useState(true);
  const [sincing, setSincing]       = useState(false);
  const [syncMsg, setSyncMsg]       = useState('');
  const [deleting, setDeleting]     = useState(false);
  const [editEstado, setEditEstado] = useState('');
  const [editNotas, setEditNotas]   = useState('');
  const [saving, setSaving]         = useState(false);

  const cargar = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const res = await fetch(`/api/admin/procesos/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    if (d.ok) {
      setProceso(d.proceso);
      setActuaciones(d.actuaciones ?? []);
      setEditEstado(d.proceso.estado);
      setEditNotas(d.proceso.notas ?? '');
    }
    setLoading(false);
  }, [token, id]);

  useEffect(() => { cargar(); }, [cargar]);

  async function sincronizar() {
    if (!token) return;
    setSincing(true); setSyncMsg('');
    const res = await fetch(`/api/admin/procesos/${id}/sincronizar`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    setSyncMsg(
      d.ok
        ? `${d.actuacionesNuevas} actuación${d.actuacionesNuevas !== 1 ? 'es' : ''} nueva${d.actuacionesNuevas !== 1 ? 's' : ''}`
        : `Error: ${d.error}`,
    );
    setSincing(false);
    cargar();
  }

  async function guardarCambios() {
    if (!token || !proceso) return;
    setSaving(true);
    await fetch(`/api/admin/procesos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify({ estado: editEstado, notas: editNotas || null }),
    });
    setSaving(false);
    cargar();
  }

  async function eliminar() {
    if (!token || !confirm('¿Eliminar este proceso y todas sus actuaciones?')) return;
    setDeleting(true);
    await fetch(`/api/admin/procesos/${id}`, {
      method: 'DELETE',
      headers: { authorization: `Bearer ${token}` },
    });
    router.push('/admin/procesos');
  }

  function marcarLeida(actId: string) {
    setActuaciones((prev) => prev.map((a) => a.id === actId ? { ...a, nueva: false } : a));
  }

  const nuevas = actuaciones.filter((a) => a.nueva).length;

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-screen">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  if (!proceso) {
    return (
      <AdminShell>
        <div className="flex flex-col items-center justify-center h-screen gap-3">
          <p className="text-slate-400">Proceso no encontrado.</p>
          <Link href="/admin/procesos" className="text-sm text-blue-400 hover:text-blue-300">← Volver</Link>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="p-6 space-y-5 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/admin/procesos" className="hover:text-slate-300 transition-colors">Procesos</Link>
          <span>/</span>
          <span className="text-slate-400 font-mono truncate max-w-[200px]">{proceso.radicado}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-semibold text-slate-100">{proceso.nombre_cliente}</h1>
              <EstadoBadge estado={proceso.estado} />
              {nuevas > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-red-900/60 border border-red-800/40 text-[11px] font-semibold text-red-300">
                  {nuevas} nueva{nuevas !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500">{proceso.radicado}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={sincronizar}
              disabled={sincing}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1a2d4a] bg-[#111f35] text-sm text-slate-300 hover:bg-[#162138] disabled:opacity-50 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={`w-4 h-4 ${sincing ? 'animate-spin' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {sincing ? 'Sincronizando…' : 'Sincronizar'}
            </button>
            <button
              onClick={eliminar}
              disabled={deleting}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-900/40 text-sm text-red-400 hover:bg-red-950/30 disabled:opacity-50 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                <polyline points="3 6 5 6 21 6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
              </svg>
              Eliminar
            </button>
          </div>
        </div>

        {syncMsg && (
          <p className={`text-xs px-3 py-2 rounded-lg border ${syncMsg.startsWith('Error') ? 'bg-red-950/30 border-red-800/40 text-red-300' : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'}`}>
            {syncMsg}
          </p>
        )}

        {/* Cuerpo — dos columnas */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
          {/* Columna izquierda: datos + edición */}
          <div className="xl:col-span-2 space-y-4">
            {/* Datos principales */}
            <div className="bg-[#0b1929] border border-[#1a2d4a] rounded-xl p-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Datos del proceso</p>
              <div className="grid grid-cols-2 gap-4">
                <Campo label="Contraparte"      value={proceso.contraparte} />
                <Campo label="Tipo"             value={proceso.tipo} />
                <Campo label="Despacho"         value={proceso.despacho} />
                <Campo label="Ciudad"           value={proceso.ciudad} />
                <Campo label="ID Rama Judicial" value={proceso.id_rama_judicial} />
                <Campo label="Sincronizado"     value={fmtFechaHora(proceso.sincronizado_en)} />
                <div className="col-span-2">
                  <Campo label="Última actuación" value={proceso.ultima_actuacion} />
                  <p className="text-xs text-slate-500 mt-0.5">{fmtFecha(proceso.fecha_ult_actuacion)}</p>
                </div>
                {proceso.alerta_vencimiento && (
                  <div className="col-span-2 bg-amber-950/30 border border-amber-800/40 rounded-lg p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500 mb-0.5">Vencimiento</p>
                    <p className="text-sm text-amber-200">{proceso.tipo_vencimiento}</p>
                    <p className="text-xs text-amber-400 mt-0.5">{fmtFechaHora(proceso.alerta_vencimiento)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Edición rápida */}
            <div className="bg-[#0b1929] border border-[#1a2d4a] rounded-xl p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Edición rápida</p>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Estado</label>
                <select
                  value={editEstado}
                  onChange={(e) => setEditEstado(e.target.value)}
                  className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-600"
                >
                  <option>Activo</option>
                  <option>En trámite</option>
                  <option>Archivado</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Notas internas</label>
                <textarea
                  value={editNotas}
                  onChange={(e) => setEditNotas(e.target.value)}
                  rows={3}
                  className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>
              <button
                onClick={guardarCambios}
                disabled={saving}
                className="w-full py-2 rounded-lg bg-blue-700 hover:bg-blue-600 disabled:opacity-50 text-sm font-semibold text-white transition-colors"
              >
                {saving ? 'Guardando…' : 'Guardar cambios'}
              </button>
            </div>
          </div>

          {/* Columna derecha: timeline actuaciones */}
          <div className="xl:col-span-3">
            <div className="bg-[#0b1929] border border-[#1a2d4a] rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Actuaciones
                  <span className="ml-2 text-slate-400 normal-case font-normal tracking-normal">({actuaciones.length})</span>
                </p>
                {nuevas > 0 && (
                  <span className="text-[11px] text-red-400">{nuevas} sin leer</span>
                )}
              </div>

              {actuaciones.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-10">
                  Sin actuaciones. Sincroniza para obtener las actuaciones de la Rama Judicial.
                </p>
              ) : (
                <div className="space-y-0">
                  {actuaciones.map((a) => (
                    <ActuacionCard key={a.id} act={a} token={token!} onLeida={marcarLeida} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
