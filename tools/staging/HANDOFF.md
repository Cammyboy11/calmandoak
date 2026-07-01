# Calm & Oak — Shop Bolstering: 16 vetted new picks (staged 2026-07-01)

All picks meet the bar: >=4.3 stars, in-stock, US listing, Japandi look. Small items >=200 reviews; furniture >=50 (per your call).

## The picks

### FURNITURE (+5)
- **Coffee table** — Round Fluted Oak Coffee Table, 31.5in with Storage — 4.4★ / 58 reviews — `dp/B0GCJ64YGR` — _A fluted round coffee table in warm oak — the calm centre of a Japandi living room._
- **Dining table** — Winsome Groveland Wooden Dining Table, Walnut — 4.6★ / 1,900 reviews — `dp/B003QCJHK8` — _A simple solid-wood table with clean lines — dinner without the bulk._
- **Sofa** — Novilla Minimalist Linen-Look Sofa, Oatmeal — 4.8★ / 87 reviews — `dp/B0GWHSKRRV` — _A low, oatmeal-toned sofa with clean arms — soft without the bulk._
- **Nightstand** — Fluted Natural Oak Nightstand with Drawer — 4.3★ / 244 reviews — `dp/B0DR2VZF8C` — _Fluted oak with a soft-close drawer — a calm bedside in one piece._
- **Bookshelf** — 100% Solid Oak 3-Tier Ladder Shelf — 4.7★ / 131 reviews — `dp/B0D5HB8RLV` — _A leaning solid-oak ladder shelf — open, light, and quietly warm._

### CERAMICS & TABLEWARE (+4)
- **Matcha tea set** — TANG PIN Matcha Set — Bowl & Whisk, Stoneware — 4.8★ / 1,200 reviews — `dp/B0C5GQ6DXM` — _A stoneware matcha bowl, whisk and rest — the slow-morning ritual, complete._
- **Teapot & tea set** — DUJUST Japanese Tea Set, Kiln-Altered Reactive Glaze — 4.6★ / 2,700 reviews — `dp/B09YNFWPP7` — _A reactive kiln-glaze teapot and cups — wabi-sabi imperfection you can pour from._
- **Stoneware bowls set** — MORA Ceramic Bowls Set, Matte Neutral — 4.8★ / 2,900 reviews — `dp/B0CJDQ4S98` — _Matte stoneware bowls in muted tones — everyday pieces that look hand-made._
- **Utensil crock** — DOWAN Ceramic Utensil Holder, Matte — 4.8★ / 4,800 reviews — `dp/B0CW1QL3NH` — _A matte stoneware crock to keep the counter calm and the tools to hand._

### OFFICE (+3)
- **Desk organizer** — KIRIGEN Solid Wood Desktop Organizer, 3-Tier — 4.7★ / 304 reviews — `dp/B09T6R6RHW` — _A solid-wood tray set that clears the surface without adding clutter._
- **Cable box** — Bamboo Cable Management Box with Lid — 4.7★ / 768 reviews — `dp/B07ZGFZ55R` — _Hides the power strip and cords in warm bamboo — the desk's quiet fix._
- **Bookends** — Muso Wood Bookends, Solid Wood Pair — 4.8★ / 541 reviews — `dp/B08BPBY26C` — _A solid-wood pair to hold a small, edited shelf of books upright._

### DECOR & ACCENTS (+4)
- **Faux olive tree** — Artificial Olive Tree, 5ft Potted — 4.6★ / 791 reviews — `dp/B0C14RGKK7` — _A 5ft faux olive tree — the one living gesture a calm room needs, no upkeep._
- **Incense holder** — Murphy's Naturals Stoneware Incense Holder — 4.7★ / 458 reviews — `dp/B0BXBBH3YG` — _A small stoneware holder for the end-of-day ritual — scent as punctuation._
- **Wall picture ledge** — Solid Ash Wood Picture Ledge Shelf, 24in — 4.6★ / 266 reviews — `dp/B0D6VXVZGS` — _A solid-ash ledge to lean prints and one small vessel — a gallery wall, softened._
- **Tealight holders** — Wooden Tea Light Candle Holders, Set — 4.4★ / 1,300 reviews — `dp/B0C5DGJ3CZ` — _Low wooden tealight holders — the 5pm warm-light ritual on a shelf or table._

## To make these live (on your PC — sandbox is firewalled from Amazon + Gemini)

1. **Get real product photos** (genuine /dp images, for the product cards):
   `node tools/fetch-product-images.mjs` — it auto-scans HTML placeholders. The 16 new ASINs are listed in `tools/staging/new-picks-asins.txt`; once their placeholder cards are in the shop pages (step 3) the fetch picks them up, or pass the list directly.
2. **Generate the Japandi product-exact scenes:** scene prompts are staged in `tools/staging/new-picks-visuals.json` (one per pick, each references `p-<ASIN>.jpg`).
   NOTE: to render the *exact* product into the scene (your standard), the generator must feed the real product photo into Gemini image-editing — the current `gen-visuals.mjs` is text-to-image only and needs that small enhancement. I can build `gen-product-scenes.mjs` next.
3. **Wire into shop:** add product cards (real photo + scene) into the 4 section pages, then `deploy-calmandoak.bat`.
4. **Pinterest pins:** feed the finished scene images into the Blotato queue as Amazon product pins (with descriptions).

Steps 3-4 I can do here once the images exist on disk.