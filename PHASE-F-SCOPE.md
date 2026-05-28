# Phase F — Journal Navigation Redesign (Scope & Build Plan)

**Status:** SCOPED, awaiting "go". On approval I implement F1–F7 in order, commit per section, QA in browser, push.
**Goal (user's words):** "make them easy to navigate … we will have built incredible long term assets."
**Constraint:** Static HTML site, no build step. Progressive enhancement only — everything must work with JS disabled (Pinterest/Google crawlers + no-JS users still see every article).

---

## Current state (audited 2026-05-28)

- `/journal/index.html` = flat grid of **42 article cards** in rough publish order.
- Card labels are inconsistent: Guide, Room guide, Principle, Care, Shoppable, Palette, Lighting, Organization, Furniture, Materials, Styling, Cluster guide, "New · Wardrobe".
- **No** category grouping, **no** filter, **no** featured strip, **no** search.
- Every article already has: `BreadcrumbList` JSON-LD, a `<p class="meta">` reading-time line, and a hand-curated "More from the journal" rail.
- **Exception:** `journal/art-of-negative-space/` has NO "Keep reading" rail (the only one missing it).
- CSS already has: `.collection-grid`, `.card`, `.card-img-label`, sticky `.site-header`. **Missing:** any chip/pill/filter/tab component (I'll add `.journal-filter` + `.chip`).

---

## The taxonomy (5 categories + "All")

Every one of the 42 articles is assigned to exactly one **primary** category (for the filter) and may carry secondary tags later. Primary assignment below is final unless you say otherwise.

### 1. Principles  (the "why / how", 7)
- japandi-101 · *What is Japandi*
- art-of-negative-space
- two-woods-rule
- single-stem-rule
- the-30-30-30-rule
- warmth-without-clutter
- japandi-styling-rules

### 2. Room Guides  (room-by-room, 7)
- japandi-living-room
- japandi-bedroom
- japandi-dining-room
- japandi-entryway
- japandi-home-office
- japandi-bathroom
- japandi-outdoor

### 3. Shop the Look  (budget builds, the $ articles, 13)
- budget-japandi-bedroom
- 200-dollar-entryway-organizer
- 250-dollar-bathroom
- 250-dollar-bedside-refresh
- 300-dollar-closet-capsule
- 300-dollar-entryway
- 300-dollar-living-room-textile-refresh
- 300-dollar-sunday-porch
- 400-dollar-home-office
- 400-dollar-patio-dining
- 400-dollar-reading-nook
- 400-dollar-small-bedroom
- 500-dollar-dining-table-set

### 4. Materials & Care  (fibres, woods, clay, palette, care, 8)
- japandi-materials-palette
- japandi-color-palette
- honest-materials
- linen-care
- linen-vs-cotton-vs-wool
- wabi-sabi-ceramics
- sofa-buying-guide  *(material/longevity buying decision)*
- quiet-wardrobe  *(Japandi applied to natural-fibre clothing)*

### 5. Styling & Light  (single-move styling essays, 7)
- layering-textiles
- nightstand-styling
- rug-sizing
- lighting-the-five-pm-room
- why-your-kitchen-needs-a-tray
- storage-that-doesnt-look-like-storage
- sunday-morning-kitchen

**Total: 7 + 7 + 13 + 8 + 7 = 42 ✓**

---

## Build plan (commit-per-section)

### F1 — Journal index: filter bar + category data
- Add a sticky **filter bar** under the hero: `All · Principles · Room Guides · Shop the Look · Materials & Care · Styling & Light`, with a live count per pill.
- Add `data-category="principles|room-guides|shop-the-look|materials|styling"` to every one of the 42 `<a class="card">` blocks.
- New CSS: `.journal-filter` (sticky, horizontally scrollable on mobile) + `.chip` / `.chip.is-active` (terracotta underline active state, matches brand).
- New JS in `assets/js/main.js`: click a chip → show/hide cards by `data-category` (CSS class toggle, no reload). Default = All. Deep-link support: `#room-guides` in URL pre-selects that filter.
- **No-JS fallback:** all cards visible, filter bar still renders but cards never hidden. Crawlers see everything.

### F2 — Featured strip (top of index)
- Above the grid: a 3-card **"Start here"** featured row — `japandi-101`, `layering-textiles` (the Pinterest flagship), `budget-japandi-bedroom` (top converter). Larger cards, distinct from the grid.

### F3 — Standardize card labels
- Rewrite every `.card-img-label` on the index to match its primary category (Principles / Room Guide / Shop the Look / Materials & Care / Styling). Kills the inconsistent grab-bag of labels.

### F4 — Per-article category chip + breadcrumb
- Add a small category chip to each article's `<p class="meta">` line that links back to the filtered index (e.g. `/journal/#room-guides`).
- Make the `BreadcrumbList` JSON-LD consistent: Home → Journal → (Category) → Article.

### F5 — Smarter "Keep reading" rails
- **Add the missing rail** to `art-of-negative-space` (the only article without one).
- Make each rail **category-aware**: a Room Guide rail surfaces sibling room guides + its matching Shop-the-Look (e.g. japandi-bedroom → budget-japandi-bedroom, 250-bedside-refresh). Tighten cross-linking so every budget build links to its parent room guide and back.

### F6 — Index SEO + footer
- Add `CollectionPage` + `ItemList` JSON-LD to `/journal/` listing all articles (helps Google build sitelinks).
- Expand the footer **"Read"** column from 2 links to the 5 categories.

### F7 — QA sweep
- Start local node server, browser-render the index: confirm filter toggles correctly, featured strip renders, no console errors, JS-off fallback shows all 42.
- Verify all internal links across rewritten rails return 200.
- Spot-check 4–5 articles for the new category chip + breadcrumb.

---

## Decisions already made (so "go" needs no input)
- **On-page JS filter, not separate /category/ URL pages.** Faster to ship, nothing new to maintain, zero crawl-budget risk. Dedicated category landing pages can be a later Phase F2 if we want them for SEO.
- **5 categories, not more.** Keeps the filter bar scannable on mobile.
- **Brand styling reused** (terracotta underline, Cormorant headings, existing card component). No new visual language.
- **Progressive enhancement is non-negotiable** — no article ever becomes invisible to a crawler.

## Out of scope for Phase F (note for later)
- Full-text search (low value at 42 articles; revisit at ~80+).
- Pagination (42 cards is fine on one page).
- Tag pages / multi-tag taxonomy.

---

## Estimated work
~7 commits, all mechanical + low-risk (additive markup, one new JS function, one CSS block). No article body content changes except the F5 rail edits and F4 meta chip. I'll QA in-browser before pushing.
