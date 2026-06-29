@echo off
REM Calm & Oak — fetch real product photos + generate editorial scene images.
REM Run this from your machine (double-click). The cloud sandbox can't reach
REM Amazon or Google, so image fetching/generation has to happen here.

cd /d "%~dp0"

echo.
echo ============================================================
echo  STEP 1 of 2  -  Downloading real product photos (no key needed)
echo ============================================================
node tools\fetch-product-images.mjs

echo.
echo ============================================================
echo  STEP 2 of 2  -  Generating editorial scene images (needs GEMINI_API_KEY)
echo ============================================================
node tools\gen-visuals.mjs

echo.
echo Done. Tell Claude it's finished and it will wire the images in and deploy.
echo.
pause
