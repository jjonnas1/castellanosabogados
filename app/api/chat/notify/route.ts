import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return NextResponse.json({ ok: false, error: 'RESEND_API_KEY no configurada' }, { status: 500 });

  const body = await req.json().catch(() => ({})) as { message?: string; topic?: string };
  const message = body.message ?? '(sin mensaje)';
  const topic = body.topic ?? 'No especificado';
  const time = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

  const resend = new Resend(key);
  await resend.emails.send({
    from: 'Chat web <onboarding@resend.dev>',
    to: ['jonatan@jonatancastellanosabogado.com'],
    subject: `Nuevo mensaje en el chat — ${topic}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#0f172a;margin-bottom:4px">Nuevo mensaje en el chat del sitio</h2>
        <p style="color:#64748b;font-size:13px;margin-top:0">${time} · Tema: <strong>${topic}</strong></p>
        <div style="background:#f1f5f9;border-left:4px solid #0f172a;padding:14px 16px;border-radius:4px;margin-top:12px">
          <p style="margin:0;color:#1e293b">${message}</p>
        </div>
        <p style="color:#94a3b8;font-size:12px;margin-top:16px">Este mensaje llegó desde el widget de chat de castellanosabogados.com</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
