'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { useAdminAuth } from '@/contexts/admin-auth';

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentStatus = 'Pagado' | 'Parcial' | 'Pendiente';
type ServiceArea   = 'Tutela' | 'Penal' | 'Ejecución de penas' | 'Civil' | 'Laboral' | 'Administrativo' | 'Empresarial' | 'Otro';
type PaymentMethod = 'Efectivo' | 'Transferencia' | 'Nequi' | 'Daviplata' | 'Otro';

interface Payment {
  id:                string;
  created_at:        string;
  payment_date:      string;
  client_name:       string;
  client_email:      string | null;
  concept:           string;
  service_area:      string;
  amount:            number;
  payment_method:    string;
  status:            PaymentStatus;
  notes:             string | null;
  created_by:        string | null;
  client_profile_id: string | null;
  total_amount:      number | null;
  payment_due_date:  string | null;
}

interface ClientProfile {
  id:             string;
  full_name:      string;
  email:          string | null;
  phone:          string | null;
  case_reference: string | null;
}

interface Filters {
  dateFrom:     string;
  dateTo:       string;
  month:        string;
  year:         string;
  clientSearch: string;
  serviceArea:  string;
  status:       string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICE_AREAS: ServiceArea[] = [
  'Tutela','Penal','Ejecución de penas','Civil',
  'Laboral','Administrativo','Empresarial','Otro',
];
const PAYMENT_METHODS: PaymentMethod[] = ['Efectivo','Transferencia','Nequi','Daviplata','Otro'];
const STATUSES: PaymentStatus[]        = ['Pagado','Parcial','Pendiente'];
const MONTH_NAMES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function formatCOP(n: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(n);
}

function statusClass(s: string) {
  const m: Record<string,string> = {
    Pagado:   'bg-emerald-900/40 text-emerald-400 border border-emerald-800/40',
    Parcial:  'bg-amber-900/40   text-amber-400   border border-amber-800/40',
    Pendiente:'bg-red-900/40     text-red-400     border border-red-800/40',
  };
  return m[s] ?? 'bg-slate-800 text-slate-400';
}

const INPUT = 'bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-600';

const EMPTY_FORM = {
  client_profile_id: '',
  client_name:       '',
  client_email:      '',
  payment_date:      localToday(),
  concept:           '',
  service_area:      'Civil' as ServiceArea,
  amount:            '',
  total_amount:      '',
  payment_due_date:  '',
  payment_method:    'Efectivo' as PaymentMethod,
  status:            'Pagado' as PaymentStatus,
  notes:             '',
};

const EMPTY_FILTERS: Filters = {
  dateFrom:     '',
  dateTo:       '',
  month:        '',
  year:         String(new Date().getFullYear()),
  clientSearch: '',
  serviceArea:  '',
  status:       '',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function IngresosPage() {
  const { token } = useAdminAuth();

  const [payments,   setPayments]   = useState<Payment[]>([]);
  const [clients,    setClients]    = useState<ClientProfile[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters,    setFilters]    = useState<Filters>(EMPTY_FILTERS);
  const [clientQ,    setClientQ]    = useState('');  // search inside client dropdown

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form,      setForm]      = useState<typeof EMPTY_FORM>(EMPTY_FORM);
  const [saving,    setSaving]    = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete
  const [deleteId,  setDeleteId]  = useState<string | null>(null);
  const [deleting,  setDeleting]  = useState(false);

  // ── Load payments ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch('/api/admin/payments', { headers: { authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(json => {
        if (cancelled) return;
        if (!json.ok) throw new Error(json.error);
        setPayments(json.data ?? []);
      })
      .catch((e: unknown) => { if (!cancelled) setError(e instanceof Error ? e.message : 'Error al cargar'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [token, refreshKey]);

  // ── Load clients (once) ────────────────────────────────────────────────────

  useEffect(() => {
    if (!token) return;
    fetch('/api/admin/payments/clients', { headers: { authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(json => { if (json.ok) setClients(json.data ?? []); })
      .catch(() => {});
  }, [token]);

  function reload() { setRefreshKey(k => k + 1); }

  // ── Filtered payments ──────────────────────────────────────────────────────

  const filtered = useMemo(() => payments.filter(p => {
    const d = new Date(p.payment_date + 'T00:00:00');
    if (filters.dateFrom    && p.payment_date < filters.dateFrom)             return false;
    if (filters.dateTo      && p.payment_date > filters.dateTo)               return false;
    if (filters.month       && String(d.getMonth()+1) !== filters.month)      return false;
    if (filters.year        && String(d.getFullYear()) !== filters.year)       return false;
    if (filters.serviceArea && p.service_area !== filters.serviceArea)         return false;
    if (filters.status      && p.status        !== filters.status)             return false;
    if (filters.clientSearch) {
      const q = filters.clientSearch.toLowerCase();
      if (!p.client_name.toLowerCase().includes(q) && !p.concept.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [payments, filters]);

  // ── Totals ─────────────────────────────────────────────────────────────────

  const totals = useMemo(() => {
    const todayStr = localToday();
    const now = new Date();
    const cm = now.getMonth()+1, cy = now.getFullYear();
    const received = (list: Payment[]) =>
      list.filter(p => p.status !== 'Pendiente').reduce((s,p) => s + Number(p.amount), 0);

    const pendingBalance = payments.reduce((s, p) => {
      if (p.total_amount && p.status !== 'Pagado') {
        return s + Math.max(0, Number(p.total_amount) - Number(p.amount));
      }
      if (p.status === 'Pendiente') return s + Number(p.amount);
      return s;
    }, 0);

    return {
      today:          received(payments.filter(p => p.payment_date === todayStr)),
      month:          received(payments.filter(p => { const d = new Date(p.payment_date+'T00:00:00'); return d.getMonth()+1===cm && d.getFullYear()===cy; })),
      year:           received(payments.filter(p => new Date(p.payment_date+'T00:00:00').getFullYear()===cy)),
      all:            received(payments),
      pendingBalance,
      partial:        payments.filter(p => p.status==='Parcial').reduce((s,p) => s+Number(p.amount), 0),
    };
  }, [payments]);

  const monthlyBreakdown = useMemo(() => {
    const yr = Number(filters.year || new Date().getFullYear());
    return MONTH_NAMES.map((name, i) => {
      const m = i+1;
      const total = payments
        .filter(p => { const d=new Date(p.payment_date+'T00:00:00'); return d.getMonth()+1===m && d.getFullYear()===yr && p.status!=='Pendiente'; })
        .reduce((s,p) => s+Number(p.amount), 0);
      return { name, month: m, total };
    });
  }, [payments, filters.year]);

  const areaTotals = useMemo(() => {
    const map: Record<string,number> = {};
    filtered.filter(p => p.status!=='Pendiente').forEach(p => { map[p.service_area]=(map[p.service_area]??0)+Number(p.amount); });
    return Object.entries(map).sort((a,b) => b[1]-a[1]);
  }, [filtered]);

  const filteredTotal = useMemo(
    () => filtered.filter(p => p.status!=='Pendiente').reduce((s,p) => s+Number(p.amount),0),
    [filtered],
  );

  const years = useMemo(() => {
    const s = new Set<number>(); payments.forEach(p => s.add(new Date(p.payment_date+'T00:00:00').getFullYear())); s.add(new Date().getFullYear());
    return Array.from(s).sort((a,b) => b-a);
  }, [payments]);

  const filteredClients = useMemo(() =>
    clients.filter(c => c.full_name.toLowerCase().includes(clientQ.toLowerCase())),
    [clients, clientQ],
  );

  // ── Modal helpers ──────────────────────────────────────────────────────────

  function openNew() {
    setForm({ ...EMPTY_FORM, payment_date: localToday() });
    setEditingId(null); setFormError(null); setClientQ(''); setModalOpen(true);
  }

  function openEdit(p: Payment) {
    setForm({
      client_profile_id: p.client_profile_id ?? '',
      client_name:       p.client_name,
      client_email:      p.client_email ?? '',
      payment_date:      p.payment_date,
      concept:           p.concept,
      service_area:      p.service_area as ServiceArea,
      amount:            String(p.amount),
      total_amount:      p.total_amount ? String(p.total_amount) : '',
      payment_due_date:  p.payment_due_date ?? '',
      payment_method:    p.payment_method as PaymentMethod,
      status:            p.status,
      notes:             p.notes ?? '',
    });
    setEditingId(p.id); setFormError(null); setClientQ(''); setModalOpen(true);
  }

  function selectClient(c: ClientProfile | null) {
    if (!c) {
      setForm(f => ({ ...f, client_profile_id: '', client_name: '', client_email: '' }));
    } else {
      setForm(f => ({ ...f, client_profile_id: c.id, client_name: c.full_name, client_email: c.email ?? '' }));
    }
    setClientQ('');
  }

  async function savePayment() {
    if (!token) return;
    if (!form.client_name.trim() || !form.concept.trim() || !form.amount || !form.payment_date) {
      setFormError('Completa los campos obligatorios: fecha, cliente/pagador, concepto y valor recibido.'); return;
    }
    setSaving(true); setFormError(null);
    try {
      const url    = editingId ? `/api/admin/payments/${editingId}` : '/api/admin/payments';
      const method = editingId ? 'PUT' : 'POST';
      const res    = await fetch(url, {
        method,
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          client_profile_id: form.client_profile_id || null,
          client_name:       form.client_name.trim(),
          client_email:      form.client_email.trim() || null,
          payment_date:      form.payment_date,
          concept:           form.concept.trim(),
          service_area:      form.service_area,
          amount:            parseFloat(form.amount),
          total_amount:      form.total_amount ? parseFloat(form.total_amount) : null,
          payment_due_date:  form.payment_due_date || null,
          payment_method:    form.payment_method,
          status:            form.status,
          notes:             form.notes.trim() || null,
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setModalOpen(false); reload();
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : 'Error al guardar');
    } finally { setSaving(false); }
  }

  async function confirmDelete() {
    if (!token || !deleteId) return;
    setDeleting(true);
    try {
      const res  = await fetch(`/api/admin/payments/${deleteId}`, { method:'DELETE', headers:{ authorization:`Bearer ${token}` } });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setDeleteId(null); reload();
    } catch (e: unknown) { console.error(e); }
    finally { setDeleting(false); }
  }

  function exportCSV() {
    const headers = ['Fecha','Cliente','Email','Concepto','Área','Valor recibido','Valor total','Saldo','Próx. vencimiento','Medio','Estado','Observaciones'];
    const rows = filtered.map(p => {
      const balance = p.total_amount ? Math.max(0, Number(p.total_amount)-Number(p.amount)) : '';
      return [p.payment_date, p.client_name, p.client_email??'', p.concept, p.service_area, p.amount, p.total_amount??'', balance, p.payment_due_date??'', p.payment_method, p.status, p.notes??''];
    });
    const csv  = [headers,...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob(['﻿'+csv],{type:'text/csv;charset=utf-8;'});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href=url; a.download=`ingresos_${localToday()}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  const cm = new Date().getMonth()+1;
  const cy = new Date().getFullYear();

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AdminShell>
      <div className="p-6 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-slate-100">Registro de Ingresos</h1>
            <p className="text-sm text-slate-500 mt-0.5">Control de pagos recibidos por la firma</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-200 bg-[#111f35] hover:bg-[#1a2d4a] border border-[#1a2d4a] rounded-lg transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Exportar CSV
            </button>
            <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/>
              </svg>
              Registrar pago
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {([
            { label:'Ingresos hoy',                              value:totals.today, color:'text-blue-400' },
            { label:`Ingresos ${MONTH_NAMES[cm-1]}`,             value:totals.month, color:'text-emerald-400' },
            { label:`Ingresos ${cy}`,                            value:totals.year,  color:'text-violet-400' },
            { label:'Total recibido',                            value:totals.all,   color:'text-amber-400' },
          ] as const).map(c => (
            <div key={c.label} className="bg-[#111f35] border border-[#1a2d4a] rounded-xl p-4">
              <p className="text-[11px] text-slate-500 uppercase tracking-wide leading-tight">{c.label}</p>
              <p className={`text-lg font-semibold mt-1 ${c.color}`}>{formatCOP(c.value)}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#111f35] border border-red-900/30 rounded-xl p-4">
            <p className="text-[11px] text-slate-500 uppercase tracking-wide">Saldo por cobrar</p>
            <p className="text-lg font-semibold text-red-400 mt-1">{formatCOP(totals.pendingBalance)}</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Suma de saldos pendientes y parciales</p>
          </div>
          <div className="bg-[#111f35] border border-amber-900/30 rounded-xl p-4">
            <p className="text-[11px] text-slate-500 uppercase tracking-wide">Total pagos parciales</p>
            <p className="text-lg font-semibold text-amber-400 mt-1">{formatCOP(totals.partial)}</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Monto recibido con estado parcial</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#111f35] border border-[#1a2d4a] rounded-xl p-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <input type="date" value={filters.dateFrom} onChange={e => setFilters(f=>({...f,dateFrom:e.target.value}))} className={INPUT}/>
            <input type="date" value={filters.dateTo}   onChange={e => setFilters(f=>({...f,dateTo:e.target.value}))}   className={INPUT}/>
            <select value={filters.month}       onChange={e => setFilters(f=>({...f,month:e.target.value}))}       className={INPUT}>
              <option value="">Todos los meses</option>
              {MONTH_NAMES.map((m,i) => <option key={m} value={i+1}>{m}</option>)}
            </select>
            <select value={filters.year}        onChange={e => setFilters(f=>({...f,year:e.target.value}))}        className={INPUT}>
              <option value="">Todos los años</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <select value={filters.serviceArea} onChange={e => setFilters(f=>({...f,serviceArea:e.target.value}))} className={INPUT}>
              <option value="">Todas las áreas</option>
              {SERVICE_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <select value={filters.status}      onChange={e => setFilters(f=>({...f,status:e.target.value}))}      className={INPUT}>
              <option value="">Todos los estados</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="mt-3 flex gap-3">
            <input type="text" value={filters.clientSearch} onChange={e => setFilters(f=>({...f,clientSearch:e.target.value}))}
              placeholder="Buscar por cliente o concepto…" className={`${INPUT} flex-1`}/>
            <button onClick={() => setFilters(EMPTY_FILTERS)} className="px-3 py-2 text-sm text-slate-500 hover:text-slate-300 bg-[#0d1626] border border-[#1a2d4a] rounded-lg transition-colors">
              Limpiar
            </button>
          </div>
        </div>

        {/* Table */}
        {error ? (
          <div className="bg-red-900/20 border border-red-800/40 rounded-xl p-4 text-red-400 text-sm mb-6">{error}</div>
        ) : loading ? (
          <div className="flex justify-center py-16 mb-6">
            <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : (
          <div className="bg-[#111f35] border border-[#1a2d4a] rounded-xl overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-[#1a2d4a] flex items-center justify-between">
              <p className="text-sm text-slate-400">{filtered.length} registro{filtered.length!==1?'s':''}</p>
              <p className="text-sm text-slate-400">Total filtrado: <span className="font-semibold text-emerald-400">{formatCOP(filteredTotal)}</span></p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1a2d4a]">
                    {['Fecha','Cliente','Concepto','Área','Recibido','Total acord.','Saldo','Medio','Estado','Acciones'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[11px] font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a2d4a]">
                  {filtered.length===0 ? (
                    <tr><td colSpan={10} className="px-4 py-12 text-center text-slate-600">No hay pagos con los filtros actuales.</td></tr>
                  ) : filtered.map(p => {
                    const balance = p.total_amount ? Math.max(0, Number(p.total_amount)-Number(p.amount)) : null;
                    const isLinked = Boolean(p.client_profile_id);
                    return (
                      <tr key={p.id} className="hover:bg-[#0d1626]/60 transition-colors">
                        <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                          <div>{p.payment_date}</div>
                          {p.payment_due_date && <div className="text-[11px] text-amber-500 mt-0.5">Vence: {p.payment_due_date}</div>}
                        </td>
                        <td className="px-4 py-3 max-w-[140px]">
                          <div className="flex items-center gap-1.5">
                            {isLinked && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" title="Cliente registrado"/>}
                            <span className="text-slate-200 font-medium truncate">{p.client_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-400 max-w-[180px] truncate" title={p.concept}>{p.concept}</td>
                        <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{p.service_area}</td>
                        <td className="px-4 py-3 text-slate-200 font-medium whitespace-nowrap">{formatCOP(Number(p.amount))}</td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{p.total_amount ? formatCOP(Number(p.total_amount)) : '—'}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {balance !== null
                            ? <span className={`font-medium ${balance>0?'text-red-400':'text-emerald-400'}`}>{balance>0?formatCOP(balance):'Saldado'}</span>
                            : <span className="text-slate-700">—</span>}
                        </td>
                        <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{p.payment_method}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusClass(p.status)}`}>{p.status}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex gap-3">
                            <button onClick={() => openEdit(p)} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Editar</button>
                            <button onClick={() => setDeleteId(p.id)} className="text-xs text-red-400 hover:text-red-300 transition-colors">Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom: monthly + area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#111f35] border border-[#1a2d4a] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">Resumen mensual — {filters.year||cy}</h2>
            <div className="space-y-1">
              {monthlyBreakdown.map(({name,month,total}) => {
                const isCurrent = month===cm && Number(filters.year||cy)===cy;
                return (
                  <div key={name} className={`flex items-center justify-between px-3 py-2 rounded-lg ${isCurrent?'bg-blue-900/20 border border-blue-800/30':''}`}>
                    <span className={`text-sm ${isCurrent?'text-blue-300 font-medium':'text-slate-400'}`}>{name}</span>
                    <span className={`text-sm font-medium tabular-nums ${total>0?'text-emerald-400':'text-slate-700'}`}>{formatCOP(total)}</span>
                  </div>
                );
              })}
              <div className="flex items-center justify-between px-3 py-2 border-t border-[#1a2d4a] mt-2">
                <span className="text-sm font-semibold text-slate-300">Total año</span>
                <span className="text-sm font-semibold text-emerald-400 tabular-nums">{formatCOP(monthlyBreakdown.reduce((s,m)=>s+m.total,0))}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#111f35] border border-[#1a2d4a] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">Total por área (filtrado)</h2>
            {areaTotals.length===0 ? <p className="text-sm text-slate-600 py-6 text-center">Sin datos.</p> : (
              <div className="space-y-1">
                {areaTotals.map(([area,total]) => (
                  <div key={area} className="flex items-center justify-between px-3 py-2 rounded-lg">
                    <span className="text-sm text-slate-400">{area}</span>
                    <span className="text-sm font-medium text-violet-400 tabular-nums">{formatCOP(total)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-3 py-2 border-t border-[#1a2d4a] mt-2">
                  <span className="text-sm font-semibold text-slate-300">Total</span>
                  <span className="text-sm font-semibold text-violet-400 tabular-nums">{formatCOP(areaTotals.reduce((s,[,v])=>s+v,0))}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#0d1626] border border-[#1a2d4a] rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a2d4a] flex-shrink-0">
              <h2 className="text-base font-semibold text-slate-100">{editingId?'Editar pago':'Registrar pago'}</h2>
              <button onClick={()=>setModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              {formError && <div className="bg-red-900/20 border border-red-800/40 rounded-lg p-3 text-red-400 text-sm">{formError}</div>}

              {/* ── Sección cliente ── */}
              <div className="bg-[#0a1120] border border-[#1a2d4a] rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Cliente / Pagador</p>

                {/* Selector cliente registrado */}
                {clients.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-500">Vincular a cliente registrado (opcional)</span>
                    <input
                      type="text" value={clientQ} onChange={e => setClientQ(e.target.value)}
                      placeholder="Buscar cliente registrado…"
                      className={INPUT + ' w-full'}
                    />
                    {clientQ && (
                      <div className="bg-[#111f35] border border-[#1a2d4a] rounded-lg overflow-hidden max-h-36 overflow-y-auto">
                        <button
                          onClick={() => selectClient(null)}
                          className="w-full text-left px-3 py-2 text-sm text-slate-500 hover:bg-[#1a2d4a] transition-colors"
                        >
                          — Sin vincular / cliente externo —
                        </button>
                        {filteredClients.map(c => (
                          <button key={c.id} onClick={() => selectClient(c)}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-[#1a2d4a] transition-colors border-t border-[#1a2d4a]">
                            <span className="text-slate-200">{c.full_name}</span>
                            {c.email && <span className="text-slate-500 text-xs ml-2">{c.email}</span>}
                            {c.case_reference && <span className="text-blue-400 text-xs ml-2">#{c.case_reference}</span>}
                          </button>
                        ))}
                        {filteredClients.length===0 && <p className="px-3 py-2 text-sm text-slate-600">Sin resultados</p>}
                      </div>
                    )}
                    {form.client_profile_id && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-blue-400"/>
                        <span className="text-xs text-blue-300">Cliente vinculado: {form.client_name}</span>
                        <button onClick={() => selectClient(null)} className="ml-auto text-xs text-slate-500 hover:text-slate-300">✕</button>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Nombre del pagador *</span>
                    <input type="text" value={form.client_name} onChange={e=>setForm(f=>({...f,client_name:e.target.value}))}
                      placeholder="Nombre o empresa" className={INPUT}/>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Correo (opcional)</span>
                    <input type="email" value={form.client_email} onChange={e=>setForm(f=>({...f,client_email:e.target.value}))}
                      placeholder="email@ejemplo.com" className={INPUT}/>
                  </label>
                </div>
              </div>

              {/* ── Sección pago ── */}
              <div className="bg-[#0a1120] border border-[#1a2d4a] rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Detalle del pago</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className="col-span-2 flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Fecha del pago *</span>
                    <input type="date" value={form.payment_date} onChange={e=>setForm(f=>({...f,payment_date:e.target.value}))} className={INPUT}/>
                  </label>
                  <label className="col-span-2 flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Concepto *</span>
                    <input type="text" value={form.concept} onChange={e=>setForm(f=>({...f,concept:e.target.value}))}
                      placeholder="Descripción del servicio" className={INPUT}/>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Área de servicio *</span>
                    <select value={form.service_area} onChange={e=>setForm(f=>({...f,service_area:e.target.value as ServiceArea}))} className={INPUT}>
                      {SERVICE_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Estado *</span>
                    <select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value as PaymentStatus}))} className={INPUT}>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Valor recibido hoy (COP) *</span>
                    <input type="number" min="0" step="1000" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))}
                      placeholder="0" className={INPUT}/>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Valor total acordado (opcional)</span>
                    <input type="number" min="0" step="1000" value={form.total_amount} onChange={e=>setForm(f=>({...f,total_amount:e.target.value}))}
                      placeholder="Para pagos fraccionados" className={INPUT}/>
                  </label>
                  {form.total_amount && parseFloat(form.total_amount) > 0 && parseFloat(form.amount||'0') < parseFloat(form.total_amount) && (
                    <div className="col-span-2 flex items-center gap-2 px-3 py-2 bg-amber-900/20 border border-amber-800/30 rounded-lg">
                      <span className="text-xs text-amber-400">
                        Saldo pendiente: <strong>{formatCOP(parseFloat(form.total_amount)-parseFloat(form.amount||'0'))}</strong>
                      </span>
                    </div>
                  )}
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Medio de pago *</span>
                    <select value={form.payment_method} onChange={e=>setForm(f=>({...f,payment_method:e.target.value as PaymentMethod}))} className={INPUT}>
                      {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Próx. vencimiento (opcional)</span>
                    <input type="date" value={form.payment_due_date} onChange={e=>setForm(f=>({...f,payment_due_date:e.target.value}))} className={INPUT}/>
                  </label>
                  <label className="col-span-2 flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Observaciones</span>
                    <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}
                      rows={2} placeholder="Notas adicionales (opcional)"
                      className={INPUT + ' resize-none'}/>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#1a2d4a] flex-shrink-0">
              <button onClick={()=>setModalOpen(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">Cancelar</button>
              <button onClick={savePayment} disabled={saving}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors">
                {saving?'Guardando…':editingId?'Actualizar':'Registrar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirmation ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#0d1626] border border-[#1a2d4a] rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-base font-semibold text-slate-100 mb-2">¿Eliminar este registro?</h2>
            <p className="text-sm text-slate-500 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-3">
              <button onClick={()=>setDeleteId(null)} className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">Cancelar</button>
              <button onClick={confirmDelete} disabled={deleting}
                className="px-5 py-2 text-sm font-medium text-white bg-red-700 hover:bg-red-600 disabled:opacity-50 rounded-lg transition-colors">
                {deleting?'Eliminando…':'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
