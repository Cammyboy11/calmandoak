// Generates the Etsy shop banner (3360 × 840) for Calm & Oak.
// Design: warm cream ground (#F7F4EE) with a horizontal warm-cream band (#EFE8DA)
// representing a console table. 3 framed prints sit on the band as a triptych.
// Wordmark "Calm & Oak" + tagline "Quiet art for considered homes." in serif.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const W = 3360, H = 840;

// Brand palette
const OFFWHITE = '#F7F4EE';
const WARMCREAM = '#EFE8DA';
const CHARCOAL = '#2A2A28';
const GRAPHITE = '#5C5A55';
const TERRACOTTA = '#C97B5C';
const OAK = '#9B7B5C';

// Pick three prints (one sumi-e, one landscape, one botanical) for the triptych
const TRIPTYCH = [
  { slug: 'enso',        label: 'Sumi-e' },
  { slug: 'serene-dawn', label: 'Landscape' },
  { slug: 'single-stem', label: 'Botanical' },
];

// Frame around each print: light oak look (warm tan) with subtle border
const FRAME_W = 14;          // mat thickness around print
const FRAME_BORDER_W = 4;    // dark outer edge
const FRAME_TAN = '#C8A87A';

async function makeFramedPrint(srcPath, finalWidth, finalHeight){
  // First resize print to fit inside frame area
  const innerW = finalWidth - 2*(FRAME_W + FRAME_BORDER_W);
  const innerH = finalHeight - 2*(FRAME_W + FRAME_BORDER_W);
  const printBuf = await sharp(srcPath).resize(innerW, innerH, {fit:'cover', position:'centre'}).png().toBuffer();

  // Build mat (warm cream)
  const matW = finalWidth - 2*FRAME_BORDER_W;
  const matH = finalHeight - 2*FRAME_BORDER_W;
  const mat = await sharp({create:{width:matW, height:matH, channels:3, background: WARMCREAM}})
    .composite([{ input: printBuf, left: FRAME_W, top: FRAME_W }])
    .png().toBuffer();

  // Outer dark frame
  return sharp({create:{width:finalWidth, height:finalHeight, channels:3, background: CHARCOAL}})
    .composite([{ input: mat, left: FRAME_BORDER_W, top: FRAME_BORDER_W }])
    .png().toBuffer();
}

(async () => {
  // Print panel sizes — keep aspect 4:5 (matches print proportions)
  const printH = 560;
  const printW = Math.round(printH * 4 / 5);   // 448

  const gap = 60;                              // horizontal space between framed prints
  const triptychW = 3*printW + 2*gap;
  // Centre triptych horizontally; bottom-anchor with 40px padding from band
  const triptychLeft = Math.round((W - triptychW) / 2);
  const triptychTop = 140;                     // top padding so wordmark sits above? we'll do tagline below

  // Build framed prints
  const framed = await Promise.all(TRIPTYCH.map(p =>
    makeFramedPrint(`assets/img/prints/${p.slug}.jpg`, printW, printH)
  ));

  // Console band: lower 22% of banner, warm cream
  const bandH = 100;
  const bandTop = H - bandH;

  // Make the canvas
  // Background: off-white. Lower band: warm cream.
  const bandSVG = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${W}" height="${H}" fill="${OFFWHITE}"/>
      <rect x="0" y="${bandTop}" width="${W}" height="${bandH}" fill="${WARMCREAM}"/>
      <line x1="0" y1="${bandTop}" x2="${W}" y2="${bandTop}" stroke="${OAK}" stroke-width="1" opacity="0.5"/>
    </svg>`;
  const bgBuf = await sharp(Buffer.from(bandSVG)).png().toBuffer();

  // Add a single decorative element: a thin terracotta horizontal rule on the left, under the wordmark
  // and a small dot near tagline

  // Wordmark + tagline rendered as SVG to control typography
  // Place left-side: x ~200, wordmark big, tagline below
  const textSVG = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .word { font-family: 'Cormorant Garamond', 'EB Garamond', Garamond, serif; font-weight: 400; }
        .tag  { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; font-weight: 300; letter-spacing: 0.06em; }
      </style>
      <text x="200" y="380" class="word" fill="${CHARCOAL}" font-size="110">Calm <tspan fill="${TERRACOTTA}">&amp;</tspan> Oak</text>
      <line x1="200" y1="430" x2="380" y2="430" stroke="${TERRACOTTA}" stroke-width="2"/>
      <text x="200" y="490" class="tag" fill="${GRAPHITE}" font-size="32" letter-spacing="3">QUIET ART FOR CONSIDERED HOMES.</text>
      <text x="200" y="540" class="tag" fill="${GRAPHITE}" font-size="22" opacity="0.7" letter-spacing="2">30 hand-curated Japandi prints · printed in the US on 250 gsm museum-matte</text>
    </svg>`;
  const textBuf = await sharp(Buffer.from(textSVG)).png().toBuffer();

  // Compose the triptych on the right side
  // Each print on the band — bottom of frame just touches top of band
  const printsBottom = bandTop + 20;            // overlap band slightly
  const printsTop = printsBottom - printH;

  // Shift triptych right of centre to avoid wordmark area
  const rightTriptychLeft = Math.round(W * 0.55);

  const composites = [];
  framed.forEach((buf, i) => {
    const x = rightTriptychLeft + i * (printW + gap);
    composites.push({ input: buf, left: x, top: printsTop });
  });

  // A single warm "vase" + "branch" silhouette beside the triptych — minimal decoration
  // Skip for now — clean is better

  // Final composite
  const out = await sharp(bgBuf)
    .composite([...composites, { input: textBuf, left: 0, top: 0 }])
    .png({compressionLevel: 9})
    .toBuffer();

  // Save full + 1× resize for preview
  fs.writeFileSync(path.join(__dirname, 'assets/img/etsy-banner.png'), out);

  // Also save a JPEG version (smaller, Etsy may prefer)
  await sharp(out).jpeg({quality: 92, mozjpeg: true}).toFile(path.join(__dirname, 'assets/img/etsy-banner.jpg'));

  // Stats
  const meta = await sharp(out).metadata();
  const png = fs.statSync(path.join(__dirname, 'assets/img/etsy-banner.png')).size;
  const jpg = fs.statSync(path.join(__dirname, 'assets/img/etsy-banner.jpg')).size;
  console.log('Banner:', meta.width + 'x' + meta.height);
  console.log('PNG:', (png/1024).toFixed(0) + 'kb');
  console.log('JPG:', (jpg/1024).toFixed(0) + 'kb');
  console.log('Saved to:');
  console.log('  assets/img/etsy-banner.png');
  console.log('  assets/img/etsy-banner.jpg');
})().catch(e => { console.error(e); process.exit(1); });
