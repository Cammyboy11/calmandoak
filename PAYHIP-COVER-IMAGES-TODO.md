# Payhip cover-image fix — checklist

**Problem:** all ~30 print products on Payhip are missing their cover image (Payhip shows its grey
"media-not-provided" placeholder). The digital ZIP was uploaded at creation, but the **product cover
image** was never added — Payhip needs that uploaded separately.

**Why fix now:** the scheduled Pinterest prints pins send buyers from the site to these Payhip pages to
check out. A blank product page kills conversion right at the buy step.

**The fix (per product, ~30 sec each):**
1. Go to Payhip dashboard → **Products** → click the product → **Edit**.
2. Under the product image / cover, upload the matching file from `assets\img\prints\<slug>.jpg`
   (each is also live at the public URL below if you'd rather pull it from the web).
3. Save.

> All cover images already exist — you're only uploading, not creating anything.

| ✓ | Product (slug) | Payhip page | Cover image to upload |
|---|---|---|---|
| ☐ | enso | https://payhip.com/b/qAzfj | assets/img/prints/enso.jpg |
| ☐ | bent-reed | https://payhip.com/b/O87Ce | assets/img/prints/bent-reed.jpg |
| ☐ | crane | https://payhip.com/b/4B5Ug | assets/img/prints/crane.jpg |
| ☐ | mountain-mist | https://payhip.com/b/dIHs3 | assets/img/prints/mountain-mist.jpg |
| ☐ | bamboo | https://payhip.com/b/UjvwL | assets/img/prints/bamboo.jpg |
| ☐ | cherry-branch | https://payhip.com/b/I4vLy | assets/img/prints/cherry-branch.jpg |
| ☐ | koi | https://payhip.com/b/yqWc3 | assets/img/prints/koi.jpg |
| ☐ | mountain-stream | https://payhip.com/b/2UIkJ | assets/img/prints/mountain-stream.jpg |
| ☐ | tsuki | https://payhip.com/b/BhtYV | assets/img/prints/tsuki.jpg |
| ☐ | single-stem | https://payhip.com/b/cCoS9 | assets/img/prints/single-stem.jpg |
| ☐ | eucalyptus | https://payhip.com/b/Ofoc3 | assets/img/prints/eucalyptus.jpg |
| ☐ | olive | https://payhip.com/b/tBfoe | assets/img/prints/olive.jpg |
| ☐ | pampas | https://payhip.com/b/G8jBR | assets/img/prints/pampas.jpg |
| ☐ | ginkgo | https://payhip.com/b/wp4uY | assets/img/prints/ginkgo.jpg |
| ☐ | wild-grass | https://payhip.com/b/oi0Oe | assets/img/prints/wild-grass.jpg |
| ☐ | serene-dawn | https://payhip.com/b/20uTp | assets/img/prints/serene-dawn.jpg |
| ☐ | moon-cycle | https://payhip.com/b/4djzP | assets/img/prints/moon-cycle.jpg |
| ☐ | horizon-bird | https://payhip.com/b/ZhxjF | assets/img/prints/horizon-bird.jpg |
| ☐ | dusk | https://payhip.com/b/ia92h | assets/img/prints/dusk.jpg |
| ☐ | layers | https://payhip.com/b/vdx6q | assets/img/prints/layers.jpg |
| ☐ | moonrise | https://payhip.com/b/5Lme6 | assets/img/prints/moonrise.jpg |
| ☐ | shizuka | https://payhip.com/b/gsoTK | assets/img/prints/shizuka.jpg |
| ☐ | wa | https://payhip.com/b/pCZwK | assets/img/prints/wa.jpg |
| ☐ | ma | https://payhip.com/b/Nzq6E | assets/img/prints/ma.jpg |
| ☐ | two-woods | https://payhip.com/b/jiARd | assets/img/prints/two-woods.jpg |
| ☐ | warm-earth | https://payhip.com/b/qvVYE | assets/img/prints/warm-earth.jpg |
| ☐ | sage-stone | https://payhip.com/b/Bw5KT | assets/img/prints/sage-stone.jpg |
| ☐ | balance | https://payhip.com/b/CFme8 | assets/img/prints/balance.jpg |
| ☐ | chado | https://payhip.com/b/bkyPh | assets/img/prints/chado.jpg |
| ☐ | linen-morning | https://payhip.com/b/UTslO | assets/img/prints/linen-morning.jpg |

**Priority order (these have pins going out first, Jun 25–29):** enso, eucalyptus, serene-dawn, bamboo,
ginkgo, moon-cycle, single-stem, crane, olive, mountain-mist, moonrise, shizuka, koi, dusk, two-woods.
Do these 15 first; the rest can follow.

**Automation note:** Payhip's public API is mainly license-key verification — it has no reliable
product-image upload endpoint, so this can't be scripted from outside the dashboard. If that ever changes
(or you add the cover image as part of a product re-import), it could be batched.
