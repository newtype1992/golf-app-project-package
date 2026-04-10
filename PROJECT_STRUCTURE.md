# Project Structure

This repository started as a product-spec package. It now also includes an implementation scaffold so the actual app can be built without losing the original planning documents.

## Root files

- `README.md`: package overview and entry point
- `context.md`: product scope, requirements, flows, and roadmap intent
- `architecture.md`: domain boundaries and sync model
- `design-principles.md`: UX rules for iPhone and Apple Watch
- `agents.md`: delivery guardrails for AI-assisted work
- `PROJECT_SETUP.md`: practical build setup steps for macOS/Xcode
- `PROJECT_STRUCTURE.md`: intended repository layout

## Implementation directories

- `apps/ios/`: future iPhone app target and app-specific code
- `apps/watchos/`: future watchOS app target and watch-specific UI
- `packages/GolfCore/`: shared Swift package for domain models and business logic
- `backend/supabase/`: migrations, seed data, and backend setup assets
- `tests/`: acceptance, sync, and field-testing artifacts
- `docs/`: implementation notes that sit beside the product package
- `tracking/`: roadmap, sprint plans, and execution status

## Recommended code ownership

- `apps/ios/`
  - phone-only screens
  - phone navigation
  - history and stats UI
- `apps/watchos/`
  - glanceable yardage screen
  - quick score entry
  - reconnect and stale-state UI
- `packages/GolfCore/`
  - `Domain`
  - `CourseData`
  - `RoundEngine`
  - `Scoring`
  - `Sync`
  - `Stats`
- `backend/supabase/`
  - schema migrations
  - row-level security policies
  - seed or import helpers
- `tests/`
  - acceptance flows
  - sync conflict tests
  - outdoor/field validation checklists

## What is missing right now

There is still no generated Xcode project or runnable app code in this repository. That work must be done on macOS with Xcode. The current scaffold is meant to keep implementation organized and aligned with the package rules.
