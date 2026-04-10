# Product Context

## Product Vision

Build a personal golf companion app that replaces expensive subscription golf apps by focusing on the features golfers actually use:

- accurate yardages
- simple scoring
- round history
- practical performance insights

## Product Thesis

- during round = tool
- after round = coach

During play, the app must stay fast and distraction-free. After the round, it should help the golfer understand performance without requiring spreadsheets or manual calculations.

## MVP Scope

In scope:

- course selection from a limited personal or imported course catalog
- GPS yardages to front, center, and back of the green
- round creation and hole progression
- score entry for strokes, putts, fairway hit, GIR, and penalties
- round persistence and history
- basic stats dashboard
- offline-tolerant round continuation

Out of scope:

- wearables
- full worldwide course inventory
- shot-by-shot GPS traces as a required workflow
- AI recommendations
- social features
- subscription billing

## Product Rules

1. Optimize for speed during play.
2. Keep course coverage honest.
3. Do not force optional stats on every hole.
4. Preserve round integrity when offline.
5. Defer premium-style analysis until MVP utility is solid.

## Primary User Flow

1. User opens the app.
2. User selects a playable course.
3. User starts a round.
4. App shows the current hole and front, center, and back yardages.
5. User enters score and lightweight stats.
6. User advances hole by hole.
7. Completed rounds are saved to history.
8. Stats dashboard aggregates saved rounds only.

## Data Constraints

Playable MVP courses need:

- hole order
- par
- front green coordinates
- center green coordinates
- back green coordinates

Initial course supply comes from manual entry or admin imports, not a global marketplace dataset.

## Key Open Questions

1. What fairway-hit rule should apply to par 3 holes?
2. Will the stats dashboard support date filters in MVP or only all-time metrics?
3. What exact offline conflict policy should be used when the same round is edited before sync completes?
4. How much map visualization is needed beyond numeric yardages in the first release?
