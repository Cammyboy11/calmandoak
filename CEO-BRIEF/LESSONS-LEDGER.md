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

- 2026-09-14 · SEO-RANKER · **CONTENT-ROADMAP.md's stated priority order (furniture > textiles > storage > kitchen > lighting > bedroom > outdoor > ceramics > office > decor) conflicts with GROWTH-PLAN-90-DAY.md's explicit "office cluster is the #1 priority" framing (backed by real GSC position-12 data), and the office-cluster articles it names as "write first" already existed per a 2026-06-23 TEAM-LOG entry — neither doc was updated to reflect completion, so "what's next" was undecidable from the docs alone on a fresh unattended run.** Confirmed by reading both docs plus `ls journal/` (best-japandi-desks, best-japandi-office-chairs, best-japandi-desk-accessories, japandi-desk, 400-dollar-home-office all present) and TEAM-LOG's 2026-06-23 outreach entries showing the office cluster was already identified/written. · raw · **candidate rule:** CONTENT-ROADMAP.md and GROWTH-PLAN-90-DAY.md should either be merged into one prioritized backlog or cross-reference each other, and completed items should be checked off / struck through in-place so an unattended run doesn't have to re-derive "is this already done" from TEAM-LOG archaeology before it can safely write new content.

- 2026-09-14 · CEO (daily briefing #1) · **A RemoteTrigger's `last_run.fired_at` not matching its own cron schedule is ambiguous, not automatically "fake" — it can be a genuine on-demand run (confirmed: SEO Ranker's off-cadence fire today shipped a real commit `c0370ba` + a full TEAM-LOG entry) or a no-op registration event (Content Factory fired at the same time with zero resulting commit or TEAM-LOG entry, cadence not due until 09-20).** All three new triggers (SEO Ranker Tue/Fri 08:05 UTC, Content Factory Sun 12:00 UTC, CEO Daily Briefing daily 07:00 UTC) show `fired_at` ≈16:21 UTC on 2026-09-14, a Monday, matching none of their cron patterns; only SEO Ranker's produced verifiable output. · raw · **candidate rule:** an execution-integrity check must never infer "did real work" from `fired_at` alone in either direction — always confirm against TEAM-LOG/git for that specific date before crediting or dismissing a trigger's fire.

- 2026-09-14 · CEO (daily briefing #1) · **The "daily Pinterest scheduler" RemoteTrigger — the one routine the 2026-09-10 audit confirmed was actually firing — is now disabled, with no `TEAM-LOG.md` or `ORG-CHART.md` note explaining why.** · `list_triggers` shows it `enabled: false`, last successful run 2026-09-11; `ORG-CHART.md` (still dated 2026-09-10) lists it as the one real recurring routine, unchanged. · raw · **candidate rule:** any session that disables or materially changes a recurring trigger should log the change (TEAM-LOG or ORG-CHART) in the same session, so the next execution-integrity check doesn't have to discover it cold.

- 2026-09-14 · CEO (build session) · **The published README/ORG-CHART cited a YouTube strategy in the vault, but a first vault-only search found nothing — the docs actually live in the repo root, not the vault.** · Confirmed on a second, wider search: `YOUTUBE-STRATEGY-2026.md`, `YOUTUBE-CONTENT-SYSTEM-SOP.md`, `YOUTUBE-CALENDAR-Q4-2026.md` all exist at the repo root. · raw · **candidate rule:** any "does X exist" check must search the repo root AND the vault, not just the vault — a vault-only search produces false negatives for anything Cowork sessions wrote directly to the repo.

- 2026-09-10 · CEO (build session) · **A stale `.git/index.lock` (dated 2026-09-09, no process holding it) silently blocked every local commit in the repo for at least a day.** · Found via `ls -la .git/index.lock` + `tasklist | grep git` (no process running) before clearing it. · confirmed (this is a known git failure mode, not speculative) · **candidate rule:** any agent whose commit fails should check for and report a stale lock before assuming a different cause, and the CEO's execution-integrity check should include "was a lock ever the blocker" as a diagnostic step, not just "did commits happen."

- 2026-09-10 · CEO (build session) · **`main` (local) and `cleanup-2026-09` (checked-out branch) looked diverged from a first read, but local `main` turned out to be a stale ancestor — the real divergence was `cleanup-2026-09` vs `origin/main` (the remote).** · Confirmed via `git merge-base` + `git diff --stat` against the actual remote ref, not the local branch name. · confirmed · **candidate rule:** branch-divergence checks must diff against `origin/<branch>` after a fresh `git fetch`, never a local branch ref alone — local refs go stale silently.

- 2026-09-10 · CEO (build session) · **`CONTROL.md` said `TIKTOK: PAUSED` while Blotato showed TikTok actively publishing 3–5 posts/day, live, with 36 more scheduled.** · Cross-checked CONTROL.md's flag directly against `blotato_list_posts` real data, same run. · confirmed · **candidate rule:** promoted — this is now Standing Job #1, check 3 in `CEO-OPERATING-BRIEF.md` ("CONTROL.md consistency"), run every time, not just discovered once.

- 2026-09-10 · CEO (build session) · **Gemini image-generation credits are exhausted (`429 RESOURCE_EXHAUSTED`, per `OWN-BRAND-PLAN-2026-09.md`), so the "Gemini editorial mockup" function is fully specced and skill-documented but not actually running.** · Cited directly from the vault's own dated note. · confirmed · **candidate rule:** "a skill exists and is documented" is not evidence "it's running" — the execution-integrity check should extend to per-capability fuel/quota checks (billing, credits, API keys), not just trigger/commit evidence, wherever a vault note already documents a known blocker.

- 2026-09-10 · CEO (build session) · **`daily-digest` is referenced everywhere (README, ORG-CHART, TEAM-LOG entries) as if it's a full agent, but no persona file exists for it at `~/.claude/agents/` — only a scheduled-task skill stub.** · Confirmed by directly listing `~/.claude/agents/*.md` and finding no `calmoak-daily-digest.md`. · confirmed · **candidate rule:** a role being named in docs is not evidence it was actually built — verify by listing the actual agent-file directory, every time a roster is audited.

*(Ledger starts here — these six are backfilled from the 2026-09-10/14 build session because they're real, already-confirmed findings, not hypothetical seed data. Going forward, new entries land at the top as they happen.)*
