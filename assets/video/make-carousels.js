/* make-carousels.js — generate on-brand, save-worthy carousel slides (1080x1350) for IG + Pinterest.
   Three save-worthy formats (validated 2026-06-30): listicle, shoppable prints, palette guide.
   Output: ./_carousels/<key>/NN.png  (gitignored). Then upload each slide to Blotato and post as an
   IG carousel (mediaUrls = [slide URLs in order]) + Pinterest. See SOCIAL-VIDEO-PLAYBOOK.md.
   Run: node assets/video/make-carousels.js [rules|prints|palette|all]
*/
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const sharp = require(path.join(ROOT, 'node_modules', 'sharp'));
const PRINTS = path.join(ROOT, 'assets', 'img', 'prints');
const OUT = path.join(ROOT, '_carousels');

const C = { bg: '#F7F6F1', ink: '#23241F', muted: '#6B6F63', accent: '#B5654A', ghost: '#E5E0D6' };
const SERIF = 'Georgia, serif', SANS = 'Segoe UI, sans-serif';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const W = 1080, H = 1350;

function svgToFile(inner, file) {
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="${C.bg}"/>${inner}</svg>`;
  return sharp(Buffer.from(svg)).png().toFile(file);
}
function lines(arr, x, y, lh, attrs) { return arr.map((t, i) => `<text x="${x}" y="${y + i * lh}" ${attrs}>${esc(t)}</text>`).join(''); }
const eyebrow = (t, x = 90, y = 160) => `<text x="${x}" y="${y}" font-family="${SERIF}" font-size="28" letter-spacing="6" fill="${C.accent}">${esc(t)}</text>`;
const footer = (t = 'CALMANDOAK.COM') => `<text x="90" y="1280" font-family="${SANS}" font-size="28" letter-spacing="3" fill="${C.accent}">${esc(t)}</text>`;

// ---- carousel definitions ----
const RULES = {
  cover: { eyebrow: 'CALM & OAK', title: ['5 Japandi rules', 'nobody tells you'], sub: 'Save this for your next room.' },
  items: [
    { t: ['Leave empty space', 'on purpose.'], b: ['Negative space — ma — is the point.', 'Let the room breathe.'] },
    { t: ['Stick to two woods.'], b: ['One light, one dark — repeated.', 'Cohesion beats variety.'] },
    { t: ['Keep light warm', 'and low.'], b: ['Skip the ceiling glare. Lamps at eye', 'level, 2700K bulbs.'] },
    { t: ['Natural materials', 'only.'], b: ['Oak, linen, paper, clay, stoneware —', 'nothing pretending to be something else.'] },
    { t: ['One quiet hero', 'per wall.'], b: ['A single calm piece beats a gallery', 'wall. Let it be still.'] },
  ],
  cta: { title: ['Save this.'], sub: ['Build your calm room at', 'calmandoak.com'] },
};
const PRINTS_CAR = {
  cover: { eyebrow: 'CALM & OAK', title: ['5 calm prints', 'under $15'], sub: 'Instant downloads. Hang them today.' },
  items: [
    { slug: 'enso', name: 'Ensō', note: 'The incomplete circle' },
    { slug: 'single-stem', name: 'Single Stem', note: 'One stem, one vessel' },
    { slug: 'moon-cycle', name: 'Moon Cycle', note: 'Full, half, crescent' },
    { slug: 'eucalyptus', name: 'Eucalyptus', note: 'One continuous line' },
    { slug: 'two-woods', name: 'Two Woods', note: 'Oak and walnut, as art' },
  ],
  cta: { title: ['Shop the prints.'], sub: ['Instant downloads at', 'calmandoak.com'] },
};
const PALETTE = {
  cover: { eyebrow: 'CALM & OAK', title: ['The 5 colours of', 'a calm room'], sub: 'The Japandi palette, decoded.' },
  items: [
    { hex: '#F0EBE1', name: 'Oat', note: 'The base — warm, never stark white.' },
    { hex: '#C9BFB0', name: 'Greige', note: 'The quiet middle that ties it together.' },
    { hex: '#8C9A82', name: 'Sage', note: 'The one living accent. Used calmly.' },
    { hex: '#B5654A', name: 'Clay', note: 'Warmth — a little goes a long way.' },
    { hex: '#23241F', name: 'Sumi ink', note: 'Grounding. Never a pure black.' },
  ],
  cta: { title: ['Want the full palette?'], sub: ['Free cheat-sheet at', 'calmandoak.com'] },
};

function coverSlide(c, file) {
  const inner = eyebrow(c.eyebrow) +
    lines(c.title, 90, 540, 96, `font-family="${SERIF}" font-size="92" fill="${C.ink}"`) +
    `<text x="90" y="${540 + c.title.length * 96 + 60}" font-family="${SANS}" font-size="36" fill="${C.muted}">${esc(c.sub)}</text>` +
    `<text x="90" y="1200" font-family="${SANS}" font-size="30" fill="${C.muted}">swipe →</text>` + footer();
  return svgToFile(inner, file);
}
function ruleSlide(item, n, file) {
  const inner = eyebrow('JAPANDI RULES') +
    `<text x="80" y="470" font-family="${SERIF}" font-size="240" font-weight="600" fill="${C.ghost}">${String(n).padStart(2, '0')}</text>` +
    lines(item.t, 90, 640, 88, `font-family="${SERIF}" font-size="76" fill="${C.ink}"`) +
    lines(item.b, 90, 640 + item.t.length * 88 + 70, 48, `font-family="${SANS}" font-size="34" fill="${C.muted}"`) + footer();
  return svgToFile(inner, file);
}
function swatchSlide(item, n, file) {
  const inner = eyebrow('THE CALM PALETTE') +
    `<rect x="90" y="250" width="900" height="560" rx="18" fill="${item.hex}"/>` +
    `<text x="90" y="930" font-family="${SERIF}" font-size="76" fill="${C.ink}">${esc(item.name)}</text>` +
    `<text x="90" y="985" font-family="${SANS}" font-size="30" letter-spacing="2" fill="${C.accent}">${esc(item.hex.toUpperCase())}</text>` +
    `<text x="90" y="1055" font-family="${SANS}" font-size="34" fill="${C.muted}">${esc(item.note)}</text>` + footer();
  return svgToFile(inner, file);
}
function ctaSlide(c, file) {
  const inner = eyebrow('CALM & OAK') +
    lines(c.title, 90, 560, 92, `font-family="${SERIF}" font-size="80" fill="${C.ink}"`) +
    lines(c.sub, 90, 560 + c.title.length * 92 + 50, 48, `font-family="${SANS}" font-size="38" fill="${C.muted}"`) + footer();
  return svgToFile(inner, file);
}
async function printSlide(item, file) {
  const imgPath = path.join(PRINTS, item.slug + '.jpg');
  const art = await sharp(imgPath).resize(820, 820, { fit: 'inside' }).toBuffer();
  const meta = await sharp(art).metadata();
  const left = Math.round((W - meta.width) / 2), top = 150;
  const textSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">` +
    eyebrow('CALM & OAK') +
    `<text x="90" y="1120" font-family="${SERIF}" font-size="64" fill="${C.ink}">${esc(item.name)}</text>` +
    `<text x="90" y="1175" font-family="${SANS}" font-size="34" fill="${C.muted}">${esc(item.note)} · instant download $12</text>` +
    footer('SHOP AT CALMANDOAK.COM') + `</svg>`);
  return sharp({ create: { width: W, height: H, channels: 3, background: C.bg } })
    .composite([{ input: art, left, top }, { input: textSvg, left: 0, top: 0 }]).png().toFile(file);
}

async function build(key, def, kind) {
  const dir = path.join(OUT, key); fs.mkdirSync(dir, { recursive: true });
  let i = 0; const files = [];
  const f = () => { const p = path.join(dir, String(i).padStart(2, '0') + '.png'); files.push(p); i++; return p; };
  await coverSlide(def.cover, f());
  for (let n = 0; n < def.items.length; n++) {
    if (kind === 'rules') await ruleSlide(def.items[n], n + 1, f());
    else if (kind === 'palette') await swatchSlide(def.items[n], n + 1, f());
    else await printSlide(def.items[n], f());
  }
  await ctaSlide(def.cta, f());
  console.log(`${key}: ${files.length} slides -> _carousels/${key}/`);
}

(async () => {
  const which = process.argv[2] || 'all';
  if (which === 'rules' || which === 'all') await build('rules', RULES, 'rules');
  if (which === 'prints' || which === 'all') await build('prints', PRINTS_CAR, 'prints');
  if (which === 'palette' || which === 'all') await build('palette', PALETTE, 'palette');
  console.log('Done.');
})();
