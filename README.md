# Golf App Project Package

This repository package defines a **mobile-first golf GPS, scoring, and analytics app for iPhone and Apple Watch**. It is intended for **AI-assisted product and engineering execution** and treats Apple Watch support as a **core product requirement**, not a companion extra.

The app concept is a personal golf utility inspired by products like 18Birdies and Golfshot, but scoped around a single validated outcome:

> Help a golfer during and after a round with reliable GPS yardages, fast score/stat entry, round history, and practical performance insights without requiring a subscription.

---

## Package Purpose

This package exists to give engineering teams and coding agents a single source of truth for:

- what the product is
- what belongs in MVP
- what is explicitly deferred
- how the iPhone and Apple Watch experiences divide responsibility
- how product domains interact conceptually
- what rules must hold during implementation
- how to sequence delivery safely

This package is **not** a codebase. It is the product and architecture operating manual for building one.

---

## Included Files

### `README.md`
Repository entry point and execution guide.

### `context.md`
Product definition, scope, JTBD mapping, flows, edge cases, and roadmap.

### `agents.md`
Operating instructions for AI-assisted development roles, responsibilities, handoffs, and guardrails.

### `architecture.md`
Conceptual system architecture, domain boundaries, data ownership, sync model, and delivery structure.

### `design-principles.md`
Mobile-first and watch-first UX principles for on-course and after-round behavior.

---

## Product Summary

### Primary surfaces
- **iPhone app**
- **Apple Watch app**

### MVP promise
A golfer can:
- select a course
- start and manage a round
- view front / middle / back green distances
- enter score and basic stats hole by hole
- use Apple Watch for quick yardage viewing and fast score entry
- review round history and basic stats after play

### Future phases
Later phases may add:
- shot tracking
- club distance averages
- round summaries
- strokes gained style analysis
- AI caddie recommendations
- course strategy mode

These are **not MVP requirements** unless explicitly promoted in a later planning cycle.

---

## Product Positioning Rules

This package assumes the product is:

- **personal-first**, not marketplace-first
- **course coverage limited in MVP**
- **native on Apple platforms**
- **watch-integrated from day one**
- **focused on reliability during play**
- **focused on clarity after play**

The product does **not** assume:
- worldwide course inventory at launch
- social features
- tournament management
- tee-time booking
- full handicap system support
- advanced AI features in MVP
- battery-heavy always-on tracking in the first release

---

## Technical Direction

The blueprint already establishes the preferred stack direction:

- **SwiftUI** for iPhone
- **watchOS** native watch app
- **Core Location** for device positioning
- **MapKit** for course views where applicable
- **WatchConnectivity** for phone-watch sync
- **Supabase** as backend by default

This package does not prescribe detailed implementation code, DB schema migrations, or API design. It defines the requirements that those technical choices must satisfy.

---

## Core Product Modules

The product is organized around these conceptual modules:

- `course-data`
- `gps`
- `round-engine`
- `scoring`
- `shot-tracking` (future-facing, not MVP core)
- `stats`
- `sync`

These names are used consistently across the package so product and engineering discussions remain aligned.

---

## MVP Definition

### In scope
- course selection
- manual / imported personal course availability
- hole-by-hole yardages
- front / middle / back green distances
- digital scorecard
- putts, fairway hit, GIR, penalties
- round history
- Apple Watch yardage screen
- Apple Watch score entry
- basic stats dashboard

### Out of scope
- full global course catalog
- strokes gained engine
- shot-by-shot GPS trace as a required workflow
- AI club recommendations
- social competition
- subscription billing
- tee sheet / booking integrations

---

## Apple Watch Requirement

Apple Watch is a **first-class product surface**. That means:

- the user must be able to get useful value from the watch during every hole
- the watch must not depend on deep phone navigation during active play
- yardage access must be glanceable
- score entry must be fast enough to complete between shots or while walking
- watch sync failure must degrade gracefully instead of blocking round progress

The watch is not just a mirrored phone client. It is the primary **in-round quick interaction surface**.

---

## Execution Rules for Builders

Anyone building from this package must follow these rules:

1. **Protect MVP scope.** Do not sneak future features into the first release.
2. **Optimize for live play.** During-round interactions beat post-round richness.
3. **Keep phone and watch roles distinct.** Phone handles depth; watch handles speed.
4. **Design for outdoor conditions.** Contrast, glanceability, and large touch targets are non-negotiable.
5. **Preserve data integrity.** Rounds, scores, and stats must remain recoverable even with intermittent sync.
6. **Treat course coverage honestly.** MVP only guarantees manually entered or personally imported courses.
7. **Prefer deterministic behavior.** GPS, score state, and sync should be predictable, not clever.

---

## Suggested Build Order

1. shared product models and state contracts
2. course selection and course data ingestion
3. round creation and hole progression
4. phone yardage and score entry
5. watch yardage and watch score entry
6. sync and offline resilience
7. round history and basic stats dashboard
8. polish, validation, and field testing outdoors

---

## Definition of Done for MVP

MVP is complete when a golfer can:

1. open the app on iPhone
2. select an available course
3. start a round
4. move hole by hole
5. see front / middle / back distances on phone and watch
6. record score, putts, fairway hit, GIR, and penalties
7. complete the round even with temporary connectivity loss
8. review saved round history afterward
9. see basic stats summaries computed from recorded rounds
10. trust the app enough to use it during real play without excessive taps

---

## Recommended Use of This Package

Use the files in this order:

1. `context.md` to understand the product
2. `architecture.md` to understand domain boundaries and system behavior
3. `design-principles.md` to shape UI and interaction decisions
4. `agents.md` to coordinate AI or human+AI delivery

---

## Final Note

This package is intentionally strict. It is meant to reduce ambiguity, prevent scope drift, and make AI-assisted implementation safer and faster for a native iPhone + Apple Watch golf product.

---

## Implementation Workspace

This repository now also includes an implementation scaffold and planning docs so the package can be used as the starting point for the actual app build.

Additional project files:

- `PROJECT_STRUCTURE.md` for the intended repo layout
- `PROJECT_SETUP.md` for the macOS/Xcode setup path
- `docs/apple-watch-overview.md` for the watch product and engineering role
- `tracking/ROADMAP.md` for the delivery plan
- `tracking/STATUS.md` for sprint-by-sprint tracking
