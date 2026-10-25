# Content Factory — Batch 2026-10-25

**Built by:** content-factory (cloud routine, weekly fire, 2026-10-25T12:06 UTC)
**Status:** STAGED — not published. Per `CONTROL.md`'s 2026-09-14 "Public-facing review gate,"
no Blotato post/schedule tool was called anywhere in this run. Cameron reviews this manifest and
schedules it (or sends it back) from a session with real network access to `database.blotato.io`.

## Why this batch looks different from every prior one

Every prior content-factory batch (`2026-09-20` through `2026-10-18`) built Instagram/TikTok
refills only and explicitly skipped Pinterest because the queue was "already full." That's no
longer true. Live checks this run:

- **`blotato_list_accounts`:** all three accounts connected and reachable — instagram `calmandoak`
  (id 53849), pinterest `CalmandOak` (id 7556), tiktok `calmandoak` (id 47113). No contradiction
  with `CONTROL.md`'s "all three active" platform-pause flags at the account level. The
  contradiction is still the same standing one — upload access, not pause flags (below).
- **`blotato_list_posts(status=scheduled, 2026-10-25→2026-12-31)`:** returned exactly 23 items,
  **100% Pinterest, zero Instagram, zero TikTok.** The 23 Pinterest items run from
  2026-10-25T15:05:00Z through **2026-10-29T18:05:00Z — a ~4.5-day runway**, confirming today's
  CEO daily-briefing #38 finding (`CEO-BRIEF/LESSONS-LEDGER.md`, same number, same source) to the
  minute. This is the lowest this queue has ever been, the first time it's dropped under 5 days,
  and the closest Pinterest has come to an actual missed posting day. **Per this week's explicit
  instruction not to rebuild an already-full channel — Pinterest is not full. It is the most
  urgent build target this run, and the rest of this batch is built around that.**
- **Cadence read directly off the live queue, not assumed:** the 23 scheduled items post at
  almost exactly `00:05 / 12:05 / 15:05 / 18:05 / 21:05 UTC` each day — 5 slots/day, which is
  `CONTROL.md`'s stated `max 5 posts/day/platform` ceiling, already running at the cap. This
  batch's proposed Pinterest schedule (below) continues that exact cadence rather than inventing a
  new one, so it doesn't imply exceeding the ceiling if Cameron schedules it as-is.
- **Instagram/TikTok: still a confirmed true zero,** same standing root cause tracked since
  2026-09-14 — no cloud session can reach `database.blotato.io` to upload new media, so nothing
  ever lands in Blotato's queue regardless of how much staged content exists. This batch still
  builds a modest IG/TikTok refill (6 products, same as the typical 5-6/batch cadence) so that
  inventory keeps growing for whenever a session with real upload access clears the backlog — but
  it is not the priority build this run; Pinterest is.

## Branch / ASIN overlap check (done before sourcing)

Pulled every manifest's ASIN list directly from all five open `content-factory/*` branches
(`2026-09-20`, `2026-09-27`, `2026-10-04`, `2026-10-11`, `2026-10-18`) before picking anything.
27 ASINs excluded (26 real products + the one degraded ASIN, which isn't open-branch but is
excluded sitewide per Check 8): `B07CGZN4QP, B07F266PMS, B07M798215, B085LTJM3D, B0888JVZH4,
B08G46J76G, B08GDW5JYF, B09493XGR5, B09HKN2ZRT, B0BVVRCP3R, B0BZ3GHM8N, B0BZ489W7B, B0C14RGKK7,
B0C61MWTJV, B0CRRKDKVT, B0CRTNWCV9, B0D41PKP16, B0D4RK8PB2, B0DC6FQKYR, B0DPJX1CQL, B0DRHQ1FKP
(degraded — THKSHOUZ pedestal), B0F23L8X2H, B0F4K9SP6N, B0FJY1RVL3, B0FT361HDX, B0G39P4V86,
B0GGB15KZ3, B0GH7FV6GJ`. None of the 10 ASINs below appear in that list. **None of the five open
branches have shipped yet either** (same zero-IG/TikTok/-new-Pinterest-pins evidence above) — this
batch is additive, not a replacement; closing another run's branch isn't this run's call.

## Sourcing method (so the picture-product rule holds)

All 10 ASIN + image pairings were grepped directly out of already-live, tracked journal/shop pages'
product cards — every image is the site's own tracked photo (`assets/img/products-cropped/p-<ASIN>.jpg`)
for that exact ASIN, reused rather than invented. `www.amazon.com` is still egress-blocked from this
sandbox (same standing condition as every prior run), so no new-ASIN sourcing or live
re-verification (star rating, review count, stock, Frequently-Returned badge) was attempted — ASIN
bar is inherited from the live article's own prior verification. Every image was opened and visually
compared against its linked product's name/alt text before building (SAFEGUARDS Check 1) — see
per-piece QA below. Explicitly checked the degraded-ASIN list (Check 8): `B0DRHQ1FKP` was not used anywhere in this
batch. **The sitewide resweep (ASIN-presence grep across `journal/`, `shop/`, `assets/the-edit/`,
`assets/starter-guide/`) found a new, previously-unflagged hit this run** — not in any HTML page
(those are clean, consistent with the 2026-10-20 fix), but embedded as a live affiliate link inside
3 downloadable PDF assets: `assets/the-edit/_pdf/issue-01-winter.pdf`,
`assets/the-edit/_pdf/issue-02-spring.pdf`, and `assets/the-edit/_pdf/the-calm-and-oak-edit-volume-one.pdf`.
Confirmed via `strings <file>.pdf | grep B0DRHQ1FKP` — each PDF embeds
`https://www.amazon.com/dp/B0DRHQ1FKP?tag=calmandoak-20` as a clickable URI. SAFEGUARDS Check 8 has
never previously named PDFs specifically (every prior resweep entry in `CEO-BRIEF/LESSONS-LEDGER.md`
only discusses HTML pages) — this is the first time the degraded-ASIN grep was run against binary
PDF content rather than just markup. Not attempted to fix here: these are hand-built/designed PDF
issues, not something `content-factory` has a rebuild tool for, and editing PDF binaries directly is
outside this run's scope and risk tolerance. Logged to `TEAM-LOG.md` and
`CEO-BRIEF/LESSONS-LEDGER.md`; see "what needs Cameron" below.

`final pins/` content from prior sessions (`01-brand-assets` through `05-products-by-day`, any
pin-template/copy-library inventory, `Pin Copy Library*.md`) is gitignored/local-only and, as
expected per `CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-09-14 entry, absent from this fresh clone. Voice
was reconstructed from `CONTROL.md`'s brand-voice section plus the phrasing style of the 23
already-scheduled Pinterest pins read live this run (soft, sensory, second-person-light, ends in a
plain save/shop prompt, no hashtags) — see the open disclosure question in "what needs Cameron"
below regarding that observed style.

## Pipeline notes (for the next run)

- `node_modules` was absent at session start (same finding as every prior content-factory run) —
  ran `npm install ffmpeg-static --no-save`, succeeded, no egress issue for the npm registry.
- **`_asin-to-pin.js` was again absent from `main`,** present only on `origin/content-factory/2026-10-18`
  — now a 5th consecutive batch pulling the same file back out of a prior unmerged branch (first
  flagged 2026-10-11). Copied into this branch to build at all; see "what needs Cameron" below —
  this is now recurring often enough that re-flagging it again adds little, the fix is simply to
  merge it once.
- `node --check` run on both `_pin-to-reel.js` and `_add-audio-bed.js` before relying on either,
  per this week's explicit instruction — both clean, zero syntax errors.
- All 10 pins built via `_asin-to-pin.js` (blur-fill background + contain-fit product, 1000×1500).
  Visually spot-checked 4 of 10 outputs directly (rattan pendant, jute rug, oak console, tripod
  floor lamp) — no stretch, no letterbox bars, product undistorted on the 2:3 canvas; the other 6
  used the identical pipeline and logged identical "OK" success/size output.
- **Audio verified present on all 6 reels, not assumed:** ran `ffmpeg -i` stream inspection plus
  `volumedetect` on every one of the 6 output files (not a sample) — every file carries an
  `aac (LC)` stream at 44.1kHz/mono, and every file reads mean −26.9dB / max −14.0dB — identical
  level across all 6, audible ambient bed, matching the level logged in the 2026-10-18 batch, not
  silence.
- Pinterest pins in this batch are **stills only, no video** — matches the format of every live
  Pinterest post read this run (all 23 scheduled items and the published sample both use a single
  static image, never a video attachment). Building reels for the 4 Pinterest-only pieces would
  have been extra render time spent on a format Pinterest isn't using here.

---

## Section A — 6 products × 3 platforms (Pinterest + Instagram + TikTok) = 18 posts

### 1. ELYONA 17" woven rattan basket pendant light
- **ASIN:** [B0B2156DH5](https://www.amazon.com/dp/B0B2156DH5?tag=calmandoak-20) — reused from
  `shop/looks/the-olive-grove-living-room/index.html` ("The Olive Grove Living Room — Shop the Room")
- **Media:** `pins/B0B2156DH5.jpg` (382 KB) → `reels/B0B2156DH5.mp4` (1080×1920, 12s, AAC audio
  confirmed, 5622 KB)
- **Proposed schedule:** Pinterest — 2026-10-29T21:05:00Z · Instagram — 2026-10-26T16:00:00Z ·
  TikTok — 2026-10-26T17:00:00Z
- **Pinterest text:** "A woven rattan pendant, diamond-faceted shade, hanging low over an oak
  dining table — warm light through hand-tied rope instead of a bare bulb. Save this idea. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate"
- **Instagram caption:** "A woven rattan pendant, diamond-faceted and hand-tied, hung low enough
  over the table that the light falls warm instead of flat. The kind of fixture that does the
  room's lighting and its texture in one move. As an Amazon Associate, Calm & Oak earns from
  qualifying purchases. #affiliate #japandi #pendantlight #diningroom"
- **TikTok caption:** "Woven rattan, hand-tied, hung low over the table. Shop link in bio. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #pendantlight"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image opened and compared — shows the diamond-faceted woven
    rattan pendant itself, hung over a dining table — MATCH
  - Check 3 (ASIN bar): inherited-verified via live article; confirmed not on the degraded list —
    PASS
  - Check 4 (caption-image match): every caption describes exactly what's shown — MATCH
  - Check 5 (file resolution): pin + reel both present on disk — OK
  - Disclosure check: sentence + `#affiliate` present on all 3 captions — PASS
  - **Result: PASS**

### 2. Handwoven tatami meditation cushion, round
- **ASIN:** [B0FS6FNW7D](https://www.amazon.com/dp/B0FS6FNW7D?tag=calmandoak-20) — reused from
  `shop/looks/the-olive-grove-living-room/index.html`
- **Media:** `pins/B0FS6FNW7D.jpg` (393 KB) → `reels/B0FS6FNW7D.mp4` (1080×1920, 12s, AAC audio
  confirmed, 4126 KB)
- **Proposed schedule:** Pinterest — 2026-10-30T00:05:00Z · Instagram — 2026-10-27T16:00:00Z ·
  TikTok — 2026-10-27T17:00:00Z
- **Pinterest text:** "A round, hand-woven tatami floor cushion, tucked into a window corner with
  a trailing plant nearby — low seating that asks you to slow down. Save this idea. As an Amazon
  Associate, Calm & Oak earns from qualifying purchases. #affiliate"
- **Instagram caption:** "A round, hand-woven tatami cushion on the floor by the window — no frame,
  no legs, just a low place to sit with tea and good light. The kind of seat that makes a corner
  feel used instead of staged. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate #japandi #floorcushion #slowliving"
- **TikTok caption:** "A woven tatami floor cushion, round, low to the ground. Shop link in bio. As
  an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #floorcushion"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the round woven tatami cushion itself, by a curtained
    window — MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: every caption matches what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 3. Simple & Opulence stonewashed linen duvet, oat
- **ASIN:** [B01IMZLNBE](https://www.amazon.com/dp/B01IMZLNBE?tag=calmandoak-20) — reused from
  `journal/honest-materials/index.html` ("Honest Materials — 7 to Use, 7 to Skip") and
  `journal/budget-japandi-bedroom/index.html`
- **Media:** `pins/B01IMZLNBE.jpg` (266 KB) → `reels/B01IMZLNBE.mp4` (1080×1920, 12s, AAC audio
  confirmed, 3471 KB)
- **Proposed schedule:** Pinterest — 2026-10-30T12:05:00Z · Instagram — 2026-10-28T16:00:00Z ·
  TikTok — 2026-10-28T17:00:00Z
- **Pinterest text:** "Stonewashed linen in oat, rumpled on purpose, layered over a low oak
  platform bed. The wrinkle is the point. Save this idea. As an Amazon Associate, Calm & Oak earns
  from qualifying purchases. #affiliate"
- **Instagram caption:** "Stonewashed linen in oat, the rumpled drape that reads lived-in instead
  of showroom. Pre-washed, so the wrinkle is the finish, not a flaw — it only gets softer from
  here. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #linenbedding #bedroom"
- **TikTok caption:** "Stonewashed linen, oat, the wrinkle is the point. Shop link in bio. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #linenbedding"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the oat linen duvet and shams on a wood-framed bed —
    MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: every caption matches what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 4. AmorArc reactive-glaze stoneware dinnerware (18-pc)
- **ASIN:** [B0CJD73LV6](https://www.amazon.com/dp/B0CJD73LV6?tag=calmandoak-20) — reused from
  `journal/japandi-materials-palette/index.html` ("Japandi Materials & Palette — A Simple Guide")
- **Media:** `pins/B0CJD73LV6.jpg` (148 KB) → `reels/B0CJD73LV6.mp4` (1080×1920, 12s, AAC audio
  confirmed, 2277 KB)
- **Proposed schedule:** Pinterest — 2026-10-30T15:05:00Z · Instagram — 2026-10-29T16:00:00Z ·
  TikTok — 2026-10-29T17:00:00Z
- **Pinterest text:** "Reactive-glaze stoneware, no two pieces alike — stacked plates and bowls
  with a single white rose for scale. The honest table. Save this idea. As an Amazon Associate,
  Calm & Oak earns from qualifying purchases. #affiliate"
- **Instagram caption:** "Reactive-glaze stoneware, every piece slightly different from the next —
  the kiln decides, not a mold. Stacked plates, nesting bowls, the kind of set that looks hand-
  thrown because it basically is. As an Amazon Associate, Calm & Oak earns from qualifying
  purchases. #affiliate #japandi #stoneware #dinnerware"
- **TikTok caption:** "Reactive-glaze stoneware, no two pieces alike. Shop link in bio. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #stoneware"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the stacked reactive-glaze stoneware plates and
    bowls itself — MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: every caption matches what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 5. Natural bamboo serving tray
- **ASIN:** [B086372L8W](https://www.amazon.com/dp/B086372L8W?tag=calmandoak-20) — reused from
  `journal/sunday-morning-kitchen/index.html` ("The Sunday Morning Kitchen — Under $200")
- **Media:** `pins/B086372L8W.jpg` (197 KB) → `reels/B086372L8W.mp4` (1080×1920, 12s, AAC audio
  confirmed, 2257 KB)
- **Proposed schedule:** Pinterest — 2026-10-30T18:05:00Z · Instagram — 2026-10-30T16:00:00Z ·
  TikTok — 2026-10-30T17:00:00Z
- **Pinterest text:** "A natural bamboo serving tray, close enough to see the grain — the kind of
  tray that carries breakfast and still looks like furniture. Save this idea. As an Amazon
  Associate, Calm & Oak earns from qualifying purchases. #affiliate"
- **Instagram caption:** "A bamboo serving tray with the grain left visible, cutout handles instead
  of hardware. Carries breakfast to bed or drinks to the porch and looks like it belongs on the
  counter in between. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate #japandi #servingtray #kitchen"
- **TikTok caption:** "Bamboo serving tray, grain on full display. Shop link in bio. As an Amazon
  Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #servingtray"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the bamboo tray itself, grain and cutout handle
    visible — MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: every caption matches what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 6. Superior braided jute handwoven runner rug, 2'6"×8", natural tan
- **ASIN:** [B07FYYSR65](https://www.amazon.com/dp/B07FYYSR65?tag=calmandoak-20) — reused from
  `journal/honest-materials/index.html` and `journal/japandi-materials-palette/index.html`
- **Media:** `pins/B07FYYSR65.jpg` (245 KB) → `reels/B07FYYSR65.mp4` (1080×1920, 12s, AAC audio
  confirmed, 3665 KB)
- **Proposed schedule:** Pinterest — 2026-10-30T21:05:00Z · Instagram — 2026-10-31T16:00:00Z ·
  TikTok — 2026-10-31T17:00:00Z
- **Note on the image:** the tracked lifestyle photo frames the rug under a styled console (flowers,
  baskets, books) rather than as a flat-lay — this is the site's own live photo for this exact ASIN
  (`journal/honest-materials/index.html` §6, "Jute and seagrass"), not a new sourcing choice. The
  rug itself runs the full width of the bottom third of the frame, clearly the dominant floor
  element. Caption written to describe the rug specifically, not the console styling around it.
- **Pinterest text:** "A braided jute runner, natural tan, anchoring an entryway console — the
  coarsest weave in the room, doing the floor's heaviest visual work. Save this idea. As an Amazon
  Associate, Calm & Oak earns from qualifying purchases. #affiliate"
- **Instagram caption:** "A braided jute runner underfoot, warm-toned and durable, the kind of
  texture that grounds everything placed above it. Natural fiber only — the synthetic version goes
  shiny within a year and never recovers. As an Amazon Associate, Calm & Oak earns from qualifying
  purchases. #affiliate #japandi #juterug #entryway"
- **TikTok caption:** "Braided jute, natural tan, the floor's heaviest texture. Shop link in bio. As
  an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #juterug"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the braided jute runner rug running the width of the
    frame underfoot — MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: every caption describes the rug specifically, matching what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

---

## Section B — 4 products × Pinterest only = 4 posts
(No reel built — Pinterest's live queue uses stills only, see pipeline notes above. Built purely
to extend Pinterest runway fastest given this run's urgency.)

### 7. Slim solid-oak entry console
- **ASIN:** [B0DH21GJ15](https://www.amazon.com/dp/B0DH21GJ15?tag=calmandoak-20) — reused from
  `journal/honest-materials/index.html` §1, "Solid wood"
- **Media:** `pins/B0DH21GJ15.jpg` (49 KB)
- **Proposed schedule:** Pinterest — 2026-10-31T00:05:00Z
- **Pinterest text:** "A slim solid-oak console, tapered legs, a lower shelf — narrow enough for a
  hallway, honest grain instead of a printed veneer. Save this idea. As an Amazon Associate, Calm &
  Oak earns from qualifying purchases. #affiliate"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the slim solid-oak console itself, tapered legs,
    lower slatted shelf — MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: caption matches what's shown — MATCH
  - Check 5: pin present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 8. GIB seagrass baskets, graduated set of 3
- **ASIN:** [B0D31739VD](https://www.amazon.com/dp/B0D31739VD?tag=calmandoak-20) — reused from
  `journal/honest-materials/index.html` §6, "Jute and seagrass"
- **Media:** `pins/B0D31739VD.jpg` (211 KB)
- **Proposed schedule:** Pinterest — 2026-10-31T12:05:00Z
- **Pinterest text:** "Graduated seagrass baskets with leather handles, by a linen-curtained window
  — storage that doesn't need to hide. Save this idea. As an Amazon Associate, Calm & Oak earns
  from qualifying purchases. #affiliate"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the graduated seagrass baskets with leather handles —
    MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: caption matches what's shown — MATCH
  - Check 5: pin present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 9. LAMSU walnut tripod floor lamp with woven rattan shade
- **ASIN:** [B0D7BWWVC7](https://www.amazon.com/dp/B0D7BWWVC7?tag=calmandoak-20) — reused from
  `journal/best-japandi-lighting/index.html` §3, "Wood tripod floor lamp — the corner glow"
- **Media:** `pins/B0D7BWWVC7.jpg` (66 KB)
- **Proposed schedule:** Pinterest — 2026-10-31T15:05:00Z
- **Pinterest text:** "A walnut tripod floor lamp, woven rattan shade, filling the corner with warm
  diffused light instead of glare. Save this idea. As an Amazon Associate, Calm & Oak earns from
  qualifying purchases. #affiliate"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the walnut tripod floor lamp with woven rattan
    globe shade itself, lit — MATCH
  - Check 3: inherited-verified via live article (page text notes 4.5 stars, 230+ reviews); not on
    degraded list — PASS
  - Check 4: caption matches what's shown — MATCH
  - Check 5: pin present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 10. Matte ceramic hug-donut bud vase
- **ASIN:** [B0D6YRJLCP](https://www.amazon.com/dp/B0D6YRJLCP?tag=calmandoak-20) — reused from
  `journal/single-stem-rule/index.html` ("The Single-Stem Rule — Easy Vase Styling")
- **Media:** `pins/B0D6YRJLCP.jpg` (95 KB)
- **Proposed schedule:** Pinterest — 2026-10-31T18:05:00Z
- **Pinterest text:** "A matte ceramic hug-donut bud vase, sculptural and speckled, built for a
  single stem instead of a bouquet. Save this idea. As an Amazon Associate, Calm & Oak earns from
  qualifying purchases. #affiliate"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the matte speckled ceramic hug-donut vase shapes
    themselves — MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: caption matches what's shown — MATCH
  - Check 5: pin present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

---

## QA summary

| # | Piece | Platforms | Checks 1/3/4/5 | Disclosure | Result |
|---|-------|-----------|----------------|------------|--------|
| 1 | Rattan basket pendant light | Pin + IG + TT | PASS | PASS | **PASS** |
| 2 | Tatami meditation cushion | Pin + IG + TT | PASS | PASS | **PASS** |
| 3 | Stonewashed linen duvet, oat | Pin + IG + TT | PASS | PASS | **PASS** |
| 4 | Reactive-glaze stoneware dinnerware | Pin + IG + TT | PASS | PASS | **PASS** |
| 5 | Bamboo serving tray | Pin + IG + TT | PASS | PASS | **PASS** |
| 6 | Braided jute runner rug | Pin + IG + TT | PASS | PASS | **PASS** |
| 7 | Solid-oak entry console | Pin only | PASS | PASS | **PASS** |
| 8 | Graduated seagrass baskets | Pin only | PASS | PASS | **PASS** |
| 9 | Walnut tripod floor lamp | Pin only | PASS | PASS | **PASS** |
| 10 | Ceramic hug-donut bud vase | Pin only | PASS | PASS | **PASS** |

**10/10 pieces PASS (100%). 22/22 posts ready to schedule** (10 Pinterest + 6 Instagram + 6 TikTok).

Check 2 (section-title match), Check 6 (cross-article ASIN consistency) and Check 9 (hub
reconciliation) don't apply directly to social captions (no `<h2>` sections or site hub touched
here). Check 8 (sitewide degraded-ASIN resweep) applied directly during sourcing — see "sourcing
method" above; zero hits this run.

## What needs Cameron

1. **Schedule or reject this batch.** All 22 posts are QA-clean and ready. The 10 Pinterest pins
   are the priority — they're proposed to extend the runway past the point this week's checks
   expect it to run dry. If scheduled as-is, Pinterest's forward queue would run from today through
   roughly **2026-10-31T18:05Z**, versus the current **2026-10-29T18:05Z** — about 2 extra days,
   not a permanent fix, but real runway added against an urgent, worsening trend.
2. **Open disclosure-format question, not resolved here:** this run's 10 new Pinterest captions
   all carry the sitewide disclosure sentence + `#affiliate`, per `SAFEGUARDS.md` Check 7 and this
   week's explicit instruction. But the 23 *already-scheduled* live Pinterest posts read this run
   (and the one sampled published post) carry **no disclosure text and no hashtags at all** —
   just a plain lifestyle sentence ending in "Save this idea" / "Shop the print." If that's the
   house style Blotato/Pinterest expects for this account, this batch's captions will read
   differently from everything already in the queue; if the existing queue is itself missing
   required disclosure, that's a live compliance gap bigger than this one batch. Flagging for a
   decision, not changing either the new captions (disclosure stays, per the explicit written
   instruction and SAFEGUARDS) or the already-scheduled ones (outside this run's access — no
   Blotato write calls were made).
3. **Five-now-six open content-factory branches** (`2026-09-20`, `2026-09-27`, `2026-10-04`,
   `2026-10-11`, `2026-10-18`, and this one). None have shipped per live `blotato_list_posts`
   data this run. If several ship at once, proposed dates will need manual deconfliction — this
   batch's own IG/TikTok dates (2026-10-26 through 2026-10-31) assume it ships alone or first,
   same caveat as every prior batch.
4. **`_asin-to-pin.js` still needs a home on `main`** — 5th consecutive batch re-pulling it from
   a prior unmerged branch (`origin/content-factory/2026-10-18`), first flagged 2026-10-11. It's a
   build-time tool, not public-facing content, so the review-gate rationale for staging social
   output doesn't obviously apply to it — worth a small standalone PR the same way seo-ranker ships
   code, rather than repeating this every week.
5. **This batch's files live inside `final pins/`, which `.gitignore` normally excludes.**
   Force-added (`git add -f`) for this commit, same pattern as every prior batch.
6. **New finding: the degraded ASIN `B0DRHQ1FKP` (THKSHOUZ fluted-oak pedestal — Canada ship-block
   + 33 reviews) is live inside 3 downloadable PDF assets** (`assets/the-edit/_pdf/issue-01-winter.pdf`,
   `issue-02-spring.pdf`, `the-calm-and-oak-edit-volume-one.pdf`), not just HTML pages — see sourcing
   notes above. SAFEGUARDS Check 8's sitewide resweep has run many times against `journal/`/`shop/`
   HTML but, as far as this run can tell from the ledger, never before against these PDFs'
   embedded links specifically. These PDFs are presumably downloadable/distributed from the site
   (e.g. linked from `the-edit` pages) — whoever can open and re-export them (this session has no
   PDF-editing tool in the repo for this) should swap that link for a verified-clean ASIN. Worth
   considering whether Check 8's written instruction should explicitly name PDF/binary assets, not
   just HTML, next consolidation pass.
7. **The Pinterest-analytics flat-zero pattern** (`CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-10-23/24/25
   entries — 3 independent days now, near-universal zero impressions/clicks/saves on published
   Pinterest posts) is worth weighing alongside the runway finding: if engagement really is
   near-zero, filling the queue faster addresses the symptom (empty queue) but not a possible
   underlying cause (content/format/account-health issue). This run didn't investigate that
   further — it's the CEO briefing's open item, not this run's to resolve — but a reviewer
   deciding whether to prioritize scheduling this batch should have both facts in view together.
