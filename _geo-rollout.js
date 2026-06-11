/* Inserts a GEO "In short" answer-first block near the top of each informational
   article (before the first <h2 id=), authored per page. Idempotent: skips pages
   that already have a .quick-answer block. */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const BLOCKS = {
  "japandi-color-palette": "<strong>The Japandi colour palette is a set of warm, muted neutrals — oat, cream, stone, charcoal and soft sage — anchored by natural wood tones, with at most one warm accent (usually terracotta) per room.</strong> It reads calm because it's built on a handful of reliable, repeatable combinations rather than random beige.",
  "japandi-materials-palette": "<strong>Japandi is a materials palette before it's a colour scheme: light and dark wood (oak and walnut), linen and wool, stoneware ceramics, paper, and rattan or bamboo — natural materials chosen for honesty and the way they age.</strong> Get the materials right and the colours mostly take care of themselves.",
  "japandi-styling-rules": "<strong>Japandi styling is what turns nice furniture into a calm room: keep most of every surface empty, limit a room to two wood tones, group objects in odd numbers, give each area one quiet focal point, and let texture — not colour or clutter — do the work.</strong>",
  "japandi-bedroom": "<strong>A Japandi bedroom pairs a low oak or walnut bed with stonewashed linen bedding in a muted palette (oat, stone, sage), soft paper or linen lighting, and almost nothing else — one artwork, one ceramic.</strong> It's the easiest room to get right because the work is mostly removing, not adding.",
  "japandi-living-room": "<strong>A Japandi living room is built around a low, neutral-linen sofa and one or two wood tones, with warmth coming from texture (a wool throw, a jute rug) and low, layered lighting rather than colour or clutter.</strong> The goal is a room that reads composed instead of busy — generous empty space included.",
  "japandi-dining-room": "<strong>A Japandi dining room is a few honest pieces and one good light, not a matching set: a solid-wood table, simple low chairs, stoneware tableware, and a single paper or bamboo pendant overhead.</strong> One quiet centrepiece finishes it.",
  "japandi-entryway": "<strong>A Japandi entryway uses a slim oak console, woven-basket storage, one mirror, a warm sconce or lamp, and a single tray or vessel for keys — calm, functional and decluttered.</strong> Because it's small, it's the fastest room in the house to transform.",
  "japandi-home-office": "<strong>A Japandi home office is calm and almost empty: a solid-wood desk, one simple chair, hidden cabling, warm task lighting, a single plant, and a clear surface.</strong> It's built for thinking rather than gear — most of the work is subtracting.",
  "japandi-bathroom": "<strong>A Japandi bathroom turns the most utilitarian room into a spa without touching the tile or fixtures — natural wood and stone accents, waffle linen, stoneware, a plant or two, warm light, and decluttered surfaces.</strong> Six small moves do almost all of it.",
  "japandi-outdoor": "<strong>Japandi outdoors means low teak or acacia furniture, neutral weather-ready textiles, potted greenery (olive, grasses, ferns) and soft lantern light — the same restraint, carried onto a porch, balcony or patio.</strong> Most of it works on as little as 25 square feet.",
  "sunday-morning-kitchen": "<strong>A Japandi kitchen is wood and stone, stoneware on open shelves, wooden utensils in a crock, and warm light — everyday clutter hidden, a few quiet objects left out.</strong> It's built around the small ritual corner where the coffee gets made.",
  "art-of-negative-space": "<strong>Negative space is the deliberate empty space around objects — the bare wall, the clear surface. Japanese design calls it <em>ma</em>, and it's the single principle that separates a calm room from a busy one.</strong> The Japandi rule of thumb: leave roughly 60% of any surface empty.",
  "two-woods-rule": "<strong>The two-woods rule is the Japandi guideline to use no more than two wood tones in a room — typically one light (oak or ash) and one darker (walnut), with one dominating.</strong> More than two wood species makes a room read like a furniture showroom; committing to two keeps it calm.",
  "single-stem-rule": "<strong>The single-stem rule comes from Japanese <em>ikebana</em>: a vase holds <em>one</em> stem — one branch, one sprig — never a bouquet.</strong> It's the cheapest, fastest way to make any surface look intentional, and a signature move of Japandi styling.",
  "the-30-30-30-rule": "<strong>The 30-30-30 rule is a simple formula for Japandi walls: about 30% art, 30% texture, and 40% empty space.</strong> It prevents both common mistakes — an overcrowded gallery wall and a flat blank plane — and makes every wall in the house easier to style.",
  "wabi-sabi-ceramics": "<strong>Wabi-sabi is the Japanese aesthetic of accepting imperfection as beauty — the slightly off-round bowl, the matte uneven glaze, the visible mark of the hand.</strong> In ceramics it's why some pottery reads expensive and some reads craft-fair, and it's the heart of a Japandi tableware collection.",
  "honest-materials": "<strong>Honest materials are the natural, unfaked materials Japandi is built from — solid wood, real linen and wool, stoneware, paper, rattan — left to show their grain, weave and age rather than hidden under paint or plastic.</strong> Recognising them at a glance is most of getting Japandi right.",
  "warmth-without-clutter": "<strong>Warmth without clutter is the Japandi fix for a room that's gone cold: instead of adding more objects, you vary the <em>texture</em> — linen against wool against jute, matte against grain.</strong> The room ends up layered and warm while staying spare.",
  "layering-textiles": "<strong>Layering textiles in Japandi follows the three-weight rule: combine a light fibre (linen), a medium one (cotton or a flatweave) and a heavy one (wool or jute) in the same space.</strong> It's the fastest way to add depth and warmth to a muted room without adding colour.",
  "storage-that-doesnt-look-like-storage": "<strong>In Japandi, storage is hidden by design — woven baskets, lidded boxes, slatted cabinets and benches that double as storage — so everyday clutter has a home that's beautiful enough to leave out.</strong> The calm open shelves in the photos only work because everything else is tucked away.",
  "lighting-the-five-pm-room": "<strong>Japandi lighting uses three layered light sources in every room — ambient, task and accent — on warm 2700K bulbs and dimmers, never a single overhead.</strong> It's the one decision that lets a room soften automatically from midday to evening.",
  "linen-vs-cotton-vs-wool": "<strong>Linen, cotton and wool each do a job in a Japandi room: linen for crisp, breathable bedding and drapery; cotton for soft, washable everyday textiles; wool for warmth and weight in throws and rugs.</strong> Used together, deliberately, they make a muted room feel layered rather than thin.",
  "linen-care": "<strong>Linen is tougher than it looks — stronger than cotton and softer every wash — but it's ruined by three habits: hot washes, harsh detergent, and over-drying.</strong> Wash cool, skip the fabric softener, and pull it from the dryer slightly damp, and it lasts decades.",
  "rug-sizing": "<strong>The most common rug mistake is going too small. The rug should sit under at least the front legs of the main furniture — a 5×7 floating under a coffee table is the error; 8×10 and 9×12 are the sizes that actually anchor a living room.</strong>",
  "nightstand-styling": "<strong>A well-styled Japandi nightstand uses about five objects in three categories — light (a lamp), function (a carafe or dish) and one quiet decorative piece (a single stem or small ceramic) — kept clear with a brief weekly reset.</strong> Restraint is what makes it read effortless.",
  "sofa-buying-guide": "<strong>Choosing a Japandi sofa comes down to five decisions, in order: a low profile with clean arms, a neutral natural-fibre cover (linen or cotton), the right scale for the room, a firm but comfortable seat, and a slipcover option.</strong> Get these right and the sofa anchors the room for a decade.",
  "why-your-kitchen-needs-a-tray": "<strong>A tray is the simplest Japandi kitchen fix: it corrals everyday counter clutter — oils, salt, the coffee things — into one intentional group, so a busy counter instantly reads calm and curated instead of cluttered.</strong>",
  "quiet-wardrobe": "<strong>A quiet wardrobe applies the same Japandi principles to clothing: fewer pieces, natural materials (linen, wool, cotton), a muted palette, and quality that ages well.</strong> The result is a small, coherent closet of things you actually wear, styled the way the rooms here are designed."
};

function aside(inner) {
  return '<aside class="quick-answer" style="background: var(--cream); border: 1px solid rgba(201,123,92,0.25); border-radius: 8px; padding: 1.5rem 1.75rem; margin: 2.5rem 0;">\n        <p style="font-family: var(--font-display); font-style: italic; font-size: 1.05rem; margin: 0 0 0.6rem; color: var(--charcoal);">In short</p>\n        <p style="margin: 0;">' + inner + '</p>\n      </aside>';
}

let done = [], skipped = [], noAnchor = [];
for (const slug in BLOCKS) {
  const f = path.join(ROOT, 'journal', slug, 'index.html');
  if (!fs.existsSync(f)) { skipped.push(slug + ' (missing file)'); continue; }
  let h = fs.readFileSync(f, 'utf8');
  if (h.indexOf('class="quick-answer"') !== -1) { skipped.push(slug + ' (already has block)'); continue; }
  const block = aside(BLOCKS[slug]);
  let inserted = false;
  h = h.replace(/(\r?\n)([ \t]*)(<h2 id=)/, function (m, nl, ind, h2) { inserted = true; return nl + ind + block + nl + nl + ind + h2; });
  if (!inserted) {
    h = h.replace(/(\r?\n)([ \t]*)(<h2[ >])/, function (m, nl, ind, h2) { inserted = true; return nl + ind + block + nl + nl + ind + h2; });
  }
  if (!inserted) { noAnchor.push(slug); continue; }
  fs.writeFileSync(f, h, 'utf8');
  done.push(slug);
}
console.log('Inserted GEO block on ' + done.length + ' pages.');
console.log('Done:', done.join(', '));
if (skipped.length) console.log('Skipped:', skipped.join(' | '));
if (noAnchor.length) console.log('NO <h2> anchor (needs manual):', noAnchor.join(', '));
