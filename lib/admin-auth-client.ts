'use client';

import type { Session } from '@supabase/supabase-js';
import { getProfileRoleByUserId } from '@/lib/profile-role';

export type AdminSessionStatus = 'admin' | 'forbidden' | 'unknown';

export async function verifyAdminSession(session: Session | null): Promise<AdminSessionStatus> {
  const token = session?.access_token;
  const userId = session?.user?.id;
  if (!token || !userId) return 'unknown';

  try {
    const response = await fetch('/api/admin/me', {
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (response.ok) return 'admin';
    if (response.status === 401 || response.status === 403) return 'forbidden';
  } catch {
    // Fallback below keeps the admin usable during brief network hiccups.
  }

  try {
    const role = await getProfileRoleByUserId(userId);
    if (role === 'admin') return 'admin';
    if (role === 'client') return 'forbidden';
  } catch {
    return 'unknown';
  }

  return 'unknown';
}

export function getSafeAdminNext(defaultPath = '/admin') {
  if (typeof window === 'undefined') return defaultPath;

  const params = new URLSearchParams(window.location.search);
  const next = params.get('next');

  if (next?.startsWith('/admin') && !next.startsWith('/admin/login')) {
    return next;
  }

  return defaultPath;
}
