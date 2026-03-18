import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

async function getRole(supabase: any) {
  const { data: byProfiles } = await supabase.from('profiles').select('role').maybeSingle();
  if (byProfiles?.role) return byProfiles.role as string;

  const { data: byUserProfiles } = await supabase.from('user_profiles').select('role').maybeSingle();
  return (byUserProfiles?.role as string | undefined) ?? null;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;

  if (path === '/admin/login') {
    return res;
  }

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (path.startsWith('/admin') || path.startsWith('/panel') || path.startsWith('/administrativo')) {
    const role = await getRole(supabase);
    if (role !== 'admin') {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  if (path.startsWith('/portal')) {
    const role = await getRole(supabase);
    if (role !== 'client' && role !== 'admin') {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/panel/:path*', '/administrativo/:path*', '/cliente/:path*', '/clientes/:path*', '/portal/:path*'],
};
