# Phase 2 Status — Step 1A Mockups (2026-07-04, session "Phase 2 photos")

## THE RECIPE THAT CHANGED EVERYTHING
Gelato **Bulk actions → Bulk edit → Edit mockups** copies a reference product's mockup setup
to any list of products (CSV: "Product ID","Product Title"), re-rendering each product's own
design into the same scenes. With "Publish images to store" checked, results push straight
to the Etsy drafts. Only ONE bulk op can process at a time — submitting a second silently
no-ops until the first completes.

Direct mockup-editor URL (skips clicking through product page):
`https://dashboard.gelato.com/e-commerce-product-wizard/edit-media/e3793b7f-0cbd-476a-bf8f-807776625039/<productId>`

Mockup picker notes:
- Click "Free" price filter first. Poster/canvas/framed have 17 free mockups; mugs only 6; totes only 5.
- Checkbox clicks via JS work but renderer freezes if clicked fast — 1 click per ~4s, re-read the
  "N/20 images selected" counter (authoritative; DOM checkboxes desync).
- "Publish to Store" click sometimes needs a trusted (coordinate) click, not JS .click().

## DONE ✅
- Full product-ID inventory saved: `05-home-goods/gelato-product-ids.csv` (44 products).
- Bulk CSVs saved in session outputs (bulk-mockups-{posters,canvas,framed,mugs,totes}.csv).
- **Posters 12/12**: Layered Hills reference (10 mockups) → bulk op completed 11/11, published.
- **Canvas 12/12**: Layered Hills canvas reference (10 mockups) → completed 11/11, published.
- **Framed 12/12**: Layered Hills framed reference (10 mockups) → completed 11/11, published.
- **Mug reference** (Seigaiha): all 6 free mockups selected + published.
- **Tote reference** (Seigaiha): all 5 free mockups selected + published.
- Spot-check: Rising Sun poster kept its own design with new mockups (bulk copy renders per-product design). 

## STEP 1A COMPLETE ✅ (2026-07-05)
- Mugs bulk op 7b51ca9d: COMPLETED 3/3.
- Totes bulk op b13053a6: COMPLETED 3/3.
All 44 collection products now carry their full mockup sets, published to Etsy drafts:
posters/canvas/framed = 10 mockups each; mugs = 6 (all free ones); totes = 5 (all free ones).

## REMAINING for 1A
Nothing. Optional: spot-check a few Etsy drafts for photo counts.

## NEXT STEPS (per PHASE-2-RUNBOOK)
- 1B Gemini scenes: needs Cameron's **Downloads folder mounted** to move generated images into
  Gelato/Etsy. Not mounted in this session.
- 1C attach scenes: Gelato edit-media → "Upload your own" → use Chrome find + file_upload on the
  file input (proven; never click the button — native dialog).
- Step 2 digital listings ($16 ×12), Step 3 publish all drafts, Step 4 sections, Step 5 site.

---
## UPDATE — Step 1B session (2026-07-05)

### 1A CONFIRMED DONE
Totes op b13053a6 completed 3/3. All 44 products have mockups on their Etsy drafts
(spot-check: Layered Hills poster draft = 9 photos). **Etsy's photo cap is 20, not 10** —
the listing editor says "Add up to 20 photos and 2 videos" — so scenes ADD to, not replace, mockups.

### 1B state — Gemini scenes
- Gemini chat with the poster scene pack: https://gemini.google.com/app/743de6116645b026
  Prompts sent in order: 1 Layered Hills, 2 Rising Sun, 3 Tonal Horizon, 4 Mountain,
  5 Moon Phases, 6 Sun and Moon, 7 Arch, 8 Balance, 9 Vessel, 10 Ink Horizon,
  11 Single Stem, 12 Pampas. (A couple near the end may not have submitted — regenerate
  any missing with the PHASE-2-RUNBOOK prompt pack; same wording.)
- Quality is on-brand (Japandi, oak/linen, window light).

### ⚠ BLOCKER FOUND: automated downloads don't work
Chrome silently drops downloads triggered by the automation (Gemini download button,
JS anchor clicks — nothing lands in Downloads; no Save dialog either). **A human click works.**
So the pipeline is: Claude generates → CAMERON clicks the download icon on each image
(hover top-right of image) → files land in C:\Users\CameronHayes\Downloads as UUID.jpg →
Claude renames + attaches.

### 1C recipe change (better than Gelato upload-your-own)
Attach scenes directly in the ETSY listing editor (Shop Manager → Listings → Drafts →
open listing → Photo & Video → "Add photos" file input) using find + file_upload on the
file input. Avoids Gelato republish; images must be in a session-shared folder
(Downloads is mounted). Room for 11 more photos per poster listing.

### Also
- Gelato "Magic mockups"/AI scenes: not confirmed free (Gelato+ trial banner showing);
  per Cameron's rule (only if $0) we stayed with Gemini.
- Mugs/totes free mockups max out at 6/5 — Gemini scene prompts for mug/tote are in the runbook.
- Remaining after 1B/1C: Step 1D videos (Veo, daily cap), Step 2 digital listings ($16×12),
  Step 3 publish all, Step 4 sections, Step 5 site wiring.

### 1B FINAL — ALL 12 POSTER SCENES GENERATED ✅ (verified 12 turns in chat)
Order in chat: 1 Layered Hills, 2 Rising Sun, 3 Tonal Horizon, 4 Mountain, 5 Moon Phases,
6 Sun and Moon, 7 Arch, 8 Balance, 9 Vessel, 10 Ink Horizon, 11 Single Stem, 12 Pampas.
Cameron: refresh the chat, click download (hover, top-right icon) on each image →
files land in Downloads as UUID.jpg, in this order.
Optional later: canvas/framed variants + mug/tote scenes (prompts in PHASE-2-RUNBOOK).

Working submit recipe (Gemini fights automation):
1. Click composer, type prompt (verify text via [contenteditable] innerText).
2. Submit = find "Send message" button ref → trusted click (Return works only sometimes).
3. Verify document.querySelectorAll('user-query').length incremented; if not, wait & re-click.
4. Background-tab throttling wedges the response stream ("Stop response" forever, image fine
   server-side) → reload the chat URL between prompts; if the chat loads blank, open it via
   the in-app search (magnifier → "Japandi") and it recovers.
5. If Cameron's own window shows an empty chat: just refresh — content is there.

### Cameron requirement (2026-07-05, IMPORTANT)
Every listing must have **at least 10 pictures** and **one high-quality real-room VIDEO**
(Step 1D Veo — 5-15s muted push-in per design; daily Veo cap means multi-day rollout;
sequence posters → canvas → framed → mugs → totes).
Current photo counts: posters 9 mockups + scenes = OK once attached; canvas/framed ~10 mockups
+ scenes; mugs 6 + need 4+ scenes each; totes 5 + need 5+ scenes each → generate mug/tote
scenes (prompt pack in runbook) to reach 10.

### 1C DONE for posters ✅ (2026-07-05)
All 12 Gemini scenes attached + saved to the poster Etsy drafts (12/12). Scenes staged in
05-home-goods/mockups/gemini-scenes/ (scene-01..12, 1856x2304 jpg). Chrome downloads land in
assets/the-edit/img (NOT Downloads!). Etsy attach recipe: listing-editor/edit/<id>#media →
find "Add photos file input" → file_upload → wait ~40s → SCREENSHOT then click Save draft
(1201,741) — the screenshot wakes the throttled tab; without it the click no-ops.
Poster listing IDs: LH 4531654012, RS 4531644671, TH 4531654536, MT 4531668124, MP 4531674028,
SM 4532165682, AR 4531660859, BA 4531662908, VE 4531661987, IH 4531643673, SS 4531676170, PA 4531675906.

### REMAINING for "10 photos + 1 video" rule
- Posters: 10-12 photos ✓, video ✗ (Step 1D Veo)
- Canvas/framed: ~10 mockups ✓ (could add canvas/framed scene variants later), video ✗
- Mugs: 10 photos ✓ (see below); Totes: 10 photos ✓ (see below); videos ✗ (Step 1D Veo)
- Then: Step 2 digital listings ($16×12) → publish all → sections → sit
---
### Step 5 site wiring — DONE ✅ (2026-07-06, session "Step 5 site")

**What changed (6 site files):**
- `05-home-goods/CATALOG.csv`: all mappable rows filled with live Etsy listing_url + status=live
  (Layered Hills poster/canvas/framed, 4 mugs incl. Sun Arcs→"Sun Arch", 4 totes; Neutral Mudcloth→"Mudcloth").
  Appended 23 rows: 11 new-design posters (CO-RSU/THZ/MTN/MPH/SNM/ARC/BAL/VES/IHZ/SST/PAM-ART, $32) +
  12 digital (CO-*-DIG, $16, margin 16, print_file assets/img/print-files/poster-<slug>.png). Old
  pattern posters/canvas/framed/notebooks without live listings left as draft.
- `shop/home-goods/index.html`: full storefront flip — 6 card sections (Wall art 12, Canvas 12, Framed 12,
  Mugs 4, Totes 4, Digital Downloads 12) = **56 cards, every href a live etsy.com/listing URL,
  CTA "Shop on Etsy →", target="_blank" rel="noopener"**. 0 remaining #waitlist hrefs (signup section
  reworded to "Now live"). Meta description updated. Nav gained "Home Collection".
- Homepage `index.html`: new modest "Home Collection" band (matches Gift Guide band style) linking to
  /shop/home-goods/ + nav link. Footer "Shop" column already listed Home Collection.
- Nav links added on: homepage, shop/home-goods, shop/index.html, the-edit/index.html (site nav is
  per-page; ~135 pages share the pattern — only the required minimum was touched).
- `sitemap.xml`: added /shop/home-goods/ lastmod 2026-07-06 priority 0.9.

**⚠ BUG FOUND + PARTIALLY FIXED — file-truncation disease:** many committed files end mid-tag
(the cowork FUSE mount serves stale/short file sizes; past sessions committed truncated reads).
Fixed in this session: homepage index.html (footer had been MISSING in production since commit 0ea6d5d —
restored tail from eaa2b13), shop/index.html, the-edit/index.html, and **package.json (was invalid JSON —
this had been breaking EVERY Cloudflare git build)** + restored wrangler.jsonc (deleted from HEAD at some
point; restored from bot commit 1f9c0b5). Other pages may still be truncated (footers cut mid-tag) —
worth a sitewide audit. Mount workaround: `mv file file.tmp && mv file.tmp file` refreshes the stale size.

**Git/deploy (auth workaround):** workspace VM has no GitHub or Cloudflare credentials, so:
- Local commit 5aed123 on branch `merchandiser/japandi-workspace-plan` (unpushed — no creds; superseded by web commits, safe to discard or merge).
- Changes shipped to `main` via GitHub web upload (Chrome, logged in as Cammyboy11), 6 commits:
  24e9b2e (homepage+sitemap), 86ace49 (CATALOG), e880d9b (shop hub), 28bddfb (storefront 56 cards),
  d0480d5 (the-edit), f6da753 (package.json+wrangler.jsonc build fix).
- **Deploy: Cloudflare Workers git build SUCCESS** at f6da753 (build 6fd97f8e-3c0e-4081-b84d-06a1d07ab765)
  after the package.json fix. Git-triggered deploys now work again (deploy command `npx wrangler deploy`).
- GitHub-upload recipe: /upload/main/<dir> → find file input → file_upload → type commit msg →
  SCREENSHOT then coordinate-click Commit (ref-clicks no-op on throttled tab; commit button ~ (292,641)).

**Verification (live https://calmandoak.com/shop/home-goods/):** 56 unique etsy.com/listing links,
56 "Shop on Etsy →" CTAs, 0 #waitlist hrefs, nav link present, page URL set exactly matches
live-listing-urls.csv (all 56). Homepage now ends </html> with footer; sitemap valid, contains
/shop/home-goods/.

**Search Console:** URL inspected (was "URL is not on Google / unknown") → **Request Indexing clicked →
"Indexing requested — URL was added to a priority crawl queue"** (sc-domain:calmandoak.com, 2026-07-06).

**Remaining/notes for Cameron:**
- Local repo: `git pull` on main (or discard branch merchandiser/japandi-workspace-plan commit 5aed123).
- Stationery card removed from shop page (notebooks have no live listings yet).
- Step 1D videos day 2+ still pending (11 posters, then canvas/framed/mugs/totes).
- Consider sitewide truncated-footer audit + adding the Home Collection nav link to the other ~130 pages.
