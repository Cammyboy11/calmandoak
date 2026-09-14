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

- 2026-09-14 · CONTENT-FACTORY (cloud run) · **`_add-audio-bed.js` at repo HEAD was truncated mid-statement (`Unexpected end of input`) — the exact script this pipeline depends on to prevent the known "silent Reel" failure mode was itself non-functional for anyone who ran it.** · Reproduced the crash directly (`node _add-audio-bed.js ...` → SyntaxError), confirmed via `git show HEAD:_add-audio-bed.js` that the truncation is committed, not a local artifact. · raw · **candidate rule:** any agent that runs a `_*.js` pipeline script for the first time in a session should smoke-test it (or at least syntax-check with `node --check`) before relying on its "always run this" instruction — a script referenced in an agent spec is not evidence it currently parses.

- 2026-09-14 · CONTENT-FACTORY (cloud run) · **A cloud/remote session of this agent starts with zero pin inventory and zero copy-library reference — `final pins/`, `01-brand-assets/` through `05-products-by-day/`, and `Pin Copy Library*.md` are all gitignored (local-only on Cameron's desktop), and no `VALIDATED-ASINS*.md` file was ever actually committed to git despite being referenced as the source of truth.** · Confirmed via `.gitignore` contents + directory listing (all six paths MISSING in this checkout) + `find`/`git check-ignore` for the ASIN file (not found, not ignored — never committed). · raw · **candidate rule:** AUTOMATION-MASTER-PLAN's "350-pin runway" and "Pin Copy Library format" assumptions only hold on Cameron's desktop session; a cloud-run content-factory instance must fall back to tracked `assets/img/*` site assets and reconstruct copy voice from CONTROL.md + live already-published copy, and should say so explicitly rather than silently reporting a shortfall as if inventory merely ran low.

- 2026-09-14 · CONTENT-FACTORY (cloud run) · **Outbound HTTPS from this cloud sandbox to `database.blotato.io` (Blotato's own presigned-upload storage host) is denied by organization egress policy, so the standard local-file media pipeline (presigned URL → curl PUT → create_post) cannot function from a cloud session at all — only from a session on Cameron's own network (desktop Cowork).** · Confirmed via the agent-proxy status endpoint: `connect_rejected`, gateway 403, explicitly logged as a policy denial, repeated identically across all 12 upload attempts. · raw · **candidate rule:** the weekly factory's spec should note this constraint explicitly so a future cloud run doesn't waste a cycle re-discovering it — cloud runs can build/QA/stage full batches but cannot publish; only a desktop-session run (or a future allowlisted host) can complete the schedule step.

- 2026-09-14 · CONTENT-FACTORY (cloud run) · **~20 sampled already-scheduled posts (of 145 queued through 2026-09-30, built by an earlier/different run) are missing the FTC disclosure sentence and `#affiliate` hashtag on monetized Amazon/Awin posts — e.g. a 2026-09-14T18:05Z Pinterest post ends "Shop the linen curtain look." with zero disclosure.** · Sampled via `blotato_list_schedules` across two full pages (~40 items reviewed, ~20 monetized), zero carried the disclosure sentence. · raw · **candidate rule:** this looks systemic to whatever run built that batch, not a one-off — worth a targeted audit of all 145 queued items' disclosure compliance before they go live, since SAFEGUARDS.md/PLAYBOOK-AUDIT-CORRECTIONS.md treat disclosure as non-negotiable and this run found it absent at scale.

- 2026-09-14 · CEO (build session) · **The published README/ORG-CHART cited a YouTube strategy in the vault, but a first vault-only search found nothing — the docs actually live in the repo root, not the vault.** · Confirmed on a second, wider search: `YOUTUBE-STRATEGY-2026.md`, `YOUTUBE-CONTENT-SYSTEM-SOP.md`, `YOUTUBE-CALENDAR-Q4-2026.md` all exist at the repo root. · raw · **candidate rule:** any "does X exist" check must search the repo root AND the vault, not just the vault — a vault-only search produces false negatives for anything Cowork sessions wrote directly to the repo.

- 2026-09-10 · CEO (build session) · **A stale `.git/index.lock` (dated 2026-09-09, no process holding it) silently blocked every local commit in the repo for at least a day.** · Found via `ls -la .git/index.lock` + `tasklist | grep git` (no process running) before clearing it. · confirmed (this is a known git failure mode, not speculative) · **candidate rule:** any agent whose commit fails should check for and report a stale lock before assuming a different cause, and the CEO's execution-integrity check should include "was a lock ever the blocker" as a diagnostic step, not just "did commits happen."

- 2026-09-10 · CEO (build session) · **`main` (local) and `cleanup-2026-09` (checked-out branch) looked diverged from a first read, but local `main` turned out to be a stale ancestor — the real divergence was `cleanup-2026-09` vs `origin/main` (the remote).** · Confirmed via `git merge-base` + `git diff --stat` against the actual remote ref, not the local branch name. · confirmed · **candidate rule:** branch-divergence checks must diff against `origin/<branch>` after a fresh `git fetch`, never a local branch ref alone — local refs go stale silently.

- 2026-09-10 · CEO (build session) · **`CONTROL.md` said `TIKTOK: PAUSED` while Blotato showed TikTok actively publishing 3–5 posts/day, live, with 36 more scheduled.** · Cross-checked CONTROL.md's flag directly against `blotato_list_posts` real data, same run. · confirmed · **candidate rule:** promoted — this is now Standing Job #1, check 3 in `CEO-OPERATING-BRIEF.md` ("CONTROL.md consistency"), run every time, not just discovered once.

- 2026-09-10 · CEO (build session) · **Gemini image-generation credits are exhausted (`429 RESOURCE_EXHAUSTED`, per `OWN-BRAND-PLAN-2026-09.md`), so the "Gemini editorial mockup" function is fully specced and skill-documented but not actually running.** · Cited directly from the vault's own dated note. · confirmed · **candidate rule:** "a skill exists and is documented" is not evidence "it's running" — the execution-integrity check should extend to per-capability fuel/quota checks (billing, credits, API keys), not just trigger/commit evidence, wherever a vault note already documents a known blocker.

- 2026-09-10 · CEO (build session) · **`daily-digest` is referenced everywhere (README, ORG-CHART, TEAM-LOG entries) as if it's a full agent, but no persona file exists for it at `~/.claude/agents/` — only a scheduled-task skill stub.** · Confirmed by directly listing `~/.claude/agents/*.md` and finding no `calmoak-daily-digest.md`. · confirmed · **candidate rule:** a role being named in docs is not evidence it was actually built — verify by listing the actual agent-file directory, every time a roster is audited.

*(Ledger starts here — these six are backfilled from the 2026-09-10/14 build session because they're real, already-confirmed findings, not hypothetical seed data. Going forward, new entries land at the top as they happen.)*
