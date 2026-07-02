@echo off
REM Calm & Oak - cross-shop refresh batch 2: fetch real product photos (image CDN)
REM then render product-exact Japandi scenes. Run on your machine (double-click).

cd /d "%~dp0"

echo.
echo ============================================================
echo  STEP 1 of 2  -  Downloading product photos (image CDN)
echo ============================================================
node tools\fetch-new-picks-urls.mjs tools\staging\new-picks2-imgurls.txt

echo.
echo ============================================================
echo  STEP 2 of 2  -  Rendering product-exact Japandi scenes
echo ============================================================
node tools\gen-product-scenes.mjs tools\staging\new-picks2-visuals.json

echo.
echo Done. Tell Claude "batch 2 images ready" - it will wire the cards,
echo update the filter totals, deploy, and queue the Pinterest pins.
echo.
pause
