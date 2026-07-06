# Home Collection — Pickup Status (2026-07-03)

Picking up after Fabel. Here's exactly where the launch stands and the one thing that was blocking it (now bypassed).

## What Fabel got done ✅
- **Merge conflict resolved** and everything **committed + pushed to GitHub `main`** (local repo is in sync with origin — `0 0`).
- All **12 poster print files** (`assets/img/print-files/poster-*.png`, 3000×4000) and the **soft-goods pattern print files** (`*-mug.png`, `*-square.png`, `*-wallart.png`) are committed and live on GitHub.
- Storefront `/shop/home-goods/` is live with the 12 framed poster mockups + waitlist (buttons still say "Coming soon").

## The one snag I found — and the fix
The **print-file URLs on `calmandoak.com` return 404** even though the files are on GitHub. Root cause: this site publishes through **Cloudflare Pages**, and the live deployment is **behind current `main`** — Cloudflare hasn't published the commit that added the poster print files. (The storefront's framed *mockups* load because they were served from an earlier build / CDN cache; the bare *print files* Gelato needs are new and aren't in the live build.)

**Why it doesn't matter for Gelato:** Gelato's "Upload from URL" fetches each print file **once** at product-creation time and stores its own copy. So the URL only needs to be live *at import*. The files are already live on GitHub's raw host, verified:
`https://raw.githubusercontent.com/Cammyboy11/calmandoak/main/assets/img/print-files/poster-layered-hills.png` ✔

So I repointed the import CSVs at GitHub raw — **no Cloudflare deploy needed to create the Gelato products.**

## New files to use for the Gelato import
Use these instead of the originals (same copy/titles, just deploy-independent URLs):
- `gelato-imports/gelato-wallart-github.csv` (12 posters)
- `gelato-imports/gelato-mug-github.csv` (4)
- `gelato-imports/gelato-tote-github.csv` (4)
- `gelato-imports/gelato-notebook-github.csv` (4)

All 24 referenced print files were verified present in the git HEAD, so every URL resolves.

## Remaining steps (two need a human)
1. **Log into Gelato** (I won't enter your password). Session is currently logged out.
2. **Bulk-create the products** — Gelato → Create product → pick template (Museum-Quality Matte Poster / 11oz Mug / Tote / Notebook) → **Bulk create → Upload from URL** using the matching `*-github.csv`. Prices from `CATALOG.csv` (Print $32 · Canvas $72 · Framed $84 · Mug $19 · Tote $28 · Notebook $19 — verify Gelato base cost, keep ~2–2.4×).
3. **Sample + QC** one of each line (yours — money + go-live).
4. **Publish on Etsy**, paste live URLs into `CATALOG.csv → listing_url`, set `status=live`.
5. Then I flip the storefront "Coming soon" → real Etsy links, add the homepage brand section + nav + sitemap, and stage the site-wide launch.

## Optional cleanup (not blocking launch)
Get `calmandoak.com` serving the poster print files too (on-brand, future-proof):
- **Cloudflare dashboard → Workers & Pages → the calmandoak project → Deployments** → check the latest deployment. If it **failed**, click **Retry deployment**; if auto-deploy is off, **Create deployment** from `main`. One click, ~1 min. Nothing else needs re-pushing — GitHub already has everything.
