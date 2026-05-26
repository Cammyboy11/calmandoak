# Phase D — Launch Plan: Print Collection + Verticals

Status as of 2026-05-26: **landing page live, list-capture wired, full transactable launch awaiting owner decisions.**

This doc is the owner playbook for the two Phase D priorities from `VERTICALS.md`:
1. **Print Collection (POD)** — our first owned physical product.
2. **Quiet Wardrobe** — second affiliate vertical (Japandi loungewear / linen fashion).

---

## What ships in this commit (no owner approval needed)

### Print Collection — landing page state
- `/shop/prints/` live: "Opening soon" hero, 4 print figures with copy and `VisualArtwork` schema, "Made the way we'd want them" section, double signup CTA, sitewide footer link.
- All 4 print designs already render: Ensō, Two Woods, Single Stem, Serene Dawn. Magazine-quality, on-brand.
- Sitemap entry present (`<priority>0.8</priority>`, weekly changefreq).

### List capture
- New MailerLite group **"Calm & Oak — Print Launch List"** (id `188519699722536376`).
- New MailerLite embedded form **"Calm & Oak — Print Launch List Signup"** (id `188519737346491507`) linked to that group, double opt-in ON.
- `assets/js/main.js` now routes by `data-signup` attribute:
  - default → starter-guide form (every signup outside `/shop/prints/`)
  - `data-signup="prints"` → print-launch form
- `/shop/prints/index.html` — both signup forms tagged `data-signup="prints"`. Success copy on prints is "You're on the list. We'll email you the moment the print shop opens — with a subscriber-only launch discount."
- Analytics events (`plausible('Signup', { list })` and `gtag('event', 'signup', { list })`) now carry a `list` property so the two streams are separable.

### Verticals scoped (this doc)
- Print Collection: POD provider comparison + recommendation + 7-step go-live checklist.
- Quiet Wardrobe: vertical scaffold + sourcing template + page-build checklist.

---

## Print Collection — POD provider decision

We need a provider that prints to order on heavyweight matte archival-style paper, ships flat or rolled, integrates cleanly with a static-site checkout, and doesn't dilute the brand.

| Provider | Paper / quality | Sizes | Margins (after costs) | Integration with a static site | Brand fit |
|---|---|---|---|---|---|
| **Gelato** | 200 gsm matte fine-art (Hahnemühle/Enhanced Matte). Global print-near-buyer (sub-week delivery, lower carbon footprint). | 8×10 → 30×40 + custom | Strong on large sizes; modest on small. | Native Shopify, WooCommerce, **Etsy**; no first-party hosted checkout. | ★★★★★ — calm, neutral brand, sustainability story aligns. |
| **Printful** | 200 gsm matte (Enhanced Matte Paper). Largest catalogue, most reviewed. | 8×10 → 24×36 | OK; not the leader on large sizes. | Shopify, WooCommerce, **Squarespace**, Etsy, **hosted "Storefront"**. | ★★★★ — generic but professional. |
| **Printify** | Varies by partner (Sensaria, etc.); paper depends on selected print house. | 8×10 → 24×36 | Highest (cheapest base), but partner quality is inconsistent. | Shopify, Etsy, WooCommerce. | ★★★ — quality variance is a brand risk for the first owned product. |
| **Print Aura / Aura Print** | Premium UK-leaning fine-art papers. | Up to A1. | Lower volume → less leverage. | Shopify, WooCommerce. | ★★★★ — quality strong, but US shipping cost. |

**Recommendation: Gelato.** Best paper quality at the brand's price point, print-near-buyer means a US/UK/AU/EU customer all get sub-week fulfillment at a reasonable cost, Hahnemühle papers are name-checkable on the product page ("museum-grade matte fine-art paper"), and Etsy is available as an early no-build channel if we want to test demand before building checkout.

**Pricing model (recommended):**
| Size | Gelato base (US) | Sell price | Margin |
|---|---|---|---|
| 8×10 | ~$8 | **$28** | 71% |
| 11×14 | ~$11 | **$42** | 74% |
| 16×20 | ~$18 | **$68** | 74% |
| 18×24 | ~$23 | **$88** | 74% |

(Base prices are illustrative — owner verifies on Gelato dashboard at signup. Sell prices anchor to the "premium gallery print" segment, not the mass-market $9.99 Society6 segment, because the brand is calm-premium-quiet, not bargain.)

---

## Owner go-live checklist (Print Collection)

1. **Sign up for Gelato** (gelato.com) — free account, no minimums. Upload payment + tax info.

2. **Upload the 4 designs at print resolution** (300 DPI). The four web-quality JPEGs in `assets/img/prints/` are landing-page renders, **not** print files. The original high-resolution source files need to come from the design tool (Photoshop, Affinity, Figma export, etc.) at:
   - 8×10 → 2400×3000 px
   - 11×14 → 3300×4200 px
   - 16×20 → 4800×6000 px
   - 18×24 → 5400×7200 px
   - Hand off as **TIFF or PNG** with embedded sRGB or AdobeRGB profile.
   - If the originals aren't archived: regenerate via Gemini at `imageSize: 4K` + upscale to print resolution; expect 2-3 iterations per design to get a clean print proof.

3. **Order one printed proof of each design** at 11×14 before going public. ~$60 total. Inspect color, paper weight, packaging. Adjust files if needed.

4. **Decide on checkout architecture.** Three options, in order of effort:
   - **(a) Etsy storefront** — fastest. Create a "Calm & Oak" Etsy shop, list the 4 prints. Gelato fulfills automatically. Replace the "Opening soon" CTA on `/shop/prints/` with "Shop the collection on Etsy →". No site code changes. **Recommended for week-1 launch.**
   - **(b) Snipcart + Gelato** — keeps checkout on calmandoak.com. Snipcart adds a `data-item-...` button to each print; Gelato webhook fulfills. ~$10/month + 2% tx. ~1 day of integration work; needs a free SSL endpoint to receive Gelato webhooks (Cloudflare Worker).
   - **(c) Shopify Lite + Gelato** — full control. $29/month + Shopify tx fees. Owner builds product pages in Shopify, embeds Shopify Buy buttons here. Best long-term, heaviest setup.

5. **Replace the "Opening soon" hero** on `/shop/prints/`:
   - Eyebrow: `Shop · The Print Shop` (drop "Opening soon")
   - CTA: replace the signup form with "Shop the collection →" linking to Etsy / Snipcart cart / Shopify, per (4).
   - Keep the signup section at the bottom — re-frame from "Be first in" to "New prints, occasional drops" so it stays a list-builder.

6. **Build a launch automation in MailerLite** triggered by joining the Print Launch List group (group id `188519699722536376`). Single email at launch:
   - Subject: `The print shop is open` (or similar)
   - Body: 4 prints, links to each, the launch-discount code
   - One CTA only

7. **Send the launch email** to the Print Launch List on the day Etsy/Snipcart goes live. Then enable the regular newsletter cadence to mention prints once a month maximum (this is the calm brand — don't burn the list with sales emails).

---

## Quiet Wardrobe — vertical scoping

Per `VERTICALS.md`, the second Phase D priority is **Quiet Wardrobe**: Japandi-adjacent loungewear, linen, robes, slippers — affiliate-first, owned later. The existing `/journal/quiet-wardrobe/` guide is the editorial seed.

### Build plan (no greenlight needed beyond product approval)

1. **Create `/shop/wardrobe/` category page** — clone `/shop/textiles/` template:
   - Hero: "The Quiet Wardrobe — calm essentials in linen, cotton, wool"
   - 8–10 product cards, same `product-grid` markup as other shop categories
   - JSON-LD `BreadcrumbList` + `ItemList` (every product has a verified ASIN)

2. **Source 8–10 first products** under the same product-first rules used for home:
   - **Tops/loungewear**: linen popover, linen tunic, oversized cotton tee
   - **Bottoms**: linen wide-leg pants, cotton drawstring pants
   - **Outerwear**: linen kimono robe, waffle bathrobe
   - **Feet**: linen house slippers (e.g. Sabah-style), woven slides
   - **Accessories**: tote (waxed cotton or canvas with leather strap), wool socks
   - All ≥4.3★ / ≥200 reviews / in stock / no returns-flag, calm-neutral palette (oat, sand, charcoal, sage, terracotta only — no logos, no slogans).

3. **Vendor mix beyond Amazon:**
   - Amazon Associates covers the first 6–8 products (existing affiliate plumbing).
   - **Awin** carries Quince, Jenni Kayne, Eberjey, Cuyana — better commission rates on fashion (5–10%) than Amazon (3%). Owner signs up at awin.com → adds the JS tracker → category page can mix Amazon + Awin product cards using the same card markup, different `tag=` parameter handling per vendor.

4. **Editorial cross-links** — every existing wardrobe-adjacent journal article gets a "Shop the Quiet Wardrobe →" cross-link in its closing aside:
   - `/journal/quiet-wardrobe/`
   - `/journal/300-dollar-closet-capsule/`
   - `/journal/linen-vs-cotton-vs-wool/`
   - `/journal/linen-care/`

5. **First Look on the wardrobe side** — extend the Looks pattern from rooms to outfits. "The Quiet Sunday" — linen tunic + linen pants + slippers + tote, ~$250. Use the same `shop/looks/` template; this becomes the bridge from "home" to "fashion" without dropping a separate `/wardrobe/looks/` shelf yet.

6. **Pinterest expansion** — wardrobe pins on a new "Quiet Wardrobe" Pinterest board, same Template B format. The image-render workflow (Gemini, 2:3, 2K, grounded) transfers cleanly to outfit shots.

### Owner decisions needed for Quiet Wardrobe
- Sign up for **Awin** (and join Quince, Jenni Kayne, Eberjey programs as they accept).
- Approve the first 8–10 wardrobe products (I'll bring them in a sourcing batch).

---

## Beyond prints + wardrobe (longer-term, scoped)

Per `VERTICALS.md`, the remaining sequence:
- **Wellness & bath ritual** (NEXT): affiliate-first. Robes, towels, incense, diffusers — natural extension of `shop/outdoor-wellness`. Estimate: 1 session to source + build category.
- **Japandi nursery / kids** (NEXT): high Pinterest demand, Montessori-adjacent. Owner decides if this is on-brand enough or a brand stretch.
- **Japandi Playbook (paid digital)** (NEXT): the existing 18-page starter guide expanded to a 60-page paid playbook. Stripe Payment Link or Gumroad as checkout. ~1 week of writing + design.
- **Scent line (private label)** (LATER): only after wardrobe + wellness affiliate data shows scent demand.
- **Membership** (LATER): only after the email list crosses ~5K confirmed subscribers.

---

## Summary — what's blocking what

| Item | Status | Blocker |
|---|---|---|
| Print landing page live | ✅ done | — |
| Print launch list capture | ✅ done | — |
| Print shop transactable | ⏳ scoped | Owner: Gelato signup → upload print files → choose Etsy / Snipcart / Shopify → launch (steps 1–7 above) |
| Wardrobe category page | ⏳ scoped | Owner: source 8–10 wardrobe products → I build the page from template |
| Awin / fashion affiliate accounts | ⏳ scoped | Owner action only |
| Wellness, nursery, playbook, scent, membership | ⏳ documented in VERTICALS.md | Sequenced after wardrobe results |
