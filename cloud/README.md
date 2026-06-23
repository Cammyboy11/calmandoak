# Calm & Oak — Cloud Agents (true 24/7)

Runs the marketing agent fleet on **GitHub's servers** on a cron schedule, so it works
even when your computer is off. This is item #7 of the operation upgrades.

## What runs where
- **Cloud (this):** the agents that need a machine — `daily-digest`, `seo-ranker` (writes + deploys the site), `geo-tracker`, `outreach`, `email`, `content-factory` (content generation), `monthly-audit`, `marketing-director`.
- **Already 24/7 without this:** *social posting* — once the factory queues posts into **Blotato**, Blotato publishes them from its own cloud regardless of this runner. So the cloud runner mainly carries the site/content/SEO/outreach/email side.

## How it works
`.github/workflows/calmoak-cloud.yml` fires on cron (UTC), maps the schedule to an agent,
and runs `cloud/run-agent.sh`, which calls the **headless `claude` CLI** with that agent's
definition (`cloud/agents/*.md`) as the system prompt. Every run reads `CONTROL.md` first —
**the `PAUSE: true` kill switch works in the cloud too.**

## Activation (one-time)
1. **Make the repo's Actions usable** — push this to `main` (GitHub auto-detects the workflow). If the repo is **public**, consider making it private first (it contains your strategy docs + agent defs).
2. **Add repo secrets** (Settings → Secrets and variables → Actions):
   - `ANTHROPIC_API_KEY` — **required** (console.anthropic.com). Without it every run safely no-ops.
   - `BLOTATO_API_KEY` — only if you want the cloud to schedule social (see Blotato note below).
   - `MAILERLITE_API_KEY`, `AWIN_PUBLISHER_ID` — for email + Awin once those are wired.
3. **Test before trusting cron:** Actions tab → "Calm & Oak — Cloud Agents" → **Run workflow** → pick `calmoak-daily-digest` (read-only, safest) → confirm it runs clean. Then try `calmoak-geo-tracker`. Only then rely on the schedule.

## ⚠️ Honest status — this is a scaffold, not yet verified
I could not run GitHub Actions from here, so **this needs your `ANTHROPIC_API_KEY` + one test run** to confirm. Specifically verify on first run:
- **CLI flags** — confirm against `claude --help`; flags (`--dangerously-skip-permissions`, `--append-system-prompt`, `--mcp-config`, `--output-format`) evolve between versions. Adjust `cloud/run-agent.sh` if any changed.
- **Install step** — `npm install -g @anthropic-ai/claude-code` should work on `ubuntu-latest`; swap to the official installer if the package name differs.
- **Blotato connector** — `cloud/mcp.json` ships **empty**. To let the cloud schedule social you must add Blotato's MCP endpoint there (its `url` + a `Authorization: Bearer ${BLOTATO_API_KEY}` header), OR switch the social agents to call Blotato's REST API directly. I don't have Blotato's MCP URL, so this is left for you to fill. Until then, cloud social = off (and it doesn't need to be on — Blotato already publishes queued posts 24/7).
- **Cost** — each agent run spends Claude API tokens (your `ANTHROPIC_API_KEY`), separate from the desktop app. Watch the first week's usage and trim cadence if needed.

## Relationship to the desktop scheduled tasks
The Cowork scheduled tasks (in the app) and this cloud workflow do the **same jobs on the same cadence**. Run **one or the other**, not both, to avoid double-posting/committing. Recommended: keep the desktop tasks for now; switch to cloud once you've test-run it and want true computer-off operation. To switch, disable the desktop tasks (or set `CONTROL.md` for the desktop and let cloud run).
