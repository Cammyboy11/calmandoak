# Image Briefs — "The Japandi Desk" article

House style (matches `01-brand-assets/IMAGE-BRIEFS.md`): photographic, **not** AI-glossy. Palette off-white `#F7F4EE` / cream `#EFE8DA` / warm oak / soft graphite, one terracotta-or-sage accent at most. Soft morning/afternoon window light from the left, never harsh midday. Three-to-five objects max, no people, no faces, no text overlay. Cover format **848×1053 (4:5 portrait)** to match every other journal cover; section scenes **848×480 (landscape)**.

**Negative prompts (use on every image):** no warped geometry, no garbled calligraphy/text, no extra legs or castors, no oversaturation, no AI-glossy plastic look, no people, no faces, no visible cables, no clutter.

When billing is on, run these through the Gemini / "Nano Banana" pipeline, then save to the paths below and bump the article's `?v=` cache-buster.

---

## 1. Cover (PRIORITY) → `assets/img/journal-covers/japandi-desk-cover.jpg`

**848×1053, 4:5 portrait.** A calm Japandi home-desk scene, three-quarter angle, eye-level-ish.

> A solid honey-oak writing desk with slim tapered legs against an off-white plaster wall, the oak floor visible beneath it. On the cleared surface: a closed laptop or a leather notebook with a pen, a single ceramic mug, and a brass articulating task lamp glowing warm at left. A small matte-charcoal planter with a trailing pothos at the desk's edge. A slim oak floating shelf above holds one framed sumi-e print and a single eucalyptus stem in a white bud vase. Soft morning light from the left, gentle shadows. Warm, quiet, residential — magazine-editorial, not a showroom.

Once saved, restore the cover references in `index.html` (currently pointed at the oak-desk hero): set `og:image`, `twitter:image`, and the Article schema `image` back to `.../journal-covers/japandi-desk-cover.jpg?v=1`, and swap the hero `<figure>` image to the cover.

---

## 2. Small-space corner desk (optional) → `assets/img/journal-covers/japandi-desk-small-space.jpg`

**848×480 landscape.** Replaces the reused console figure in the "Leg style & small-space footprint" section.

> A slim 36-inch oak writing desk floated against the corner of a small off-white room, open tapered legs with the floor clearly visible beneath — emphasising lightness. A single wall-mounted oak shelf above instead of a bookcase, holding two objects. Cleared surface, one small plant. Soft daylight. The room should feel intentionally compact, calm, not cramped.

---

## 3. The cleared / executive surface (optional) → `assets/img/journal-covers/japandi-desk-surface.jpg`

**848×480 landscape.** For the "How to style the surface" or "variants" section.

> Top-down or low three-quarter view of a wide solid-walnut desk surface: a walnut-and-leather desk pad defining the working zone, a laptop on a bamboo monitor stand, a notebook, and one stoneware vessel with a single dried stem. No visible cables. Generous empty wood around the objects — the negative space is the subject. Warm side light.

---

## Quick QA before publishing any of these
- Looks like a photograph, not a render (no plastic sheen, no warped grain).
- Palette stays off-white / oak / one muted accent. No bright colours.
- No people, no text, no visible cables, no clutter.
- Cover is true 4:5 (848×1053) so it matches the journal grid and Pinterest crops cleanly.
