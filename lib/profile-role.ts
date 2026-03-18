import { supabase } from '@/lib/supabase-browser';

export type AppRole = 'admin' | 'client' | null;

export async function getProfileRoleByUserId(userId: string): Promise<AppRole> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();

  const role = profile?.role;
  if (role === 'admin' || role === 'client') return role;
  return null;
}
