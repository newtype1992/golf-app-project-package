# Project Setup

This repository is now organized for implementation, but it does not yet contain a generated Xcode project. Because this machine is not running macOS/Xcode, the Apple app targets cannot be created or verified here.

## Build environment

Use a macOS machine for actual app setup with:

- Xcode 16 or the latest stable release with current iOS and watchOS SDKs
- a valid Apple Developer account for device signing and watch testing
- Git
- a Supabase project for backend configuration

## Recommended project shape

Create one Apple-platform workspace with:

1. an iPhone app target in `apps/ios/`
2. a watchOS app target in `apps/watchos/`
3. a shared Swift package in `packages/GolfCore/`

Keep shared business logic in `GolfCore`, not duplicated across phone and watch targets.

## Recommended first setup sequence on macOS

1. Create a new Xcode project for the iPhone app.
2. Add the Apple Watch app target to the same project.
3. Point phone-specific code into `apps/ios/`.
4. Point watch-specific code into `apps/watchos/`.
5. Create a local Swift package at `packages/GolfCore/`.
6. Add `GolfCore` as a dependency of both app targets.
7. Add `supabase-swift` through Swift Package Manager.
8. Configure app groups or shared container strategy only if the chosen sync design requires it.
9. Add signing, bundle identifiers, and environment configuration.
10. Create baseline test targets for `GolfCore`, phone flows, and watch sync flows.

## Minimum engineering decisions to make before coding UI

These decisions should be written down first:

- active round data model
- playable course definition
- hole score schema
- phone/watch sync conflict policy
- offline persistence strategy
- stale GPS presentation rules

## Dependencies to keep minimal in MVP

Required native frameworks:

- SwiftUI
- CoreLocation
- MapKit
- WatchConnectivity

Preferred external dependency:

- `supabase-swift`

Avoid adding analytics, image, or architecture libraries until the shared model and round flow are working.

## Definition of setup complete

Setup is complete when:

- the Xcode project builds for iPhone and Apple Watch
- both targets depend on `GolfCore`
- one shared active-round model exists
- Supabase environment values are wired
- at least one unit test target and one acceptance-test plan exist
