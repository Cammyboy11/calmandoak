# Content Factory batch — 2026-11-22

**Platform:** Pinterest only, this run. Built in response to this week's CONTROL.md flag: Pinterest's
scheduled-post runway crossed under the 14-day urgent line on 2026-11-21 (13 days) and dropped again
2026-11-22 (12 days), with this week's Content Factory run named as the one to watch for a refill.
Not calling any Blotato post/schedule/upload tool, per the 2026-09-14 public-facing review gate
(confirmed still active in CONTROL.md's "Public-facing review gate" section) — this manifest is the
deliverable; Cameron reviews and schedules it from a session that can reach Blotato's upload host.

**Why Pinterest only:** `blotato_list_posts` (status=scheduled) checked live before building —
Pinterest's last scheduled item is 2026-12-04T00:05Z (the runway gap this batch addresses).
Instagram is running a real, near-daily cadence through 2026-11-27 (7 posts since 2026-11-20, all
compliant) via a pipeline with **no matching cloud trigger** — see CONTROL.md's 2026-11-22 update
and `CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-11-22 entry, already a named Decision Needed for Cameron.
Per this run's own instruction ("don't rebuild a channel that's already full"), skipped building new
Instagram/TikTok content — Instagram isn't short on runway this week, and piling more content onto a
channel fed by an unexplained pipeline risks ASIN collision with posts this session can't see.
TikTok is genuinely empty (0 scheduled items in the `instagram`+`tiktok` query window) and 47
consecutive days dark — but CONTROL.md still carries `TIKTOK: active`. **Flagging this contradiction,
not resolving it**, per this run's instruction: the platform-pause flag and the real posting history
disagree, and only Cameron can say whether that's an intentional pause nobody updated the flag for,
or a pipeline that's actually broken.

## Pre-flight (per CONTROL.md + LESSONS-LEDGER)
- Read `CONTROL.md` in full, including the 2026-09-14 "Public-facing review gate" section (confirmed
  still in force, 2026-11-22 update present) and `PAUSE: false` — proceeding.
- Read `CEO-BRIEF/LESSONS-LEDGER.md` in full. Confirmed: `final pins/`, `01-brand-assets/` through
  `05-products-by-day/`, and `Pin Copy Library*.md` are all gitignored/local-only and genuinely
  absent on this fresh clone (`find` confirms) — fell back to tracked `assets/img/products-cropped/`
  and reconstructed voice from `CONTROL.md`'s brand-voice section + the existing Pinterest queue's
  own caption style (`#ad · As an Amazon Associate we earn from qualifying purchases.` — matched
  exactly, not reworded).
- `database.blotato.io` egress: not tested this run — this week's instruction is explicit
  (**do not call any Blotato post/schedule/upload tool**), so there's nothing to attempt and nothing
  new to confirm about the block.
- `_asin-to-pin.js` (the 4:5 product-crop → 2:3 pin canvas tool, on `main` since 2026-11-01) was
  read in full before use — no syntax issues. `npm install ffmpeg-static --no-save` run first
  (confirmed working, matches the standing pre-flight note).
- `blotato_list_accounts`: 3 accounts connected — Instagram, Pinterest, TikTok. All match
  CONTROL.md's three named platforms; no contradiction on account connectivity itself.
- **Branch ASIN-overlap check:** pulled all 9 open `content-factory/*` branches
  (09-20, 09-27, 10-04, 10-11, 10-18, 10-25, 11-01, 11-08, 11-15) and extracted every `/dp/ASIN`
  from each branch's own manifest — 47 ASINs total (including the known-degraded `B0DRHQ1FKP`).
  All 10 ASINs below were checked against that exclusion list: zero overlap.

## Sourcing
All 10 images are tracked, already-live site assets (`assets/img/products-cropped/p-<ASIN>.jpg`),
each paired with an ASIN that is currently live on one or more real `journal/`/`shop/` pages (not
invented) — grepped directly for `amazon.com/dp/<ASIN>` across `journal/`, `shop/`, and
`assets/the-edit/` before selecting. Per SAFEGUARDS Check 10 (reuse an already-verified ASIN when
Amazon can't be re-checked live from this sandbox), all 10 ASINs are reused from existing site
product cards, most appearing on 4-8+ different live `shop/looks/*` pages — strong evidence they
were vetted when added and have stayed live since, not one-off placements.

**Every candidate image was opened and visually inspected before being selected** (SAFEGUARDS Check 1),
not just matched by filename/alt text. Two initial candidates were rejected this way: the on-page alt
text for `B09B7989F4` ("water carafe + tumbler") pointed to a product photo that's so tightly cropped
it reads as an abstract glass texture, not a recognizable carafe — dropped. `B0118561IU` (waffle
towels) and `B08ZSYG6D7` (stoneware tea cups) both have visibly broken background-removal artifacts
(jagged cutout edges, floating fragments) — dropped as not publication-quality. `B0CG3Q4H5Q`'s tracked
photo doesn't match its alt text ("catch-all bowl") at all — shows a candle, a wristwatch and a rose
on a ceramic dish — dropped as unusable regardless of the ASIN itself.

One more mismatch worth flagging for whoever next touches `journal/japandi-balcony/`: `B07DQDMVJ6`'s
on-page alt text (from a different file) said "single teak outdoor folding chair," but the tracked
photo for this ASIN clearly shows **two** acacia-wood armchairs with arms, not one chair, not teak,
not folding — matches `japandi-balcony`'s own prose ("acacia patio chairs, set of two") instead.
Wrote the caption below against what the image actually shows, not the stale alt text.

## The 10 pieces

| # | ASIN | Product | Source page(s) | Image | SAFEGUARDS 1/2/3/4/5/7 | Scheduled (UTC) |
|---|------|---------|-----------------|-------|------------------------|-----------------|
| 1 | B0DG1F9DQ8 | Cordless brass lantern, frosted glass, warm LED (2 sizes shown) | journal/japandi-balcony | media/pin-B0DG1F9DQ8.jpg | PASS/PASS/PASS/PASS/PASS/PASS | 2026-12-04T12:05Z |
| 2 | B08F7TP4TN | Cream ceramic planter set (3 sizes), styled with dried pampas + calathea | journal/japandi-balcony | media/pin-B08F7TP4TN.jpg | PASS/PASS/PASS/PASS/PASS/PASS | 2026-12-04T15:05Z |
| 3 | B0FSKTSXZ7 | Marble vanity tray, 2 decanted bottles + reed diffuser | journal/japandi-bathroom | media/pin-B0FSKTSXZ7.jpg | PASS/PASS/PASS/PASS/PASS/PASS | 2026-12-04T18:05Z |
| 4 | B0FLPQMKKC | Linen euro sham covers, set of two, raw-edge flange | journal/best-japandi-gifts | media/pin-B0FLPQMKKC.jpg | PASS/PASS/PASS/PASS/PASS/PASS | 2026-12-04T21:05Z |
| 5 | B0DQTRHBFY | Lidded seagrass storage boxes, set of three, stacked | journal/honest-materials | media/pin-B0DQTRHBFY.jpg | PASS/PASS/PASS/PASS/PASS/PASS | 2026-12-05T00:05Z |
| 6 | B0G5N559RC | Cotton-rope woven storage basket, tricolor bands, 70L | journal/300-dollar-closet-capsule, shop/storage | media/pin-B0G5N559RC.jpg | PASS/PASS/PASS/PASS/PASS/PASS | 2026-12-05T12:05Z |
| 7 | B07DQDMVJ6 | Acacia patio chairs, set of two, slatted seat/back | journal/japandi-balcony | media/pin-B07DQDMVJ6.jpg | PASS/PASS/PASS/PASS/PASS/PASS | 2026-12-05T15:05Z |
| 8 | B0CRSKGRWX | Stoneware salt cellar, oak lid, wooden spoon | journal/where-to-buy-wabi-sabi-ceramics, shop/looks/the-slow-sunday-kitchen | media/pin-B0CRSKGRWX.jpg | PASS/PASS/PASS/PASS/PASS/PASS | 2026-12-05T18:05Z |
| 9 | B08337KZLJ | Round black-framed leaning mirror, large | journal/300-dollar-entryway, shop/decor-accents | media/pin-B08337KZLJ.jpg | PASS/PASS/PASS/PASS/PASS/PASS | 2026-12-05T21:05Z |
| 10 | B0GD4X99CW | Waterproof outdoor seat cushions, set of 4, beige | journal/400-dollar-patio-dining, shop/outdoor-wellness | media/pin-B0GD4X99CW.jpg | PASS/PASS/PASS/PASS/PASS/PASS | 2026-12-06T00:05Z |

**Schedule logic:** the live Pinterest queue runs 5 slots/day at :05 past 00:00/12:00/15:00/18:00/21:00
UTC through 2026-12-04T00:05Z. These 10 continue that exact cadence starting at the next open slot
(2026-12-04T12:05Z), filling 2026-12-04's remaining 4 slots + all 5 of 2026-12-05 + 2026-12-06's
first slot — extends the runway from 12 days to ~15 days as of today, back above the 14-day line.
Rate ceiling respected (never more than 5/day/platform).

## SAFEGUARDS gate detail (all 10 pieces, 10/10 PASS)
1. **Picture-product match:** every image visually opened (not filename-trusted) and confirmed to
   depict exactly the product class the linked ASIN sells — detail above for the two sub-findings
   worth a second look (B07DQDMVJ6's stale alt text; none affect this batch's own accuracy).
2. **Section/title-product match:** n/a in this format (no section headers) — captions below were
   written to describe only what's actually in the image, same discipline.
3. **ASIN brand bar:** cannot re-verify star rating/review count/stock/Frequently-Returned live
   (Amazon unreachable from this sandbox, confirmed standing fact) — followed SAFEGUARDS Check 10
   exactly: reused already-verified ASINs (each live on 1-8 real site pages already) rather than any
   new/unverified one. No degraded ASIN (`B0DRHQ1FKP` or any of the 47-ASIN exclusion list) used.
4. **Caption-image match:** every caption below was written by describing what the image shows,
   checked against the actual photo, not copied from on-page alt text (which was wrong in 2 of 10
   cases — see Sourcing section).
5. **Image file resolution:** all 10 `final pins/batches/2026-11-22/media/pin-<ASIN>.jpg` files
   confirmed on disk (`ls`), 1000x1500px (2:3), built via `_asin-to-pin.js` from the tracked source.
7. **FTC disclosure:** every caption ends with the exact phrase already used on every live
   affiliate pin in the current queue — `#ad · As an Amazon Associate we earn from qualifying
   purchases.` — copied verbatim from the existing scheduled posts, not reworded.

## Captions (final, ready to post as-is)

**1. B0DG1F9DQ8**
> A brass-finish cordless lantern with a warm LED glow inside frosted glass — the piece that makes a porch or entry feel lit without a single cord. Shop the cordless lantern look.
>
> #ad · As an Amazon Associate we earn from qualifying purchases.

**2. B08F7TP4TN**
> A cluster of cream ceramic planters in three sizes, one holding dried pampas and one a leafy calathea — the easy way to soften a bare sideboard corner. Shop the ceramic planter set.
>
> #ad · As an Amazon Associate we earn from qualifying purchases.

**3. B0FSKTSXZ7**
> A small marble vanity tray holding two decanted bottles and a reed diffuser — the bathroom counter with the labels taken away. Shop the marble vanity tray look.
>
> #ad · As an Amazon Associate we earn from qualifying purchases.

**4. B0FLPQMKKC**
> Oversized linen euro shams with a raw-edge flange, piled on a cream sofa — the layer that makes a plain sofa read as considered. Shop the linen euro sham look.
>
> #ad · As an Amazon Associate we earn from qualifying purchases.

**5. B0DQTRHBFY**
> Three lidded seagrass storage boxes, stacked largest to smallest by a sunlit window — closed storage that still looks like it belongs in the room. Shop the seagrass storage box set.
>
> #ad · As an Amazon Associate we earn from qualifying purchases.

**6. B0G5N559RC**
> A chunky cotton-rope storage basket in three warm tones, set on bare oak boards — soft storage for the corner that needs one. Shop the woven rope basket look.
>
> #ad · As an Amazon Associate we earn from qualifying purchases.

**7. B07DQDMVJ6**
> A pair of slatted acacia patio chairs, simple and sturdy enough to leave out all season — the two-piece start to any small balcony or porch. Shop the acacia patio chair set.
>
> #ad · As an Amazon Associate we earn from qualifying purchases.

**8. B0CRSKGRWX**
> A small stoneware salt cellar with an oak lid and a little wooden spoon — the kind of object that makes a kitchen counter feel considered, not styled. Shop the ceramic salt cellar.
>
> #ad · As an Amazon Associate we earn from qualifying purchases.

**9. B08337KZLJ**
> A large round mirror in a slim black frame, leant against a plaster wall — one honest piece doing the work of an entire gallery wall. Shop the round black-framed mirror.
>
> #ad · As an Amazon Associate we earn from qualifying purchases.

**10. B0GD4X99CW**
> A stack of waterproof outdoor seat cushions in soft beige — left on the bench through a rained-on afternoon without a second thought. Shop the outdoor seat cushion set.
>
> #ad · As an Amazon Associate we earn from qualifying purchases.

## Needs-Cameron
- Review this manifest and the 10 images in `final pins/batches/2026-11-22/media/`; schedule as-is
  (the 10 proposed slots above continue the existing cadence exactly) or send back with changes.
- `database.blotato.io` upload-egress block remains the standing reason this can't be scheduled from
  this session directly — needs a session with real network access to the Blotato upload host.
- The TikTok `active` flag in `CONTROL.md` vs. 47 consecutive dark days with zero scheduled posts —
  flagged, not resolved, per this run's instructions. Worth a direct decision: pause the flag to
  match reality, or treat it as a broken pipeline needing a fix.
- The Instagram no-matching-trigger pipeline (already a named Decision Needed in today's CEO
  briefing/ledger) — unrelated to this batch, but this run independently re-confirms Instagram's
  queue is healthy through 2026-11-27 via live `blotato_list_posts`, consistent with the ledger.
