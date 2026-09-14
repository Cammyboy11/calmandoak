---
updated: 2026-09-14
note: How Calm & Oak's agent fleet gets better over time. Read by the CEO every monthly review; worth any agent reading once, since it explains why LESSONS-LEDGER.md exists.
---

# The Learning Loop

None of these agents carry memory between runs — every invocation starts fresh, reading files.
So "learning" here can't mean anything gets smarter on its own; it means **the files get better,
deliberately, on a cadence, with someone accountable for it.** That someone is the CEO.

## The three tiers

**1. Raw observation.** Any agent, any run: something worked, something failed, something
surprised you — append it to `LESSONS-LEDGER.md`. One instance is not a pattern. Log it anyway;
patterns are invisible until you can see multiple instances side by side.

**2. Confirmed pattern.** During its monthly review, the CEO reads the month's raw entries,
looks for ≥2–3 independent instances of the same thing, and marks them `confirmed`. A single
compelling anecdote does not get promoted on its own — that's how a bad one-off decision becomes
a permanent bad rule.

**3. Promoted rule.** A confirmed pattern gets written into whatever actually governs future
behavior, chosen by what kind of pattern it is:
   - **Quality/compliance miss** (a QA gate that should have caught something) → a new line in
     `SAFEGUARDS.md`.
   - **Governance/operational miss** (a process gap, a check that should run every time) →
     `CONTROL.md` or the relevant agent's own spec at `~/.claude/agents/calmoak-*.md`.
   - **Growth/tactical insight** (a format, a hook, a channel behavior) → the relevant strategy
     note in the vault, or the agent spec that acts on it directly.
   Whichever it is, the ledger entry gets updated with exactly where it landed — `promoted-to` is
   never left vague. If a future run wants to know "why does this rule exist," the ledger is the
   answer, not institutional memory nobody has.

## The one thing that is NOT learnable

A small, deliberately fixed set of guardrails never gets "optimized" by this loop, no matter how
much evidence suggests a shortcut would perform better: FTC/affiliate disclosure requirements, the
ASIN quality bar (≥4.3★/≥200 reviews/in-stock/no-FR), brand-voice rules, account scope (never the
Gingernomics accounts), and anything in CONTROL.md's "Always escalate" list. These exist because
a metric that looks better this week from cutting one of them (a higher click rate from a less
disclosed pin, a laxer product bar that ships faster) is trading a customer's trust for a number —
exactly the failure mode a pure optimization loop can't be trusted to catch on its own. Cameron
draws this line, not the learning loop; it only gets redrawn if he explicitly does it.

## Cadence
- **Every run, any agent:** log raw observations as they happen. Costs one line; free to skip if
  there's nothing worth logging.
- **Monthly, the CEO:** consolidate — confirm patterns, promote rules, prune what turned out to be
  noise (mark `dropped`, keep the line, don't delete history), and report the diff to Cameron in
  concrete before/after terms as part of the monthly strategic review (see
  `CEO-OPERATING-BRIEF.md`).

## Why this is the actual growth mechanism, not a side process
`NORTH-STAR.md`'s own weekly rule is "look at what moved, double the winner, kill the loser." That
rule only works if "what moved" is actually remembered past the week it happened — otherwise every
month re-discovers the same wins and repeats the same losses. This loop is what makes NORTH-STAR's
5–10%/week compounding real instead of aspirational: fewer repeated mistakes and a growing set of
promoted rules is the mechanism by which the same amount of agent effort produces more, over time.
