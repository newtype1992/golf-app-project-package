# Project Setup

This repo is now aligned to Expo and React Native. The mobile app lives in `mobile/`.

## Requirements

- Node.js 20+
- npm
- Expo account
- Supabase account

Optional but recommended:

- `eas-cli` installed globally or used through `npx`

## First-Time Setup

```bash
cd mobile
npm install
npx expo start
```

Use Expo Go or an Android emulator for local development from Windows.

## iOS Builds from Windows

For iOS, use Expo EAS cloud builds:

```bash
cd mobile
npx eas login
npx eas build --platform ios --profile preview
```

## Environment Variables

Copy `mobile/.env.example` into a local `.env` file and provide:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Minimum Setup Definition

Setup is complete when:

- `npx expo start` runs successfully
- Android or Expo Go loads the app
- EAS login works
- the project can request foreground location permission
- Supabase credentials are available locally
