/* Calm & Oak — shop pointers for calmandoak.com (sale bar, in-article card, mobile bar, proof line).
   Everything here sends readers to shop.calmandoak.com. The sale wording switches itself off
   when the sale ends (SALE_END); after that the evergreen wording shows. No page edits needed. */
(function () {
  'use strict';
  var path = location.pathname;
  if (/^\/(privacy|disclosures|contact|ops|go|home-preview2?)\//.test(path)) return;

  var SALE_END = Date.parse('2026-12-01T23:59:00Z');
  var sale = Date.now() < SALE_END;
  var SHOP = 'https://shop.calmandoak.com';
  var CDN = 'https://cdn.shopify.com/s/files/1/0809/2555/6772/files/';
  var camp = sale ? 'bf-2026' : 'shop';
  function u(p, medium) {
    var hash = '';
    var i = p.indexOf('#');
    if (i > -1) { hash = p.slice(i); p = p.slice(0, i); }
    return SHOP + p + '?utm_source=calmandoak&utm_medium=' + medium + '&utm_campaign=' + camp + hash;
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }
  var QUOTE = '&ldquo;Really beautiful quality &mdash; definitely exceeded my expectations.&rdquo; <span>Zohra, on Etsy</span>';
  var PROMISE = 'Arrives damaged or misprinted? We replace it or refund you.';

  var css = '' +
    '.cosb{display:flex;align-items:center;justify-content:center;gap:.9em;flex-wrap:wrap;background:#1C1A17;color:#F4F1EA;text-decoration:none;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:.8rem;letter-spacing:.04em;line-height:1.35;padding:.7em 1em;text-align:center}' +
    '.cosb b{font-weight:600;background:#B4623F;color:#FBF8F2;padding:.18em .6em;border-radius:2px;letter-spacing:.1em;text-transform:uppercase;font-size:.72rem;white-space:nowrap}' +
    '.cosb u{text-decoration:none;border-bottom:1px solid rgba(244,241,234,.6);padding-bottom:1px;white-space:nowrap;font-weight:500}' +
    '.cosb:hover u{border-color:#F4F1EA}' +
    '.cosb .s{display:none}' +
    '@media(max-width:640px){.cosb .l{display:none}.cosb .s{display:inline}.cosb{font-size:.76rem;gap:.6em;padding:.6em .8em}}' +
    '@media(max-width:820px){.topbar .btn{white-space:nowrap}}' +
    '@media(min-width:821px) and (max-width:1180px){.nav__shop .cosb-tag{display:none !important}}' +
    '.nav__shop .cosb-tag{display:inline-block;margin-left:.45em;background:#B4623F;color:#FBF8F2;font-size:.62rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:.15em .45em;border-radius:2px;vertical-align:middle}' +
    '.cosc{margin:2.6rem 0;background:#EFE8DA;border-radius:6px;overflow:hidden;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#1C1A17;display:block}' +
    '.cosc__imgs{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:#EFE8DA}' +
    '.cosc__imgs.one{grid-template-columns:1fr}.cosc__imgs.one a{aspect-ratio:16/9}' +
    '.cosc__imgs a{position:relative;display:block;border:0 !important;aspect-ratio:4/3;overflow:hidden}' +
    '.cosc__imgs img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;margin:0;border-radius:0;transition:transform .5s ease}' +
    '.cosc__imgs a:hover img{transform:scale(1.04)}' +
    '.cosc__imgs span{position:absolute;left:0;right:0;bottom:0;padding:1.6em .7em .55em;font-size:.68rem;letter-spacing:.06em;color:#FBF8F2;background:linear-gradient(180deg,rgba(28,26,23,0),rgba(28,26,23,.72));line-height:1.3}' +
    '.cosc__in{padding:1.6rem 1.7rem 1.5rem}' +
    '.cosc__eye{font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:#B4623F;font-weight:600;margin:0 0 .7rem}' +
    '.cosc__h{font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;font-size:1.65rem;line-height:1.12;margin:0 0 .6rem;color:#1C1A17}' +
    '.cosc__p{font-size:.93rem;line-height:1.55;color:#4a453d;margin:0 0 .9rem}' +
    '.cosc__q{font-size:.82rem;line-height:1.5;color:#4a453d;margin:0 0 1.1rem;font-style:italic}' +
    '.cosc__q i{font-style:normal;color:#B4623F;letter-spacing:.12em;margin-right:.4em}' +
    '.cosc__q span{font-style:normal;color:#7a7368}' +
    '.cosc__cta{display:flex;gap:.9rem 1.1rem;align-items:center;flex-wrap:wrap}' +
    '.cosc__btn{display:inline-block;background:#B4623F;color:#FBF8F2 !important;text-decoration:none !important;font-weight:600;font-size:.88rem;padding:.8em 1.3em;border-radius:2px;border:0 !important;transition:background .25s,transform .25s}' +
    '.cosc__btn:hover{background:#984E30;transform:translateY(-2px)}' +
    '.cosc__lnk{font-size:.86rem;color:#1C1A17 !important;text-decoration:none !important;border-bottom:1px solid rgba(28,26,23,.4) !important;padding-bottom:1px}' +
    '.cosc__fine{font-size:.74rem;color:#7a7368;margin:1rem 0 0;line-height:1.5}' +
    '@media(max-width:720px){.cosc__in{padding:1.3rem 1.2rem 1.25rem}.cosc__h{font-size:1.45rem}.cosc__btn{width:100%;text-align:center}}' +
    '.cosp{max-width:680px;margin:-1rem auto 2rem;text-align:center;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:.86rem;line-height:1.6;color:#4a453d}' +
    '.cosp i{font-style:normal;color:#B4623F;letter-spacing:.12em;margin-right:.4em}' +
    '.cosp span{color:#7a7368}' +
    '.cosp a{color:#B4623F;font-weight:600;text-decoration:none;border-bottom:1px solid #B4623F}' +
    '.cosm{position:fixed;left:0;right:0;bottom:0;z-index:900;display:none;align-items:center;gap:.7rem;background:#1C1A17;color:#F4F1EA;padding:.65rem .8rem calc(.65rem + env(safe-area-inset-bottom));font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 -8px 24px -12px rgba(0,0,0,.5);transform:translateY(110%);transition:transform .35s ease}' +
    '.cosm.is-in{transform:none}' +
    '.cosm__t{flex:1;min-width:0;font-size:.8rem;line-height:1.3}' +
    '.cosm__t strong{display:block;font-weight:600}' +
    '.cosm__t span{color:rgba(244,241,234,.75);font-size:.74rem}' +
    '.cosm__b{background:#B4623F;color:#FBF8F2;text-decoration:none;font-weight:600;font-size:.84rem;padding:.75em 1.15em;border-radius:2px;white-space:nowrap}' +
    '.cosm__x{border:0;background:transparent;color:rgba(244,241,234,.7);font-size:22px;line-height:1;padding:.2em .3em;cursor:pointer}' +
    '@media(max-width:760px){.cosm{display:flex}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  function track(place) {
    if (typeof window.gtag === 'function') window.gtag('event', 'shop_click', { placement: place, sale: sale ? 'bf-2026' : 'none' });
    if (typeof window.plausible === 'function') window.plausible('Shop Click', { props: { placement: place } });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-cos]');
    if (a) track(a.getAttribute('data-cos'));
  });

  function build() {
    // ---- 1. Bar across the top of every page ----
    if (!document.querySelector('.cosb')) {
      var bar = el('a', 'cosb');
      bar.setAttribute('data-cos', 'bar');
      if (sale) {
        bar.href = u('/', 'bar');
        bar.innerHTML = '<b>30% off</b><span class="l">The Calm &amp; Oak Christmas collection &middot; sale ends 1 December &middot; free worldwide delivery</span><span class="s">Christmas collection &middot; ends 1 Dec</span><u>Shop the sale &rarr;</u>';
      } else {
        bar.href = u('/', 'bar');
        bar.innerHTML = '<span class="l">Calm &amp; Oak makes its own Japandi textiles and art prints &middot; made to order &middot; free worldwide delivery</span><span class="s">Our own textiles and art &middot; free delivery</span><u>Visit the shop &rarr;</u>';
      }
      document.body.insertBefore(bar, document.body.firstChild);
    }

    // ---- 2. Header links carry tracking, and the sale tag ----
    document.querySelectorAll('.topbar a[href="https://shop.calmandoak.com/"], .site-footer a[href="https://shop.calmandoak.com/"]').forEach(function (a) {
      a.href = u('/', 'nav');
      a.setAttribute('data-cos', 'nav');
      if (sale && a.classList.contains('nav__shop') && !a.querySelector('.cosb-tag')) a.appendChild(el('span', 'cosb-tag', '30% off'));
      if (sale && a.classList.contains('btn')) a.textContent = 'Shop 30% off';
    });

    // ---- 3. Card inside journal articles, a third of the way down ----
    var prose = document.querySelector('article.prose');
    if (prose && /^\/journal\/[^/]+\//.test(path) && !document.querySelector('.cosc')) {
      var hs = Array.prototype.filter.call(prose.querySelectorAll('h2'), function (h) { return h.parentNode === prose; });
      var at = hs.length >= 4 ? hs[2] : (hs.length >= 2 ? hs[1] : null);
      if (at) {
        var card = el('aside', 'cosc');
        card.setAttribute('aria-label', 'From the Calm & Oak shop');
        if (sale) {
          card.innerHTML =
            '<div class="cosc__imgs">' +
              '<a data-cos="card-img" href="' + u('/products/skov-tablecloth-scandinavian-christmas-woodblock-print-cotton', 'article') + '"><img loading="lazy" width="600" height="600" alt="Skov tablecloth by Calm &amp; Oak, a green woodblock tree print on a set table" src="' + CDN + '20261112170738-1f1debb9-080d-6c66-93b9-26fb44657a29.jpg?v=1794503366&width=600"><span>Skov Tablecloth</span></a>' +
              '<a data-cos="card-img" href="' + u('/products/midnight-pine-christmas-tree-skirt', 'article') + '"><img loading="lazy" width="600" height="600" alt="Midnight Pine tree skirt by Calm &amp; Oak under a decorated tree" src="' + CDN + 'il_fullxfull.8907019935_obr9.jpg?v=1794689103&width=600"><span>Midnight Pine Tree Skirt</span></a>' +
            '</div>' +
            '<div class="cosc__in">' +
              '<div class="cosc__eye">From our own shop &middot; 30% off until 1 December</div>' +
              '<div class="cosc__h">A quiet Christmas, in place of a loud one.</div>' +
              '<div class="cosc__p">We make our own Christmas table linens and tree skirts. One calm design runs across the tablecloth, runner, napkins and cushion, so the room looks planned. Made to order, with free worldwide delivery.</div>' +
              '<div class="cosc__q"><i>★★★★★</i>' + QUOTE + '</div>' +
              '<div class="cosc__cta"><a class="cosc__btn" data-cos="card" href="' + u('/collections/christmas', 'article') + '">Shop the Christmas collection &rarr;</a><a class="cosc__lnk" data-cos="card-sets" href="' + u('/#hm-sets', 'article') + '">Or add a whole table in one click</a></div>' +
              '<div class="cosc__fine">Sale ends 1 December. ' + PROMISE + '</div>' +
            '</div>';
        } else {
          card.innerHTML =
            '<div class="cosc__imgs one">' +
              '<a data-cos="card-img" href="' + u('/products/crane-at-dawn-woven-throw-natural-linen', 'article') + '"><img loading="lazy" width="600" height="600" alt="Crane at Dawn woven throw by Calm &amp; Oak over an armchair" src="' + CDN + 'crane-at-dawn-throw-natural-linen-01-armchair.jpg?v=1794317981&width=600"><span>Crane at Dawn Woven Throw</span></a>' +
            '</div>' +
            '<div class="cosc__in">' +
              '<div class="cosc__eye">From our own shop</div>' +
              '<div class="cosc__h">Made for rooms like this one.</div>' +
              '<div class="cosc__p">Calm &amp; Oak makes its own textiles and art prints, in the same quiet palette as these guides. Each piece is made to order, with free worldwide delivery.</div>' +
              '<div class="cosc__q"><i>★★★★★</i>' + QUOTE + '</div>' +
              '<div class="cosc__cta"><a class="cosc__btn" data-cos="card" href="' + u('/collections/most-loved', 'article') + '">Visit the Calm &amp; Oak shop &rarr;</a></div>' +
              '<div class="cosc__fine">' + PROMISE + '</div>' +
            '</div>';
        }
        prose.insertBefore(card, at);
      }
    }

    // ---- 4. Proof and promise in the "From our studio" block ----
    var studio = document.getElementById('from-our-studio');
    if (studio && !studio.querySelector('.cosp')) {
      var grid = studio.querySelector('.product-grid');
      if (grid) {
        var p = el('p', 'cosp', '<i>★★★★★</i>5.0 on Etsy &middot; ' + QUOTE + '<br>' + PROMISE +
          (sale ? ' <a data-cos="studio-sale" href="' + u('/collections/christmas', 'journal') + '">30% off the Christmas collection until 1 December &rarr;</a>' : ''));
        grid.parentNode.insertBefore(p, grid);
      }
    }

    // ---- 5. Bottom bar on phones, once the reader has scrolled ----
    var KEY = 'co_shop_bar_closed';
    var closed = false;
    try { closed = sessionStorage.getItem(KEY) === '1'; } catch (e) {}
    if (!closed && !document.querySelector('.cosm') && path !== '/') {
      var m = el('div', 'cosm');
      m.innerHTML = '<div class="cosm__t">' +
          (sale ? '<strong>30% off Christmas</strong><span>Ends 1 December &middot; free delivery</span>'
                : '<strong>The Calm &amp; Oak shop</strong><span>Made to order &middot; free delivery</span>') +
        '</div><a class="cosm__b" data-cos="mobile-bar" href="' + u('/', 'mobile-bar') + '">' + (sale ? 'Shop the sale' : 'Visit the shop') + '</a>' +
        '<button class="cosm__x" type="button" aria-label="Close">&times;</button>';
      document.body.appendChild(m);
      m.querySelector('.cosm__x').addEventListener('click', function () {
        m.classList.remove('is-in');
        try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
        setTimeout(function () { m.remove(); }, 400);
      });
      var onScroll = function () {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        m.classList.toggle('is-in', y > 500);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
