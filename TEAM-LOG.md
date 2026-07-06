# Calm & Oak — Team Log (shared channel)

The agents' shared coordination log. When one agent produces an asset another needs
(a new article URL, a keyword-gap list, a pin batch, a staged email), it appends a
dated line here so Pinterest, Email, and Outreach can act on it. Newest at top.

Format: `YYYY-MM-DD · AGENT · what · link/where · status (live | staged | needs-Cameron)`

---

## Active hand-offs

- 2026-06-29 · COWORK (Cameron session) · **FRAMES cross-sell is LIVE** at `/shop/frames/` — framing guide + print→frame size-matcher + Etsy print cross-sell, with affiliate *search* links (tag `calmandoak-20`) and FAQ/Breadcrumb schema. **Needs-merchandiser:** upgrade the search links to image product cards — source + verify an Amazon ASIN and crop a `p-<ASIN>.jpg` for each of the 8 frames below, then drop the cards into a `product-grid` on `shop/frames/index.html` (card markup + alt text already written in this session). These are Amazon affiliate, **not Gelato POD**. NOTE: `_gaplist.js` only auto-detects gap cards that are `<article class="product">` with an `amazon.../s?k=` CTA, so the frames need that card form added (currently a table) to enter the worklist. Frames to source (query · tier): light-oak-11x14 `$` · light-oak-8x10 `$` · light-oak-16x20 `$$` · slim-black-metal-11x14 `$` · natural-wood-float-frame `$$` · oak-gallery-wall-set `$$` · 3×-matching-11x14-oak `$$` · white-mat-11x14-for-8x10 `$`. Also shipped same session: prints page `wa` + `sage-stone` Etsy links wired in `print-links.js`, paper-weight corrected to 250gsm, and the size list reconciled to 8×10/11×14/16×20. · live (frames page + prints fixes); needs-merchandiser (8 frame ASINs + images)

---

## Log

- 2026-06-25 · Bartok AM · Money card written (`Bartok/money-cards/2026-06-25-AM.md`), first card / baseline. LEAK: measurement blackout — GA4/GSC/MailerLite/Awin credentials all empty in .env, so ~80 posts published this week (Pinterest 37, TikTok 30, IG 30) carry zero attributable outcomes; underneath it the two paid guides sit at $0 with buy buttons disabled. LEVER: turn on the already-built digital-product stream (~100% margin) — merchandiser holds, email pre-stages one promo. ONE UNLOCK: Cameron completes the 3 Payhip steps (`node _build-product-pdfs.js` → upload PDFs → paste share URLs into `assets/js/guide-links.js` → redeploy) to switch the two paid guides live. No spend, send, or account change made. · staged (needs-Cameron: Payhip activation)

- 2026-06-24 · CRO · EMAIL-CAPTURE GAP CLOSED on the cornerstone journal guides. Audited the live capture mechanism: signup is already wired end-to-end (`assets/js/main.js` → MailerLite JSONP form 188364767967053815, account 2375797 → "Starter Guide" group/welcome automation; success note hands over the PDF instantly via `/assets/starter-guide/Japandi-Starter-Guide.pdf`, and the palette/calculator forms hand over the cheat-sheet). Capture was already present on 70 pages but MISSING from 8 high-value organic-search journal guides — added the standard on-brand Starter-Guide signup block (matching the japandi-bedroom pattern) to: honest-materials, layering-textiles, lighting-the-five-pm-room, single-stem-rule, the-30-30-30-rule, two-woods-rule, wabi-sabi-ceramics, warmth-without-clutter. Each of these 8 now routes to all three (email capture + Amazon product links + footer calculator/palette tool). Also fixed the "An 20-page" → "A 20-page" grammar bug in the capture copy on the 5 highest-traffic pages (home, /begin-here/, journal index, japandi-101, japandi-living-room). Hypothesis: the 8 guides pull steady organic traffic with zero owned-list capture; adding the prominent magnet should convert a share of that to subscribers at near-zero cost. NOTE: shops `/shop/dining/` + `/shop/living-room/` are noindex redirect stubs — correctly skipped. NO sends, no pricing/account/DNS changes. ESCALATE — git/shell are blocked in this session, so the edits are in the working tree but NOT yet committed/pushed; Cameron (or an agent with shell access) must `git add` the 13 changed files + `git commit` + `git push` to deploy via Cloudflare Pages, then confirm the capture renders on the 8 deployed journal URLs. Remaining "An 20-page" typo still present in ~57 other lower-traffic pages — safe to batch-fix in a follow-up scripted pass. · staged (needs-Cameron: commit+push to deploy)

- 2026-06-24 · CONTENT-FACTORY · PRINTS "first-dollar" pin batch built (15 pins) targeting the 31 LIVE Payhip print products via their on-site print pages `/shop/prints/<slug>/` (Payhip buy button + Product schema confirmed live on enso). Designs across all 5 series (sumi-e, botanical line, landscape/abstract, moon, kanji, tonal); picture↔product identity inherently clean (pin image = the print sold). Full QA gate PASSED on all 15. Destinations carry UTM `utm_campaign=prints&utm_content=<slug>`. Batch staged at `final pins/batches/2026-26.md`. **BLOCKED — NOT published:** both Blotato MCP servers returned permission-denied (accounts/boards unverifiable, nothing scheduled); staged per the "if Blotato unavailable, stage + flag" rule. NEEDS-CAMERON: re-authorize the Blotato MCP for this agent — it is the only blocker to publishing this batch + the ongoing 3-prints-pins/day Pinterest cadence. Inventory runway healthy (16 designs still unpinned, no generation needed). · staged (needs-Cameron: Blotato auth)

- 2026-06-24 · MERCHANDISER · FIRST PAID DIGITAL PRODUCTS + storefront shipped. Two premium printables built end-to-end (print-ready HTML → PDF via the cheat-sheet pipeline) and given full-chrome sales pages: (1) **The Japandi Home Plan** — 12-page room-by-room plan (palette + two woods + shopping order + budgets + per-room checklists), sales page calmandoak.com/shop/guides/japandi-home-plan/, suggested $19. (2) **The Japandi Styling Pack** — 10-page styling system (shelf/surface formulas + 3-weight texture rule + print pairing + lighting + 30-day plan), sales page calmandoak.com/shop/guides/japandi-styling-pack/, suggested $12. New storefront hub **calmandoak.com/shop/guides/** lists both paid guides + the free cheat-sheet/generator/calculator; linked from /shop/ (card + footer) and from the cheat-sheet + calculator footers. Both products are MORE than the free cheat-sheet (do not cannibalise the lead magnet — the free one is colour, these are the build + the styling). EMAIL: please draft a promo for the new /shop/guides/ hub + the two landers once they're live; great upsell to the cheat-sheet list. PINTEREST/CONTENT: three new money-page URLs to pin and cross-link from the journal guides (Home Plan ↔ budget-room + two-woods articles; Styling Pack ↔ prints + palette articles). · live (buy buttons safely disabled showing "Available shortly" until Cameron does the 3 Payhip steps below — NEEDS-CAMERON)

### MERCHANDISER 2026-06-24 — Payhip steps for Cameron (per product — checkout-platform action, intentionally not auto-done)
> 1. Render the PDFs (one-time): from the repo root run `node _build-product-pdfs.js` → writes `assets/japandi-home-plan/The-Japandi-Home-Plan.pdf` and `assets/japandi-styling-pack/The-Japandi-Styling-Pack.pdf` (puppeteer is installed). 2. In Payhip → Add new product → Digital → upload that PDF. 3. Set price ($19 Home Plan, $12 Styling Pack — or your call) + name/description. 4. Copy the product's share URL (https://payhip.com/b/XXXXX). 5. Paste each URL into `assets/js/guide-links.js` → the `PRODUCTS` map (replace the empty "" for `japandi-home-plan` / `japandi-styling-pack`), save, redeploy. The Buy buttons switch on automatically — no page edits. (Optional: also list both on Etsy like the prints.)

- 2026-06-24 · MERCHANDISER · Japandi palette cheat-sheet shipped (the lead magnet /palette/ + /calculator/ promised). Landing page calmandoak.com/palette-cheat-sheet/ + print-ready asset /assets/palette-cheat-sheet/japandi-palette-cheat-sheet.html (5 signature palettes w/ hex, 3 rules, room-matcher, 5 mistakes — on-brand, US-Letter, save-to-PDF). Signup success-note on /palette/ + /calculator/ now hands over the cheat-sheet instantly. EMAIL: please promote the new lander; one open item for Cameron — the live MailerLite welcome email still attaches the Starter Guide, not the cheat-sheet (provider-settings change, needs Cameron). PINTEREST/CONTENT: new link-magnet URL to pin/cross-link. · live (1 needs-Cameron: PDF binary + MailerLite attach)

- 2026-06-23 · OUTREACH · Weekly cycle (first live run). 3 HARO/Qwoted/Featured-style pitches DRAFTED (no send channel connected — needs Cameron to connect platform/email before send). GSC status: live MCP denied, used 90-day-plan baseline + manual SERP read. Ranked keyword-gap list (10 ideas, office-weighted) handed to Content/ranker. Full detail below. · staged (needs-Cameron to send pitches)

### OUTREACH 2026-06-23 — (1) Staged journalist pitches

> Channel status: NO journalist-request platform or outreach email is connected to this agent. The live HARO/Qwoted/Featured feeds sit behind logins and are not reachable via web search, so the three below are written against the *recurring, currently-active request types* these outlets run in the home/interiors vertical (verified by live 2026 trend coverage). All three are DRAFTED and staged. To actually send: Cameron connects a Qwoted/Featured.com account (or gives the agent a from-address) and confirms the byline/expert name + the affiliate-disclosure-free quote is OK to attribute to Calm & Oak.

**Pitch A — "Japandi home office / desk setup" (Featured.com-style expert roundup)**
Likely prompt: *"What's the one rule for designing a calm, Japandi-style home office?"*
Quote (attribute: Calm & Oak, calmandoak.com):
"The mistake most people make with a Japandi workspace is treating 'minimal' as 'empty.' It isn't — Japandi is warm minimalism. The rule we give readers is the two-woods rule: pick one mid-tone wood for the desk (oak or ash) and one darker accent (walnut) for a tray or shelf, then stop. Two woods read as intentional; three reads as clutter. Keep the desk surface to a six-object maximum — laptop, lamp, a single ceramic vessel, a notebook, one plant, one tray to corral the rest — and let the natural grain do the decorating. A calm desk isn't a bare desk; it's an edited one."
Why it lands: concrete, named ("two-woods rule," "six-object rule") = quotable; ties directly to /journal/two-woods-rule/ and /journal/japandi-home-office/.

**Pitch B — "2026 interiors trends" (HARO/Qwoted-style trend request)**
Likely prompt: *"Which interior trend is still going strong in 2026, and how should readers actually use it?"*
Quote (attribute: Calm & Oak):
"Japandi isn't slowing in 2026 — it's maturing. The shift we're seeing is away from the cool, greige version toward warmer, lived-in neutrals: oat and clay instead of stark white, more visible wood grain, a little more texture. Practically, that means readers can lean into Japandi without their home feeling cold or showroom-y. Start with the palette — a warm neutral base, one grounding earth tone, one muted natural like sage — and build the room from materials before objects. Get linen, oak and stoneware in the room first; the styling takes care of itself."
Why it lands: matches the live 2026 'warmer Japandi' trend signal; ties to /journal/japandi-color-palette/ + /palette/ (the cheat-sheet link-magnet).

**Pitch C — "Small-space / WFH styling" (Featured.com-style request)**
Likely prompt: *"How do you create a calm work-from-home corner in a small space?"*
Quote (attribute: Calm & Oak):
"You don't need a spare room — you need a defined edge. In a small space, a Japandi work corner works because it visually closes itself off: a slim solid-wood desk against the wall, a single woven or wood-frame chair, and one vertical element — a narrow shelf or a framed print — to draw the eye up and make the zone feel deliberate rather than borrowed from the living room. Keep everything on a tray so the 'office' can disappear at 6pm. Calm comes from the boundary, not the square footage."
Why it lands: answers a high-volume small-space angle; ties to /shop/looks/the-japandi-workspace/ + the planned 'Small Japandi Office Ideas' article.

### OUTREACH 2026-06-23 — (2) Search Console / technical status

> **Live GSC NOT reachable this run** — the connected Ahrefs/GSC MCP returned permission-denied for this agent (management-projects + gsc-* tools). No Search Console property is wired to the agent. Reported below = 90-day-plan baseline (June 2026) + a manual SERP read via web search. **Needs-Cameron:** authorize the GSC/Ahrefs MCP for this agent (or paste a GSC performance export) so positions/indexing can be tracked live each week.

- **Office-cluster positions (baseline, GROWTH-PLAN):** japandi office chair ~12.0 (page-1 bottom), japandi desk chair ~12.1, japandi home office ~22.7, japandi desk ~26.5, japandi executive desk ~25.1, japandi office ~37.6. No dedicated chair/desk page exists yet — both pos-12 terms are ranking off /shop/office/ + /journal/japandi-home-office/ alone.
- **Manual SERP read (2026):** "japandi office chair" / "japandi desk" SERPs are dominated by retailer collection pages (AllModern, Wayfair, 2Modern, Article, shopjapandi) + a few thin blog roundups (rosstopia, mojoboutique). Editorial gap is real — a genuinely useful "verified picks" page with material/why-it-fits reasoning can realistically crack top 10 from pos 12. This validates Tier-1 articles #1 and #2 as the highest-ROI writes.
- **Indexing backlog:** 42 indexed / 64 "discovered – not indexed" (baseline). Cannot confirm movement without live GSC — flagging to re-check next run once access is granted. New URLs since sitemap: /palette/ (lastmod 2026-06-23) — **request indexing** once live GSC is reachable.
- **Schema guardrail check:** could not validate the Product-snippet status live (GSC denied). Manual reminder to ranker: affiliate products MUST stay plain ListItem (name+url+image); only own /shop/prints/* use Product+offers. The 102-invalid-items issue can only be confirmed cleared via GSC — escalating that confirmation to next run / Cameron.
- **No DNS/redirect/account changes made or attempted** (per guardrails). The www 5xx redirect note (if still open) remains a Cameron task.

### OUTREACH 2026-06-23 — (3) Ranked keyword-gap list for Content / calmoak-seo-ranker

> Weighted to the office cluster (north-star). Rank = priority to write. Each maps to plan tiers; office terms first because they already earn impressions at pos 12–37.

1. **japandi office chair / japandi desk chair** → "Best Japandi Office Chairs (Comfort Without the Clutter)" — both already pos ~12, NO dedicated page, retailer-only SERP = fastest top-10 win. (Plan Tier-1 #2)
2. **japandi desk / japandi executive desk** → "Japandi Desk: 9 Solid-Wood Picks for a Calm Workspace" — pos 25–26, strong commercial intent, solid-wood angle confirmed live. (Tier-1 #1 / #3)
3. **japandi home office** (deepen) → refresh /journal/japandi-home-office/ as the cluster HUB; add internal links down to the new chair + desk pages. (supports whole cluster)
4. **small japandi office / japandi office corner** → "Small Japandi Office Ideas (for a Corner or Closet)" — high small-space demand, low competition. (Tier-2 #9)
5. **japandi desk setup / how to style a japandi desk** → "How to Set Up a Japandi Desk — the 6-object rule" — styling/informational, feeds Pitch A's quotable rule. (Tier-2 #7)
6. **japandi desk accessories** → "Japandi Desk Accessories: 10 Pieces That Earn Their Place" — long-tail, high affiliate fit. (Tier-2 #8)
7. **japandi wall colours / japandi colours** → "Japandi Wall Colours: 8 Paint Picks (with Hex Codes)" — pairs with /palette/ link-magnet; supports Pitch B. (Tier-1 #4)
8. **is japandi still in style 2026** → "Is Japandi Still in Style for 2026?" trend report — link-magnet, very linkable, refresh yearly; arms outreach pitches. (Tier-4 #17)
9. **japandi office desk lighting / japandi desk lamp** → section or short post on warm task lighting for the workspace — fills a cluster gap, pairs with /journal/lighting-the-five-pm-room/. (new gap)
10. **wabi-sabi decor** → "Wabi-Sabi Decor: 12 Imperfect Pieces for a Calm Home" — broadens wabi-sabi ceramics (47 impr); ties cluster to existing /journal/wabi-sabi-ceramics/. (Tier-1 #6)


- 2026-06-22 · GEO · Baseline 0/5 in AI answers; tickets T1–T5 in GEO-LOG.md (comparison guide = highest citation odds). · live
- 2026-06-22 · FACTORY · Week-1 social: 10 Pinterest pins (6/23–6/24) + IG Reel + TikTok scheduled; "5 things" listicle Reel A/B test (6/24–6/25) with audio bed. · live

## 2026-06-24 — Prints "first dollar" batch SHIPPED (main session, autonomous)
- **Email capture deployed:** 8 journal guides gained the Starter-Guide capture block + 5 top pages got the "A 20-page" copy fix. Committed (4b59c9f) and pushed to main → Cloudflare live. Turns organic journal traffic into owned MailerLite subscribers.
- **15 prints pins SCHEDULED** to Pinterest board "Wall Art" (1107111589588494865) via Blotato acct 7556, 3/day from 2026-06-25 to 06-29 at 15/18/21 UTC. Each → /shop/prints/<slug>/ with utm_campaign=prints. (Board names in final pins/batches/2026-26.md were placeholders — corrected to the real "Wall Art" board here.)
- **NOTE for future runs:** Blotato acct 7556 has NO posting-schedule configured (useNextFreeSlot returned "no slot in 9 months"); used explicit UTC scheduledTime instead. Configure posting slots in Blotato to re-enable next-free-slot.
- Picture↔product identity clean (print render = the product). No affiliate disclosure needed (owned Payhip products).

## 2026-06-30 — Socials leveled up: IG + TikTok activated with video (main session)
- Found Instagram (@calmandoak, 53849) and TikTok (@calmandoak, 47113) connected to Blotato but DORMANT — only Pinterest was running. Activated both with calm vertical Reels.
- Built reusable pipeline: assets/video/make-reels.js (ffmpeg Ken Burns reels from print art) + SOCIAL-VIDEO-PLAYBOOK.md.
- Pilot: 4 reels (serene-dawn, moon-cycle, single-stem, dusk) generated, uploaded to Blotato, scheduled 1/day/platform to IG Reels + TikTok, Jul 1–4. 8 posts scheduled.
- Notes for future runs: IG caps hashtags at 5; TikTok needs autoAddMusic + privacy/brand flags; same mp4s can also post as Pinterest video pins (board Wall Art). TODO: fold a weekly reels step into calmoak-content-factory.
