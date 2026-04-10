# Project Structure

This repo is now split into documentation, the Expo mobile app, backend assets, and tracking docs.

## Root

- `README.md`
- `context.md`
- `architecture.md`
- `design-principles.md`
- `agents.md`
- `PROJECT_SETUP.md`
- `PROJECT_STRUCTURE.md`

## Mobile App

`mobile/` contains the Expo Router app.

Key folders:

- `mobile/app/`: route files
- `mobile/components/`: UI building blocks
- `mobile/services/`: domain logic
- `mobile/assets/`: images and icons

Service modules:

- `course`
- `gps`
- `roundEngine`
- `scoring`
- `stats`
- `sync`

## Backend

`backend/supabase/` contains:

- `migrations/`
- `seeds/`
- `imports/`

## Tracking

`tracking/` contains:

- `ROADMAP.md`
- `STATUS.md`
- sprint-specific checklists
