# Etsy Listings v2 — copy rewrite (non-print products)

Written 2026-11-21 against `MARKETING-PSYCHOLOGY-PLAYBOOK.md`. Covers the 4 mugs, 4 totes, 4 notebooks and the 3 printable planning kits. Wall art, the 12 single digital downloads and the two "Quiet Walls" print sets are left for the prints pass.

Nothing here has been pushed to Etsy. The current live wording could not be read (Etsy is blocked from this session), so the "before" is the copy in `ETSY-LISTINGS.md` and `gelato-imports/*.csv`.

## Fix before anything else: claims that are not true

1. **"Hand-drawn marks"** (Neutral Mudcloth, every product) and **"Every print is hand-illustrated"** (shop About page). `HANDOFF-GO-LIVE.md` says the patterns are generated procedurally in Python. These lines must go. The rewrite says "an original Calm & Oak design", which is true. Etsy also asks sellers to state how an item was made; check the "how it's made" field on each listing matches.
2. **"Each print ships in a clean kraft mailer with a small thank-you card"** (shop FAQ). Gelato ships in its own packaging unless branded inserts are set up. Confirm or remove.
3. **"Sturdy handles", "roomy"** on the totes: unverified until a sample is in hand. Removed until then.

## What was wrong with the copy

| Problem | Example | Principle broken |
|---|---|---|
| Opens with poetry, not the product | "Seigaiha — overlapping wave scales, among the oldest calm in Japanese design." | Clarity first; the first line must say what it is and who it is for |
| Room suggestions copied from the wall art | A mug described as "a calm piece for Japandi living rooms, calm bedrooms"; a tote "for modern-minimal walls" | Specific and true |
| The same sentence twice in one description | Pattern line repeated in every Gelato CSV description | Every sentence earns its place |
| A "Keywords:" dump at the end | "Keywords: japandi, wabi-sabi, minimalist…" | Reads as spam to the buyer; Etsy does not rank on it |
| No specifics | No tote dimensions, no notebook size or page count | Specific beats general |
| No reason to trust or act | No delivery time, no damage guarantee, no gift angle | Proof and risk reversal |
| Titles are one template | "{Pattern} Japandi Mug — Minimalist Neutral Ceramic 11oz" × 4 | Listings compete with each other in search |
| Tags are near-identical across all 20 listings | 11 of 13 tags shared; "scandinavian decor" and "japanese art" on a tote | Each listing should reach different searches |
| Name mismatch | Title says "Sun Arch Boho", pattern is "Sun Arcs" | One name per thing |

## What the rewrite does

- **First line:** what it is, the pattern, the colours, the moment it is for. This line is also what shows in search previews.
- **Second paragraph:** what the pattern means, in two sentences. This is the brand layer and the only place for lyricism.
- **Details:** short, factual bullets.
- **A good gift for:** names the occasions. Much of Etsy's mug, tote and notebook buying is gifting.
- **The same pattern:** points to the matching pieces, to lift order value.
- **Made to order:** honest timing, set as an expectation instead of a surprise.
- **If anything is wrong:** the existing shop policy (photo within 14 days, replace or refund, no return), moved from the policy page to the point of decision.
- **Titles:** lead with the plain product words a buyer types, then pattern, then gift use.
- **Tags:** 13 per listing, all 20 characters or fewer, weighted to product-specific and gift searches. They are judgement, not search-volume data; check them in Etsy's search bar suggestions or a tool such as eRank before relying on them.

## Before publishing

- Replace every `[CONFIRM …]` line with the real figure from the Gelato product spec or the sample, or delete it.
- Confirm the shop has a section named "Home Collection"; if not, change that line.
- Order the samples (`LAUNCH-QC-PLAYBOOK.md`) and replace mockups with real photographs. No copy change will do as much as real photos and the first five reviews per listing.
- Voice kept to house rules: no exclamation marks, no hype.

---

## MUGS (11oz) — live on Etsy, $19

### Seigaiha — Mug

**Title (106 chars)**
```
Japandi Ceramic Mug 11oz, Seigaiha Wave Pattern, Minimalist Coffee Mug, Tea Lover Gift, Charcoal and Cream
```
**Tags (13)**
```
japandi mug, seigaiha mug, japanese wave mug, minimalist mug, ceramic coffee mug, tea lover gift, neutral mug, wabi sabi mug, zen gift, housewarming gift, 11oz mug, japanese pattern, calm home gift
```
**Description**
```
An 11oz ceramic mug wrapped edge to edge in seigaiha, the traditional Japanese wave pattern, in charcoal on off-white. Made for the first quiet cup of the day.

Seigaiha is the Japanese wave pattern: rows of overlapping arcs that have stood for calm seas and good fortune for centuries. Here it is drawn fine, so it reads as texture from across the room and as pattern up close.

It holds a full pour of coffee or a generous cup of tea, and it goes in the dishwasher afterwards.

DETAILS
• 11oz (325 ml) ceramic
• Pattern wraps the full mug
• Dishwasher and microwave safe
• Charcoal on off-white
• [CONFIRM FROM SAMPLE: finish (gloss or matte), interior and handle colour]

A GOOD GIFT FOR
Tea and coffee drinkers, a housewarming, a new desk, anyone who likes a quiet kitchen.

THE SAME PATTERN
Seigaiha also comes as a tote bag, a notebook and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```

### Ensō — Mug

**Title (101 chars)**
```
Enso Circle Mug 11oz, Japandi Ceramic Coffee Mug, Zen Brush Circle, Mindfulness Gift, Black and Cream
```
**Tags (13)**
```
enso mug, zen mug, japandi mug, meditation gift, mindfulness gift, minimalist mug, ceramic coffee mug, brush circle, wabi sabi mug, yoga teacher gift, 11oz mug, black and cream, tea lover gift
```
**Description**
```
An 11oz ceramic mug wrapped edge to edge in the ensō, the open Zen brush circle, in black on warm cream. Made for the first quiet cup of the day.

The ensō is the Zen brush circle, made in one stroke and left open. The gap is deliberate. It stands for the beauty of something unfinished, which is a good thing to be reminded of on an ordinary morning.

It holds a full pour of coffee or a generous cup of tea, and it goes in the dishwasher afterwards.

DETAILS
• 11oz (325 ml) ceramic
• Pattern wraps the full mug
• Dishwasher and microwave safe
• Black on warm cream
• [CONFIRM FROM SAMPLE: finish (gloss or matte), interior and handle colour]

A GOOD GIFT FOR
Tea and coffee drinkers, a housewarming, a new desk, anyone who likes a quiet kitchen.

THE SAME PATTERN
Ensō also comes as a tote bag, a notebook and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```

### Sun Arcs — Mug

**Title (93 chars)**
```
Sun Arch Mug 11oz, Terracotta Boho Ceramic Coffee Mug, Warm Minimalist Mug, Housewarming Gift
```
**Tags (13)**
```
sun arch mug, terracotta mug, boho mug, warm minimalist, ceramic coffee mug, arch pattern mug, neutral mug, housewarming gift, japandi mug, 11oz mug, earth tone mug, coffee lover gift, organic modern
```
**Description**
```
An 11oz ceramic mug wrapped edge to edge in Sun Arcs, a row of rising arches in terracotta on oat. Made for the first quiet cup of the day.

Sun Arcs is a row of rising arches in terracotta on oat, the colour of late-afternoon light on a clay wall. It is the warmest pattern in the collection, and the one to choose if the rest of the room is pale.

It holds a full pour of coffee or a generous cup of tea, and it goes in the dishwasher afterwards.

DETAILS
• 11oz (325 ml) ceramic
• Pattern wraps the full mug
• Dishwasher and microwave safe
• Terracotta on oat
• [CONFIRM FROM SAMPLE: finish (gloss or matte), interior and handle colour]

A GOOD GIFT FOR
Tea and coffee drinkers, a housewarming, a new desk, anyone who likes a quiet kitchen.

THE SAME PATTERN
Sun Arcs also comes as a notebook and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```

### Neutral Mudcloth — Mug

**Title (98 chars)**
```
Neutral Mudcloth Mug 11oz, Boho Minimalist Ceramic Coffee Mug, Charcoal and Oat, Housewarming Gift
```
**Tags (13)**
```
mudcloth mug, boho mug, neutral mug, minimalist mug, ceramic coffee mug, organic modern, charcoal mug, housewarming gift, japandi mug, 11oz mug, pattern mug, coffee lover gift, warm minimalist
```
**Description**
```
An 11oz ceramic mug wrapped edge to edge in Neutral Mudcloth, a pattern of dashes, crosses and broken lines in charcoal on oat. Made for the first quiet cup of the day.

Neutral Mudcloth takes its marks, the dashes, crosses and broken lines, from West African mudcloth, redrawn in charcoal on oat. The lines are irregular on purpose, so the pattern feels made, not stamped.

It holds a full pour of coffee or a generous cup of tea, and it goes in the dishwasher afterwards.

DETAILS
• 11oz (325 ml) ceramic
• Pattern wraps the full mug
• Dishwasher and microwave safe
• Charcoal on oat
• [CONFIRM FROM SAMPLE: finish (gloss or matte), interior and handle colour]

A GOOD GIFT FOR
Tea and coffee drinkers, a housewarming, a new desk, anyone who likes a quiet kitchen.

THE SAME PATTERN
Neutral Mudcloth also comes as a tote bag, a notebook and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```


---

## TOTE BAGS — live on Etsy, $28

### Seigaiha — Tote Bag

**Title (90 chars)**
```
Japandi Tote Bag, Seigaiha Wave Cotton Canvas Tote, Minimalist Market Bag, Book Lover Gift
```
**Tags (13)**
```
japandi tote bag, seigaiha tote, japanese wave bag, canvas tote bag, cotton tote bag, market bag, minimalist tote, book lover gift, reusable bag, japanese pattern, neutral tote bag, library bag, teacher gift
```
**Description**
```
A natural cotton canvas tote printed with seigaiha, the traditional Japanese wave pattern, in charcoal on off-white. An everyday bag that looks considered, for the market, the library or the commute.

Seigaiha is the Japanese wave pattern: rows of overlapping arcs that have stood for calm seas and good fortune for centuries. Here it is drawn fine, so it reads as texture from across the room and as pattern up close.

Carry it instead of a plastic bag and it earns its keep within a month.

DETAILS
• Natural cotton canvas
• Charcoal on off-white
• [CONFIRM FROM GELATO SPEC: width × height, handle length, fabric weight]
• [CONFIRM FROM GELATO SPEC: printed one side or both; care instructions]

A GOOD GIFT FOR
Book lovers, market shoppers, a teacher, a friend who has just moved.

THE SAME PATTERN
Seigaiha also comes as a mug, a notebook and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```

### Ensō — Tote Bag

**Title (99 chars)**
```
Enso Circle Tote Bag, Zen Cotton Canvas Tote, Japandi Minimalist Market Bag, Yoga Bag, Mindful Gift
```
**Tags (13)**
```
enso tote bag, zen tote bag, japandi tote bag, canvas tote bag, cotton tote bag, yoga bag, meditation gift, minimalist tote, market bag, brush circle, reusable bag, black and cream, book lover gift
```
**Description**
```
A natural cotton canvas tote printed with the ensō, the open Zen brush circle, in black on warm cream. An everyday bag that looks considered, for the market, the library or the commute.

The ensō is the Zen brush circle, made in one stroke and left open. The gap is deliberate. It stands for the beauty of something unfinished, which is a good thing to be reminded of on an ordinary morning.

Carry it instead of a plastic bag and it earns its keep within a month.

DETAILS
• Natural cotton canvas
• Black on warm cream
• [CONFIRM FROM GELATO SPEC: width × height, handle length, fabric weight]
• [CONFIRM FROM GELATO SPEC: printed one side or both; care instructions]

A GOOD GIFT FOR
Book lovers, market shoppers, a teacher, a friend who has just moved.

THE SAME PATTERN
Ensō also comes as a mug, a notebook and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```

### Ink Brush — Tote Bag

**Title (94 chars)**
```
Ink Brush Tote Bag, Sumi Stroke Cotton Canvas Tote, Japandi Minimalist Market Bag, Artist Gift
```
**Tags (13)**
```
ink brush tote, sumi tote bag, japandi tote bag, canvas tote bag, cotton tote bag, artist gift, minimalist tote, market bag, brush stroke bag, reusable bag, neutral tote bag, library bag, japanese style bag
```
**Description**
```
A natural cotton canvas tote printed with Ink Brush, vertical strokes in the manner of sumi ink painting, in charcoal on off-white. An everyday bag that looks considered, for the market, the library or the commute.

Ink Brush is a field of vertical strokes in the manner of sumi ink painting. Each stroke differs slightly in weight, so the pattern has movement without being busy.

Carry it instead of a plastic bag and it earns its keep within a month.

DETAILS
• Natural cotton canvas
• Charcoal on off-white
• [CONFIRM FROM GELATO SPEC: width × height, handle length, fabric weight]
• [CONFIRM FROM GELATO SPEC: printed one side or both; care instructions]

A GOOD GIFT FOR
Book lovers, market shoppers, a teacher, a friend who has just moved.

THE SAME PATTERN
Ink Brush also comes as a wall art print. Find it in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```

### Neutral Mudcloth — Tote Bag

**Title (91 chars)**
```
Neutral Mudcloth Tote Bag, Boho Cotton Canvas Tote, Minimalist Market Bag, Charcoal and Oat
```
**Tags (13)**
```
mudcloth tote bag, boho tote bag, neutral tote bag, canvas tote bag, cotton tote bag, market bag, minimalist tote, organic modern, reusable bag, book lover gift, pattern tote bag, teacher gift, library bag
```
**Description**
```
A natural cotton canvas tote printed with Neutral Mudcloth, a pattern of dashes, crosses and broken lines in charcoal on oat. An everyday bag that looks considered, for the market, the library or the commute.

Neutral Mudcloth takes its marks, the dashes, crosses and broken lines, from West African mudcloth, redrawn in charcoal on oat. The lines are irregular on purpose, so the pattern feels made, not stamped.

Carry it instead of a plastic bag and it earns its keep within a month.

DETAILS
• Natural cotton canvas
• Charcoal on oat
• [CONFIRM FROM GELATO SPEC: width × height, handle length, fabric weight]
• [CONFIRM FROM GELATO SPEC: printed one side or both; care instructions]

A GOOD GIFT FOR
Book lovers, market shoppers, a teacher, a friend who has just moved.

THE SAME PATTERN
Neutral Mudcloth also comes as a mug, a notebook and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```


---

## NOTEBOOKS — draft, $19

### Seigaiha — Notebook

**Title (97 chars)**
```
Japandi Lined Notebook, Seigaiha Wave Softcover Journal, Minimalist Desk Gift, Charcoal and Cream
```
**Tags (13)**
```
japandi notebook, seigaiha notebook, japanese wave, lined notebook, softcover journal, minimalist notebook, desk gift, writing journal, neutral notebook, japanese pattern, stationery gift, journal gift, new job gift
```
**Description**
```
A softcover lined notebook with seigaiha, the traditional Japanese wave pattern, in charcoal on off-white on the cover. For morning pages, lists, or a desk that likes things quiet.

Seigaiha is the Japanese wave pattern: rows of overlapping arcs that have stood for calm seas and good fortune for centuries. Here it is drawn fine, so it reads as texture from across the room and as pattern up close.

A notebook you leave out on the table, not one you hide in a drawer.

DETAILS
• Softcover, lined pages
• Charcoal on off-white cover
• [CONFIRM FROM GELATO SPEC: size, page count, paper weight, binding]

A GOOD GIFT FOR
Journal keepers, list makers, students, a colleague's new job.

THE SAME PATTERN
Seigaiha also comes as a mug, a tote bag and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```

### Sun Arcs — Notebook

**Title (85 chars)**
```
Sun Arch Lined Notebook, Terracotta Boho Softcover Journal, Warm Minimalist Desk Gift
```
**Tags (13)**
```
sun arch notebook, terracotta notebook, boho notebook, lined notebook, softcover journal, minimalist notebook, desk gift, writing journal, arch pattern, stationery gift, journal gift, new job gift, warm minimalist
```
**Description**
```
A softcover lined notebook with Sun Arcs, a row of rising arches in terracotta on oat on the cover. For morning pages, lists, or a desk that likes things quiet.

Sun Arcs is a row of rising arches in terracotta on oat, the colour of late-afternoon light on a clay wall. It is the warmest pattern in the collection, and the one to choose if the rest of the room is pale.

A notebook you leave out on the table, not one you hide in a drawer.

DETAILS
• Softcover, lined pages
• Terracotta on oat cover
• [CONFIRM FROM GELATO SPEC: size, page count, paper weight, binding]

A GOOD GIFT FOR
Journal keepers, list makers, students, a colleague's new job.

THE SAME PATTERN
Sun Arcs also comes as a mug and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```

### Ensō — Notebook

**Title (94 chars)**
```
Enso Circle Lined Notebook, Zen Softcover Journal, Japandi Minimalist Mindfulness Journal Gift
```
**Tags (13)**
```
enso notebook, zen journal, japandi notebook, lined notebook, softcover journal, mindfulness journal, meditation gift, minimalist notebook, writing journal, brush circle, stationery gift, gratitude journal, desk gift
```
**Description**
```
A softcover lined notebook with the ensō, the open Zen brush circle, in black on warm cream on the cover. For morning pages, lists, or a desk that likes things quiet.

The ensō is the Zen brush circle, made in one stroke and left open. The gap is deliberate. It stands for the beauty of something unfinished, which is a good thing to be reminded of on an ordinary morning.

A notebook you leave out on the table, not one you hide in a drawer.

DETAILS
• Softcover, lined pages
• Black on warm cream cover
• [CONFIRM FROM GELATO SPEC: size, page count, paper weight, binding]

A GOOD GIFT FOR
Journal keepers, list makers, students, a colleague's new job.

THE SAME PATTERN
Ensō also comes as a mug, a tote bag and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```

### Neutral Mudcloth — Notebook

**Title (95 chars)**
```
Neutral Mudcloth Lined Notebook, Boho Softcover Journal, Minimalist Desk Gift, Charcoal and Oat
```
**Tags (13)**
```
mudcloth notebook, boho notebook, neutral notebook, lined notebook, softcover journal, minimalist notebook, desk gift, writing journal, organic modern, stationery gift, journal gift, new job gift, pattern notebook
```
**Description**
```
A softcover lined notebook with Neutral Mudcloth, a pattern of dashes, crosses and broken lines in charcoal on oat on the cover. For morning pages, lists, or a desk that likes things quiet.

Neutral Mudcloth takes its marks, the dashes, crosses and broken lines, from West African mudcloth, redrawn in charcoal on oat. The lines are irregular on purpose, so the pattern feels made, not stamped.

A notebook you leave out on the table, not one you hide in a drawer.

DETAILS
• Softcover, lined pages
• Charcoal on oat cover
• [CONFIRM FROM GELATO SPEC: size, page count, paper weight, binding]

A GOOD GIFT FOR
Journal keepers, list makers, students, a colleague's new job.

THE SAME PATTERN
Neutral Mudcloth also comes as a mug, a tote bag and a wall art print. Find them in the Home Collection section of the shop.

MADE TO ORDER
Each piece is printed when you order it by our production partner, Gelato, so nothing sits in a warehouse. Please allow 3–5 business days for it to be made, then 2–5 business days for US delivery.

IF ANYTHING IS WRONG
If it arrives damaged or misprinted, send us a photo within 14 days and we will replace or refund it. You do not need to send it back.

An original Calm & Oak design.

— Calm & Oak
```

---

## PRINTABLE KITS (digital downloads)

`PRINTABLE-BUNDLE-STORE.md` lists some contents as "net-new" (swatch card, worksheets). Publish only what exists. Page counts marked `[CONFIRM]` must match the final files.

What changed from the existing bundle copy: each now opens with the buyer's problem, says who it is for, shows the three steps from download to use, and states what happens if a file does not work. The existing copy was already specific; it lacked the problem, the audience and the reassurance.

### Kit 1 — Japandi Colour Palette Kit ($12)

**Title (119 chars)**
```
Japandi Colour Palette Printable, 5 Palettes with Hex Codes, Paint Swatch Card and Room Worksheet, Instant Download PDF
```
**Tags (13)**
```
japandi palette, hex code guide, colour cheat sheet, paint palette, neutral palette, paint swatch card, room colour guide, japandi decor, interior planner, printable decor, warm neutral paint, home colour scheme, digital download
```
**Description**
```
Five Japandi colour palettes with exact hex codes, plus a swatch card to take to the paint counter. For the point where you have saved a hundred calm rooms and still cannot choose a wall colour.

Most Japandi rooms that go wrong go wrong on colour: a white that is too cold, three woods instead of two, an accent that shouts. This kit gives you five palettes that already work and three rules for keeping them working.

WHAT YOU GET
• The Palette Cheat-Sheet (10 pages): five signature palettes, every hex code
• The three rules: a warm base, two woods, one quiet accent
• A room-by-room matcher: which palette suits the bedroom, the kitchen, the office
• The five mistakes that flatten a Japandi room
• A cut-out swatch card to carry to the paint or fabric shop
• A fill-in worksheet for your own room

WHO IT IS FOR
Anyone about to paint, buy a sofa or choose curtains, who wants to decide once and stop second-guessing.

HOW IT WORKS
1. Download the PDF straight after purchase.
2. Print at home on US Letter. A4 works with "fit to page".
3. Cut out the swatch card and take it shopping.

GOOD TO KNOW
This is a digital product; nothing is posted. Printed colours vary by printer, so match paint to the hex codes, not to the printout. If a file will not open or print, message us and we will put it right.

— Calm & Oak
```

### Kit 2 — Calm Room Plan: Bedroom ($19)

**Title (115 chars)**
```
Japandi Bedroom Planner Printable, Room Budget Worksheet, Layout Guide and Shopping Checklist, Instant Download PDF
```
**Tags (13)**
```
japandi bedroom, bedroom planner, room planner pdf, decor checklist, bedroom layout, minimalist bedroom, budget worksheet, bedroom makeover, interior planner, calm bedroom, printable planner, home planner, digital download
```
**Description**
```
A printable plan for a Japandi bedroom: a budget worksheet, a layout sheet and a shopping checklist. For doing the room once, in order, without the Pinterest spiral.

A calm bedroom is mostly decisions made in the right sequence: what you will spend, where the bed goes, how the light is layered, which two woods. These pages take you through them one at a time.

WHAT YOU GET
• A room-budget worksheet: set the total, split it, keep to it
• A layout and zoning sheet: the bed wall, the nightstand pair, the lighting layers, the textile weights
• A shopping checklist: the pieces that make a Japandi bedroom, as tick-boxes
• The two-woods reference card: the one rule that keeps wood tones calm
[CONFIRM: total page count]

WHO IT IS FOR
Anyone redoing a bedroom this season who would rather follow a plan than scroll for another month. It works for a rented room and for a small one.

HOW IT WORKS
1. Download the PDF straight after purchase.
2. Print at home on US Letter. A4 works with "fit to page".
3. Start with the budget sheet, then the layout, then shop from the checklist.

GOOD TO KNOW
This is a digital product; nothing is posted. If a file will not open or print, message us and we will put it right.

Some checklist items link to products we may earn a small commission on, at no cost to you. You do not need to buy anything to use the plan.

— Calm & Oak
```

### Kit 3 — Japandi Starter Pack, Expanded ($24)

**Title (120 chars)**
```
Japandi Home Starter Pack Printable, 20 Page Guide, Colour Palettes, 7 Day Plan and Shopping Checklist, Instant Download
```
**Tags (13)**
```
japandi guide, home decor guide, japandi starter, decor planner, minimalist home, japandi decor, palette cheat sheet, 7 day plan, shopping checklist, calm home, printable guide, new home gift, digital download
```
**Description**
```
The complete Calm & Oak method for a Japandi home: a 20-page guide, the colour palettes, and a 7-day plan to work through. For starting from a home that feels cluttered or cold and not knowing what to change first.

Japandi is simple to recognise and hard to do, because it depends on a few rules nobody states. This pack states them, then turns them into a week of small steps.

WHAT YOU GET
• The Japandi Starter Guide (20 pages): the five principles, the palette, the materials, the two-woods rule, the three textile weights, the starter list
• The Palette Cheat-Sheet (10 pages): five palettes with hex codes and the room matcher
• A 7-day plan as a fill-in checklist: one step a day
• A materials tick-list: what to buy, in order
• A "five mistakes" self-audit: catch them before you spend

WHO IT IS FOR
Anyone doing a whole home slowly and properly, or setting up a first place. It also makes a useful gift for a new homeowner.

HOW IT WORKS
1. Download the PDFs straight after purchase.
2. Read the guide first. It takes about half an hour. [CONFIRM reading time]
3. Print the 7-day plan and begin with day one.

GOOD TO KNOW
This is a digital product; nothing is posted. If a file will not open or print, message us and we will put it right.

Some shopping-list items link to products we may earn a small commission on, at no cost to you.

— Calm & Oak
```
