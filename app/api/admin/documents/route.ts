import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer, requireAdmin } from '@/lib/supabase-server';

type DocumentRow = {
  id: string;
  client_profile_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  file_size: number | null;
  uploaded_by_admin_id: string | null;
  visible_to_client: boolean;
  created_at: string;
};

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const clientProfileId = req.nextUrl.searchParams.get('client_profile_id');
  if (!clientProfileId) {
    return NextResponse.json({ ok: false, error: 'client_profile_id es requerido' }, { status: 400 });
  }

  const supabase = getSupabaseServer({ serviceRole: true });
  const { data, error } = await supabase
    .from('client_documents')
    .select('*')
    .eq('client_profile_id', clientProfileId)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, documents: (data ?? []) as DocumentRow[] });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const form = await req.formData();
  const clientProfileId = String(form.get('client_profile_id') ?? '').trim();
  const file = form.get('file');

  if (!clientProfileId) return NextResponse.json({ ok: false, error: 'client_profile_id es requerido' }, { status: 400 });
  if (!(file instanceof File)) return NextResponse.json({ ok: false, error: 'Archivo requerido' }, { status: 400 });

  const supabase = getSupabaseServer({ serviceRole: true });
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `clients/${clientProfileId}/${Date.now()}-${safeName}`;
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from('client-documents')
    .upload(storagePath, fileBuffer, { contentType: file.type || 'application/octet-stream', upsert: false });

  if (uploadError) return NextResponse.json({ ok: false, error: uploadError.message }, { status: 500 });

  const { data, error } = await supabase
    .from('client_documents')
    .insert({
      client_profile_id: clientProfileId,
      file_name: file.name,
      storage_path: storagePath,
      mime_type: file.type || null,
      file_size: file.size,
      uploaded_by_admin_id: admin.user.id,
      visible_to_client: true,
    })
    .select('*')
    .maybeSingle();

  if (error) {
    await supabase.storage.from('client-documents').remove([storagePath]);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, document: data as DocumentRow });
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const body = (await req.json().catch(() => null)) as { id?: string; visible_to_client?: boolean } | null;
  if (!body?.id || typeof body.visible_to_client !== 'boolean') {
    return NextResponse.json({ ok: false, error: 'id y visible_to_client son requeridos' }, { status: 400 });
  }

  const supabase = getSupabaseServer({ serviceRole: true });
  const { data, error } = await supabase
    .from('client_documents')
    .update({ visible_to_client: body.visible_to_client })
    .eq('id', body.id)
    .select('*')
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, document: data as DocumentRow });
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdmin(req.headers.get('authorization'));
  if (!admin.ok) return NextResponse.json({ ok: false, error: admin.error }, { status: admin.status });

  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ ok: false, error: 'id es requerido' }, { status: 400 });

  const supabase = getSupabaseServer({ serviceRole: true });

  const { data: doc, error: getError } = await supabase
    .from('client_documents')
    .select('id,storage_path')
    .eq('id', body.id)
    .maybeSingle();

  if (getError || !doc) {
    return NextResponse.json({ ok: false, error: getError?.message ?? 'Documento no encontrado' }, { status: 404 });
  }

  const { error: storageError } = await supabase.storage.from('client-documents').remove([doc.storage_path]);
  if (storageError) return NextResponse.json({ ok: false, error: storageError.message }, { status: 500 });

  const { error: dbError } = await supabase.from('client_documents').delete().eq('id', body.id);
  if (dbError) return NextResponse.json({ ok: false, error: dbError.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
