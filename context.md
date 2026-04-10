# Product Context

## 1. Product Overview

### Product Name
Working title: **Personal Golf GPS & Scoring App**

### Product Summary
A native iPhone and Apple Watch golf app that helps a golfer during and after a round with GPS distances, score and stat entry, round history, and practical performance visibility. The product aims to replace the core value of a paid golf GPS/scoring subscription for a golfer who wants premium-style utility without recurring fees.

### Problem Statement
Existing golf apps often gate useful features behind subscriptions. A golfer who mainly wants dependable front / middle / back yardages, score entry, round history, and simple analytics is forced into an experience that is either overbuilt, subscription-led, or weak on Apple Watch utility.

### Product Goal
Enable a golfer to complete an entire round using iPhone and Apple Watch for:
- fast front / middle / back yardages
- low-friction score and stat capture
- saved round history
- useful post-round basic analytics

### Primary User
A golfer who wants:
- front / middle / back green distances
- simple score entry
- putts, fairways, GIR, and penalty tracking
- round history
- Apple Watch convenience during play
- later access to premium-style features such as shot tracking and club distances

### Product Thesis
- **During round = tool**
- **After round = coach**

The during-round experience must minimize interaction cost. The after-round experience may become more reflective and analytical.

---

## 2. JTBD → Feature Traceability Map

| JTBD | User Need | MVP Feature(s) | Notes |
|---|---|---|---|
| When I am standing over a shot, I want fast yardages so I can choose the right target and club | Glanceable GPS utility | course selection, active round, hole-by-hole yardages, front/middle/back distances, Apple Watch yardage screen | Core in-round value |
| When I finish a hole, I want to enter my score quickly so I do not slow down play | Minimal-tap scoring | digital scorecard, hole score entry, Apple Watch score entry | Must work in seconds |
| When I track a round, I want to capture simple performance markers so I can review how I played | Core stat capture | putts, fairway hit, GIR, penalties | Keep inputs lightweight |
| When I return later, I want to see my previous rounds so I can remember and compare results | Historical continuity | round history | Required for analytics trust |
| When I review my play, I want understandable stats so I can improve without manual math | Basic coaching utility | basic stats dashboard | MVP analytics only |
| When I use my watch on the course, I want it to be useful on its own for quick actions | True watch value | Apple Watch yardage screen, Apple Watch score entry, sync | Watch is first-class |
| When I expand usage later, I want richer performance insight | Premium-style depth | shot tracking, club averages, summaries, strokes gained style analysis, AI caddie, course strategy mode | Future phases only |

---

## 3. MVP Scope (In-Scope vs Out-of-Scope)

### In Scope
- account-level user profile sufficient for personal usage
- course selection from manually entered or personally imported courses
- course data containing holes and green targets
- active round creation
- hole progression from 1 through 18, with support for partial round handling
- front / middle / back green distances
- phone score entry
- Apple Watch score entry
- scorecard fields:
  - strokes
  - putts
  - fairway hit
  - GIR
  - penalties
- round persistence
- round history
- basic stats dashboard using recorded round data
- phone/watch data sync
- outdoor-legible UX
- offline-tolerant round continuation

### Out of Scope
- complete global course library
- tee time booking
- social feed
- friend leaderboards
- betting / game formats
- handicap calculation as a complete official system
- advanced strokes gained implementation
- AI caddie logic
- automated club recommendation engine
- strategy overlays as required workflow
- deep shot-by-shot mapping as MVP requirement
- subscription and billing logic
- Android support
- web app as a product surface

### Scope Boundary Rules
A feature does not belong in MVP if:
- it is not required to complete a real round successfully
- it primarily adds reflection instead of in-round utility
- it serves a different persona than the single golfer user
- it adds heavy data dependency, battery cost, or complex modeling

---

## 4. Core Domains & Responsibilities

### Domain: User Profile
Owns:
- user identity for personal data ownership
- local preferences
- dominant hand / units / simple settings if needed later

Does not own:
- scoring logic
- course structure
- sync policy

### Domain: Course Data
Owns:
- course identity
- hole ordering
- par and tee metadata where present
- green target coordinates or yardage reference points
- course availability to the user

Does not own:
- live GPS calculations
- round state

### Domain: GPS
Owns:
- current device location acquisition
- active hole distance calculations
- phone and watch yardage presentation inputs
- location freshness and fallback handling

Does not own:
- score persistence
- course authoring

### Domain: Round Engine
Owns:
- active round lifecycle
- current hole state
- round start / progress / completion
- partial round continuation
- deterministic progression rules

Does not own:
- advanced analytics
- map rendering

### Domain: Scoring
Owns:
- hole score fields
- edit rules
- validation of per-hole entries
- scorecard totals

Does not own:
- GPS
- long-term analytics models

### Domain: Stats
Owns:
- aggregate metrics derived from saved rounds
- dashboard summaries
- trend-ready calculations for future phases

Does not own:
- live round state authority

### Domain: Sync
Owns:
- phone ↔ watch round state exchange
- last-known active round continuity
- conflict resolution policy
- safe persistence when one surface is temporarily unavailable

Does not own:
- business rules of scoring itself

### Domain: Shot Tracking (Future)
Owns:
- discrete shot records
- shot location capture
- club tagging
- shot-derived distance calculations

Not required for MVP completion.

---

## 5. Functional Requirements (with acceptance criteria)

### Feature: Course Selection
**Purpose**  
Allow the golfer to choose a course that is available in their personal catalog.

**User action**  
The user opens the app and selects a course before starting a round.

**System behavior**  
The system shows only available courses in the user's local or synced course library and allows round creation from one selected course.

**Acceptance criteria**
- The app displays a list of available courses with enough information to distinguish one course from another.
- The user can select a course and start a round in a single flow.
- The system prevents round start if the selected course lacks required hole/target data for MVP yardages.
- The app does not imply full global course coverage.
- The same selected course is available to the watch for the active round context.

### Feature: Manual Course Entry / Admin Import
**Purpose**  
Provide usable course data for the user's personally played courses without depending on global coverage.

**User action**  
A user or authorized admin creates or imports a course record with holes and green targets.

**System behavior**  
The system stores course, hole, and target data in a format usable by the GPS and round engine.

**Acceptance criteria**
- A course can exist only if it contains at least one valid hole definition.
- An MVP-playable course contains sufficient hole data and front/middle/back target references for the yardage feature.
- Imported data can be reviewed before it becomes selectable for a round.
- Invalid or incomplete course data is blocked from active round usage.

### Feature: Active Round Creation
**Purpose**  
Start a playable round with deterministic state.

**User action**  
The user starts a round from a selected course.

**System behavior**  
The system creates a round record with hole sequence, active hole state, and editable hole-score placeholders.

**Acceptance criteria**
- Starting a round creates one new round record tied to one course.
- The round opens on the first playable hole by default unless resume logic applies.
- The active round state is visible on both phone and watch after sync.
- The user can leave and reopen the app without losing the active round.

### Feature: Hole-by-Hole Yardages
**Purpose**  
Provide dependable yardage context for the current hole.

**User action**  
The user views the current hole during a round.

**System behavior**  
The system displays the current hole number and front / middle / back distances derived from device location and hole targets.

**Acceptance criteria**
- The current hole view shows hole identity and front/middle/back values.
- Distances update as device location changes.
- The app handles temporary low-confidence location input without crashing or showing impossible values.
- If GPS is temporarily unavailable, the last valid yardages remain clearly distinguishable from fresh values.

### Feature: Apple Watch Yardage Screen
**Purpose**  
Make the watch the fastest in-round distance reference.

**User action**  
The user raises the watch or opens the watch app during a round.

**System behavior**  
The watch displays the active hole and front / middle / back distances with minimal interaction cost.

**Acceptance criteria**
- The watch opens directly to useful active-round information when a round exists.
- The watch yardage screen is readable outdoors at a glance.
- The watch interaction path to yardages does not require deep navigation.
- The watch remains useful even if the phone is not actively open.

### Feature: Digital Scorecard
**Purpose**  
Capture the golfer’s score hole by hole.

**User action**  
The user enters or edits score data for a hole.

**System behavior**  
The system stores hole score values and updates round totals and per-round summaries.

**Acceptance criteria**
- The user can enter strokes for each hole.
- The user can edit a previously entered hole before or after round completion.
- The scorecard maintains total score consistency across edits.
- The app does not require all holes to be completed before saving progress.

### Feature: Stat Tracking per Hole
**Purpose**  
Capture lightweight supporting stats that make post-round review useful.

**User action**  
The user records putts, fairway hit, GIR, and penalties for a hole.

**System behavior**  
The system validates and stores each field in the hole score model.

**Acceptance criteria**
- Putts can be recorded for each hole.
- Fairway hit can be recorded only in a way compatible with the product’s chosen fairway-applicability rule.
- GIR can be recorded per hole.
- Penalties can be recorded per hole.
- The app allows score entry without forcing every optional stat on every hole.
- Saved stats are reflected in round history and the basic stats dashboard.

### Feature: Apple Watch Score Entry
**Purpose**  
Let the golfer record hole results from the watch with minimal friction.

**User action**  
The user enters score and key stats on the watch.

**System behavior**  
The watch records inputs locally or via synced round state and ensures they appear on the phone state once synchronization occurs.

**Acceptance criteria**
- The watch supports score entry for the active hole.
- The watch supports at least the MVP set of required hole fields defined for watch input.
- A watch-submitted score appears on the phone once sync completes.
- A temporary sync delay does not erase the watch entry.
- The watch flow can be completed quickly enough for between-shot or walking use.

### Feature: Hole Progression
**Purpose**  
Allow the golfer to move through the round confidently.

**User action**  
The user advances to the next hole or navigates to a different hole for review/editing.

**System behavior**  
The system maintains one authoritative active-hole state for live play while preserving access to previous hole data.

**Acceptance criteria**
- The user can advance to the next hole in one clear action.
- The system prevents ambiguous active-hole state across phone and watch.
- Prior hole data remains editable.
- Round completion is explicit and does not happen accidentally.

### Feature: Round History
**Purpose**  
Provide persistent access to past rounds.

**User action**  
The user opens the history view and selects a prior round.

**System behavior**  
The system lists saved rounds and allows drill-in to round details.

**Acceptance criteria**
- Saved rounds appear in reverse chronological order or another clear deterministic order.
- Each round record shows enough summary information to distinguish it from other rounds.
- The user can open a historical round and view hole-by-hole details.
- Historical rounds are read-safe even if later course data changes.

### Feature: Basic Stats Dashboard
**Purpose**  
Turn recorded round data into simple performance insight.

**User action**  
The user opens the stats area after completing one or more rounds.

**System behavior**  
The system computes and displays aggregate stats from saved round data.

**Acceptance criteria**
- The dashboard reflects only saved round data.
- The dashboard includes clear, basic metrics derived from MVP inputs.
- The dashboard handles sparse data without breaking or showing misleading precision.
- The user can understand what period or round set the stats represent.

### Feature: Phone ↔ Watch Sync
**Purpose**  
Keep the two product surfaces aligned during live play.

**User action**  
The user starts, updates, or resumes a round from either device.

**System behavior**  
The system synchronizes active round state, hole position, and score data with a deterministic source-of-truth policy.

**Acceptance criteria**
- Active round context appears on both devices after sync.
- A score entered on one device arrives on the other without duplication.
- Sync interruptions do not destroy saved state.
- The app has a deterministic rule for last-write handling or authoritative ownership per field.
- Resuming after temporary disconnect restores the most recent valid round state.

---

## 6. User Flows (step-by-step, end-to-end)

### Flow 1: Start Round on iPhone, Use Watch During Play
1. User opens iPhone app.
2. User selects an available course.
3. User starts a new round.
4. Round engine creates the active round and hole 1 state.
5. Phone displays hole 1 yardages and score entry controls.
6. Watch receives active round context.
7. User glances at watch for front/middle/back distances during play.
8. After finishing the hole, user enters score on watch or phone.
9. System stores hole results and syncs state.
10. User advances to the next hole.
11. Repeat until round completion.
12. User completes round.
13. Round is saved to history and becomes available to stats.

### Flow 2: Start Round on Phone, Score Entirely on Watch
1. User starts round on phone.
2. Watch becomes active round companion.
3. User uses watch as primary in-round interface for yardages.
4. User enters score/stat data on watch after each hole.
5. Sync system propagates updates back to phone.
6. Phone remains the deeper review surface.
7. Round completion persists to history.

### Flow 3: Resume Interrupted Round
1. User leaves app or temporarily loses device connectivity.
2. Active round state remains persisted.
3. User reopens phone or watch app.
4. System restores active round and active hole.
5. User continues without needing to rebuild prior entries.

### Flow 4: Review Completed Round
1. User opens round history.
2. User selects a saved round.
3. App shows round summary and hole-by-hole results.
4. User reviews score, putts, fairways, GIR, and penalties.
5. Stats dashboard updates aggregate figures using the saved round.

### Flow 5: Add New Personal Course
1. User or admin creates/imports a course.
2. System validates hole and target completeness.
3. Course is marked playable only when minimum data is present.
4. User sees the course in the selection list for future rounds.

---

## 7. Edge Cases & Constraints

### Course Data Constraints
- MVP does not guarantee global course coverage.
- A course without usable front/middle/back target data is not playable for GPS rounds.
- Course edits after rounds are saved must not corrupt historical round interpretation.

### GPS Constraints
- Outdoor signal quality varies.
- Distances must degrade gracefully when accuracy is weak.
- The app must avoid false confidence when location is stale or unavailable.

### Watch Constraints
- Watch interactions must remain extremely short.
- The watch cannot assume long text-heavy flows.
- The watch must stay useful under intermittent connectivity to the phone.

### Data Entry Constraints
- The golfer may skip optional stats on some holes.
- The user may edit prior holes later.
- Partial rounds must remain saveable and reviewable.

### Sync Constraints
- Phone and watch may both hold temporary local state.
- Conflict rules must be simple and deterministic.
- Sync failure must not silently delete score data.

### Performance Constraints
- During-round screens must be fast to open and update.
- Outdoor readability takes priority over ornamental UI complexity.
- Excessive battery drain is unacceptable during a real round.

### Product Constraints
- MVP supports personal usage and limited course coverage.
- Future premium-style features are intentionally deferred.
- Apple Watch support is required for MVP completion.

---

## 8. Open Questions & Assumptions

### Open Questions
1. What exact fairway-hit rule will the product use for non-par-4 and non-par-5 holes?
2. Will the MVP stats dashboard show lifetime metrics only, or also support a recent-round filter?
3. Will the watch allow full stat entry or score plus a reduced stat subset on first release?
4. What exact resume behavior takes precedence when phone and watch each have unsynced active-round edits?
5. How much course visualization is needed in MVP beyond numeric yardages?

### Assumptions
- One golfer account owns and uses the product primarily for personal rounds.
- Supabase remains the default backend unless a concrete implementation blocker emerges.
- Manual course entry plus admin import is enough for MVP course coverage.
- GPS target references are available at minimum for front, middle, and back of each green.
- The watch is designed for glanceable utility, not deep historical analysis.
- Shot tracking exists in the data model path but is not required to ship MVP.

---

## 9. Phased Roadmap (MVP → V1 → V2)

### MVP
Focus: complete a real round with confidence

Includes:
- course selection
- manual/admin course availability
- active round lifecycle
- hole-by-hole yardages
- front/middle/back distances
- phone score entry
- watch yardage screen
- watch score entry
- basic stat capture
- round history
- basic stats dashboard
- sync and offline tolerance

Does not include:
- shot tracking
- club averages
- AI
- strokes gained
- strategy mode

### V1
Focus: richer post-round value without breaking simplicity

Includes:
- shot tracking
- club selection per shot
- club distance averages
- better round summaries
- enhanced trend views
- stronger course admin tooling

Guardrail:
V1 must not overcomplicate the in-round workflow.

### V2
Focus: intelligent guidance and deeper performance coaching

Includes:
- strokes gained style analysis
- AI caddie recommendations
- course strategy mode
- richer coaching insights
- smarter personalized recommendations

Guardrail:
V2 intelligence must remain explainable and optional.

---

## 10. Handoff Notes for Engineering GPTs

### What engineering must build
- A native iPhone + Apple Watch product with one coherent active-round model
- Course selection based on manually available user courses
- Front/middle/back yardages for the current hole
- Phone and watch score entry
- Persistent round history
- Basic aggregate stats
- Reliable sync and offline-tolerant continuation

### What engineering must not build
- Subscription billing
- Full global course ingestion
- Social features
- Full strokes gained engine
- AI caddie features
- Advanced strategy overlays as MVP dependency
- Heavy shot-tracking workflows in MVP

### What remains open
- Final scoring field behavior details for watch UI
- Exact conflict resolution policy in dual-device edits
- Stats dashboard slice/filter depth
- Extent of map-based visualization in MVP
