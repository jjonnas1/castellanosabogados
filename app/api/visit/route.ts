import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function maskIp(ip: string): string {
  // IPv4 → ocultar últimos dos octetos
  const v4 = ip.match(/^(\d{1,3}\.\d{1,3})\.\d{1,3}\.\d{1,3}$/);
  if (v4) return `${v4[1]}.x.x`;
  // IPv6 → mantener solo los primeros dos grupos
  const v6parts = ip.split(':');
  return v6parts.slice(0, 2).join(':') + ':x:x:x:x:x:x';
}

function getClientIp(req: NextRequest): string | null {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    null
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as {
      path?: unknown;
      referrer?: unknown;
      visitor_key?: unknown;
    } | null;

    const path = typeof body?.path === 'string' ? body.path.slice(0, 500) : null;
    if (!path) return NextResponse.json({ ok: false }, { status: 400 });

    const ip = getClientIp(req);
    const ip_hash = ip ? await hashIp(ip) : null;
    const ip_masked = ip ? maskIp(ip) : null;

    const supabase = getSupabaseServer({ serviceRole: true });
    await supabase.from('site_visits').insert({
      path,
      referrer:       typeof body?.referrer    === 'string' ? body.referrer.slice(0, 1000)    : null,
      visitor_key:    typeof body?.visitor_key === 'string' ? body.visitor_key.slice(0, 100)  : null,
      user_agent:     req.headers.get('user-agent')?.slice(0, 500)    ?? null,
      ip_hash,
      ip_masked,
      country:        req.headers.get('x-vercel-ip-country')         ?? null,
      region:         req.headers.get('x-vercel-ip-region')          ?? null,
      city:           req.headers.get('x-vercel-ip-city')            ?? null,
      is_admin_visit: path.startsWith('/admin'),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
