# GSC-SETUP.md — connect live Google Search Console (free, no Ahrefs)

One-time setup so the agents pull live GSC data via `_gsc.js`. ~10 minutes.

## 1. Create a service account (Google Cloud, ~5 min)
1. console.cloud.google.com → create or pick any project.
2. **APIs & Services → Library** → search **"Google Search Console API"** → **Enable**.
3. **APIs & Services → Credentials → Create credentials → Service account**. Name it e.g. `calmoak-gsc` → Create → Done (no roles needed).
4. Click the new service account → **Keys → Add key → Create new key → JSON** → download it.

## 2. Give it read access to your property (~2 min)
1. Open the downloaded JSON, copy the **`client_email`** (looks like `calmoak-gsc@<project>.iam.gserviceaccount.com`).
2. **Search Console → Settings → Users and permissions → Add user** → paste that email → permission **Full** (or Restricted) → Add.

## 3. Give the key to the agents
1. Copy `.env.example` to `.env` (gitignored — never committed).
2. Paste the WHOLE JSON file as one line:
   `GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}`
3. Set your property:
   - Domain property → `GSC_SITE_URL=sc-domain:calmandoak.com`
   - URL-prefix property → `GSC_SITE_URL=https://calmandoak.com/`

## 4. Test
- `node _gsc.js verify` → should list calmandoak.com (and tell you the exact `GSC_SITE_URL` string to use).
- `node _gsc.js` → prints the 28-day report: top queries, the office cluster, top pages.

## Cloud (#7)
Add the same JSON as a GitHub Actions **secret** named `GOOGLE_SERVICE_ACCOUNT_JSON` (and optionally `GSC_SITE_URL`) — the cloud workflow already passes them through.

The agents (outreach, seo-ranker, daily-digest) run `node _gsc.js` for live data; if the credential is missing they fall back to the 90-day-plan baseline, so nothing breaks before you finish setup.
