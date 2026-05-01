'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import AdminShell from '@/components/AdminShell';
import { useAdminAuth } from '@/contexts/admin-auth';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Proceso {
  id: string;
  radicado: string;
  nombre_cliente: string;
  contraparte: string | null;
  despacho: string | null;
  ciudad: string | null;
  tipo: string | null;
  estado: string;
  ultima_actuacion: string | null;
  fecha_ult_actuacion: string | null;
  sincronizado_en: string | null;
  alerta_vencimiento: string | null;
  actuaciones_nuevas: number;
}

const ESTADOS = ['Todos', 'Activo', 'En trámite', 'Archivado', 'No encontrado en Rama Judicial'];

function fmtFecha(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Bogota',
  });
}

// ─── Modal nuevo proceso ────────────────────────────────────────────────────────

function ModalNuevo({ token, onClose, onCreated }: { token: string; onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({
    radicado: '', nombre_cliente: '', contraparte: '', despacho: '', ciudad: '',
    tipo: '', estado: 'Activo', notas: '', id_rama_judicial: '',
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr]       = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setErr('');
    try {
      const res = await fetch('/api/admin/procesos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, nombre_cliente: form.nombre_cliente || 'Sin definir' }),
      });
      const d = await res.json();
      if (!d.ok) { setErr(d.error ?? 'Error'); setSaving(false); return; }
      onCreated();
    } catch {
      setErr('Error de red'); setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#0b1929] border border-[#1a2d4a] rounded-2xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-slate-100">Nuevo proceso</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Radicado *</label>
              <input
                required
                value={form.radicado}
                onChange={(e) => setForm((f) => ({ ...f, radicado: e.target.value }))}
                placeholder="05001310300120240001200"
                className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Cliente <span className="text-slate-600">(opcional)</span></label>
              <input
                value={form.nombre_cliente}
                onChange={(e) => setForm((f) => ({ ...f, nombre_cliente: e.target.value }))}
                placeholder="Nombre del cliente o dejar vacío"
                className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Contraparte</label>
              <input
                value={form.contraparte}
                onChange={(e) => setForm((f) => ({ ...f, contraparte: e.target.value }))}
                className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Estado</label>
              <select
                value={form.estado}
                onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value }))}
                className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-600"
              >
                <option>Activo</option>
                <option>En trámite</option>
                <option>Archivado</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Despacho</label>
              <input
                value={form.despacho}
                onChange={(e) => setForm((f) => ({ ...f, despacho: e.target.value }))}
                className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ciudad</label>
              <input
                value={form.ciudad}
                onChange={(e) => setForm((f) => ({ ...f, ciudad: e.target.value }))}
                className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Tipo</label>
              <input
                value={form.tipo}
                onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
                placeholder="Penal, Civil…"
                className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">ID Rama Judicial (opcional)</label>
              <input
                value={form.id_rama_judicial}
                onChange={(e) => setForm((f) => ({ ...f, id_rama_judicial: e.target.value }))}
                placeholder="Si ya lo conoces"
                className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Notas</label>
              <textarea
                value={form.notas}
                onChange={(e) => setForm((f) => ({ ...f, notas: e.target.value }))}
                rows={2}
                className="w-full bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-600 resize-none"
              />
            </div>
          </div>
          {err && <p className="text-xs text-red-400">{err}</p>}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-[#1a2d4a] text-sm text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 disabled:opacity-50 text-sm font-semibold text-white transition-colors"
            >
              {saving ? 'Guardando…' : 'Crear proceso'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Badge estado ───────────────────────────────────────────────────────────────

function EstadoBadge({ estado }: { estado: string }) {
  const map: Record<string, string> = {
    'Activo':       'bg-emerald-900/50 text-emerald-300 border-emerald-800/40',
    'En trámite':   'bg-blue-900/50 text-blue-300 border-blue-800/40',
    'Archivado':    'bg-slate-800/60 text-slate-400 border-slate-700/40',
  };
  const cls = map[estado] ?? 'bg-red-900/40 text-red-300 border-red-800/40';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-medium ${cls}`}>
      {estado}
    </span>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function ProcesosPage() {
  const { token } = useAdminAuth();
  const [procesos, setProcesos]     = useState<Proceso[]>([]);
  const [loading, setLoading]       = useState(true);
  const [sincing, setSincing]       = useState(false);
  const [showModal, setShowModal]   = useState(false);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [busqueda, setBusqueda]     = useState('');
  const [syncMsg, setSyncMsg]       = useState('');

  const cargar = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const res = await fetch('/api/admin/procesos', {
      headers: { authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    setProcesos(d.procesos ?? []);
    setLoading(false);
  }, [token]);

  useEffect(() => { cargar(); }, [cargar]);

  async function sincronizarTodos() {
    if (!token) return;
    setSincing(true); setSyncMsg('');
    const res = await fetch('/api/admin/procesos/sincronizar', {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    setSyncMsg(
      d.ok
        ? `Sincronizado: ${d.procesosActualizados} procesos, ${d.actuacionesNuevas} actuaciones nuevas`
        : `Error: ${d.error}`,
    );
    setSincing(false);
    cargar();
  }

  const filtrados = procesos.filter((p) => {
    const matchEstado = filtroEstado === 'Todos' || p.estado === filtroEstado;
    const q = busqueda.toLowerCase();
    const matchBusq = !q || p.radicado.toLowerCase().includes(q) || p.nombre_cliente.toLowerCase().includes(q) || (p.contraparte ?? '').toLowerCase().includes(q);
    return matchEstado && matchBusq;
  });

  const totalNuevas = procesos.reduce((s, p) => s + p.actuaciones_nuevas, 0);

  return (
    <AdminShell>
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-slate-100">Procesos Judiciales</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {procesos.length} proceso{procesos.length !== 1 ? 's' : ''}
              {totalNuevas > 0 && (
                <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded bg-red-900/60 text-red-300 text-[10px] font-semibold">
                  {totalNuevas} nueva{totalNuevas !== 1 ? 's' : ''}
                </span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={sincronizarTodos}
              disabled={sincing}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1a2d4a] bg-[#111f35] text-sm text-slate-300 hover:bg-[#162138] hover:border-blue-800/60 disabled:opacity-50 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={`w-4 h-4 ${sincing ? 'animate-spin' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {sincing ? 'Sincronizando…' : 'Sincronizar todos'}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-sm font-semibold text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" d="M12 5v14M5 12h14" />
              </svg>
              Nuevo proceso
            </button>
          </div>
        </div>

        {syncMsg && (
          <p className={`text-xs px-3 py-2 rounded-lg border ${syncMsg.startsWith('Error') ? 'bg-red-950/30 border-red-800/40 text-red-300' : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'}`}>
            {syncMsg}
          </p>
        )}

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Buscar radicado, cliente, contraparte…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-600"
          />
          <div className="flex gap-1 flex-wrap">
            {ESTADOS.map((e) => (
              <button
                key={e}
                onClick={() => setFiltroEstado(e)}
                className={[
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  filtroEstado === e
                    ? 'bg-blue-900/60 text-blue-200 border border-blue-800/50'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent hover:border-[#1a2d4a]',
                ].join(' ')}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            {busqueda || filtroEstado !== 'Todos' ? 'Sin resultados para los filtros aplicados.' : 'Aún no hay procesos registrados.'}
          </div>
        ) : (
          <div className="bg-[#0b1929] border border-[#1a2d4a] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1a2d4a]">
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Radicado</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Cliente</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500 hidden md:table-cell">Estado</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500 hidden lg:table-cell">Última actuación</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500 hidden lg:table-cell">Sincronizado</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a2d4a]/60">
                  {filtrados.map((p) => (
                    <tr key={p.id} className="hover:bg-[#111f35]/60 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-slate-300 truncate max-w-[180px]">{p.radicado}</span>
                          {p.actuaciones_nuevas > 0 && (
                            <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                              {p.actuaciones_nuevas}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-slate-200 text-sm truncate max-w-[160px]">{p.nombre_cliente}</p>
                        {p.contraparte && (
                          <p className="text-slate-500 text-xs truncate max-w-[160px]">vs. {p.contraparte}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <EstadoBadge estado={p.estado} />
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-slate-300 text-xs truncate max-w-[200px]">{p.ultima_actuacion ?? '—'}</p>
                        <p className="text-slate-600 text-[11px]">{fmtFecha(p.fecha_ult_actuacion)}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-slate-500 text-xs">
                        {fmtFecha(p.sincronizado_en)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/procesos/${p.id}`}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Ver →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <ModalNuevo
          token={token!}
          onClose={() => setShowModal(false)}
          onCreated={() => { setShowModal(false); cargar(); }}
        />
      )}
    </AdminShell>
  );
}
