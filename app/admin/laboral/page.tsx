'use client';

import { useState } from 'react';
import AdminShell from '@/components/AdminShell';

// Lógica de cálculo de tiempo en años de 360 días (meses de 30 días)
function getDays360(startDate: string, endDate: string) {
  if (!startDate || !endDate) return 0;
  
  const d1 = new Date(startDate);
  const d2 = new Date(endDate);
  
  let d1Day = d1.getUTCDate();
  let d1Month = d1.getUTCMonth();
  let d1Year = d1.getUTCFullYear();
  
  let d2Day = d2.getUTCDate();
  let d2Month = d2.getUTCMonth();
  let d2Year = d2.getUTCFullYear();

  if (d1Day === 31) d1Day = 30;
  if (d2Day === 31) d2Day = 30;
  
  // Días laborados = (Año2 - Año1) * 360 + (Mes2 - Mes1) * 30 + (Día2 - Día1) + 1
  const days = (d2Year - d1Year) * 360 + (d2Month - d1Month) * 30 + (d2Day - d1Day) + 1;
  return Math.max(0, days);
}

export default function LaboralAdminPage() {
  const [smlmv, setSmlmv] = useState(1300000); // Default to 2024 value, can be edited
  const [contractType, setContractType] = useState<'indefinido' | 'fijo'>('indefinido');
  const [salary, setSalary] = useState(1300000);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');
  
  const [result, setResult] = useState<{ total: number; detail: string; daysWorked: number; indemnificationDays?: number } | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate || !salary) return;
    
    const daysWorked = getDays360(startDate, endDate);
    if (daysWorked <= 0) {
      alert("La fecha de terminación debe ser posterior a la fecha de inicio.");
      return;
    }

    const dailySalary = salary / 30;
    
    if (contractType === 'fijo') {
      if (!contractEndDate) {
        alert("Debe ingresar la fecha de vencimiento del contrato a término fijo.");
        return;
      }
      const daysRemaining = getDays360(endDate, contractEndDate) - 1; // Subtract 1 because the termination day is already worked
      if (daysRemaining <= 0) {
        alert("El contrato ya estaba vencido o termina el mismo día.");
        return;
      }
      
      const total = daysRemaining * dailySalary;
      setResult({
        total,
        detail: `Faltaban ${daysRemaining} días para terminar el contrato. La indemnización corresponde a los salarios por el tiempo restante.`,
        daysWorked
      });
      
    } else {
      // Indefinido
      const isLessThan10Smlmv = salary < (smlmv * 10);
      
      let baseDays = 0;
      let extraDaysPerYear = 0;
      
      if (isLessThan10Smlmv) {
        baseDays = 30;
        extraDaysPerYear = 20;
      } else {
        baseDays = 20;
        extraDaysPerYear = 15;
      }
      
      let totalIndemDays = baseDays;
      let detail = `Primer año: ${baseDays} días. `;
      
      if (daysWorked > 360) {
        const extraDays = daysWorked - 360;
        const extraIndemDays = extraDays * (extraDaysPerYear / 360);
        totalIndemDays += extraIndemDays;
        detail += `Tiempo adicional (${extraDays} días): ${extraIndemDays.toFixed(2)} días proporcionales.`;
      } else {
        detail += `El trabajador laboró menos de un año, le corresponde el primer año completo.`;
      }
      
      const total = totalIndemDays * dailySalary;
      setResult({
        total,
        detail,
        daysWorked,
        indemnificationDays: totalIndemDays
      });
    }
  };

  return (
    <AdminShell>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-100">Calculadora Laboral</h1>
          <p className="text-sm text-slate-400 mt-1">
            Indemnización por despido sin justa causa (Ley 789 de 2002).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Formulario */}
          <div className="bg-[#111f35] border border-[#1e3a6e]/50 rounded-xl p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">Datos de Liquidación</h2>
            <form onSubmit={calculate} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">SMLMV Actual (COP)</label>
                  <input 
                    type="number" 
                    value={smlmv} 
                    onChange={(e) => setSmlmv(Number(e.target.value))}
                    className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Salario Mensual (COP)</label>
                  <input 
                    type="number" 
                    value={salary} 
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Tipo de Contrato</label>
                <div className="flex bg-[#0a1120] rounded-lg p-1 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setContractType('indefinido')}
                    className={`flex-1 text-sm py-1.5 rounded-md transition-colors ${contractType === 'indefinido' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    Término Indefinido
                  </button>
                  <button
                    type="button"
                    onClick={() => setContractType('fijo')}
                    className={`flex-1 text-sm py-1.5 rounded-md transition-colors ${contractType === 'fijo' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    Término Fijo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Fecha de Inicio</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Fecha de Terminación</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {contractType === 'fijo' && (
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Fecha de Vencimiento Pactada</label>
                  <input 
                    type="date" 
                    value={contractEndDate}
                    onChange={(e) => setContractEndDate(e.target.value)}
                    className="w-full bg-[#0a1120] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    required={contractType === 'fijo'}
                  />
                </div>
              )}

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  Calcular Indemnización
                </button>
              </div>
            </form>
          </div>

          {/* Resultados */}
          <div>
            {result ? (
              <div className="bg-gradient-to-br from-[#111f35] to-[#0d1626] border border-green-500/30 rounded-xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-24 h-24 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>
                
                <h3 className="text-sm font-semibold text-green-400 uppercase tracking-widest mb-2">Total a Pagar</h3>
                <p className="text-4xl font-bold text-white tabular-nums tracking-tight">
                  {formatCurrency(result.total)}
                </p>
                
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between border-b border-slate-700/50 pb-2">
                    <span className="text-sm text-slate-400">Tiempo total laborado:</span>
                    <span className="text-sm font-medium text-slate-200">{result.daysWorked} días</span>
                  </div>
                  
                  {result.indemnificationDays !== undefined && (
                    <div className="flex justify-between border-b border-slate-700/50 pb-2">
                      <span className="text-sm text-slate-400">Días a indemnizar:</span>
                      <span className="text-sm font-medium text-slate-200">{result.indemnificationDays.toFixed(2)} días</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between border-b border-slate-700/50 pb-2">
                    <span className="text-sm text-slate-400">Base Salario Diario:</span>
                    <span className="text-sm font-medium text-slate-200">{formatCurrency(salary / 30)}</span>
                  </div>
                </div>

                <div className="mt-6 bg-[#0a1120] rounded-lg p-3 border border-slate-800">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-100">Explicación:</span> {result.detail}
                  </p>
                </div>
                
              </div>
            ) : (
              <div className="bg-[#111f35]/50 border border-slate-800 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                </div>
                <p className="text-slate-400 text-sm">Completa el formulario y presiona Calcular para ver la indemnización detallada.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </AdminShell>
  );
}
