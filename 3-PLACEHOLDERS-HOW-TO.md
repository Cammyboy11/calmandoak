# THE 3 PLACEHOLDERS — exact steps for each

These are the only things between the site and being fully live. Each one needs you to log in to a service I can't access on your behalf — but the click-by-click is below.

**Recommendation:** do these AFTER the site is live at calmandoak.com (because Pinterest verification needs the live domain). Order:

1. Push to GitHub → site lives at `calmandoak.pages.dev`
2. Wire calmandoak.com via Cloudflare → site lives at `calmandoak.com`
3. **Then** come back here and do these 3.

---

## 1️⃣ FORMSPREE — Wire the email signup (5 min)

**Why:** Right now your "Send the guide" button shows a friendly message but doesn't actually deliver the email anywhere. Formspree is the simplest fix — free for 50 submissions/month, no account features to learn.

### Click-by-click

1. Open https://formspree.io → **Sign Up** (top right)
2. Sign up with your email (`cameronhayes11@hotmail.com` works fine) — verify the email
3. Once logged in: **Forms** (left sidebar) → **+ New Form**
4. Form name: `Calm & Oak — Japandi Guide signup`
5. Send to email: pick whichever inbox you want submissions to land in
6. **Create form**
7. Formspree shows you the form's URL. It looks like:
   ```
   https://formspree.io/f/abcd1234
   ```
   (yours will have a different ID after `/f/`)
8. **Copy that URL.**

### Wire it into your site

1. Open `assets/js/main.js` in any text editor
2. Find this line (around line 39):
   ```javascript
   const ENDPOINT = null;
   ```
3. Change to (paste your URL):
   ```javascript
   const ENDPOINT = 'https://formspree.io/f/abcd1234';
   ```
4. Save the file.
5. Push:
   ```bash
   cd "/c/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
   git add assets/js/main.js
   git commit -m "Wire Formspree email endpoint"
   git push
   ```

Cloudflare auto-rebuilds in 30 seconds. Test on your live site by submitting the form with your own email — you should get the submission in your Formspree inbox within a few seconds.

> **Heads up:** Formspree sends a confirmation email to first-time submitters asking them to confirm. Once they confirm, future submissions go straight through. This is anti-spam, can't be disabled on free tier. Buttondown / ConvertKit don't do this — pick those if you want zero-friction signups.

---

## 2️⃣ CLOUDFLARE WEB ANALYTICS — Free, privacy-respecting tracking (3 min)

**Why:** Know how many people visit, what pages they read, where they come from. No cookies, no GDPR banner, no slow tracking pixels — just a single small script.

**Prerequisite:** Cloudflare Pages already deployed (Step 2 of `DEPLOY-NOW.md`). If you haven't done that yet, do it first — Web Analytics needs your site already live somewhere.

### Click-by-click

1. Go to https://dash.cloudflare.com (you'll already be logged in from the Pages deploy)
2. Click **Analytics & Logs** in the left sidebar (further down)
3. Click **Web Analytics** → **Add a site** (top right)
4. Pick **Manual setup** (since you're using Cloudflare Pages, you may also see a "with proxy" option — manual is simpler)
5. **Hostname:** `calmandoak.com`
6. Click **Done**
7. Cloudflare shows a snippet like:
   ```html
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "abc123def456..."}'></script>
   ```
8. **Copy ONLY the token value** (the long string between the quotes after `"token":`)

### Wire it into your site

You need to update **every HTML page** that has the placeholder. Easiest way:

1. Open Git Bash, navigate to the site:
   ```bash
   cd "/c/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
   ```

2. **Find/replace across all files** with this one command (replace `YOUR_TOKEN` with your real token):
   ```bash
   sed -i 's/YOUR_TOKEN_HERE/YOUR_TOKEN/g; s/<!-- <script defer src='\''https:\/\/static.cloudflareinsights.com/<script defer src='\''https:\/\/static.cloudflareinsights.com/g; s/data-cf-beacon='\''{"token": "YOUR_TOKEN"}'\''><\/script> -->/data-cf-beacon='\''{"token": "YOUR_TOKEN"}'\''><\/script>/g' index.html shop/*/index.html shop/index.html journal/*/index.html journal/index.html about/index.html contact/index.html disclosures/index.html privacy/index.html
   ```

   (That's a one-liner. Copy/paste the whole thing.)

3. **OR** if you'd rather just open each file in an editor and unhide it manually — there are 21 files. Search for `YOUR_TOKEN_HERE` in each, replace with your real token, then delete the surrounding `<!--` and `-->` so the line is uncommented.

4. Push:
   ```bash
   git add .
   git commit -m "Add Cloudflare Web Analytics"
   git push
   ```

Within ~5 minutes Cloudflare's dashboard starts showing visitor data. You can also see real-time traffic.

---

## 3️⃣ PINTEREST DOMAIN VERIFICATION — Unlock rich pins + analytics (5 min)

**Why:** Until verified, pins from your site show "via calmandoak.pages.dev" or worse. After verification, Pinterest:
- Shows your domain logo on every pin
- Gives you analytics on which pins drive clicks
- Enables rich pins (your title + description load automatically when someone repins)
- Gives you a "verified by Calm & Oak" tick

**Prerequisite:** site must already be live at `calmandoak.com` (not just the `.pages.dev` URL — Pinterest verifies the custom domain).

### Click-by-click

1. Make sure you have a Pinterest **Business** account at `@calmandoak`
   - If not yet: https://business.pinterest.com → **Sign up**
   - If you already have a personal Pinterest, you can convert it (Settings → Account management → Convert to business)

2. Go to https://www.pinterest.com/settings/claim/

3. Find **Websites** section → click **Claim**

4. Enter `calmandoak.com` (no `https://`, no `www.`)

5. Pinterest gives you 3 verification options. **Pick "Add HTML tag"** (it's the easiest given how this site is built).

6. Pinterest shows a meta tag like:
   ```html
   <meta name="p:domain_verify" content="abc123xyz456..."/>
   ```

7. **Copy ONLY the content value** (the long string between the quotes after `content=`)

### Wire it into your site

Same approach as the Cloudflare token — find/replace across all files.

1. In Git Bash, navigate to the site:
   ```bash
   cd "/c/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
   ```

2. **Find/replace across all files** (replace `abc123xyz456` with your real verification code):
   ```bash
   sed -i 's/YOUR_PINTEREST_VERIFICATION_CODE/abc123xyz456/g; s/<!-- <meta name="p:domain_verify"/<meta name="p:domain_verify"/g; s/<\/meta> -->/<\/meta>/g; s/" \/> -->/" \/>/g' index.html shop/*/index.html shop/index.html journal/*/index.html journal/index.html about/index.html contact/index.html disclosures/index.html privacy/index.html
   ```

3. **OR** open each HTML file, search for `YOUR_PINTEREST_VERIFICATION_CODE`, replace with your real code, then remove the `<!--` and `-->` so the meta tag is live.

4. Push:
   ```bash
   git add .
   git commit -m "Add Pinterest domain verification"
   git push
   ```

5. Wait ~30 seconds for Cloudflare to redeploy. Then go back to the Pinterest claim page and click **Verify**.

   You should see a green checkmark within a few seconds.

---

## QUICK MANUAL ALTERNATIVE (if sed scares you)

For all 3 placeholders, you can just **open the files in any editor** (Notepad, VS Code, even Notepad++) and do search-and-replace per file. The 21 HTML files are small.

If you have **VS Code installed**:
1. Open the `Calm & Oak` folder in VS Code (File → Open Folder)
2. Press **Ctrl+Shift+H** (find/replace in all files)
3. **Find:** `YOUR_PINTEREST_VERIFICATION_CODE`
4. **Replace:** your real code
5. Click **Replace All**
6. Then for each placeholder, find the surrounding `<!--` and `-->` and delete those too (a couple files at a time)

VS Code is the friendliest tool for this since it shows you all 21 matches and lets you preview before replacing.

---

## ORDER OF OPERATIONS — recommended

```
Day 1:
  ☐ STEP 1-7 of GITHUB-PUSH-WALKTHROUGH.md (push to GitHub)
  ☐ STEP 2 of DEPLOY-NOW.md (Cloudflare Pages deploy)
  ☐ STEP 3 of DEPLOY-NOW.md (wire calmandoak.com via DNS)
  → Wait 1-4 hours for DNS propagation
  → Verify https://calmandoak.com loads correctly

Day 1 (or Day 2 — once domain is live):
  ☐ Placeholder 1: Formspree (5 min)
  ☐ Placeholder 2: Cloudflare Analytics (3 min)
  ☐ Placeholder 3: Pinterest verification (5 min)
  ☐ Submit sitemap to Google Search Console (3 min)
  ☐ Submit sitemap to Bing Webmaster Tools (2 min)

Day 2-7:
  ☐ Build the Japandi Starter Guide PDF in Canva (~30 min)
  ☐ Upload to Formspree as auto-reply attachment (or move to Buttondown for proper auto-delivery)
  ☐ Schedule first 7 days of Pinterest pins via Blotato (per Lets Get Started.md)
```

---

## WANT ME TO DRIVE YOUR BROWSER?

For any of these 3, I can use Chrome MCP to walk you through interactively. You'd see Chrome open, navigate to the right page, and we'd go step by step — you click "Connect" / "Verify" yourself but I handle the rest.

Just say:
- **"drive Chrome for Formspree"**
- **"drive Chrome for Cloudflare Analytics"**
- **"drive Chrome for Pinterest verification"**

…and I'll start the relevant flow.
