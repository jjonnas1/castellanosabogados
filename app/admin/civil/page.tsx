'use client';

import { useState } from 'react';
import AdminShell from '@/components/AdminShell';

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
          placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition" />
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="mt-6 bg-[#111f35]/40 border border-dashed border-slate-800 rounded-xl p-8 text-center">
      <p className="text-slate-500 text-sm">Complete los datos y presione <span className="text-emerald-400">Calcular</span>.</p>
    </div>
  );
}

// ─── 1. Incremento de arrendamiento ───────────────────────────────────────────
function CalcArrendamiento() {
  const [valorActual, setValorActual] = useState('');
  const [ipc, setIpc] = useState('6.86'); // IPC 2024 aprox
  const [resultado, setResultado] = useState<{ nuevo: number; incremento: number } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const incremento = Number(valorActual) * (Number(ipc) / 100);
    setResultado({ nuevo: Number(valorActual) + incremento, incremento });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-emerald-900/20 border border-emerald-800/40 rounded-lg p-3 text-xs text-emerald-300">
        Calcula el incremento máximo legal permitido para cánones de arrendamiento (art. 20 Ley 820/2003).<br />
        El incremento no puede superar el <strong>IPC del año inmediatamente anterior</strong>.
      </div>
      <InputField label="Canon actual (COP)" value={valorActual} onChange={setValorActual} placeholder="ej: 1200000" />
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">IPC año anterior (%)</label>
        <input type="number" step="0.01" value={ipc} onChange={(e) => setIpc(e.target.value)}
          className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white
            focus:outline-none focus:border-emerald-500 transition" />
        <p className="text-xs text-slate-600 mt-1">IPC 2024: 6.86% · IPC 2023: 9.28% · IPC 2022: 13.12%</p>
      </div>
      <button type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Incremento
      </button>
      {resultado ? (
        <div className="mt-6 bg-gradient-to-br from-[#0f2a1e] to-[#0d1626] border border-emerald-500/30 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-1">Nuevo Canon Máximo</p>
          <p className="text-4xl font-bold text-white tabular-nums mb-4">{cop(resultado.nuevo)}</p>
          <div className="space-y-1 text-sm border-t border-slate-700/50 pt-4">
            <p className="text-slate-300">· Canon anterior: {cop(Number(valorActual))}</p>
            <p className="text-slate-300">· Incremento ({ipc}%): {cop(resultado.incremento)}</p>
            <p className="text-emerald-400 text-xs mt-2">Todo cobro superior a este valor es ilegal (Ley 820/2003)</p>
          </div>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── 2. Intereses moratorios civiles ─────────────────────────────────────────
function CalcIntereses() {
  const [capital, setCapital] = useState('');
  const [tasaAnual, setTasaAnual] = useState('29.49'); // tasa usura aprox 2024
  const [dias, setDias] = useState('');
  const [resultado, setResultado] = useState<{ interes: number; total: number } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const interes = Number(capital) * (Number(tasaAnual) / 100 / 365) * Number(dias);
    setResultado({ interes, total: Number(capital) + interes });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-emerald-900/20 border border-emerald-800/40 rounded-lg p-3 text-xs text-emerald-300">
        Calcula intereses moratorios civiles sobre una obligación en mora.<br />
        La tasa no puede exceder la <strong>tasa de usura</strong> certificada por la Superfinanciera (Ley 45/1990).
      </div>
      <InputField label="Capital en mora (COP)" value={capital} onChange={setCapital} placeholder="ej: 5000000" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Tasa usura anual (%)</label>
          <input type="number" step="0.01" value={tasaAnual} onChange={(e) => setTasaAnual(e.target.value)}
            className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition" />
        </div>
        <InputField label="Días en mora" value={dias} onChange={setDias} placeholder="ej: 90" />
      </div>
      <button type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Intereses
      </button>
      {resultado ? (
        <div className="mt-6 bg-gradient-to-br from-[#0f2a1e] to-[#0d1626] border border-emerald-500/30 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-1">Total con Intereses</p>
          <p className="text-4xl font-bold text-white tabular-nums mb-4">{cop(resultado.total)}</p>
          <div className="space-y-1 text-sm border-t border-slate-700/50 pt-4">
            <p className="text-slate-300">· Capital: {cop(Number(capital))}</p>
            <p className="text-slate-300">· Intereses ({dias} días a {tasaAnual}% anual): {cop(resultado.interes)}</p>
          </div>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── 3. Prescripción ─────────────────────────────────────────────────────────
const PRESCRIPCIONES = [
  { label: 'Ordinaria (art. 2536 CC)', anos: 10 },
  { label: 'Ejecutiva (art. 2536 CC)', anos: 5 },
  { label: 'Responsabilidad extracontractual (art. 2358 CC)', anos: 10 },
  { label: 'Acción laboral ordinaria (art. 488 CST)', anos: 3 },
  { label: 'Acción ejecutiva laboral (art. 489 CST)', anos: 3 },
  { label: 'Acción penal (varía por delito)', anos: 20 },
  { label: 'Nulidad absoluta (art. 1750 CC)', anos: 10 },
];

function CalcPrescripcion() {
  const [fechaHecho, setFechaHecho] = useState('');
  const [tipoIdx, setTipoIdx] = useState(0);
  const [resultado, setResultado] = useState<{ limite: string; diasRestantes: number; vencido: boolean } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const tipo = PRESCRIPCIONES[tipoIdx];
    const inicio = new Date(fechaHecho + 'T00:00:00');
    const limite = new Date(inicio);
    limite.setFullYear(limite.getFullYear() + tipo.anos);
    const hoy = new Date();
    const diff = Math.floor((limite.getTime() - hoy.getTime()) / 86400000);
    setResultado({
      limite: limite.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
      diasRestantes: Math.abs(diff),
      vencido: diff < 0,
    });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-emerald-900/20 border border-emerald-800/40 rounded-lg p-3 text-xs text-emerald-300">
        Calcula cuándo prescribe el derecho a demandar desde el hecho que origina la acción.
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Tipo de acción</label>
        <select value={tipoIdx} onChange={(e) => setTipoIdx(Number(e.target.value))}
          className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition">
          {PRESCRIPCIONES.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
        </select>
      </div>
      <InputField label="Fecha del hecho que origina la acción" value={fechaHecho} onChange={setFechaHecho} type="date" />
      <button type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Prescripción
      </button>
      {resultado ? (
        <div className={`mt-6 border rounded-xl p-6 ${resultado.vencido
          ? 'bg-gradient-to-br from-[#2a0f0f] to-[#0d1626] border-red-500/30'
          : 'bg-gradient-to-br from-[#0f2a1e] to-[#0d1626] border-emerald-500/30'}`}>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${resultado.vencido ? 'text-red-400' : 'text-emerald-400'}`}>
            {resultado.vencido ? '⚠ Acción PRESCRITA' : '✓ Acción VIGENTE'}
          </p>
          <p className="text-2xl font-bold text-white mb-1">{resultado.limite}</p>
          <p className="text-sm text-slate-300">
            {resultado.vencido
              ? `Prescribió hace ${resultado.diasRestantes} días.`
              : `Restan ${resultado.diasRestantes} días para prescribir.`}
          </p>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── 4. Indexador de deudas ───────────────────────────────────────────────────
function CalcIndexacion() {
  const [capital, setCapital] = useState('');
  const [ipcBase, setIpcBase] = useState('');
  const [ipcActual, setIpcActual] = useState('');
  const [resultado, setResultado] = useState<{ actualizado: number; incremento: number } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const actualizado = Number(capital) * (Number(ipcActual) / Number(ipcBase));
    setResultado({ actualizado, incremento: actualizado - Number(capital) });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-emerald-900/20 border border-emerald-800/40 rounded-lg p-3 text-xs text-emerald-300">
        Actualiza obligaciones dinerarias por IPC para procesos ejecutivos o de reparación de perjuicios.<br />
        Los índices IPC históricos están disponibles en el DANE.
      </div>
      <InputField label="Capital original (COP)" value={capital} onChange={setCapital} placeholder="ej: 10000000" />
      <div className="grid grid-cols-2 gap-4">
        <InputField label="IPC base (año de origen)" value={ipcBase} onChange={setIpcBase} placeholder="ej: 85.23" />
        <InputField label="IPC actual" value={ipcActual} onChange={setIpcActual} placeholder="ej: 142.67" />
      </div>
      <p className="text-xs text-slate-500">Consulte el IPC histórico en <span className="text-emerald-600">dane.gov.co</span></p>
      <button type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Indexar Deuda
      </button>
      {resultado ? (
        <div className="mt-6 bg-gradient-to-br from-[#0f2a1e] to-[#0d1626] border border-emerald-500/30 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-1">Valor Indexado</p>
          <p className="text-4xl font-bold text-white tabular-nums mb-4">{cop(resultado.actualizado)}</p>
          <div className="space-y-1 text-sm border-t border-slate-700/50 pt-4">
            <p className="text-slate-300">· Capital original: {cop(Number(capital))}</p>
            <p className="text-slate-300">· Actualización por IPC: {cop(resultado.incremento)}</p>
          </div>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── Página ────────────────────────────────────────────────────────────────────
type Tab = 'arriendo' | 'intereses' | 'prescripcion' | 'indexacion';

const TABS: { key: Tab; label: string; short: string }[] = [
  { key: 'arriendo',     label: 'Incremento Arrendamiento', short: '1' },
  { key: 'intereses',    label: 'Intereses Moratorios',     short: '2' },
  { key: 'prescripcion', label: 'Prescripción',             short: '3' },
  { key: 'indexacion',   label: 'Indexador de Deudas',      short: '4' },
];

export default function CivilAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('arriendo');

  return (
    <AdminShell>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">Calculadoras — Civil e Inmobiliario</h1>
          <p className="text-sm text-slate-400 mt-1">
            Herramientas para procesos civiles — <span className="text-slate-300 font-medium">Código Civil · Ley 820/2003 · Ley 45/1990</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6 lg:grid-cols-4">
          {TABS.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={[
                'flex flex-col items-start text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-all',
                activeTab === tab.key
                  ? 'border-emerald-500 bg-emerald-600 text-white'
                  : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800',
              ].join(' ')}>
              <span className="font-bold text-base leading-none mb-1">{tab.short}</span>
              <span className="leading-tight">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#111f35] border border-[#1e3a6e]/50 rounded-xl p-6 shadow-lg">
          {activeTab === 'arriendo'     && <CalcArrendamiento />}
          {activeTab === 'intereses'    && <CalcIntereses />}
          {activeTab === 'prescripcion' && <CalcPrescripcion />}
          {activeTab === 'indexacion'   && <CalcIndexacion />}
        </div>

        <p className="text-xs text-slate-600 text-center mt-6">
          *Herramienta de uso interno — Castellanos Abogados.
        </p>
      </div>
    </AdminShell>
  );
}
