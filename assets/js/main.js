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
  // Wired to MailerLite classic embedded form (account 2375797, form 188364767967053815).
  // Owner must activate the form + enable the "Calm & Oak — Welcome Sequence" automation
  // in the MailerLite dashboard before submissions trigger live emails. See EMAIL-WELCOME-CHAIN.md.
  // The classic JSONP endpoint accepts cross-origin POST with form-urlencoded body in no-cors mode.
  const ENDPOINT = 'https://assets.mailerlite.com/jsonp/2375797/forms/188364767967053815/subscribe';

  document.querySelectorAll('form[data-signup]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input.value.trim();
      const note = form.querySelector('.signup-note');
      const button = form.querySelector('button');
      if (!email) return;

      // UI: lock the form
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }

      try {
        if (ENDPOINT) {
          // no-cors fire-and-forget: response is opaque, but the request reaches MailerLite.
          // Failures (network down, endpoint misconfigured) surface as the catch branch.
          await fetch(ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'fields[email]=' + encodeURIComponent(email) + '&ml-submit=1&anticsrf=true'
          });
        }
        if (note) {
          note.innerHTML = 'Welcome. Your guide is ready &mdash; <a href="/assets/starter-guide/Japandi-Starter-Guide.pdf" download style="color:var(--terracotta);font-weight:500;border-bottom:1px solid var(--terracotta);">download the PDF here</a>. We&rsquo;ll also email it to you.';
          note.style.color = "var(--charcoal)";
        }
        form.reset();
        if (button) button.textContent = 'Sent ✓';
        // Track signup conversion if analytics are present
        if (typeof window.plausible === 'function') window.plausible('Signup');
        if (typeof window.gtag === 'function') window.gtag('event', 'signup', { method: 'email' });
      } catch (err) {
        if (note) {
          note.textContent = "Something went wrong. Please try again, or email us directly.";
          note.style.color = "#c0392b";
        }
        if (button) { button.disabled = false; button.textContent = 'Send the guide'; }
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

  // ----- Year stamp -----
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
