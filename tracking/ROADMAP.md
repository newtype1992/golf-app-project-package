# Delivery Roadmap

This roadmap turns the product package into a build sequence that protects MVP scope and makes progress easy to track.

## Sprint 0: Foundation and Decisions

Goal: lock the implementation shape before UI work starts.

Deliverables:

- repo structure and planning docs
- Xcode workspace plan
- shared model inventory
- sync conflict policy proposal
- playable course checklist

Exit criteria:

- the team agrees on one active-round model
- the team agrees on one source-of-truth strategy
- the team agrees on what the watch can edit in MVP

## Sprint 1: Core Models and Course Data

Goal: make the product data model real.

Deliverables:

- `User`, `Course`, `Hole`, `HoleTarget`, `Round`, and `HoleScore` models
- course validation rules
- Supabase schema draft
- sample playable course data

Exit criteria:

- one course can be marked playable
- one round can be created from code
- historical round integrity rules are documented

## Sprint 2: iPhone Active Round MVP

Goal: get the phone app through a playable round.

Deliverables:

- course selection
- round start flow
- active-hole screen
- phone score entry
- hole progression

Exit criteria:

- a golfer can start a round on iPhone
- yardages render for the active hole
- scores and stats save hole by hole

## Sprint 3: Apple Watch MVP and Sync

Goal: make the watch a first-class round surface.

Deliverables:

- watch active-round yardage screen
- watch score entry
- phone/watch state sync
- reconnect and stale-state behavior

Exit criteria:

- a score entered on the watch reaches the phone without duplication
- the watch remains usable during temporary disconnect
- the active hole stays deterministic across both devices

## Sprint 4: History, Stats, and Resilience

Goal: finish the post-round value and reliability layer.

Deliverables:

- round completion flow
- round history
- round detail view
- basic stats dashboard
- offline resume handling

Exit criteria:

- completed rounds appear in history
- basic stats derive from saved rounds only
- interrupted rounds resume cleanly

## Sprint 5: QA, Field Testing, and Release Prep

Goal: prove the product works in real conditions.

Deliverables:

- acceptance tests
- sync conflict scenarios
- weak GPS handling checks
- outdoor usability review
- TestFlight/release checklist

Exit criteria:

- the app survives a real or simulated round
- watch usability is fast enough between shots
- major reliability risks are closed or explicitly deferred
