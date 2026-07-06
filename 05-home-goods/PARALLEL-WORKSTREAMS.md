# Parallel Workstreams — how to run two agents without collisions
Rule that makes parallelism work: **one agent per resource.** The browser (Etsy/Gelato/Gemini), the keyboard, and the Gemini daily video quota are ONE shared resource — only Lane A touches them. Lane B touches ONLY files in this repo. Two agents in the same browser slow each other down (proven: dropped keystrokes, stolen focus).

## LANE A — the existing Phase 2 session (BROWSER — exclusive)
Reordered priorities (change from original runbook order):
1. **VIDEOS FIRST, every day**: Gemini/Veo daily quota is the scarcest resource — burn the full quota each morning on listings with NO video before doing anything else. Queue order: 12 posters → 12 canvas → 12 framed → mugs → totes. Prompts: Step 1D + the Step 1 prompt pack ("slow cinematic push-in, 8s, no people"). Download → attach in Etsy listing editor video slot.
2. Photos per Step 1E brand spec (primary = warm lifestyle, never white-void).
3. Digital listings ($16, files from assets/img/print-files/poster-*.png — Lane B will stage ZIP bundles in 05-home-goods/digital-bundles/).
4. Publish all drafts (only after photos+videos done — Cameron's order).
5. Etsy shop sections + assign.
6. Write each live listing URL into 05-home-goods/CATALOG.csv (listing_url, status=live) as you publish — Lane B consumes this.

## LANE B — NEW session (Claude Code or Cowork — FILES ONLY, never opens the browser)
Kickoff prompt to paste:
> "Work only on files in the Calm & Oak repo — do not open a browser, do not touch Etsy/Gelato/Gemini, do not deploy. Read 05-home-goods/PARALLEL-WORKSTREAMS.md Lane B and execute it."
Tasks:
1. **12 design pages**: /shop/home-goods/<slug>/index.html per design (slugs = poster file names). Reuse the site's shop-page template + brand CSS. Contents: design story (2-3 paras, editorial voice per BRAND-AND-DESIGN-SYSTEM.md), print/canvas/framed/mug/tote purchase cards with `href="#pending-etsy"` placeholders, Product+Offer JSON-LD (read prices from CATALOG.csv), 4:5 images from assets/img/home-goods/.
2. **Internal links**: add "From the Home Collection" cross-link blocks to the 8 organic-traffic journal guides listed in TEAM-LOG (honest-materials, layering-textiles, lighting-the-five-pm-room, single-stem-rule, the-30-30-30-rule, two-woods-rule, wabi-sabi-ceramics, warmth-without-clutter) → matching design pages.
3. **Homepage + nav + sitemap**: Home Collection section on index.html, nav entry, all 13 new URLs in sitemap.xml.
4. **WebP**: convert assets/img/home-goods/*.jpg to WebP with fallbacks; update the hub page markup.
5. **Digital bundles**: for each of 12 designs create 05-home-goods/digital-bundles/<slug>.zip containing the 3000x4000 PNG + a README with print sizes (Lane A uploads these to Etsy digital listings).
6. **URL swap watcher**: when CATALOG.csv rows get listing_url filled by Lane A, replace the matching #pending-etsy placeholders.
DONE = commit to git with clear messages. DO NOT push/deploy — the daily 9:30 deploy task (or Cameron's deploy.cmd double-click) ships it after the working tree is reviewed.

## Shared rules
- CATALOG.csv is the handoff ledger: Lane A writes URLs, Lane B reads them.
- Only Lane A talks to the internet-facing accounts. Only the scheduled task/Cameron deploys.
- If either lane stalls >30 min on a UI, write the blocker into this file and move to the next task.
