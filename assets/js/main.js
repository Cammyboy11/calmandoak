// Calm & Oak — minimal interactions
(function () {
  // ----- Retire "Frames" from the top nav site-wide -----
  document.querySelectorAll('.nav-links a[href="/shop/frames/"], .nav-links a[href="/shop/frames"]').forEach((a) => {
    (a.closest('li') || a).remove();
  });

  // ----- Mobile nav toggle -----
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // ----- Reveal on scroll -----
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
  }

  // ----- Email capture -----
  // Wired to MailerLite classic embedded forms (account 2375797).
  // Two lists, routed by the data-signup attribute value on each <form>:
  //   • default (no value)  → "Calm & Oak — Starter Guide" group (PDF + welcome sequence)
  //   • data-signup="prints" → "Calm & Oak — Print Launch List" group (launch announcement)
  // Owner must activate each form + enable the linked automation in MailerLite before live sends.
  // See EMAIL-WELCOME-CHAIN.md (starter) and PHASE-D-LAUNCH-PLAN.md (prints).
  const ENDPOINTS = {
    starter: 'https://assets.mailerlite.com/jsonp/2375797/forms/188364767967053815/subscribe',
    prints:  'https://assets.mailerlite.com/jsonp/2375797/forms/188519737346491507/subscribe'
  };

  document.querySelectorAll('form[data-signup]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input.value.trim();
      const note = form.querySelector('.signup-note');
      const button = form.querySelector('button');
      if (!email) return;

      // Route by data-signup value: "prints" → print list; everything else → starter guide list.
      // The "palette" and "calculator" forms still join the starter list (and the welcome
      // sequence), but their success note hands over the palette cheat-sheet specifically —
      // the asset those pages actually promise.
      const signup = form.dataset.signup;
      const listKey = signup === 'prints' ? 'prints' : 'starter';
      const endpoint = ENDPOINTS[listKey];
      const wantsCheatSheet = signup === 'palette' || signup === 'calculator';

      // UI: lock the form
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }

      try {
        if (endpoint) {
          // no-cors fire-and-forget: response is opaque, but the request reaches MailerLite.
          // Failures (network down, endpoint misconfigured) surface as the catch branch.
          await fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'fields[email]=' + encodeURIComponent(email) + '&ml-submit=1&anticsrf=true'
          });
        }
        if (note) {
          if (listKey === 'prints') {
            note.innerHTML = 'You&rsquo;re on the list. We&rsquo;ll email you the moment the print shop opens &mdash; with a subscriber-only launch discount.';
          } else if (wantsCheatSheet) {
            note.innerHTML = 'Welcome. Your palette cheat-sheet is ready &mdash; <a href="/assets/palette-cheat-sheet/japandi-palette-cheat-sheet.html" target="_blank" rel="noopener" style="color:var(--terracotta);font-weight:500;border-bottom:1px solid var(--terracotta);">open it here</a> (Ctrl/Cmd&nbsp;+&nbsp;P to save as PDF). We&rsquo;ll also email it to you, with the full Starter Guide.';
          } else {
            note.innerHTML = 'Welcome. Your guide is ready &mdash; <a href="/assets/starter-guide/Japandi-Starter-Guide.pdf" download style="color:var(--terracotta);font-weight:500;border-bottom:1px solid var(--terracotta);">download the PDF here</a>. We&rsquo;ll also email it to you.';
          }
          note.style.color = "var(--charcoal)";
        }
        form.reset();
        if (button) button.textContent = 'Sent ✓';
        // Track signup conversion if analytics are present
        if (typeof window.plausible === 'function') window.plausible('Signup', { props: { list: listKey } });
        if (typeof window.gtag === 'function') window.gtag('event', 'signup', { method: 'email', list: listKey });
      } catch (err) {
        if (note) {
          note.textContent = "Something went wrong. Please try again, or email us directly.";
          note.style.color = "#c0392b";
        }
        if (button) { button.disabled = false; button.textContent = listKey === 'prints' ? 'Join the list' : 'Send the guide'; }
      }
    });
  });

  // ----- Affiliate-click tracking -----
  // Sends an event whenever someone clicks any product CTA. Fires before navigation
  // (no preventDefault — link still opens normally).
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.product-cta');
    if (!a) return;
    const productTitle = a.closest('.product')?.querySelector('.product-title')?.textContent?.trim() || a.href;
    if (typeof window.plausible === 'function') {
      window.plausible('Affiliate Click', { props: { product: productTitle } });
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_click', { product: productTitle, link_url: a.href });
    }
  });

  // ----- Journal category filter (Phase F) -----
  // Progressive enhancement: with JS off, every card stays visible.
  const filterBar = document.querySelector('.journal-filter');
  const grid = document.getElementById('journal-grid');
  if (filterBar && grid) {
    const chips = Array.from(filterBar.querySelectorAll('.chip'));
    const cards = Array.from(grid.querySelectorAll('.card'));
    const emptyMsg = document.querySelector('.journal-filter-empty');

    const apply = (filter) => {
      let shown = 0;
      cards.forEach((card) => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      chips.forEach((c) => {
        const active = c.getAttribute('data-filter') === filter;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      if (emptyMsg) emptyMsg.hidden = shown !== 0;
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const filter = chip.getAttribute('data-filter');
        apply(filter);
        const hash = filter === 'all' ? ' ' : '#' + filter;
        history.replaceState(null, '', hash);
      });
    });

    // Deep-link support: /journal/#room-guides pre-selects that category,
    // both on fresh load and on same-page hash navigation (footer/breadcrumb links).
    const applyFromHash = () => {
      const h = (location.hash || '').replace('#', '');
      if (h && chips.some((c) => c.getAttribute('data-filter') === h)) apply(h);
      else if (!h) apply('all');
    };
    applyFromHash();
    window.addEventListener('hashchange', applyFromHash);
  }

  // ----- Shop category type filter (Phase G Tier 2) -----
  document.querySelectorAll('.shop-filter').forEach((bar) => {
    const grid = bar.parentElement.querySelector('.product-grid');
    if (!grid) return;
    const chips = Array.from(bar.querySelectorAll('.chip'));
    const cards = Array.from(grid.querySelectorAll('.product'));
    const empty = bar.parentElement.querySelector('.shop-filter-empty');
    const apply = (f) => {
      let shown = 0;
      cards.forEach((c) => { const m = f === 'all' || c.getAttribute('data-cat') === f; c.classList.toggle('is-hidden', !m); if (m) shown++; });
      chips.forEach((c) => { const a = c.getAttribute('data-filter') === f; c.classList.toggle('is-active', a); c.setAttribute('aria-selected', a ? 'true' : 'false'); });
      if (empty) empty.hidden = shown !== 0;
    };
    chips.forEach((c) => c.addEventListener('click', () => apply(c.getAttribute('data-filter'))));
  });

  // ----- Year stamp -----
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---- Amazon room Idea List deep-links (Calm & Oak, added 2026-08) ---- */
(function () {
  var STOREFRONT_URL = 'https://www.amazon.com/shop/calmandoak';
  var LIST_BASE = 'https://www.amazon.com/shop/calmandoak/list/';
  var ROOM_LISTS = {
    office:   { id: '1ZRH5KN0IUVFY', label: 'home office' },
    bedroom:  { id: '2QNFB861X8Y6T', label: 'bedroom' },
    dining:   { id: '25BKRYU1SFKDV', label: 'dining table' },
    living:   { id: '1XG2XCLNPEM51', label: 'living room' },
    entryway: { id: '1RR1LNCW2G32F', label: 'entryway' },
    kitchen:  { id: '3VH3UVNQCJEZK', label: 'kitchen' },
    bathroom: { id: '3VM7YK73QZ5US', label: 'bathroom' }
  };
  var PAGE_ROOM = {
    '/journal/japandi-home-office': 'office',
    '/journal/400-dollar-home-office': 'office',
    '/journal/japandi-desk': 'office',
    '/journal/best-japandi-desks': 'office',
    '/journal/best-japandi-desk-accessories': 'office',
    '/journal/best-japandi-office-chairs': 'office',
    '/journal/japandi-bedroom': 'bedroom',
    '/journal/budget-japandi-bedroom': 'bedroom',
    '/journal/400-dollar-small-bedroom': 'bedroom',
    '/journal/best-japandi-bed-frames': 'bedroom',
    '/journal/best-japandi-nightstands': 'bedroom',
    '/journal/nightstand-styling': 'bedroom',
    '/journal/250-dollar-bedside-refresh': 'bedroom',
    '/journal/best-linen-bedding': 'bedroom',
    '/journal/300-dollar-closet-capsule': 'bedroom',
    '/journal/quiet-wardrobe': 'bedroom',
    '/journal/japandi-dining-room': 'dining',
    '/journal/500-dollar-dining-table-set': 'dining',
    '/journal/japandi-living-room': 'living',
    '/journal/300-dollar-living-room-textile-refresh': 'living',
    '/journal/sofa-buying-guide': 'living',
    '/journal/best-japandi-sofa-coffee-table': 'living',
    '/journal/400-dollar-reading-nook': 'living',
    '/journal/japandi-entryway': 'entryway',
    '/journal/200-dollar-entryway-organizer': 'entryway',
    '/journal/300-dollar-entryway': 'entryway',
    '/journal/sunday-morning-kitchen': 'kitchen',
    '/journal/why-your-kitchen-needs-a-tray': 'kitchen',
    '/journal/japandi-bathroom': 'bathroom',
    '/journal/250-dollar-bathroom': 'bathroom',
    '/shop/looks/the-japandi-workspace': 'office',
    '/shop/looks/quiet-japandi-bedroom': 'bedroom',
    '/shop/looks/the-sage-bedroom': 'bedroom',
    '/shop/looks/the-calm-nightstand': 'bedroom',
    '/shop/looks/the-evening-dining-table': 'dining',
    '/shop/looks/quiet-living-room': 'living',
    '/shop/looks/the-layered-living-room': 'living',
    '/shop/looks/soft-lit-reading-nook': 'living',
    '/shop/looks/the-lit-entryway': 'entryway',
    '/shop/looks/the-sunday-kitchen': 'kitchen',
    '/shop/looks/the-spa-bathroom': 'bathroom',
    '/shop/office': 'office',
    '/shop/bedroom': 'bedroom',
    '/shop/dining': 'dining',
    '/shop/ceramics-tableware': 'dining',
    '/shop/japandi-kitchen': 'kitchen',
    '/shop/living-room': 'living'
  };
  var p = location.pathname.replace(/\/+$/, '');
  if (p === '') p = '/';
  var isArticle = /^\/journal\/.+/.test(p);
  var isLook = /^\/shop\/looks\/.+/.test(p);
  var roomKey = PAGE_ROOM[p] || null;
  var isRoomShop = !!roomKey && /^\/shop\//.test(p) && !isLook;
  if (!isArticle && !isLook && !isRoomShop) return;
  var footer = document.querySelector('.site-footer');
  if (!footer || document.querySelector('.amz-storefront-band')) return;
  var room = roomKey ? ROOM_LISTS[roomKey] : null;
  var href = room ? (LIST_BASE + room.id + '?tag=calmandoak-20') : STOREFRONT_URL;
  var heading = room ? ('Shop this ' + room.label + ' on Amazon') : 'Prefer to shop on Amazon?';
  var body = room
    ? ('Every piece in this ' + room.label + ' &mdash; hand-picked for quiet materials and natural texture &mdash; gathered in one Amazon list.')
    : 'Browse the pieces we love in our Amazon storefront &mdash; hand-picked for quiet materials and natural texture, organised room by room.';
  var cta = room ? ('Shop the ' + room.label + ' &rarr;') : 'Visit our Amazon storefront &rarr;';
  var sec = document.createElement('section');
  sec.className = 'amz-storefront-band';
  sec.setAttribute('aria-label', 'Shop on Amazon');
  sec.style.cssText = 'background:var(--cream,#EFE8DA);border-top:1px solid rgba(42,42,40,.08);';
  sec.innerHTML =
    '<div style="max-width:720px;margin:0 auto;padding:2.6rem 1.2rem;text-align:center;">'
    + '<p style="font-family:var(--serif,\'Cormorant Garamond\',Georgia,serif);font-size:1.55rem;color:var(--charcoal,#2A2A28);margin:0 0 .5rem;">' + heading + '</p>'
    + '<p style="color:var(--charcoal,#2A2A28);opacity:.82;margin:0 0 1.3rem;line-height:1.65;">' + body + '</p>'
    + '<a href="' + href + '" target="_blank" rel="noopener nofollow sponsored" style="display:inline-block;padding:.8rem 1.7rem;border:1px solid var(--charcoal,#2A2A28);border-radius:2px;color:var(--charcoal,#2A2A28);text-decoration:none;letter-spacing:.05em;font-size:.8rem;text-transform:uppercase;">' + cta + '</a>'
    + '</div>';
  footer.parentNode.insertBefore(sec, footer);
})();
