# Calm & Oak — Control Surface

Global controls for the autonomous marketing department. **Every agent reads this before acting.**

## PAUSE: false

When `PAUSE: true`, every agent halts ALL publishing, committing, and sending immediately,
posts a one-line "paused" note to `TEAM-LOG.md`, and takes no other action until it reads `false` again.
To stop the whole department, change the line above to `PAUSE: true` and save. That's the kill switch.

## Brand-voice reference (drift guard)
Warm, grounded, unhurried, sensory, editorial. Short declarative sentences, the occasional em-dash,
concrete specifics over adjectives. Never hype, exclamation marks, "must-have", or AI throat-clearing
("In today's world…"). The daily digest flags any auto-published content that drifts from this.

## Rate ceilings (never exceed without Cameron)
- **Social:** max 5 posts/day/platform.
- **Email:** max 1 newsletter per 1–2 week cycle.
- **Outreach:** max 3 pitches/week.
- **Site:** new articles ship through the SAFEGUARDS gate only; never blanket `git add -A`.

## Platform pauses (skip these platforms until Cameron flips the flag)
- **TIKTOK: active (resolved 2026-09-25).** Was unresolved for 11 days after this whole section
  got silently dropped from `main` by an unrelated commit (`b7c4a572`, 2026-08-10) — see
  `CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-09-14/24 entries for the full history. Cameron confirmed
  2026-09-25 ("I think is active but I am not sure") — treated as a real decision, not a shrug:
  TikTok has in fact been posting successfully and continuously since the 2026-09-05 strategy
  (`TIKTOK-STRATEGY-2026.md`) replaced the original 2026-07-18 zero-views verdict, so `active`
  matches both his lean and the actual evidence. Reversible any time by flipping this to `PAUSED`.
- **PINTEREST: active** (primary revenue lever — protect the cadence)
- **INSTAGRAM: active**

## Always escalate (never auto-do)
DNS / redirects / hosting, account or provider settings, anything that spends money, anything destructive.

**Standing rule (added 2026-09-29 out-of-cycle, see `CEO-BRIEF/LESSONS-LEDGER.md`):** a failed run
on any trigger that maintains customer-facing state tied to a live, real-money promotion is always
an escalate-same-run item, never deferred to a scheduled review.

*Resolved 2026-10-03:* the trigger that prompted this rule — the "Two Seats to Quiet — seat
counter" hourly trigger (`trig_01ANo9Qa8bcqgaxQtP9xBeFp`, updates the public seat count on
`shop.calmandoak.com` for the free-international-flights sweepstakes) — failed 3 consecutive days
(2026-09-27/28/29), then ran clean 3 consecutive days in a row (2026-10-01/02/03, each a ~50–60s
completed-pass run, not the ~8s failure shape), meeting the same 2–3-instance bar used to add it.
No longer named individually as an always-escalate item; the general rule above stays standing for
whatever trips it next. Still unverifiable live (no Shopify connector on this session) — if it
fails again, re-escalate immediately rather than waiting for a new 3-day streak.

*Resolved again 2026-10-24, then reopened 2026-10-25:* the same trigger failed 4 consecutive days
(2026-10-18–21) with a new failure mode, `USAGE_LIMIT_REACHED`, then ran clean 3 consecutive days
(2026-10-22/23/24, each a ~30–65s completed-pass run), meeting the same 3-clean-run bar used in
the 2026-10-03 resolution — demoted from a standing escalate item in the 2026-10-24 briefing. It
then **failed again the very next day** (2026-10-25T06:32:22–06:32:32Z, `USAGE_LIMIT_REACHED`,
~10s — the same short failure shape as the 2026-10-18–21 streak, not the ~30–65s clean-run shape),
re-escalated same-run per the standing instruction below. **Named individually again as a standing
escalate item** — the 3-clean-day bar that resolved it twice has now been broken once immediately
after being met, so a 4th consecutive clean day should not be treated as durable resolution without
at least one further week of stability first. Still unverifiable live from this sandbox.

## Public-facing review gate (added 2026-09-14)
**Nothing public-facing ships without the CEO reviewing it first.** This supersedes the earlier
"full autonomy, ship without per-action approval" model for anything a customer or the public
actually sees — that model still holds for internal/staged work (drafting, building, QA-ing).
Concretely:
- **Site changes** (seo-ranker, cro, merchandiser): commit to a branch, open a pull request against
  `main`. Do **not** push directly to `main`. The CEO reviews the diff each run and either merges
  it (ships) or comments with what needs fixing.
- **Social content** (content-factory, publisher): build and QA the batch fully, write it to
  `final pins/batches/<id>/` with a manifest (captions, media, target platform/time), but do
  **not** call any Blotato post/schedule tool. The CEO reviews the staged manifest and either
  schedules it (ships) or sends it back with specific feedback.
- **Email/outreach**: unchanged — already staged-only, never auto-send, per the rules below.
- Why: on 2026-09-14 the first live content-factory run built and QA'd 12 real assets correctly,
  then would have published them straight to Blotato with no second look — it was only stopped by
  an unrelated infrastructure failure, not by any review step. That gap is what this closes.
- The CEO's own review is logged (what it approved, what it sent back, why) in its daily briefing
  — this is not a silent gate.
- **Confirmed gap (added 2026-10-06, see `CEO-BRIEF/LESSONS-LEDGER.md`):** two device-bound cloud
  triggers — "Calm oak daily deploy" (`npx wrangler deploy` straight to production from Cameron's
  local folder) and "Calm oak weekly seo post" (a full write-and-publish pipeline with no PR step)
  — structurally bypass this gate by design: neither touches the `Cammyboy11/calmandoak` GitHub
  repo, so the CEO's PR-review step never sees whatever they ship. Confirmed on real firings of
  "daily deploy" (2026-09-28, 2026-10-05, 2026-10-06, 2026-10-07, 2026-10-11, 2026-10-12,
  2026-10-15, 2026-10-16, 2026-10-19, 2026-10-21) — not a one-off. **2026-10-12 firing also confirms "weekly seo post" (which
  can write a brand-new journal article and deploy it straight to production) completed a full run
  on its own due date** (Monday 2026-10-12, 17:54–18:00 UTC), not just fired-then-suspended as on
  most prior weeks — see `CEO-BRIEF/LESSONS-LEDGER.md`'s 2026-10-13 entry. No cloud session can
  currently verify what any of the three has shipped (`calmandoak.com` and `database.blotato.io` are
  both still outright unreachable from this sandbox, re-confirmed 2026-10-17). This is a standing
  item for Cameron to decide (disable them, or rework them to go through the same PR/staged-batch
  path every other role follows) — the CEO is not disabling or editing either trigger itself, since
  that's account/trigger-configuration territory.
- **New, distinct pattern observed 2026-10-16 (raw, 1st instance — see `CEO-BRIEF/LESSONS-LEDGER.md`
  2026-10-17 entry):** a separate, non-trigger local/interactive session (co-authored "Claude Fable
  5.1," session `01AjRB6YBz4AZqsgwH1uX7PB`) pushed 5 commits **directly to `main` via git** between
  17:25–19:23 UTC — not through any specialist agent's PR path, and not through either device-bound
  trigger above. This is Cameron's own direct work (he owns the repo and can push to it himself;
  not a specialist-agent review-gate bypass), but it shipped a substantial, monetized change (53 new
  `shop/looks/*` pages with Amazon/Awin links, `shop/prints/*` + `shop/sets/*` redirected to
  `shop.calmandoak.com`) with **zero `TEAM-LOG.md` entry** — discovered only by reading `git log`
  directly. Spot-checked for compliance (disclosure block, `rel="sponsored nofollow noopener"`,
  `tag=calmandoak-20`) on a sample and it passed, but this was not a full SAFEGUARDS sweep of all 53
  pages. Not promoting a rule yet (1st instance) — flagging so a future SEO-ranker run treats
  `shop/prints/*`/`shop/sets/*` as redirects, not missing/broken pages, and so this doesn't recur
  silently.

## Trigger-change logging (promoted 2026-10-14, see LESSONS-LEDGER.md)
Any session that creates, enables, disables, or otherwise materially changes a recurring cloud
trigger logs it (TEAM-LOG.md or ORG-CHART.md) in the same session. Confirmed as a recurring gap
across 4+ independent instances (2026-09-14, -16, -25/26, -27) — triggers appearing, disappearing,
or changing state with zero paper trail, discovered cold by the next day's execution-integrity
check instead of being explained in advance. **Known exception, not a bug:** the daily Pinterest
scheduler (`trig_0144Cg9HoKeXhET21YLSDVbk`) auto-suspends with `suspension_reason: "device_absent"`
whenever Cameron's local device disconnects, and auto-resumes when it reconnects — this is expected,
machine-logged behavior (confirmed 2026-09-27, repeatedly re-observed since), not an undocumented
manual toggle, and does not need a TEAM-LOG line each time it happens.

## Content-factory pipeline notes (promoted 2026-10-14, see LESSONS-LEDGER.md)
- **Pre-flight:** `node_modules/` is gitignored and absent on a fresh clone even though
  `ffmpeg-static` is a listed `package.json` dependency — run `npm install ffmpeg-static --no-save`
  before using `_pin-to-reel.js`/`_add-audio-bed.js` (no registry egress issue, confirmed working
  every time since 2026-09-27).
- **Branch ASIN overlap:** before finalizing a batch, check every other open `content-factory/*`
  branch's manifest for ASIN overlap, not just the live Blotato queue — two independently-built
  batches (09-20, 09-27) shipped the same ASIN before anyone checked (found 2026-09-27).
- **Reusable tooling lands on `main`, not a batch branch:** a batch branch's "promoted to a standing
  helper" claim (e.g. `_asin-to-pin.js`) does not actually reach `main` unless merged — content-factory
  batch branches never get merged, only reviewed and scheduled. A genuinely reusable pipeline script
  should ship via its own small PR directly, the same review path seo-ranker already uses for code,
  not get silently re-added to every new batch branch (confirmed recurring 2026-10-04, 2026-10-11).

## Learning loop (added 2026-09-14)
If you observe something real this run — a mistake, a pattern, a fix that worked — append one
line to `CEO-BRIEF/LESSONS-LEDGER.md` (schema is in that file). You don't need to act on it beyond
logging it; the CEO consolidates confirmed patterns into real rules monthly (see
`CEO-BRIEF/LEARNING-LOOP.md`). Exception: disclosure requirements, the ASIN quality bar, brand
voice, and everything in "Always escalate" above are never subject to this loop — no observed
metric improvement justifies loosening them; that requires Cameron directly.
