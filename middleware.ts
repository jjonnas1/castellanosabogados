import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res: response });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  if (!session) {
    if (pathname.startsWith('/admin') || pathname.startsWith('/portal')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
  }

  if (pathname.startsWith('/admin')) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/login?error=admin_required', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
};
