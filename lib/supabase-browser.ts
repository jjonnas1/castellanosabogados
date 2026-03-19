import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type SupabaseBrowserClient = ReturnType<typeof createClientComponentClient>;
export const supabase: SupabaseBrowserClient =
  typeof window === 'undefined'
    ? ({} as SupabaseBrowserClient)
    : createClientComponentClient();
