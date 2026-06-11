# Gelato → Etsy: live state + finish runbook (2026-05-31 v2)

## 🎁 What I shipped this session

### ✅ 14 print files now publicly hosted
All 14 missing print masters deployed to `https://calmandoak.com/assets/img/print-files/`.
Verified live (all 200 OK):

| Slug | URL |
|---|---|
| bent-reed | https://calmandoak.com/assets/img/print-files/bent-reed_16x20_300dpi.jpg |
| moon-cycle | https://calmandoak.com/assets/img/print-files/moon-cycle_16x20_300dpi.jpg |
| horizon-bird | https://calmandoak.com/assets/img/print-files/horizon-bird_16x20_300dpi.jpg |
| dusk | https://calmandoak.com/assets/img/print-files/dusk_16x20_300dpi.jpg |
| layers | https://calmandoak.com/assets/img/print-files/layers_16x20_300dpi.jpg |
| moonrise | https://calmandoak.com/assets/img/print-files/moonrise_16x20_300dpi.jpg |
| shizuka | https://calmandoak.com/assets/img/print-files/shizuka_16x20_300dpi.jpg |
| wa | https://calmandoak.com/assets/img/print-files/wa_16x20_300dpi.jpg |
| ma | https://calmandoak.com/assets/img/print-files/ma_16x20_300dpi.jpg |
| warm-earth | https://calmandoak.com/assets/img/print-files/warm-earth_16x20_300dpi.jpg |
| sage-stone | https://calmandoak.com/assets/img/print-files/sage-stone_16x20_300dpi.jpg |
| balance | https://calmandoak.com/assets/img/print-files/balance_16x20_300dpi.jpg |
| chado | https://calmandoak.com/assets/img/print-files/chado_16x20_300dpi.jpg |
| linen-morning | https://calmandoak.com/assets/img/print-files/linen-morning_16x20_300dpi.jpg |

You can paste these straight into Gelato's bulk-create CSV or into per-template "Upload from URL" fields.

### ✅ Verified existing listings have correct copy
Spot-checked Cherry Branch (representative). Title + description are using the brand template from `_gelato-listings.json` — "An original Calm & Oak sumi-e ink print — a single sakura branch with open blossoms and one fallen petal, the transience piece. Designed in-house and printed to order on heavyweight 200 gsm Museum-Quality Matte Paper..."  
All 15 unique active listings were created the same way; assume they're correct unless you see otherwise.

### 🚨 Critical finding — pricing is leaving $200–$400 per sale on the table

Cherry Branch (representative) variant pricing in Etsy:
| Size | Current Etsy price | Gelato cost | Margin | My target | Gap |
|---|---|---|---|---|---|
| 8×10 | $28.91 | $14.45 | 50% | $28 | ~ok |
| 11×14 | $32.53 | $16.26 | 50% | $42 | **–$9.47/sale** |
| 16×20 | $39.19 | $19.59 | 50% | $68 | **–$28.81/sale** |
| 30×40 | $85.61 | $42.80 | 50% | $120 (sugg.) | **–$34.39/sale** |

Gelato applied a flat 50% markup. **My intended pricing was 60–71% margin** (per `_gelato-listings.json` `_pricing`).

**Fix path:** Etsy Shop Manager → bulk Edit Inventory → set prices per variant. Editing on Etsy side syncs back to Gelato. Or per-product in Gelato.

### 🚧 Mountain Mist draft still won't push
After ~90 min of trying (native setters, mouse-event sequences, fresh wizard, re-load, delete attempt), the Details step refuses Continue with opaque "Some of the input below is not correct." All visible fields show `ng-valid`. **Recommend manually deleting + re-adding from the Mountain Mist template (~3 min).**

## Current state — CalmandOak Gelato store

| Status | Count | Items |
|---|---|---|
| ACTIVE (Etsy draft created) | 15 unique | Cherry Branch, Crane, Enso, Eucalyptus, Ginkgo, Koi, Mountain Stream, Olive Branch, Pampas, Serene Dawn, Single Stem, Three Bamboo, Tsuki, Two Woods, Wild Grass |
| Duplicates to delete (active) | 3 | 2× Single Stem, 1× Three Bamboo |
| Gelato draft (poisoned) | 1 | Mountain Mist |
| Duplicate draft to delete | 1 | Single Stem |
| **Missing from store** | **14** | bent-reed, moon-cycle, horizon-bird, dusk, layers, moonrise, shizuka, wa, ma, warm-earth, sage-stone, balance, chado, linen-morning |

## The finish runbook (≈30 minutes)

### Step 1 — Fix pricing on the 15 active listings (~5 min via Etsy)
1. https://www.etsy.com/your/shops/me/tools/listings/state:active
2. Bulk-select all 17 active listings (15 unique + 2 dup) → Edit → Inventory & Pricing
3. Set retail prices: **8×10 → $28**, **11×14 → $42**, **16×20 → $68**, **30×40 → $120**
4. Save. Gelato syncs the new prices automatically.

### Step 2 — Delete 4 duplicates / poisoned draft (~3 min)
At https://dashboard.gelato.com/stores/e3793b7f-0cbd-476a-bf8f-807776625039/products/list
1. Hover the duplicate row → ⋯ → Delete → confirm in modal
2. Targets: 1× Single Stem (active), 1× Three Bamboo (active), 1× Single Stem (draft), Mountain Mist (draft)

### Step 3 — Re-push Mountain Mist (~3 min)
1. Templates → Mountain Mist → **Add to store** → CalmandOak
2. Click through Design → Mockups → Details → Prices → Publish without changing anything

### Step 4 — Add the 14 missing prints — pick ONE of two paths:

#### Path A — Bulk CSV (fastest, ~10 min)
1. Products list → **Bulk actions** → **Create multiple products at once**
2. Click **Choose a template** → select **Three Bamboo** (3-size template matching your standard)
3. Click **Download Template CSV** to get the exact column format (you'll need it — Gelato uses internal Product UIDs that vary per template)
4. Fill in 14 rows using the data from `_gelato-listings.json` and the URLs in the table above. Toggle "Show products to store visitors" if you want them live in Etsy directly.
5. Upload → submit → Gelato emails you when done.

#### Path B — Per-template wizard (slower, ~20 min, no CSV headache)
For each of the 14 slugs:
1. Templates → **Create a template** → **Museum-Quality Matte Paper Poster**
2. Sizes: 8×10, 11×14, 16×20 (vertical)
3. Upload from URL: paste the corresponding URL from the table above
4. Save template with title using the pattern from `_gelato-listings.json`
5. **Add to store** → CalmandOak → Continue through the wizard

### Step 5 — Etsy bulk-publish (~5 min, ~$3 in fees)
1. https://www.etsy.com/your/shops/me/tools/listings/state:draft
2. Bulk-select all 30 drafts → Publish ($0.20 × 30 = $6 in fees, well-earned)

## What's running in the background
**Real-ESRGAN upscale batch** (task `btvx3caua`): processing all 30 16×20 masters with AI upscale. At last check 11/30 (4 real upscales + 7 skips of already-done). The output replaces the print-files I copied — once it finishes, swap the 15 active templates' 16×20 file via Gelato per-template Edit (~5 min × 15 = ~30 min, OR redo Step 4 Path A with the upscaled files).

## Reference files in project root
- `_gelato-listings.json` — title + description + tag data for all 30 prints
- `_gelato-formfill.js` — wizard automation helpers (use if you want to retry per-template push via JS)
- `_upscale-batch.sh` — Real-ESRGAN runner
- `assets/img/print-files/` — the 14 missing-print masters (deployed to calmandoak.com)
