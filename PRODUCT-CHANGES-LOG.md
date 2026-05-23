# Product Changes Log

**One file, all the swaps.** Every time we replace a pin's product (because the pin image doesn't match what Amazon sells, because the product has a "frequently returned" flag, because reviews fall below the bar, etc.) the change is recorded here. Most recent at top.

This file supersedes scattered notes in the action plan. The action plan's per-pin entries reference whatever was current when the doc was last generated; this log is the source of truth.

---

## Workflow rule (locked in 2026-05-12)

**Product first → picture built around it.** Never the reverse.

1. Verify the affiliate product against criteria (4.4★+ stars, 200+ reviews, no "Frequently returned" flag, Prime when possible)
2. User approves the ASIN
3. Generate the pin image via Gemini with Google Search grounding (or true image-to-image when source product photo is available) so the literal verified product appears in the pin
4. Crop product-only version for any shop page that uses the same product
5. Update both shop pages (where applicable) + action plan + add an entry to this log
6. Commit + push

---

## Change history

### 2026-05-23 — Pins 53 + 54 (Template B — LIGHT palette variant)

New this session: **light-palette Template B**. Same Template B layout (full-bleed photo, headline top-left, terracotta line, "Calm & Oak" bottom-right) but for bright/airy rooms the scene is sunlit and the headline + wordmark are DEEP CHARCOAL (#2A2724) instead of cream, so they stay readable on the light background. Use the dark-cream version for glowing-product (lighting) pins; use this light-charcoal version for bright bedroom/living-room scenes.

**Pin 54 (Bedroom) — Headboard**
- OLD: search-URL placeholder "linen upholstered headboard, queen" (bedroom shop position 10)
- NEW: HAOBO Home Upholstered Headboard, Queen, Oatmeal linen (`B07ZRPL48D`) — tall oat-linen vertical-channel headboard
- Browser-verified live + SCREENSHOT-confirmed no returns banner: 4.5★ / 704 reviews / $104.97 / US-available
- (Rejected: Yongchuang B07ZQF8WCR oatmeal looked perfect, 4.4★/482, but had a "Frequently Returned" banner the SCRIPT MISSED — caught in the screenshot. Liiwepo B0FVF4L44G only 155 reviews.)
- Pin: `04-sample-pins/day11-pin54-haobo-oat-headboard.jpg` (light Template B, "WHERE THE DAY BEGINS", charcoal headline)
- Crop: `assets/img/products-cropped/day11-pin54-haobo-oat-headboard.jpg`
- Shop: `shop/bedroom/index.html` position 10 — upgraded placeholder to verified HAOBO product

**Pin 53 (Furniture / Living Room) — Get the Look → new Look page**
- Pin 53 was a "Get the Look" 4-piece pin (round oak coffee table, cream linen sofa, wool throw, ribbed vase). No single clean solid-oak pedestal coffee table exists on Amazon with 200+ reviews + no returns flag (they're all 2-tier industrial or returns-flagged). So Pin 53 became a **Look page** instead of a single-product pin.
- Built `shop/looks/quiet-living-room/index.html` — 4 product cards:
  1. Round oak pedestal coffee table → Amazon search URL (no verified clean single product; the pin shows the aspirational look)
  2. Cream linen sofa `B091MJ3CMM`
  3. Longhui cable-knit throw `B08F48LR45`
  4. Briful brown ribbed vase `B0FT361HDX`
- Added the Look to `shop/looks/index.html` (now 2 Looks).
- Pin: `04-sample-pins/day11-pin53-quiet-living-room.jpg` (light Template B, "A QUIET LIVING ROOM", charcoal headline) — doubles as the Look hero.
- Look hero: `assets/img/looks/quiet-living-room-pin.jpg` · index card: `assets/img/looks/quiet-living-room-card.jpg`

**Pinterest copy — Pin 54:**
Title: `Where the day begins — oat linen headboard`
Tagged topics: `japandi, bedroom decor, headboard, linen bedding, neutral home`
```
WHERE THE DAY BEGINS

A tall oat-linen upholstered headboard with soft vertical channels — the slim, modern centerpiece that does most of the work in a bedroom. Height-adjustable, no fuss. The bed, dressed up.

#bedroomdecor #headboard #linenbedding #japandi #neutralhome #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```
Destination: `https://www.amazon.com/dp/B07ZRPL48D?tag=calmandoak-20` · Board: Bedroom

**Pinterest copy — Pin 53:**
Title: `A quiet living room — get the look in four pieces`
Tagged topics: `japandi, living room decor, get the look, oak furniture, slow living`
```
A QUIET LIVING ROOM

Four pieces, one calm room: a round oak pedestal coffee table, a cream linen sofa, a cable-knit wool throw, and a ribbed stoneware vase with a few dried branches. The living room that reads composed, not decorated.

#livingroomdecor #getthelook #japandi #oakfurniture #slowliving #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```
Destination: `https://calmandoak.com/shop/looks/quiet-living-room/?utm_source=pinterest&utm_medium=pin&utm_campaign=pin-53-getthelook` · Board: Living Room (or Get the Look)

---

### 2026-05-23 — Pin 49 (Ceramics & Tableware, Template B, browser-verified)

**OLD:** Vase pair (`B0BPM41R5C`) — the action-plan link, a tall cylinder + round sphere cream pair. User wanted a different ceramics product.
**NEW:** Whitewashed Neutral Ceramic Vases, Set of 3 (`B0FFMF13MV`, ooit) — matte whitewashed cream bottle vases in three heights, no handles

**Why changed:** User asked for a different ceramics product for the vase-pairing pin. Browser-verified the field live. Picked B0FFMF13MV over two siblings — Vanselia B0FDWPFCDW (4.8★/354) had loop handles + sandy texture (off-brand from the clean pin look); B0DXBR8TYV (4.7★/567) also had handles. The whitewashed ooit set is the cleanest matte-cream match and set-of-3 gives the tall+short height variety the "vase pairing" concept is about.

**Verified live (Claude-in-Chrome):** 4.7★ / 333 reviews / $29.99 / Amazon's Choice / NO "Frequently returned" badge / US-available.

**Image:** Template B, generated 2026-05-23 image-to-image from `03-pin-templates/template-B-lifestyle-overlay-example.png` + Google grounding on the actual Amazon photo (viewed via browser first). Headline "STILL LIFE, / ON A SHELF" — whitewashed cream vase trio on an oak floating shelf against dark plaster, dried botanicals, warm raking light.
- Pin: `04-sample-pins/day10-pin49-whitewashed-vase-trio.jpg`
- Crop: `assets/img/products-cropped/day10-pin49-whitewashed-vase-trio.jpg` (848×910)

**Surfaces updated:**
- Pinterest pin destination URL: `https://www.amazon.com/dp/B0FFMF13MV?tag=calmandoak-20`
- `shop/ceramics-tableware/index.html` position 9 (numberOfItems 8→9)
- Action plan Pin 49 entry (deferred — Word lock)

**Pinterest copy:**

Title: `Still life on a shelf — whitewashed vase trio`

Tagged topics: `japandi, ceramics, home styling, shelf decor, wabi sabi`

Description block:
```
STILL LIFE, ON A SHELF

A set of three whitewashed ceramic vases in stepped heights — one tall, one medium, one short, each with a single dried stem. The trio that turns an empty shelf into a composed still life. The styling rule that always works: vary the height, repeat the colour, one stem each.

#ceramics #homestyling #shelfdecor #japandi #wabisabi #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B0FFMF13MV?tag=calmandoak-20`

Board: Ceramics & Tableware
Affiliate toggle: ON

---

### 2026-05-22 — Pin 47 (Lighting, Template B, browser-verified)

**OLD:** ENCOMLI Dimmable Plug-in Wall Sconces (`B09NVP7SXN`) — the action-plan link. Still a valid US product (4.5★/560), but CADUKE is a stronger match + metrics.
**NEW:** CADUKE Plug-in Swing-Arm Wall Sconce, Set of 2, light-brown linen drum shade (`B09BB5MX6B`)

**Why changed:** User asked for a highly-ranked sconce matching the pin (dark swing arm + cream linen drum + plug-in pair). Browser-verified the field live. NOTE: corrected the verification criterion this session — products only need to be readily available to US customers, NOT ship to the Canadian browser address (the user's Amazon session is Ottawa-based, which produced false "cannot ship" negatives). CADUKE chosen: best metrics + clearest pin match + most on-message for the renter-friendly "no rewiring" copy.

**Verified live (Claude-in-Chrome):** 4.5★ / 951 reviews / $39.99 ($20/lamp) / In Stock / Amazon's Choice / NO "Frequently returned" badge. (Rejected: ENCOMLI valid but fewer reviews; SAMTEEN 192 reviews; Yosoan 25 + hardwired; Kira Home single golden sconce not a dark pair.)

**Image:** Template B, generated 2026-05-22 image-to-image from `03-pin-templates/template-B-lifestyle-overlay-example.png` + Google grounding on the actual Amazon photo (viewed via browser first). Headline "EITHER SIDE / OF THE FRAME" — sconce pair flanking framed line-art over an oak console, moody dark plaster, warm light pools, plug-in cords visible.
- Pin: `04-sample-pins/day10-pin47-caduke-sconce-pair.jpg`
- Crop: `assets/img/products-cropped/day10-pin47-caduke-sconce-pair.jpg` (848×885)

**Surfaces updated:**
- Pinterest pin destination URL: `https://www.amazon.com/dp/B09BB5MX6B?tag=calmandoak-20`
- `shop/lighting/index.html` position 12 (numberOfItems 11→12)
- Action plan Pin 47 entry (deferred — Word lock)

**Pinterest copy:**

Title: `Either side of the frame — plug-in linen sconces`

Tagged topics: `japandi, lighting ideas, renter friendly, entryway decor, warm light`

Description block:
```
EITHER SIDE OF THE FRAME

A pair of plug-in wall sconces — dark metal swing arms, cream linen drum shades — that flank a framed print or a bed without an electrician. Just mount and plug in. The renter-friendly upgrade that makes a wall feel finished.

#lighting #renterfriendly #entrywaydecor #japandi #wallsconce #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B09BB5MX6B?tag=calmandoak-20`

Board: Lighting
Affiliate toggle: ON

---

### 2026-05-22 — Pin 46 (Outdoors, Template B, browser-verified)

**OLD:** Battery LED paper lanterns (search-URL placeholder, no verified ASIN) — lighting product in the Outdoors pillar slot. User asked for a genuine standout outdoor piece.
**NEW:** Christopher Knight Home Teague Outdoor Acacia Wood Dining Chairs, Set of 2, teak finish (`B07DQDMVJ6`)

**Why changed:** Pin 46's slot is the Outdoors pillar (8 AM); the placeholder was just paper lanterns. Pivoted to a real outdoor hero piece. Browser-verified the whole shortlist live — bistro sets (Tangkula 34 reviews + no Canada shipping; HAPPYGRILL 4 reviews; Sunnydaze 37 reviews + no Canada shipping) all failed. Christopher Knight Teague was the only one clearing every bar, and it's an established brand we already trust (their Evelyn chair anchors Furniture).

**Verified live (Claude-in-Chrome):** 4.4★ / 217 reviews / $145.79 / In Stock (ships to Canada) / NO "Frequently returned" badge / Amazon's Choice.

**Image:** Template B, generated 2026-05-22 image-to-image from `03-pin-templates/template-B-lifestyle-overlay-example.png` + Google grounding on the actual Amazon photo (viewed via browser first). Headline "MORNINGS / MOVE OUTSIDE", warm golden-hour patio scene with the pair of slatted acacia armchairs, headline placed over a shadowed plaster area for cream-text legibility.
- Pin: `04-sample-pins/day10-pin46-acacia-patio-chairs.jpg`
- Crop: `assets/img/products-cropped/day10-pin46-acacia-patio-chairs.jpg` (848×910)

**Surfaces updated:**
- Pinterest pin destination URL: `https://www.amazon.com/dp/B07DQDMVJ6?tag=calmandoak-20`
- `shop/outdoor-wellness/index.html` position 11 (numberOfItems 10→11)
- Action plan Pin 46 entry (deferred — Word lock)

**Pinterest copy:**

Title: `Mornings move outside — acacia patio chairs`

Tagged topics: `japandi, outdoor living, patio decor, acacia furniture, slow living`

Description block:
```
MORNINGS MOVE OUTSIDE

A pair of teak-finish acacia wood chairs — slatted, armrests, weather-ready — that turn a porch corner into where the morning actually happens. Coffee, a dried stem in a stoneware vase, a folded throw. The set that makes outside the best room in the house.

#outdoorliving #patiodecor #acaciafurniture #japandi #slowliving #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B07DQDMVJ6?tag=calmandoak-20`

Board: Outdoor & Wellness
Affiliate toggle: ON

---

### 2026-05-22 — Pin 42 + Pin 44 (Template B, browser-verified)

First products **verified live via Claude-in-Chrome** (Amazon WebFetch was blocked all session; navigating the user's real browser bypasses bot detection and reads true rating / review count / "Frequently returned" badge).

**Pin 42 (Lighting) — Dining pendant**
- OLD: Hemp Rope Woven Pendant (`B0BY5CVQS6`) — the existing Pin 42 link; user wanted a fresh, better fixture
- NEW: Hchunqjor Woven Bamboo Dome Pendant, 17.8" (`B0C4XTSZYX`) — large natural bamboo open-lattice dome, single, dining-scale
- Verified live: 4.4★ / 203 reviews / $85.98 / In Stock / NO returns flag
- Pin: `04-sample-pins/day9-pin42-bamboo-dome-pendant.jpg` (Template B, headline "THE TABLE, AT DUSK")
- Crop: `assets/img/products-cropped/day9-pin42-bamboo-dome-pendant.jpg` (848×910)
- Shop: `shop/lighting/index.html` position 11 (numberOfItems 10→11)

**Pin 44 (Bedroom) — Bedside lamp pair**
- OLD: PoKat small ceramic lamps (`B0F8BB3KV2`, action-plan link) — pin showed brass, product was ceramic = mismatch
- REJECTED: Oneach brass lamp set of 2 (`B07XNLWZ6R`) — 4.4★/2,908 reviews BUT carries the "Frequently returned item" badge → hard fail (returns reverse commissions). Caught via live browser check.
- NEW: Qingmiao Gold-Column Table Lamps, Set of 2 (`B093GRTYD9`) — brushed-gold column + cream linen drum shades, matched pair
- Verified live: 4.6★ / 913 reviews / $59.99 / In Stock / NO returns flag / Amazon's Choice
- Pin: `04-sample-pins/day9-pin44-gold-lamp-pair.jpg` (Template B, headline "BOTH SIDES OF THE BED")
- Crop: `assets/img/products-cropped/day9-pin44-gold-lamp-pair.jpg` (848×910)
- Shop: `shop/bedroom/index.html` position 11 (numberOfItems 10→11). Note: PoKat B0C4SZBN64 left in place (it anchors the Pin 24 Look + Pin 10) — the gold pair is an additional bedside option, not a replacement of that entry.

**Both pins:** Template B (image-to-image from `03-pin-templates/template-B-lifestyle-overlay-example.png` + Google-grounded on the real Amazon photo, which I viewed via the browser first). First-time-right renders.

**Pinterest copy — Pin 42:**
Title: `The table, at dusk — woven bamboo dome pendant`
Tagged topics: `japandi, dining room, pendant light, bamboo decor, warm light`
```
THE TABLE, AT DUSK

A large woven bamboo dome pendant — open diamond lattice that scatters warm light into dappled shadow across the table below. 17.8 inches of handwoven bamboo over a long oak table. The fixture that turns dinner into a slow hour.

#diningroom #pendantlight #japandi #bamboodecor #lighting #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```
Destination: `https://www.amazon.com/dp/B0C4XTSZYX?tag=calmandoak-20` · Board: Lighting

**Pinterest copy — Pin 44:**
Title: `Both sides of the bed — the gold lamp pair`
Tagged topics: `japandi, bedroom decor, bedside lamp, brass decor, cozy bedroom`
```
BOTH SIDES OF THE BED

A matched pair of brushed-gold column lamps with cream linen drum shades — one for each nightstand, throwing soft symmetrical halos up the wall. The matching pair is what makes a bedroom read intentional instead of assembled. Dimmable, warm light.

#bedroomdecor #bedsidelamp #lighting #brassdecor #japandi #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```
Destination: `https://www.amazon.com/dp/B093GRTYD9?tag=calmandoak-20` · Board: Bedroom

---

### 2026-05-21 — Pin 39 (Storage)

**OLD:** Search URL placeholder "low woven basket pair rectangular seagrass" (no fixed ASIN). Original pin showed ONE tall round woven basket beside a coffee table, not a pair — copy and product description mismatched the pin.
**NEW:** Tall woven storage basket (`B0DHG6PMNM`) — single tall round natural-fiber basket with woven handles, holds blankets/magazines, sized for beside-the-sofa storage.

**Why changed:** No verified ASIN existed. User picked B0DHG6PMNM directly. Verified clean: ASIN and product type not duplicated anywhere else on the site. Rewrote copy to match what the pin/product actually is — ONE basket beside a coffee table, not "a pair of low under-table baskets" as the original action-plan draft incorrectly stated.

**Image:** ⏸ NO regeneration — keeping the existing Pin 39 image (`04-sample-pins/day8-pin39-coffee-table-basket.png`) which already shows a single tall woven basket beside an oak coffee table and cream linen sofa. Cropped for shop card to `assets/img/products-cropped/day8-pin39-coffee-table-basket.jpg` (848×885, standard Template A crop — top 18% header band + bottom 12% footer band removed).

**Note:** This is the LAST Template A pin we'll ship to Pinterest. All future pins from here on are Template B per locked-in 2026-05-21 directive. Pin 39 stays as Template A only because the existing image is fine and the user explicitly opted out of regeneration.

**Surfaces updated:**
- Pinterest pin destination URL: `https://www.amazon.com/dp/B0DHG6PMNM?tag=calmandoak-20`
- `shop/storage/index.html` (added as position 9 in JSON-LD; numberOfItems bumped 8→9; new visible card)
- Action plan Pin 39 entry (deferred — file locked by Word; will sync next opportunity)

**Pinterest copy for new pin:**

Title: `The basket that hides the chaos — beside the sofa`

Tagged topics: `japandi, home organization, storage ideas, neutral home, living room decor`

Description block:
```
THE BASKET THAT HIDES THE CHAOS

One tall woven basket beside the coffee table — it holds the throw, the spare blanket, the magazine you haven't finished. The room reads composed instead of cluttered. Natural fiber, woven handles, blends into any Japandi-leaning living room.

#storage #organization #livingroomdecor #neutralhome #homedecor #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B0DHG6PMNM?tag=calmandoak-20`

Board: Storage
Affiliate toggle: ON

---

### 2026-05-21 — Pin 38 (Lighting) — FIRST TEMPLATE B PIN

**OLD:** Search URL placeholder "wood + paper pendant light fixture complete cord" (no fixed ASIN). Original pin showed an AI-imagined wood-rib UFO/saucer paper pendant — beautiful but had no real Amazon equivalent. Previous candidates (Brightech Parker, Wpplk, Dezaart, Hgrtaegs) all unavailable.
**NEW:** Yolsunes White Wicker Dome Pendant Lights, Set of Two (`B0C5R7HFRW`) — pair of white-painted open-weave rattan basket pendants, ~12" diameter × 7" tall, E26 base, white cord + canopy

**Why changed:** No verified ASIN existed before. After 3 rounds of out-of-stock candidates, user picked Yolsunes — set-of-two boho-coastal-Japandi wicker domes. Strong affiliate proposition (pair = higher value). Brand new product type in the lineup (no other rattan-basket pendants exist — verified clean against all existing ASINs and brand names).

**Image:** ⭐ FIRST TEMPLATE B PIN. Generated 2026-05-21 via Gemini Google-grounded + image-to-image from `03-pin-templates/template-B-lifestyle-overlay-example.png`. Headline copy: "THE WEAVE / CATCHES / THE LIGHT" — poetic, scene-setting, not transactional. Render captured every Template B element: full-bleed dark plaster background, headline top-left in cream Cormorant, terracotta line below, italic "Calm & Oak" bottom-right (no subtitle), moody single-light-source modeling, pair of pendants throwing warm woven shadows over oak dining table.
- Pin (full template B): `04-sample-pins/day8-pin38-yolsunes-wicker-pair.jpg`
- Cropped (product-only, for website): `assets/img/products-cropped/day8-pin38-yolsunes-wicker-pair.jpg` (848×797, Template B-aware crop removes the top 32% headline area + bottom 5% wordmark area, keeps the middle clean photo)

**Surfaces updated:**
- Pinterest pin destination URL: `https://www.amazon.com/dp/B0C5R7HFRW?tag=calmandoak-20`
- `shop/lighting/index.html` (added as position 10 in JSON-LD; numberOfItems bumped 9→10; new visible card)
- Action plan Pin 38 entry (deferred — file locked by Word; will sync next opportunity)

**Pinterest copy for new pin:**

Title: `The weave catches the light — woven wicker pendant pair`

Tagged topics: `japandi, pendant light, dining room, woven decor, kitchen island`

Description block:
```
THE WEAVE CATCHES THE LIGHT

A pair of white-painted woven wicker dome pendants — open-basket weave that throws intricate warm-shadow patterns across the oak table below. Hangs in a pair over a dining table or kitchen island. E26 base, warm 2700K bulb. The single fixture pair that quietly defines an evening room.

#pendantlight #lighting #diningroom #japandi #wovenshade #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B0C5R7HFRW?tag=calmandoak-20`

Board: Lighting
Affiliate toggle: ON

---

### 2026-05-21 — Pin 37 (Lighting / Decor Accents)

**OLD:** CO-Z 69" Modern Arc Floor Lamp Gold (`B0D86JWHLC`) — a metal gold arc lamp with hanging shade. Original pin image showed a sculptural curved paper floor lamp with pinched waist and tripod legs — total mismatch (different category of product entirely). The CO-Z was never actually wired into a shop page since it didn't match the pin.
**NEW:** Nogy Noguchi Akari-style Rice Paper Floor Lamp (`B0DD8CZ28Q`) — squat pumpkin-shaped rice paper lantern shade with signature terracotta accent band at the top, oak wood ring, thin black metal tripod with an integrated small oak shelf

**Why changed:** Original pin's sculptural curved silhouette had no exact Amazon equivalent (most paper floor lamps are classic round Akari, not freeform sculptural). User confirmed Brightech Parker was out of stock. Surfaced 3 better candidates; user picked Nogy as the best Japandi-on-brand match (wood + paper + metal tripod combination explicitly designed for Japandi rooms).

**Image:** new pin generated 2026-05-21 via Gemini Google-grounded, FIRST-TIME-ACCURATE after viewing the actual Amazon product photo (locked-in workflow). Every signature detail rendered correctly: single round pumpkin paper shade with fine horizontal ribbing, terracotta band at top, oak wood ring below, thin black metal tripod with integrated round oak shelf, warm 2700K glow.
- Pin (full template): `04-sample-pins/day8-pin37-nogy-pumpkin-lantern.jpg`
- Cropped (product-only, for website): `assets/img/products-cropped/day8-pin37-nogy-pumpkin-lantern.jpg`

**Surfaces updated:**
- Pinterest pin destination URL: `https://www.amazon.com/dp/B0DD8CZ28Q?tag=calmandoak-20`
- `shop/lighting/index.html` (added as position 9 in JSON-LD, new visible card; numberOfItems bumped 8→9)
- Action plan Pin 37 entry (deferred — file locked by Word; will sync next opportunity)

**Pinterest copy for new pin:**

Title: `Floor lamps that double as art — Akari paper lantern`

Tagged topics: `japandi, lighting, akari, paper lantern, floor lamp`

Description block:
```
FLOOR LAMPS THAT DOUBLE AS ART

An Akari-style rice paper floor lamp — squat pumpkin shade in handcrafted rice paper, terracotta band at the top, oak wood ring, thin black metal tripod with a small integrated shelf for a mug. The Noguchi tradition, made for a quiet Japandi living room corner. Warm 2700K glow.

#floorlamp #akari #japandi #lighting #noguchi #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B0DD8CZ28Q?tag=calmandoak-20`

Board: Lighting
Affiliate toggle: ON

---

### 2026-05-14 — Pin 34 (Furniture)

**OLD:** Search-URL placeholder for "round solid oak side table, small" (no fixed ASIN). Original pin was a magazine shot of a hollow drum/staved oak pedestal table with the headline "SIDE TABLES UNDER $100."
**NEW:** THKSHOUZ Fluted Pedestal Side Table, 16.93" D × 22.44" H, warm honey-oak finish (`B0DRHQ1FKP`)

**Why changed:** No verified ASIN existed before. User found B0DRHQ1FKP — a deeply-fluted vertical-rib cylindrical pedestal table in warm honey-oak tone. Two issues with the old pin: (1) the original headline "SIDE TABLES UNDER $100" was inaccurate (this product is over $100), and (2) the original copy claimed "solid oak... not veneer, not particle-board" but the THKSHOUZ family is MDF wrapped in rubberwood slats — that copy would have been a misleading FTC-violating affiliate claim.

**Image:** new pin generated 2026-05-14 via Gemini Google-grounded, FIRST-TIME-ACCURATE after viewing the actual Amazon product photo (locked-in workflow):
- Pin (full template): `04-sample-pins/day7-pin34-fluted-oak-pedestal.jpg`
- Cropped (product-only, for website): `assets/img/products-cropped/day7-pin34-fluted-oak-pedestal.jpg`

**Surfaces updated:**
- Pinterest pin destination URL: `https://www.amazon.com/dp/B0DRHQ1FKP?tag=calmandoak-20`
- `shop/furniture/index.html` (position 6 in JSON-LD, the visible card) — replaced placeholder name + search URL + old pin image with the verified THKSHOUZ product
- Action plan Pin 34 entry (deferred — file locked by Word; will sync next opportunity)

**Pinterest copy for new pin:**

Title: `Beside the sofa — fluted oak pedestal side table`

Tagged topics: `side table, japandi furniture, living room decor, fluted furniture, oak side table`

Description block:
```
BESIDE THE SOFA

A fluted pedestal side table in warm honey oak — 17 inches across, 22 tall — the right scale for a mug, an open book, and one small ceramic. The piece that quietly turns a corner of the room into the place you actually sit.

#sidetable #livingroomdecor #homedecor #japandi #flutedfurniture #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B0DRHQ1FKP?tag=calmandoak-20`

Board: Furniture (or Living Room)
Affiliate toggle: ON

**Note:** Headline pivoted from category-listicle ("SIDE TABLES UNDER $100") to scene-based ("BESIDE THE SOFA") because the price claim was no longer accurate. Copy carefully avoids "solid oak" / "solid wood, not veneer" claims since the product is MDF + rubberwood slats with an oak-tone finish. Honest framing: "warm honey oak" describes the visual finish accurately without making material claims.

---

### 2026-05-14 — Pin 32 (Japandi Kitchen)

**OLD:** Utoplike Bamboo Drawer Dividers, 4-pack (`B07HQMZ7HH`) — exact duplicate of Pin 16. Action plan even flagged it: "same product as Pin 16, different angle/copy."
**NEW:** Smirly Acacia Silverware Drawer Organizer, expandable 13"→20", 8 compartments (`B0GFDJCQZ6`)

**Why changed:** User flagged Pin 32 as a duplicate. The Smirly acacia organizer keeps the original Pin 32 narrative ("the drawer that finally has a system") but pivots from bamboo dividers to a full acacia cutlery tray — different product, same systems-mood. Apartment Therapy darling, 4.7★ avg / 7,600+ reviews across variants.

**Image:** ⚠️ DEFERRED — pin image not yet regenerated. The kitchen shop card uses the OLD bamboo-dividers image (`day4-pin16-bamboo-drawer-dividers.jpg`) as a temporary placeholder until Pin 32 is regenerated with the actual Smirly acacia geometry. When regenerating: view the actual Amazon product photo first (locked-in workflow), then prompt with precise geometry — full-drawer expandable rectangular tray, eight grooved compartments, warm acacia natural grain, expandable side panels visible at the edges.

**Surfaces updated:**
- Pinterest pin destination URL: `https://www.amazon.com/dp/B0GFDJCQZ6?tag=calmandoak-20`
- `shop/japandi-kitchen/index.html` (added as position 11 in JSON-LD, new visible card; numberOfItems bumped 10→11)
- Action plan Pin 32 entry (deferred — file locked by Word; will sync next opportunity)

**Pinterest copy for new pin:**

Title: `The drawer that finally has a system — acacia cutlery tray`

Tagged topics: `japandi kitchen, kitchen organization, drawer organizer, minimalist kitchen, kitchen decor`

Description block:
```
THE DRAWER THAT FINALLY HAS A SYSTEM

An acacia wood cutlery tray that expands from 13 to 20 inches — eight deep compartments, warm natural grain, the small purchase that turns the messiest drawer into something quietly beautiful. Fits most kitchen drawers without measuring twice.

#kitchenorganization #organization #kitchendecor #drawerorganizer #organizedhome #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B0GFDJCQZ6?tag=calmandoak-20`

Board: Japandi Kitchen
Affiliate toggle: ON

**Follow-up needed:** Regenerate Pin 32 image when ready, then swap the placeholder image filename in `shop/japandi-kitchen/index.html` position 11.

---

### 2026-05-14 — Pin 24 + new Looks section (site architecture)

**What changed:** Built a new top-level shop section called "Looks." Each Look = one Pinterest pin → one dedicated landing page that shows the pin's hero image + every product visible in it (numbered 1-N to match the pin's overlays). Replaces the old pattern of routing "Get the Look" pins to broad category pages.

**Why:** Routing Pin 24 to `/shop/bedroom/` showed visitors all 10 bedroom products — diluting the focused 5-piece message of the pin. Look pages show only the pin's exact pieces, in order, increasing per-product CTR. Each Look also becomes its own SEO URL — compounding long-tail discoverability.

**Files created:**
- `shop/looks/index.html` — Looks index grid (will list every Look as a card)
- `shop/looks/quiet-japandi-bedroom/index.html` — first Look detail page (Pin 24)
- `assets/img/looks/quiet-japandi-bedroom-pin.jpg` — full pin hero (1200×1789, 294KB)
- `assets/img/looks/quiet-japandi-bedroom-card.jpg` — cropped card image for the index grid (848×885, 151KB)

**Files updated:**
- 10 shop category pages (`bedroom`, `ceramics-tableware`, `decor-accents`, `furniture`, `japandi-kitchen`, `lighting`, `office`, `outdoor-wellness`, `storage`, `textiles`) — added `Looks` link to the shop-nav category bar AND to the footer Shop list. `dining` and `living-room` skipped (different page structure, not in main nav).
- `shop/bedroom/index.html` — reordered positions 1-5 in JSON-LD + visible cards to mirror Pin 24's numbered products (jute rug, ceramic lamp pair, cable-knit throw, dried pampas, oak platform bed)

**Pin 24 destination URL changes:**
- OLD: `https://calmandoak.com/shop/bedroom/`
- NEW: `https://calmandoak.com/shop/looks/quiet-japandi-bedroom/?utm_source=pinterest&utm_medium=pin&utm_campaign=pin-24-getthelook`

**Template established for future Get-the-Look pins:**
Pin 185, future Pins → clone `shop/looks/quiet-japandi-bedroom/index.html`, swap the hero image + the product list, add a card to `shop/looks/index.html`. No new design needed.

---

### 2026-05-14 — Pin 23 (Lighting)

**OLD:** TOBUSA Architect Desk Clamp Lamp (`B08XZFWTS1`) — never made it to live site, was just sitting in playbook reference. Original pin showed an industrial brass swing-arm floor lamp with bare Edison bulb (also never had a real Amazon match).
**NEW:** Plug-in Linen Wall Sconces, Set of Two — tall half-drum cylinder shades, flush wall mount (`B0DNZ6Q7CD`)

**Why changed:** Original Pin 23 image showed an industrial brass swing-arm floor lamp with bare Edison bulb. The bare-bulb industrial silhouette is hard to source on Amazon with verified ratings (most are Etsy/handmade). User picked a totally different, more on-brand product — clean linen plug-in wall sconces — which is also a more authentic Japandi reading-light solution (set-of-two flanking a headboard or armchair). Pin regenerated to match new product.

**Image:** new pin generated 2026-05-14 via Gemini Google-grounded, FIRST-TIME-ACCURATE after viewing the actual Amazon product photo (locked-in workflow):
- Pin (full template): `04-sample-pins/day5-pin23-linen-bedside-sconces.jpg`
- Cropped (product-only, for website): `assets/img/products-cropped/day5-pin23-linen-bedside-sconces.jpg`

**Surfaces updated:**
- Pinterest pin destination URL: `https://www.amazon.com/dp/B0DNZ6Q7CD?tag=calmandoak-20`
- `shop/lighting/index.html` (position 8 in JSON-LD, the visible card) — replaced placeholder ENCOMLI sconce ASIN (`B09NVN4R6F`) and Pin 207's borrowed image with the verified Pin 23 product
- Action plan Pin 23 entry (deferred — file locked by Word; will sync next opportunity)

**Pinterest copy for new pin:**

Title: `Read by linen light — plug-in bedside sconces, set of two`

Tagged topics: `wall sconce, bedroom lighting, japandi lighting, plug in sconces, reading nook`

Description block:
```
READ BY LINEN LIGHT

A pair of tall half-drum linen wall sconces — flush-mounted, plug-in (no electrician needed), with a warm bilateral glow that washes both up and down the wall. The pair that flanks a headboard or a reading chair and quietly does what overhead lights never can. Stepless 2700K-6500K, 5.2 ft cord, on/off switch in the cord.

#wallsconce #bedroomdecor #japandi #readingnook #pluginlight #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B0DNZ6Q7CD?tag=calmandoak-20`

Board: Lighting (or Bedroom)
Affiliate toggle: ON

---

### 2026-05-14 — Pin 18 (Lighting)

**OLD:** Henjjras 19" round paper lamp shade (`B0C5QMXBXZ`) — flat shade-only, didn't match pin's bamboo-cage teardrop silhouette
**NEW:** Booniture 15" Bamboo Pumpkin Pendant Light, natural, 71" cord, fabric inner shade (`B0FXVM8YJ1`)

**Why changed:** Original Henjjras product was a paper SHADE only (no cord, no socket, no bamboo cage). Original pin showed a complete bamboo/wood-ribbed teardrop pendant with paper inner glow — total mismatch. Booniture pumpkin pendant matches the silhouette exactly: bamboo outer cage + diffused linen inner shade + complete fixture (cord + E26 socket).

**Image:** new pin generated 2026-05-14 via Gemini Google-grounded, saved at:
- Pin (full template): `04-sample-pins/day4-pin18-booniture-bamboo-pendant.jpg`
- Cropped (product-only, for website): `assets/img/products-cropped/day4-pin18-booniture-bamboo-pendant.jpg`

**Surfaces updated:**
- Pinterest pin destination URL
- `shop/lighting/index.html` (position 1 in JSON-LD, the visible card) — replaced Henjjras references
- `assets/css/styles.css` — object-position rule renamed to new filename
- `assets/starter-guide/japandi-starter-guide.html` — materials montage tile + shop-list line item
- Action plan Pin 18 entry (deferred — file locked by Word; will sync next opportunity)
- ⚠️ Pins 38 and 174 also reference the same lighting pillar — flagged for separate audit (they were due to reuse Pin 18's swap)

**Pinterest copy for new pin:**

Title: `Skip overhead lights forever — bamboo pumpkin pendant`

Tagged topics: `pendant light, dining room lighting, japandi lighting, bamboo pendant, warm light`

Description block:
```
SKIP OVERHEAD LIGHTS FOREVER

A 15" bamboo pumpkin pendant — handwoven natural bamboo cage with a soft linen inner shade — that throws warm 2700K golden light across a dining table. Adjustable 71" cord, E26 socket, complete fixture. The single fixture that quietly defines a room.

#pendantlight #lighting #bamboopendant #diningroom #japandi #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B0FXVM8YJ1?tag=calmandoak-20`

Board: Lighting
Affiliate toggle: ON

---

### 2026-05-13 — Pin 13 (Ceramics & Tableware)

**OLD:** Dobbyby Rustic Pottery Vase, 7.6", whitewashed (`B0F9SVL9X4`)
**NEW:** Briful Brown Ceramic Vase, 9.8" tall, horizontal textured (`B0FT361HDX`)

**Why changed:** Original pin image showed a tall DARK BROWN ribbed vase. The Dobbyby product is whitewashed/cream — colour mismatch. User rejected GeLive (`B0DLJRCNPN`) as backup; approved Briful (`B0FT361HDX`) after reviewing options.

**Image:** new pin generated 2026-05-13 via Gemini Google-grounded, saved at:
- Pin (full template): `04-sample-pins/day3-pin13-briful-brown-vase.jpg`
- Cropped (product-only, for website): `assets/img/products-cropped/day3-pin13-briful-brown-vase.jpg`

**Surfaces updated:**
- Pinterest pin destination URL
- `shop/ceramics-tableware/index.html` (position 2 in JSON-LD, the visible card) — meta og:image, twitter:image, product image
- `shop/decor-accents/index.html` (position 5 in JSON-LD, the visible card)
- Action plan Pin 13 entry (deferred — file locked by Word; will sync next opportunity)

**Pinterest copy for new pin:**

Title: `The vase everyone asks about — tall brown ribbed ceramic`

Tagged topics: `wabi sabi, ceramic vase, modern organic, japandi, home decor`

Description block:
```
THE VASE EVERYONE ASKS ABOUT

A tall narrow ceramic vase in warm earthy brown — 9.8 inches, subtle horizontal ribbing, narrow opening, glazed but matte. The vessel that turns a single dried oak branch into the moment a room is built around. Pair with eucalyptus, pampas, or whatever's drying on the windowsill.

#ceramics #pottery #homedecor #wabisabi #ceramicvase #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B0FT361HDX?tag=calmandoak-20`

Board: Ceramics & Tableware
Affiliate toggle: ON

---

### 2026-05-13 — Pin 12 (Storage)

**OLD:** Search URL fallback, originally VASAGLE 2-Drawer Storage Cabinet (`B0C9Q4NQ3W` — flagged "frequently returned" by Amazon)
**NEW:** SONGMICS 4-Tier Bamboo Bathroom Shelf, model UBCB54Y (`B00XBOJ0AI`)

**Why changed:** Original VASAGLE cabinet was Amazon-flagged "frequently returned" which reverses affiliate commissions on returns. The search URL fallback (`narrow+bathroom+floor+cabinet+rattan+drawer`) didn't surface products matching the pin image. SONGMICS bamboo shelf chosen for: (a) brand consistency with Pin 2 SONGMICS hangers, (b) clean geometry that Gemini can render accurately, (c) storage-category product not yet used on the action plan.

**Image:** new pin generated 2026-05-13 via Gemini Google-grounded, saved at:
- Pin (full template): `04-sample-pins/day3-pin12-bamboo-bath-shelf.jpg`
- Cropped (product-only, for website): `assets/img/products-cropped/day3-pin12-bamboo-bath-shelf.jpg`

**Surfaces updated:**
- Pinterest pin destination URL
- `shop/storage/index.html` (position 4 in JSON-LD, the visible card) — replaced previous "Wooden storage bench with cushion" search-URL placeholder
- Action plan Pin 12 entry (deferred — file locked; will sync next opportunity)

**Pinterest copy for new pin:**

Title: `Narrow bathroom, full storage — SONGMICS bamboo shelf`

Tagged topics: `japandi, bathroom storage, bamboo shelf, narrow bathroom, small bathroom`

Description block:
```
NARROW BATHROOM, FULL STORAGE

A 4-tier bamboo bathroom shelf — 39 inches tall, only 13 inches wide and 13 deep — that holds folded waffle towels, a small basket of hand towels, a ceramic jar with a stem of eucalyptus, and the candle that turns the room into a small spa. Open slatted shelving keeps the eye light. Slim profile fits the tightest bathroom corner.

#bathroomdecor #bathroomstorage #bambooshelf #japandi #narrowbathroom #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```

Destination link: `https://www.amazon.com/dp/B00XBOJ0AI?tag=calmandoak-20`

Board: Storage
Affiliate toggle: ON

---

## Pending pin audits (Pins 14-210)

Pins 1-13 reviewed. Continuing audit at Pin 14 onwards. Status board:

| Pin range | Status |
|---|---|
| Pins 1-11 | Already scheduled by user; not re-audited (assumed locked) |
| Pin 12 | ✅ Fixed (this log, 2026-05-13) |
| Pin 13 | ✅ Fixed (this log, 2026-05-13) |
| Pin 14 (Longhui throw, `B08F48LR45`) | ✅ Match confirmed — no change |
| Pin 15 (oak desk) | 🟡 Pending — Walker Edison third-party issue; needs product-first replacement |
| Pin 16 (bamboo dividers, `B07HQMZ7HH`) | ✅ Match confirmed — no change |
| Pin 17 (seagrass basket pair, `B0CM3YJXZ9`) | 🟡 Pending — verify variant on Amazon |
| Pin 18 (Booniture bamboo pendant, `B0FXVM8YJ1`) | ✅ Fixed (this log, 2026-05-14) |
| Pin 19 (acacia tray, `B086372L8W`) | 🟡 Pending — pin has handle-less tray, product has handles |
| Pin 20 (Christopher Knight chair, `B07F266PMS`) | 🟡 Pending — verify product photo |
| Pin 23 (Plug-in linen wall sconces, `B0DNZ6Q7CD`) | ✅ Fixed (this log, 2026-05-14) |
| Pins 21-22, 24-210 | Not yet audited |

When each pin is fixed, append an entry above (most recent at top) and update its row to ✅ in this status board.
