#!/usr/bin/env node
/**
 * _mailerlite.js — verify + send via MailerLite (new API, connect.mailerlite.com).
 * Reads MAILERLITE_API_KEY (and MAILERLITE_FROM) from .env or env. Dependency-free.
 *
 *   node _mailerlite.js verify                                  # confirm key, list groups + counts
 *   node _mailerlite.js send "Subject" body.html [groupId]      # create + send a campaign now
 *
 * No groupId = send to all subscribers. The newsletter HTML is a file you pass in.
 * The email agent calls `verify` first, then `send` once a draft passes its QA gate.
 */
const fs = require('fs');

function fromEnv(name) {
  if (process.env[name]) return process.env[name];
  try {
    const m = fs.readFileSync('.env', 'utf8').match(new RegExp('^' + name + '=(.+)$', 'm'));
    if (m) return m[1].trim();
  } catch (e) {}
  return '';
}
const KEY = fromEnv('MAILERLITE_API_KEY');
if (!KEY) { console.error('No MAILERLITE_API_KEY. Add it to .env (MailerLite -> Integrations -> API).'); process.exit(2); }
const FROM = fromEnv('MAILERLITE_FROM') || 'hello@calmandoak.com';
const BASE = 'https://connect.mailerlite.com/api';

async function ml(path, method = 'GET', body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) { console.error('MailerLite ' + res.status + ': ' + JSON.stringify(j)); process.exit(1); }
  return j;
}

(async () => {
  const cmd = process.argv[2];
  if (cmd === 'verify') {
    const g = await ml('/groups');
    console.log('MailerLite OK (key valid). Groups:');
    (g.data || []).forEach(x => console.log('  ' + x.id + '  ' + x.name + '  (' + (x.active_count ?? '?') + ' active)'));
    return;
  }
  if (cmd === 'send') {
    const subject = process.argv[3], htmlFile = process.argv[4], groupId = process.argv[5];
    if (!subject || !htmlFile) { console.error('Usage: node _mailerlite.js send "Subject" body.html [groupId]'); process.exit(2); }
    const html = fs.readFileSync(htmlFile, 'utf8');
    const camp = await ml('/campaigns', 'POST', {
      name: subject, type: 'regular',
      emails: [{ subject, from_name: 'Calm & Oak', from: FROM, content: html }],
      groups: groupId ? [groupId] : undefined,
    });
    const id = camp.data && camp.data.id;
    if (!id) { console.error('No campaign id: ' + JSON.stringify(camp)); process.exit(1); }
    await ml('/campaigns/' + id + '/schedule', 'POST', { delivery: 'instant' });
    console.log('Campaign ' + id + ' sent: "' + subject + '"' + (groupId ? ' to group ' + groupId : ' to all'));
    return;
  }
  console.error('Usage: node _mailerlite.js verify | send "Subject" body.html [groupId]');
  process.exit(2);
})().catch(e => { console.error('MailerLite: ' + e.message); process.exit(1); });
