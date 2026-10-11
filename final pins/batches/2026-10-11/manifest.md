# Content Factory — Batch 2026-10-11

**Built by:** content-factory (cloud routine, weekly fire)
**Status:** STAGED — not published. Per `CONTROL.md`'s 2026-09-14 "Public-facing review gate,"
no Blotato post/schedule tool was called. Cameron reviews this manifest and schedules it (or
sends it back) from a session with real network access to `database.blotato.io`.

## Why this batch, and why only this

- **Pinterest: skipped again this run.** `blotato_list_posts` (status=scheduled,
  2026-10-11→2026-11-25, checked live this run) returns 100+ Pinterest items scheduled through
  **2026-10-29** — full runway, ~18 days out. Building more Pinterest content would only push an
  already-full queue further out, not fix a gap — per this week's explicit instruction not to
  rebuild a channel that's already full.
- **Instagram / TikTok: refill target, still at a confirmed true zero.** The same live check
  (`status=scheduled`, 2026-10-11→2026-11-25, no platform filter) returns **zero** Instagram and
  **zero** TikTok items anywhere in that window — every item returned was Pinterest. Cross-checked
  `blotato_list_posts(status=published, 2026-10-04→2026-10-11)`: one IG post and one TikTok post
  did publish on 2026-10-06 (both "Orchard," the shop.calmandoak.com apparel line, via a Cameron
  device reconnect per `LESSONS-LEDGER.md`'s 2026-10-06/07/08 entries) — nothing since. This
  matches the standing root cause (no cloud session can reach `database.blotato.io` to upload new
  media) exactly; it is not a new finding.
- **Platform-pause cross-check:** `blotato_list_accounts` returns all three connected accounts
  live and reachable (instagram `calmandoak` id 53849, tiktok `calmandoak` id 47113, pinterest
  `CalmandOak` id 7556). No contradiction with `CONTROL.md`'s "all three active" flags — the
  accounts work; Instagram/TikTok are just empty on forward-queue, which is an upload-access
  problem, not a pause-flag problem.
- **Three earlier batches are still open, unmerged, unscheduled, same root cause:**
  `content-factory/2026-09-20` (10 pieces), `content-factory/2026-09-27` (4 products / 8 posts),
  and `content-factory/2026-10-04` (5 products / 10 posts). None of their ASINs or categories
  appear to have shipped — `blotato_list_posts(status=published)` shows no matching product posts
  on IG/TikTok since 2026-10-03, only the one 2026-10-06 Orchard pair. **This batch is additive,
  not a replacement.** **No ASIN overlap with any of the three open branches** — checked directly
  against each branch's manifest before sourcing (excluded: B08GDW5JYF, B09HKN2ZRT, B0DC6FQKYR,
  B0BZ3GHM8N, B0FJY1RVL3, B08G46J76G, B0BVVRCP3R, B0D4RK8PB2, B0DPJX1CQL, B0C61MWTJV, B0D41PKP16,
  B0FT361HDX, B0GH7FV6GJ, B0CRRKDKVT, B0F23L8X2H, B09493XGR5, B0F4K9SP6N — none of those 17 appear
  below).
- **Why 5 products / 10 posts:** no pin-template/copy-library inventory exists in this cloud
  checkout (`final pins/`'s prior contents, `01-brand-assets` through `05-products-by-day`, and
  `Pin Copy Library*.md` are all gitignored/local-only — confirmed absent again this run, per
  `LESSONS-LEDGER.md`'s 2026-09-14 finding). Every asset here was built from tracked
  `assets/img/products-cropped/*` matched to real ASINs grepped out of live journal/shop pages,
  reused rather than invented. Deliberately spread across 5 **new** categories with zero overlap
  with the three open branches' categories (patio/outdoor, entryway, reading-nook/living,
  bedroom/bedding, lighting — vs. 09-20's office/desk, 09-27's office/bedroom/bathroom/decor, and
  10-04's kitchen/dining/bathroom/closet/living-room) for rotation variety.

## Sourcing method (so the picture-product rule holds)

Each product's ASIN + image pairing was **not invented** — grepped directly out of an
already-live, tracked journal/shop page's product card, where the image is the site's own cropped
photo for that exact ASIN (`/assets/img/products-cropped/p-<ASIN>.jpg`). New-ASIN sourcing / live
re-verification (star rating, review count, stock, Frequently-Returned badge) was **not
attempted** — `www.amazon.com` is egress-blocked from this cloud sandbox (standing condition per
every prior content-factory/CEO run). Every image was **visually opened and compared against its
linked product's name/alt text** before use (SAFEGUARDS Check 1), not just grepped — see the
per-piece QA below. One ASIN (`B07F266PMS`, the linen accent chair) carries an old
`PRODUCT-CHANGES-LOG.md` audit note ("🟡 Pending — verify product photo," dated 2026-05-14,
referring to a Pinterest pin, not the journal card used here) — opened and re-checked directly
this run: the image clearly shows an oatmeal-linen tufted accent chair on wood legs, matching the
card's own "Linen accent chair with oak legs" name exactly. Treating that old pending flag as
resolved for this batch's own use; it's still open as a general housekeeping item (see "what needs
Cameron" below).

## Pipeline notes (for the next run)

- `node_modules` was empty at session start (same finding as every prior content-factory run) —
  ran `npm install ffmpeg-static --no-save`, succeeded, no egress issue for the npm registry.
- **`_asin-to-pin.js` (the 4:5-crop → 2:3-pin-canvas helper, "promoted" in the 2026-10-04 batch's
  manifest) was never actually on `main` or any branch but `content-factory/2026-10-04` itself —
  content-factory batches don't get merged (unlike seo-ranker's PR-gated commits), so the
  promotion didn't persist.** Pulled the file back out of `origin/content-factory/2026-10-04` this
  run and copied it into this branch so the pipeline could run at all. Logged as a ledger entry
  below — worth Cameron deciding whether this helper (and any future one a content-factory run
  writes) should land on `main` directly rather than living only inside a batch branch nobody
  merges.
- `_pin-to-reel.js` and `_add-audio-bed.js` both `node --check` clean this run (per this week's
  explicit instruction to verify before relying on `_add-audio-bed.js`).
- All 5 pins built via `_asin-to-pin.js` (blur-fill-background + contain-fit-product, 1000×1500).
  Visually spot-checked all 5 outputs before building reels — no stretch, no letterbox bars,
  product undistorted. One source crop (`B0GGB15KZ3`) is a 1500×1500 square rather than the usual
  4:5 — the helper handled it the same way, correctly contain-fit into the 2:3 canvas.
- **Audio verified present on every reel, not assumed:** `ffprobe` confirms an `aac` stream at
  44.1kHz/mono on all 5 files (not just a sample). `volumedetect` run on the smallest and largest
  files by size both read mean −26.9dB / max −14.0dB — audible ambient bed, matching the level
  logged in the 2026-10-04 batch, not silence.

## Pieces (5 products × 2 platforms = 10 posts)

Disclosure: every post below carries the sitewide sentence (`index.html`'s own disclosure banner
text) — *"As an Amazon Associate, Calm & Oak earns from qualifying purchases."* — plus
`#affiliate`, per the 2026-09-14 ledger finding that a sample of already-queued posts shipped
without it.

---

### 1. Round teak patio table — outdoor
- **ASIN:** [B07CGZN4QP](https://www.amazon.com/dp/B07CGZN4QP?tag=calmandoak-20) — reused from
  `journal/400-dollar-patio-dining/index.html` ("Christopher Knight Carina round teak table")
- **Category note:** outdoor/patio is a new category for the pin rotation — not represented in any
  open branch
- **Media:** `pins/B07CGZN4QP.jpg` (2:3 still) → `reels/B07CGZN4QP.mp4` (1080×1920, 12s, AAC audio
  confirmed)
- **Proposed schedule:** Instagram — 2026-10-12T16:00:00Z · TikTok — 2026-10-12T17:00:00Z
- **Instagram caption:** "A round teak table for the patio, nothing else needed. Solid wood, not
  aluminum dressed up to look like it — the kind of outdoor piece that ages to silver-grey instead
  of falling apart by year two. As an Amazon Associate, Calm & Oak earns from qualifying
  purchases. #affiliate #japandi #outdoorliving #patio"
- **TikTok caption:** "A teak patio table, solid wood, built to weather. Shop link in bio. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #outdoorliving"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image opened and compared — shows the round teak table
    itself, three-leg base, cross-stretcher — MATCH
  - Check 3 (ASIN bar): inherited-verified via live article (no new-ASIN claim made) — PASS
  - Check 4 (caption-image match): caption describes exactly what's shown — MATCH
  - Check 5 (file resolution): `pins/B07CGZN4QP.jpg` and `reels/B07CGZN4QP.mp4` both present on
    disk — OK
  - Disclosure check: sentence + `#affiliate` present in both captions — PASS
  - **Result: PASS**

### 2. Tall wicker floor basket — entryway
- **ASIN:** [B085LTJM3D](https://www.amazon.com/dp/B085LTJM3D?tag=calmandoak-20) — reused from
  `journal/300-dollar-entryway/index.html` ("Household Essentials Tall Natural Wicker Floor
  Basket")
- **Category note:** entryway is a new category for the pin rotation
- **Media:** `pins/B085LTJM3D.jpg` → `reels/B085LTJM3D.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-13T16:00:00Z · TikTok — 2026-10-13T17:00:00Z
- **Instagram caption:** "A tall wicker basket by the door — the whole discipline of a calm
  entryway in one object. Shoes go in, shoes get pulled out Monday morning. As an Amazon
  Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #entryway
  #slowliving"
- **TikTok caption:** "One wicker basket, by the door, every pair of shoes in its place. Shop link
  in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #entryway"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the tall natural wicker basket with handles itself
    — MATCH
  - Check 3: inherited-verified via live article — PASS
  - Check 4: caption describes exactly the basket shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 3. Linen accent chair with oak legs — reading nook
- **ASIN:** [B07F266PMS](https://www.amazon.com/dp/B07F266PMS?tag=calmandoak-20) — reused from
  `journal/400-dollar-reading-nook/index.html` ("Linen accent chair with oak legs")
- **Category note:** reading-nook/living is a new category for the pin rotation; see "sourcing
  method" above for the old pending-audit note on this ASIN, re-checked and cleared this run
- **Media:** `pins/B07F266PMS.jpg` → `reels/B07F266PMS.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-14T16:00:00Z · TikTok — 2026-10-14T17:00:00Z
- **Instagram caption:** "A linen accent chair with oak legs, deep enough to tuck your feet up,
  low enough arms to actually read in. The corner that makes staying in feel like a decision, not
  a default. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate
  #japandi #readingnook #livingroom"
- **TikTok caption:** "The reading chair that doesn't betray your spine after thirty minutes. Shop
  link in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate
  #japandi #readingnook"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows an oatmeal-linen tufted accent chair on wood legs,
    matching "linen accent chair with oak legs" exactly — MATCH (old pending audit note re-checked
    and cleared, see sourcing method above)
  - Check 3: inherited-verified via live article — PASS
  - Check 4: caption describes exactly the chair shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 4. Cotton waffle-weave duvet cover — bedroom
- **ASIN:** [B0GGB15KZ3](https://www.amazon.com/dp/B0GGB15KZ3?tag=calmandoak-20) — reused from
  `journal/best-linen-bedding/index.html` ("Cotton waffle-weave duvet cover — the softer
  alternative")
- **Category note:** bedding is distinct from the "bedroom" category already used in 09-27 (that
  batch's bedroom piece was a different product type) — included for rotation depth, not a repeat
- **Media:** `pins/B0GGB15KZ3.jpg` → `reels/B0GGB15KZ3.mp4` (1080×1920, 12s, AAC audio confirmed).
  Source crop is a 1500×1500 square (not the usual 4:5) — `_asin-to-pin.js` still contain-fit it
  cleanly into the 2:3 canvas with no stretch.
- **Proposed schedule:** Instagram — 2026-10-15T16:00:00Z · TikTok — 2026-10-15T17:00:00Z
- **Instagram caption:** "A cotton waffle-weave duvet cover, the softer route to a textured,
  natural-looking bed. Breathable, machine-washable, photographs like it costs twice what it
  does. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #bedroom #linenbedding"
- **TikTok caption:** "Waffle-weave cotton, not linen — the budget-friendly way to a textured bed.
  Shop link in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate
  #japandi #bedroom"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the waffle-weave duvet/cover draped on the bed,
    matching the article's own card image for this ASIN — MATCH
  - Check 3: inherited-verified via live article — PASS
  - Check 4: caption describes exactly the waffle-weave texture and cotton (not linen) material
    shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 5. Rice paper pendant lamp, set of 2 — lighting
- **ASIN:** [B0CRTNWCV9](https://www.amazon.com/dp/B0CRTNWCV9?tag=calmandoak-20) — reused from
  `shop/lighting/index.html` ("Rice paper pendant lamp, set of 2")
- **Category note:** lighting is a new category for the pin rotation
- **Media:** `pins/B0CRTNWCV9.jpg` → `reels/B0CRTNWCV9.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-16T16:00:00Z · TikTok — 2026-10-16T17:00:00Z
- **Instagram caption:** "Two rice paper pendants, hung low, the softest light a room can hold. No
  cold overhead glare — just warm paper glow doing all the work after dark. As an Amazon
  Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #lighting
  #ambientlight"
- **TikTok caption:** "Rice paper pendants — the warmest light switch you'll ever flip. Shop link
  in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #lighting"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the two rice-paper pendant lamps themselves, lit —
    MATCH
  - Check 3: inherited-verified via live article — PASS
  - Check 4: caption describes exactly the pendants shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

---

## QA summary

| # | Piece | Checks 1/3/4/5 | Disclosure | Result |
|---|-------|----------------|------------|--------|
| 1 | Round teak patio table | PASS | PASS | **PASS** |
| 2 | Tall wicker floor basket | PASS | PASS | **PASS** |
| 3 | Linen accent chair, oak legs | PASS | PASS | **PASS** |
| 4 | Cotton waffle-weave duvet cover | PASS | PASS | **PASS** |
| 5 | Rice paper pendant lamp, set of 2 | PASS | PASS | **PASS** |

**5/5 pieces PASS (100%). 10/10 posts (IG+TikTok ×5) ready to schedule.**

Check 2 (section-title match) and Check 6 (cross-article ASIN consistency) don't apply directly to
social captions (no `<h2>` section titles here); the closest equivalent — "does the caption claim
match what the image shows" — is folded into Check 4 above.

## What needs Cameron

1. **Schedule or reject this batch.** All 10 posts are QA-clean and ready; nothing is blocked
   technically. Sitting in `final pins/batches/2026-10-11/` for review per the review-gate policy.
2. **Four open content-factory branches now, not three** (`2026-09-20`, `2026-09-27`, `2026-10-04`,
   and this one, `2026-10-11`). None have shipped per live `blotato_list_posts` data this run
   (only the one 2026-10-06 Orchard pair, from a device reconnect, published on IG/TikTok since
   10-03). This run did not touch or resolve any of the three earlier branches — if several ship
   at once, their proposed dates will need manual deconfliction; this batch's own dates
   (2026-10-12 through 2026-10-16) assume it ships alone or first.
3. **`_asin-to-pin.js` needs a home on `main`, not just inside batch branches.** It was "promoted"
   in the 2026-10-04 manifest but only ever committed to that batch's own branch, which (like this
   one) isn't merged — so the promotion silently didn't persist, and this run had to re-pull it
   from the old branch to use it at all. Worth either merging it to `main` directly (it's a
   build-time tool, not public-facing content, so the review-gate rationale for staging social
   output doesn't obviously apply to it) or explicitly deciding it should keep living
   branch-by-branch.
4. **The old `PRODUCT-CHANGES-LOG.md` pending-audit flag on `B07F266PMS`** ("verify product
   photo," 2026-05-14) was re-checked directly this run and the image clearly matches the
   product — worth a SEO-ranker pass to close that row in the status board rather than leave it
   permanently pending.
5. **This batch's files live inside `final pins/`, which `.gitignore` normally excludes.**
   Force-added (`git add -f`) for this commit, same pattern as every prior batch, so the manifest
   and media are reviewable from a cloud CEO session.
6. Runway math: these 5 days (10-12 through 10-16) buy more time on IG/TikTok but don't close the
   gap permanently — the standing "no `publisher` backstop trigger" finding and the
   `database.blotato.io` egress block are both still open, now compounding across a 4th
   unscheduled batch.
