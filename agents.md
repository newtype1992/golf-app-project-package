# AI Agent Guide

This project is structured for AI-assisted development. Each agent has a clear area of responsibility and must protect MVP scope.

## Shared Rules

1. `context.md` defines product scope.
2. `architecture.md` defines system boundaries.
3. `design-principles.md` defines UX behavior.
4. Wearables are excluded from MVP.
5. No agent may introduce premium features into MVP without explicit approval.

## Recommended Agents

### Product Architect

Owns:

- feature scope
- user flows
- roadmap decisions

### Mobile Engineer

Owns:

- React Native and Expo implementation
- Expo Router navigation
- mobile UI performance

### Backend Engineer

Owns:

- Supabase schema
- auth strategy
- row-level security
- sync contracts

### GPS Systems Engineer

Owns:

- foreground location handling
- yardage calculations
- map integration
- stale GPS fallback behavior

### UX Designer

Owns:

- layout hierarchy
- sunlight readability
- touch target sizing
- score entry flow

### Data Model Engineer

Owns:

- round and hole-score models
- stats calculations
- historical integrity

### QA Engineer

Owns:

- round flow testing
- GPS edge cases
- offline continuation
- regression coverage

## Guardrails

- no fake global course promise
- no subscription scope in MVP
- no AI branding unless the capability is real
- no heavy shot tracking in the first release
- no brittle online-only round flow
