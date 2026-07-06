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

---
## PHASE 2 COMPLETE (2026-07-06) — except videos
All 56 listings LIVE on Etsy (≥10 photos each, $11.20 fees), 7 sections assigned,
site wired + deployed + indexing requested. Remaining: Step 1D videos — 1/56 done
(Layered Hills), Veo daily cap = ~1-few/day. Continue daily: generate per runbook prompt
+ "slow cinematic camera push-in, 8 seconds, no people, no text", download (lands in
assets/the-edit/img), attach via listing editor video slot, Save draft→publishes change.
Order: posters (11 left) → canvas → framed → mugs → totes → digital (optional for digital).
tached (poster drafts, saved as DRAFTS):
1. Layered Hills 4531654012 ✅ — video attached to the video slot ("Featured", 1 video slot
   remaining), Save draft confirmed ("Your listing has been successfully updated", editor exited).
   File staged: 05-home-goods/mockups/gemini-scenes/video-01-layered-hills.mp4 (2.6 MB, 16:9, ~8s).

Remaining for 1D (day 2+, in order): Rising Sun 4531644671, Tonal Horizon 4531654536,
Mountain 4531668124, Moon Phases 4531674028, Sun and Moon 4532165682, Arch 4531660859,
Balance 4531662908, Vessel 4531661987, Ink Horizon 4531643673, Single Stem 4531676170,
Pampas 4531675906 — then canvas, framed, mugs, totes.

PROVEN VIDEO RECIPE (day 1):
- Gemini sidebar → "Videos" (opens "Create videos" surface, composer says "Describe your video";
  dismiss the one-time "Create with Omni" onboarding modal via "Try it"). Landscape 16:9 default.
- Prompt = runbook scene prompt + ", slow cinematic camera push-in, 8 seconds, no people, no text"
  (dropped "4:5" for video). Submit = blue arrow coordinate click (find "Send message" is flaky
  on this surface); verify user-query count + URL gets a chat id. Each video prompt starts a NEW
  chat — follow-up prompts in the same chat also work but land in a new conversation anyway.
- Generation ≈ 2 min → "Your video is ready!". If the stream wedges, reload chat URL; if chat
  loads blank, click it in sidebar Recents (in-app navigation renders it).
- Download: hover over player → download icon top-right (1112,384-ish) → toast "Downloading
  video..." → lands in assets/the-edit/img as Photorealistic_interior_Japan.mp4 (prompt-derived
  name — MOVE/RENAME IMMEDIATELY, every poster prompt yields the same filename → collision).
- Etsy attach: listing-editor/edit/<id>#media → the 2 file inputs (name=listing-media-upload,
  accept includes video/mp4) — tag input[0] with aria-label via JS → find → file_upload the mp4
  → ~70s processing (video tile appears with play button) → scroll to bottom bar ("1 unsaved
  change. You changed: Video.") → click Save draft → editor exits + green success toast.

### Photo count verification + digital top-up — DONE ✅ (2026-07-06, session "Phase 2 photo counts")

**Part 1 — canvas/framed verification (24 listings): ALL at exactly 10 photos, none <10, nothing changed.**
- Canvas (10/10 photos each): Layered Hills 4532238248, Rising Sun 4532253510, Tonal Horizon 4532253734,
  Mountain 4532252384, Moon Phases 4532252802, Sun and Moon 4532241205, Arch 4532241141,
  Balance 4532252842, Vessel 4532241071, Ink Horizon 4532239869, Single Stem 4532240897, Pampas 4532242041.
- Framed (10/10 photos each): Layered Hills 4532246830, Rising Sun 4532249255, Tonal Horizon 4532247979,
  Mountain 4532262046, Moon Phases 4532248551, Sun and Moon 4532247339, Arch 4532259814,
  Balance 4532249119, Vessel 4532261194, Ink Horizon 4532259756, Single Stem 4532248429, Pampas 4532261908.
- Count method: editor #media page, photos = 20 − N from the "Add photos … N remaining" counter.
  ⚠ Regex must anchor on "Add photos" — the VIDEO slot's "2 remaining" appears FIRST in innerText.

**Part 2 — digital listings topped up 2 → 10 photos, saved as DRAFTS (verified "10 remaining" after save,
fresh reload, still Draft, "You have no unsaved changes"). All 12:**
4533284058 LH, 4533287232 RS, 4533274503 TH, 4533275069 MT, 4533275691 MP, 4533276279 SM,
4533290390 AR, 4533290938 BA, 4533277953 VE, 4533278497 IH, 4533292622 SS, 4533279861 PA.

Method used: Etsy-CDN photo reuse was NOT possible (in-page fetch of i.etsystatic.com blocked by the
automation security filter — "[BLOCKED: Cookie/query string data]"), so per the fallback plan generated
8 local PIL derivatives per design from assets/img/print-files/poster-<slug>.png (3000x4000) into
**05-home-goods/mockups/digital-extras/<slug>-01..08.jpg** (jpg q92, warm bg #faf6f0):
01 full-art card, 02-04 detail crops (top-left/center/bottom), 05 square crop, 06 4x5 crop,
07 size-guide card, 08 two-up (art + 50% copy). Script: session outputs/make_digital_extras.py.
Upload recipe (worked 12/12): #media → tag file inputs via JS → find → file_upload 8 jpgs to
input[1] (input[0]=video slot) → wait ~40s → screenshot → Save draft click at **(1237,707)**
(button moved from the old 1201,741) → editor exits + "successfully updated".

⚠ REVIEW, Cameron: size-guide card (image 07) says "Print up to 24 x 36 in • 300 DPI" (wording from
the brief). The actual file is 3000x4000 px = 10x13.3 in at 300 DPI (3:4 ratio; 24x36 is 2:3 and would
print at ~111 DPI). If you want strictly accurate copy, regenerate 07 with adjusted text.
Nothing published; no physical listings modified.

### Steps 3+4 publish + sections — DONE ✅ (2026-07-06, session "Steps 3+4")

**PUBLISHED: all 56 collection listings, in 6 query-filtered batches on the drafts grid**
(select-all + Publish + fee dialog confirm; Cameron pre-approved $0.20/listing):
- Posters ×12 (query "Wall Art Print"), Canvas ×12, Framed ×12, Mugs ×4, Totes ×4,
  Digital ×12 (query "Printable"). Every batch got "Huzzah! You've published N listings!".
- Total renewal fees: **$11.20** (56 × $0.20). New expiration for all: Nov 6, 2026.
- Verified after: shop-wide **Draft = 0, Active = 117** (61 pre-existing + 56 new).
- **Junk draft ("Museum-Quality Matte Paper Poster 13x18cm/5x7"): not found anywhere** —
  Draft/Expired/Inactive all 0 before AND after my batches; every batch count matched the
  expected group size exactly, so it was NOT published by us. It appears to have been
  deleted before this session.
- No listings failed to publish.

**SECTIONS created (7 new, shop now uses 12 of 20):** Art Prints, Canvas, Framed, Mugs,
Totes, Digital Downloads, Originals. Section IDs: Art Prints 59272935, Canvas 59272947,
Framed 59256280, Mugs 59272973, Totes 59272987, Digital Downloads 59256328, Originals 59273011.

**ASSIGNMENTS (all 56 done, verified via sidebar Sections filter counts):**
posters→Art Prints (12), canvas→Canvas (12), framed→Framed (12), mugs→Mugs (4),
totes→Totes (4), digital→Digital Downloads (12). "No Section" filter shows 0.
- ⚠ Query gotcha: on ACTIVE listings Etsy's query matching is fuzzy — "Wall Art Print"
  matched 60 pre-existing actives and "Printable" matched 29 (tags), so for those two groups
  the selection was done by LISTING ID via JS checkbox clicks (350 ms pacing), not select-all.
  Canvas/Framed/Mug/Tote queries were clean (0 pre-existing matches) → plain select-all.
- **"Originals" left EMPTY (deliberate):** the 61 pre-existing active listings turned out to
  already be organized into the 5 older thematic sections — Sumi-e Ink (21), Botanical Line (13),
  Minimalist Landscapes (13), Japanese Calligraphy (7), Tonal Studies (7) = 61 exactly.
  (The Manage Sections modal misleadingly showed "0" next to each — the sidebar filter has the
  real counts.) Re-assigning them to "Originals" would have destroyed that curation, so skipped.
  Cameron: delete the empty "Originals" section or repurpose as you like.

**LIVE URLS:** full type,design,listing_id,url mapping for all 56 saved to
`05-home-goods/live-listing-urls.csv`. Spot-checked 3 public pages live with correct titles:
poster Layered Hills 4531654012, mug Ensō 4532110660, digital Pampas 4533279861.

**Recipe notes:** Change-section dialog = Editing options → "Change section" (find ref; a
coordinate click there once hit "Change return & exchange policies" — cancelled, nothing applied).
The dialog's `#section-select` is a native select: set value via HTMLSelectElement prototype
setter + dispatch change event, then click Apply (find ref). Bulk-publish select-all checkbox
at (309,211); fee-dialog Publish at (975,571). Throttled-tab screenshots time out constantly —
just wait 4s and re-screenshot; clicks still land.

**Remaining:** Step 1D videos day 2+ (11 posters, then canvas/framed/mugs/totes), Step 5 site wiring.

### Photo brand spec + reorder recipe (2026-07-06, session "Brand photo spec") — see **BRAND-PHOTO-SPEC.md**
Older-listing photo formula documented + gap analysis of new listings; reorder PROVEN on Layered Hills
poster 4531654012 (Gemini scene now Featured photo #1, published, public page verified). Recipe: editor #media, flexWrap='nowrap' on tile container, JS focus tile, trusted keys Return/Left×N/Return, Publish changes.
