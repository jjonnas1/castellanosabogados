'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { getProfileRoleByUserId } from '@/lib/profile-role';

/**
 * Espera hasta 5 segundos para que Supabase termine de cargar
 * la sesión antes de redirigir al login.
 * Si la sesión existe y el rol es 'admin', retorna ready = true.
 */
export function useAdminAuth() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    let redirectTimer: ReturnType<typeof setTimeout> | null = null;

    async function verify() {
      // Intentar obtener sesión actual
      const { data: { session } } = await supabase.auth.getSession();

      if (!mounted) return;

      if (session?.user) {
        // Sesión encontrada — verificar rol
        if (redirectTimer) clearTimeout(redirectTimer);
        try {
          const role = await getProfileRoleByUserId(session.user.id);
          if (!mounted) return;
          if (role === 'admin') {
            setReady(true);
          } else {
            // Rol confirmado como no-admin → redirigir
            router.replace('/admin/login');
          }
        } catch {
          if (!mounted) return;
          // Error de red verificando rol — esperar al evento de auth
        }
        return;
      }

      // session es null → esperar; el timer de 5s hará la redirección
      // si ningún evento de auth llega a tiempo.
    }

    // Timer de seguridad: si tras 5 s no hay sesión confirmada, redirigir
    redirectTimer = setTimeout(() => {
      if (!mounted || ready) return;
      router.replace('/admin/login');
    }, 5000);

    // 1. Verificar sesión actual
    verify();

    // 2. Escuchar cambios de auth (refresco de token, inicio de sesión)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        if (!session?.user) return; // seguir esperando (no redirigir aún)

        // Sesión llegó → cancelar timer y verificar rol
        if (redirectTimer) clearTimeout(redirectTimer);

        try {
          const role = await getProfileRoleByUserId(session.user.id);
          if (!mounted) return;
          if (role === 'admin') {
            setReady(true);
          } else {
            router.replace('/admin/login');
          }
        } catch {
          // Error transitorio — dejar que el timer decida
        }
      },
    );

    return () => {
      mounted = false;
      if (redirectTimer) clearTimeout(redirectTimer);
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ready };
}
