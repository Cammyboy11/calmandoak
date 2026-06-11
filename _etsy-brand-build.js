// Generates the complete Etsy brand kit:
//   • 3 logo variants (mark, wordmark, stacked)
//   • 5 "About-page" brand cards (760×468)
//   • Tagline cards in multiple voices
// All output to assets/img/etsy-brand/
//
// Run:  node _etsy-brand-build.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Brand palette
const OFFWHITE = '#F7F4EE';
const WARMCREAM = '#EFE8DA';
const CHARCOAL = '#2A2A28';
const GRAPHITE = '#5C5A55';
const TERRACOTTA = '#C97B5C';
const OAK = '#9B7B5C';

const OUT = path.join(__dirname, 'assets/img/etsy-brand');
fs.mkdirSync(OUT, {recursive: true});

// ── ENSO PATH (reused across logos) ────────────────────────────────────────
const ENSO_PATH = `M 320 145
  C 245 105, 145 140, 110 215
  C 75 290, 110 380, 195 410
  C 285 440, 380 410, 410 320
  C 425 270, 415 220, 385 185`;
const ENSO_TEXTURE = `
  <path d="M 360 165 L 355 170" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
  <path d="M 130 240 L 135 250" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
  <path d="M 400 280 L 395 285" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
`;

// ── LOGO 1: MARK only (just the enso, no text — for Etsy icon, favicon, packaging) ──
async function logoMark(){
  const svg = `<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="500" fill="${OFFWHITE}"/>
    <path d="${ENSO_PATH}" fill="none" stroke="${CHARCOAL}" stroke-width="22" stroke-linecap="round" opacity="0.92"/>
    ${ENSO_TEXTURE}
  </svg>`;
  fs.writeFileSync(path.join(OUT, 'logo-1-mark.svg'), svg);
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(path.join(OUT, 'logo-1-mark.png'));
  await sharp(Buffer.from(svg)).resize(2000, 2000).png({compressionLevel:9}).toFile(path.join(OUT, 'logo-1-mark-2000.png'));
  return 'logo-1-mark';
}

// ── LOGO 2: WORDMARK only (text, with terracotta ampersand — for headers, banners) ──
async function logoWordmark(){
  const svg = `<svg width="1200" height="320" viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="320" fill="${OFFWHITE}"/>
    <text x="600" y="190" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="160" font-weight="400" fill="${CHARCOAL}" text-anchor="middle">
      Calm <tspan fill="${TERRACOTTA}">&amp;</tspan> Oak
    </text>
    <line x1="490" y1="240" x2="710" y2="240" stroke="${TERRACOTTA}" stroke-width="2"/>
    <text x="600" y="285" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="22" font-weight="300" letter-spacing="6" fill="${GRAPHITE}" text-anchor="middle">
      QUIET ART FOR CONSIDERED HOMES
    </text>
  </svg>`;
  fs.writeFileSync(path.join(OUT, 'logo-2-wordmark.svg'), svg);
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(path.join(OUT, 'logo-2-wordmark.png'));
  await sharp(Buffer.from(svg)).resize(3000).png({compressionLevel:9}).toFile(path.join(OUT, 'logo-2-wordmark-3000.png'));
  return 'logo-2-wordmark';
}

// ── LOGO 3: STACKED (mark + wordmark — for Etsy About header, packaging) ──
async function logoStacked(){
  const svg = `<svg width="1000" height="1100" viewBox="0 0 1000 1100" xmlns="http://www.w3.org/2000/svg">
    <rect width="1000" height="1100" fill="${OFFWHITE}"/>

    <!-- Enso mark, centered horizontally, in top 55% -->
    <g transform="translate(250, 50) scale(1.0)">
      <path d="${ENSO_PATH}" fill="none" stroke="${CHARCOAL}" stroke-width="22" stroke-linecap="round" opacity="0.92"/>
      ${ENSO_TEXTURE}
    </g>

    <!-- Wordmark below -->
    <text x="500" y="730" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="120" font-weight="400" fill="${CHARCOAL}" text-anchor="middle">
      Calm <tspan fill="${TERRACOTTA}">&amp;</tspan> Oak
    </text>
    <line x1="420" y1="780" x2="580" y2="780" stroke="${TERRACOTTA}" stroke-width="2"/>
    <text x="500" y="830" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="20" font-weight="300" letter-spacing="5" fill="${GRAPHITE}" text-anchor="middle">
      QUIET ART FOR CONSIDERED HOMES
    </text>
    <text x="500" y="880" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="14" font-weight="300" letter-spacing="3" fill="${GRAPHITE}" text-anchor="middle" opacity="0.65">
      ESTABLISHED 2026 · UNITED STATES
    </text>
  </svg>`;
  fs.writeFileSync(path.join(OUT, 'logo-3-stacked.svg'), svg);
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(path.join(OUT, 'logo-3-stacked.png'));
  await sharp(Buffer.from(svg)).resize(2000).png({compressionLevel:9}).toFile(path.join(OUT, 'logo-3-stacked-2000.png'));
  return 'logo-3-stacked';
}

// ── ABOUT PAGE PHOTOS (5 brand cards, 760×468 = Etsy spec) ──────────────────
// Etsy allows photos OR graphics. These are designed to read as intentional brand graphics, not lifestyle photos.

async function aboutCard1_studio(){
  // "The studio" — workspace flat-lay style, with hand-drawn type
  const svg = `<svg width="760" height="468" viewBox="0 0 760 468" xmlns="http://www.w3.org/2000/svg">
    <rect width="760" height="468" fill="${OFFWHITE}"/>
    <rect x="0" y="0" width="380" height="468" fill="${WARMCREAM}"/>

    <!-- Enso mark, left side -->
    <g transform="translate(70, 130) scale(0.45)">
      <path d="${ENSO_PATH}" fill="none" stroke="${CHARCOAL}" stroke-width="22" stroke-linecap="round" opacity="0.92"/>
      ${ENSO_TEXTURE}
    </g>

    <!-- Right side text -->
    <text x="420" y="160" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="48" fill="${CHARCOAL}" font-weight="400">The studio</text>
    <line x1="420" y1="190" x2="500" y2="190" stroke="${TERRACOTTA}" stroke-width="2"/>
    <text x="420" y="240" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="18" fill="${GRAPHITE}" font-weight="300">
      <tspan x="420" dy="0">A small studio in the US — ink,</tspan>
      <tspan x="420" dy="28">paper, oak, and time. Each piece</tspan>
      <tspan x="420" dy="28">drawn before it's printed; each print</tspan>
      <tspan x="420" dy="28">made when it's ordered, not before.</tspan>
    </text>
  </svg>`;
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(path.join(OUT, 'about-1-studio.png'));
  await sharp(Buffer.from(svg)).jpeg({quality:92,mozjpeg:true}).toFile(path.join(OUT, 'about-1-studio.jpg'));
  return 'about-1-studio';
}

async function aboutCard2_paper(){
  // "The paper" — materials card
  const svg = `<svg width="760" height="468" viewBox="0 0 760 468" xmlns="http://www.w3.org/2000/svg">
    <rect width="760" height="468" fill="${OFFWHITE}"/>
    <!-- Large 250 gsm number, soft, off-center -->
    <text x="80" y="280" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="180" fill="${WARMCREAM}" font-weight="400" opacity="1">250</text>
    <text x="80" y="340" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="32" fill="${CHARCOAL}" font-weight="400" letter-spacing="6">GSM</text>

    <!-- Right caption -->
    <text x="430" y="120" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="40" fill="${CHARCOAL}" font-weight="400">The paper</text>
    <line x1="430" y1="148" x2="510" y2="148" stroke="${TERRACOTTA}" stroke-width="2"/>
    <text x="430" y="190" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="16" fill="${GRAPHITE}" font-weight="300">
      <tspan x="430" dy="0">Museum-quality matte fine-art paper.</tspan>
      <tspan x="430" dy="26">250 gsm — the weight of a gallery print.</tspan>
      <tspan x="430" dy="26">Acid-free. FSC-certified. Archival inks.</tspan>
      <tspan x="430" dy="36">Warm off-white — never bright white.</tspan>
      <tspan x="430" dy="26">Chosen because Japandi rooms don't</tspan>
      <tspan x="430" dy="26">tolerate harsh contrasts.</tspan>
    </text>
  </svg>`;
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(path.join(OUT, 'about-2-paper.png'));
  await sharp(Buffer.from(svg)).jpeg({quality:92,mozjpeg:true}).toFile(path.join(OUT, 'about-2-paper.jpg'));
  return 'about-2-paper';
}

async function aboutCard3_series(){
  // "Six series" — overview grid
  const svg = `<svg width="760" height="468" viewBox="0 0 760 468" xmlns="http://www.w3.org/2000/svg">
    <rect width="760" height="468" fill="${OFFWHITE}"/>

    <text x="60" y="80" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="40" fill="${CHARCOAL}" font-weight="400">Six series · 30 prints</text>
    <line x1="60" y1="105" x2="240" y2="105" stroke="${TERRACOTTA}" stroke-width="2"/>

    <!-- 6 series listed in 2 columns -->
    <g font-family="Inter, Helvetica Neue, Arial, sans-serif" font-size="18" fill="${CHARCOAL}">
      <text x="60" y="170" font-weight="500">SUMI-E INK</text>
      <text x="60" y="195" font-size="14" fill="${GRAPHITE}" font-weight="300">Single-breath brushstrokes · 9 prints</text>

      <text x="60" y="240" font-weight="500">BOTANICAL LINE</text>
      <text x="60" y="265" font-size="14" fill="${GRAPHITE}" font-weight="300">One continuous ink line · 6 prints</text>

      <text x="60" y="310" font-weight="500">MINIMALIST LANDSCAPE</text>
      <text x="60" y="335" font-size="14" fill="${GRAPHITE}" font-weight="300">Horizon, moon, lone tree · 6 prints</text>

      <text x="400" y="170" font-weight="500">JAPANESE CALLIGRAPHY</text>
      <text x="400" y="195" font-size="14" fill="${GRAPHITE}" font-weight="300">Shizuka, Wa, Ma · 3 prints</text>

      <text x="400" y="240" font-weight="500">TONAL STUDY</text>
      <text x="400" y="265" font-size="14" fill="${GRAPHITE}" font-weight="300">Color field as palette · 3 prints</text>

      <text x="400" y="310" font-weight="500">WABI-SABI STILL LIFE</text>
      <text x="400" y="335" font-size="14" fill="${GRAPHITE}" font-weight="300">Stones, tea, linen morning · 3 prints</text>
    </g>

    <text x="60" y="420" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="14" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" opacity="0.7">
      EACH STANDS ALONE — OR FORMS A GALLERY WALL WITH ITS SIBLINGS.
    </text>
  </svg>`;
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(path.join(OUT, 'about-3-series.png'));
  await sharp(Buffer.from(svg)).jpeg({quality:92,mozjpeg:true}).toFile(path.join(OUT, 'about-3-series.jpg'));
  return 'about-3-series';
}

async function aboutCard4_process(){
  // "Made to order" — process diagram
  const svg = `<svg width="760" height="468" viewBox="0 0 760 468" xmlns="http://www.w3.org/2000/svg">
    <rect width="760" height="468" fill="${WARMCREAM}"/>

    <text x="380" y="80" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="40" fill="${CHARCOAL}" font-weight="400" text-anchor="middle">Drawn — Printed — Shipped</text>
    <line x1="280" y1="105" x2="480" y2="105" stroke="${TERRACOTTA}" stroke-width="2"/>

    <!-- 3 steps in a row -->
    <g font-family="Inter, Helvetica Neue, Arial, sans-serif">
      <!-- Step 1 -->
      <circle cx="160" cy="220" r="38" fill="${OFFWHITE}" stroke="${CHARCOAL}" stroke-width="2"/>
      <text x="160" y="232" font-size="32" font-family="Cormorant Garamond, EB Garamond, Garamond, serif" fill="${CHARCOAL}" text-anchor="middle" font-weight="400">1</text>
      <text x="160" y="305" font-size="16" font-weight="500" fill="${CHARCOAL}" text-anchor="middle">DRAWN</text>
      <text x="160" y="335" font-size="14" font-weight="300" fill="${GRAPHITE}" text-anchor="middle">
        <tspan x="160" dy="0">Original artwork,</tspan>
        <tspan x="160" dy="18">designed in-house</tspan>
      </text>

      <!-- arrow -->
      <line x1="220" y1="220" x2="320" y2="220" stroke="${OAK}" stroke-width="1.5"/>
      <polygon points="320,220 312,215 312,225" fill="${OAK}"/>

      <!-- Step 2 -->
      <circle cx="380" cy="220" r="38" fill="${OFFWHITE}" stroke="${CHARCOAL}" stroke-width="2"/>
      <text x="380" y="232" font-size="32" font-family="Cormorant Garamond, EB Garamond, Garamond, serif" fill="${CHARCOAL}" text-anchor="middle" font-weight="400">2</text>
      <text x="380" y="305" font-size="16" font-weight="500" fill="${CHARCOAL}" text-anchor="middle">PRINTED</text>
      <text x="380" y="335" font-size="14" font-weight="300" fill="${GRAPHITE}" text-anchor="middle">
        <tspan x="380" dy="0">When you order,</tspan>
        <tspan x="380" dy="18">on 250 gsm matte</tspan>
      </text>

      <!-- arrow -->
      <line x1="440" y1="220" x2="540" y2="220" stroke="${OAK}" stroke-width="1.5"/>
      <polygon points="540,220 532,215 532,225" fill="${OAK}"/>

      <!-- Step 3 -->
      <circle cx="600" cy="220" r="38" fill="${OFFWHITE}" stroke="${CHARCOAL}" stroke-width="2"/>
      <text x="600" y="232" font-size="32" font-family="Cormorant Garamond, EB Garamond, Garamond, serif" fill="${CHARCOAL}" text-anchor="middle" font-weight="400">3</text>
      <text x="600" y="305" font-size="16" font-weight="500" fill="${CHARCOAL}" text-anchor="middle">SHIPPED</text>
      <text x="600" y="335" font-size="14" font-weight="300" fill="${GRAPHITE}" text-anchor="middle">
        <tspan x="600" dy="0">Flat, in a kraft</tspan>
        <tspan x="600" dy="18">mailer · 3–5 days</tspan>
      </text>
    </g>

    <text x="380" y="425" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="14" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" text-anchor="middle" opacity="0.7">
      MADE TO ORDER · NOTHING IN INVENTORY
    </text>
  </svg>`;
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(path.join(OUT, 'about-4-process.png'));
  await sharp(Buffer.from(svg)).jpeg({quality:92,mozjpeg:true}).toFile(path.join(OUT, 'about-4-process.jpg'));
  return 'about-4-process';
}

async function aboutCard5_promise(){
  // "The promise" — guarantee card
  const svg = `<svg width="760" height="468" viewBox="0 0 760 468" xmlns="http://www.w3.org/2000/svg">
    <rect width="760" height="468" fill="${OFFWHITE}"/>

    <!-- Small terracotta seal in top-left -->
    <g transform="translate(60, 60)">
      <rect width="60" height="60" fill="${TERRACOTTA}" rx="3"/>
      <text x="30" y="40" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
            font-size="28" fill="${OFFWHITE}" text-anchor="middle" font-weight="500">C&amp;O</text>
    </g>

    <text x="60" y="190" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="42" fill="${CHARCOAL}" font-weight="400">The promise</text>
    <line x1="60" y1="218" x2="200" y2="218" stroke="${TERRACOTTA}" stroke-width="2"/>

    <text x="60" y="270" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="17" fill="${CHARCOAL}" font-weight="400">
      <tspan x="60" dy="0">Each piece is made to order. If a print</tspan>
      <tspan x="60" dy="28">arrives damaged or misprinted, message us</tspan>
      <tspan x="60" dy="28">within 14 days with a photo —</tspan>
      <tspan x="60" dy="28" font-weight="500" fill="${CHARCOAL}">we'll reprint or refund, no shipping back.</tspan>
    </text>

    <text x="60" y="425" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="14" font-weight="300" letter-spacing="2" fill="${GRAPHITE}" opacity="0.7">
      QUIET ART FOR CONSIDERED HOMES.
    </text>
  </svg>`;
  await sharp(Buffer.from(svg)).png({compressionLevel:9}).toFile(path.join(OUT, 'about-5-promise.png'));
  await sharp(Buffer.from(svg)).jpeg({quality:92,mozjpeg:true}).toFile(path.join(OUT, 'about-5-promise.jpg'));
  return 'about-5-promise';
}

// ── RUN ────────────────────────────────────────────────────────────────────
(async()=>{
  const tasks = [
    logoMark(),
    logoWordmark(),
    logoStacked(),
    aboutCard1_studio(),
    aboutCard2_paper(),
    aboutCard3_series(),
    aboutCard4_process(),
    aboutCard5_promise(),
  ];
  const results = await Promise.all(tasks);
  console.log('Built ' + results.length + ' assets:');
  for (const r of results) console.log('  ✓ ' + r);
  console.log('\nOutput: assets/img/etsy-brand/');
})().catch(e => { console.error(e); process.exit(1); });
