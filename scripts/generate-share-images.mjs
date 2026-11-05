import sharp from 'sharp';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const outDir = path.join(publicDir, 'share');
await mkdir(outDir, { recursive: true });

const photoIds = {
  penal: 'photo-1450101499163-c8848c66ca85',
  ejecucion: 'photo-1589829545856-d10d557cf95f',
  civil: 'photo-1436450412740-6b988f486c6b',
  familia: 'photo-1517486808906-6ca8b3f04846',
  laboral: 'photo-1454165804606-c3d57bc86b40',
  administrativo: 'photo-1562564055-71e051d33c19',
  empresa: 'photo-1520607162513-77705c0f0d4a',
  formacion: 'photo-1552664730-d307ca884978',
  traduccion: 'photo-1455390582262-044cdead277a',
  migratorio: 'photo-1436491865332-7a61a109cc05',
  tutela: 'photo-1576091160399-112ba8d25d1d',
};

const photoCache = new Map();
async function photo(key) {
  if (photoCache.has(key)) return photoCache.get(key);
  let bytes;
  try {
    if (key.startsWith('/')) bytes = await readFile(path.join(publicDir, key.slice(1)));
    else {
      const response = await fetch(`https://images.unsplash.com/${photoIds[key]}?auto=format&fit=crop&w=1400&q=86`, { signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      bytes = Buffer.from(await response.arrayBuffer());
    }
  } catch (error) {
    console.warn(`Imagen ${key}: ${error.message}. Se utilizará la fotografía local.`);
    bytes = await readFile(path.join(publicDir, 'hero-despacho.jpg'));
  }
  photoCache.set(key, bytes);
  return bytes;
}

const xml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
function lines(text, max = 24) {
  const words = text.split(/\s+/);
  const result = [];
  let current = '';
  for (const word of words) {
    if (`${current} ${word}`.trim().length > max && current) { result.push(current); current = word; }
    else current = `${current} ${word}`.trim();
  }
  if (current) result.push(current);
  return result.slice(0, 4);
}

async function makeCard({ slug, eyebrow, title, detail = '', photo: photoKey = '/hero-despacho.jpg', accent = '#dbbd85' }) {
  const image = await sharp(await photo(photoKey)).resize(650, 630, { fit: 'cover', position: 'attention' }).jpeg().toBuffer();
  const titleLines = lines(title, title.length > 85 ? 25 : title.length > 60 ? 20 : 23);
  const fontSize = title.length > 85 ? 42 : title.length > 60 ? 46 : titleLines.length > 2 ? 54 : 64;
  const lineHeight = fontSize * 1.08;
  const firstY = titleLines.length > 3 ? 220 : titleLines.length > 2 ? 255 : 282;
  const titleSvg = titleLines.map((line, index) => `<text x="71" y="${firstY + index * lineHeight}" font-family="Georgia, Times New Roman, serif" font-size="${fontSize}" letter-spacing="-2" fill="#fffaf0">${xml(line)}</text>`).join('');
  const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="veil" x1="0" x2="1"><stop offset="0" stop-color="#111b2b" stop-opacity="1"/><stop offset=".46" stop-color="#111b2b" stop-opacity=".97"/><stop offset=".77" stop-color="#111b2b" stop-opacity=".65"/><stop offset="1" stop-color="#111b2b" stop-opacity=".12"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#veil)"/>
    <rect x="71" y="65" width="39" height="3" rx="2" fill="${accent}"/>
    <text x="124" y="73" font-family="Arial, sans-serif" font-weight="700" letter-spacing="3" font-size="18" fill="${accent}">${xml(eyebrow.toUpperCase())}</text>
    ${titleSvg}
    <text x="72" y="${Math.max(firstY + titleLines.length * lineHeight + 24, 508)}" font-family="Arial, sans-serif" font-size="23" fill="#e3e8ed">${xml(detail.slice(0, 63))}</text>
    <path d="M71 565H1129" stroke="#ffffff55" stroke-width="1"/>
    <text x="71" y="602" font-family="Arial, sans-serif" font-size="17" letter-spacing="2" fill="#f0d5a0">CASTELLANOS ABOGADOS</text>
    <text x="1129" y="602" text-anchor="end" font-family="Arial, sans-serif" font-size="17" fill="#dfe5e9">jonatancastellanosabogado.com</text>
  </svg>`);
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#111b2b' } })
    .composite([{ input: image, left: 550, top: 0 }, { input: svg, left: 0, top: 0 }])
    .jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(outDir, `${slug}.jpg`));
  console.log(`share/${slug}.jpg`);
}

const cards = [
  { slug: 'inicio', eyebrow: 'Firma jurídica · Pereira y Manizales', title: 'Una ruta clara para su caso', detail: 'Asesoría y representación jurídica', photo: '/hero-despacho.jpg' },
  { slug: 'nosotros', eyebrow: 'Conoce a tu abogado', title: 'Jonatan Castellanos', detail: 'Criterio jurídico y trato directo', photo: '/jonatan-castellanos-retrato-2026.jpg' },
  { slug: 'contacto', eyebrow: 'Hablemos de su caso', title: 'Contacto directo', detail: 'Pereira · Manizales · Atención virtual', photo: '/hero-despacho.jpg' },
  { slug: 'servicios', eyebrow: 'Áreas de práctica', title: 'Servicios jurídicos', detail: 'Defensa, asesoría y estrategia', photo: 'penal' },
  { slug: 'blog', eyebrow: 'Ideas para actuar mejor', title: 'Blog jurídico', detail: 'Derecho colombiano explicado con claridad', photo: 'civil' },
  { slug: 'tutela', eyebrow: 'Protección de derechos', title: 'Acción de tutela', detail: 'EPS · Salud · Derechos fundamentales', photo: 'tutela', accent: '#addec6' },
  { slug: 'abogado-a-domicilio', eyebrow: 'Atención donde la necesita', title: 'Abogados a domicilio', detail: 'Pereira y el Eje Cafetero', photo: '/hero-despacho.jpg', accent: '#ebc0b7' },
  { slug: 'visas-colombia', eyebrow: 'Atención en toda Colombia', title: 'Derecho migratorio', detail: 'Visas · Permanencia · Residencia', photo: 'migratorio', accent: '#b8d9ce' },
  { slug: 'a-quien-servimos', eyebrow: 'Personas y empresas', title: 'A quién servimos', detail: 'Una estrategia para cada situación', photo: 'familia' },
  { slug: 'trabaja', eyebrow: 'Red de profesionales', title: 'Trabaja con nosotros', detail: 'Construyamos una práctica jurídica mejor', photo: 'empresa' },
  { slug: 'como-trabajamos', eyebrow: 'Nuestra forma de actuar', title: 'Cómo trabajamos', detail: 'Diagnóstico · Estrategia · Seguimiento', photo: 'formacion' },
  { slug: 'metodologia', eyebrow: 'Cada paso importa', title: 'Metodología', detail: 'Un plan claro para cada asunto', photo: 'formacion' },
  { slug: 'asesoria-personas', eyebrow: 'Defensa penal personal', title: 'Asesoría para personas', detail: 'Acompañamiento directo del abogado', photo: 'penal' },
  { slug: 'penal-empresarial', eyebrow: 'Protección corporativa', title: 'Derecho penal empresarial', detail: 'Prevención · Defensa · Decisiones', photo: 'empresa' },
  { slug: 'herramientas', eyebrow: 'Recursos prácticos', title: 'Herramientas jurídicas', detail: 'Calcule y comprenda sus opciones', photo: 'laboral' },
  { slug: 'servicio-traduccion-legal', eyebrow: 'Documentos sin fronteras', title: 'Traducción jurídica', detail: 'Contratos · Poderes · Expedientes', photo: 'traduccion' },
  { slug: 'servicio-penal-personas', eyebrow: 'Defensa estratégica', title: 'Defensa penal', detail: 'Desde el primer momento', photo: 'penal' },
  { slug: 'servicio-ejecucion-penas', eyebrow: 'Después de la sentencia', title: 'Ejecución de penas', detail: 'Redenciones · Beneficios · Libertad', photo: 'ejecucion' },
  { slug: 'servicio-responsabilidad-penal-pj', eyebrow: 'Riesgo corporativo', title: 'Responsabilidad penal empresarial', detail: 'Prevención y defensa de empresas', photo: 'empresa' },
  { slug: 'servicio-capacitaciones-penal-pj', eyebrow: 'Formación ejecutiva', title: 'Capacitaciones empresariales', detail: 'Decisiones informadas y trazabilidad', photo: 'formacion' },
  { slug: 'servicio-civil', eyebrow: 'Patrimonio y obligaciones', title: 'Derecho civil', detail: 'Contratos · Deudas · Conflictos', photo: 'civil' },
  { slug: 'servicio-familia', eyebrow: 'Protección familiar', title: 'Derecho de familia', detail: 'Custodia · Alimentos · Divorcio', photo: 'familia' },
  { slug: 'servicio-laboral', eyebrow: 'Trabajo y prestaciones', title: 'Derecho laboral', detail: 'Contratos · Despidos · Reclamaciones', photo: 'laboral' },
  { slug: 'servicio-administrativo', eyebrow: 'Actuaciones ante el Estado', title: 'Derecho administrativo', detail: 'Recursos · Demandas · Defensa', photo: 'administrativo' },
  { slug: 'articulo-decreto-1368-2026-porte-armas', eyebrow: 'Análisis de norma', title: 'Decreto 1368 de 2026: porte de armas', detail: 'Qué cambia en Colombia', photo: 'penal' },
];

for (const card of cards) await makeCard(card);

// Una portada de artículo conserva el tema y el titular propios; no se reutiliza la tarjeta general.
const source = await readFile(path.join(root, 'app/blog/[slug]/page.tsx'), 'utf8');
const matches = [...source.matchAll(/'([^']+)':\s*\{\s*\n\s*title:\s*'([^']+)',\s*\n\s*category:\s*'([^']+)'/g)];
for (const [, slug, title, category] of matches) {
  const categoryLower = category.toLowerCase();
  const topic = /migratorio|visa/.test(categoryLower) ? 'migratorio' : /tutela|salud/.test(categoryLower) ? 'tutela' : /familia|alimento|divorcio/.test(categoryLower) ? 'familia' : /laboral/.test(categoryLower) ? 'laboral' : /civil|financiero/.test(categoryLower) ? 'civil' : /ejecuci/.test(categoryLower) ? 'ejecucion' : 'penal';
  await makeCard({ slug: `articulo-${slug}`, eyebrow: category, title: title.replace(/^¿|\?$/g, ''), detail: 'Análisis y orientación jurídica', photo: slug === 'circular-externa-007-2026-alivios-financieros' ? '/blog/circular-007-2026-alivios-financieros.png' : topic });
}

const code = await sharp(await photo('/apps/codice-app.png')).resize(257, 558, { fit: 'cover' }).png().toBuffer();
const luci = await sharp(await photo('/apps/luciernaga-poster.jpg')).resize(360, 630, { fit: 'cover' }).jpeg().toBuffer();
const appsSvg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#111b32" stop-opacity="1"/><stop offset=".59" stop-color="#26314e" stop-opacity=".96"/><stop offset="1" stop-color="#32243c" stop-opacity=".18"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/><circle cx="850" cy="285" r="320" fill="#e4bb6b" opacity=".06"/><text x="65" y="84" font-family="Arial" font-size="18" font-weight="700" letter-spacing="4" fill="#eac987">CASTELLANOS / APPS</text><text x="65" y="215" font-family="Georgia" font-size="77" fill="#fffaf0">El Códice</text><text x="65" y="306" font-family="Georgia" font-size="77" fill="#eac987">y Luzciérnaga</text><text x="67" y="380" font-family="Arial" font-size="25" fill="#e8edf5">Aprender jugando. Sentir una historia.</text><rect x="65" y="448" width="340" height="53" rx="26" fill="#f3d69a"/><text x="235" y="482" text-anchor="middle" font-family="Arial" font-size="19" font-weight="700" fill="#142039">DESCUBRE LAS DOS APPS</text><path d="M65 565H1135" stroke="#ffffff55"/><text x="65" y="602" font-family="Arial" font-size="17" letter-spacing="2" fill="#f3d69a">CASTELLANOS ABOGADOS</text></svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#111b32' } })
  .composite([{ input: luci, left: 840, top: 0 }, { input: appsSvg, left: 0, top: 0 }, { input: code, left: 735, top: 34 }])
  .jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(outDir, 'apps.jpg'));
console.log('share/apps.jpg');
