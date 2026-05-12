import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { sendLeadFollowUpDigestEmail } from '@/lib/resend';

export async function GET(req: NextRequest) {
  const secret = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseServer({ serviceRole: true });
  const now = new Date().toISOString();
  const alertWindow = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();

  const { data: leads, error } = await supabase
    .from('whatsapp_leads')
    .select('id,nombre,telefono,wa_url,source_path,service_interest,status,lead_score,urgency,follow_up_due_at,last_follow_up_alert_at')
    .eq('status', 'nuevo')
    .lte('follow_up_due_at', now)
    .or(`last_follow_up_alert_at.is.null,last_follow_up_alert_at.lt.${alertWindow}`)
    .order('lead_score', { ascending: false })
    .limit(20);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!leads?.length) return NextResponse.json({ ok: true, notified: 0 });

  await sendLeadFollowUpDigestEmail(leads);

  const ids = leads.map((lead) => lead.id);
  await supabase
    .from('whatsapp_leads')
    .update({ last_follow_up_alert_at: now })
    .in('id', ids);

  return NextResponse.json({ ok: true, notified: leads.length });
}
