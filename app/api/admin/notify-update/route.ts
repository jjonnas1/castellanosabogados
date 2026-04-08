import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, createSupabaseAdminClient } from '@/lib/supabase-server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const { update_id } = await req.json().catch(() => ({})) as { update_id?: string };
  if (!update_id) return NextResponse.json({ ok: false, error: 'update_id requerido' }, { status: 400 });

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return NextResponse.json({ ok: false, error: 'RESEND_API_KEY no configurada' }, { status: 500 });

  const supabase = createSupabaseAdminClient();

  const { data: update } = await supabase
    .from('client_case_updates')
    .select('title, update_text, status, client_profile_id')
    .eq('id', update_id)
    .single();

  if (!update) return NextResponse.json({ ok: false, error: 'Actualización no encontrada' }, { status: 404 });

  const { data: client } = await supabase
    .from('client_profiles')
    .select('full_name, email')
    .eq('id', update.client_profile_id)
    .single();

  if (!client?.email) return NextResponse.json({ ok: false, error: 'Cliente sin correo registrado' }, { status: 400 });

  const resend = new Resend(resendKey);

  await resend.emails.send({
    from: 'Castellanos Abogados <onboarding@resend.dev>',
    to: [client.email],
    subject: `Actualización de su proceso: ${update.title}`,
    html: `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#0f172a">Hay una actualización en su proceso</h2>
        <p>Hola${client.full_name ? ` ${client.full_name}` : ''},</p>
        <p>Le informamos que hay una novedad en su proceso:</p>
        <div style="background:#f8fafc;border-left:4px solid #0f172a;padding:16px;margin:16px 0;border-radius:4px">
          <p style="font-weight:600;margin:0 0 8px">${update.title}</p>
          <p style="margin:0;color:#475569">${update.update_text}</p>
          <p style="margin:8px 0 0;font-size:12px;color:#94a3b8">Estado: ${update.status}</p>
        </div>
        <p>Para ver todos los detalles, ingrese a su portal de clientes.</p>
        <p style="color:#64748b;font-size:13px">Castellanos Abogados</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
