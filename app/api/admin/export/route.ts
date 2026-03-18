import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { getSupabaseServer, hasServiceRole, requireAdmin } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 401 });

  if (!hasServiceRole()) {
    return NextResponse.json({ ok: false, error: 'Falta SUPABASE_SERVICE_ROLE_KEY en el servidor' }, { status: 500 });
  }

  const [clientsRes, appointmentsRes, updatesRes] = await Promise.all([
    getSupabaseServer()
      .from('client_profiles')
      .select('id,full_name,email,phone,case_reference,can_access_portal,created_at')
      .order('created_at', { ascending: false }),
    getSupabaseServer()
      .from('appointments')
      .select('id,client_profile_id,title,description,start_at,end_at,status,created_at')
      .order('start_at', { ascending: true }),
    getSupabaseServer()
      .from('client_case_updates')
      .select('id,client_profile_id,title,update_text,status,visible_to_client,created_at')
      .order('created_at', { ascending: false }),
  ]);

  if (clientsRes.error || appointmentsRes.error || updatesRes.error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          clientsRes.error?.message ??
          appointmentsRes.error?.message ??
          updatesRes.error?.message ??
          'Error exportando respaldo',
      },
      { status: 500 },
    );
  }

  const clients = clientsRes.data ?? [];
  const appointments = appointmentsRes.data ?? [];
  const updates = updatesRes.data ?? [];
  const clientMap = new Map(clients.map((client) => [client.id, client.full_name]));

  const wb = XLSX.utils.book_new();

  const clientsRows = clients.map((client) => ({
    Nombre: client.full_name,
    Email: client.email,
    Teléfono: client.phone ?? '',
    'Referencia caso': client.case_reference ?? '',
    'Acceso portal': client.can_access_portal ? 'Habilitado' : 'Bloqueado',
    'Creado en': client.created_at,
  }));

  const appointmentsRows = appointments.map((appointment) => ({
    Cliente: appointment.client_profile_id ? clientMap.get(appointment.client_profile_id) ?? 'Sin cliente' : 'Sin cliente',
    Título: appointment.title,
    Descripción: appointment.description ?? '',
    Inicio: appointment.start_at,
    Fin: appointment.end_at,
    Estado: appointment.status,
    'Creado en': appointment.created_at,
  }));

  const updatesRows = updates.map((update) => ({
    Cliente: clientMap.get(update.client_profile_id) ?? 'Sin cliente',
    Título: update.title,
    Texto: update.update_text,
    Estado: update.status,
    'Visible cliente': update.visible_to_client ? 'Sí' : 'No',
    'Creado en': update.created_at,
  }));

  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(clientsRows), 'Clientes');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(appointmentsRows), 'Citas');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(updatesRows), 'Actualizaciones');

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  const filename = `castellanos-backup-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
