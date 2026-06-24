# ATTRIBUTION.md — the measurement spine

So the loop optimizes for revenue, not vanity. Every agent tags links consistently and
reads from the same sources, so we can attribute dollars to source + content.

## UTM taxonomy (use on ALL campaign links — pins, emails, partner links)
- `utm_source` = pinterest | instagram | tiktok | email | partner | google
- `utm_medium`  = pin | reel | story | newsletter | affiliate | tool | organic
- `utm_campaign` = `YYYY-Www` (content week) OR the product slug
- `utm_content` = the specific asset (pin / article / tool slug)
- Amazon `/dp/` links: `tag=calmandoak-20` (Amazon's own tracker — don't add utm).
- Awin links: built via `_awin.js` (`awinaffid=2895187`).

## Data sources (the agents pull these)
- **Search Console:** `node _gsc.js` — clicks / impressions / CTR / position.
- **GA4:** `node _ga4.js` — pageviews / sessions / channels / conversions by page. (Same Google service account as GSC; `GA4_PROPERTY_ID` in `.env`.)
- **Social:** `blotato_list_posts` + Pinterest analytics.
- **Email:** MailerLite (open / click / conversions).
- **Affiliate:** Amazon + Awin dashboards (manual export until their APIs are wired).

## Conversion events to define in GA4 (Cameron, one-time)
`email_signup`, `affiliate_click`, `product_view`, `purchase` — so GA4 ties traffic to money.

## The rule
The **monetization** agent and **director** read **revenue-by-stream** and **traffic-by-source**
weekly, and pour into the highest-margin stream + highest-converting source. The **CRO** agent
fixes the lowest-converting high-traffic pages. Everything traceable, nothing guessed.
