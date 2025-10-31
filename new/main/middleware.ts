import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED = [
  '/agenda',
  '/cliente/panel',
  '/panel',
  '/admin',
  '/chat',
  '/call'
]

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hasSession = req.cookies.get('sb:token') || req.cookies.get('sb-access-token')

  // Si la ruta es protegida y no hay sesión -> redirige a acceso
  if (PROTECTED.some(p => url.pathname.startsWith(p)) && !hasSession) {
    const login = new URL('/cliente/acceso', req.url)
    login.searchParams.set('next', url.pathname)
    return NextResponse.redirect(login)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/agenda/:path*',
    '/cliente/panel/:path*',
    '/panel/:path*',
    '/admin/:path*',
    '/chat/:path*',
    '/call/:path*'
  ]
}
