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
{slug: 'articulo-divorcio-unilateral-colombia', eyebrow: 'Derecho de familia', title: 'Divorcio unilateral en Colombia', detail: 'Oposición · Alimentos · Reparación', photo: '/hero-despacho.jpg'},
{slug: 'articulo-pard-colombia-separacion-familiar-defensa', eyebrow: 'Derecho de familia', title: 'PARD: protección y defensa jurídica', detail: 'Separación familiar · Pruebas · Términos', photo: '/hero-despacho.jpg'},
{slug: 'articulo-responsabilidad-penal-empresarial', eyebrow: 'Empresas y administradores', title: 'Riesgo penal y responsabilidad administrativa', detail: 'Las diferencias que debe conocer', photo: '/hero-despacho.jpg'},
{slug: 'articulo-divorcio-colombia', eyebrow: 'Derecho de familia', title: 'Divorcio en Colombia', detail: 'Mutuo acuerdo · Notaría · Vía judicial', photo: '/hero-despacho.jpg'},
{slug: 'articulo-ley-2466-2025-redenciones-pena', eyebrow: 'Ejecución de penas', title: 'Redención y cómputos de pena', detail: 'Ley 2466 de 2025 y criterio judicial', photo: '/hero-despacho.jpg'},
];
for (const card of cards) await makeCard(card);
