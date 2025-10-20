'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Agenda() {
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Penal');
  const [when, setWhen] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('preintakes')
      .insert([{ email, topic, slot_ts: when }]);

    if (error) {
      if (error.message.includes('duplicate')) {
        setMessage('❌ Ese horario ya fue ocupado. Elige otro.');
      } else {
        setMessage('⚠️ Error registrando la cita. Intenta de nuevo.');
      }
    } else {
      setMessage('✅ ¡Tu cita fue agendada correctamente!');
      setEmail('');
      setTopic('Penal');
      setWhen('');
    }

    setLoading(false);
  };

  const horarios = [
    'Lunes, 21 de octubre, 9:00 a.m.',
    'Lunes, 21 de octubre, 10:40 a.m.',
    'Martes, 22 de octubre, 3:00 p.m.',
    'Miércoles, 23 de octubre, 11:00 a.m.',
    'Jueves, 24 de octubre, 4:30 p.m.',
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-lg w-full bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
          Agenda tu asesoría
        </h1>
        <p className="text-center text-slate-300 text-sm">
          Selecciona un horario disponible (lunes a viernes, 8:00 a 18:00)
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">
              Tu correo
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tucorreo@ejemplo.com"
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">
              Tema / Área
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Penal">Penal</option>
              <option value="Civil">Civil</option>
              <option value="Laboral">Laboral</option>
              <option value="Familia">Familia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">
              Horario disponible
            </label>
            <select
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              required
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Selecciona una hora</option>
              {horarios.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition rounded-xl font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 disabled:opacity-70"
          >
            {loading ? 'Agendando...' : '📅 Enviar solicitud'}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-3 font-medium ${
              message.includes('✅')
                ? 'text-green-400'
                : message.includes('❌')
                ? 'text-red-400'
                : 'text-yellow-400'
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <footer className="mt-10 text-xs text-slate-500">
        © 2025 CastellanosAbogados — Orientación legal puntual.  
        No constituye representación judicial.
      </footer>
    </main>
  );
}
