# OmniFate

OmniFate is a full-stack Vietnamese fate analysis application integrating 5 esoteric systems — Western Numerology, Western Astrology, Zi Wei Dou Shu (Tử Vi), Ba Zi Four Pillars (Bát Tự), and Human Design — powered by Gemini AI.

## Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Motion
- **Backend:** Express, Gemini AI API
- **Auth/Database:** Firebase Authentication, Firestore
- **Runtime:** Node.js, tsx (dev), esbuild + Node (prod)

## Structure

```
src/
  pages/            # route-level components (LoginPage, DashboardPage)
  features/         # domain feature components per esoteric system
  layout/           # shell components (Header, Footer, TabNavigation, etc.)
  ui/               # primitive components (MarkdownRenderer, LoadingSpinner, ErrorBlock)
  api/              # API client layer (fate-analysis, numerology-part)
  computation/      # client-side calculations per system
  types/            # TypeScript types per domain
  constants/        # shared constants (zodiac, loading messages)
  hooks/            # React hooks
  lib/              # Firebase init + fallback texts
  print/            # Print dossier component
server/
  index.ts          # entry: Express setup, Vite/static serving
  routes/           # API route handlers
  ai/               # Gemini client, prompts, response schemas
```

## Development

```bash
npm install
npm run dev
```

Requires `GEMINI_API_KEY` set via environment variable or `.env` file.

## Build

```bash
npm run build     # builds client (vite) + server (esbuild)
npm start         # runs dist/server.cjs
```
