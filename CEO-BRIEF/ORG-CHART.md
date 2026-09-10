---
updated: 2026-09-10
note: Canonical org chart. Lives here (not the vault, not Cowork OS) so there's one copy and the cloud-routine CEO can read it. Edit this file directly when the org changes.
---

# Calm & Oak — Organization Chart

## CEO
**`calmoak-ceo`** — Cameron's single point of contact for the whole business, not just
marketing. Runs as a **cloud routine** (scheduled via RemoteTrigger, not the local-only
mechanism the rest of this org was built on — see "Execution integrity" below for why that
distinction matters). Full spec: `CEO-OPERATING-BRIEF.md` in this folder. Also invocable
locally as `~/.claude/agents/calmoak-ceo.md` for interactive sessions with full vault access.

## Existing department
Built and used through real interactive sessions Jun–Jul 2026 (verified: `TEAM-LOG.md` entries,
git commits under `ops@calmandoak.com`, real product launches). **Execution integrity is not
assumed — the CEO re-verifies it every run** (see `CEO-OPERATING-BRIEF.md`).

### Growth & Content
| Agent | Function | Intended cadence |
|---|---|---|
| `calmoak-marketing-director` | Marketing orchestrator — scoreboard, cadence policy, directs the content/SEO/growth agents | Sun 19:00 |
| `calmoak-content-factory` | Weekly pin/Reel production across Pinterest/IG/TikTok, Gemini-assisted editorial images, SAFEGUARDS QA gate | Sun 14:00 |
| `calmoak-publisher` | Daily backstop — fills any empty posting slot from reserve | daily 08:05 |

### Site & Discovery
| Agent | Function | Intended cadence |
|---|---|---|
| `calmoak-seo-ranker` | On-page SEO fixes + journal rebuilds, commits & deploys live | Tue + Fri 10:00 |
| `calmoak-geo-tracker` | AI-search-engine (GEO) visibility spot-checks → tickets | Wed 11:00 |
| `calmoak-outreach` | Backlinks (HARO/Qwoted), GSC technical review, keyword gaps. **SEO/authority only — not brand deals.** | Thu 11:00 |

### Revenue & Product
| Agent | Function | Intended cadence |
|---|---|---|
| `calmoak-merchandiser` | Builds/launches *owned* products — digital guides, prints, DTC briefs | Tue 13:00 |
| `calmoak-monetization` | Affiliate mix, ad-readiness, revenue-by-stream | Sat 12:00 |
| `calmoak-cro` | Converts existing traffic — email capture, CTAs, affiliate placement | Sat 14:00 |
| `calmoak-email` | Welcome sequence + newsletter | Fri 10:00 |

### Oversight & Integrity
| Agent | Function | Intended cadence |
|---|---|---|
| `calmoak-monthly-audit` | Re-verifies every live ASIN, affiliate links, disclosures, board grooming | 1st 09:00 |
| `calmoak-daily-digest` | Daily oversight digest — what shipped, signals, drift | daily 07:30 |
| `calmoak-moltbook` | Low-priority presence on the MoltBook agent-social network | light heartbeat |

## Real automation inventory (as of 2026-09-10 — the CEO should re-check this, not trust it)
- **Cloud routines that actually exist and fire (RemoteTrigger, verified via `list`):**
  - `Calm & Oak — daily Pinterest scheduler (approved pins → Blotato)` — daily 06:00 UTC, enabled, created 2026-09-05. This is NOT one of the 12 agents above; it's a narrow standalone routine.
  - A handful of one-off, already-fired retry/resume routines (print-kit builds, tote mockups) — not recurring.
  - For comparison: Gingernomics (Cameron's other brand) has 2 recurring routines that have fired reliably twice daily since 2026-04-18 — proof the cloud-routine mechanism itself is sound.
- **No recurring cloud routine exists for any of the 12 agents above.** `~/.claude/scheduled-tasks/*/SKILL.md` files exist locally for all of them, but no tool available to this org can confirm they were ever wired to a real unattended trigger, and the evidence (TEAM-LOG silent since 2026-07-18, git commits collapsed ~10x from July to August) says they weren't running unattended.

## Planned — real gaps, not yet built
Sequenced one at a time after the CEO, per Cameron's decision 2026-09-10. `REVENUE-MODEL.md`
independently confirms the first two are real (see its CEO note on the DTC and brand-deal rows).

| Role (working name) | Fills the gap that... | Notes |
|---|---|---|
| **Product Sourcing & Catalog** | `merchandiser` builds *owned* products; nobody continuously sources/vets new affiliate finds or DTC-line SKUs | REVENUE-MODEL's "DTC curated line" ($450K target) is gated on exactly this |
| **Brand & Influencer Partnerships** | `outreach` earns backlinks/SEO authority, not brand deals or influencer seeding | REVENUE-MODEL's "Brand / sponsor" row ($150K target) has no real owner today |
| **YouTube Operator** | Pinterest/IG/TikTok covered; a YouTube strategy exists (vault: `YOUTUBE-STRATEGY-2026`, written 2026-09-05) but has no operating agent and no channel connected to Blotato | Needs a channel + narrator-voice decision from Cameron first |
| **Market Research & Commercialization Scout** | Nobody continuously scans for new revenue/product opportunities outside the existing 6-stream model | Feeds merchandiser + CEO, not a publishing role |
| **Unified Commercial Performance Reporting** | `monetization` + `daily-digest` each report partially; no single cross-channel, cross-product-type view | May end up as a CEO capability rather than a separate agent — decide once execution integrity is fixed and there's real data to report on |

**Not a gap:** "stunning Gemini editorial mockups" is already in scope for `content-factory`
(vault: `SKILL — Editorial Image Generation`, proven 2026-09-06) — worth confirming it's actually
being used once execution integrity is restored, not a new role.
