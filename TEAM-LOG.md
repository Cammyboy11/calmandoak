# Calm & Oak — Team Log (shared channel)

The agents' shared coordination log. When one agent produces an asset another needs
(a new article URL, a keyword-gap list, a pin batch, a staged email), it appends a
dated line here so Pinterest, Email, and Outreach can act on it. Newest at top.

Format: `YYYY-MM-DD · AGENT · what · link/where · status (live | staged | needs-Cameron)`

---

## Active hand-offs

- 2026-10-06 · SEO-RANKER · **Fixed a live SAFEGUARDS picture-product mismatch
  (`journal/500-dollar-dining-table-set`, ASIN B0CRRKDKVT) and opened a PR — not pushed to main,
  per the 2026-09-14 review gate.** Read CONTROL.md (PAUSE: false) and `CEO-BRIEF/LESSONS-LEDGER.md`
  in full first; checked for a stale `.git/index.lock` before touching anything — none present
  (also found and fixed a real git-state issue: the session started in a detached HEAD one commit
  ahead of local `main`, which turned out to already be pushed to `origin/main` — just a stale local
  ref, resolved via `git fetch` + `git merge --ff-only`, no force/reset needed).
  **The fix:** the 2026-10-04 content-factory ledger entry flagged (raw, unfixed) that section 4's
  "candle holder pair" card names/alt-text/FAQ/JSON-LD all call the product a pair, but the linked
  image (`p-B0CRRKDKVT.jpg`) shows six graduated-height brass holders. Pulled the image directly,
  confirmed the mismatch, corrected every "pair" reference to "set of six" (h2, TOC, alt text,
  product-card name, JSON-LD description, 2 FAQ answers, math table row) while keeping the actual
  styling advice (2 lit nightly, 4 in reserve) intact. Also caught and fixed two downstream
  budget-math errors the old "pair" framing had introduced in the variations section ("Frequent
  host" $640→$690, "Small table" $440→$475 — both now sum correctly against their own stated line
  items). Bumped `dateModified` to 2026-10-06.
  **Audited the rest of the site** for other safe fixes / the office-cluster article (GROWTH-PLAN's
  #1 priority): broken `/assets/img/` refs sitewide (2,933 checked, 0 MISS, unchanged from the
  2026-10-02 baseline), journal sitemap-vs-disk (63/63), JSON-LD parse check (63/63 articles, 0
  errors), duplicate title/meta check (0 dupes), degraded-ASIN `B0DRHQ1FKP` resweep (0 hits, PR #6's
  fix holds) — all clean, nothing else to fix. **No new article shipped:** the office cluster is
  already fully built (7 live articles, confirmed again this run) except Executive Desk, and every
  other open roadmap candidate needs new Amazon ASINs — `www.amazon.com` is still `EGRESS_BLOCKED`
  from this sandbox (re-confirmed via direct `curl`, same block since 2026-09-15).
  **SAFEGUARDS gate: full verification block run, all 5 checks PASS** (detail in the PR description
  — Check 3/ASIN-brand-bar N/A since no ASIN was added or swapped, only descriptive text corrected
  around an already-verified product). **PR:** https://github.com/Cammyboy11/calmandoak/pull/8
  (branch `seo-ranker/candle-set-accuracy-2026-10-06`), subscribed for CI/review activity.
  **Needs-Cameron:** review/merge PR #8; the standing `amazon.com` egress block remains the single
  thing blocking new office-cluster/roadmap articles from any cloud session. · staged (PR open,
  needs-Cameron review)

- 2026-10-04 · CONTENT-FACTORY (weekly cloud run) · **Staged a 10-post IG/TikTok refill batch (5
  products × 2 platforms) at `final pins/batches/2026-10-04/`, committed + pushed to branch
  `content-factory/2026-10-04` — not merged, not scheduled, per the 2026-09-14 public-facing
  review gate.** Read CONTROL.md (PAUSE: false), `LESSONS-LEDGER.md` in full (including the four
  2026-09-14 lessons flagged for this role: gitignored local assets, the blocked
  `database.blotato.io` upload, `_add-audio-bed.js`'s past issues, and the missing-disclosure
  finding), and SAFEGUARDS.md first.
  **Checked real Blotato data before building anything:** `blotato_list_accounts` confirms all
  three platforms connected and live (instagram id 53849, tiktok id 47113, pinterest id 7556) —
  no contradiction with CONTROL.md's "all three active" flags. `blotato_list_posts`
  (status=scheduled, 2026-10-04→2026-11-18, 127 items, no pagination cursor): **Pinterest 127
  items through 2026-10-29 (full — skipped, per this week's "don't rebuild a full channel"
  instruction); Instagram 0, TikTok 0 — a true zero, not a forecast.** Cross-checked
  `blotato_list_posts(status=published, 2026-09-28→2026-10-04)`: both platforms published daily
  through 2026-10-03 (real post URLs confirmed) — this is a pure forward-queue gap, not an
  account/capability problem. Matches the CEO's 2026-10-04 ledger entry exactly.
  **Built from tracked assets only** (`final pins/`, `01-brand-assets/`…`05-products-by-day/`,
  `Pin Copy Library*.md` all still absent from this cloud checkout, confirmed again) — sourced 5
  real, already-live ASINs from `.section-product` cards in `journal/why-your-kitchen-needs-a-tray`,
  `journal/500-dollar-dining-table-set`, `journal/250-dollar-bathroom`,
  `journal/300-dollar-closet-capsule`, and `journal/300-dollar-living-room-textile-refresh`
  (stoneware salt cellar, brass candlestick holders, reed diffuser, hanging closet organizer,
  boucle pillow covers) — five categories with **zero ASIN overlap** against either still-open
  earlier branch (`content-factory/2026-09-20`, `content-factory/2026-09-27`), checked directly
  against both branches' manifests before building.
  **Promoted the 09-27 batch's one-off ffmpeg pin-canvas step into a real `_asin-to-pin.js`
  helper** (new file, committed) — tracked product crops are 4:5 (800×1000), not the 2:3
  (1000×1500) `_pin-to-reel.js` expects; the helper does the blur-fill-background +
  contain-fit-product conversion generically now. `node_modules` was empty at session start
  (same finding as 09-27) — `npm install ffmpeg-static --no-save` worked fine, no egress issue for
  npm itself. Both `_pin-to-reel.js`/`_add-audio-bed.js` syntax-checked clean and smoke-tested
  this run. **Audio-bed output verified, not assumed:** `ffprobe` confirms an AAC/44.1kHz stream
  on all 5 final reels (not just a sample), and `volumedetect` on the smallest and largest files
  both read mean −26.9dB / max −14.0dB — audible, matching the 09-27 batch's levels, not silent.
  Full SAFEGUARDS QA gate run on all 5 pieces (picture-product match, ASIN inherited-verified,
  caption-image match, file resolution) — **5/5 PASS.** Every caption carries the sitewide
  disclosure sentence + `#affiliate`, per the 2026-09-14 ledger finding — did not repeat that gap.
  **Found and flagged (not fixed) a pre-existing site content issue:** the live
  `journal/500-dollar-dining-table-set` candle-holder product card is named "pair" but its own
  image shows 6 graduated holders — this batch's caption describes what the image actually shows
  rather than repeating the site's wording, keeping this batch's own Check 4 honest; the
  underlying site mismatch is unresolved and logged for SEO-ranker. **This batch is additive, not
  a replacement** for the still-open 09-20/09-27 branches — proposed schedule (10-08 through
  10-12) picks up after 09-27's proposed window so the two don't collide if both ship.
  **Note on the gitignore pattern:** `final pins/` is normally gitignored; this run force-added
  (`git add -f`) the manifest + built media for this commit, same pattern as 09-27, so the batch is
  reviewable from a cloud CEO session. **SAFEGUARDS gate:** full detail in the manifest linked
  above. **Needs-Cameron:** review/schedule this batch (or send it back); decide what to do with
  the two earlier still-open content-factory branches; optionally task SEO-ranker with the
  candle-holder product-card fix. · staged (branch pushed, needs-Cameron review)

- 2026-10-02 · SEO-RANKER · **Full sitewide on-page audit — zero issues found; no new article
  shipped this run, with reasons logged.** Read CONTROL.md (PAUSE: false; re-read the 2026-09-14
  public-facing review gate section) and CEO-BRIEF/LESSONS-LEDGER.md in full first; checked for a
  stale `.git/index.lock` before touching anything — none present. **Audit (all clean):** broken
  `/assets/img/` refs sitewide (2,933 refs across every `index.html`, 0 MISS); journal
  sitemap-vs-disk (63/63 match both directions); `journal/index.html` hub links all 63 articles,
  zero orphans, zero dead links; `shop/looks/` hub the same (15/15 reconciled + in sitemap);
  journal filter-chip category counts recomputed from the actual `data-category` attributes on
  every card, matches the displayed badges exactly (14/21/13/8/7 = 63 — not stale, per the
  2026-09-22 ledger lesson); internal `<a href>` link check across the whole site (4,540 hrefs) —
  0 broken; duplicate `<title>`/meta-description check across all 63 journal articles — 0
  duplicates, 0 missing, 0 missing canonical; JSON-LD syntax-validated on every `index.html` — 0
  parse errors; FTC disclosure banner present on every non-journal page carrying an Amazon/Awin
  link; resweep for the 2026-09-29 degraded-ASIN finding (`B0DRHQ1FKP`) — zero remaining
  references anywhere in the repo, confirming PR #6's fix holds.
  **Why no new article this run:** checked every still-open GROWTH-PLAN-90-DAY.md /
  CONTENT-ROADMAP.md candidate before writing anything. The #1 priority (Japandi office cluster)
  is fully built — 7 live articles (`japandi-home-office`, `japandi-desk`, `best-japandi-desks`,
  `best-japandi-office-chairs`, `best-japandi-desk-accessories`, `small-japandi-office`,
  `400-dollar-home-office`) — except Tier-1 #3 "Japandi Executive Desk," which stays blocked:
  re-confirmed via direct `WebFetch` that `www.amazon.com` is still `EGRESS_BLOCKED` from this
  sandbox, and every desk ASIN already verified on-site is ≤47" wide (not a defensible
  "executive/statement desk" match) — same blocker first found 2026-09-15, unchanged. Checked four
  other candidates for genuine whitespace before ruling them out: Tier-2 #11 "Sage Green in
  Japandi" — already a dedicated ~400-word section in `journal/japandi-color-palette` (hex code,
  pairing rules, common mistakes) — a standalone piece would cannibalize, not add. Tier-3 #16
  "Japandi Balcony Ideas" — `journal/300-dollar-sunday-porch` already carries a full "Small
  balcony (5x8 or smaller)" variation section plus an FAQ entry ("Does this work on a tiny
  balcony?") with its own price math — same cannibalization risk. Tier-3 #13 "small-kitchen
  edition" — a real content gap (no existing article covers small-kitchen storage/layout), but
  every kitchen-adjacent ASIN already verified on-site (tray, mug, carafe, apron) is a styling
  prop, not storage — writing it honestly needs new canister/shelving/cart ASINs, which hits the
  same `amazon.com` block. Tier-3 #12 "Japandi Nursery" — same new-sourcing block (no verified
  on-site equivalent for a crib or changing table). Rather than force a cannibalizing or
  thinly-sourced piece to produce output, skipped the new-article half of this run's mandate —
  logged as its own `LESSONS-LEDGER.md` entry so the next run doesn't re-walk the same candidate
  list from scratch. **No PR opened** — zero site files changed; this run's output is audit-only
  (this entry) plus one ledger entry, both committed straight to `main` per the standing precedent
  that internal coordination docs (not public-facing content) aren't gated by the 2026-09-14
  review-gate policy. **SAFEGUARDS gate:** N/A, nothing shipped. **Needs-Cameron:** none new — the
  standing `amazon.com` + `database.blotato.io` egress blocks (flagged repeatedly since
  2026-09-14/15) remain the single biggest thing blocking new affiliate content from any cloud
  session; until a session with real Amazon access can verify new ASINs, Executive Desk / Nursery
  / small-kitchen-storage stay unwritable from here. · staged (no PR; audit + ledger entry only)

- 2026-09-29 · SEO-RANKER · **Sitewide degraded-ASIN cleanup (SAFEGUARDS violation found across 6
  files) + new journal article, staged as a PR (public-facing review gate — not pushed to main).**
  Read CONTROL.md (PAUSE: false; also re-read the 2026-09-14 review-gate section) and
  CEO-BRIEF/LESSONS-LEDGER.md in full first — noted the 3-day seat-counter failure and the
  local-deploy-trigger review-gate-bypass findings are both already escalated in CONTROL.md and
  outside SEO-ranker's remit (no Shopify/local-deploy access from here); did not duplicate that
  escalation. Checked for a stale `.git/index.lock` before committing (per the 2026-09-10 ledger
  lesson) — none present. **Pages audited:** full sitewide crawl (journal/ 62 articles + shop/ +
  assets/the-edit/ + assets/starter-guide/) for broken `/assets/img/` refs (0 MISS), sitemap-vs-disk
  gaps (none), journal-hub orphans (none), duplicate `<title>`s (only the known noindexed redirect
  stubs), and any remaining reference to `B0DRHQ1FKP` — SAFEGUARDS.md's own named example of a
  degraded ASIN (Canada ship-block, 33 reviews). **Found it was still live in 6 files, 8 locations**
  (`journal/400-dollar-reading-nook`, `shop/looks/the-sage-bedroom`, `shop/looks/soft-lit-reading-nook`,
  `shop/furniture`, both `assets/the-edit/issue-0{1,2}` magazine issues, and the starter-guide PDF
  source) — a real, live SAFEGUARDS violation that had shipped and sat undetected through every prior
  run's audits. Fixed all 8 by swapping in `B0B18NB7ZF` (VASAGLE MAEZO round side table), an
  already-verified ASIN with 2,900+ reviews already live in 3 other articles as the same product
  class, reusing its existing image/alt pairing rather than inventing a new one — no new Amazon
  sourcing needed (`amazon.com` egress still blocked from this sandbox, confirmed again this run).
  `shop/furniture/index.html` had the degraded card duplicated against an already-existing VASAGLE
  card; removed the duplicate instead of re-adding it, which also fixed a pre-existing stale
  ItemList/filter-count bug in that file (declared 9/15 vs. actual 14 cards — now correctly 8/13).
  **Shipped article:** `journal/best-japandi-furniture-brands/` (GROWTH-PLAN Tier-4 link-magnet slot
  #20) — 12 real furniture brands grouped by budget tier, for the anchor-furniture categories
  (sofas, beds, dining tables) where Amazon marketplace search is weakest. Zero Amazon ASIN links by
  design (independent, unmonetized reference list, disclosed as such in-article) — no new-sourcing
  risk. ~2,030 words. Added to `journal/index.html` (card + ItemList + filter counts, now 63/14/21/13/8/7,
  reconciled) and `sitemap.xml`, plus one reciprocal cross-link each in `sofa-buying-guide` and
  `honest-materials`. **Roadmap check:** GROWTH-PLAN's #1 priority (office cluster) remains fully
  built, 8 live articles confirmed via directory listing — no new office-cluster gaps this run; also
  noted the existing `journal/japandi-color-palette/` article already substantially covers
  GROWTH-PLAN Tier-1 #4 ("Japandi Wall Colours") under its own `#wall-colours` section, so did not
  write a separate wall-colours article to avoid cannibalizing that page's existing ranking. **PR:**
  https://github.com/Cammyboy11/calmandoak/pull/6 (branch
  `seo-ranker/furniture-brands-asin-fix-2026-09-29`), staged only the 12 touched files (`git status`
  confirmed no stray changes before commit), subscribed to PR activity. **SAFEGUARDS gate:** full
  detail posted in the PR body — degraded-ASIN fix all 6 checks PASS across all 4 articles now using
  B0B18NB7ZF; new article Checks 1-4 N/A (zero `/dp/` links), Check 5 0 MISS, all 6 TOC anchors
  resolve, all 3 JSON-LD blocks valid. **Needs-Cameron:** review/merge PR #6. Separately (not this
  run's fix, just re-surfacing): the seat-counter trigger and local-deploy review-gate-bypass items
  already flagged in CONTROL.md remain open and are outside this agent's access. · staged (PR #6
  open, needs-Cameron review)

- 2026-09-27 · CONTENT-FACTORY (weekly cloud run) · **Staged an 8-post IG/TikTok refill batch (4
  products × 2 platforms) at `final pins/batches/2026-09-27/`, committed + pushed to branch
  `content-factory/2026-09-27` — not merged, not scheduled, per the 2026-09-14 public-facing
  review gate.** Read CONTROL.md (PAUSE: false), `LESSONS-LEDGER.md` in full, and SAFEGUARDS.md
  first. **Checked real Blotato data before building anything:** Pinterest has 162 posts scheduled
  through 2026-10-29 (full — skipped, per this week's "don't rebuild a full channel" instruction);
  Instagram/TikTok both drop to 7 scheduled posts ending 2026-10-03, confirmed via
  `blotato_list_posts`. Read all 14 of those posts' captions directly: **100% Cameron's own
  Japanese-folklore apparel line** (dragon/tiger/kitsune/maneki-neko/etc.), not content-factory's
  documented home-goods pipeline — matches his 2026-09-25 confirmation in the ledger, so this
  batch is a genuine refill, not a duplicate. No contradiction found between CONTROL.md's platform
  flags (all three "active") and real Blotato account/queue data this run.
  **Built from tracked assets only** (`final pins/`, `01-brand-assets/`…`05-products-by-day/`,
  `Pin Copy Library*.md` all still absent from this cloud checkout, per every prior ledger entry
  on this) — sourced 4 real, already-live ASINs straight from `.section-product` cards in
  `journal/best-japandi-desks`, `journal/japandi-bedroom` + `warmth-without-clutter`,
  `journal/japandi-bathroom`, and `journal/wabi-sabi-ceramics`, reusing each article's own
  already-verified image↔ASIN pairing rather than inventing a new one (walnut writing desk,
  chunky knit throw, bamboo bathroom shelf, ribbed vase — spans office/bedroom/bathroom/decor,
  weighted toward office per GROWTH-PLAN-90-DAY.md's #1 priority).
  **Built a small unplanned fix:** the tracked product photos are 4:5 (800×1000), not the 2:3
  `_pin-to-reel.js` expects — feeding them straight in would have stretched/distorted the product.
  Added an ffmpeg blur-fill+contain step to build a proper 2:3 pin first (see manifest for detail;
  recommend promoting to a real `_asin-to-pin.js` helper). `node_modules` was empty at session
  start (`ffmpeg-static` missing despite being in `package.json`) — ran
  `npm install ffmpeg-static --no-save`, worked fine, no egress issue for npm itself. Both
  `_pin-to-reel.js`/`_add-audio-bed.js` syntax-checked clean (2026-09-14's truncation bug is
  fixed at HEAD) and were smoke-tested this run, not just trusted. **Audio-bed output verified,
  not assumed:** checked all 4 final reels with `ffmpeg -i` (AAC stream present, 44.1kHz) and
  `volumedetect` on a sample (mean −26.9dB / max −14.0dB — audible, not silent).
  Full SAFEGUARDS QA gate run on all 4 pieces (picture-product match, ASIN inherited-verified,
  caption-image match, file resolution) — **4/4 PASS.** Every caption carries the sitewide
  disclosure sentence + `#affiliate`, per the 2026-09-14 ledger finding that ~20 queued posts
  shipped without it — did not repeat that. **Found after building — overlap with the still-open
  `content-factory/2026-09-20` branch:** that earlier, still-unmerged batch's piece #6 uses the
  exact same ASIN as this batch's piece #1 (B08G46J76G, walnut writing desk). Flagged prominently
  in this batch's manifest — do not schedule both; whichever of the two branches Cameron keeps,
  drop the duplicate piece from the other. Not resolved here; closing another run's open branch
  isn't this run's call. **Note on the gitignore contradiction this closes:**
  `final pins/` is normally gitignored (per multiple 2026-09 ledger entries flagging that a
  cloud-run CEO can never see a staged batch there); this run force-added
  (`git add -f`) the batch's files specifically, per this week's explicit instruction to make the
  manifest git-tracked and reviewable — flagged in the manifest as this run's interpretation, in
  case that's not the intended long-term pattern. · staged (needs-Cameron: review + schedule the
  branch's manifest; confirm the `git add -f` approach is the right fix for the standing
  gitignore-visibility gap)

- 2026-09-25 · SEO-RANKER · **FTC disclosure sitewide compliance fix + sitemap/journal-hub data-integrity fixes + new journal article, staged as a PR (public-facing review gate — not pushed to main).** Read CONTROL.md (PAUSE: false; also read the 2026-09-14 review-gate section, which now applies), SAFEGUARDS.md, CONTENT-ROADMAP.md, GROWTH-PLAN-90-DAY.md, CEO-BRIEF/LESSONS-LEDGER.md first — the top ledger entry (2026-09-25, CEO) flagged that the 2026-09-24 redesign shipped straight to `main` with zero PR/review, including dropping the homepage's FTC disclosure banner; checked for a stale `.git/index.lock` before committing — none present. **Found the drop was wider than the ledger entry's "homepage-only" read:** `git show f3d46af` confirms the redesign removed the disclosure banner + footer line from the *shared* topbar/footer template, not just `index.html` — 10 live pages with Amazon/Awin links had zero disclosure anywhere on the page (`index`, `about`, `contact`, `privacy`, `begin-here`, `the-edit`, `toolkit`, `partner`, `shop/looks/`, `shop/prints/`). Restored the banner + footer line on all 10, and added a `.disclosure` CSS rule to `redesign.css` (the new template doesn't load `styles.css`, so the old class would have rendered invisible/unstyled). Journal articles were never affected — confirmed 0/62 missing it, they still run the old `styles.css` template. Re-grepped sitewide after the fix: 0 remaining gaps. **Also found + fixed while auditing:** (1) 11 live, self-canonical `shop/prints/*` pages (from the Aug 30 print-catalog expansion) were never added to `sitemap.xml` — added all 11 (left the 2 not-yet-purchasable `shop/guides/*` pages out on purpose, Payhip URLs still blank per `guide-links.js`). (2) `journal/index.html`'s ItemList JSON-LD was stale on two axes: `numberOfItems` said 43 vs. an actual 62-card grid, and 15 real live articles (the `best-japandi-*` guides, all 3 vs-comparison pieces, `dark-japandi`, `how-to-start-japandi-budget`, `where-to-buy-wabi-sabi-ceramics`) had zero ListItem entry — filled in all 15 + the new article, recomputed `numberOfItems` from the actual grid (not incremented, per the 2026-09-22 ledger lesson on stale count badges). **Roadmap check:** office cluster (GROWTH-PLAN's #1 priority) is fully built — 8 live articles, confirmed via directory listing. Remaining open Tier-1/2 items all need new Amazon ASINs this sandbox can't source (`amazon.com` egress still blocked per the 2026-09-15 ledger entry), so wrote the next genuinely unblocked item instead. **Shipped:** `journal/is-japandi-still-in-style-2026/` (GROWTH-PLAN Tier-4 #17) — an editorial trend piece on what's actually shifted in Japandi since ~2021 (warmer palette, looser styling, room-specific spread), what's fading, a 4-question dated-vs-current audit, and marketing-label-vs-real-approach. Zero new product/ASIN links by design (pure editorial), so no new-sourcing risk at all. ~2,130 words. Added its card + bumped filter counts on `journal/index.html`, plus a reciprocal cross-link sentence each in `japandi-101` and `japandi-color-palette`. **PR:** https://github.com/Cammyboy11/calmandoak/pull/5 (branch `seo-ranker/disclosure-fix-trend-article-2026-09-25`), staged only the 16 touched files (`git status` confirmed no stray changes before commit), subscribed to PR activity. **SAFEGUARDS gate:** N/A for the disclosure/sitemap/hub fixes (no picture/product content touched). For the new article: Checks 1-4 N/A (zero `/dp/` links); Check 5 (image resolution) 0 MISS; all 8 TOC anchors resolve; all 3 JSON-LD blocks valid; full detail posted in the PR body. **Note on the bigger issue:** did not touch the "Two Seats to Quiet" sweepstakes pop-up itself (`assets/js/co-seats-popup.js`, live sitewide) or the redesign's broader review-gate bypass — that's a business/legal decision for Cameron, already escalated by the CEO's own 2026-09-25 briefing + push notification; this run's scope was the disclosure gap specifically, which was a fixable, safe on-page item within SEO-ranker's own remit. **Needs-Cameron:** review/merge PR #5; separately, still needs a decision on the sweepstakes mechanic per the CEO's escalation. · staged (PR #5 open, needs-Cameron review)

- 2026-09-22 · SEO-RANKER · **New journal article + 2 unrelated hub-page bugs fixed, staged as a PR (public-facing review gate — not pushed to main).** Read CONTROL.md (PAUSE: false), SAFEGUARDS.md, CONTENT-ROADMAP.md, GROWTH-PLAN-90-DAY.md, CEO-BRIEF/LESSONS-LEDGER.md first; checked for a stale `.git/index.lock` before committing — none present, `main` clean before starting. **Audit:** broken `/assets/img/` refs across all 148 journal+shop pages — zero MISS; sitemap-vs-disk — complete (after this run's fixes, see below); duplicate `<title>`s — only the known noindexed `/shop/dining/` + `/shop/living-room/` redirect stubs; missing meta descriptions — zero. **Found + fixed (unrelated to the new article, but both live in `journal/index.html`):** (1) the journal-filter chip counts were stale — showed "All 44" across 5 category badges, but the actual card count in the grid was 58; recomputed and corrected all 5. (2) `journal/japandi-desk/` and `journal/wabi-sabi-decor/` are both live, both in `sitemap.xml`, but had zero card/ItemList entry on the journal hub page — fully orphaned from internal nav despite being real published articles; added both. **Roadmap check:** confirmed via `journal/` listing that the office cluster now has 7 articles (desks, desk-accessories, office-chairs, japandi-desk, japandi-home-office, 400-dollar-home-office, six-object-rule); outreach's own 2026-06-23 keyword-gap ranking (#4, TEAM-LOG below) named "Small Japandi Office Ideas (for a Corner or Closet)" as the next unwritten office-cluster item — confirmed no such page existed. **Shipped:** `journal/small-japandi-office/` — small-footprint/clearance-driven companion to the full home-office guide: a narrow corner desk, a folding closet desk, an armless chair (clearance math), a wall-mounted swing-arm sconce instead of a desk lamp, a monitor stand + one basket for vertical storage, FAQ. ~2,460 words. Every product pick reuses an ASIN already verified live elsewhere (no new Amazon sourcing needed or attempted — `www.amazon.com` egress is still blocked from this sandbox per the 2026-09-15 ledger entry). Also updated `journal/index.html` (3 new cards + ItemList entries: the new article + the 2 orphan fixes above) and `sitemap.xml`, and added one cross-link sentence each in `journal/japandi-home-office/` and `journal/best-japandi-office-chairs/`. **PR:** https://github.com/Cammyboy11/calmandoak/pull/4 (branch `seo-ranker/small-japandi-office-2026-09-22`), staged only the 5 touched files (`git status` confirmed no stray changes before commit), subscribed to PR activity. **SAFEGUARDS gate:** full 5-check verification block run and posted in the PR body — all PASS (0 broken images, all 7 reused ASINs confirmed live in ≥1 other article, word count 2,463 / target 2,400+, all TOC anchors resolve programmatically-verified). **Needs-Cameron:** review/merge PR #4. · staged (PR #4 open, needs-Cameron review)

- 2026-09-18 · SEO-RANKER · **New journal article, staged as a PR (public-facing review gate — not pushed to main).** Read CONTROL.md (PAUSE: false), SAFEGUARDS.md, CONTENT-ROADMAP.md, GROWTH-PLAN-90-DAY.md, CEO-BRIEF/LESSONS-LEDGER.md first; checked for a stale `.git/index.lock` before committing — none present, working tree was clean on latest `main`. **Audit:** re-ran the full checks from the 2026-09-15 run (broken `/assets/img/` refs, sitemap-vs-disk, duplicate `<title>`s, missing meta descriptions) across all 61 journal articles — all clean, zero findings, so no on-page fix was available/needed this run. **Roadmap check:** confirmed via `journal/` listing + TEAM-LOG archaeology that the office cluster's Tier-1 items are all live; the next open item is GROWTH-PLAN Tier-2 #7, "How to Set Up a Japandi Desk — the 6-object rule." Tier-1 #3 (Japandi Executive Desk) remains blocked on new-ASIN sourcing (Amazon egress, per the 2026-09-15 ledger entry) — still true this run, not re-attempted. **Shipped:** `journal/six-object-rule/` — a new principles-category styling piece (sibling to `two-woods-rule`/`single-stem-rule`/`the-30-30-30-rule`) on what belongs on a Japandi desk surface: six fixed roles, why a monitor/cables don't count, a 5-minute audit, common breaks, FAQ. Every product pick reuses an ASIN already verified live elsewhere (no new Amazon sourcing needed or attempted). Also updated `journal/index.html` (card, ItemList schema, filter counts) and `sitemap.xml`, and added one cross-link sentence each in `journal/japandi-home-office/` and `journal/best-japandi-desk-accessories/` so the new page reads as a companion to the existing buying guide rather than a duplicate (see ledger entry below — the two pages ended up using nearly the same six ASINs). **PR:** https://github.com/Cammyboy11/calmandoak/pull/3 (branch `seo-ranker/six-object-rule-2026-09-18`), staged only the 5 touched files (`git status` confirmed no stray changes before commit), subscribed to PR activity. **SAFEGUARDS gate:** full 5-check verification block run and posted in the PR body — all PASS (0 broken images across touched files, all 7 reused ASINs confirmed live in ≥1 other article, word count 2,577 visible / target 2,400+, all TOC anchors resolve). **Needs-Cameron:** review/merge PR #3. · staged (PR #3 open, needs-Cameron review)

- 2026-09-15 · SEO-RANKER · **Full-site audit + 1 safe on-page fix, staged as a PR (not pushed to main — the 2026-09-14 public-facing review gate now applies).** Read CONTROL.md (PAUSE: false), SAFEGUARDS.md, CONTENT-ROADMAP.md, GROWTH-PLAN-90-DAY.md, CEO-BRIEF/LESSONS-LEDGER.md first; checked for a stale `.git/index.lock` before committing (per the 2026-09-10 ledger entry) — none present. **Audit:** full crawl of journal/ (61 articles) + shop/ for broken `/assets/img/` refs — zero MISS; sitemap-vs-disk diff — sitemap complete aside from correctly-excluded pages; duplicate-`<title>` scan — clean. **Found + fixed:** `/home-preview/` and `/home-preview2/` are live, unlinked, stale draft snapshots of the homepage with no robots directive (canonical already points to `/`, but nothing stopped them being crawled as duplicate content) — added `noindex, follow` (matching `/go/`'s existing pattern) to both. **PR:** https://github.com/Cammyboy11/calmandoak/pull/2 (branch `seo-ranker/noindex-preview-pages-2026-09-15`), staged only the 2 touched files. **SAFEGUARDS gate:** not applicable — no journal/ASIN/image/caption content touched (`git diff --stat` confirms scope). **Content roadmap:** did not write a new article this run. GROWTH-PLAN-90-DAY.md Tier-1 #3 ("Japandi Executive Desk") is the next open office-cluster item — confirmed no `japandi-executive-desk` page or sitemap entry exists — but it needs new 55–60" statement-desk ASINs distinct from every desk already live on the site (all ≤47"), and `www.amazon.com` is blocked by this session's egress policy (confirmed via a direct WebFetch → `EGRESS_BLOCKED`), so new ASINs can't be verified against SAFEGUARDS Check 3 from here. Logged as a new ledger entry rather than shipping an unverified ASIN. **Needs-Cameron:** (1) review/merge PR #2; (2) either grant this environment Amazon access, or accept that cloud runs can only build new affiliate content by reusing already-verified ASINs (per the ledger entry) — Japandi Executive Desk stays blocked until one of those changes. · staged (PR #2 open, needs-Cameron review); needs-Cameron (Amazon egress for new-ASIN sourcing)

- 2026-06-29 · COWORK (Cameron session) · **FRAMES cross-sell is LIVE** at `/shop/frames/` — framing guide + print→frame size-matcher + Etsy print cross-sell, with affiliate *search* links (tag `calmandoak-20`) and FAQ/Breadcrumb schema. **Needs-merchandiser:** upgrade the search links to image product cards — source + verify an Amazon ASIN and crop a `p-<ASIN>.jpg` for each of the 8 frames below, then drop the cards into a `product-grid` on `shop/frames/index.html` (card markup + alt text already written in this session). These are Amazon affiliate, **not Gelato POD**. NOTE: `_gaplist.js` only auto-detects gap cards that are `<article class="product">` with an `amazon.../s?k=` CTA, so the frames need that card form added (currently a table) to enter the worklist. Frames to source (query · tier): light-oak-11x14 `$` · light-oak-8x10 `$` · light-oak-16x20 `$$` · slim-black-metal-11x14 `$` · natural-wood-float-frame `$$` · oak-gallery-wall-set `$$` · 3×-matching-11x14-oak `$$` · white-mat-11x14-for-8x10 `$`. Also shipped same session: prints page `wa` + `sage-stone` Etsy links wired in `print-links.js`, paper-weight corrected to 250gsm, and the size list reconciled to 8×10/11×14/16×20. · live (frames page + prints fixes); needs-merchandiser (8 frame ASINs + images)

---

## Log

- 2026-09-14 · CONTENT-FACTORY (cloud restart run, first since 2026-07-18) · **Reality check: the account was NOT dark.** `blotato_list_schedules` showed 145 posts already queued through 2026-09-30 — Pinterest full at the 5/day ceiling every day through 2026-09-30 (no new Pinterest built this run, on purpose, to respect CONTROL.md's rate ceiling); Instagram/TikTok fully booked through 2026-09-17, partial (3/5) on 2026-09-18, then **empty from 2026-09-19 on**. Built + fully SAFEGUARDS-QA'd 12 new pins (office/workspace ×4, prints ×3, colour palette ×2, Looks ×3 — weighted per GROWTH-PLAN-90-DAY.md) from tracked site assets (`assets/img/products-cropped`, `assets/img/prints`, `assets/img/looks`, `assets/img/journal-covers`) since this cloud checkout has **none** of the gitignored local inventory (`final pins/`, `01-brand-assets/`…`05-products-by-day/`, `Pin Copy Library*.md` — all local-only, all absent here; no `VALIDATED-ASINS*.md` was ever committed to git either). Converted all 12 to 9:16 reels (`_pin-to-reel.js`) and added the ambient audio bed (`_add-audio-bed.js`) — **found that script truncated/syntactically broken at HEAD** (`Unexpected end of input`), fixed inline (one-line completion of the truncated else-branch), verified the fix produces real video+AAC output. Fix left uncommitted, out of this run's scope — needs a deliberate commit. **BLOCKED — nothing published:** this cloud sandbox's network egress policy denies outbound HTTPS to `database.blotato.io` (Blotato's own upload-storage host), so the presigned-upload flow (`blotato_create_presigned_upload_url` → PUT bytes → `blotato_create_post`) cannot run from here — confirmed via the proxy's own status endpoint as an organization policy denial, not a transient failure. All 12 pins + reels + audio + full copy + QA blocks staged at `final pins/batches/2026-38-ig-tiktok/README.md` (gitignored, not committed — matches how this whole inventory system already works), ready for a session with real network access (desktop Cowork, most likely) to upload and schedule as-is at the documented slot times. **Separate compliance finding:** sampled ~20 of the 145 already-scheduled posts (built by an earlier/different run) — none of the monetized Amazon/Awin ones carry the required FTC disclosure sentence or `#affiliate` hashtag (e.g. the 2026-09-14T18:05Z Pinterest linen-curtains post ends "Shop the linen curtain look." with no disclosure at all). Looks systemic across that batch, not a one-off. Did not touch/delete any of the 145 live schedules — outside this run's authority to bulk-edit without Cameron's sign-off. · staged (needs-Cameron: network access for cloud publishing, disclosure-gap review, commit the audio-bed fix)

- 2026-09-14 · SEO-RANKER · **First unattended run after 8-week dark period. Shipped: sitemap.xml on-page fix, no journal rebuild this run.** Read CONTROL.md (PAUSE: false, proceeded), SAFEGUARDS.md, CONTENT-ROADMAP.md, GROWTH-PLAN-90-DAY.md, LESSONS-LEDGER.md first. Checked for the known stale-`.git/index.lock` failure mode before committing — none present, commits worked cleanly. **Audit scope:** full file crawl of journal/ (61 articles) + shop/ (23 categories, prints, sets, guides) for broken images, orphaned pages (missing from sitemap.xml), and the historic Product-schema-on-affiliate-pages violation. **Findings:** (1) zero broken `/assets/img/` references across all journal articles — clean; (2) zero Product-schema violations on affiliate pages — only shop/prints/*, shop/sets/*, shop/guides/* (Calm & Oak's own products) carry Product+offers, exactly per rule; (3) **19 live, self-canonical, indexable pages were entirely absent from sitemap.xml** — all 10 `shop/sets/*` print-set pages + `shop/sets/` category index, `shop/frames/`, `shop/guides/`, `shop/home-textiles/`, `shop/wallpaper/`, `journal/japandi-desk/`, and `palette-cheat-sheet/` (the link-magnet asset GROWTH-PLAN calls out by name) + `the-edit/`. Confirmed `shop/dining/` and `shop/living-room/` are correctly excluded (noindex + meta-refresh redirects, not bugs). **Shipped:** added all 19 URLs to sitemap.xml with consistent lastmod/changefreq/priority conventions, validated well-formed XML, staged only `sitemap.xml` (git status confirmed clean tree otherwise, no blanket `add -A`), committed `c0370ba`, pushed to main (auto-deploys via Cloudflare Pages). **SAFEGUARDS gate:** not applicable to this change (no journal article content touched, no picture/product/caption/ASIN edits) — confirmed via `git diff --stat` showing only `sitemap.xml` before commit. **Content roadmap:** did NOT write a new journal article this run. GROWTH-PLAN-90-DAY.md names the office cluster as #1 priority, but the underlying office-cluster articles (best-japandi-desks, best-japandi-office-chairs, best-japandi-desk-accessories, japandi-desk, 400-dollar-home-office) already exist per a prior run's TEAM-LOG entries (2026-06-23) — CONTENT-ROADMAP.md's own priority order (furniture > textiles > storage > kitchen > lighting > bedroom > outdoor > ceramics > office > decor) and GROWTH-PLAN-90-DAY.md's office-first framing appear to conflict, and neither doc was updated to mark completed items, so "next in order" was ambiguous. Chose to ship a verified, low-risk fix rather than guess at content priority unattended on a first restart. **Needs-Cameron:** (a) reconcile CONTENT-ROADMAP.md's priority order against GROWTH-PLAN-90-DAY.md's office-cluster framing and mark completed roadmap items so future runs don't re-derive this; (b) confirm whether the Sprint 1 mega-pillar upgrade (japandi-101) or Sprint 2 room pillars are still open — could not tell from the docs alone without risking a duplicate/low-value rebuild. · live (sitemap fix, commit c0370ba); needs-Cameron (roadmap reconciliation)

- 2026-07-06 · SEO-RANKER · **NEW Tier-1 article LIVE: Wabi-Sabi Decor.** Published `/journal/wabi-sabi-decor/` (GROWTH-PLAN Tier-1 #6 — broadens "wabi sabi ceramics", 47 impr, into the wider "wabi-sabi decor" query). ~1,650-word buying guide, 12 verified imperfect pieces across ceramics/textiles/light/natural-fibre — every ASIN reused from already-live, SAFEGUARDS-passed articles (wabi-sabi-ceramics, honest-materials, layering-textiles, best-japandi-lighting, nightstand-styling, single-stem-rule) so picture↔product identity is inherently clean (card image = the product's own photo linked to that exact ASIN). Plain `ListItem`/affiliate markup only, zero Product schema; all 12 links `rel="sponsored nofollow noopener"` tag `calmandoak-20`; Article+Breadcrumb+FAQ schema. Internal mesh: links UP to japandi-101 + wabi-sabi-ceramics (spoke→hub) and ACROSS to honest-materials, single-stem-rule, layering-textiles, art-of-negative-space, nightstand-styling, storage-that-doesnt-look-like-storage, best-linen-bedding, lighting-the-five-pm-room + 6 shop edits. Added to sitemap.xml (lastmod 2026-07-06). SAFEGUARDS gate: all 6 checks PASS (image resolution 35 OK / 0 MISS; title 49; meta 141; ASIN identity 12/12 MATCH). Caveat: GSC still dark (`node _gsc.js` = no credential) and ASIN star/stock re-verify deferred to the monthly-audit (ASINs inherited-verified from live articles). **For PINTEREST/CONTENT-FACTORY:** new URL to pin + cross-link (pairs with the prints + palette pins). **For EMAIL:** candidate for the next newsletter's "one new journal piece" slot. · live

- 2026-06-25 · Bartok AM · Money card written (`Bartok/money-cards/2026-06-25-AM.md`), first card / baseline. LEAK: measurement blackout — GA4/GSC/MailerLite/Awin credentials all empty in .env, so ~80 posts published this week (Pinterest 37, TikTok 30, IG 30) carry zero attributable outcomes; underneath it the two paid guides sit at $0 with buy buttons disabled. LEVER: turn on the already-built digital-product stream (~100% margin) — merchandiser holds, email pre-stages one promo. ONE UNLOCK: Cameron completes the 3 Payhip steps (`node _build-product-pdfs.js` → upload PDFs → paste share URLs into `assets/js/guide-links.js` → redeploy) to switch the two paid guides live. No spend, send, or account change made. · staged (needs-Cameron: Payhip activation)

- 2026-06-24 · CRO · EMAIL-CAPTURE GAP CLOSED on the cornerstone journal guides. Audited the live capture mechanism: signup is already wired end-to-end (`assets/js/main.js` → MailerLite JSONP form 188364767967053815, account 2375797 → "Starter Guide" group/welcome automation; success note hands over the PDF instantly via `/assets/starter-guide/Japandi-Starter-Guide.pdf`, and the palette/calculator forms hand over the cheat-sheet). Capture was already present on 70 pages but MISSING from 8 high-value organic-search journal guides — added the standard on-brand Starter-Guide signup block (matching the japandi-bedroom pattern) to: honest-materials, layering-textiles, lighting-the-five-pm-room, single-stem-rule, the-30-30-30-rule, two-woods-rule, wabi-sabi-ceramics, warmth-without-clutter. Each of these 8 now routes to all three (email capture + Amazon product links + footer calculator/palette tool). Also fixed the "An 20-page" → "A 20-page" grammar bug in the capture copy on the 5 highest-traffic pages (home, /begin-here/, journal index, japandi-101, japandi-living-room). Hypothesis: the 8 guides pull steady organic traffic with zero owned-list capture; adding the prominent magnet should convert a share of that to subscribers at near-zero cost. NOTE: shops `/shop/dining/` + `/shop/living-room/` are noindex redirect stubs — correctly skipped. NO sends, no pricing/account/DNS changes. ESCALATE — git/shell are blocked in this session, so the edits are in the working tree but NOT yet committed/pushed; Cameron (or an agent with shell access) must `git add` the 13 changed files + `git commit` + `git push` to deploy via Cloudflare Pages, then confirm the capture renders on the 8 deployed journal URLs. Remaining "An 20-page" typo still present in ~57 other lower-traffic pages — safe to batch-fix in a follow-up scripted pass. · staged (needs-Cameron: commit+push to deploy)

- 2026-06-24 · CONTENT-FACTORY · PRINTS "first-dollar" pin batch built (15 pins) targeting the 31 LIVE Payhip print products via their on-site print pages `/shop/prints/<slug>/` (Payhip buy button + Product schema confirmed live on enso). Designs across all 5 series (sumi-e, botanical line, landscape/abstract, moon, kanji, tonal); picture↔product identity inherently clean (pin image = the print sold). Full QA gate PASSED on all 15. Destinations carry UTM `utm_campaign=prints&utm_content=<slug>`. Batch staged at `final pins/batches/2026-26.md`. **BLOCKED — NOT published:** both Blotato MCP servers returned permission-denied (accounts/boards unverifiable, nothing scheduled); staged per the "if Blotato unavailable, stage + flag" rule. NEEDS-CAMERON: re-authorize the Blotato MCP for this agent — it is the only blocker to publishing this batch + the ongoing 3-prints-pins/day Pinterest cadence. Inventory runway healthy (16 designs still unpinned, no generation needed). · staged (needs-Cameron: Blotato auth)

- 2026-06-24 · MERCHANDISER · FIRST PAID DIGITAL PRODUCTS + storefront shipped. Two premium printables built end-to-end (print-ready HTML → PDF via the cheat-sheet pipeline) and given full-chrome sales pages: (1) **The Japandi Home Plan** — 12-page room-by-room plan (palette + two woods + shopping order + budgets + per-room checklists), sales page calmandoak.com/shop/guides/japandi-home-plan/, suggested $19. (2) **The Japandi Styling Pack** — 10-page styling system (shelf/surface formulas + 3-weight texture rule + print pairing + lighting + 30-day plan), sales page calmandoak.com/shop/guides/japandi-styling-pack/, suggested $12. New storefront hub **calmandoak.com/shop/guides/** lists both paid guides + the free cheat-sheet/generator/calculator; linked from /shop/ (card + footer) and from the cheat-sheet + calculator footers. Both products are MORE than the free cheat-sheet (do not cannibalise the lead magnet — the free one is colour, these are the build + the styling). EMAIL: please draft a promo for the new /shop/guides/ hub + the two landers once they're live; great upsell to the cheat-sheet list. PINTEREST/CONTENT: three new money-page URLs to pin and cross-link from the journal guides (Home Plan ↔ budget-room + two-woods articles; Styling Pack ↔ prints + palette articles). · live (buy buttons safely disabled showing "Available shortly" until Cameron does the 3 Payhip steps below — NEEDS-CAMERON)

### MERCHANDISER 2026-06-24 — Payhip steps for Cameron (per product — checkout-platform action, intentionally not auto-done)
> 1. Render the PDFs (one-time): from the repo root run `node _build-product-pdfs.js` → writes `assets/japandi-home-plan/The-Japandi-Home-Plan.pdf` and `assets/japandi-styling-pack/The-Japandi-Styling-Pack.pdf` (puppeteer is installed). 2. In Payhip → Add new product → Digital → upload that PDF. 3. Set price ($19 Home Plan, $12 Styling Pack — or your call) + name/description. 4. Copy the product's share URL (https://payhip.com/b/XXXXX). 5. Paste each URL into `assets/js/guide-links.js` → the `PRODUCTS` map (replace the empty "" for `japandi-home-plan` / `japandi-styling-pack`), save, redeploy. The Buy buttons switch on automatically — no page edits. (Optional: also list both on Etsy like the prints.)

- 2026-06-24 · MERCHANDISER · Japandi palette cheat-sheet shipped (the lead magnet /palette/ + /calculator/ promised). Landing page calmandoak.com/palette-cheat-sheet/ + print-ready asset /assets/palette-cheat-sheet/japandi-palette-cheat-sheet.html (5 signature palettes w/ hex, 3 rules, room-matcher, 5 mistakes — on-brand, US-Letter, save-to-PDF). Signup success-note on /palette/ + /calculator/ now hands over the cheat-sheet instantly. EMAIL: please promote the new lander; one open item for Cameron — the live MailerLite welcome email still attaches the Starter Guide, not the cheat-sheet (provider-settings change, needs Cameron). PINTEREST/CONTENT: new link-magnet URL to pin/cross-link. · live (1 needs-Cameron: PDF binary + MailerLite attach)

- 2026-06-23 · OUTREACH · Weekly cycle (first live run). 3 HARO/Qwoted/Featured-style pitches DRAFTED (no send channel connected — needs Cameron to connect platform/email before send). GSC status: live MCP denied, used 90-day-plan baseline + manual SERP read. Ranked keyword-gap list (10 ideas, office-weighted) handed to Content/ranker. Full detail below. · staged (needs-Cameron to send pitches)

### OUTREACH 2026-06-23 — (1) Staged journalist pitches

> Channel status: NO journalist-request platform or outreach email is connected to this agent. The live HARO/Qwoted/Featured feeds sit behind logins and are not reachable via web search, so the three below are written against the *recurring, currently-active request types* these outlets run in the home/interiors vertical (verified by live 2026 trend coverage). All three are DRAFTED and staged. To actually send: Cameron connects a Qwoted/Featured.com account (or gives the agent a from-address) and confirms the byline/expert name + the affiliate-disclosure-free quote is OK to attribute to Calm & Oak.

**Pitch A — "Japandi home office / desk setup" (Featured.com-style expert roundup)**
Likely prompt: *"What's the one rule for designing a calm, Japandi-style home office?"*
Quote (attribute: Calm & Oak, calmandoak.com):
"The mistake most people make with a Japandi workspace is treating 'minimal' as 'empty.' It isn't — Japandi is warm minimalism. The rule we give readers is the two-woods rule: pick one mid-tone wood for the desk (oak or ash) and one darker accent (walnut) for a tray or shelf, then stop. Two woods read as intentional; three reads as clutter. Keep the desk surface to a six-object maximum — laptop, lamp, a single ceramic vessel, a notebook, one plant, one tray to corral the rest — and let the natural grain do the decorating. A calm desk isn't a bare desk; it's an edited one."
Why it lands: concrete, named ("two-woods rule," "six-object rule") = quotable; ties directly to /journal/two-woods-rule/ and /journal/japandi-home-office/.

**Pitch B — "2026 interiors trends" (HARO/Qwoted-style trend request)**
Likely prompt: *"Which interior trend is still going strong in 2026, and how should readers actually use it?"*
Quote (attribute: Calm & Oak):
"Japandi isn't slowing in 2026 — it's maturing. The shift we're seeing is away from the cool, greige version toward warmer, lived-in neutrals: oat and clay instead of stark white, more visible wood grain, a little more texture. Practically, that means readers can lean into Japandi without their home feeling cold or showroom-y. Start with the palette — a warm neutral base, one grounding earth tone, one muted natural like sage — and build the room from materials before objects. Get linen, oak and stoneware in the room first; the styling takes care of itself."
Why it lands: matches the live 2026 'warmer Japandi' trend signal; ties to /journal/japandi-color-palette/ + /palette/ (the cheat-sheet link-magnet).

**Pitch C — "Small-space / WFH styling" (Featured.com-style request)**
Likely prompt: *"How do you create a calm work-from-home corner in a small space?"*
Quote (attribute: Calm & Oak):
"You don't need a spare room — you need a defined edge. In a small space, a Japandi work corner works because it visually closes itself off: a slim solid-wood desk against the wall, a single woven or wood-frame chair, and one vertical element — a narrow shelf or a framed print — to draw the eye up and make the zone feel deliberate rather than borrowed from the living room. Keep everything on a tray so the 'office' can disappear at 6pm. Calm comes from the boundary, not the square footage."
Why it lands: answers a high-volume small-space angle; ties to /shop/looks/the-japandi-workspace/ + the planned 'Small Japandi Office Ideas' article.

### OUTREACH 2026-06-23 — (2) Search Console / technical status

> **Live GSC NOT reachable this run** — the connected Ahrefs/GSC MCP returned permission-denied for this agent (management-projects + gsc-* tools). No Search Console property is wired to the agent. Reported below = 90-day-plan baseline (June 2026) + a manual SERP read via web search. **Needs-Cameron:** authorize the GSC/Ahrefs MCP for this agent (or paste a GSC performance export) so positions/indexing can be tracked live each week.

- **Office-cluster positions (baseline, GROWTH-PLAN):** japandi office chair ~12.0 (page-1 bottom), japandi desk chair ~12.1, japandi home office ~22.7, japandi desk ~26.5, japandi executive desk ~25.1, japandi office ~37.6. No dedicated chair/desk page exists yet — both pos-12 terms are ranking off /shop/office/ + /journal/japandi-home-office/ alone.
- **Manual SERP read (2026):** "japandi office chair" / "japandi desk" SERPs are dominated by retailer collection pages (AllModern, Wayfair, 2Modern, Article, shopjapandi) + a few thin blog roundups (rosstopia, mojoboutique). Editorial gap is real — a genuinely useful "verified picks" page with material/why-it-fits reasoning can realistically crack top 10 from pos 12. This validates Tier-1 articles #1 and #2 as the highest-ROI writes.
- **Indexing backlog:** 42 indexed / 64 "discovered – not indexed" (baseline). Cannot confirm movement without live GSC — flagging to re-check next run once access is granted. New URLs since sitemap: /palette/ (lastmod 2026-06-23) — **request indexing** once live GSC is reachable.
- **Schema guardrail check:** could not validate the Product-snippet status live (GSC denied). Manual reminder to ranker: affiliate products MUST stay plain ListItem (name+url+image); only own /shop/prints/* use Product+offers. The 102-invalid-items issue can only be confirmed cleared via GSC — escalating that confirmation to next run / Cameron.
- **No DNS/redirect/account changes made or attempted** (per guardrails). The www 5xx redirect note (if still open) remains a Cameron task.

### OUTREACH 2026-06-23 — (3) Ranked keyword-gap list for Content / calmoak-seo-ranker

> Weighted to the office cluster (north-star). Rank = priority to write. Each maps to plan tiers; office terms first because they already earn impressions at pos 12–37.

1. **japandi office chair / japandi desk chair** → "Best Japandi Office Chairs (Comfort Without the Clutter)" — both already pos ~12, NO dedicated page, retailer-only SERP = fastest top-10 win. (Plan Tier-1 #2)
2. **japandi desk / japandi executive desk** → "Japandi Desk: 9 Solid-Wood Picks for a Calm Workspace" — pos 25–26, strong commercial intent, solid-wood angle confirmed live. (Tier-1 #1 / #3)
3. **japandi home office** (deepen) → refresh /journal/japandi-home-office/ as the cluster HUB; add internal links down to the new chair + desk pages. (supports whole cluster)
4. **small japandi office / japandi office corner** → "Small Japandi Office Ideas (for a Corner or Closet)" — high small-space demand, low competition. (Tier-2 #9)
5. **japandi desk setup / how to style a japandi desk** → "How to Set Up a Japandi Desk — the 6-object rule" — styling/informational, feeds Pitch A's quotable rule. (Tier-2 #7)
6. **japandi desk accessories** → "Japandi Desk Accessories: 10 Pieces That Earn Their Place" — long-tail, high affiliate fit. (Tier-2 #8)
7. **japandi wall colours / japandi colours** → "Japandi Wall Colours: 8 Paint Picks (with Hex Codes)" — pairs with /palette/ link-magnet; supports Pitch B. (Tier-1 #4)
8. **is japandi still in style 2026** → "Is Japandi Still in Style for 2026?" trend report — link-magnet, very linkable, refresh yearly; arms outreach pitches. (Tier-4 #17)
9. **japandi office desk lighting / japandi desk lamp** → section or short post on warm task lighting for the workspace — fills a cluster gap, pairs with /journal/lighting-the-five-pm-room/. (new gap)
10. **wabi-sabi decor** → "Wabi-Sabi Decor: 12 Imperfect Pieces for a Calm Home" — broadens wabi-sabi ceramics (47 impr); ties cluster to existing /journal/wabi-sabi-ceramics/. (Tier-1 #6)


- 2026-06-22 · GEO · Baseline 0/5 in AI answers; ticke