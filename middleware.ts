import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;
  const isClientPath = pathname.startsWith('/cliente') || pathname.startsWith('/portal') || pathname.startsWith('/panel');
  const isClientPublic = pathname === '/cliente/login' || pathname === '/cliente/registro' || pathname === '/cliente/acceso';

  if (!session) {
    if (isClientPath && !isClientPublic) {
      return NextResponse.redirect(new URL('/cliente/login', request.url));
    }
    return response;
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/cliente/:path*', '/portal/:path*', '/panel/:path*'],
};
