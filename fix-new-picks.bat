@echo off
REM Calm & Oak - recover the 12 product photos Amazon bot-blocked, then render
REM the remaining product-exact scenes. Downloads come from the image CDN
REM (not bot-protected). The scene step skips the 4 already generated.

cd /d "%~dp0"

echo.
echo ============================================================
echo  STEP 1 of 2  -  Downloading remaining product photos (image CDN)
echo ============================================================
node tools\fetch-new-picks-urls.mjs

echo.
echo ============================================================
echo  STEP 2 of 2  -  Rendering the remaining product-exact scenes
echo ============================================================
node tools\gen-product-scenes.mjs

echo.
echo Done. Tell Claude "new picks images are ready" - it will optimise,
echo wire the cards + scenes into the shop, deploy, and queue Pinterest pins.
echo.
pause
