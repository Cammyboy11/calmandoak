/* Calm & Oak — link-in-bio hub data (/go/).
   The single bio link for TikTok + Instagram.

   FEATURED is AGENT-MAINTAINED: the content-factory updates it each run to mirror
   the products it's currently posting, so a viewer who taps the bio finds the exact
   item they just saw, at the top. Newest first. Keep it to ~6 — it's a shortcut,
   not a catalogue. Empty array = the "Featured right now" section simply hides.

   Each item: { label, url, note }.  url = the real destination (Amazon affiliate
   link with tag=calmandoak-20 / a Payhip / a /shop product page). */
(function () {
  var FEATURED = [
    // { label: "Reeded oak desk", url: "https://www.amazon.com/dp/XXXX?tag=calmandoak-20", note: "Japandi office" }
  ];

  /* Evergreen — always shown below the featured items. */
  var EVERGREEN = [
    { label: "Shop the look", url: "/shop/", note: "Every curated piece" },
    { label: "Art prints", url: "/shop/prints/", note: "Original Japandi prints" },
    { label: "Premium guides", url: "/shop/guides/", note: "The Home Plan + Styling Pack" },
    { label: "Free — Palette generator", url: "/palette/", note: "Build your calm palette" },
    { label: "Free — Calm Home Calculator", url: "/calculator/", note: "Your personalised plan" },
    { label: "The Journal", url: "/journal/", note: "Room guides & how-tos" }
  ];

  function withUtm(u) {
    var sep = u.indexOf('?') > -1 ? '&' : '?';
    return u + sep + 'utm_source=bio&utm_medium=link-in-bio';
  }
  function btn(it, feat) {
    return '<a class="bio-btn' + (feat ? ' feat' : '') + '" href="' + withUtm(it.url) + '" target="_blank" rel="noopener">' +
      '<span class="bio-l">' + it.label + '</span>' +
      (it.note ? '<span class="bio-n">' + it.note + '</span>' : '') + '</a>';
  }
  function render() {
    var wrap = document.getElementById('bio-links');
    if (!wrap) return;
    var html = '';
    if (FEATURED.length) html += '<p class="bio-h">Featured right now</p>' + FEATURED.map(function (i) { return btn(i, true); }).join('');
    html += '<p class="bio-h">Explore</p>' + EVERGREEN.map(function (i) { return btn(i, false); }).join('');
    wrap.innerHTML = html;
  }
  if (document.readyState !== 'loading') render();
  else document.addEventListener('DOMContentLoaded', render);
})();
