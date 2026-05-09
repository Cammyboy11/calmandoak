# DEPLOY NOW — calmandoak.com

The site is rebuilt, all 88 product cards have real pin images, and every Amazon link uses your `calmandoak08-20` affiliate tag. Total site: 22 HTML pages + 86 product images + CSS/JS. Ready to ship.

---

## STATUS — what's done

- [x] All 10 shop pages have real pin images (`/shop/bedroom/`, `/shop/lighting/`, etc.)
- [x] Homepage and shop hub use real pin photos for the 9 pillar cards
- [x] Featured collection + journal cards use real pin photos
- [x] All 88 product CTA buttons link to Amazon with `?tag=calmandoak08-20` embedded
- [x] Disclosure banner on every page ("As an Amazon Associate, Calm & Oak earns from qualifying purchases.")
- [x] `.gitignore` excludes working files (final pins/, 01-brand-assets/, the 3 master docs)
- [x] **Sitemap** — fully written (was broken/truncated), now lists all 21 URLs
- [x] **Cloudflare config** — `_headers` (security + caching) + `_redirects` (proper 301s, not meta-refresh)
- [x] **Site icons** — favicon SVG, apple-touch-icon, og-image, logo all in place
- [x] **Open Graph + Twitter cards** — every page has per-page og:image, og:title, og:description
- [x] **Pinterest rich pins** — `<meta name="pinterest-rich-pin" content="true">` on every page
- [x] **JSON-LD structured data** — Organization + WebSite (homepage), BreadcrumbList + ItemList with Product items (all 10 shop pages), Article (both journal posts)
- [x] **Image dimensions** — `width`/`height` on every product image (prevents Cumulative Layout Shift)
- [x] **Hero image preload** — improves Largest Contentful Paint
- [x] **Email signup** — properly wired with success/error UX (set ENDPOINT in main.js to activate)
- [x] **Affiliate-click tracking** — events fire on every product CTA click (Plausible + GA-compatible)

**See `OPTIMIZATION-NOTES.md`** for the full technical summary, what's still recommended, and 3 placeholders to fill in after deploy (Pinterest verification, Cloudflare token, email endpoint).

---

## WHAT YOU NEED TO HAVE READY

1. **GitHub account** (free) — github.com → sign up if you don't have one
2. **Cloudflare account** (free) — cloudflare.com → sign up if you don't have one
3. **GoDaddy access** — your existing login for `calmandoak.com`
4. **Amazon Associates approval** — you said your tag is `calmandoak08-20`, confirming you're approved. ✅

Total time start-to-finish: **~30 minutes**.

---

## STEP 1 — Push to GitHub (5 min)

Open PowerShell or Git Bash, then:

```bash
cd "C:/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
git init
git add .
git commit -m "Initial Calm & Oak site"
git branch -M main
```

Now go to https://github.com/new
- Repository name: `calmandoak`
- Public (free Cloudflare Pages requires public OR you can do private — both work)
- Do NOT initialize with README
- Click **Create repository**

GitHub shows you commands. Copy the two `git remote add origin …` and `git push -u origin main` lines, paste into your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/calmandoak.git
git push -u origin main
```

(Replace `YOUR_USERNAME` with your actual GitHub username.)

✅ When done you should see your files at `https://github.com/YOUR_USERNAME/calmandoak`.

---

## STEP 2 — Deploy on Cloudflare Pages (5 min)

1. Go to https://dash.cloudflare.com → **Workers & Pages** in the left menu → **Pages** tab.
2. Click **Connect to Git** → authorize Cloudflare to read your GitHub.
3. Pick your `calmandoak` repo → **Begin setup**.
4. Project settings:
   - **Project name:** `calmandoak`
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
5. Click **Save and Deploy**.

Wait ~30 seconds. You'll get a URL like `https://calmandoak.pages.dev` — open it. Your live site is up.

---

## STEP 3 — Wire calmandoak.com (15 min, then 1-4 hr DNS propagation)

Two parts: move DNS to Cloudflare, then attach the domain to Pages.

### 3a. Move DNS from GoDaddy to Cloudflare

1. Cloudflare dashboard → **+ Add a site** (top right) → enter `calmandoak.com` → **Continue**.
2. Pick the **Free** plan.
3. Cloudflare scans your existing DNS records. Click **Continue**.
4. Cloudflare gives you **two nameservers** that look like:
   - `xxx.ns.cloudflare.com`
   - `yyy.ns.cloudflare.com`
   - **Copy these two strings somewhere safe.**

5. In a new tab go to GoDaddy:
   - https://account.godaddy.com → **My Products** → find `calmandoak.com` → **DNS**
   - Click **Nameservers** section → **Change nameservers** → **Enter my own nameservers (advanced)**
   - Paste the two strings from Cloudflare into Nameserver 1 and Nameserver 2
   - **Save**.
6. Back in Cloudflare → click **Done, check nameservers**. Cloudflare polls. Usually goes "Active" within 1-4 hours; can take up to 24 hours.

### 3b. Attach the domain to your Pages project

1. Cloudflare dashboard → **Workers & Pages** → click your `calmandoak` project.
2. **Custom domains** tab → **Set up a custom domain** → enter `calmandoak.com` → **Continue** → **Activate domain**.
3. Repeat for `www.calmandoak.com` so both work.

Cloudflare auto-issues a free SSL certificate. Within a few minutes (after step 3a finishes), `https://calmandoak.com` will load your site.

---

## STEP 4 — Wire 3 placeholders (10 min, recommended)

All three are commented `<!-- TODO -->` lines waiting for your account credentials:

### 4a. Pinterest verification

- https://www.pinterest.com/settings/claim/ → Claim your website → enter `calmandoak.com`
- Pinterest gives you a meta tag like `<meta name="p:domain_verify" content="abc123…" />`
- Find every `<!-- <meta name="p:domain_verify" content="YOUR_PINTEREST_VERIFICATION_CODE" /> -->` in your HTML and replace it (uncommented). Easiest:
  ```bash
  grep -rl "YOUR_PINTEREST_VERIFICATION_CODE" --include="*.html" .
  # Then in your editor: find/replace YOUR_PINTEREST_VERIFICATION_CODE with the real code
  # Then uncomment the line.
  ```
- Push. Pinterest confirms. Now your pins show your domain logo + you get analytics.

### 4b. Cloudflare Web Analytics (free, no cookies)

- Cloudflare dashboard → **Analytics & Logs** → **Web Analytics** → **Add a site** → enter `calmandoak.com`
- Cloudflare gives you a beacon token. Find every commented analytics line and replace `YOUR_TOKEN_HERE` with the real one + uncomment.
- Push. Privacy-respecting analytics, no cookie banner needed.

### 4c. Email signup endpoint

- **Easiest free option: Formspree** — https://formspree.io → Create form → copy your form URL like `https://formspree.io/f/abcdwxyz`
- Open `assets/js/main.js`, find `const ENDPOINT = null;`, change to `const ENDPOINT = 'https://formspree.io/f/abcdwxyz';`
- Push. Signup form now actually delivers emails to you.
- (Better long-term: Buttondown or ConvertKit — auto-deliver the Japandi Starter Guide PDF.)

### 4d. Submit to search engines

- **Google Search Console** — https://search.google.com/search-console → Add property → `https://calmandoak.com` → verify (HTML tag method, paste into `<head>` of index.html). Submit `https://calmandoak.com/sitemap.xml`.
- **Bing Webmaster Tools** — https://www.bing.com/webmasters → import from GSC (one click). Bing also indexes for DuckDuckGo and Yahoo.

---

## ONGOING WORKFLOW

Every time you want to update the site:

```bash
cd "C:/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
git add .
git commit -m "describe what changed"
git push
```

Cloudflare Pages auto-rebuilds in ~30 seconds. Live in under a minute.

---

## IF SOMETHING GOES WRONG

| Problem | Fix |
|---|---|
| `git: command not found` | Install git from https://git-scm.com → restart terminal |
| GitHub push asks for password | Use a personal access token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new (give it `repo` scope). Paste that as the password. |
| Cloudflare nameservers still pending after 24 hr | Double-check you typed them exactly into GoDaddy. They're case-insensitive but spelling matters. |
| Domain shows "Not secure" briefly | Cloudflare SSL cert issue is async; usually resolves within 15 min after the domain shows Active. |
| Images don't load on Cloudflare but work locally | Check that `/assets/img/products/` was committed: `git ls-files assets/img/products/ \| head` — should show ~86 .png files. |

---

That's everything. The site is built, the affiliate plumbing works, your pin images are real, and your domain is one git push + one DNS change away from being live.
