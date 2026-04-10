# Golf GPS & Performance App

A mobile-first golf GPS, scoring, and analytics application built with React Native and Expo. The product is optimized for Windows-friendly development, uses Supabase for backend services, and focuses on the practical features a golfer actually uses during and after a round.

The app has two modes:

- during the round: a fast GPS and scoring tool
- after the round: a stats dashboard that helps the golfer improve

## MVP Features

- front, center, and back green yardages
- hole-by-hole scoring
- round tracking and hole progression
- round history
- basic performance statistics
- offline-tolerant round play

## Deferred Features

These are intentionally not MVP:

- shot tracking
- club distance averages
- round visual summaries
- club dispersion maps
- AI club recommendations
- course strategy mode
- wearables

## Technology Stack

Mobile:

- React Native
- Expo
- Expo Router
- `expo-location`
- `react-native-maps`
- `geolib`

Backend:

- Supabase
- PostgreSQL
- row-level security

Build and release:

- Expo EAS Build

## Development Constraint

This project is designed to be buildable from Windows. Native iOS compilation is handled through Expo EAS cloud builds instead of a local Xcode workflow.

## Repository Guide

- `context.md`: product vision, scope, and flows
- `architecture.md`: system layout and module boundaries
- `design-principles.md`: UX rules for outdoor mobile use
- `agents.md`: AI-assisted delivery roles
- `PROJECT_SETUP.md`: practical Expo and EAS setup steps
- `PROJECT_STRUCTURE.md`: repo layout
- `mobile/`: Expo Router app
- `backend/`: Supabase assets
- `tracking/`: roadmap and sprint tracking

## Local Setup

```bash
cd mobile
npm install
npx expo start
```

## Cloud Builds

```bash
cd mobile
npx eas build --platform ios --profile preview
npx eas build --platform android --profile preview
```

## Roadmap Summary

- Sprint 0: Expo foundation and repo alignment
- Sprint 1: course data and GPS yardages
- Sprint 2: round engine and scoring
- Sprint 3: history, stats, and sync
- Sprint 4: EAS build hardening and release prep
