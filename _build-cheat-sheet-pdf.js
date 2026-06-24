// Calm & Oak — render the palette cheat-sheet HTML to a print-ready PDF.
// Mirrors the starter-guide pipeline: a brand-styled, @page US-Letter HTML
// rendered to PDF via headless Chrome. Run this once in any environment that
// has Node + puppeteer (or puppeteer-core + a local Chrome) to (re)generate
//   assets/palette-cheat-sheet/Japandi-Palette-Cheat-Sheet.pdf
//
// Usage:
//   npm i puppeteer   # one-time, if not already present
//   node _build-cheat-sheet-pdf.js
//
// The .pdf output is NOT excluded by .assetsignore (only _*.js and *.md are),
// so once generated it deploys and becomes downloadable at:
//   https://calmandoak.com/assets/palette-cheat-sheet/Japandi-Palette-Cheat-Sheet.pdf
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, 'assets', 'palette-cheat-sheet', 'japandi-palette-cheat-sheet.html');
const OUT = path.join(__dirname, 'assets', 'palette-cheat-sheet', 'Japandi-Palette-Cheat-Sheet.pdf');

(async () => {
  if (!fs.existsSync(SRC)) { console.error('Missing source HTML: ' + SRC); process.exit(1); }

  let puppeteer;
  try { puppeteer = require('puppeteer'); }
  catch (e) {
    try { puppeteer = require('puppeteer-core'); }
    catch (e2) { console.error('Install puppeteer first:  npm i puppeteer'); process.exit(2); }
  }

  // puppeteer-core needs an explicit Chrome path; puppeteer ships its own.
  const launchOpts = {};
  if (!require.resolve('puppeteer', { paths: [__dirname] }).includes('puppeteer' + path.sep + 'lib')) {
    const guesses = [
      'C:/Program Files/Google/Chrome/Application/chrome.exe',
      'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
      (process.env.LOCALAPPDATA || '') + '/Google/Chrome/Application/chrome.exe',
      'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    ];
    const hit = guesses.find(g => g && fs.existsSync(g));
    if (hit) launchOpts.executablePath = hit;
  }

  const browser = await puppeteer.launch(launchOpts);
  const page = await browser.newPage();
  await page.goto('file://' + SRC.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  // Give web fonts a beat to settle so Cormorant/Inter render in the PDF.
  await new Promise(r => setTimeout(r, 600));
  await page.pdf({
    path: OUT,
    width: '8.5in',
    height: '11in',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();

  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log('Wrote ' + OUT + '  (' + kb + ' KB)');
})().catch(e => { console.error(e); process.exit(1); });
