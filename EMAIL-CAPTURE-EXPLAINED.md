# EMAIL CAPTURE & STARTER GUIDE — How it works

**TL;DR:** Right now, the email signup forms on your site capture nothing — they show a friendly success message but the email goes nowhere. To make them actually work, you need to (1) sign up for an email service, (2) paste one URL into `assets/js/main.js`, and (3) create a 14-page PDF that gets auto-delivered when someone subscribes.

---

## How the form CURRENTLY behaves

Every page on your site has the "Send the guide" form (homepage, journal posts, shop pages — they all share the same component). When a visitor types their email and clicks Send:

1. The form intercepts the click (no page reload)
2. JavaScript reads the email address
3. The note below the form changes to: **"Welcome — your free Japandi Starter Guide is on its way."**
4. The button text changes to: **"Sent ✓"**
5. The form resets

**But:** the email is not actually sent anywhere. There's no service wired up. So the visitor sees the success message and waits for an email that never arrives. Right now that's a broken promise.

This is fixable in 10 minutes once you pick a provider.

---

## What you need to wire up

Two pieces:

### Piece 1 — An email service (free)

A service that receives subscriber emails, stores them in a list, and (optionally) sends an automated welcome email with the PDF attached.

**Recommended for you: Buttondown** — a small newsletter service that has the cleanest UX, free up to 100 subscribers, and supports auto-delivery of a "welcome" PDF.

Other options: Formspree (simplest, no PDF auto-delivery), ConvertKit (more features but slower setup), MailerLite (free up to 1k subs but clunky UI).

### Piece 2 — The Japandi Starter Guide PDF

A 14-page PDF that auto-delivers to every new subscriber. This is the value exchange — they give you their email, they get something useful back.

You don't have this PDF yet. Building it takes ~30 minutes in Canva (template below).

---

## Wiring up the email service (10 minutes)

### Step A — Sign up for Buttondown

1. Go to https://buttondown.email
2. Click **Sign up** → use `cameronhayes11@hotmail.com` (or a brand-specific email if you have one)
3. Verify your email
4. Pick a username — this becomes your newsletter URL: `buttondown.email/calmandoak`. (Use `calmandoak` if available.)
5. Free plan: ✅

### Step B — Get your form endpoint

1. Buttondown dashboard → **Embed**
2. Copy the URL it shows. It looks like:
   ```
   https://buttondown.email/api/emails/embed-subscribe/calmandoak
   ```

### Step C — Paste into `main.js`

1. Open `assets/js/main.js` in any text editor (Notepad, VS Code, even online)
2. Find this line (around line 39):
   ```javascript
   const ENDPOINT = null;
   ```
3. Change it to:
   ```javascript
   const ENDPOINT = 'https://buttondown.email/api/emails/embed-subscribe/calmandoak';
   ```
4. Save the file.

### Step D — Push

```bash
cd "/c/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
git add assets/js/main.js
git commit -m "Wire Buttondown email endpoint"
git push
```

Cloudflare auto-redeploys in ~30 seconds.

### Step E — Test

1. Open `https://calmandoak.com` in **incognito** (Ctrl+Shift+N) — bypasses cache
2. Type your own email into the form → click Send
3. Check your inbox — Buttondown sends a confirmation email to first-time subscribers (anti-spam — can't be disabled on free tier)
4. Click the confirmation link
5. Now check Buttondown dashboard → **Subscribers** — your email is there ✅

The form is wired. Every visitor who submits joins your list.

---

## Building the Japandi Starter Guide PDF (30 minutes in Canva)

### What it is

A 14-page PDF that gets emailed to every new subscriber. The lead magnet — the reason people sign up.

### What goes in it

The structure (matches what your site has been promising):

| Page | Content |
|---|---|
| 1 | Cover: "The Japandi Starter Guide" + brand wordmark + cream linen background |
| 2 | Welcome letter (200 words, personal): why this guide exists, how to use it |
| 3-4 | The 5 principles of Japandi (1 spread, big text, terracotta accents) |
| 5-6 | Color palette spread: oat, cream, charcoal, terracotta, sand swatches with hex codes |
| 7-8 | Materials guide: oak, walnut, linen, stoneware, paper, jute (with photos from your pin library) |
| 9-10 | The two-woods rule (lift directly from `/journal/two-woods-rule/`) |
| 11 | The textile weight rule (wool + linen + boucle) |
| 12 | Starter shopping list: 10 items under $300 total, with links to your shop pillars |
| 13 | "Where to start" — a 7-day plan |
| 14 | Closing: link back to calmandoak.com + "follow us on Pinterest" |

### How to build it

1. Open https://canva.com → free account
2. Search "magazine template" or "ebook template" — pick a clean magazine layout
3. Set the brand colors in the toolbar:
   - Off-white `#F7F4EE`
   - Cream `#EFE8DA`
   - Charcoal `#2A2A28`
   - Terracotta `#C97B5C`
4. Set the fonts:
   - Headings: **Cormorant Garamond** (free in Canva)
   - Body: **Inter** or **Lato**
5. For the photos, use the cropped pin images from `assets/img/products-cropped/`
6. Build the 14 pages following the structure above
7. **Download as PDF** → name it `Japandi-Starter-Guide.pdf`

### How to auto-deliver it on signup

In Buttondown:

1. Dashboard → **Settings** → **Welcome email**
2. Toggle **Send a welcome email** ON
3. Compose the email:
   - **Subject:** "Your Japandi Starter Guide ✦"
   - **Body:** Short — 3 sentences max. Thank them, tell them the guide is attached, mention they'll get one fortnightly email from now on. Sign with "Cameron + the Calm & Oak team" (even if it's just you).
4. **Attach** the PDF you downloaded from Canva
5. Save

Now: every time someone subscribes via your form → they confirm → Buttondown auto-sends the welcome email with the PDF attached.

---

## How to read your subscribers + send fortnightly emails

### Daily/weekly check

- **Buttondown dashboard → Subscribers** shows your list. Total count, when each joined, which page they came from.
- Free plan = up to 100 subscribers. After that, $9/month for 1,000.

### Fortnightly newsletter

Pinterest creators who do this well (Apartment Therapy contributors, Honestly Modern, The Spruce) all follow the same rhythm: a fortnightly email with one journal post + one shop pillar feature + one "personal note" paragraph.

In Buttondown:

1. **+ New email**
2. Subject: "Calm & Oak — Issue 3" (or similar — keep it consistent)
3. Body sections:
   - **Lead:** 1 paragraph personal note (what you've been working on, a small observation about a Japandi room)
   - **Featured journal post:** title + 2-line teaser + link
   - **Shop the look:** 1 of your shop pillars + 3 product picks with photos + Amazon affiliate links
   - **A small thing:** one tiny tip (linen care, candle holder placement, etc.)
4. **Send** (or schedule for Sunday morning).

Over 90 days, this rhythm builds an audience that comes back. The combination of the Pinterest pin → site visit → email signup → fortnightly newsletter is the loop that becomes self-sustaining once you have ~500 subscribers.

---

## What "starter guide" means in your funnel (the strategic version)

The signup form looks like a small UX detail. It's actually the most important conversion event on your site, because:

1. **Every email is permanent.** Pinterest can change its algorithm tomorrow. Amazon can revoke your affiliate account. Your email list is the asset that's yours forever.

2. **Every email = ~$30/year revenue.** Industry benchmark for a niche affiliate newsletter: $1.50/subscriber/month. 500 subscribers = $9k/year just from the list, separate from Pinterest traffic.

3. **The PDF is the value exchange.** Without something free in return, nobody gives you their email. The Japandi Starter Guide is the offering. Make it pretty enough that someone would pay $9 for it on Etsy — give it away free for an email.

4. **The fortnightly email keeps you in their inbox.** Without it, they forget you exist. With it, you become "the Japandi person" they trust.

The first 100 subscribers are the hardest. After 500 you start to feel the compounding. After 2,000 you can start pitching brand collaborations.

---

## Step-by-step priority order

If you want to do this in pieces:

**Tonight (10 min):** Sign up for Buttondown + paste endpoint into main.js + push. The form starts capturing emails immediately. Without the PDF auto-delivery, subscribers get the standard Buttondown confirmation email and they're on your list — you can email them the PDF manually later, or send the welcome email retroactively when the PDF is ready.

**This weekend (30 min):** Build the PDF in Canva. Set up the welcome email auto-delivery in Buttondown.

**Every two weeks:** 30-min session to write and send the fortnightly newsletter.

The investment: ~10 minutes tonight + 30 minutes one weekend + 30 minutes every two weeks. The return: a permanent owned audience that compounds for years.

---

## A note on Mailchimp (don't use it)

Mailchimp is the most-recommended option online and the one I'd advise you to skip. The free tier is the most restrictive (no PDF auto-delivery, branded footers on every email), the UI is overcomplicated, and they raise prices aggressively as you grow. Buttondown is the indie alternative — built by one person, no investor pressure to monetize you, simpler in every way. Worth $9/month later when you outgrow the free tier.

---

That's the full email + starter guide setup. The form on your site goes from "broken promise" to "compounding asset" in 10 minutes of wiring + 30 minutes of PDF design.
