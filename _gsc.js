#!/usr/bin/env node
/**
 * _gsc.js — pull live Google Search Console data via a service account.
 * Dependency-free (Node 18+ built-in crypto + fetch). No Ahrefs, no npm install.
 *
 * Setup: see GSC-SETUP.md. Put the service-account JSON in .env as
 * GOOGLE_SERVICE_ACCOUNT_JSON (single line), and GSC_SITE_URL (default below).
 *
 * Usage:
 *   node _gsc.js verify            # list properties the service account can read
 *   node _gsc.js                   # 28-day report (top queries, pages, office cluster)
 *   node _gsc.js 90                # last 90 days
 *
 * Agents: run this and read stdout. Falls back gracefully (exit 2 + message) if
 * the credential is missing, so callers can use the baseline instead.
 */
const crypto = require('crypto');
const fs = require('fs');

function fromEnv(n) {
  if (process.env[n]) return process.env[n];
  try { const m = fs.readFileSync('.env', 'utf8').match(new RegExp('^' + n + '=(.+)$', 'm')); if (m) return m[1].trim(); } catch (e) {}
  return '';
}
const SITE = fromEnv('GSC_SITE_URL') || 'sc-domain:calmandoak.com';

function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function loadCreds() {
  let raw = fromEnv('GOOGLE_SERVICE_ACCOUNT_JSON');
  const p = fromEnv('GOOGLE_APPLICATION_CREDENTIALS');
  if (!raw && p && fs.existsSync(p)) raw = fs.readFileSync(p, 'utf8');
  if (!raw) {
    console.error('GSC: no credential. Set GOOGLE_SERVICE_ACCOUNT_JSON in .env (see GSC-SETUP.md). Use the 90-day-plan baseline instead.');
    process.exit(2);
  }
  try { return JSON.parse(raw); }
  catch (e) { console.error('GSC: GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.'); process.exit(2); }
}

async function getToken(creds) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(JSON.stringify({
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  }));
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(header + '.' + claim);
  const sig = b64url(signer.sign(creds.private_key));
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${header}.${claim}.${sig}` }),
  });
  const j = await res.json();
  if (!j.access_token) { console.error('GSC token error: ' + JSON.stringify(j)); process.exit(1); }
  return j.access_token;
}

async function api(token, path, body) {
  const url = 'https://searchconsole.googleapis.com/webmasters/v3' + path;
  const opt = { headers: { Authorization: 'Bearer ' + token } };
  if (body) { opt.method = 'POST'; opt.headers['Content-Type'] = 'application/json'; opt.body = JSON.stringify(body); }
  const res = await fetch(url, opt);
  const j = await res.json();
  if (j.error) { console.error('GSC API error: ' + JSON.stringify(j.error)); process.exit(1); }
  return j;
}

function ymd(d) { return d.toISOString().slice(0, 10); }

function table(rows, dim) {
  if (!rows || !rows.length) return '  (no rows)';
  return rows.map(r =>
    `  ${String(r.keys[0]).padEnd(38).slice(0, 38)}  clk ${String(r.clicks).padStart(4)}  imp ${String(r.impressions).padStart(6)}  ctr ${(r.ctr * 100).toFixed(1).padStart(4)}%  pos ${r.position.toFixed(1)}`
  ).join('\n');
}

(async () => {
  const arg = process.argv[2];
  // No-credential fallback: a manual Search Console export dropped in the repo.
  if (!fromEnv('GOOGLE_SERVICE_ACCOUNT_JSON') && fs.existsSync('gsc-export.csv')) {
    const csv = fs.readFileSync('gsc-export.csv', 'utf8');
    const out = '# GSC (from manual export gsc-export.csv — no API needed)\n\n' + csv.split(/\r?\n/).slice(0, 80).join('\n');
    console.log(out); try { fs.writeFileSync('gsc-latest.md', out); } catch (e) {}
    return;
  }
  const creds = loadCreds();
  const token = await getToken(creds);

  if (arg === 'verify') {
    const sites = await api(token, '/sites');
    const list = (sites.siteEntry || []).map(s => `  ${s.siteUrl}  (${s.permissionLevel})`).join('\n');
    console.log('GSC properties this service account can read:\n' + (list || '  (none — add the service-account email as a user in Search Console)'));
    return;
  }

  const days = parseInt(arg, 10) || 28;
  const end = new Date(Date.now() - 3 * 86400000); // GSC data lags ~3 days
  const start = new Date(end.getTime() - days * 86400000);
  const base = { startDate: ymd(start), endDate: ymd(end), rowLimit: 25 };

  const [queries, pages, totals] = await Promise.all([
    api(token, `/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { ...base, dimensions: ['query'] }),
    api(token, `/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { ...base, dimensions: ['page'] }),
    api(token, `/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, { startDate: ymd(start), endDate: ymd(end) }),
  ]);

  const t = (totals.rows && totals.rows[0]) || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const office = (queries.rows || []).filter(r => /office|desk|chair|workspace/i.test(r.keys[0]));

  const out = [
    `# GSC — ${SITE} — ${base.startDate}..${base.endDate} (${days}d)`,
    ``,
    `TOTAL: clicks ${t.clicks} · impressions ${t.impressions} · CTR ${(t.ctr * 100).toFixed(1)}% · avg pos ${t.position.toFixed(1)}`,
    ``,
    `## Top queries`,
    table(queries.rows, 'query'),
    ``,
    `## Office cluster (the #1 priority)`,
    office.length ? table(office, 'query') : '  (no office-cluster queries in top 25 — check the full list)',
    ``,
    `## Top pages`,
    table(pages.rows, 'page'),
    ``,
  ].join('\n');

  console.log(out);
  try { fs.writeFileSync('gsc-latest.md', out); } catch (e) { /* non-fatal */ }
})().catch(e => { console.error('GSC: ' + e.message); process.exit(1); });
