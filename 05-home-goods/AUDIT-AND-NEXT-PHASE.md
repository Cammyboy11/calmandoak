# Home Collection — Audit & Next-Phase Plan (2026-07-04)

## AUDIT RESULT — what exists and is verified ✅
- **82 products in Gelato, 71 connected to Etsy, 0 failed, 0 stuck syncing.**
- 12 posters — 3 sizes each, $28/$42/$63, correct titles/descriptions, designs verified.
- 12 canvases — 16x20 @ $72 (spot-checked bulk child: $71.99, correct variant/design).
- 12 framed — 16x20 wood frame @ ~$130 (template also has white frame @ $123).
- 4 mugs @ $19 (293dpi full-wrap), 4 totes @ $28 (300dpi).
- 5 reusable templates saved for future drops.
- Site: all 21 print-file URLs live; /shop/home-goods/ live with waitlist buttons.

## AUDIT RESULT — what's missing / imperfect ⚠
1. **Photos per listing:** bulk-created products carry only the template's mockups (posters ~1, canvas/framed 1, mugs 5, totes 2). Needs enrichment (see below — note **Etsy's hard cap is 10 photos per listing**, not 20; Gelato's mockup picker caps at 20 but Etsy will only take 10).
2. **No digital-download versions** of the 12 designs (a separate Etsy listing type, built in Etsy directly, not Gelato).
3. **Notebook line impossible on Gelato NA** — decide: drop, or Printful.
4. Old leftover draft "Museum-Quality Matte Paper Poster 13x18 cm/5x7" — junk from an earlier session; safe to delete manually.
5. 10 "Not connected" products are pre-existing (unrelated to this launch).
6. Everything is still an **Etsy draft** — nothing public, no fees yet.

## BLOCKERS on the requested next steps (need Cameron input/assets)
- **Gemini image generation:** I have no Gemini API access in this session (no API key configured; your Gemini use is via the web app). Give me an API key (e.g. in a .env in the repo) or run generations in the Gemini app pointed at the repo folder (per the handoff gotcha), and I'll do the rest (attach via Gelato "Upload your own" mockups / Etsy photos).
- **Photo target:** recommend "max 10 per listing" (Etsy cap): mix of Gelato mockups + Gemini lifestyle scenes.
- **Publish-before-samples:** flipping all 44 live skips your own non-negotiable QC gate (handoff §4). Fee is ~$8.80 (44 × $0.20). I'll do it on your word — just be aware you're waiving QC.

## EXECUTION ORDER for next session (say "go" and I run it)
1. Enrich photos (Gelato mockup picker per product; Gemini scenes when key provided).
2. Build 12 digital-download listings in Etsy (using existing 3000x4000 PNGs; suggest $8–12 each; needs your OK on pricing).
3. Bulk-publish all drafts in Etsy Shop Manager.
4. Create Etsy shop sections: Art Prints / Canvas / Framed / Mugs / Totes / Digital Downloads / Original Prints — assign all listings.
5. Scrape live listing URLs → CATALOG.csv → flip site buy buttons, add canvas/framed/mug/tote cards to /shop/home-goods/, homepage section, nav, sitemap → wrangler deploy → Search Console.
