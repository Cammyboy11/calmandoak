@echo off
cd /d "%~dp0"
set FORCE=1
node tools\gen-product-scenes.mjs tools\staging\sofa-only.json
pause
