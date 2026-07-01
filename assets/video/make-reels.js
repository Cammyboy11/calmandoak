/* make-reels.js — turn Calm & Oak print/room images into calm vertical Reels (1080x1920).
   Proven pipeline (validated 2026-06-30): slow Ken Burns zoom over the art, contained on a soft
   blurred background — the "slow living" feel that performs on IG Reels + TikTok.

   Usage:
     node assets/video/make-reels.js enso serene-dawn moon-cycle           # plain reels
     node assets/video/make-reels.js enso --hook "The one print that quiets a whole room"
     node assets/video/make-reels.js --all                                 # every print
   A --hook adds a bold text hook in the first second (dramatically lifts watch-time / viral odds).
   Output: ./_reels/<slug>.mp4  (gitignored). Then upload to Blotato + schedule (see SOCIAL-VIDEO-PLAYBOOK.md).
*/
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(ROOT, 'assets', 'img', 'prints');
const OUT = path.join(ROOT, '_reels');
fs.mkdirSync(OUT, { recursive: true });

// --- parse args: slugs + optional --hook "text" ---
let args = process.argv.slice(2);
let hook = '';
const hi = args.indexOf('--hook');
if (hi !== -1) { hook = args[hi + 1] || ''; args.splice(hi, 2); }
let slugs = args;
if (slugs[0] === '--all') slugs = fs.readdirSync(SRC).filter(f => f.endsWith('.jpg')).map(f => f.replace(/\.jpg$/, ''));
if (!slugs.length) { console.error('Usage: node assets/video/make-reels.js <slug...> [--hook "text"]'); process.exit(1); }

// word-wrap a hook to ~18 chars/line, max 3 lines
function wrap(t) {
  const words = t.split(/\s+/); const lines = []; let cur = '';
  for (const w of words) { if ((cur + ' ' + w).trim().length > 18 && cur) { lines.push(cur); cur = w; } else { cur = (cur + ' ' + w).trim(); } }
  if (cur) lines.push(cur);
  return lines.slice(0, 3).join('\n');
}

// drawtext needs colon-free relative paths, so we run ffmpeg with cwd=OUT and copy the font in.
let drawHook = '';
if (hook) {
  const fonts = ['C:/Windows/Fonts/georgiab.ttf', 'C:/Windows/Fonts/segoeuib.ttf', 'C:/Windows/Fonts/arialbd.ttf'];
  const font = fonts.find(f => fs.existsSync(f));
  if (font) {
    fs.copyFileSync(font, path.join(OUT, 'hookfont.ttf'));
    fs.writeFileSync(path.join(OUT, 'hook.txt'), wrap(hook));
    drawHook = ",drawtext=textfile=hook.txt:fontfile=hookfont.ttf:fontcolor=white:fontsize=70:line_spacing=16:x=(w-text_w)/2:y=170:box=1:boxcolor=black@0.33:boxborderw=34";
  } else { console.warn('no bold system font found — rendering without hook text'); }
}

// --audio (default ON): embed a soft, royalty-free ambient bed so reels are never silent
// (silent video is throttled on IG/TikTok). Use --no-audio for TikTok files that rely on autoAddMusic.
const audio = !args.includes('--no-audio'); slugs = slugs.filter(s => s !== '--no-audio');
const VID = "[0]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=28:4,eq=brightness=-0.06[bg];" +
  "[0]scale=900:-1[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1," +
  "zoompan=z='min(1+0.0009*on,1.12)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=25" +
  drawHook + ",format=yuv420p[v]";
const AUD = "sine=f=110:d=8[s1];sine=f=164.81:d=8[s2];[s1][s2]amix=inputs=2,volume=0.4[pad];" +
  "anoisesrc=d=8:c=brown:a=0.06[n];[pad][n]amix=inputs=2:duration=shortest:weights=1 0.5," +
  "lowpass=f=900,afade=t=in:st=0:d=1.6,afade=t=out:st=6.4:d=1.6[a]";
const FILTER = audio ? VID + ';' + AUD : VID;

for (const slug of slugs) {
  const img = path.join(SRC, slug + '.jpg');
  if (!fs.existsSync(img)) { console.log('skip (no image): ' + slug); continue; }
  const out = path.join(OUT, slug + (hook ? '-hook' : '') + '.mp4');
  const a = ['-y', '-loop', '1', '-i', img, '-t', '8', '-filter_complex', FILTER, '-map', '[v]'];
  if (audio) a.push('-map', '[a]', '-c:a', 'aac', '-b:a', '128k');
  a.push('-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-shortest', '-movflags', '+faststart', path.basename(out));
  execFileSync(ffmpeg, a, { stdio: 'ignore', cwd: OUT });
  console.log('built ' + path.relative(ROOT, out) + ' (' + Math.round(fs.statSync(out).size / 1024) + ' KB)' + (hook ? ' [hook]' : '') + (audio ? ' [sound]' : ' [silent]'));
}
console.log('Done. ' + slugs.length + ' reel(s) in _reels/.');
