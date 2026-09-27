# Content Factory — Batch 2026-09-27

**Built by:** content-factory (cloud routine, weekly Sun 12:00 UTC fire)
**Status:** STAGED — not published. Per CONTROL.md's 2026-09-14 "Public-facing review gate,"
no Blotato post/schedule tool was called. Cameron reviews this manifest and schedules it (or
sends it back) from a session with real network access.

## ⚠ Overlap with the still-open `content-factory/2026-09-20` branch

Found after this batch was already built: an earlier, still-unmerged batch on branch
`content-factory/2026-09-20` (`final pins/batches/2026-09-20/MANIFEST.md`, 10 pieces, 10/10 PASS)
**also includes piece #6, the exact same ASIN as this batch's piece #1** —
[B08G46J76G](https://www.amazon.com/dp/B08G46J76G?tag=calmandoak-20), the IOTXY walnut writing
desk. That branch has sat open since 2026-09-20 and multiple CEO briefings (09-25 through 09-27)
have recommended closing it as safe-to-close without getting Cameron's sign-off to actually do so.
**Do not schedule both batches' walnut-desk piece — pick one.** If `content-factory/2026-09-20` is
closed per the standing recommendation, this batch's piece #1 stands as-is. If that branch is kept
instead, drop this batch's piece #1 and this becomes a 3-product/6-post batch. Not resolving this
myself — closing another run's open branch is outside what a single content-factory run should
decide unilaterally. Flagged in `TEAM-LOG.md` and `LESSONS-LEDGER.md` too.

## Why this batch, and why only this

- **Pinterest: skipped this run.** `blotato_list_posts` (checked live this run) shows 162
  Pinterest posts already scheduled through **2026-10-29** — full runway, well outside the
  refill window. Building more would only push the queue further out, not fix a gap.
- **Instagram / TikTok: refill target.** Same live check shows only **7 scheduled on each**,
  ending **2026-10-03**. Every one of those 7 is Cameron's own Japanese-folklore apparel line
  (dragon/tiger/kitsune/etc. — confirmed via caption text, matches his 2026-09-25 confirmation
  in `LESSONS-LEDGER.md` that this is his own work, not the content-factory pipeline). So this
  isn't a duplicate-content risk — the apparel line and this home-goods batch are genuinely
  different content sharing the same two accounts. This batch picks up the day after that queue
  ends (2026-10-04) and carries 4 days forward.
- **Why only 4 products / 8 posts, not the larger prior batch (12):** no pin-template/copy-library
  inventory exists in this cloud checkout (`final pins/`, `01-brand-assets/`…`05-products-by-day/`,
  `Pin Copy Library*.md` are all gitignored/local-only — confirmed absent again this run, matches
  every prior cloud-run finding in `LESSONS-LEDGER.md`). Every asset here was built from scratch
  from tracked `assets/img/products-cropped/*` + real ASINs grepped out of live journal pages,
  favoring fewer, fully-verified pieces over a larger batch of guesses.

## Sourcing method (so the picture-product rule holds)

Each product's ASIN + image pairing was **not invented** — it was pulled directly from an
already-live, already-SAFEGUARDS-passed journal article's `.section-product` card, where the
image is a cropped photo of that exact ASIN (`/assets/img/products-cropped/p-<ASIN>.jpg`). That
means the image↔product identity was already established and shipped once; this batch reuses it
rather than re-deriving it. New-ASIN sourcing/live verification (star rating, review count, stock,
Frequently-Returned badge) was **not attempted** — `www.amazon.com` is egress-blocked from this
cloud sandbox (confirmed by SEO-ranker 2026-09-15, same root cause as the Blotato upload block).
Per the 2026-09-15 ledger entry's candidate rule, this run only reused already-verified ASINs.

## Pipeline notes (for the next run)

- `node_modules` was empty at session start (`ffmpeg-static` not installed despite being in
  `package.json`) — ran `npm install ffmpeg-static --no-save` this run, succeeded, no egress
  issue for the npm registry itself.
- `_pin-to-reel.js` and `_add-audio-bed.js` both `node --check` clean this run (the 2026-09-14
  truncation bug is fixed at HEAD).
- **New step this run, not in either script:** the tracked fallback images
  (`assets/img/products-cropped/*`) are 4:5 (800×1000) product photos, not the 2:3 (1000×1500)
  pin canvas `_pin-to-reel.js` expects. Feeding a 4:5 image straight into it would **stretch**
  the product photo to fit 2:3 and distort it. Built a small intermediate step (ffmpeg
  scale+crop+blur background, product photo `contain`-fit and centered, no stretch — see
  `pins/*.jpg` for the result) to produce a proper 2:3 pin first. Recommend promoting this into
  a real `_asin-to-pin.js` helper so future runs don't re-derive it.
- Every reel's audio track was verified present (not assumed) via `ffprobe`/`ffmpeg -i` stream
  listing (AAC, 44.1kHz, confirmed on all 4) **and** `volumedetect` (mean −26.9dB / max −14.0dB
  on the sampled file — audible ambient bed, not silence).

## Pieces (4 products × 2 platforms = 8 posts)

Disclosure: every post below carries the sitewide sentence (`index.html`'s own `.disclosure`
banner text) — *"As an Amazon Associate, Calm & Oak earns from qualifying purchases."* — plus
`#affiliate`, per the 2026-09-14 ledger finding that ~20 already-queued posts shipped without it.

---

### 1. IOTXY solid-wood writing desk, walnut — office
- **ASIN:** [B08G46J76G](https://www.amazon.com/dp/B08G46J76G?tag=calmandoak-20) — reused from
  `journal/best-japandi-desks/index.html` ("best overall" pick)
- **Category weight:** office cluster is GROWTH-PLAN-90-DAY.md's #1 priority
- **Media:** `pins/B08G46J76G.jpg` (2:3 still) → `reels/B08G46J76G.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram Reel — 2026-10-04T16:00:00Z · TikTok — 2026-10-04T17:00:00Z
  (continues the existing daily 16:00/17:00 UTC slot pattern already in the live queue)
- **Instagram caption:** "A desk that reads as furniture, not equipment. Solid walnut, slim
  tapered legs, room for one lamp and nothing else — the kind of workspace you don't have to
  hide when someone stops by. As an Amazon Associate, Calm & Oak earns from qualifying
  purchases. #affiliate #japandi #homeoffice #slowliving"
- **TikTok caption:** "A desk that reads as furniture. Solid walnut, slim legs, room for a lamp
  and nothing else. Shop link in bio. As an Amazon Associate, Calm & Oak earns from qualifying
  purchases. #affiliate #japandi #homeoffice"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image shows the walnut writing desk itself — MATCH
  - Check 3 (ASIN bar): inherited-verified via live article (no new-ASIN claim made) — PASS
  - Check 4 (caption-image match): caption describes exactly the desk shown — MATCH
  - Check 5 (file resolution): `pins/B08G46J76G.jpg` and `reels/B08G46J76G.mp4` both present on disk — OK
  - Disclosure check: sentence + `#affiliate` present in both captions — PASS
  - **Result: PASS**

### 2. Carriediosa chunky knit throw, cream white — bedroom/textile
- **ASIN:** [B0C61MWTJV](https://www.amazon.com/dp/B0C61MWTJV?tag=calmandoak-20) — reused from
  `journal/japandi-bedroom/index.html` and `journal/warmth-without-clutter/index.html`
- **Media:** `pins/B0C61MWTJV.jpg` → `reels/B0C61MWTJV.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-05T16:00:00Z · TikTok — 2026-10-05T17:00:00Z
- **Instagram caption:** "Weight without bulk. A chunky knit throw folded at the foot of the bed
  for the fifteen minutes before sleep when the room finally goes quiet. As an Amazon Associate,
  Calm & Oak earns from qualifying purchases. #affiliate #japandi #slowliving #bedroom"
- **TikTok caption:** "Weight without bulk — a chunky knit throw for the end of the day. Shop
  link in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate
  #japandi #slowliving"
- **SAFEGUARDS QA:**
  - Check 1: image shows the cream chunky-knit throw itself — MATCH
  - Check 3: inherited-verified via two live articles — PASS
  - Check 4: caption describes exactly the throw shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 3. SONGMICS 3-tier bamboo bathroom shelf — bathroom
- **ASIN:** [B0D41PKP16](https://www.amazon.com/dp/B0D41PKP16?tag=calmandoak-20) — reused from
  `journal/japandi-bathroom/index.html`
- **Category note:** bathroom is thin in the current pin rotation — deliberately included for
  category spread, not just office/bedroom repeats
- **Media:** `pins/B0D41PKP16.jpg` → `reels/B0D41PKP16.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-06T16:00:00Z · TikTok — 2026-10-06T17:00:00Z
- **Instagram caption:** "Towels, one plant, nothing else. A bamboo shelf that holds what a small
  bathroom actually needs and lets the rest go. As an Amazon Associate, Calm & Oak earns from
  qualifying purchases. #affiliate #japandi #bathroom"
- **TikTok caption:** "A bamboo shelf that holds what a small bathroom needs — and not much
  else. Shop link in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate #japandi #bathroom"
- **SAFEGUARDS QA:**
  - Check 1: image shows the bamboo 3-tier shelf itself — MATCH
  - Check 3: inherited-verified via live article — PASS
  - Check 4: caption describes exactly the shelf shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 4. Briful tall ribbed vase, brown stoneware — decor/ceramics
- **ASIN:** [B0FT361HDX](https://www.amazon.com/dp/B0FT361HDX?tag=calmandoak-20) — reused from
  `journal/wabi-sabi-ceramics/index.html`
- **Media:** `pins/B0FT361HDX.jpg` → `reels/B0FT361HDX.mp4` (1080×1920, 12s, AAC audio confirmed)
- **Proposed schedule:** Instagram — 2026-10-07T16:00:00Z · TikTok — 2026-10-07T17:00:00Z
- **Instagram caption:** "One vase, one stem, one corner of the room that finally looks
  finished. A tall ribbed vase in warm brown stoneware — the whole trick is restraint. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #wabisabi"
- **TikTok caption:** "One vase, one stem, done. A tall ribbed vase in warm brown stoneware.
  Shop link in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate #japandi #wabisabi"
- **SAFEGUARDS QA:**
  - Check 1: image shows the tall ribbed brown vase itself — MATCH
  - Check 3: inherited-verified via live article — PASS
  - Check 4: caption describes exactly the vase shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

---

## QA summary

| # | Piece | Checks 1/3/4/5 | Disclosure | Result |
|---|-------|----------------|------------|--------|
| 1 | Walnut writing desk | PASS | PASS | **PASS** |
| 2 | Chunky knit throw | PASS | PASS | **PASS** |
| 3 | Bamboo bathroom shelf | PASS | PASS | **PASS** |
| 4 | Ribbed vase | PASS | PASS | **PASS** |

**4/4 pieces PASS (100%). 8/8 posts (IG+TikTok ×4) ready to schedule.**

Check 2 (section-title match) and Check 6 (cross-article ASIN consistency) don't apply directly
to social captions (no `<h2>` section titles here) — the closest equivalent, "does the caption
claim match what the image shows," is folded into Check 4 above.

## What needs Cameron

1. **Schedule or reject this batch.** All 8 posts are QA-clean and ready; nothing is blocked
   technically. Sitting in `final pins/batches/2026-09-27/` for review per the review-gate policy.
2. Runway math: these 4 days (10-04 through 10-07) buy time but don't close the gap permanently —
   the standing "no `publisher` backstop trigger" finding (ledger, 09-16/09-17/09-18 entries)
   is still open. Worth deciding alongside this batch.
3. **This batch's files live inside the `final pins/` directory, which `.gitignore` normally
   excludes.** They were force-added (`git add -f`) specifically for this commit per this week's
   explicit instruction to make the manifest git-tracked and reviewable from a cloud CEO session
   — this resolves the standing ledger complaint (2026-09-15 CEO entry) that gitignored batches
   are invisible to a cloud-run reviewer. If that's not the intended long-term pattern, say so and
   this run's approach won't repeat.
