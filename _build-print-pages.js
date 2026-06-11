/* Generates a story page for every print and rebuilds the prints-grid cards
   to the 3-action layout (Digital download / Shop on Etsy / Learn more).
   Links resolve at runtime via /assets/js/print-links.js (data-digital / data-etsy-print). */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const SERIES = {
  sumi:  { label: 'Sumi-e Ink',           anchor: 'sumi-e',      cat: 'Sumi-e' },
  bot:   { label: 'Botanical Line',        anchor: 'botanical',   cat: 'Botanical' },
  land:  { label: 'Minimalist Landscapes', anchor: 'landscape',   cat: 'Landscape' },
  call:  { label: 'Single Character',      anchor: 'calligraphy', cat: 'Calligraphy' },
  tonal: { label: 'Tonal Studies',         anchor: 'tonal',       cat: 'Tonal' },
  still: { label: 'Stills & Stories',      anchor: 'stills',      cat: 'Stills' }
};

// titleHtml = grid/h1 display (may contain entities); titleMeta = plain text for <title>/schema
const P = [
  { s:'enso', n:'01', k:'sumi', titleHtml:'Ensō', titleMeta:'Ensō',
    desc:'The incomplete circle &mdash; wabi-sabi&apos;s quietest, most famous mark.',
    story:['The ensō is the single most recognisable mark in Zen art &mdash; a circle drawn in one breath, with one brush, and never corrected. Ours is left open on purpose; the gap is the whole point. A closed circle is a statement, an open one an invitation.',
           'It asks for space rather than company. Hang it alone on a wide, calm wall, or above a low oak console with a single stoneware vessel beneath &mdash; the one piece in the room that asks you to slow down.'] },
  { s:'bent-reed', n:'02', k:'sumi', titleHtml:'Bent Reed', titleMeta:'Bent Reed',
    desc:'A single tall grass arching gracefully &mdash; one brushstroke, the whole season.',
    story:['A single tall grass, bowed under its own weight in one unbroken stroke. The bend is the meaning: it gives, but it does not break &mdash; the quiet resilience at the centre of the whole aesthetic.',
           'Slender and vertical, it suits a narrow wall, the side of a bookcase, or a pairing with one of the other sumi-e pieces. Quiet enough to live with for years.'] },
  { s:'crane', n:'03', k:'sumi', titleHtml:'The Crane', titleMeta:'The Crane',
    desc:'Tsuru in mid-flight &mdash; the symbol of longevity, drawn in one breath.',
    story:['Tsuru in mid-flight &mdash; neck stretched forward, wings open &mdash; drawn in a single held breath. In Japan the crane is the bird of longevity and good fortune, said to carry a thousand years on its back.',
           'It brings a sense of lift to a still wall without raising the volume. Beautiful over a console or a desk, or as the centre of a three-print sumi-e wall.'] },
  { s:'mountain-mist', n:'04', k:'sumi', titleHtml:'Mountain Mist', titleMeta:'Mountain Mist',
    desc:'A single peak emerging from soft ink wash &mdash; the contemplation piece.',
    story:['A single peak emerging from soft ink wash &mdash; there, then dissolving back into the paper. It is the contemplation piece: the mountain you can only half-see is the one you keep looking at.',
           'The graded wash reads as depth, so it makes a small wall feel deeper. Hang it where the eye rests &mdash; above the bed, or beside a reading chair.'] },
  { s:'bamboo', n:'05', k:'sumi', titleHtml:'Three Bamboo', titleMeta:'Three Bamboo',
    desc:'Three stalks rising at varied heights &mdash; the odd-number rule, in ink.',
    story:['Three stalks rising at different heights &mdash; the odd-number rule of Japandi styling, drawn in ink. Bamboo bends in every storm and stands again; it is the East-Asian symbol of integrity.',
           'The vertical lines draw the eye upward, which makes a low room feel taller. It works alone, or flanking a doorway.'] },
  { s:'cherry-branch', n:'06', k:'sumi', titleHtml:'Cherry Branch', titleMeta:'Cherry Branch',
    desc:'A single sakura branch with open blossoms and one fallen petal.',
    story:['A single sakura branch, a few open blossoms, and one petal already fallen. This is the transience piece &mdash; <em>mono no aware</em>, the gentle ache of things that do not last.',
           'Soft and seasonal without being sweet. It warms a bedroom or entryway, and pairs naturally with the more botanical sumi-e pieces.'] },
  { s:'koi', n:'07', k:'sumi', titleHtml:'Koi', titleMeta:'Koi',
    desc:'A single koi crossing still water, with two small vermillion accents.',
    story:['A single koi crossing still water, marked with two small strokes of vermillion. The koi swims upstream; it is the quiet symbol of perseverance, and of good things arriving.',
           'That one note of red is the only colour in the sumi-e series &mdash; a deliberate accent that lets the piece anchor a room of neutrals.'] },
  { s:'mountain-stream', n:'08', k:'sumi', titleHtml:'Mountain Stream', titleMeta:'Mountain Stream',
    desc:'A single decisive brushstroke down the page &mdash; water as gesture.',
    story:['One decisive vertical brushstroke down the page &mdash; water as pure gesture. No detail, no banks; just the movement of the thing.',
           'Tall and narrow, it suits the spaces other art cannot &mdash; a slim wall, a stairwell, the gap beside a tall shelf.'] },
  { s:'tsuki', n:'09', k:'sumi', titleHtml:'Tsuki', titleMeta:'Tsuki',
    desc:'An empty wabi-sabi tea bowl, tilted ever so slightly.',
    story:['An empty tea bowl, tilted ever so slightly off true. The imperfection is the point &mdash; <em>wabi-sabi</em> made visible in a single object.',
           'Understated to the edge of austere, it rewards a close, quiet wall &mdash; a hallway, a nook, the spot you pass every morning.'] },

  { s:'single-stem', n:'10', k:'bot', titleHtml:'Single Stem', titleMeta:'Single Stem',
    desc:'One dried stem in a stoneware bud vase &mdash; the whole philosophy in a single object.',
    story:['One dried stem in a stoneware bud vase &mdash; the whole Japandi philosophy in a single object. Everything inessential has been left out, and what remains is enough.',
           'The cleanest possible statement for a calm wall. Pair it with a real stem in a real vase beneath, and the print and the room rhyme.'] },
  { s:'eucalyptus', n:'11', k:'bot', titleHtml:'Eucalyptus', titleMeta:'Eucalyptus',
    desc:'A single eucalyptus stem in continuous line. Pairs naturally with a real cutting.',
    story:['A single eucalyptus stem rendered in one continuous line &mdash; the pen never lifts. It is botanical drawing reduced to its quietest form.',
           'Soft, silvery and forgiving, it sits well in a bathroom or bedroom. Hang it above a real cutting for a layered, lived-in look.'] },
  { s:'olive', n:'12', k:'bot', titleHtml:'Olive Branch', titleMeta:'Olive Branch',
    desc:'The Japandi outdoor signature plant, rendered as a single arched ink line.',
    story:['An olive branch as a single arched ink line &mdash; the Mediterranean meeting the Japandi palette. The olive is the old symbol of peace and of patience; the tree takes decades to give.',
           'Calm and horizontal, it suits the space above a bed or sofa, where a tall piece would crowd.'] },
  { s:'pampas', n:'13', k:'bot', titleHtml:'Pampas', titleMeta:'Pampas',
    desc:'Three pampas plumes in soft pale-beige texture. The autumn piece.',
    story:['Three pampas plumes in soft pale-beige texture &mdash; the autumn piece. Feathered and warm, it brings the season indoors without a single bright colour.',
           'It reads as texture more than image, which makes it a gentle companion to linen and wool. A natural fit for a bedroom in the cooler months.'] },
  { s:'ginkgo', n:'14', k:'bot', titleHtml:'Ginkgo Biloba', titleMeta:'Ginkgo Biloba',
    desc:'The single fan-shaped leaf with radiating vein lines &mdash; the symbol of stillness.',
    story:['A single fan-shaped ginkgo leaf with its radiating veins. The ginkgo is the oldest tree on earth &mdash; little changed for two hundred million years &mdash; and a quiet symbol of endurance.',
           'Graphic enough to hold a wall on its own, soft enough never to shout. It is lovely as a mirrored pair.'] },
  { s:'wild-grass', n:'15', k:'bot', titleHtml:'Wild Grass', titleMeta:'Wild Grass',
    desc:'Three blades at varied heights &mdash; the smallest botanical, the calmest piece.',
    story:['Three blades of wild grass at varied heights &mdash; the smallest botanical and the calmest piece. Nothing is happening, which is exactly the point.',
           'It disappears into a room in the best way: you stop noticing it and simply feel calmer. Ideal for a small wall or a quiet corner.'] },

  { s:'serene-dawn', n:'16', k:'land', titleHtml:'Serene Dawn', titleMeta:'Serene Dawn',
    desc:'Soft arches in sage, oat, and terracotta &mdash; the muted moment, drawn as a horizon.',
    story:['Soft arches in sage, oat and terracotta &mdash; the muted moment, drawn as a horizon. It is less a place than a feeling: the first ten minutes of a slow morning.',
           'The warm palette makes it a generous anchor for a living room or bedroom &mdash; it carries colour into a neutral room without breaking the calm.'] },
  { s:'moon-cycle', n:'17', k:'land', titleHtml:'Moon Cycle', titleMeta:'Moon Cycle',
    desc:'Three phases descending the page &mdash; full, half, crescent. The patience piece.',
    story:['Three moon phases descending the page &mdash; full, half, crescent. The patience piece: the moon keeps its own time, and there is nothing to do but watch.',
           'Vertical and rhythmic, it suits a narrow wall or a stairwell. Quietly graphic, endlessly calm.'] },
  { s:'horizon-bird', n:'18', k:'land', titleHtml:'Horizon', titleMeta:'Horizon',
    desc:'A single horizon stroke, a distant bird, a soft sun. The departure piece.',
    story:['A single horizon stroke, a distant bird, a soft sun &mdash; the departure piece. Everything is far away and unhurried; the eye travels, and then rests.',
           'Wide and low, it is built for the space above a bed or sofa. The most cinematic piece in the collection, and the most restful.'] },
  { s:'dusk', n:'19', k:'land', titleHtml:'Dusk', titleMeta:'Dusk',
    desc:'A lone tree against a warm terracotta horizon &mdash; the golden-hour piece.',
    story:['A lone tree against a warm terracotta horizon &mdash; the golden-hour piece. It holds the exact colour of the last light before evening.',
           'The warmth makes it a room-anchor: hang it where you want the eye to land and the temperature to rise a degree.'] },
  { s:'layers', n:'20', k:'land', titleHtml:'Layers', titleMeta:'Layers',
    desc:'Five horizontal bands in cream, grey, sage and honey &mdash; the whole palette as a landscape.',
    story:['Five horizontal bands in cream, grey, sage and honey &mdash; the whole Japandi palette drawn as a landscape. It is a colour study masquerading as a horizon.',
           'Because it carries the palette, it ties a room together &mdash; hang it where the textiles and woods already live and watch them line up.'] },
  { s:'moonrise', n:'21', k:'land', titleHtml:'Moonrise', titleMeta:'Moonrise',
    desc:'A luminous full moon over a faint distant hill &mdash; the late-evening piece.',
    story:['A luminous full moon over a faint distant hill &mdash; the late-evening piece. Still, low-lit, and slightly melancholy in the best way.',
           'It glows on a dim wall, so it suits a bedroom or a reading corner lit warm. The quietest landscape in the set.'] },

  { s:'shizuka', n:'22', k:'call', titleHtml:'Shizuka &mdash; 静', titleMeta:'Shizuka 静',
    desc:'Stillness. The character with the most-direct translation of the Japandi premise.',
    story:['<em>Shizuka</em> &mdash; 静 &mdash; the kanji for stillness, drawn in confident black sumi-e. Of every character we could have chosen, this is the most direct translation of the whole Japandi premise.',
           'One character, one idea, and a great deal of empty space. It earns a wall on its own and rewards a clean, uncluttered hang.'] },
  { s:'wa', n:'23', k:'call', titleHtml:'Wa &mdash; 和', titleMeta:'Wa 和',
    desc:'Harmony. The character at the heart of every Japanese aesthetic discipline.',
    story:['<em>Wa</em> &mdash; 和 &mdash; harmony. It is the character at the heart of every Japanese aesthetic discipline, from tea to flower-arranging to the way a room is balanced.',
           'Calm and grounding, it suits an entryway or a shared space &mdash; a quiet statement of how you want the home to feel.'] },
  { s:'ma', n:'24', k:'call', titleHtml:'Ma &mdash; 間', titleMeta:'Ma 間',
    desc:'The space between &mdash; the pause, the interval. The print that earns its empty wall.',
    story:['<em>Ma</em> &mdash; 間 &mdash; the space between. The pause, the interval, the silence that gives the notes their meaning. It is the single most Japandi idea there is.',
           'Fittingly, it is the print that earns its empty wall. Give it room, and let the negative space around it do half the work.'] },

  { s:'two-woods', n:'25', k:'tonal', titleHtml:'Two Woods', titleMeta:'Two Woods',
    desc:'Oak and walnut, overlapping, with one terracotta line &mdash; the two-woods rule, made abstract.',
    story:['Oak and walnut, overlapping, with one terracotta line &mdash; the two-woods rule made abstract. It is the principle every Japandi room runs on: one light wood, one dark, and a single warm note.',
           'Hang it beside furniture in the same two tones and the room reads as deliberate. A quiet bit of theory you can put on a wall.'] },
  { s:'warm-earth', n:'26', k:'tonal', titleHtml:'Warm Earth', titleMeta:'Warm Earth',
    desc:'Terracotta, oat, honey-brown &mdash; the terracotta-accent palette as a vertical study.',
    story:['Terracotta, oat and honey-brown in vertical bands &mdash; the terracotta-accent palette as a study. Pure colour, no subject; the warmth is the whole point.',
           'Pair it with a textile of the same family &mdash; a clay-toned cushion, an oat throw &mdash; and the print and the room become one gesture.'] },
  { s:'sage-stone', n:'27', k:'tonal', titleHtml:'Sage &amp; Stone', titleMeta:'Sage & Stone',
    desc:'Stone-grey, warm sage, walnut &mdash; the botanical palette as a vertical study.',
    story:['Stone-grey, warm sage and walnut &mdash; the botanical palette as a vertical study. The coolest and most restful of the tonal pieces.',
           'Made to hang beside sage-and-stone textiles. The cleanest effect comes from matching it to something soft already in the room.'] },

  { s:'balance', n:'28', k:'still', titleHtml:'Balance', titleMeta:'Balance',
    desc:'A small cairn of three stones &mdash; the discipline piece.',
    story:['A small cairn of three stacked stones &mdash; the discipline piece. It takes patience to balance stones, and patience is the whole subject.',
           'Grounding and quiet, it suits a bathroom, an entry, or a meditation corner. A small image that slows a room down.'] },
  { s:'chado', n:'29', k:'still', titleHtml:'Chado', titleMeta:'Chado',
    desc:'A tetsubin teapot, two cups, a single branch. The way of tea, drawn as a still life.',
    story:['A tetsubin teapot, two cups, a single branch &mdash; <em>chadō</em>, the way of tea, drawn as a still life. It suggests a whole slow afternoon in a few lines.',
           'Warm and domestic without being busy. A natural fit for a kitchen, a breakfast nook, or anywhere you take your morning cup.'] },
  { s:'linen-morning', n:'30', k:'still', titleHtml:'Linen, Morning', titleMeta:'Linen Morning',
    desc:'Light through a billowing linen curtain &mdash; the slow-morning piece.',
    story:['Light through a billowing linen curtain &mdash; the slow-morning piece. No object, no subject; just the feeling of a quiet start with nowhere to be.',
           'Soft and atmospheric, it brings a sense of air and light to a windowless wall. The most photographic piece in the collection.'] }
];

const esc = s => String(s).replace(/&(?!amp;|mdash;|apos;|lt;|gt;|quot;|#)/g, '&amp;');
const clean = s => String(s).replace(/&mdash;/g, '—').replace(/&apos;/g, "'").replace(/&amp;/g, '&').replace(/<[^>]+>/g, '');

function storyPage(p) {
  const ser = SERIES[p.k];
  const url = `https://calmandoak.com/shop/prints/${p.s}/`;
  const img = `https://calmandoak.com/assets/img/prints/${p.s}.jpg`;
  const metaDesc = `${clean(p.desc)} An original Calm & Oak ${ser.label.toLowerCase()} print — buy the instant digital download, or order it on museum-matte paper.`;
  const tMeta = esc(p.titleMeta);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${tMeta} — ${esc(ser.label)} Print | Calm & Oak</title>
<meta name="description" content="${esc(metaDesc)}" />
<meta name="theme-color" content="#F7F4EE" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="product" />
<meta property="og:site_name" content="Calm & Oak" />
<meta property="og:title" content="${tMeta} — ${esc(ser.label)} Print" />
<meta property="og:description" content="${esc(clean(p.desc))}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${img}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${tMeta} — ${esc(ser.label)} Print" />
<meta name="twitter:image" content="${img}" />
<meta name="pinterest-rich-pin" content="true" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/assets/css/styles.css?v=13" />
<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg" />
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png?v=4" />
<link rel="mask-icon" href="/assets/img/favicon.svg" color="#C97B5C" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://calmandoak.com/" },
    { "@type": "ListItem", "position": 2, "name": "Print Collection", "item": "https://calmandoak.com/shop/prints/" },
    { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(p.titleMeta)}, "item": "${url}" }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": ${JSON.stringify(p.titleMeta + ' — ' + ser.label + ' Print')},
  "image": "${img}",
  "description": ${JSON.stringify(clean(p.desc))},
  "brand": { "@type": "Brand", "name": "Calm & Oak" },
  "category": "Wall Art > Prints",
  "offers": [
    { "@type": "Offer", "name": "Digital download", "priceCurrency": "USD", "price": "12.00", "availability": "https://schema.org/InStock", "url": "${url}#buy" },
    { "@type": "Offer", "name": "Printed (8x10)", "priceCurrency": "USD", "price": "28.00", "availability": "https://schema.org/${['wa','sage-stone','balance','chado','linen-morning'].includes(p.s) ? 'PreOrder' : 'InStock'}", "url": "${url}#buy" }
  ]
}
</script>
</head>
<body>

<div class="disclosure">
  As an Amazon Associate, Calm & Oak earns from qualifying purchases. <a href="/disclosures/">Read our disclosures</a>.
</div>

<header class="site-header">
  <div class="wrap nav">
    <a href="/" class="brand" aria-label="Calm & Oak home">Calm <span class="amp">&amp;</span> Oak</a>
    <nav>
      <ul class="nav-links">
        <li><a href="/begin-here/">Begin Here</a></li>
        <li><a href="/shop/">Shop</a></li>
        <li><a href="/shop/looks/">Looks</a></li>
        <li><a href="/journal/">Journal</a></li>
        <li><a href="/shop/prints/">Prints</a></li>
        <li><a href="/about/">About</a></li>
      </ul>
      <button class="nav-toggle" aria-expanded="false" aria-label="Open navigation">Menu</button>
    </nav>
  </div>
</header>

<main>
  <article class="section">
    <div class="wrap" style="max-width: 980px; margin: 0 auto;">
      <p class="eyebrow" style="text-align:center;">
        <a href="/shop/" style="color:inherit; text-decoration:none;">Shop</a> &middot;
        <a href="/shop/prints/" style="color:inherit; text-decoration:none;">Print Collection</a> &middot;
        <a href="/shop/prints/#${ser.anchor}" style="color:inherit; text-decoration:none;">${ser.label}</a>
      </p>
      <h1 style="text-align:center;">${p.titleHtml}</h1>
      <p class="lede" style="text-align:center; max-width:600px; margin:0 auto 2.5rem;">${p.desc}</p>

      <figure style="margin:0 auto 2.5rem; max-width:620px;">
        <img src="/assets/img/prints/${p.s}.jpg" alt="${esc(p.titleMeta)} — Calm & Oak ${esc(ser.label.toLowerCase())} print" width="1000" height="1241" style="width:100%; height:auto; display:block; border-radius:6px;" />
      </figure>

      <div class="prose" style="max-width:680px; margin:0 auto;">
        <h2>The story</h2>
        ${p.story.map(par => `<p>${par}</p>`).join('\n        ')}

        <h2 id="buy">Two ways to own it</h2>
        <p>Buy the instant <strong>digital download</strong> and print it yourself at home or at any print shop — or order it <strong>printed to order</strong> on heavyweight museum-matte paper, shipped to your door.</p>
        <div style="display:flex; flex-wrap:wrap; gap:0.7rem; margin: 1.4rem 0 0.6rem;">
          <a class="btn btn--primary" data-digital="${p.s}" data-digital-label href="#">Digital download — $12</a>
          <a class="btn btn--ghost" data-etsy-print="${p.s}" href="https://www.etsy.com/shop/CalmandOak">Shop the print on Etsy <span class="arrow">→</span></a>
        </div>
        <small style="color:var(--graphite);">Digital files are for personal use. Physical prints are fulfilled and shipped via our print partner.</small>

        <h2 style="margin-top:2.5rem;">The details</h2>
        <ul>
          <li><strong>Digital download:</strong> high-resolution files sized for 8×10, 11×14 and 16×20 — print at home or any lab.</li>
          <li><strong>Printed edition:</strong> heavyweight 200&nbsp;gsm museum-quality matte paper, printed to order.</li>
          <li><strong>Sizes:</strong> 8×10, 11×14, 16×20. Sized to fit standard frames.</li>
          <li><strong>Unframed</strong> — frame not included. Ships flat or rolled.</li>
        </ul>
      </div>

      <div class="section-head reveal" style="margin-top:3rem; text-align:center;">
        <span class="eyebrow">More from</span>
        <h2>${ser.label}</h2>
        <hr class="divider" />
      </div>
      <p style="text-align:center;">
        <a href="/shop/prints/#${ser.anchor}" class="btn btn--ghost btn--small">See the full ${esc(ser.label)} series →</a>
        <a href="/shop/prints/" class="btn btn--ghost btn--small">All 30 prints →</a>
      </p>
    </div>
  </article>
</main>

<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="brand" style="color: var(--offwhite); margin-bottom:1rem;">Calm <span class="amp">&amp;</span> Oak</div>
        <p>Quiet rooms, beautifully sourced. A Japandi home journal, slowly built.</p>
      </div>
      <div><h4>Shop</h4><ul>
        <li><a href="/shop/lighting/">Lighting</a></li>
        <li><a href="/shop/storage/">Storage</a></li>
        <li><a href="/shop/ceramics-tableware/">Ceramics &amp; Tableware</a></li>
        <li><a href="/shop/textiles/">Textiles</a></li>
        <li><a href="/shop/furniture/">Furniture</a></li>
        <li><a href="/shop/bedroom/">Bedroom</a></li>
        <li><a href="/shop/japandi-kitchen/">Japandi Kitchen</a></li>
        <li><a href="/shop/office/">Office</a></li>
        <li><a href="/shop/decor-accents/">Decor Accents</a></li>
        <li><a href="/shop/outdoor-wellness/">Outdoor &amp; Wellness</a></li>
        <li><a href="/shop/prints/">Print Collection</a></li>
      </ul></div>
      <div><h4>Read</h4><ul><li><a href="/journal/">Journal</a></li>
        <li><a href="/journal/japandi-101/">What is Japandi</a></li><li><a href="/journal/budget-japandi-bedroom/">Bedroom under $500</a></li></ul></div>
      <div><h4>Calm &amp; Oak</h4><ul><li><a href="/begin-here/">Begin Here</a></li><li><a href="/calculator/">Calm Home Calculator</a></li><li><a href="/about/">About</a></li><li><a href="/contact/">Contact</a></li><li><a href="https://www.pinterest.com/calmandoak/">Pinterest</a></li><li><a href="/disclosures/">Disclosures</a></li><li><a href="/privacy/">Privacy</a></li></ul></div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> Calm &amp; Oak. All rights reserved.</span>
      <span>As an Amazon Associate, Calm &amp; Oak earns from qualifying purchases.</span>
    </div>
  </div>
</footer>

<script src="/assets/js/print-links.js?v=2" defer></script>
<script src="/assets/js/main.js?v=3" defer></script>
</body>
</html>
`;
}

function card(p) {
  const ser = SERIES[p.k];
  const h3style = 'font-family:var(--font-display); font-style:italic; font-weight:400; font-size:1.4rem; margin:0.2rem 0;';
  return `<figure style="margin:0;">
          <a href="/shop/prints/${p.s}/" aria-label="${esc(p.titleMeta)} — learn more" style="display:block;"><img src="/assets/img/prints/${p.s}.jpg" alt="${esc(p.titleMeta)} ${esc(ser.label.toLowerCase())} print" loading="lazy" width="1000" height="1241" style="width:100%; height:auto; display:block; border-radius:4px;" /></a>
          <figcaption style="margin-top:0.9rem;">
            <span class="product-cat">${p.n} &middot; ${ser.cat}</span>
            <h3 style="${h3style}"><a href="/shop/prints/${p.s}/" style="color:inherit; text-decoration:none;">${p.titleHtml}</a></h3>
            <p style="margin:0 0 0.7rem; color:var(--graphite);">${p.desc}</p>
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
              <a class="btn btn--primary btn--small" data-digital="${p.s}" data-digital-label href="#">Digital download &mdash; $12</a>
              <a class="btn btn--ghost btn--small" data-etsy-print="${p.s}" href="https://www.etsy.com/shop/CalmandOak">Shop on Etsy</a>
              <a class="btn btn--ghost btn--small" href="/shop/prints/${p.s}/">Learn more</a>
            </div>
          </figcaption>
        </figure>`;
}

// 1) Write all 30 story pages
const bySlug = {};
P.forEach(p => { bySlug[p.s] = p; });
let made = 0;
P.forEach(p => {
  const dir = path.join(ROOT, 'shop', 'prints', p.s);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), storyPage(p), 'utf8');
  made++;
});

// 2) Rebuild every grid card from data
const pf = path.join(ROOT, 'shop', 'prints', 'index.html');
let html = fs.readFileSync(pf, 'utf8');
let rebuilt = 0, unknown = [];
html = html.replace(/<figure style="margin:0;">[\s\S]*?<\/figure>/g, (block) => {
  const m = block.match(/\/prints\/([a-z0-9-]+)\./);
  if (m && bySlug[m[1]]) { rebuilt++; return card(bySlug[m[1]]); }
  unknown.push(m ? m[1] : '??');
  return block;
});
// 3) Remove the legacy inline harness (now handled by print-links.js)
html = html.replace(/<script>[\s\S]*?Per-print Etsy deep-links[\s\S]*?<\/script>\s*/g, '');
fs.writeFileSync(pf, html, 'utf8');

console.log('Story pages written:', made);
console.log('Grid cards rebuilt:', rebuilt);
console.log('Unknown figures skipped:', unknown.length ? unknown.join(',') : 'none');
console.log('Legacy harness removed:', !html.includes('Per-print Etsy deep-links'));
console.log('print-links.js still included:', html.includes('print-links.js'));
