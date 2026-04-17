'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import { getProfileRoleByUserId } from '@/lib/profile-role';

/**
 * Reglas de negocio:
 * 1. Mientras la sesión está cargando → spinner, NUNCA redirigir.
 * 2. Si la sesión llega y el rol es 'admin' → ready = true.
 * 3. Solo redirigir a /admin/login si, después de 8 segundos,
 *    la sesión sigue siendo null o el rol nunca llegó como 'admin'.
 */
export function useAdminAuth() {
  const router  = useRouter();
  const [ready, setReady] = useState(false);
  const doneRef = useRef(false);   // evita múltiples llamadas a setReady/redirect

  useEffect(() => {
    let mounted = true;

    async function onSession(session: Session | null) {
      if (!mounted || doneRef.current) return;
      if (!session?.user) return;   // sesión nula → seguir esperando, NO redirigir

      try {
        const role = await getProfileRoleByUserId(session.user.id);
        if (!mounted || doneRef.current) return;

        if (role === 'admin') {
          doneRef.current = true;
          setReady(true);
        }
        // Si el rol aún no es 'admin' (error transitorio o cargando),
        // no redirigimos — dejamos que el timeout de seguridad decida.
      } catch {
        // Error de red o RLS temporal → no hacer nada, esperar
      }
    }

    // ── Verificación inmediata de sesión actual ──────────────────────────
    supabase.auth.getSession().then(({ data }) => onSession(data.session));

    // ── Escuchar refrescos de token y cambios de auth ────────────────────
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => onSession(session),
    );

    // ── Timeout de seguridad: 8 segundos sin sesión admin → login ────────
    const fallbackTimer = setTimeout(() => {
      if (!mounted || doneRef.current) return;
      doneRef.current = true;
      router.replace('/admin/login');
    }, 8000);

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ready };
}
