#!/usr/bin/env node
/**
 * _pin-to-listicle.js — Calm & Oak fast-cut listicle Reel (9:16) for IG/TikTok/Pinterest.
 *
 * Builds a hook card -> N item cards (image + number + label) -> outro card,
 * each with a slow Ken Burns push, baked from existing static pins. Renders
 * multiple HOOK VARIANTS that share the same item/outro segments (cheap A/B).
 *
 * Reuses bundled ffmpeg-static + sharp. No new dependencies, no API cost.
 * Text via ffmpeg drawtext (Georgia bold serif headlines, Arial labels).
 *
 * Usage: node _pin-to-listicle.js <config.json>
 *
 * SAFEGUARDS note: cards show the SAME vetted pins; no product link is asserted
 * on-frame, so picture<->product identity holds. Add the FTC line in the caption
 * if the destination monetises.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');
const sharp = require('sharp');

const FONT = {
  serif: 'C\\:/Windows/Fonts/georgiab.ttf',
  serifReg: 'C\\:/Windows/Fonts/georgia.ttf',
  sans: 'C\\:/Windows/Fonts/arial.ttf',
};
const FPS = 30;
const W = 1080, H = 1920;

const cfgPath = process.argv[2];
if (!cfgPath || !fs.existsSync(cfgPath)) { console.error('Usage: node _pin-to-listicle.js <config.json>'); process.exit(2); }
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const root = cfg.imageRoot || '';
const outDir = cfg.outDir;
const segDir = path.join(outDir, '_segs');
fs.mkdirSync(segDir, { recursive: true });

const dur = Object.assign({ hook: 2.4, item: 2.3, outro: 2.6 }, cfg.durations || {});

// ---- build a styled base PNG: blurred fill bg + centered sharp pin ----
async function baseCard(imgAbs, outPng) {
  const fgW = 980;
  // Crop the pin's own baked-in text bands (eyebrow+title at top, watermark at
  // bottom) so OUR overlay is the only text. The 07-batch pins use a consistent
  // template; 16% top / 9% bottom removes the type without eating the scene.
  const meta = await sharp(imgAbs).metadata();
  const cropTop = Math.round(meta.height * 0.16);
  const cropBot = Math.round(meta.height * 0.09);
  const cropped = await sharp(imgAbs)
    .extract({ left: 0, top: cropTop, width: meta.width, height: meta.height - cropTop - cropBot })
    .toBuffer();
  const bg = await sharp(cropped).resize(W, H, { fit: 'cover' }).blur(26).modulate({ brightness: 0.55 }).toBuffer();
  const fg = await sharp(cropped).resize(fgW, null).toBuffer();
  const fgMeta = await sharp(fg).metadata();
  const top = Math.round((H - fgMeta.height) / 2);
  await sharp(bg).composite([{ input: fg, left: Math.round((W - fgW) / 2), top }]).png().toFile(outPng);
}

function dt(t) {
  const parts = [
    `drawtext=fontfile=${t.font}`,
    `text='${t.text}'`,
    `fontcolor=${t.color || 'white'}`,
    `fontsize=${t.size}`,
    `x=(w-text_w)/2`,
    `y=${t.y}`,
    `shadowcolor=black@0.55:shadowx=3:shadowy=3`,
  ];
  if (t.box) parts.push(`box=1:boxcolor=black@0.30:boxborderw=22`);
  return parts.join(':');
}

// ---- render one segment (1 still -> zoom + text + fades -> mp4) ----
function renderSeg(basePng, texts, seconds, outMp4) {
  const frames = Math.round(seconds * FPS);
  const vf = [
    `zoompan=z='min(zoom+0.0004,1.06)':d=${frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${FPS}`,
    ...texts.map(dt),
    `fade=t=in:st=0:d=0.4`,
    `fade=t=out:st=${(seconds - 0.4).toFixed(2)}:d=0.4`,
    `format=yuv420p`,
  ].join(',');
  const r = spawnSync(ffmpeg, ['-y', '-i', basePng, '-vf', vf, '-r', String(FPS),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', outMp4],
    { stdio: ['ignore', 'ignore', 'inherit'] });
  if (r.status !== 0 || !fs.existsSync(outMp4)) { throw new Error('seg render failed: ' + outMp4); }
}

function concat(segMp4s, outMp4) {
  const listFile = path.join(segDir, 'list-' + path.basename(outMp4) + '.txt');
  fs.writeFileSync(listFile, segMp4s.map(s => `file '${s.replace(/\\/g, '/')}'`).join('\n'));
  const r = spawnSync(ffmpeg, ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', '-movflags', '+faststart', outMp4],
    { stdio: ['ignore', 'ignore', 'inherit'] });
  if (r.status !== 0 || !fs.existsSync(outMp4)) { throw new Error('concat failed: ' + outMp4); }
}

(async () => {
  // shared item segments
  const itemSegs = [];
  for (let i = 0; i < cfg.items.length; i++) {
    const it = cfg.items[i];
    const png = path.join(segDir, `item${i + 1}.png`);
    await baseCard(path.join(root, it.image), png);
    const seg = path.join(segDir, `item${i + 1}.mp4`);
    renderSeg(png, [
      { font: FONT.sans, text: `${i + 1} OF ${cfg.items.length}`, size: 36, y: 1290, box: false },
      { font: FONT.serif, text: it.label, size: 78, y: 1350, box: true },
    ], dur.item, seg);
    itemSegs.push(seg);
    console.log('built item ' + (i + 1) + ': ' + it.label);
  }

  // shared outro
  const outroPng = path.join(segDir, 'outro.png');
  await baseCard(path.join(root, cfg.outro.image), outroPng);
  const outroSeg = path.join(segDir, 'outro.mp4');
  renderSeg(outroPng, [
    { font: FONT.serif, text: cfg.outro.line1, size: 88, y: 820, box: false },
    { font: FONT.serifReg, text: cfg.outro.line2, size: 52, y: 950, box: false },
  ], dur.outro, outroSeg);
  console.log('built outro');

  // per-hook variant
  for (const hook of cfg.hooks) {
    const hookPng = path.join(segDir, `hook${hook.id}.png`);
    await baseCard(path.join(root, hook.image), hookPng);
    const hookSeg = path.join(segDir, `hook${hook.id}.mp4`);
    renderSeg(hookPng, [
      { font: FONT.serif, text: hook.line1, size: 94, y: 760, box: true },
      { font: FONT.serifReg, text: hook.line2, size: 60, y: 900, box: true },
    ], dur.hook, hookSeg);
    const out = path.join(outDir, `${cfg.slug}-${hook.id}.mp4`);
    concat([hookSeg, ...itemSegs, outroSeg], out);
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`VARIANT ${hook.id} -> ${out} (${kb} KB)`);
  }
  console.log('done');
})().catch(e => { console.error(e.message); process.exit(1); });
