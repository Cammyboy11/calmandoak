# Social video playbook — leveling up beyond Pinterest

**Why:** Calm & Oak was running ~5 pins/day on Pinterest while **Instagram (@calmandoak) and TikTok
(@calmandoak) sat dormant** — two of the three biggest visual platforms, already connected to Blotato,
unused. Those platforms are video-first, and "slow living / calm aesthetic" ambient video is a
top-performing format in this niche. So the level-up = activate IG + TikTok with calm vertical video,
repurposed from assets we already own (near-zero marginal cost).

**Status (2026-06-30):** pilot live. 4 reels (serene-dawn, moon-cycle, single-stem, dusk) generated +
scheduled 1/day/platform to IG Reels + TikTok, Jul 1–4. Pipeline proven end-to-end.

## The pipeline (proven, repeatable)
1. **Generate** calm Ken Burns reels from print/room art:
   `node assets/video/make-reels.js <slug...>`  (or `--all`). Output → `_reels/<slug>.mp4` (gitignored).
   - 1080×1920, 8s, slow zoom on the art over a soft blurred bg. Free (uses bundled ffmpeg-static).
2. **Upload** each mp4 to Blotato: `blotato_create_presigned_upload_url` → HTTP `PUT --data-binary` the
   file to `presignedUrl` → keep the `publicUrl`.
3. **Schedule** with `blotato_create_post` (mediaUrls = [publicUrl]):
   - **Instagram** — accountId `53849`, platform `instagram`, `mediaType:"reel"`, `shareToFeed:true`.
     ⚠️ **Max 5 hashtags** or it errors. No clickable links in caption (drive to calmandoak.com by name).
   - **TikTok** — accountId `47113`, platform `tiktok`, `privacyLevel:"PUBLIC_TO_EVERYONE"`,
     `autoAddMusic:true`, `isYourBrand:true`, `isAiGenerated:false`, comments/duet/stitch enabled.
   - **Pinterest** (upgrade) — the same mp4 can post as a video pin (board "Wall Art" `1107111589588494865`),
     which Pinterest now boosts over static.

## Cadence (gentle ramp for new channels)
- IG + TikTok: **1 reel/day/platform** to start; scale once engagement data comes in. Stay on-brand voice
  (calm, declarative, no hype/exclamations). Reuse the print library; ~30 designs = weeks of runway.
- Keep Pinterest's existing ~5/day static cadence; add 1–2 video pins/week from the same reels.

## What to measure
Reach/saves/shares on IG + TikTok; profile visits → calmandoak.com sessions (UTM `utm_campaign=reels`);
which print drives the most traffic → make more in that style. Feed winners back into the next batch.

## To make this fully recurring (TODO)
Add a reels step to the weekly `calmoak-content-factory` task: generate 5–7 reels/week from the next
print slugs, upload, and schedule to IG + TikTok (and a couple of Pinterest video pins). Until then this
runs as a manual batch via the pipeline above.
