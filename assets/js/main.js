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
  // To wire this up, set ENDPOINT to one of:
  //   • Formspree:  https://formspree.io/f/YOUR_FORM_ID
  //   • Buttondown: https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME
  //   • ConvertKit: https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe
  //   • MailerLite: https://assets.mailerlite.com/jsonp/.../forms/.../subscribe
  // While ENDPOINT is null, the form shows a friendly success message but does NOT send the email anywhere.
  const ENDPOINT = null;

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
          const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
          if (!res.ok) throw new Error('Subscribe failed');
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
