import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 401 });
  return NextResponse.json({ ok: true, email: admin.user.email });
}
