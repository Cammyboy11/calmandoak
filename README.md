# Calm & Oak — calmandoak.com

A static, editorial Japandi affiliate site, now aligned with the locked **Brand & Design System v1.0** and the **10 Pinterest pillars** (plus Furniture). Built to deploy free on Cloudflare Pages with the GoDaddy domain wired in via DNS.

---

## What's in this build

### Brand system (locked, matches `BRAND-AND-DESIGN-SYSTEM.md`)

- **Palette:** Off-white `#F7F4EE` · Cream `#EFE8DA` · Charcoal `#2A2A28` · Graphite `#5C5A55` · Terracotta `#C97B5C` (single accent, used sparingly) · Sand `#D4B996` (alt — never with terracotta).
- **Typography:** Cormorant Garamond (display, italic accents) + Inter (body). Both Google-Fonts-loaded.
- **Wordmark:** "Calm & Oak" in Cormorant Garamond, terracotta italic ampersand, thin charcoal underline. Lives top-left and in the footer.
- **Voice:** Editorial, slightly dry, anti-jargon. "Curated" not "recommended." No exclamation marks.
- **Mark:** SVG oak-leaf favicon at `/assets/img/favicon.svg`. When you have the real `logo-A-wordmark-light.png` and `logo-C-leaf-mark.png`, drop them in `/assets/img/` — the README's Day-1 checklist tells you which file paths to use.

### Site map (mirrors your 10 Pinterest boards + Furniture)

```
/                                    Homepage
/shop/                               Shop hub — all 11 pillars
/shop/lighting/                      Pillar: Lighting
/shop/storage/                       Pillar: Storage
/shop/ceramics-tableware/            Pillar: Ceramics & Tableware
/shop/textiles/                      Pillar: Textiles
/shop/furniture/                     Pillar: Furniture (added per your request)
/shop/bedroom/                       Pillar: Bedroom
/shop/japandi-kitchen/               Pillar: Japandi Kitchen
/shop/office/                        Pillar: Office
/shop/decor-accents/                 Pillar: Japandi Decor Accents
/shop/outdoor-wellness/              Pillar: Outdoor & Wellness
/shop/dining/                        301-style redirect → /shop/ceramics-tableware/
/shop/living-room/                   301-style redirect → /shop/furniture/
/journal/                            Journal hub
/journal/japandi-101/                "What is Japandi, really?" — 7-min explainer
/journal/budget-japandi-bedroom/     "$500 Japandi bedroom" — shoppable build
/about/                              Brand story
/contact/                            Reader / partner / press
/disclosures/                        Required for Amazon Associates
/privacy/                            Privacy policy
/404.html                            On-brand fallback
/robots.txt + /sitemap.xml           SEO foundation
```

### Pinterest board → site page mapping

| Pinterest board | Site page |
|---|---|
| Lighting | `/shop/lighting/` |
| Storage | `/shop/storage/` |
| Ceramics & Tableware | `/shop/ceramics-tableware/` |
| Textiles | `/shop/textiles/` |
| Bedroom | `/shop/bedroom/` |
| Japandi Kitchen | `/shop/japandi-kitchen/` |
| Office | `/shop/office/` |
| Japandi Decor Accents | `/shop/decor-accents/` |
| Outdoor & Wellness | `/shop/outdoor-wellness/` |
| Furniture *(new)* | `/shop/furniture/` |

When you create pins, link them to the matching `/shop/[category]/` page so each pin drives users to a content-rich, affiliate-shoppable destination — not a raw Amazon URL.

---

## Monetization (4 stacked layers)

| Layer | Status at launch | When it kicks in | Realistic monthly contribution at 25k page-views |
|---|---|---|---|
| Amazon Associates | Live | Day 1, after Amazon approves | $1,500 – $4,500 |
| Email list + lead magnet (Japandi Starter Guide PDF) | Capture forms live; PDF to be created | Compounds from week 1 | $300 – $1,200 |
| Display ads (Ezoic at 10k/mo, Mediavine at 50k/mo) | Slot space reserved; not yet running | Month 3-4 | $400 – $1,800 |
| Brand collabs (sponsored room features) | `partners@calmandoak.com` channel ready | Month 4-6 | $500 – $2,500 per collab |

**Path to $2-10k/month in 6 months:**
1. Months 1-2: ship 2 fresh pins per day (per the locked pin-template rotation in `BRAND-AND-DESIGN-SYSTEM.md` § III). Drive every pin to its matching `/shop/[pillar]/` page.
2. Month 3: hit Ezoic threshold; layer ads over Amazon revenue.
3. Months 4-5: 10+ shoppable journal posts published, 1k+ email subscribers, first brand collab.
4. Month 6: Mediavine eligibility (50k sessions/mo), recurring brand collabs, top pillar pages each contributing $500+/mo Amazon revenue.

---

## Deployment — free, in ~15 minutes

### 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial Calm & Oak site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/calmandoak.git
git push -u origin main
```

### 2 — Cloudflare Pages (free)
1. https://pages.cloudflare.com → **Create a project** → **Connect to Git**.
2. Pick the `calmandoak` repo. Framework preset: **None**. Build command: *(empty)*. Build output: `/`.
3. **Save and Deploy** → you'll get `calmandoak.pages.dev` in ~30 seconds.

### 3 — Wire calmandoak.com (GoDaddy → Cloudflare)
**Recommended:** move DNS to Cloudflare (faster CDN, automatic SSL).
1. Cloudflare → **Add a site** → `calmandoak.com` → Free plan.
2. Cloudflare gives you two nameservers (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`).
3. GoDaddy → My Products → your domain → DNS → **Change nameservers** → Custom → paste the two from Cloudflare.
4. Cloudflare Pages → your project → **Custom domains** → add `calmandoak.com` and `www`. SSL is automatic. Propagation usually 1-4 hours.

---

## Day-1 checklist

- [ ] Apply for **Amazon Associates** (you need the live domain). Once approved, replace every `href="#"` in `/shop/*` with your tagged Amazon URL: `https://www.amazon.com/dp/PRODUCT_ID/?tag=YOURTAG-20`. Keep `rel="sponsored nofollow noopener"`.
- [ ] **Email provider** (ConvertKit / Beehiiv / Buttondown — all free tiers). Replace the form submit handler in `/assets/js/main.js` (TODO comment) with your provider's endpoint.
- [ ] Create the **Japandi Starter Guide PDF** and have your provider auto-deliver it on signup.
- [ ] Drop your real **logos** into `/assets/img/`:
  - `logo-A-wordmark-light.png` (used in `<header>` once you swap from CSS wordmark)
  - `logo-C-leaf-mark.png` (favicon variant)
  - `og-image.jpg` 1200×630 (Pinterest/Open-Graph preview)
- [ ] Replace the CSS-gradient placeholders on each pillar card with real photography (4:5 aspect ratio). Card HTML lives in `index.html`, `shop/index.html`, and the journal pages — search for `placeholder--lighting`, etc., and swap each `<div class="card-img placeholder--X">…</div>` for `<img src="/assets/img/pillar-X.jpg" alt="…" class="card-img" />`.
- [ ] Add **Plausible / Cloudflare Web Analytics** snippet in the `<head>` of every page (both free, both privacy-respecting).
- [ ] Submit `sitemap.xml` to **Google Search Console** and **Bing Webmaster Tools**.
- [ ] Verify the site on **Pinterest** (https://www.pinterest.com/settings/claim/) — unlocks rich Pin previews + analytics.

---

## Adding a new pillar / page (the repeating workflow)

1. Duplicate `/shop/lighting/index.html` (the cleanest template) into `/shop/[new-slug]/`.
2. Update `<title>`, `<meta description>`, `<h1>`, the eyebrow, the lede, the tag pills, and the 8-12 product cards.
3. Add the new URL to `/sitemap.xml`.
4. Add a card on `/shop/index.html` and (optionally) `/index.html`.
5. Update `/assets/css/styles.css` to add a `.card-img.placeholder--[slug]` gradient if you want a dedicated visual.
6. Design a 1000×1500 Pinterest pin per the **Brand & Design System** templates and link it to the new URL.

---

## File map

```
/
├── index.html                              # Homepage
├── 404.html
├── robots.txt + sitemap.xml
├── README.md                               # this file
├── /about/index.html
├── /contact/index.html
├── /disclosures/index.html                 # required for Amazon
├── /privacy/index.html
├── /shop/
│   ├── index.html                          # shop hub (lists all 11 pillars)
│   ├── /lighting/index.html
│   ├── /storage/index.html
│   ├── /ceramics-tableware/index.html
│   ├── /textiles/index.html
│   ├── /furniture/index.html
│   ├── /bedroom/index.html
│   ├── /japandi-kitchen/index.html
│   ├── /office/index.html
│   ├── /decor-accents/index.html
│   ├── /outdoor-wellness/index.html
│   ├── /dining/index.html                  # redirect → /shop/ceramics-tableware/
│   └── /living-room/index.html             # redirect → /shop/furniture/
├── /journal/
│   ├── index.html
│   ├── /japandi-101/index.html
│   └── /budget-japandi-bedroom/index.html
└── /assets/
    ├── /css/styles.css                     # single brand stylesheet (locked v1.0)
    ├── /js/main.js                         # mobile nav + email form + reveals
    └── /img/favicon.svg                    # oak-leaf placeholder
```

---

## Realistic timeline to $2-10k/mo Amazon income

| Month | Pinterest sessions/mo | Site sessions/mo | Estimated Amazon revenue |
|---|---|---|---|
| 1 | 2k–10k | 200–1k | $0–$50 |
| 2 | 15k–40k | 1k–4k | $50–$300 |
| 3 | 40k–100k | 5k–15k | $400–$1,200 |
| 4 | 80k–200k | 12k–30k | $800–$2,500 |
| 5 | 150k–400k | 25k–60k | $1,500–$4,500 |
| 6 | 250k–700k | 40k–100k | $2,500–$8,000 |

The single biggest lever: **shipping pins consistently per the locked template rotation, every day, for 90 days.** Quality is table stakes; consistency is the unlock.

---

Quiet rooms, beautifully sourced. Welcome to Calm & Oak.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       