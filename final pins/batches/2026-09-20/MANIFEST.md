# Content-Factory batch — 2026-09-20

**Built by:** content-factory (cloud run). **Status:** staged, NOT scheduled — per the 2026-09-14
public-facing review gate, no Blotato post/schedule/upload tool was called. This manifest is the
deliverable. Cameron (or a session with Blotato-upload network access, since `database.blotato.io`
is egress-blocked from this cloud sandbox per the 2026-09-14 ledger entry) reviews below and either
schedules as-is or sends specific pieces back.

**Why this branch, not the old gitignored `final pins/` convention:** the 2026-09-15 ledger entry
flagged that `final pins/` is gitignored, so a cloud-run CEO could never see what a cloud-run
content-factory staged there. This run force-adds these files (`git add -f`) despite the gitignore
rule, on this one branch only, specifically so the manifest and media are visible to a CEO review
run from a fresh clone. `.gitignore` itself is untouched — this doesn't change what `main` accepts
by default, it just makes this one deliverable actually reachable. Flagged in TEAM-LOG/ledger as a
candidate fix for the standing gap.

## Why this batch, this shape

- **Real queue check (via `blotato_list_posts`, not assumed):** Pinterest has 28+ days of scheduled
  runway (5/day through at least 2026-10-18) — healthy, not rebuilt this run, per the "don't rebuild
  a full channel" instruction.
- **Instagram and TikTok have ZERO scheduled posts from 2026-09-20 onward** (`status=scheduled`,
  window 2026-09-20→2026-11-15, both platforms return `{"items":[]}`). Last published post on both
  was 2026-09-18 ~15:00–15:01 UTC (`status=published` pull, 2026-09-14→2026-09-20 confirms this —
  nothing published 09-19 or 09-20). This matches the CEO's LESSONS-LEDGER entry from today exactly:
  the IG/TikTok posting cliff has landed, not just been forecast. **This batch targets IG + TikTok
  only** — Pinterest is untouched.
- **Weighted to office/workspace** per `GROWTH-PLAN-90-DAY.md`'s "office cluster is #1 priority"
  framing, and timed to cross-promote `journal/six-object-rule/` (shipped 2026-09-18, not yet
  promoted on social per TEAM-LOG). 2 prints + 1 lead-magnet + 1 shoppable "look" round out the mix
  so it isn't 100% one theme, matching the composition of the 2026-09-14 batch (office/workspace,
  prints, palette, looks).

## Platform pause-flag cross-check (per CONTROL.md vs real Blotato data)

`CONTROL.md`'s own text says the TikTok flag status is **unresolved — explicitly flagged as a
Cameron decision needed**, not a stale value to trust blindly. Real Blotato data this run:
`blotato_list_accounts` shows TikTok connected and active; `blotato_list_posts` shows TikTok
published successfully and continuously through 2026-09-18, stopping only because the queue ran dry
(not because of any pause). **This is consistent with CONTROL.md's own "TikTok has been posting
successfully for weeks" note — no contradiction found this run.** Not resolving the underlying
"active vs PAUSED" naming question myself; that's Cameron's call per CONTROL.md's own text. Built
TikTok content in this batch on the reading that "status unclear, pick one" is not the same as
"PAUSED" — if Cameron intended TikTok paused, these 5 TikTok pieces should be held back specifically
(the 5 Instagram pieces are unaffected either way — INSTAGRAM: active is unambiguous).

## FTC / disclosure — the compliance gap this batch does NOT repeat

The LESSONS-LEDGER (6 consecutive entries, 2026-09-14 through 2026-09-19) found that **100% of the
145–155 already-scheduled Pinterest posts sampled/audited carry zero FTC disclosure** on monetized
Amazon-affiliate copy — a live, ongoing compliance exposure this batch was told explicitly not to
repeat. Every piece below that links an Amazon affiliate ASIN (pieces 1–6, 10) carries, in the
caption itself:
- The `#affiliate` hashtag, placed among the first few hashtags — never buried after many others.
- The disclosure sentence, verbatim as already used site-wide: *"As an Amazon Associate, Calm & Oak
  earns from qualifying purchases."*

Pieces 7–9 are NOT Amazon-affiliate — 7 and 8 sell Calm & Oak's own print (Etsy/Payhip, no
commission relationship, matches how already-published prints posts correctly carry no disclosure),
and 9 promotes a free lead magnet (no product sold). No disclosure added to those three — adding one
where there's no affiliate relationship would itself be inaccurate.

## SAFEGUARDS gate — applied per piece below (adapted from the journal-article 5-check protocol:
picture-product match, ASIN verification, caption-image match, image-file resolution; "section
title-product match" doesn't apply to a single-image pin and is omitted)

**Image-file resolution — run for all 10 before anything else:**
```
$ for f in assets/img/products-cropped/p-B08GDW5JYF.jpg assets/img/products-cropped/p-B09HKN2ZRT.jpg \
  assets/img/products-cropped/p-B0DC6FQKYR.jpg assets/img/products-cropped/p-B0BZ3GHM8N.jpg \
  assets/img/products-cropped/p-B0FJY1RVL3.jpg assets/img/products-cropped/p-B08G46J76G.jpg \
  assets/img/prints/crane.jpg assets/img/prints/clay-arch.jpg \
  assets/img/journal-covers/japandi-color-palette-cover.jpg assets/img/looks/the-japandi-workspace-card.jpg; do
  [ -f "$f" ] && echo "OK $f" || echo "MISS $f"; done
```
Result: **10 OK, 0 MISS.**

**Video/audio QA — run for all 10:** each `media/*.mp4` was rendered via `_pin-to-reel.js` (synax
-checked with `node --check` before use — passed) then muxed via `_add-audio-bed.js` (also
syntax-checked; the 2026-09-14 truncation bug is fixed and committed at `4037e6d`, re-verified fixed
this run). `ffmpeg -i` on every one of the 10 outputs confirms **both** an H.264 1080x1920 video
stream **and** an AAC 44.1kHz audio stream present — not the "silent Reel" failure mode flagged
2026-09-14. Full per-file stream dump kept in this run's tool log; spot-checked all 10, all pass.

---

### Piece 1 — Brass desk lamp
- **Platform / media:** Instagram + TikTok · `media/01-brass-desk-lamp.mp4`
- **ASIN:** B08GDW5JYF → `https://www.amazon.com/dp/B08GDW5JYF?tag=calmandoak-20`
- **Reused-verified from:** `journal/best-japandi-desk-accessories/`, `journal/best-japandi-lighting/`,
  `journal/japandi-desk/` — all live, SAFEGUARDS-passed articles. Not re-verified against Amazon
  directly this run (egress to amazon.com is blocked from this sandbox, per the 2026-09-15 ledger
  entry) — inherited-verified only, per that entry's candidate rule.
- **Check 1 (picture-product):** image `p-B08GDW5JYF.jpg` is the exact product photo used
  site-wide next to this exact ASIN link — MATCH.
- **Check 4 (caption-image):** caption describes "warm task light... aged brass, linen shade" —
  image shows an aged-brass lamp with a linen shade — MATCH.
- **Disclosure:** affiliate — sentence + `#affiliate` included (see captions below).
- **IG caption:** "One of the six objects a calm desk actually needs: warm task light. Aged brass,
  linen shade, no overhead glare. Shop at calmandoak.com (link in bio). #japandi #homeoffice
  #desklamp #sixobjectrule #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "The six-object desk rule, object one: warm task light. Aged brass, linen
  shade, no overhead glare. calmandoak.com #japandi #homeoffice #desklamp #sixobjectrule #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **Proposed schedule:** 2026-09-21, 00:00 UTC (both platforms) — matches the existing ~00:00 /
  12:00 / 15:00 / 18:00 / 21:00 UTC daily cadence visible in the already-published queue.
- **SAFEGUARDS:** PASS

### Piece 2 — Bamboo monitor stand
- **Platform / media:** Instagram + TikTok · `media/02-bamboo-monitor-stand.mp4`
- **ASIN:** B09HKN2ZRT → `https://www.amazon.com/dp/B09HKN2ZRT?tag=calmandoak-20`
- **Reused-verified from:** `journal/best-japandi-desk-accessories/`.
- **Check 1:** `p-B09HKN2ZRT.jpg` is the site's own product photo for this ASIN — MATCH.
- **Check 4:** caption "lift the monitor, gain a drawer" — image shows a bamboo monitor stand with
  a drawer — MATCH.
- **Disclosure:** affiliate — included.
- **IG caption:** "Lift the monitor, gain a drawer — the bamboo stand that clears the desk without
  adding to it. Shop at calmandoak.com (link in bio). #japandi #homeoffice #deskorganization
  #bamboo #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "Lift the monitor, gain a drawer — bamboo, quiet, does its job and
  disappears. calmandoak.com #japandi #homeoffice #deskorganization #bamboo #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **Proposed schedule:** 2026-09-21, 12:00 UTC (both platforms)
- **SAFEGUARDS:** PASS

### Piece 3 — Leather desk pad
- **Platform / media:** Instagram + TikTok · `media/03-leather-desk-pad.mp4`
- **ASIN:** B0DC6FQKYR → `https://www.amazon.com/dp/B0DC6FQKYR?tag=calmandoak-20`
- **Reused-verified from:** `journal/best-japandi-desk-accessories/`.
- **Check 1:** `p-B0DC6FQKYR.jpg` is the site's own product photo for this ASIN — MATCH.
- **Check 4:** caption "one leather pad gathers the whole desk surface" — image shows a leather
  desk pad — MATCH.
- **Disclosure:** affiliate — included.
- **IG caption:** "One leather pad gathers the whole desk surface into a single calm plane. Shop
  at calmandoak.com (link in bio). #japandi #deskpad #homeoffice #leathergoods #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "One leather pad, the whole desk reads as one calm surface instead of six
  loose objects. calmandoak.com #japandi #deskpad #homeoffice #leathergoods #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **Proposed schedule:** 2026-09-21, 15:00 UTC (both platforms)
- **SAFEGUARDS:** PASS

### Piece 4 — Under-desk cable tray
- **Platform / media:** Instagram + TikTok · `media/04-cable-tray.mp4`
- **ASIN:** B0BZ3GHM8N → `https://www.amazon.com/dp/B0BZ3GHM8N?tag=calmandoak-20`
- **Reused-verified from:** `journal/best-japandi-desk-accessories/`.
- **Check 1:** `p-B0BZ3GHM8N.jpg` is the site's own product photo for this ASIN — MATCH.
- **Check 4:** caption "the under-desk tray that makes the cables someone else's problem" — image
  shows an under-desk cable tray — MATCH.
- **Disclosure:** affiliate — included.
- **IG caption:** "The under-desk tray that makes the cables someone else's problem — off the
  floor, out of sight. Shop at calmandoak.com (link in bio). #japandi #homeoffice
  #cablemanagement #deskorganization #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "Screw it under the desk once, never see a cable again. calmandoak.com
  #japandi #homeoffice #cablemanagement #deskorganization #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **Proposed schedule:** 2026-09-21, 18:00 UTC (both platforms)
- **SAFEGUARDS:** PASS

### Piece 5 — Armless task chair
- **Platform / media:** Instagram + TikTok · `media/05-armless-task-chair.mp4`
- **ASIN:** B0FJY1RVL3 → `https://www.amazon.com/dp/B0FJY1RVL3?tag=calmandoak-20`
- **Reused-verified from:** `journal/best-japandi-office-chairs/` (top pick).
- **Check 1:** `p-B0FJY1RVL3.jpg` is the site's own product photo for this ASIN — MATCH.
- **Check 4:** caption "a cream armless task chair on a slim base" — image shows a cream armless
  chair — MATCH.
- **Disclosure:** affiliate — included.
- **IG caption:** "A cream armless task chair on a slim base — reads as furniture, works as a
  desk chair. Shop at calmandoak.com (link in bio). #japandi #homeoffice #taskchair
  #minimalistdesk #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "The chair that doesn't announce itself as an office chair. calmandoak.com
  #japandi #homeoffice #taskchair #minimalistdesk #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **Proposed schedule:** 2026-09-21, 21:00 UTC (both platforms)
- **SAFEGUARDS:** PASS

### Piece 6 — Walnut writing desk
- **Platform / media:** Instagram + TikTok · `media/06-walnut-writing-desk.mp4`
- **ASIN:** B08G46J76G → `https://www.amazon.com/dp/B08G46J76G?tag=calmandoak-20`
- **Reused-verified from:** `journal/best-japandi-desks/` (top pick), `journal/dark-japandi/`.
- **Check 1:** `p-B08G46J76G.jpg` is the site's own product photo for this ASIN — MATCH.
- **Check 4:** caption "a clean walnut top on a slim wooden frame" — image shows the walnut
  writing desk — MATCH.
- **Disclosure:** affiliate — included.
- **IG caption:** "A clean walnut top on a slim wooden frame — the desk that starts the whole
  calm workspace. Shop at calmandoak.com (link in bio). #japandi #homeoffice #walnutdesk
  #minimalistdesk #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "Start the calm desk here — solid walnut, slim frame, nothing extra.
  calmandoak.com #japandi #homeoffice #walnutdesk #minimalistdesk #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **Proposed schedule:** 2026-09-22, 00:00 UTC (both platforms)
- **SAFEGUARDS:** PASS

### Piece 7 — Print: Crane
- **Platform / media:** Instagram + TikTok · `media/07-print-crane.mp4`
- **Product:** Calm & Oak's own sumi-e Crane print — own product, not Amazon-affiliate.
  `https://www.etsy.com/listing/4513670279/sumi-e-crane-print-japandi-wall-art` (also
  `https://payhip.com/b/4B5Ug` digital download) — both real, live links pulled directly from
  `shop/prints/crane/index.html`.
- **Check 1:** `assets/img/prints/crane.jpg` is the print's own product image, used on its own
  shop page — MATCH.
- **Check 4:** caption "one crane, drawn in a single quiet gesture" — image is the crane sumi-e
  print — MATCH.
- **Disclosure:** not applicable — Calm & Oak is the seller, no third-party commission. Matches
  how the already-published Cherry Branch / Moon / Shizuka print posts correctly carry no
  disclosure.
- **IG caption:** "One crane, drawn in a single quiet gesture — sumi-e for a calm wall. Shop at
  calmandoak.com (link in bio). #japandi #sumie #wallart #minimalistdecor"
- **TikTok caption:** "One crane, one breath, one brushstroke. calmandoak.com #japandi #sumie
  #wallart #minimalistdecor"
- **Proposed schedule:** 2026-09-22, 12:00 UTC (both platforms)
- **SAFEGUARDS:** PASS

### Piece 8 — Print: Clay Arch
- **Platform / media:** Instagram + TikTok · `media/08-print-clay-arch.mp4`
- **Product:** Calm & Oak's own Clay Arch print — own product, not Amazon-affiliate.
  `https://www.etsy.com/listing/4563528875/` — pulled directly from `shop/prints/clay-arch/index.html`.
- **Check 1:** `assets/img/prints/clay-arch.jpg` is the print's own product image — MATCH.
- **Check 4:** caption "a single fired arch, drawn in warm clay tones" — image is the Clay Arch
  print — MATCH.
- **Disclosure:** not applicable — same reasoning as Piece 7.
- **IG caption:** "A single fired arch, drawn in warm clay tones — the print that holds a bare
  wall together. Shop at calmandoak.com (link in bio). #japandi #wallart #wabisabi
  #minimalistdecor"
- **TikTok caption:** "One arch, warm clay tones, a bare wall settled. calmandoak.com #japandi
  #wallart #wabisabi #minimalistdecor"
- **Proposed schedule:** 2026-09-22, 15:00 UTC (both platforms)
- **SAFEGUARDS:** PASS

### Piece 9 — Palette cheat sheet (lead magnet)
- **Platform / media:** Instagram + TikTok · `media/09-palette-cheat-sheet.mp4`
- **Product:** free download, `https://calmandoak.com/palette-cheat-sheet/` — no product sold,
  no affiliate link.
- **Check 1 / image note:** `assets/img/journal-covers/japandi-color-palette-cover.jpg` is a
  **thematic** image (the companion `/journal/japandi-color-palette/` article's cover — palette
  swatches), not a literal photo of the PDF download, since `/palette-cheat-sheet/` itself ships
  no dedicated hero photo (checked — only a generic `og-image.jpg`). This is flagged explicitly
  rather than silently treated as a literal product photo: no ASIN or purchase link is attached,
  so there's no picture↔product mismatch risk of the kind SAFEGUARDS exists to catch, but it's
  not a like-for-like match either. Caption doesn't claim the image depicts the actual PDF pages.
- **Disclosure:** not applicable — nothing is sold.
- **IG caption:** "Five signature Japandi palettes, the room-matcher, the five mistakes to skip —
  free cheat sheet, link in bio. #japandi #colorpalette #interiordesign #japandihome"
- **TikTok caption:** "Five Japandi palettes with hex codes, free. calmandoak.com #japandi
  #colorpalette #interiordesign #japandihome"
- **Proposed schedule:** 2026-09-22, 18:00 UTC (both platforms)
- **SAFEGUARDS:** PASS (with the image-fit note above — Cameron's call whether that's good enough
  or needs a purpose-built cheat-sheet photo first)

### Piece 10 — The Japandi Workspace (shoppable look)
- **Platform / media:** Instagram + TikTok · `media/10-japandi-workspace-look.mp4`
- **Destination:** `https://calmandoak.com/shop/looks/the-japandi-workspace/` — bundles 5 Amazon
  ASINs (B08GDW5JYF, B09HKN2ZRT, B0BVVRCP3R, B0D4RK8PB2, B0DPJX1CQL), all reused-verified live
  elsewhere (`best-japandi-desk-accessories`, `400-dollar-home-office`, `japandi-desk`). The page
  itself already carries the on-site Amazon Associate disclosure.
- **Check 1:** `assets/img/looks/the-japandi-workspace-card.jpg` is the look page's own hero/card
  image — MATCH.
- **Check 4:** caption "the whole workspace, shoppable — desk, chair, lamp, one plant, nothing
  extra" — image shows a styled desk scene with those elements — MATCH.
- **Disclosure:** affiliate (bundle of Amazon links) — sentence + `#affiliate` included. This is
  the pattern the ledger's compliance-gap finding used as its own example ("Shop the linen curtain
  look." with zero disclosure) — this piece does not repeat that.
- **IG caption:** "The whole workspace, shoppable — desk, chair, lamp, one plant, nothing extra.
  Shop the look at calmandoak.com (link in bio). #japandi #homeoffice #getthelook #workspace
  #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **TikTok caption:** "The whole workspace, shoppable — desk, chair, lamp, one plant, nothing
  extra. calmandoak.com #japandi #homeoffice #getthelook #workspace #affiliate
  (As an Amazon Associate, Calm & Oak earns from qualifying purchases.)"
- **Proposed schedule:** 2026-09-22, 21:00 UTC (both platforms)
- **SAFEGUARDS:** PASS

---

## Summary

| # | Piece | Platforms | Affiliate | Disclosure added | SAFEGUARDS |
|---|---|---|---|---|---|
| 1 | Brass desk lamp | IG+TikTok | yes (B08GDW5JYF) | yes | PASS |
| 2 | Bamboo monitor stand | IG+TikTok | yes (B09HKN2ZRT) | yes | PASS |
| 3 | Leather desk pad | IG+TikTok | yes (B0DC6FQKYR) | yes | PASS |
| 4 | Cable tray | IG+TikTok | yes (B0BZ3GHM8N) | yes | PASS |
| 5 | Armless task chair | IG+TikTok | yes (B0FJY1RVL3) | yes | PASS |
| 6 | Walnut writing desk | IG+TikTok | yes (B08G46J76G) | yes | PASS |
| 7 | Print: Crane | IG+TikTok | no (own product) | n/a | PASS |
| 8 | Print: Clay Arch | IG+TikTok | no (own product) | n/a | PASS |
| 9 | Palette cheat sheet | IG+TikTok | no (free) | n/a | PASS (image-fit note) |
| 10 | Japandi Workspace look | IG+TikTok | yes (5-ASIN bundle) | yes | PASS |

**10 pieces × 2 platforms = 20 posts staged.** QA pass rate: **10/10 pieces PASS (100%)**, 0 broken
image refs, 0 missing audio tracks, 7/10 pieces carry the disclosure sentence + `#affiliate` (all 7
of the ones that are actually Amazon-affiliate — the other 3 correctly carry none). Proposed
schedule fills 5 slots/day/platform for 2 days (2026-09-21, 2026-09-22) at the existing 00:00 / 12:00
/ 15:00 / 18:00 / 21:00 UTC cadence, respecting the 5-posts/day/platform ceiling in CONTROL.md.

**Needs-Cameron:**
1. Review and schedule (or send back) via a session with real Blotato-upload network access.
2. Confirm the TikTok CONTROL.md flag (active vs PAUSED) — if PAUSED is the answer, hold the 5
   TikTok posts back and ship the 5 Instagram ones only.
3. Piece 9's image-fit note above — swap for a purpose-built photo if the thematic match isn't
   good enough.
