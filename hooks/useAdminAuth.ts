'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-browser';
import { getProfileRoleByUserId } from '@/lib/profile-role';

/**
 * Verifica que el usuario activo sea admin antes de mostrar
 * contenido protegido. Combina getSession() + onAuthStateChange()
 * para manejar correctamente los refrescos de token durante
 * navegación client-side (Next.js App Router).
 *
 * Retorna `ready = true` solo cuando el rol 'admin' está confirmado.
 * Redirige a /admin/login si no hay sesión o el rol es incorrecto.
 */
export function useAdminAuth() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    let resolved = false; // evita redirects/ready duplicados

    async function verify(session: Session | null) {
      if (!mounted || resolved) return;

      if (!session?.user) {
        resolved = true;
        router.replace('/admin/login');
        return;
      }

      try {
        const role = await getProfileRoleByUserId(session.user.id);
        if (!mounted || resolved) return;

        if (role !== 'admin') {
          resolved = true;
          router.replace('/admin/login');
          return;
        }

        resolved = true;
        setReady(true);
      } catch (err) {
        // Si la consulta de roles falla (ej. red), no redirigimos
        // para no expulsar al usuario por un error transitorio.
        console.error('[useAdminAuth] Error verificando rol:', err);
        if (!mounted || resolved) return;
        resolved = true;
        router.replace('/admin/login');
      }
    }

    // 1. Sesión actual (lectura inmediata de cookies/storage)
    supabase.auth.getSession().then(({ data }) => {
      verify(data.session);
    });

    // 2. onAuthStateChange captura refrescos de token y sign-out
    //    que ocurran DURANTE la navegación client-side.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (resolved) return;   // ya decidimos, ignorar
        verify(session);
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  return { ready };
}
