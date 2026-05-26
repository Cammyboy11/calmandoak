# Phase B-2 — Live ASIN Re-verification Punch List

Status as of 2026-05-26: **86 of 86 ASINs browser-verified. Real failure rate ~33% wrong-product + ~15% label-drift.** Phase B's first pass (static checks only) missed this category of issue.

This document is the full remediation backlog. Items are sequenced so the lowest-effort/highest-impact fixes ship first.

---

## Shipped already (this session)

| # | Fix | Files |
|---|---|---|
| 1 | Fixed wrong `B0DLP245LL` link in the §5 "Things that age well" product callout I added yesterday — swapped to the real HAOBO headboard `B07ZRPL48D` | journal/japandi-101/index.html |
| 2 | Removed `B0DLP245LL` ("Slatted oak dresser" labeled card, actual product was a Huuger rustic-brown fabric dresser) from shop/bedroom. Renumbered JSON-LD positions 11→10, 12→11, 13→12, 14→13. `numberOfItems` 14 → 13. | shop/bedroom/index.html |

---

## Remaining work — organized by recommended priority

### 🥇 Tier 1 — relabel-only fixes (no sourcing, no risk)

These ASINs link to the right product but the visible `<h3 class="product-title">` and/or JSON-LD `name` is wrong. Fix is mechanical: rename the card to match what the link actually goes to.

| ASIN | Real product | Files with wrong label | New label |
|---|---|---|---|
| B07F266PMS | Christopher Knight Evelyn mid-century arm chair, beige + walnut | shop/furniture ("Walker Edison oak writing desk"), shop/looks/soft-lit-reading-nook ("Fluted oak pedestal side table") | "Christopher Knight Evelyn mid-century arm chair, beige + walnut" |
| B08F48LR45 | Longhui **100% cotton** knitted throw 51×63 cream | 12 files — label says "wool" everywhere | "Longhui cream cable-knit cotton throw, 51×63" |
| B0866GB57R | Kitinjoy cotton waffle kitchen towels 4-pack | shop/japandi-kitchen says "Japanese donabe rice pot" | "Cotton waffle kitchen tea towels, 4-pack" |
| B093GRTYD9 | Qingmiao gold table lamps set of 2 | journal/250-dollar-bedside-refresh says "Glass water carafe" | "Qingmiao gold table lamps, set of 2" |
| B09BB5MX6B | CADUKE plug-in swing-arm sconces set of 2 | shop/looks/the-lit-entryway says "Slim oak entryway console table" | "CADUKE plug-in swing-arm wall sconces, set of 2" |
| B09B7989F4 | ZILJJ glass water carafe + tumbler | shop/bedroom + shop/looks/the-calm-nightstand say "Cloud ceramic ring dish" | "Glass water carafe with tumbler" |
| B0C58R2VBH | KEMA jute braided rug **8×10** | Labels saying "5×7" should be "8×10" | "KEMA jute braided rug, 8×10" |
| B0C4XTSZYX | Hchunqjor bamboo pendant 17.8" | shop/looks/the-evening-dining-table ("East West dining chairs"), shop/looks/the-lit-entryway ("CADUKE sconces") | "Hchunqjor woven bamboo dome pendant, 17.8"" |
| B0CFF6XKN5 | AmorArc speckled ceramic mug set of 6 | shop/gift-guide ("Acacia wood serving tray") | "AmorArc speckled ceramic mug set of 6" |
| B0CG3Q4H5Q | CCINPPY cloud ceramic ring dish | shop/bedroom ("Matte ceramic hug-donut bud vase") | "CCINPPY cloud ceramic ring dish" |
| B0CJD73LV6 | AmorArc 18pc stoneware dinnerware | shop/ceramics ("Briful brown ceramic vase"), shop/gift-guide ("Stoneware water pitcher"), shop/japandi-kitchen ("Stoneware pasta bowls") | "AmorArc reactive-glaze stoneware dinnerware, 18pc service for 6" |
| B0CM3YJXZ9 | happimess Laurel abaca wicker basket (single) | shop/storage ("Stacked seagrass set of 3") | "happimess Laurel abaca wicker basket" |
| B0D31739VD | GIB seagrass baskets set of 3 with leather handles | shop/office ("Walnut + leather desk pad, large") | "GIB seagrass baskets set of 3 with leather handles" |
| B0D6YRJLCP | Hug Donut matte ceramic vase set | shop/bedroom ("Low bed, natural bedding") | "Hug Donut matte ceramic bud vase set" |
| B0DH21GJ15 | Besiost washed-oak entryway console | shop/furniture, shop/looks/the-lit-entryway, shop/office, shop/storage all have wrong names | "Besiost washed-oak entryway console table, 32"" |
| B0DHG6PMNM | Round water hyacinth basket | shop/looks/the-lit-entryway ("Acacia wood catch-all tray"), shop/storage ("SONGMICS wooden hangers") | "Round water hyacinth woven storage basket" |
| B0DK21FLCK | MIULEE oatmeal linen curtains 84" pair | shop/looks/the-layered-living-room ("JoraLion boucle lumbar"), shop/textiles ("Jute runner rug") | "MIULEE oatmeal linen curtains, 84" pair" |
| B0DNZ6Q7CD | Plug-in linen wall sconces pair | shop/lighting ("Nogy Akari rice paper floor lamp") | "Plug-in linen wall sconces, pair" |
| B0F4K9SP6N | MIULEE boucle pillow covers 4-pack | shop/looks/the-layered-living-room ("Longhui throw"), shop/textiles ("Linen curtain panel pair") | "MIULEE boucle pillow covers, 4-pack" |
| B0FQV1Y3PR | Creative Co-Op stoneware pitcher cream | shop/ceramics ("Salt cellar with wood spoon"), shop/looks/the-evening-dining-table ("Whitewashed ceramic vases") | "Creative Co-Op stoneware pitcher, cream" |
| B0FT361HDX | Briful brown ceramic vase 9.8" | shop/ceramics ("Cream ribbed bud vase set"), shop/decor-accents ("Acacia wood decorative tray") | "Briful brown ceramic vase, 9.8" tall" |

**Estimated effort:** ~40 targeted Edit operations across ~12 shop pages. ~1-2 hours of focused work.

### 🥈 Tier 2 — relabel right-product-wrong-name ASINs (no sourcing)

| ASIN | What Amazon shows | Current wrong label | New label |
|---|---|---|---|
| B09Y5VVRPT | CONSDAN walnut cutting board 20×15 | "CZZGSM glass canisters with 132 labels" (shop/japandi-kitchen) | "CONSDAN walnut cutting board, 20×15" |
| B0CMWLVJGT | CZZGSM 6pk glass canisters with 132 labels | "Reactive-glaze stoneware cup + saucer set" (shop/japandi-kitchen) | "CZZGSM glass canisters with bamboo lids, set of 6" |
| B0D2CZYGJ9 | MECHYIN rattan nightstand set of 2 with charging | "Slatted oak dresser" / "Oak round nightstand" (shop/bedroom) | "MECHYIN rattan nightstand pair with charging station" |
| B0D7BWWVC7 | LAMSU boho tripod rattan floor lamp | "JONATHAN Y hyacinth basket table lamp" (shop/lighting) | "LAMSU boho rattan tripod floor lamp" |
| B0DD8CZ28Q | Nogy Noguchi-style rice paper floor lamp | "Yolsunes wicker pendants" / "Longhui throw" | "Noguchi-style rice paper floor lamp" |
| B0DHCYFKY7 | Bedsure cotton-linen sheet set queen 4pc | "Oak round nightstand" (shop/bedroom) | "Bedsure cotton-linen bed sheet set, queen" |
| B0DPW6TCQF | SONGMICS wooden hangers 30-pack | "Closed beats open" (editorial copy) | "SONGMICS wooden hangers, 30-pack" |
| B0DQTRHBFY | Nonam seagrass set of 3 with lids | "Tall woven coffee-table basket" (singular) | "Nonam seagrass storage baskets with lids, set of 3" |
| B0FFMF13MV | Whitewashed ceramic vases set of 3 | "Embrace the imperfect" (editorial copy) | "Whitewashed ceramic vases, set of 3" |
| B0FXVM8YJ1 | Booniture 15" bamboo pumpkin pendant light | "LAMSU boho tripod floor lamp" (shop/lighting) | "Booniture bamboo pumpkin pendant light, 15"" |
| B0GFDJCQZ6 | SMIRLY bamboo silverware drawer organizer | "Clear the counter" (editorial copy) | "SMIRLY bamboo silverware drawer organizer" |

### 🥉 Tier 3 — true wrong-product, needs replace or delete (priority order)

| ASIN | What Amazon shows | Original intent | Recommended action |
|---|---|---|---|
| B0DRHQ1FKP | THKSHOUZ fluted oak pedestal nightstand, 33 reviews, ship-block | Fluted oak pedestal nightstand/side table | **REPLACE** — high priority (9 files, anchors Sage Bedroom Look). Source a stronger fluted oak pedestal with 200+ reviews shipping to US/Canada |
| B07Z6RZ6H5 | Madison Park plush white tufted bath mat | Cotton waffle bath mat oat | REPLACE — used in journal/250-dollar-bathroom hero |
| B08SW6BSKS | BILL.F acacia wood salad bowl set | Stoneware mugs / wide stoneware salad bowl | REPLACE — used in shop/ceramics + shop/gift-guide |
| B0CMD7H1NQ | 40" pampas grass decor 20 stems | Low oak platform bed / outdoor wool blanket | Mixed: pampas grass IS on-brand decor — could RELABEL to "Tall pampas grass, 20 stems" and find different homes for the "platform bed" / "outdoor blanket" cards |
| B0DBSKRVNL | comfoyar 7pc wooden cooking utensils | Japanese donabe rice pot | RELABEL to "Beech wood cooking utensil set" + find new ASIN for the donabe slot |
| B091MJ3CMM | Easy-Going sofa slipcover | Walker Edison oak desk / Longhui throw | REPLACE — both labels wrong, sofa slipcover off-brand |
| B0DC6FQKYR | Generic leather desk pad 48×24 | Slim oak floating ladder shelf | DELETE — duplicate desk pad (we have YSAGi `B0BVVRCP3R`) AND label is wrong |
| B09493XGR5 | StorageWorks fabric hanging closet organizer | Slim oak floating shelf | Could RELABEL to "Fabric hanging closet organizer" (on-brand for closet capsule) OR delete |
| B0FF4RNKM2 | AmorArc ceramic nesting bowls set of 3 | Beech wood cooking utensil set | RELABEL to "AmorArc ceramic nesting mixing bowls, set of 3" (the bowls ARE on-brand) |
| B0FFZ61S64 | LE TAUCI small ceramic bowls set of 4 | Linen meditation cushion / bud vase set | RELABEL to "LE TAUCI small ceramic bowls, set of 4" + find new ASIN for meditation cushion slot |
| B0FLPQMKKC | MIULEE euro sham pillow covers 24×24 pair | Longhui cable-knit throw | RELABEL to "MIULEE euro sham pillow covers, 24×24 pair" (on-brand textile) |
| B0GGZF4ZRJ | Generic 8×10 abstract area rug | Boucle cushion cover set | DELETE — wrong category AND brand-off generic rug |
| B0GHPWL9GS | Gibson stoneware espresso cup + saucer set | Acacia wood breakfast tray | RELABEL to "Gibson stoneware espresso cup + saucer set" (on-brand ceramic) |

**Net after Tier 3:** ~3-4 true REPLACES needed (THKSHOUZ pedestal, waffle bath mat, BILL.F salad bowl, sofa slipcover, donabe). The rest become relabels or honest deletes.

---

## Recommended execution order for the next session

1. **Tier 2 first** (11 relabels, ~30 minutes) — fastest win, gets the most-misleading cards corrected
2. **Tier 1 next** (~21 relabels across ~12 files, ~1-2 hours) — systematic cleanup of the cross-page collisions  
3. **Tier 3 last** (~13 decisions, ~1 hour relabel + browser sourcing for 3-4 replaces) — most strategic, highest individual value
4. **Re-run static audits** (image existence, tag presence, JSON-LD count integrity) — confirm no regressions
5. **Document everything in PRODUCT-CHANGES-LOG.md**
6. **Mark Phase B-2 complete** and resume japandi-bedroom Commit 2

Estimated total: **3-5 hours of focused work**. Best done in one or two dedicated sessions, not interleaved with article rebuilds.

---

## What's safe right now

After tonight's two fixes:
- `journal/japandi-101` is clean — the product callout I added yesterday now links to the real HAOBO headboard
- `shop/bedroom` has the worst rotten card removed (the Huuger dresser disguised as a "Slatted oak dresser")

Everything else listed above is still live with wrong labels or wrong products. **No more article rebuilds that touch product callouts should ship until Tier 1 + Tier 2 are done** — otherwise we keep adding more callouts that might link to whatever silent failure happens to share an ASIN.
