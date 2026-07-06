@echo off
REM Calm & Oak — one-command production deploy (Cloudflare Workers static assets)
REM Usage: double-click, or run `deploy.cmd` from the repo root.
REM Bypasses the flaky Cloudflare git-triggered builds (stuck "Initializing" runner).
cd /d "%~dp0"
npx wrangler deploy --name calmandoak --assets . --compatibility-date 2026-01-01
pause
