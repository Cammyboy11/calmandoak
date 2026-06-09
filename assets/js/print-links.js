/* Calm & Oak — shared print link resolver.
   One source of truth for (a) each print's Etsy listing deep-link and
   (b) each print's direct digital-download checkout URL.
   Used on the Print Collection grid and on every per-print story page.

   - data-etsy-print="slug"  -> opens that print's Etsy listing (falls back to the shop).
   - data-digital="slug"     -> opens that print's direct digital-download checkout.
                                 If no checkout URL is set yet, the button shows
                                 "Digital download — coming soon" and is disabled.

   To launch direct digital sales: create each product on the checkout provider
   (Payhip recommended — free, instant delivery, handles EU VAT) and paste its
   URL into DIGITAL below, keyed by slug. */
(function () {
  var SHOP = "https://www.etsy.com/shop/CalmandOak";

  var ETSY = {
    "enso": "https://www.etsy.com/listing/4513671388/sumi-e-enso-print-japandi-wall-art-zen",
    "bent-reed": "https://www.etsy.com/listing/4514620766/sumi-e-reed-print-japandi-wall-art",
    "crane": "https://www.etsy.com/listing/4513670279/sumi-e-crane-print-japandi-wall-art",
    "mountain-mist": "https://www.etsy.com/listing/4514559683/sumi-e-mountain-print-japandi-wall-art",
    "bamboo": "https://www.etsy.com/listing/4514183382/sumi-e-bamboo-print-japandi-wall-art",
    "cherry-branch": "https://www.etsy.com/listing/4514185358/sumi-e-cherry-blossom-print-japandi-wall",
    "koi": "https://www.etsy.com/listing/4513682155/sumi-e-koi-print-japandi-wall-art",
    "mountain-stream": "https://www.etsy.com/listing/4513717337/sumi-e-waterfall-print-japandi-wall-art",
    "tsuki": "https://www.etsy.com/listing/4513731734/wabi-sabi-tea-bowl-print-sumi-e-wall-art",
    "single-stem": "https://www.etsy.com/listing/4514539948/single-stem-print-botanical-line-art",
    "eucalyptus": "https://www.etsy.com/listing/4513739523/eucalyptus-print-single-line-botanical",
    "olive": "https://www.etsy.com/listing/4513745265/olive-branch-print-botanical-line-art",
    "pampas": "https://www.etsy.com/listing/4513753457/pampas-grass-print-boho-botanical-wall",
    "ginkgo": "https://www.etsy.com/listing/4513763284/ginkgo-leaf-print-japandi-botanical-line",
    "wild-grass": "https://www.etsy.com/listing/4513771858/wild-grass-print-minimalist-botanical",
    "serene-dawn": "https://www.etsy.com/listing/4513671801/soft-arch-landscape-print-japandi",
    "moon-cycle": "https://www.etsy.com/listing/4514733472/moon-phases-print-three-moon-cycle-wall",
    "horizon-bird": "https://www.etsy.com/listing/4514741847/minimalist-horizon-print-japandi-bird",
    "dusk": "https://www.etsy.com/listing/4514724482/lone-tree-print-terracotta-sunset",
    "layers": "https://www.etsy.com/listing/4514689937/color-field-landscape-print-earth-tone",
    "moonrise": "https://www.etsy.com/listing/4514681587/full-moon-print-minimalist-moon",
    "shizuka": "https://www.etsy.com/listing/4514669812/japanese-kanji-print-shizuka-stillness",
    "wa": "",
    "ma": "https://www.etsy.com/listing/4514768430/japanese-kanji-print-ma-negative-space",
    "two-woods": "https://www.etsy.com/listing/4513670516/tonal-study-print-oak-walnut-color-field",
    "warm-earth": "https://www.etsy.com/listing/4514773752/tonal-study-print-terracotta-oat-color",
    "sage-stone": "",
    "balance": "",
    "chado": "",
    "linen-morning": ""
  };

  /* Direct digital-download checkout URLs (e.g. Payhip product links). Empty = "coming soon". */
  var DIGITAL = {
    "enso": "https://payhip.com/b/qAzfj",
    "bent-reed": "https://payhip.com/b/O87Ce",
    "crane": "https://payhip.com/b/4B5Ug",
    "mountain-mist": "https://payhip.com/b/dIHs3",
    "bamboo": "https://payhip.com/b/UjvwL",
    "cherry-branch": "https://payhip.com/b/I4vLy",
    "koi": "https://payhip.com/b/yqWc3",
    "mountain-stream": "https://payhip.com/b/2UIkJ",
    "tsuki": "https://payhip.com/b/BhtYV",
    "single-stem": "https://payhip.com/b/cCoS9",
    "eucalyptus": "https://payhip.com/b/Ofoc3",
    "olive": "https://payhip.com/b/tBfoe",
    "pampas": "https://payhip.com/b/G8jBR",
    "ginkgo": "https://payhip.com/b/wp4uY",
    "wild-grass": "https://payhip.com/b/oi0Oe",
    "serene-dawn": "https://payhip.com/b/20uTp",
    "moon-cycle": "https://payhip.com/b/4djzP",
    "horizon-bird": "https://payhip.com/b/ZhxjF",
    "dusk": "https://payhip.com/b/ia92h",
    "layers": "https://payhip.com/b/vdx6q",
    "moonrise": "https://payhip.com/b/5Lme6",
    "shizuka": "https://payhip.com/b/gsoTK",
    "wa": "https://payhip.com/b/pCZwK",
    "ma": "https://payhip.com/b/Nzq6E",
    "two-woods": "https://payhip.com/b/jiARd",
    "warm-earth": "https://payhip.com/b/qvVYE",
    "sage-stone": "https://payhip.com/b/Bw5KT",
    "balance": "https://payhip.com/b/CFme8",
    "chado": "https://payhip.com/b/bkyPh",
    "linen-morning": "https://payhip.com/b/UTslO"
  };

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    document.querySelectorAll("[data-etsy-print]").forEach(function (el) {
      var slug = el.getAttribute("data-etsy-print");
      el.setAttribute("href", ETSY[slug] || SHOP);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });

    document.querySelectorAll("[data-digital]").forEach(function (el) {
      var slug = el.getAttribute("data-digital");
      var url = DIGITAL[slug];
      if (url) {
        el.setAttribute("href", url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      } else {
        el.setAttribute("href", "#");
        el.setAttribute("aria-disabled", "true");
        el.style.opacity = "0.55";
        el.style.cursor = "default";
        if (el.hasAttribute("data-digital-label")) el.textContent = "Digital download — coming soon";
        el.addEventListener("click", function (e) { e.preventDefault(); });
      }
    });
  });
})();
