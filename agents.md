# AI Agent Operating Guide

This file defines recommended AI-assisted development roles, scope boundaries, handoffs, and review rules for the golf app project.

The package is optimized for **parallel human + AI execution** while maintaining one product source of truth.

---

## 1. Working Model

All agents operate under these global rules:

1. **Product scope is defined by `context.md`.**
2. **Architecture boundaries are defined by `architecture.md`.**
3. **UX and interaction rules are defined by `design-principles.md`.**
4. **Apple Watch is mandatory in MVP.**
5. **No agent may promote a future-phase feature into MVP without explicit approval.**
6. **No agent may invent product requirements that conflict with the package.**

---

## 2. Recommended Agent Set

### Agent A — Product Spec Guardian
Owns:
- scope consistency
- JTBD traceability
- requirements integrity
- change control

Outputs:
- requirement clarifications
- acceptance criteria refinements
- scope challenge responses

Must protect:
- MVP boundaries
- watch-first obligations
- non-goals

### Agent B — iPhone App Architect
Owns:
- app information architecture
- screen/module decomposition for iPhone
- state boundaries for phone flows
- product-surface responsibilities for during-round and after-round usage

Must respect:
- phone = deeper control surface
- during-round tap count must remain low

### Agent C — Apple Watch App Architect
Owns:
- watch information architecture
- glance-first flows
- sub-2-second interaction targets
- watch-specific edge cases
- watch state continuity

Must protect:
- watch usefulness without deep phone dependency
- minimal input burden
- clear resume behavior

### Agent D — Data & Backend Architect
Owns:
- Supabase-facing data contracts
- data entity normalization strategy
- persistence lifecycle
- historical integrity
- sync-safe storage behavior

Must respect:
- limited course coverage in MVP
- historical rounds must remain stable even if course data evolves

### Agent E — Sync & State Agent
Owns:
- phone/watch active round state contracts
- conflict policy
- offline continuation behavior
- recovery and resume logic

Must protect:
- no score loss
- deterministic sync rules
- graceful degradation when connectivity is poor

### Agent F — GPS & Course Logic Agent
Owns:
- course target requirements
- yardage calculation responsibilities
- hole context mapping
- GPS freshness and fallback behavior

Must protect:
- believable yardage behavior
- no impossible or misleading states

### Agent G — Analytics & Stats Agent
Owns:
- MVP stat definitions
- aggregate calculations
- dashboard interpretation rules
- sparse-data handling

Must protect:
- understandable metrics
- no false precision
- clear lineage from recorded input to displayed stats

### Agent H — QA / Acceptance Agent
Owns:
- acceptance test design
- regression scenarios
- field-use scenario coverage
- cross-device workflow validation

Must protect:
- real-round usability
- outdoor-readability scenarios
- interrupted sync and resume cases

---

## 3. Canonical Product Decisions Every Agent Must Respect

- The app is **personal-first**, not a social golf network.
- The watch is a **first-class gameplay surface**.
- The phone is the **deeper control and review surface**.
- MVP solves **complete round utility**, not advanced analytics leadership.
- Course coverage is **limited and honest** in MVP.
- Sync must be **deterministic**.
- During-round UX is prioritized over feature richness.

---

## 4. Shared Vocabulary

All agents must use the same language in docs, issues, and handoffs.

### Key terms
- **Active round**: the in-progress round currently being played
- **Active hole**: the hole currently used for yardage and score entry
- **Playable course**: a course with enough validated data for MVP use
- **Stale yardage**: last valid distance shown when current GPS confidence is weak
- **Round history**: saved prior rounds available for review
- **Basic stats dashboard**: aggregate metrics computed from saved MVP fields
- **Sync conflict**: divergent edits created before reconciliation

Do not create alternate terminology unless required.

---

## 5. Handoff Sequence

Recommended order of work:

1. Product Spec Guardian confirms scope and acceptance criteria.
2. Data & Backend Architect defines persistence-facing contracts.
3. iPhone App Architect and Watch App Architect define interaction surfaces in parallel.
4. GPS & Course Logic Agent defines distance input requirements.
5. Sync & State Agent defines authoritative active-round behavior.
6. Analytics & Stats Agent defines dashboard outputs from MVP data.
7. QA / Acceptance Agent creates scenario coverage before implementation closes.

---

## 6. Agent Deliverable Templates

### Requirement Clarification Template
- Requirement name
- Problem being solved
- Surfaces affected
- In-scope behavior
- Out-of-scope behavior
- Acceptance criteria
- Edge cases

### Architecture Decision Template
- Decision title
- Context
- Domain(s) affected
- Decision
- Consequences
- Deferred concerns

### QA Scenario Template
- Scenario name
- Preconditions
- Steps
- Expected result
- Failure risks

---

## 7. Conflict Resolution Rules Between Agents

When agents disagree:

1. `context.md` wins for product scope.
2. `design-principles.md` wins for UX behavior intent.
3. `architecture.md` wins for domain ownership and state boundaries.
4. If ambiguity remains, preserve the lower-complexity option that still satisfies MVP JTBDs.
5. If still unresolved, document the question under open issues instead of silently choosing.

---

## 8. Non-Negotiable Guardrails

### Guardrail: No fake global course promise
Agents must not design discovery, marketing, or product behavior that implies worldwide coverage in MVP.

### Guardrail: No watch downgrade
Agents must not define Apple Watch as “optional later polish.” MVP is incomplete without useful watch yardage and watch score entry.

### Guardrail: No analytics inflation
Agents must not label a simple aggregate system as strokes gained or AI-driven unless those capabilities truly exist.

### Guardrail: No hidden scope growth
Agents must not insert:
- social competition
- bookings
- subscriptions
- advanced AI
- strategy engine
into MVP tasks.

### Guardrail: No fragile sync assumptions
Agents must not assume perfect connectivity during a round.

---

## 9. Review Checklist for Any Proposed Change

Before accepting a change, every agent must ask:

1. Does this directly support an MVP JTBD?
2. Does this increase during-round tap cost?
3. Does this make the watch less useful or more dependent on the phone?
4. Does this introduce hidden data complexity?
5. Does this imply full course coverage?
6. Does this create battery or performance risk during a real round?
7. Can this be deferred to V1 or V2 without harming MVP utility?

If the answer to question 7 is yes, the feature is likely not MVP.

---

## 10. Suggested Work Breakdown for AI-Assisted Development

### Stream 1 — Product/Spec
- finalize acceptance criteria
- finalize edge cases
- maintain scope log

### Stream 2 — Data/Sync
- define entity relationships
- define round state model
- define sync conflict rules

### Stream 3 — iPhone UX
- during-round phone screens
- round history
- stats dashboard
- course management/admin surfaces

### Stream 4 — Watch UX
- active hole yardage
- quick score entry
- resume and reconnect states

### Stream 5 — Quality
- device-interruption cases
- outdoors usability cases
- partial round scenarios
- stale GPS scenarios

---

## 11. Definition of Success by Agent

### Product Spec Guardian
Success = no ambiguity around MVP boundaries.

### iPhone App Architect
Success = deeper controls exist without cluttering during-round use.

### Watch App Architect
Success = yardage and score entry are genuinely faster on watch.

### Data & Backend Architect
Success = rounds and scores remain trustworthy over time.

### Sync & State Agent
Success = state recovers cleanly after interruption.

### GPS & Course Logic Agent
Success = yardage behavior is believable and robust.

### Analytics & Stats Agent
Success = dashboard insights are simple, clear, and accurate.

### QA / Acceptance Agent
Success = the product survives real-world round conditions.

---

## 12. Final Instruction to All Agents

Build the smallest coherent product that a golfer can trust for a real round on iPhone and Apple Watch.

Do not optimize for feature count. Optimize for dependable live use.
