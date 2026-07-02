#!/usr/bin/env node
/**
 * _add-audio-bed.js — mux a soft, royalty-free ambient drone under a Reel.
 *
 * Generates the audio from scratch with ffmpeg (sine sources -> reverb/swell),
 * so it's 100% owned/royalty-free and fully automated — no licensing, no API.
 * Tone: a calm singing-bowl-style pad (A2+E3+A3 = open fifth + octave), warm
 * lowpass, light reverb, slow tremolo swell, long fades. Kept low as a bed.
 *
 * Usage: node _add-audio-bed.js <input.mp4> <output.mp4> [durationSeconds=16.3]
 *
 * NOTE: platform TRENDING audio can't be attached via API (licensing) — this is
 * the automated-fallback bed. For a specific trending sound, post natively.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

const [, , input, output, durArg = '16.3'] = process.argv;
if (!input || !output) { console.error('Usage: node _add-audio-bed.js <in.mp4> <out.mp4> [dur]'); process.exit(2); }
if (!fs.existsSync(input)) { console.error('Input not found: ' + input); process.exit(2); }
const dur = parseFloat(durArg) || 16.3;
const fadeOut = Math.max(0, dur - 2.5).toFixed(2);

const af = [
  '[1][2][3][4]amix=inputs=4:normalize=0',
  'volume=0.5',
  'vibrato=f=3:d=0.14',
  'aecho=0.8:0.9:880:0.3',
  'lowpass=f=2600',
  'tremolo=f=0.18:d=0.5',
  'afade=t=in:st=0:d=2.0',
  `afade=t=out:st=${fadeOut}:d=2.0`,
].join(',') + '[a]';

const args = [
  '-y', '-i', input,
  '-f', 'lavfi', '-i', 'sine=frequency=110:sample_rate=44100',
  '-f', 'lavfi', '-i', 'sine=frequency=220:sample_rate=44100',
  '-f', 'lavfi', '-i', 'sine=frequency=277.18:sample_rate=44100',
  '-f', 'lavfi', '-i', 'sine=frequency=329.63:sample_rate=44100',
  '-filter_complex', af,
  '-map', '0:v', '-map', '[a]',
  '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart',
  output,
];
console.log('Muxing ambient bed into ' + output + ' ...');
const r = spawnSync(ffmpeg, args, { stdio: ['ignore', 'ignore', 'inherit'] });
if (r.status === 0 && fs.existsSync(output)) {
  console.log('OK -> ' + output + ' (' + Math.round(fs.statSync(output).size / 1024) + ' KB)');
} else { console.e