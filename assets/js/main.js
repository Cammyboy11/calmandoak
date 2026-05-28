// Calm & Oak — minimal interactions
(function () {
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

      // Route by data-signup value: "prints" → print list; everything else → starter guide.
      const listKey = form.dataset.signup === 'prints' ? 'prints' : 'starter';
      const endpoint = ENDPOINTS[listKey];

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

  // ----- Year stamp -----
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
