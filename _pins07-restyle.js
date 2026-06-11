// Restyle: pins 1-48 → N (no overlay); pins 49-60 → L (light text, no box)
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '_pins07.js');
let src = fs.readFileSync(file, 'utf8');

let changed = 0;
for (let n = 1; n <= 60; n++) {
  const target = (n <= 48) ? 'N' : 'L';
  const re = new RegExp(`(\\{\\s*n:\\s*${n}\\b[^\\n]*?a:')([A-Z][A-Z0-9]?)(',)`);
  const m = re.exec(src);
  if (m && m[2] !== target) {
    src = src.replace(re, `$1${target}$3`);
    changed++;
  }
}
fs.writeFileSync(file, src);
console.log(`reassigned ${changed} entries (1-48 → N, 49-60 → L)`);
