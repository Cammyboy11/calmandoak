// Generates _gelato-listings-v2.json with SEO-first titles + restructured descriptions.
// Built off the competitor research: keyword block first, poetic hook second,
// scannable bullets for sizes/materials, gift/usage block, keyword footer.
//
// Run:  node _gelato-listings-build.js
// Output: _gelato-listings-v2.json

const fs = require('fs');
const path = require('path');

// ── per-print SEO + pairing data ────────────────────────────────────────────
const PRINTS = [
  // SUMI-E (9)
  { slug:'enso', name:'Enso',
    series:'Sumi-e', descriptor:'an incomplete circle, the brushstroke that says the rest',
    hook:'An enso is drawn in a single breath. The opening at the rim is the point — wholeness made visible only because of the gap.',
    titleKW:'Sumi-e Enso Print, Japandi Wall Art, Zen Circle Brushstroke, Above-Bed Decor',
    seoOpen:'Sumi-e Enso wall art — minimalist Japanese ink print on museum-quality 250gsm matte paper. A quiet Japandi piece for bedroom, meditation space, or above-bed gallery wall.',
    pairs:['Mountain Mist','Bent Reed','Crane'], pairsNote:'four-piece Sumi-e gallery wall',
    useCase:'meditation studios, yoga teachers, therapist offices, Japandi bedrooms, and above-bed decor',
    tagSet:'sumi-e' },

  { slug:'bent-reed', name:'Bent Reed',
    series:'Sumi-e', descriptor:'a single tall grass arching gracefully, one decisive brushstroke for the whole season',
    hook:'A bent reed in sumi-e is the whole autumn in one brushstroke — the season the painter chose not to paint.',
    titleKW:'Sumi-e Reed Print, Japandi Wall Art, Single Brushstroke Botanical, Minimalist Japanese Ink',
    seoOpen:'Sumi-e bent reed wall art — minimalist Japanese ink print on museum-quality 250gsm matte paper. A calm Japandi piece for bedroom, meditation space, or above-bed gallery wall.',
    pairs:['Enso','Mountain Mist','Crane'], pairsNote:'four-piece Sumi-e gallery wall',
    useCase:'meditation studios, yoga teachers, therapist offices, Japandi bedrooms, and slow-living gifts',
    tagSet:'sumi-e' },

  { slug:'crane', name:'Crane',
    series:'Sumi-e', descriptor:'tsuru in mid-flight, the Japanese symbol of longevity drawn in one breath',
    hook:'The tsuru — Japan’s thousand-year crane — is the symbol of longevity, drawn in one breath in mid-flight.',
    titleKW:'Sumi-e Crane Print, Japandi Wall Art, Tsuru Japanese Bird Ink, Longevity Symbol',
    seoOpen:'Sumi-e crane wall art — minimalist Japanese tsuru ink print on museum-quality 250gsm matte paper. A calm Japandi piece for bedroom, anniversary gift, or above-bed gallery wall.',
    pairs:['Enso','Bent Reed','Mountain Mist'], pairsNote:'four-piece Sumi-e gallery wall',
    useCase:'anniversaries (the crane is the Japanese symbol of marriage), housewarmings, meditation studios, and Japandi bedrooms',
    tagSet:'sumi-e' },

  { slug:'mountain-mist', name:'Mountain Mist',
    series:'Sumi-e', descriptor:'a single mountain peak emerging from soft ink wash — the contemplation piece',
    hook:'Sumi-e mountains are never about the mountain; they are about the space the mountain makes in the air.',
    titleKW:'Sumi-e Mountain Print, Japandi Wall Art, Minimalist Japanese Ink, Above-Bed Decor',
    seoOpen:'Sumi-e mountain wall art — minimalist Japanese ink print on museum-quality 250gsm matte paper. A calm Japandi piece for bedroom, meditation space, or above-bed gallery wall.',
    pairs:['Enso','Bent Reed','Crane'], pairsNote:'four-piece Sumi-e gallery wall',
    useCase:'meditation studios, yoga teachers, therapist offices, Japandi bedrooms, and above-bed decor',
    tagSet:'sumi-e' },

  { slug:'bamboo', name:'Three Bamboo',
    series:'Sumi-e', descriptor:'three bamboo stalks rising at varied heights — the odd-number rule, in ink',
    hook:'Three stalks rising at varied heights — the sumi-e odd-number rule, the composition that refuses to be symmetrical.',
    titleKW:'Sumi-e Bamboo Print, Japandi Wall Art, Three Bamboo Stalks Ink, Japanese Botanical',
    seoOpen:'Sumi-e three-bamboo wall art — minimalist Japanese ink print on museum-quality 250gsm matte paper. A calm Japandi piece for bedroom, dining room, or above-bed gallery wall.',
    pairs:['Cherry Branch','Koi','Tsuki'], pairsNote:'four-piece Sumi-e collection',
    useCase:'dining rooms, Japandi bedrooms, slow-living gifts, and meditation studios',
    tagSet:'sumi-e' },

  { slug:'cherry-branch', name:'Cherry Branch',
    series:'Sumi-e', descriptor:'a single sakura branch with open blossoms and one fallen petal — the transience piece',
    hook:'A single sakura branch with open blossoms and one fallen petal — mono no aware, the gentle sadness of things that don’t last.',
    titleKW:'Sumi-e Cherry Blossom Print, Japandi Wall Art, Sakura Branch Ink, Japanese Botanical',
    seoOpen:'Sumi-e sakura wall art — minimalist Japanese cherry blossom ink print on museum-quality 250gsm matte paper. A calm Japandi piece for bedroom, anniversary gift, or above-bed gallery wall.',
    pairs:['Three Bamboo','Koi','Tsuki'], pairsNote:'four-piece Sumi-e collection',
    useCase:'anniversaries, spring gifts, Japandi bedrooms, dining rooms, and slow-living gifts',
    tagSet:'sumi-e' },

  { slug:'koi', name:'Koi',
    series:'Sumi-e', descriptor:'a single koi crossing still water, with two small vermillion accents',
    hook:'A single koi crossing still water — the courage piece. In Japanese legend the koi that climbs the waterfall becomes a dragon.',
    titleKW:'Sumi-e Koi Print, Japandi Wall Art, Japanese Fish Ink Painting, Vermillion Accent',
    seoOpen:'Sumi-e koi wall art — minimalist Japanese fish ink print on museum-quality 250gsm matte paper. A calm Japandi piece for bedroom, office, or above-bed gallery wall.',
    pairs:['Three Bamboo','Cherry Branch','Mountain Stream'], pairsNote:'four-piece Sumi-e collection',
    useCase:'home offices, courage/persistence gifts, Japandi bedrooms, and meditation studios',
    tagSet:'sumi-e' },

  { slug:'mountain-stream', name:'Mountain Stream',
    series:'Sumi-e', descriptor:'a single decisive vertical brushstroke down the page — water as gesture',
    hook:'A single decisive vertical brushstroke — water as gesture. The whole waterfall in one breath.',
    titleKW:'Sumi-e Waterfall Print, Japandi Wall Art, Single Vertical Brushstroke, Minimalist Ink',
    seoOpen:'Sumi-e waterfall wall art — minimalist Japanese ink brushstroke print on museum-quality 250gsm matte paper. A calm Japandi piece for bedroom, meditation space, or above-bed gallery wall.',
    pairs:['Mountain Mist','Enso','Bent Reed'], pairsNote:'four-piece Sumi-e gallery wall',
    useCase:'meditation studios, yoga teachers, therapist offices, Japandi bedrooms, and above-bed decor',
    tagSet:'sumi-e' },

  { slug:'tsuki', name:'Tsuki',
    series:'Sumi-e', descriptor:'an empty wabi-sabi tea bowl, tilted ever so slightly — the imperfection rule made visible',
    hook:'An empty tea bowl, tilted ever so slightly. Wabi-sabi: beauty in the imperfect, the impermanent, the incomplete.',
    titleKW:'Wabi-Sabi Tea Bowl Print, Sumi-e Wall Art, Japanese Ceramic Ink, Japandi Decor',
    seoOpen:'Wabi-sabi tea bowl wall art — minimalist Japanese sumi-e ink print on museum-quality 250gsm matte paper. A calm Japandi piece for kitchen, dining room, or tea room.',
    pairs:['Chado','Balance','Enso'], pairsNote:'four-piece wabi-sabi gallery wall',
    useCase:'tea rooms, dining rooms, kitchen still-life corners, mindful gifts, and Japandi homes',
    tagSet:'sumi-e' },

  // BOTANICAL (6)
  { slug:'single-stem', name:'Single Stem',
    series:'Botanical Line', descriptor:'one dried stem in a stoneware bud vase — the whole Japandi philosophy in a single object',
    hook:'One dried stem in a stoneware bud vase — the entire Japandi philosophy compressed into a single object.',
    titleKW:'Single Stem Print, Botanical Line Art, Japandi Bud Vase Wall Art, Minimalist Botanical',
    seoOpen:'Single-stem botanical line wall art — minimalist Japandi print on museum-quality 250gsm matte paper. A quiet piece for kitchen, sunlit corner, or above-bed gallery wall.',
    pairs:['Eucalyptus','Olive Branch','Wild Grass'], pairsNote:'four-piece Botanical Line gallery wall',
    useCase:'kitchens, sunlit corners, plant lovers, slow-living gifts, and Japandi bedrooms',
    tagSet:'botanical' },

  { slug:'eucalyptus', name:'Eucalyptus',
    series:'Botanical Line', descriptor:'a single eucalyptus stem rendered as one continuous line',
    hook:'A single eucalyptus stem as one continuous line — the pen never lifts. The whole plant in a single unbroken gesture.',
    titleKW:'Eucalyptus Print, Single Line Botanical Wall Art, Japandi Botanical Line Drawing, Minimalist Leaf',
    seoOpen:'Eucalyptus single-line botanical wall art — minimalist Japandi print on museum-quality 250gsm matte paper. A quiet piece for bathroom, kitchen, or above-bed gallery wall.',
    pairs:['Olive Branch','Single Stem','Ginkgo'], pairsNote:'four-piece Botanical Line gallery wall',
    useCase:'bathrooms, kitchens, plant lovers, slow-living gifts, and Japandi bedrooms',
    tagSet:'botanical' },

  { slug:'olive', name:'Olive Branch',
    series:'Botanical Line', descriptor:'an olive branch as a single arched ink line — the Japandi outdoor signature plant',
    hook:'An olive branch as a single arched ink line — the Japandi outdoor signature plant, drawn in one breath.',
    titleKW:'Olive Branch Print, Botanical Line Art, Japandi Wall Art, Single Line Drawing, Mediterranean Leaf',
    seoOpen:'Olive branch botanical line wall art — minimalist Japandi print on museum-quality 250gsm matte paper. A quiet piece for kitchen, dining room, or above-bed gallery wall.',
    pairs:['Eucalyptus','Single Stem','Ginkgo'], pairsNote:'four-piece Botanical Line gallery wall',
    useCase:'kitchens, dining rooms, Mediterranean-leaning interiors, slow-living gifts, and Japandi bedrooms',
    tagSet:'botanical' },

  { slug:'pampas', name:'Pampas',
    series:'Botanical Line', descriptor:'three pampas plumes in soft pale-beige texture — the autumn piece',
    hook:'Three pampas plumes in soft pale-beige — the autumn piece. Texture as the whole composition.',
    titleKW:'Pampas Grass Print, Boho Botanical Wall Art, Japandi Beige Decor, Three Plumes',
    seoOpen:'Pampas grass wall art — minimalist boho botanical print on museum-quality 250gsm matte paper. A warm Japandi piece for living room, autumn decor, or above-bed gallery wall.',
    pairs:['Wild Grass','Single Stem','Eucalyptus'], pairsNote:'four-piece Botanical Line gallery wall',
    useCase:'living rooms, autumn decor refreshes, boho-Japandi interiors, slow-living gifts, and bedroom warmth',
    tagSet:'botanical' },

  { slug:'ginkgo', name:'Ginkgo',
    series:'Botanical Line', descriptor:'a single fan-shaped ginkgo leaf with radiating vein lines — the most-recognised symbol of stillness',
    hook:'A single fan-shaped ginkgo leaf with radiating veins — the world’s oldest tree species, the most-recognised botanical symbol of stillness.',
    titleKW:'Ginkgo Leaf Print, Japandi Botanical Line Art, Japanese Leaf Wall Art, Minimalist Botanical',
    seoOpen:'Ginkgo leaf botanical line wall art — minimalist Japandi print on museum-quality 250gsm matte paper. A quiet piece for kitchen, study, or above-bed gallery wall.',
    pairs:['Olive Branch','Eucalyptus','Single Stem'], pairsNote:'four-piece Botanical Line gallery wall',
    useCase:'studies, kitchens, Japandi bedrooms, slow-living gifts, and plant lovers',
    tagSet:'botanical' },

  { slug:'wild-grass', name:'Wild Grass',
    series:'Botanical Line', descriptor:'three blades of wild grass at varied heights — the smallest botanical, the calmest piece',
    hook:'Three blades of wild grass at varied heights — the smallest botanical in the series, the calmest piece.',
    titleKW:'Wild Grass Print, Minimalist Botanical Line Art, Japandi Wall Art, Quiet Botanical',
    seoOpen:'Wild grass botanical line wall art — minimalist Japandi print on museum-quality 250gsm matte paper. A quiet piece for nursery, bedside, or above-bed gallery wall.',
    pairs:['Pampas','Single Stem','Ginkgo'], pairsNote:'four-piece Botanical Line gallery wall',
    useCase:'nurseries, bedside walls, slow-living gifts, Japandi bedrooms, and meditation studios',
    tagSet:'botanical' },

  // LANDSCAPE (6)
  { slug:'moon-cycle', name:'Moon Cycle',
    series:'Minimalist Landscape', descriptor:'three moon phases descending the page — full, half, crescent — the patience piece',
    hook:'Full, half, crescent — three moon phases descending the page. The patience piece.',
    titleKW:'Moon Phases Print, Three Moon Cycle Wall Art, Japandi Landscape, Lunar Phases Decor',
    seoOpen:'Moon phases wall art — minimalist three-moon cycle print on museum-quality 250gsm matte paper. A calm Japandi piece for bedroom, nursery, or above-bed gallery wall.',
    pairs:['Moonrise','Dusk','Horizon Bird'], pairsNote:'four-piece Landscape gallery wall',
    useCase:'bedrooms, nurseries, anniversary or birthday gifts, Japandi interiors, and above-bed decor',
    tagSet:'landscape' },

  { slug:'horizon-bird', name:'Horizon Bird',
    series:'Minimalist Landscape', descriptor:'a single horizon stroke, a distant bird, a soft sun — the departure piece',
    hook:'A single horizon stroke, a distant bird, a soft sun — the departure piece. Everything in motion, everything still.',
    titleKW:'Minimalist Horizon Print, Japandi Bird Landscape, Above-Bed Wall Art, Soft Sun Decor',
    seoOpen:'Minimalist horizon wall art — Japandi bird-and-sun landscape print on museum-quality 250gsm matte paper. A calm piece for bedroom, living room, or above-bed gallery wall.',
    pairs:['Serene Dawn','Layers','Dusk'], pairsNote:'four-piece Landscape gallery wall',
    useCase:'living rooms, Japandi bedrooms, housewarmings, departure or new-chapter gifts, and above-bed decor',
    tagSet:'landscape' },

  { slug:'dusk', name:'Dusk',
    series:'Minimalist Landscape', descriptor:'a lone tree against a warm terracotta horizon — the golden-hour piece',
    hook:'A lone tree against a warm terracotta horizon — the golden-hour piece. The minute before the lamps come on.',
    titleKW:'Lone Tree Print, Terracotta Sunset Landscape, Japandi Wall Art, Golden Hour Decor',
    seoOpen:'Lone tree at dusk wall art — minimalist terracotta sunset print on museum-quality 250gsm matte paper. A warm Japandi piece for living room, dining room, or above-bed gallery wall.',
    pairs:['Horizon Bird','Moonrise','Layers'], pairsNote:'four-piece Landscape gallery wall',
    useCase:'living rooms, dining rooms, warm Japandi interiors, slow-evening gifts, and above-bed decor',
    tagSet:'landscape' },

  { slug:'layers', name:'Layers',
    series:'Minimalist Landscape', descriptor:'five horizontal bands in cream, grey, sage and honey — the whole palette as a landscape',
    hook:'Five horizontal bands — cream, grey, sage, honey. The whole Japandi palette compressed into a single landscape.',
    titleKW:'Color Field Landscape Print, Earth Tone Bands Wall Art, Japandi Abstract Horizon, Neutral Palette',
    seoOpen:'Color field landscape wall art — earth-tone horizontal bands on museum-quality 250gsm matte paper. A calm Japandi piece for living room, dining room, or above-couch gallery wall.',
    pairs:['Serene Dawn','Warm Earth','Sage Stone'], pairsNote:'four-piece Landscape & Tonal gallery wall',
    useCase:'living rooms, dining rooms, designer offices, color-led Japandi interiors, and above-couch decor',
    tagSet:'landscape' },

  { slug:'moonrise', name:'Moonrise',
    series:'Minimalist Landscape', descriptor:'a luminous full moon over a faint distant hill — the late-evening piece',
    hook:'A luminous full moon over a faint distant hill — the late-evening piece. The hour just before silence.',
    titleKW:'Full Moon Print, Minimalist Moon Landscape, Japandi Lunar Wall Art, Above-Bed Decor',
    seoOpen:'Full moonrise wall art — minimalist Japandi moon landscape print on museum-quality 250gsm matte paper. A calm piece for bedroom, nursery, or above-bed gallery wall.',
    pairs:['Moon Cycle','Dusk','Horizon Bird'], pairsNote:'four-piece Landscape gallery wall',
    useCase:'bedrooms, nurseries, anniversary gifts, Japandi interiors, and above-bed decor',
    tagSet:'landscape' },

  { slug:'serene-dawn', name:'Serene Dawn',
    series:'Minimalist Landscape', descriptor:'soft arches in sage, oat and terracotta — the muted moment, drawn as a horizon',
    hook:'Soft arches in sage, oat and terracotta — the muted moment between night and morning, drawn as a horizon.',
    titleKW:'Soft Arch Landscape Print, Japandi Horizon Wall Art, Sage Oat Terracotta Palette, Above-Bed',
    seoOpen:'Serene dawn wall art — soft-arch Japandi horizon print on museum-quality 250gsm matte paper. A calm piece for bedroom, living room, or above-bed gallery wall.',
    pairs:['Layers','Horizon Bird','Dusk'], pairsNote:'four-piece Landscape gallery wall',
    useCase:'bedrooms, living rooms, slow-morning lovers, Japandi interiors, and above-bed decor',
    tagSet:'landscape' },

  // CALLIGRAPHY (3)
  { slug:'shizuka', name:'Shizuka',
    series:'Japanese Calligraphy', descriptor:'Shizuka 静 — the kanji for stillness, the character that translates the Japandi premise directly',
    hook:'Shizuka 静 — the kanji for stillness. The character that translates the Japandi premise directly into one mark on the wall.',
    titleKW:'Japanese Kanji Print, Shizuka Stillness Calligraphy, Zen Wall Art, Japandi Decor',
    seoOpen:'Shizuka 静 Japanese calligraphy wall art — kanji for stillness on museum-quality 250gsm matte paper. A quiet Japandi piece for meditation space, study, or above-bed gallery wall.',
    pairs:['Wa','Ma','Enso'], pairsNote:'three-piece Japanese Calligraphy triptych',
    useCase:'meditation studios, yoga teachers, gifts for people who love Japan, intentional housewarmings, and Japandi bedrooms',
    tagSet:'calligraphy' },

  { slug:'wa', name:'Wa',
    series:'Japanese Calligraphy', descriptor:'Wa 和 — harmony, the character at the heart of every Japanese aesthetic discipline',
    hook:'Wa 和 — harmony. The character at the heart of every Japanese aesthetic discipline, from tea to architecture.',
    titleKW:'Japanese Kanji Print, Wa Harmony Calligraphy, Zen Wall Art, Japandi Decor',
    seoOpen:'Wa 和 Japanese calligraphy wall art — kanji for harmony on museum-quality 250gsm matte paper. A quiet Japandi piece for living room, meditation space, or above-bed gallery wall.',
    pairs:['Shizuka','Ma','Enso'], pairsNote:'three-piece Japanese Calligraphy triptych',
    useCase:'living rooms, dining rooms, wedding or anniversary gifts, intentional housewarmings, and Japandi homes',
    tagSet:'calligraphy' },

  { slug:'ma', name:'Ma',
    series:'Japanese Calligraphy', descriptor:'Ma 間 — the space between, the pause, the interval; the print that earns its empty wall',
    hook:'Ma 間 — the space between, the pause, the interval. The Japanese principle that an empty wall can be the most considered wall in the room.',
    titleKW:'Japanese Kanji Print, Ma Negative Space Calligraphy, Zen Wall Art, Japandi Minimalist Decor',
    seoOpen:'Ma 間 Japanese calligraphy wall art — kanji for negative space on museum-quality 250gsm matte paper. A quiet Japandi piece for designer office, meditation space, or above-bed gallery wall.',
    pairs:['Shizuka','Wa','Enso'], pairsNote:'three-piece Japanese Calligraphy triptych',
    useCase:'designer offices, meditation studios, architects, minimalist interiors, and intentional gifts',
    tagSet:'calligraphy' },

  // TONAL (3)
  { slug:'two-woods', name:'Two Woods',
    series:'Tonal Study', descriptor:'oak and walnut overlapping, with one terracotta line — the two-woods rule, made abstract',
    hook:'Oak and walnut overlapping, with one terracotta line breaking through — the Japandi two-woods rule, made abstract.',
    titleKW:'Tonal Study Print, Oak Walnut Color Field Art, Japandi Abstract Wall Art, Earth Tone Palette',
    seoOpen:'Two-woods tonal study wall art — oak and walnut color field print on museum-quality 250gsm matte paper. A modernist Japandi piece for living room, office, or above-couch wall.',
    pairs:['Warm Earth','Sage Stone','Layers'], pairsNote:'four-piece Tonal & Landscape gallery wall',
    useCase:'modernist living rooms, designer offices, architect studios, color-led Japandi interiors, and above-couch decor',
    tagSet:'tonal' },

  { slug:'warm-earth', name:'Warm Earth',
    series:'Tonal Study', descriptor:'terracotta, oat and honey-brown vertical bands — the warm palette as a study',
    hook:'Terracotta, oat, and honey-brown vertical bands — the warm Japandi palette presented as a study.',
    titleKW:'Tonal Study Print, Terracotta Oat Color Field, Earth Tone Abstract Art, Warm Japandi Palette',
    seoOpen:'Warm earth tonal study wall art — terracotta and oat color field print on museum-quality 250gsm matte paper. A warm Japandi piece for living room, dining room, or above-couch wall.',
    pairs:['Two Woods','Sage Stone','Layers'], pairsNote:'four-piece Tonal & Landscape gallery wall',
    useCase:'living rooms, dining rooms, designer offices, warm-palette Japandi interiors, and above-couch decor',
    tagSet:'tonal' },

  { slug:'sage-stone', name:'Sage Stone',
    series:'Tonal Study', descriptor:'stone-grey, warm sage and walnut vertical bands — the botanical palette as a study',
    hook:'Stone-grey, warm sage, walnut. The Japandi botanical palette presented as a study.',
    titleKW:'Tonal Study Print, Sage Stone Color Field, Biophilic Abstract Wall Art, Cool Japandi Palette',
    seoOpen:'Sage and stone tonal study wall art — biophilic color field print on museum-quality 250gsm matte paper. A calm Japandi piece for bedroom, study, or above-bed gallery wall.',
    pairs:['Two Woods','Warm Earth','Layers'], pairsNote:'four-piece Tonal & Landscape gallery wall',
    useCase:'bedrooms, studies, designer offices, biophilic Japandi interiors, and above-bed decor',
    tagSet:'tonal' },

  // STILLS (3)
  { slug:'balance', name:'Balance',
    series:'Wabi-Sabi Still Life', descriptor:'a small cairn of three stones — the discipline piece',
    hook:'Three stones, stacked. The discipline piece — a small monument to the practice of doing one quiet thing well.',
    titleKW:'Stacked Stones Print, Wabi-Sabi Cairn Wall Art, Japandi Still Life, Mindful Decor',
    seoOpen:'Stacked stones wall art — wabi-sabi cairn still life on museum-quality 250gsm matte paper. A mindful Japandi piece for meditation space, study, or above-bed gallery wall.',
    pairs:['Chado','Linen Morning','Tsuki'], pairsNote:'four-piece Wabi-Sabi gallery wall',
    useCase:'meditation studios, yoga teachers, therapist offices, mindful gifts, and Japandi bedrooms',
    tagSet:'stills' },

  { slug:'chado', name:'Chado',
    series:'Wabi-Sabi Still Life', descriptor:'a tetsubin teapot, two cups, a single branch — chadō, the way of tea, as a still life',
    hook:'A tetsubin teapot, two cups, a single branch — chadō, the way of tea, drawn as a still life.',
    titleKW:'Chado Tea Ceremony Print, Japandi Still Life Wall Art, Wabi-Sabi Tea Decor, Kitchen Print',
    seoOpen:'Chado tea ceremony wall art — wabi-sabi Japandi still life print on museum-quality 250gsm matte paper. A quiet piece for kitchen, dining room, or tea room.',
    pairs:['Balance','Linen Morning','Tsuki'], pairsNote:'four-piece Wabi-Sabi gallery wall',
    useCase:'kitchens, dining rooms, tea rooms, mindful housewarming gifts, and Japandi homes',
    tagSet:'stills' },

  { slug:'linen-morning', name:'Linen Morning',
    series:'Atmospheric Still Life', descriptor:'light through a billowing linen curtain — the slow-morning piece',
    hook:'Light through a billowing linen curtain — the slow-morning piece. The shape of a Sunday.',
    titleKW:'Linen Curtain Print, Slow Morning Still Life, Japandi Wall Art, Atmospheric Bedroom Decor',
    seoOpen:'Linen morning wall art — atmospheric Japandi still life print on museum-quality 250gsm matte paper. A quiet piece for bedroom, living room, or above-bed gallery wall.',
    pairs:['Balance','Chado','Serene Dawn'], pairsNote:'four-piece Wabi-Sabi & Landscape gallery wall',
    useCase:'bedrooms, sunlit reading nooks, slow-morning lovers, intentional gifts, and Japandi interiors',
    tagSet:'stills' },
];

// ── series-level metadata ───────────────────────────────────────────────────
const SERIES_KEYWORDS = {
  'sumi-e':      'Japandi wall art • sumi-e ink painting • minimalist Japanese print • zen wall art • wabi-sabi decor • meditation art • above bed art',
  'botanical':   'Botanical line art • single-line drawing • Japandi botanical print • minimalist botanical • zen wall art • neutral wall decor • leaf wall art',
  'landscape':   'Minimalist landscape print • Japandi landscape • abstract horizon • neutral wall art • nature wall art • soft landscape • above bed art',
  'calligraphy': 'Japanese calligraphy print • kanji wall art • Japanese wall art • zen wall art • meditation art • Japandi decor • sumi-e print',
  'tonal':       'Tonal study print • color field art • neutral palette art • Japandi abstract • minimalist abstract • earth tone wall art • above couch art',
  'stills':      'Wabi-sabi still life • Japandi still life • minimalist still life • mindful wall art • slow-living decor • zen still life • above bed art',
};

// ── set lookup (which set listing does this slug belong to?) ────────────────
// Maps each individual slug → the set name + savings tier for cross-link.
const SET_FOR_SLUG = {
  // sumi-essentials
  'enso':            { setName:'Sumi-e Essentials',   savings:28 },
  'mountain-mist':   { setName:'Sumi-e Essentials',   savings:28 },
  'crane':           { setName:'Sumi-e Essentials',   savings:28 },
  // sumi-botanical
  'bent-reed':       { setName:'Sumi-e Botanical',    savings:28 },
  'bamboo':          { setName:'Sumi-e Botanical',    savings:28 },
  'cherry-branch':   { setName:'Sumi-e Botanical',    savings:28 },
  // sumi-water
  'koi':             { setName:'Sumi-e Calm Waters',  savings:28 },
  'mountain-stream': { setName:'Sumi-e Calm Waters',  savings:28 },
  'tsuki':           { setName:'Sumi-e Calm Waters',  savings:28 },
  // botanical-soft
  'single-stem':     { setName:'Botanical Soft',      savings:28 },
  'olive':           { setName:'Botanical Soft',      savings:28 },
  'eucalyptus':      { setName:'Botanical Soft',      savings:28 },
  // botanical-wild
  'ginkgo':          { setName:'Botanical Wild',      savings:28 },
  'pampas':          { setName:'Botanical Wild',      savings:28 },
  'wild-grass':      { setName:'Botanical Wild',      savings:28 },
  // landscape-quiet-sky
  'horizon-bird':    { setName:'Landscape Quiet Sky', savings:28 },
  'layers':          { setName:'Landscape Quiet Sky', savings:28 },
  'serene-dawn':     { setName:'Landscape Quiet Sky', savings:28 },
  // landscape-night
  'moon-cycle':      { setName:'Landscape Night',     savings:28 },
  'moonrise':        { setName:'Landscape Night',     savings:28 },
  'dusk':            { setName:'Landscape Night',     savings:28 },
  // calligraphy
  'shizuka':         { setName:'Japanese Calligraphy Triptych', savings:28 },
  'wa':              { setName:'Japanese Calligraphy Triptych', savings:28 },
  'ma':              { setName:'Japanese Calligraphy Triptych', savings:28 },
  // tonal
  'two-woods':       { setName:'Tonal Study Triptych', savings:28 },
  'warm-earth':      { setName:'Tonal Study Triptych', savings:28 },
  'sage-stone':      { setName:'Tonal Study Triptych', savings:28 },
  // stills
  'balance':         { setName:'Wabi-Sabi Still Life', savings:28 },
  'chado':           { setName:'Wabi-Sabi Still Life', savings:28 },
  'linen-morning':   { setName:'Wabi-Sabi Still Life', savings:28 },
};

// ── description template ────────────────────────────────────────────────────
function buildDescription(p){
  const keywords = SERIES_KEYWORDS[p.tagSet];
  const pairsList = p.pairs.map(n=>`*${n}*`).join(', ');
  const setInfo = SET_FOR_SLUG[p.slug];
  const setCrossLink = setInfo
    ? `\n\n**Save $${setInfo.savings} with the set of three** — see "${setInfo.setName}" in our shop. The three prints are designed to balance as a single gallery wall.`
    : '';
  return [
    `${p.seoOpen}`,
    ``,
    `*${p.name}* — ${p.hook}`,
    ``,
    `Part of the **${p.series}** series by Calm & Oak. Pairs with ${pairsList} to form a ${p.pairsNote} (each sold separately).${setCrossLink}`,
    ``,
    `**Sizes — all fit standard frames**`,
    `• 8×10 in — $28`,
    `• 11×14 in — $42`,
    `• 16×20 in — $68`,
    ``,
    `**Materials**`,
    `• Museum-quality matte fine-art poster, 250 gsm`,
    `• Acid-free, FSC-certified archival paper`,
    `• Warm off-white background — not bright white`,
    `• Original Calm & Oak artwork, drawn in-house`,
    ``,
    `**Made to order.** Printed locally and shipped flat. Allow 3–5 business days before dispatch. Unframed — frame separately for the cleanest look.`,
    ``,
    `A quiet gift for ${p.useCase}.`,
    ``,
    `${keywords}`
  ].join('\n');
}

// ── title builder (keep under 140 chars; pattern: KW block | Name by Calm & Oak) ─
function buildTitle(p){
  const tail = ` | ${p.name} by Calm & Oak`;
  let t = `${p.titleKW}${tail}`;
  if (t.length > 140) {
    // Try without "by Calm & Oak"
    t = `${p.titleKW} | ${p.name}`;
  }
  if (t.length > 140) {
    // Truncate keyword block
    const allowed = 140 - tail.length;
    t = `${p.titleKW.slice(0, allowed-1)}…${tail}`;
  }
  return t;
}

// ── build + write output ────────────────────────────────────────────────────
const out = {
  _version: 'v2 — 2026-05-31, post-competitor-research rewrite',
  _pricing: { '8x10': 28, '11x14': 42, '16x20': 68, _note: 'tested vs Etsy mid-tier; 16x20 has headroom to $78 if testing premium' },
  _gelatoTagsAlreadyAttached: [
    'japandi wall art','minimalist wall art','wabi sabi decor','calm home decor','neutral wall decor','gallery wall print'
  ],
  _tagsToAddPerSeries: {
    'sumi-e':      ['sumi e print','japanese ink print','zen wall art','meditation art','above bed art','black and white art','japanese wall art'],
    'botanical':   ['botanical line art','single line drawing','minimalist botanical','leaf wall art','meditation art','plant lover gift','above bed art'],
    'landscape':   ['minimalist landscape','japandi print','nature wall art','soft landscape','above bed art','neutral wall art','horizon wall art'],
    'calligraphy': ['japanese kanji art','calligraphy print','kanji wall art','sumi e print','zen wall art','japanese wall art','meditation art'],
    'tonal':       ['tonal study print','color field art','neutral palette art','minimalist abstract','earth tone art','japandi abstract','above couch art'],
    'stills':      ['still life print','japandi still life','wabi sabi print','modern still life','mindful art','slow living decor','above bed art']
  },
  _editorialNote: 'Each title is keyword-first per 2026 Etsy SEO research. Descriptions lead with a 160-char SEO opening for mobile + Google indexing, then the poetic hook, then scannable bullets. Gallery-wall pairings make every listing cross-sell another listing.',
  prints: PRINTS.map(p => ({
    slug: p.slug,
    name: p.name,
    series: p.series,
    tagSet: p.tagSet,
    title: buildTitle(p),
    titleLen: buildTitle(p).length,
    description: buildDescription(p),
    pairs: p.pairs
  }))
};

const outPath = path.join(__dirname, '_gelato-listings-v2.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');

// Sanity report
const titlesTooLong = out.prints.filter(p => p.titleLen > 140);
console.log(`Wrote ${out.prints.length} prints to ${outPath}`);
console.log(`Titles too long (>140): ${titlesTooLong.length}`);
console.log(`Sample (Mountain Mist):\n  TITLE [${out.prints.find(p=>p.slug==='mountain-mist').titleLen} chars]: ${out.prints.find(p=>p.slug==='mountain-mist').title}`);
console.log(`  DESCRIPTION (${out.prints.find(p=>p.slug==='mountain-mist').description.length} chars):\n${out.prints.find(p=>p.slug==='mountain-mist').description}`);
