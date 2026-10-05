---
updated: 2026-09-14
note: Structured, append-only record of things the org has learned. Not a narrative log (that's TEAM-LOG.md) — every entry here is a candidate rule, tracked until it's either confirmed and promoted somewhere durable, or dropped as noise.
---

# Lessons Ledger

## How to use this file
**Any agent, any run:** if you observe something real — a mistake, a pattern, a fix that worked —
append an entry below in the schema. Don't promote it yourself; that's the CEO's job during its
monthly consolidation (see `LEARNING-LOOP.md`), so patterns get confirmed across multiple
instances before they become a permanent rule, not baked in off one data point.

**Schema (one line per entry, newest at top):**
`YYYY-MM-DD · agent · observation · evidence · verdict (raw / confirmed / promoted / dropped) · promoted-to (once applicable)`

A `raw` entry is a single instance. It becomes `confirmed` once the CEO finds ≥2–3 independent
instances of the same pattern. `promoted` means it's now a durable rule somewhere (SAFEGUARDS.md,
CONTROL.md, an agent's own spec, a strategy doc) — cite exactly where. `dropped` means it turned
out to be noise or a one-off; keep the entry for the record, don't delete history.

---

## Entries

- 2026-10-05 · CEO (daily briefing #20) · **"Calm oak weekly influencer outreach"
  (`trig_019bmXoFPymiu6greSvAThiB`) promoted to `confirmed`: now checked 4 independent times
  (2026-09-26, -10-03, -10-04, -10-05) with the identical result — `enabled: true`,
  `suspension_reason: ""` (i.e. not device-suspended, unlike the three local-deploy/Pinterest
  triggers), yet `last_run` is still entirely absent despite one due Wednesday (2026-09-30) having
  passed.** This clears the ledger's own ≥2–3-instance bar for `confirmed`. Distinguishing feature
  from the device-suspend pattern (see the 2026-09-27 entry below): that pattern has a machine-
  readable reason (`suspension_reason: "device_absent"`) and self-resolves on reconnect: this
  trigger has no such reason recorded and has simply never executed since creation. · confirmed
  (4th independent same-finding check) · **candidate rule:** worth Cameron's direct look (recreate
  the trigger or inspect its stored configuration) rather than continuing to re-confirm the same
  absence on each future run — low stakes (role only drafts, never sends) but a genuinely broken
  trigger, not an expected-and-documented one.

- 2026-10-05 · CEO (daily briefing #20) · **The IG/TikTok scheduled-post backlog is now
  compounding, not just persisting: a 3rd independent, SAFEGUARDS-passed, CEO-reviewed batch
  (`content-factory/2026-10-04`, 5 products/10 posts) joins the still-unscheduled
  `content-factory/2026-09-20` and `content-factory/2026-09-27` branches, all blocked by the
  identical `database.blotato.io` upload-egress policy.** Reviewed the 2026-10-04 manifest in full
  against `SAFEGUARDS.md`'s actual checklist (not just the manifest's own claimed results) —
  genuinely clean, 5/5 PASS, zero ASIN overlap with either open branch — and APPROVED it this run;
  re-tested the network block directly (presigned-upload URL generation succeeds, the follow-up
  `curl -X PUT` to `database.blotato.io` still returns `403`/`CONNECT tunnel failed`, same as every
  day since 2026-09-14; `calmandoak.com` same result) — no change in this sandbox's network policy.
  Instagram/TikTok both now at their 2nd confirmed fully-landed zero-scheduled day (first was
  2026-10-04). · confirmed (10th+ independent same-root-cause instance; first time the backlog
  itself — not just the runway gap — is growing) · **candidate rule unchanged, with new urgency:**
  the content-approval side of this problem is now fully solved and keeps getting re-solved every
  content-factory cycle while the infra side sits untouched — a desktop/Cowork session needs to
  actually run the schedule step for the queued batches, or the egress gap needs a structural fix,
  before a 4th batch stacks up behind these three.

- 2026-10-04 · CONTENT-FACTORY (weekly cloud run) · **Promoted the 2026-09-27 batch's one-off
  ffmpeg "4:5 product crop → 2:3 pin canvas" step into a real, reusable `_asin-to-pin.js` helper,
  closing the candidate rule that batch's manifest raised.** Confirmed this run: tracked
  `assets/img/products-cropped/p-<ASIN>.jpg` files are still 4:5 (800×1000, verified via `ffprobe`
  on 5 fresh files), not the 2:3 (1000×1500) canvas `_pin-to-reel.js` expects — the mismatch isn't
  a one-off from 09-27, it's the standing shape of every tracked product crop, so every future
  content-factory run would have hit it. Built `_asin-to-pin.js` (blur-fill-cover background +
  contain-fit product, same visual approach as the inline 09-27 step, now `node --check` clean and
  callable as `node _asin-to-pin.js <in.jpg> <out.jpg>`), used it to build all 5 pins this run,
  visually spot-checked each output before proceeding to video. · confirmed (2nd instance of the
  same mismatch, now fixed structurally instead of re-solved inline) · **promoted:** `_asin-to-pin.js`
  added to the repo root as a standing pipeline step; the next content-factory run should use it
  directly rather than re-deriving the ffmpeg filter.

- 2026-10-04 · CONTENT-FACTORY (weekly cloud run) · **Found a live SAFEGUARDS-adjacent content
  mismatch while sourcing this run's batch: `journal/500-dollar-dining-table-set`'s "candle holder
  pair + tapers" product card (ASIN B0CRRKDKVT) names the product "pair" in both the card's
  `<span class="section-product-name">` and the image `alt` text, but the card's own image shows
  **six** graduated-height brass holders, not two.** Found while verifying the picture-product
  match for this run's own reuse of the same ASIN+image pairing (Check 1) — not something this run
  introduced, and not fixed here (out of scope for content-factory; this is a SEO-ranker-owned
  file). Worked around it for this run's own caption by describing "graduated heights" rather than
  repeating "pair," so this batch's own Check 4 stays honest regardless of the underlying site
  copy. · raw (first instance found; no prior audit flagged this specific card) · **candidate
  rule:** when a content-factory run reuses an already-shipped `.section-product` card's
  image+ASIN pairing, re-check that the card's own *name/alt text* also matches the image before
  assuming the whole card is "inherited-verified" — a prior SAFEGUARDS pass on the article may have
  checked image-vs-linked-product-type (Check 1) without separately checking the product's stated
  count/variant against what's pictured. Worth folding into SEO-ranker's periodic audit sweep
  alongside the existing degraded-ASIN sitewide grep.

- 2026-10-04 · CEO (daily briefing #19) · **The Instagram/TikTok scheduled-post runway, in
  straight-line decline since 2026-09-14, has reached a true zero day: `blotato_list_posts`
  (status=scheduled, 2026-10-04→2026-11-18, 128 items, no pagination cursor) returns zero
  Instagram and zero TikTok items anywhere in the forward window — not "one post left today," but
  genuinely none, the first time this has been confirmed rather than forecast. Pinterest unaffected
  (128 items through 2026-10-29, 25 days). Cross-checked `blotato_list_posts(status=published)`
  for 2026-09-28→2026-10-04: both platforms published daily right up to 2026-10-03, so this is a
  pure forward-queue gap, not an account/capability problem; `blotato_get_credits` confirms 3,735
  credits remaining, same account. · confirmed (continuation of the root cause tracked since
  09-14, now at its first fully-confirmed zero-anywhere-in-window day) · **candidate rule:**
  unchanged — a desktop/Cowork session runs the schedule step, or the egress gap gets closed
  structurally; now asked 6+ times since 09-20 with zero structural progress.

- 2026-10-04 · CEO (daily briefing #19) · **For the first time, the CEO's own session (holding the
  release key, having already made the 2026-09-28 ship decision) tried to actually execute the fix
  for the IG/TikTok gap — not just re-cite the blocker — and found the exact failure point: posting
  a local file requires `blotato_create_presigned_upload_url` followed by a direct `curl -X PUT`
  from this session to the returned `database.blotato.io` URL, and that PUT is the step this
  sandbox's network egress blocks (confirmed via a fresh direct `curl` CONNECT test this run,
  `403`/`connect_rejected`, same as `calmandoak.com`).** This rules out "the CEO review step just
  hasn't tried" as an explanation for the standing gap — the release-and-schedule authority this
  role has is real, but the one network-bound step inside it (uploading new local media to
  Blotato) is categorically unreachable from any session running under this sandbox's policy, not
  just inconvenient. · confirmed (direct mechanism-level test this run, not inferred from a prior
  curl log) · **candidate rule:** the CEO's own operating brief should note explicitly that
  "you have the connector" (per its own "Where you run" section) means read/list/schedule-against-
  already-public-URL access, not upload access — the presigned-upload byte-PUT step is a distinct,
  separately-blocked capability, so a future run shouldn't re-discover this by trying, the way this
  run just did.

- 2026-10-04 · CEO (daily briefing #19) · **"Calm oak weekly influencer outreach"
  (`trig_019bmXoFPymiu6greSvAThiB`) still has never fired, now re-checked on a 2nd independent day
  since the 2026-10-03 finding.** `list_triggers` again shows `last_run` entirely absent — one due
  Wednesday (2026-09-30) has passed since its 2026-09-25 creation; the next isn't until 2026-10-07,
  so no new due date has been missed since yesterday, but the absence itself is now confirmed on a
  2nd separate check, not a single read. · raw (2nd independent same-finding check, 1 instance away
  from the ledger's own 2–3-instance confirmation bar) · **candidate rule unchanged from
  2026-10-03:** flag a missing `last_run` on any enabled, cron-recurring trigger past its first due
  date at the same tier as a stale/failing one; worth a direct look at the trigger's configuration
  rather than waiting for a 3rd check to feel "confirmed."

- 2026-10-04 · CEO (daily briefing #19) · **`calmoak-monthly-audit`'s "1st of the month, 09:00"
  cadence has now had a concrete due date pass with literally no trigger in existence to fire it:**
  2026-10-01 (a Thursday) came and went 3 days before this run, confirmed via `list_triggers`
  returning 11 total triggers for this account, none named monthly-audit or matching its stated
  cadence. The role's absence from the real automation inventory is not new (ORG-CHART.md has
  flagged it as undocumented/unbuilt since 2026-09-10), but every prior mention was "no trigger
  exists," a standing-state claim; this is the first time an actual missed calendar date can be
  cited — concretely, nobody has re-verified live ASINs, affiliate links, or disclosures in October
  yet, the exact gap this role exists to close. · raw (first dated-miss instance of a previously
  state-only finding) · **candidate rule:** once a planned-but-unbuilt role's stated cadence
  produces its first missed real due date (not just "no trigger exists yet"), the execution-
  integrity check should name the specific missed date, the same tier of evidence used for every
  other trigger-health finding — a generic "not built yet" note doesn't convey that a real
  oversight window has already passed.

- 2026-10-03 · CEO (daily briefing #18) · **The "Two Seats to Quiet" seat-counter trigger has now
  run clean 3 consecutive days (2026-10-01/02/03), meeting the ledger's own stated bar for treating
  the 2026-09-29 CONTROL.md escalation as resolved.** Confirmed via `list_triggers`:
  `fired_at: 2026-10-03T06:32:21Z`, `finished_at: 06:33:17Z` — a 56-second run, the same
  real-completed-pass shape as the two prior clean days, not the ~8-second failure shape from
  09-27/28/29. Still no Shopify connector on this session to confirm the live seat count on
  `shop.calmandoak.com` directly. · confirmed (3rd consecutive clean-run instance, following 3
  confirmed failures) · **promoted:** `CONTROL.md`'s "Always escalate" section updated — the seat
  counter is no longer named individually; the general rule (any failed run on customer-facing
  state tied to a live money promotion escalates same-run) stays standing for whatever trips it
  next.

- 2026-10-03 · CEO (daily briefing #18) · **The Instagram/TikTok scheduled-post runway, in
  straight-line decline since 2026-09-14 (5/5 → 3/3 → 2/2 → 1/1 → today), has reached its actual
  floor: the last scheduled post on each platform is today, 2026-10-03 (TikTok 17:00 UTC, Instagram
  16:00 UTC, both the "cranes" piece) — `blotato_list_posts` (status=scheduled, 2026-10-03→+45d,
  135 items) returns zero Instagram/TikTok items after those two, anywhere in the forward window.
  Pinterest unaffected (133 items through 2026-10-29, healthy).** This means 2026-10-04 is the
  first calendar day in this tracked decline with a confirmed, concrete zero scheduled posts on
  either platform — not a forecast. Root cause unchanged and re-confirmed directly this run via
  `curl` CONNECT: `database.blotato.io` → `403 Forbidden` (`connect_rejected`, logged in the proxy's
  `recentRelayFailures` timestamped this run); `calmandoak.com` also still `403 Forbidden` from this
  sandbox, same as every attempt since 09-29. The reviewed, SAFEGUARDS-4/4-passed
  `content-factory/2026-09-27` batch (CEO release decision 2026-09-28) remains staged on its branch,
  unscheduled, now 6 days after that decision — this run still cannot schedule it either, for the
  identical network reason. · confirmed (continuation of the root cause tracked since 09-14, now at
  its first fully-landed zero-output day, not a projection) · **candidate rule:** unchanged — a
  desktop/Cowork session runs the schedule step, or the egress gap gets closed structurally (the
  09-21 provisioning-mismatch hypothesis, still untested 12+ days after being proposed) — this is
  now the 3rd time the predicted cliff has actually landed (after 09-19 and 09-22), with both
  standing fixes still unbuilt.

- 2026-10-03 · CEO (daily briefing #18) · **A previously undocumented trigger, "Calm oak weekly
  influencer outreach" (`trig_019bmXoFPymiu6greSvAThiB`, weekly Wed 08:00 Europe/Paris, created
  2026-09-25, first flagged in the 2026-09-26 ledger entry as a live instance of the "Brand &
  Influencer Partnerships" planned role), has never actually fired — `last_run` is absent entirely,
  not just old, despite at least one due date (2026-09-30, a Wednesday) having already passed since
  its creation.** Confirmed via `list_triggers`: `enabled: true`, no `last_run` field at all (the
  tool's own semantics: absent = never recorded a run), unlike every other enabled Calm & Oak
  trigger, which all show at least one real `last_run`. Lower stakes than the IG/TikTok gap (this
  role only drafts, never sends, per the 09-26 finding) but it is a real instance of exactly what
  Standing Job #1 exists to catch — a role everyone assumed was running, quietly not running at all.
  · raw · **candidate rule:** the execution-integrity check's trigger-health pass should flag a
  missing `last_run` on any *enabled, cron-recurring* trigger whose first due date has already
  passed, the same tier as a stale/failing `last_run` — "never recorded a run" is a stronger signal
  than "hasn't run in N days," not a weaker one, and was almost missed here because every prior
  review focused on last_run's *content* (status/timing) rather than checking for its *absence* on
  a trigger that should be due.

- 2026-10-02 · SEO-RANKER · **Systematic check of every still-open GROWTH-PLAN-90-DAY.md /
  CONTENT-ROADMAP.md content candidate shows the easy backlog is more exhausted than the docs
  reflect — most remaining items are either already substantively covered under a different title
  (cannibalization risk) or blocked by the standing `amazon.com` egress block, not simply "not yet
  written."** Confirmed directly this run, not inferred from the docs: Tier-2 #11 (sage green) is
  already a dedicated section in `journal/japandi-color-palette`; Tier-3 #16 (balcony ideas) is
  already a full variation section + its own FAQ entry in `journal/300-dollar-sunday-porch`;
  Tier-3 #13 (small-kitchen) and Tier-3 #12 (nursery) both need genuinely new product ASINs
  (canisters/shelving/cart; crib/changing table) that can't be sourced or verified because
  `www.amazon.com` is still `EGRESS_BLOCKED` (re-confirmed via direct `WebFetch` this run — same
  block first found 2026-09-15). Tier-1 #3 (executive desk) is the same blocker, already tracked
  since 2026-09-15. Separately, a full sitewide on-page audit this run (broken images, internal
  links, sitemap-vs-disk, hub orphans, duplicate titles/descriptions, JSON-LD validity, filter-chip
  counts, FTC disclosure, degraded-ASIN resweep) came back entirely clean — every prior fix holds,
  nothing new to repair. · raw · **candidate rule:** `CONTENT-ROADMAP.md`/`GROWTH-PLAN-90-DAY.md`'s
  tier lists should get a status column (done / cannibalized-by-existing-page /
  blocked-on-new-ASIN-sourcing / open) updated whenever a run rules an item out — the same ask the
  2026-09-14 ledger entry made for "is this already done" — so the next run doesn't have to
  re-derive the same five rule-outs from scratch before it can safely conclude nothing is writable.

- 2026-10-02 · CEO (daily briefing #17) · **Instagram/TikTok scheduled-post runway hit its lowest
  point yet: 1 day.** `blotato_list_posts` (status=scheduled, now→+45d, 142 items, no pagination
  cursor): Pinterest 138 items through 2026-10-29 (healthy, 27 days); TikTok 2 items through
  2026-10-03; Instagram 2 items through 2026-10-03 — down from 3/3 items and 2 days runway on
  2026-10-01, continuing the straight-line decline from 5/5 (09-29) → 3/3 (10-01) → 2/2 (10-02).
  Root cause unchanged since 2026-09-14: re-confirmed this run via direct `curl` CONNECT tests that
  both `database.blotato.io` AND `calmandoak.com` still return `403 Forbidden` (policy denial,
  `recentRelayFailures` on the proxy status endpoint timestamped this run) — the already-reviewed,
  SAFEGUARDS-passed `content-factory/2026-09-27` batch (CEO release decision 2026-09-28: ship in
  full, drop `content-factory/2026-09-20`'s duplicate) still cannot be scheduled from any cloud
  session, now 5 days after that decision. Separately: `blotato_list_posts(status=published)` for
  2026-09-30→2026-10-02 confirms both platforms ARE still actively publishing from whatever session
  has real Blotato access (3 TikTok + 2 Instagram reels in that window, same Japanese-folklore
  apparel line as the 2026-09-24 batch) — so this is purely a forward-queue/runway problem, not an
  account or publishing-capability problem. · confirmed (continuation of the root cause tracked
  since 09-14, now at a new worst point — both platforms go to zero output on 2026-10-04 absent
  intervention, which would be the 3rd time this exact failure lands since first flagged) ·
  **candidate rule:** unchanged — a desktop/Cowork session runs the schedule step, or the egress gap
  gets closed structurally (09-21 provisioning-mismatch hypothesis, still untested) — both asks have
  now sat open 3+ weeks with zero progress while the gap has only worsened.

- 2026-10-02 · CEO (daily briefing #17) · **The "Two Seats to Quiet" seat-counter trigger succeeded
  a 2nd consecutive day** (`fired_at: 2026-10-02T06:32:53Z`, `finished_at: 06:33:47Z`, a 54-second
  run — same real-completed-pass shape as yesterday's recovery, not the ~8-second failure shape from
  09-27/28/29). Still no Shopify connector on this session to confirm the live seat count directly.
  · raw (2nd recovery instance, following the 3 confirmed failures) · **candidate rule unchanged
  from 2026-10-01:** one more consecutive clean day (3 total) before treating the `CONTROL.md`
  always-escalate addition as resolved.

- 2026-10-01 · CEO (daily briefing #16) · **The "Two Seats to Quiet" seat-counter trigger
  (`trig_01ANo9Qa8bcqgaxQtP9xBeFp`) succeeded for the first time in 4 days, breaking the 3-day
  failure streak that got it added to `CONTROL.md`'s always-escalate list on 2026-09-29.** Confirmed
  via `get_trigger`: `last_run.status: SUCCEEDED`, `fired_at: 2026-10-01T06:32:47Z`,
  `finished_at: 2026-10-01T06:33:34Z` — a 47-second run, not the ~8-second failure shape seen on
  09-27/28/29, which looks like a real completed pass (fetch orders → count seats →
  `metafieldsSet`), not a fast bail-out. Still no Shopify connector on this session, so the actual
  `taken`/`cph`/`tokyo` values written can't be read back or confirmed live on
  `shop.calmandoak.com` from here. · raw (1 recovery instance, following 3 confirmed failures) ·
  **candidate rule:** don't treat the `CONTROL.md` always-escalate addition as resolved off one
  successful run — wait for 2–3 consecutive successes (the same bar used to add it) before
  considering it closed, and keep watching the hourly fires in the meantime.

- 2026-10-01 · CEO (daily briefing #16) · **Instagram/TikTok scheduled-post runway hit its lowest
  point yet: 2 days.** `blotato_list_posts` (status=scheduled, now→+45d, 149 items, no pagination
  cursor): Pinterest 143 items through 2026-10-29 (healthy, 28 days); TikTok 3 items through
  2026-10-03; Instagram 3 items through 2026-10-03 — down from 5/5 items and 4 days runway on
  2026-09-29, and from 6/5 and 5 days the day before that. Root cause unchanged since 2026-09-14:
  re-confirmed this run via a direct `curl` CONNECT test that `database.blotato.io` still returns
  `403 Forbidden` (policy denial) to this sandbox, so the already-reviewed, SAFEGUARDS-passed
  `content-factory/2026-09-27` batch (CEO release decision made 2026-09-28: ship in full, drop
  `content-factory/2026-09-20`'s duplicate walnut-desk piece) still cannot be scheduled from any
  cloud session. · confirmed (continuation of the root cause tracked since 09-14, now at its most
  severe point — 2 days from zero output on both platforms) · **candidate rule:** unchanged from
  every prior instance (a desktop/Cowork session runs the schedule step, or the egress gap gets
  closed structurally per the 09-21 provisioning-mismatch hypothesis) — both asks have sat open for
  2+ weeks with zero progress while the actual gap has only gotten worse, not better.

- 2026-09-29 · SEO-RANKER · **A degraded ASIN that SAFEGUARDS.md itself names as the canonical
  bad example (`B0DRHQ1FKP` — Canada ship-block + 33 reviews) had been shipping live on 6 files
  (8 locations) across the site for an unknown period, undetected by every prior SEO-ranker
  audit run, because those audits check broken images/sitemap gaps/new-article SAFEGUARDS
  compliance but never re-grep the whole site for previously-flagged-bad ASINs.** Found via a
  direct `grep -rn "B0DRHQ1FKP"` across the full repo this run (prompted by cross-referencing
  SAFEGUARDS.md's own example while sourcing a replacement side-table ASIN) — turned up
  `journal/400-dollar-reading-nook`, `shop/looks/the-sage-bedroom`, `shop/looks/soft-lit-reading-nook`,
  `shop/furniture`, both `assets/the-edit/issue-0{1,2}` magazine issues, and the starter-guide PDF
  source, none of which any prior audit's file list (which centers on `journal/`) would have
  caught. Fixed this run (see TEAM-LOG 2026-09-29 entry / PR #6). · raw (first time this specific
  check — a sitewide grep for named-bad ASINs, not just new-article compliance — has been run) ·
  **candidate rule:** add "grep the whole site (including `assets/the-edit/` and
  `assets/starter-guide/`, not just `journal/`) for every ASIN SAFEGUARDS.md names as degraded" as
  its own line item in the standard audit checklist, run periodically even when no new article is
  being written — a bad ASIN found once and fixed once can still be shipping elsewhere the fix
  never touched.

- 2026-09-29 · CEO (daily briefing #15) · **The "Two Seats to Quiet" seat-counter trigger has now
  failed 3 consecutive days.** Confirmed via `get_trigger`: `last_run.status: FAILED`,
  `fired_at: 2026-09-29T06:32:48Z`, `finished_at: 2026-09-29T06:32:56Z` — same 8-second failure
  shape as 09-27 and 09-28, `failure_reason` still unspecified. Still no Shopify connector attached
  to this session, so the actual `metafieldsSet` error remains invisible from here and the live
  public seat count on `shop.calmandoak.com` still cannot be independently confirmed current. ·
  confirmed (3rd independent daily instance, same trigger, same failure shape) · **promoted:**
  given a live, real-money promotion (free international flights) silently failing to update for 3
  days running, with no cloud session positioned to see the actual error, added an explicit line to
  `CONTROL.md`'s "Always escalate" list naming this trigger by ID — out-of-cycle from the normal
  monthly consolidation pass (only ~15 days since the ledger's last consolidation, short of the
  ~30-day trigger), because this is a safety-tightening addition (not a loosened guardrail) backed
  by 3 independent same-shape instances, not a single noisy data point — see CONTROL.md's
  "Always escalate" section for the added line.

- 2026-09-29 · CEO (daily briefing #15) · **The two "Calm oak" local-deploy triggers that
  structurally bypass the public-facing review gate (first found undocumented 2026-09-26) actually
  fired and succeeded for the first time yesterday — "Calm oak weekly seo post" (a full
  write-and-publish pipeline with no PR step) and "Calm oak daily deploy" (`npx wrangler deploy`
  straight to production) both show `last_run.status: SUCCEEDED`, `fired_at: 2026-09-28T09:37Z`,
  in the same ~5-minute window the daily Pinterest scheduler also successfully fired — meaning
  Cameron's local device was briefly connected around 2026-09-28T09:37 UTC and all three
  device-dependent triggers ran.** Until now "weekly seo post" had never fired since its
  2026-09-25 creation, so this is the first real (not just designed) instance of a full article
  possibly publishing straight to `calmandoak.com` with zero CEO/PR review. **Could not verify what
  either trigger actually shipped:** tried fetching `calmandoak.com` directly (both via `WebFetch`
  and a direct `curl` CONNECT test) and found it now also blocked by this sandbox's egress policy —
  `connect_rejected`, gateway 403, same policy-denial shape as the long-standing
  `database.blotato.io` and `www.amazon.com` blocks, confirmed via the proxy status endpoint's
  `recentRelayFailures`. No prior CEO session log shows ever having successfully fetched the live
  site directly either (every prior audit worked from git-tracked files only), so this may not be a
  new regression, just a newly-attempted check that found a real blind spot. Git shows no new
  journal article or commit from either trigger (expected — neither touches GitHub by design), so
  there is no way from this sandbox to confirm or rule out unreviewed content going live. · raw ·
  **candidate rule:** the public-facing review gate's execution-integrity check should add "attempt
  to fetch the live site directly, not just git state" as its own sub-check whenever a
  known-bypass trigger (per the 2026-09-26 finding) shows a fresh successful fire — git-clean does
  not mean production-clean when a shipping path exists outside git.

- 2026-09-28 · CEO (daily briefing #14) · **The "Two Seats to Quiet" seat-counter trigger
  (`trig_01ANo9Qa8bcqgaxQtP9xBeFp`) has now failed 2 consecutive days, not just the 1 flagged
  2026-09-27.** Confirmed via `get_trigger`: `last_run.status: FAILED`, `fired_at:
  2026-09-28T06:33:44Z`, `finished_at: 2026-09-28T06:33:54Z` — another 8-second failure, same
  shape as yesterday's, `failure_reason` still unspecified. This CEO session has no Shopify
  connector attached (the trigger's own `mcp_connections` list includes Shopify, but that's scoped
  to its own session, not this one) so the actual GraphQL error inside `graphql_mutation` /
  `metafieldsSet` remains invisible from here — still cannot confirm live whether the public seat
  count on `shop.calmandoak.com` is stale. · confirmed (2nd independent daily instance, same
  trigger, same failure shape) · **candidate rule:** since this trigger gates a live, real-money
  promotion (free international flights) and has now failed 2 days running with no one positioned
  to see the actual error, it should be promoted to an explicit "always escalate with urgency"
  item in CONTROL.md rather than waiting for a 3rd occurrence to feel confirmed — a customer-facing
  financial mechanic silently drifting stale for days is a worse failure mode than most of what
  CONTROL.md's existing "always escalate" list already covers.

- 2026-09-28 · CEO (daily briefing #14) · **Resolved the `content-factory/2026-09-20` vs
  `content-factory/2026-09-27` ASIN-overlap conflict (both branches propose the same walnut-desk
  ASIN B08G46J76G) as a CEO release decision rather than leaving it open a 4th time: release
  `content-factory/2026-09-27` in full when Blotato media access is available; treat
  `content-factory/2026-09-20` as superseded, do not schedule its duplicate piece.** Did not delete
  or close the older branch (it may still hold content Cameron wants a second look at) — only
  resolved the scheduling conflict itself, since letting it sit unanswered a 4th consecutive
  briefing was actively blocking a clean, SAFEGUARDS-passed batch from shipping once network access
  allows it. Also reconfirmed the `database.blotato.io` egress block directly this run (`curl`
  CONNECT attempt failed outright — connection reset, not the earlier "403 policy denial" shape,
  but same practical effect: no cloud-session path to schedule). · confirmed (egress block, 5th+
  reconfirming instance) / raw (the release-conflict resolution itself, novel) · **candidate rule:**
  a batch flagged with an ASIN/content overlap against another open branch should get the CEO's
  explicit release-priority decision the same briefing it's found, not deferred as "not this run's
  call" — the specialist run that finds the overlap is right that it shouldn't unilaterally close
  another run's branch, but the CEO reviewing both for release absolutely can and should decide
  which one ships, the same day, rather than adding a 2nd/3rd/4th "still needs Cameron" note to a
  question the review-gate role already has standing authority to answer.

- 2026-09-27 · CONTENT-FACTORY (weekly cloud run) · **Two independent, still-open content-factory
  branches (`content-factory/2026-09-20` and this run's `content-factory/2026-09-27`) turned out to
  propose the exact same ASIN (B08G46J76G, IOTXY walnut writing desk) as a piece in each batch —
  found only by chance, because this run happened to read the 09-20 branch's manifest while
  cross-checking a different question, not because anything flagged the overlap automatically.**
  Confirmed via `git show origin/content-factory/2026-09-20:"final pins/batches/2026-09-20/MANIFEST.md"`
  — its piece #6 lists the identical ASIN this run independently sourced from the same live journal
  article (`journal/best-japandi-desks/index.html`), since both runs reused the site's own
  already-verified image↔ASIN pairing rather than inventing one, and neither run had visibility
  into the other's still-open branch. Flagged in both branches' manifests/TEAM-LOG rather than
  resolved (closing another run's open branch is outside a single content-factory run's authority).
  · raw · **candidate rule:** a content-factory run should check open `content-factory/*` branches
  (not just the live Blotato queue) for ASIN overlap before finalizing a batch — the current
  process only cross-checks against what's already scheduled/published, not against what a
  different unmerged branch is also proposing. Also surfaces the cost of the standing "confirm safe
  to close" recommendation (first made 2026-09-25) sitting unanswered for a week: a stale open
  branch isn't just clutter, it can silently collide with a new run's independent work.

- 2026-09-27 · CONTENT-FACTORY (weekly cloud run) · **This session's fresh clone had an empty
  `node_modules/` despite `ffmpeg-static` being a listed `package.json` dependency — `_pin-to-reel.js`
  and `_add-audio-bed.js` would have failed on first run with `Cannot find module 'ffmpeg-static'`
  had it not been caught before use.** `npm install ffmpeg-static --no-save` resolved it cleanly in
  ~15s, no egress issue for the npm registry itself (a genuinely different host/policy than the
  `database.blotato.io`/`www.amazon.com` blocks logged 2026-09-14/15). Separately: the tracked
  fallback product photos (`assets/img/products-cropped/*`) are 4:5 (800×1000), not the 2:3
  (1000×1500) pin canvas `_pin-to-reel.js` assumes as input — feeding one straight in would stretch
  and visibly distort the product. Built an ad hoc ffmpeg blur-fill+contain step this run to produce
  a proper 2:3 pin first (see `final pins/batches/2026-09-27/manifest.md` for the exact filter). ·
  raw · **candidate rule:** (1) a content-factory run should treat "does `node_modules` actually
  have the pipeline's dependencies" as its own pre-flight check, same tier as syntax-checking the
  `_*.js` scripts themselves (2026-09-14 ledger entry) — a clean fresh clone has neither installed
  by default. (2) the 4:5-vs-2:3 mismatch should be fixed once as a real `_asin-to-pin.js` helper
  committed to the repo, rather than every cloud run (this is at least the second, after 09-14's
  "built from tracked assets" batch) re-deriving the same fix inline.

- 2026-09-27 · CEO (daily briefing #13) · **The daily Pinterest scheduler's repeated undocumented disable/enable history (flagged raw on 2026-09-14, -16, -25/26) now has a machine-readable root cause instead of no explanation at all: it auto-suspends with `suspension_reason: "device_absent"` whenever a required local device connection isn't present, and re-enables on its own once reconnected — it is not being manually toggled in the dark.** Confirmed via `get_trigger` on `trig_0144Cg9HoKeXhET21YLSDVbk`: `enabled: false`, `suspension_reason: "device_absent"`, `updated_at: 2026-09-27T06:15:30Z` (disabled again this morning, after its last successful run 2026-09-26T09:37–09:47 UTC) — this is the first time a disable event on this trigger has carried an actual reason field, not just a silent state change. This reframes every prior "who disabled this and why didn't they log it" instance as very likely the same automatic cause each time (a local device/vault connection dropping), not a person forgetting to leave a note. Practical effect unchanged: Pinterest's queue (healthy, scheduled through 2026-10-29 as of this run) will stop growing until the device reconnects. · raw · **candidate rule:** once Cameron confirms this reading, promote it into `ORG-CHART.md`'s Pinterest-scheduler entry as documented, expected behavior ("auto-suspends when the linked device disconnects, self-resumes when it reconnects — not a bug, not an undocumented human action") so future execution-integrity checks stop re-flagging each occurrence as a fresh mystery and instead just report current state + whether the device is back.

- 2026-09-27 · CEO (daily briefing #13) · **A previously undocumented recurring trigger, "Two Seats to Quiet — seat counter (hourly)" (`trig_01ANo9Qa8bcqgaxQtP9xBeFp`, fires hourly at :32, updates Shopify metafields for the live "Two Seats to Quiet" sweepstakes' public seat counter on `shop.calmandoak.com`), exists with zero TEAM-LOG/ORG-CHART trace — same undocumented-automation pattern as the three "Calm oak..." triggers found 2026-09-26 — and its most recent run failed.** Confirmed via `list_triggers`/`get_trigger`: `enabled: true`, `last_run.status: FAILED`, `fired_at: 2026-09-27T06:32:41Z`, `finished_at: 2026-09-27T06:32:49Z` (an 8-second failure, not a timeout). Because this trigger's entire job is keeping a number publicly visible on a live, real-money promotion — itself already an unresolved CONTROL.md "always escalate" item per the 2026-09-25 briefing — a failed run plausibly means the seat count shown to real visitors is now stale or wrong, not just an internal metrics gap; not independently verified live from this sandbox. · raw · **candidate rule:** same as the 2026-09-26 finding — any trigger touching customer-facing state should get a TEAM-LOG line when it's created, and a failed run on anything customer-facing warrants same-day flagging rather than waiting to be noticed in the next scheduled review.

- 2026-09-26 · CEO (daily briefing #12) · **Three brand-new recurring cloud triggers appeared overnight with zero TEAM-LOG/ledger/ORG-CHART trace, two of which structurally bypass the 2026-09-14 public-facing review gate by design, not by accident — because they deploy directly from Cameron's local machine to Cloudflare Workers and never touch this GitHub repo at all.** Confirmed via `list_triggers`: `Calm oak daily deploy` (`CRON_TZ=Europe/Paris 30 9 * * *`), `Calm oak weekly seo post` (`CRON_TZ=Europe/Paris 0 8 * * 1`), and `Calm oak weekly influencer outreach` (`CRON_TZ=Europe/Paris 0 8 * * 3`) were all created within the same ~10-second window, `2026-09-25T08:16:46–55Z` — squarely inside the same session that produced that day's "Resolve TikTok flag..." commit at 08:34 UTC and the ledger's own "Claude (Cameron session)" entry, so very likely Cameron's own doing, but nothing written anywhere says so or explains the intent. Read their stored prompts directly (`derived_state.prompt`): (1) **daily deploy** runs `npx wrangler deploy` against `C:\Users\CameronHayes\...\Desktop\Calm & Oak` via computer-use every morning, deploying whatever is sitting in that local folder straight to `calmandoak.com` — no git push, no PR, no CEO look-in, because the change need never reach GitHub `main` to go live; (2) **weekly seo post** is a full write-and-publish pipeline (its own step 5 is literally "deploy via `deploy-calmandoak.bat`... add the slug to Published-Journal-Index.md") that ships a brand-new journal article straight to production on a local run, with no PR step at all — a second, independent role now doing exactly what `calmoak-seo-ranker`'s cloud trigger does, but without the gate the cloud version dutifully follows; (3) **weekly influencer outreach** is lower-risk (drafts only, never sends) but is a real, live instance of the "Brand & Influencer Partnerships" function `ORG-CHART.md` still lists as **planned, not yet built** — the gap has quietly been filled without the org chart being told. Separately, in the same trigger list: the daily Pinterest scheduler (`trig_0144Cg9HoKeXhET21YLSDVbk`) — reliably firing since its 2026-09-16 re-enable — is now `enabled: false` again, sometime after its last successful run yesterday morning (2026-09-25T06:15 UTC), with no TEAM-LOG/ledger note, the same undocumented-toggle pattern the 2026-09-16 ledger entry already flagged once. Escalated directly via push notification since the daily-deploy trigger's first-ever scheduled fire (2026-09-26 ~07:34 UTC) landed inside this same run's review window. Did not disable, edit, or otherwise touch any of these triggers myself — I have no basis to judge intent, and toggling automation is outside what "review and release" gives me authority over. · raw · **candidate rule:** the public-facing review gate should say explicitly that it covers *any* mechanism that can put a change on `calmandoak.com` in production — not just "pushes to the `Cammyboy11/calmandoak` GitHub repo" — because a local Cloudflare Workers deploy trigger makes the entire PR-review model a no-op for whatever ships through it. Until Cameron says otherwise, the CEO's review-gate check should also include "list cloud triggers, read any whose prompt mentions deploy/publish/wrangler, flag anything that writes to production outside GitHub" as a standing sub-check — this instance was found only because a routine `list_triggers` call for the execution-integrity check happened to surface it, not because anything pointed here on purpose.

- 2026-09-25 · SEO-RANKER · **Correction to the same-day CEO ledger entry above: the FTC-disclosure drop from the 2026-09-24 redesign was NOT homepage-only — it hit every non-journal page sharing the new shared topbar/footer template.** Confirmed via `git show f3d46af` plus a sitewide grep for pages carrying an Amazon/Awin link with zero "Amazon Associate" text: 10 live pages had the gap (`index`, `about`, `contact`, `privacy`, `begin-here`, `the-edit`, `toolkit`, `partner`, `shop/looks/`, `shop/prints/`), not just `index.html`. Root cause the CEO entry didn't have time to find: the redesign's new template (`redesign.css`) doesn't load the old `styles.css` at all, so even restoring the old `<div class="disclosure">` markup verbatim would have rendered invisible — the `.disclosure` CSS class only exists in `styles.css`. Fixed this run (PR #5): restored the banner + footer line on all 10 pages, added the missing CSS rule to `redesign.css` itself. Journal articles were correctly unaffected, as the CEO entry found — they still run `styles.css`. Did not touch the sweepstakes pop-up or the broader review-gate-bypass question — that's outside SEO-ranker's remit and already escalated by the CEO directly to Cameron. · raw · **candidate rule:** when a design-system migration only partially replaces a site's CSS (new pages on a new stylesheet, old pages on the old one), a like-for-like "restore the removed markup" fix is not sufficient verification — check that the CSS class the markup depends on actually resolves under the *new* stylesheet before considering the fix complete, not just that the HTML looks right by inspection.

- 2026-09-25 · CEO (daily briefing #11) · **A full site redesign (~210 pages) plus a live "Two Seats to Quiet" sweepstakes pop-up (free international flights, "up to CAD 5,000," on every order over $50) shipped straight to `main` on 2026-09-24, with zero PR, zero TEAM-LOG entry, zero LESSONS-LEDGER entry — a direct bypass of the 2026-09-14 public-facing review gate, and the sweepstakes itself is a "spends money" item under CONTROL.md's "Always escalate" list that should never auto-ship.** Confirmed via `git log`: 11 commits from `Calm & Oak Ops <ops@calmandoak.com>` (co-authored `Claude Fable 5.1 <noreply@anthropic.com>`, session `01AjRB6YBz4AZqsgwH1uX7PB`) landed between 07:41 and 10:23 UTC on 09-24 — after that day's 07:13 UTC CEO briefing had already run, so no CEO run has reviewed it yet. The redesign commit message says it "merges the local redesign branch (`cleanup-2026-09`, deployed from the PC on 21 Sep but overwritten by the GitHub-triggered build)" — plausibly a real desktop/Cowork session, but nothing in any tracked doc (TEAM-LOG, ledger, `GROWTH-MANDATE-2026-09.md` — not present in this checkout) documents Cameron approving either the nav/shop-tab redesign or, especially, the sweepstakes mechanic (its own terms page lives off-repo at `shop.calmandoak.com/pages/two-seats-to-quiet-terms`, unverifiable from here). Secondary, smaller finding same commit: the homepage's top-of-page FTC disclosure banner ("As an Amazon Associate...") was dropped in the redesign — confirmed via `git show f3d46af -- index.html` — while the homepage footer still links the Amazon storefront affiliate link with no adjacent disclosure text. All 62/62 journal article pages (the actual money pages) were checked and correctly retain the banner — this is homepage-only. · raw · **candidate rule:** the public-facing review gate (CONTROL.md) should say explicitly that it applies to *every* push to `main` regardless of the identity/session making it (not just the four cloud-routine agent names) — "a real automation identity" (per the CEO brief's own execution-integrity check 1) is evidence work is happening, not evidence it was reviewed; those are different questions and this incident conflated them. Escalated directly to Cameron same-day via push notification rather than waiting — this is live on the production site right now.

- 2026-09-24 · CEO (daily briefing #10) · **A completely new, undocumented Instagram/TikTok content batch (10 posts each, a Japanese-folklore apparel line — Hokusai wave, koi, dragon, tiger, maneki-neko, kitsune, moon rabbit, cranes, "shop link in bio," own-product not Amazon affiliate) appeared in the live Blotato schedule between the 09-22 and 09-24 briefings, with zero TEAM-LOG or ledger trace of who built or scheduled it.** Confirmed via `blotato_list_posts` (scheduled, now→+45d): all 20 posts' `mediaUrls` are real, already-uploaded `database.blotato.io` links (not placeholders), so this was scheduled from a session with real network access to that host — not this cloud sandbox, which re-confirmed the same `connect_rejected` 403 block on a direct `curl` test this run. Content plausibly legitimate (`GROWTH-MANDATE-2026-09.md` item #2 explicitly names `calmoak-merchandiser` "building t-shirts" and Cameron wanting "more apparel"; item #4 names a near-complete separate Shopify store this could be hosted on) but unverifiable from here — no product page for any of these designs exists anywhere in the git-tracked site (checked: no match for "hokusai"/"kitsune"/"maneki-neko"/"tee"/"apparel"/"t-shirt"). Also a visible brand-voice departure: all 20 posts use heavy emoji (🌊🗻🐉🐯🦊🌙 etc.), while every other live IG/TikTok post sampled (pre-09-18) uses zero emoji, and CONTROL.md's brand-voice reference doesn't mention emoji explicitly but is generally terse/editorial. Practically, this batch is *why* the IG/TikTok posting cliff (9 consecutive prior daily ledger instances, 09-14 through 09-22) now has forward runway again as of today — but through a channel nobody described in advance. · raw · **candidate rule:** any session with `database.blotato.io` upload access (evidently not just the `meta_mcp` Pinterest trigger — this proves at least one more channel exists) should still write a TEAM-LOG line when it schedules content, the same as every documented agent is required to — "I have the access to publish" shouldn't imply "the paper trail requirement doesn't apply to me."

- 2026-09-24 · CEO (daily briefing #10) · **The CEO's own daily trigger — the routine whose entire job is catching silent gaps in the rest of the department before they compound — produced no briefing on 2026-09-23, going dark for a day itself.** Confirmed via `git log`: zero commits on any branch between 2026-09-22T08:16:16Z and this run's start (2026-09-24T07:07:14Z), and no `CEO-BRIEF/briefings/2026-09-23.md` file exists. `list_triggers` shows the CEO Daily Briefing trigger (`0 7 * * *`) enabled with only this run's own fire as its visible `last_run` — the tool doesn't retain a history of prior fires, so it's not possible from inside this routine to tell whether 09-23's scheduled fire never happened or fired and failed silently before writing anything (a fresh session is created per fire, and no session from 09-23 shows up in this account's session list either). This is the exact failure mode Standing Job #1 exists to catch in other roles — now observed in the CEO role itself, undetected until the next day's run noticed the gap by chance (checking git log range), not by any deliberate self-check. · raw · **candidate rule:** the CEO's own execution-integrity check (git activity, check 1) should explicitly include "did *my own* trigger fire yesterday, evidenced by a briefing file or commit dated exactly one day before this run" as a named sub-check, not just infer department health from commit recency generally — a missed day in the CEO's own cadence is currently invisible unless the next run's date-range math happens to surface it.

- 2026-09-22 · SEO-RANKER · **Two live, sitemap-indexed journal pages (`journal/japandi-desk/`, `journal/wabi-sabi-decor/`) had zero card or ItemList entry on `journal/index.html`, the site's own journal hub — fully unreachable via on-site navigation despite being real, published, correctly-in-sitemap articles.** Found while auditing the hub page before adding this run's new article. Root cause for at least one: `wabi-sabi-decor`'s 2026-07-06 TEAM-LOG entry claimed "added to sitemap.xml" but never mentioned `journal/index.html`, and no later run caught the gap because every audit checklist run since (2026-09-14, -15, -18) checked "sitemap vs disk," never "hub page vs disk" or "hub page vs sitemap." Separately, in the same file: the journal-filter category chip counts (`journal/index.html`, the "Room Guides 7" etc. badges) were stale — actual card count was 58 against a displayed "All 44," a gap of 14 that must have been accumulating silently for multiple runs, since the 2026-09-18 run only incremented the counts by 1 for its own addition rather than recomputing them. Both fixed this run (cards added, counts recomputed from an actual grep of the grid, not incremented by assumption). · raw · **candidate rule:** the standing on-page audit checklist (broken images, sitemap-vs-disk, duplicate titles, meta descriptions) should add two more checks: (1) every sitemap URL under `/journal/` has at least one inbound link from `journal/index.html` itself, not just "is it in the sitemap," and (2) any page with a manually-maintained count badge (the filter chips) gets that count recomputed from source on every run that touches the same file, not incremented by the delta of just that run's own change.

- 2026-09-22 · SEO-RANKER · **A prior ledger finding turns out to be a false positive: the 2026-09-19 CEO entry ("SEO-ranker's 2026-09-18 run ... never appended a summary line to TEAM-LOG.md") is contradicted by git history — commit `ff5241d` ("Log 2026-09-18 SEO-ranker run: new six-object-rule article + PR") added exactly that entry directly to `main`, committed 2026-09-18 08:16 UTC, a full 23 hours before the CEO's 2026-09-19 07:16 UTC briefing that flagged it as missing.** Confirmed via `git log --format="%H %ci"` on both commits and `git merge-base --is-ancestor ff5241d main` (true) — the entry was live on `main` well before the claim that it was absent. Likely cause: the CEO's grep that day checked only the six-object-rule PR branch's diff, or ran against a stale local fetch, rather than `origin/main` directly — ironically the same class of mistake the 2026-09-14 ledger entry about `CONTROL.md` already warned about ("diff against origin specifically, don't assume stable"). Not relitigating the underlying candidate rule from that entry (confirming a real TEAM-LOG-miss pattern is still worth watching for) — just flagging that this specific instance shouldn't count as one of its confirming data points. · raw · **candidate rule:** before logging or acting on "agent X didn't do Y," check the actual git history/origin state for evidence Y happened, not just a live grep at briefing time — a stale fetch or wrong-branch check produces a confident-looking false negative that then pollutes the ledger's "confirmed" count for an unrelated agent's work.

- 2026-09-22 · CEO (daily briefing #9) · **The Instagram/TikTok posting cliff has now produced a full 4 consecutive days of zero published output.** `blotato_list_posts(status=published, platform=[instagram,tiktok], since=2026-09-17)` shows the last published item on either platform is still 2026-09-18 ~15:00–15:01 UTC — nothing published 09-19, 09-20, 09-21, or 09-22. `blotato_list_posts(status=scheduled, platform=[pinterest,instagram,tiktok], now→2026-11-06)` returns 131 items, **100% Pinterest** (healthy, runway to 2026-10-18 = 26 days), **zero Instagram, zero TikTok** anywhere in the forward window. `blotato_list_accounts` confirms all three accounts are connected/active (not disconnected) — this is a content-supply gap, not an auth problem. The clean, SAFEGUARDS-passed `content-factory` batch from 2026-09-20 (branch `content-factory/2026-09-20`, `final pins/batches/2026-09-20/MANIFEST.md`, 10/10 pieces PASS, disclosure present on all 7 affiliate pieces) remains unscheduled because the CEO's own session hit the identical `database.blotato.io` CONNECT-tunnel 403 re-confirmed today via direct `curl` (`connect_rejected`) — so the CEO cannot itself close this gap by scheduling the batch even after a clean review, only by reviewing it. This is the 9th consecutive daily instance of the same root-cause chain (09-14 through 09-22). · confirmed (9th consecutive instance) · **candidate rule:** unchanged from 09-20/09-21 (match the working `meta_mcp`-provisioned Pinterest trigger's egress path, or stand up a real `publisher` backstop trigger) — both have now sat unbuilt for 8 days after first being flagged; recommend Cameron treat this as the top infra priority since the ledger/briefing loop alone hasn't been sufficient to get either built. **New idea worth testing deliberately (not tested this run — would risk a real post on a live account to validate):** `blotato_create_post`'s `mediaUrls` field only needs to be fetchable by Blotato's own backend, not by the posting session — so hosting a batch's media at any already-public URL (e.g. a noindexed path on the live site) and calling `blotato_create_post` directly might bypass the `database.blotato.io` presigned-upload step entirely, without needing that host reachable from the cloud sandbox at all. Flagging as a hypothesis for Cameron or an infra-capable session to test on a single low-stakes post before relying on it.

- 2026-09-22 · CEO (daily briefing #9) · **Two stale, unreviewed git artifacts found this run, neither touched by any agent in months:** (1) PR #1 (`cloudflare/workers-autoconfig`, opened by the `cloudflare-workers-and-pages` bot 2026-05-09, last updated 2026-06-24) has sat open ~4 months with no review — it's a hosting/deploy-config change, squarely "Always escalate" territory (DNS/hosting), so the CEO is not merging it, just surfacing it since nobody else will. (2) Branch `merchandiser/japandi-workspace-plan` (last commit 2026-07-06, predates the 2026-09-14 review-gate policy) was never opened as a PR and has no recent activity — likely an abandoned work-in-progress from before the gate existed, not a hidden pending deliverable. · raw · **candidate rule:** the execution-integrity check should include a periodic scan of `git branch -a`/open PRs for anything untouched >30 days, not just the branches a specific agent flagged this week — stale artifacts like these can sit invisible indefinitely otherwise.

- 2026-09-21 · CEO (daily briefing #8) · **The `database.blotato.io` upload-egress block first found 2026-09-14 is still present — re-confirmed this run via a direct `curl` CONNECT test (`CONNECT tunnel failed, response 403`; the proxy status endpoint logs it explicitly as `connect_rejected` / "gateway answered 403 to CONNECT (policy denial or upstream failure)") — but today, for the first time, `content-factory` delivered a fully SAFEGUARDS-passed, disclosure-compliant, git-visible 10-piece IG/TikTok batch (branch `content-factory/2026-09-20`, manifest at `final pins/batches/2026-09-20/MANIFEST.md`) with nothing wrong with it except this exact network block. Meanwhile, the daily Pinterest-scheduler trigger (`trig_0144Cg9HoKeXhET21YLSDVbk`, created 2026-09-05 via `meta_mcp`) demonstrably DOES upload new media to this same host successfully every morning — its own scheduled queue contains posts with real, future `database.blotato.io` media URLs dated as far out as 2026-10-18, and its `last_run` today (06:04 UTC) succeeded.** This is the first direct evidence that Blotato media uploads ARE possible from *some* Calm & Oak cloud routine — the block is not universal to "any cloud sandbox" as prior entries assumed; it looks specific to how the CEO/content-factory/seo-ranker triggers (all created 2026-09-14 via `http_api`) are provisioned versus the older Pinterest-scheduler trigger (`meta_mcp`). · confirmed (direct network test this session, cross-checked against another trigger's real successful uploads) · **candidate rule:** ask Cameron (or an infra-capable session) to diff the network/egress policy or MCP-connector config between the `meta_mcp`-created Pinterest trigger and the `http_api`-created CEO/content-factory/seo-ranker triggers — if the gap is just a provisioning mismatch, matching it could close the IG/TikTok posting cliff entirely without a new agent, backstop trigger, or handoff-location redesign, which would be far cheaper than the two standing candidates already on record.

- 2026-09-21 · CEO (daily briefing #8) · **`content-factory`'s 2026-09-20 TEAM-LOG entry (thorough, high-quality — see branch `content-factory/2026-09-20`) will never appear in `main`'s `TEAM-LOG.md` unless that branch is explicitly merged or the text is manually copied — confirmed via `git diff origin/main origin/content-factory/2026-09-20 -- TEAM-LOG.md`, which shows the entry exists only on the branch.** The review-gate design correctly keeps unreleased media/manifests off `main`, but nothing says the *log entry itself* (plain text, not public-facing) should stay gated too. Same visible symptom as the 2026-09-19 "SEO-ranker TEAM-LOG miss" finding, but structural here rather than an oversight — it will recur every week by design, not by accident, for as long as content-factory stages on a branch. · raw · **candidate rule:** content-factory (and any future branch-staged role) should push its TEAM-LOG/ledger entry straight to `main` as its own small commit even while the gated media/manifest stays on the branch — or the CEO's release-gate review should copy the entry over itself when processing the batch, since it already has to read the branch either way.

- 2026-09-20 · CEO (daily briefing #7) · **The Instagram/TikTok posting cliff — forecast since 2026-09-14, and reported as "landed" on 2026-09-18 based on an empty forward queue — is now confirmed as an actual multi-day zero-output gap, not just an empty queue: both platforms' last published post was 2026-09-18 (~15:00-15:01 UTC), nothing published on either platform on 09-19 or 09-20, and `blotato_list_posts` (status=scheduled, platform=[instagram,tiktok], now→+45d) returns zero items — no forward coverage at all.** Pinterest is unaffected and healthy in the same pull (141 scheduled, daily, through 2026-10-18 = 28 days runway). Root cause unchanged and still unaddressed: `content-factory`'s Sun 12:00 UTC cadence fires later today, but per the 2026-09-14 public-facing review gate it can only stage a batch to `final pins/batches/<date>/`, which is gitignored and absent on disk in this cloud checkout (re-confirmed this run) — so even a successful content-factory run today cannot itself close the gap; it needs a session with real filesystem + Blotato-upload access to actually schedule the staged batch. Confirmed via `list_triggers` that only 4 real Calm & Oak cloud triggers exist at all (SEO Ranker, Content Factory, CEO Daily Briefing, daily Pinterest scheduler) — no `publisher` backstop trigger, no IG/TikTok-specific pusher, unchanged since first flagged 2026-09-14. This is the 7th consecutive daily instance of the same root-cause chain (09-14 through 09-20) and the first with confirmed landed multi-day zero-output, not a forecast — 2 full days of zero IG/TikTok posts and counting, with no structural fix in motion. · confirmed (7th consecutive instance; first with actual multi-day zero-output evidence, not forecast) · **candidate rule:** unchanged from the 09-17/09-18 entries (a git-tracked staged-batch handoff location the cloud CEO can read and release, or a real `publisher` backstop trigger) — both have now sat unbuilt for 6 days after first being flagged while the predicted failure has become an actual, ongoing one; escalating directly to Cameron in today's briefing rather than waiting for the 2026-10-14 monthly pass, since the ledger/briefing loop alone hasn't been sufficient to get either built.

- 2026-09-19 · CEO (daily briefing #6) · **The FTC-disclosure gap first found 2026-09-14 (~20/145 sampled) and re-confirmed 2026-09-15 through 2026-09-18 (60/155, zero with disclosure) is now confirmed against the entire live-forward queue, not a sample: a full pull of Pinterest's 146 scheduled posts (2026-09-19 → 2026-10-18) found 57 with monetized/"shop the X look" copy and zero carrying the disclosure sentence or `#affiliate` hashtag that `PLAYBOOK-AUDIT-CORRECTIONS.md` (lines 79, 104-112) documents as mandatory and "not buried."** This is the 6th consecutive independent same-cause finding (2026-09-14, -15, -16, -17, -18, -19) and now covers 100% of the checked queue, not a sample — the bar for `confirmed` was already met on 09-16/09-17; this entry adds full-queue coverage as further evidence. No agent with content-editing authority has run since 2026-09-14 (`content-factory`'s next fire is 2026-09-20; no `monetization`/`cro` trigger exists at all) so nothing has been positioned to fix it. · confirmed (6th independent instance, now at full-queue coverage) · **candidate rule:** ready for the next monthly consolidation pass (due ~2026-10-14) to promote a hard requirement into `SAFEGUARDS.md` itself (currently the disclosure rule lives only in `PLAYBOOK-AUDIT-CORRECTIONS.md`, a one-off audit doc, not the actual QA-gate checklist agents are told to run) — until then this is a live, ongoing compliance exposure on real scheduled posts, not just a documentation gap.

- 2026-09-19 · CEO (daily briefing #6) · **`calmoak-seo-ranker`'s 2026-09-18 run (PR #3, the six-object-rule article) followed the SAFEGUARDS gate and the LESSONS-LEDGER schema correctly (logged its own ASIN-overlap finding there) but never appended a summary line to `TEAM-LOG.md`, unlike its 2026-09-15 run which did both.** Confirmed by grepping `TEAM-LOG.md` for "2026-09-18" and "six-object" — no match. Not itself a quality problem (the PR content passed independent review this run) but breaks the shared-channel contract other agents/the CEO rely on for "what happened today" without cross-checking git/GitHub directly. · raw · **candidate rule:** the SEO-ranker's own trigger prompt already instructs "Append a summary line to TEAM-LOG.md" — worth confirming next run whether this was a one-off miss or a repeatable gap before promoting anything.

- 2026-09-18 · SEO-RANKER · **GROWTH-PLAN-90-DAY.md Tier-2 #7 ("How to Set Up a Japandi Desk — the 6-object rule") turned out to have near-total product overlap with content that already exists: `journal/best-japandi-desk-accessories/index.html`'s "The six accessories" section (added before this run) already features the identical six ASINs (leather desk pad, bamboo monitor stand, brass task lamp, stoneware planter, seagrass basket, cable tray) framed as a buying guide. Writing the plan's item #7 honestly meant either reusing the same six products under a different (styling-rule) lens, or inventing a different product set with no basis.** Chose to write it as the rule/psychology/audit companion piece — genuinely new content (why six not zero or twenty, a 5-minute desk audit, ways the rule breaks) — and added mutual cross-links so the two pages read as companions, not accidental duplicates. This is the second time a GROWTH-PLAN/CONTENT-ROADMAP line item was ambiguous against already-published content on a fresh read (same root cause as the 2026-09-14 SEO-RANKER ledger entry about the roadmap vs growth-plan priority conflict) — confirmed by reading `journal/best-japandi-desk-accessories/index.html` directly before writing, not assumed. · raw · **candidate rule:** before writing any GROWTH-PLAN/CONTENT-ROADMAP line item, grep the existing journal articles for the same product ASINs/section headings the new piece would use, not just for a same-slug page — a "new" line item can already be functionally covered by a different-shaped existing article.

- 2026-09-18 · CEO (daily briefing #5) · **The Instagram/TikTok posting cliff flagged for five straight days (09-14 through 09-18) has now fully landed: `blotato_list_posts` shows only 2 scheduled posts remaining on each platform, both dated today (2026-09-18, 12:00 and 15:00 UTC) — zero scheduled on either platform from 2026-09-19 onward, confirmed against the complete forward window (2026-09-18 → 2026-11-01, 155 total items, no pagination cursor).** Pinterest remains healthy in the same pull (151 scheduled, daily, through 2026-10-18). No specialist-agent action closed the gap between yesterday's briefing and today's — `content-factory`'s next fire is still 2026-09-20, two days after the platforms go dark, and it can still only stage to the gitignored `final pins/batches/` this cloud checkout cannot read (re-confirmed this run: `git check-ignore` matches, directory absent from disk). This is the 5th independent instance of the same root cause, now with the concrete outcome instead of a forecast — the org's actual Instagram/TikTok output goes to zero starting tomorrow unless a desktop/Cowork session intervenes today. · confirmed (5 independent same-cause instances, now with the landed outcome as evidence, not a projection) · **candidate rule:** same two standing candidates (a git-tracked staged-batch handoff location the cloud CEO can read; a `publisher` trigger to backstop empty slots) — flagging that both have now sat unactioned long enough for the predicted failure to actually occur, which is itself evidence the "raw → confirmed" bar has been met and these are ready for the next monthly consolidation pass (ledger created 2026-09-14; next pass due ~2026-10-14) to promote into `ORG-CHART.md`/a real trigger rather than staying candidates.

- 2026-09-17 · CEO (daily briefing #4) · **The Instagram/TikTok scheduled-post cliff flagged for four straight days (09-14 through 09-17) has now reached its actual boundary: both platforms' last scheduled post is 2026-09-18, one day from this run, and the fix that would close it structurally cannot land in time.** `content-factory`'s next trigger fire is 2026-09-20 (Sun) — two days after the gap opens on 09-19 — and even that run only stages a batch to a gitignored, local-only `final pins/batches/` directory a cloud-run CEO cannot see (per the 2026-09-15 ledger entry), so there is no confirmed path to close this gap without a desktop/Cowork session acting before 09-19. This is the same root cause as the 2026-09-14 CONTENT-FACTORY finding and the two CEO instances since, now sharpened from "n days of runway, shrinking" to "the gap is now a certainty absent manual intervention." · confirmed (4th independent instance of the same pattern, now with a concrete failure date) · **candidate rule:** the same one already on record (a git-tracked staged-batch handoff the cloud CEO can actually reach) plus a new one: a role with no recurring trigger at all (`publisher`, the documented daily backstop meant to fill empty posting slots) is the actual gap — `content-factory` alone, on a weekly cadence, structurally cannot keep a 5-post/day/platform ceiling full across 2 platforms with zero backstop.

- 2026-09-16 · CEO (daily briefing #3) · **The "daily Pinterest scheduler" trigger — disabled since 2026-09-11 and flagged unexplained in both the 2026-09-14 and 2026-09-15 briefings — is now back `enabled: true` and fired successfully this morning (2026-09-16T06:04–06:07 UTC), with no `TEAM-LOG.md` or `ORG-CHART.md` entry explaining the re-enable, same as the original disable.** · Confirmed via `list_triggers`: `enabled: true`, `last_run.status: ROUTINE_RUN_STATUS_SUCCEEDED`, `fired_at: 2026-09-16T06:04:45Z`. This is the mirror image of the 2026-09-14 ledger entry ("any session that disables... a recurring trigger should log the change") — the same gap now shown to apply to re-enabling too. 2nd independent instance of the pattern (disable undocumented, now enable also undocumented) — candidate for confirmation next monthly pass, alongside the original entry. · raw · **candidate rule:** extend the existing candidate rule to cover both directions explicitly — "any session that changes a recurring trigger's enabled state, either way, logs it in the same session."

- 2026-09-15 · SEO-RANKER · **`www.amazon.com` is blocked by this cloud sandbox's network egress policy — confirmed via a direct `WebFetch` call, which returned `EGRESS_BLOCKED` rather than a timeout or a scrape-defense response.** This means a cloud-run SEO-ranker/content instance cannot independently verify a *new* ASIN's star rating, review count, stock status, or "Frequently Returned" badge (SAFEGUARDS.md Check 3) — it can only safely write new shopping-guide content by reusing ASINs already verified and live in another SAFEGUARDS-passed article (as 2026-07-06's wabi-sabi-decor run did), never by sourcing a genuinely new product. Same root cause as the 2026-09-14 CONTENT-FACTORY finding that `database.blotato.io` is egress-blocked from this sandbox — a second, independent host confirming the pattern is "this cloud sandbox cannot reach commerce/media third-party hosts at all," not a one-off. Concretely blocked this run: `GROWTH-PLAN-90-DAY.md` Tier-1 #3 ("Japandi Executive Desk") needs new 55–60"-wide statement-desk ASINs distinct from every desk ASIN already live on the site (all ≤47" writing desks) — could not be written honestly without either fabricating verification or shipping an unverified ASIN, so it was skipped this run rather than risk a SAFEGUARDS violation. · raw · **candidate rule:** SAFEGUARDS.md and/or the SEO-ranker's own spec should state explicitly that a cloud-run instance can only ship new affiliate content by reusing already-verified ASINs/images from live articles, never by sourcing new ones — so the next run doesn't have to rediscover the egress block before reaching the same conclusion.

- 2026-09-15 · CEO (daily briefing #2) · **The 2026-09-14 "public-facing review gate" policy requires the CEO to review staged social-content manifests at `final pins/batches/<id>/` before scheduling them — but that directory is gitignored and local-only (confirmed: `git check-ignore` matches `final pins/`, and `find /` for the literal directory name found nothing on disk in this cloud checkout). A cloud-run CEO can never see a batch a cloud-run content-factory staged there (e.g. yesterday's `2026-38-ig-tiktok` batch), so half of Standing Job #2 is structurally unfulfillable from this routine, not just occasionally blocked.** · Same underlying fact as the 2026-09-14 CONTENT-FACTORY entry (gitignored local-only inventory) but a distinct, newly-observed consequence: it doesn't just starve content-factory of pin inventory, it also blocks the CEO's own review-gate duty for anything content-factory stages while running in the cloud. 2nd/3rd independent instance of the same root cause — candidate for confirmation at the next monthly pass. · raw · **candidate rule:** either (a) content-factory's staged-batch manifests need a git-tracked (non-gitignored) location or summary the CEO can actually read from a cloud checkout, or (b) the review-gate policy should say explicitly that cloud-run CEO reviews cover site PRs only, and staged social batches can only be released from a desktop/Cowork session with real filesystem access — leaving it unstated is what let this gap go unnoticed for a full day.

- 2026-09-14 · CONTENT-FACTORY (cloud run) · **`_add-audio-bed.js` at repo HEAD was truncated mid-statement (`Unexpected end of input`) — the exact script this pipeline depends on to prevent the known "silent Reel" failure mode was itself non-functional for anyone who ran it.** · Reproduced the crash directly (`node _add-audio-bed.js ...` → SyntaxError), confirmed via `git show HEAD:_add-audio-bed.js` that the truncation is committed, not a local artifact. · raw · **candidate rule:** any agent that runs a `_*.js` pipeline script for the first time in a session should smoke-test it (or at least syntax-check with `node --check`) before relying on its "always run this" instruction — a script referenced in an agent spec is not evidence it currently parses.

- 2026-09-14 · CONTENT-FACTORY (cloud run) · **A cloud/remote session of this agent starts with zero pin inventory and zero copy-library reference — `final pins/`, `01-brand-assets/` through `05-products-by-day/`, and `Pin Copy Library*.md` are all gitignored (local-only on Cameron's desktop), and no `VALIDATED-ASINS*.md` file was ever actually committed to git despite being referenced as the source of truth.** · Confirmed via `.gitignore` contents + directory listing (all six paths MISSING in this checkout) + `find`/`git check-ignore` for the ASIN file (not found, not ignored — never committed). · raw · **candidate rule:** AUTOMATION-MASTER-PLAN's "350-pin runway" and "Pin Copy Library format" assumptions only hold on Cameron's desktop session; a cloud-run content-factory instance must fall back to tracked `assets/img/*` site assets and reconstruct copy voice from CONTROL.md + live already-published copy, and should say so explicitly rather than silently reporting a shortfall as if inventory merely ran low.

- 2026-09-14 · CONTENT-FACTORY (cloud run) · **Outbound HTTPS from this cloud sandbox to `database.blotato.io` (Blotato's own presigned-upload storage host) is denied by organization egress policy, so the standard local-file media pipeline (presigned URL → curl PUT → create_post) cannot function from a cloud session at all — only from a session on Cameron's own network (desktop Cowork).** · Confirmed via the agent-proxy status endpoint: `connect_rejected`, gateway 403, explicitly logged as a policy denial, repeated identically across all 12 upload attempts. · raw · **candidate rule:** the weekly factory's spec should note this constraint explicitly so a future cloud run doesn't waste a cycle re-discovering it — cloud runs can build/QA/stage full batches but cannot publish; only a desktop-session run (or a future allowlisted host) can complete the schedule step.

- 2026-09-14 · CONTENT-FACTORY (cloud run) · **~20 sampled already-scheduled posts (of 145 queued through 2026-09-30, built by an earlier/different run) are missing the FTC disclosure sentence and `#affiliate` hashtag on monetized Amazon/Awin posts — e.g. a 2026-09-14T18:05Z Pinterest post ends "Shop the linen curtain look." with zero disclosure.** · Sampled via `blotato_list_schedules` across two full pages (~40 items reviewed, ~20 monetized), zero carried the disclosure sentence. · raw · **candidate rule:** this looks systemic to whatever run built that batch, not a one-off — worth a targeted audit of all 145 queued items' disclosure compliance before they go live, since SAFEGUARDS.md/PLAYBOOK-AUDIT-CORRECTIONS.md treat disclosure as non-negotiable and this run found it absent at scale.
- 2026-09-14 · SEO-RANKER · **CONTENT-ROADMAP.md's stated priority order (furniture > textiles > storage > kitchen > lighting > bedroom > outdoor > ceramics > office > decor) conflicts with GROWTH-PLAN-90-DAY.md's explicit "office cluster is the #1 priority" framing (backed by real GSC position-12 data), and the office-cluster articles it names as "write first" already existed per a 2026-06-23 TEAM-LOG entry — neither doc was updated to reflect completion, so "what's next" was undecidable from the docs alone on a fresh unattended run.** Confirmed by reading both docs plus `ls journal/` (best-japandi-desks, best-japandi-office-chairs, best-japandi-desk-accessories, japandi-desk, 400-dollar-home-office all present) and TEAM-LOG's 2026-06-23 outreach entries showing the office cluster was already identified/written. · raw · **candidate rule:** CONTENT-ROADMAP.md and GROWTH-PLAN-90-DAY.md should either be merged into one prioritized backlog or cross-reference each other, and completed items should be checked off / struck through in-place so an unattended run doesn't have to re-derive "is this already done" from TEAM-LOG archaeology before it can safely write new content.

- 2026-09-14 · CEO (daily briefing #1) · **A RemoteTrigger's `last_run.fired_at` not matching its own cron schedule is ambiguous, not automatically "fake" — it can be a genuine on-demand run (confirmed: SEO Ranker's off-cadence fire today shipped a real commit `c0370ba` + a full TEAM-LOG entry) or a no-op registration event (Content Factory fired at the same time with zero resulting commit or TEAM-LOG entry, cadence not due until 09-20).** All three new triggers (SEO Ranker Tue/Fri 08:05 UTC, Content Factory Sun 12:00 UTC, CEO Daily Briefing daily 07:00 UTC) show `fired_at` ≈16:21 UTC on 2026-09-14, a Monday, matching none of their cron patterns; only SEO Ranker's produced verifiable output. · raw · **candidate rule:** an execution-integrity check must never infer "did real work" from `fired_at` alone in either direction — always confirm against TEAM-LOG/git for that specific date before crediting or dismissing a trigger's fire.

- 2026-09-14 · CEO (daily briefing #1) · **The "daily Pinterest scheduler" RemoteTrigger — the one routine the 2026-09-10 audit confirmed was actually firing — is now disabled, with no `TEAM-LOG.md` or `ORG-CHART.md` note explaining why.** · `list_triggers` shows it `enabled: false`, last successful run 2026-09-11; `ORG-CHART.md` (still dated 2026-09-10) lists it as the one real recurring routine, unchanged. · **confirmed — answered same day:** Cameron disabled it directly (told Claude 2026-09-14) after it kept publishing stale pins. Not a mystery, just undocumented — logged here and in the vault's `Logs & History/COWORK-2026-09-14` note so the next run doesn't re-flag it. · **candidate rule:** any session that disables or materially changes a recurring trigger should log the change (TEAM-LOG or ORG-CHART) in the same session, so the next execution-integrity check doesn't have to discover it cold.
- 2026-09-25 · Claude (Cameron session) · **Two items the 2026-09-24 briefing flagged as unexplained are now confirmed directly by Cameron, and TikTok's 11-day-open decision is resolved.** (1) The 2026-09-24 Japanese-folklore apparel batch (20 IG/TikTok posts, no TEAM-LOG trace) was Cameron's own work — legitimate, not a rogue channel. (2) `shop.calmandoak.com` (the 2026-09-24 "September redesign" commits) is the Shopify storefront going live, confirmed headless/checkout-only architecture (calmandoak.com stays the real site; Shopify is cart/checkout only) — resolves the architecture-conflict flagged in `GROWTH-MANDATE-2026-09.md`'s Shopify item. (3) `CONTROL.md`'s TikTok flag set to `active` per Cameron's confirmation + the existing posting evidence. · confirmed · **promoted:** CONTROL.md updated (TikTok → active); this entry closes the loop so no future run re-flags either the apparel batch or the redesign as unexplained.
- 2026-09-14 · CEO (build session) · **Root cause found for the standing "TikTok PAUSED vs actively posting" contradiction (first flagged 2026-09-10): CONTROL.md's entire "Platform pauses" section — including the TIKTOK flag — was silently dropped from `main` by an unrelated commit (`b7c4a572`, 2026-08-10, "Deep-link room pages to Amazon Idea Lists") and never restored.** Every cloud routine clones `main`, not the local checkout, so they've seen zero pause flag for over a month while the local copy still read `TIKTOK: PAUSED`. Confirmed via `git show origin/main:CONTROL.md` (section absent) vs local file (section present) + `git log -- CONTROL.md` (no commit between 08-10 and today explains the gap, meaning it was collateral damage in an unrelated bulk commit). · confirmed · **promoted:** restored the section to CONTROL.md with an honest note instead of the stale July verdict, flagged as a real Cameron decision (active vs paused), not silently re-imposed either way. Candidate broader rule: any file that gates agent behavior (CONTROL.md, SAFEGUARDS.md) should get its content diffed against `origin/main` specifically during execution-integrity checks, not assumed stable just because the local copy looks right.

- 2026-09-14 · CEO (functional-map review) · **Blotato's real scheduled-post queue is asymmetric by platform: Pinterest has runway to 2026-10-04 (98 posts) but Instagram and TikTok both run out on 2026-09-18 (20 posts each) — 4 days out at time of writing.** · Verified via `blotato_list_posts` (status scheduled, now→+45d): pinterest earliest 2026-09-14 latest 2026-10-04 n=98; tiktok earliest 2026-09-14 latest 2026-09-18 n=20; instagram earliest 2026-09-14 latest 2026-09-18 n=20. Root cause per the vault's own log (`Calm & Oak HQ/07 Operations/Logs & History/TEAM-LOG.md`, 2026-09-05/09-08 entries): the only real automated pusher (scheduled task `trig_0144Cg9HoKeXhET21YLSDVbk`, daily Pinterest scheduler) is Pinterest-only; 12 weeks of Pin Queue content already exist in the vault (`06 Content/Pin Queue/`) as DRAFT/unapproved but nothing refills IG/TikTok automatically. · raw · —

- 2026-09-14 · CEO (functional-map review) · **`_awin-merchants.json` (the file `_awin.js` reads to build tracked AWIN links) still shows all three original merchants (`etsy`/`quince`/`jennikayne`) empty, even though AWIN is actually wired and earning for two different merchants (Joydeco `awinmid=119863`, monvane `awinmid=127859`) — those real tracked `awin1.com/cread.php?awinmid=...&awinaffid=2895187` links were hand-built directly into `Calm & Oak HQ/06 Content/Pin Queue/_Blotato-Push-Plan.md` instead of through the merchant-config file the automation script expects.** · Confirmed by reading `_awin-merchants.json` directly (all three merchants `""`) alongside the correctly-formed live AWIN deeplinks in the Sept pin-queue docs. This is the 2nd independent instance of the same misleading signal: the 2026-07-06 MONETIZATION team-log entry used this same file's emptiness to conclude "Amazon→Awin is impossible" — a conclusion that is now stale/wrong for at least 2 of 3 merchants. · raw (2nd instance — candidate for confirmation at next monthly pass) · —

- 2026-09-14 · CEO (build session) · **The published README/ORG-CHART cited a YouTube strategy in the vault, but a first vault-only search found nothing — the docs actually live in the repo root, not the vault.** · Confirmed on a second, wider search: `YOUTUBE-STRATEGY-2026.md`, `YOUTUBE-CONTENT-SYSTEM-SOP.md`, `YOUTUBE-CALENDAR-Q4-2026.md` all exist at the repo root. · raw · **candidate rule:** any "does X exist" check must search the repo root AND the vault, not just the vault — a vault-only search produces false negatives for anything Cowork sessions wrote directly to the repo.

- 2026-09-10 · CEO (build session) · **A stale `.git/index.lock` (dated 2026-09-09, no process holding it) silently blocked every local commit in the repo for at least a day.** · Found via `ls -la .git/index.lock` + `tasklist | grep git` (no process running) before clearing it. · confirmed (this is a known git failure mode, not speculative) · **candidate rule:** any agent whose commit fails should check for and report a stale lock before assuming a different cause, and the CEO's execution-integrity check should include "was a lock ever the blocker" as a diagnostic step, not just "did commits happen."

- 2026-09-10 · CEO (build session) · **`main` (local) and `cleanup-2026-09` (checked-out branch) looked diverged from a first read, but local `main` turned out to be a stale ancestor — the real divergence was `cleanup-2026-09` vs `origin/main` (the remote).** · Confirmed via `git merge-base` + `git diff --stat` against the actual remote ref, not the local branch name. · confirmed · **candidate rule:** branch-divergence checks must diff against `origin/<branch>` after a fresh `git fetch`, never a local branch ref alone — local refs go stale silently.

- 2026-09-10 · CEO (build session) · **`CONTROL.md` said `TIKTOK: PAUSED` while Blotato showed TikTok actively publishing 3–5 posts/day, live, with 36 more scheduled.** · Cross-checked CONTROL.md's flag directly against `blotato_list_posts` real data, same run. · confirmed · **candidate rule:** promoted — this is now Standing Job #1, check 3 in `CEO-OPERATING-BRIEF.md` ("CONTROL.md consistency"), run every time, not just discovered once.

- 2026-09-10 · CEO (build session) · **Gemini image-generation credits are exhausted (`429 RESOURCE_EXHAUSTED`, per `OWN-BRAND-PLAN-2026-09.md`), so the "Gemini editorial mockup" function is fully specced and skill-documented but not actually running.** · Cited directly from the vault's own dated note. · confirmed · **candidate rule:** "a skill exists and is documented" is not evidence "it's running" — the execution-integrity check should extend to per-capability fuel/quota checks (billing, credits, API keys), not just trigger/commit evidence, wherever a vault note already documents a known blocker.

- 2026-09-10 · CEO (build session) · **`daily-digest` is referenced everywhere (README, ORG-CHART, TEAM-LOG entries) as if it's a full agent, but no persona file exists for it at `~/.claude/agents/` — only a scheduled-task skill stub.** · Confirmed by directly listing `~/.claude/agents/*.md` and finding no `calmoak-daily-digest.md`. · confirmed · **candidate rule:** a role being named in docs is not evidence it was actually built — verify by listing the actual agent-file directory, every time a roster is audited.

*(Ledger starts here — these six are backfilled from the 2026-09-10/14 build session because they're real, already-confirmed findings, not hypothetical seed data. Going forward, new entries land at the top as they happen.)*
