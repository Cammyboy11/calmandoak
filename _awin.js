#!/usr/bin/env node
/**
 * _awin.js — build Awin affiliate deep links for Calm & Oak.
 * Publisher (affiliate) ID: 2895187.
 *
 * Usage:
 *   node _awin.js <merchant|awinmid> <destinationUrl>
 *     <merchant>  = a name in _awin-merchants.json (e.g. "etsy")
 *     <awinmid>   = the merchant's numeric Awin Advertiser ID
 *
 * IMPORTANT: a link only TRACKS/PAYS if you've been approved for that merchant's
 * program inside Awin. Find a merchant's awinmid in the Awin dashboard:
 * Advertisers -> (the joined program) -> "Advertiser ID". Put it in
 * _awin-merchants.json so the agents can use a friendly name.
 *
 * Links are plain affiliate URLs — render them as ListItem (name+url+image),
 * NEVER Product schema, with the affiliate disclosure on the page.
 */
const fs = require('fs');
const PUB = process.env.AWIN_PUBLISHER_ID || '2895187';

const [, , merchantArg, dest] = process.argv;
if (!merchantArg || !dest) {
  console.error('Usage: node _awin.js <merchant|awinmid> <destinationUrl>');
  process.exit(2);
}

let mid = merchantArg;
if (!/^\d+$/.test(merchantArg)) {
  let map = {};
  try { map = (JSON.parse(fs.readFileSync('_awin-merchants.json', 'utf8')).merchants) || {}; } catch (e) {}
  mid = map[merchantArg.toLowerCase()];
  if (!mid) {
    console.error(`Unknown merchant "${merchantArg}". Add its awinmid to _awin-merchants.json (after joining the program), or pass the numeric awinmid directly.`);
    process.exit(2);
  }
}

const link = `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${PUB}&ued=${encodeURIComponent(dest)}`;
console.log(link);
