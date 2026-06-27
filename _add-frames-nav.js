#!/usr/bin/env node
/**
 * _add-frames-nav.js — wire the new /shop/frames/ page into site navigation.
 *
 * Idempotent: safe to run repeatedly; skips pages that already link Frames.
 * Run from the repo root when the working tree is clean:
 *     node _add-frames-nav.js
 *
 * What it does:
 *   1. Adds a "Frames" link to the in-page .shop-nav on every shop/journal page
 *      (inserted right after the "Prints" link, or before </nav> if Prints absent).
 *   2. Adds "Frames" to the footer "Shop" <ul> (after the Print Collection link).
 *   3. Adds <loc>https://calmandoak.com/shop/frames/</loc> to sitemap.xml.
 * The frames page itself is left untouched (it already marks Frames as current).
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const FRAMES_NAV = '\n        <a href="/shop/frames/">Frames</a>';
const FRAMES_FOOTER = '\n        <li><a href="/shop/frames/">Frames</a></li>';

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (['node_modules', '.git', 'assets', 'final pins'].includes(name)) continue;
      walk(p, out);
    } else if (name === 'index.html') {
      out.push(p);
    }
  }
  return out;
}

let navCount = 0, footerCount = 0;
for (const file of walk(ROOT)) {
  // skip the frames page itself
  if (file.replace(/\\/g, '/').endsWith('/shop/frames/index.html')) continue;
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1) in-page shop-nav
  if (html.includes('class="shop-nav"') && !/shop-nav[\s\S]*?href="\/shop\/frames\//.test(html)) {
    html = html.replace(
      /(<nav class="shop-nav"[\s\S]*?)(\n\s*<\/nav>)/,
      (m, body, close) => {
        // insert after the Prints link if present, else just before </nav>
        if (/href="\/shop\/prints\/"/.test(body)) {
          body = body.replace(/(<a href="\/shop\/prints\/"[^>]*>[^<]*<\/a>)/, `$1${FRAMES_NAV}`);
        } else {
          body = body + FRAMES_NAV;
        }
        return body + close;
      }
    );
    changed = true; navCount++;
  }

  // 2) footer Shop list — after the Print Collection / Prints link
  if (/<h4>Shop<\/h4>/.test(html) && !/<li><a href="\/shop\/frames\/">/.test(html)) {
    html = html.replace(
      /(<li><a href="\/shop\/prints\/">[^<]*<\/a><\/li>)/,
      `$1${FRAMES_FOOTER}`
    );
    if (html.includes('/shop/frames/')) { changed = true; footerCount++; }
  }

  if (changed) fs.writeFileSync(file, html);
}

// 3) sitemap
const smPath = path.join(ROOT, 'sitemap.xml');
if (fs.existsSync(smPath)) {
  let sm = fs.readFileSync(smPath, 'utf8');
  if (!sm.includes('/shop/frames/')) {
    const entry = `  <url>\n    <loc>https://calmandoak.com/shop/frames/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    sm = sm.replace(/(\n?<\/urlset>)/, `${entry}$1`);
    fs.writeFileSync(smPath, sm);
    console.log('sitemap.xml: added /shop/frames/');
  }
}

console.log(`Done. shop-nav updated on ${navCount} pages, footer on ${footerCount} pages.`);
