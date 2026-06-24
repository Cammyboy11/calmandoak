#!/usr/bin/env node
/**
 * _ga4.js — pull live GA4 (Google Analytics 4) data via the SAME service account as _gsc.js.
 * Dependency-free (Node 18+ crypto + fetch). Needs GA4_PROPERTY_ID + GOOGLE_SERVICE_ACCOUNT_JSON in .env.
 * Grant the service-account email "Viewer" on the GA4 property (Admin -> Property Access Management).
 *
 *   node _ga4.js verify
 *   node _ga4.js          # 28-day top pages + channels
 *   node _ga4.js 7
 *
 * Falls back gracefully (exit 2 + message) if the credential/property is missing.
 */
const crypto = require('crypto');
const fs = require('fs');

function fromEnv(n) {
  if (process.env[n]) return process.env[n];
  try { const m = fs.readFileSync('.env', 'utf8').match(new RegExp('^' + n + '=(.+)$', 'm')); if (m) return m[1].trim(); } catch (e) {}
  return '';
}
function b64url(b) { return Buffer.from(b).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'); }

function loadCreds() {
  let raw = fromEnv('GOOGLE_SERVICE_ACCOUNT_JSON');
  const p = fromEnv('GOOGLE_APPLICATION_CREDENTIALS');
  if (!raw && p && fs.existsSync(p)) raw = fs.readFileSync(p, 'utf8');
  if (!raw) { console.error('GA4: no GOOGLE_SERVICE_ACCOUNT_JSON (see GSC-SETUP.md — same key works for GA4). Use estimates instead.'); process.exit(2); }
  try { return JSON.parse(raw); } catch (e) { console.error('GA4: GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.'); process.exit(2); }
}
async function getToken(creds) {
  const now = Math.floor(Date.now() / 1000);
  const h = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const c = b64url(JSON.stringify({ iss: creds.client_email, scope: 'https://www.googleapis.com/auth/analytics.readonly', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
  const s = crypto.createSign('RSA-SHA256'); s.update(h + '.' + c);
  const sig = b64url(s.sign(creds.private_key));
  const res = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${h}.${c}.${sig}` }) });
  const j = await res.json();
  if (!j.access_token) { console.error('GA4 token error: ' + JSON.stringify(j)); process.exit(1); }
  return j.access_token;
}
function ymd(d) { return d.toISOString().slice(0, 10); }

(async () => {
  const pid = fromEnv('GA4_PROPERTY_ID');
  if (!pid) { console.error('GA4: set GA4_PROPERTY_ID in .env (GA4 Admin -> Property Settings -> Property ID, numeric).'); process.exit(2); }
  const token = await getToken(loadCreds());
  const arg = process.argv[2];

  async function runReport(body) {
    const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${pid}:runReport`, { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await res.json();
    if (j.error) { console.error('GA4 API error: ' + JSON.stringify(j.error)); process.exit(1); }
    return j;
  }

  if (arg === 'verify') {
    const r = await runReport({ dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }], metrics: [{ name: 'sessions' }, { name: 'screenPageViews' }] });
    const m = (r.rows && r.rows[0] && r.rows[0].metricValues) || [{ value: '0' }, { value: '0' }];
    console.log('GA4 OK (property ' + pid + '). Last 7d: sessions ' + m[0].value + ', pageviews ' + m[1].value);
    return;
  }

  const days = parseInt(arg, 10) || 28;
  const range = { startDate: ymd(new Date(Date.now() - days * 86400000)), endDate: ymd(new Date()) };
  const [pages, channels, totals] = await Promise.all([
    runReport({ dateRanges: [range], dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }], orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 25 }),
    runReport({ dateRanges: [range], dimensions: [{ name: 'sessionDefaultChannelGroup' }], metrics: [{ name: 'sessions' }], orderBys: [{ metric: { metricName: 'sessions' }, desc: true }], limit: 10 }),
    runReport({ dateRanges: [range], metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }, { name: 'totalUsers' }] }),
  ]);
  const t = (totals.rows && totals.rows[0] && totals.rows[0].metricValues) || [{ value: 0 }, { value: 0 }, { value: 0 }];
  const out = [`# GA4 — property ${pid} — ${range.startDate}..${range.endDate} (${days}d)`,
    `TOTAL: pageviews ${t[0].value} · sessions ${t[1].value} · users ${t[2].value}`, '', '## Top pages (by views)'];
  (pages.rows || []).forEach(x => out.push('  ' + String(x.dimensionValues[0].value).slice(0, 44).padEnd(44) + '  views ' + x.metricValues[0].value + '  sess ' + x.metricValues[1].value));
  out.push('', '## Traffic by channel');
  (channels.rows || []).forEach(x => out.push('  ' + String(x.dimensionValues[0].value).padEnd(18) + '  sess ' + x.metricValues[0].value));
  const text = out.join('\n');
  console.log(text);
  try { fs.writeFileSync('ga4-latest.md', text); } catch (e) {}
})().catch(e => { console.error('GA4: ' + e.message); process.exit(1); });
