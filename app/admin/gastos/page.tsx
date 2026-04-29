'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminShell from '@/components/AdminShell';
import { useAdminAuth } from '@/contexts/admin-auth';

// ─── Types ────────────────────────────────────────────────────────────────────

type ExpenseCategory = 'Publicidad' | 'Software/IA' | 'Movilidad' | 'Gestoría' | 'Viáticos' | 'Seguridad Social' | 'Otro';
type Currency        = 'COP' | 'USD' | 'EUR';

interface Expense {
  id:                  string;
  created_at:          string;
  expense_date:        string;
  category:            ExpenseCategory;
  description:         string;
  vendor_name:         string | null;
  vendor_country:      string;
  vendor_tax_id:       string | null;
  amount:              number;
  currency:            Currency;
  exchange_rate:       number;
  amount_cop:          number;
  is_deductible:       boolean;
  payment_method:      string;
  evidence_url:        string | null;
  related_client_name: string | null;
  notes:               string | null;
}

interface Filters {
  dateFrom:    string;
  dateTo:      string;
  month:       string;
  year:        string;
  category:    string;
  deductible:  string;
  currency:    string;
  search:      string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: ExpenseCategory[] = ['Publicidad','Software/IA','Movilidad','Gestoría','Viáticos','Seguridad Social','Otro'];
const CURRENCIES: Currency[]        = ['COP','USD','EUR'];
const PAYMENT_METHODS               = ['Transferencia','Efectivo','Tarjeta débito','Tarjeta crédito','Nequi','Daviplata'];
const MONTH_NAMES                   = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// UVT 2025 y umbral de declaración de renta (1.400 UVT)
const UVT_2025        = 49_799;
const UMBRAL_DIAN_UVT = 1_400;
const UMBRAL_DIAN_COP = UVT_2025 * UMBRAL_DIAN_UVT; // ≈ $69.7M COP

const CATEGORY_COLORS: Record<string, string> = {
  'Publicidad':      'text-blue-400   bg-blue-900/30   border-blue-800/40',
  'Software/IA':     'text-violet-400 bg-violet-900/30 border-violet-800/40',
  'Movilidad':       'text-amber-400  bg-amber-900/30  border-amber-800/40',
  'Gestoría':        'text-cyan-400   bg-cyan-900/30   border-cyan-800/40',
  'Viáticos':        'text-orange-400 bg-orange-900/30 border-orange-800/40',
  'Seguridad Social':'text-emerald-400 bg-emerald-900/30 border-emerald-800/40',
  'Otro':            'text-slate-400  bg-slate-800/40  border-slate-700/40',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function formatCOP(n: number) {
  return new Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', minimumFractionDigits:0, maximumFractionDigits:0 }).format(n);
}

function formatFX(amount: number, currency: Currency) {
  if (currency === 'COP') return formatCOP(amount);
  return new Intl.NumberFormat('en-US', { style:'currency', currency, minimumFractionDigits:2 }).format(amount);
}

const INPUT = 'bg-[#111f35] border border-[#1a2d4a] rounded-lg px-3 py-2 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-600';

const EMPTY_FORM = {
  expense_date:        localToday(),
  category:            'Publicidad' as ExpenseCategory,
  description:         '',
  vendor_name:         '',
  vendor_country:      'Colombia',
  vendor_tax_id:       '',
  amount:              '',
  currency:            'COP' as Currency,
  exchange_rate:       '',
  is_deductible:       true,
  payment_method:      'Transferencia',
  evidence_url:        '',
  related_client_name: '',
  notes:               '',
};

const EMPTY_FILTERS: Filters = {
  dateFrom:   '',
  dateTo:     '',
  month:      '',
  year:       String(new Date().getFullYear()),
  category:   '',
  deductible: '',
  currency:   '',
  search:     '',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function GastosPage() {
  const { token } = useAdminAuth();

  const [expenses,   setExpenses]   = useState<Expense[]>([]);
  const [incomeYear, setIncomeYear] = useState(0); // ingresos año actual para alerta DIAN
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filters,    setFilters]    = useState<Filters>(EMPTY_FILTERS);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form,      setForm]      = useState<typeof EMPTY_FORM>(EMPTY_FORM);
  const [saving,    setSaving]    = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [deleteId,  setDeleteId]  = useState<string | null>(null);
  const [deleting,  setDeleting]  = useState(false);

  const [dianTab, setDianTab] = useState(false); // toggle Documento Soporte view

  // ── Load ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    setLoading(true); setError(null);

    Promise.all([
      fetch('/api/admin/expenses', { headers: { authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/admin/payments', { headers: { authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([expJson, payJson]) => {
      if (cancelled) return;
      if (expJson.ok) setExpenses(expJson.data ?? []);
      else setError(expJson.error);

      if (payJson.ok) {
        const cy = new Date().getFullYear();
        const total = (payJson.data ?? [])
          .filter((p: { payment_date: string; status: string }) => {
            return new Date(p.payment_date+'T00:00:00').getFullYear() === cy && p.status !== 'Pendiente';
          })
          .reduce((s: number, p: { amount: number }) => s + Number(p.amount), 0);
        setIncomeYear(total);
      }
    }).catch((e: unknown) => {
      if (!cancelled) setError(e instanceof Error ? e.message : 'Error al cargar');
    }).finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [token, refreshKey]);

  function reload() { setRefreshKey(k => k + 1); }

  // ── Filtered ──────────────────────────────────────────────────────────────

  const filtered = useMemo(() => expenses.filter(e => {
    if (filters.dateFrom   && e.expense_date < filters.dateFrom)                      return false;
    if (filters.dateTo     && e.expense_date > filters.dateTo)                        return false;
    if (filters.month      && String(new Date(e.expense_date+'T00:00:00').getMonth()+1) !== filters.month) return false;
    if (filters.year       && String(new Date(e.expense_date+'T00:00:00').getFullYear()) !== filters.year)  return false;
    if (filters.category   && e.category !== filters.category)                        return false;
    if (filters.currency   && e.currency  !== filters.currency)                       return false;
    if (filters.deductible === 'si'  && !e.is_deductible)                             return false;
    if (filters.deductible === 'no'  &&  e.is_deductible)                             return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!e.description.toLowerCase().includes(q) &&
          !(e.vendor_name?.toLowerCase().includes(q)) &&
          !(e.related_client_name?.toLowerCase().includes(q))) return false;
    }
    return true;
  }), [expenses, filters]);

  // ── Totals ────────────────────────────────────────────────────────────────

  const totals = useMemo(() => {
    const now = new Date(); const cm = now.getMonth()+1; const cy = now.getFullYear();
    const thisMonth = (list: Expense[]) => list.filter(e => {
      const d = new Date(e.expense_date+'T00:00:00');
      return d.getMonth()+1===cm && d.getFullYear()===cy;
    });
    const thisYear = (list: Expense[]) => list.filter(e => new Date(e.expense_date+'T00:00:00').getFullYear()===cy);

    const monthAll  = thisMonth(expenses).reduce((s,e) => s+Number(e.amount_cop), 0);
    const monthDed  = thisMonth(expenses).filter(e=>e.is_deductible).reduce((s,e) => s+Number(e.amount_cop), 0);
    const yearAll   = thisYear(expenses).reduce((s,e) => s+Number(e.amount_cop), 0);
    const yearDed   = thisYear(expenses).filter(e=>e.is_deductible).reduce((s,e) => s+Number(e.amount_cop), 0);

    // Ingresos del mes para renta líquida: usamos incomeYear / 12 como aproximación mensual
    const rentaLiquidaMes = (incomeYear/12) - monthDed;

    // Exterior (Documento Soporte)
    const exterior = expenses.filter(e => e.currency !== 'COP');
    const exteriorTotal = exterior.reduce((s,e) => s+Number(e.amount_cop), 0);

    return { monthAll, monthDed, yearAll, yearDed, rentaLiquidaMes, exterior, exteriorTotal };
  }, [expenses, incomeYear]);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.forEach(e => { map[e.category] = (map[e.category]??0)+Number(e.amount_cop); });
    return Object.entries(map).sort((a,b) => b[1]-a[1]);
  }, [filtered]);

  const years = useMemo(() => {
    const s = new Set<number>(); expenses.forEach(e => s.add(new Date(e.expense_date+'T00:00:00').getFullYear())); s.add(new Date().getFullYear());
    return Array.from(s).sort((a,b) => b-a);
  }, [expenses]);

  const filteredTotal    = useMemo(() => filtered.reduce((s,e) => s+Number(e.amount_cop), 0), [filtered]);
  const filteredDeducible = useMemo(() => filtered.filter(e=>e.is_deductible).reduce((s,e) => s+Number(e.amount_cop), 0), [filtered]);

  // Alerta DIAN: porcentaje del umbral alcanzado
  const dianProgress  = Math.min(100, (incomeYear / UMBRAL_DIAN_COP) * 100);
  const dianAlertLevel = dianProgress >= 90 ? 'critical' : dianProgress >= 70 ? 'warning' : 'ok';

  // ── Modal ─────────────────────────────────────────────────────────────────

  function openNew() {
    setForm({ ...EMPTY_FORM, expense_date: localToday() });
    setEditingId(null); setFormError(null); setModalOpen(true);
  }

  function openEdit(e: Expense) {
    setForm({
      expense_date:        e.expense_date,
      category:            e.category,
      description:         e.description,
      vendor_name:         e.vendor_name ?? '',
      vendor_country:      e.vendor_country,
      vendor_tax_id:       e.vendor_tax_id ?? '',
      amount:              String(e.amount),
      currency:            e.currency,
      exchange_rate:       e.currency !== 'COP' ? String(e.exchange_rate) : '',
      is_deductible:       e.is_deductible,
      payment_method:      e.payment_method,
      evidence_url:        e.evidence_url ?? '',
      related_client_name: e.related_client_name ?? '',
      notes:               e.notes ?? '',
    });
    setEditingId(e.id); setFormError(null); setModalOpen(true);
  }

  async function saveExpense() {
    if (!token) return;
    if (!form.description.trim() || !form.amount || !form.expense_date) {
      setFormError('Completa los campos obligatorios: fecha, descripción y monto.'); return;
    }
    if (form.currency !== 'COP' && (!form.exchange_rate || Number(form.exchange_rate) <= 0)) {
      setFormError('Ingresa la TRM (tasa de cambio) para gastos en moneda extranjera.'); return;
    }
    setSaving(true); setFormError(null);
    try {
      const url    = editingId ? `/api/admin/expenses/${editingId}` : '/api/admin/expenses';
      const method = editingId ? 'PUT' : 'POST';
      const res    = await fetch(url, {
        method,
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount:        parseFloat(form.amount),
          exchange_rate: form.currency === 'COP' ? 1 : parseFloat(form.exchange_rate || '1'),
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
      const res  = await fetch(`/api/admin/expenses/${deleteId}`, { method:'DELETE', headers:{ authorization:`Bearer ${token}` } });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setDeleteId(null); reload();
    } catch (e: unknown) { console.error(e); }
    finally { setDeleting(false); }
  }

  function exportCSV() {
    const headers = ['Fecha','Categoría','Descripción','Proveedor','País','NIT/Tax ID','Monto','Moneda','TRM','Monto COP','Deducible','Método pago','Cliente relacionado','URL soporte','Notas'];
    const rows = filtered.map(e => [
      e.expense_date, e.category, e.description, e.vendor_name??'', e.vendor_country, e.vendor_tax_id??'',
      e.amount, e.currency, e.exchange_rate, e.amount_cop, e.is_deductible?'Sí':'No',
      e.payment_method, e.related_client_name??'', e.evidence_url??'', e.notes??'',
    ]);
    const csv  = [headers,...rows].map(r => r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob(['﻿'+csv],{type:'text/csv;charset=utf-8;'});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href=url; a.download=`gastos_${localToday()}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  function exportDIAN() {
    const items = totals.exterior.map(e => ({
      id:                 e.id,
      fecha:              e.expense_date,
      proveedor:          e.vendor_name ?? 'Sin nombre',
      pais:               e.vendor_country,
      identificacion_fiscal: e.vendor_tax_id ?? 'N/A',
      descripcion:        e.description,
      valor_original:     e.amount,
      moneda:             e.currency,
      trm_aplicada:       e.exchange_rate,
      valor_cop:          e.amount_cop,
      retencion_fuente_15pct: Math.round(Number(e.amount_cop) * 0.15),
      neto_pagado_cop:    Math.round(Number(e.amount_cop) * 0.85),
      url_soporte:        e.evidence_url ?? '',
    }));
    const json = JSON.stringify({
      tipo:         'Documento Soporte - Servicios Exterior',
      generado_en:  new Date().toISOString(),
      contribuyente:'Castellanos Abogados - Persona Natural',
      uvt_2025:     UVT_2025,
      items,
      resumen: {
        total_gastos_exterior_cop: totals.exteriorTotal,
        retencion_fuente_total:    Math.round(totals.exteriorTotal * 0.15),
        num_operaciones:           items.length,
      },
    }, null, 2);
    const blob = new Blob([json],{type:'application/json'});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href=url; a.download=`documento_soporte_dian_${localToday()}.json`; a.click();
    URL.revokeObjectURL(url);
  }

  const cm = new Date().getMonth()+1;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AdminShell>
      <div className="p-6 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-slate-100">Control de Gastos</h1>
            <p className="text-sm text-slate-500 mt-0.5">Gastos operativos de la firma · Base para declaración de renta</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {totals.exterior.length > 0 && (
              <button onClick={exportDIAN} className="flex items-center gap-2 px-3 py-2 text-sm text-violet-400 hover:text-violet-300 bg-violet-900/20 border border-violet-800/30 rounded-lg transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/></svg>
                Documento Soporte DIAN
              </button>
            )}
            <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-200 bg-[#111f35] border border-[#1a2d4a] rounded-lg transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Exportar CSV
            </button>
            <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14"/></svg>
              Registrar gasto
            </button>
          </div>
        </div>

        {/* Alerta DIAN */}
        <div className={`mb-4 rounded-xl border p-4 ${
          dianAlertLevel==='critical' ? 'bg-red-900/20 border-red-800/40' :
          dianAlertLevel==='warning'  ? 'bg-amber-900/20 border-amber-800/40' :
          'bg-[#111f35] border-[#1a2d4a]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-300">Umbral Declaración de Renta {new Date().getFullYear()}</span>
              {dianAlertLevel==='critical' && <span className="text-xs font-semibold text-red-400 bg-red-900/40 px-2 py-0.5 rounded-full">¡SUPERANDO UMBRAL!</span>}
              {dianAlertLevel==='warning'  && <span className="text-xs font-semibold text-amber-400 bg-amber-900/40 px-2 py-0.5 rounded-full">PRÓXIMO AL UMBRAL</span>}
            </div>
            <span className="text-xs text-slate-500">1.400 UVT = {formatCOP(UMBRAL_DIAN_COP)} · UVT 2025: ${UVT_2025.toLocaleString('es-CO')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-[#0d1626] rounded-full h-2.5 overflow-hidden">
              <div className={`h-full rounded-full transition-all ${
                dianAlertLevel==='critical' ? 'bg-red-500' :
                dianAlertLevel==='warning'  ? 'bg-amber-500' : 'bg-emerald-500'
              }`} style={{ width:`${dianProgress}%` }}/>
            </div>
            <span className="text-sm font-semibold text-slate-300 whitespace-nowrap">
              {formatCOP(incomeYear)} <span className="text-slate-500 font-normal">/ {formatCOP(UMBRAL_DIAN_COP)}</span>
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1.5">
            {dianAlertLevel==='ok' ? `Faltan ${formatCOP(UMBRAL_DIAN_COP - incomeYear)} para estar obligado a declarar.` :
             dianAlertLevel==='warning' ? 'Estás cerca del umbral. Registra todos tus gastos deducibles ahora.' :
             'Superas el umbral. Debes declarar renta. Asegúrate de tener todos los gastos deducibles registrados.'}
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {([
            { label:`Gastos ${MONTH_NAMES[cm-1]}`,      value:totals.monthAll,  color:'text-red-400',     sub:'' },
            { label:'Deducibles del mes',                value:totals.monthDed,  color:'text-emerald-400', sub:'Restan de la base gravable' },
            { label:'Renta líquida aprox./mes',          value:totals.rentaLiquidaMes, color: totals.rentaLiquidaMes >= 0 ? 'text-blue-400':'text-red-400', sub:'Ingresos promedio − Deducibles' },
            { label:'Gastos deducibles año',             value:totals.yearDed,   color:'text-violet-400',  sub:`De ${formatCOP(totals.yearAll)} totales` },
          ] as const).map(c => (
            <div key={c.label} className="bg-[#111f35] border border-[#1a2d4a] rounded-xl p-4">
              <p className="text-[11px] text-slate-500 uppercase tracking-wide leading-tight">{c.label}</p>
              <p className={`text-lg font-semibold mt-1 ${c.color}`}>{formatCOP(c.value)}</p>
              {c.sub && <p className="text-[11px] text-slate-600 mt-0.5">{c.sub}</p>}
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-[#111f35] border border-[#1a2d4a] rounded-xl p-4 mb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            <input type="date" value={filters.dateFrom} onChange={e=>setFilters(f=>({...f,dateFrom:e.target.value}))} className={INPUT}/>
            <input type="date" value={filters.dateTo}   onChange={e=>setFilters(f=>({...f,dateTo:e.target.value}))}   className={INPUT}/>
            <select value={filters.month}      onChange={e=>setFilters(f=>({...f,month:e.target.value}))}      className={INPUT}>
              <option value="">Todos los meses</option>
              {MONTH_NAMES.map((m,i)=><option key={m} value={i+1}>{m}</option>)}
            </select>
            <select value={filters.year}       onChange={e=>setFilters(f=>({...f,year:e.target.value}))}       className={INPUT}>
              <option value="">Todos los años</option>
              {years.map(y=><option key={y} value={y}>{y}</option>)}
            </select>
            <select value={filters.category}   onChange={e=>setFilters(f=>({...f,category:e.target.value}))}   className={INPUT}>
              <option value="">Todas las categorías</option>
              {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filters.deductible} onChange={e=>setFilters(f=>({...f,deductible:e.target.value}))} className={INPUT}>
              <option value="">Deducible/No</option>
              <option value="si">Solo deducibles</option>
              <option value="no">No deducibles</option>
            </select>
            <select value={filters.currency}   onChange={e=>setFilters(f=>({...f,currency:e.target.value}))}   className={INPUT}>
              <option value="">Todas las monedas</option>
              {CURRENCIES.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="mt-3 flex gap-3">
            <input type="text" value={filters.search} onChange={e=>setFilters(f=>({...f,search:e.target.value}))}
              placeholder="Buscar por descripción, proveedor o cliente…" className={`${INPUT} flex-1`}/>
            <button onClick={()=>setFilters(EMPTY_FILTERS)} className="px-3 py-2 text-sm text-slate-500 hover:text-slate-300 bg-[#0d1626] border border-[#1a2d4a] rounded-lg transition-colors">Limpiar</button>
          </div>
        </div>

        {/* Table */}
        {error ? (
          <div className="bg-red-900/20 border border-red-800/40 rounded-xl p-4 text-red-400 text-sm mb-6">{error}</div>
        ) : loading ? (
          <div className="flex justify-center py-16 mb-6"><div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"/></div>
        ) : (
          <div className="bg-[#111f35] border border-[#1a2d4a] rounded-xl overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-[#1a2d4a] flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-slate-400">{filtered.length} gasto{filtered.length!==1?'s':''}</p>
              <div className="flex gap-4 text-sm">
                <span className="text-slate-400">Total: <span className="font-semibold text-red-400">{formatCOP(filteredTotal)}</span></span>
                <span className="text-slate-400">Deducible: <span className="font-semibold text-emerald-400">{formatCOP(filteredDeducible)}</span></span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1a2d4a]">
                    {['Fecha','Categoría','Descripción','Proveedor','Monto','COP','Deducible','Cliente','Acciones'].map(h=>(
                      <th key={h} className="text-left px-4 py-3 text-[11px] font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a2d4a]">
                  {filtered.length===0 ? (
                    <tr><td colSpan={9} className="px-4 py-12 text-center text-slate-600">No hay gastos con los filtros actuales.</td></tr>
                  ) : filtered.map(e => (
                    <tr key={e.id} className="hover:bg-[#0d1626]/60 transition-colors">
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{e.expense_date}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_COLORS[e.category]??''}`}>{e.category}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-300 max-w-[200px] truncate" title={e.description}>{e.description}</td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                        <div>{e.vendor_name ?? '—'}</div>
                        {e.vendor_country!=='Colombia' && <div className="text-[11px] text-violet-400">{e.vendor_country}</div>}
                      </td>
                      <td className="px-4 py-3 text-slate-200 font-medium whitespace-nowrap">
                        {formatFX(Number(e.amount), e.currency)}
                        {e.currency!=='COP' && <span className="text-[11px] text-slate-500 ml-1">{e.currency}</span>}
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{formatCOP(Number(e.amount_cop))}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${e.is_deductible?'bg-emerald-900/30 text-emerald-400 border-emerald-800/40':'bg-slate-800/40 text-slate-500 border-slate-700/40'}`}>
                          {e.is_deductible?'Sí':'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs max-w-[120px] truncate">{e.related_client_name??'—'}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-3">
                          {e.evidence_url && <a href={e.evidence_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300">Ver soporte</a>}
                          <button onClick={()=>openEdit(e)} className="text-xs text-blue-400 hover:text-blue-300">Editar</button>
                          <button onClick={()=>setDeleteId(e.id)} className="text-xs text-red-400 hover:text-red-300">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom: categorías + gastos exterior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#111f35] border border-[#1a2d4a] rounded-xl p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4">Gastos por categoría (filtrado)</h2>
            {byCategory.length===0 ? <p className="text-sm text-slate-600 py-4 text-center">Sin datos.</p> : (
              <div className="space-y-2">
                {byCategory.map(([cat, total]) => (
                  <div key={cat} className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[cat]??''} w-32 text-center flex-shrink-0`}>{cat}</span>
                    <div className="flex-1 bg-[#0d1626] rounded-full h-1.5">
                      <div className="h-full rounded-full bg-slate-600" style={{ width:`${Math.min(100,(total/filteredTotal)*100)}%` }}/>
                    </div>
                    <span className="text-sm font-medium text-slate-300 tabular-nums whitespace-nowrap">{formatCOP(total)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gastos exterior / Documento Soporte */}
          <div className="bg-[#111f35] border border-violet-900/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-300">Gastos Exterior — Documento Soporte DIAN</h2>
              <button onClick={()=>setDianTab(!dianTab)} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                {dianTab?'Ocultar':'Ver detalle'}
              </button>
            </div>
            {totals.exterior.length===0 ? (
              <p className="text-sm text-slate-600 py-4 text-center">Sin gastos en moneda extranjera registrados.</p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#0a1120] rounded-lg p-3">
                    <p className="text-[11px] text-slate-500">Total exterior (COP)</p>
                    <p className="text-base font-semibold text-violet-400 mt-0.5">{formatCOP(totals.exteriorTotal)}</p>
                  </div>
                  <div className="bg-[#0a1120] rounded-lg p-3">
                    <p className="text-[11px] text-slate-500">Retención en fuente (15%)</p>
                    <p className="text-base font-semibold text-amber-400 mt-0.5">{formatCOP(Math.round(totals.exteriorTotal*0.15))}</p>
                  </div>
                </div>
                {dianTab && (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {totals.exterior.map(e => (
                      <div key={e.id} className="bg-[#0a1120] rounded-lg p-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300 font-medium">{e.vendor_name??'Sin proveedor'} · {e.vendor_country}</span>
                          <span className="text-violet-400">{formatFX(Number(e.amount),e.currency)} {e.currency}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-slate-500">{e.description} · {e.expense_date}</span>
                          <span className="text-slate-400">TRM: {Number(e.exchange_rate).toLocaleString('es-CO')} → {formatCOP(Number(e.amount_cop))}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-[11px] text-slate-600 mt-3">
                  La retención del 15% aplica a servicios de no residentes según Art. 408 ET. Genera el JSON para tu contador con el botón "Documento Soporte DIAN".
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#0d1626] border border-[#1a2d4a] rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a2d4a] flex-shrink-0">
              <h2 className="text-base font-semibold text-slate-100">{editingId?'Editar gasto':'Registrar gasto'}</h2>
              <button onClick={()=>setModalOpen(false)} className="text-slate-500 hover:text-slate-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              {formError && <div className="bg-red-900/20 border border-red-800/40 rounded-lg p-3 text-red-400 text-sm">{formError}</div>}

              {/* Clasificación */}
              <div className="bg-[#0a1120] border border-[#1a2d4a] rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Clasificación</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Fecha *</span>
                    <input type="date" value={form.expense_date} onChange={e=>setForm(f=>({...f,expense_date:e.target.value}))} className={INPUT}/>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Categoría *</span>
                    <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value as ExpenseCategory}))} className={INPUT}>
                      {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </label>
                  <label className="col-span-2 flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Descripción *</span>
                    <input type="text" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}
                      placeholder="Ej: Google Ads campaña Tutela abril" className={INPUT}/>
                  </label>
                  <label className="col-span-2 flex items-center gap-3 cursor-pointer">
                    <div onClick={()=>setForm(f=>({...f,is_deductible:!f.is_deductible}))}
                      className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${form.is_deductible?'bg-emerald-600':'bg-slate-700'}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.is_deductible?'translate-x-5':'translate-x-0.5'}`}/>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">{form.is_deductible?'Gasto deducible':'No deducible'}</p>
                      <p className="text-[11px] text-slate-600">{form.is_deductible?'Resta de tu base gravable ante la DIAN':'No aplica para renta'}</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Proveedor */}
              <div className="bg-[#0a1120] border border-[#1a2d4a] rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Proveedor</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Nombre del proveedor</span>
                    <input type="text" value={form.vendor_name} onChange={e=>setForm(f=>({...f,vendor_name:e.target.value}))}
                      placeholder="Google, OpenAI, Mobil…" className={INPUT}/>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">País</span>
                    <input type="text" value={form.vendor_country} onChange={e=>setForm(f=>({...f,vendor_country:e.target.value}))} className={INPUT}/>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">NIT / Tax ID</span>
                    <input type="text" value={form.vendor_tax_id} onChange={e=>setForm(f=>({...f,vendor_tax_id:e.target.value}))}
                      placeholder="Para Documento Soporte DIAN" className={INPUT}/>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Cliente relacionado</span>
                    <input type="text" value={form.related_client_name} onChange={e=>setForm(f=>({...f,related_client_name:e.target.value}))}
                      placeholder="Caso o cliente (opcional)" className={INPUT}/>
                  </label>
                </div>
              </div>

              {/* Monto */}
              <div className="bg-[#0a1120] border border-[#1a2d4a] rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Monto y pago</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Moneda *</span>
                    <select value={form.currency} onChange={e=>setForm(f=>({...f,currency:e.target.value as Currency, exchange_rate:''}))} className={INPUT}>
                      {CURRENCIES.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Monto *</span>
                    <input type="number" min="0" step="any" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))}
                      placeholder="0" className={INPUT}/>
                  </label>
                  {form.currency!=='COP' && (
                    <label className="col-span-2 flex flex-col gap-1">
                      <span className="text-xs text-slate-500">TRM (tasa de cambio a COP) *</span>
                      <input type="number" min="1" step="any" value={form.exchange_rate} onChange={e=>setForm(f=>({...f,exchange_rate:e.target.value}))}
                        placeholder="Ej: 4200 para USD" className={INPUT}/>
                      {form.amount && form.exchange_rate && (
                        <span className="text-xs text-slate-500 mt-0.5">= {formatCOP(parseFloat(form.amount||'0')*parseFloat(form.exchange_rate||'0'))} COP</span>
                      )}
                    </label>
                  )}
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Método de pago</span>
                    <select value={form.payment_method} onChange={e=>setForm(f=>({...f,payment_method:e.target.value}))} className={INPUT}>
                      {PAYMENT_METHODS.map(m=><option key={m} value={m}>{m}</option>)}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500">URL soporte / factura</span>
                    <input type="text" value={form.evidence_url} onChange={e=>setForm(f=>({...f,evidence_url:e.target.value}))}
                      placeholder="Drive, Dropbox, foto…" className={INPUT}/>
                  </label>
                  <label className="col-span-2 flex flex-col gap-1">
                    <span className="text-xs text-slate-500">Notas</span>
                    <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}
                      rows={2} placeholder="Observaciones adicionales" className={`${INPUT} resize-none`}/>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#1a2d4a] flex-shrink-0">
              <button onClick={()=>setModalOpen(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">Cancelar</button>
              <button onClick={saveExpense} disabled={saving}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 disabled:opacity-50 rounded-lg transition-colors">
                {saving?'Guardando…':editingId?'Actualizar':'Registrar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#0d1626] border border-[#1a2d4a] rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-base font-semibold text-slate-100 mb-2">¿Eliminar este gasto?</h2>
            <p className="text-sm text-slate-500 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-3">
              <button onClick={()=>setDeleteId(null)} className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200">Cancelar</button>
              <button onClick={confirmDelete} disabled={deleting}
                className="px-5 py-2 text-sm font-medium text-white bg-red-700 hover:bg-red-600 disabled:opacity-50 rounded-lg">
                {deleting?'Eliminando…':'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
