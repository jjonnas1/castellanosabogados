'use client';

import { useState } from 'react';
import AdminShell from '@/components/AdminShell';

// ─── Utilidades ────────────────────────────────────────────────────────────────
function cop(val: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
}

function InputField({ label, value, onChange, type = 'number', placeholder }: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white
          placeholder-slate-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 transition" />
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="mt-6 bg-[#111f35]/40 border border-dashed border-slate-800 rounded-xl p-8 text-center">
      <p className="text-slate-500 text-sm">Complete los datos y presione <span className="text-rose-400">Calcular</span>.</p>
    </div>
  );
}

// ─── Calculadora 1: Cuota alimentaria ─────────────────────────────────────────
function CalcAlimentos() {
  const [ingreso, setIngreso] = useState('');
  const [porcentaje, setPorcentaje] = useState('30');
  const [resultado, setResultado] = useState<{ cuota: number; diaria: number } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const cuota = (Number(ingreso) * Number(porcentaje)) / 100;
    setResultado({ cuota, diaria: cuota / 30 });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-rose-900/20 border border-rose-800/40 rounded-lg p-3 text-xs text-rose-300">
        Calcula la cuota alimentaria mensual con base en el ingreso del obligado.<br />
        La CSJ sugiere entre el <strong>20% y 50%</strong> del ingreso según capacidades y necesidades del menor.
      </div>
      <InputField label="Ingreso mensual del obligado (COP)" value={ingreso} onChange={setIngreso} placeholder="ej: 3000000" />
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Porcentaje a fijar (%)</label>
        <input type="range" min="10" max="50" step="1" value={porcentaje}
          onChange={(e) => setPorcentaje(e.target.value)}
          className="w-full accent-rose-500" />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>10%</span>
          <span className="text-rose-400 font-bold text-sm">{porcentaje}%</span>
          <span>50%</span>
        </div>
      </div>
      <button type="submit"
        className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Cuota
      </button>
      {resultado ? (
        <div className="mt-6 bg-gradient-to-br from-[#2a0f0f] to-[#0d1626] border border-rose-500/30 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-1">Cuota Mensual</p>
          <p className="text-4xl font-bold text-white tabular-nums mb-4">{cop(resultado.cuota)}</p>
          <div className="space-y-1 text-sm border-t border-slate-700/50 pt-4">
            <p className="text-slate-300">· Ingreso del obligado: {cop(Number(ingreso))}</p>
            <p className="text-slate-300">· Porcentaje aplicado: {porcentaje}%</p>
            <p className="text-slate-300">· Equivale a: {cop(resultado.diaria)} / día</p>
          </div>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── Calculadora 2: Alimentos en mora ────────────────────────────────────────
function CalcMoraAlimentos() {
  const [cuota, setCuota] = useState('');
  const [meses, setMeses] = useState('');
  const [tasaMora, setTasaMora] = useState('1.5'); // mensual %
  const [resultado, setResultado] = useState<{ capital: number; intereses: number; total: number } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const capital = Number(cuota) * Number(meses);
    const intereses = capital * (Number(tasaMora) / 100) * Number(meses);
    setResultado({ capital, intereses, total: capital + intereses });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-rose-900/20 border border-rose-800/40 rounded-lg p-3 text-xs text-rose-300">
        Calcula el valor adeudado por cuotas de alimentos no pagadas, incluidos intereses moratorios.
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Cuota mensual (COP)" value={cuota} onChange={setCuota} placeholder="ej: 800000" />
        <InputField label="Meses en mora" value={meses} onChange={setMeses} placeholder="ej: 6" />
      </div>
      <InputField label="Tasa de mora mensual (%)" value={tasaMora} onChange={setTasaMora} placeholder="ej: 1.5" />
      <button type="submit"
        className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Mora
      </button>
      {resultado ? (
        <div className="mt-6 bg-gradient-to-br from-[#2a0f0f] to-[#0d1626] border border-rose-500/30 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-1">Total Adeudado</p>
          <p className="text-4xl font-bold text-white tabular-nums mb-4">{cop(resultado.total)}</p>
          <div className="space-y-1 text-sm border-t border-slate-700/50 pt-4">
            <p className="text-slate-300">· Capital en mora: {cop(resultado.capital)}</p>
            <p className="text-slate-300">· Intereses moratorios: {cop(resultado.intereses)}</p>
          </div>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── Tabs ──────────────────────────────────────────────────────────────────────
type Tab = 'alimentos' | 'mora';

const TABS: { key: Tab; label: string; short: string }[] = [
  { key: 'alimentos', label: 'Cuota Alimentaria', short: '1' },
  { key: 'mora',      label: 'Alimentos en Mora', short: '2' },
];

export default function FamiliaAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('alimentos');

  return (
    <AdminShell>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">Calculadoras — Familia</h1>
          <p className="text-sm text-slate-400 mt-1">
            Herramientas para procesos de alimentos y custodia — <span className="text-slate-300 font-medium">Código Civil · CSJ</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {TABS.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={[
                'flex flex-col items-start text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-all',
                activeTab === tab.key
                  ? 'border-rose-500 bg-rose-600 text-white'
                  : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800',
              ].join(' ')}>
              <span className="font-bold text-base leading-none mb-1">{tab.short}</span>
              <span className="leading-tight">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#111f35] border border-[#1e3a6e]/50 rounded-xl p-6 shadow-lg">
          {activeTab === 'alimentos' && <CalcAlimentos />}
          {activeTab === 'mora'      && <CalcMoraAlimentos />}
        </div>

        <p className="text-xs text-slate-600 text-center mt-6">
          *Los resultados son orientativos. El juez determinará el monto definitivo según el expediente — Castellanos Abogados.
        </p>
      </div>
    </AdminShell>
  );
}
