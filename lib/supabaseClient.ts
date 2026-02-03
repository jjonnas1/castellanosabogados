import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabaseConfigured = Boolean(supabaseUrl && supabaseKey)

const resolvedUrl = supabaseConfigured
  ? supabaseUrl
  : 'https://placeholder.supabase.co'
const resolvedKey = supabaseConfigured ? supabaseKey : 'public-anon-key'

export const supabase = createClient(resolvedUrl, resolvedKey)
