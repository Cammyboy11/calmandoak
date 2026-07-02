# Handoff — Take the Calm & Oak Home Collection Live

**For:** Fabel · **From:** Cameron (via Claude) · **Goal:** turn the finished "Home Collection" into live, sellable products and merchandise it across the site.

Everything is designed and prepped. What's left is account work (Gelato + Etsy), a git deploy, physical sample QC, and flipping the site's placeholder buttons to real buy links. No new design is required.

---

## 1. What this is

An **owned, zero-inventory product line** extending the Japandi brand, in two halves that share one palette:

- **Wall art — 12 composed poster designs** → sold as prints / canvas / framed.
  Layered Hills · Rising Sun · Tonal Horizon · Mountain · Moon Phases · Sun & Moon · Arch · Balance · Vessel · Ink Horizon · Single Stem · Pampas. They group into 4 gallery-wall "sets of 3": **Horizons, Celestial, Forms, Botanica**.
- **Soft goods — seamless patterns** → cushion covers, tea towels, totes, notebooks (fabric/wallpaper are a later phase).

**Fulfilment model = same as the existing print store:** the site is the catalogue; **Gelato** prints & ships; **Etsy** is the checkout. **No new accounts needed.** (Spoonflower would only be for wallpaper/fabric-by-the-yard later; Printful only if we want premium blankets — both optional.)

---

## 2. Current status

| Done ✅ | Remaining ⬜ |
|---|---|
| All 12 poster designs + soft-goods patterns | Deploy the print files (git push — blocked on a merge conflict) |
| Print-ready files rendered + hosted path | Create the products in Gelato (bulk-from-URL) |
| Gelato bulk-import CSVs (per product template) | Order samples + QC |
| Etsy listing copy | Publish listings on Etsy |
| Storefront page `/shop/home-goods/` (deployed, shows "Coming soon") | Flip buy buttons + merchandise site-wide |
| Pricing / catalogue | — |

`/shop/home-goods/` is **already live** with the 12 posters and a waitlist. The buttons say "Coming soon" because no Etsy listings exist yet.

---

## 3. Where everything lives

Repo root: `C:\Users\CameronHayes\OneDrive - GPWMAD01\Desktop\Calm & Oak\`

- **Poster print files (hosted):** `assets/img/print-files/poster-<slug>.png` (3000×4000)
- **Pattern print files:** `05-home-goods/print-ready/gelato/` and hosted copies in `assets/img/print-files/`
- **Gelato import CSVs:** `05-home-goods/gelato-imports/` → `gelato-wallart.csv` (12 posters), `gelato-mug.csv`, `gelato-tote.csv`, `gelato-notebook.csv`
- **Etsy listing copy:** `05-home-goods/ETSY-LISTINGS.md`
- **Pricing / SKUs:** `05-home-goods/CATALOG.csv`
- **Deeper reference:** `05-home-goods/LAUNCH-QC-PLAYBOOK.md`, `HOME-GOODS-GELATO-GUIDE.md`
- **Storefront:** `shop/home-goods/index.html` (live); `shop/wallpaper/` + `shop/home-textiles/` (parked for later phase)
- **Design source (if a design needs re-rendering):** Python — patterns/posters are generated procedurally; the scripts produce the files in `05-home-goods/`. (Claude can regenerate any of these on request.)

---

## 4. Go-live — do these in order

### Step 1 — Deploy the print files (git)
The repo is stuck mid-merge (`main|MERGING`) because the auto-sync tool and prior edits collided in OneDrive. Resolve + push from **Git Bash**:
```
cd "/c/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
git checkout --theirs "the-edit/index.html"
git add -A
git commit --no-edit
git push
```
- `--theirs` keeps the good remote copy of the magazine page (the local one is truncated).
- If push is rejected: `git pull --no-rebase --no-edit`, re-run the `checkout --theirs` if it re-conflicts, then `git add -A && git commit --no-edit && git push`.
- **Prevent repeats:** pause the "Site updates" auto-commit tool while working, and ideally move the working repo **out of OneDrive** (keep OneDrive for backups only). A `.gitattributes` is already added to stop line-ending churn.

### Step 2 — Verify the print URLs are live
After Cloudflare deploys (~30s), open in a browser — should show the image, not a 404:
`https://calmandoak.com/assets/img/print-files/poster-layered-hills.png`

### Step 3 — Create products in Gelato (bulk-from-URL)
> Do **not** use the design-editor "upload" route — use bulk create. One template at a time:
1. Gelato → **Create product → Single product** → pick the template:
   - Wall art → **Posters → Museum-Quality Matte Paper Poster** (matches the existing prints)
   - **Mug 11oz**, **Tote bag**, **Notebook**
2. Configure one product once (sizes, mockups), set the price from `CATALOG.csv`.
3. Use **Bulk create** → import the matching CSV from `05-home-goods/gelato-imports/` → for each row use **"Upload from URL"** with the row's Print File URL.
4. Toggle **"Show products to store visitors"** to push to Etsy. Repeat for all four CSVs.
- Pricing: Wall-art print $32 · Canvas $72 · Framed $84 · Mug $19 · Tote $28 · Notebook $19. **Verify Gelato base costs first** and keep ~2–2.4× margin.

### Step 4 — Sample + QC (non-negotiable)
Order **one sample per product line** (a poster, a mug, a tote, a notebook). Check colour match, scale, print sharpness, and feel. Ship only what passes. Full checklist in `LAUNCH-QC-PLAYBOOK.md`.

### Step 5 — Publish on Etsy
Push/publish the drafts (or list manually from `ETSY-LISTINGS.md`). Bulk-publish is ~$0.20/listing.

### Step 6 — Record the live URLs
Paste each product's live Etsy URL into the `listing_url` column of `CATALOG.csv` and set `status = live`.

### Step 7 — Wire the site + go fully live
1. In `shop/home-goods/index.html`, change each card's `href="#waitlist"` → its `listing_url`, and the CTA "Coming soon →" → "Shop on Etsy →".
2. Add a **Home Collection brand section** to the homepage (`index.html`), add it to the main **nav** and to `sitemap.xml`, and cross-link it from relevant journal/shop pages.
3. `git add -A && git commit -m "Home Collection live" && git push`. Request indexing for the new pages in Search Console.

### Step 8 — Market it
Pin the mockups (and real sample photos) to a new Pinterest board; email the waitlist via MailerLite; schedule a few Pinterest pins per product.

---

## 5. Known gotchas
- **Gelato's design editor can't be automated** (sandboxed canvas + native file dialog). Always use **bulk-create-from-URL**, which is why Step 2's deploy matters.
- **Repo lives in OneDrive** → causes git index corruption / merge conflicts when two processes touch it. Pause auto-sync during git work; consider relocating the repo.
- **Samples & publishing require a human** (money + go-live) — don't skip the sample.
- **Photoreal mockups:** current product mockups are clean but procedural. For Gemini photoreal versions, point Chrome's download folder at the repo, then generate — otherwise images land in Downloads.

---

## 6. Optional later phases
- **Spoonflower** account → wallpaper, murals, fabric-by-the-yard (the parked `/shop/wallpaper/` + `/shop/home-textiles/` pages are ready for it).
- **Printful** → premium throw blankets.
- Roll the remaining pattern colourways out as seasonal "drops" for Pinterest + email.
