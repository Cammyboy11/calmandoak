// Generates the cover image for the Japandi vs Scandinavian vs Wabi-Sabi comparison article.
// 848 × 1053 (matches the journal-cover spec used across the site).
// Design: three vertical columns — Scandinavian (bright white), Japandi (warm cream), Wabi-Sabi (deep oat).
// Each column shows the column name + a small SVG visual cue + a single-word descriptor.
// Brand wordmark + tagline at bottom. Pinterest-pin friendly composition.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const W = 848, H = 1053;

const OFFWHITE = '#F7F4EE';
const WARMCREAM = '#EFE8DA';
const CHARCOAL = '#2A2A28';
const GRAPHITE = '#5C5A55';
const TERRACOTTA = '#C97B5C';
const OAK = '#9B7B5C';
const OAT = '#D8C9B0';
const BRIGHT_WHITE = '#FAFAF7';
const DEEP_OAT = '#C2B294';

const colW = Math.floor(W / 3);

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">

  <!-- Three vertical columns, each with its own background tone -->
  <rect x="0"           y="0" width="${colW}" height="${H}" fill="${BRIGHT_WHITE}"/>
  <rect x="${colW}"     y="0" width="${colW}" height="${H}" fill="${WARMCREAM}"/>
  <rect x="${colW*2}"   y="0" width="${colW}" height="${H}" fill="${DEEP_OAT}"/>

  <!-- Top eyebrow line -->
  <text x="${W/2}" y="80" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="14" font-weight="500" letter-spacing="6" fill="${GRAPHITE}" text-anchor="middle">
    A COMPARISON
  </text>

  <!-- Large headline -->
  <text x="${W/2}" y="170" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="58" font-weight="400" fill="${CHARCOAL}" text-anchor="middle">
    Japandi <tspan fill="${TERRACOTTA}">vs</tspan>
  </text>
  <text x="${W/2}" y="240" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="58" font-weight="400" fill="${CHARCOAL}" text-anchor="middle">
    Scandinavian
  </text>
  <text x="${W/2}" y="300" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="36" font-weight="400" font-style="italic" fill="${GRAPHITE}" text-anchor="middle">
    and Wabi-Sabi
  </text>

  <line x1="${W/2 - 90}" y1="340" x2="${W/2 + 90}" y2="340" stroke="${TERRACOTTA}" stroke-width="2"/>

  <!-- Three column labels -->
  <text x="${colW/2}"        y="450" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="28" font-weight="400" fill="${CHARCOAL}" text-anchor="middle">Scandinavian</text>
  <text x="${colW + colW/2}" y="450" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="28" font-weight="400" fill="${CHARCOAL}" text-anchor="middle">Japandi</text>
  <text x="${colW*2 + colW/2}" y="450" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="28" font-weight="400" fill="${CHARCOAL}" text-anchor="middle">Wabi-Sabi</text>

  <!-- Tiny separator -->
  <line x1="${colW/2 - 30}" y1="475" x2="${colW/2 + 30}" y2="475" stroke="${CHARCOAL}" stroke-width="1" opacity="0.4"/>
  <line x1="${colW + colW/2 - 30}" y1="475" x2="${colW + colW/2 + 30}" y2="475" stroke="${TERRACOTTA}" stroke-width="1.5"/>
  <line x1="${colW*2 + colW/2 - 30}" y1="475" x2="${colW*2 + colW/2 + 30}" y2="475" stroke="${CHARCOAL}" stroke-width="1" opacity="0.4"/>

  <!-- Column 1: Scandinavian — multiple soft pastel dots in a row (hygge feel) -->
  <g transform="translate(${colW/2 - 60}, 540)">
    <circle cx="0"   cy="0" r="12" fill="#D9C9B7"/>
    <circle cx="30"  cy="0" r="12" fill="#C8B89A"/>
    <circle cx="60"  cy="0" r="12" fill="#B0A990"/>
    <circle cx="90"  cy="0" r="12" fill="#D5C2A5"/>
    <circle cx="120" cy="0" r="12" fill="#E5D8C2"/>
  </g>
  <text x="${colW/2}" y="600" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="13" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" text-anchor="middle">
    multiple soft pastels
  </text>
  <text x="${colW/2}" y="635" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="13" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" text-anchor="middle">
    bright white walls
  </text>
  <text x="${colW/2}" y="670" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="13" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" text-anchor="middle">
    hygge layering
  </text>

  <!-- Column 2: Japandi — one circle + one accent (asymmetric, intentional) -->
  <g transform="translate(${colW + colW/2 - 15}, 540)">
    <circle cx="0"   cy="0" r="14" fill="${CHARCOAL}"/>
    <circle cx="45"  cy="0" r="6"  fill="${TERRACOTTA}"/>
  </g>
  <text x="${colW + colW/2}" y="600" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="13" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" text-anchor="middle">
    two woods, one accent
  </text>
  <text x="${colW + colW/2}" y="635" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="13" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" text-anchor="middle">
    warm off-white walls
  </text>
  <text x="${colW + colW/2}" y="670" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="13" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" text-anchor="middle">
    asymmetric, calm
  </text>

  <!-- Column 3: Wabi-Sabi — single broken / cracked circle -->
  <g transform="translate(${colW*2 + colW/2}, 540)">
    <path d="M -16 -8 C -22 -2, -22 8, -14 14 C -6 20, 6 18, 14 12" fill="none" stroke="${CHARCOAL}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 15 -13 C 18 -8, 19 -3, 17 4" fill="none" stroke="${CHARCOAL}" stroke-width="2.5" stroke-linecap="round"/>
  </g>
  <text x="${colW*2 + colW/2}" y="600" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="13" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" text-anchor="middle">
    one object, no accent
  </text>
  <text x="${colW*2 + colW/2}" y="635" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="13" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" text-anchor="middle">
    raw plaster walls
  </text>
  <text x="${colW*2 + colW/2}" y="670" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="13" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" text-anchor="middle">
    aged, sparse, quiet
  </text>

  <!-- Center band: the editorial pull-quote -->
  <rect x="0" y="730" width="${W}" height="220" fill="${OFFWHITE}"/>

  <text x="${W/2}" y="790" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="22" font-weight="400" font-style="italic" fill="${CHARCOAL}" text-anchor="middle">
    "The five-second test:
  </text>
  <text x="${W/2}" y="820" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="22" font-weight="400" font-style="italic" fill="${CHARCOAL}" text-anchor="middle">
    bright white walls,
  </text>
  <text x="${W/2}" y="850" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="22" font-weight="400" font-style="italic" fill="${CHARCOAL}" text-anchor="middle">
    warm off-white walls,
  </text>
  <text x="${W/2}" y="880" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="22" font-weight="400" font-style="italic" fill="${CHARCOAL}" text-anchor="middle">
    or raw plaster?"
  </text>

  <!-- Bottom: brand wordmark -->
  <text x="${W/2}" y="985" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="36" font-weight="400" fill="${CHARCOAL}" text-anchor="middle">
    Calm <tspan fill="${TERRACOTTA}">&amp;</tspan> Oak
  </text>
  <text x="${W/2}" y="1020" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="11" font-weight="300" letter-spacing="4" fill="${GRAPHITE}" text-anchor="middle">
    QUIET ART FOR CONSIDERED HOMES
  </text>
</svg>`;

(async () => {
  const outDir = path.join(__dirname, 'assets/img/journal-covers');
  fs.mkdirSync(outDir, {recursive: true});
  await sharp(Buffer.from(svg)).jpeg({quality: 92, mozjpeg: true}).toFile(path.join(outDir, 'japandi-vs-scandinavian-vs-wabi-sabi-cover.jpg'));
  const stat = fs.statSync(path.join(outDir, 'japandi-vs-scandinavian-vs-wabi-sabi-cover.jpg'));
  console.log('Cover: ' + W + '×' + H);
  console.log('Size: ' + (stat.size/1024).toFixed(0) + 'kb');
  console.log('Saved: assets/img/journal-covers/japandi-vs-scandinavian-vs-wabi-sabi-cover.jpg');
})().catch(e => { console.error(e); process.exit(1); });
