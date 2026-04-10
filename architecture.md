# Architecture Guide

This document defines the conceptual architecture for the golf app. It is implementation-aware but intentionally avoids code, API, and schema-level prescriptions. Its purpose is to let engineering teams and AI coding tools build with clear domain boundaries and product-aligned responsibilities.

---

## 1. Architectural Goals

The architecture must support:

- native iPhone and Apple Watch experiences
- one coherent active-round model across devices
- dependable front / middle / back yardages
- low-friction score and stat capture
- persistence of rounds and historical integrity
- deterministic phone/watch synchronization
- offline-tolerant round continuity
- clean extensibility from MVP into future premium features

---

## 2. System Surfaces

### iPhone App
Primary responsibilities:
- course selection
- round start and management
- deeper score editing
- historical review
- stats dashboard
- course administration / import review surfaces if exposed to the user/admin

### Apple Watch App
Primary responsibilities:
- glanceable active-hole yardage
- fast score entry
- quick hole progression support
- active-round continuity during play

### Backend (Supabase by default)
Primary responsibilities:
- durable user data persistence
- course, round, and stats data storage
- sync-supporting state continuity
- eventual multi-device consistency

### Local Device Storage
Primary responsibilities:
- active round resilience
- temporary offline state
- performance-sensitive cached data
- watch continuity during intermittent connectivity

---

## 3. Architectural Principles

1. **Round state is a product-critical object.** It must be resilient, recoverable, and synchronized carefully.
2. **Course data is prerequisite data.** GPS and round behavior depend on validated course structure.
3. **GPS is an input service, not a business owner.** It informs yardages but does not own score or round progression.
4. **Watch interactions must remain independent enough to be useful in real play.**
5. **Historical round records must remain interpretable over time.**
6. **Future features must extend existing domains rather than collapse them together.**

---

## 4. Conceptual Domain Decomposition

### Domain: Course Data
Inputs:
- manual entry
- admin import

Owns:
- course metadata
- hole definitions
- hole order
- tee/par metadata where applicable
- front/middle/back targets

Publishes to:
- GPS
- round-engine
- scorecard context
- historical round display

Key rule:
A course is not playable until required target data exists.

### Domain: GPS
Inputs:
- current location
- active hole targets
- location accuracy metadata

Owns:
- distance calculations to defined targets
- freshness status
- yardage presentation-ready values

Publishes to:
- iPhone active round view
- watch yardage screen

Key rule:
GPS values can become stale, but the product must communicate that state cleanly.

### Domain: Round Engine
Inputs:
- selected course
- user round actions
- sync updates

Owns:
- active round lifecycle
- current hole
- round status
- round completion
- resume behavior

Publishes to:
- scoring
- sync
- watch context
- round history after completion

Key rule:
Only one clear active-hole context can exist at a time for live play.

### Domain: Scoring
Inputs:
- active round context
- hole input actions from phone/watch

Owns:
- hole score fields
- totals
- editable hole state
- score validation

Publishes to:
- round summaries
- history
- stats

Key rule:
Score edits must preserve integrity without creating duplicate hole states.

### Domain: Stats
Inputs:
- completed rounds
- hole score fields

Owns:
- aggregate calculations
- dashboard-facing summaries
- trends-ready derived metrics

Publishes to:
- phone stats dashboard
- round summary surfaces

Key rule:
Only saved round data contributes to authoritative stats.

### Domain: Sync
Inputs:
- local phone state
- local watch state
- persistence layer state

Owns:
- transport of active round state
- reconciliation rules
- resume continuity
- cross-surface consistency

Publishes to:
- phone active round state
- watch active round state

Key rule:
Sync must be deterministic, explicit, and loss-averse.

### Domain: Shot Tracking (Future)
Inputs:
- shot events
- club selection
- location capture

Owns:
- shot records
- shot distances
- club-derived insights

Key rule:
This domain must layer onto the existing round model instead of redefining MVP scoring flows.

---

## 5. Data Entity Roles

The blueprint supplies these core entities:

### `User`
Represents the owner of personal rounds, courses, and preferences.

### `Course`
Represents a playable course record.

### `Hole`
Represents one hole within a course and its playable sequence.

### `HoleTarget`
Represents target reference points for a hole, especially front / middle / back of green.

### `Round`
Represents one played session on one course.

### `HoleScore`
Represents user-entered score and stat data for one hole within one round.

### `Shot`
Represents future shot-by-shot events. This remains future-facing for MVP.

### `ClubStat`
Represents future club averages or club-derived performance. Not required in MVP.

### Historical Integrity Rule
Completed rounds must remain readable even if related course metadata later changes. Architecture must preserve enough round context to prevent historical corruption.

---

## 6. State Model

### Core product states
- no active round
- active round available
- active round in progress
- active round temporarily interrupted
- active round completed
- historical round review

### Active round state must include conceptually
- course reference
- active hole
- per-hole score state
- last known sync status
- last meaningful update timestamp
- completeness state

### Watch-facing state must include conceptually
- active hole identity
- front/middle/back values
- quick score entry context
- confidence that state is current or stale

---

## 7. Source of Truth Strategy

The product needs one coherent source-of-truth strategy across two devices and a backend.

### Recommended conceptual approach
- **Persistence layer** is the durable truth for saved data.
- **Local device state** is the operational truth during interaction.
- **Sync layer** reconciles operational truth into durable truth.
- **One active-round policy** prevents parallel ambiguity.

### Required behaviors
- active round must be resumable from local state
- unsynced watch or phone updates must not be discarded silently
- score duplication must be prevented
- historical rounds must derive from a finalized saved state

---

## 8. Sync Architecture Expectations

### Sync responsibilities
- propagate active round creation
- propagate hole progression
- propagate score edits
- propagate round completion
- reconcile stale and fresh states
- preserve a safe recovery path after interruption

### Sync design rules
1. Sync logic must be simple enough to reason about.
2. Loss prevention is more important than instant perfection.
3. Dual-device updates require deterministic reconciliation.
4. Temporary disconnect is a normal condition, not an exception case.

### Minimum conflict policy requirement
Engineering must explicitly choose and document one of:
- authoritative device ownership by operation type
- timestamp-based last valid write with safeguards
- field-level merge where safe

The choice must preserve score integrity and user trust.

---

## 9. Offline and Interruption Model

The architecture must assume the following can happen during real play:
- the phone screen is locked for long periods
- the watch temporarily disconnects
- connectivity to backend is unavailable
- GPS signal quality varies
- the user switches between phone and watch entry

### Required resilience outcomes
- the round remains playable
- the current hole remains recoverable
- the latest saved or locally captured score is not lost
- the user can resume without reconstructing the round manually

---

## 10. Course Data Architecture

### MVP course data strategy
- manual course entry
- admin import for personally played courses
- no assumption of global course coverage

### Practical architectural implications
- course ingestion tooling is part of the system even if user-facing lightly
- course validation is necessary before a course becomes selectable
- target completeness is a gating factor for gameplay
- historical round display cannot break if a course is later updated

### Minimum playable course concept
A course is MVP-playable only when:
- hole sequence is defined
- required target data exists for yardages
- the round engine can progress hole by hole without ambiguity

---

## 11. Module View

### `course-data`
Responsibilities:
- store and validate course/hole/target structure
- expose playable course catalog
- support import/admin workflows

### `gps`
Responsibilities:
- derive front/middle/back values from current location + hole targets
- provide freshness/confidence state

### `round-engine`
Responsibilities:
- create rounds
- manage active hole
- advance / resume / complete rounds

### `scoring`
Responsibilities:
- hole score entry
- stat capture
- totals and edits

### `shot-tracking`
Responsibilities:
- future shot event model and derived metrics

### `stats`
Responsibilities:
- aggregate post-round metrics
- dashboard summaries

### `sync`
Responsibilities:
- cross-device active round continuity
- reconciliation and persistence handoff

---

## 12. Surface Responsibility Matrix

| Capability | iPhone | Apple Watch | Backend | Local Storage |
|---|---|---|---|---|
| Course selection | Primary | Context-only | Support | Cache |
| Yardage display | Full | Primary glance use | No | Cached active context |
| Score entry | Full | Fast path | Persist | Temporary resilience |
| Hole progression | Full | Limited fast support | Persist | Temporary resilience |
| Round history | Primary | Not primary | Persist | Cache optional |
| Stats dashboard | Primary | Not primary | Persist/derive | Cache optional |
| Sync | Participate | Participate | Receive/store | Stage state |

---

## 13. Security and Privacy Expectations

Even for a personal-use product, architecture must account for:
- authenticated user ownership of data
- isolated access to personal rounds and courses
- careful handling of location-derived data
- minimal exposure of sensitive user state between devices

The architecture should avoid collecting more than is needed for the MVP product promise.

---

## 14. Performance Expectations

### During round
- current-hole screens must open quickly
- yardages must feel current
- score entry must not lag behind interaction
- watch screens must remain lean

### After round
- history must load deterministically
- stats must remain understandable and not over-computed for sparse data

### Architecture implication
Favor predictable data flows and narrow real-time payloads over overly chatty synchronization.

---

## 15. Extension Path to V1 and V2

### V1 extension points
- `Shot`
- `ClubStat`
- richer summary generation
- expanded stats derivation

### V2 extension points
- strokes gained style analytics
- AI recommendation services
- strategy and planning overlays

### Guardrail
Future extension must not force a rewrite of:
- active round lifecycle
- score integrity rules
- course validation rules
- phone/watch sync fundamentals

---

## 16. Engineering Decision Constraints

Engineering may choose implementation details, but must not violate these architectural constraints:

- do not make watch usage dependent on deep phone navigation during live play
- do not make global course coverage a hidden assumption
- do not allow course invalidity to leak into live GPS behavior
- do not couple analytics logic tightly to live round performance-critical paths
- do not design sync assuming perfect connectivity
- do not allow historical round data to mutate unintentionally

---

## 17. Architecture Exit Criteria for MVP

Architecture is MVP-ready when the team can clearly answer:

1. What makes a course playable?
2. What state defines an active round?
3. Which device behaviors work while offline or disconnected?
4. How are phone/watch conflicts resolved?
5. How is historical round integrity preserved?
6. How do yardages degrade when GPS quality is weak?
7. What remains intentionally excluded until V1 or V2?

If any of these answers remain ambiguous, architecture work is not complete.
