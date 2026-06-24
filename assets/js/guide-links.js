/* Calm & Oak — shared paid-guide checkout resolver.
   The owned digital-product equivalent of print-links.js.

   One source of truth for each premium guide's Payhip checkout URL.
   Used on every guide sales page and on the /shop/guides/ storefront hub.

   - data-guide="slug"  -> sets the Buy button's href to that guide's Payhip URL.
                           If no URL is set yet (Cameron hasn't created the Payhip
                           product), the button shows "Available shortly" and is
                           disabled — exactly like the prints' "coming soon" pattern,
                           so a half-wired button can never take a customer to a dead page.

   ── HOW TO GO LIVE (Cameron only — creating the Payhip product + price is a
      checkout-platform action, so it is intentionally NOT done by the agent) ──
   For each guide below:
     1. Build the PDF:  node _build-product-pdfs.js
        → assets/japandi-home-plan/The-Japandi-Home-Plan.pdf
        → assets/japandi-styling-pack/The-Japandi-Styling-Pack.pdf
     2. Payhip → Add new product → Digital → upload that PDF.
     3. Set the price (suggested below) and the product name/description.
     4. Copy the product's share URL (looks like https://payhip.com/b/XXXXX).
     5. Paste it into PRODUCTS below, replacing the empty "" for that slug. Save, deploy.
   That's it — the live Buy buttons switch on automatically, no page edits needed. */
(function () {
  /* Payhip product URLs, keyed by slug. Empty "" = not created yet → button shows
     "Available shortly" and is safely disabled. Suggested prices in the comments. */
  var PRODUCTS = {
    "japandi-home-plan": "",     /* The Japandi Home Plan — suggested $19 */
    "japandi-styling-pack": ""   /* The Japandi Styling Pack — suggested $12 */
  };

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    document.querySelectorAll("[data-guide]").forEach(function (el) {
      var slug = el.getAttribute("data-guide");
      var url = PRODUCTS[slug];
      if (url) {
        el.setAttribute("href", url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
        el.removeAttribute("aria-disabled");
      } else {
        el.setAttribute("href", "#");
        el.setAttribute("aria-disabled", "true");
        el.style.opacity = "0.55";
        el.style.cursor = "default";
        if (el.hasAttribute("data-guide-label")) el.textContent = "Available shortly";
        el.addEventListener("click", function (e) { e.preventDefault(); });
      }
    });
  });
})();
