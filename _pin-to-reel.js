#!/usr/bin/env node
/**
 * _pin-to-reel.js — Calm & Oak pin → 9:16 Reel/TikTok/Story video.
 *
 * Converts a static 1000x1500 (2:3) pin into a 1080x1920 (9:16) video:
 *   - blurred, slightly-darkened fill background (no ugly letterbox bars)
 *   - the sharp pin centered with a slow Ken Burns push (editorial, calm)
 *   - gentle fade in / fade out
 * Reuses ffmpeg-static (already in node_modules). No new dependencies, no API cost.
 *
 * Usage:  node _pin-to-reel.js <input.jpg> <output.mp4> [durationSeconds=10]
 *
 * SAFEGUARDS note: this does NOT alter the product shown — the same vetted
 * frame the pin was QA'd on is what appears, so picture↔product identity holds.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const [, , input, output, durArg = '10'] = process.argv;
if (!input || !output) {
  console.error('Usage: node _pin-to-reel.js <input.jpg> <output.mp4> [durationSeconds]');
  process.exit(2);
}
if (!fs.existsSync(input)) { console.error('Input not found: ' + input); process.exit(2); }
fs.mkdirSync(path.dirname(output), { recursive: true });

const fps = 30;
const dur = Math.max(4, parseFloat(durArg) || 10);
const frames = Math.round(dur * fps);
const outStart = (dur - 0.7).toFixed(2);

// Single still -> split into background + foreground passes.
const filter = [
  `[0:v]split=2[a][b]`,
  // blurred fill background covering the full 9:16 frame
  `[a]zoompan=z=1:d=${frames}:s=1080x1920:fps=${fps},boxblur=28:4,eq=brightness=-0.05:saturation=0.95[bg]`,
  // sharp foreground (2:3 -> 1080x1620) with a slow zoom-in
  `[b]zoompan=z='min(zoom+0.0006,1.15)':d=${frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1620:fps=${fps}[fg]`,
  // center foreground over background, add fades
  `[bg][fg]overlay=(W-w)/2:(H-h)/2,fade=t=in:st=0:d=0.7,fade=t=out:st=${outStart}:d=0.7,format=yuv420p[v]`,
].join(';');

const args = [
  '-y', '-i', input,
  '-filter_complex', filter,
  '-map', '[v]',
  '-r', String(fps),
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  output,
];

console.log('Rendering ' + path.basename(output) + ' (' + dur + 's, 1080x1920)...');
const r = spawnSync(ffmpeg, args, { stdio: ['ignore', 'inherit', 'inherit'] });
if (r.status === 0 && fs.existsSync(output)) {
  const kb = Math.round(fs.statSync(output).size / 1024);
  console.log('OK -> ' + output + ' (' + kb + ' KB)');
} else {
  console.error('ffmpeg failed (status ' + r.status + ')');
  process.exit(1);
}
