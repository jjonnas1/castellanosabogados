'use client';

import { useState, useEffect } from 'react';

const WA_URL = 'https://wa.me/573148309306?text=Hola,%20necesito%20asesor%C3%ADa%20jur%C3%ADdica%20sobre...';
const MESSAGE = 'Hola 👋 Cuéntanos tu caso — respondemos de inmediato';

export default function WhatsAppFloat() {
  const [dismissed, setDismissed] = useState(false);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    // Pequeño delay antes de empezar a escribir
    const start = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        i++;
        setDisplayed(MESSAGE.slice(0, i));
        if (i >= MESSAGE.length) clearInterval(timer);
      }, 38);
      return () => clearInterval(timer);
    }, 800);
    return () => clearTimeout(start);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {/* Burbuja clickeable */}
      {!dismissed && (
        <div className="relative">
          <button
            onClick={() => window.open(WA_URL, '_blank', 'noopener,noreferrer')}
            className="flex items-start gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-lg ring-1 ring-black/8 max-w-[230px] text-left hover:shadow-xl transition-shadow cursor-pointer"
            aria-label="Abrir WhatsApp"
          >
            <p className="text-[0.8rem] font-medium text-gray-800 leading-snug flex-1 min-h-[2.5rem]">
              {displayed}
              <span className="inline-block w-0.5 h-3.5 bg-gray-500 ml-0.5 align-middle animate-pulse" aria-hidden={displayed.length >= MESSAGE.length} style={{ opacity: displayed.length >= MESSAGE.length ? 0 : 1 }} />
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
              aria-label="Cerrar"
              className="shrink-0 mt-0.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M1 1l12 12M13 1 1 13" />
              </svg>
            </button>
          </button>
          {/* Cola de la burbuja */}
          <span
            className="absolute -bottom-2 right-5 h-3 w-3 rotate-45 bg-white ring-1 ring-black/8"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            aria-hidden
          />
        </div>
      )}

      {/* Botón flotante con latido */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-green-900/25 transition-transform hover:scale-105 sm:h-14 sm:w-14"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" aria-hidden />
        <svg viewBox="0 0 24 24" fill="white" className="relative h-6 w-6 sm:h-7 sm:w-7" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.553 4.1 1.518 5.826L.057 23.57a.5.5 0 0 0 .609.61l5.842-1.528A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.737 9.737 0 0 1-4.964-1.355l-.356-.211-3.688.965.984-3.595-.231-.369A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
      </a>
    </div>
  );
}
