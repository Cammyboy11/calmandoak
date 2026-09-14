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

## Always escalate (never auto-do)
DNS / redirects / hosting, account or provider settings, anything that spends money, anything destructive.

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

## Learning loop (added 2026-09-14)
If you observe something real this run — a mistake, a pattern, a fix that worked — append one
line to `CEO-BRIEF/LESSONS-LEDGER.md` (schema is in that file). You don't need to act on it beyond
logging it; the CEO consolidates confirmed patterns into real rules monthly (see
`CEO-BRIEF/LEARNING-LOOP.md`). Exception: disclosure requirements, the ASIN quality bar, brand
voice, and everything in "Always escalate" above are never subject to this loop — no observed
metric improvement justifies loosening them; that requires Cameron directly.
