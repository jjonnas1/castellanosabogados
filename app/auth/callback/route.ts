import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

function appUrl(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const intent = requestUrl.searchParams.get('intent');
  const supabase = createRouteHandlerClient({ cookies });

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL('/login', appUrl(request)));
  }

  await supabase.from('profiles').upsert(
    {
      id: session.user.id,
      email: session.user.email,
      full_name: session.user.user_metadata?.full_name ?? '',
    },
    { onConflict: 'id', ignoreDuplicates: true },
  );

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();

  if (intent === 'admin' && profile?.role !== 'admin') {
    return NextResponse.redirect(new URL('/login?error=admin_required', appUrl(request)));
  }

  if (profile?.role === 'admin') {
    return NextResponse.redirect(new URL('/admin', appUrl(request)));
  }

  if (profile?.role === 'client') {
    return NextResponse.redirect(new URL('/portal', appUrl(request)));
  }

  return NextResponse.redirect(new URL('/login?error=no_role', appUrl(request)));
}
