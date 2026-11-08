# Content Factory — Batch 2026-11-08

**Built by:** content-factory (cloud routine, weekly fire, 2026-11-08T12:xx UTC)
**Status:** STAGED — not published. Per `CONTROL.md`'s 2026-09-14 "Public-facing review gate,"
no Blotato post/schedule/upload tool was called anywhere in this run. Cameron reviews this manifest
and schedules it (or sends it back) from a session with real network access to `database.blotato.io`.

## CONTROL.md read first

`PAUSE: false` — proceeded. Re-read the 2026-09-14 public-facing review gate section in full
(stage-only, no Blotato post/schedule/upload call) and the platform-pause flags (Pinterest/
Instagram/TikTok all listed `active`). Read `CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-09-14
content-factory entries named in this week's task — all four still hold on a fresh clone:
`final pins/`, `01-brand-assets/`–`05-products-by-day/`, and `Pin Copy Library*.md` are gitignored/
local-only and absent here (confirmed via `.gitignore` + directory listing); `database.blotato.io`
upload egress is a standing sandbox policy block, not re-tested this run since no upload tool was
called; `_add-audio-bed.js` syntax-checked clean (`node --check`) before use; every post below
carries the FTC disclosure sentence + `#affiliate`.

## Live state checked this run (before building anything)

- **`blotato_list_accounts`:** all three accounts connected and reachable — instagram `calmandoak`
  (id 53849), pinterest `CalmandOak` (id 7556), tiktok `calmandoak` (id 47113). **No contradiction**
  with `CONTROL.md`'s "all three active" platform-pause flags at the account level — nothing to flag
  here.
- **`blotato_list_posts(status=scheduled, 2026-11-08→2026-12-15, all platforms)`:** **129 Pinterest
  items, 2026-11-08T15:05Z→2026-12-04T00:05Z — zero gaps, ~26 days' runway.** Matches today's CEO
  daily-briefing #50 finding exactly. **Zero Instagram, zero TikTok scheduled items** — confirms the
  dry queue on both.
- **`blotato_list_posts(status=published, instagram+tiktok, since=2026-09-15)`:** last published item
  on either platform is **2026-10-06** (the "Orchard" apparel-line post, both IG and TikTok) — **33
  consecutive days dark** as of today, matching the ledger's count.
- **Decision this makes:** Pinterest is not a channel to rebuild this run — it already has deep,
  gap-free runway. This batch is **Instagram + TikTok only**, 5 products × 2 platforms = 10 posts,
  matching the shape of the 10-04/10-11/10-18 refill batches rather than 11-01's 3-platform build.
- `database.blotato.io` egress not tested directly this run (no post/upload tool called, per this
  week's explicit instruction) — unchanged standing blocker per every prior ledger finding.

## Branch / ASIN overlap check (done before sourcing)

Fetched all remote branches explicitly (`git fetch origin --prune`) and pulled each of the 7 open
`content-factory/*` branches' own manifest ASIN list directly (`2026-09-20` through `2026-11-01` —
none have been merged; batch branches never get merged per `CONTROL.md`'s content-factory pipeline
note, only reviewed/scheduled or sent back). **39 ASINs excluded** (38 real products + the one
degraded ASIN):
`B08G46J76G, B08GDW5JYF, B09HKN2ZRT, B0BZ3GHM8N, B0DC6FQKYR, B0FJY1RVL3, B0C61MWTJV, B0D41PKP16,
B0FT361HDX, B09493XGR5, B0CRRKDKVT, B0F23L8X2H, B0F4K9SP6N, B0GH7FV6GJ, B07CGZN4QP, B07F266PMS,
B085LTJM3D, B0CRTNWCV9, B0GGB15KZ3, B07M798215, B0888JVZH4, B0BZ489W7B, B0C14RGKK7, B0G39P4V86,
B01IMZLNBE, B07FYYSR65, B086372L8W, B0B2156DH5, B0CJD73LV6, B0D31739VD, B0D6YRJLCP, B0D7BWWVC7,
B0DH21GJ15, B0DRHQ1FKP (degraded — THKSHOUZ pedestal), B0FS6FNW7D, B07T81461V, B0C4SZBN64,
B0CFF6XKN5, B0FFMF13MV, B0FQV1Y3PR`. None of the 5 ASINs below appear in that list. None of the 7
open branches have shipped yet either (same zero-scheduled/zero-published evidence above for IG/
TikTok) — this batch is additive, not a replacement.

**Important correction to last week's own ledger note:** `_asin-to-pin.js` is now present on `main`
(merged via PR #15, commit `e3897353`, confirmed via `git branch -r --contains` + `node --check`) —
this is the **first** content-factory run in 7 consecutive batches that did **not** have to re-pull
the script out of a prior unmerged branch. The "reusable tooling lands on main, not a batch branch"
rule worked as intended.

## Sourcing method (so the picture-product rule holds)

All 5 ASIN + image pairings were grepped directly out of already-live, tracked site pages' product
cards (`journal/best-linen-bedding/`, `journal/400-dollar-reading-nook/`,
`journal/300-dollar-living-room-textile-refresh/`, `journal/japandi-balcony/`,
`shop/lighting/`) — every image is the site's own tracked photo
(`assets/img/products-cropped/p-<ASIN>.jpg`), reused rather than invented. `www.amazon.com` was not
reachable from this sandbox (same standing egress block as every prior run, not re-tested), so no
new-ASIN sourcing was attempted — the ASIN bar is inherited from each live article's own prior
SAFEGUARDS/`PLACEHOLDER-AUDIT.md` verification before it shipped. **Every image was opened and
visually inspected directly against its alt text/product name before building** (SAFEGUARDS Check
1) — see per-piece QA below.

**Two candidates dropped pre-build on a real Check 1/Check 1a finding, not shipped and not counted
as batch failures:**
- `B0CG3Q4H5Q` ("stoneware ring/catch-dish with wood lid," from `journal/nightstand-styling/`) —
  opened `assets/img/products-cropped/p-B0CG3Q4H5Q.jpg` directly: it shows a wavy-edge white ceramic
  **tray** holding a candle and a wristwatch, not a small lidded dish. This is the exact mismatch
  `PLACEHOLDER-AUDIT.md` line 178 flagged back on 2026-05-24 ("Needs new image — thumbnail was salt
  cellar") — apparently never actually fixed on the live site, just never re-caught since. **Not
  fixed here** (out of this run's scope, `journal/nightstand-styling/` is a SEO-ranker file) — flagged
  below for Cameron/SEO-ranker, and logged to the ledger as a real, current site defect, not a stale
  historical note.
- `B09B7989F4` ("glass water carafe with wood stopper," same article) — the tracked image is real
  glass (the 2026-05-24 audit's "stoneware thumbnail was borrowed" problem does appear fixed), but
  it's cropped so tightly to the carafe's neck/shoulder that the wood stopper the copy and alt text
  both call out never enters frame — too close a call to defend under Check 1a (distinguishing-
  feature match) for a close-up vertical reel. Dropped rather than ship an unconfirmable claim.

Substituted two clean, verified replacements instead (below) — `B0DT6V6F33` (bouclé lumbar pillow,
4.6★/209 reviews per `PLACEHOLDER-AUDIT.md` line 176, "FIXED") and `B0CMD7H1NQ` (dried pampas
branches, 4.7★/2,712 reviews, `PRODUCT-CHANGES-LOG.md` line 239, "6 references cleared").

Checked the degraded-ASIN list (Check 8) explicitly: `B0DRHQ1FKP` and `B0118561IU` (the other
previously-flagged broken-image ASIN, from the 2026-11-01 manifest) were not used anywhere in this
batch.

`final pins/` content from prior sessions is gitignored/local-only and, as expected per
`CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-09-14 entry, absent from this fresh clone. Voice reconstructed
from `CONTROL.md`'s brand-voice section plus the phrasing of already-live, disclosure-compliant
Instagram/TikTok affiliate posts read this run (the 2026-09-24 desk-pad/monitor-stand/desk-lamp
posts) — warm, sensory, concrete, short declaratives with the occasional em-dash, "Shop at
calmandoak.com (link in bio)" / "Shop link in bio," no hype, no exclamation marks.

## Pipeline notes

- `node_modules` absent at session start (same finding as every prior run) — ran
  `npm install ffmpeg-static --no-save`, succeeded, no npm-registry egress issue.
- `node --check` run on `_pin-to-reel.js` and `_add-audio-bed.js` before relying on either, per this
  week's explicit instruction — both clean, zero syntax errors.
- All 5 pins built via `_asin-to-pin.js` (blur-fill background + contain-fit product, 1000×1500).
- All 5 reels built via `_pin-to-reel.js` (1080×1920, 12s, slow Ken Burns push) then
  `_add-audio-bed.js`.
- **Audio verified present on all 5 reels, not assumed:** ran the ffmpeg-static binary directly on
  each output file — every file shows an `aac`, 44100 Hz, mono audio stream alongside the `h264`
  video stream, and `volumedetect` on every one of the 5 reads mean −26.9 dB / max −14.0 dB,
  identical across all 5 — matches the level logged in the 2026-11-01 batch, an audible ambient bed,
  not silence.
- Every built pin/reel pair visually opened and compared against its product's alt text before
  inclusion (see per-piece QA below).

---

## Section A — 5 products × 2 platforms (Instagram + TikTok) = 10 posts

Pinterest skipped this batch — its queue already has 26 days' gap-free runway (confirmed live via
`blotato_list_posts` above), so this run follows the "don't rebuild a channel that's already full"
rule and puts the full batch toward the two dark channels instead.

### 1. Luafac 12" hand-woven rattan basket flush mount ceiling light
- **ASIN:** [B0DDC4GJSM](https://www.amazon.com/dp/B0DDC4GJSM?tag=calmandoak-20) — reused from
  `shop/lighting/index.html` ("Pendant pair" / "A woven pair for an island or a hallway"), also
  live across 50+ `shop/looks/*` pages as a standing verified lighting fixture
- **Media:** `pins/B0DDC4GJSM.jpg` (1000×1500) → `reels/B0DDC4GJSM.mp4` (1080×1920, 12s, AAC audio
  confirmed, 2634 KB)
- **Proposed schedule:** Instagram — 2026-11-09T16:00:00Z · TikTok — 2026-11-09T17:00:00Z
- **Instagram caption:** "A woven rattan basket catches the light instead of blocking it — warm
  pools on the ceiling, soft shadows through every gap in the weave. The easy swap for a flush mount
  that's been bothering you. Shop at calmandoak.com (link in bio). #japandi #lighting #rattandecor
  #flushmount #affiliate\n(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "A hand-woven rattan basket over the bulb — warm light through every gap in
  the weave. Shop link in bio. #japandi #lighting #rattandecor #affiliate\n(As an Amazon Associate,
  Calm & Oak earns from qualifying purchases.)"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image opened directly — shows the exact woven rattan basket
    flush mount, lit warm, on a ceiling — MATCH
  - Check 3 (ASIN bar): inherited-verified via `shop/lighting/` + 50+ live `shop/looks/*` pages, not
    on either degraded-ASIN list — PASS (no explicit star/review figure printed on-page; treated as
    inherited per the same practice as prior batches, `www.amazon.com` unreachable to re-verify)
  - Check 4 (caption-image match): both captions describe exactly what's shown — MATCH
  - Check 5 (file resolution): both files present on disk — OK
  - Disclosure check: sentence + `#affiliate` present on both captions — PASS
  - **Result: PASS**

### 2. MIULEE oatmeal linen-textured semi-sheer curtain panels, pair
- **ASIN:** [B0DK21FLCK](https://www.amazon.com/dp/B0DK21FLCK?tag=calmandoak-20) — reused from
  `journal/best-linen-bedding/index.html` ("7. Oatmeal linen curtains — the light, softened")
- **Media:** `pins/B0DK21FLCK.jpg` (1000×1500) → `reels/B0DK21FLCK.mp4` (1080×1920, 12s, AAC audio
  confirmed, 3185 KB)
- **Proposed schedule:** Instagram — 2026-11-10T16:00:00Z · TikTok — 2026-11-10T17:00:00Z
- **Instagram caption:** "Oatmeal linen-textured curtains that filter the morning light instead of
  blocking it — semi-sheer, back-tab, the same tone as the bedding underneath. Light-filtering, not
  blackout, by design. Shop at calmandoak.com (link in bio). #japandi #linencurtains #bedroom
  #naturallight #affiliate\n(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "Oatmeal linen curtains, semi-sheer — they soften the light instead of
  blocking it. Shop link in bio. #japandi #linencurtains #bedroom #affiliate\n(As an Amazon
  Associate, Calm & Oak earns from qualifying purchases.)"
- **SAFEGUARDS QA:**
  - Check 1: image opened directly — shows the exact oatmeal linen-textured panels filtering window
    light — MATCH
  - Check 3: `PLACEHOLDER-AUDIT.md` line 175 — 4.6★ / 3,861 reviews / $36.99 / in stock / no returns
    flag; article text independently states "4.6 stars across more than 4,000 reviews" — PASS
  - Check 4: both captions match what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 3. VASAGLE MAEZO 2-tier round side table, honey brown
- **ASIN:** [B0B18NB7ZF](https://www.amazon.com/dp/B0B18NB7ZF?tag=calmandoak-20) — reused from
  `journal/400-dollar-reading-nook/index.html` ("2. The side table — $70"), explicitly
  visually-reconfirmed and substituted in by SEO-ranker on 2026-10-20 (PR #11) as a degraded-ASIN
  replacement, so it carries its own recent confirmation trail
- **Media:** `pins/B0B18NB7ZF.jpg` (1000×1500) → `reels/B0B18NB7ZF.mp4` (1080×1920, 12s, AAC audio
  confirmed, 2541 KB)
- **Proposed schedule:** Instagram — 2026-11-11T16:00:00Z · TikTok — 2026-11-11T17:00:00Z
- **Instagram caption:** "A round honey-oak side table, two tiers, tapered legs — the top holds the
  lamp and the book, the lower shelf holds whatever doesn't fit. Round stays a perch; square becomes
  a desk. Shop at calmandoak.com (link in bio). #japandi #sidetable #livingroom #smallspace
  #affiliate\n(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "Round, two tiers, honey oak — the side table that never turns into a desk.
  Shop link in bio. #japandi #sidetable #livingroom #affiliate\n(As an Amazon Associate, Calm & Oak
  earns from qualifying purchases.)"
- **SAFEGUARDS QA:**
  - Check 1: image opened directly — shows the exact round 2-tier honey-brown table, plant + book
    on top, lamp + books on lower shelf — MATCH
  - Check 3: "2,900+ reviews" per article text; visually reconfirmed live by SEO-ranker 2026-10-20
    (PR #11); not on either degraded list — PASS
  - Check 4: both captions match what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 4. Cream bouclé lumbar pillow
- **ASIN:** [B0DT6V6F33](https://www.amazon.com/dp/B0DT6V6F33?tag=calmandoak-20) — reused from
  `journal/300-dollar-living-room-textile-refresh/index.html` ("5. The fine accent — $30")
- **Media:** `pins/B0DT6V6F33.jpg` (1000×1500) → `reels/B0DT6V6F33.mp4` (1080×1920, 12s, AAC audio
  confirmed, 2591 KB)
- **Proposed schedule:** Instagram — 2026-11-12T16:00:00Z · TikTok — 2026-11-12T17:00:00Z
- **Instagram caption:** "The fine layer a sofa's been missing — one cream bouclé lumbar, placed
  off-center, not a matching pair at each end. The three-weight rule of Japandi textiles: heavy
  throw, medium pillows, one fine lumbar on top. Shop at calmandoak.com (link in bio). #japandi
  #boucle #lumbarpillow #livingroom #affiliate\n(As an Amazon Associate, Calm & Oak earns from
  qualifying purchases.)"
- **TikTok caption:** "One cream bouclé lumbar — never a pair. The detail that finishes a sofa. Shop
  link in bio. #japandi #boucle #lumbarpillow #affiliate\n(As an Amazon Associate, Calm & Oak earns
  from qualifying purchases.)"
- **SAFEGUARDS QA:**
  - Check 1: image opened directly — shows the exact cream bouclé lumbar pillow on a woven rattan
    bench — MATCH
  - Check 3: `PLACEHOLDER-AUDIT.md` line 176 — 4.6★ / 209 reviews / $18.99 / in stock / no returns
    flag — PASS (at the ≥200-review line, no exception needed)
  - Check 4: both captions match what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 5. Dried pampas branches, set of three
- **ASIN:** [B0CMD7H1NQ](https://www.amazon.com/dp/B0CMD7H1NQ?tag=calmandoak-20) — reused from
  `journal/japandi-balcony/index.html`
- **Media:** `pins/B0CMD7H1NQ.jpg` (1000×1500) → `reels/B0CMD7H1NQ.mp4` (1080×1920, 12s, AAC audio
  confirmed, 4570 KB)
- **Proposed schedule:** Instagram — 2026-11-13T16:00:00Z · TikTok — 2026-11-13T17:00:00Z
- **Instagram caption:** "Three tall dried pampas stems, generous and full — the same scale and
  silhouette as a potted olive tree, with zero watering and zero risk of it dying the week you
  travel. Shop at calmandoak.com (link in bio). #japandi #driedpampas #driedflorals #homedecor
  #affiliate\n(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "Dried pampas, tall and generous — all the scale of a live plant, none of the
  watering. Shop link in bio. #japandi #driedpampas #homedecor #affiliate\n(As an Amazon Associate,
  Calm & Oak earns from qualifying purchases.)"
- **SAFEGUARDS QA:**
  - Check 1: image opened directly — shows the exact tall dried pampas stems in glass vessels —
    MATCH
  - Check 3: `PRODUCT-CHANGES-LOG.md` line 239 — 4.7★ / 2,712 reviews / $34.98 / in stock / ships
    from Amazon / no returns flag — PASS
  - Check 4: both captions match what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

---

## QA summary

**5/5 pieces PASS, 0 FAIL.** 2 candidates (`B0CG3Q4H5Q`, `B09B7989F4`) dropped pre-build on real
Check 1/1a findings and substituted before any post was drafted, so they don't count as batch
failures — see sourcing note above. 10 posts total (5 products × 2 platforms: Instagram + TikTok;
Pinterest skipped, queue already full), all disclosure-checked, all picture-product matched, zero
degraded ASINs.

## What needs Cameron

1. **Review and schedule (or send back) this manifest.** Proposed slots stagger one product/day,
   2026-11-09 through 2026-11-13, Instagram 16:00 UTC / TikTok 17:00 UTC — matching the cadence used
   in the 2026-11-01 batch. Adjust freely — these are proposals, not commitments.
2. **`database.blotato.io` egress is still the blocker** on this batch and all 7 prior ones (now 8
   staged, unscheduled) — the fix is adding `database.blotato.io` to this cloud environment's
   allowed domains, or scheduling from a session/device with real network access.
3. **Real, live SAFEGUARDS Check 1 defect found on the live site, not just a staged-batch issue:**
   `journal/nightstand-styling/index.html`'s "small catch-dish" product card
   (`B0CG3Q4H5Q`) links a stoneware catch-dish but its tracked image shows a ceramic tray with a
   candle and a wristwatch on it — a real, currently-live picture-product mismatch, the exact
   failure class `SAFEGUARDS.md` exists to catch, first flagged in `PLACEHOLDER-AUDIT.md` on
   2026-05-24 and apparently never fixed. Worth a SEO-ranker pass to re-source the image or swap the
   product. (Content-factory routed around it for this batch; out of scope to fix the site page
   directly.)
2b. **Secondary, lower-confidence finding:** the same article's water-carafe card (`B09B7989F4`) has
   a real glass-carafe image but cropped tight enough that the wood stopper the copy promises never
   enters frame — not a hard Check 1 failure (product type matches) but worth a wider crop next time
   that page is touched.
4. **8 content-factory batches now staged** (09-20 through 11-08), all unscheduled, same root cause.
