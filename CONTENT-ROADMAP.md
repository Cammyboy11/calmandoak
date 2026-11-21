# Calm & Oak — Content & Authority Roadmap

**North star:** become *the* reference for Japandi — the site Google and readers treat as the authority.
**How we win:** not more articles (we already have ~32), but **structure**. Organize everything into hub-and-spoke topic clusters, fill the thin pages, and point all internal links at the money pages (Looks + shop).

Owner: Claude (COO). Source of truth for what to publish next. Most recent status at top of each section.

---

## The core idea: hub-and-spoke (topic clusters)

Right now the 32 journal posts are a flat list. Google rewards **depth around a topic**, signalled by a pillar page that links to many supporting articles, which link back. We build:

- **1 mega-pillar** (the head term "japandi")
- **7 room pillars** (the "japandi [room]" searches — highest commercial intent)
- **Concept clusters** that absorb the existing 32 articles as spokes

Every pillar links down to its spokes + the matching **Looks** and **shop** category. Every spoke links up to its pillar. That interlinking is the single biggest authority lever we have, and it's free.

---

## Priority order (driven by real Pinterest demand)

Our own Pinterest board impressions rank audience interest. We build pillars in this order:

`furniture › textiles › storage › kitchen › lighting › bedroom › outdoor › ceramics › office › decor`

Rooms map onto that: **Living Room (furniture)** and **Bedroom** first, then **Kitchen/Dining**, then the rest.

---

## Phase 1 — Authority + audience (next ~8 weeks)

**Status check 2026-11-20 (SEO-ranker):** every box below was re-verified directly against the live
repo (word counts, internal links, schema) rather than assumed from the checklist's own state —
the checklist had drifted well behind actual site state. All of Sprint 1–3 is done. Nothing in this
phase is open.

### Sprint 1 — Foundation (this is where we are)
- [x] P0 SEO fixes: invalid Product schema removed; Looks in sitemap.
- [x] **Mega-pillar: "What is Japandi? The Complete Guide"** — `journal/japandi-101/` is a 3,861-word hub: definition, origins, principles, palette, materials, Japandi-vs-Scandinavian-vs-minimalism, room-by-room links out. Exceeds the original 1,800–2,500-word target.
- [x] **Named author + E-E-A-T** — byline ("By Cameron Hayes", `rel="author"`) + `/about/` bio + Person schema confirmed live across articles (spot-checked `japandi-color-palette`, `japandi-101`).
- [x] **Category buying guides** — all 10 shop category pages carry original how-to-choose prose (e.g. `/shop/office/` has an "How to choose a Japandi workspace" H2), 1,600–2,400 words each. The two near-empty word counts found (`/shop/dining/`, `/shop/living-room/`, 187 words) are intentional `noindex` redirect stubs to `/shop/ceramics-tableware/` and the merged room category, not thin content — correctly excluded.

### Sprint 2 — Room pillars (highest commercial intent)
- [x] **Japandi Living Room** (`journal/japandi-living-room/`, 4,009 words) → links to `/shop/furniture/`, `/shop/lighting/`, `/journal/300-dollar-living-room-textile-refresh/`.
- [x] **Japandi Bedroom** (`journal/japandi-bedroom/`, 3,969 words) → links to `/shop/bedroom/`, `/journal/400-dollar-small-bedroom/`.
- [x] **Japandi Kitchen & Dining** (`journal/japandi-dining-room/`, 3,998 words) → links to `/shop/japandi-kitchen/`, `/shop/ceramics-tableware/`, `/journal/500-dollar-dining-table-set/`, `/journal/sunday-morning-kitchen/`.
- [x] **Japandi Entryway** (`journal/japandi-entryway/`, 4,918 words) → links to `/journal/200-dollar-entryway-organizer/`, `/journal/300-dollar-entryway/`.

### Sprint 3 — Concept clusters + remaining rooms
- [x] **Materials & palette cluster** pillar (`journal/japandi-materials-palette/`, 4,165 words) — confirmed links to all 5 named spokes (honest-materials, two-woods-rule, japandi-color-palette, linen-vs-cotton-vs-wool, wabi-sabi-ceramics).
- [x] **Styling-rules cluster** pillar (`journal/japandi-styling-rules/`, 3,944 words) — confirmed links to all 5 named spokes (art-of-negative-space, single-stem-rule, the-30-30-30-rule, nightstand-styling, warmth-without-clutter).
- [x] Room pillars: **Bathroom** (`japandi-bathroom` + `250-dollar-bathroom`), **Home Office** (full cluster, see `GROWTH-PLAN-90-DAY.md`), **Outdoor/Porch** (`japandi-outdoor`, `300-dollar-sunday-porch`, `japandi-balcony`) — all live.
- [x] **Looks** — 119 live `shop/looks/*` pages as of 2026-11-20, well ahead of the 1/week pace since this plan started; ongoing, no action needed.

### Always-on (audience)
- [x] Email capture + welcome automation to the Starter Guide is wired and live (MailerLite, confirmed 2026-06-24). The recurring "one quiet room" send stays a manual, owner-approved action per `CONTROL.md`'s rate ceiling (max 1 newsletter / 1–2 week cycle) — I draft, owner sends.

---

## Phase 2 — Digital products (months 2–4)
- [ ] **The Japandi Playbook** — paid expansion of the free guide ($19–39). Draft the asset first; checkout/pricing needs owner sign-off (finance-gated).
- [ ] **The Looks Library** — printable room-by-room shopping templates.
- [ ] **Mini e-design service** — questionnaire → personalized Look (higher ticket, builds reputation).

## Phase 3 — Diversify revenue + the fashion pivot (months 4–9)
- [ ] Analytics + outbound click tracking live (know what converts).
- [ ] Diversify affiliate networks beyond Amazon (Awin live; apply Impact + ShareASale).
- [ ] **"Quiet wardrobe" test** — we already have `300-dollar-closet-capsule`; expand into a Japandi-wardrobe cluster (linen clothing, loungewear, slippers) **as affiliate first**. Let click/buy data decide what — if anything — we ever private-label. No inventory until the audience proves demand.

---

## Guardrails (what can go wrong — pre-empted)
- **Thin-affiliate / Helpful-Content penalty:** every page must carry original value, not just links. → category guides, pillars, no naked card grids; replace the 160 search-URL placeholders with real products.
- **Schema errors:** no `offers` without a real price (done). Validate JSON-LD on every new page.
- **Rented-traffic risk:** Pinterest can change overnight → SEO + email are the owned hedges; build both now.
- **Amazon single-source risk:** one network, low rates → diversify (Phase 3).
- **Price accuracy / FTC:** never state prices we don't control; disclosure on every page (in place).
- **Brand consistency:** every asset unmistakably Calm & Oak (Cormorant/Inter, palette, Template B, the "quiet room / five pieces / honest materials" voice).
