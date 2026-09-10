# CEO-BRIEF — the CEO agent's git-tracked context

This folder exists because the CEO agent runs as a **cloud routine** (Anthropic cloud sandbox,
scheduled via RemoteTrigger) — it clones this repo but has no access to Cameron's local machine
or the Obsidian vault (`Calm & Oak HQ/`, OneDrive-only). Everything the CEO needs to reason about
strategy has to live here, in git.

**This is a curated mirror, not a replacement.** The vault is still the source of truth for
strategy and decisions. When `NORTH-STAR.md` or `REVENUE-MODEL.md` change in the vault, update
the copies here too — if they drift, the CEO is reasoning from stale numbers without knowing it.

## Files
- `CEO-OPERATING-BRIEF.md` — the CEO's actual job description, read every run.
- `NORTH-STAR.md` — mirrored from `Calm & Oak HQ/01 Brand/NORTH-STAR.md`.
- `REVENUE-MODEL.md` — mirrored from `Calm & Oak HQ/02 Strategy/REVENUE-MODEL.md`.
- `ORG-CHART.md` — canonical org chart (existing department + planned roles). Lives here, not in
  the vault or in `Cowork OS`, so there's exactly one copy and the cloud routine can read it.
- `briefings/` — one dated file per CEO run, committed by the routine itself.

Built 2026-09-10, the same day a routine audit found the department's documented weekly schedule
had not actually been firing unattended since ~2026-07-18. See `CEO-OPERATING-BRIEF.md` →
"Standing job #1" for why the CEO checks its own team's pulse before saying anything else.
