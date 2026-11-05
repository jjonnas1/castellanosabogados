export function inferServiceInterest(href: string, text: string, path = '') {
  let decoded = href;
  try { decoded = decodeURIComponent(href); } catch { /* Preserve malformed external URLs. */ }
  const value = `${decoded} ${text} ${path}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (/ejecucion|redencion|\bpenas?\b|libertad condicional/.test(value)) return 'Ejecución de penas';
  if (/penal|captur|imput/.test(value)) return 'Penal';
  if (/familia|alimento|custodia|divorcio|\bpard\b/.test(value)) return 'Familia';
  if (/migratori|\bvisas?\b|residencia/.test(value)) return 'Derecho migratorio';
  if (/traduccion|traducir/.test(value)) return 'Traducción jurídica';
  if (/civil|arrend|prescrip|deuda/.test(value)) return 'Civil';
  if (/laboral|liquidaci|trabajo/.test(value)) return 'Laboral';
  if (/administrativo|caducidad|\buvt\b|costas/.test(value)) return 'Administrativo';
  if (/tutela/.test(value)) return 'Tutela';
  return 'Consulta general';
}

type Lead = { source_path?: string | null; service_interest?: string | null; status?: string | null };

export function summarizeLeads(leads: Lead[]) {
  const groups = new Map<string, { source: string; service: string; total: number; contacted: number; converted: number }>();
  for (const lead of leads) {
    const source = (lead.source_path || 'Sin origen').split('?')[0];
    const service = lead.service_interest || 'Sin servicio';
    const key = JSON.stringify([source, service]);
    const group = groups.get(key) ?? { source, service, total: 0, contacted: 0, converted: 0 };
    group.total++;
    if (lead.status === 'contactado' || lead.status === 'convertido') group.contacted++;
    if (lead.status === 'convertido') group.converted++;
    groups.set(key, group);
  }
  return [...groups.values()].sort((a, b) => b.converted - a.converted || b.total - a.total);
}

export function clientWhatsAppUrl(phone: string) {
  const digits = phone.replace(/\D/g, '');
  const international = digits.length === 10 ? `57${digits}` : digits.replace(/^00/, '');
  return `https://wa.me/${international}`;
}
