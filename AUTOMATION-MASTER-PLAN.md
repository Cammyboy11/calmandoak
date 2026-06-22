# CALM & OAK — CONTENT AUTOMATION MASTER PLAN
*Created 2026-06-12. Supersedes the ad-hoc daily-pins task. Companion to CALM-AND-OAK-MASTER-PLAYBOOK.md, SAFEGUARDS.md, PLAYBOOK-AUDIT-CORRECTIONS.md, CONTENT-ROADMAP.md.*

**Objective:** a self-running engine that batch-produces and schedules 5 pins/day for the next 6 months (~915 pins), at magazine quality, split across three destinations: calmandoak.com (journal/Looks/guides), Amazon products (affiliate), and our own guides/prints (Etsy + Payhip workbooks).

---

## 1. What we already have (audited 2026-06-12)

**Finished pin inventory — 395 ready-to-publish images** in `final pins/` (gitignored, 1000×1500):
213 affiliate pins · 91 mixed "stunning batch" (8 art-directed archetypes via `_pins07.js`) · 47+5+13 editorial batches · 25 product pins (`pp-<ASIN>.jpg`, Gemini-elevated real product photos) · 1 seed. Plus 178 day-numbered sample pins in `04-sample-pins/`, 10 board covers, 5 overlay templates, full brand system (`01-brand-assets/BRAND-AND-DESIGN-SYSTEM.md`).

**Copy inventory:** PIN-COPY-PRODUCT-BATCH-1/2/3 + PIN-COPY-NEW-PAGES — titles, editorial descriptions with FTC disclosure line, journal destination URLs with UTM, and raw Amazon URLs with `tag=calmandoak-20`.

**Product data:** VALIDATED-ASINS tables (stars/reviews/velocity/caveats per ASIN), ASIN-VERIFICATION-2026-05-27 (19 replacements sourced after link rot), PRODUCTS-DAYS-1-30, 42-day audit in the playbook PART 4, days 43–180 mix defined in PART 7.

**Distribution already running:** Pinterest account (21.2K monthly viewers), 2 Cowork scheduled tasks (`calm-oak-daily-pins` 08:05, GSC daily indexing), MailerLite welcome automation live, 32 Etsy listings, 3 Payhip workbooks + site /shop/workbooks pages staged.

## 2. The non-negotiable rules (codified from the Claude Code sessions)

These are baked into every automated run as a hard QA gate. A pin that fails any check is not published — it's flagged.

1. **Picture–product identity (the sacred rule).** Any pin or article image that carries an Amazon link must depict the *exact product* at that ASIN — not the category, not a lookalike. (SAFEGUARDS.md check 1/2/4; the 2026-05-26 headboard/carafe incident is why.)
2. **ASIN quality bar:** ≥4.3★ (validate at 4.4+ when sourcing new), ≥200 reviews (≥100 only for minor accents, flagged), in stock/Prime, no "Frequently Returned" badge, healthy sales velocity, correct variant (colour/size) set before linking.
3. **Affiliate disclosure on every surface:** "(As an Amazon Associate, Calm & Oak earns from qualifying purchases.)" in every pin description that leads to a monetised page or product; site-wide disclosure page updated as new programs (Awin/Etsy etc.) come online.
4. **Editorial voice.** Magazine register, not ad copy: specific, calm, no exclamation marks, no "must-have". Title = editorial headline; description = one idea + one texture detail + quiet CTA.
5. **Quality over volume (2026 algorithm).** PLAYBOOK-AUDIT-CORRECTIONS finding #3: Pinterest now penalises low-effort volume. 5/day is acceptable **only because every pin is unique-image, art-directed, and product-verified**. If saves/outbound-click rates fall 3 weeks running, the system auto-recommends dropping to 3/day quality cadence — that correction doc supersedes raw volume targets.

## 3. The pipeline (what "fully automated" means per pin)

```
SOURCE → SCREEN → IMAGE → COPY → QA GATE → SCHEDULE → MEASURE
```

1. **Source** — pull next slots from the weekly mix (below); products come from the validated-ASIN pool first, new candidates second.
2. **Screen** — for new products: open amazon.com/dp/<ASIN> (Chrome), capture stars/reviews/stock/FR-badge/variant, record in VALIDATED-ASINS. Monthly re-verification sweep of ALL live ASINs (last sweep found 19 broken — links rot fast).
3. **Image** — real product photo of the verified ASIN → **Gemini image-to-image elevation** (2:3, 2K, "grounded" room-context style per IMAGE-BRIEFS) → brand overlay via the `_pins07.js` sharp/SVG archetype system (8 layouts, Cormorant/Inter, the palette). Editorial/idea pins skip the product photo and use Gemini text-to-image scene generation under the same briefs.
4. **Copy** — editorial title + description + disclosure + hashtag set, in the PIN-COPY batch format, written fresh per pin.
5. **QA gate** — automated SAFEGUARDS run: picture↔product match, ASIN bar, caption match, link resolves, disclosure present, board correct, UTM present. Output = a verification block appended to the batch doc (same format as SAFEGUARDS.md).
6. **Schedule** — 5 slots/day (≈ 8:00 / 11:00 / 14:00 / 17:00 / 20:00 local), queued a full week at a time.
7. **Measure** — weekly scorecard: impressions, saves, outbound clicks by destination (site / Amazon / Etsy), email signups, affiliate clicks; feeds next week's mix.

## 4. The weekly mix (35 pins — playbook PART 7, extended for prints + guides)

| Slot | Count | Destination |
|---|---|---|
| New journal-guide pins (the week's article) | 5 | Site (journal) |
| Single-product hero pins (validated ASINs) | 5 | Journal section w/ UTM (Amazon URL as fallback) |
| Round-ups ("5 X under $Y") | 5 | Site (journal/Looks) |
| Get-the-Look multi-product | 5 | Site (Looks) |
| Seed/brand mood pins | 5 | Site (shop hub) |
| Print pins (Etsy listings, LAUNCHSALE framing while live) | 5 | Etsy |
| Guide/lead-magnet pins (starter guide, workbooks, *Considered* magazine) | 5 | Site (begin-here / workbooks / magazine) |

Six-month math: 915 slots needed; 395 in inventory (after dedupe vs already-pinned, assume ~350 usable) → factory must net ~20 new pins/week — covered by 2 journal rebuilds/week (6–8 pins each) + Gemini product elevations + archetype recrops. Comfortable.

## 5. Automation architecture (three scheduled tasks replace one)

**A. `calm-oak-weekly-factory` — Sundays 14:00 (the heavy run, ~1-2h autonomous).**
Builds next week's full 35-pin batch end-to-end: sources/screens products, generates Gemini images + overlays, writes copy, runs the QA gate, writes the batch doc (`final pins/batches/2026-WW.md`), then **schedules all 35 into Pinterest's native scheduler** (fits inside the 2-week window; reliability per playbook is high). Publishes the weekly scorecard and flags anything needing Cameron (new ASIN exceptions, drafts low, affiliate approvals).

**B. `calm-oak-daily-pins` — 08:05 daily (already live, demoted to monitor/backstop).**
Verifies today's 5 scheduled pins exist and posted; publishes from reserve drafts only if a slot is empty. Keeps the system honest when the factory misses a week.

**C. `calm-oak-monthly-audit` — 1st of month 09:00.**
Full ASIN re-verification sweep (the link-rot defence), affiliate link spot-checks, disclosure audit, board grooming, prune underperforming pin archetypes, refresh the validated pool.

**Honest constraint:** Cowork scheduled tasks run while the Claude desktop app is open. The factory needs the machine on Sunday afternoons; the daily monitor is light. Two paths to *true* hands-off: (1) **Blotato re-auth** — the factory then API-schedules the week regardless of Pinterest's window, and a closed-laptop Sunday only delays generation, not publishing (pins are already queued ahead); (2) longer term, a Make.com scenario (already connected) holding the publish queue in the cloud. Recommended: Pinterest native scheduler now + Blotato as soon as you re-auth.

## 6. What only Cameron can unlock (one-time setup)

1. **Gemini API billing** — image generation is paused since IMAGE-BRIEFS ("paused until Google Cloud billing is enabled"). Enable billing on the Google Cloud project and drop the API key into the repo `.env` (never committed). Rough cost: ~900 image generations over 6 months ≈ $30–80 total at current Imagen/Gemini image pricing — the only real spend in this plan.
2. **Blotato re-auth** (my.blotato.com/settings/api) — upgrades the publish layer from "app must be open" to fully cloud-scheduled.
3. **Affiliate program applications** (playbook PART 2, corrected order): Payoneer → Etsy via Awin → ShareASale → Target via Impact (low expectations). Until approved, Etsy print pins use direct shop links (our own shop = no program needed) and Amazon remains the monetised leg.
4. **Approve the cadence policy**: 5/day with the auto-step-down rule in §2.5, or fixed 3/day quality cadence.
5. **One "Run now"** on each new scheduled task to pre-approve browser/file permissions so unattended runs never stall.

## 7. Rollout

- **Week 0 (this week):** Cameron clears §6 items 1–2 + 4–5. Claude converts the daily task to monitor mode, creates the factory + audit tasks, builds Week 1's batch from existing `final pins/` inventory (no Gemini needed yet — 350-pin runway), schedules it.
- **Weeks 1–4:** factory runs on inventory + begins Gemini production for the days 43–180 mix; 2 journal rebuilds/week per CONTENT-ROADMAP sprint order; first monthly ASIN sweep.
- **Month 2+:** steady state. Cameron's only recurring jobs: glance at the Sunday scorecard, approve new-product exception flags, keep the app open Sundays (or re-auth Blotato and skip even that).

## 8. Scoreboard (factory reports every Sunday)

Pinterest impressions / saves / outbound clicks by destination · pins published vs plan (35/wk) · QA pass rate · validated-ASIN pool depth (alert < 40) · pin inventory runway (alert < 3 weeks) · email subscribers · affiliate clicks & revenue by program · Etsy visits/orders. Targets at 6 months (playbook, audited version): 50K monthly impressions, 5K site sessions/mo, 1K subscribers, affiliate $100–500/mo, Etsy converting via reviews flywheel.
