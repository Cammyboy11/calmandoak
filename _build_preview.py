# Builds home-preview/index.html from index.html with a redesigned video hero + quick-nav tiles + socials.
import re, os

base = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(base,'index.html'), encoding='utf-8').read()

CSS = """
<style>
/* ===== Redesigned video hero + quick nav (preview) ===== */
.vhero{position:relative;min-height:84vh;display:flex;align-items:center;overflow:hidden;background:#2A2A28;}
.vhero__bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.vhero__scrim{position:absolute;inset:0;background:linear-gradient(90deg,rgba(22,19,16,.66),rgba(22,19,16,.34) 52%,rgba(22,19,16,.14));}
.vhero__inner{position:relative;color:#F7F4EE;padding-block:clamp(3rem,9vh,6.5rem);max-width:640px;}
.vhero__eyebrow{font-family:'Inter',sans-serif;font-size:.72rem;letter-spacing:.34em;text-transform:uppercase;color:#E9CDBF;}
.vhero__title{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(2.7rem,6.2vw,4.8rem);line-height:1.01;margin:.5rem 0 0;color:#fff;}
.vhero__title .ital{font-style:italic;color:#E9CDBF;}
.vhero__lede{font-family:'Cormorant Garamond',serif;font-size:clamp(1.15rem,2.3vw,1.55rem);max-width:38ch;margin:1.1rem 0 1.7rem;color:rgba(247,244,238,.92);line-height:1.5;}
.vhero__note{font-family:'Inter',sans-serif;font-size:.78rem;color:rgba(247,244,238,.7);margin-top:1.1rem;}
.vhero__socials{display:flex;gap:.7rem;margin-top:1.7rem;}
.vhero__socials a{width:42px;height:42px;display:grid;place-items:center;border:1px solid rgba(247,244,238,.45);border-radius:50%;color:#F7F4EE;transition:.22s ease;}
.vhero__socials a:hover{background:#F7F4EE;color:#2A2A28;transform:translateY(-2px);}
.vhero__socials svg{width:19px;height:19px;fill:currentColor;}
/* quick-nav tiles */
.vtiles{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:rgba(42,42,40,.09);border-bottom:1px solid rgba(42,42,40,.08);}
.vtile{background:var(--offwhite,#F7F4EE);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.55rem;padding:1.6rem 1rem;text-decoration:none;color:var(--charcoal,#2A2A28);transition:.2s ease;text-align:center;}
.vtile:hover{background:var(--cream,#EFE8DA);}
.vtile svg{width:27px;height:27px;stroke:var(--terracotta,#C97B5C);stroke-width:1.4;fill:none;stroke-linecap:round;stroke-linejoin:round;}
.vtile span{font-family:'Inter',sans-serif;font-size:.83rem;letter-spacing:.05em;font-weight:500;}
@media(max-width:820px){.vtiles{grid-template-columns:repeat(3,1fr);} .vhero{min-height:74vh;}}
@media(max-width:480px){.vtiles{grid-template-columns:repeat(2,1fr);}}
@media(prefers-reduced-motion:reduce){.vhero__bg{display:none;}.vhero{background:#2A2A28 url('/assets/img/journal-covers/gen/home-hero-living-room.jpg?v=1') center/cover;}}
</style>
</head>"""

# Icons
ic_bag='<svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>'
ic_journal='<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h9v16H6a2 2 0 0 0-2 2V5z"/><path d="M15 3h3a1 1 0 0 1 1 1v15a2 2 0 0 0-2-2h-2"/></svg>'
ic_mag='<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="16" rx="1"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>'
ic_cart='<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/><path d="M3 4h2l2.2 11h10L19 7H6"/></svg>'
ic_print='<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="1"/><circle cx="9" cy="10" r="1.6"/><path d="M5 18l4-4 3 3 3-3 4 4"/></svg>'

so_pin='<svg viewBox="0 0 24 24"><path d="M12 2C6.9 2 4 5.4 4 8.9c0 1.9 1 3.6 2.6 4.2.3.1.5 0 .5-.2 0-.1.1-.5.2-.9.1-.2 0-.3-.1-.5-.5-.6-.8-1.3-.8-2.3 0-2.9 2.2-5.5 5.7-5.5 3.1 0 4.8 1.9 4.8 4.4 0 3.3-1.5 6.1-3.6 6.1-1.2 0-2-1-1.8-2.2.3-1.4 1-3 1-4 0-.9-.5-1.7-1.5-1.7-1.2 0-2.1 1.2-2.1 2.9 0 1.1.4 1.8.4 1.8s-1.3 5.4-1.5 6.3c-.3 1.2-.1 2.7 0 3 .1.2.3.2.4.1.1-.1 1.6-2 2.1-3.8.1-.5.7-2.9.7-2.9.4.7 1.4 1.3 2.5 1.3 3.4 0 5.7-3.1 5.7-7.2C21 5.1 17.9 2 12 2z"/></svg>'
so_ig='<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7 .1 5.7.1 4.9.3 4.1.6c-.8.3-1.4.7-2.1 1.4C1.3 2.7.9 3.3.6 4.1.3 4.9.1 5.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c0 1.3.2 2.1.5 2.9.3.8.7 1.4 1.4 2.1.7.7 1.3 1.1 2.1 1.4.8.3 1.6.5 2.9.5 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3 0 2.1-.2 2.9-.5.8-.3 1.4-.7 2.1-1.4.7-.7 1.1-1.3 1.4-2.1.3-.8.5-1.6.5-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c0-1.3-.2-2.1-.5-2.9-.3-.8-.7-1.4-1.4-2.1-.7-.7-1.3-1.1-2.1-1.4-.8-.3-1.6-.5-2.9-.5C15.7 0 15.3 0 12 0z"/><path d="M12 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/><circle cx="18.4" cy="5.6" r="1.44"/></svg>'
so_tt='<svg viewBox="0 0 24 24"><path d="M16.5 2c.3 2.1 1.5 3.7 3.5 4v2.8c-1.2 0-2.4-.3-3.5-.9v6c0 3.4-2.7 6.1-6.1 6.1S4.3 17.3 4.3 13.9 7 7.8 10.4 7.8c.3 0 .6 0 .9.1v2.9c-.3-.1-.6-.1-.9-.1a3.2 3.2 0 1 0 3.2 3.2V2h2.9z"/></svg>'

HERO = f"""  <!-- ============ HERO (redesigned video) ============ -->
  <section class="vhero">
    <video class="vhero__bg" autoplay muted loop playsinline preload="metadata" poster="/assets/img/journal-covers/gen/home-hero-living-room.jpg?v=1" aria-hidden="true">
      <source src="/assets/video/japandi-hero.mp4" type="video/mp4" />
    </video>
    <div class="vhero__scrim"></div>
    <div class="wrap vhero__inner reveal">
      <span class="vhero__eyebrow">Japandi &middot; Slow Home</span>
      <h1 class="vhero__title">Warm, intentional <span class="ital">homes.</span></h1>
      <p class="vhero__lede">Scandinavian warmth, Japanese restraint &mdash; every piece shoppable, nothing that dates. Start with our free guide.</p>
      <div><a href="#starter-guide" class="btn btn--primary">Get the free Japandi Starter Guide <span class="arrow">&rarr;</span></a></div>
      <p class="vhero__note">Free 20-page PDF &middot; one calm email a fortnight &middot; unsubscribe anytime.</p>
      <div class="vhero__socials" aria-label="Follow Calm &amp; Oak">
        <a href="https://www.pinterest.com/calmandoak/" target="_blank" rel="noopener" aria-label="Pinterest">{so_pin}</a>
        <a href="https://www.instagram.com/calmandoak/" target="_blank" rel="noopener" aria-label="Instagram">{so_ig}</a>
        <a href="https://www.tiktok.com/@calmandoak" target="_blank" rel="noopener" aria-label="TikTok">{so_tt}</a>
      </div>
    </div>
  </section>

  <!-- quick-nav tiles: where do I go? -->
  <nav class="vtiles" aria-label="Explore Calm & Oak">
    <a class="vtile" href="/shop/looks/">{ic_bag}<span>Shop the Look</span></a>
    <a class="vtile" href="/journal/">{ic_journal}<span>Journal</span></a>
    <a class="vtile" href="/the-edit/">{ic_mag}<span>Magazine</span></a>
    <a class="vtile" href="/shop/">{ic_cart}<span>Amazon Picks</span></a>
    <a class="vtile" href="/shop/prints/">{ic_print}<span>Prints</span></a>
  </nav>
"""

# inject CSS before </head>
out = src.replace('</head>', CSS, 1)
# replace old hero section
start = out.find('<section class="hero">')
assert start != -1, 'hero section not found'
# find the enclosing comment start (optional) and the closing </section>
end = out.find('</section>', start) + len('</section>')
# also swallow a preceding HERO comment line if present
comment = '  <!-- ============ HERO ============ -->\n'
pre = out.rfind(comment, 0, start)
seg_start = pre if (pre!=-1 and start-pre<80) else start
out = out[:seg_start] + HERO + out[end:]

open(os.path.join(base,'home-preview','index.html'),'w',encoding='utf-8').write(out)
print('preview written; hero replaced; tiles+socials added')
