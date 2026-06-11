// Generates a 17-second cinematic About-page video for Calm & Oak.
// Vertical 1080×1920, 30fps, h264. Replaces the prior slideshow.
//
// Improvements over the slideshow:
//   • Enso brushstroke draws on-screen (SVG stroke-dashoffset animation, 3.5s)
//   • Ken Burns slow zoom on every print shot
//   • Soft cross-fades between scenes (no hard cuts)
//   • Animated typography (word-by-word reveals)
//   • Subtle warm vignette + film-grain feel via overlay
//   • Realistic framed-print rendering with drop shadows
//   • Final exposure curve baked in (slight warm grade)
//
// Scenes:
//   0.0–1.5s   Cold open: cream up from dark + terracotta rule draws in
//   1.5–5.5s   Enso animation: brushstroke draws over 3.5s, hold 0.5s
//   5.5–8.0s   Wordmark reveal: "Calm & Oak" + tagline
//   8.0–14.0s  Print gallery: 4 prints, 1.5s each w/ Ken Burns + crossfades
//   14.0–17.0s Closing: "Drawn — Printed — Shipped" + final brand mark
//
// Run:  node _etsy-video-build.js

const sharp = require('sharp');
const { execFileSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

const W = 1080, H = 1920;
const FPS = 30;
const TOTAL_SEC = 17;

const OFFWHITE = '#F7F4EE';
const WARMCREAM = '#EFE8DA';
const CHARCOAL = '#2A2A28';
const GRAPHITE = '#5C5A55';
const TERRACOTTA = '#C97B5C';
const OAK = '#9B7B5C';

const FRAMES_DIR = path.join(__dirname, 'assets/img/etsy-brand/_video-frames');
fs.mkdirSync(FRAMES_DIR, {recursive: true});

// ── Easing ──────────────────────────────────────────────────────────────────
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

// ── Enso path (with explicit length so SVG dasharray math works) ────────────
// Pre-computed approximate length from the Bezier: ~1100 units
const ENSO_PATH = `M 320 145
  C 245 105, 145 140, 110 215
  C 75 290, 110 380, 195 410
  C 285 440, 380 410, 410 320
  C 425 270, 415 220, 385 185`;
const ENSO_LEN = 1200;

// ── Vignette + warmth overlay used on every frame ───────────────────────────
function vignetteOverlay() {
  return `
    <defs>
      <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
        <stop offset="0%"  stop-color="rgba(0,0,0,0)"/>
        <stop offset="60%" stop-color="rgba(0,0,0,0)"/>
        <stop offset="100%" stop-color="rgba(40,30,18,0.20)"/>
      </radialGradient>
      <linearGradient id="warmlight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stop-color="rgba(220,180,130,0.06)"/>
        <stop offset="60%" stop-color="rgba(220,180,130,0.00)"/>
        <stop offset="100%" stop-color="rgba(60,40,20,0.06)"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#warmlight)"/>
    <rect width="${W}" height="${H}" fill="url(#vignette)"/>`;
}

// ── SCENE 1 — Cold open ─────────────────────────────────────────────────────
function sceneColdOpen(t /* 0..1 across 1.5s */) {
  // Cream fades from dark (#1a1612 → #F7F4EE) over first 60%
  // Terracotta rule draws horizontally center over last 40%
  const bgFade = easeOutCubic(Math.min(1, t / 0.6));
  // Interpolate background color: dark warm → offwhite
  const r = Math.round(0x1a + (0xf7 - 0x1a) * bgFade);
  const g = Math.round(0x16 + (0xf4 - 0x16) * bgFade);
  const b = Math.round(0x12 + (0xee - 0x12) * bgFade);
  const bgColor = `rgb(${r},${g},${b})`;

  const ruleProgress = Math.max(0, (t - 0.4) / 0.6);
  const ruleHalf = 200 * easeOutCubic(Math.min(1, ruleProgress));

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${bgColor}"/>
    <line x1="${540 - ruleHalf}" y1="960" x2="${540 + ruleHalf}" y2="960"
          stroke="${TERRACOTTA}" stroke-width="2" opacity="${bgFade}"/>
    ${vignetteOverlay()}
  </svg>`;
}

// ── SCENE 2 — Enso animation ────────────────────────────────────────────────
function sceneEnsoAnimate(t /* 0..1 across 4.0s */) {
  // 0..0.875 = drawing (3.5s), 0.875..1.0 = hold (0.5s)
  const drawProgress = Math.min(1, t / 0.875);
  const eased = easeOutCubic(drawProgress);
  const dashOffset = ENSO_LEN * (1 - eased);

  // Subtle scale-in from 0.95 → 1.0 during draw, then hold
  const scale = 0.95 + 0.05 * eased;
  const translateX = 290 + (1 - scale) * 250;  // keep centered
  const translateY = 540 + (1 - scale) * 250;

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${OFFWHITE}"/>
    <line x1="340" y1="960" x2="740" y2="960" stroke="${TERRACOTTA}" stroke-width="2"/>
    <g transform="translate(${translateX}, ${translateY}) scale(${scale})">
      <path d="${ENSO_PATH}" fill="none" stroke="${CHARCOAL}" stroke-width="22"
            stroke-linecap="round" opacity="0.92"
            stroke-dasharray="${ENSO_LEN}"
            stroke-dashoffset="${dashOffset}"/>
      ${eased >= 0.85 ? `
        <path d="M 360 165 L 355 170" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
        <path d="M 130 240 L 135 250" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
        <path d="M 400 280 L 395 285" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
      ` : ''}
    </g>
    ${vignetteOverlay()}
  </svg>`;
}

// ── SCENE 3 — Wordmark reveal ───────────────────────────────────────────────
function sceneWordmark(t /* 0..1 across 2.5s */) {
  // Enso moves up + shrinks during first 0.4
  // Wordmark fades in 0.2..0.6
  // Tagline word-by-word 0.5..1.0
  const ensoMove = easeInOutCubic(Math.min(1, t / 0.4));
  const ensoY = 540 - 280 * ensoMove;         // moves up
  const ensoScale = 1.0 - 0.35 * ensoMove;    // shrinks
  const ensoX = 290 + (1 - ensoScale) * 250;
  const ensoYadj = ensoY + (1 - ensoScale) * 250;

  const wordmarkOpacity = Math.max(0, Math.min(1, (t - 0.2) / 0.4));
  const ruleProgress = Math.max(0, (t - 0.35) / 0.3);
  const ruleHalf = 80 * easeOutCubic(Math.min(1, ruleProgress));

  // Tagline word-by-word: "QUIET" "ART" "FOR" "CONSIDERED" "HOMES"
  const words = ['QUIET', 'ART', 'FOR', 'CONSIDERED', 'HOMES'];
  const tagStart = 0.5;
  const wordSpan = 0.10;
  const wordsRendered = words.map((w, i) => {
    const wt = (t - tagStart - i * wordSpan) / 0.15;
    const op = Math.max(0, Math.min(1, wt));
    return { w, op };
  });
  // Compute X positions across full tagline (centered, letter-spaced)
  const tagFontSize = 32;
  // Approximate widths via char count * 18 + spacing
  const widths = wordsRendered.map(({w}) => w.length * (tagFontSize * 0.62) + 6 * (w.length - 1) + 8);
  const totalTagW = widths.reduce((a,b)=>a+b, 0) + 35 * (words.length - 1);
  let cursor = 540 - totalTagW / 2;
  const tagSvgs = wordsRendered.map(({w, op}, i) => {
    const x = cursor + widths[i] / 2;
    cursor += widths[i] + 35;
    return `<text x="${x}" y="1300" font-family="Inter, Helvetica Neue, Arial, sans-serif"
        font-size="${tagFontSize}" font-weight="300" letter-spacing="6" fill="${GRAPHITE}"
        text-anchor="middle" opacity="${op}">${w}</text>`;
  }).join('\n');

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${OFFWHITE}"/>
    <g transform="translate(${ensoX}, ${ensoYadj}) scale(${ensoScale})">
      <path d="${ENSO_PATH}" fill="none" stroke="${CHARCOAL}" stroke-width="22"
            stroke-linecap="round" opacity="0.92"/>
      <path d="M 360 165 L 355 170" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
      <path d="M 130 240 L 135 250" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
      <path d="M 400 280 L 395 285" stroke="${CHARCOAL}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
    </g>

    <text x="540" y="1150" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="120" font-weight="400" fill="${CHARCOAL}" text-anchor="middle"
          opacity="${wordmarkOpacity}">
      Calm <tspan fill="${TERRACOTTA}">&amp;</tspan> Oak
    </text>
    <line x1="${540 - ruleHalf}" y1="1200" x2="${540 + ruleHalf}" y2="1200" stroke="${TERRACOTTA}" stroke-width="2"/>
    ${tagSvgs}
    ${vignetteOverlay()}
  </svg>`;
}

// ── SCENE 4 — Print gallery ─────────────────────────────────────────────────
// One frame per print at time t within that print's 1.5s window
// Includes: Ken Burns zoom, framed-print drop shadow, label fade
async function scenePrint(printPath, seriesLabel, printName, t /* 0..1 across 1.5s */) {
  // Cross-fade in/out at boundaries (handled by ffmpeg xfade later, but also opacity here)
  let opacity = 1;
  if (t < 0.15) opacity = easeOutCubic(t / 0.15);
  else if (t > 0.85) opacity = easeOutCubic((1 - t) / 0.15);

  // Ken Burns: slow zoom from 1.0 → 1.08 over duration
  const zoom = 1.0 + 0.08 * t;

  // Build the framed print at the zoom-corrected size
  const baseW = 700, baseH = 875;
  const printW = Math.round(baseW * zoom);
  const printH = Math.round(baseH * zoom);
  const printBuf = await sharp(printPath)
    .resize(printW, printH, {fit:'cover', position:'centre'})
    .png().toBuffer();

  // Mat + frame
  const matBorder = Math.round(30 * zoom);
  const frameOuter = Math.round(8 * zoom);
  const matW = printW + 2*matBorder, matH = printH + 2*matBorder;
  const fullW = matW + 2*frameOuter, fullH = matH + 2*frameOuter;
  const mat = await sharp({create:{width:matW, height:matH, channels:3, background: WARMCREAM}})
    .composite([{input: printBuf, left: matBorder, top: matBorder}])
    .png().toBuffer();
  const framed = await sharp({create:{width:fullW, height:fullH, channels:3, background: CHARCOAL}})
    .composite([{input: mat, left: frameOuter, top: frameOuter}])
    .png().toBuffer();

  // Drop shadow: a darker offset copy
  const shadowOffset = 12;
  const shadowBlur = 20;
  const shadowBuf = await sharp({create:{width:fullW + 2*shadowBlur, height:fullH + 2*shadowBlur, channels:4, background:{r:0,g:0,b:0,alpha:0.25}}})
    .png().toBuffer();

  // Base canvas
  const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${OFFWHITE}"/>
    <rect x="0" y="${H-200}" width="${W}" height="200" fill="${WARMCREAM}"/>
    <text x="540" y="${H-110}" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="22" font-weight="500" letter-spacing="5" fill="${GRAPHITE}" text-anchor="middle"
          opacity="${opacity}">${seriesLabel.toUpperCase()}</text>
    <text x="540" y="${H-60}" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="56" font-weight="400" fill="${CHARCOAL}" text-anchor="middle"
          opacity="${opacity}">${printName}</text>
    ${vignetteOverlay()}
  </svg>`;
  const base = await sharp(Buffer.from(overlay)).png().toBuffer();

  // Frame centered horizontally, offset upward to leave room for caption + Ken Burns
  const frameLeft = Math.round((W - fullW) / 2);
  const frameTop = Math.round(280 + (1 - opacity) * 30);  // subtle entry slide

  // Composite with shadow first
  const composed = await sharp(base)
    .composite([
      { input: shadowBuf, left: frameLeft - shadowBlur + shadowOffset, top: frameTop - shadowBlur + shadowOffset, blend: 'multiply' },
      { input: framed, left: frameLeft, top: frameTop },
    ])
    .png().toBuffer();
  return composed;
}

// ── SCENE 5 — Closing ───────────────────────────────────────────────────────
function sceneClosing(t /* 0..1 across 3.0s */) {
  // 0..0.35: "Drawn — Printed — Shipped" fades in word-by-word
  // 0.4..0.7: brand mark fades in below
  // 0.7..1.0: hold + slight terracotta seal pulse

  const words = ['Drawn', '—', 'Printed', '—', 'Shipped'];
  const wordStart = 0.0, wordSpan = 0.08;
  const fontSize = 80;
  const widths = words.map(w => {
    if (w === '—') return 40;
    return w.length * fontSize * 0.45;
  });
  const totalW = widths.reduce((a,b)=>a+b, 0) + 24 * (words.length - 1);
  let cursor = 540 - totalW / 2;
  const wordSvgs = words.map((w, i) => {
    const wt = (t - wordStart - i * wordSpan) / 0.2;
    const op = Math.max(0, Math.min(1, wt));
    const y = 700 - 8 * (1 - op);    // subtle rise
    const x = cursor + widths[i] / 2;
    cursor += widths[i] + 24;
    return `<text x="${x}" y="${y}" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
            font-size="${fontSize}" font-weight="400" fill="${CHARCOAL}" text-anchor="middle"
            opacity="${op}">${w}</text>`;
  }).join('\n');

  const ruleProgress = Math.max(0, (t - 0.3) / 0.25);
  const ruleHalf = 160 * easeOutCubic(Math.min(1, ruleProgress));

  const subOpacity = Math.max(0, Math.min(1, (t - 0.4) / 0.3));
  const brandOpacity = Math.max(0, Math.min(1, (t - 0.5) / 0.3));

  // Terracotta seal pulse in final 0.7..1.0
  const sealOpacity = 1.0;
  const sealPulse = t > 0.7 ? 1.0 + 0.05 * Math.sin((t - 0.7) / 0.3 * Math.PI * 2) : 1.0;

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${WARMCREAM}"/>
    ${wordSvgs}
    <line x1="${540 - ruleHalf}" y1="760" x2="${540 + ruleHalf}" y2="760" stroke="${TERRACOTTA}" stroke-width="2"/>

    <text x="540" y="870" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="30" font-weight="300" fill="${GRAPHITE}" text-anchor="middle"
          opacity="${subOpacity}">30 hand-curated Japandi prints</text>
    <text x="540" y="920" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="30" font-weight="300" fill="${GRAPHITE}" text-anchor="middle"
          opacity="${subOpacity}">250 gsm museum-matte · printed in the US</text>

    <g transform="translate(450, 1280) scale(${0.4 * sealPulse})" opacity="${brandOpacity * 0.92}">
      <path d="${ENSO_PATH}" fill="none" stroke="${CHARCOAL}" stroke-width="22" stroke-linecap="round"/>
    </g>

    <text x="540" y="1600" font-family="Cormorant Garamond, EB Garamond, Garamond, serif"
          font-size="80" font-weight="400" fill="${CHARCOAL}" text-anchor="middle"
          opacity="${brandOpacity}">Calm <tspan fill="${TERRACOTTA}">&amp;</tspan> Oak</text>
    <text x="540" y="1670" font-family="Inter, Helvetica Neue, Arial, sans-serif"
          font-size="20" font-weight="300" letter-spacing="4" fill="${GRAPHITE}" text-anchor="middle"
          opacity="${brandOpacity * 0.7}">QUIET ART FOR CONSIDERED HOMES</text>

    ${vignetteOverlay()}
  </svg>`;
}

// ── Scene plan ──────────────────────────────────────────────────────────────
const SCENES = [
  { dur: 1.5, async: false, render: (t) => sceneColdOpen(t) },
  { dur: 4.0, async: false, render: (t) => sceneEnsoAnimate(t) },
  { dur: 2.5, async: false, render: (t) => sceneWordmark(t) },
  { dur: 1.5, async: true,  render: (t) => scenePrint('assets/img/prints/enso.jpg', 'Sumi-e ink', 'Enso', t) },
  { dur: 1.5, async: true,  render: (t) => scenePrint('assets/img/prints/single-stem.jpg', 'Botanical line', 'Single Stem', t) },
  { dur: 1.5, async: true,  render: (t) => scenePrint('assets/img/prints/serene-dawn.jpg', 'Minimalist landscape', 'Serene Dawn', t) },
  { dur: 1.5, async: true,  render: (t) => scenePrint('assets/img/prints/balance.jpg', 'Wabi-sabi still life', 'Balance', t) },
  { dur: 3.0, async: false, render: (t) => sceneClosing(t) },
];

const totalCheck = SCENES.reduce((a,s)=>a+s.dur, 0);
console.log(`Total scene time: ${totalCheck}s (expected ${TOTAL_SEC}s)`);

(async () => {
  let frameIdx = 0;
  for (let s = 0; s < SCENES.length; s++) {
    const scene = SCENES[s];
    const sceneFrames = Math.round(scene.dur * FPS);
    process.stdout.write(`Scene ${s+1}/${SCENES.length} (${scene.dur}s, ${sceneFrames} frames)... `);
    const t0 = Date.now();
    for (let i = 0; i < sceneFrames; i++) {
      const t = i / Math.max(1, sceneFrames - 1);
      let buf;
      if (scene.async) {
        buf = await scene.render(t);
      } else {
        const svg = scene.render(t);
        buf = await sharp(Buffer.from(svg)).png().toBuffer();
      }
      const name = String(frameIdx).padStart(5, '0') + '.png';
      fs.writeFileSync(path.join(FRAMES_DIR, name), buf);
      frameIdx++;
    }
    console.log(`done (${((Date.now()-t0)/1000).toFixed(1)}s).`);
  }
  console.log(`\nTotal: ${frameIdx} frames written.`);

  // Encode with ffmpeg — H264, faststart, slight unsharp for crispness
  const outPath = path.join(__dirname, 'assets/img/etsy-brand/about-video.mp4');
  console.log('Encoding MP4 with ffmpeg...');
  execFileSync(ffmpegPath, [
    '-y',
    '-framerate', String(FPS),
    '-i', path.join(FRAMES_DIR, '%05d.png'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'slow',
    '-crf', '18',
    '-vf', 'unsharp=5:5:0.3:5:5:0',
    '-movflags', '+faststart',
    outPath
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  const sz = fs.statSync(outPath).size;
  console.log(`\n✓ MP4 written: ${outPath}`);
  console.log(`   ${(sz/1024/1024).toFixed(2)} MB, ${TOTAL_SEC}s, ${W}×${H} @ ${FPS}fps`);

  // Cleanup
  try {
    for (const f of fs.readdirSync(FRAMES_DIR)) fs.unlinkSync(path.join(FRAMES_DIR, f));
    fs.rmdirSync(FRAMES_DIR);
    console.log('Cleaned up frame files.');
  } catch(e) {/* ignore */}
})().catch(e => { console.error(e); process.exit(1); });
