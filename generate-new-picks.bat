@echo off
REM Calm & Oak - fetch real photos + render PRODUCT-EXACT Japandi scenes for the
REM 16 new shop picks (furniture, ceramics, office, decor). Run on your machine
REM (double-click) - the cloud sandbox can't reach Amazon or Google.

cd /d "%~dp0"

echo.
echo ============================================================
echo  STEP 1 of 2  -  Downloading REAL product photos (no key needed)
echo ============================================================
node tools\fetch-new-picks.mjs

echo.
echo ============================================================
echo  STEP 2 of 2  -  Rendering product-exact Japandi scenes (needs GEMINI_API_KEY)
echo ============================================================
node tools\gen-product-scenes.mjs

echo.
echo Done. Tell Claude "new picks images are ready" and it will optimise them,
echo wire the product cards + scenes into the 4 shop sections, deploy, and
echo queue the Pinterest product pins.
echo.
pause
