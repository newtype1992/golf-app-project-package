# Execution Status

Current sprint: `Sprint 1`

## Sprint summary

| Sprint | Status | Outcome |
|---|---|---|
| Sprint 0 | Completed | Expo scaffold, docs, and build verification |
| Sprint 1 | In progress | Course data and GPS |
| Sprint 2 | Not started | Round engine and scoring |
| Sprint 3 | Not started | History, stats, and sync |
| Sprint 4 | Not started | Build hardening and release prep |

## Completed so far

- Realigned the repo around Path B.
- Scaffolded the Expo app in `mobile/`.
- Installed core GPS and backend dependencies.
- Replaced Apple and watch-specific planning docs with Expo-specific docs.
- Added an Expo course catalog service and playable-course validation.
- Wired the Play screen to foreground location permission with live GPS fallback handling.
- Added a Supabase client, backend course repository, and SQL course schema contract.
- Verified `npm run typecheck`, `npm run lint`, and web export.

## Next checkpoint

Sprint 1 closes when:

- playable courses load from a real data source
- yardages update from live device location
- invalid course data is blocked cleanly
- stale GPS handling is explicit in the live round UI
