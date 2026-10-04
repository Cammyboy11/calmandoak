#!/usr/bin/env node
/**
 * _asin-to-pin.js — Calm & Oak tracked product crop -> 2:3 pin canvas.
 *
 * The site's tracked product photos (assets/img/products-cropped/p-<ASIN>.jpg)
 * are 4:5 (800x1000), not the 2:3 (1000x1500) canvas _pin-to-reel.js expects.
 * Feeding a 4:5 image straight into that script would stretch the product and
 * break the SAFEGUARDS picture-product match. This builds a proper 2:3 pin
 * first: a blurred, darkened cover-fill background (no stretch, no bars) with
 * the untouched product photo contain-fit and centered on top.
 *
 * Promoted from the one-off ffmpeg step first used in the 2026-09-27
 * content-factory batch (recommended for promotion in that batch's manifest).
 *
 * Usage: node _asin-to-pin.js <input.jpg> <output.jpg>
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error('Usage: node _asin-to-pin.js <input.jpg> <output.jpg>');
  process.exit(2);
}
if (!fs.existsSync(input)) { console.error('Input not found: ' + input); process.exit(2); }
fs.mkdirSync(path.dirname(output), { recursive: true });

const W = 1000, H = 1500;
const filter = [
  `[0:v]split=2[bg][fg]`,
  `[bg]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},boxblur=20:4,eq=brightness=-0.08:saturation=0.9[bgout]`,
  `[fg]scale=${W}:${H}:force_original_aspect_ratio=decrease[fgout]`,
  `[bgout][fgout]overlay=(W-w)/2:(H-h)/2[v]`,
].join(';');

const args = [
  '-y', '-i', input,
  '-filter_complex', filter,
  '-map', '[v]',
  '-frames:v', '1',
  '-q:v', '2',
  output,
];

console.log('Building ' + path.basename(output) + ' (2:3, ' + W + 'x' + H + ')...');
const r = spawnSync(ffmpeg, args, { stdio: ['ignore', 'inherit', 'inherit'] });
if (r.status === 0 && fs.existsSync(output)) {
  console.log('OK -> ' + output + ' (' + Math.round(fs.statSync(output).size / 1024) + ' KB)');
} else {
  console.error('ffmpeg failed (status ' + r.status + ')');
  process.exit(1);
}
