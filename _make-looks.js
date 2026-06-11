// Build 4 new looks: the-spa-bathroom, the-japandi-workspace, the-sunday-kitchen, the-soft-porch
// Generates each look's index.html + -card.jpg + -hero.jpg, then updates the looks landing index.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = __dirname;
const LOOKS_DIR = path.join(ROOT, 'shop', 'looks');
const IMG_DIR = path.join(ROOT, 'assets', 'img', 'looks');

const LOOKS = [
  {
    slug: 'the-spa-bathroom',
    titleLine1: 'The Spa',
    titleLine2: 'Bathroom',
    eyebrowCat: 'Look · Bathroom',
    metaTitle: 'The Spa Bathroom — Japandi Bathroom in Five Pieces | Calm & Oak',
    metaDesc: 'Five pieces, one quiet bath. Oat linen shower curtain, waffle towels, bamboo shelf, soft mat, and a marble tray — shoppable on Amazon.',
    lede: 'Five pieces, one quiet bath. An oat linen shower curtain, waffle towels stacked on a four-tier bamboo shelf, a soft cotton bath mat underfoot, and a marble vanity tray for the small things. The bathroom you actually unwind in. Every piece below is an Amazon pick.',
    heroSrc: 'assets/img/journal-covers/japandi-bathroom-cover.jpg',
    heroAlt: 'A calm Japandi bathroom — oat linen shower curtain, four-tier bamboo shelf with stacked waffle towels, a cotton bath mat, and a marble vanity tray with small ceramics',
    crossSellH: 'Want the rest of the bathroom?',
    crossSellP: 'A quiet bathroom is a textile-and-stone room. Browse the textiles pillar for the rest of the linen and cotton; decor accents for the small ceramics that finish the counter.',
    crossSellBtnPath: '/shop/textiles/',
    crossSellBtnLabel: 'Shop textiles →',
    cardImageSource: 'assets/img/journal-covers/japandi-bathroom-cover.jpg',
    indexImgAlt: 'The spa bathroom — five-piece Look hero image showing an oat linen shower curtain, waffle towels on a bamboo shelf, a soft cotton bath mat, and a marble vanity tray',
    products: [
      { pos:1, label:'Curtain', title:'Natural linen shower curtain, oat',       asin:'B0FMFG4WDD', alt:'Oat natural linen shower curtain in a Japandi bathroom',                tier:'$$' },
      { pos:2, label:'Towels',  title:'Waffle linen bath towel set of 6',         asin:'B0118561IU', alt:'Stack of waffle linen bath towels in oatmeal',                          tier:'$' },
      { pos:3, label:'Shelf',   title:'SONGMICS 4-tier bamboo bathroom shelf',    asin:'B00XBOJ0AI', alt:'Four-tier bamboo bathroom shelf holding waffle towels and small ceramics', tier:'$$' },
      { pos:4, label:'Bath mat',title:'Cotton waffle bath mat, oat',              asin:'B0DYSZ19Q9', alt:'Oat waffle cotton bath mat',                                            tier:'$' },
      { pos:5, label:'Tray',    title:'Karibiber marble vanity tray',             asin:'B0FSKTSXZ7', alt:'Karibiber marble vanity tray holding small ceramics and a reed diffuser', tier:'$' },
    ],
  },

  {
    slug: 'the-japandi-workspace',
    titleLine1: 'The Japandi',
    titleLine2: 'Workspace',
    eyebrowCat: 'Look · Office',
    metaTitle: 'The Japandi Workspace — Calm Home Office in Five Pieces | Calm & Oak',
    metaDesc: 'Five pieces, one calm desk. Walker Edison coastal oak desk, linen task chair, brass lamp, leather pad, and bamboo monitor stand — shoppable on Amazon.',
    lede: 'Five pieces, one calm desk. A coastal-oak writing desk, a linen task chair on an oak base, a warm brass task lamp, a leather desk pad and a bamboo monitor stand. The home office you actually want to sit at. Every piece below is an Amazon pick.',
    heroSrc: 'assets/img/journal-covers/japandi-home-office-cover.jpg',
    heroAlt: 'A calm Japandi home office — a coastal-oak writing desk with linen task chair, brass task lamp, leather desk pad, and bamboo monitor stand on a warm cream wall',
    crossSellH: 'Want the rest of the room?',
    crossSellP: 'A home office is the room where calm and function meet. Browse the office pillar for the storage, lighting and small objects that quiet the desktop the rest of the day.',
    crossSellBtnPath: '/shop/office/',
    crossSellBtnLabel: 'Shop the office →',
    cardImageSource: 'assets/img/journal-covers/japandi-home-office-cover.jpg',
    indexImgAlt: 'The Japandi workspace — five-piece Look hero image showing a coastal-oak writing desk, linen task chair, brass task lamp, leather desk pad, and bamboo monitor stand',
    products: [
      { pos:1, label:'Desk',     title:'Walker Edison coastal oak writing desk, 38"', asin:'B0D4RK8PB2', alt:'Walker Edison coastal-oak writing desk with reeded drawer in a Japandi office', tier:'$$' },
      { pos:2, label:'Chair',    title:'Linen upholstered task chair, oak base',      asin:'B0DPJX1CQL', alt:'Linen-beige task chair with oak base and wheels',                              tier:'$$' },
      { pos:3, label:'Task lamp',title:'Brass + linen task lamp',                     asin:'B08GDW5JYF', alt:'Sculptural brass desk lamp with linen shade casting warm light',              tier:'$' },
      { pos:4, label:'Desk pad', title:'Leather desk pad with bamboo organizer',      asin:'B0BVVRCP3R', alt:'Leather desk pad with keyboard and a bamboo desk organizer',                  tier:'$' },
      { pos:5, label:'Monitor',  title:'Bamboo monitor stand with drawer',            asin:'B09HKN2ZRT', alt:'Bamboo monitor stand with a small drawer holding stationery',                tier:'$' },
    ],
  },

  {
    slug: 'the-sunday-kitchen',
    titleLine1: 'The Sunday',
    titleLine2: 'Kitchen',
    eyebrowCat: 'Look · Kitchen',
    metaTitle: 'The Sunday Kitchen — Slow Japandi Kitchen in Five Pieces | Calm & Oak',
    metaDesc: 'Five pieces, one slow kitchen morning. Stoneware crock, acacia tray, hand-thrown mugs, linen apron, glass carafe — shoppable on Amazon.',
    lede: 'Five pieces, one slow kitchen morning. An off-white stoneware utensil crock by the stove, an acacia tray for the breakfast routine, four hand-thrown mugs, an oat linen apron, and a glass carafe with tumbler for water by the sink. The kitchen that turns Sunday into an hour. Every piece below is an Amazon pick.',
    heroSrc: 'assets/img/journal-covers/sunday-morning-kitchen-cover.jpg',
    heroAlt: 'A calm Sunday morning Japandi kitchen — off-white stoneware utensil crock, an acacia wood serving tray, hand-thrown stoneware mugs, a linen apron, and a glass carafe on a warm wood counter',
    crossSellH: 'Want the rest of the kitchen?',
    crossSellP: 'A calm kitchen is a stoneware-and-wood room. Browse the kitchen pillar for the pots, boards and small tools that turn cooking into a quiet ritual.',
    crossSellBtnPath: '/shop/japandi-kitchen/',
    crossSellBtnLabel: 'Shop the kitchen →',
    cardImageSource: 'assets/img/journal-covers/sunday-morning-kitchen-cover.jpg',
    indexImgAlt: 'The Sunday kitchen — five-piece Look hero image showing a stoneware utensil crock, acacia serving tray, hand-thrown stoneware mugs, oat linen apron, and a glass carafe with tumbler',
    products: [
      { pos:1, label:'Crock',  title:'Off-white stoneware utensil crock',            asin:'B0FWQBDBDY', alt:'Off-white stoneware utensil crock with wooden utensils by the stove',  tier:'$' },
      { pos:2, label:'Tray',   title:'Acacia wood serving tray with handles, 17"',   asin:'B086372L8W', alt:'Acacia wood serving tray with cut-out handles holding stoneware',     tier:'$' },
      { pos:3, label:'Mugs',   title:'Hand-thrown stoneware mug set of 4',           asin:'B0CFF6XKN5', alt:'A set of four hand-thrown stoneware mugs in oat and grey tones',      tier:'$' },
      { pos:4, label:'Apron',  title:'Solino Home crossback linen apron, oat',       asin:'B0DSBL78XF', alt:'Oat-coloured Solino Home crossback linen apron',                      tier:'$' },
      { pos:5, label:'Carafe', title:'Glass water carafe with tumbler lid',          asin:'B09B7989F4', alt:'Glass water carafe with a tumbler lid on a wood counter',             tier:'$' },
    ],
  },

  {
    slug: 'the-soft-porch',
    titleLine1: 'The Soft',
    titleLine2: 'Porch',
    eyebrowCat: 'Look · Outdoor',
    metaTitle: 'The Soft Porch — Japandi Outdoor Look in Five Pieces | Calm & Oak',
    metaDesc: 'Five pieces, one quiet porch. Round teak table, slatted acacia chairs, beige cushions, cordless lantern, wool throw — shoppable on Amazon.',
    lede: 'Five pieces, one quiet porch. A round teak café table, a pair of slatted acacia patio chairs, beige cushions that read like linen, a pair of cordless brass lanterns for after sunset, and a wool throw for the chill. The corner of the outdoors you actually use. Every piece below is an Amazon pick.',
    heroSrc: 'assets/img/journal-covers/japandi-outdoor-cover.jpg',
    heroAlt: 'A calm Japandi porch — a round teak table with slatted acacia chairs, beige outdoor cushions, a cordless lantern, and a wool throw on a covered porch at golden hour',
    crossSellH: 'Want the rest of the outdoors?',
    crossSellP: 'A calm outdoor corner is one chair, one table, one warm light, repeated. Browse outdoor & wellness for the planters, lanterns and throws that round out the porch.',
    crossSellBtnPath: '/shop/outdoor-wellness/',
    crossSellBtnLabel: 'Shop outdoor →',
    cardImageSource: 'assets/img/journal-covers/japandi-outdoor-cover.jpg',
    indexImgAlt: 'The soft porch — five-piece Look hero image showing a round teak table, slatted acacia patio chairs, beige outdoor cushions, a cordless lantern, and a wool throw',
    products: [
      { pos:1, label:'Table',    title:'Christopher Knight Carina round teak table', asin:'B07CGZN4QP', alt:'Christopher Knight Carina round solid-teak patio table on a porch', tier:'$$' },
      { pos:2, label:'Chairs',   title:'Christopher Knight Teague patio chairs, set of two', asin:'B07DQDMVJ6', alt:'Pair of slatted acacia patio chairs at golden hour',     tier:'$$$' },
      { pos:3, label:'Cushions', title:'Beige outdoor seat cushions',                asin:'B0CY54Z9GZ', alt:'Beige weatherproof outdoor seat cushions on slatted chairs',     tier:'$' },
      { pos:4, label:'Lantern',  title:'Cordless brass LED lantern, pair',           asin:'B0DG1F9DQ8', alt:'Pair of cordless brass LED lanterns glowing warm on a porch table', tier:'$' },
      { pos:5, label:'Throw',    title:'Wool throw blanket, sage & oat',             asin:'B0G3VXQCM5', alt:'Folded wool throw in sage and oat tones',                          tier:'$' },
    ],
  },
];

const TC = 'var(--terracotta)';
const HD = (m) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${m.metaTitle}</title>
<meta name="description" content="${m.metaDesc}" />
<meta name="theme-color" content="#F7F4EE" />
<link rel="canonical" href="https://calmandoak.com/shop/looks/${m.slug}/" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${m.metaTitle}" />
<meta property="og:description" content="${m.metaDesc}" />
<meta property="og:url" content="https://calmandoak.com/shop/looks/${m.slug}/" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/assets/css/styles.css?v=13" />
<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg" />
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png?v=4" />
<link rel="mask-icon" href="/assets/img/favicon.svg" color="#C97B5C" />
<meta property="og:site_name" content="Calm & Oak" />
<meta property="og:image" content="https://calmandoak.com/assets/img/looks/${m.slug}-card.jpg?v=1" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://calmandoak.com/assets/img/looks/${m.slug}-card.jpg?v=1" />
<meta name="pinterest-rich-pin" content="true" />
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://calmandoak.com/" },
    { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://calmandoak.com/shop/" },
    { "@type": "ListItem", "position": 3, "name": "Looks", "item": "https://calmandoak.com/shop/looks/" },
    { "@type": "ListItem", "position": 4, "name": "${m.titleLine1} ${m.titleLine2}", "item": "https://calmandoak.com/shop/looks/${m.slug}/" }
  ]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "${m.titleLine1} ${m.titleLine2}",
  "url": "https://calmandoak.com/shop/looks/${m.slug}/",
  "numberOfItems": ${m.products.length},
  "itemListElement": [
${m.products.map(p => `    {
      "@type": "ListItem",
      "position": ${p.pos},
      "item": {
        "@type": "Product",
        "name": "${p.title.replace(/"/g,'\\"')}",
        "url": "https://www.amazon.com/dp/${p.asin}?tag=calmandoak-20",
        "image": "https://calmandoak.com/assets/img/products-cropped/p-${p.asin}.jpg?v=2",
        "brand": {
          "@type": "Brand",
          "name": "Curated by Calm & Oak"
        }
      }
    }`).join(',\n')}
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
    <a href="/" class="brand">Calm <span class="amp">&amp;</span> Oak</a>
    <nav>
      <ul class="nav-links">
        <li><a href="/shop/">Shop</a></li>
        <li><a href="/shop/looks/">Looks</a></li>
        <li><a href="/journal/">Journal</a></li>
        <li><a href="/shop/prints/">Prints</a></li>
        <li><a href="/about/">About</a></li>
      </ul>
      <button class="nav-toggle">Menu</button>
    </nav>
  </div>
</header>

<main>
  <section class="article-hero">
    <div class="wrap" style="text-align:center; max-width:780px; margin:0 auto;">
      <span class="eyebrow"><a href="/shop/looks/" style="color:inherit; text-decoration:none;">Shop · Looks</a></span>
      <h1>${m.titleLine1} <span style="font-style:italic; color:${TC};">${m.titleLine2}</span></h1>
      <p class="lede" style="margin: 0 auto;">${m.lede}</p>
      <hr class="divider" />
    </div>
  </section>

  <section class="section" style="padding-top: 0;">
    <div class="wrap">
      <figure style="max-width: 700px; margin: 0 auto 3rem;">
        <img src="/${m.heroSrc}?v=1" alt="${m.heroAlt}" loading="eager" width="1000" height="1250" style="width: 100%; height: auto; display: block; border-radius: 4px;" />
        <figcaption style="text-align:center; font-size: 0.875rem; color: var(--graphite); margin-top: 1rem; font-style: italic;">Tap any product card below to shop the exact piece on Amazon.</figcaption>
      </figure>

      <div class="product-grid">

${m.products.map(p => `        <article class="product"><div class="product-img"><img src="/assets/img/products-cropped/p-${p.asin}.jpg?v=2" alt="${p.alt}" loading="lazy" width="848" height="1264" /></div><div class="product-body">
          <span class="product-cat">${p.pos} · ${p.label}</span><h3 class="product-title">${p.title}</h3><p class="product-price">From <span class="tier">${p.tier}</span></p>
          <a href="https://www.amazon.com/dp/${p.asin}?tag=calmandoak-20" rel="sponsored nofollow noopener" class="product-cta">Shop on Amazon &rarr;</a>
        </div></article>`).join('\n\n')}

      </div>
    </div>
  </section>

  <section class="section section--cream">
    <div class="prose">
      <h2 style="text-align:center;">${m.crossSellH}</h2>
      <hr class="divider" />
      <p style="text-align:center;">${m.crossSellP}</p>
      <p style="text-align:center; margin-top:2rem;">
        <a href="${m.crossSellBtnPath}" class="btn btn--primary btn--small">${m.crossSellBtnLabel}</a>
        <a href="/shop/looks/" class="btn btn--ghost btn--small" style="margin-left: 1rem;">Browse all Looks &rarr;</a>
      </p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="signup">
        <div class="signup-inner">
          <span class="eyebrow">Free guide</span>
          <h2>Get the <span class="italic">Japandi Starter Guide</span></h2>
          <p class="lede" style="margin: 0 auto;">An 18-page PDF &mdash; the rules, materials, and a starter shopping list.</p>
          <form data-signup>
            <input type="email" required placeholder="your@email.com" aria-label="Email" />
            <button class="btn btn--primary btn--small">Send the guide</button>
          </form>
          <small class="signup-note">One email a fortnight. Unsubscribe whenever.</small>
        </div>
      </div>
    </div>
  </section>
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
        <li><a href="/shop/looks/">Looks</a></li>
      </ul></div>
      <div><h4>Read</h4><ul><li><a href="/journal/">Journal</a></li>
        <li><a href="/journal/japandi-101/">What is Japandi</a></li><li><a href="/journal/budget-japandi-bedroom/">Bedroom under $500</a></li></ul></div>
      <div><h4>Calm &amp; Oak</h4><ul><li><a href="/about/">About</a></li><li><a href="/contact/">Contact</a></li><li><a href="https://www.pinterest.com/calmandoak/">Pinterest</a></li><li><a href="/disclosures/">Disclosures</a></li><li><a href="/privacy/">Privacy</a></li></ul></div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> Calm &amp; Oak. All rights reserved.</span>
      <span>As an Amazon Associate, Calm &amp; Oak earns from qualifying purchases.</span>
    </div>
  </div>
</footer>

<script src="/assets/js/main.js?v=3" defer></script>
</body>
</html>
`;

(async () => {
  // 1. write look pages + generate -card.jpg per look
  for (const m of LOOKS) {
    const dir = path.join(LOOKS_DIR, m.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), HD(m));
    // -card.jpg at 848×885, bottom-anchored (in case source has anything at top)
    await sharp(path.join(ROOT, m.cardImageSource))
      .resize(848, 885, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 88 })
      .toFile(path.join(IMG_DIR, m.slug + '-card.jpg'));
    console.log('  ✓ ' + m.slug);
  }

  // 2. update the looks index — add 4 new cards before the closing of .product-grid,
  //    and rewrite the JSON-LD ItemList to include them
  const idxPath = path.join(LOOKS_DIR, 'index.html');
  let idx = fs.readFileSync(idxPath, 'utf8');

  // build the 4 new card markup blocks
  const newCardsMarkup = LOOKS.map(m => `\n        <article class="product"><a href="/shop/looks/${m.slug}/" style="display:block; text-decoration:none; color:inherit;">
          <div class="product-img"><img src="/assets/img/looks/${m.slug}-card.jpg?v=1" alt="${m.indexImgAlt}" loading="lazy" width="848" height="885" /></div>
          <div class="product-body">
            <span class="product-cat">${m.eyebrowCat}</span>
            <h3 class="product-title">${m.titleLine1} ${m.titleLine2}</h3>
            <p class="product-price"><span class="tier-note">${m.products.length} pieces · </span><span class="tier">$$</span></p>
            <span class="product-cta">Shop the look &rarr;</span>
          </div>
        </a></article>\n`).join('');

  // insert just before the closing </div> of the product-grid (the </div> right before the next section)
  idx = idx.replace(
    /(<\/a><\/article>)(\s*<\/div>\s*<\/div>\s*<\/section>)/,
    `$1${newCardsMarkup}      $2`
  );

  // rewrite JSON-LD ItemList — bump count, append 4 new ListItems
  idx = idx.replace(/"numberOfItems": 8/, `"numberOfItems": ${8 + LOOKS.length}`);
  const newListItems = LOOKS.map((m, i) => `,
    {
      "@type": "ListItem",
      "position": ${9 + i},
      "url": "https://calmandoak.com/shop/looks/${m.slug}/",
      "name": "${m.titleLine1} ${m.titleLine2}"
    }`).join('');
  idx = idx.replace(
    /("name": "The Sage Bedroom"\s*\}\s*)\n(  \])/,
    `$1${newListItems}\n$2`
  );

  // update "More Looks coming" copy to match new state
  idx = idx.replace(
    /<h2 style="text-align:center;">More Looks coming\.<\/h2>[\s\S]*?<\/p>\s*<p style="text-align:center; margin-top:2rem;">/,
    `<h2 style="text-align:center;">More Looks coming.</h2>
      <hr class="divider" />
      <p style="text-align:center;">We publish a new Look every week — closet capsules, reading nooks, breakfast counters, the moments your home actually uses. Each Look is a complete room built around four to seven Amazon picks we'd actually buy.</p>
      <p style="text-align:center; margin-top:2rem;">`
  );

  fs.writeFileSync(idxPath, idx);
  console.log('\n  ✓ updated /shop/looks/index.html — 12 looks, JSON-LD synced');
})();
