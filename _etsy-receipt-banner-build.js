// Generates the Etsy Order Receipt Banner (760 × 100).
// This image appears at the top of every order confirmation, invoice, and email receipt.
// Keep it clean — it's an in-context piece, not a hero. Brand mark + tagline only.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const W = 760, H = 100;

const OFFWHITE = '#F7F4EE';
const WARMCREAM = '#EFE8DA';
const CHARCOAL = '#2A2A28';
const GRAPHITE = '#5C5A55';
const TERRACOTTA = '#C97B5C';

const ENSO_PATH = `M 320 145
  C 245 105, 145 140, 110 215
  C 75 290, 110 380, 195 410
  C 285 440, 380 410, 410 320
  C 425 270, 415 220, 385 185`;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Cream ground -->
  <rect width="${W}" height="${H}" fill="${OFFWHITE}"/>

  <!-- Thin terracotta accent line bottom -->
  <line x1="40" y1="${H - 8}" x2="${W - 40}" y2="${H - 8}" stroke="${TERRACOTTA}" stroke-width="1" opacity="0.6"/>

  <!-- Small enso mark on left -->
  <g transform="translate(35, 5) scale(0.18)">
    <path d="${ENSO_PATH}" fill="none" stroke="${CHARCOAL}" stroke-width="22" stroke-linecap="round" opacity="0.92"/>
    <path d="M 360 165 L 355 170" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
    <path d="M 130 240 L 135 250" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
  </g>

  <!-- Wordmark centered, slightly left of true center to allow tagline air -->
  <text x="${W/2}" y="48" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
        font-size="36" font-weight="400" fill="${CHARCOAL}" text-anchor="middle">
    Calm <tspan fill="${TERRACOTTA}">&amp;</tspan> Oak
  </text>

  <!-- Tagline below -->
  <text x="${W/2}" y="76" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="12" font-weight="300" letter-spacing="4" fill="${GRAPHITE}" text-anchor="middle">
    QUIET ART FOR CONSIDERED HOMES
  </text>

  <!-- Right side: order signal text -->
  <text x="${W - 35}" y="48" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="13" font-weight="500" letter-spacing="3" fill="${GRAPHITE}" text-anchor="end">
    THANK YOU
  </text>
  <text x="${W - 35}" y="76" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="11" font-weight="300" fill="${GRAPHITE}" text-anchor="end">
    Made to order · printed in the US
  </text>
</svg>`;

(async () => {
  const outDir = path.join(__dirname, 'assets/img/etsy-brand');
  fs.writeFileSync(path.join(outDir, 'receipt-banner.svg'), svg);
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(path.join(outDir, 'receipt-banner.png'));
  await sharp(Buffer.from(svg)).jpeg({quality:92, mozjpeg:true}).toFile(path.join(outDir, 'receipt-banner.jpg'));

  // Also a 2× version for high-DPI displays
  await sharp(Buffer.from(svg)).resize(W*2, H*2).png({compressionLevel:9}).toFile(path.join(outDir, 'receipt-banner-2x.png'));

  const pngSize = fs.statSync(path.join(outDir, 'receipt-banner.png')).size;
  const jpgSize = fs.statSync(path.join(outDir, 'receipt-banner.jpg')).size;
  console.log('Receipt banner: ' + W + '×' + H);
  console.log('  PNG: ' + (pngSize/1024).toFixed(0) + 'kb');
  console.log('  JPG: ' + (jpgSize/1024).toFixed(0) + 'kb');
  console.log('Saved to assets/img/etsy-brand/');
})().catch(e => { console.error(e); process.exit(1); });
