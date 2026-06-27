# PRINTABLE-BUNDLE-STORE.md — the "first dollar" one-time bundle store

**Status:** plan + paste-ready assets. No live listings created (account access = Cameron).
**Owner agent:** merchandiser. **Read alongside:** REVENUE-MODEL.md, SAFEGUARDS.md, CONTROL.md.
**Control check (2026-06-24):** CONTROL.md `PAUSE: false` — clear to plan/stage. No spend, no new accounts, no checkout-provider change proposed in the autonomous scope; everything that needs those is in ESCALATE TO CAMERON.

---

## Why this, why now (the thesis in one paragraph)

Two independent opportunity cohorts and the Portfolio CEO converged on the same finding (Brand Factory `data/lab/learnings.md` L2-1/L2-2/L2-3): the cheap Pinterest traffic Calm & Oak already owns is **freebie-seeker, low-recurring-intent** — it churns out of subscriptions but buys **one-time, impulse, high-AOV digital goods happily**. So we do not build a subscription. We monetise the existing traffic with **one-time $9–29 printable bundles** assembled almost entirely from assets that already exist on disk. Zero per-order labour, ~100% margin, no inventory, no link-rot (L0-7). This is a monetisation upgrade to the live engine, not a new bet.

**Hard guardrails honoured throughout:**
- Brand voice: warm, grounded, editorial. No hype, no exclamation marks, no "must-have" (CONTROL.md + L0-11).
- Existing infra only: the live **Etsy shop** (etsy.com/shop/CalmandOak) and **Payhip** (3 workbooks already there). No new platforms, no spend.
- Existing assets reused wherever possible; net-new generation kept to existing tooling and flagged explicitly.
- FTC disclosure carried on any bundle whose contents reference affiliate shopping lists (L0-9).

---

## 1. Asset audit — what already exists that can be bundled

All paths absolute. "Print-ready" = renders to a clean US-Letter PDF via the page's built-in Ctrl+P → Save-as-PDF flow (the same mechanic already shipped on the cheat-sheet lander).

### A. Finished digital documents (brand-perfect, print-ready today)
| Asset | File | What it is | Reuse |
|---|---|---|---|
| **Japandi Colour Palette Cheat-Sheet** | `C:\Users\CameronHayes\OneDrive - GPWMAD01\Desktop\Calm & Oak\assets\palette-cheat-sheet\japandi-palette-cheat-sheet.html` | 10-page US-Letter PDF: 5 signature palettes w/ exact hex, 3 rules, room-by-room matcher, 5 mistakes. On-brand (Cormorant + Inter, terracotta accent). | Anchor of Bundle 1; included in 3. Currently a free email magnet — see "free vs paid" note below. |
| **Japandi Starter Guide** | `C:\Users\CameronHayes\OneDrive - GPWMAD01\Desktop\Calm & Oak\assets\starter-guide\japandi-starter-guide.html` | 20-page US-Letter PDF: 5 principles, palette, materials, two-woods rule, three textile weights, the starter shopping list, a 7-day plan. | Spine of Bundle 3 (paid expanded edition). Free 20-page version stays the email magnet; paid bundle adds the worksheets below. |
| **Calm Home Calculator** (room-budget tool) | `C:\Users\CameronHayes\OneDrive - GPWMAD01\Desktop\Calm & Oak\calculator\index.html` | Interactive room-by-room budget planner (live page). | Source of the printable **budget worksheet** in Bundle 2 (static PDF version of the same fields). |
| **Palette Generator** | `C:\Users\CameronHayes\OneDrive - GPWMAD01\Desktop\Calm & Oak\palette\index.html` | Interactive palette tool (live page). | Cross-sell surface for Bundle 1; not bundled directly (it's a tool, not a printable). |

### B. Print artwork — 90 print-ready masters already reconstructed
| Asset | Location | Notes |
|---|---|---|
| **30 designs × 3 sizes = 90 flat 300-DPI masters** | `C:\Users\CameronHayes\Pictures\Calm-Oak-Print-Masters\<slug>_{8x10,11x14,16x20}_300dpi.jpg` | Six series: 9 sumi-e, 6 botanical line, 6 landscape, 3 calligraphy, 3 tonal, 3 still. Source of the **digital wall-art download** bundles (4 & 5). These are sized for *physical* Gelato print today; the digital-download bundles need a light re-export step (see §asset note). Detailed in `PRINTS-SETUP.md` §3/§7. |
| Per-design web pages (titles, blurbs, series copy) | `...\Calm & Oak\shop\prints\<slug>\index.html` (30 dirs) | Ready-made titles + descriptions to lift into listing copy. |

### C. Existing storefront + delivery rails (no build needed)
| Rail | State | Use |
|---|---|---|
| **Etsy shop** etsy.com/shop/CalmandOak | Live; 30 prints + shop copy staged (`_etsy-shop-copy.md`, `_etsy-launch-playbook.md`) | Etsy *digital-download* listings = our second delivery channel. Etsy already drives the right buyer. |
| **Payhip** | Live; 3 workbooks + `/shop/workbooks` pages staged (per AUTOMATION-MASTER-PLAN.md L17) | Primary delivery for the bundles — instant download, no per-order labour, cheaper fee than Etsy, links straight from pins/journal. |
| **Site chrome / landing pattern** | `...\palette-cheat-sheet\index.html` is the proven template | Each bundle gets a thin landing section reusing this exact pattern (hero + swatch/preview + buy button → Payhip URL). |
| **Brand/design system** | `...\01-brand-assets\BRAND-AND-DESIGN-SYSTEM.md`, `IMAGE-BRIEFS.md`, `assets\css\styles.css` | Drives all listing-mockup and pin art direction. |

### D. The 10 Pinterest boards (the demand map)
From `...\02-board-covers\`: 01 calm-living-rooms · 02 quiet-bedrooms · 03 japandi-kitchens · 04 storage-that-disappears · 05 soft-lighting · 06 hand-thrown-ceramics · 07 linen-and-wool · 08 calm-reading-corners · 09 small-space-calm · 10 tea-and-wellness.
Journal clusters that match: japandi-101, two-woods-rule, japandi-color-palette, layering-textiles, honest-materials, the room guides (bedroom/living/dining/kitchen/entryway/home-office/bathroom/outdoor) and the budget guides ($250–$400 rooms).

### Free vs paid — the one rule that protects the funnel
The **free** email magnets stay free (palette cheat-sheet + 20-page starter guide via signup). The **paid bundles never resell the free PDF alone** — each paid bundle is a *materially bigger, more useful object* (worksheets, checklists, the room-matcher as a fill-in planner, the wall-art files, the curated shopping lists). This keeps the lead magnet honest and gives the bundle a clear reason to cost money. Where a paid bundle includes a free asset (e.g. the cheat-sheet inside Bundle 3), it is positioned as "plus" content, not the headline.

---

## 2. The bundles (5 defined, all $9–29, built from existing assets)

> AOV ladder: a $9 impulse entry, three $14–19 mid bundles on the highest-traffic niches, one $29 "everything" bundle for the warmest buyers. Prices anchor to "considered reference," never "$0.99 printable."

### Bundle 1 — The Japandi Colour Palette Kit — **$12**
- **Inside:** the 10-page Palette Cheat-Sheet PDF (the polished existing asset) **+ net-new** a 1-page printable "match-against-the-hex" swatch card (the 5 palettes as cut-out swatches to carry to a paint store / fabric shop) **+** a 1-page fill-in "my room palette" worksheet (pick base / 2 woods / 1 accent, from the calculator field logic).
- **Buyer + intent:** someone mid-decorating who has found the palette and wants to *commit* — paint chips, fabric matching, "which palette for my room." High commercial intent, low price = easy yes.
- **Points to it:** Board 01 calm-living-rooms, 02 quiet-bedrooms, 07 linen-and-wool. Journal: `/journal/japandi-color-palette/`, `/palette/`, `/palette-cheat-sheet/`. The cheat-sheet lander adds a "want the printable kit?" line under the free download.

### Bundle 2 — The Calm Room Plan: Bedroom Edition — **$19**
- **Inside (all from existing room-guide + calculator logic):** a printable **room-budget worksheet** (static version of the Calm Home Calculator fields) **+** a one-page **layout/zoning sheet** (bed wall, nightstand pair, lighting layers, textile weights — straight from `/journal/japandi-bedroom/` + layering-textiles) **+** a **curated shopping checklist** (the bedroom starter list from the Starter Guide, as tick-boxes, with the affiliate disclosure) **+** the **two-woods quick-reference** card.
- **Buyer + intent:** "I'm doing my bedroom this month and want a plan, not a Pinterest rabbit-hole." Highest-intent room on Pinterest for this brand.
- **Points to it:** Board 02 quiet-bedrooms, 08 calm-reading-corners, 09 small-space-calm. Journal: `/journal/japandi-bedroom/`, `/journal/budget-japandi-bedroom/`, `/journal/layering-textiles/`.
- **Scale note:** if it converts, clone the *exact* template for Living Room, Home Office, Kitchen, Entryway (room guides already exist for each) — a 5-SKU "Calm Room Plan" line at zero new design cost.

### Bundle 3 — The Japandi Starter Pack (Expanded) — **$24**
- **Inside:** the **20-page Starter Guide PDF** (existing) **+** the **Palette Cheat-Sheet** (existing, as "plus" content) **+ net-new worksheets:** the 7-day plan as a fill-in **checklist**, the starter shopping list as a tick-box **materials list** (with disclosure), and a **"five mistakes" self-audit** page. Positioned as the complete "do my whole home, calmly" reference.
- **Buyer + intent:** the warm buyer who downloaded the free guide and wants the *worked* version — the planner, not just the read. Top of the AOV ladder.
- **Points to it:** Board 09 small-space-calm + all room boards; `/begin-here/`, the welcome email's second touch, `/journal/japandi-101/`.

### Bundle 4 — The Quiet Walls Print Set: Sumi-e — **$14** (digital download)
- **Inside:** a curated set of **6 sumi-e ink designs** as instant-download printable wall art (from the 30 masters: Ensō, Bent Reed, Crane, Mountain Mist, Bamboo, Cherry Branch), each supplied at the three standard ratios (8×10 / 11×14 / 16×20) so the buyer prints at home or at a local lab. **+** a 1-page **hanging/framing guide** (frame sizes, warm-white-mat note from the brand paper philosophy).
- **Buyer + intent:** the renter / budget decorator who wants the *look* now and will print themselves — the freebie-adjacent buyer L2-2 describes exactly. Impulse price.
- **Points to it:** Board 01 calm-living-rooms, 02 quiet-bedrooms, 08 calm-reading-corners. Journal: `/journal/art-of-negative-space/`, `/journal/wabi-sabi-ceramics/`, the `/shop/prints/` gallery (digital-download CTA beside the physical-print waitlist).
- **Relationship to physical prints:** this does **not** cannibalise Gelato — it's a different buyer (DIY printer vs. wants-it-framed-and-shipped). Price gap ($14 digital set vs $28–68 per physical) keeps them distinct.

### Bundle 5 — The Quiet Walls Print Set: Botanical Line — **$14** (digital download)
- **Inside:** 6 botanical-line designs (Single Stem, Eucalyptus, Olive Branch, Pampas, Ginkgo, Wild Grass), same three-ratio delivery + the hanging/framing guide.
- **Buyer + intent:** same DIY-print buyer, botanical aesthetic (the single highest-saving pin style historically — line-art on cream).
- **Points to it:** Board 06 hand-thrown-ceramics, 07 linen-and-wool, 10 tea-and-wellness; `/journal/honest-materials/`.
- **Bundle-of-bundles upsell:** "Both print sets — Sumi-e + Botanical, 12 designs" at **$22** (vs $28 separately) becomes the natural cross-sell, nudging AOV without new assets.

**Coverage check:** 3 niches the boards over-index on (palette/colour, the bedroom, wall-art) get dedicated SKUs; the warmest buyers get the $24 pack; the AOV ladder runs $12 → $14 → $14 → $19 → $24 with a $22 print-bundle and a 5-room clone path baked in for scale.

---

## 3. Listing copy — paste-ready, Etsy + Payhip, per bundle

> Voice rules applied: declarative, sensory, no exclamation marks, "curated/considered" not "amazing." Etsy title ≤140 chars, 13 tags ≤20 chars each. Disclosure line included on any bundle with an affiliate shopping list (Bundles 2 & 3).

---

### BUNDLE 1 — Colour Palette Kit ($12)

**ETSY — Title**
```
Japandi Colour Palette Cheat Sheet | Printable Hex Code Guide, Paint & Fabric Swatch Card, Room Matcher | Instant Download PDF
```
**ETSY — Description**
```
A printable colour kit for building a calm Japandi room — and committing to it.

Inside (instant download, print at home on US Letter):
• The Japandi Colour Palette Cheat-Sheet — all five signature palettes with exact hex codes
• The three rules that hold a palette together: a warm base, two woods, one quiet accent
• A room-by-room matcher — which palette carries the bedroom, the kitchen, the office
• A cut-out swatch card to carry to the paint counter or fabric shop
• A fill-in worksheet for your own room: base, two woods, one accent

Warm off-white, terracotta accent, set in the Calm & Oak house style. No fluff, no filler — one reference you keep open while you paint, shop, and match.

This is a digital product. Nothing is shipped. Files download instantly after purchase.
```
**ETSY — Tags (13)**
```
japandi palette, hex code guide, colour cheat sheet, paint palette, printable decor, japandi decor, neutral palette, interior planner, paint swatch card, room colour guide, japandi home, calm decor, digital download
```

**PAYHIP — Product name**
```
The Japandi Colour Palette Kit (Printable PDF)
```
**PAYHIP — Description**
```
Five signature Japandi palettes, every hex code, and the three rules that hold them together — plus a cut-out swatch card and a fill-in worksheet for your own room.

What you get, instantly:
— The 10-page Palette Cheat-Sheet (warm base / two woods / one accent, the room-by-room matcher, the five mistakes that flatten a Japandi room)
— A one-page swatch card to carry to the paint or fabric shop
— A one-page "my room palette" worksheet

Print at home on US Letter. Warm, quiet, and built to be used — not filed away.

Digital download. Nothing ships.
```

---

### BUNDLE 2 — Calm Room Plan: Bedroom ($19)

**ETSY — Title**
```
Japandi Bedroom Planner Printable | Room Budget Worksheet, Layout Guide, Shopping Checklist | Calm Minimalist Bedroom Plan PDF
```
**ETSY — Description**
```
A quiet plan for a Japandi bedroom — so you decorate from a plan, not a Pinterest spiral.

Inside (instant download, print at home):
• A room-budget worksheet — set what you'll spend, room by room, and stay honest
• A layout and zoning sheet — the bed wall, the nightstand pair, the lighting layers, the textile weights
• A curated shopping checklist — the pieces that actually make a Japandi bedroom, as tick-boxes
• The two-woods quick-reference card — the one rule that keeps wood tones calm

Built from the Calm & Oak bedroom method. Warm off-white, set in the house style, designed to be written on.

This is a digital product. Nothing is shipped.

Some checklist items link to products we may earn a small commission on, at no cost to you. You're never required to buy anything to use the plan.
```
**ETSY — Tags (13)**
```
japandi bedroom, bedroom planner, room planner pdf, decor checklist, bedroom layout, minimalist bedroom, budget worksheet, japandi decor, interior planner, calm bedroom, printable planner, home planner, digital download
```

**PAYHIP — Product name**
```
The Calm Room Plan — Bedroom Edition (Printable)
```
**PAYHIP — Description**
```
Everything you need to plan a Japandi bedroom on one calm set of pages: a room-budget worksheet, a layout and zoning sheet, a curated shopping checklist, and the two-woods quick-reference card.

Decorate from a plan, not a feed. Print at home, write on it, take it to the shop.

Digital download. Nothing ships. A few checklist items link to products we may earn a small commission on — never required to use the plan.
```

---

### BUNDLE 3 — Japandi Starter Pack, Expanded ($24)

**ETSY — Title**
```
Japandi Home Starter Pack Printable | 20-Page Guide, Palette Cheat Sheet, 7-Day Plan, Shopping Checklist | Calm Decor PDF Set
```
**ETSY — Description**
```
The complete, worked version of the Calm & Oak starter method — the read and the plan, together.

Inside (instant download, print at home):
• The 20-page Japandi Starter Guide — the five principles, the palette, the materials, the two-woods rule, the three textile weights, the starter list
• The Palette Cheat-Sheet — all five palettes with hex codes and the room matcher
• A 7-day plan as a fill-in checklist — one calm step a day
• A materials tick-list — the pieces, in order
• A "five mistakes" self-audit — catch them before you commit

For the home you want to do slowly and properly. Warm off-white, set in the house style.

This is a digital product. Nothing is shipped.

Some shopping-list items link to products we may earn a small commission on, at no cost to you.
```
**ETSY — Tags (13)**
```
japandi guide, home decor guide, japandi starter, decor planner, minimalist home, japandi decor, palette cheat sheet, 7 day plan, shopping checklist, calm home, printable guide, interior guide, digital download
```

**PAYHIP — Product name**
```
The Japandi Starter Pack — Expanded Edition (Printable)
```
**PAYHIP — Description**
```
The 20-page Japandi Starter Guide, the Palette Cheat-Sheet, and three fill-in tools — the 7-day plan, the materials tick-list, and the five-mistakes self-audit — in one calm set.

The read and the plan together, for doing your whole home slowly and properly.

Digital download. Nothing ships. Some shopping-list items link to products we may earn a small commission on, never required.
```

---

### BUNDLE 4 — Quiet Walls: Sumi-e ($14)

**ETSY — Title**
```
Japandi Sumi-e Wall Art Set of 6 | Printable Japanese Ink Prints, Minimalist Zen Decor | 8x10 11x14 16x20 Instant Download
```
**ETSY — Description**
```
Six sumi-e ink designs — single-breath brushstrokes in the Japanese tradition — as instant-download printable wall art.

The set: Ensō, Bent Reed, Crane, Mountain Mist, Bamboo, Cherry Branch.

Each design comes in three ratios — 8×10, 11×14, and 16×20 — so you can print at home or at a local print lab and frame it your way. Warm off-white ground, true to the Calm & Oak studio.

Inside:
• 6 designs × 3 sizes = 18 print-ready files (300 DPI)
• A one-page hanging and framing guide

This is a digital download for home printing. No physical print is shipped. For framed, museum-paper prints shipped to you, see our print collection.

For personal use. Frames not included.
```
**ETSY — Tags (13)**
```
sumi-e print, japanese wall art, zen wall art, ink painting print, japandi wall art, minimalist print, enso print, printable art set, gallery wall set, japanese decor, bamboo art, calm wall art, digital download
```

**PAYHIP — Product name**
```
Quiet Walls — Sumi-e Print Set (6 Printable Designs)
```
**PAYHIP — Description**
```
Six sumi-e ink designs — Ensō, Bent Reed, Crane, Mountain Mist, Bamboo, Cherry Branch — as instant-download printable wall art, each in three sizes (8×10, 11×14, 16×20).

Print at home or at a local lab and frame it your way. 18 print-ready files plus a one-page hanging and framing guide.

Digital download for personal use. Nothing ships; frames not included. Want it framed on museum paper instead? See the Calm & Oak print collection.
```

---

### BUNDLE 5 — Quiet Walls: Botanical Line ($14)

**ETSY — Title**
```
Botanical Line Art Set of 6 Printable | Minimalist Japandi Wall Art, Single-Line Plant Prints | 8x10 11x14 16x20 Download
```
**ETSY — Description**
```
Six botanical line designs — one continuous ink line for a stem, a branch, a leaf — as instant-download printable wall art.

The set: Single Stem, Eucalyptus, Olive Branch, Pampas, Ginkgo, Wild Grass.

Each design comes in three ratios — 8×10, 11×14, 16×20 — for home or lab printing. Warm off-white ground, true to the Calm & Oak studio.

Inside:
• 6 designs × 3 sizes = 18 print-ready files (300 DPI)
• A one-page hanging and framing guide

This is a digital download for home printing. No physical print is shipped. For framed, museum-paper prints shipped to you, see our print collection.

For personal use. Frames not included.
```
**ETSY — Tags (13)**
```
botanical line art, line art print, japandi wall art, minimalist print, plant wall art, single line art, printable art set, gallery wall set, ginkgo print, olive branch art, neutral wall art, calm decor, digital download
```

**PAYHIP — Product name**
```
Quiet Walls — Botanical Line Print Set (6 Printable Designs)
```
**PAYHIP — Description**
```
Six botanical line designs — Single Stem, Eucalyptus, Olive Branch, Pampas, Ginkgo, Wild Grass — as instant-download printable wall art, each in three sizes (8×10, 11×14, 16×20).

Print at home or at a local lab. 18 print-ready files plus a one-page hanging and framing guide.

Digital download for personal use. Nothing ships; frames not included. Want it framed on museum paper? See the Calm & Oak print collection.
```

**Cross-sell listing (optional, both print sets):** name "Quiet Walls — Sumi-e + Botanical (12 Printable Designs)", $22; description = combine the two above, lead with "twelve designs, both sets, at a saving."

---

## 4. Delivery plan — existing tools only

**Primary: Payhip (instant digital download).**
1. Each bundle = one Payhip "Digital product." Upload the final PDF(s) / zipped print files as the deliverable. Payhip serves the download link instantly on purchase and emails it — zero per-order labour, which is the whole economic point (L2-3).
2. The bundle PDFs are produced from the existing HTML assets via the **already-shipped mechanic**: open the asset page, Ctrl+P → Save as PDF, Letter, margins none, background graphics ON (the exact instruction already baked into the cheat-sheet page). Net-new worksheet pages are authored in the same HTML template (`assets/css/styles.css` + the cheat-sheet page structure) so they render identically.
3. Print-art bundles (4 & 5): the deliverable is a zip of the re-exported display files + the 1-page framing guide PDF. (See asset note below for the one light export step.)
4. Each Payhip product gets a clean URL; that URL is what every pin, journal cross-link, and landing button points to.

**Secondary: Etsy digital downloads.**
- Same files, listed as Etsy "Digital" items on the live CalmandOak shop. Etsy takes a higher cut but brings its own high-intent search traffic and trust. List the same 5 bundles; Etsy auto-delivers the files.
- **Etsy POD/production-partner disclosure does NOT apply** to digital downloads (no Gelato in the loop) — these are our own files, delivered as files.

**Landing pattern on-site (autonomous to build, no spend):**
- A thin `/shop/printables/` index + one section per bundle, cloning `palette-cheat-sheet/index.html` (hero + preview swatches/thumbnails + a single buy button linking to the Payhip URL). This is site-chrome work the merchandiser can build and ship through SAFEGUARDS — **but the buy button needs the live Payhip product URL first**, which is a Cameron step (account access). Until then the landing sections are staged with the button disabled / pointing to the Etsy listing.

**Net-new asset note (kept to existing tooling):**
- **Worksheets/cards (Bundles 1–3):** ~6 one-page HTML pages authored in the existing template. No new tools, no spend. Merchandiser can produce these now.
- **Print-art digital files (Bundles 4 & 5):** the 90 masters in `Calm-Oak-Print-Masters\` are sized for *physical* Gelato printing. For a clean home-print digital product, re-export each chosen design at the three standard sizes with a light "for home printing" treatment (sRGB, 300 DPI, add a thin safe-margin note). This uses the **existing `_print-prep.js` pipeline** described in `PRINTS-SETUP.md` §2 — no new tooling, no spend. 12 designs × 3 sizes = 36 files to re-export.

---

## 5. Pin wiring

### A. Re-point existing pins (no new art, just change the destination URL on the highest-saving live pins)
| Existing pin / archetype | Currently points at | Re-point to |
|---|---|---|
| Palette / colour pins (e.g. `day1-pin*`, the palette-generator + cheat-sheet promo pins) | `/palette/`, `/palette-cheat-sheet/` (free magnet) | Keep free CTA, **add** "the printable kit →" to the Palette Kit (Bundle 1). Don't replace the magnet — layer the paid option. |
| Bedroom pins (`day20-bedroom-reading-corner`, platform-bed get-the-look, linen-headboard) | `/journal/japandi-bedroom/` | Add Bundle 2 (Bedroom Plan) as the secondary CTA in the journal page + on the pin description. |
| Sumi-e / ink-art seed pins (`seed-07-wabi-sabi-everyday`, enso/bamboo styled pins) | journal art pages | Bundle 4 (Sumi-e print set). |
| Botanical line pins (single-stem, eucalyptus, olive, ginkgo styled pins) | journal/honest-materials, prints gallery | Bundle 5 (Botanical print set). |
| Starter-guide / begin-here lead-magnet pins | `/begin-here/` | Keep free guide; add Bundle 3 (Expanded Pack) as the "go deeper" CTA. |

> Mechanic: re-pointing = editing the destination link on existing pins (or scheduling fresh saves of the same proven image to the bundle URL via the content-factory/Blotato flow). Respect the rate ceiling (max 5 posts/day/platform) and the L0-10 quality rule — fresh saves must still be unique/art-directed.

### B. 5 new pin concepts (titles + image direction, per IMAGE-BRIEFS / brand system)
All: 2:3 (1000×1500), warm off-white ground (#F7F4EE), Cormorant Garamond display + Inter caption, single terracotta accent, no hype, no exclamation.

1. **"Every Japandi palette, with the hex codes"** → Bundle 1.
   *Image:* the five palette swatch-rows stacked vertically on cream, the brand wordmark small at top, a torn-paper "swatch card" mockup peeking at the corner. Editorial, almost like a magazine contents page.
2. **"Plan the bedroom before you buy a thing"** → Bundle 2.
   *Image:* a flat-lay of the printed planner pages on a linen surface beside a stoneware mug and a sprig of eucalyptus, one terracotta pen resting on the budget worksheet. Hand-on-page, considered, not staged.
3. **"The whole calm-home method, on paper"** → Bundle 3.
   *Image:* the 20-page guide + cheat-sheet fanned on a warm-oak desk, soft golden-hour light, a single olive branch. Conveys volume/substance for the $24 anchor.
4. **"Six sumi-e prints, ready to print at home"** → Bundle 4.
   *Image:* three of the six designs in thin oak frames on a cream wall above a floating shelf with one ceramic vessel; bottom strip shows the six thumbnails. "Print at home" caption small.
5. **"One continuous line. Six botanical prints."** → Bundle 5.
   *Image:* a single-stem line print centred on cream, framed, with a folded linen throw below; the six-design strip along the base. Quiet, lots of negative space (ties to art-of-negative-space).

---

## 6. Conversion test plan (2–3 weeks)

**Setup (Cameron does the listing creation; merchandiser does everything else):**
- Launch **all 5 bundles** on Payhip + Etsy (the marginal cost of 5 vs 1 is near-zero and we learn which niche converts).
- Tag every pin/journal link to a bundle with a UTM (`utm_source=pinterest&utm_campaign=printables&utm_content=<bundle>`) and, on Payhip, use one discount-less clean link per bundle so attribution is unambiguous (ATTRIBUTION.md standard).
- Baseline week 0: record current weekly Pinterest outbound clicks to the palette/bedroom/prints pages (from existing analytics) so we measure lift, not just absolute.

**Run (weeks 1–3):**
- Re-point the existing high-saving pins (§5A) + publish the 5 new pins (§5B) across the matching boards, within the 5/day ceiling.
- Add the secondary bundle CTA to the 5 matched journal pages via SAFEGUARDS-gated edits.
- Hold price fixed for the whole test (no discounting — discounts confound the read).

**Primary success metric:**
> **≥ 25 paid bundle sales in 21 days at ≥ 1.0% checkout conversion** from the printables-tagged sessions (sales ÷ unique visitors to a bundle landing/listing). This is the "first dollar" proof: that this exact traffic buys one-time digital goods (the L2-3 hypothesis), measured, not assumed.

**Secondary metrics:** revenue per bundle (which niche wins), AOV (does the $22/$24 anchor pull up?), Payhip-vs-Etsy split, free-magnet → paid-bundle assist rate.

**Kill / scale gate (decide at day 21):**
- **SCALE** if ≥ 25 sales AND ≥ 1.0% conversion: clone Bundle 2 to the other 4 rooms (Living/Office/Kitchen/Entryway — guides already exist), add the print-set bundle-of-bundles, and give the winning niche a dedicated weekly pin slot. Then revisit pricing upward on the proven SKU.
- **ITERATE** if 10–24 sales OR 0.4–0.9% conversion: keep the 1–2 best-selling bundles, cut the laggards, retest copy/price/pin angle on the survivors for one more 14-day cycle.
- **KILL** if < 10 sales AND < 0.4% conversion after 21 days: stop. The bundles are not the wedge for this traffic; report the negative result to learnings.md (it would be a meaningful counter-signal to L2-3) and the merchandiser returns focus to prints + the digital guides funnel. No further spend was ever at risk.

---

## 7. ESCALATE TO CAMERON (human-only steps — account access)

Everything below needs Cameron's logged-in account; the agent cannot and will not do these. Ordered so Cameron can go live in under an hour once the final files are staged.

1. **Create the 5 Payhip products** (paste the §3 Payhip name + description per bundle), upload the deliverable file(s) the merchandiser hands over, set the prices ($12 / $19 / $24 / $14 / $14), publish, and **send the 5 live Payhip product URLs back** (paste into TEAM-LOG.md). *This is the single blocker for the on-site buy buttons.*
2. **Create the 5 Etsy digital-download listings** on etsy.com/shop/CalmandOak (paste §3 Etsy title/description/tags, upload same files, set item type = Digital, prices as above). No production-partner disclosure needed (digital, no Gelato).
3. **Pricing approval** — confirm or adjust the price ladder ($12/$14/$14/$19/$24, plus the optional $22 print bundle-of-bundles). Prices set; just needs a yes.
4. **Connect the Payhip URLs** into the staged on-site landing sections — actually a paste-back (step 1 output); once URLs are in TEAM-LOG.md the merchandiser wires the buy buttons and ships via SAFEGUARDS.
5. **Confirm the free-vs-paid line** is acceptable: free palette cheat-sheet + 20-page starter guide stay free magnets; paid bundles are the expanded/worked versions. (Recommended; one-line approval.)
6. **(Optional, no spend) MailerLite:** add a single "by the way, the printable kit" line to the existing welcome sequence's second email pointing to Bundle 1/3 — Cameron approves the copy before it sends (email agent drafts; never auto-sends).

**Not requested / explicitly out of scope:** no new checkout platform, no Shopify/Lemon Squeezy migration, no ad spend, no new accounts. The Payhip → Shopify upgrade remains a *future* DTC decision (PRINTS-SETUP.md), not part of this first-dollar test.

---

## 8. Hand-off to TEAM-LOG.md (staged line for the agent to append on go)

```
YYYY-MM-DD · MERCHANDISER · Printable bundle store planned + staged. 5 one-time bundles ($12–24) defined from existing assets (palette cheat-sheet, 20pg starter guide, calculator logic, 30 print masters). Plan + paste-ready Etsy/Payhip copy + worksheet specs in PRINTABLE-BUNDLE-STORE.md. NEEDS-CAMERON: create 5 Payhip + 5 Etsy digital listings, return live URLs (blocks on-site buy buttons). PINTEREST/CONTENT: 5 new pin concepts + re-point map ready once URLs land. EMAIL: optional welcome-seq line to Bundle 1/3. · staged (needs-Cameron: listings + URLs)
```

---

## 5-line summary

1. **Bundles defined:** five one-time printable bundles — Palette Kit, Bedroom Plan, Expanded Starter Pack, and two Quiet Walls print sets (Sumi-e + Botanical) — with a 5-room clone path and a $22 print bundle-of-bundles for scale.
2. **Price range:** $12–$24 (ladder: $12 / $14 / $14 / $19 / $24; optional $22 combo) — one-time, ~100% margin, zero per-order labour.
3. **Existing assets reused:** the 10-page palette cheat-sheet, the 20-page Japandi Starter Guide, the Calm Home Calculator field logic, and 12 of the 30 print masters — plus the live Etsy shop, Payhip, and the proven cheat-sheet landing pattern.
4. **Net-new assets needed:** ~6 one-page worksheet/card HTML pages (existing template, no tools/spend) and a light re-export of 36 print files via the existing `_print-prep.js` pipeline — nothing requiring new software or money.
5. **The single most important thing for Cameron to do:** create the 5 Payhip digital products from the paste-ready copy and send back the live product URLs — that one step unblocks the on-site buy buttons and the whole 21-day conversion test.
