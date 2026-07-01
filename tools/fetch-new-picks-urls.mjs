// Calm & Oak — download the new-pick product photos straight from Amazon's
// image CDN (m.media-amazon.com), which is NOT bot-protected like the /dp pages.
// Use this for ASINs that fetch-new-picks.mjs couldn't get past the bot-check.
// Reads tools/staging/new-picks-imgurls.txt (lines: ASIN|https://.../....jpg)
// Writes assets/img/products-cropped/p-<ASIN>.jpg (genuine product image, unaltered).
// Usage: node tools/fetch-new-picks-urls.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CROP = path.join(ROOT, "assets", "img", "products-cropped");
const LIST = path.join(__dirname, "staging", "new-picks-imgurls.txt");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

fs.mkdirSync(CROP, { recursive: true });
const rows = fs.readFileSync(LIST, "utf8").split(/\r?\n/).map(s => s.trim()).filter(Boolean);
console.log(`\nDownloading ${rows.length} product photos from the image CDN -> products-cropped/\n`);

let ok = 0, fail = 0;
for (const row of rows) {
  const [asin, url] = row.split("|");
  const dest = path.join(CROP, `p-${asin}.jpg`);
  if (fs.existsSync(dest) && !process.env.FORCE) { console.log("  . skip (exists):", asin); continue; }
  try {
    let r = await fetch(url, { headers: { "User-Agent": UA, "Accept": "image/*" } });
    if (!r.ok) {  // fall back to a smaller size token if 1200 isn't available
      const alt = url.replace("_SL1200_", "_SL1000_");
      r = await fetch(alt, { headers: { "User-Agent": UA, "Accept": "image/*" } });
    }
    if (!r.ok) { console.error("  X", asin, "http", r.status); fail++; continue; }
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 2000) { console.error("  X", asin, "image too small"); fail++; continue; }
    fs.writeFileSync(dest, buf);
    console.log("  ok", asin, `(${Math.round(buf.length / 1024)} KB)`);
    ok++;
  } catch (e) { console.error("  X", asin, e.message); fail++; }
  await sleep(400);
}
console.log(`\nDone. ${ok} downloaded, ${fail} failed.\n`);
