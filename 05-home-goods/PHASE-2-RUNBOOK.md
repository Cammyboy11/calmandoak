# Phase 2 Runbook — Photos, Digital, Publish, Sections, Site
(Approved by Cameron 2026-07-04: Gemini via logged-in web app · digital files $16 · publish after photos)

## Constraint acknowledged once, then we work to the max
Etsy accepts a **maximum of 10 photos per listing**. Target = 10/listing (Gelato mockups + Gemini lifestyle scenes). Gelato's own picker allows 20 mockups but Etsy discards past 10.

## Step 1 — Photos (per design, 12 designs × 4 product types + mugs/totes)
A. In Gelato per product: Edit mockups → select up to 10 free mockups (flat, angled, lifestyle) → save/republish. (Recipe proven; ~1 min/product automated.)
B. Gemini scenes (web app, logged in): use the prompt pack below, Downloads folder is mounted for Claude. 2-3 scenes per design is enough to fill to 10 alongside mockups.
C. Attach Gemini scenes: Gelato → Edit mockups → "Upload your own" (file-input injection recipe proven).

## Gemini prompt pack (prepend to each: "Photorealistic interior photograph, Japandi style, soft natural window light, neutral oak and linen textures, 4:5 —")
1. Layered Hills: framed abstract landscape print with sage/oat/clay waves above a low oak sideboard with a ceramic vase
2. Rising Sun: terracotta concentric-arc print above a linen bed with warm morning light
3. Tonal Horizon: colour-field landscape print in a reading corner with rattan chair
4. Mountain: layered-peak print above a minimalist desk with paper lamp
5. Moon Phases: lunar-phases print above a charcoal sofa with boucle cushions
6. Sun and Moon: celestial pair print on a gallery shelf with dried botanicals
7. Arch: modern arch print in an entryway with oak bench
8. Balance: stacked-stones print in a calm bathroom with stone tray
9. Vessel: stoneware-vase print above a dining table with ceramics
10. Ink Horizon: sumi brushstroke print in a tatami-inspired bedroom
11. Single Stem: botanical line print beside a bud vase on a windowsill
12. Pampas: dried-grass print with real pampas grass in a floor vase
Repeat each with "gallery-wrapped canvas" and "wooden framed" variants; mug prompts: "ceramic mug with wave pattern on oak table beside teapot"; tote: "natural cotton tote with pattern hanging on oak peg rail".

## Step 2 — Digital downloads (12 listings, $16 each)
Etsy Shop Manager → Add listing → type: Digital. Files = the 3000x4000 print PNGs (already public at calmandoak.com/assets/img/print-files/poster-<slug>.png; upload the local copies from assets/img/print-files/). Title pattern: "<Name> — Japandi Printable Wall Art, Digital Download | Calm & Oak". Description: reuse poster copy + "instant download, print at home up to 24x36".

## Step 3 — Publish ALL drafts (after photos)
Etsy Shop Manager → Listings → Drafts → select all → Publish. (~$0.20 × ~56 listings ≈ $11. Cameron has waived sample-QC-first.)

## Step 4 — Etsy shop sections
Create: Art Prints · Canvas · Framed · Mugs · Totes · Digital Downloads · Originals (existing prints). Bulk-assign via Listings → select → Section.

## Step 5 — Website
Scrape live listing URLs → fill CATALOG.csv listing_url + status=live → shop/home-goods/index.html: flip href="#waitlist"→listing_url, CTA "Shop on Etsy →"; add canvas/framed/mug/tote card sections; homepage Home Collection block; nav + sitemap.xml; commit; deploy `npx wrangler deploy --name calmandoak --assets . --compatibility-date 2026-01-01`; Search Console indexing.

## Session note
Run each step in a FRESH Claude session (this one is at its context limit). Everything needed is in this file + GO-LIVE-STATUS + AUDIT-AND-NEXT-PHASE. All recipes (mockup picker, upload-your-own injection, price editing, bulk ops) are proven and documented in the session transcripts.

## Step 1D — Video per listing (added by Cameron 2026-07-04)
Etsy allows **one video per listing** (5–15s, muted). Generate with Gemini/Veo in the logged-in app: prompt = the design's scene prompt + "slow cinematic camera push-in, 8 seconds, no people". NOTE: consumer Gemini subscriptions have a **daily Veo generation cap** (single digits per day) — 56 listings means videos roll out over multiple days; sequence: posters first (12), then canvas, framed, mugs, totes. Attach via Etsy listing editor (video slot), not Gelato.

## Step 0 — Added by Cameron (run FIRST in fresh session)
1. **Etsy Ads:** switch the advertised listing to the *eucalyptus digital download* (find it in Shop Manager → Marketing → Etsy Ads → Manage advertised listings; turn others off if that's the intent — confirm with Cameron which listings should stay advertised).
2. **Etsy listing audit:** walk every active + draft listing; record photo count and video presence; fix as you go — fill photos to Etsy's max (10) with Gelato mockups + Gemini scenes, generate the missing videos in Gemini (use the highest-quality/Veo option available on Cameron's plan; daily cap applies, prioritize best-sellers and the new collection).

## Step 1E — BRAND ART DIRECTION for listing photos (diagnosed 2026-07-05 from the 44 drafts)
Problem: primary photos are Gelato default studio mockups — stark white, cool-toned, clinical. Off-brand.
Brand spec (from BRAND-AND-DESIGN-SYSTEM.md): warm off-white #F7F4EE / cream #EFE8DA environments, oak wood, linen textures, soft window light, editorial minimalism, no bright colors, 4:5 crops.
Fix per listing (order matters — primary photo first):
1. PRIMARY = warm lifestyle image: Gemini scene (prompt pack in Step 1) or Gelato's warm-toned lifestyle mockup — never the white-void studio shot.
2. Photo 2 = clean product-on-cream: if Gelato lacks one, generate in Gemini ("on warm off-white #F7F4EE seamless background, soft shadow").
3. Photos 3-10 = detail crop, scale-in-room, gallery-wall grouping (posters), reverse/handle detail (totes), in-hand with tea (mugs), frame-corner detail (framed).
4. Consistency rule: same background warmth across ALL 44 listings so the shop grid reads as one brand.
Note: 44 drafts confirmed in Etsy (59 active are the old store). Do NOT publish until photos replaced (Cameron's order: publish after pictures).
