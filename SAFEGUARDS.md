# SAFEGUARDS.md — Pre-commit verification protocol

**Read this at the start of every article rebuild. Run the checks before every `git commit`.**

This protocol exists because on 2026-05-26 the user caught two picture-product mismatches in `budget-japandi-bedroom`:
- Sec 2 "The bed itself" linked to a HEADBOARD ASIN but the image showed a bed.
- Sec 3 "The nightstand" linked to a CARAFE ASIN but the image showed a pedestal table.

Neither mismatch should have shipped. The picture-product rule is **sacred** per user directive: *"the products featured in the pictures match the products we sell on amazon."* These checks make that rule unbreakable.

---

## The five pre-commit checks

### 1. Picture-product match (the sacred rule)
For every `<a href="https://www.amazon.com/dp/...">` in the article that wraps an image, answer aloud:
- **What product type is the link pointing to?** (bed, headboard, lamp, vase, throw, etc.)
- **What product type does the image actually depict?**

If those two answers are different, STOP. Either:
- a) Replace the image with one that matches the linked product, OR
- b) Replace the link with one that matches the image, OR
- c) Restructure the section so the section product card and the inline image are honestly aligned.

Never ship a section where the image and the linked product disagree.

### 2. Section title-product match
For each `<h2>` section that has a section-product card or a product callout, the section title must match the linked product class.
- "The bed itself" → linked product must be a bed (or bed+headboard combo). Not just a headboard.
- "The nightstand" → linked product must be a nightstand/side table. Not the lamp that goes on it.
- "The lighting" → linked product must be a lamp or sconce. Not the lampshade or the bulb.

If the section title and the linked product disagree, rename the section OR swap the product.

### 3. ASIN brand bar
Every `/dp/B[A-Z0-9]{9}` link must clear all four checks:
- ≥4.3 stars
- ≥200 reviews (relaxed to ≥100 only for hard-to-source minor accents — flag inline if so)
- Currently in stock
- No "Frequently Returned" badge

Verified-clean ASIN list lives in the per-article body of the article work. Never link a degraded ASIN (e.g. the historic B0DRHQ1FKP THKSHOUZ pedestal — Canada ship-block + 33 reviews).

### 4. Caption-image match
Every `<figcaption>` must describe what the image actually shows.
- Bad: image of olive grove, caption "One good corner, angled for conversation." (2026-05-26 outdoor §1 — fixed but should have been caught pre-commit)
- Good: image of two chairs angled toward each other, caption "One good corner, angled for conversation."

If the image doesn't depict what the caption claims, swap one of them.

### 5. Image file resolution
Every `/assets/img/[...]` reference must resolve to a file on disk. Run this before every commit:
```bash
grep -oE '/assets/img/[^"?]+' journal/[article]/index.html | sort -u | while read f; do
  if [ -f ".${f}" ]; then echo "OK"; else echo "MISS ${f}"; fi
done | sort | uniq -c
```
Expected output: only `OK` lines. Any `MISS` line is a broken image and must be fixed before commit.

### 7. FTC disclosure presence (promoted 2026-10-14, see LESSONS-LEDGER.md)
Every page carrying an Amazon/Awin affiliate link, and every monetized social post, must carry the
disclosure sentence ("As an Amazon Associate, Calm & Oak earns from qualifying purchases." or the
post equivalent + `#affiliate`). This was previously documented only in `PLAYBOOK-AUDIT-CORRECTIONS.md`,
a one-off audit doc — found missing at scale 6 independent times (2026-09-14 through 2026-09-19,
~20-60 already-scheduled posts sampled, 0 carried it) before the gap was closed. Grep for it
explicitly before shipping any new page or batch; don't assume a template carries it forward — the
2026-09-24 redesign silently dropped the banner site-wide by replacing the stylesheet the old
`.disclosure` CSS class depended on, so the markup alone wasn't enough to verify (fixed in PR #5).

### 8. Sitewide degraded-ASIN resweep (promoted 2026-10-14, practice-validated across 5+ runs)
Before or after any article edit, grep the **whole repo** (not just `journal/` — also
`shop/`, `assets/the-edit/`, `assets/starter-guide/`) for every ASIN this file names as degraded
(e.g. `B0DRHQ1FKP`). A bad ASIN fixed in one article can still be shipping unnoticed in another —
found live in 6 files/8 locations on 2026-09-29, undetected by every narrower audit before it. Run
this on every periodic audit sweep, even when no new article is being written.

### 9. Hub reconciliation + filter-chip counts (promoted 2026-10-14)
Any run that touches `journal/index.html` (or `shop/looks/index.html`) should verify, not assume:
(a) every sitemap-listed journal URL has a real card + inbound link from the hub page itself — a
page can be live, in the sitemap, and still be orphaned from on-site navigation (found twice,
2026-09-22); (b) filter-chip category counts are **recomputed from the actual `data-category`
attributes in the grid**, never incremented by the delta of just this run's own change — a stale
count can drift silently for weeks (found at a 14-card gap, 2026-09-22).

---

## The verification block (paste into the article work before every commit)

Before running `git commit` on any journal article, paste this block into your working notes and complete every line:

```
PRE-COMMIT VERIFICATION — [article slug]

[ ] Check 1: Picture-product match
    For each /dp/ link wrapping an image:
    - Section X: linked product = [type], image depicts = [type] — MATCH / MISMATCH
    - Section Y: linked product = [type], image depicts = [type] — MATCH / MISMATCH
    (every section must be MATCH)

[ ] Check 2: Section title-product match
    For each <h2> with a product card:
    - "Section title" → linked = [product] — MATCH / MISMATCH
    (every section must be MATCH)

[ ] Check 3: ASIN brand bar
    For each verified ASIN:
    - B[XXXXXXXXX]: rating/reviews/stock/no-FR — PASS / FAIL
    (every ASIN must be PASS, or explicitly flagged ≥100 reviews exception)

[ ] Check 4: Caption-image match
    For each <figcaption>:
    - Section X caption "[caption text]" vs image content — MATCH / MISMATCH
    (every must be MATCH)

[ ] Check 5: Image file resolution
    Run the grep verification command above.
    Expected: all OK, zero MISS.
    Actual: [N OK, N MISS]

[ ] Word count: [actual] / target 2,400+
[ ] All section IDs present and TOC links resolve internally
```

If ANY check fails, fix before committing. Do not commit with known violations.

---

## Why this matters

Premium editorial sites earn trust by being correct. A reader who clicks a "buy the bed" link and lands on a headboard product page loses trust instantly — and the picture-product mismatch is the single most-visible kind of failure on an affiliate site. We can write 4,000 words of excellent body copy and still lose the reader at the moment they click.

This protocol is the cheapest insurance against that failure. Five checks. Five minutes. Run them.

---

## Revision history
- 2026-05-26 — Initial protocol after user caught Sec 2/Sec 3 picture-product mismatches in budget-japandi-bedroom and §1 caption mismatch in japandi-outdoor.
- 2026-05-27 — Added two new checks after overnight audit (see [PHASE-E-AUDIT-REPORT.md](./PHASE-E-AUDIT-REPORT.md)) caught 4 additional issues across japandi-101, japandi-living-room (×2), and japandi-bedroom:
  - **Check 1a (sub-class):** When the linked product has a distinguishing feature (material, finish, type), verify the image depicts that *specific* feature. "Headboard" is not enough — "upholstered headboard" vs "oak headboard" must match.
  - **Check 6 (cross-article ASIN consistency):** When the same ASIN appears in multiple articles, the image-product match must hold in each. Don't assume a verified pairing transfers from one article to another.
- 2026-10-14 — First monthly learning-loop consolidation (see `CEO-BRIEF/LESSONS-LEDGER.md` and `CEO-BRIEF/LEARNING-LOOP.md`). Added Checks 7-9 above (disclosure presence, sitewide degraded-ASIN resweep, hub reconciliation/filter-chip counts) — each already practiced ad hoc by SEO-ranker for 3-6+ runs; this pass makes them the written gate instead of tribal knowledge.
