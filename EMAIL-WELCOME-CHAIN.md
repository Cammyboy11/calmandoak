# Email Welcome Chain — Phase C

Status as of 2026-05-26: **scaffolded & drafted, awaiting owner approval to go live.**

---

## Architecture

```
Visitor enters email on calmandoak.com signup form
   │
   ▼
assets/js/main.js POSTs to MailerLite classic JSONP endpoint
   https://assets.mailerlite.com/jsonp/2375797/forms/188364767967053815/subscribe
   │
   ▼
MailerLite "Calm & Oak — Starter Guide Signup" form
   • form_id 188364767967053815  •  double opt-in: ON
   │
   ▼  (subscriber clicks confirm link)
MailerLite group "Calm & Oak — Starter Guide" (group_id 188364704974898224)
   │
   ▼  (group-join triggers automation)
"Calm & Oak — Welcome Sequence" automation (id 188364747924571826)
   ├── Email 1  immediate     →  Starter Guide PDF delivery
   ├── Wait 2 days
   ├── Email 2  day 2          →  Five principles + Sage Bedroom Look
   ├── Wait 3 days
   └── Email 3  day 5          →  Looks page tour
```

- **Sender**: `hello@calmandoak.com` (`needs_domain_auth: false` returned by API → SPF/DKIM already verified for this domain)
- **PDF**: `/assets/starter-guide/Japandi-Starter-Guide.pdf` (1.6 MB, in repo, deploys with the site)
- **Frontend wiring**: `assets/js/main.js` — `ENDPOINT` constant set; `mode: 'no-cors'` fetch with form-urlencoded body
- **Success UX**: form locks → button reads "Sent ✓" → note replaces with inline "download the PDF here" link (so the subscriber always gets the PDF immediately, even if email delivery is delayed)

---

## The 3 emails (drafted in MailerLite, plain-text version)

> The HTML body in MailerLite will auto-fall-back to this plain text. Owner can build a richer HTML version in the MailerLite dashboard ("Edit email" → drag-and-drop) before enabling the automation. All three drafts are short (under 1000 chars) and pass the MailerLite content validator.

### Email 1 — immediate on join (step_index 1 in API, chain-position 0)
**Subject**: `Your Japandi Starter Guide is here →`

```
Hi there,

Thanks for subscribing. Your starter guide is below — eighteen pages on the five principles, a starter shopping list, and the colour and material rules that hold a Japandi room together.

Download the PDF: https://calmandoak.com/assets/starter-guide/Japandi-Starter-Guide.pdf

What to expect from here: one email a fortnight. Sometimes a room walkthrough, sometimes a single object worth knowing about. Never a sale. Unsubscribe at the bottom of every email — we mean it.

If the guide is useful, three room guides go deeper:
• calmandoak.com/journal/japandi-bedroom/
• calmandoak.com/journal/japandi-living-room/
• calmandoak.com/journal/japandi-101/

In two days I'll send the short version of the five principles, with the one room worth starting with.

Calm & Oak
hello@calmandoak.com

Unsubscribe: {$unsubscribe}
```

### Email 2 — day 2 (step_index 0 in API, chain-position 1)
**Subject**: `The five principles, and one room to start`

```
Most "Japandi" is Scandi minimalism with a wabi-sabi vase, or Japanese restraint with a sheepskin throw. Neither lasts. The five that do:

1. Honest materials. Solid wood, linen, stoneware. Skip laminate, polyester, resin.

2. One thing per surface. A lamp, a dish, art behind. Three objects in a triangle.

3. Low and horizontal. Beds eight inches off the floor; coffee tables fourteen. Lower furniture, bigger room.

4. Warm whites, never bright whites. Plaster cream, oat, sand.

5. Negative space is a finish. An empty wall is a composition decision.

The room to start with is the bedroom — fewest surfaces, all five principles in a weekend.

Read the guide → calmandoak.com/journal/japandi-bedroom/

Shop the room ready-made (5 verified pieces) → calmandoak.com/shop/looks/the-sage-bedroom/

In three days: how we built the Looks.

Calm & Oak

Unsubscribe: {$unsubscribe}
```

### Email 3 — day 5 (step_index 2 in API, chain-position 2)
**Subject**: `Whole rooms, made shoppable`

```
Most home-décor sites sell one thing at a time. You leave with a lamp, and the rest of the room is still wrong.

The Looks page is the opposite: eight full rooms, five to eight pieces each, every product verified for reviews and stock, every link priced.

Three to start with:

1. The Calm Nightstand — four pieces under $300. Fastest way to make any bedroom read intentional. calmandoak.com/shop/looks/the-calm-nightstand/

2. The Sage Bedroom — five pieces, full queen room under $700. The complete version of the last email. calmandoak.com/shop/looks/the-sage-bedroom/

3. The Layered Living Room — five pieces, textiles and lighting only (works with your existing sofa and rug). calmandoak.com/shop/looks/the-layered-living-room/

All eight Looks → calmandoak.com/shop/looks/

That's it from the welcome series. From here, one email a fortnight — a room walkthrough or a single object worth knowing about. Reply to any of them; it comes straight to me.

Calm & Oak

Unsubscribe: {$unsubscribe}
```

---

## Owner activation checklist

1. **Read the 3 drafts above.** Edit subject lines, body copy, or links in MailerLite's dashboard if anything reads wrong: <https://dashboard.mailerlite.com/automations/188364747924571826>

2. **Build the HTML body** for each email in MailerLite (drag-and-drop editor). The plain-text I drafted will be the fallback for clients that can't render HTML. Suggested layout:
   - Header: small Calm & Oak wordmark
   - Body: same copy as plain text, paragraph-formatted with the key links styled as buttons
   - Footer: tiny grey line with "You're receiving this because you signed up at calmandoak.com" + the `{$unsubscribe}` link

3. **Activate the form**:
   - Form dashboard: <https://dashboard.mailerlite.com/forms/188364767967053815/overview>
   - Status currently `active: false` → toggle to active. The form has no content template yet (`has_content: false`), but the JSONP subscribe endpoint accepts submissions to the underlying form regardless of whether a hosted preview is built.

4. **Send yourself a test**: in the automation editor → ⋯ → "Send test" → enter your email. Verify all three emails arrive (Email 1 immediately, Email 2 after the 2-day delay, Email 3 after the additional 3 days).

5. **Submit a real signup** through `https://calmandoak.com/` to confirm the wiring end-to-end:
   - `main.js` POSTs to the JSONP endpoint
   - You receive the MailerLite double-opt-in confirmation email
   - Click confirm → you join the group → automation triggers → Email 1 (PDF delivery) arrives

6. **Enable the automation**: dashboard → toggle `enabled: true`. Until this is on, subscribers join the group but no welcome email is sent.

7. **Verify sender deliverability** by emailing yourself from `hello@calmandoak.com` and inspecting the headers in Gmail/Outlook ("show original") — confirm SPF=PASS, DKIM=PASS, DMARC=PASS. MailerLite reports `needs_domain_auth: false`, which is a good sign but worth a manual check.

---

## What ships in this commit (no owner approval needed)

- `assets/js/main.js` — `ENDPOINT` set to the MailerLite JSONP URL with the form ID; `no-cors` form-urlencoded POST. Until the owner activates the form + automation, submissions will be silently accepted by MailerLite as queued double-opt-in invitations but no welcome email will fire.
- 3 emails drafted (subject + plain text) inside the MailerLite automation, validated against MailerLite's content rules.

## What requires owner action (live-send gate)

- Activating the form
- Building the HTML email bodies
- Sending a test
- Enabling the automation

Until step 6 above, the signup form is "safe" — it captures emails into MailerLite (queued, double-opt-in pending) but sends nothing to subscribers.
