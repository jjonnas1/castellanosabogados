import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { getSupabaseServer, requireAdmin } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: 401 });

  const [clientsRes, updatesRes] = await Promise.all([
    getSupabaseServer()
      .from('client_profiles')
      .select('id,full_name,email,phone,case_reference,can_access_portal,created_at')
      .order('created_at', { ascending: false }),
    getSupabaseServer()
      .from('client_case_updates')
      .select('id,client_profile_id,title,update_text,status,visible_to_client,created_at')
      .order('created_at', { ascending: false }),
  ]);

  if (clientsRes.error || updatesRes.error) {
    return NextResponse.json(
      { ok: false, error: clientsRes.error?.message ?? updatesRes.error?.message ?? 'Error exportando respaldo' },
      { status: 500 },
    );
  }

  const clients = clientsRes.data ?? [];
  const updates = updatesRes.data ?? [];
  const clientMap = new Map(clients.map((client) => [client.id, client.full_name]));

  const workbook = new ExcelJS.Workbook();

  const clientsSheet = workbook.addWorksheet('Clientes');
  clientsSheet.columns = [
    { header: 'Nombre', key: 'full_name', width: 28 },
    { header: 'Email', key: 'email', width: 34 },
    { header: 'Teléfono', key: 'phone', width: 20 },
    { header: 'Referencia del caso', key: 'case_reference', width: 30 },
    { header: 'Estado de acceso', key: 'can_access_portal', width: 18 },
    { header: 'Fecha de creación', key: 'created_at', width: 24 },
  ];

  clients.forEach((client) => {
    clientsSheet.addRow({
      full_name: client.full_name,
      email: client.email,
      phone: client.phone ?? '',
      case_reference: client.case_reference ?? '',
      can_access_portal: client.can_access_portal ? 'Habilitado' : 'Bloqueado',
      created_at: client.created_at,
    });
  });

  const updatesSheet = workbook.addWorksheet('Actualizaciones');
  updatesSheet.columns = [
    { header: 'Cliente', key: 'client', width: 28 },
    { header: 'Título', key: 'title', width: 30 },
    { header: 'Texto', key: 'update_text', width: 60 },
    { header: 'Estado', key: 'status', width: 16 },
    { header: 'Fecha', key: 'created_at', width: 24 },
    { header: 'Visible al cliente', key: 'visible_to_client', width: 18 },
  ];

  updates.forEach((update) => {
    updatesSheet.addRow({
      client: clientMap.get(update.client_profile_id) ?? 'Sin cliente',
      title: update.title,
      update_text: update.update_text,
      status: update.status,
      created_at: update.created_at,
      visible_to_client: update.visible_to_client ? 'Sí' : 'No',
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="respaldo-castellanos-${new Date().toISOString().slice(0, 10)}.xlsx"`,
      'Cache-Control': 'no-store',
    },
  });
}
