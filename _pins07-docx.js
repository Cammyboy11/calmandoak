// Generate the per-pin copy Word document
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, ImageRun, TextRun, HeadingLevel, AlignmentType, PageBreak, Footer, PageNumber } = require('docx');
const sharp = require('sharp');

const ROOT = __dirname;
const PINS_DIR = path.join(ROOT, 'final pins', '07-mixed-stunning-batch');
const OUT_DOCX = path.join(PINS_DIR, 'Calm-and-Oak-Pin-Batch-07-Copy.docx');
const P = JSON.parse(fs.readFileSync(path.join(ROOT, '_pins07.json'), 'utf8'));

// short hashtag bank by board
const TAGS = {
  'Japandi Prints':       ['#japandiprints','#japandiwallart','#minimalistart','#sumie','#wabisabi','#calmhomedecor','#wallartprint'],
  'Japandi Bedroom':      ['#japandibedroom','#minimalistbedroom','#calmbedroom','#japandi','#wabisabi','#bedroominspiration'],
  'Japandi Living Room':  ['#japandilivingroom','#minimalistlivingroom','#calmhomedecor','#japandi','#scandihome'],
  'Japandi Kitchen':      ['#japandikitchen','#minimalistkitchen','#japandi','#slowliving','#kitcheninspiration'],
  'Japandi Office':       ['#japandioffice','#homeoffice','#minimaldesk','#japandi','#calmworkspace'],
  'Japandi Lighting':     ['#warmlighting','#paperlantern','#japandi','#minimalistlighting','#akari'],
  'Japandi Outdoor':      ['#japandioutdoor','#minimalistpatio','#calmgarden','#japandi','#slowliving'],
  'Japandi Textiles':     ['#japandi','#linenstyle','#textilelayering','#calmbedroom','#minimalistdecor'],
  'Japandi Decor':        ['#japandidecor','#minimalistdecor','#wabisabi','#japandi','#calmhome'],
  'Japandi Storage':      ['#minimaliststorage','#japandi','#wovenbasket','#calmhome','#slowliving'],
  'Japandi Bathroom':     ['#japandibathroom','#minimalistbathroom','#spabathroom','#japandi','#wafflelinen'],
  'Japandi Guides':       ['#japandi','#wabisabi','#slowliving','#minimalistliving','#japandihome','#calmhomedecor'],
  'Japandi Materials':    ['#honestmaterials','#japandi','#wabisabi','#oakdesk','#linenliving','#minimalisthome'],
  'Japandi Looks':        ['#japandi','#getthelook','#calmbedroom','#minimalisthome','#japandihome'],
};

// brand color palette for headings
const TC = 'C97B5C';   // terracotta
const CH = '2D2A26';   // charcoal
const GR = '5C544A';   // graphite

async function makeThumb(p) {
  const src = path.join(PINS_DIR, `07-${String(p.n).padStart(2,'0')}-${p.slug}.jpg`);
  if (!fs.existsSync(src)) return null;
  return await sharp(src).resize(280, 420, { fit: 'inside' }).jpeg({ quality: 78 }).toBuffer();
}

(async () => {
  const children = [];

  // ──── COVER ────
  children.push(
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1800, after: 200 },
      children: [new TextRun({ text: 'CALM & OAK', size: 28, color: TC, font: 'Georgia' })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 100 },
      children: [new TextRun({ text: 'Pin Batch 07', italics: true, size: 80, color: CH, font: 'Georgia' })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 800 },
      children: [new TextRun({ text: '90 art-directed pins — copy + targets', size: 28, color: GR, font: 'Georgia' })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 100 },
      children: [new TextRun({ text: 'Products  ·  Journal  ·  Prints', size: 22, color: GR, font: 'Georgia' })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 100 },
      children: [new TextRun({ text: '18 product pins  ·  12 journal & look pins  ·  60 print pins (30 lifestyle + 30 flat-art)', size: 18, color: GR, font: 'Georgia' })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 100 },
      children: [new TextRun({ text: 'Publish products + journal first while the Etsy print shop is being wired.', italics: true, size: 18, color: TC, font: 'Georgia' })] }),
    new Paragraph({ children: [new PageBreak()] }),
  );

  // ──── SECTION DIVIDERS + ENTRIES ────
  const sections = [
    { title: 'I  ·  Products', sub: 'Publish first — drive Amazon affiliate clicks', from: 1, to: 18 },
    { title: 'II  ·  Journal & Looks', sub: 'Publish first — drive site traffic', from: 19, to: 30 },
    { title: 'III  ·  Prints  ·  Lifestyle (framed on wall)', sub: 'Publish once Etsy shop is wired', from: 31, to: 60 },
    { title: 'IV  ·  Prints  ·  Flat art (the print itself)', sub: 'Pair each with its lifestyle pin above (same target)', from: 61, to: 90 },
  ];

  for (const sec of sections) {
    children.push(
      new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 600, after: 100 },
        children: [new TextRun({ text: sec.title, italics: true, size: 56, color: CH, font: 'Georgia' })] }),
      new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 100 },
        children: [new TextRun({ text: sec.sub.toUpperCase(), size: 16, color: TC, font: 'Calibri', characterSpacing: 100 })] }),
      new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 400 }, border: { bottom: { color: TC, space: 1, value: 'single', size: 6 } },
        children: [new TextRun({ text: ' ', size: 2 })] }),
    );

    for (let n = sec.from; n <= sec.to; n++) {
      const p = P.find(x => x.n === n);
      const tags = (TAGS[p.board] || ['#japandi','#calmhome']).join('  ');

      // pin number + slug heading
      children.push(
        new Paragraph({ spacing: { before: 300, after: 100 },
          children: [
            new TextRun({ text: `Pin ${String(p.n).padStart(2,'0')} `, size: 22, bold: true, color: TC, font: 'Georgia' }),
            new TextRun({ text: `· ${p.slug}`, size: 22, color: GR, font: 'Georgia' }),
            new TextRun({ text: `   ·   layout ${p.a}`, size: 18, color: GR, font: 'Calibri', italics: true }),
            new TextRun({ text: `   ·   ${p.board}`, size: 18, color: GR, font: 'Calibri', italics: true }),
          ] }),
      );

      // thumbnail
      const thumb = await makeThumb(p);
      if (thumb) {
        children.push(new Paragraph({ alignment: AlignmentType.LEFT, spacing: { after: 120 },
          children: [new ImageRun({ data: thumb, transformation: { width: 200, height: 300 } })] }));
      }

      // on-image title
      children.push(
        new Paragraph({ spacing: { after: 60 },
          children: [
            new TextRun({ text: 'On-image title:  ', size: 18, bold: true, color: CH, font: 'Calibri' }),
            new TextRun({ text: `"${p.title}"`, size: 22, italics: true, color: CH, font: 'Georgia' }),
            ...(p.sub ? [new TextRun({ text: `    — ${p.sub}`, size: 18, color: GR, font: 'Georgia' })] : []),
          ] }),
      );

      // Pinterest description (the caption)
      children.push(
        new Paragraph({ spacing: { after: 60 },
          children: [new TextRun({ text: 'Pinterest description:', size: 18, bold: true, color: CH, font: 'Calibri' })] }),
        new Paragraph({ spacing: { after: 100 },
          children: [new TextRun({ text: p.desc, size: 20, color: CH, font: 'Georgia' })] }),
      );

      // hashtags
      children.push(
        new Paragraph({ spacing: { after: 60 },
          children: [
            new TextRun({ text: 'Hashtags:  ', size: 18, bold: true, color: CH, font: 'Calibri' }),
            new TextRun({ text: tags, size: 18, color: GR, font: 'Calibri' }),
          ] }),
      );

      // target URL
      children.push(
        new Paragraph({ spacing: { after: 120 },
          children: [
            new TextRun({ text: 'Target URL:  ', size: 18, bold: true, color: CH, font: 'Calibri' }),
            new TextRun({ text: p.target, size: 18, color: TC, font: 'Calibri' }),
          ] }),
      );

      // soft divider
      children.push(new Paragraph({ spacing: { after: 200 }, border: { bottom: { color: 'DDDDDD', space: 1, value: 'single', size: 4 } },
        children: [new TextRun({ text: ' ', size: 2 })] }));
    }

    children.push(new Paragraph({ children: [new PageBreak()] }));
  }

  // ──── FOOTER + DOC ────
  const doc = new Document({
    creator: 'Calm & Oak',
    title: 'Pin Batch 07 — Copy & Targets',
    description: '60 art-directed pins for Pinterest with per-pin copy and destination URLs.',
    styles: { default: { document: { run: { font: 'Georgia', size: 22 } } } },
    sections: [{
      properties: { page: { margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: 'Calm ', size: 16, color: GR, font: 'Georgia' }),
                   new TextRun({ text: '&', size: 16, color: TC, italics: true, font: 'Georgia' }),
                   new TextRun({ text: ' Oak  ·  Pin Batch 07  ·  ', size: 16, color: GR, font: 'Georgia' }),
                   new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GR, font: 'Georgia' })] })] }) },
      children,
    }],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT_DOCX, buf);
  console.log(`✓ wrote ${OUT_DOCX}  (${Math.round(buf.length/1024)} KB)`);
})();
