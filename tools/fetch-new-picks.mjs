// Calm & Oak — fetch REAL product photos for the staged new picks.
// Reads tools/staging/new-picks-asins.txt and downloads each product's genuine
// /dp image to assets/img/products-cropped/p-<ASIN>.jpg (never fabricated/altered).
// Runs on Cameron's machine (sandbox is firewalled from Amazon).
// Usage: node tools/fetch-new-picks.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CROP = path.join(ROOT, "assets", "img", "products-cropped");
const LIST = path.join(__dirname, "staging", "new-picks-asins.txt");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";

function pickImageUrl(htmlStr) {
  const pats = [
    /"hiRes":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+?\.jpg)"/,
    /data-old-hires="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+?\.jpg)"/,
    /"large":"(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+?\.jpg)"/,
    /<meta property="og:image" content="(https:\/\/[^"]+?\.jpg)"/,
  ];
  for (const p of pats) { const m = htmlStr.match(p); if (m) return m[1].replace(/\\u002F/g, "/"); }
  return null;
}

async function fetchOne(asin) {
  const dest = path.join(CROP, `p-${asin}.jpg`);
  if (fs.existsSync(dest)) { console.log("  . skip (exists):", asin); return; }
  try {
    const page = await fetch(`https://www.amazon.com/dp/${asin}`, {
      headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9", "Accept": "text/html" },
    });
    const body = await page.text();
    if (/Robot Check|Enter the characters you see below/i.test(body)) {
      console.error("  X", asin, "blocked by Amazon bot-check - retry later or grab via SiteStripe"); return;
    }
    const url = pickImageUrl(body);
    if (!url) { console.error("  X", asin, "no product image found on page"); return; }
    const img = await fetch(url, { headers: { "User-Agent": UA } });
    if (!img.ok) { console.error("  X", asin, "image download", img.status); return; }
    const buf = Buffer.from(await img.arrayBuffer());
    if (buf.length < 2000) { console.error("  X", asin, "image too small"); return; }
    fs.writeFileSync(dest, buf);
    console.log("  ok", asin, `(${Math.round(buf.length / 1024)} KB)`);
  } catch (e) { console.error("  X", asin, e.message); }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const asins = fs.readFileSync(LIST, "utf8").split(/\r?\n/).map(s => s.trim()).filter(Boolean);
fs.mkdirSync(CROP, { recursive: true });
console.log(`\nFetching ${asins.length} new-pick product images -> assets/img/products-cropped/\n`);
for (const a of asins) { await fetchOne(a); await sleep(1500); }
console.log("\nDone. Any X above: grab manually via Amazon SiteStripe into products-cropped/p-<ASIN>.jpg\n");
