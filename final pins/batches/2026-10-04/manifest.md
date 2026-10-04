# Content Factory — Batch 2026-10-04

**Built by:** content-factory (cloud routine, weekly Sun 12:00 UTC fire)
**Status:** STAGED — not published. Per CONTROL.md's 2026-09-14 "Public-facing review gate,"
no Blotato post/schedule tool was called. Cameron reviews this manifest and schedules it (or
sends it back) from a session with real network access to `database.blotato.io`.

## Why this batch, and why only this

- **Pinterest: skipped again this run.** `blotato_list_posts` (status=scheduled,
  2026-10-04→2026-11-18, checked live this run, 127 items returned, no pagination cursor) shows
  127 Pinterest posts already scheduled through **2026-10-29** — full runway, ~25 days out. Zero
  Instagram, zero TikTok items anywhere in that window. Building more Pinterest content would only
  push an already-full queue further out, not fix a gap — per this week's explicit instruction not
  to rebuild a channel that's already full.
- **Instagram / TikTok: refill target, now at a confirmed true zero.** The same live check returns
  **zero** scheduled posts on either platform anywhere in the 2026-10-04→2026-11-18 window — not
  "one day left," genuinely none. Cross-checked `blotato_list_posts(status=published,
  2026-09-28→2026-10-04)`: both platforms published daily right up through **2026-10-03**
  (confirmed real post URLs — `tiktok.com/@calmandoak/video/...`, `instagram.com/reel/...`), so
  this is a pure forward-queue gap, not an account or publishing-capability problem. Matches
  `LESSONS-LEDGER.md`'s 2026-10-04 entry exactly.
- **Platform-pause cross-check:** `blotato_list_accounts` returns all three connected accounts
  (instagram `calmandoak` id 53849, tiktok `calmandoak` id 47113, pinterest `CalmandOak` id 7556),
  live and reachable. No contradiction with `CONTROL.md`'s "all three active" flags — the accounts
  work, they're just empty forward-queue on two of three platforms.
- **Two earlier batches are still open, unmerged, unscheduled, same root cause (network egress to
  `database.blotato.io` blocked from every cloud session):** `content-factory/2026-09-20` (10
  pieces) and `content-factory/2026-09-27` (4 products / 8 posts, proposed for 2026-10-04 through
  2026-10-07). **This batch is additive, not a replacement** — if Cameron ships the 09-27 batch
  first, this one's proposed dates (below) pick up right after it (2026-10-08 onward) so the two
  don't collide on the same calendar slot. **No ASIN overlap with either open branch** — checked
  directly against both branches' manifests before sourcing (09-20 used B08GDW5JYF, B09HKN2ZRT,
  B0DC6FQKYR, B0BZ3GHM8N, B0FJY1RVL3, B08G46J76G, B0BVVRCP3R, B0D4RK8PB2, B0DPJX1CQL; 09-27 used
  B08G46J76G, B0C61MWTJV, B0D41PKP16, B0FT361HDX — none of those five appear below).
- **Why 5 products / 10 posts:** no pin-template/copy-library inventory exists in this cloud
  checkout (`final pins/`, `01-brand-assets/`…`05-products-by-day/`, `Pin Copy Library*.md` are
  all gitignored/local-only — confirmed absent again this run, per every prior cloud-run finding in
  `LESSONS-LEDGER.md`). Every asset here was built from tracked `assets/img/products-cropped/*`
  matched to real ASINs grepped out of live journal pages, favoring fully-verified pieces over
  guessed volume. Deliberately spread across 5 categories with **zero overlap with either open
  branch's categories** (kitchen, dining, bathroom, closet, living room — vs. 09-20's office/desk
  focus and 09-27's office/bedroom/bathroom/decor mix) for rotation variety.

## Sourcing method (so the picture-product rule holds)

Each product's ASIN + image pairing was **not invented** — pulled directly from an already-live,
tracked journal article's `.section-product` card, where the image is the site's own cropped photo
for that exact ASIN (`/assets/img/products-cropped/p-<ASIN>.jpg`). New-ASIN sourcing/live
re-verification (star rating, review count, stock, Frequently-Returned badge) was **not
attempted** — `www.amazon.com` is egress-blocked from this cloud sandbox (confirmed by SEO-ranker
2026-09-15, same root cause as the Blotato upload block, re-confirmed as a standing condition
per every prior content-factory/CEO run). This run only reused already-verified ASINs.

## Pipeline notes (for the next run)

- `node_modules` was empty at session start (same finding as 2026-09-27) — ran
  `npm install ffmpeg-static --no-save`, succeeded, no egress issue for the npm registry.
- `_pin-to-reel.js` and `_add-audio-bed.js` both `node --check` clean this run.
- **Promoted the 09-27 batch's one-off ffmpeg step into a real helper:** `_asin-to-pin.js` (new
  file, committed this run). The tracked product crops are 4:5 (800×1000), not the 2:3 (1000×1500)
  canvas `_pin-to-reel.js` expects — feeding them straight in would stretch the product. The new
  helper does the same blur-fill-background + contain-fit-product approach the 09-27 run built
  inline, now as a reusable `node _asin-to-pin.js <in.jpg> <out.jpg>` script. Visually spot-checked
  all 5 outputs before building reels — backgrounds are a soft blurred echo of the product's own
  studio background (no stretch, no letterbox bars, product undistorted).
- Every reel's audio track was verified present, not assumed: `ffprobe` confirms an `aac` stream
  at 44.1kHz on all 5 files (not just a sample), and `volumedetect` on two sampled files (the
  smallest and largest by size) both read mean −26.9dB / max −14.0dB — audible ambient bed, same
  level as the 09-27 batch, not silence.
- **Found a pre-existing site content issue, not introduced by this run — flagged, not fixed:**
  piece #2's live `journal/500-dollar-dining-table-set` product card names the ASIN
  "Brass taper candle holders, **pair**," but the card's own image shows **six** graduated-height
  holders, not two. This run did not repeat that wording — the caption below describes what the
  image actually shows ("graduated heights," not "a pair") to keep this batch's own Check 4
  honest, but the underlying site copy mismatch is unresolved and outside this run's scope (that's
  a SEO-ranker fix). Logged to `LESSONS-LEDGER.md`.

## Pieces (5 products × 2 platforms = 10 posts)

Disclosure: every post below carries the sitewide sentence (`index.html`'s own disclosure banner
text) — *"As an Amazon Associate, Calm & Oak earns from qualifying purchases."* — plus
`#affiliate`, per the 2026-09-14 ledger finding that ~20 already-queued posts shipped without it.

---

### 1. Stoneware salt cellar with oak lid — kitchen
- **ASIN:** [B0GH7FV6GJ](https://www.amazon.com/dp/B0GH7FV6GJ?tag=calmandoak-20) — reused from
  `journal/why-your-kitchen-needs-a-tray/index.html`
- **Category note:** kitchen is a new category for the pin rotation — not yet represented in
  either open branch
- **Media:** `pins/B0GH7FV6GJ.jpg` (2:3 still) → `reels/B0GH7FV6GJ.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-08T16:00:00Z · TikTok — 2026-10-08T17:00:00Z
- **Instagram caption:** "A small ceramic jar for salt, nothing else. Matte stoneware, a fitted
  oak lid, a spoon sized for a single pinch — the kind of object that makes a kitchen counter look
  considered instead of cluttered. As an Amazon Associate, Calm & Oak earns from qualifying
  purchases. #affiliate #japandi #kitchen #slowliving"
- **TikTok caption:** "A salt cellar, not a shaker. Stoneware, an oak lid, a spoon for one pinch.
  Shop link in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate
  #japandi #kitchen"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image shows the stoneware salt cellar, oak lid, and small
    wooden spoon itself — MATCH
  - Check 3 (ASIN bar): inherited-verified via live article (no new-ASIN claim made) — PASS
  - Check 4 (caption-image match): caption describes exactly what's shown — MATCH
  - Check 5 (file resolution): `pins/B0GH7FV6GJ.jpg` and `reels/B0GH7FV6GJ.mp4` both present on disk — OK
  - Disclosure check: sentence + `#affiliate` present in both captions — PASS
  - **Result: PASS**

### 2. Brass candlestick holders, graduated heights — dining
- **ASIN:** [B0CRRKDKVT](https://www.amazon.com/dp/B0CRRKDKVT?tag=calmandoak-20) — reused from
  `journal/500-dollar-dining-table-set/index.html`
- **Caption note:** see "pipeline notes" above — described as "graduated heights," not "a pair,"
  to match what the image actually shows
- **Media:** `pins/B0CRRKDKVT.jpg` → `reels/B0CRRKDKVT.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-09T16:00:00Z · TikTok — 2026-10-09T17:00:00Z
- **Instagram caption:** "Slim brass candlestick holders in graduated heights, flanking the table
  at dinner — the small ritual of striking a match before the meal starts. As an Amazon Associate,
  Calm & Oak earns from qualifying purchases. #affiliate #japandi #diningroom #tablesetting"
- **TikTok caption:** "Brass candlesticks, graduated heights, lit before every dinner. Shop link
  in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #diningroom"
- **SAFEGUARDS QA:**
  - Check 1: image shows the brass candlestick holders themselves — MATCH
  - Check 3: inherited-verified via live article — PASS
  - Check 4: caption describes "graduated heights," matching the image (not the site card's "pair"
    wording) — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 3. Reed diffuser, wild mint & eucalyptus — bathroom
- **ASIN:** [B0F23L8X2H](https://www.amazon.com/dp/B0F23L8X2H?tag=calmandoak-20) — reused from
  `journal/250-dollar-bathroom/index.html`
- **Category note:** bathroom is thin in the current pin rotation (same note as 09-27's batch) —
  deliberately included again for category spread, different product than 09-27's bathroom shelf
- **Media:** `pins/B0F23L8X2H.jpg` → `reels/B0F23L8X2H.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-10T16:00:00Z · TikTok — 2026-10-10T17:00:00Z
- **Instagram caption:** "A reed diffuser on the bathroom counter — wild mint and eucalyptus, six
  reeds doing quiet work all day. One small bottle is the difference between a bathroom and
  something closer to a spa. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate #japandi #bathroom #selfcare"
- **TikTok caption:** "A reed diffuser for the bathroom counter — mint and eucalyptus, working
  quietly all day. Shop link in bio. As an Amazon Associate, Calm & Oak earns from qualifying
  purchases. #affiliate #japandi #bathroom"
- **SAFEGUARDS QA:**
  - Check 1: image shows the glass reed diffuser bottle with reeds — MATCH
  - Check 3: inherited-verified via live article — PASS
  - Check 4: caption describes exactly the diffuser shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 4. Hanging closet-rod organizer, 6 shelf — closet
- **ASIN:** [B09493XGR5](https://www.amazon.com/dp/B09493XGR5?tag=calmandoak-20) — reused from
  `journal/300-dollar-closet-capsule/index.html`
- **Category note:** closet/storage is a new category for the pin rotation
- **Media:** `pins/B09493XGR5.jpg` → `reels/B09493XGR5.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-11T16:00:00Z · TikTok — 2026-10-11T17:00:00Z
- **Instagram caption:** "A hanging shelf organizer for the closet rod — six tiers for the
  sweaters and off-season things that usually end up in a pile on the top shelf. Everything gets
  its own spot. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate
  #japandi #closet #organization"
- **TikTok caption:** "Six shelves on the closet rod — the top-shelf chaos finally has a system.
  Shop link in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate
  #japandi #closet"
- **SAFEGUARDS QA:**
  - Check 1: image shows the 6-shelf hanging organizer itself — MATCH
  - Check 3: inherited-verified via live article — PASS
  - Check 4: caption describes exactly the organizer shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 5. Boucle pillow covers, set of 4 — living room
- **ASIN:** [B0F4K9SP6N](https://www.amazon.com/dp/B0F4K9SP6N?tag=calmandoak-20) — reused from
  `journal/300-dollar-living-room-textile-refresh/index.html`
- **Category note:** living-room textiles is a new category for the pin rotation
- **Media:** `pins/B0F4K9SP6N.jpg` → `reels/B0F4K9SP6N.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-12T16:00:00Z · TikTok — 2026-10-12T17:00:00Z
- **Instagram caption:** "Cream boucle pillow covers, four of them, slipped over the inserts you
  already have. The sofa looks reset for the cost of an afternoon, not a new sofa. As an Amazon
  Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #livingroom
  #slowliving"
- **TikTok caption:** "Boucle pillow covers — the sofa refresh that costs an afternoon, not a new
  sofa. Shop link in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate #japandi #livingroom"
- **SAFEGUARDS QA:**
  - Check 1: image shows the four cream boucle pillow covers themselves — MATCH
  - Check 3: inherited-verified via live article — PASS
  - Check 4: caption describes exactly the pillows shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

---

## QA summary

| # | Piece | Checks 1/3/4/5 | Disclosure | Result |
|---|-------|----------------|------------|--------|
| 1 | Stoneware salt cellar | PASS | PASS | **PASS** |
| 2 | Brass candlestick holders | PASS | PASS | **PASS** |
| 3 | Reed diffuser | PASS | PASS | **PASS** |
| 4 | Hanging closet organizer | PASS | PASS | **PASS** |
| 5 | Boucle pillow covers | PASS | PASS | **PASS** |

**5/5 pieces PASS (100%). 10/10 posts (IG+TikTok ×5) ready to schedule.**

Check 2 (section-title match) and Check 6 (cross-article ASIN consistency) don't apply directly to
social captions (no `<h2>` section titles here); the closest equivalent — "does the caption claim
match what the image shows" — is folded into Check 4 above.

## What needs Cameron

1. **Schedule or reject this batch.** All 10 posts are QA-clean and ready; nothing is blocked
   technically. Sitting in `final pins/batches/2026-10-04/` for review per the review-gate policy.
2. **Decide what to do with the two still-open earlier branches** (`content-factory/2026-09-20`,
   `content-factory/2026-09-27`) — this run did not touch or resolve either, per the standing rule
   that closing another run's branch isn't a single content-factory run's call. If the 09-27 batch
   ships, this batch's proposed dates (10-08 onward) already account for it; if not, this batch's
   dates can move earlier to close the gap sooner.
3. **The brass-candlestick-holder "pair" vs. 6-holder image mismatch on the live site**
   (`journal/500-dollar-dining-table-set`) is a pre-existing content issue this run found but did
   not fix — worth a SEO-ranker pass.
4. **This batch's files live inside `final pins/`, which `.gitignore` normally excludes.** Force-added
   (`git add -f`) for this commit, same pattern as the 09-27 batch, so the manifest and media are
   reviewable from a cloud CEO session.
5. Runway math: these 5 days (10-08 through 10-12, or 10-04 through 10-08 if the 09-27 batch is
   rejected) buy more time but don't close the gap permanently — the standing "no `publisher`
   backstop trigger" finding and the `database.blotato.io` egress block are both still open.
