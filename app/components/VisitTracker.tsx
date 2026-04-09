'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

function getOrCreateVisitorKey(): string | null {
  try {
    const stored = localStorage.getItem('_vk');
    if (stored) return stored;
    const key = crypto.randomUUID();
    localStorage.setItem('_vk', key);
    return key;
  } catch {
    return null;
  }
}

export default function VisitTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // Evitar doble disparo (React Strict Mode en dev, re-renders)
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    // No registrar visitas propias: si hay sesión activa (admin o cliente),
    // se omite el registro para no contaminar las estadísticas.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) return;

      const visitorKey = getOrCreateVisitorKey();

      fetch('/api/visit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || null,
          visitor_key: visitorKey,
        }),
        keepalive: true,
      }).catch(() => {});
    });
  }, [pathname]);

  return null;
}
