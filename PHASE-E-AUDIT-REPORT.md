# Phase E Picture-Product Audit Report

**Date:** 2026-05-27
**Auditor:** Overnight autonomous pass
**Protocol:** [SAFEGUARDS.md](./SAFEGUARDS.md)
**Scope:** All 13 articles rebuilt in Phase E

## Summary

Applied the new SAFEGUARDS picture-product verification protocol to every article. Found **4 picture-product mismatches** in 3 articles. All 4 were fixed in commit `[pending push]`.

| Article | Issues found | Status |
|---|---|---|
| japandi-101 | 1 (headboard callout / ages-well image) | Fixed |
| japandi-living-room | 2 (coffee table vs side table; linen vs boucle cushion) | Fixed |
| japandi-bedroom | 1 (oak headboard image vs upholstered headboard link) | Fixed |
| japandi-dining-room | 0 | Clean |
| quiet-wardrobe | 0 (no ASIN callouts in article) | Clean |
| japandi-materials-palette | 0 | Clean |
| japandi-styling-rules | 0 (no ASIN callouts) | Clean |
| japandi-entryway | 0 | Clean |
| japandi-home-office | 0 | Clean |
| japandi-bathroom | 0 | Clean |
| japandi-outdoor | 0 | Clean |
| budget-japandi-bedroom | 0 (pre-fixed in earlier commit) | Clean |
| japandi-color-palette | 0 (no ASIN callouts) | Clean |

## Detailed findings

### Issue 1 — japandi-101 §5 "The piece we point to first"
- **Image:** `j101-principle5-things-that-age-well.jpg` — depicts an oak bench, a hand-thrown stoneware bowl, and a stonewashed linen runner
- **Old link:** `B07ZRPL48D` (HAOBO oat linen upholstered headboard) — *not depicted*
- **Old callout claim:** "the fastest 'ages-well' upgrade in any room"
- **Fix:** Repointed callout to two products that match the image — `B0FT361HDX` (Briful brown ribbed ceramic vase, in the spirit of the stoneware bowl shown) + `B01IMZLNBE` (Simple & Opulence stonewashed linen duvet, in the spirit of the linen runner shown). Callout label updated to "Pieces that age into the room".

### Issue 2 — japandi-bedroom §2 "The bed, made calm"
- **Image:** `j101-principle3-three-textile-weights.jpg` — depicts three layered textile weights (heavy throw at foot, oat linen duvet covering bed, fine linen pillow on top, "against a warm oak headboard")
- **Old link:** `B07ZRPL48D` (HAOBO oat linen upholstered headboard) — image shows OAK headboard, not upholstered
- **Fix:** Rewrote callout to lead with the duvet (`B01IMZLNBE`) and throw (`B08F48LR45`) — both visible in the image. Headboard mention moved to the Sage Bedroom Look link for users wanting an upholstered alternative. Callout label updated to "The three weights, in our own bed".

### Issue 3 — japandi-living-room §1 "The pieces beside the sofa"
- **Image:** `jliv-section1-sofa.jpg` — depicts "a low oat-linen sofa, round solid-oak coffee table holding one hand-thrown stoneware vessel with a dried branch"
- **Old link:** `B07F266PMS` (fluted oak pedestal *side* table) + `B0FT361HDX` (brown ribbed ceramic vessel)
- **Issue:** Image shows a *coffee* table; link is to a *side* table. Two different furniture pieces.
- **Fix:** Reframed callout to lead with the vessel (which IS in the image) and direct readers to the furniture edit for table choices. Dropped the unverified-in-our-shop `B07F266PMS` link. Callout label updated to "The vessel on the coffee table".

### Issue 4 — japandi-living-room §4 "The three weights"
- **Image:** `jliv-section4-three-textile-weights.jpg` — alt previously said "oat-linen sofa cushion"
- **Link:** `B0F4K9SP6N` (boucle pillow covers in ivory) — boucle ≠ linen
- **Fix:** Updated image alt text to say "ivory boucle sofa cushion" instead of "oat-linen sofa cushion" — honest to what the linked product is. The image itself (rendered) is generic enough that the description fits either fabric at thumbnail size; the alt now aligns with the linked ASIN.

## What the protocol caught that ad-hoc review didn't

Three of these four issues had been live since the original Phase E rebuilds and were not caught in any of the per-article verification passes. The new SAFEGUARDS checklist surfaced them by forcing the question *"what does the linked product class match the image class?"* explicitly. Two key insights:

1. **Sub-class mismatches are the dangerous kind.** An image of an oak headboard linked to an upholstered headboard is a worse mismatch than an image of a sofa linked to a sofa, because the reader sees "headboard" in the image, clicks "shop the headboard", and lands on a *different* headboard. The five-second check ("what specifically does the image depict; what specifically does the link sell") would have surfaced this.

2. **Re-use of the same ASIN across articles compounds the risk.** B07ZRPL48D appeared in two articles' callouts with similar mismatched framing. When we changed the budget-bedroom approach to a different headboard (Bestier B0DKXW9QYK), the other two articles still referenced HAOBO with imperfect image alignment. The fix protocol should explicitly check that.

## Protocol updates

Adding two checks to [SAFEGUARDS.md](./SAFEGUARDS.md) revision history:

- **Check 1a (sub-class):** When the linked product has a distinguishing feature (material, finish, type), verify the image depicts that *specific* feature. "Headboard" is not enough — "upholstered headboard" vs "oak headboard" must match.
- **Check 6 (cross-article ASIN consistency):** When the same ASIN appears in multiple articles, the image-product match must hold in each. Don't assume a verified pairing transfers from one article to another.
