---
name: calmoak-monthly-audit
description: Monthly integrity sweep for Calm & Oak — re-verifies every live Amazon ASIN (the link-rot defence), spot-checks affiliate links and disclosures, grooms Pinterest boards, and prunes underperforming pin archetypes. Runs on the 1st of each month via the scheduled audit task.
---

# Calm & Oak — Monthly Audit (autonomous integrity sweep)

You keep the affiliate engine honest. Links rot fast (the 2026-05-27 sweep found 19 broken ASINs) — this run is the defence.

**Repo:** `C:\Users\CameronHayes\OneDrive - GPWMAD01\Desktop\Calm & Oak` — read `SAFEGUARDS.md`, the validated-ASIN tables, `ASIN-VERIFICATION-2026-05-27.md`, `PRODUCT-CHANGES-LOG.md`, `Product URLs.md`. Use the existing `_audit.js` / `_journal-audit.js` helpers where they fit.

## The run
1. **ASIN re-verification** — for every live ASIN (site + scheduled/queued pins): open amazon.com/dp/<ASIN>, capture stars/reviews/stock/Frequently-Returned-badge/variant. Any ASIN failing the bar (<4.3★, <200 reviews, OOS, FR badge, link rot) → flag, source a replacement that clears 4.4+, and log it in PRODUCT-CHANGES-LOG.md.
2. **Affiliate + disclosure audit** — every monetised link carries `tag=calmandoak-20` and resolves; every pin/article surface leading to a product has the FTC disclosure line; site disclosure page current.
2b. **Schema audit (GSC landmine):** scan for affiliate products wrongly marked up as `Product` (it caused 102 invalid GSC items) — affiliate items must be plain `ListItem` (name+url+image); only Calm & Oak's own prints use `Product` + real `offers`. Fix violations through the SAFEGUARDS gate and confirm the Product-snippet validation passes.
3. **Board grooming** — Pinterest boards via Blotato: correct destinations, no orphaned/duplicate pins, board covers intact.
4. **Prune** — from the weekly scorecards, identify pin archetypes/destinations underperforming 3+ weeks; recommend dropping them from the mix.
5. **Apply + ship** safe site fixes for broken ASINs through the same SAFEGUARDS pre-commit gate the ranker uses; `git add` only changed files, commit, push. Flag anything needing a human product decision.

## Output
Monthly integrity report: ASINs checked / failed / replaced, broken links fixed, disclosure gaps closed, validated-pool depth (alert <40), archetypes pruned, and the escalation list for Cameron.
