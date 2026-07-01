// Generates photographic images for the Japandi vs Scandinavian vs Wabi-Sabi article
// via Gemini's Imagen 3 API. Reads GEMINI_API_KEY from .env (never hardcoded).
//
// Outputs:
//   assets/img/journal-covers/japandi-vs-scandinavian-vs-wabi-sabi-cover.jpg  (photo cover, replaces brand-graphic)
//   assets/img/articles/vs-scandinavian-room.jpg  (representative Scandi room)
//   assets/img/articles/vs-japandi-room.jpg       (representative Japandi room)
//   assets/img/articles/vs-wabi-sabi-room.jpg     (representative wabi-sabi room)
//
// Run:  node _article-image-gen.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ── load .env ────────────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) throw new Error('.env not found in project root');
  const txt = fs.readFileSync(envPath, 'utf8');
  const map = {};
  for (const line of txt.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m) map[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return map;
}

const env = loadEnv();
const KEY = env.GEMINI_API_KEY;
if (!KEY) throw new Error('GEMINI_API_KEY missing from .env');

// ── prompts ─────────────────────────────────────────────────────────────────
const PROMPTS = [
  {
    slug: 'japandi-vs-scandinavian-vs-wabi-sabi-cover',
    outDir: 'assets/img/journal-covers',
    aspectRatio: '3:4',           // portrait, Pinterest-friendly
    prompt: `A single wide editorial interior photograph showing three adjacent living-room vignettes side by side, separated by faint vertical lines — like a three-panel comparison in an interior design magazine.

LEFT PANEL — Scandinavian: bright white plaster wall, pale ash wood floor, a cream boucle armchair with a sheepskin throw, a small painted-white side table with a soft-sage ceramic vase, a woven rattan basket, a candle. Bright, cosy, hygge.

MIDDLE PANEL — Japandi: warm off-white plaster wall, medium oak wood floor, a low oat-linen sofa with two boucle pillows and one cable-knit throw over one arm, a solid oak round coffee table with a hand-thrown stoneware bowl and a single dried eucalyptus branch, a small terracotta accent, a paper-shade floor lamp. Calm, warm, considered, asymmetric composition.

RIGHT PANEL — Wabi-Sabi: raw lime-washed plaster wall, aged dark-wood floor, a single low weathered oak bench with a folded aged linen cloth on it, one large hand-thrown cracked ceramic vessel with kintsugi gold repair, an aged brass single-candle holder. Sparse, quiet, contemplative, deliberately incomplete.

Soft directional natural window light from camera-left in every panel. Warm desaturated colour grade throughout, Kinfolk magazine aesthetic. No people, no faces, no text overlays, no logos, no visible electronics or plastic. Editorial fine-art interior photography.`
  },
  {
    slug: 'vs-scandinavian-room',
    outDir: 'assets/img/articles',
    aspectRatio: '16:9',
    prompt: `Editorial interior photograph of a Scandinavian living room in Copenhagen or Stockholm style. Bright pure white plaster walls, pale beech or ash wood floor. A cream boucle sofa with a natural sheepskin throw and three or four soft pastel cushions in oat, dusty rose, and pale sage. A small painted-white round coffee table with two lit candles in glass holders and a small stack of books. A woven rattan basket beside the sofa holding folded wool blankets. A single delicate painted ceramic vase with dried grasses. Warm natural morning light streaming from a large window on the left. Hygge, cosy, warm-but-bright. Multiple soft objects visible — Scandinavian layering. No people, no faces, no text, no electronics. Kinfolk magazine editorial aesthetic. Warm desaturated colour grade.`
  },
  {
    slug: 'vs-japandi-room',
    outDir: 'assets/img/articles',
    aspectRatio: '16:9',
    prompt: `Editorial interior photograph of a Japandi living room. Warm off-white plaster walls (not bright white), medium honey oak wood floor. A low oat-linen sofa with exactly two boucle pillows and one heavy cream cable-knit wool throw draped diagonally over one arm. A solid oak round coffee table with a single hand-thrown speckled stoneware bowl and a single dried eucalyptus branch. A pale oak paper-shade floor lamp in the corner. A single small terracotta ceramic vessel as the only colour accent. One framed sumi-e ink brushstroke print asymmetrically hung on the wall. Asymmetric composition, negative space visible. Soft directional natural window light from camera-left. Calm, warm, considered, quiet. No people, no faces, no text, no electronics, no plastic. Kinfolk and Cereal magazine editorial aesthetic. Warm desaturated colour grade.`
  },
  {
    slug: 'vs-wabi-sabi-room',
    outDir: 'assets/img/articles',
    aspectRatio: '16:9',
    prompt: `Editorial interior photograph of a wabi-sabi Japanese-style living space. Raw lime-washed plaster wall with visible texture and imperfect patches. Aged dark-wood floor, weathered. A single low weathered oak bench with one folded aged natural linen cloth on it. One large hand-thrown ceramic vessel with a visible crack repaired in gold (kintsugi). A single small aged brass candle holder with one unlit candle. Almost nothing else in the frame — deliberate emptiness, negative space as the composition. Soft golden hour side light coming from camera-left creating long shadows across the plaster. Sparse, quiet, contemplative. No people, no faces, no text, no electronics, no plastic, no bright colours. Wabi-sabi Japanese editorial photography, natural imperfect aged materials, Kinfolk aesthetic. Warm desaturated colour grade with hint of gold from the light.`
  },
];

// ── call Imagen 3 ───────────────────────────────────────────────────────────
async function generateImage(promptObj) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${KEY}`;
  const body = {
    instances: [{ prompt: promptObj.prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: promptObj.aspectRatio,
      personGeneration: 'dont_allow',
    },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Imagen 3 API ${res.status}: ${text.slice(0, 400)}`);
  }
  const data = JSON.parse(text);
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`No image in response: ${text.slice(0, 400)}`);
  return Buffer.from(b64, 'base64');
}

// ── main ────────────────────────────────────────────────────────────────────
(async () => {
  console.log(`Generating ${PROMPTS.length} images via Imagen 3...`);
  for (const p of PROMPTS) {
    process.stdout.write(`  • ${p.slug} (${p.aspectRatio})... `);
    try {
      const rawBuf = await generateImage(p);
      const outDir = path.join(__dirname, p.outDir);
      fs.mkdirSync(outDir, { recursive: true });
      const outPath = path.join(outDir, `${p.slug}.jpg`);
      // Reprocess through sharp to ensure clean JPEG + apply mild sharpening
      await sharp(rawBuf)
        .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toFile(outPath);
      const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
      console.log(`✓ ${kb}kb → ${p.outDir}/${p.slug}.jpg`);
    } catch (e) {
      console.log(`✗ ${e.message}`);
    }
  }
  console.log('\nDone.');
})().catch((e) => { console.error(e); process.exit(1); });
