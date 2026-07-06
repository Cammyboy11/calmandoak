# BRAND PHOTO SPEC — Calm & Oak listing photos (2026-07-06)

Derived from 5 representative older listings (the brand standard, ~61 pre-existing actives):
Sumi-e Ensō 4513671388, Eucalyptus 4513739523, Moon Phases 4514733472,
Shizuka Kanji 4514669812, Oak Walnut Tonal 4513670516.
The formula below was IDENTICAL across all five (8 photos each; only the order of
photos 6-8 shuffles). Photos 1-2 are always: room scene, then oak frame.

## THE FORMULA (per print listing, 8 photos)

- **Photo 1 — Styled Japandi room hero.** The print (usually in a light-oak frame with
  white mat; Ensō was unframed/taped) fills 40-60% of frame height, hung on a warm
  off-white / textured plaster wall. Below it: light-oak furniture (console table or
  floating oak shelf). Props: one ceramic vase (white, or small black bud vase) with
  dried stems / eucalyptus, occasionally a stone or linen cloth. Soft directional
  window light from the LEFT with gentle shadow falloff. Portrait 4:5-ish crop.
- **Photo 2 — Light oak frame mockup.** Print in a thin light-oak frame with white
  border/mat, perfectly straight-on, centered on a plain warm-cream (#f5f0e8-ish)
  backdrop, generous negative space, soft drop shadow.
- **Photo 3 — Unframed print flat on wall.** Print alone on a slightly darker greige
  wall, subtle paper shadow — shows the product as actually shipped.
- **Photo 4 — Slim black frame mockup.** Same straight-on composition as #2 but thin
  matte-black frame (shows the second framing option).
- **Photo 5 — Macro detail crop.** Extreme close-up of the artwork showing paper grain
  and ink/pigment texture (and hanko seal where present). Fills the whole frame.
- **Photo 6 — Size-guide card.** Warm off-white card, centered serif heading
  "Three sizes", short terracotta rule under it, then: 8 x 10 inches · 20 x 25 cm /
  11 x 14 inches · 27 x 35 cm / 16 x 20 inches · 40 x 50 cm, then "All fit standard
  frames / Unframed, shipped flat", small "Calm & Oak" serif footer at bottom.
- **Photo 7 — Materials card.** Same card style, heading "Made the way we'd want them",
  terracotta rule, lines: "Museum-grade matte fine-art paper / 250 gsm · acid-free ·
  FSC-certified / Printed locally · shipped flat / Made to order", "Calm & Oak" footer.
- **Photo 8 — Full flat art.** The artwork full-bleed on its warm paper texture
  (the honest "what you get" shot), centered on cream backdrop.

(Photos 6-8 may appear in any order; 1-5 order is stable: room, oak, unframed, black,
detail — Moon Phases swapped detail to #3, so only "room first, oak second" is rigid.)

## STYLE KEYWORDS (for AI image generation / Gemini prompts)

Japandi interior, warm off-white plaster wall, light oak console / floating oak shelf,
ceramic bud vase with dried stems or eucalyptus, linen textures, soft diffused window
light from left, gentle shadows, warm neutral palette (cream, oat, sage, terracotta,
walnut), minimalist, no people, no text, editorial interior photography, 4:5 portrait.
Cards: warm off-white background #f7f2ea, centered old-style serif type (Georgia-like),
terracotta accent rule, tiny "Calm & Oak" wordmark footer.
Also: every photo has a hand-written descriptive ALT TEXT on the older listings
("<Design> print in a light oak frame on a pale wall." etc.) — new listings have none.

## GAP ANALYSIS — new listings vs the formula (checked 2026-07-06)

**Poster Layered Hills 4531654012 (10 photos, pre-fix):**
1. Photo #1 was the FLAT ART, not a room scene (formula demands room hero first).
2. Photos #2-#9: generic Gelato mockups — print rendered TINY (10-15% of frame) on
   off-brand rooms: cold gray/white Scandi bedroom, dark teal plaster wall, mustard-yellow
   dining chairs, gold boho wall with macrame. Wrong palette, wrong mood, no oak/linen.
3. The one on-brand photo (Gemini Japandi room scene) was buried LAST (#10). → FIXED: now #1.
4. No size-guide card, no materials card, no macro detail crop, no oak/black frame pair.
5. Alt text: auto "image 1..10" instead of descriptive sentences.

**Mug Seigaiha 4532093853 (10 photos):**
1. Photos #1-#6 are sterile Gelato renders: mug floating on pure white (3 of them nearly
   identical), a dated beige CGI vignette, a garish CGI wood table with green vase, and a
   two-mug shot on a plaid placemat (plaid = badly off-brand).
2. The 4 excellent Gemini scenes (oak table, garden window light, teapot, croissant,
   linen chair) are LAST (#7-#10) — exactly backwards. Gemini sparkle watermark visible
   bottom-left of scenes (minor).
3. No size/care card ("11oz ceramic, dishwasher safe" card in brand style is missing).

**Digital Layered Hills 4533284058 (10 photos):**
1. #1 is a square flat-art crop; the lovely Gemini room scene sits at #2 — should swap.
2. #4-#8 are five near-duplicate crops of the art (one, #4, is mostly empty beige) —
   filler; the older formula would use ONE macro detail + frame mockups instead.
3. #10 card uses bold ALL-CAPS sans ("INSTANT DIGITAL DOWNLOAD") — off-brand typography
   vs the serif "Three sizes" card, and its "Print up to 24 x 36 in · 300 DPI" claim is
   inaccurate for the 3000x4000 file (already flagged in PHASE-2-STATUS).
4. No oak/black frame mockups at all.

**Summary of the fix per new listing:** put the Gemini room scene FIRST; add oak-frame +
black-frame straight-on mockups, a macro detail crop, and brand-serif size + materials
cards; delete/deprioritize the worst generic Gelato scenes (teal wall, yellow chairs,
plaid placemat); write descriptive alt text.

## PROVEN REORDER RECIPE (Etsy listing editor, make photo N featured)

Proved 2026-07-06 on Layered Hills poster 4531654012: Gemini room scene moved photo #10
→ #1 (Featured), saved, and verified first on the public listing page.

Editor: `https://www.etsy.com/your/shops/me/listing-editor/edit/<id>#media`
Mechanism: tiles are dnd-kit sortables (`div[aria-roledescription="sortable"]`, the
list includes the VIDEO as index 1). Mouse `left_click_drag` does NOT work (instant
synthetic drag never activates the sensor), and synthetic JS KeyboardEvents/PointerEvents
don't work either. What works is JS focus + TRUSTED keyboard keys — but arrow moves
cannot cross the wrapped-row boundary (horizontal-list strategy), so flatten the grid
to one row first:

1. JS: `var s=[...document.querySelectorAll('[aria-roledescription="sortable"]')];`
   find the common parent container, set `cont.style.flexWrap='nowrap'` (tiles now one
   long row, verify `getBoundingClientRect().left` strictly increasing). Tile ids = the
   etsystatic image id (e.g. `s.find(e=>e.id==='8215634790')`).
2. JS: `el.focus()` on the tile to move.
3. Trusted keys (computer tool): `Return` → wait 1s → `Left` repeat=<current index> →
   wait 1s → `Return`. (Repeat-in-one-action works; slow single presses sometimes
   leave a stuck drag — press `Escape` to reset if the sortable count grows by 1.)
4. Verify via JS that the tile is index 0 and the "Featured" badge moved; restore
   `flexWrap=''`.
5. SCREENSHOT (wakes throttled tab), then click "Publish changes" bottom-right
   (~(1379,694) at 1568px width; was "Save draft" (1237,707) when listing was draft).
   Expect exit + green toast "Your listing has been successfully updated".
6. Confirm public page `etsy.com/listing/<id>`: first carousel image id = moved photo.

Gotchas: screenshot timeouts on this throttled tab are normal — wait 4s, re-screenshot;
clicks/keys still land. The pencil icon on a tile = crop/adjust editor (NOT reorder);
Cancel is top-right. aria-live region logs every dnd move ("Draggable item X was
dropped over droppable area Y") — read it to debug.
