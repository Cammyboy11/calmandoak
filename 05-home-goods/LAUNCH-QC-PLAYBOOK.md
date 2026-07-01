# Home Collection — Launch & QC Playbook

*How the pattern line goes from files to a live, sellable shop. Mirrors exactly how your prints already sell.*

---

## The selling model (same as your prints)

Your site is the **branded catalogue**; checkout and fulfilment happen on third parties:

```
calmandoak.com product page  →  buy link  →  Etsy listing / Spoonflower shop  →  POD partner prints & ships
```

- **Prints today:** print page → Payhip (digital) + Etsy (physical, fulfilled by Gelato).
- **Home goods:** product page → Etsy listing (cushions, tea towels, runners, blankets — fulfilled by Gelato/Printful) + Spoonflower shop (wallpaper, murals, fabric-by-the-yard).

You never hold inventory. You own the brand, the traffic, and the margin above POD base cost.

---

## The catalogue

`CATALOG.csv` is the single source of truth — **35 launch SKUs** (Hero 8 patterns × 7 product types):

| Product | Platform | Base | Retail | Margin |
|---|---|---|---|---|
| Cushion cover 18" | Gelato | $20 | $44 | $24 |
| Tea towel | Gelato | $11 | $24 | $13 |
| Table runner 14×72" | Printful | $22 | $42 | $20 |
| Throw blanket 50×60" | Printful | $55 | $109 | $54 |
| Fabric by the yard | Spoonflower | $18 | $27 | $9* |
| Wallpaper (peel & stick 2×4ft) | Spoonflower | $40 | $64 | $24* |
| Mural (custom) | Spoonflower | ~$120 | from $189 | ~$69* |

\*Spoonflower marketplace: you set a **markup %** (0–100), Spoonflower handles the rest. Prices above are estimates — **verify current POD base costs before publishing**, they shift.

**Pricing logic:** ~2.2× base on soft goods (standard POD retail), premium positioning on the statement pieces (mural, blanket). Round to `.00`. Revisit after the first 30 days of sales data.

---

## Print-ready file specs (per platform)

Your patterns are procedural, so I can export any size on demand. Targets:

- **Spoonflower (fabric / wallpaper):** seamless tile, **150 DPI**, RGB PNG. Standard test repeat 21"×18"; I'll export at the exact repeat you choose (a 24"×24" @150 = 3600×3600 covers most). Upload once → Spoonflower tiles it across all their fabrics + wallpapers.
- **Spoonflower mural:** single non-repeating image sized to the wall (e.g. 6ft×8ft @150). Hills, Limewash, Shibori are the mural-ready designs.
- **Gelato / Printful (cushions, towels, runners, blankets):** each product has its own template + safe area. Export the pattern tiled to the product's print area at **300 DPI** with bleed. I generate one per SKU from the master.

Current exports live in `05-home-goods/print-ready/` (Hero 8). Tell me the products you're launching and I'll cut the exact per-SKU files.

---

## Sample-order QC protocol (non-negotiable — "if our name's on it, we deliver")

Before **any** SKU goes live, order one physical sample and score it:

- [ ] **Colour** matches the on-screen colourway (POD colour drift is real — adjust the file if off).
- [ ] **Scale** of the repeat reads right on the actual product (not too big/small).
- [ ] **Seam / alignment** on wallpaper and fabric tiles seamlessly, no visible join.
- [ ] **Material feel** is worthy of the price (hand-feel, weight, finish).
- [ ] **Print sharpness** — no banding, no blur, edges clean.
- [ ] **Overall**: would you put this in your own home? If not, it doesn't ship.

Only after a sample passes does that SKU move to `status = live` in `CATALOG.csv`.

---

## Step-by-step: uploading to your accounts (you do this — your logins)

### A. Spoonflower (wallpaper, murals, fabric)
1. Create/sign in to a Spoonflower **Seller** account.
2. Upload each seamless tile (`*-print.png`), set the **repeat type** (Basic/Half-drop) and **repeat size**.
3. Enable the design for **fabric, wallpaper, and home-good** products; set your markup %.
4. Order a proof of the fabric + the peel-and-stick wallpaper (QC protocol above).
5. Publish. Copy each product URL into `CATALOG.csv → listing_url`.

### B. Gelato (cushions, tea towels) — you already use this
1. In Gelato, create products from the per-SKU print files (same flow as your `_gelato-listings` prints).
2. Connect Gelato → **Etsy** (or Gelato's storefront) so orders auto-fulfil.
3. Order samples → approve → publish → copy listing URLs into the catalogue.

### C. Printful (blankets, runners) — optional new account
1. Create products from the print files; connect Printful → Etsy.
2. Sample → approve → publish → copy URLs.

### D. Etsy listings (the physical checkout)
Use the listing copy template below. Titles ≤140 chars, 13 tags, first photo = the mockup (swap to sample photos once you have them).

---

## Listing copy — template + examples

**Template**
- **Title:** `[Pattern] Japandi [Product] — [1–3 keywords] | Calm & Oak`
- **Tags (13):** japandi, wabi sabi, [pattern], minimalist [product], neutral [product], oak, warm minimalist, scandinavian, boho neutral, [colour], organic modern, calm home, [room]
- **Description:** 1 line hook · what it is + material · the pattern's story (1–2 sentences) · care · brand line + disclosure of made-to-order.

**Example 1 — Seigaiha cushion (SKU CO-SEI-CSH)**
> **Title:** Seigaiha Wave Cushion Cover — Japandi Neutral Throw Pillow | Calm & Oak
> **Description:** A quiet wave for a calm room. An 18" cushion cover printed to order with our original Seigaiha (wave-scale) pattern — charcoal on warm off-white, on a natural-feel woven fabric. Seigaiha is the oldest calm in Japanese design: overlapping arcs, like still water. Zip closure, cover only. Made to order, so nothing is wasted. — Calm & Oak

**Example 2 — Layered Hills mural (SKU CO-HIL-MUR)**
> **Title:** Layered Hills Japandi Mural Wallpaper — Abstract Landscape, Custom Size | Calm & Oak
> **Description:** An abstract hillside that makes a wall exhale. A custom-size mural of our original Layered Hills design — sage, oat, clay and charcoal receding into calm. Removable and traditional options; matte, low-sheen finish. Sized to your wall. Made to order. — Calm & Oak

Tell me to generate the full set and I'll write all 35.

---

## Go-live checklist

1. [ ] POD base costs verified; prices finalised in `CATALOG.csv`.
2. [ ] Print files exported per SKU and uploaded to the right platform.
3. [ ] **Samples ordered and passed QC** for every SKU going live.
4. [ ] Listings published; each `listing_url` filled in `CATALOG.csv`; `status = live`.
5. [ ] On-site: flip each product card's `href="#waitlist"` → its `listing_url`, and change the CTA from "Coming soon →" to "Shop on Etsy →" (or "Shop on Spoonflower →").
6. [ ] Add **Wallpaper** and **Home Textiles** to the main nav + `sitemap.xml` (I do this).
7. [ ] `git push` to deploy. Request indexing for the two new pages.
8. [ ] Pinterest: pin the mockups (and sample photos) to a new "Calm & Oak Home Collection" board.
9. [ ] Email: announce to the waitlist via MailerLite.

---

## Ongoing

- Roll out the remaining 12 patterns as **seasonal drops** (fresh Pinterest + email moments).
- Swap procedural mockups → **Gemini photoreal** product/room shots once Chrome's download folder points at the repo.
- Review pricing + best-sellers at 30 and 90 days; cut what doesn't move, scale what does.
