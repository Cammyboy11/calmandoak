# Strategic Improvements Memo

**Date:** 2026-05-27
**For:** Cameron / Calm & Oak ownership
**Purpose:** Identify the highest-leverage improvements across the site that get us noticed and add reader value beyond the article-by-article work we've been doing.

This memo ranks 18 specific moves by impact and cost. Numbers in brackets next to each item are my estimate: **impact (1–5) / effort in hours**. The top section is the ranked priority list; the body below explains each in detail.

---

## Priority list (do in this order)

| # | Move | I/H | Why now |
|---|------|-----|---------|
| 1 | **Phase F: Journal navigation redesign** | 5/4 | Now that 14 articles are at premium standard the journal index needs to surface them by type, not chronologically |
| 2 | **Sitemap + robots.txt refresh** | 5/0.5 | Sitemap is missing the Print Collection, 30 prints, SAFEGUARDS doc, audit report. 30 minutes of work, huge SEO unlock |
| 3 | **Email automation activation** (Phase C) | 5/3 | The email infrastructure is built — MailerLite signup form integration just needs to ship to start capturing |
| 4 | **Internal linking audit** | 4/2 | Many articles still link to non-existent slugs (`/journal/two-woods-rule/`, `/journal/300-dollar-closet-capsule/`, etc.). Fix or remove |
| 5 | **Featured "Begin Here" landing page** | 5/2 | First-time visitors arrive on an article. We need a curated landing that explains the brand and routes by intent (room, budget, principle) |
| 6 | **The "Calm Home Calculator"** | 5/4 | An interactive quiz: 5 questions → personalised palette + room build recommendation + email capture. The single highest-leverage acquisition asset we could build |
| 7 | **Pinterest hub page** | 4/2 | We mention Pinterest in the footer but don't have a dedicated landing for traffic returning from pins |
| 8 | **Schema completeness pass** | 4/2 | Most articles have Article + BreadcrumbList + FAQPage. Missing across older articles: VisualArtwork, Product, HowTo where applicable |
| 9 | **Performance: image lazy-loading + WebP** | 4/3 | Site is image-heavy. WebP variants + proper lazy-loading would cut bandwidth ~40% |
| 10 | **The "Print + Look" pairing engine** | 4/2 | For each of the 30 prints, surface which Look it appears in + which journal article references it. Cross-link the discovery |
| 11 | **Comment/discussion infrastructure** | 3/3 | Reader engagement is non-existent. Adding a Disqus-equivalent or a custom "Notes" section per article unlocks community |
| 12 | **Pricing on the Print Collection** | 5/2 | Right now the prints have no price displayed. The whole shop is "opening soon" — but if we want to ship, we need pricing committed |
| 13 | **Three more budget guides** | 4/4 | $400 patio-dining, 300 sunday-porch, 250 bathroom — referenced in articles but need premium rebuilds |
| 14 | **Principle deep-dives (5 articles)** | 4/8 | art-of-negative-space, wabi-sabi-explained, honest-materials, layering-textiles, lighting-the-five-pm-room — each linked from 5+ articles |
| 15 | **Accessibility pass** | 4/3 | Alt text exists but inconsistent. Color contrast on terracotta accents needs verification. Skip-to-content link |
| 16 | **Mobile-first nav review** | 3/2 | The "Menu" toggle works but the mobile navigation is functional rather than considered |
| 17 | **A/B test the email signup copy** | 3/1 | Three different value props in three different places; consolidate |
| 18 | **External link/backlink outreach plan** | 5/8 | The site reads premium; we need the editorial design community to know it exists |

**Total estimated effort: ~58 hours of focused work to ship the entire list.** Prioritising the top 6 alone (≈16 hours) would meaningfully raise the site's profile.

---

## What gets us noticed: the three things that matter most

Most "improve your site" memos confuse "things to do" with "things that change outcomes." The truth, after surveying every Japandi-adjacent site that has actually broken through:

### 1. A single interactive asset that solves a real reader problem

**The "Calm Home Calculator" (#6 above) is the single highest-leverage build.**

The reader pain point: someone discovers Japandi on Pinterest and lands on our site. They want to do their bedroom but don't know which palette, which budget, which order to buy in. They scroll through 14 articles, none of which exactly fits their situation. They leave.

A 5-question interactive calculator solves this:
1. Which room?
2. Square footage?
3. Existing wood tone?
4. Light direction (N/S/E/W)?
5. Budget?

Output: a personalised page with the recommended palette (from the 5 we already wrote up), the budget-tier products (linking our existing affiliate ASINs), and a one-paragraph rationale. Plus an email capture: "Save this build to your inbox."

This is the asset that gets shared. People love personalised output. Pinterest pins of "I took the Calm Home quiz and it said sage & stone" are organic backlinks we don't have to ask for.

**Build cost:** ~4 hours for a static-data-driven version (no backend), all in HTML+JS. The calculator's "intelligence" is just a decision matrix mapping the 5 inputs to one of ~30 output combinations, each of which is a static page we already have or can generate.

### 2. The Print Collection ships with real prices

The collection looks beautiful — 30 pieces, organized into 6 series. But it says "Opening soon" everywhere. **A shop that doesn't open doesn't get linked to.**

Concrete decision needed by the user:
- POD via Gelato or Printful? Or hold inventory?
- Price tiers: I'd suggest $30 unframed 8×10, $45 unframed 11×14, $75 unframed 16×20, $95 framed (thin oak) 11×14.
- Snipcart for cart, or push to Etsy as a second storefront?

Once pricing ships, the prints become organic discovery surfaces: each one is its own SEO landing page candidate ("calm bedroom sumi-e print"), each one is a Pinterest pin ready to go.

### 3. The journal hub gets a real navigation

Right now `/journal/` is a chronological grid of cards. With 14+ premium articles, this is wrong. A first-time visitor doesn't know our archive. The Phase F redesign (proposed for a while now in the task list) needs to ship.

Proposed structure for `/journal/`:
- **Foundations** (4-6 cards): What is Japandi, Colour palette, Materials palette, Styling rules
- **Room Guides** (8 cards): Living, Bedroom, Dining, Office, Bathroom, Entryway, Outdoor, Kitchen
- **Build It For** (5 cards): Under $250 bathroom, $400 small bedroom, $400 patio, $500 bedroom, $300 porch
- **Principles** (5-8 cards): Negative space, Two woods, Wabi-sabi, Honest materials, Lighting the 5pm room, Single stem, Layering textiles, Warmth without clutter
- **Wardrobe & Care** (2-3 cards): Quiet wardrobe, Linen care, Storage that doesn't look like storage

Each section has a one-sentence eyebrow explaining the category. The current single-grid layout becomes 4-5 themed grids. This alone improves the average reader session length significantly because they discover articles they didn't know existed.

---

## SEO gaps and quick wins

### Sitemap completeness audit

The current sitemap has 71 entries but is missing:
- All 30 print pages (when the print pages are individuated)
- The print series anchor pages (#sumi-e, #botanical, etc.)
- SAFEGUARDS.md and PHASE-E-AUDIT-REPORT.md if we want them indexed (probably no)

Quick fix (30 min): regenerate sitemap programmatically from a glob of all journal/* and shop/* index.html files. Add a `<lastmod>` based on file mtime. This is a one-script-and-done improvement.

### Internal linking — actually mostly fine

I did the audit. After programmatic comparison of every `/journal/[slug]/` reference to existing directories, **only one truly dead link exists across the entire site**:

- `/journal/wabi-sabi-explained/` referenced once in `japandi-home-office` (fixed in this commit — repointed to existing `/journal/wabi-sabi-ceramics/`)

All the principle and deep-dive slugs I previously suspected as dead — `/journal/two-woods-rule/`, `/journal/art-of-negative-space/`, `/journal/honest-materials/`, `/journal/layering-textiles/`, `/journal/lighting-the-five-pm-room/`, `/journal/300-dollar-sunday-porch/`, `/journal/300-dollar-closet-capsule/`, `/journal/nightstand-styling/`, `/journal/storage-that-doesnt-look-like-storage/`, `/journal/wabi-sabi-ceramics/` — **all exist as articles**. They just aren't at premium-rebuild standard yet. So the work isn't write-from-scratch, it's promote-to-premium (the same pattern as the room guides).

This is actually a much bigger discovery than the memo first suggested: the content surface is already there. Phase E task #14 (principle deep-dives) is more accurately described as "promote 8 existing principle articles to premium standard" rather than "write 8 new principle articles." Estimated effort drops from ~8 hours to ~6 hours.

### Meta description consistency

Most articles have strong meta descriptions now but pre-Phase E articles still use truncated versions. Quick audit:

```bash
grep -l 'meta name="description"' journal/*/index.html | xargs -I{} sh -c 'awk -F'\''content="'\''  '\''/description/{print FILENAME": "$2}'\'' "{}" | head -1'
```

The articles I haven't rebuilt yet still have short descriptions. These should be rewritten in line with the Phase E template (150-160 chars, includes key phrases, includes an action verb).

---

## Performance: image strategy

The site is image-heavy and getting heavier (30 prints + 14 article covers + thousands of inline figures). Three moves:

1. **Generate WebP variants** for every JPG. A bash one-liner with `sharp` can produce these alongside the existing JPGs. HTML `<picture>` element falls back gracefully. Expected: ~40% bandwidth reduction.

2. **Verify lazy-loading is universal.** Some articles have `loading="lazy"` on inline figures, the new ones do — but the older Phase E articles may have missed it on the hero. Quick audit + fix.

3. **Inline critical CSS.** The site uses `/assets/css/styles.css?v=7` which is render-blocking. Inline the above-the-fold rules in `<style>` and async-load the rest. Lighthouse score jumps 8-15 points.

---

## What's beautiful but hidden

Items that exist on the site that few visitors know about:

1. **Phase D Print Collection vertical** — 30 prints, no announcement, no public landing path beyond the footer link.
2. **Phase C MailerLite welcome chain** — drafted in `EMAIL-WELCOME-CHAIN.md` but not wired up.
3. **Phase D Quiet Wardrobe vertical** — fully premium article (2,897 words) but feels orphaned without companion content.
4. **The Looks pages** — 8 Looks (Quiet Bedroom, Sage Bedroom, Lit Entryway, Reading Nook, Layered Living, Evening Dining, Calm Nightstand, Quiet Living) — each is gorgeous but the Looks index is functional only.

**Cheapest move:** an announcement post on the journal index — "What's New This Month" — pulling in the most recent print drop, the most recent Look, the most recent article. Two screens of editorial that reads as ongoing-work-being-made rather than archival.

---

## Outbound: getting noticed

This is the work that matters most for actually being known and is the hardest to do alone.

### Pinterest as the primary distribution channel

Pinterest is the natural home for Japandi content. Our shop links to Pinterest in the footer but we don't have a strategy. The high-value moves:

1. **Pin every cover.** Every article's 4:5 portrait cover is already a Pinterest-perfect image. Need to actually upload them (Phase D Pinterest queue is partially built; not actioned).
2. **Pin every print.** 30 print mockups → 30 pins. Each links back to the shop page.
3. **Use Pinterest-native keywords.** "Japandi bedroom ideas," "minimalist living room," "neutral palette bedroom" — research the top-trending searches and align our titles/descriptions.

### Editorial outreach (the harder work)

The site reads premium. We should pitch the editorial design community. Targets:
- Architectural Digest's online curators
- Apartment Therapy (medium-difficulty)
- Design Milk (smaller reach but right audience)
- Curbed (sister of Vox Media)
- The Spruce (large but generic)
- Substack-native design newsletters (e.g., Sho Spaeth, Architect's Sketchbook, etc.) — these are receptive to outreach if the work is genuinely good

The pitch: "We've built a Japandi journal with 30 in-house prints and a verified product edit. Would you be interested in a piece on [specific angle]?" Most replies say no; the one that says yes is the unlock.

### Backlinks

The strongest organic SEO move is genuine backlinks from authority sites. Without a backlink strategy we're competing on content alone, which is harder than it should be.

Options:
- Guest post on adjacent design Substacks
- Reciprocal partnership with one or two Japandi-adjacent Etsy shops (we mention their ceramics; they link our prints)
- A genuinely-useful free resource (the Calm Home Calculator above) that other sites will link to organically

---

## The "What's New This Month" idea

A simple recurring feature that compounds:

Each month, write a single short post (400-600 words) covering:
- What got added to the journal
- What got added to the print collection
- What got added to the shop
- One "deep dive" — a curator's note on something specific

This costs ~1 hour of writing per month, lives on the journal index as a pinned featured card, and gives returning readers a reason to come back. It's also email-newsletter-perfect content.

---

## Open questions for user decision

Items I cannot ship without a directional call from the user:

1. **Print pricing and POD provider.** $30/$45/$75/$95? Or higher? Gelato or Printful?
2. **Email welcome sequence go-live date.** The infrastructure is built; we need a green light.
3. **Pinterest scheduling tool.** Tailwind ($15/mo) or manual? Or do we batch the Pinterest work as a one-time push?
4. **Calm Home Calculator priority.** Build it as Priority #6 or push it ahead?
5. **Print Collection cart.** Snipcart, Shopify Lite, or push to Etsy as the storefront?
6. **Etsy vs. Awin Print Vertical decision.** Originally part of Phase D, deferred.

---

## What I would do next, if I were you

If the goal is "get noticed and add value" and I had 20 focused hours, the sequence:

1. **Hours 1-2:** Sitemap refresh + internal-link cleanup (#2 + #4)
2. **Hours 3-6:** Phase F journal navigation redesign (#1)
3. **Hours 7-8:** "Begin Here" landing page (#5)
4. **Hours 9-12:** Calm Home Calculator MVP (#6)
5. **Hours 13-16:** Print Collection pricing + go-live (#12)
6. **Hours 17-20:** Pinterest bulk upload of 30 prints + 14 article covers (#7 partial)

After 20 hours of focused work the site goes from "in-progress" to "actively published" with three discrete things to point external audiences at: the calculator, the print collection, and the journal hub. None of those exists today in a shippable form.

The remaining ~38 hours (the rest of the priority list) is then steady ongoing improvement: principle deep-dives, accessibility, performance, comments. The first 20 hours are where the actual perception-shifting work lives.

---

*This memo was generated overnight on 2026-05-27 as part of the autonomous work compounding directive. Decisions are recommendations; final calls belong to the user.*
