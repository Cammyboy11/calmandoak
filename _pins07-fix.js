// Targeted fix: reassign 13 problem pins to C2 (bottom box) or E2 (darker top gradient).
const fs = require('fs');
const path = require('path');
let src = fs.readFileSync(path.join(__dirname, '_pins07.js'), 'utf8');

const toC2 = ['bent-reed','mountain-stream','olive','layers','shizuka','wa','ma','serene-dawn','donabe','stoneware-mugs'];
const toE2 = ['mountain-mist','horizon-bird','bedside-lamps'];

let changed = 0;
for (const slug of toC2) {
  const re = new RegExp(`(slug:'${slug}',[^\\n]*?a:')C(',)`);
  const m = re.exec(src);
  if (m) { src = src.replace(re, `$1C2$2`); console.log(`  ✓ ${slug}: C → C2`); changed++; }
  else console.log(`  ✗ ${slug}: no C match`);
}
for (const slug of toE2) {
  const re = new RegExp(`(slug:'${slug}',[^\\n]*?a:')E(',)`);
  const m = re.exec(src);
  if (m) { src = src.replace(re, `$1E2$2`); console.log(`  ✓ ${slug}: E → E2`); changed++; }
  else console.log(`  ✗ ${slug}: no E match`);
}
fs.writeFileSync(path.join(__dirname, '_pins07.js'), src);
console.log(`\n${changed} reassignments written.`);
