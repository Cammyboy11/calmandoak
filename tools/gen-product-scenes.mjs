// Calm & Oak — PRODUCT-EXACT Japandi scene generator (Gemini image-editing).
// Runs on Cameron's machine (sandbox is firewalled from Google's API).
//
// Unlike gen-visuals.mjs (text-to-image editorial scenes), this feeds the REAL
// product photo (assets/img/products-cropped/p-<ASIN>.jpg) into Gemini as a
// reference image and asks it to place that IDENTICAL product into a natural
// Japandi setting. This is the "product-exact editorial scene" method.
//
// COMPLIANCE: the product must be rendered faithfully to its real photo (true
// shape/colour/proportions). The genuine /dp image still goes on the product
// CARD/thumbnail; these scenes are lifestyle context only. Keep the affiliate
// disclosure on every page.
//
// Prereq: run tools/fetch-product-images.mjs first so p-<ASIN>.jpg exist.
// Usage:  node tools/gen-product-scenes.mjs         (skips existing)
//         FORCE=1 node tools/gen-product-scenes.mjs (overwrite)
//         node tools/gen-product-scenes.mjs path/to/manifest.json

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "assets", "img", "journal-covers", "gen");
const BASE = "https://generativelanguage.googleapis.com/v1beta";

const MANIFEST = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(__dirname, "staging", "new-picks-visuals.json");

function readEnv(k) {
  try {
    const env = fs.readFileSync(path.join(ROOT, ".env"), "utf8");
    const m = env.match(new RegExp("^\\s*" + k + "\\s*=\\s*(.+)\\s*$", "m"));
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : null;
  } catch { return null; }
}
const KEY = readEnv("GEMINI_API_KEY") || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("\n  X No GEMINI_API_KEY in .env. Get one at https://aistudio.google.com/app/apikey\n");
  process.exit(1);
}

const STYLE = " Japandi interior aesthetic: warm off-white plaster, natural light-oak, linen and stoneware, soft diffused daylight, calm and minimal, muted earthy palette, generous negative space, fine-art editorial interior photography, shallow depth of field, photorealistic, absolutely no CGI/3D-render look, no text, no watermark, no logos, no human faces.";
const FIDELITY = " CRITICAL: reproduce the referenced product EXACTLY as in the supplied photo — identical shape, colour, material, proportions and details. Do not redesign, restyle or swap it. Place that same product naturally into the scene as the clear focal point, correctly scaled and lit.";

const items = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
fs.mkdirSync(OUT, { recursive: true });

function productPath(item) {
  if (item.product_ref) return path.join(ROOT, item.product_ref);
  if (item.product_asin) return path.join(ROOT, "assets", "img", "products-cropped", `p-${item.product_asin}.jpg`);
  return null;
}
function mimeFor(p) { return /\.png$/i.test(p) ? "image/png" : "image/jpeg"; }

// Discover a Gemini image model that accepts image input + returns an image.
async function discover() {
  const r = await fetch(`${BASE}/models?key=${KEY}&pageSize=200`);
  if (!r.ok) { console.error("  X could not list models:", r.status, (await r.text()).slice(0,200)); return null; }
  const j = await r.json();
  const models = (j.models || []).filter(m => (m.supportedGenerationMethods || []).includes("generateContent"));
  // Prefer nano-banana style image models, newest first.
  const img = models
    .filter(m => /image/i.test(m.name))
    .sort((a,b) => b.name.localeCompare(a.name));
  if (img.length) return img[0].name.replace(/^models\//,"");
  console.error("  X no image-capable generateContent model on this key. Seen:",
    models.map(m=>m.name.replace(/^models\//,"")).join(", "));
  return null;
}

async function gen(model, item) {
  const pp = productPath(item);
  if (!pp || !fs.existsSync(pp)) return { err: `missing product photo (${pp ? path.relative(ROOT, pp) : "no ref"}) — run fetch-product-images.mjs first` };
  const b64in = fs.readFileSync(pp).toString("base64");
  const url = `${BASE}/models/${model}:generateContent?key=${KEY}`;
  const body = {
    contents: [{
      parts: [
        { text: `Create a ${item.ratio || "4:3"} landscape lifestyle photograph. ${item.prompt}${STYLE}${FIDELITY}` },
        { inlineData: { mimeType: mimeFor(pp), data: b64in } }
      ]
    }],
    generationConfig: { responseModalities: ["IMAGE"] }
  };
  const r = await fetch(url, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
  if (!r.ok) return { err: `${r.status} ${(await r.text()).slice(0,180)}` };
  const j = await r.json();
  const part = j?.candidates?.[0]?.content?.parts?.find(p => p.inlineData?.data);
  return part ? { buf: Buffer.from(part.inlineData.data, "base64") } : { err: "no image in response" };
}

const model = await discover();
if (!model) process.exit(1);
console.log(`\nUsing image model: ${model}`);
console.log(`Rendering ${items.length} product-exact scenes -> assets/img/journal-covers/gen/`);
console.log(`Manifest: ${path.relative(ROOT, MANIFEST)}\n`);

let ok = 0, fail = 0;
for (const item of items) {
  const dest = path.join(OUT, item.file);
  if (fs.existsSync(dest) && !process.env.FORCE) { console.log("  . skip (exists):", item.file); continue; }
  const res = await gen(model, item);
  if (res.err) { console.error("  X", item.file, "-", res.err); fail++; continue; }
  if (res.buf.length < 2000) { console.error("  X", item.file, "image too small"); fail++; continue; }
  fs.writeFileSync(dest, res.buf);
  console.log("  ok", item.file, `(${Math.round(res.buf.length/1024)} KB)`);
  ok++;
}
console.log(`\nDone. ${ok} generated, ${fail} failed.`);
console.log(`Next: optimise (Pillow: resize<=1280w, JPEG q82 progressive), then wire cards + deploy.\n`);
