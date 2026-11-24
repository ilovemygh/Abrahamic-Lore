# Autonomous Agent Feature Map: abrahamic-lore

## Overview
Sacred comparative timeline, interactive multi-tradition matrix, and lineage visualizer across Abrahamic history (Judaism, Christianity, Islam).

## Feature Architecture & Status

| Module | Route / Component | Status | Key Capabilities |
|---|---|---|---|
| **Styling & Theme** | `postcss.config.mjs`, `globals.css` | Done | Tailwind CSS v4 via `@tailwindcss/postcss`, custom Stone design system with tradition color accents. |
| **Icon System** | `public/assets/icons/`, `Icon.tsx`, `ICONS.md` | Done | 16 custom SVG icons rendered via CSS masks (`currentColor`). 100% emoji-free UI. |
| **Homepage** | `/` (`src/app/page.tsx`) | Done | Editorial reading path, direct links to the pilot name index, comparisons, and topic catalogue. |
| **Traditions** | `/traditions` (`src/app/traditions/page.tsx`) | Done | In-depth comparative overview of Judaism, Christianity, and Islam core tenets, scripture, and shared heritage. |
| **Topics Catalog** | `/topics` (`src/app/topics/page.tsx`) | Done | Category-filtered catalog (Theology, History, Figures, Narratives, Practices, Places). |
| **Topic Deep Dive** | `/topics/[slug]` (`src/app/topics/[slug]/page.tsx`) | Done | Historical context, canonical scripture passages, and comparative takeaways. |
| **Interactive Compare** | `/compare/[slug]` (`src/app/compare/[slug]/page.tsx`) | Done | Three-way comparative matrix with tradition toggles, real-time keyword highlight, Points of Convergence, and Points of Divergence. |
| **Timeline & Lineage** | `/timeline` (`src/app/timeline/page.tsx`) | Done | Interactive chronological timeline (Ancient to Modern) and recursive Abrahamic prophetic genealogical tree. |
| **Instant Search** | `/search` (`src/app/search/page.tsx`) | Done | Search query links, keyboard shortcut, ranked results across profiles, source locations, topics, and comparisons. |
| **Names & Figures Pilot** | `/characters`, `/characters/[slug]` | Pilot | Search and tradition filter, distinct profiles, source references, ambiguous-name guidance, correction links, and attributed relationship claims. Profiles are marked as editorial review candidates and excluded from indexing until reviewed. |
| **Name Catalogue API** | `/api/v1/names`, `/api/v1/search`, `/api/v1/resolve` | Pilot | Versioned list/detail/search/resolve responses with validation, explicit ambiguity, and cursor pagination over the seeded pilot data. |
| **Editorial Approach** | `/sources` (`src/app/sources/page.tsx`) | Done | Explains source handling, identity claims, and pilot review status. |
| **Correction Intake** | `/feedback` (`src/app/feedback/page.tsx`) | Pilot | Pre-fills a GitHub Issue for manual review; the site does not store or submit the suggestion. |
| **Auth & Preferences**| `/login`, `/register`, `usePreferences.ts` | Done | Supabase auth integration ready with local guest preference migration. |

## Verification Checklist (Self-Checking)
1. **Next.js Production Build**:
   ```powershell
   $env:Path = "C:\Users\mimin\AppData\Local\node-v22.14.0-win-x64;$env:Path"; npm run build
   ```
   Must exit with code 0.
2. **Zero Emojis Validation**:
   All UI glyphs must be custom SVGs rendered through `src/components/ui/Icon.tsx` and documented in `ICONS.md`.
3. **Dual Branch Sync**:
   The repository's agent instructions require pushing to both `origin/master` and `origin/main`.
4. **Vercel Deployment**:
   A push to the configured Vercel production branch triggers deployment when the Git integration is enabled.
