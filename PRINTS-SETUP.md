# Print Shop — production & go-live runbook

The first owned-product vertical. The preview + waitlist page is **live** at `/shop/prints/` with all 30 designs on display. This doc is the single source of truth for turning that gallery into a shop a customer can actually buy from.

> **Legend:** **(you)** = needs your account / payment / signature — I can't do it for you (and by policy I never create accounts or enter payment on your behalf). **(me)** = I'll do it on your "go," no spend or only the image spend you approve.

_Last updated 2026-05-29. Supersedes the 4-print version of this doc and the print sections of PHASE-D-LAUNCH-PLAN.md._

---

## 1. The reality check (read this first)

The `/shop/prints/` page shows **30 finished-looking prints**. They are genuinely beautiful — but here is the thing that matters for production:

**Every one of the 30 print assets on disk is a styled _room mockup_, not a print file.** Each JPEG shows the artwork already framed, hung on a wall, above a floating shelf with a vase or bowl, shot at a slight angle with shadows. A few (e.g. "Serene Dawn") even have the title text burned into the image.

- Web gallery versions: `assets/img/prints/*.jpg` (50–100 KB each — screen only).
- "Source" versions: `C:\Users\CameronHayes\Pictures\Mockups\co-print-*.jpg` (4 originals @ 3712×4608) and `print-*-source.jpg` (26 @ 1856×2304).
- **All of them are mockups.** None is flat, front-on artwork.

If you uploaded any of these to a print-on-demand service, the customer would receive a poster of *a framed picture on someone's wall*, including the wall, the shelf and the shadow. So:

> **There is currently zero print-ready artwork. Before a single print can be sold, the flat artwork has to be reconstructed from each mockup.** This is the real (and only) hard part of going live, and it is solved below.

---

## 2. The production pipeline (proven, repeatable)

Two steps turn any mockup into Gelato-ready files. I built and tested the whole chain on **Ensō** — a real flat master is sitting ready right now (see §3).

**Step 1 — Reconstruct the flat artwork (Gemini image-to-image).** Feed the high-res mockup in, prompt the model to output *only* the artwork — flat, square-on, full-bleed, no frame / wall / shelf / shadow / perspective — preserving the exact ink texture, paper tone and seal. One generation per design (occasionally two to get it clean). Output ≈ 3712×4608.

**Step 2 — Make the sized print masters (`_print-prep.js`, sharp).** The script (repo root, gitignored) center-crops to each frame ratio, scales with lanczos3, embeds **300 DPI + sRGB**, and writes max-quality JPEG with 4:4:4 chroma (keeps ink lines and kanji crisp). Run:

```
node _print-prep.js "C:\path\to\flat-art.jpg" <slug>
```

It outputs three masters per design into `C:\Users\CameronHayes\Pictures\Calm-Oak-Print-Masters\`:

| Size | Pixels @ 300 DPI | Notes |
|---|---|---|
| 8×10  | 2400×3000 | true 4:5, no crop |
| 11×14 | 3300×4200 | crops ~2% of width — imperceptible |
| 16×20 | 4800×6000 | mild 1.29× upscale, clean |

**Sizes we can honestly sell: 8×10, 11×14, 16×20.** The native art ratio is ~4:5. Drop **5×7** (1.4 ratio) and **18×24** (1.33 ratio + too aggressive an upscale) from the launch — the page copy should match (see §6).

---

## 3. What is ready right now

✅ **All 30 designs are flat, print-ready, in three sizes each — 90 files, uploadable to Gelato today.** Reconstructed and processed end-to-end. The set covers all six series: 9 sumi-e (Ensō, Bent Reed, Crane, Mountain Mist, Bamboo, Cherry Branch, Koi, Mountain Stream, Tsuki); 6 botanical line (Single Stem, Eucalyptus, Olive Branch, Pampas, Ginkgo, Wild Grass); 6 landscapes (Serene Dawn, Moon Cycle, Horizon, Dusk, Layers, Moonrise); 3 calligraphy (Shizuka 静, Wa 和, Ma 間); 3 tonal (Two Woods, Warm Earth, Sage & Stone); 3 stills (Balance, Chado, Linen Morning). In:
```
C:\Users\CameronHayes\Pictures\Calm-Oak-Print-Masters\
  <slug>_8x10_300dpi.jpg      <slug>_11x14_300dpi.jpg      <slug>_16x20_300dpi.jpg     × 30 designs = 90 files
```
File naming matches the website slug for each print (e.g. `enso_*`, `cherry-branch_*`, `shizuka_*`). All masters are 300 DPI, sRGB, JPEG quality 95, 4:4:4 chroma — Cowork can drag-and-drop them into Gelato as-is.

(Twelve earlier files made directly from the *mockups* are quarantined in `_rejected-mockup-derived/` — do **not** upload those; they contain the wall and frame.)

---

## 4. Vendor decision — Gelato (unchanged from Phase D)

Need: prints to order on heavyweight matte fine-art paper, ships flat/rolled, no inventory, integrates with a simple checkout, doesn't dilute the brand.

| Provider | Paper / quality | Margins | Integration | Brand fit |
|---|---|---|---|---|
| **Gelato ✅** | 200 gsm matte fine-art (Hahnemühle/Enhanced Matte). Print-near-buyer → sub-week global delivery, lower carbon. | Strong, esp. large sizes | Shopify, Woo, **Etsy**; no hosted checkout | ★★★★★ calm + sustainability story |
| Printful | 200 gsm Enhanced Matte. Largest catalogue. | OK | Shopify, Squarespace, Etsy, hosted storefront | ★★★★ professional but generic |
| Printify | Varies by partner | Highest (cheapest base) | Shopify, Etsy, Woo | ★★★ quality variance = brand risk |
| Print Aura | Premium UK fine-art | Lower leverage | Shopify, Woo | ★★★★ great paper, US shipping cost |

**Pick: Gelato.** Best paper at our price point, Hahnemühle is name-checkable on the product page ("museum-grade matte fine-art paper"), and Etsy is available as a no-build channel to test demand first.

---

## 5. Pricing & margins (anchor to "gallery print," not "$9.99 poster")

| Size | Gelato base (US, approx) | Sell | Margin |
|---|---|---|---|
| 8×10  | ~$8  | **$28** | ~71% |
| 11×14 | ~$11 | **$42** | ~74% |
| 16×20 | ~$18 | **$68** | ~74% |

Base prices are illustrative — verify on the Gelato dashboard at signup. Launch with a single subscriber discount (e.g. 15% via the Print Launch List). The highest-AOV move later is a **"gallery wall set of 3"** bundle.

---

## 6. Owner go-live checklist

1. **(you)** Sign up at **gelato.com** — free, no minimums. Add payment + tax info.
2. **(you)** Upload the **Ensō** masters from `Calm-Oak-Print-Masters\` and set up the product (sizes 8×10 / 11×14 / 16×20).
3. **(you)** Order **one 11×14 proof** (~$11) before going public — check colour, paper weight, packaging. This is the moment to catch any issue cheaply.
4. **(you)** Pick the checkout channel — in rising order of effort:
   - **(a) Etsy + Gelato — recommended for launch.** Create the "Calm & Oak" Etsy shop, list the prints, connect Gelato for auto-fulfilment. Then **(me)** swaps the `/shop/prints/` CTA from the waitlist form to "Shop the collection on Etsy →". No site-code build.
   - (b) **Snipcart + Gelato** — keeps checkout on calmandoak.com. ~$10/mo + 2%, ~1 day of integration, needs a webhook endpoint. **(me)** can wire it.
   - (c) **Shopify + Gelato** — most control, $29/mo, heaviest setup.
5. **(me)** Flip the page from waitlist → live: drop "Opening soon," replace the hero form with the shop CTA, add real `Product` schema with prices, keep the signup block at the bottom re-framed as "new prints, occasional drops," and fix the advertised sizes line (currently lists 5×7…18×24 → should read **8×10, 11×14, 16×20**).
6. **(you+me)** Launch email to the Print Launch List (MailerLite group `188519699722536376`): one email, the live prints, the discount code, one CTA. **(me)** drafts + builds the automation; **(you)** approve + send.
7. **(me)** After launch, mention prints in the newsletter **once a month max** — this is the calm brand, don't burn the list.

---

## 7. All 30 masters complete ✅

Originally this section asked whether to lean (4 launch designs) or go full collection (30). **You chose full collection.** All 30 flat masters were reconstructed via Gemini image-to-image and sized through the pipeline — they sit in `Calm-Oak-Print-Masters\` ready for Cowork to upload.

---

## 8. Why prints are the right first owned product

Zero inventory, ~70%+ margin, on-brand (wall art is already a decor category), a natural cross-sell with the affiliate frames already in the shop — and the moment Calm & Oak sells something only Calm & Oak makes, it stops being a curation site and becomes a brand.
