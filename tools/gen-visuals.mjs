// Calm & Oak — editorial image generator (Gemini / Imagen via AI Studio key)
// Runs on Cameron's machine (sandbox is firewalled from Google's API).
// Reads GEMINI_API_KEY from ../.env, auto-discovers an available image model,
// generates each image in visuals-manifest.json, writes JPEGs to
//   ../assets/img/journal-covers/gen/.
//
// COMPLIANCE: editorial / lifestyle / room-scene imagery and our OWN prints ONLY.
// NEVER use this to fabricate a photo of a specific affiliate product.
//
// Usage: double-click generate-all-images.bat (or: node tools/gen-visuals.mjs)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "assets", "img", "journal-covers", "gen");
const BASE = "https://generativelanguage.googleapis.com/v1beta";

function readEnv(k) {
  try {
    const env = fs.readFileSync(path.join(ROOT, ".env"), "utf8");
    const m = env.match(new RegExp("^\\s*" + k + "\\s*=\\s*(.+)\\s*$", "m"));
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : null;
  } catch { return null; }
}
const KEY = readEnv("GEMINI_API_KEY") || process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("\n  X No GEMINI_API_KEY found in .env. Get one at https://aistudio.google.com/app/apikey\n");
  process.exit(1);
}

const STYLE = " — Japandi interior aesthetic, warm off-white and natural oak, soft diffused daylight, calm and minimal, muted earthy palette, fine-art editorial interior photography, shallow depth of field, highly detailed, photorealistic, no text, no watermark, no logos, no visible human faces.";

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, "visuals-manifest.json"), "utf8"));
fs.mkdirSync(OUT, { recursive: true });

// --- discover an available image model ---
async function discover() {
  const r = await fetch(`${BASE}/models?key=${KEY}&pageSize=200`);
  if (!r.ok) { console.error("  X could not list models:", r.status, (await r.text()).slice(0,200)); return null; }
  const j = await r.json();
  const models = j.models || [];
  const has = (m, meth) => (m.supportedGenerationMethods || []).includes(meth);
  // Prefer Imagen via predict (lets us request JPEG output directly), newest first
  const imagen = models
    .filter(m => /imagen/i.test(m.name) && has(m, "predict"))
    .sort((a,b) => b.name.localeCompare(a.name));
  if (imagen.length) return { kind: "imagen", model: imagen[0].name.replace(/^models\//,"") };
  // Fall back to a Gemini native image model via generateContent
  const gem = models
    .filter(m => /image/i.test(m.name) && has(m, "generateContent"))
    .sort((a,b) => b.name.localeCompare(a.name));
  if (gem.length) return { kind: "gemini", model: gem[0].name.replace(/^models\//,"") };
  console.error("  X no image-capable model available on this key.");
  console.error("    Models seen:", models.map(m=>m.name.replace(/^models\//,"")).join(", "));
  return null;
}

async function genImagen(model, item) {
  const url = `${BASE}/models/${model}:predict?key=${KEY}`;
  const body = { instances: [{ prompt: item.prompt + STYLE }],
    parameters: { sampleCount: 1, aspectRatio: item.ratio || "4:3", outputMimeType: "image/jpeg" } };
  const r = await fetch(url, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
  if (!r.ok) return { err: `${r.status} ${(await r.text()).slice(0,160)}` };
  const j = await r.json();
  const b64 = j?.predictions?.[0]?.bytesBase64Encoded;
  return b64 ? { buf: Buffer.from(b64, "base64") } : { err: "no image in response" };
}

async function genGemini(model, item) {
  const url = `${BASE}/models/${model}:generateContent?key=${KEY}`;
  const body = { contents: [{ parts: [{ text: "Generate a 4:3 landscape image. " + item.prompt + STYLE }] }],
    generationConfig: { responseModalities: ["IMAGE"] } };
  const r = await fetch(url, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
  if (!r.ok) return { err: `${r.status} ${(await r.text()).slice(0,160)}` };
  const j = await r.json();
  const part = j?.candidates?.[0]?.content?.parts?.find(p => p.inlineData?.data);
  return part ? { buf: Buffer.from(part.inlineData.data, "base64") } : { err: "no image in response" };
}

const picked = await discover();
if (!picked) process.exit(1);
console.log(`\nUsing ${picked.kind} model: ${picked.model}`);
console.log(`Generating ${manifest.length} editorial images -> assets/img/journal-covers/gen/\n`);

let ok = 0, fail = 0;
for (const item of manifest) {
  const dest = path.join(OUT, item.file);
  if (fs.existsSync(dest) && !process.env.FORCE) { console.log("  . skip (exists):", item.file); continue; }
  const res = picked.kind === "imagen" ? await genImagen(picked.model, item) : await genGemini(picked.model, item);
  if (res.err) { console.error("  X", item.file, res.err); fail++; continue; }
  if (res.buf.length < 2000) { console.error("  X", item.file, "image too small"); fail++; continue; }
  fs.writeFileSync(dest, res.buf);
  console.log("  ok", item.file, `(${Math.round(res.buf.length/1024)} KB)`);
  ok++;
}
console.log(`\nDone. ${ok} generated, ${fail} failed. Re-run with FORCE=1 to overwrite.\n`);
