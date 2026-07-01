'use client';

import { useEffect, useRef, useState } from 'react';

const WA_NUMBER = '573148309306';
const STORAGE_KEY = 'ca_mktpopup_shown';
const DELAY_MS = 5000;

const WA_LOGO = (
  <svg viewBox="0 0 175.2 175.2" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="h-12 w-12">
    <circle cx="87.6" cy="87.6" r="87.6" fill="#25D366" />
    <path
      d="M87.6 26.4C53.8 26.4 26.4 53.8 26.4 87.6c0 10.7 2.8 20.8 7.8 29.6L26 149.2l33-8.1c8.5 4.6 18.2 7.2 28.6 7.2 33.8 0 61.2-27.4 61.2-61.2S121.4 26.4 87.6 26.4z"
      fill="#fff"
    />
    <path
      d="M122.3 103.7c-1.7-.9-10.2-5-11.8-5.6-1.6-.6-2.7-.9-3.9.9-1.1 1.7-4.5 5.6-5.5 6.8-1 1.1-2 1.3-3.7.4-1.7-.9-7.1-2.6-13.5-8.3-5-4.5-8.3-10-9.3-11.7-1-1.7-.1-2.6.7-3.5.8-.8 1.7-2 2.6-3 .9-1 1.1-1.7.7-2.8-.4-1.1-3.9-9.4-5.3-12.8-1.4-3.4-2.8-2.9-3.9-2.9h-3.3c-1.1 0-3 .4-4.6 2.1-1.6 1.7-6 5.9-6 14.3s6.2 16.6 7 17.7c.9 1.1 12.2 18.6 29.5 26.1 4.1 1.8 7.3 2.8 9.8 3.6 4.1 1.3 7.9 1.1 10.8.7 3.3-.5 10.2-4.2 11.6-8.2 1.4-4 1.4-7.5 1-8.2-.4-.6-1.5-1-3.2-1.8z"
      fill="#25D366"
    />
  </svg>
);

export default function MarketingPopup() {
  const [visible, setVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) setTimeout(() => inputRef.current?.focus(), 80);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible]);

  function close() {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  function handleOverlay(e: React.MouseEvent) {
    if (e.target === overlayRef.current) close();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) return;
    setLoading(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
    const msg = `Hola, soy ${nombre.trim()} y necesito asesoría jurídica urgente. Mi celular es ${telefono.trim()}. ¿Me pueden ayudar?`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setTimeout(() => setLoading(false), 800);
  }

  const canSubmit = nombre.trim().length >= 2 && telefono.trim().length >= 6;

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="Contacto rápido por WhatsApp"
      className="fixed inset-0 z-[300] flex items-end justify-center sm:items-center px-4 pb-6 sm:pb-0"
      style={{ background: 'rgba(10,18,35,0.65)', backdropFilter: 'blur(5px)' }}
    >
      <div
        className="relative w-full max-w-[400px] rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(160deg, #0f1c2e 0%, #0d2117 100%)',
          border: '1px solid rgba(37,211,102,0.18)',
          animation: 'fadeInUp 0.25s ease both',
        }}
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
          style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center pt-8 pb-5 px-6 text-center">
          {WA_LOGO}
          <span className="mt-4 inline-block rounded-full px-3 py-0.5 text-[0.625rem] font-bold uppercase tracking-widest"
            style={{ background: 'rgba(37,211,102,0.15)', color: '#25D366', border: '1px solid rgba(37,211,102,0.3)' }}>
            Respuesta inmediata
          </span>
          <h2 className="mt-3 text-xl font-bold text-white leading-tight max-w-[300px]">
            Tu caso tiene solución.<br />No esperes más.
          </h2>
          <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-[280px]">
            Un abogado te atenderá en este momento. Contáctanos ahora y recibe orientación jurídica de inmediato.
          </p>
        </div>

        {/* Abogados a domicilio */}
        <a
          href="/abogado-a-domicilio"
          onClick={close}
          className="mx-6 mb-4 flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-transform active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg,#7b1e2b 0%,#5c141f 100%)', boxShadow: '0 8px 24px rgba(123,30,43,0.35)' }}
        >
          <span className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" className="h-5 w-5 shrink-0" aria-hidden>
              <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 9.5V21h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.5 21v-6h5v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="leading-tight">
              <span className="block text-[13px] font-bold text-white">¿Prefieres un abogado a domicilio?</span>
              <span className="block text-[11px] text-white/80">Vamos hasta la dirección que necesites</span>
            </span>
          </span>
          <span className="text-lg text-white" aria-hidden>→</span>
        </a>

        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate className="px-6 pb-7 space-y-3">
          <div className="space-y-1">
            <label htmlFor="mp-nombre" className="block text-[0.625rem] font-semibold tracking-widest uppercase text-white/40">
              Nombre completo
            </label>
            <input
              ref={inputRef}
              id="mp-nombre"
              type="text"
              autoComplete="name"
              placeholder="Tu nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              disabled={loading}
              required
              className="w-full rounded-lg px-3.5 py-2.5 text-sm bg-white/8 border border-white/12 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 focus:border-[#25D366]/50 transition-all disabled:opacity-50"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="mp-tel" className="block text-[0.625rem] font-semibold tracking-widest uppercase text-white/40">
              Número de celular
            </label>
            <input
              id="mp-tel"
              type="tel"
              autoComplete="tel"
              placeholder="Ej. 314 830 9306"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              disabled={loading}
              required
              className="w-full rounded-lg px-3.5 py-2.5 text-sm border text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 focus:border-[#25D366]/50 transition-all disabled:opacity-50"
              style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !canSubmit}
            className="mt-1 w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: canSubmit && !loading ? '#25D366' : '#1a9e4d',
              color: '#fff',
              boxShadow: canSubmit && !loading ? '0 8px 24px rgba(37,211,102,0.35)' : 'none',
            }}
          >
            {loading ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" className="opacity-25" />
                <path fill="white" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.553 4.1 1.518 5.826L.057 23.57a.5.5 0 0 0 .609.61l5.842-1.528A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.737 9.737 0 0 1-4.964-1.355l-.356-.211-3.688.965.984-3.595-.231-.369A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
            )}
            Quiero que me ayuden ahora
          </button>

          <p className="text-center text-[0.6rem] text-white/25 leading-relaxed pt-1">
            Confidencial · Sin compromiso · Respondemos en minutos
          </p>
        </form>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
