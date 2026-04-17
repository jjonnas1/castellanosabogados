import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  // getSession() refresca el token si está expirado y actualiza las cookies en la respuesta
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  const isAdminPath   = pathname.startsWith('/admin');
  const isAdminLogin  = pathname === '/admin/login';
  const isClientPath  = pathname.startsWith('/cliente') || pathname.startsWith('/portal') || pathname.startsWith('/panel');
  const isClientPublic = pathname === '/cliente/login' || pathname === '/cliente/registro' || pathname === '/cliente/acceso';

  if (!session) {
    if (isAdminPath && !isAdminLogin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    if (isClientPath && !isClientPublic) {
      return NextResponse.redirect(new URL('/cliente/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/cliente/:path*', '/portal/:path*', '/panel/:path*'],
};
