import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/supabase-server';
import { evaluateMigration } from '@/lib/migration-engine';

export const dynamic = 'force-dynamic';
const schema = z.object({ answers: z.record(z.string().max(50), z.string().max(100)).refine(x => Object.keys(x).length <= 60) }).strict();
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request.headers.get('authorization'));
  if(!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status, headers: { 'Cache-Control':'no-store' } });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if(!parsed.success) return NextResponse.json({error:'Respuestas inválidas. Vuelva al paso anterior.'},{status:400});
  return NextResponse.json(evaluateMigration(parsed.data.answers), {headers:{'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'}});
}
