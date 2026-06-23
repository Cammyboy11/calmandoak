#!/usr/bin/env bash
# Headless runner for one Calm & Oak agent in CI (GitHub Actions / any Linux box).
# Usage: bash cloud/run-agent.sh <agent-name> "<task prompt>"
set -euo pipefail

AGENT="${1:?agent name required}"
TASK="${2:?task prompt required}"
DEF="cloud/agents/${AGENT}.md"
[ -f "$DEF" ] || { echo "Missing agent definition: $DEF"; exit 1; }

# CI preamble: overrides the local Windows paths baked into the agent defs.
PREAMBLE="You are running HEADLESS in CI for Calm & Oak. The repo is the CURRENT WORKING DIRECTORY — use RELATIVE paths (./CONTROL.md, ./SAFEGUARDS.md, ./TEAM-LOG.md, ./GROWTH-PLAN-90-DAY.md). IGNORE any absolute Windows path (C:\\Users\\...) in the role below; that is the local-dev path only. Git is configured and 'git push' deploys to live via Cloudflare. ALWAYS read ./CONTROL.md first and honor PAUSE. Keep output concise."

SYS="${PREAMBLE}

--- ROLE: ${AGENT} ---
$(cat "$DEF")"

# Flags: verify against 'claude --help' on first run — the CLI evolves.
#   -p / --print            one-shot headless prompt
#   --append-system-prompt  inject the agent role + CI preamble
#   --model opus            use Opus
#   --dangerously-skip-permissions  unattended (no prompts) — required in CI
#   --mcp-config            connectors (Blotato etc.); see cloud/mcp.json
#   --output-format json    machine-readable run log
claude -p "$TASK" \
  --append-system-prompt "$SYS" \
  --model opus \
  --dangerously-skip-permissions \
  --mcp-config cloud/mcp.json \
  --output-format json | tee "cloud/last-${AGENT}.json"
