// Generates _gelato-sets.json — 10 curated set-of-3 listings with titles, descriptions, and pricing.
// Mirrors the v2 individual-print structure but for bundles.
//
// Run:  node _gelato-sets-build.js

const fs = require('fs');
const path = require('path');

const SETS = [
  // 3 sumi-e triptychs
  { id:'sumi-essentials', name:'Sumi-e Essentials',
    series:'Sumi-e', members:['enso','mountain-mist','crane'],
    hook:'The three quietest pieces in the Sumi-e series — the brushstroke, the mountain, the bird. Each drawn in a single breath; together, a complete meditation wall.',
    titleKW:'Sumi-e Print Set of 3, Japandi Wall Art Gallery Wall, Japanese Ink Triptych, Above-Bed Decor',
    seoOpen:'Sumi-e print set of 3 — minimalist Japanese ink gallery wall on museum-quality 250gsm matte paper. Enso, Mountain Mist, and Crane. A calm Japandi triptych for bedroom, meditation space, or above-bed wall.',
    useCase:'meditation studios, yoga teachers, anniversary gifts (the crane is the Japanese marriage symbol), Japandi bedrooms, and above-bed decor',
    tagSet:'sumi-e' },

  { id:'sumi-botanical', name:'Sumi-e Botanical',
    series:'Sumi-e', members:['bent-reed','bamboo','cherry-branch'],
    hook:'Three botanical sumi-e moments — autumn reed, three bamboo stalks, a single sakura branch. The seasons compressed onto one wall.',
    titleKW:'Sumi-e Botanical Set of 3, Japandi Wall Art, Japanese Ink Plant Print Trio, Gallery Wall',
    seoOpen:'Sumi-e botanical print set of 3 — minimalist Japanese ink trio on museum-quality 250gsm matte paper. Bent Reed, Three Bamboo, and Cherry Branch. A warm Japandi triptych for dining room, kitchen, or above-bed wall.',
    useCase:'dining rooms, kitchens, spring or anniversary gifts, Japandi homes, and slow-living interiors',
    tagSet:'sumi-e' },

  { id:'sumi-water', name:'Sumi-e Calm Waters',
    series:'Sumi-e', members:['koi','mountain-stream','tsuki'],
    hook:'Three pieces about stillness in motion — a koi crossing still water, a waterfall as one decisive brushstroke, an empty wabi-sabi tea bowl. The persistence triptych.',
    titleKW:'Sumi-e Set of 3, Koi Waterfall Tea Bowl Wall Art, Japanese Ink Triptych, Japandi Decor',
    seoOpen:'Sumi-e calm waters print set of 3 — Koi, Mountain Stream, and Tsuki tea bowl on museum-quality 250gsm matte paper. A quiet Japandi triptych for office, tea room, or above-bed wall.',
    useCase:'home offices, tea rooms, courage or persistence gifts, Japandi bedrooms, and meditation studios',
    tagSet:'sumi-e' },

  // 2 botanical sets
  { id:'botanical-soft', name:'Botanical Soft',
    series:'Botanical Line', members:['single-stem','olive','eucalyptus'],
    hook:'Three single-line botanical pieces — one stoneware bud vase, an olive branch, a eucalyptus stem. The slow-kitchen wall.',
    titleKW:'Botanical Line Print Set of 3, Japandi Wall Art, Single-Line Botanical Trio, Kitchen Decor',
    seoOpen:'Botanical line print set of 3 — Single Stem, Olive Branch, and Eucalyptus on museum-quality 250gsm matte paper. A calm Japandi triptych for kitchen, dining room, or above-bed wall.',
    useCase:'kitchens, dining rooms, Mediterranean-leaning interiors, plant lovers, slow-living gifts',
    tagSet:'botanical' },

  { id:'botanical-wild', name:'Botanical Wild',
    series:'Botanical Line', members:['ginkgo','pampas','wild-grass'],
    hook:'Three textural botanicals — a fan-shaped ginkgo leaf, three pampas plumes, three blades of wild grass. The warm-autumn wall.',
    titleKW:'Botanical Set of 3, Japandi Wall Art, Ginkgo Pampas Wild Grass Trio, Autumn Decor',
    seoOpen:'Botanical wild print set of 3 — Ginkgo, Pampas, and Wild Grass on museum-quality 250gsm matte paper. A warm Japandi triptych for living room, autumn decor, or above-bed wall.',
    useCase:'living rooms, autumn decor refreshes, boho-Japandi interiors, plant lovers, slow-living gifts',
    tagSet:'botanical' },

  // 2 landscape sets
  { id:'landscape-quiet-sky', name:'Landscape Quiet Sky',
    series:'Minimalist Landscape', members:['horizon-bird','layers','serene-dawn'],
    hook:'Three pieces about the same horizon, drawn three ways — a single bird, a stack of bands, a soft dawn. The Japandi palette as a wall.',
    titleKW:'Minimalist Landscape Set of 3, Japandi Wall Art, Horizon Print Trio, Above-Couch Decor',
    seoOpen:'Minimalist landscape print set of 3 — Horizon Bird, Layers, and Serene Dawn on museum-quality 250gsm matte paper. A calm Japandi triptych for living room, bedroom, or above-couch wall.',
    useCase:'living rooms, Japandi bedrooms, slow-morning lovers, housewarmings, and above-couch decor',
    tagSet:'landscape' },

  { id:'landscape-night', name:'Landscape Night',
    series:'Minimalist Landscape', members:['moon-cycle','moonrise','dusk'],
    hook:'Three pieces about the hour before sleep — three moon phases, a luminous full moon, a lone tree at terracotta dusk. The late-evening wall.',
    titleKW:'Moon Print Set of 3, Japandi Wall Art, Lunar Phases Sunset Trio, Above-Bed Decor',
    seoOpen:'Moon and dusk print set of 3 — Moon Cycle, Moonrise, and Dusk on museum-quality 250gsm matte paper. A calm Japandi triptych for bedroom, nursery, or above-bed wall.',
    useCase:'bedrooms, nurseries, anniversary or new-baby gifts, Japandi interiors, and above-bed decor',
    tagSet:'landscape' },

  // calligraphy triptych
  { id:'calligraphy-triptych', name:'Japanese Calligraphy Triptych',
    series:'Japanese Calligraphy', members:['shizuka','wa','ma'],
    hook:'Shizuka 静 — stillness. Wa 和 — harmony. Ma 間 — the space between. The three Japanese characters that translate the Japandi premise directly.',
    titleKW:'Japanese Kanji Print Set of 3, Calligraphy Triptych, Shizuka Wa Ma Wall Art, Zen Decor',
    seoOpen:'Japanese calligraphy print set of 3 — Shizuka, Wa, Ma on museum-quality 250gsm matte paper. A quiet zen triptych for meditation studio, designer office, or above-bed wall.',
    useCase:'meditation studios, yoga teachers, designer offices, gifts for people who love Japan, and intentional housewarmings',
    tagSet:'calligraphy' },

  // tonal triptych
  { id:'tonal-triptych', name:'Tonal Study Triptych',
    series:'Tonal Study', members:['two-woods','warm-earth','sage-stone'],
    hook:'Three color studies — oak and walnut, terracotta and oat, sage and stone. The entire Calm & Oak palette as a wall.',
    titleKW:'Tonal Study Set of 3, Japandi Color Field Triptych, Earth Tone Abstract Trio, Above-Couch Decor',
    seoOpen:'Tonal study print set of 3 — Two Woods, Warm Earth, and Sage Stone on museum-quality 250gsm matte paper. A modernist Japandi triptych for living room, office, or above-couch wall.',
    useCase:'modernist living rooms, designer offices, architect studios, color-led Japandi interiors, and above-couch decor',
    tagSet:'tonal' },

  // wabi-sabi triptych
  { id:'wabi-sabi-triptych', name:'Wabi-Sabi Still Life',
    series:'Wabi-Sabi Still Life', members:['balance','chado','linen-morning'],
    hook:'Three still-life pieces about the practice of doing one quiet thing well — stacked stones, a tea ceremony, light through a linen curtain.',
    titleKW:'Wabi-Sabi Print Set of 3, Japandi Still Life Triptych, Mindful Wall Art, Above-Bed Decor',
    seoOpen:'Wabi-sabi still life print set of 3 — Balance, Chado, and Linen Morning on museum-quality 250gsm matte paper. A mindful Japandi triptych for bedroom, meditation space, or above-bed wall.',
    useCase:'meditation studios, yoga teachers, mindful gifts, slow-morning lovers, and Japandi bedrooms',
    tagSet:'stills' },
];

const SERIES_KEYWORDS = {
  'sumi-e':      'Japandi wall art set • sumi-e ink triptych • Japanese ink gallery wall • zen wall art set • wabi-sabi decor • meditation art • above bed gallery wall',
  'botanical':   'Botanical line art set • Japandi botanical triptych • single-line drawing trio • minimalist botanical set • zen wall art • neutral wall decor • plant lover gift set',
  'landscape':   'Minimalist landscape set • Japandi landscape triptych • abstract horizon trio • neutral wall art set • nature wall art • soft landscape • above bed gallery wall',
  'calligraphy': 'Japanese calligraphy set • kanji wall art triptych • zen wall art set • meditation art • Japandi decor • Japanese wall art trio',
  'tonal':       'Tonal study set • color field art triptych • Japandi abstract trio • minimalist abstract set • earth tone wall art • above couch gallery wall',
  'stills':      'Wabi-sabi still life set • Japandi still life triptych • mindful wall art set • slow-living decor • zen still life • above bed gallery wall',
};

// Individual prices: 8x10=$28, 11x14=$42, 16x20=$68
// Bundle = 3× individual × 0.78 (22% off)
const BUNDLE = {
  '8x10':  Math.round(28 * 3 * 0.78),   // $66
  '11x14': Math.round(42 * 3 * 0.78),   // $98
  '16x20': Math.round(68 * 3 * 0.78),   // $159 (round down to $158 for cleaner price)
};
// Force clean ending
BUNDLE['16x20'] = 158;

const INDIV = { '8x10':28, '11x14':42, '16x20':68 };
const SAVINGS = {
  '8x10': INDIV['8x10']*3 - BUNDLE['8x10'],
  '11x14': INDIV['11x14']*3 - BUNDLE['11x14'],
  '16x20': INDIV['16x20']*3 - BUNDLE['16x20'],
};

// load individuals for cross-link names
const v2 = require('./_gelato-listings-v2.json');
const indMap = Object.fromEntries(v2.prints.map(p=>[p.slug,p]));

function buildDescription(s){
  const memberNames = s.members.map(slug => indMap[slug].name);
  const kw = SERIES_KEYWORDS[s.tagSet];
  return [
    s.seoOpen,
    ``,
    `*${s.name}* — ${s.hook}`,
    ``,
    `A curated triptych from our **${s.series}** series — three prints designed to balance as a single gallery wall. Available individually here: *${memberNames[0]}*, *${memberNames[1]}*, *${memberNames[2]}*.`,
    ``,
    `**Set sizes — all fit standard frames**`,
    `• Three 8×10 in — $${BUNDLE['8x10']} (save $${SAVINGS['8x10']} vs individuals)`,
    `• Three 11×14 in — $${BUNDLE['11x14']} (save $${SAVINGS['11x14']})`,
    `• Three 16×20 in — $${BUNDLE['16x20']} (save $${SAVINGS['16x20']})`,
    ``,
    `**Materials**`,
    `• Museum-quality matte fine-art posters, 250 gsm each`,
    `• Acid-free, FSC-certified archival paper`,
    `• Warm off-white background — not bright white`,
    `• Original Calm & Oak artwork, drawn in-house`,
    ``,
    `**Made to order.** Each print is produced separately and shipped together flat. Allow 3–5 business days before dispatch. Unframed — frame separately for the cleanest look.`,
    ``,
    `A quiet gift for ${s.useCase}.`,
    ``,
    kw
  ].join('\n');
}

function buildTitle(s){
  const tail = ` | ${s.name} by Calm & Oak`;
  let t = `${s.titleKW}${tail}`;
  if (t.length > 140) t = `${s.titleKW} | ${s.name}`;
  if (t.length > 140) t = `${s.titleKW.slice(0, 140 - tail.length - 1)}…${tail}`;
  return t;
}

const out = {
  _version: 'v1 — 2026-05-31',
  _bundleStrategy: '22% off sum-of-three. Saving shown as explicit dollar amount, not %. Set listed as separate Etsy listing in addition to Mix & Match cross-link on individuals.',
  _pricing: BUNDLE,
  _savings: SAVINGS,
  _individualPriceReference: INDIV,
  _crossLinkCopyForIndividualListings: 'Part of the {{SeriesName}} series. Save ${{Savings}} with the curated set of three — see "{{SetName}}" in our shop. Designed to balance as a gallery wall or stand alone.',
  sets: SETS.map(s => ({
    id: s.id,
    name: s.name,
    series: s.series,
    tagSet: s.tagSet,
    title: buildTitle(s),
    titleLen: buildTitle(s).length,
    description: buildDescription(s),
    members: s.members.map(slug => ({
      slug,
      name: indMap[slug].name,
      individualTitle: indMap[slug].title
    })),
    pricing: BUNDLE
  }))
};

fs.writeFileSync(path.join(__dirname, '_gelato-sets.json'), JSON.stringify(out, null, 2), 'utf8');

// Sanity report
const long = out.sets.filter(s => s.titleLen > 140);
console.log('Wrote ' + out.sets.length + ' set listings to _gelato-sets.json');
console.log('Titles > 140 chars: ' + long.length);
console.log('\nAll 10 sets:');
out.sets.forEach(s => console.log('  ' + s.id.padEnd(24) + ' title:' + String(s.titleLen).padStart(3) + '/140  desc:' + s.description.length + 'chars  members: ' + s.members.map(m=>m.slug).join('+')));
console.log('\n--- SAMPLE (Calligraphy Triptych) ---');
const samp = out.sets.find(s => s.id === 'calligraphy-triptych');
console.log('TITLE [' + samp.titleLen + ' chars]:\n  ' + samp.title);
console.log('\nDESCRIPTION:\n' + samp.description);
