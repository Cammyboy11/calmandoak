# Content Factory — Batch 2026-11-15

**Built by:** content-factory (cloud routine, weekly fire, 2026-11-15T12:xx UTC)
**Status:** STAGED — not published. Per `CONTROL.md`'s 2026-09-14 "Public-facing review gate,"
no Blotato post/schedule/upload tool was called anywhere in this run. Cameron reviews this manifest
and schedules it (or sends it back) from a session with real network access to `database.blotato.io`.

## CONTROL.md read first

`PAUSE: false` — proceeded. Re-read the 2026-09-14 public-facing review gate section in full
(stage-only, no Blotato post/schedule/upload call this week) and the platform-pause flags
(Pinterest/Instagram/TikTok all listed `active`). Read `CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-09-14
content-factory entries named in this week's task — all four still hold on this fresh clone:
`final pins/`, `01-brand-assets/`–`05-products-by-day/`, and `Pin Copy Library*.md` are gitignored/
local-only and absent here (confirmed via `.gitignore` + directory listing, voice reconstructed from
`CONTROL.md`'s brand-voice section plus already-published post copy below); `database.blotato.io`
upload egress was not re-tested this run (no post/upload tool called, per this week's explicit
instruction); `_add-audio-bed.js`/`_pin-to-reel.js` both syntax-checked clean (`node --check`) before
use; every post below carries the FTC disclosure sentence + `#affiliate`.

## Live state checked this run (before building anything)

- **`blotato_list_accounts`:** all three accounts connected and reachable — instagram `calmandoak`
  (id 53849), pinterest `CalmandOak` (id 7556), tiktok `calmandoak` (id 47113). **No contradiction**
  with `CONTROL.md`'s "all three active" platform-pause flags at the account level — nothing to flag
  here.
- **`blotato_list_posts(status=scheduled, 2026-11-15→2026-12-20, all platforms)`:** **105 Pinterest
  items, 2026-11-15T15:05Z→2026-12-04T00:05Z — zero gaps, 19-day runway.** Matches today's CEO
  daily-briefing #58 finding exactly. **Zero Instagram, zero TikTok scheduled items** — confirms the
  dry queue on both.
- **`blotato_list_posts(status=published, instagram+tiktok, since=2026-09-15)`:** last published item
  on either platform is still **2026-10-06** (the "Orchard" apparel-line post, both IG and TikTok) —
  **40 consecutive days dark** as of today, matching the ledger's count.
- **Decision this makes:** Pinterest is not a channel to rebuild this run — 19 days is still well
  clear of the 14-day urgent line. This batch is **Instagram + TikTok only**, 5 products × 2
  platforms = 10 posts, matching the shape of the 10-04/10-11/10-18/11-08 refill batches.
- `database.blotato.io` egress not tested directly this run (no post/upload tool called, per this
  week's explicit instruction) — unchanged standing blocker per every prior ledger finding.

## Branch / ASIN overlap check (done before sourcing)

Fetched all remote branches explicitly (`git fetch origin --prune`) and pulled each of the 8 open
`content-factory/*` branches' own manifest ASIN list directly (`2026-09-20` through `2026-11-08` —
none have been merged; batch branches never get merged per `CONTROL.md`'s content-factory pipeline
note, only reviewed/scheduled or sent back). The 2026-11-08 manifest's own list is already cumulative
of every prior batch, so it alone covers the full exclusion set — **47 ASINs excluded** (46 real
products + the one degraded ASIN):
`B0118561IU, B01IMZLNBE, B07CGZN4QP, B07F266PMS, B07FYYSR65, B07M798215, B07T81461V, B085LTJM3D,
B086372L8W, B0888JVZH4, B08G46J76G, B08GDW5JYF, B09493XGR5, B09B7989F4, B09HKN2ZRT, B0B18NB7ZF,
B0B2156DH5, B0BZ3GHM8N, B0BZ489W7B, B0C14RGKK7, B0C4SZBN64, B0C61MWTJV, B0CFF6XKN5, B0CG3Q4H5Q,
B0CJD73LV6, B0CMD7H1NQ, B0CRRKDKVT, B0CRTNWCV9, B0D31739VD, B0D41PKP16, B0D6YRJLCP, B0D7BWWVC7,
B0DC6FQKYR, B0DDC4GJSM, B0DH21GJ15, B0DK21FLCK, B0DRHQ1FKP (degraded — THKSHOUZ pedestal), B0DT6V6F33,
B0F23L8X2H, B0F4K9SP6N, B0FFMF13MV, B0FJY1RVL3, B0FQV1Y3PR, B0FS6FNW7D, B0FT361HDX, B0G39P4V86,
B0GGB15KZ3, B0GH7FV6GJ`. None of the 5 ASINs below appear in that list. None of the 8 open branches
have shipped yet either (same zero-scheduled/zero-published evidence above for IG/TikTok) — this
batch is additive, not a replacement.

`_asin-to-pin.js` confirmed still on `main` (via PR #15) and syntax-checked clean this run — no
re-pull from a prior unmerged branch needed, same as the 2026-11-08 run.

## Sourcing method (so the picture-product rule holds)

All 5 ASIN + image pairings were grepped directly out of already-live, tracked site pages' product
cards (`journal/single-stem-rule/`, `journal/best-japandi-nightstands/`,
`shop/looks/the-office-gallery-wall/`, `journal/500-dollar-dining-table-set/`,
`journal/sunday-morning-kitchen/`) — every image is the site's own tracked photo
(`assets/img/products-cropped/p-<ASIN>.jpg`), reused rather than invented, per Check 10 (ASIN reuse
when Amazon egress is blocked — `www.amazon.com` was not reachable from this sandbox, same standing
block as every prior run, not re-tested). **Every image was opened and visually inspected directly
against its product class before building** (SAFEGUARDS Check 1) — see per-piece QA below. Picked
across five different rooms (decor, bedroom, office/living, dining, kitchen) rather than clustering
in one, for feed variety.

**One sub-detail noted, not a mismatch:** `B0DYNB5K2V`'s on-page alt text calls it "...with one slim
dried stem," but the actual tracked photo shows a full, leafy eucalyptus bunch, not a single slim
stem — this would be a Check 1a problem if the original alt text were reused as the caption. Not
reused: both captions below were written fresh against what the image actually shows (a ribbed
stoneware vase with a generous eucalyptus bunch), so this does not propagate into the post itself.
Flagging for whichever role next touches `journal/single-stem-rule/` directly, since that article's
own copy may rely on the "single stem" framing against this same image.

Checked the degraded-ASIN list (Check 8) explicitly: `B0DRHQ1FKP` and `B0118561IU` were not used
anywhere in this batch.

`final pins/` content from prior sessions is gitignored/local-only and, as expected per
`CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-09-14 entry, absent from this fresh clone. Voice reconstructed
from `CONTROL.md`'s brand-voice section plus the phrasing of already-live, disclosure-compliant
Instagram/TikTok affiliate posts read this run (the 2026-09-24 desk-pad/monitor-stand/desk-lamp
posts, the 2026-09-17/18 lighting/tray/shelving posts) — warm, sensory, concrete, short declaratives
with the occasional em-dash, "Shop at calmandoak.com (link in bio)" / "Shop link in bio," no hype, no
exclamation marks.

## Pipeline notes

- `node_modules` absent at session start (same finding as every prior run) — ran
  `npm install ffmpeg-static --no-save`, succeeded, no npm-registry egress issue.
- `node --check` run on `_pin-to-reel.js`, `_add-audio-bed.js`, and `_asin-to-pin.js` before relying
  on any of them, per this week's explicit instruction — all three clean, zero syntax errors.
- All 5 pins built via `_asin-to-pin.js` (blur-fill background + contain-fit product, 1000×1500).
  ffmpeg logs a harmless `image2 ... does not contain an image sequence pattern` warning on every
  single-frame JPEG write — non-fatal, confirmed by `OK -> ...` on every one of the 5 and a real file
  on disk afterward, same as prior batches.
- All 5 reels built via `_pin-to-reel.js` (1080×1920, 12s, slow Ken Burns push) then
  `_add-audio-bed.js`.
- **Audio verified present on all 5 reels, not assumed:** ran the ffmpeg-static binary directly on
  each output file — every file shows an `aac`, 44100 Hz, mono audio stream alongside the `h264`
  video stream, and `volumedetect` on every one of the 5 reads mean −26.9 dB / max −14.0 dB,
  identical across all 5 and identical to the level logged in the 2026-11-08 and 2026-11-01 batches —
  an audible ambient bed, not silence.
- One reel (`B084HCTYZ7`) spot-checked by extracting a mid-clip frame and viewing it directly — the
  nightstand renders sharp and undistorted in the 9:16 frame, confirming the Ken Burns pass doesn't
  break the picture-product match established on the still.

---

## Section A — 5 products × 2 platforms (Instagram + TikTok) = 10 posts

Pinterest skipped this batch — its queue already has 19 days' gap-free runway (confirmed live via
`blotato_list_posts` above), so this run follows the "don't rebuild a channel that's already full"
rule and puts the full batch toward the two dark channels instead.

### 1. Cream ribbed stoneware vase with eucalyptus stems
- **ASIN:** [B0DYNB5K2V](https://www.amazon.com/dp/B0DYNB5K2V?tag=calmandoak-20) — reused from
  `journal/single-stem-rule/` ("bud vase" product card)
- **Media:** `pins/B0DYNB5K2V.jpg` (1000×1500) → `reels/B0DYNB5K2V.mp4` (1080×1920, 12s, AAC audio
  confirmed, 2862 KB)
- **Proposed schedule:** Instagram — 2026-11-16T16:00:00Z · TikTok — 2026-11-16T17:00:00Z
- **Instagram caption:** "A ribbed stoneware vase and a loose bunch of eucalyptus — the whole
  arrangement is the texture of the clay and the shape the stems fall into on their own. No florist
  required. Shop at calmandoak.com (link in bio). #japandi #homedecor #stillife #slowliving
  #affiliate\n(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "A ribbed stoneware vase, a loose bunch of eucalyptus, no florist required.
  Shop link in bio. #japandi #homedecor #stillife #affiliate\n(As an Amazon Associate, Calm & Oak
  earns from qualifying purchases.)"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image opened directly — shows the exact ribbed cream stoneware
    vase holding a full eucalyptus bunch on a wood surface — MATCH (caption describes "a loose
    bunch," not the on-page alt text's "one slim stem" — see sourcing note above)
  - Check 3 (ASIN bar): inherited-verified via `journal/single-stem-rule/`'s own prior SAFEGUARDS
    pass, not on either degraded-ASIN list — PASS (no explicit star/review figure printed on-page;
    `www.amazon.com` unreachable to re-verify, same as every prior batch)
  - Check 4 (caption-image match): both captions describe exactly what's shown — MATCH
  - Check 7 (disclosure): both captions carry the disclosure sentence + `#affiliate` — PASS

### 2. Nathan James Mina rattan-and-oak nightstand
- **ASIN:** [B084HCTYZ7](https://www.amazon.com/dp/B084HCTYZ7?tag=calmandoak-20) — reused from
  `journal/best-japandi-nightstands/` ("the easy all-rounder" product card)
- **Media:** `pins/B084HCTYZ7.jpg` (1000×1500) → `reels/B084HCTYZ7.mp4` (1080×1920, 12s, AAC audio
  confirmed, 2521 KB)
- **Proposed schedule:** Instagram — 2026-11-17T16:00:00Z · TikTok — 2026-11-17T17:00:00Z
- **Instagram caption:** "Oak frame, one rattan drawer front, black metal legs — the nightstand that
  holds a lamp and a short stack of books without ever looking crowded. The easy all-rounder for
  almost any bedroom. Shop at calmandoak.com (link in bio). #japandi #nightstand #bedroomdecor
  #rattanfurniture #affiliate\n(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "Oak frame, rattan drawer front, black metal legs — the nightstand that never
  looks crowded. Shop link in bio. #japandi #nightstand #bedroomdecor #affiliate\n(As an Amazon
  Associate, Calm & Oak earns from qualifying purchases.)"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image opened directly — shows the exact oak-and-rattan
    nightstand bedside a bed, lamp and books on top — MATCH
  - Check 3 (ASIN bar): inherited-verified via `journal/best-japandi-nightstands/`'s own prior
    SAFEGUARDS pass, not on either degraded-ASIN list — PASS
  - Check 4 (caption-image match): both captions describe exactly what's shown — MATCH
  - Check 7 (disclosure): both captions carry the disclosure sentence + `#affiliate` — PASS

### 3. OSCHF 5-tier solid oak open bookcase
- **ASIN:** [B0CFLLZTC1](https://www.amazon.com/dp/B0CFLLZTC1?tag=calmandoak-20) — reused from
  `shop/looks/the-office-gallery-wall/` (product card)
- **Media:** `pins/B0CFLLZTC1.jpg` (1000×1500) → `reels/B0CFLLZTC1.mp4` (1080×1920, 12s, AAC audio
  confirmed, 3064 KB)
- **Proposed schedule:** Instagram — 2026-11-18T16:00:00Z · TikTok — 2026-11-18T17:00:00Z
- **Instagram caption:** "Five open oak shelves, each one deep enough for a real stack of books, a
  basket, a single plant. Storage that reads as a piece of furniture, not a solution to a problem.
  Shop at calmandoak.com (link in bio). #japandi #bookshelf #homeoffice #oakfurniture #affiliate\n(As
  an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "Five open oak shelves — storage that reads as furniture, not a fix. Shop link
  in bio. #japandi #bookshelf #homeoffice #affiliate\n(As an Amazon Associate, Calm & Oak earns from
  qualifying purchases.)"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image opened directly — shows the exact 5-tier oak open
    bookcase styled with books, a basket and a plant — MATCH
  - Check 3 (ASIN bar): inherited-verified via `shop/looks/the-office-gallery-wall/`'s own prior
    SAFEGUARDS pass, not on either degraded-ASIN list — PASS
  - Check 4 (caption-image match): both captions describe exactly what's shown — MATCH
  - Check 7 (disclosure): both captions carry the disclosure sentence + `#affiliate` — PASS

### 4. Stonewashed linen napkins, set of 6
- **ASIN:** [B07GSRCRV7](https://www.amazon.com/dp/B07GSRCRV7?tag=calmandoak-20) — reused from
  `journal/500-dollar-dining-table-set/` ("linen napkins (set of 6)" product card)
- **Media:** `pins/B07GSRCRV7.jpg` (1000×1500) → `reels/B07GSRCRV7.mp4` (1080×1920, 12s, AAC audio
  confirmed, 2502 KB)
- **Proposed schedule:** Instagram — 2026-11-19T16:00:00Z · TikTok — 2026-11-19T17:00:00Z
- **Instagram caption:** "Stonewashed linen napkins, stacked and fanned on an oak sideboard next to a
  stem of dried pampas. The cheapest way to make a weeknight table look set on purpose. Shop at
  calmandoak.com (link in bio). #japandi #tablescape #linennapkins #diningroom #affiliate\n(As an
  Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "Stonewashed linen napkins — the cheapest way to make a weeknight table look
  set on purpose. Shop link in bio. #japandi #tablescape #linennapkins #affiliate\n(As an Amazon
  Associate, Calm & Oak earns from qualifying purchases.)"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image opened directly — shows a fanned stack of linen napkins
    on an oak console — MATCH (the stock photo visibly shows 4 napkins fanned, not all 6 laid flat;
    the product title/ASIN is explicitly "set of 6" and the product class — linen napkins — still
    matches cleanly, same as the inherited verification on the live article)
  - Check 3 (ASIN bar): inherited-verified via `journal/500-dollar-dining-table-set/`'s own prior
    SAFEGUARDS pass, not on either degraded-ASIN list — PASS
  - Check 4 (caption-image match): both captions describe exactly what's shown — MATCH
  - Check 7 (disclosure): both captions carry the disclosure sentence + `#affiliate` — PASS

### 5. Tall matte cream stoneware utensil crock
- **ASIN:** [B0FWQBDBDY](https://www.amazon.com/dp/B0FWQBDBDY?tag=calmandoak-20) — reused from
  `journal/sunday-morning-kitchen/` (product card)
- **Media:** `pins/B0FWQBDBDY.jpg` (1000×1500) → `reels/B0FWQBDBDY.mp4` (1080×1920, 12s, AAC audio
  confirmed, 1700 KB)
- **Proposed schedule:** Instagram — 2026-11-20T16:00:00Z · TikTok — 2026-11-20T17:00:00Z
- **Instagram caption:** "A tall ribbed stoneware crock holding every wooden spoon and spatula
  handles-up — one object instead of a drawer you have to dig through. Shop at calmandoak.com (link
  in bio). #japandi #kitchendecor #stoneware #japandikitchen #affiliate\n(As an Amazon Associate,
  Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "One ribbed stoneware crock, every wooden spoon handles-up. Shop link in bio.
  #japandi #kitchendecor #stoneware #affiliate\n(As an Amazon Associate, Calm & Oak earns from
  qualifying purchases.)"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image opened directly — shows the exact ribbed cream stoneware
    crock holding wooden utensils handles-up — MATCH
  - Check 3 (ASIN bar): inherited-verified via `journal/sunday-morning-kitchen/`'s own prior
    SAFEGUARDS pass, not on either degraded-ASIN list — PASS
  - Check 4 (caption-image match): both captions describe exactly what's shown — MATCH
  - Check 7 (disclosure): both captions carry the disclosure sentence + `#affiliate` — PASS

---

## QA summary

**10/10 pieces passed all four applicable SAFEGUARDS checks (1, 3, 4, 7) — 100% pass rate, nothing
dropped this run.** Check 5 (image file resolution) and Checks 2/9/10-as-written don't apply to
social pieces the same way they do to journal articles; the equivalent diligence (every media file
confirmed present on disk, every ASIN checked against both the degraded list and the 47-ASIN
cross-batch exclusion list) is folded into the sourcing section above. Check 8 (sitewide
degraded-ASIN resweep) run explicitly against this batch's own 5 ASINs, not skipped.

## What needs Cameron

- **Review and schedule (or send back) this manifest** — staged only, nothing sent to Blotato.
- **Pinterest:** 19-day runway, no action needed this week.
- **Instagram/TikTok:** 40 consecutive days dark as of today; this batch is a partial refill (10
  posts covering 5 days at current 2/day cadence) — still well short of closing the gap entirely.
  Worth deciding whether a larger batch size or a different cadence is wanted given how long the
  channels have sat dark.
- **`journal/single-stem-rule/`'s alt text** for `B0DYNB5K2V` ("...with one slim dried stem") doesn't
  match the actual tracked photo (a full eucalyptus bunch) — flagged above, not fixed here (out of
  this run's scope), for SEO-ranker or a direct edit.
- Everything else (standing device-bound-trigger gaps, seat-counter disable, etc.) is tracked in
  `CONTROL.md`/the daily CEO briefing, not repeated here.
