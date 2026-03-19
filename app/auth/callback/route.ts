import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const intent = requestUrl.searchParams.get('intent')

  if (!code) {
    return NextResponse.redirect(
      new URL('/cliente/login?error=missing_code', requestUrl.origin)
    )
  }

  const cookieStore = await cookies()
  const supabase = createRouteHandlerClient({ cookies: async () => cookieStore })

  // Exchange the OAuth code for a real session
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

  if (exchangeError) {
    return NextResponse.redirect(
      new URL('/cliente/login?error=exchange_failed', requestUrl.origin)
    )
  }

  // Get the session that was just created
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(
      new URL('/cliente/login?error=no_session', requestUrl.origin)
    )
  }

  // Upsert profile row (safe for first-time login)
  // Do NOT set role here — database default handles it
  await supabase.from('profiles').upsert({
    id: session.user.id,
    email: session.user.email,
    full_name: session.user.user_metadata?.full_name ?? '',
  }, {
    onConflict: 'id',
    ignoreDuplicates: true
  })

  // Read role from profiles
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (intent === 'admin' && profile?.role !== 'admin') {
    return NextResponse.redirect(new URL('/admin/login?error=admin_required', requestUrl.origin))
  }

  // Route based on role
  if (profile?.role === 'admin') {
    return NextResponse.redirect(new URL('/admin', requestUrl.origin))
  }

  if (profile?.role === 'client') {
    return NextResponse.redirect(new URL('/cliente', requestUrl.origin))
  }

  // Role not assigned yet
  return NextResponse.redirect(
    new URL('/cliente/login?error=no_role', requestUrl.origin)
  )
}
