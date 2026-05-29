# Calm & Oak — Traffic Plan: driving qualified clicks

_Goal: a large volume of clicks from people **already searching for this exact content** — not paid ads, not cold social. Two intent channels do almost all the work for a Japandi home-decor site: **Pinterest** (visual search) and **Google** (organic SEO). Everything else is a multiplier on those two._

_Status: the site is now trust-ready — every shop card and journal link resolves to a real product, real elevated photos throughout, JSON-LD on every page. We can send traffic without burning first impressions._

---

## The thesis in one line

> Japandi buyers don't browse — they **search**. They type "japandi bedroom on a budget" into Pinterest and Google. Be the best result for those searches, with a beautiful pin and a genuinely useful page, and the clicks compound for free.

Pinterest is the priority for **months 1–3** (fast, visual, our content is built for it). SEO is the priority for **months 3–12** (slow to start, then compounds and never stops). Run both from day one; expect the mix to shift from ~80/20 Pinterest:Google early to ~50/50 by month 6.

---

## Channel 1 — Pinterest (primary, starts now)

Pinterest is a search engine with buying intent, dominated by exactly our categories (home, decor, "japandi," "minimalist bedroom," budget room makeovers). We already have **65+ finished pins** built (editorial batches 1–3 + 25 product pins) sitting in `final pins/` with copy in the `PIN-COPY-*.md` docs — that's ~6–8 weeks of inventory ready to schedule.

**Setup (owner, ~1 hour, one-time)**
1. Convert to a **Pinterest Business account** (free) → unlocks analytics + Rich Pins.
2. **Claim the domain** calmandoak.com (Settings → Claimed accounts). This attributes every pin's clicks to us and enables **Rich Pins** (our JSON-LD article/product metadata auto-appends to pins — title, description pull through).
3. Build **8–10 boards** matching how people search, not how we're organized:
   - Japandi Bedroom · Japandi Living Room · Small-Space / Budget Japandi · Japandi Kitchen & Dining · Entryway & Storage · Japandi Color & Materials · Wabi-Sabi & Ceramics · Calm Outdoor · Calm & Oak Prints (when live).
4. Board descriptions = keyword sentences ("Japandi bedroom ideas on a budget — calm, neutral, oak and linen…"), not cute names.

**Cadence (the engine)**
- **5–10 fresh pins/day**, every day. "Fresh" = a new image, even to an old URL. Pinterest's 2024+ algorithm rewards *fresh image volume* over repinning. Our 65 pins → reformat each into 2–3 image variants (different crop/title placement) = ~150 fresh pins without new photography.
- Use a scheduler (Pinterest's native scheduler is free; or the **blotato** MCP already connected here can publish + schedule programmatically). **Never** dump 50 pins in one day — spread them.
- Each pin links to the matching **journal article** (not straight to Amazon — Pinterest suppresses bare affiliate links, and the article converts better anyway via its in-content product cards).
- Title every pin for search: "$300 Japandi Entryway — 5 pieces" beats "Cozy entry ✨".

**What converts (our edge)**
- Vertical 2:3 (1000×1500), text overlay stating the payoff, our calm palette = instantly recognizable in a feed.
- "Get the look / shop the room" pins (the 25 product pins) → highest click-through because they promise a buyable outcome.
- Seasonal beats: lean into Pinterest's 30–45-day lead — plan "spring refresh," "cozy autumn," "new-year calm home" ahead of the season.

**90-day Pinterest ramp**
| Weeks | Focus | Target |
|---|---|---|
| 1–2 | Setup, claim domain, first 30 pins from existing batches | first 100 clicks, baseline analytics |
| 3–6 | Daily fresh pins, identify top 5 performers, make variants of winners | 1–3k monthly impressions → first 500 clicks |
| 7–12 | Double down on winning formats + boards; start seasonal planning | compounding; 2–5k clicks/mo realistic for a new account in a hot niche |

---

## Channel 2 — SEO / Google (compounding, starts now, pays off in months 3–12)

The 42 journal articles are **already built for this** — keyword-targeted titles, FAQ + Article JSON-LD, internal links, fast static pages. The work now is getting them indexed and earning rank.

**Setup (owner, ~30 min)**
1. **Google Search Console** — verify calmandoak.com, submit `sitemap.xml`. This is the single highest-leverage SEO action; it tells Google the whole site exists.
2. **Bing Webmaster Tools** — same (powers Bing + ChatGPT search; cheap incremental traffic).
3. Confirm **Plausible or GA4** is live (events are already wired in `main.js`: `Signup`, `Affiliate Click`) so we can see which articles earn clicks.

**The plays**
- **Target the money queries we already rank-adjacent for:** "what is japandi," "japandi bedroom," "japandi living room," "linen vs cotton sheets," "$X room makeover." Our budget-build articles ("$300 entryway," "$400 patio dining") are gold — high intent, low competition, evergreen.
- **Internal linking** (mostly done): every article links to 2–3 siblings + its shop category. Keep that — it spreads ranking strength and increases pages/session.
- **One new article/week** beats sporadic bursts. Each targets one specific long-tail query. Topics from `CONTENT-ROADMAP.md`.
- **Refresh, don't just publish:** every ~quarter, update the top 5 articles (new year in title, fresh pin, an added section). Google rewards freshness on competitive terms.

**Reality check:** SEO is slow — expect near-zero for ~8 weeks, then a slow climb. By month 6–9 it should rival Pinterest and, unlike Pinterest, it requires no daily work to keep flowing.

---

## Channel 3 — Email (the backstop that makes the other two pay)

Pinterest and Google clicks are rented; the email list is owned. The capture is already wired (MailerLite, starter-guide + print-launch forms, welcome chain). The job: **convert a slice of every visitor into a subscriber** so a Pinterest spike becomes a permanent audience.
- The starter-guide lead magnet is the hook on every journal page — keep it above the fold on long articles.
- One calm newsletter every 1–2 weeks: a new guide + one product pick. Drives repeat clicks (and affiliate revenue) at zero acquisition cost.

---

## What NOT to do (preserve the brand + the budget)

- **No paid ads yet.** Our margins (3% Amazon affiliate) don't support paid acquisition. Earn the clicks; don't buy them.
- **No Instagram/TikTok grind.** Different intent (entertainment, not search), enormous time cost, weak link-out. A calm brand doesn't need to dance. Pinterest *is* our visual social.
- **No link-dumping affiliate pins.** Pinterest demotes them and it's against their spirit — always route through a real article.

---

## The first two weeks (do these in order)

1. **(owner)** Pinterest Business account + claim calmandoak.com + enable Rich Pins.
2. **(owner)** Google Search Console: verify domain + submit sitemap. Bing too.
3. **(me)** Reformat the 65 existing pins into ~150 fresh-image variants + load the schedule (via blotato or hand-off a CSV to the native scheduler).
4. **(me)** Build the 8–10 boards' keyword descriptions + assign each existing pin to its board.
5. **(both)** Turn on a 5–10 pin/day schedule. Watch GSC + Pinterest analytics weekly; double down on whatever moves.

After two weeks we'll have real data on which articles and pin formats pull clicks — and we scale those, specifically.

---

## How we'll know it's working

| Signal | Where | Healthy by month 3 |
|---|---|---|
| Pinterest outbound clicks | Pinterest analytics | 1,000–3,000 / mo |
| Organic impressions | Search Console | climbing weekly, first clicks landing |
| Affiliate clicks | Plausible/GA `Affiliate Click` event | tracks with traffic — the revenue proxy |
| Email signups | MailerLite | 1–3% of visitors |

The whole plan is intent-first: we are not interrupting anyone. We're showing up where people are *already* searching for the calm, beautiful, well-sourced room we've spent all this time building.
