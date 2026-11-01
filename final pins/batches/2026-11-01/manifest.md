# Content Factory — Batch 2026-11-01

**Built by:** content-factory (cloud routine, weekly fire, 2026-11-01T12:10 UTC)
**Status:** STAGED — not published. Per `CONTROL.md`'s 2026-09-14 "Public-facing review gate,"
no Blotato post/schedule/upload tool was called anywhere in this run. Cameron reviews this manifest
and schedules it (or sends it back) from a session with real network access to `database.blotato.io`.

## Live state checked this run (before building anything)

- **`blotato_list_accounts`:** all three accounts still connected and reachable — instagram
  `calmandoak` (id 53849), pinterest `CalmandOak` (id 7556), tiktok `calmandoak` (id 47113). No
  contradiction with `CONTROL.md`'s "all three active" platform-pause flags at the account level.
- **`blotato_list_posts(status=scheduled, 2026-11-01→2026-12-15)`:** **zero items, across all
  platforms.** This confirms today's CEO daily-briefing #44 finding (`CEO-BRIEF/LESSONS-LEDGER.md`,
  same date) — the Pinterest queue isn't low, it's genuinely empty, now a confirmed 4th consecutive
  dry day. No channel here is "already full" — every platform needs this batch.
- **`blotato_list_posts(status=published, instagram+tiktok, since=2026-10-01)`:** last published
  item on either platform is 2026-10-06 — **26 consecutive days dark**, matching the ledger's count
  exactly.
- **`database.blotato.io` egress:** not tested directly this run (no post/upload tool was called,
  per this week's explicit instruction), but per the 2026-10-30 ledger finding this remains the
  single blocker keeping every prior batch (6 open branches, 09-20 through 10-25) unscheduled. This
  batch doesn't change that — it's additive staged inventory for whenever a session with real
  upload access (or Cameron's own device) clears the backlog.

## Branch / ASIN overlap check (done before sourcing)

Fetched all remote branches explicitly (`git fetch origin '+refs/heads/*:refs/remotes/origin/*'
--prune` — a plain `git fetch`/`git branch -r` on a fresh clone under-reports remote branches, per
today's CEO briefing #44 finding) and pulled every manifest's ASIN list directly from all six open
`content-factory/*` branches (`2026-09-20`, `2026-09-27`, `2026-10-04`, `2026-10-11`, `2026-10-18`,
`2026-10-25`) before picking anything. 34 ASINs excluded (33 real products + the one degraded ASIN):
`B01IMZLNBE, B07CGZN4QP, B07F266PMS, B07FYYSR65, B07M798215, B085LTJM3D, B086372L8W, B0888JVZH4,
B08G46J76G, B08GDW5JYF, B09493XGR5, B09HKN2ZRT, B0B2156DH5, B0BZ3GHM8N, B0BZ489W7B, B0C14RGKK7,
B0C61MWTJV, B0CJD73LV6, B0CRRKDKVT, B0CRTNWCV9, B0D31739VD, B0D41PKP16, B0D6YRJLCP, B0D7BWWVC7,
B0DC6FQKYR, B0DH21GJ15, B0DRHQ1FKP (degraded — THKSHOUZ pedestal, confirmed still present in
`content-factory/2026-10-25`'s own manifest — not this run's branch to fix, flagged below),
B0F23L8X2H, B0F4K9SP6N, B0FJY1RVL3, B0FS6FNW7D, B0FT361HDX, B0G39P4V86, B0GGB15KZ3, B0GH7FV6GJ`.
None of the 5 ASINs below appear in that list. **None of the six open branches have shipped yet
either** (same zero-published evidence above) — this batch is additive, not a replacement; closing
another run's branch isn't this run's call.

## Sourcing method (so the picture-product rule holds)

All 5 ASIN + image pairings were grepped directly out of already-live, tracked journal pages'
product cards (`journal/japandi-christmas/`, `journal/best-japandi-gifts/`, and
`journal/best-japandi-lighting/`) — every image is the site's own tracked photo
(`assets/img/products-cropped/p-<ASIN>.jpg`) for that exact ASIN, reused rather than invented.
`www.amazon.com` was not reachable from this sandbox (same standing egress block as every prior
run — not re-tested since the outcome is already well established), so no new-ASIN sourcing or live
re-verification (star rating, review count, stock, Frequently-Returned badge) was attempted — the
ASIN bar is inherited from each live article's own prior SAFEGUARDS verification before it shipped.
Every image was opened and visually compared against its linked product's alt text before building
(SAFEGUARDS Check 1) — see per-piece QA below.

**One substitution made on quality grounds, not a SAFEGUARDS failure in the strict sense:** the
6th candidate ASIN sourced from `journal/best-japandi-gifts/` (`B0118561IU`, "waffle linen bath
towel set of 6") has a tracked product photo
(`assets/img/products-cropped/p-B0118561IU.jpg`) with severe compression/exposure artifacts —
blown highlights, visible banding, aliased edges — bad enough on direct visual inspection that it
reads as broken rather than merely low-resolution. The product *type* in the image still matches
the alt text (it is towels), so this isn't strictly a Check 1 picture-product mismatch, but
shipping a visibly artifacted image to Pinterest/Instagram fails the premium-editorial bar
`SAFEGUARDS.md` exists to protect ("Premium editorial sites earn trust by being correct"). Dropped
it rather than force it through, and substituted a 5th clean product
(`B0C4SZBN64`, PoKat ceramic bedside lamp pair, from `journal/best-japandi-lighting/`) sourced the
same way. **This is the first time this specific failure mode (tracked photo already live and
AI/alt-text-correct, but visually broken on inspection) has been named in this ledger** — flagged
in `CEO-BRIEF/LESSONS-LEDGER.md` for Cameron/SEO-ranker, since the same bad image is still live on
`journal/best-japandi-gifts/` itself, outside this run's scope to fix.

Checked the degraded-ASIN list (Check 8) explicitly: `B0DRHQ1FKP` was not used anywhere in this
batch (confirmed via grep against the built batch directory, see command below).

`final pins/` content from prior sessions (`01-brand-assets` through `05-products-by-day`, any
pin-template/copy-library inventory, `Pin Copy Library*.md`) is gitignored/local-only and, as
expected per `CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-09-14 entry, absent from this fresh clone. Voice
reconstructed from `CONTROL.md`'s brand-voice section plus the phrasing of the published Pinterest
posts read live this run (warm, sensory, second-person-light, ends in a plain save/shop prompt, no
hype, no exclamation marks).

## Pipeline notes (for the next run)

- `node_modules` was absent at session start (same finding as every prior content-factory run) —
  ran `npm install ffmpeg-static --no-save`, succeeded, no npm-registry egress issue.
- `node --check` run on both `_pin-to-reel.js` and `_add-audio-bed.js` before relying on either,
  per this week's explicit instruction — both clean, zero syntax errors.
- **`_asin-to-pin.js` was again absent from `main`,** present only on
  `origin/content-factory/2026-10-25` — a 6th consecutive batch pulling the same file back out of a
  prior unmerged branch (first flagged 2026-10-11, re-flagged every batch since). Copied into this
  working tree to build at all, but **not added to this batch branch's commit** — per `CONTROL.md`'s
  content-factory pipeline note ("reusable tooling lands on `main`, not a batch branch"), silently
  re-adding it to yet another batch branch that will never be merged doesn't fix anything. Opened a
  separate, minimal PR (`tooling/asin-to-pin-2026-11-01` → `main`, no batch content, just this one
  script) so this can actually be merged once instead of re-copied a 7th time next week — see
  TEAM-LOG.md for the PR link.
- All 5 pins built via `_asin-to-pin.js` (blur-fill background + contain-fit product, 1000×1500).
  Every output visually inspected directly (not sampled) — see per-piece QA below; one swap made on
  image-quality grounds (above).
- **Audio verified present on all 5 reels, not assumed:** ran `ffprobe` stream inspection
  (confirms an `aac`, 44.1kHz, mono audio stream alongside the `h264` video stream) plus
  `volumedetect` on every one of the 5 output files — every file reads mean −26.9dB / max −14.0dB,
  identical level across all 5, audible ambient bed, matching the level logged in prior batches, not
  silence.
- Pinterest pins in this batch are **stills only, no video** — matches the format of every live
  Pinterest post read this run (28 published items checked, all static images except 4 tablescape
  videos from a different, unrelated product line). Instagram/TikTok get the full reel with audio.

---

## Section A — 5 products × 3 platforms (Pinterest + Instagram + TikTok) = 15 posts

### 1. AmorArc hand-thrown speckled stoneware mug set of 4
- **ASIN:** [B0CFF6XKN5](https://www.amazon.com/dp/B0CFF6XKN5?tag=calmandoak-20) — reused from
  `journal/japandi-christmas/index.html` and `journal/best-japandi-gifts/index.html` ("the
  lowest-risk, highest-use gift on this list")
- **Media:** `pins/B0CFF6XKN5.jpg` (134 KB, 1000×1500) → `reels/B0CFF6XKN5.mp4` (1080×1920, 12s,
  AAC audio confirmed, 2264 KB)
- **Proposed schedule:** Pinterest — 2026-11-02T00:05:00Z · Instagram — 2026-11-02T16:00:00Z ·
  TikTok — 2026-11-02T17:00:00Z
- **Pinterest text:** "Four speckled stoneware mugs, hand-thrown and faintly uneven, hanging from a
  short oak tree beside two more on the counter. The kind of gift that gets used every single
  morning. Save this idea. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate"
- **Instagram caption:** "Four speckled stoneware mugs, hand-thrown so no two sit quite the same in
  your hand. The lowest-risk gift on our list this year — nobody turns down a mug that actually
  feels good to hold. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate #japandi #stonewaremugs #giftguide"
- **TikTok caption:** "Speckled stoneware mugs, hand-thrown, set of four. Shop link in bio. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #giftguide"
- **SAFEGUARDS QA:**
  - Check 1 (picture-product match): image opened and compared — shows the speckled hand-thrown
    mugs on their tree, two more on the counter — MATCH
  - Check 3 (ASIN bar): inherited-verified via two live articles; confirmed not on the degraded
    list — PASS
  - Check 4 (caption-image match): every caption describes exactly what's shown — MATCH
  - Check 5 (file resolution): both pin and reel present on disk — OK
  - Disclosure check: sentence + `#affiliate` present on all 3 captions — PASS
  - **Result: PASS**

### 2. Whitewashed neutral ceramic bud vases, set of 3
- **ASIN:** [B0FFMF13MV](https://www.amazon.com/dp/B0FFMF13MV?tag=calmandoak-20) — reused from
  `journal/japandi-christmas/index.html` and `journal/best-japandi-gifts/index.html`
- **Media:** `pins/B0FFMF13MV.jpg` (71 KB, 1000×1500) → `reels/B0FFMF13MV.mp4` (1080×1920, 12s,
  AAC audio confirmed, 1833 KB)
- **Proposed schedule:** Pinterest — 2026-11-02T12:05:00Z · Instagram — 2026-11-03T16:00:00Z ·
  TikTok — 2026-11-03T17:00:00Z
- **Pinterest text:** "Three whitewashed ceramic bottles in a line, tallest holding a few stems of
  dried pampas and bunny tails. One shape, three heights, all the arranging done for you. Save this
  idea. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate"
- **Instagram caption:** "Three whitewashed bottle vases, same glaze, three heights — line them up
  empty or let the tallest one hold a single dried stem. Either way the shelf looks finished. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #budvases
  #shelfstyling"
- **TikTok caption:** "Three whitewashed bud vases, one shelf, zero effort. Shop link in bio. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #budvases"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the three whitewashed bottle vases, tallest holding
    dried pampas/bunny tails — MATCH
  - Check 3: inherited-verified via two live articles; not on degraded list — PASS
  - Check 4: every caption matches what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 3. Hand-thrown cream reactive-glaze stoneware water pitcher
- **ASIN:** [B0FQV1Y3PR](https://www.amazon.com/dp/B0FQV1Y3PR?tag=calmandoak-20) — reused from
  `journal/japandi-christmas/index.html` and `journal/best-japandi-gifts/index.html`
- **Media:** `pins/B0FQV1Y3PR.jpg` (54 KB, 1000×1500) → `reels/B0FQV1Y3PR.mp4` (1080×1920, 12s,
  AAC audio confirmed, 1653 KB)
- **Proposed schedule:** Pinterest — 2026-11-02T15:05:00Z · Instagram — 2026-11-04T16:00:00Z ·
  TikTok — 2026-11-04T17:00:00Z
- **Pinterest text:** "A cream reactive-glaze stoneware pitcher, the kind with a little variation in
  every pour. Water at the table instead of a plastic bottle. Save this idea. As an Amazon
  Associate, Calm & Oak earns from qualifying purchases. #affiliate"
- **Instagram caption:** "A reactive-glaze stoneware pitcher — the glaze pools and speckles a little
  differently on every piece, so yours is actually yours. We fill it with water for the table and
  it still looks like the nicest thing in the room. As an Amazon Associate, Calm & Oak earns from
  qualifying purchases. #affiliate #japandi #stoneware #tablesetting"
- **TikTok caption:** "Reactive-glaze stoneware pitcher, no two alike. Shop link in bio. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #stoneware"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the cream reactive-glaze pitcher itself, on a plain
    ground — MATCH
  - Check 3: inherited-verified via two live articles; not on degraded list — PASS
  - Check 4: every caption matches what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 4. PoKat ceramic bedside table lamps, set of two
- **ASIN:** [B0C4SZBN64](https://www.amazon.com/dp/B0C4SZBN64?tag=calmandoak-20) — reused from
  `journal/best-japandi-lighting/index.html` (substituted in for the dropped towel ASIN, see
  sourcing note above)
- **Media:** `pins/B0C4SZBN64.jpg` (181 KB, 1000×1500) → `reels/B0C4SZBN64.mp4` (1080×1920, 12s,
  AAC audio confirmed, 2371 KB)
- **Proposed schedule:** Pinterest — 2026-11-02T18:05:00Z · Instagram — 2026-11-05T16:00:00Z ·
  TikTok — 2026-11-05T17:00:00Z
- **Pinterest text:** "A pair of ribbed ceramic table lamps in soft white, brass necks, linen drum
  shades — the easy way to make both sides of the bed match without trying too hard. Save this
  idea. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate"
- **Instagram caption:** "A matching pair of ribbed ceramic lamps, warm linen shades, a thin brass
  collar where the two meet. Buying lamps in twos is the fastest way a bedroom stops looking like
  two different decades. As an Amazon Associate, Calm & Oak earns from qualifying purchases.
  #affiliate #japandi #bedsidelamps #bedroom"
- **TikTok caption:** "Ribbed ceramic lamps, sold in twos, instantly matching nightstands. Shop link
  in bio. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #bedsidelamps"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the matching ribbed ceramic lamp pair, brass necks,
    linen shades — MATCH
  - Check 3: inherited-verified via live article; not on degraded list — PASS
  - Check 4: every caption matches what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

### 5. Woven hyacinth basket table lamp
- **ASIN:** [B07T81461V](https://www.amazon.com/dp/B07T81461V?tag=calmandoak-20) — reused from
  `journal/best-japandi-gifts/index.html` and `journal/best-japandi-lighting/index.html`
- **Media:** `pins/B07T81461V.jpg` (175 KB, 1000×1500) → `reels/B07T81461V.mp4` (1080×1920, 12s,
  AAC audio confirmed, 2604 KB)
- **Proposed schedule:** Pinterest — 2026-11-02T21:05:00Z · Instagram — 2026-11-06T16:00:00Z ·
  TikTok — 2026-11-06T17:00:00Z
- **Pinterest text:** "A woven hyacinth lamp base under a linen drum shade, on an oak console beside
  a stoneware vase of dried pampas. Warm light through natural weave instead of plastic. Save this
  idea. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate"
- **Instagram caption:** "A woven hyacinth base under a linen shade — the texture does the work a
  patterned lamp usually tries to do. Switched on, the weave throws its own soft shadow up the
  wall. As an Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi
  #tablelamp #livingroom"
- **TikTok caption:** "Woven hyacinth lamp base, linen shade, warm light. Shop link in bio. As an
  Amazon Associate, Calm & Oak earns from qualifying purchases. #affiliate #japandi #tablelamp"
- **SAFEGUARDS QA:**
  - Check 1: image opened and compared — shows the woven hyacinth lamp base and linen shade on an
    oak console — MATCH
  - Check 3: inherited-verified via two live articles; not on degraded list — PASS
  - Check 4: every caption matches what's shown — MATCH
  - Check 5: both files present on disk — OK
  - Disclosure check: PASS
  - **Result: PASS**

---

## QA summary

**5/5 pieces PASS, 0 FAIL.** 1 candidate (towel set, `B0118561IU`) dropped pre-build on image-quality
grounds and substituted before any post was drafted, so it doesn't count as a batch failure — see
sourcing note above. 15 posts total (5 products × 3 platforms), all disclosure-checked, all
picture-product matched, zero degraded ASINs.

## What needs Cameron

1. **`database.blotato.io` egress is still the single blocker** on this batch and all 6 prior ones —
   per the 2026-10-30/-31/11-01 ledger findings, the fix is adding `database.blotato.io` to this
   cloud environment's Allowed domains (Network settings), or scheduling from a session/device that
   already has it.
2. **The Pinterest vault-side approved-pin backlog is also empty**, separately from the egress
   block — this batch's Pinterest stills are one way to refill it once a session can actually
   upload.
3. **Review and schedule (or send back) this manifest.** Proposed Pinterest slots start
   2026-11-02T00:05Z and follow the queue's own established 00:05/12:05/15:05/18:05/21:05 UTC
   cadence; IG/TikTok staggered one product/day 2026-11-02 through 2026-11-06 at 16:00/17:00 UTC.
   Adjust freely — these are proposals, not commitments.
4. **The broken `B0118561IU` towel image is still live on `journal/best-japandi-gifts/`** — this
   run routed around it for social but didn't fix the site page itself (out of scope for
   content-factory). Worth a SEO-ranker pass to re-source or re-crop that product photo.
5. **Small standalone PR opened: `tooling/asin-to-pin-2026-11-01`** — just `_asin-to-pin.js`, no
   batch content. Merging it once would end the now-6-times-recurring "pull the script back out of
   last week's unmerged branch" pattern.
6. **The degraded ASIN `B0DRHQ1FKP` is still present in `content-factory/2026-10-25`'s own staged
   manifest** (confirmed via `git show` this run) — not this run's branch to edit, but worth knowing
   before that batch is scheduled as-is.
