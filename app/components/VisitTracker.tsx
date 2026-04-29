'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

const SESSION_TTL_MS = 4 * 60 * 60 * 1000;
const VISITOR_KEY    = '_vk';
const VISIT_TS_KEY   = '_vt';
const VISIT_ID_KEY   = '_vi'; // sessionStorage — se borra al cerrar pestaña

function getOrCreateVisitorKey(): string | null {
  try {
    const stored = localStorage.getItem(VISITOR_KEY);
    if (stored) return stored;
    const key = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, key);
    return key;
  } catch { return null; }
}

function isNewSession(): boolean {
  try {
    const last = localStorage.getItem(VISIT_TS_KEY);
    if (!last) return true;
    return Date.now() - parseInt(last, 10) > SESSION_TTL_MS;
  } catch { return true; }
}

function markVisitCounted(): void {
  try { localStorage.setItem(VISIT_TS_KEY, String(Date.now())); } catch {}
}

function getVisitId(): string | null {
  try { return sessionStorage.getItem(VISIT_ID_KEY); } catch { return null; }
}

function storeVisitId(id: string): void {
  try { sessionStorage.setItem(VISIT_ID_KEY, id); } catch {}
}

function sendPageView(path: string, secs: number, visitorKey: string) {
  const body = JSON.stringify({
    path,
    duration_seconds: secs,
    visitor_key:      visitorKey,
    visit_id:         getVisitId(),
  });
  if (typeof navigator.sendBeacon === 'function') {
    navigator.sendBeacon('/api/pageview', new Blob([body], { type: 'application/json' }));
  } else {
    fetch('/api/pageview', { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true }).catch(() => {});
  }
}

function sendContactClick(type: 'whatsapp' | 'email' | 'phone', visitorKey: string) {
  fetch('/api/contact-click', {
    method:  'POST',
    headers: { 'content-type': 'application/json' },
    body:    JSON.stringify({ type, visitor_key: visitorKey, visit_id: getVisitId() }),
    keepalive: true,
  }).catch(() => {});
}

export default function VisitTracker() {
  const pathname    = usePathname();
  const visitorRef  = useRef<string | null>(null);
  const initDone    = useRef(false);

  // Registrar sesión una vez (nueva sesión cada 4 h)
  useEffect(() => {
    if (initDone.current) return;
    initDone.current = true;

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) return; // no rastrear admins / clientes autenticados

      const vk = getOrCreateVisitorKey();
      if (!vk) return;
      visitorRef.current = vk;

      if (!isNewSession()) return;

      fetch('/api/visit', {
        method:  'POST',
        headers: { 'content-type': 'application/json' },
        body:    JSON.stringify({ path: pathname, referrer: document.referrer || null, visitor_key: vk }),
        keepalive: true,
      })
        .then(r => r.ok ? r.json() : null)
        .then((res: { ok: boolean; visit_id?: string } | null) => {
          if (res?.visit_id) storeVisitId(res.visit_id);
          markVisitCounted();
        })
        .catch(() => {});
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Medir tiempo en cada página; enviar al navegar o cerrar pestaña
  useEffect(() => {
    const enteredAt   = Date.now();
    const currentPath = pathname;
    let sent          = false;

    function flush() {
      if (sent) return;
      sent = true;
      const vk   = visitorRef.current;
      if (!vk) return;
      const secs = Math.round((Date.now() - enteredAt) / 1000);
      if (secs < 1) return;
      sendPageView(currentPath, secs, vk);
    }

    function onHide() {
      if (document.visibilityState === 'hidden') flush();
    }

    document.addEventListener('visibilitychange', onHide);
    return () => {
      document.removeEventListener('visibilitychange', onHide);
      flush();
    };
  }, [pathname]);

  // Detectar clics en links de contacto (capture para actuar antes del modal WA)
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const vk = visitorRef.current;
      if (!vk) return;
      const anchor = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        sendContactClick('whatsapp', vk);
      } else if (href.startsWith('mailto:')) {
        sendContactClick('email', vk);
      } else if (href.startsWith('tel:')) {
        sendContactClick('phone', vk);
      }
    }
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
