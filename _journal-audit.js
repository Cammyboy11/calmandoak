// Audit all journal articles for the 3 issue patterns the user flagged:
//
//   1. DUPLICATE IMAGES — same src appearing 2+ times in one article
//   2. UNLINKED EDITORIAL FIGURES — <figure class="editorial-figure"> with <img>
//      that is NOT wrapped in a product <a href> (so the picture leads nowhere)
//   3. "RULED OUT" ASIDES WITHOUT CROSS-SELL LINKS — asides containing the
//      phrase "ruled out" that don't have any <a> tag inside
//
// Also surfaces:
//   4. Picture-product alt-mismatch (alt mentions "teak table" but no /dp/ link)
//
// Run:  node _journal-audit.js

const fs = require('fs');
const path = require('path');

const JOURNAL_DIR = path.join(__dirname, 'journal');

const articles = fs.readdirSync(JOURNAL_DIR)
  .filter(name => {
    const p = path.join(JOURNAL_DIR, name);
    return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html'));
  });

const findings = [];

for (const slug of articles) {
  const file = path.join(JOURNAL_DIR, slug, 'index.html');
  const html = fs.readFileSync(file, 'utf8');

  // Strip <head> + footer to avoid false positives from nav/footer images
  const bodyOnly = html.split(/<main[^>]*>/)[1]?.split(/<\/main>/)[0] || html;
  const articleOnly = (bodyOnly.split(/<article/)[1]?.split(/<\/article>/)[0]) || bodyOnly;

  // 1. DUPLICATE IMAGES — count src occurrences in <article>
  const srcMatches = [...articleOnly.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1].split('?')[0]);
  const srcCounts = {};
  for (const src of srcMatches) srcCounts[src] = (srcCounts[src] || 0) + 1;
  const dupSrcs = Object.entries(srcCounts).filter(([_,n]) => n > 1);

  // 2. UNLINKED EDITORIAL FIGURES (in the body but outside the "keep reading" cards)
  // Pattern: <figure class="editorial-figure"> not inside an <a>
  // Find every editorial-figure block, then check if it's preceded by an open <a> recently
  const efRegex = /<figure[^>]*class="[^"]*editorial-figure[^"]*"[^>]*>([\s\S]*?)<\/figure>/gi;
  const unlinkedEFs = [];
  let m;
  while ((m = efRegex.exec(articleOnly)) !== null) {
    const figureStart = m.index;
    // Look backwards 400 chars for an <a href...> without an intervening </a>
    const before = articleOnly.slice(Math.max(0, figureStart - 400), figureStart);
    const lastOpen = before.lastIndexOf('<a ');
    const lastClose = before.lastIndexOf('</a>');
    const wrappedInLink = lastOpen > lastClose;
    if (!wrappedInLink) {
      const inner = m[1].slice(0, 200).replace(/\s+/g, ' ');
      unlinkedEFs.push(inner);
    }
  }

  // 3. RULED-OUT ASIDES WITHOUT LINKS
  // Find any block with "ruled out" text + check if <a> tag inside the same aside
  const ruledOutMatches = [];
  const asideRegex = /<(?:aside|div)[^>]*class="[^"]*editorial-aside[^"]*"[^>]*>([\s\S]*?)<\/(?:aside|div)>/gi;
  let am;
  while ((am = asideRegex.exec(articleOnly)) !== null) {
    const inner = am[1];
    if (/ruled out/i.test(inner)) {
      const hasLink = /<a\s+[^>]*href=/i.test(inner);
      if (!hasLink) {
        ruledOutMatches.push(inner.slice(0, 250).replace(/\s+/g, ' '));
      }
    }
  }

  // 4. PICTURE-PRODUCT alt mismatch (heuristic): editorial-figure with alt mentioning
  // "table", "chair", "lamp", "sofa", "rug" but no /dp/ link nearby (within 500 chars)
  const altMismatches = [];
  const imgWithAltRegex = /<img[^>]+src=["']([^"']+)["'][^>]+alt=["']([^"']+)["']/gi;
  let im;
  while ((im = imgWithAltRegex.exec(articleOnly)) !== null) {
    const src = im[1];
    const alt = im[2];
    if (!src.includes('/products-cropped/') && !src.includes('/journal-covers/')) continue;
    if (src.includes('/products-cropped/') && /p-B[0-9A-Z]{9}/.test(src)) continue; // proper product img w/ ASIN
    // Look at editorial images that aren't tied to an ASIN file
    const isProductKeyword = /\b(table|chair|sofa|rug|lamp|lantern|throw|pillow|cushion|curtain|planter|vase|teapot|tray|frame|print|stem|olive|eucalyptus|ginkgo|bamboo|pampas)\b/i.test(alt);
    if (isProductKeyword) {
      // Check if there's a /dp/ link within 500 chars BEFORE this img
      const idx = im.index;
      const before = articleOnly.slice(Math.max(0, idx - 500), idx);
      if (!/\/dp\/B[0-9A-Z]{9}/.test(before)) {
        altMismatches.push({ src: src.split('?')[0], alt: alt.slice(0, 100) });
      }
    }
  }

  if (dupSrcs.length || unlinkedEFs.length || ruledOutMatches.length || altMismatches.length) {
    findings.push({
      slug,
      dupSrcs,
      unlinkedEFs,
      ruledOutMatches,
      altMismatches,
    });
  }
}

// REPORT
console.log(`\n══════════════════════════════════════════════════════════════`);
console.log(`Audited ${articles.length} journal articles`);
console.log(`Found issues in ${findings.length} articles`);
console.log(`══════════════════════════════════════════════════════════════\n`);

for (const f of findings) {
  console.log(`▸ ${f.slug}`);
  if (f.dupSrcs.length) {
    console.log(`   • DUPLICATE IMAGES (${f.dupSrcs.length}):`);
    for (const [src, n] of f.dupSrcs) {
      console.log(`        ${n}× ${src}`);
    }
  }
  if (f.unlinkedEFs.length) {
    console.log(`   • UNLINKED EDITORIAL FIGURES (${f.unlinkedEFs.length}):`);
    for (const ef of f.unlinkedEFs) {
      const srcMatch = ef.match(/src=["']([^"']+)["']/);
      const altMatch = ef.match(/alt=["']([^"']+)["']/);
      console.log(`        src: ${srcMatch ? srcMatch[1].split('?')[0] : 'n/a'}`);
      console.log(`        alt: ${altMatch ? altMatch[1].slice(0, 80) : 'n/a'}`);
    }
  }
  if (f.ruledOutMatches.length) {
    console.log(`   • RULED-OUT ASIDES WITHOUT LINKS (${f.ruledOutMatches.length}):`);
    for (const ro of f.ruledOutMatches) {
      console.log(`        "${ro.slice(0, 100)}..."`);
    }
  }
  if (f.altMismatches.length) {
    console.log(`   • POSSIBLE ALT-MISMATCH IMAGES (${f.altMismatches.length}):`);
    for (const am of f.altMismatches) {
      console.log(`        ${am.src}`);
      console.log(`        alt: "${am.alt}"`);
    }
  }
  console.log('');
}
