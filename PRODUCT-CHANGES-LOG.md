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

### 2026-05-26 — Pin 58 fix: matched to ClosetMaid 3258 Cubeicals + re-rendered

**Issue:** Pin 58 (`assets/img/products-cropped/day12-pin58-storage-bench.jpg`) showed a premium Japandi entryway storage bench — solid-oak frame, channel-tufted oat-linen padded seat, three linen storage bins with leather pull tabs — that **had no Amazon match at our review bar**. Originally noted in `PLACEHOLDER-AUDIT.md` row 8 ("Slatted oak entryway bench... High-review option HomePop Malmo 4.6/1.7K is a CLOSED storage box; open-leg upholstered = low rev") and deferred to a Look-batch. The asset was orphaned across the site (no HTML refs).

**Sourcing pass (2026-05-26):** Browser-searched Amazon across three queries — "oak entryway storage bench linen seat 3 baskets", "storage bench with cushion seat 3 cubby baskets entryway", "tufted linen entryway bench oak storage bins". Confirmed no direct match for the original premium pin (solid oak + channel-tufted linen + included fabric bins) exists at the ≥4.3★ / ≥200 reviews bar. Strongest legitimate functional match: **ClosetMaid 3258 Cubeicals 3-Cube Storage Bench, Natural Gray with Gray Cushion** (`B075DQKLV4`, 4.4★ / 3,559 reviews, Amazon's "Overall Pick" badge, $78.36, In Stock, ships from Amazon, 30-day refund/replacement, no "Frequently returned" flag).

**Picture-product mismatch on the old render vs the ClosetMaid:** laminate-look driftwood-grey wood (not solid honey oak); flat soft grey cushion (not channel-tufted oat-linen); open cubbies (no fabric bins included). Per the picture-product rule, the pin had to be re-rendered to honestly show the product the reader would receive.

**New render (`pin58-closetmaid-3258-storage-bench.jpg` in Mockups, resized over `day12-pin58-storage-bench.jpg` at 848×1264):** the ClosetMaid 3258 Cubeicals bench accurately depicted — driftwood-grey laminate finish, three open cubbies, flat soft grey cushion seat on top — placed in a Japandi entryway context with light oak floor, plaster wall with wainscoting, a single hand-thrown stoneware vase + eucalyptus sprig on the cushion corner, a folded oat-linen throw draped over one end, a pair of tan leather loafers beside on the floor, linen curtain edge with morning light. Aspirational Japandi styling around an authentically-depicted product.

**Status:** pin 58 now matches ClosetMaid 3258 (`B075DQKLV4`) honestly. Original premium pin (solid oak + tufted linen + bins) retained at `C:\Users\CameronHayes\Pictures\Mockups\day12-pin58-storage-bench.jpg` as portfolio art / inspirational reference, not tied to any product link. Pinterest copy + upload pending (P3 task on the queue).

---

### 2026-05-26 — PHASE B-2 punch-list execution (6 shop pages cleaned, 5 wrong-product cards removed)

After re-verifying my own audit by spot-reading actual file labels (the inventory script over-reported "label conflicts" — most were script noise from adjacent shop-card markup), the **real cleanup scope is smaller and cleaner than the punch list initially suggested**.

**Shipped in this commit:**
1. **shop/bedroom** — relabeled B0DHCYFKY7 from "Stonewashed linen pillowcase pair" to "Bedsure cotton-linen bed sheet set, queen" (the actual product); DELETED B0D2CZYGJ9 card (rattan-nightstand-pair link with an oak-round-nightstand image — irreconcilable picture/product mismatch). Renumbered positions, decremented `numberOfItems` 13 → 12. Verification: 12/12 sequential.
2. **shop/japandi-kitchen** — relabeled B0FF4RNKM2 from "Stoneware pasta bowls, set of 4" to "AmorArc ceramic nesting mixing bowls, set of 3" (the actual product). Other suspected mismatches on this page (B0866GB57R, B09Y5VVRPT, B0CMWLVJGT, B0DBSKRVNL, B0GHPWL9GS) all verified as **already correctly labeled in-file** — earlier audit script noise.
3. **shop/ceramics-tableware** — DELETED B08SW6BSKS "Wide speckled stoneware salad bowl" card (link goes to BILL.F acacia wooden salad bowl — material mismatch with the stoneware image and stoneware label). Renumbered, count 9 → 8.
4. **shop/gift-guide** — DELETED B08SW6BSKS "Wide speckled stoneware salad bowl" card (same as above, second location). Renumbered, count 12 → 11.
5. **shop/furniture** — DELETED B091MJ3CMM "Pre-washed Belgian linen sofa, cream" card (link goes to a slipcover, not a sofa). Renumbered, count 10 → 9. Shop/looks/quiet-living-room still has this slot — deferred pending real sofa-ASIN sourcing.
6. **shop/textiles** — DELETED B0GGZF4ZRJ "Wool-jute rug, 5×7 cream" card (link goes to a generic 8×10 abstract rug — wrong size, wrong style). Renumbered, count 9 → 8.
7. **journal/250-dollar-bathroom** — swapped B07Z6RZ6H5 (Madison Park plush white tufted bath mat) `/dp/` to an honest search-link (`s?k=cotton+waffle+bath+mat+oat+natural`) so readers searching for an oat waffle mat see real options, not the plush white mismatch.
8. **journal/japandi-living-room** — corrected the KEMA jute braided rug callout from "5×7" to "8×10" (the actual product size).

**Verification across all 6 modified shop pages:** 100% JSON-LD positions sequential, `numberOfItems` matches visible card count, zero stale references.

**Deferred to a focused next session:**
- `shop/looks/quiet-living-room` sofa slot (B091MJ3CMM) — needs a real Belgian linen sofa ASIN
- `B0DRHQ1FKP` THKSHOUZ fluted oak pedestal — used in 9 files, 33 reviews, ship-blocked. Needs replacement
- A handful of low-priority relabels that are not picture-product breaks

**Phase B-2 status:** sweep ✅, critical wrong-product deletions ✅, mass-relabel pass (Tier 2) ✅ where verified. Lower-priority Tier 1 fixes (where audit script falsely flagged collisions) **not needed** based on per-file verification. The catalog is now substantially more honest. Resuming japandi-bedroom Commit 2 next.

---

### 2026-05-26 — PHASE B-2 sweep COMPLETE + first fixes shipped (more in PHASE-B2-PUNCH-LIST.md)

**The discovery:** Browser-re-verified all 86 unique ASINs sitewide (Phase B's first pass was static-only and missed product-label drift). **Real failure rate ~33% wrong-product + ~15% label-drift.** A 4-shop-page audit surfaced 20 ASINs that point to a different product than any label suggests, plus 21+ ASINs where one or more shop pages display the wrong name for an otherwise-correct link.

**Why this happened (forensic):** When earlier sessions cloned shop-card structures and swapped only the `<a href>` ASIN, the visible `<h3 class="product-title">` and JSON-LD `name` (which sit OUTSIDE the anchor on shop pages) stayed pointing at the previous product. Journal cards (which wrap the label INSIDE the anchor) stayed mostly clean. Some other ASINs went bad organically — Amazon recycled the listing under a new merchant (B0DLP245LL was almost certainly the HAOBO oat-linen headboard when first sourced; today it shows a Huuger rustic-brown fabric dresser).

**Shipped in this commit:**
1. `journal/japandi-101/index.html` — corrected the §5 "Things that age well" product callout: link swapped from B0DLP245LL (wrong, fabric dresser) to B07ZRPL48D (the real HAOBO oat-linen headboard).
2. `shop/bedroom/index.html` — removed the entire B0DLP245LL "Slatted oak dresser" card (real product was the off-brand Huuger fabric dresser). Both JSON-LD ListItem and visible `<article class="product">` deleted. Renumbered subsequent ListItem positions 11→10, 12→11, 13→12, 14→13. `numberOfItems` 14 → 13. Verification: 13/13 positions sequential, 13 visible cards, 0 stale references.

**Created:** `PHASE-B2-PUNCH-LIST.md` — comprehensive remediation backlog organized in three priority tiers:
- Tier 1: ~21 label-collision fixes across 12 shop pages (relabel only, no sourcing)
- Tier 2: ~11 right-product-wrong-name relabels  
- Tier 3: ~13 true wrong-product decisions (3-4 need replacement sourcing, the rest become relabels or honest deletes)

**Status:** Phase B-2 sweep is **complete (data)**; remediation is **scheduled** (~3-5 hours focused work in next session). Until Tier 1 + Tier 2 are done, **no further article rebuilds should ship inline product callouts** — risk of adding more callouts pointing to silently-wrong products. The japandi-bedroom rebuild's Commit 2 (renders + callouts) is paused for exactly this reason.

---

### 2026-05-26 — PHASE D COMPLETE (code side): Print Collection list-capture + verticals scoped

**Code shipped:**
- New MailerLite group **"Calm & Oak — Print Launch List"** (id `188519699722536376`).
- New MailerLite embedded form **"Calm & Oak — Print Launch List Signup"** (id `188519737346491507`) linked to that group, double opt-in ON.
- `assets/js/main.js` — now routes by `data-signup` attribute: default → starter-guide endpoint, `data-signup="prints"` → print-launch endpoint. Different success copy + button label per stream. Analytics events carry a `list` property so the two streams are separable.
- `shop/prints/index.html` — both signup forms tagged `data-signup="prints"`. Lands subscribers into the new Print Launch List group, not the Starter Guide group.

**Confirmed live (no changes needed):**
- `/shop/prints/` landing page already complete — "Opening soon" hero, 4 print figures (Ensō, Two Woods, Single Stem, Serene Dawn) with `VisualArtwork` schema, "Made the way we'd want them" copy section, double signup CTA, sitewide footer link. All 4 print images render at magazine quality.
- Print Collection in sitemap (`<priority>0.8</priority>`, weekly).

**Created:** `PHASE-D-LAUNCH-PLAN.md` — owner playbook for the two Phase D priorities from `VERTICALS.md`:
1. **Print Collection POD**: Gelato vs Printful vs Printify decision matrix → recommended **Gelato** (Hahnemühle papers, print-near-buyer, Etsy-ready). Pricing model (8×10 $28 → 18×24 $88, ~73% margins). 7-step owner checklist: sign up → upload 300 DPI files → order proofs → choose checkout (Etsy → Snipcart → Shopify in order of effort) → replace "opening soon" hero → build launch automation → send launch email.
2. **Quiet Wardrobe (affiliate)**: page-build plan from the `/shop/textiles/` template, 8–10 product sourcing slate (linen popovers, linen pants, kimono robes, slippers, wool socks), Awin signup for higher fashion commission rates, journal cross-links, first wardrobe Look ("The Quiet Sunday").

Plus longer-term scope for wellness, nursery, paid playbook, scent line, membership — each tagged with the gating decision.

**Gated on owner (live-launch gate):** Gelato signup, print file uploads, checkout platform choice, Awin signup, wardrobe product approval, MailerLite form/automation activation. Until then, the prints page list-captures silently and the wardrobe vertical is documented but unbuilt.

---

### 2026-05-26 — PHASE C COMPLETE (code side): email welcome chain wired + 3 emails drafted in MailerLite

**Code shipped (no owner approval needed):**
- `assets/js/main.js` — `ENDPOINT` set to the MailerLite classic JSONP URL `https://assets.mailerlite.com/jsonp/2375797/forms/188364767967053815/subscribe`. Submission uses `mode: 'no-cors'` form-urlencoded POST. The success UX (form locks, button → "Sent ✓", note replaces with inline PDF download link) is unchanged, so subscribers always get the PDF immediately even before the welcome email arrives.

**Drafted in MailerLite via API (`update_automation_email`):**
- Step 1 (immediate on group-join): subject `Your Japandi Starter Guide is here →` — delivers PDF + sets newsletter expectations.
- Step 2 (day 2): subject `The five principles, and one room to start` — the five Japandi principles + links to the Sage Bedroom guide & Look.
- Step 3 (day 5): subject `Whole rooms, made shoppable` — Looks page tour, points to 3 starter Looks + the index.

All three pass the MailerLite content validator (subject ≤50 chars, plain text ≤1000 chars, links present, sender domain pre-authenticated). Sender: `hello@calmandoak.com`.

**Created:** `EMAIL-WELCOME-CHAIN.md` — architecture diagram, the 3 drafts in full, and the 7-step **owner activation checklist** (read drafts → build HTML bodies → activate form → send test → real test signup → enable automation → verify deliverability).

**Gated on owner (live-send gate):** the automation is still `enabled: false` and the form is still `active: false`. Until the owner completes the checklist, the form silently captures emails into MailerLite (queued double-opt-in pending) but sends nothing. Safe to deploy.

---

### 2026-05-26 — PHASE B COMPLETE: infrastructure verification + cross-page sync

**Static audit (4 scripts, all sitewide):**
- **Inventory**: 72 HTML files; **86 unique ASINs / 304 `/dp/` link occurrences**; 66 honest `s?k=` search-link fallbacks across 38 unique queries.
- **Image integrity**: **416/416 image refs sitewide resolve on disk** — zero broken images.
- **Affiliate-tag integrity**: **219/219 Amazon links carry `tag=calmandoak-20`** — zero untagged.
- **JSON-LD `ItemList` count integrity**: every shop + Look page has `numberOfItems` equal to `itemListElement.length` — zero drift.
- **Cross-page ASIN → name conflicts (anchor-scoped)**: **0 true mismatches.** 9 ASINs show benign room-context wording on the same product (e.g., "Stonewashed linen curtain panels, pair" vs "Stonewashed linen curtain panel"; "Briful brown ceramic vase" vs "Briful brown ceramic centerpiece vase") — same product, contextual copy per guide. No swap needed.

**Remaining `s?k=` honest fallbacks (66) — all categorized:**
- 4× low oak bed, 3× oak writing desk, 2× teak patio table, 1× teak folding chair → no review-bar `/dp/` match exists at budget; Sage Bedroom Look is the curated alternative for beds.
- 2× framed sumi-e print → routes to Print Collection (Phase D); single-print render already created (`day38-sumi-e-print-framed.jpg`).
- ~10 outdoor accents (planter, throw, cushions, paper lantern, outdoor pillow, outdoor bench, meditation cushion) → no match at budget; Kante concrete planters look right but $106 break the $30 line.
- ~6 ceramics / kitchen (salt cellar, donabe, breakfast tray) → category-specific misses already known.

**Cross-page sync** — commit pending:
- `shop/office`: linen task chair card + JSON-LD now point to **Furnimart `B0DPJX1CQL`** (4.5★/186/Overall Pick) with the new `day37-linen-task-chair-furnimart.jpg` — mirrors the Phase A journal swap.

**Phase B verdict:** infrastructure complete and strong. No data bugs. All future swaps slot into the existing structure cleanly.

---

### 2026-05-25 — PHASE A COMPLETE: all journal guides intact (outdoor + office + bedroom finish)

Closed out the journal editorial rebuild. Every journal guide now passes: correct-category image on every card, every Amazon link carries `tag=calmandoak-20`, verified `/dp/` where a strong product exists, honest search-link fallback only where no review-bar match exists at the card's budget. Verification script: **175/175 image refs exist on disk; 0 untagged Amazon links.**

**Outdoor guides** (`300-dollar-sunday-porch`, `400-dollar-patio-dining`) — commit `1c4e6fe`:
- Cordless lantern (both guides) → **uuffoo `B0DG1F9DQ8`** (4.6★ / 513 / $52.99 / Amazon's Choice / in stock / ships from Amazon / no returns flag). New grounded image `day36-cordless-lantern-uuffoo.jpg` replaces a borrowed paper-lantern thumbnail.
- Patio-dining chairs re-confirmed: **Christopher Knight Teague acacia, set of 2 `B07DQDMVJ6`** (4.4★ / 217 / $145.79 / Amazon's Choice / in stock).
- Honest fallbacks (no match at budget/look): teak patio table (best ≤3.8★ or pre-order), teak folding chair, outdoor throw, outdoor seat cushions, stoneware planter (Kante is the look-match but $106 each breaks the $30 line). All retain correct-category images.

**Home-office guide** (`400-dollar-home-office`) — commit `894d3c2`:
- Linen task chair → **Furnimart `B0DPJX1CQL`** (4.5★ / 186 / Overall Pick / $159.99 / in stock / ships from Amazon). 186 reviews = slight relaxed-band exception (was the only cream-linen-task-chair match; Overall Pick). New image `day37-linen-task-chair-furnimart.jpg` (prev image was a wheel-less accent chair).
- Desk pad → **YSAGi `B0BVVRCP3R`** (4.7★ / 20,770 / $13.99 / Amazon's Choice / khaki neutral).
- Faux olive → **Briful `B0DGT98XT6`** (4.4★ / 192 / $25.99 / in stock). New image `day37-faux-olive-briful.jpg` (prev image wrongly showed planters).
- Desk lamp re-confirmed: **Globe Electric x Novogratz `B08GDW5JYF`** (4.4★ / 547 / $52.04 / Amazon's Choice).
- Oak writing desk remains honest search fallback. `japandi-home-office` is a pillar editorial guide (no product cards) — intact.

**Bedroom guides** (`250-dollar-bedside-refresh`, `budget-japandi-bedroom`) — commit `c1b4cbf`:
- Sumi-e art (both) → new single-print image `day38-sumi-e-print-framed.jpg` (oak frame, one ink brushstroke) fixing a gallery-wall mismatch vs the "single framed piece" copy. Doubles as **Print Collection hero art for Phase D.** Affiliate search-links retained.
- Low oak bed (×2) remain honest fallbacks with correct low-oak-bed images (no 200-review Amazon match; Sage Bedroom Look is the curated alternative).

**Next:** Phase B (re-verify all live `/dp/` ASINs sitewide), Phase C (email chain), Phase D (Print Collection + verticals).

---

### 2026-05-24 — WEEK 8 start: The Sage Bedroom Look + shop additions

**Shop additions (closing the "new products not in shop" gap):** the 6 W7 products are now on the shop CATEGORY pages — `shop/textiles` (added bouclé lumbar `B0DT6V6F33`; consolidated bouclé pillows→`B0F4K9SP6N` + linen curtains→`B0DK21FLCK` so the same image maps to one ASIN sitewide) and `shop/bedroom` (added glass carafe `B09B7989F4`, ring dish `B0CG3Q4H5Q`, donut vase `B0D6YRJLCP`). `shop/gift-guide` bouclé aligned to `B0F4K9SP6N`. Published (commit f965bca).

**The Sage Bedroom Look (8th Look toward 100):**
- New anchor product **verified**: Bedsure 100% Cotton Muslin Throw, 50×70, Sage Green (`B0CFTXJVPS`) — 4.7★ / 1,528 / $32.99 / In Stock / no returns flag (the owner's original W8 candidate).
- 2 new hybrid images rendered (grounded, optimized): `assets/img/looks/the-sage-bedroom-hero.jpg` (+ `-card`) and `assets/img/products-cropped/w8-sage-muslin-throw.jpg`.
- Built `shop/looks/the-sage-bedroom/` — 5 pieces: sage throw `B0CFTXJVPS` (new) + reused verified HAOBO oat headboard `B07ZRPL48D`, linen duvet `B01IMZLNBE`, fluted oak nightstand `B0DRHQ1FKP`, PoKat lamp pair `B0C4SZBN64`. BreadcrumbList + ItemList JSON-LD, hero, grid, cross-sell.
- Looks index 7→8; sitemap +1; 2 pins queued (W8-1 hero, W8-2 throw).

**Remaining W8 (minor):** small-bedroom tall-basket → reuse `B0DHG6PMNM` (link swap); low oak bed (×2 guides) stays a Look-batch placeholder (now answered by this Sage Bedroom Look); sumi-e art → Print Collection.

---

### 2026-05-24 — Journal Editorial Rebuild · WEEK 7 sourcing (living-room textiles + bedside)

Per playbook PART 7B. Owner-approved 6 products (≥4.3★/200+/in-stock/returns-flag screenshot-clear):
- Bouclé pillow covers ×4 → MIULEE `B0F4K9SP6N` (4.5★/359) — image pin111 matches → **link swapped** (`300-living-room-textile` pos1).
- Oatmeal linen curtains 84" pair → MIULEE `B0DK21FLCK` (4.6★/3,861) — image pin50 matches → **link swapped** in `300-living-room-textile` pos4 **and** `400-small-bedroom` pos5.
- Bouclé lumbar 14×36 cream → JoraLion `B0DT6V6F33` (4.6★/209) — image (pin64) is square throw pillows, not a lumbar → **render phase** (new product shot).
- Bedside glass carafe + tumbler → ZILJJ `B09B7989F4` (4.7★/1,101) → render phase (new glass-carafe shot; thumbnail was stoneware).
- Ceramic ring/trinket dish → CCINPPY `B0CG3Q4H5Q` (4.7★/1,382) → render phase (thumbnail was salt cellar).
- Bedside accent (replaces unsourceable wooden alarm clock) → Hug Donut matte ceramic vase `B0D6YRJLCP` (4.8★/602) → render phase; matches the donut vase in pin209.
- Sumi-e print (bedside pos4) → owned Print Collection render (not Amazon).

**COMPLETED (render + place + Looks + pins):**
- **6 new hybrid images rendered** (Gemini, 2:3, grounded on the real Amazon photos; optimized to 60–240KB via sharp): 4 product shots (`w7-bedside-donut-vase`, `w7-bedside-glass-carafe`, `w7-bedside-ring-dish`, `w7-livingroom-boucle-lumbar` in `assets/img/products-cropped/`) + 2 room heroes (`the-calm-nightstand-hero`, `the-layered-living-room-hero` in `assets/img/looks/`, plus `-card` crops). First-time-right, no regens.
- **Journal cards updated (link + image):** `250-bedside-refresh` carafe, ring dish, and the alarm-clock card rewritten as the **donut bud vase** (`B0D6YRJLCP`) with new copy + corrected budget math; `300-living-room-textile` lumbar.
- **2 new Look pages built** (toward the 100-Looks goal): `shop/looks/the-calm-nightstand/` (4 pieces: PoKat lamp, glass carafe, ring dish, donut vase) and `shop/looks/the-layered-living-room/` (5 pieces: bouclé pillows, wool throw, jute rug, oatmeal linen curtains, bouclé lumbar). Both with BreadcrumbList + ItemList JSON-LD, hero scene, product grid, cross-sell, signup.
- **Looks index** 5→7 (JSON-LD numberOfItems + 2 cards); **sitemap** +2 Look URLs.
- **Pinterest plan:** 6 pins queued in `PIN-COPY-NEW-PAGES.md` (W7-1…W7-6) — 2 Look hero anchors (Get the Look board) + 4 product pins (Bedroom/Ceramics/Textiles), each with title, description, hashtags, UTM destination to the new Look pages.
- **Sumi-e print (bedside pos4):** left for the owned Print Collection render (not Amazon).
- Imaging method confirmed reusable for W8+ (per playbook PART 7B).

---

### 2026-05-24 — Search-URL placeholder grind (COO session, in progress)

**Goal:** replace search-URL placeholder affiliate links with browser-verified `/dp/` products. **Adjusted operating rules this session (user, 2026-05-24):** (1) PICTURE-MATCH is the #1 priority — the product must match the committed pin/card image; (2) bar relaxed to **≥4.3★, ≥200 reviews, in stock**, no "Frequently Returned" badge (screenshot-verified); (3) when NO product matches the picture, do NOT force-swap and do NOT generate a one-off replacement image — set the item aside to be **batched into a magazine-quality Look** (one image covers several products). See [[calm-and-oak-workflow]] memory.

**True scope measured:** 75 unique placeholder products across 123 references in shop + journal + index HTML (the "160" figure counts doc-file duplicates too).

**Verified + swapped this session (browser-confirmed via Claude-in-Chrome, screenshot-checked no returns banner):**

1. **Oak dining chairs** → **East West Furniture GRC-OAK-W "Groton", Slat Back Wooden Seat, Set of 2, Oak** (`B00TV45VXC`). 4.6★ / 495 reviews / $154.52 / In Stock / sold by Amazon.com / Overall Pick / no returns flag. Matches pin164 (natural oak, slat back, solid wood seat). Refs updated: `shop/furniture/` (JSON-LD pos 2 + visible card, renamed, fallback-search removed) and `shop/looks/the-evening-dining-table/` (JSON-LD pos 2 + visible card). **4 references cleared.**
2. **Tall dried pampas** → **Bannifll 40" 20-Stem Natural Pampas** (`B0CMD7H1NQ`). 4.7★ / 2,712 reviews / $34.98 / In Stock / ships from Amazon / no returns flag. Matches pin205. Refs updated: `shop/bedroom/`, `shop/looks/quiet-japandi-bedroom/`, `shop/outdoor-wellness/` (incl. the "+outdoor" query variant). **6 references cleared.**
3. **Speckled stoneware bowls** → **LE TAUCI Ceramic Stoneware Bowls, Set of 4** (`B0FFZ61S64`). 4.7★ / 209 reviews / $26.99 / Amazon's Choice / In Stock / ships from Amazon / no returns flag. Reactive speckled-cream glaze + exposed clay rim matches pin172. Ref updated: `shop/decor-accents/` (JSON-LD pos 7 + visible card). **2 references cleared.**
4. **Waffle tea towels** → **Kitinjoy 100% Cotton Waffle Weave Kitchen Towels, Beige, 4-pack** (`B0866GB57R`). 4.5★ / 6,146 reviews / $16.99 / In Stock / ships from Amazon / no returns flag. Beige waffle weave matches pin122. Ref: `shop/japandi-kitchen/` pos 5 (name corrected "linen"→"cotton"). **2 references cleared.**
5. **Walnut cutting board** → **CONSDAN Walnut Cutting Board, 20×15, 1" thick** (`B09Y5VVRPT`). 4.5★ / 381 reviews / $64.99 / In Stock / ships from Amazon / no returns flag. Plain rectangular walnut matches pin179 (name corrected — dropped "oval", board is rectangular). Ref: `shop/japandi-kitchen/` pos 6. **2 references cleared.**
6. **Stoneware espresso/coffee cup + saucer set** → **Gibson Elite Manila Bay 8-Piece Reactive-Glaze Stoneware Set** (`B0GHPWL9GS`). 4.6★ / 4,921 reviews / $23.97 / In Stock / sold by Amazon.com / no returns flag. Reactive earth-tone glaze matches pin91 (name corrected — removed false "hand-thrown" claim). Ref: `shop/japandi-kitchen/` pos 8. **2 references cleared.**

7. **Stacked seagrass storage baskets** → **Nonam Natural Seagrass Bin with Lid, Set of 3** (`B0DQTRHBFY`). 4.5★ / 232 reviews / $35.99 / Amazon's Choice / In Stock / ships from Amazon / no returns flag. Matches the lidded-seagrass-box element in pin154. Ref: `shop/storage/` pos 7 (name corrected "set of 5"→"set of 3"). **2 references cleared.**

8. **Waffle bath towel set (250-bathroom journal)** → **Great Bay Home 100% Cotton 6-Piece Diamond Waffle, Oatmeal** (`B0F4TYC6JY`). 4.3★ / 1,908 reviews / $44.99 / In Stock / ships from Amazon / no returns flag. Matches the (correct) waffle-towels card image. Ref: `journal/250-dollar-bathroom/` pos 1 (name "linen"→"cotton"). **1 reference cleared.**

**Running total: 8 products verified + swapped, 21 references cleared.**

**JOURNAL-PAGE STRUCTURAL FINDING (important):** the journal build-guide product cards mostly use **borrowed/placeholder thumbnail images that do NOT match the product** (e.g. bath-mat card shows a jute runner `day23-pin112-jute-runner.jpg`; reed-diffuser card shows a salt cellar `day18-pin87-salt-cellar.jpg`; robe card shows linen shams). Only the towel-set image was correct. Consequences: (a) a link-only swap on these cards leaves picture≠product, which violates the #1 picture-match rule; (b) commodity items still hit the ≥4.3★/200-review bar inconsistently (e.g. waffle bath mat: best options are 4.7★/30 or 4.1★/426 — no clean match). **Recommendation:** treat the journal build-guides as a dedicated **image + product pass** (or fold their rooms into Looks) rather than link-only grinding. The SHOP pages (outdoor, lighting) still have real matching pin images and remain clean picture-matched swap targets.

**Journal items checked: 250-bathroom** — towel set ✅ (Great Bay Home); bath mat ✗ no ≥4.3★/200+ waffle match (+ wrong image) → image/Look pass; robe, reed diffuser → wrong image, deferred to image pass; marble tray already `/dp/`.

**Confirmed NO qualifying picture-match → LOOK-BATCH candidates (left as honest placeholders; do NOT solo-generate):**

- **Low oak platform bed** (pin204, headboard-free low oak platform): genuine headboard-free oak platforms all <50 reviews; the only high-review option (Plank+Beam 4.3★/1,059) is pecan with a tall panel headboard — wrong silhouette. → feeds a **bedroom Look** (e.g. the Sage Bedroom Look in P2).
- **Oak writing desk** (pin15, warm oak, tapered legs, thin drawer): matching solid-oak desks are 4.3★ but only 6–17 reviews; the high-review option (Nnewvante 4.5★/555) is bamboo with no drawer. → **home-office Look**.
- **Upholstered oak-leg entry bench** (pin162, OPEN-leg cream upholstered bench): high-review option (HomePop Malmo 4.6★/1.7K) is a CLOSED storage box (no open under-space, shoes can't tuck under) — fails the picture. → **entryway Look**.
- **Square linen floor cushion** (pin195, smooth flat cream linen): high-review options (Degrees of Comfort 4.4★/3.5K etc.) are all tufted corduroy — wrong texture. → **Look-batch**.
- **Framed botanical gallery set** (pin157, multi-print neutral art vignette): exact prints not reproducible on Amazon. → **Look-batch / owned Print Collection** cross-sell.
- **Stoneware salt cellar w/ wood lid** (pin87, matte speckled-cream ceramic): high-review options are all polished MARBLE (White Marble 4.7★/293) or acacia — pin is rustic stoneware. → **Look-batch** (tabletop Look). Affects `ceramics-tableware` + `japandi-kitchen` (4 refs).
- **Acacia oval serving tray** (pin19, handle-LESS oval tray): high-review acacia trays all have cut-out handles; handle-less ones are <200 reviews (log flagged this at Pin 19 audit). → **Look-batch**. Affects `decor-accents` + `japandi-kitchen`.
- **Japanese donabe rice pot** (pin81, natural tan clay donabe): the only real donabe is 3.8★/5 reviews; high-review hits are electric rice cookers (wrong product). → **Look-batch** (or drop from kitchen). Affects `japandi-kitchen`.

**Key finding:** fill rate is highly category-dependent. Abundant-on-Amazon-in-this-exact-aesthetic items (dining chairs, pampas, speckled bowls) picture-match cleanly; clean-minimalist hero pieces (beds, desks, smooth-linen, art) are under-represented at 200+ reviews and are better realized as **Looks** (matches the user's batch-into-Looks strategy). Expect a meaningful share of the remaining ~60 placeholders to be Look-batch rather than swaps.

**Not yet processed (continue next):** decor (botanical art, brown bud vase, acacia oval tray, pampas+vase pos1), outdoor-wellness (acacia tray, paper lanterns, teak bench, outdoor pillow, ceramic planter, single lantern), lighting (paper lanterns ×2), ceramics/kitchen (salt cellar, donabe, tea towels, walnut cutting board, espresso cups, acacia breakfast tray), storage (seagrass nesting baskets), and 11 journal build-guide pages (waffle towels, hangers, baskets, mirrors, etc.).

---

### 2026-05-23 — Shop card restyle + 3 new Looks (no new image spend)

**Two things this session, both zero Gemini spend.**

**1. Shop product cards → magazine/editorial format.** CSS-only restyle of `.product` in `assets/css/styles.css` so all 10 shop category pages match the `.section-product` build-guide card aesthetic: borderless cards, softer hover lift + shadow (no terracotta border), italic Cormorant titles, centered meta, terracotta gap-widening CTA. Commit `26be3a8`.

**2. Three new Look pages — built entirely from already-approved products + existing pin images.** No products re-sourced, no pins regenerated. Each Look reuses an existing Template B pin as its hero (resized to 1200×1789, ~120–160KB) and the already-cropped product photos for the cards.

- **The Soft-Lit Reading Nook** (`shop/looks/soft-lit-reading-nook/`) — hero = Pin 37 Nogy floor lamp scene. 5 pieces: Christopher Knight Evelyn chair `B07F266PMS`, fluted oak side table `B0DRHQ1FKP`, Nogy Akari floor lamp `B0DD8CZ28Q`, Longhui throw `B08F48LR45`, Briful vase `B0FT361HDX`.
- **The Evening Dining Table** (`shop/looks/the-evening-dining-table/`) — hero = Pin 42 bamboo dome pendant scene. 5 pieces: Hchunqjor bamboo dome pendant `B0C4XTSZYX`, solid oak dining chairs (search URL), AmorArc stoneware dinnerware `B0CJD73LV6`, stoneware pitcher `B0FQV1Y3PR`, whitewashed vase trio `B0FFMF13MV`.
- **The Entryway, Lit** (`shop/looks/the-lit-entryway/`) — hero = Pin 47 CADUKE sconce scene. 5 pieces: CADUKE plug-in sconce pair `B09BB5MX6B`, slim oak console `B0DH21GJ15`, JONATHAN Y hyacinth basket lamp `B07T81461V`, tall woven basket `B0DHG6PMNM`, acacia tray `B086372L8W`.

Each page: BreadcrumbList + ItemList JSON-LD (validated), hero figure, 5 numbered product cards, "want the rest of the room?" cross-sell, signup. New heroes: `assets/img/looks/{soft-lit-reading-nook,the-evening-dining-table,the-lit-entryway}-pin.jpg`. Index-grid cards reuse the existing `products-cropped` pin crops.

**Surfaces updated:**
- `shop/looks/index.html` — numberOfItems 2→5; 3 new cards.
- `index.html` homepage "Get the Look" grid — 3 new cards (now 5 total).

**Pinterest copy — The Soft-Lit Reading Nook:**
Title: `The soft-lit reading nook — get the look in five pieces`
Tagged topics: `japandi, reading nook, get the look, living room decor, slow living`
```
THE SOFT-LIT READING NOOK

Five pieces, one quiet corner: a linen mid-century chair, a fluted oak side table, an Akari-style paper floor lamp, a cable-knit throw, and one ribbed ceramic vase. The corner you actually read in — not the one you just look at.

#readingnook #getthelook #japandi #livingroomdecor #slowliving #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```
Destination: `https://calmandoak.com/shop/looks/soft-lit-reading-nook/?utm_source=pinterest&utm_medium=pin&utm_campaign=look-reading-nook` · Board: Get the Look (or Living Room)

**Pinterest copy — The Evening Dining Table:**
Title: `The evening dining table — get the look in five pieces`
Tagged topics: `japandi, dining room, get the look, tablescape, slow living`
```
THE EVENING DINING TABLE

Five pieces, one slow dinner: a woven bamboo dome pendant, solid oak chairs, speckled stoneware, a hand-thrown pitcher, and a whitewashed vase trio for the centre. The table that turns dinner into an hour.

#diningroom #getthelook #japandi #tablescape #slowliving #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```
Destination: `https://calmandoak.com/shop/looks/the-evening-dining-table/?utm_source=pinterest&utm_medium=pin&utm_campaign=look-dining-table` · Board: Get the Look (or Ceramics & Tableware)

**Pinterest copy — The Entryway, Lit:**
Title: `The entryway, lit — get the look in five pieces`
Tagged topics: `japandi, entryway decor, get the look, console styling, home organization`
```
THE ENTRYWAY, LIT

Five pieces, one warm welcome: a slim oak console, plug-in linen swing-arm sconces, a hyacinth basket lamp, a tall woven basket, and an acacia catch-all tray. The first thing you see, finally finished.

#entryway #getthelook #japandi #consolestyling #homeorganization #affiliate

(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)
```
Destination: `https://calmandoak.com/shop/looks/the-lit-entryway/?utm_source=pinterest&utm_medium=pin&utm_campaign=look-entryway` · Board: Get the Look (or Furniture)

---

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
