import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });

  // getSession() refresca el token si está expirado y sincroniza las cookies
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  const isAdminPath    = pathname.startsWith('/admin');
  const isClientPath   = pathname.startsWith('/cliente') || pathname.startsWith('/portal') || pathname.startsWith('/panel');
  const isClientPublic = pathname === '/cliente/login' || pathname === '/cliente/registro' || pathname === '/cliente/acceso';

  // El panel admin se protege en /admin/layout.tsx, en el cliente, donde
  // Supabase puede leer la sesión real sin falsos negativos del edge.
  if (isAdminPath) {
    return response;
  }

  if (!session) {
    // Comprobación secundaria: si existe una cookie de sesión de Supabase,
    // getSession() puede haber fallado por timing en el edge (primera visita
    // a rutas no cacheadas). En ese caso dejamos pasar y el layout del cliente
    // se encarga de verificar la sesión real.
    const hasAuthCookie = request.cookies.getAll().some(
      (c) => c.name.startsWith('sb-') && c.name.includes('-auth-token')
    );

    if (!hasAuthCookie) {
      if (isClientPath && !isClientPublic) {
        return NextResponse.redirect(new URL('/cliente/login', request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/cliente/:path*', '/portal/:path*', '/panel/:path*'],
};
