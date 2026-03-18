import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;
  const isAdminPath = pathname.startsWith('/admin');
  const isClientPath = pathname.startsWith('/cliente') || pathname.startsWith('/portal') || pathname.startsWith('/panel');
  const isClientPublic = pathname === '/cliente/login' || pathname === '/cliente/registro' || pathname === '/cliente/acceso';

  if (!session) {
    if (isAdminPath || (isClientPath && !isClientPublic)) {
      return NextResponse.redirect(new URL('/cliente/login', request.url));
    }
    return response;
  }

  if (isAdminPath) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/cliente?error=admin_required', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/cliente/:path*', '/portal/:path*', '/panel/:path*'],
};
