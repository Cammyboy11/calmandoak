// Calm & Oak — render the premium digital products (HTML) to print-ready PDFs.
// Mirrors _build-cheat-sheet-pdf.js exactly: a brand-styled, @page US-Letter HTML
// rendered to PDF via headless Chrome (puppeteer, already installed).
//
// Usage:
//   node _build-product-pdfs.js
//
// Outputs (NOT excluded by .assetsignore — only _*.js and *.md are, so the PDFs deploy):
//   assets/japandi-home-plan/The-Japandi-Home-Plan.pdf
//   assets/japandi-styling-pack/The-Japandi-Styling-Pack.pdf
//
// These PDFs are the files Cameron uploads to Payhip (one product each).
const path = require('path');
const fs = require('fs');

const JOBS = [
  {
    src: path.join(__dirname, 'assets', 'japandi-home-plan', 'japandi-home-plan.html'),
    out: path.join(__dirname, 'assets', 'japandi-home-plan', 'The-Japandi-Home-Plan.pdf'),
  },
  {
    src: path.join(__dirname, 'assets', 'japandi-styling-pack', 'japandi-styling-pack.html'),
    out: path.join(__dirname, 'assets', 'japandi-styling-pack', 'The-Japandi-Styling-Pack.pdf'),
  },
];

(async () => {
  for (const j of JOBS) {
    if (!fs.existsSync(j.src)) { console.error('Missing source HTML: ' + j.src); process.exit(1); }
  }

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
  for (const j of JOBS) {
    const page = await browser.newPage();
    await page.goto('file://' + j.src.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    // Give web fonts a beat to settle so Cormorant/Inter render in the PDF.
    await new Promise(r => setTimeout(r, 600));
    await page.pdf({
      path: j.out,
      width: '8.5in',
      height: '11in',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    await page.close();
    const kb = Math.round(fs.statSync(j.out).size / 1024);
    console.log('Wrote ' + j.out + '  (' + kb + ' KB)');
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
