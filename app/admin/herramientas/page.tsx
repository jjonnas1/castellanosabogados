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
          placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition" />
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="mt-6 bg-[#111f35]/40 border border-dashed border-slate-800 rounded-xl p-8 text-center">
      <p className="text-slate-500 text-sm">Complete los datos y presione <span className="text-cyan-400">Calcular</span>.</p>
    </div>
  );
}

// ─── 1. Conversor UVT ─────────────────────────────────────────────────────────
const UVT_VALORES: Record<number, number> = {
  2024: 47065,
  2025: 49799,
  2023: 42412,
  2022: 38004,
  2021: 36308,
};

function CalcUVT() {
  const [anio, setAnio] = useState('2025');
  const [uvts, setUvts] = useState('');
  const [pesos, setPesos] = useState('');

  const valorUVT = UVT_VALORES[Number(anio)] ?? 49799;

  return (
    <div className="space-y-4">
      <div className="bg-cyan-900/20 border border-cyan-800/40 rounded-lg p-3 text-xs text-cyan-300">
        Convierte valores entre <strong>UVT y pesos colombianos</strong> según el año fiscal (DIAN).
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Año fiscal</label>
        <select value={anio} onChange={(e) => setAnio(e.target.value)}
          className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition">
          {Object.entries(UVT_VALORES).sort((a, b) => Number(b[0]) - Number(a[0])).map(([a, v]) => (
            <option key={a} value={a}>{a} — 1 UVT = {cop(v)}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">UVTs → Pesos</label>
          <input type="number" value={uvts} onChange={(e) => setUvts(e.target.value)} placeholder="ej: 1090"
            className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition" />
          {uvts && (
            <p className="text-cyan-400 font-semibold mt-2 text-sm">{cop(Number(uvts) * valorUVT)}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Pesos → UVTs</label>
          <input type="number" value={pesos} onChange={(e) => setPesos(e.target.value)} placeholder="ej: 50000000"
            className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition" />
          {pesos && (
            <p className="text-cyan-400 font-semibold mt-2 text-sm">{(Number(pesos) / valorUVT).toFixed(2)} UVTs</p>
          )}
        </div>
      </div>
      <div className="bg-[#0a1120] rounded-lg p-3 border border-slate-800">
        <p className="text-xs text-slate-400">1 UVT ({anio}) = <strong className="text-white">{cop(valorUVT)}</strong></p>
      </div>
    </div>
  );
}

// ─── 2. Costas procesales ─────────────────────────────────────────────────────
function CalcCostas() {
  const [cuantia, setCuantia] = useState('');
  const [resultado, setResultado] = useState<{ min: number; max: number } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const c = Number(cuantia);
    // Agencias en derecho: ~5% a 15% de la cuantía según Acuerdo PSAA16-10554 CSJ
    setResultado({ min: c * 0.05, max: c * 0.15 });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-cyan-900/20 border border-cyan-800/40 rounded-lg p-3 text-xs text-cyan-300">
        Estima las agencias en derecho y costas procesales según la cuantía del proceso (Acuerdo PSAA16-10554 CSJ).<br />
        El rango es orientativo; el juez tiene discrecionalidad para fijar el monto exacto.
      </div>
      <InputField label="Cuantía del proceso (COP)" value={cuantia} onChange={setCuantia} placeholder="ej: 50000000" />
      <button type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Estimar Costas
      </button>
      {resultado ? (
        <div className="mt-6 bg-gradient-to-br from-[#0a1f2a] to-[#0d1626] border border-cyan-500/30 rounded-xl p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">Estimación de Agencias en Derecho</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a1120] rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Mínimo (5%)</p>
              <p className="text-xl font-bold text-white">{cop(resultado.min)}</p>
            </div>
            <div className="bg-[#0a1120] rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">Máximo (15%)</p>
              <p className="text-xl font-bold text-white">{cop(resultado.max)}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-4">Cuantía del proceso: {cop(Number(cuantia))}</p>
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── 3. Caducidad por tipo de acción ─────────────────────────────────────────
const CADUCIDADES = [
  { label: 'Nulidad y restablecimiento del derecho (contencioso)', meses: 48 },
  { label: 'Reparación directa (daño del Estado)', meses: 24 },
  { label: 'Contractual (contratos estatales)', meses: 24 },
  { label: 'Electoral', meses: 1 },
  { label: 'Disciplinaria (Procuraduría)', meses: 60 },
  { label: 'Acción de tutela (subsidiariedad)', meses: 0 }, // Inmediata
  { label: 'Acción popular (derechos colectivos)', meses: 0 }, // Sin caducidad formal
  { label: 'Habeas corpus', meses: 0 },
];

function CalcCaducidad() {
  const [fechaHecho, setFechaHecho] = useState('');
  const [tipoIdx, setTipoIdx] = useState(0);
  const [resultado, setResultado] = useState<{
    limite: string; diasRestantes: number; caducada: boolean; nota?: string;
  } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const tipo = CADUCIDADES[tipoIdx];
    if (tipo.meses === 0) {
      setResultado({ limite: 'Inmediata / Sin caducidad', diasRestantes: 0, caducada: false, nota: 'Esta acción no tiene término de caducidad definido en meses.' });
      return;
    }
    const inicio = new Date(fechaHecho + 'T00:00:00');
    const limite = new Date(inicio);
    limite.setMonth(limite.getMonth() + tipo.meses);
    const hoy = new Date();
    const diff = Math.floor((limite.getTime() - hoy.getTime()) / 86400000);
    setResultado({
      limite: limite.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
      diasRestantes: Math.abs(diff),
      caducada: diff < 0,
    });
  };

  return (
    <form onSubmit={calcular} className="space-y-4">
      <div className="bg-cyan-900/20 border border-cyan-800/40 rounded-lg p-3 text-xs text-cyan-300">
        Calcula la <strong>fecha de caducidad</strong> de una acción judicial contencioso-administrativa o especial.
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Tipo de acción</label>
        <select value={tipoIdx} onChange={(e) => setTipoIdx(Number(e.target.value))}
          className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition">
          {CADUCIDADES.map((c, i) => (
            <option key={i} value={i}>{c.label} {c.meses > 0 ? `(${c.meses} meses)` : '(inmediata)'}</option>
          ))}
        </select>
      </div>
      <InputField label="Fecha del hecho / conocimiento" value={fechaHecho} onChange={setFechaHecho} type="date" />
      <button type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
        Calcular Caducidad
      </button>
      {resultado ? (
        <div className={`mt-6 border rounded-xl p-6 ${resultado.caducada
          ? 'bg-gradient-to-br from-[#2a0f0f] to-[#0d1626] border-red-500/30'
          : 'bg-gradient-to-br from-[#0a1f2a] to-[#0d1626] border-cyan-500/30'}`}>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${resultado.caducada ? 'text-red-400' : 'text-cyan-400'}`}>
            {resultado.caducada ? '⚠ Acción CADUCADA' : resultado.nota ? '✓ Sin caducidad' : '✓ Acción VIGENTE'}
          </p>
          {resultado.nota
            ? <p className="text-slate-300 text-sm">{resultado.nota}</p>
            : <>
                <p className="text-2xl font-bold text-white mb-1">{resultado.limite}</p>
                <p className="text-sm text-slate-300">
                  {resultado.caducada
                    ? `Caducó hace ${resultado.diasRestantes} días.`
                    : `Restan ${resultado.diasRestantes} días.`}
                </p>
              </>
          }
        </div>
      ) : <EmptyResult />}
    </form>
  );
}

// ─── Página ────────────────────────────────────────────────────────────────────
type Tab = 'uvt' | 'costas' | 'caducidad';

const TABS: { key: Tab; label: string; short: string }[] = [
  { key: 'uvt',       label: 'Conversor UVT',           short: '1' },
  { key: 'costas',    label: 'Costas Procesales',        short: '2' },
  { key: 'caducidad', label: 'Caducidad por Acción',     short: '3' },
];

export default function HerramientasAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('uvt');

  return (
    <AdminShell>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">Herramientas Generales</h1>
          <p className="text-sm text-slate-400 mt-1">
            Conversores y calculadoras de uso transversal — <span className="text-slate-300 font-medium">DIAN · CSJ · CPACA</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {TABS.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={[
                'flex flex-col items-start text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-all',
                activeTab === tab.key
                  ? 'border-cyan-500 bg-cyan-600 text-white'
                  : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:text-slate-200 hover:bg-slate-800',
              ].join(' ')}>
              <span className="font-bold text-base leading-none mb-1">{tab.short}</span>
              <span className="leading-tight">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#111f35] border border-[#1e3a6e]/50 rounded-xl p-6 shadow-lg">
          {activeTab === 'uvt'       && <CalcUVT />}
          {activeTab === 'costas'    && <CalcCostas />}
          {activeTab === 'caducidad' && <CalcCaducidad />}
        </div>

        <p className="text-xs text-slate-600 text-center mt-6">
          *Herramienta de uso interno — Castellanos Abogados.
        </p>
      </div>
    </AdminShell>
  );
}
