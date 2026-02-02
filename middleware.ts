import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (
    req.nextUrl.pathname.startsWith('/panel') ||
    req.nextUrl.pathname.startsWith('/admin') ||
    req.nextUrl.pathname.startsWith('/cliente/panel')
  ) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/panel/:path*', '/admin/:path*', '/cliente/panel/:path*'],
}
