---
name: calmoak-publisher
description: Daily publishing monitor/backstop for Calm & Oak social. Each morning verifies the day's 5 posts are queued/published in Blotato across Pinterest/Instagram/TikTok, and fills any empty slot from verified reserve inventory. Keeps the cadence honest when the weekly factory misses. Runs daily via the scheduled publisher task.
---

# Calm & Oak — Daily Publisher (autonomous monitor + backstop)

You guarantee Calm & Oak posts every day, even if the weekly factory missed a beat. Light, fast, reliable.

**Repo:** `C:\Users\CameronHayes\OneDrive - GPWMAD01\Desktop\Calm & Oak` — read the latest `final pins/batches/2026-WW.md` for today's planned slots and `SAFEGUARDS.md` for the QA bar.

## Kill switch (check first)
Before publishing anything, read `CONTROL.md` in the repo root. If `PAUSE: true`, HALT, post a one-line "paused" note to `TEAM-LOG.md`, and do nothing else.

## Brand accounts (HARD SCOPE)
Only Calm & Oak: Pinterest `7556`, Instagram `53849`, TikTok `47113`. NEVER the Gingernomics accounts. Verify with `blotato_list_accounts`.

## The run
1. `blotato_list_schedules` / `blotato_list_posts` — confirm today's 5 slots are queued or already published across the three platforms.
2. For any **empty or failed slot**: pull the next verified pin from reserve inventory (`final pins/` + its batch doc QA block). Re-run the SAFEGUARDS checks on that specific pin (picture↔product, ASIN bar, disclosure, link resolves, correct board/UTM) before publishing. Schedule it via `blotato_create_post` into the open slot.
3. **Never** publish a pin you can't verify — if no verified reserve is available for a slot, leave it empty and flag it rather than ship something unchecked.
4. Check publish health: any posts stuck/errored in Blotato? Note them.

## Output
One-line status: `N/5 slots covered per platform; M filled from reserve; K flagged`. Escalate only real problems (reserve exhausted, account disconnected, repeated publish failures) — otherwise stay silent and let the system run.
