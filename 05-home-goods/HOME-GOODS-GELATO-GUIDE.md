# Home Collection → Gelato + Etsy — Run Guide

Same pipeline as your current print store. I've generated everything; this is the run sheet.

## What's ready
- **Import CSVs** (`05-home-goods/gelato-imports/`): `gelato-wallart.csv`, `gelato-mug.csv`, `gelato-tote.csv`, `gelato-notebook.csv` — SEO titles + descriptions, blank Product UID (Gelato assigns it in bulk-create), hosted Print File URL, publish flag.
- **Print files** hosted at `/assets/img/print-files/`:
  - Wall art: `https://calmandoak.com/assets/img/print-files/{pattern}-wallart.png` (3000×4000)
  - Mug wrap: `.../{pattern}-mug.png` (2700×1155)
  - Tote / notebook: `.../{pattern}-square.png` (3000×3000)
  - patterns: `seigaiha, limewash, enso, inkbrush, mudcloth, shibori, hills, sunarcs`
- **Etsy copy**: `ETSY-LISTINGS.md` (if you list on Etsy manually instead of Gelato→Etsy sync).

## Step 0 — deploy so the print URLs go live (prerequisite for the URL method)
`git push` (this ships the print files + the unlinked `/shop/home-goods/` page; nothing is merchandised site-wide yet, buttons still say "Coming soon"). After it deploys, the `/assets/img/print-files/...` URLs resolve.
*Alternative:* skip this and upload the print files to Gelato directly from disk (`05-home-goods/print-ready/gelato/`) instead of "Upload from URL."

## Step 1 — Gelato: create one product per template
For each template (Wall Art Print, 11oz Mug, Tote, Notebook): create one product, click through Design → Mockups → Details → Prices → Publish once (set price from `CATALOG.csv`).

## Step 2 — Gelato: bulk-create from the CSV
On that template, use **Bulk create** → import the matching CSV → for each row use **Upload from URL** with the Print File URL in the row (or the on-disk file). Repeat for all four templates. Toggle **"Show products to store visitors"** if you want them pushed to Etsy.

## Step 3 — Etsy: publish the drafts
Bulk-select the new drafts → Publish (~$0.20/listing). Or list manually from `ETSY-LISTINGS.md`.

## Step 4 — QC (yours, non-negotiable)
Order **one sample per product line** (wall art, mug, tote, notebook). Check colour, scale, print sharpness, feel. Only ship what passes.

## Step 5 — hand back to me
Send me the live Etsy URLs. I then: flip every "Coming soon →" to its real "Shop on Etsy" link, add the **homepage brand section**, put the collection in the **nav + sitemap**, cross-link it across relevant pages, and stage the deploy — the full site-wide launch, only once it's wired and working.

## Pricing (from CATALOG.csv)
Wall art print $32 · Canvas $72 · Framed $84 · Mug $19 · Tote $28 · Notebook $19. Verify Gelato base costs before publishing; adjust for ~2–2.4× margin.
