# Design Principles

This product serves one mobile surface in MVP, so the design bar is simple: the app must feel fast, readable outdoors, and low-friction during play.

## Core Rules

1. minimal taps during play
2. high contrast in sunlight
3. large touch targets
4. center yardage is the dominant number
5. score entry must be fast and forgiving
6. stale GPS state must be obvious

## During-Round Experience

- current hole should always be obvious
- front, center, and back yardages should dominate the layout
- score entry should avoid deep menus
- the user should be able to resume after interruption without confusion

## After-Round Experience

- history should be easy to scan
- stats should be clear, not over-precise
- empty states should explain what appears after the first saved round

## Anti-Patterns

- do not crowd the live screen with analytics
- do not hide scoring behind multiple modal steps
- do not use subtle colors for important state changes
- do not imply global course coverage if it does not exist
