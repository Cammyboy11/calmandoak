// Reorder so prints come last:
//   Products (was 31-48)        → 01-18
//   Journal & Looks (was 49-60) → 19-30
//   Prints lifestyle (was 1-30) → 31-60
//   Prints flat-art (was 61-90) → unchanged at 61-90 (still last) — regenerated from new 31-60
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '_pins07.js');
let src = fs.readFileSync(file, 'utf8');

// (slug, newN) tuples — every non-flat slug in the spec
const PRODUCTS = ['oak-bed','oak-desk','donabe','lantern','meditation-cushion','taupe-throw','tall-planter','pampas-stems','bud-vase-set','acacia-tray','bedside-lamps','briful-vase','patio-chairs','stoneware-mugs','waffle-towels','seagrass-baskets','linen-duvet','bamboo-pendant'];
const JOURNAL  = ['japandi-101','japandi-bedroom','japandi-living-room','budget-bedroom','layering-textiles','lighting-five-pm','warmth-without-clutter','art-of-negative-space','honest-materials','wabi-sabi-ceramics','linen-care','sage-bedroom-look'];
const PRINTS   = ['enso','bent-reed','crane','mountain-mist','bamboo','cherry-branch','koi','mountain-stream','tsuki','single-stem','eucalyptus','olive','pampas','ginkgo','wild-grass','moon-cycle','horizon-bird','dusk','layers','moonrise','shizuka','wa','ma','two-woods','warm-earth','sage-stone','balance','chado','linen-morning','serene-dawn'];

const newN = {};
PRODUCTS.forEach((s,i) => newN[s] = i + 1);
JOURNAL.forEach((s,i)  => newN[s] = i + 19);
PRINTS.forEach((s,i)   => newN[s] = i + 31);

let changed = 0;
for (const [slug, n] of Object.entries(newN)) {
  // match `{ n:<oldN>,  slug:'<slug>',` and rewrite the n
  const re = new RegExp(`(\\{\\s*n:\\s*)\\d+(,\\s*slug:\\s*'${slug}',)`);
  if (re.test(src)) {
    src = src.replace(re, `$1${n}$2`);
    changed++;
  } else {
    console.log('  ✗ slug not found:', slug);
  }
}

// update the flat-variant generator to filter the NEW framed-print range (31-60)
src = src.replace(
  /P\.filter\(p => p\.n >= 1 && p\.n <= 30\)/,
  'P.filter(p => p.n >= 31 && p.n <= 60)'
);

fs.writeFileSync(file, src);
console.log(`renumbered ${changed} entries; flat-variant filter updated.`);
