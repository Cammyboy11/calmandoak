#!/usr/bin/env bash
# Batch AI-upscale all 30 flat masters and rewrite the 16x20 print-ready files.
# Skips slugs whose output is newer than the source (already upscaled).
PROJECT="C:/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
SRC="C:/Users/CameronHayes/Pictures/Mockups"
DST="C:/Users/CameronHayes/Pictures/Calm-Oak-Print-Masters"
TMP="C:/Users/CameronHayes/Pictures/Mockups/_upscale-tmp.png"
DONE_MARKER="$DST/.ai-upscaled"

SLUGS=(enso bent-reed crane mountain-mist bamboo cherry-branch koi mountain-stream tsuki single-stem eucalyptus olive pampas ginkgo wild-grass moon-cycle horizon-bird dusk layers moonrise shizuka wa ma two-woods warm-earth sage-stone balance chado linen-morning serene-dawn)

mkdir -p "$DST"
touch "$DONE_MARKER" 2>/dev/null || true

START=$(date +%s)
i=0
done_count=0
skip_count=0
for s in "${SLUGS[@]}"; do
  i=$((i+1))
  ts=$(date +%H:%M:%S)
  out="$DST/${s}_16x20_300dpi.jpg"

  # Skip if already AI-upscaled (output exists and is newer than the source flat master)
  if [ -f "$out" ] && [ -f "$SRC/flat-$s-master.jpg" ] && [ "$out" -nt "$SRC/flat-$s-master.jpg" ]; then
    # extra check: file must be larger than the pre-AI baseline (~5MB) to be sure it's a real upscale
    sz=$(stat -c %s "$out" 2>/dev/null || echo 0)
    if [ "$sz" -gt 4500000 ]; then
      echo "[$ts] ${i}/30 ⤳ SKIP $s (already upscaled, ${sz}b)"
      skip_count=$((skip_count+1))
      continue
    fi
  fi

  echo "[$ts] ${i}/30 START $s"
  cd "$PROJECT/_tools/realesrgan" || { echo "✗ cd failed"; continue; }
  rm -f "$TMP"
  ./realesrgan-ncnn-vulkan.exe -i "$SRC/flat-$s-master.jpg" -o "$TMP" -n realesrgan-x4plus-anime -s 4 -t 32 -f png >/dev/null 2>&1
  cd "$PROJECT"

  if [ ! -f "$TMP" ]; then
    echo "[$(date +%H:%M:%S)] ${i}/30 ✗ FAILED no output for $s"
    continue
  fi

  node -e "
    const sharp=require('sharp'); sharp.cache(false);
    (async()=>{ await sharp('$TMP',{limitInputPixels:false})
      .resize(4800,6000,{fit:'cover',position:'centre',kernel:'lanczos3'})
      .toColourspace('srgb').withMetadata({density:300})
      .jpeg({quality:95,chromaSubsampling:'4:4:4',mozjpeg:true})
      .toFile('$DST/${s}_16x20_300dpi.jpg'); })();
  "
  if [ -f "$out" ]; then
    rm -f "$TMP"
    done_count=$((done_count+1))
    elapsed=$(( $(date +%s) - START ))
    echo "[$(date +%H:%M:%S)] ${i}/30 ✓ $s   (done ${done_count}, skip ${skip_count}, elapsed ${elapsed}s)"
  else
    echo "[$(date +%H:%M:%S)] ${i}/30 ✗ FAILED downsample for $s"
  fi
done
echo "[$(date +%H:%M:%S)] ALL DONE: ${done_count} upscaled, ${skip_count} skipped (already done)."
