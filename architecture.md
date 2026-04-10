# Architecture Guide

This project uses a three-layer architecture:

1. Expo mobile app
2. service layer
3. Supabase backend

## Mobile App

The Expo Router app is responsible for:

- screen rendering
- location permission requests
- active round interaction
- offline state storage

## Service Layer

The service layer isolates business logic into domain folders:

- `course`
- `gps`
- `roundEngine`
- `scoring`
- `stats`
- `sync`

These modules should stay framework-light so round logic can be tested without UI code.

## Backend

Supabase handles:

- authentication
- persistent storage
- row-level security
- round and history synchronization

## Core Architecture Rules

1. Round state is the critical product object.
2. GPS is an input service, not the owner of score state.
3. Course validity must be checked before a round starts.
4. Offline continuation is mandatory.
5. Stats must derive from saved round data only.

## Suggested Folder Structure

```text
mobile/
  app/
  components/
  services/
    course/
    gps/
    roundEngine/
    scoring/
    stats/
    sync/

backend/
  supabase/
```

## Core Entities

- `users`
- `courses`
- `holes`
- `rounds`
- `hole_scores`
- `shots` as a future feature

## Round Engine Lifecycle

Round start:

1. user selects a course
2. round record is created
3. current hole becomes `1`

Hole completion:

1. score is saved
2. totals update
3. next hole becomes active

Round completion:

1. final hole is saved
2. round status becomes `completed`
3. stats are recalculated from persisted round data

## Offline Strategy

The app must cache:

- course data
- active round state
- hole scores

When connectivity returns, sync should reconcile local round data with Supabase without silently discarding entries.
