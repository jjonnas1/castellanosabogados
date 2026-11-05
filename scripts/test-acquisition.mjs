import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { z } from 'zod';

function load(file, dependencies = {}, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(code, { exports, console: { error() {} }, URL, process: { env: {} }, require: name => {
    assert.ok(name in dependencies, `Unexpected dependency: ${name}`); return dependencies[name];
  }, ...globals }, { filename: file });
  return exports;
}

const events = [];
const tracking = load('lib/conversionTracking.ts', {}, { window: { gtag: (...args) => events.push(args) } });
tracking.trackConversion('whatsapp', { page_path: '/servicios/familia' });
assert.equal(events.filter(e => e[1] === 'conversion').length, 0, 'A WhatsApp click must not count as an Ads conversion');
tracking.trackWhatsAppLeadRegistered('server-lead-1', '/servicios/familia');
tracking.trackWhatsAppLeadRegistered('server-lead-1', '/servicios/familia');
assert.equal(events.filter(e => e[1] === 'generate_lead').length, 1);
assert.equal(events.filter(e => e[1] === 'conversion').length, 1);
assert.equal(events.find(e => e[1] === 'conversion')[2].transaction_id, 'server-lead-1');
tracking.trackWhatsAppLeadRegistered('server-lead-2', '/blog/divorcio-colombia');
assert.equal(events.filter(e => e[1] === 'conversion').length, 2);
tracking.trackConversion('phone'); tracking.trackConversion('form');
assert.equal(events.filter(e => e[1] === 'conversion').length, 2, 'Placeholder Ads labels must stay inactive');
assert.ok(events.every(e => !('nombre' in (e[2] ?? {})) && !('telefono' in (e[2] ?? {}))));
load('lib/conversionTracking.ts').trackWhatsAppLeadRegistered('ssr', '/');

const insights = load('lib/leadInsights.ts');
for (const [href, text, path, expected] of [
  ['', 'Defensa penal', '/', 'Penal'],
  ['', 'Ejecución de penas', '/', 'Ejecución de penas'],
  ['https://wa.me/?text=Asesor%C3%ADa%20en%20divorcio', '', '/', 'Familia'],
  ['', 'Consultar', '/blog/pard-colombia-separacion-familiar-defensa', 'Familia'],
  ['', 'Consultar', '/visas-colombia', 'Derecho migratorio'],
  ['', 'Consultar', '/servicios/traduccion-legal', 'Traducción jurídica'],
]) assert.equal(insights.inferServiceInterest(href, text, path), expected);
assert.equal(insights.clientWhatsAppUrl('314 830 9306'), 'https://wa.me/573148309306');
assert.equal(insights.clientWhatsAppUrl('+1 202 555 0111'), 'https://wa.me/12025550111');
const summary = insights.summarizeLeads([
  { source_path: '/servicios/familia?utm_source=test', service_interest: 'Familia', status: 'convertido' },
  { source_path: '/servicios/familia', service_interest: 'Familia', status: 'contactado' },
  { source_path: '/servicios/familia', service_interest: 'Familia', status: 'nuevo' },
  { status: 'descartado' },
]);
assert.equal(summary[0].total, 3); assert.equal(summary[0].contacted, 2); assert.equal(summary[0].converted, 1);
assert.equal(summary[1].source, 'Sin origen');

async function testApi(results, expectedStatus, expectedId) {
  const inserted = [];
  const api = load('app/api/leads/whatsapp/route.ts', {
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status ?? 200 }) } },
    '@supabase/supabase-js': { createClient: () => ({ from: () => ({ insert: row => {
      inserted.push(row); return { select: () => ({ single: async () => results.shift() }) };
    } }) }) },
    zod: { z }, '@/lib/resend': { sendLeadNotificationEmail: async () => undefined },
  });
  const response = await api.POST({ json: async () => ({ nombre: 'Prueba', telefono: '3000000000', source_path: '/servicios/familia' }) });
  assert.equal(response.status, expectedStatus);
  assert.equal(response.body.lead_id, expectedId);
  return inserted;
}
await testApi([{ data: { id: 'backend-uuid' }, error: null }], 200, 'backend-uuid');
await testApi([{ data: null, error: { message: 'Unavailable' } }], 500, undefined);
await testApi([{ data: null, error: null }], 500, undefined);
const fallback = await testApi([{ data: null, error: { message: 'column source_path does not exist' } }, { data: { id: 'legacy-uuid' }, error: null }], 200, 'legacy-uuid');
assert.equal(fallback.length, 2);
assert.equal(Object.keys(fallback[1]).length, 3, 'Preserve legacy schema compatibility');

// Exercise the real modal submission: concurrent submits, failed saves, and admin links.
async function testModal(ok) {
  let submit, click, fetchCount = 0, saved = 0, navigated = 0;
  const effects = [], changes = [];
  const values = ['open', 'https://wa.me/573148309306', 'Prueba', '3000000000', '', { sourcePath: '/servicios/familia', linkText: 'consultar', serviceInterest: 'Familia' }];
  const location = { pathname: '/servicios/familia', assign() { navigated++; } };
  const jsx = (type, props) => { if (type === 'form') submit = props.onSubmit; return { type, props }; };
  const modal = load('app/components/WhatsAppLeadModal.tsx', {
    'react/jsx-runtime': { jsx, jsxs: jsx, Fragment: 'fragment' },
    react: { useState: () => [values.shift(), value => changes.push(value)], useRef: value => ({ current: value }), useEffect: effect => effects.push(effect) },
    '@/lib/conversionTracking': { trackWhatsAppLeadRegistered: () => saved++ },
    '@/lib/leadInsights': insights,
    '@/lib/contactLinks': { buildWhatsAppUrl: () => 'https://wa.me/573148309306' },
    '@/contexts/LanguageContext': { useLanguage: () => ({ t: { whatsappLead: {} }, language: 'es' }) },
  }, {
    window: { location }, document: { addEventListener: (name, handler) => { if (name === 'click') click = handler; }, removeEventListener() {} },
    fetch: async () => { fetchCount++; await Promise.resolve(); return { ok, json: async () => ({ lead_id: 'backend-id' }) }; },
  });
  modal.default(); effects[0]();
  location.pathname = '/admin/consultas';
  click({ target: null }); // Must not intercept or require a DOM target in the private workspace.
  location.pathname = '/servicios/familia';
  const event = { preventDefault() {} };
  await Promise.all([submit(event), submit(event)]);
  assert.equal(fetchCount, 1, 'Double submission must not create two leads');
  assert.equal(saved, ok ? 1 : 0); assert.equal(navigated, ok ? 1 : 0);
  if (!ok) { await submit(event); assert.equal(fetchCount, 2, 'Allow retry after failed save'); }
}
await testModal(true);
await testModal(false);
console.log('PASS: click vs saved-lead conversion, deduplication, server identifiers, API failures and legacy schema, service classification, client contact links, grouped performance. No live leads or emails created.');
