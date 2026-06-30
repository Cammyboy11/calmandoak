# The Calm & Oak Edit — Image Generation Prompt Pack

**Purpose.** One art-directed prompt per image placeholder in the magazine, written to a single editorial standard so the whole of Volume One reads like one photographer shot it. Generate in Gemini (Nano Banana / Imagen), name each file by its **code** (e.g. `W-08.jpg`), and drop into `assets/the-edit/img/`. The HTML placeholders will be wired to these filenames.

Target register: **Vogue Living / Kinfolk / Cereal / Architectural Digest** — quiet, expensive, restrained. Not stock, not catalogue, not "AI render."

---

## GLOBAL ART DIRECTION — paste this block at the TOP of every prompt

> Editorial interior / fine-art still-life photograph, in the style of Kinfolk and Vogue Living. Shot on a full-frame camera, 50mm or 85mm prime lens, aperture f/4–f/5.6 — gentle shallow depth of field with the whole subject legible, no gimmick blur. Eye-level or very slightly elevated; natural, undistorted perspective. Soft directional natural daylight from a large window, long gentle shadows, no harsh highlights. Colour grade: warm-desaturated, low-contrast, filmic, Kodak Portra 400 palette, true-to-life matte tones. Real natural materials only — oak, walnut, linen, wool, bouclé, stoneware, clay, rattan, paper. Generous negative space, considered composition, rule of thirds, objects grouped in odd numbers, gentle asymmetry. Photorealistic, high resolution, sharp where it matters, fine natural film grain.

**Append this NEGATIVE block to EVERY prompt:**

> Negative: no people, no faces, no hands, no text, no lettering, no captions, no watermark, no logo, no brand names, no clutter, no oversaturation, no HDR, no neon, no plastic or chrome or gloss, no warped or bent lines, no duplicated or melted objects, no surreal artefacts, no fisheye distortion, not a catalogue white-background shot.

**The single accent rule:** exactly one warm accent per frame (terracotta in Winter/Autumn, one green stem in Spring, one faded-indigo note in Summer). Never two.

---

## SEASONAL PALETTES (state the relevant one in each prompt)

| Season | Walls / base | Cloth | Wood | Ceramic | The one accent | Light mood |
|---|---|---|---|---|---|---|
| **Winter** | warm greige `#D9D2C7` | oat `#E7DECB` | walnut `#6B5746` | stone `#A9A399` | terracotta `#C97B5C` | cold blue exterior, warm interior lamps; low 4 p.m. light |
| **Spring** | soft white `#EFEAE0` | pale sage `#CBCBB8` | bleached oak `#D8C7A6` | stone `#B7B2A6` | one green stem `#7C8A6A` | bright, high-key, diffuse morning |
| **Summer** | off-white `#F1ECE3` | oat `#E5DDCD` | bleached oak `#D7C9AE` | cool stone `#9FA09A` | faded indigo `#6B7585` | bright but soft, airy, open-door daylight |
| **Autumn** | warm oat `#E3D8C4` | ochre `#C8A56B` | walnut `#5E4A38` | dried sage `#7C7E6A` | ember terracotta `#C16A45` | low golden hour, amber, candlelight |

---

## ASPECT RATIOS (match the placeholder; generate at highest resolution)

| Placeholder type | Ratio | Notes |
|---|---|---|
| Cover hero | 4:3 landscape | fills the upper cover block |
| Full-page breaker / quote spread / full-bleed | 3:4 portrait | whole US-Letter page; keep a calmer lower third for overlaid text |
| Room hero / section opener | 4:3 landscape | top-of-page band |
| Wide band (contents, almanac, edit groups, etc.) | ~16:7 panoramic | short, wide strip |
| Detail / object feature | 4:5 portrait | tall column beside text |
| Square detail | 1:1 | paired room details |

---

# ISSUE ONE — WINTER · "The Quiet Months"
Palette: warm greige / oat / walnut / stone / terracotta. Mood: the warm refuge against the cold — *fuyugomori*, *seijaku*, hygge. Cold blue light at the windows, warm lamplight within.

### W-01 — Cover hero · 4:3
> [GLOBAL] A winter living room photographed at first light. An oat-linen sofa with two layered wool throws, a walnut side table, a single terracotta ribbed vase holding one bare branch, a paper lamp glowing warm. Cold pale-blue daylight through a large window meeting warm interior light. Palette: warm greige walls, oat textiles, walnut wood, one terracotta accent. Deep calm, expensive restraint, lots of air. [NEGATIVE]

### W-02 — Contents still life · 16:7 band
> [GLOBAL] A quiet winter tabletop still life: a single hand-thrown stoneware cup, a folded oat wool throw, one bare branch lying beside them on a pale greige surface. Soft low side light, long gentle shadows, much empty space. [NEGATIVE]

### W-03 — Editor's note band · 16:7 band
> [GLOBAL] A dim winter interior at dusk seen toward a large window: cold blue twilight outside, one warm amber lamp lit within an oat-and-walnut room, long shadows. Moody, hushed, cinematic but soft. [NEGATIVE]

### W-BRK-OPEN — Opening breaker · 3:4 portrait
> [GLOBAL] Bare dark branches against a pale cold winter sky, or a single dim warm-lit window seen from a snow-quiet exterior at blue hour. Minimal, poetic, a calmer darker lower third for text overlay. [NEGATIVE]

### W-04 — Palette materials · 3:2 landscape
> [GLOBAL] A material flat study on a greige surface: a small walnut stool corner, folded oat linen, a matte grey stone bowl, and one terracotta vessel, arranged with air between them. Raking side light revealing texture. [NEGATIVE]

### W-05 — Palette flat-lay · 16:7 band
> [GLOBAL] Five materials laid side by side in a row on pale greige: warm greige plaster, oat linen, a slab of walnut, grey unglazed stone, and a single terracotta chip. Even soft overhead daylight, top-down, swatch-like but organic. [NEGATIVE]

### W-06 — A word (fuyugomori) · 16:9 landscape
> [GLOBAL] The winter den instinct: a deep linen armchair pulled close to a single warm lamp, a wool throw over the arm, heavy curtains drawn against blue dusk. Warm pools of low light, the rest of the room in soft shadow. [NEGATIVE]

### W-07 — Almanac (daikan) band · 16:7 band
> [GLOBAL] A macro nature study: butterbur buds breaking through frozen ground, or delicate frost crystals on a still stream edge. Cold soft morning light, shallow focus, muted winter tones. [NEGATIVE]

### W-BRK-A — Breaker A · 3:4 portrait
> [GLOBAL] A wide winter interior at dusk: one warm lamp glowing deep in a dim oat-and-walnut room, cold blue snow-light at the window, long shadows across a bare floor. Calm lower third for text. [NEGATIVE]

### W-08 — Room hero · 4:3 landscape
> [GLOBAL] The hero winter living room held in low warm light: an oat-linen sofa with layered wool, a walnut side table, one terracotta vessel with a single branch, a paper lamp glowing, a wool-jute runner. Late-afternoon window light, three soft pools of lamplight, deeply calm. [NEGATIVE]

### W-09a — Room detail · 1:1
> [GLOBAL] Close detail: two weights of oat wool — a flat weave layered over a chunky cable knit — draped on a sofa arm, a stoneware mug beside. Warm low light, soft shadow. [NEGATIVE]

### W-09b — Room detail · 1:1
> [GLOBAL] Close detail: a single rice-paper pendant lamp glowing warm against a warm-greige plaster wall, the paper softly luminous. Quiet, minimal. [NEGATIVE]

### W-11 — Material study macro · 4:5 portrait
> [GLOBAL] Extreme close-up of a ribbed terracotta-brown stoneware vase, raking side light revealing the hand-thrown glaze pooling in the flutes, one warm note against a greige ground. Tactile, intimate. [NEGATIVE]

### W-12 — Second room (the bed) · 1:1
> [GLOBAL] A winter bed dressed in layered oat washed-linen with a cream cable-knit throw folded across the foot, a low lamp beside it, one bare stem on the nightstand. Soft cool morning light through linen. [NEGATIVE]

### W-13 — Edit opener still life · 16:9 landscape
> [GLOBAL] An overhead-ish grouped still life of winter homewares: an unlit paper lamp, a folded oat throw, three small bud vases, a stoneware mug, an acacia tray, one terracotta vessel. Kinfolk-quiet, soft side light, much negative space. [NEGATIVE]

### W-14 — Edit (light + cloth) band · 16:7 band
> [GLOBAL] A grouped still life: a lit rattan tripod floor lamp beside layered oat linen and an ivory bouclé cushion. Warm low light, calm. [NEGATIVE]

### W-15 — Edit (clay + table) band · 16:7 band
> [GLOBAL] A grouped still life: hand-thrown stoneware mugs, a cream bud vase, an acacia serving tray and a seagrass basket on pale wood. Warm side light. [NEGATIVE]

### W-16 — Object feature (the paper lamp) · 4:5 portrait
> [GLOBAL] A single lit rice-paper Akari-style lamp glowing warm in a dim corner, the bamboo ribs faintly visible through the washi paper, deep soft shadow around it. One object, reverent. [NEGATIVE]

### W-17 — Full-bleed still life · 3:4 portrait
> [GLOBAL] A full-frame winter still life: three bud vases each with a single bare stem, a stoneware mug, a folded oat throw, an acacia tray, one terracotta vessel. Quiet Kinfolk styling, soft directional light, generous space. [NEGATIVE]

### W-18 — Closing-note band · 16:7 band
> [GLOBAL] A single new object just arrived: one paper lamp, unboxed, sitting alone on a bare pale floor by a window, nothing else around it. Soft light, a study in restraint. [NEGATIVE]

### W-BRK-B — Breaker B · 3:4 portrait
> [GLOBAL] Macro textile texture filling the frame: two weights of oat wool and a linen weave, low raking side light picking out every fibre. Abstract, tactile. Calm lower third for text. [NEGATIVE]

### W-19 — Lesson band · 16:7 band
> [GLOBAL] A near-empty pale shelf: two objects grouped to one side, the remaining two-thirds left as bare air. The calm of the designed gap. Soft light. [NEGATIVE]

### W-20 — Lesson applied band · 16:7 band
> [GLOBAL] A corrected mantel: one wide framed print hung off-centre, a single stem, a stretch of bare greige wall beside it. Restraint as composition. Soft light. [NEGATIVE]

### W-21 — Lesson quote spread · 3:4 portrait
> [GLOBAL] A quiet winter corner at dusk: one warm lamp, deep soft shadow, a single object catching the last cold light. The beauty of the designed dark. Calm centre/upper area for an overlaid quote. [NEGATIVE]

### W-BRK-RITUAL — Ritual breaker · 3:4 portrait
> [GLOBAL] A winter dusk interior: the last grey light at a window, a single warm lamp just switched on, long shadows across an oat-and-walnut room. Calm lower third for text. [NEGATIVE]

### W-22 — Ritual hero · 4:3 landscape
> [GLOBAL] The four-o'clock tea ritual: a cast-iron tetsubin teapot and two stoneware cups on an acacia tray, a thread of steam rising, low warm four-o'clock light through linen. Intimate, still. [NEGATIVE]

### W-24 — Ritual (the second cup) · 1:1
> [GLOBAL] A cup of roasted hojicha tea poured from a cast-iron tetsubin, warm amber liquor, gentle steam, low winter light. Close, warm, tactile. [NEGATIVE]

### W-25 — Three budgets band · 16:7 band
> [GLOBAL] The same winter corner styled two ways side by side — simply, then more fully — a quiet study in restraint not clutter. Consistent soft light. [NEGATIVE]

### W-26 — Sourcing (print + frame) · 16:9 landscape
> [GLOBAL] A single sumi-e ink-branch print in a warm oak frame on a greige wall, one bare stem in a vase on the console below, hung slightly off-centre. Gallery-calm, soft light. [NEGATIVE]

### W-28 — Reading band · 16:7 band
> [GLOBAL] A hardback book face-down beside a low warm lamp and a stoneware cup, deep soft shadow at the edges of the frame. The pleasure of dim light. [NEGATIVE]

### W-29 — Shop closing still life · 16:7 band
> [GLOBAL] A closing winter still life: a cast-iron tetsubin, a folded oat throw, one bare branch in a terracotta vase, low warm light. Quiet, resolved. [NEGATIVE]

### W-30 — Next issue (spring teaser) · 4:3 landscape
> [GLOBAL — but shift toward the SPRING palette and bright high-key light] A single branch in fresh bud against a pale soft-white wall, bright diffuse morning light, the first green after the cold. Hopeful, airy. [NEGATIVE]

---

*Winter set: 28 images.*

---

# ISSUE TWO — SPRING · "First Light"
Palette: soft white / pale sage / bleached oak / stone / one green stem. Mood: the thaw, the clear-out, *kanso*, *lagom*, ikebana. Bright, high-key, diffuse morning light; pale, airy, lifted.

### SP-01 — Cover hero · 4:3
> [GLOBAL] A pale spring room at mid-morning: a single bare branch in fresh bud in a tall stoneware vase, oat linen, bleached-pale oak, a cleared surface, an open window. Bright diffuse high-key light, soft-white walls, one green stem the only colour. Airy, expensive, calm. [NEGATIVE]

### SP-02 — Contents band · 16:7
> [GLOBAL] A pale spring still life: a single budding branch in a whitewashed stoneware vase on a cleared windowsill, soft bright morning light, much empty space. [NEGATIVE]

### SP-03 — Editor's note band · 16:7
> [GLOBAL] A window thrown open to pale spring light, a thin unlined linen curtain lifting in a draught, the first green of a garden softly visible beyond. High-key, fresh. [NEGATIVE]

### SP-BRK-OPEN — Opening breaker · 3:4
> [GLOBAL] The first blossom on an otherwise bare branch against a soft pale sky, gentle morning light. Minimal, hopeful, calm lower third for text. [NEGATIVE]

### SP-04 — Palette materials · 3:2
> [GLOBAL] A material study on soft-white: a corner of bleached oak, folded pale-sage linen, a matte stone bowl, and one fresh green budding branch, air between them. Bright soft light. [NEGATIVE]

### SP-06 — Almanac band · 16:7
> [GLOBAL] A macro nature study: the first peach blossom opening on a bare dark branch against a pale sky, soft spring light, shallow focus. [NEGATIVE]

### SP-07 — A word (kanso) band · 16:7
> [GLOBAL] A single essential object — one stoneware vessel — on an otherwise bare pale shelf, a great deal of empty space around it. Simplicity made visible. Soft bright light. [NEGATIVE]

### SP-BRK-A — Breaker A · 3:4
> [GLOBAL] A wide pale spring room flooded with mid-morning light, unlined linen lifting in a draught, a single budding branch in a tall vase, bleached oak, bare floor. High-key, airy, calm lower third for text. [NEGATIVE]

### SP-08 — Room hero · 4:3
> [GLOBAL] The hero spring living room, opened up: pale linen curtains lifting in a draught, a single budding branch in a tall vase, bleached oak, a bare floor, soft-white walls. Bright diffuse morning light, generous space, fresh and undressed. [NEGATIVE]

### SP-09a — Room detail · 1:1
> [GLOBAL] Close detail: a pale unlined linen curtain lifting softly in a draught, bright light passing through the weave. [NEGATIVE]

### SP-09b — Room detail · 1:1
> [GLOBAL] Close detail: one budding branch in a tall stoneware vase on a freshly cleared pale surface, soft morning light, much empty space. [NEGATIVE]

### SP-11 — Second room (the entry) · 4:5
> [GLOBAL] A spring entryway: a slim bleached-oak console, one woven basket beneath, a budding branch in a vase and a single stoneware dish on top, a framed botanical line print above, hung off-centre. Bright soft hall light. [NEGATIVE]

### SP-12 — Material study (washi) · 1:1
> [GLOBAL] Macro: bright spring light passing through a handmade washi paper lamp shade, the mulberry fibres visible, an even soft warm glow. Tactile, minimal. [NEGATIVE]

### SP-BRK-B — Breaker B · 3:4
> [GLOBAL] A pale windowsill in long bright light: three whitewashed bud vases at varied heights, a single budding branch in one, the others empty, bare wood, soft shadows. Calm lower third for text. [NEGATIVE]

### SP-14 — Edit (clear + lighten) band · 16:7
> [GLOBAL] A grouped still life: stacked seagrass baskets beside pale folded linen and a light slatted bamboo bench, bright soft light. [NEGATIVE]

### SP-15 — Edit (living thing + table) band · 16:7
> [GLOBAL] A grouped still life: bud vases with single stems, a hand-thrown stoneware mug and an acacia tray on pale bleached oak, bright morning light. [NEGATIVE]

### SP-16 — Full-bleed still life · 3:4
> [GLOBAL] A full-frame spring still life: three whitewashed vases, one holding a budding branch, a stoneware mug, pale linen folded, a seagrass basket. Bright soft morning light, generous negative space. [NEGATIVE]

### SP-17 — Object feature (single-stem vase) · 4:5
> [GLOBAL] Three slim bud vases on a sill at varied heights, a single stem in each, backlit by soft bright morning light. Quiet, minimal, one green note. [NEGATIVE]

### SP-19 — Lesson band · 16:7
> [GLOBAL] A spare but warm room: a softened worn chair, a few meaningful objects, real texture rather than emptiness — richness in restraint. Soft bright light. [NEGATIVE]

### SP-20 — Lesson applied band · 16:7
> [GLOBAL] A kept worn stoneware bowl and a soft old chair beside a cleared pale shelf with a held-open gap — what to keep, and the space to leave. Soft light. [NEGATIVE]

### SP-21 — Lesson quote spread · 3:4
> [GLOBAL] A near-empty pale room with a single chair and one budding branch in a tall vase, a great deal of bright bare floor and light. The beauty of the deliberate gap. Calm centre for an overlaid quote. [NEGATIVE]

### SP-BRK-RITUAL — Ritual breaker · 3:4
> [GLOBAL] A spring ritual still life: a single cut budding branch and a pair of shears on a pale surface, a tall empty stoneware vase waiting, soft bright light. Calm lower third for text. [NEGATIVE]

### SP-22 — Ritual opener (ikebana) · 4:3
> [GLOBAL] A single flowering branch being arranged into a tall vase, shears and one cut stem resting on a pale table, soft bright light. Composed, quiet — no people, hands optional and only if natural. [NEGATIVE]

### SP-24 — The three lines (ikebana) · 1:1
> [GLOBAL] A minimal ikebana arrangement in a low stoneware vessel showing three stems at three clearly different heights and angles — tall, medium, low — much air between them, asymmetric. Soft bright light, plain pale background. [NEGATIVE]

### SP-25 — Three budgets band · 16:7
> [GLOBAL] The same spring entry styled two ways side by side — simply, then more considered — a quiet step-up in composition, never clutter. Consistent bright light. [NEGATIVE]

### SP-26 — Sourcing (print + frame) · 16:9
> [GLOBAL] A single botanical line print — one eucalyptus stem — in a light oak frame above a slim console, one branch in a vase below, hung slightly off-centre. Bright gallery-calm light. [NEGATIVE]

### SP-29 — Shop closing band · 16:7
> [GLOBAL] A closing spring still life: a budding branch in a whitewashed vase, pale folded linen, a stoneware mug, bright soft morning light. [NEGATIVE]

### SP-30 — Next issue (summer teaser) · 4:3
> [GLOBAL — shift toward the SUMMER palette, bright airy daylight] A linen-draped table beside an open door, bleached oak, a cool stoneware jug, strong soft daylight, the garden beyond. Open, breezy. [NEGATIVE]

*Spring set: 27 images.*

---

# ISSUE THREE — SUMMER · "Slow Mornings"
Palette: off-white / oat / bleached oak / cool stone / one faded-indigo note. Mood: the open door, the threshold, *ma*, *friluftsliv*, the long breakfast. Bright but soft, airy, open-air daylight.

### SU-01 — Cover hero · 4:3
> [GLOBAL] A summer breakfast at an open threshold: pale linen, a cool stoneware jug, bleached oak, the garden soft beyond an open door. Strong but diffuse morning light, off-white walls, one faded-indigo cloth the only cool note. Airy, expensive calm. [NEGATIVE]

### SU-02 — Contents band · 16:7
> [GLOBAL] A summer still life: a cool stoneware jug beaded with condensation, a single garden stem, on bleached oak, bright diffuse light, much air. [NEGATIVE]

### SU-03 — Editor's note band · 16:7
> [GLOBAL] An open door onto a soft summer garden, a sheer linen panel lifting, a bleached-oak floor running out toward the light. Bright, breezy, inviting. [NEGATIVE]

### SU-BRK-OPEN — Opening breaker · 3:4
> [GLOBAL] Bright diffuse light across a garden seen through an open door, a sheer linen panel lifting. Airy, luminous, calm lower third for text. [NEGATIVE]

### SU-04 — Palette materials · 3:2
> [GLOBAL] A material study: bleached oak, oat linen, a cool grey-glazed jug, and a single indigo-dipped cloth, air between them. Bright soft daylight. [NEGATIVE]

### SU-06 — Almanac band · 16:7
> [GLOBAL] A macro nature study: a single open lotus or summer bloom in cool light, still water beneath, soft and serene. [NEGATIVE]

### SU-07 — A word (ma) band · 16:7
> [GLOBAL] A wide bare pale wall with a single small framed print far to one side, the interval of empty space made the subject. Soft bright light. [NEGATIVE]

### SU-BRK-A — Breaker A · 3:4
> [GLOBAL] A wide threshold: open doors onto a soft garden, a sheer linen panel lifting, pale oak floor running from inside to out, strong diffuse light. Calm lower third for text. [NEGATIVE]

### SU-08 — Room hero · 4:3
> [GLOBAL] The hero summer room with doors thrown open to a garden: a long bleached-oak table laid simply, sheer linen, a cool stoneware jug, the inside and outside reading as one space. Bright diffuse light, airy, generous. [NEGATIVE]

### SU-09a — Room detail · 1:1
> [GLOBAL] Close detail: a sheer linen panel lifting in an open doorway, the garden soft and bright beyond. [NEGATIVE]

### SU-09b — Room detail · 1:1
> [GLOBAL] Close detail: a cool stoneware jug and one garden stem on a bare bleached-oak table, bright soft light. [NEGATIVE]

### SU-11 — Second room (the bedroom) · 4:5
> [GLOBAL] A cool summer bedroom: a single washed-linen layer in oat, bleached oak, a bud vase, an open window with sheer linen lifting. Pale bright early light, undressed and airy. [NEGATIVE]

### SU-12 — Material study (linen) · 1:1
> [GLOBAL] Macro: the slub and irregular weave of washed oat linen in raking bright light, every thread visible, soft creases. Tactile. [NEGATIVE]

### SU-BRK-B — Breaker B · 3:4
> [GLOBAL] A still life of the summer edit: a cool stoneware jug and a beaded glass, pale linen folded, a single garden stem in a bud vase, bleached oak, high diffuse light. Calm lower third for text. [NEGATIVE]

### SU-14 — Edit (cool + table) band · 16:7
> [GLOBAL] A grouped still life: a reactive-glaze stoneware cup, glass canisters, and a walnut board with stone fruit, bright diffuse light. [NEGATIVE]

### SU-15 — Edit (bed + light) band · 16:7
> [GLOBAL] A grouped still life: pale folded linen, a waffle-weave towel, and an unlit woven basket lamp, soft early light. [NEGATIVE]

### SU-16 — Full-bleed still life · 3:4
> [GLOBAL] A full-frame summer table by an open door: stoneware plates, a jug of water, a walnut board with stone fruit, one stem, sheer linen lifting beyond. Bright diffuse light, generous space. [NEGATIVE]

### SU-17 — Object feature (the jug) · 4:5
> [GLOBAL] A single hand-thrown stoneware water jug, beaded with cool condensation, side-lit on bare bleached oak. One object, half utility half ceremony. [NEGATIVE]

### SU-19 — Lesson band · 16:7
> [GLOBAL] A calm surface with one object and a wide held margin of bare bleached wood around it — intended emptiness, not unfinished. Soft bright light. [NEGATIVE]

### SU-20 — Lesson applied band · 16:7
> [GLOBAL] A long table with one whole end deliberately left clear, a single jug at the other end — the protected interval. Bright diffuse light. [NEGATIVE]

### SU-21 — Lesson quote spread · 3:4
> [GLOBAL] A serene near-empty room with doors open to a bright garden, a single low bench, a great deal of bare pale floor and light. Calm centre for an overlaid quote. [NEGATIVE]

### SU-BRK-RITUAL — Ritual breaker · 3:4
> [GLOBAL] A summer ritual still life: early soft light on a tray set for breakfast by an open door, a glass of cold tea, one stem. Calm lower third for text. [NEGATIVE]

### SU-22 — Ritual opener (long breakfast) · 4:3
> [GLOBAL] A slow breakfast laid by an open door: a stoneware bowl, a glass of cold amber barley tea, stone fruit, a single stem, early soft light. Unhurried, serene — no people. [NEGATIVE]

### SU-24 — The engawa note · 4:5
> [GLOBAL] An improvised engawa: a low bench or floor cushion set at an open doorway, half inside and half out, the garden softly bright beyond. The valuable in-between. [NEGATIVE]

### SU-25 — Three budgets band · 16:7
> [GLOBAL] The same open-door breakfast threshold styled two ways side by side — simply, then more considered — a step-up in air, not clutter. Consistent bright light. [NEGATIVE]

### SU-26 — Sourcing (print + frame) · 16:9
> [GLOBAL] A single minimalist horizon-landscape print in an oak frame on a pale wall above an open threshold, the garden soft beyond. Bright diffuse gallery light. [NEGATIVE]

### SU-29 — Shop closing band · 16:7
> [GLOBAL] A closing summer still life: the stoneware jug, a glass of cold barley tea over ice, one stem, sheer linen beyond. Bright diffuse light. [NEGATIVE]

### SU-30 — Next issue (autumn teaser) · 4:3
> [GLOBAL — shift to the AUTUMN palette, low golden amber light] Amber evening light across an ochre wool throw and dried pampas, walnut and terracotta, the year turning warm again. Glowing, intimate. [NEGATIVE]

*Summer set: 27 images.*

---

# ISSUE FOUR — AUTUMN · "Golden Hour"
Palette: warm oat / ochre / walnut / dried sage / ember terracotta. Mood: the turn inward, the gathering, *mono no aware*, wabi-sabi, *fukinsei*, dried botanicals, candlelight. Low golden-hour and amber light throughout.

### AU-01 — Cover hero · 4:3
> [GLOBAL] An autumn living room in low amber evening light: an ochre wool throw, dried pampas in a terracotta vase, walnut wood, one warm lamp glowing. Golden-hour light raking across, warm-oat walls, one ember accent. Deep warm calm, expensive restraint. [NEGATIVE]

### AU-02 — Contents band · 16:7
> [GLOBAL] A warm autumn still life: dried pampas in a terracotta vase, an ochre wool throw, walnut wood, low amber light, much space. [NEGATIVE]

### AU-03 — Editor's note band · 16:7
> [GLOBAL] Turning autumn leaves backlit by low golden light, warm amber tones, the year letting go. Soft, glowing, shallow focus. [NEGATIVE]

### AU-BRK-OPEN — Opening breaker · 3:4
> [GLOBAL] Turning maple and ivy leaves backlit by low golden light, warm amber tones, loveliest as they let go. Calm lower third for text. [NEGATIVE]

### AU-04 — Palette materials · 3:2
> [GLOBAL] A material study: walnut wood, an ochre wool throw, dried sage-green pampas, and a terracotta vessel, air between them. Warm low light. [NEGATIVE]

### AU-06 — Almanac band · 16:7
> [GLOBAL] A macro nature study: wild geese in formation against a pale autumn sky, or a single late chrysanthemum bloom, soft golden light. [NEGATIVE]

### AU-07 — A word (mono no aware) band · 16:7
> [GLOBAL] A worn, aged object held in warm light — a chipped stoneware bowl or a dried stem — beautiful for its patina and impermanence. Intimate, amber light. [NEGATIVE]

### AU-BRK-A — Breaker A · 3:4
> [GLOBAL] A wide autumn room at golden hour: low amber sun raking across a wool-draped sofa, dried pampas in a terracotta vase, walnut floor, one warm lamp. Calm lower third for text. [NEGATIVE]

### AU-08 — Room hero · 4:3
> [GLOBAL] The hero autumn room dressed for gathering: an oak table laid for a few, wool over the chairs, dried pampas, one warm lamp and low candlelight, walnut and ochre tones. Amber evening light, intimate and warm. [NEGATIVE]

### AU-09a — Room detail · 1:1
> [GLOBAL] Close detail: low candlelight and a warm lamp on an oak table, an ochre wool throw beyond, deep amber glow. [NEGATIVE]

### AU-09b — Room detail · 1:1
> [GLOBAL] Close detail: three dried pampas plumes in a terracotta-brown ribbed vase, warm raking light. [NEGATIVE]

### AU-11 — Second room (the table) · 4:5
> [GLOBAL] An autumn table laid simply for a few: earth-toned stoneware plates, a walnut board down the centre, low candles, dried stems, warm candlelight. Intimate, generous, unfussy. [NEGATIVE]

### AU-12 — Material study (dried botanicals) · 1:1
> [GLOBAL] Macro: the feathered detail of dried pampas grass in warm raking golden light, every filament lit. Tactile, glowing. [NEGATIVE]

### AU-BRK-B — Breaker B · 3:4
> [GLOBAL] A still life of the autumn edit: an ochre wool throw, a terracotta vase of dried pampas, a stoneware mug, a walnut board, low candlelight. Warm amber light, calm lower third for text. [NEGATIVE]

### AU-14 — Edit (warmth + light) band · 16:7
> [GLOBAL] A grouped still life: an ochre wool throw, a bouclé cushion, and a lit ceramic lamp, warm low light. [NEGATIVE]

### AU-15 — Edit (gather + keep) band · 16:7
> [GLOBAL] A grouped still life: earth-toned stoneware plates, a clay donabe pot, and dried pampas in a terracotta vase, warm candlelight. [NEGATIVE]

### AU-16 — Object feature (the wool throw) · 4:5
> [GLOBAL] Two wool throws layered over a sofa arm, cream over taupe-ochre, in warm low light. Tactile, inviting, one object reverently shot. [NEGATIVE]

### AU-17 — Full-bleed still life · 3:4
> [GLOBAL] A full-frame autumn table at dusk: earth-toned stoneware plates, a clay donabe at the centre, low candles, dried pampas in a terracotta vase, an ochre wool throw over a chair. Warm amber light, generous space. [NEGATIVE]

### AU-19 — Lesson band · 16:7
> [GLOBAL] A deliberately asymmetric arrangement: objects of different heights off-centre, one aged and worn — fukinsei and wabi-sabi in warm light. [NEGATIVE]

### AU-20 — Lesson applied band · 16:7
> [GLOBAL] A console styled asymmetrically: one tall lamp, a low stack, a print hung off-centre with bare wall beside it. Warm light. [NEGATIVE]

### AU-21 — Lesson quote spread · 3:4
> [GLOBAL] A warm lived-in corner at golden hour: a worn leather-and-wood chair, a wool throw, a chipped stoneware mug, dried stems — beautiful for being used. Calm centre for an overlaid quote. [NEGATIVE]

### AU-BRK-RITUAL — Ritual breaker · 3:4
> [GLOBAL] An autumn ritual still life: a warm laid table glimpsed in candlelight at dusk, steam rising from a pot, empty chairs pulled close. Calm lower third for text. [NEGATIVE]

### AU-22 — Ritual opener (the gathering) · 4:3
> [GLOBAL] A simple autumn gathering at dusk: a laid table, a clay donabe steaming at the centre, low candles, dried stems, a few empty chairs pulled in close. Warm amber light, intimate — no people. [NEGATIVE]

### AU-24 — Keeping the season (drying) · 4:5
> [GLOBAL] Stems hung upside down to dry in a dim corner — grasses, seed heads, a branch of turned leaves — warm low light catching them. Quiet, rustic, beautiful. [NEGATIVE]

### AU-25 — Three budgets band · 16:7
> [GLOBAL] The same autumn gathering table styled two ways side by side — simply, then more fully — a step-up in warmth, never clutter. Consistent warm light. [NEGATIVE]

### AU-26 — Sourcing (print + frame) · 16:9
> [GLOBAL] A warm-earth tonal colour-field print in an oak frame above a console, dried stems in a terracotta vessel below, hung off-centre. Low amber gallery light. [NEGATIVE]

### AU-29 — Shop closing band · 16:7
> [GLOBAL] A closing autumn still life: an ochre wool throw, a terracotta vase of dried pampas, low candlelight. Warm amber light, resolved. [NEGATIVE]

### AU-30 — Colophon / Volume One · 4:3
> [GLOBAL] A serene wide still life suggesting all four seasons resolved — a warm neutral room with one branch, soft balanced light leaning gently golden. A calm, closing, timeless frame. [NEGATIVE]

*Autumn set: 27 images.*

---

## SUMMARY
- **Winter:** 28 · **Spring:** 27 · **Summer:** 27 · **Autumn:** 27 → **≈ 109 images total.**
- Generate each at the stated aspect ratio, highest resolution. Name `CODE.jpg` (e.g. `SU-08.jpg`) and place in `assets/the-edit/img/`.
- Regenerate ruthlessly — if a frame has any AI tell (warped lines, plastic sheen, garbled object, baked-in text, two accents), discard and redo. These are the edge.
- Once the folder is populated, I wire every image into the issues, build the PDFs, and proceed to covers, Payhip, the site, and the social pins.

