# Design Principles

This document defines the UX, interaction, and interface behavior rules for the golf app across iPhone and Apple Watch. It is intentionally product-focused rather than visual-spec heavy.

The design standard is simple:

> During a round, the app must feel fast, obvious, and dependable outdoors.  
> After a round, the app must feel organized, informative, and motivating.

---

## 1. Core Experience Thesis

### During round = tool
The interface exists to reduce friction. The user is outside, moving, and focused on golf rather than app interaction.

### After round = coach
The interface helps the user understand performance with simple, trustworthy summaries and history.

These two modes must feel related but not identical.

---

## 2. Product Surface Roles

### iPhone
The phone is the **deeper control surface**.

It is best for:
- course selection
- starting rounds
- editing detailed scores
- reviewing history
- viewing stats
- course management/admin tasks

### Apple Watch
The watch is the **glanceable utility surface**.

It is best for:
- front / middle / back distances
- quick score entry
- simple progress through the current round
- rapid confirmation of current-hole state

The watch must not feel like a small copy of the phone.

---

## 3. Primary Design Rules

1. **Minimal taps during play**
2. **High contrast for outdoor visibility**
3. **Large touch targets**
4. **Fast watch interactions**
5. **One clear current action per screen**
6. **Clear distinction between live data and stale/fallback data**
7. **Low cognitive load while walking or standing over the ball**

---

## 4. Interaction Principles for During-Round Use

### Prioritize the current hole
Every live-play screen must make the current hole obvious.

### Show the most useful numbers first
Front / middle / back yardages are the primary value and must dominate hierarchy.

### Minimize decision branching
Avoid forcing the golfer through menus while playing.

### Allow fast correction
Score entry mistakes must be fixable without a long detour.

### Respect interruption
The user may lock the phone, lower the watch, or switch devices. Resuming must feel effortless.

---

## 5. Outdoor Readability Rules

### Contrast
Use strong contrast between foreground and background. Outdoor sunlight reduces legibility.

### Typography
Favor larger sizes and stronger weight for core values, especially yardages and score.

### Density
Do not crowd during-round screens. White space is functional.

### State visibility
Fresh vs stale yardage, synced vs pending score, and active vs completed hole states must be visually distinguishable.

### Motion and animation
Use restrained motion. Animation must not obscure current utility or delay interaction.

---

## 6. Touch Target Rules

### iPhone
Touch targets must support quick thumb interaction while standing or walking.

### Watch
Controls must be easy to hit on a small screen with limited precision.

### Global rule
Never trade compactness for tap accuracy during live play.

---

## 7. Apple Watch Design Principles

### Glanceability first
The user should understand the current hole and yardages almost instantly.

### One-screen usefulness
The primary watch screen should provide useful value without further navigation.

### Short actions only
Watch tasks must be finishable in very little time.

### Avoid deep forms
The watch should not require a long sequence of confirmations or nested options to complete a hole entry.

### Resilient state
If the watch reconnects after interruption, it must land the user back in a sensible active-round context.

---

## 8. iPhone Design Principles

### Deep control without clutter
The phone can expose more detail, but the active-round screen must still stay focused.

### Strong screen purpose
Each screen should answer a specific need:
- choose a course
- play a hole
- enter/edit score
- review round
- review stats

### Manage complexity by phase
Future-phase premium features must not shape the MVP layout prematurely.

---

## 9. Information Hierarchy by Surface

### iPhone active round screen
Priority order:
1. current hole
2. front / middle / back distances
3. score entry / current hole summary
4. next-hole progression
5. secondary controls

### Watch active round screen
Priority order:
1. hole number
2. front / middle / back distances
3. quick score action
4. simple navigation if needed

### History screen
Priority order:
1. round identity
2. total score summary
3. date / course context
4. drill-in access

### Stats dashboard
Priority order:
1. understandable top-line metrics
2. useful trends or rollups
3. round access for context

---

## 10. Error and Fallback UX Principles

### GPS fallback
If live location quality drops, the app must avoid pretending the number is fully current.

### Sync fallback
If watch and phone are temporarily out of sync, the user must not feel that data vanished.

### Sparse data fallback
If the user has limited history, stats views should stay useful and not feel empty in a broken way.

### Incomplete course fallback
If a course lacks required data, the product must block play cleanly rather than fail mid-round.

---

## 11. Score Entry Design Rules

### Fast by default
The most common score entry path must be quick.

### Editable without punishment
Users must be able to revise a hole later without re-entering the whole round.

### Optional stats stay optional
Do not force the golfer to complete every stat field to save a hole.

### Clear save confidence
The user should be able to tell whether the hole entry is captured.

---

## 12. Navigation Rules

### During round
Navigation must stay shallow.

### After round
More exploration is acceptable, but structure must remain obvious.

### Cross-surface continuity
The phone and watch should feel like the same product with different responsibilities.

### Back-navigation avoidance
Do not rely on long back-stack chains during active play.

---

## 13. Content Rules

### Labels
Use plain golf language that a regular golfer understands.

### Numbers
Display the most important numbers prominently and consistently.

### Explanations
Keep during-round copy extremely short.

### Empty states
Empty history and stats states should explain what becomes available after the first round.

---

## 14. MVP Visual Behavior Guidelines

Even without specifying full UI styling, the product should feel:
- premium
- calm
- intentional
- confident

This comes from:
- clean hierarchy
- consistent spacing
- decisive typography
- limited on-screen clutter
- stable interaction patterns

Not from:
- excessive decoration
- flashy animations
- overloaded dashboards

---

## 15. Accessibility Considerations

The app must support practical accessibility needs for outdoor and motion use:
- strong contrast
- readable type sizes
- screen-reader-friendly structure where feasible
- clear control labeling
- non-color-only state differences

Accessibility is especially important because real-world use happens in variable light and with divided attention.

---

## 16. Design Anti-Patterns to Avoid

Do not:
- crowd the live yardage screen with analytics
- put secondary stats above primary yardages
- mirror the full phone experience onto the watch
- hide score entry behind multiple menus
- rely on subtle visual differences for important states
- overpromise unavailable course data
- force heavy post-round concepts into MVP live-play screens

---

## 17. Experience Benchmarks for MVP

A strong MVP experience means:

### On iPhone
- user can start a round quickly
- yardages are easy to read
- score entry feels obvious
- history and stats are understandable

### On Apple Watch
- user can get yardages almost instantly
- user can enter score fast enough to not disrupt pace
- user can trust that the active hole is correct
- reconnect/resume behavior is unsurprising

### Across both
- the product feels coherent
- the app reduces friction instead of adding it
- the user trusts it enough to bring it to a real round

---

## 18. Final Design Instruction

When choosing between feature richness and live usability, choose live usability.

A golfer in motion, outdoors, between shots, on a bright day, with only a few seconds of attention, is the design baseline for MVP.
