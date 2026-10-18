# Content Factory — Batch 2026-10-18

**Built by:** content-factory (cloud routine, weekly fire)
**Status:** STAGED — not published. Per `CONTROL.md`'s 2026-09-14 "Public-facing review gate,"
no Blotato post/schedule tool was called. Cameron reviews this manifest and schedules it (or
sends it back) from a session with real network access to `database.blotato.io`.

## Why this batch, and why only this

- **Platform-pause cross-check:** `blotato_list_accounts` (called live this run) returns all
  three connected accounts live and reachable — instagram `calmandoak` (id 53849), pinterest
  `CalmandOak` (id 7556), tiktok `calmandoak` (id 47113). No contradiction with `CONTROL.md`'s
  "all three active" flags on the account level — every account works. The contradiction is
  elsewhere: real queue data (below) shows Instagram/TikTok sitting at a confirmed true zero on
  forward schedule despite being flagged "active," which is an upload-access problem (no cloud
  session can reach `database.blotato.io`), not a pause-flag problem. Not resolved here, per this
  week's instruction to flag and not resolve.
- **Instagram / TikTok: refill target, still at a confirmed true zero.** Live
  `blotato_list_posts(status=scheduled, 2026-10-18→2026-12-31)` returns zero Instagram and zero
  TikTok items anywhere in that window — every one of the 72 items returned is Pinterest. This
  matches the standing root cause tracked since 2026-09-14 (no cloud session can reach
  `database.blotato.io` to upload new media); not a new finding.
- **Pinterest: skipped for new builds this run, but flag the trend.** Live
  `blotato_list_posts(status=scheduled)` shows Pinterest's queue running from today through
  **2026-10-29** — an 11-day runway. Per this week's instruction not to rebuild an already-full
  channel, and because 11 days is not yet a missed posting day, this batch does not add Pinterest
  pieces. **But this is the same number `CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-10-18 entry already
  flagged as having crossed under the CEO brief's 14-day urgent threshold for the first time**
  (22 days on 10-07 → ~18 days on 10-11 → 11 days today) — re-confirmed independently by this
  run's own live check, same number, same source. Not resolving it (that's the ledger's own
  "needs 1-2 more checks before promoting a rule" item), just corroborating it from a second,
  independent run the same day.
- **Three-plus earlier batches are still open, unmerged, unscheduled, same root cause:**
  `content-factory/2026-09-20` (10 pieces), `content-factory/2026-09-27` (4 products / 8 posts),
  `content-factory/2026-10-04` (5 products / 10 posts), and `content-factory/2026-10-11`
  (5 products / 10 posts). None of their ASINs or categories appear to have shipped per live
  `blotato_list_posts(status=published)` — the window checked this run (2026-10-11→2026-10-18)
  shows 100% Pinterest, zero IG/TikTok. **This batch is additive, not a replacement** — closing
  another run's branch isn't this run's call, per standing instruction.
- **No ASIN overlap with any of the four open branches.** Pulled every manifest's ASIN list
  directly from `origin/content-factory/{2026-09-20,2026-09-27,2026-10-04,2026-10-11}` before
  sourcing (22 ASINs excluded: B07CGZN4QP, B07F266PMS, B085LTJM3D, B08G46J76G, B08GDW5JYF,
  B09493XGR5, B09HKN2ZRT, B0BVVRCP3R, B0BZ3GHM8N, B0C61MWTJV, B0CRRKDKVT, B0CRTNWCV9, B0D41PKP16,
  B0D4RK8PB2, B0DC6FQKYR, B0DPJX1CQL, B0F23L8X2H, B0F4K9SP6N, B0FJY1RVL3, B0FT361HDX, B0GGB15KZ3,
  B0GH7FV6GJ — none of those 22 appear below).
- **Why 5 products / 10 posts:** same constraint as every prior run — no pin-template/copy-library
  inventory exists in this cloud checkout (`final pins/`'s prior contents, `01-brand-assets`
  through `05-products-by-day`, and `Pin Copy Library*.md` are gitignored/local-only, confirmed
  absent again this run). Every asset here was built from tracked `assets/img/*` matched to real
  ASINs grepped out of live journal/shop pages, reused rather than invented — same method as
  every prior batch. Deliberately spread across 5 categories with **zero overlap with any of the
  four open branches' categories** (office/desk, bedroom, bathroom, decor/ceramics, kitchen,
  dining, closet, living-room textiles, outdoor/patio, entryway, reading-nook, bedding, lighting)
  for rotation variety: **bar cart, wall art, coffee table, faux greenery, laundry/utility.**

## Sourcing method (so the picture-product rule holds)

Each ASIN + image pairing was grepped directly out of an already-live, tracked journal/shop page's
product card — the image is the site's own tracked photo for that exact ASIN. New-ASIN sourcing /
live re-verification (star rating, review count, stock, Frequently-Returned badge) was not
attempted — `www.amazon.com` is egress-blocked from this cloud sandbox, same standing condition as
every prior run. Every image was opened and visually compared against its linked product's
name/alt text before building (SAFEGUARDS Check 1) — see per-piece QA below. Explicitly checked
the degraded-ASIN list (SAFEGUARDS Check 8/sitewide resweep) before sourcing: `B0DRHQ1FKP`
(the THKSHOUZ fluted-oak pedestal) appeared in the pool of unused live ASINs and was deliberately
excluded, not used anywhere in this batch.

## Pipeline notes (for the next run)

- `node_modules` was empty at session start (same finding as every prior content-factory run) —
  ran `npm install ffmpeg-static --no-save`, succeeded, no egress issue for the npm registry.
- **`_asin-to-pin.js` was, again, not present on `main` or any branch but
  `origin/content-factory/2026-10-11`** — reconfirms the 2026-10-11 ledger finding
  ("reusable pipeline tooling doesn't persist past its own batch branch unless merged via its own
  PR") is still unresolved, now a 4th consecutive batch pulling the same file back out of a prior
  unmerged branch. Copied it into this branch (`_asin-to-pin.js`, repo root) to build at all.
  Flagging again, with more urgency given the repeat count — see "what needs Cameron" below.
- `_pin-to-reel.js` and `_add-audio-bed.js` both `node --check` clean this run (per this week's
  explicit instruction to verify before relying on `_add-audio-bed.js`).
- All 5 pins built via `_asin-to-pin.js` (blur-fill-background + contain-fit-product, 1000×1500).
  Visually spot-checked 2 of 5 outputs (bar cart, coffee table) directly — no stretch, no
  letterbox bars, product undistorted on the 2:3 canvas; the other 3 used the identical pipeline
  and logged identical "OK" success/size output, consistent with a clean render.
- **Audio verified present on every reel, not assumed:** ran `ffmpeg -i` stream inspection plus
  `volumedetect` on **all 5** output files (not a sample) — every file carries an `aac (LC)` stream
  at 44.1kHz/mono, and every file reads mean −26.9dB / max −14.0dB — identical level across all 5,
  audible ambient bed, matching the level logged in the 2026-10-11 batch, not silence.

## Pieces (5 products × 2 platforms = 10 posts)

Disclosure: every post below carries the sitewide sentence — *"As an Amazon Associate, Calm & Oak
earns from qualifying purchases."* — plus `#affiliate`, per the 2026-09-14 ledger finding that a
sample of already-queued posts shipped without it. Checked explicitly on every caption below
before finalizing this manifest.

---

### 1. BON AUGURE rustic oak + matte-black 3-tier bar cart — bar cart
- **ASIN:** [B0BZ489W7B](https://www.amazon.com/dp/B0BZ489W7B?tag=calmandoak-20) — reused from
  `shop/looks/the-considered-bar-cart/index.html`
- **Category note:** bar cart is a new category for the pin rotation — not represented in any
  open branch
- **Media:** `pins/B0BZ489W7B.jpg` (2:3 still, 225 KB) → `reels/B0BZ489W7B.mp4` (1080×1920, 12s,
  AAC audio confirmed, 2918 KB)
- **Proposed schedule:** Instagram — 2026-10-19T16:00:00Z · TikTok — 2026-10-19T17:00:00Z
- **Instagram caption:** "A rustic oak and matte-black bar cart, three tiers deep enough for the
  whole evening — glasses hung upside down, a bottle of something good, ice already melting the
  way it should. The kind of furniture that makes entertaining feel like less work, not more. As
  an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #barcart
  #hosting"
- **TikTok caption:** "Oak and matte black, three shelves, everything within arm's reach. Shop
  link in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate
  #japandi #barcart"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image opened and compared — shows the rustic oak/matte-black
    3-tier cart itself, wine rack, hanging glasses, rolling casters — MATCH
  - Check 3 (ASIN bar): inherited-verified via live article (no new-ASIN claim made); confirmed
    not on the SAFEGUARDS Check 8 degraded list — PASS
  - Check 4 (caption-image match): caption describes exactly what's shown — MATCH
  - Check 5 (file resolution): both `pins/B0BZ489W7B.jpg` and `reels/B0BZ489W7B.mp4` present on
    disk — OK
  - Disclosure check: sentence + `#affiliate` present in both captions — PASS
  - **Result: PASS**

### 2. Framed botanical wall art, set of 3 — wall art
- **ASIN:** [B0G39P4V86](https://www.amazon.com/dp/B0G39P4V86?tag=calmandoak-20) — reused from
  `shop/decor-accents/index.html`
- **Category note:** wall art is a new category for the pin rotation
- **Media:** `pins/B0G39P4V86.jpg` (235 KB) → `reels/B0G39P4V86.mp4` (1080×1920, 12s, AAC audio
  confirmed, 3369 KB)
- **Proposed schedule:** Instagram — 2026-10-20T16:00:00Z · TikTok — 2026-10-20T17:00:00Z
- **Instagram caption:** "Three framed botanical line drawings, hung close together over a low
  sofa — the kind of wall that doesn't shout, just holds the room steady. Oak frames, soft linen
  mats, a quiet gesture instead of a loud one. As an Amazon Associate, Calm & Oak earns from
  qualifying purchases. #affiliate #japandi #wallart #livingroom"
- **TikTok caption:** "Three line-art botanicals, oak frames, one calm gallery wall. Shop link in
  bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #wallart"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the three framed botanical line-art prints over a
    sofa, oak frames, exactly as named — MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: caption describes exactly what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 3. Round walnut-tone coffee table — coffee table
- **ASIN:** [B0888JVZH4](https://www.amazon.com/dp/B0888JVZH4?tag=calmandoak-20) — reused from
  `journal/best-japandi-sofa-coffee-table/index.html` ("Round walnut-tone coffee table — the
  centrepiece")
- **Category note:** coffee table (furniture) is distinct from 2026-10-04's "living-room
  textiles" (boucle pillow covers) — new product type for the rotation
- **Media:** `pins/B0888JVZH4.jpg` (322 KB) → `reels/B0888JVZH4.mp4` (1080×1920, 12s, AAC audio
  confirmed, 4075 KB)
- **Proposed schedule:** Instagram — 2026-10-21T16:00:00Z · TikTok — 2026-10-21T17:00:00Z
- **Instagram caption:** "A round walnut-tone coffee table with a lower shelf for the books you
  actually read. No glass top to wipe down twice a day, no sharp corners to remember. The kind of
  centerpiece that lets the rest of the room stay quiet. As an Amazon Associate, Calm & Oak earns
  from qualifying purchases. #affiliate #japandi #coffeetable #livingroom"
- **TikTok caption:** "Round, walnut-toned, a shelf underneath for the stack of books. Shop link
  in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #coffeetable"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the round walnut-tone two-tier coffee table itself
    — MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: caption describes exactly what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 4. Artificial olive tree, 5ft potted — faux greenery
- **ASIN:** [B0C14RGKK7](https://www.amazon.com/dp/B0C14RGKK7?tag=calmandoak-20) — reused from
  `shop/decor-accents/index.html`
- **Category note:** faux greenery is a new category for the pin rotation
- **Media:** `pins/B0C14RGKK7.jpg` (132 KB) → `reels/B0C14RGKK7.mp4` (1080×1920, 12s, AAC audio
  confirmed, 2288 KB)
- **Proposed schedule:** Instagram — 2026-10-22T16:00:00Z · TikTok — 2026-10-22T17:00:00Z
- **Instagram caption:** "A five-foot faux olive tree, the kind of green that fills a corner
  without asking anything of you — no watering schedule, no yellowing leaves by week three. Just
  the shape of something alive, permanently. As an Amazon Associate, Calm & Oak earns from
  qualifying purchases. #affiliate #japandi #fauxplant #homedecor"
- **TikTok caption:** "A faux olive tree that never needs watering, never drops a leaf. Shop link
  in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #fauxplant"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the potted faux olive tree itself, by a window —
    MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: caption describes exactly what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 5. BIRDROCK seagrass laundry hamper with lid — laundry/utility
- **ASIN:** [B07M798215](https://www.amazon.com/dp/B07M798215?tag=calmandoak-20) — reused from
  `shop/storage/index.html`
- **Category note:** laundry/utility is a new category for the pin rotation
- **Media:** `pins/B07M798215.jpg` (110 KB) → `reels/B07M798215.mp4` (1080×1920, 12s, AAC audio
  confirmed, 2004 KB)
- **Proposed schedule:** Instagram — 2026-10-23T16:00:00Z · TikTok — 2026-10-23T17:00:00Z
- **Instagram caption:** "A seagrass laundry hamper with a lid, tucked into the corner where it
  actually belongs — hand-woven, warm, nothing plastic about it. The unglamorous task made to look
  like it belongs in the room. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate #japandi #laundryroom #organized"
- **TikTok caption:** "A woven seagrass hamper, lid and all — laundry that doesn't look like
  laundry. Shop link in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate #japandi #laundryroom"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the tall lidded seagrass hamper itself, by a window
    — MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: caption describes exactly what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

---

## QA summary

| # | Piece | Checks 1/3/4/5 | Disclosure | Result |
|---|-------|----------------|------------|--------|
| 1 | Bar cart, oak + matte black | PASS | PASS | **PASS** |
| 2 | Framed botanical wall art, set of 3 | PASS | PASS | **PASS** |
| 3 | Round walnut-tone coffee table | PASS | PASS | **PASS** |
| 4 | Artificial olive tree, 5ft potted | PASS | PASS | **PASS** |
| 5 | Seagrass laundry hamper with lid | PASS | PASS | **PASS** |

**5/5 pieces PASS (100%). 10/10 posts (IG+TikTok ×5) ready to schedule.**

Check 2 (section-title match), Check 6 (cross-article ASIN consistency) and Check 9 (hub
reconciliation) don't apply directly to social captions (no `<h2>` sections or site hub touched
here). Check 8 (sitewide degraded-ASIN resweep) applied directly during sourcing — see "sourcing
method" above.

## What needs Cameron

1. **Schedule or reject this batch.** All 10 posts are QA-clean and ready; nothing is blocked
   technically. Sitting in `final pins/batches/2026-10-18/` for review per the review-gate policy.
2. **Five open content-factory branches now** (`2026-09-20`, `2026-09-27`, `2026-10-04`,
   `2026-10-11`, and this one, `2026-10-18`). None have shipped per live `blotato_list_posts`
   data this run. If several ship at once, their proposed dates will need manual deconfliction —
   this batch's own dates (2026-10-19 through 2026-10-23) assume it ships alone or first.
3. **`_asin-to-pin.js` needs a home on `main`, not just inside batch branches — now a 4th repeat
   of the same gap** (first flagged 2026-10-11, recurs again this run). It's a build-time tool,
   not public-facing content, so the review-gate rationale for staging social output doesn't
   obviously apply to it. Worth either merging it to `main` directly via its own small PR (the
   same path seo-ranker already uses for code) or explicitly deciding it should keep living
   branch-by-branch — right now every single batch re-pays the cost of rediscovering and
   re-copying it.
4. **Pinterest runway: 11 days as of this run, independently corroborating today's CEO-briefing
   finding of the same number.** Not a missed posting day yet, but two independent checks the same
   day agree the queue has crossed under the 14-day line for the first time. This run did not
   build Pinterest content (per this week's instruction not to rebuild an already-full channel,
   and 11 days isn't "empty") — flagging so whoever reviews this batch has it in view alongside
   the IG/TikTok gap.
5. **This batch's files live inside `final pins/`, which `.gitignore` normally excludes.**
   Force-added (`git add -f`) for this commit, same pattern as every prior batch, so the manifest
   and media are reviewable from a cloud CEO session.
6. Runway math: these 5 days (10-19 through 10-23) would help IG/TikTok's forward queue if
   scheduled, but don't close the gap permanently — the standing "no `publisher` backstop trigger"
   finding and the `database.blotato.io` egress block are both still open, now compounding across
   a 5th unscheduled batch.
