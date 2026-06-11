const fs = require('fs'), path = require('path');
const ROOT = __dirname;
let sharp; try { sharp = require('sharp'); } catch(e) { sharp = null; }

function walk(dir, out=[]) {
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === '_tools') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}
const dimCache = {};
async function dims(src) {
  if (!sharp) return null;
  let rel = src.split('?')[0].split('#')[0];
  if (!rel.startsWith('/assets/')) return null;
  const file = path.join(ROOT, rel.replace(/^\//,'').split('/').join(path.sep));
  if (dimCache[file] !== undefined) return dimCache[file];
  try { const m = await sharp(file).metadata(); dimCache[file] = (m.width&&m.height)?{w:m.width,h:m.height}:null; }
  catch { dimCache[file] = null; }
  return dimCache[file];
}

(async () => {
  let filesChanged=0, dimsAdded=0, lazyAdded=0;
  for (const file of walk(ROOT)) {
    let html = fs.readFileSync(file,'utf8'), orig = html, imgIdx = -1;
    const tags = html.match(/<img\b[^>]*>/g) || [];
    for (const tag of tags) {
      imgIdx++;
      const m = tag.match(/src="([^"]+)"/); if (!m) continue;
      let nt = tag;
      if (!/\bwidth=/.test(nt)) {
        const d = await dims(m[1]);
        if (d) { nt = nt.replace(/\/?>$/, ` width="${d.w}" height="${d.h}" />`); dimsAdded++; }
      }
      if (!/\bloading=/.test(nt) && imgIdx > 0) { // skip first img (likely LCP hero)
        nt = nt.replace(/\/?>$/, ' loading="lazy" />').replace(/ \/>\s*loading/,' loading'); lazyAdded++;
      }
      if (nt !== tag) html = html.replace(tag, nt);
    }
    if (html !== orig) { fs.writeFileSync(file, html, 'utf8'); filesChanged++; }
  }
  console.log('sharp available:', !!sharp);
  console.log('files changed:', filesChanged, '| width/height added:', dimsAdded, '| lazy added:', lazyAdded);
})();
