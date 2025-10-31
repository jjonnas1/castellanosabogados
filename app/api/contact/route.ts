import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    // Aquí mantén tu integración que ya tenías (Resend/Nodemailer/etc.)
    // Para demo, respondemos ok:
    return NextResponse.json({ ok: true });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message || 'fail' }, { status: 500 });
  }
}
