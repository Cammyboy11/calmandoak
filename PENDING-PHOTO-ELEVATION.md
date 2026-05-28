# Pending: Gemini elevation of 25 real product photos

**Status:** BLOCKED — Gemini image API credits depleted (`RESOURCE_EXHAUSTED`, 2026-05-28). Top up at Google AI Studio billing, then run the elevation.

**What's staged:** the real Amazon product photo for each ASIN below is already downloaded at `assets/img/products-raw/<ASIN>.jpg` (1500px, gitignored). All 25 links were verified LIVE in-browser on 2026-05-28.

**Pipeline per ASIN (when credits return):**
1. `mcp__mcp-image__generate_image` with `inputImagePath = assets/img/products-raw/<ASIN>.jpg`, aspect 1:1, prompt: *"Reimagine this exact product in a calm Japandi editorial setting. Keep the product perfectly intact. Warm oak surface, soft natural daylight, cream background, subtle styling. Magazine product-page quality. 1:1 square. No text, no people, no logos."*
2. Sharp-resize the result to 800×800 → `assets/img/products-cropped/p-<ASIN>.jpg`.
3. Swap into cards (auto-handled by the "use p-<linkASIN> where it exists" pass).

## The 25 ASINs (already in product cards = first 12; rest become cards in the room-guide conversion)
| ASIN | Product (verified live) |
|---|---|
| B07T81461V | JONATHAN Y water-hyacinth basket table lamp |
| B0C58R2VBH | KEMA jute braided rug 8x10 |
| B0DK21FLCK | MIULEE oatmeal linen curtains 84" |
| B0DT6V6F33 | Cream boucle lumbar pillow 14x36 |
| B0DKXW9QYK | Bestier queen bed frame (upholstered headboard) |
| B0B18NB7ZF | VASAGLE MAEZO 2-tier round side table |
| B0DNZ6Q7CD | Plug-in wall sconce set of 2 |
| B0DHG6PMNM | Round water-hyacinth storage basket 12x7 |
| B0CJD73LV6 | AmorArc reactive-glaze stoneware dinnerware (18pc) |
| B07GSRCRV7 | Solino Home natural linen napkins |
| B01IMZLNBE | Simple&Opulence stonewashed linen duvet |
| B0DYNB5K2V | Cream ceramic farmhouse vase set |
| B00TV45VXC | East West Groton oak dining chairs |
| B00XBOJ0AI | SONGMICS 4-tier bamboo shelf |
| B0118561IU | GILDEN TREE waffle towel set |
| B07SW5G99B | Japanese cast-iron tea set (11pc) |
| B08ZSYG6D7 | Japanese-style ceramic tea/mate set of 4 |
| B09BB5MX6B | CADUKE plug-in swing-arm wall sconces (2) |
| B09HKN2ZRT | Dual monitor riser with drawer |
| B0C4XTSZYX | Bamboo pendant light 17.8" |
| B0CFTXJVPS | Bedsure 100% cotton muslin throw |
| B0CMD7H1NQ | Pampas grass decor (20 stems) |
| B0DC6FQKYR | Leather desk pad/mat |
| B0FLPQMKKC | MIULEE euro sham pillow covers 24x24 |
| B0FQV1Y3PR | Creative Co-Op stoneware pitcher, cream |
