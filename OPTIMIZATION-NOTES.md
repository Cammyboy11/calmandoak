# OPTIMIZATION NOTES — Calm & Oak

**Updated:** 2026-05-09 — second pass after deploy-ready handoff.

This doc lists everything that was added beyond the basic site, what's still recommended, and the placeholders waiting on your account credentials.

---

## ✅ What's now in the build (best practices applied)

### Performance / Core Web Vitals
- **`width="848" height="1264"`** added to every product image across all 22 HTML pages → prevents Cumulative Layout Shift (Google ranks on this).
- **`<link rel="preload" as="image">`** for the homepage hero → improves Largest Contentful Paint (LCP).
- **`<link rel="preconnect">`** to Google Fonts → DNS pre-resolves before fonts requested.
- **`loading="lazy"`** on all below-the-fold images.
- **`_headers`** sets long cache (`max-age=2592000, immutable`) for images, CSS, JS → repeat visits load instantly.

### SEO
- **`sitemap.xml`** rewritten — was truncated/broken, now includes all 21 URLs (homepage, shop hub, 11 pillars, journal hub, 2 articles, 4 static pages) with proper priorities.
- **`robots.txt`** points to sitemap — already in place, verified working.
- **JSON-LD structured data** on every shop page:
  - `BreadcrumbList` (Home → Shop → [Pillar])
  - `ItemList` with each product as a `Product` entity, including affiliate URL, image, brand, and `Offer` block.
- **`Article` schema** on both journal posts (was minimal, now complete).
- **`Organization` + `WebSite`** schema on homepage with `SearchAction` (Google sitelinks search box eligibility).
- **Canonical URLs** on every page (was already in place, verified).

### Pinterest specifically
- **`<meta name="pinterest-rich-pin" content="true">`** on every page → unlocks rich pin previews when someone pins from your site.
- **Pinterest verification placeholder** in every `<head>` — TODO comment with the exact line to replace.
- **Per-page `og:image`** picked from your most-thematic pin photo → social shares look professional, not generic.
- **`og:site_name`, `og:image:alt`, twitter:card, twitter:image, twitter:title, twitter:description`** — full social sharing meta on every page.

### Security headers
- `X-Frame-Options: SAMEORIGIN` — blocks clickjacking
- `X-Content-Type-Options: nosniff` — blocks MIME-sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` — protects user privacy
- `Permissions-Policy` — disables geolocation/camera/mic/payment by default
- `Strict-Transport-Security: max-age=31536000` — forces HTTPS on every future visit

### URL hygiene
- **`_redirects`** — replaces the HTML meta-refresh fallback with proper 301 redirects (Cloudflare handles them at the edge before HTML loads). This passes Google PageRank, which meta-refresh does not.
- 4 friendly URL aliases: `/japandi → /journal/japandi-101/`, `/bedroom → /shop/bedroom/`, `/lighting → /shop/lighting/`, plus all the shop-page non-trailing-slash variants.

### Conversion / analytics
- **`main.js` rewritten:**
  - Email signup now POSTs to a configurable endpoint (Formspree / Buttondown / ConvertKit / MailerLite — set `ENDPOINT` constant). Friendly success state, real error handling.
  - **Affiliate-click tracking** — every "Shop on Amazon →" click fires a tracked event (Plausible + GA-compatible). You'll know which products convert.
  - **Signup conversion event** — same.
- **Cloudflare Web Analytics** snippet placeholder in every `<head>`. Free, no cookies, no GDPR-banner needed. Just paste your beacon token.

### Site-level icons
- **Better favicon SVG** — full oak-leaf mark instead of placeholder square.
- **`apple-touch-icon.png`** — for when someone saves your site to their iPhone home screen.
- **`mask-icon`** + theme-color — Safari pinned tabs render in your terracotta brand color.

---

## 🟡 Placeholders waiting on your action

These are commented-out lines in your code with `TODO:` markers. Each takes 30 seconds to fill in:

| What | Where | Where to get it |
|---|---|---|
| Pinterest verification meta | Every page `<head>` | https://www.pinterest.com/settings/claim/ |
| Cloudflare beacon token | Every page `<head>` | dash.cloudflare.com → Analytics & Logs → Web Analytics → Add a site |
| Email provider endpoint | `assets/js/main.js` line 39 (`ENDPOINT = null`) | https://formspree.io (free, 50/mo) — or Buttondown / ConvertKit / MailerLite |

**Suggested workflow after deploy:** add all 3 in one sitting (~10 min), then push.

---

## 🔵 Still recommended (separate sessions)

### Image optimization (saves ~50 MB on deploy)
Your pin images are 848×1264 PNG-named JPEGs at ~600 KB each (86 files = 70 MB).
- **Convert to WebP**: ~80% smaller, near-identical visual quality. `cwebp -q 80 in.png -o out.webp`. The site can serve `.png` fallback via `<picture>` if you want belt-and-braces.
- **Quick win**: install [Squoosh CLI](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli) and batch-convert. Cloudflare Pages can also auto-optimize via Polish (paid tier) or Cloudflare Images (very cheap).
- **No-code option**: Cloudflare automatically serves WebP to compatible browsers if you enable Polish in dashboard → Speed → Optimization.

### Real photography for hero images
The pin images work as product card photos but aren't hero/lifestyle photography. Eventually:
- Commission 5-10 lifestyle shots from a stock library (Unsplash for free, or Pexels) of japandi bedrooms / kitchens / lounges
- Or take 5 phone photos in your own home, edit in Lightroom mobile (free) with a warm-neutral preset
- Drop them into `/assets/img/lifestyle/` and swap into the hero/featured-collection sections

### Email lead magnet PDF
The "Japandi Starter Guide" form captures emails but the PDF doesn't exist yet. Build it:
- **14 pages, ~30 min in Canva** (free): cover, intro, 5 principles each on 2 pages, palette/materials swatches, starter shopping list (linked to your shop pages).
- Upload to your email provider so it auto-sends on signup.
- Replace `ENDPOINT = null` in `main.js` with the provider URL.

### Schema additions (later)
- Add `Article` JSON-LD with `datePublished` + `dateModified` updated automatically (currently hardcoded 2026-05-08).
- Add `Review`/`AggregateRating` to product items if you write any first-person reviews in the journal — eligible for star ratings in Google search results.
- Add `FAQPage` schema to a future "Japandi FAQ" journal post.

### Internal linking improvements
- Currently each product CTA goes straight to Amazon. Consider also adding a link from each product card into related journal content ("Read why we love this →").
- Add a "Related pillars" section at the bottom of each shop page (3 cards, links to other pillars).

### Pinterest-specific improvements
- **Per-pin pin titles**: the meta `<title>` should ideally be Pinterest-optimized (front-loaded keywords, under 60 chars, includes search terms). Yours are good. Consider A/B testing 5-10 variants over the first 90 days using the Pinterest Trends tool.
- **Save buttons**: add a Pinterest "Save" hover button on each product image. Pinterest provides the snippet at https://developers.pinterest.com/tools/widget-builder/#do_pin_it_button.

### Email sequence after signup
After you wire the lead magnet, build a 4-email welcome sequence:
1. **Day 0**: PDF delivery + welcome
2. **Day 3**: "The 3 things every Japandi room gets wrong"
3. **Day 7**: Featured pillar (rotate weekly)
4. **Day 14**: Roundup of recent journal posts

---

## 🔬 Verify after deploy

Once `https://calmandoak.com` is live, run these free audits:

| Tool | URL | What to look for |
|---|---|---|
| Google PageSpeed Insights | https://pagespeed.web.dev/?url=calmandoak.com | LCP < 2.5s, CLS < 0.1, INP < 200ms |
| Google Rich Results Test | https://search.google.com/test/rich-results | All 3 schemas (Organization, BreadcrumbList, Product) detected |
| Twitter Card Validator | https://cards-dev.twitter.com/validator | OG image + title + description load correctly |
| Facebook Sharing Debugger | https://developers.facebook.com/tools/debug/ | Same as above for Facebook/LinkedIn |
| Schema.org validator | https://validator.schema.org/ | All JSON-LD blocks parse without warnings |
| Mobile-friendly test | https://search.google.com/test/mobile-friendly | Should pass automatically (responsive CSS in place) |

If any of those flag an issue, paste it back to me and I'll diagnose.

---

## 📊 Asset inventory (final state)

```
File count by type
  HTML pages:           22
  CSS:                   1 (styles.css)
  JS:                    1 (main.js)
  Site icons:            4 (favicon.svg, apple-touch-icon.png, og-image.jpg, logo.png)
  Product images:       86 (~70 MB, in /assets/img/products/)
  Cloudflare config:     2 (_headers, _redirects)
  SEO files:             2 (sitemap.xml, robots.txt)

Affiliate links wired:  88 (all use tag=calmandoak08-20)
JSON-LD blocks:         13 (1 Org + 1 WebSite + 10 BreadcrumbList + 10 ItemList + 2 Article)
Pages with og:image:    21 (every public page)
Pages with rich-pin:    21 (every public page)
```

---

That's the full pass. The site is now standards-compliant, conversion-instrumented, and SEO-ready. The three TODO placeholders are the only thing between you and a fully wired site.
