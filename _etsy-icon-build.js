// Generates the Etsy shop icon (500 × 500) for Calm & Oak.
// A wordless brand mark: the enso (single ink brushstroke circle) on warm-cream ground.
// Drawn as SVG with deliberate brush imperfection — the open ring + dry-brush feel.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SIZE = 500;

// Brand palette
const OFFWHITE = '#F7F4EE';
const CHARCOAL = '#2A2A28';
const TERRACOTTA = '#C97B5C';

// Build the enso SVG. The strokes use a Bezier path simulating a single brushstroke
// with varying thickness (thinner where the brush lifts) and an intentional gap (the wabi-sabi opening).
//
// Path: start at top-right (gap-open), sweep counter-clockwise around to ~340deg
const svg = `<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <!-- Warm cream ground -->
  <rect x="0" y="0" width="500" height="500" fill="${OFFWHITE}"/>

  <!-- Enso brushstroke: counter-clockwise from top-right, opening at ~30° from top -->
  <!-- Built as two arc segments + a small ink "lift" gap -->
  <g>
    <path d="M 320 145
             C 245 105, 145 140, 110 215
             C 75 290, 110 380, 195 410
             C 285 440, 380 410, 410 320
             C 425 270, 415 220, 385 185"
          fill="none"
          stroke="${CHARCOAL}"
          stroke-width="22"
          stroke-linecap="round"
          opacity="0.92"/>

    <!-- Subtle ink texture: a few short dry-brush dashes inside the stroke -->
    <path d="M 360 165 L 355 170" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
    <path d="M 130 240 L 135 250" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
    <path d="M 400 280 L 395 285" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
  </g>

  <!-- Tiny terracotta hanko seal in bottom-right (the Calm & Oak signature accent) -->
  <g transform="translate(420, 420)">
    <rect x="-22" y="-22" width="44" height="44" fill="${TERRACOTTA}" rx="2"/>
    <text x="0" y="6"
          font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="22"
          fill="${OFFWHITE}"
          text-anchor="middle"
          font-weight="500">C&amp;O</text>
  </g>
</svg>`;

(async () => {
  // Save SVG version (vector — perfect at any size, useful for the full brand kit)
  fs.writeFileSync(path.join(__dirname, 'assets/img/etsy-icon.svg'), svg);

  // Rasterize to PNG (Etsy needs raster)
  await sharp(Buffer.from(svg))
    .resize(SIZE, SIZE)
    .png({compressionLevel: 9})
    .toFile(path.join(__dirname, 'assets/img/etsy-icon.png'));

  // Also a tighter JPEG for size comparison
  await sharp(Buffer.from(svg))
    .resize(SIZE, SIZE)
    .jpeg({quality: 92, mozjpeg: true})
    .toFile(path.join(__dirname, 'assets/img/etsy-icon.jpg'));

  // Also output a small thumbnail to confirm legibility at Etsy's tiny display size
  await sharp(Buffer.from(svg))
    .resize(80, 80)
    .png({compressionLevel: 9})
    .toFile(path.join(__dirname, 'assets/img/etsy-icon-thumb-80.png'));

  const pngSize = fs.statSync(path.join(__dirname, 'assets/img/etsy-icon.png')).size;
  const jpgSize = fs.statSync(path.join(__dirname, 'assets/img/etsy-icon.jpg')).size;
  console.log('Icon: ' + SIZE + 'x' + SIZE);
  console.log('PNG: ' + (pngSize/1024).toFixed(0) + 'kb');
  console.log('JPG: ' + (jpgSize/1024).toFixed(0) + 'kb');
  console.log('Saved:');
  console.log('  assets/img/etsy-icon.svg   (vector source)');
  console.log('  assets/img/etsy-icon.png   (Etsy upload)');
  console.log('  assets/img/etsy-icon.jpg');
  console.log('  assets/img/etsy-icon-thumb-80.png   (legibility test)');
})().catch(e => { console.error(e); process.exit(1); });
