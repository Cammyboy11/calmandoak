/* Calm & Oak — "Two Seats to Quiet" site-wide pop-up (calmandoak.com) */
(function () {
  'use strict';
  var KEY = 'co_seats_popup_v1';
  var SHOP = 'https://shop.calmandoak.com/?utm_source=calmandoak&utm_medium=popup&utm_campaign=two-seats';
  var INFO = 'https://shop.calmandoak.com/pages/two-seats-to-quiet?utm_source=calmandoak&utm_medium=popup&utm_campaign=two-seats';
  var path = location.pathname;
  if (/^\/(privacy|disclosures|contact|ops|go)\//.test(path)) return;
  try { var seen = localStorage.getItem(KEY); if (seen && Date.now() - Number(seen) < 7 * 864e5) return; } catch (e) {}

  var css = '' +
    '.co-seats{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(28,26,23,.55);backdrop-filter:blur(3px);opacity:0;transition:opacity .35s ease}' +
    '.co-seats.is-in{opacity:1}' +
    '.co-seats__card{position:relative;width:min(560px,100%);background:#F4F1EA;color:#1C1A17;border-radius:4px;box-shadow:0 30px 70px -30px rgba(0,0,0,.6);overflow:hidden;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;transform:translateY(16px);transition:transform .45s cubic-bezier(.2,.7,.2,1)}' +
    '.co-seats.is-in .co-seats__card{transform:none}' +
    '.co-seats__band{height:6px;background:linear-gradient(90deg,#B4623F,#C97B5C 50%,#7C8F76)}' +
    '.co-seats__in{padding:34px 36px 30px}' +
    '.co-seats__eyebrow{font-size:.68rem;letter-spacing:.3em;text-transform:uppercase;color:#B4623F;font-weight:600;margin:0 0 14px}' +
    '.co-seats__h{font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;font-size:clamp(1.9rem,4.6vw,2.6rem);line-height:1.05;margin:0 0 16px;letter-spacing:-.01em}' +
    '.co-seats__h em{font-style:italic;color:#B4623F}' +
    '.co-seats__p{font-size:1rem;line-height:1.6;color:#3f3a33;margin:0 0 22px}' +
    '.co-seats__p strong{color:#1C1A17;font-weight:600}' +
    '.co-seats__cta{display:flex;gap:14px;align-items:center;flex-wrap:wrap}' +
    '.co-seats__btn{display:inline-flex;align-items:center;gap:.6em;background:#B4623F;color:#FBF8F2;text-decoration:none;font-weight:600;font-size:.92rem;padding:.85em 1.4em;border-radius:2px;transition:background .25s,transform .25s}' +
    '.co-seats__btn:hover{background:#984E30;transform:translateY(-2px)}' +
    '.co-seats__link{font-size:.9rem;color:#1C1A17;text-decoration:none;border-bottom:1px solid rgba(28,26,23,.35);padding-bottom:1px}' +
    '.co-seats__fine{font-size:.72rem;color:#7a7368;margin:20px 0 0;line-height:1.5}' +
    '.co-seats__fine a{color:inherit}' +
    '.co-seats__x{position:absolute;top:10px;right:10px;width:38px;height:38px;border:0;background:transparent;color:#6A6459;font-size:26px;line-height:1;cursor:pointer;border-radius:50%}' +
    '.co-seats__x:hover{background:rgba(28,26,23,.06);color:#1C1A17}' +
    '.co-seats__enso{position:absolute;right:-30px;bottom:-40px;width:190px;height:190px;opacity:.12;pointer-events:none}' +
    '@media(max-width:520px){.co-seats__in{padding:28px 22px 24px}.co-seats__enso{width:140px;height:140px}}';

  function show() {
    if (document.querySelector('.co-seats')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var w = document.createElement('div'); w.className = 'co-seats'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true'); w.setAttribute('aria-labelledby', 'co-seats-h');
    w.innerHTML =
      '<div class="co-seats__card">' +
        '<div class="co-seats__band"></div>' +
        '<button class="co-seats__x" type="button" aria-label="Close">&times;</button>' +
        '<svg class="co-seats__enso" viewBox="0 0 100 100" aria-hidden="true"><path d="M78 30c-9-10-25-13-38-6C25 32 20 50 27 64c7 13 24 18 38 11 10-5 16-15 16-26" fill="none" stroke="#1C1A17" stroke-width="7" stroke-linecap="round"/></svg>' +
        '<div class="co-seats__in">' +
          '<p class="co-seats__eyebrow">Two Seats to Quiet</p>' +
          '<h2 class="co-seats__h" id="co-seats-h">Win two flights to <em>Copenhagen</em> or <em>Tokyo</em>.</h2>' +
          '<p class="co-seats__p"><strong>Every Calm &amp; Oak order over $50 enters you automatically.</strong> Buy anything from our own collection at shop.calmandoak.com &mdash; bedding, table linens, rugs, kitchen, prints &mdash; and you are in the draw for two return flights to the city of your choice. No forms, no codes.</p>' +
          '<div class="co-seats__cta">' +
            '<a class="co-seats__btn" href="' + SHOP + '">Shop &amp; enter <span aria-hidden="true">&rarr;</span></a>' +
            '<a class="co-seats__link" href="' + INFO + '">How it works</a>' +
          '</div>' +
          '<p class="co-seats__fine">18+. Two return economy flights for two, up to CAD 5,000. No purchase necessary &mdash; free entry on the promotion page. Draw within 14 days of the 10,000th seat. <a href="https://shop.calmandoak.com/pages/two-seats-to-quiet-terms">Full terms</a>.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(w);
    requestAnimationFrame(function () { requestAnimationFrame(function () { w.classList.add('is-in'); }); });
    function close() { w.classList.remove('is-in'); setTimeout(function () { w.remove(); }, 350); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    w.querySelector('.co-seats__x').addEventListener('click', close);
    w.addEventListener('click', function (e) { if (e.target === w) close(); });
    document.addEventListener('keydown', onKey);
    try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
    if (window.gtag) { try { gtag('event', 'seats_popup_view', { event_category: 'promo' }); } catch (e) {} }
  }

  var shown = false;
  function once() { if (!shown) { shown = true; show(); } }
  setTimeout(once, 6000);
  document.addEventListener('mouseout', function (e) { if (!e.relatedTarget && e.clientY <= 0) once(); });
  var sc = false;
  window.addEventListener('scroll', function () { if (!sc && window.scrollY > document.body.scrollHeight * 0.4) { sc = true; once(); } }, { passive: true });
})();
