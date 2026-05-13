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
| Pin 18 (rice paper pendant) | 🟡 Pending — needs Booniture or alternative |
| Pin 19 (acacia tray, `B086372L8W`) | 🟡 Pending — pin has handle-less tray, product has handles |
| Pin 20 (Christopher Knight chair, `B07F266PMS`) | 🟡 Pending — verify product photo |
| Pins 21-210 | Not yet audited |

When each pin is fixed, append an entry above (most recent at top) and update its row to ✅ in this status board.
