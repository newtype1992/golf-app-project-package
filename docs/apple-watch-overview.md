# Apple Watch Overview

Apple Watch is not a companion extra in this product. It is the primary quick-interaction surface during a round.

## What the watch should do in MVP

- show the active hole immediately
- show front, middle, and back yardages at a glance
- allow fast score entry for the current hole
- support simple hole progression
- survive temporary disconnect from the phone without losing the round context

## What the watch should not own in MVP

- course selection
- deep score editing across many holes
- round history browsing
- stats dashboard analysis
- admin/import workflows

Those stay on the iPhone.

## Why the watch matters

The package is explicit about one product rule: during round use is the priority. The watch is the fastest place to check distance and capture a hole result without pulling out the phone. If the watch is weak, the MVP misses one of its core JTBDs.

## Recommended watch screen stack

1. `ActiveRoundView`
   - hole number
   - front/middle/back yardages
   - stale or fresh state
   - entry point to score
2. `HoleScoreEntryView`
   - strokes first
   - optional lightweight stats
   - quick save confirmation
3. `RoundProgressView`
   - next hole
   - previous hole review only if needed
4. `ReconnectStateView`
   - sync pending
   - disconnected but locally saved

## Engineering implication

The watch should receive a compact active-round snapshot rather than replicate the full phone navigation model. It needs:

- active hole identity
- hole targets
- current hole score state
- sync freshness
- last updated timestamp

That contract should stay narrow and deterministic.

## Practical sync rule

For watch usability, treat local entry as valid immediately, then sync it to the phone and backend. Never require an instant round-trip to confirm a watch score entry.

## Design rule

If a watch interaction takes too many taps or too much reading, it probably belongs on the phone instead.
