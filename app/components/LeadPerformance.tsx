'use client';

import { useMemo, useState } from 'react';
import { summarizeLeads } from '@/lib/leadInsights';

type Lead = { created_at: string; source_path?: string | null; service_interest?: string | null; status?: string | null };

export default function LeadPerformance({ leads }: { leads: Lead[] }) {
  const [days, setDays] = useState('30');
  const selected = useMemo(() => {
    const cutoff = days === 'all' ? -Infinity : Date.now() - Number(days) * 86400000;
    return leads.filter(lead => Date.parse(lead.created_at) >= cutoff);
  }, [leads, days]);
  const rows = summarizeLeads(selected);
  const converted = rows.reduce((sum, row) => sum + row.converted, 0);
  const contacted = rows.reduce((sum, row) => sum + row.contacted, 0);
  const rate = selected.length ? (100 * converted / selected.length).toFixed(1) : '0.0';

  function exportReport() {
    const cells = (row: Array<string | number>) => row.map(value => `"${String(value).replace(/^[=+@\-\t\r]/, match => ` '${match}`).replace(/"/g, '""')}"`).join(',');
    const data = [cells(['Página de origen', 'Servicio', 'Registros', 'Gestionados', 'Contratados/convertidos', 'Porcentaje']), ...rows.map(row => cells([row.source, row.service, row.total, row.contacted, row.converted, (100 * row.converted / row.total).toFixed(1)]))].join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF', data], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'captacion-por-servicio.csv'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <section className="mt-5 rounded-2xl border border-[#1e3a6e]/50 p-4" aria-label="Rendimiento de la captación">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h3 className="font-semibold text-slate-100">De contacto a contratación</h3>
      <div className="flex gap-2">
        <select aria-label="Período del informe de captación" className="rounded-lg bg-[#0a1120] px-3 py-2 text-sm text-slate-200" value={days} onChange={event => setDays(event.target.value)}>
          <option value="30">Últimos 30 días</option><option value="90">Últimos 90 días</option><option value="all">Todos los cargados</option>
        </select>
        <button onClick={exportReport} className="rounded-lg border border-[#1e3a6e] px-3 text-sm text-slate-200">Exportar resumen</button>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      {[['Contactos registrados', selected.length], ['Gestionados', contacted], ['Contratados / convertidos', converted], ['Conversión registrada', `${rate}%`]].map(([label, value]) => <div key={label} className="rounded-xl bg-[#0a1120] p-3"><p className="text-xs text-slate-400">{label}</p><p className="mt-1 text-2xl font-semibold text-slate-100">{value}</p></div>)}
    </div>
    <p className="mt-3 text-xs text-slate-400">Basado en los últimos {leads.length} registros cargados (máximo 200). Son registros de contacto, no personas únicas. La contratación depende del estado marcado manualmente; se conserva el estado histórico «convertido». No verifica contratos firmados ni pagos.</p>
    <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-xs text-slate-300">
      <thead><tr className="border-b border-slate-700"><th className="p-2">Página / servicio</th><th className="p-2">Registros</th><th className="p-2">Gestionados</th><th className="p-2">Contratados / convertidos</th></tr></thead>
      <tbody>{rows.map(row => <tr key={JSON.stringify([row.source, row.service])} className="border-b border-slate-800"><td className="max-w-xs break-words p-2"><strong>{row.service}</strong><span className="mt-1 block text-slate-500">{row.source}</span></td><td className="p-2">{row.total}</td><td className="p-2">{row.contacted}</td><td className="p-2">{row.converted}</td></tr>)}</tbody>
    </table>{!rows.length && <p className="py-4 text-sm text-slate-400">No hay contactos registrados en este período.</p>}</div>
  </section>;
}
