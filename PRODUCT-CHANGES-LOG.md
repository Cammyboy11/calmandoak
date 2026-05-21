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
