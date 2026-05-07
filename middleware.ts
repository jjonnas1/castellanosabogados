import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Usamos @supabase/ssr (librería actual) — compatible con el resto de la app
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() es más seguro que getSession() — valida el JWT con el servidor
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isAdminPath    = pathname.startsWith('/admin');
  const isAdminLogin   = pathname === '/admin/login';
  const isClientPath   = pathname.startsWith('/cliente') || pathname.startsWith('/portal') || pathname.startsWith('/panel');
  const isClientPublic = pathname === '/cliente/login' || pathname === '/cliente/registro' || pathname === '/cliente/acceso';

  if (!user) {
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
