# Bartok — your money cards land here

This folder is Bartok's mailbox. Twice a day, Bartok reads Calm & Oak's numbers and drops a one-screen **money card** into `money-cards/`, named by date and time of day:

- `money-cards/2026-06-25-AM.md`
- `money-cards/2026-06-25-PM.md`

Because this whole folder is OneDrive-synced, every card shows up in the **OneDrive app on your phone** automatically — open the OneDrive app → Calm & Oak → Bartok → money-cards. That's Bartok in your pocket.

## What's in a money card
1. **The number** — revenue by stream + revenue-per-visitor, with deltas vs. the last card.
2. **The leak we're plugging** — the biggest waste found and which agent is fixing it.
3. **The lever we're pulling** — the highest-upside move this cycle.
4. **Your one unlock** — the single thing only you can do to make the next dollar cheaper.
5. **Watch** — anything trending the wrong way.

## How it runs
Two scheduled heartbeats (AM + PM) run Bartok while the Claude desktop app is open on your PC. Bartok's full job description is in `../cloud/agents/bartok.md`. The kill switch is `../CONTROL.md` (`PAUSE: true` stops everything).

**Honest note:** Bartok directs the fleet toward money and flags waste, but it never spends, pays, or moves money — those always come to you. Anyone who tells you an AI can make and move money with no card underneath is selling the stage trick, not the machine.
