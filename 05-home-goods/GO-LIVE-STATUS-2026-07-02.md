# Go-Live Status — 2026-07-02 (Fabel session)

## Done today
1. **Git unblocked + pushed.** Repo was stuck mid-merge with a corrupted `index.lock`; resolved (`--theirs` on the-edit/index.html), merge committed as 53b4d1d, pushed to GitHub (285 MB).
2. **Deployed.** Cloudflare's git-triggered Workers build was stuck "Initializing" (retried; their runner was unhealthy), so deployed via local `npx wrangler deploy --name calmandoak --assets . --compatibility-date 2026-01-01` from Git Bash-equivalent. Version 41af7ebf live.
3. **All 21 print-file URLs verified live** (HTTP 200): 12 posters + 9 pattern files. `/shop/home-goods/` page is also live now.
4. **CORS added** for `/assets/img/print-files/*` in `_headers` (needed so Gelato's editor can fetch designs by URL; harmless otherwise). Deployed.
5. **Gelato wall art: 12/12 posters created** via Bulk create from template (template = existing "Single Stem Print" listing → sizes 8x10/11x14/16x20 + its pricing, NOT the $32 flat from CATALOG.csv — review before publishing). Etsy visibility toggle left OFF → all are **Drafts** in Etsy, no listing fees yet. Sun & Moon needed a retry (op f5c38d83) — check Gelato's completion email.
6. **CSV fix:** Gelato requires the `Product UID` column filled with the template's variant UID (bulk "blank UID" assumption was wrong — all 12 rows failed until fixed). Corrected file: `gelato-imports/gelato-wallart-fixed.csv`. Poster UID used: `flat_400x500-mm-16x20-inch_250-gsm-100lb-uncoated-offwhite-archival_4-0_ver`.

## Remaining (soft goods) — needs ~15 min of human clicks
Gelato's design editor blocks programmatic canvas placement, so create ONE template product per type (Cameron):
1. Gelato → Create product → Single product → **White 11oz Ceramic Mug** — a draft is already started; `seigaiha-mug.png` is already in your Files panel — click it to place, continue through Mockups/Details/Prices (mug $19 per CATALOG), publish to store.
2. Same for **Tote bag** (use `seigaiha-square.png`, $28) and **Notebook** (`seigaiha-square.png`, $19). Print files also hosted at calmandoak.com/assets/img/print-files/.
3. Then hand back to Fabel/Claude: I'll pull each template's variant UIDs ("Download attributes"), fill the mug/tote/notebook CSVs, and bulk-create the remaining products automatically.

## Then (per handoff)
- Sample order + QC → publish Etsy drafts (~$0.20/listing) → paste listing URLs into CATALOG.csv → I flip the site's "Coming soon" buttons, add homepage section/nav/sitemap, push, request indexing.

## Notes
- Cloudflare stuck build 96376c7f may eventually complete — harmless (same commit).
- Repo-in-OneDrive still causes git lock weirdness; consider relocating per handoff.

---

## UPDATE — session 2 (same day, later)

**Soft goods are DONE (except notebooks — see below).** Final Gelato/Etsy state: **57 products, 0 failed.** 20 new this session, all pushed to Etsy as drafts:

- **12 wall-art posters** (incl. Sun & Moon retry — succeeded)
- **4 mugs** ($19): Seigaiha built via wizard (design filled to full wrap, 293dpi, 5 mockups) + Ensō, Sun Arch, Mudcloth bulk-created. Base cost $6.03.
- **4 totes** ($28): Seigaiha via wizard (300dpi, print area filled) + Ensō, Ink Brush, Mudcloth bulk-created. Base cost $11.64 (Classic Tote, DTG White).

**Templates saved in Gelato** ("Seigaiha Wave Ceramic Mug…" and "Seigaiha Wave Canvas Tote Bag…") for future bulk drops.

**Product UIDs used (for future CSV imports):**
- Poster: `flat_400x500-mm-16x20-inch_250-gsm-100lb-uncoated-offwhite-archival_4-0_ver`
- Mug: `mug_product_msz_11-oz_mmat_ceramic-white_cl_4-0`
- Tote: `bag_product_bsc_tote-bag_bqa_clc_bsi_std-t_bco_white_bpr_4-0`

**⚠ Notebooks: NOT POSSIBLE on Gelato** — the catalog has no notebook/journal product shipping to North America (searched "notebook" and "journal"; only photo books). Options: drop the notebook line, or fulfil via Printful/another POD later. `gelato-notebook.csv` is unused.

## Next (unchanged)
1. Cameron: review pricing on the 12 posters (inherited Single Stem's per-size prices, not flat $32), order 1 sample per line (poster, mug, tote), QC.
2. Cameron: publish the Etsy drafts (~$0.20/listing).
3. Hand the live Etsy URLs back → I update CATALOG.csv, flip the site's "Coming soon" buttons, add homepage section + nav + sitemap, deploy, request indexing.

---

## UPDATE — session 3 (Cameron said "you do it")

### Fixed this session
1. **Missing poster sizes.** The bulk-created posters had only the 16x20 variant (the CSV's single Product UID limited them). I added **8x10 + 11x14 variants to all 12 posters** via the product editor and republished — every poster now has the same 3 sizes as the original prints.
2. **Sun & Moon mystery solved:** Etsy rejects titles with more than one "&". Recreated as **"Sun and Moon — Celestial Pair …"** — now in the store.
3. **Pricing aligned to the store ladder** (matches existing prints: $28 / $42 / $63 by size) on: **Layered Hills, Tonal Horizon, Mountain, Moon Phases, Balance, Ink Horizon**.

### Remaining nit (5 min in Gelato, or ask Claude again)
Six posters still carry the default new-variant prices — **8x10 = $28.90 and 11x14 = $32.52** instead of $28 / $42 (16x20 is correct at $63):
**Rising Sun, Arch, Vessel, Single Stem, Pampas, Sun and Moon.**
Fix: product → Edit prices → set 28 / 42 → Publish to Store. (The dashboard began dropping my keystrokes — likely because the machine was in active use, the automation and a human can't share the keyboard.)

### Unchanged
- Everything is still an **Etsy draft** — nothing is publicly listed and no fees incurred.
- Mugs ($19) and totes ($28) are correctly priced.
- Notebooks: not available on Gelato NA — decide drop vs Printful.
- Next: sample order + QC (poster/mug/tote) → publish drafts → send live URLs → Claude wires the site.

---

## UPDATE — session 4 (FULL COLLECTION COMPLETE)

**Store total: 82 products (was 38). 44 new, 0 failed, all synced/syncing to Etsy as drafts.**

- **12 posters** — 3 sizes each, $28 / $42 / $63 (all price fixes finished, incl. Rising Sun, Arch, Vessel, Single Stem, Pampas, Sun and Moon)
- **4 mugs** — $19
- **4 totes** — $28
- **12 canvases** (NEW) — 16x20 gallery-wrap, $72 (base $33.86). Template: Layered Hills canvas.
- **12 framed prints** (NEW) — 16x20 museum-quality matte in wooden frame. Layered Hills template has White + Wood frame options at $123.26 / $130.12; the 11 bulk-created ones are **Wood frame** ($130.12 default). ⚠ Priced at Gelato's 50%-margin default, NOT the $84 in CATALOG.csv — 16x20 framed base cost is $61.63–65.06, so $84 would have been ~24% margin (violates the handoff's 2–2.4× rule). Adjust if you'd rather trade margin for conversion.
- Notebooks: still not available on Gelato NA (drop or Printful).

Saved Gelato templates for future drops: poster (via Single Stem), Seigaiha mug, Seigaiha tote, Layered Hills canvas, Layered Hills framed.
Canvas UID: `canvas_400x500-mm-16x20-inch_canvas_wood-fsc-slim_4-0_ver` · Framed (wood) UID: `framed_poster_mounted_400x500-mm-16x20-inch_natural-wood_wood_w12xt22-mm_plexiglass_400x500-mm-16x20-inch_250-gsm-100lb-uncoated-offwhite-archival_4-0_ver`

**Your move (unchanged):** review prices in Gelato → order 1 sample per line → QC → publish the Etsy drafts → send live URLs → Claude wires the site (buy buttons, homepage, nav, sitemap, deploy, Search Console).
