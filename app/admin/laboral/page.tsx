'use client';

import { useState } from 'react';
import AdminShell from '@/components/AdminShell';

// ─── Utilidades ────────────────────────────────────────────────────────────────

/** Calcula días entre dos fechas usando mes comercial de 30 días (igual que el Excel) */
function dias360(inicio: string, fin: string): number {
  if (!inicio || !fin) return 0;
  const d1 = new Date(inicio + 'T00:00:00');
  const d2 = new Date(fin + 'T00:00:00');
  const y1 = d1.getFullYear(), m1 = d1.getMonth(), dd1 = Math.min(d1.getDate(), 30);
  const y2 = d2.getFullYear(), m2 = d2.getMonth(), dd2 = Math.min(d2.getDate(), 30);
  return (y2 - y1) * 360 + (m2 - m1) * 30 + (dd2 - dd1);
}

function cop(val: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0,
  }).format(val);
}

function diasAAnos(dias: number) {
  const anos = Math.floor(dias / 360);
  const resto = dias % 360;
  const meses = Math.floor(resto / 30);
  const dd = resto % 30;
  const partes = [];
  if (anos > 0) partes.push(`${anos} año${anos > 1 ? 's' : ''}`);
  if (meses > 0) partes.push(`${meses} mes${meses > 1 ? 'es' : ''}`);
  if (dd > 0) partes.push(`${dd} día${dd > 1 ? 's' : ''}`);
  return partes.join(', ') || '0 días';
}

// ─── Tipos ─────────────────────────────────────────────────────────────────────

type TabKey = 'indef_lt10_gt1' | 'indef_lt10_lte1' | 'indef_gte10_gt1' | 'indef_gte10_lte1' | 'fijo' | 'moratoria';

interface ResultadoIndem {
  primerAno: number;
  anosAdicionales: number;
  total: number;
  diasLaborados: number;
  ingresoDiario: number;
  detalle: string[];
}

// ─── Calculadoras ──────────────────────────────────────────────────────────────

function calcIndef(
  ingreso: number,
  fechaIngreso: string,
  fechaLiquidacion: string,
  diasPrimerAno: number,   // 30 o 20
  diasAdicionales: number  // 20 o 15
): ResultadoIndem | null {
  const dias = dias360(fechaIngreso, fechaLiquidacion);
  if (dias <= 0) return null;
  const diario = ingreso / 30;
  const primerAno = diasPrimerAno * diario;
  const anosExtra = Math.max(0, dias - 360);
  const indAdicional = (anosExtra / 360) * diasAdicionales * diario;
  const total = primerAno + indAdicional;
  return {
    primerAno,
    anosAdicionales: indAdicional,
    total,
    diasLaborados: dias,
    ingresoDiario: diario,
    detalle: [
      `Días laborados: ${dias} (${diasAAnos(dias)})`,
      `Ingreso diario: ${cop(diario)}`,
      `Indemnización primer año (${diasPrimerAno} días): ${cop(primerAno)}`,
      dias > 360
        ? `Años adicionales (${(anosExtra / 360).toFixed(4)} años × ${diasAdicionales} días): ${cop(indAdicional)}`
        : `No aplican años adicionales (tiempo ≤ 1 año)`,
    ],
  };
}

function calcIndef1Ano(
  ingreso: number,
  fechaIngreso: string,
  fechaLiquidacion: string,
  diasBase: number // 30 o 20
): ResultadoIndem | null {
  const dias = dias360(fechaIngreso, fechaLiquidacion);
  if (dias <= 0) return null;
  const diario = ingreso / 30;
  const total = diasBase * diario;
  return {
    primerAno: total,
    anosAdicionales: 0,
    total,
    diasLaborados: dias,
    ingresoDiario: diario,
    detalle: [
      `Días laborados: ${dias} (${diasAAnos(dias)})`,
      `Ingreso diario: ${cop(diario)}`,
      `Indemnización (${diasBase} días de salario básico): ${cop(total)}`,
    ],
  };
}

// ─── Componentes de Formulario ────────────────────────────────────────────────

function InputField({
  label, value, onChange, type = 'number', min, placeholder,
}: {
  label: string; value: string | number; onChange: (v: string) => void;
  type?: string; min?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        placeholder={placeholder}
        className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white
          placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
      />
    </div>
  );
}

function ResultBox({ r }: { r: ResultadoIndem }) {
  return (
    <div className="mt-6 bg-gradient-to-br from-[#0f2a1e] to-[#0d1626] border border-green-500/30 rounded-xl p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-1">Total Indemnización</p>
      <p className="text-4xl font-bold text-white tabular-nums mb-6">{cop(r.total)}</p>
      <div className="space-y-2 text-sm border-t border-slate-700/50 pt-4">
        {r.detalle.map((d, i) => (
          <p key={i} className="text-slate-300 leading-relaxed">· {d}</p>
        ))}
      </div>
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="mt-6 bg-[#111f35]/40 border border-dashed border-slate-800 rounded-xl p-8 text-center">
      <p className="text-slate-500 text-sm">Complete los datos y presione <span className="text-blue-400">Calcular</span>.</p>
    </div>
  );
}

// ─── Módulos de cada calculadora ──────────────────────────────────────────────

function Calc1() {
  // Contrato indefinido < 10 SMMLV, > 1 año. 30 días primer año + 20 días/año adicional
  const [ingreso, setIngreso] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [fechaLiq, setFechaLiq] = useState('');
  const [resultado, setResultado] = useState<ResultadoIndem | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    setResultado(calcIndef(Number(ingreso), fechaIngreso, fechaLiq, 30, 20));
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-blue-900/20 border border-blue-800/40 rounded-lg p-3 text-xs text-blue-300">
        Aplica si el ingreso es <strong>inferior a 10 SMMLV</strong> y la duración es <strong>superior a 1 año</strong> (Ley 789/2002, art. 64).<br />
        • Primer año: 30 días de salario<br />
        • Por cada año adicional: 20 días de salario proporcional
      </div>
      <InputField label="Ingreso Mensual (COP)" value={ingreso} onChange={setIngreso} placeholder="ej: 1300000" />
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Fecha de Ingreso" value={fechaIngreso} onChange={setFechaIngreso} type="date" />
        <InputField label="Fecha de Liquidación" value={fechaLiq} onChange={setFechaLiq} type="date" />
      </div>
      <button type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Indemnización
      </button>
      {resultado ? <ResultBox r={resultado} /> : <EmptyResult />}
    </form>
  );
}

function Calc1A() {
  // Contrato indefinido < 10 SMMLV, ≤ 1 año → 30 días
  const [ingreso, setIngreso] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [fechaLiq, setFechaLiq] = useState('');
  const [resultado, setResultado] = useState<ResultadoIndem | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    setResultado(calcIndef1Ano(Number(ingreso), fechaIngreso, fechaLiq, 30));
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-blue-900/20 border border-blue-800/40 rounded-lg p-3 text-xs text-blue-300">
        Aplica si el ingreso es <strong>inferior a 10 SMMLV</strong> y la duración es <strong>igual o inferior a 1 año</strong>.<br />
        • Indemnización: 30 días de salario básico
      </div>
      <InputField label="Ingreso Mensual (COP)" value={ingreso} onChange={setIngreso} placeholder="ej: 1300000" />
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Fecha de Ingreso" value={fechaIngreso} onChange={setFechaIngreso} type="date" />
        <InputField label="Fecha de Liquidación" value={fechaLiq} onChange={setFechaLiq} type="date" />
      </div>
      <button type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Indemnización
      </button>
      {resultado ? <ResultBox r={resultado} /> : <EmptyResult />}
    </form>
  );
}

function Calc2() {
  // Contrato indefinido ≥ 10 SMMLV, > 1 año → 20 días + 15 días/año adicional
  const [ingreso, setIngreso] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [fechaLiq, setFechaLiq] = useState('');
  const [resultado, setResultado] = useState<ResultadoIndem | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    setResultado(calcIndef(Number(ingreso), fechaIngreso, fechaLiq, 20, 15));
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-purple-900/20 border border-purple-800/40 rounded-lg p-3 text-xs text-purple-300">
        Aplica si el ingreso es <strong>igual o superior a 10 SMMLV</strong> y la duración es <strong>superior a 1 año</strong>.<br />
        • Primer año: 20 días de salario<br />
        • Por cada año adicional: 15 días de salario proporcional
      </div>
      <InputField label="Ingreso Mensual (COP)" value={ingreso} onChange={setIngreso} placeholder="ej: 13000000" />
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Fecha de Ingreso" value={fechaIngreso} onChange={setFechaIngreso} type="date" />
        <InputField label="Fecha de Liquidación" value={fechaLiq} onChange={setFechaLiq} type="date" />
      </div>
      <button type="submit"
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Indemnización
      </button>
      {resultado ? <ResultBox r={resultado} /> : <EmptyResult />}
    </form>
  );
}

function Calc2A() {
  // Contrato indefinido ≥ 10 SMMLV, ≤ 1 año → 20 días
  const [ingreso, setIngreso] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [fechaLiq, setFechaLiq] = useState('');
  const [resultado, setResultado] = useState<ResultadoIndem | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    setResultado(calcIndef1Ano(Number(ingreso), fechaIngreso, fechaLiq, 20));
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-purple-900/20 border border-purple-800/40 rounded-lg p-3 text-xs text-purple-300">
        Aplica si el ingreso es <strong>igual o superior a 10 SMMLV</strong> y la duración es <strong>igual o inferior a 1 año</strong>.<br />
        • Indemnización: 20 días de salario básico
      </div>
      <InputField label="Ingreso Mensual (COP)" value={ingreso} onChange={setIngreso} placeholder="ej: 13000000" />
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Fecha de Ingreso" value={fechaIngreso} onChange={setFechaIngreso} type="date" />
        <InputField label="Fecha de Liquidación" value={fechaLiq} onChange={setFechaLiq} type="date" />
      </div>
      <button type="submit"
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Indemnización
      </button>
      {resultado ? <ResultBox r={resultado} /> : <EmptyResult />}
    </form>
  );
}

function Calc3() {
  // Término fijo / Obra-Labor → días restantes del contrato (mínimo 15 días)
  const [ingreso, setIngreso] = useState('');
  const [fechaDespido, setFechaDespido] = useState('');
  const [fechaTerminacion, setFechaTerminacion] = useState('');
  const [resultado, setResultado] = useState<{ total: number; diasRestantes: number; ingresoDiario: number } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const diasRestantes = dias360(fechaDespido, fechaTerminacion);
    const diario = Number(ingreso) / 30;
    const diasEfectivos = Math.max(15, diasRestantes);
    setResultado({ total: diasEfectivos * diario, diasRestantes: diasEfectivos, ingresoDiario: diario });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-amber-900/20 border border-amber-800/40 rounded-lg p-3 text-xs text-amber-300">
        Aplica para <strong>contratos a término fijo, por obra o labor</strong>.<br />
        • La indemnización corresponde al tiempo que faltare para cumplir el plazo.<br />
        • Mínimo garantizado: 15 días de salario.
      </div>
      <InputField label="Ingreso Mensual (COP)" value={ingreso} onChange={setIngreso} placeholder="ej: 1300000" />
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Fecha de Despido" value={fechaDespido} onChange={setFechaDespido} type="date" />
        <InputField label="Fecha Terminación Pactada" value={fechaTerminacion} onChange={setFechaTerminacion} type="date" />
      </div>
      <button type="submit"
        className="w-full bg-amber-600 hover:bg-amber-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Indemnización
      </button>
      {resultado ? (
        <div className="mt-6 bg-gradient-to-br from-[#2a1f0f] to-[#0d1626] border border-amber-500/30 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">Total Indemnización</p>
          <p className="text-4xl font-bold text-white tabular-nums mb-6">{cop(resultado.total)}</p>
          <div className="space-y-2 text-sm border-t border-slate-700/50 pt-4">
            <p className="text-slate-300">· Días restantes del contrato: <strong>{resultado.diasRestantes}</strong> {resultado.diasRestantes === 15 ? '(mínimo legal aplicado)' : ''}</p>
            <p className="text-slate-300">· Ingreso diario: {cop(resultado.ingresoDiario)}</p>
          </div>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

function CalcMoratoria() {
  // Sanción moratoria: 1 día de salario por cada día de mora
  const [ingreso, setIngreso] = useState('');
  const [fechaLiquidacion, setFechaLiquidacion] = useState('');
  const [fechaActual, setFechaActual] = useState(new Date().toISOString().split('T')[0]);
  const [resultado, setResultado] = useState<{ total: number; dias: number; ingresoDiario: number } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const dias = dias360(fechaLiquidacion, fechaActual);
    const diario = Number(ingreso) / 30;
    setResultado({ total: dias * diario, dias, ingresoDiario: diario });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-red-900/20 border border-red-800/40 rounded-lg p-3 text-xs text-red-300">
        <strong>Sanción moratoria</strong> (art. 65 CST): por cada día de retardo en el pago de la liquidación,
        el empleador debe pagar un día de salario.<br />
        • Aplica desde el día siguiente a la terminación del contrato hasta la fecha de pago efectivo.
      </div>
      <InputField label="Ingreso Mensual (COP)" value={ingreso} onChange={setIngreso} placeholder="ej: 1300000" />
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Fecha de Liquidación (terminación)" value={fechaLiquidacion} onChange={setFechaLiquidacion} type="date" />
        <InputField label="Fecha Actual / Pago" value={fechaActual} onChange={setFechaActual} type="date" />
      </div>
      <button type="submit"
        className="w-full bg-red-600 hover:bg-red-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Sanción Moratoria
      </button>
      {resultado ? (
        <div className="mt-6 bg-gradient-to-br from-[#2a0f0f] to-[#0d1626] border border-red-500/30 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-1">Total Sanción Moratoria</p>
          <p className="text-4xl font-bold text-white tabular-nums mb-6">{cop(resultado.total)}</p>
          <div className="space-y-2 text-sm border-t border-slate-700/50 pt-4">
            <p className="text-slate-300">· Días de mora: <strong>{resultado.dias}</strong></p>
            <p className="text-slate-300">· Salario diario: {cop(resultado.ingresoDiario)}</p>
            <p className="text-slate-300">· Corresponde a 1 día de salario por cada día de mora.</p>
          </div>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── Página principal ──────────────────────────────────────────────────────────

const TABS: { key: TabKey; label: string; short: string; color: string }[] = [
  { key: 'indef_lt10_gt1',  label: 'Indefinido < 10 SMMLV · > 1 año',    short: '1',  color: 'blue' },
  { key: 'indef_lt10_lte1', label: 'Indefinido < 10 SMMLV · ≤ 1 año',    short: '1A', color: 'blue' },
  { key: 'indef_gte10_gt1', label: 'Indefinido ≥ 10 SMMLV · > 1 año',    short: '2',  color: 'purple' },
  { key: 'indef_gte10_lte1',label: 'Indefinido ≥ 10 SMMLV · ≤ 1 año',   short: '2A', color: 'purple' },
  { key: 'fijo',            label: 'Término Fijo / Obra-Labor',            short: '3',  color: 'amber' },
  { key: 'moratoria',       label: 'Sanción Moratoria',                    short: 'SM', color: 'red' },
];

export default function LaboralAdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('indef_lt10_gt1');

  const colorMap: Record<string, string> = {
    blue:   'border-blue-500 bg-blue-600 text-white',
    purple: 'border-purple-500 bg-purple-600 text-white',
    amber:  'border-amber-500 bg-amber-600 text-white',
    red:    'border-red-500 bg-red-600 text-white',
  };
  const inactiveColor = 'border-slate-700 bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800';

  return (
    <AdminShell>
      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">Calculadora Laboral</h1>
          <p className="text-sm text-slate-400 mt-1">
            Indemnización por despido sin justa causa — <span className="text-slate-300 font-medium">Ley 789 de 2002 · Art. 64 y 65 CST</span>
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {TABS.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={[
                  'flex flex-col items-start text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-all',
                  active ? colorMap[tab.color] : inactiveColor,
                ].join(' ')}
              >
                <span className="font-bold text-base leading-none mb-1">{tab.short}</span>
                <span className="leading-tight opacity-90">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Panel activo */}
        <div className="bg-[#111f35] border border-[#1e3a6e]/50 rounded-xl p-6 shadow-lg">
          {activeTab === 'indef_lt10_gt1'  && <Calc1 />}
          {activeTab === 'indef_lt10_lte1' && <Calc1A />}
          {activeTab === 'indef_gte10_gt1' && <Calc2 />}
          {activeTab === 'indef_gte10_lte1'&& <Calc2A />}
          {activeTab === 'fijo'            && <Calc3 />}
          {activeTab === 'moratoria'       && <CalcMoratoria />}
        </div>

        <p className="text-xs text-slate-600 text-center mt-6">
          *Aplica para trabajadores que ingresaron después del 27 de diciembre de 1992. Herramienta de uso interno — Castellanos Abogados.
        </p>
      </div>
    </AdminShell>
  );
}
