'use client';

import { useState } from 'react';
import AdminShell from '@/components/AdminShell';

// Cuartos de pena según CP colombiano (art. 60-61)
function InputField({ label, value, onChange, type = 'number', placeholder }: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white
          placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition" />
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="mt-6 bg-[#111f35]/40 border border-dashed border-slate-800 rounded-xl p-8 text-center">
      <p className="text-slate-500 text-sm">Complete los datos y presione <span className="text-violet-400">Calcular</span>.</p>
    </div>
  );
}

function mesesATexto(meses: number) {
  const anos = Math.floor(meses / 12);
  const m = Math.round(meses % 12);
  const partes = [];
  if (anos > 0) partes.push(`${anos} año${anos > 1 ? 's' : ''}`);
  if (m > 0) partes.push(`${m} mes${m > 1 ? 'es' : ''}`);
  return partes.join(' y ') || '0 meses';
}

// ─── 1. Dosificación punitiva ─────────────────────────────────────────────────
function CalcDosificacion() {
  const [penMin, setPenMin] = useState('');
  const [penMax, setPenMax] = useState('');
  const [resultado, setResultado] = useState<{
    cuarto1: [number, number];
    cuarto2: [number, number];
    cuarto3: [number, number];
    cuarto4: [number, number];
  } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const min = Number(penMin);
    const max = Number(penMax);
    const rango = max - min;
    const q = rango / 4;
    setResultado({
      cuarto1: [min, min + q],
      cuarto2: [min + q, min + 2 * q],
      cuarto3: [min + 2 * q, min + 3 * q],
      cuarto4: [min + 3 * q, max],
    });
  };

  const cuartos = resultado ? [
    { label: '1er cuarto (mínimo)', range: resultado.cuarto1, color: 'text-green-400', desc: 'Sin agravantes ni atenuantes' },
    { label: '2do cuarto', range: resultado.cuarto2, color: 'text-yellow-400', desc: 'Con atenuantes' },
    { label: '3er cuarto', range: resultado.cuarto3, color: 'text-orange-400', desc: 'Con agravantes' },
    { label: '4to cuarto (máximo)', range: resultado.cuarto4, color: 'text-red-400', desc: 'Más agravantes que atenuantes' },
  ] : [];

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-violet-900/20 border border-violet-800/40 rounded-lg p-3 text-xs text-violet-300">
        Calcula los cuatro cuartos de la pena según el art. 60 del Código Penal colombiano.<br />
        Ingresa los <strong>meses</strong> de la pena mínima y máxima del tipo penal.
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Pena mínima (meses)" value={penMin} onChange={setPenMin} placeholder="ej: 96 (8 años)" />
        <InputField label="Pena máxima (meses)" value={penMax} onChange={setPenMax} placeholder="ej: 216 (18 años)" />
      </div>
      <button type="submit"
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Cuartos de Pena
      </button>
      {resultado ? (
        <div className="mt-6 space-y-3">
          {cuartos.map((c, i) => (
            <div key={i} className="bg-[#0a1120] border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider ${c.color}`}>{c.label}</span>
                <span className="text-xs text-slate-500">{c.desc}</span>
              </div>
              <p className="text-white font-semibold">
                {mesesATexto(c.range[0])} — {mesesATexto(c.range[1])}
              </p>
              <p className="text-xs text-slate-500">{Math.round(c.range[0])} – {Math.round(c.range[1])} meses</p>
            </div>
          ))}
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── 2. Redención de pena ─────────────────────────────────────────────────────
function CalcRedencion() {
  const [diasTrabajo, setDiasTrabajo] = useState('');
  const [diasEstudio, setDiasEstudio] = useState('');
  const [resultado, setResultado] = useState<{ redimidos: number; diasTotales: number } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    // Art. 82 Ley 65/1993: 2 días redimidos por 1 día de trabajo, 2 por 1 de estudio
    const porTrabajo = Number(diasTrabajo) * 2;
    const porEstudio = Number(diasEstudio) * 2;
    const redimidos = porTrabajo + porEstudio;
    setResultado({ redimidos, diasTotales: Number(diasTrabajo) + Number(diasEstudio) });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-violet-900/20 border border-violet-800/40 rounded-lg p-3 text-xs text-violet-300">
        Calcula días redimidos por trabajo y estudio en establecimiento carcelario (art. 82 Ley 65/1993).<br />
        • <strong>Trabajo:</strong> 2 días redimidos por 1 día trabajado<br />
        • <strong>Estudio:</strong> 2 días redimidos por 1 día de estudio
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Días trabajados" value={diasTrabajo} onChange={setDiasTrabajo} placeholder="ej: 180" />
        <InputField label="Días de estudio" value={diasEstudio} onChange={setDiasEstudio} placeholder="ej: 90" />
      </div>
      <button type="submit"
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Redención
      </button>
      {resultado ? (
        <div className="mt-6 bg-gradient-to-br from-[#1a0f2a] to-[#0d1626] border border-violet-500/30 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">Días Redimidos</p>
          <p className="text-5xl font-bold text-white tabular-nums mb-2">{resultado.redimidos}</p>
          <p className="text-violet-300 text-sm mb-4">≈ {(resultado.redimidos / 30).toFixed(1)} meses menos de condena</p>
          <div className="space-y-1 text-sm border-t border-slate-700/50 pt-4">
            <p className="text-slate-300">· Días en actividades (trabajo + estudio): {resultado.diasTotales}</p>
            <p className="text-slate-300">· Factor de redención: ×2</p>
          </div>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── 3. Términos procesales ───────────────────────────────────────────────────
function CalcTerminos() {
  const [fechaImputacion, setFechaImputacion] = useState('');
  const [resultado, setResultado] = useState<{
    indagacion: string;
    investigacion: string;
    vencimientoIndagacion: string;
    vencimientoInvestigacion: string;
    vencimientoCalificacion: string;
  } | null>(null);

  const sumarDias = (fecha: string, dias: number) => {
    const d = new Date(fecha + 'T00:00:00');
    d.setDate(d.getDate() + dias);
    return d.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    setResultado({
      indagacion: sumarDias(fechaImputacion, 0),
      investigacion: sumarDias(fechaImputacion, 1),
      vencimientoIndagacion: sumarDias(fechaImputacion, 90),
      vencimientoInvestigacion: sumarDias(fechaImputacion, 180),
      vencimientoCalificacion: sumarDias(fechaImputacion, 270),
    });
  };

  const items = resultado ? [
    { label: 'Fecha de imputación', fecha: resultado.indagacion, color: 'text-blue-400' },
    { label: 'Vencimiento de indagación (90 días)', fecha: resultado.vencimientoIndagacion, color: 'text-yellow-400' },
    { label: 'Vencimiento de investigación (180 días)', fecha: resultado.vencimientoInvestigacion, color: 'text-orange-400' },
    { label: 'Máximo para calificar (270 días)', fecha: resultado.vencimientoCalificacion, color: 'text-red-400' },
  ] : [];

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-violet-900/20 border border-violet-800/40 rounded-lg p-3 text-xs text-violet-300">
        Calcula los vencimientos procesales en el sistema penal acusatorio (Ley 906/2004).<br />
        Ingresa la <strong>fecha de imputación</strong> o la fecha de inicio de términos.
      </div>
      <InputField label="Fecha de imputación" value={fechaImputacion} onChange={setFechaImputacion} type="date" />
      <button type="submit"
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Términos
      </button>
      {resultado ? (
        <div className="mt-6 space-y-2">
          {items.map((item, i) => (
            <div key={i} className="bg-[#0a1120] border border-slate-700 rounded-lg px-4 py-3 flex justify-between items-center">
              <span className="text-xs text-slate-400">{item.label}</span>
              <span className={`text-sm font-semibold ${item.color}`}>{item.fecha}</span>
            </div>
          ))}
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── 4. Libertad condicional ──────────────────────────────────────────────────
function CalcLibertad() {
  const [penaMeses, setPenaMeses] = useState('');
  const [cumplidos, setCumplidos] = useState('');
  const [resultado, setResultado] = useState<{
    porcentaje: number;
    aplica: boolean;
    faltante: number;
    tipo: string;
  } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Number(penaMeses);
    const cumpl = Number(cumplidos);
    const porcentaje = (cumpl / total) * 100;
    // Regla general: 3/5 (60%) cumplido
    const aplica = porcentaje >= 60;
    const faltante = Math.max(0, total * 0.6 - cumpl);
    setResultado({ porcentaje, aplica, faltante, tipo: porcentaje >= 60 ? 'CUMPLE requisito temporal (60%)' : 'NO CUMPLE aún el requisito temporal' });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-violet-900/20 border border-violet-800/40 rounded-lg p-3 text-xs text-violet-300">
        Verifica si el condenado cumple el requisito temporal para libertad condicional (art. 64 CP).<br />
        Regla general: haber cumplido las <strong>3/5 partes (60%)</strong> de la pena.
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Pena total (meses)" value={penaMeses} onChange={setPenaMeses} placeholder="ej: 120" />
        <InputField label="Meses cumplidos" value={cumplidos} onChange={setCumplidos} placeholder="ej: 75" />
      </div>
      <button type="submit"
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Verificar Requisito
      </button>
      {resultado ? (
        <div className={`mt-6 border rounded-xl p-6 ${resultado.aplica
          ? 'bg-gradient-to-br from-[#0f2a1e] to-[#0d1626] border-green-500/30'
          : 'bg-gradient-to-br from-[#2a0f0f] to-[#0d1626] border-red-500/30'}`}>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${resultado.aplica ? 'text-green-400' : 'text-red-400'}`}>
            {resultado.tipo}
          </p>
          <p className="text-4xl font-bold text-white mb-4">{resultado.porcentaje.toFixed(1)}% cumplido</p>
          {!resultado.aplica && (
            <p className="text-sm text-slate-300">Faltan <strong className="text-red-300">{Math.ceil(resultado.faltante)} meses</strong> para alcanzar el 60%.</p>
          )}
          {resultado.aplica && (
            <p className="text-sm text-slate-300">Cumple el requisito temporal. Evaluar buenos comportamientos y reparación.</p>
          )}
          <div className="mt-4 bg-[#0a1120] rounded-lg h-3 overflow-hidden">
            <div className={`h-full transition-all ${resultado.aplica ? 'bg-green-500' : 'bg-violet-500'}`}
              style={{ width: `${Math.min(100, resultado.porcentaje)}%` }} />
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>0%</span><span className="text-violet-400">60% (umbral)</span><span>100%</span>
          </div>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── Página ────────────────────────────────────────────────────────────────────
type Tab = 'dosificacion' | 'redencion' | 'terminos' | 'libertad';

const TABS: { key: Tab; label: string; short: string }[] = [
  { key: 'dosificacion', label: 'Dosificación Punitiva',   short: '1' },
  { key: 'redencion',    label: 'Redención de Pena',       short: '2' },
  { key: 'terminos',     label: 'Términos Procesales',     short: '3' },
  { key: 'libertad',     label: 'Libertad Condicional',    short: '4' },
];

export default function PenalAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dosificacion');

  return (
    <AdminShell>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">Calculadoras — Penal</h1>
          <p className="text-sm text-slate-400 mt-1">
            Herramientas para procesos penales — <span className="text-slate-300 font-medium">Código Penal · Ley 906/2004 · Ley 65/1993</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6 lg:grid-cols-4">
          {TABS.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={[
                'flex flex-col items-start text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-all',
                activeTab === tab.key
                  ? 'border-violet-500 bg-violet-600 text-white'
                  : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800',
              ].join(' ')}>
              <span className="font-bold text-base leading-none mb-1">{tab.short}</span>
              <span className="leading-tight">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#111f35] border border-[#1e3a6e]/50 rounded-xl p-6 shadow-lg">
          {activeTab === 'dosificacion' && <CalcDosificacion />}
          {activeTab === 'redencion'    && <CalcRedencion />}
          {activeTab === 'terminos'     && <CalcTerminos />}
          {activeTab === 'libertad'     && <CalcLibertad />}
        </div>

        <p className="text-xs text-slate-600 text-center mt-6">
          *Herramienta orientativa de uso interno — Castellanos Abogados. El juez determinará el quantum definitivo.
        </p>
      </div>
    </AdminShell>
  );
}
