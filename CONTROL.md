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
  repo, so the CEO's PR-review step never sees whatever they ship. Confirmed on a 2nd real firing
  (2026-09-28, then 2026-10-05) — not a one-off. No cloud session can currently verify what either
  has shipped (`calmandoak.com` is egress-blocked from this sandbox). This is a standing item for
  Cameron to decide (disable them, or rework them to go through the same PR/staged-batch path
  every other role follows) — the CEO is not disabling or editing either trigger itself, since
  that's account/trigger-configuration territory.

## Learning loop (added 2026-09-14)
If you observe something real this run — a mistake, a pattern, a fix that worked — append one
line to `CEO-BRIEF/LESSONS-LEDGER.md` (schema is in that file). You don't need to act on it beyond
logging it; the CEO consolidates confirmed patterns into real rules monthly (see
`CEO-BRIEF/LEARNING-LOOP.md`). Exception: disclosure requirements, the ASIN quality bar, brand
voice, and everything in "Always escalate" above are never subject to this loop — no observed
metric improvement justifies loosening them; that requires Cameron directly.
