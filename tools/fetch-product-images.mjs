// Calm & Oak — real product image fetcher
// Runs on Cameron's machine (the sandbox is firewalled from Amazon).
// Scans the journal articles for empty product-image placeholders, then downloads
// the REAL main image from each product's Amazon page and saves it as
//   assets/img/products-cropped/p-<ASIN>.jpg
//
// COMPLIANCE: this only saves the genuine product photo from the product's own
// /dp/<ASIN> page. It never fabricates or alters a product image.
//
// Needs NO API key. Usage: double-click generate-all.bat, or: node tools/fetch-product-images.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CROP = path.join(ROOT, "assets", "img", "products-cropped");
const JOURNAL = path.join(ROOT, "journal");

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// --- find every ASIN that still has an empty placeholder and no local image ---
function findMissing() {
  const set = new Set();
  for (const dir of fs.readdirSync(JOURNAL)) {
    const f = path.join(JOURNAL, dir, "index.html");
    if (!fs.existsSync(f)) continue;
    const s = fs.readFileSync(f, "utf8");
    const re = /section-product-img"><!-- product image: p-([A-Z0-9]{10})\.jpg to be added -->/g;
    let m;
    while ((m = re.exec(s))) {
      const asin = m[1];
      if (!fs.existsSync(path.join(CROP, `p-${asin}.jpg`))) set.add(asin);
    }
  }
  return [...set];
}

function pickImageUrl(htmlStr) {
  // try several patterns, highest quality first
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
  if (fs.existsSync(dest)) { console.log("  · skip (exists):", asin); return; }
  try {
    const page = await fetch(`https://www.amazon.com/dp/${asin}`, {
      headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9", "Accept": "text/html" },
    });
    const body = await page.text();
    if (/Robot Check|Enter the characters you see below/i.test(body)) {
      console.error("  ✗", asin, "blocked by Amazon bot-check — retry later or grab via SiteStripe");
      return;
    }
    const url = pickImageUrl(body);
    if (!url) { console.error("  ✗", asin, "no product image found on page"); return; }
    const img = await fetch(url, { headers: { "User-Agent": UA } });
    if (!img.ok) { console.error("  ✗", asin, "image download", img.status); return; }
    const buf = Buffer.from(await img.arrayBuffer());
    if (buf.length < 2000) { console.error("  ✗", asin, "image too small, skipping"); return; }
    fs.writeFileSync(dest, buf);
    console.log("  ✓", asin, `(${Math.round(buf.length / 1024)} KB)`);
  } catch (e) {
    console.error("  ✗", asin, e.message);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const missing = findMissing();
fs.mkdirSync(CROP, { recursive: true });
console.log(`\nFetching ${missing.length} missing product images → assets/img/products-cropped/\n`);
for (const a of missing) { await fetchOne(a); await sleep(1500); }
console.log("\nDone. Any ✗ above can be grabbed manually via Amazon SiteStripe.\n");
