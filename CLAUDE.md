# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local development server
npm run build    # Production build
npm run start    # Run production server
```

No test runner or lint script is configured in package.json. TypeScript type checking can be run with:

```bash
npx tsc --noEmit
```

## Architecture Overview

This is a **Next.js 15 App Router** project for a Colombian law firm. It serves three distinct user segments:

1. **Public website** — marketing pages for legal services, contact form
2. **Admin panel** (`/admin/*`) — case management, client management, scheduling, exports
3. **Client portal** (`/cliente/*`, `/portal/*`, `/panel/*`) — clients view their own case updates and appointments

### Authentication & Authorization

- **Supabase Auth** handles authentication. Two Supabase clients exist:
  - `lib/supabase-server.ts` — server-side (used in Server Components and API routes)
  - `lib/supabase-browser.ts` — client-side browser singleton
- **`middleware.ts`** protects `/admin/*`, `/cliente/*`, `/portal/*`, `/panel/*` — unauthenticated requests redirect to `/cliente/login`
- **Role-based access**: `profiles` table stores roles. `requireAdmin()` (in `lib/supabase-server.ts`) is used by all `/api/admin/*` routes to enforce admin access at the API level
- **Row-Level Security (RLS)** is enforced in Supabase — clients can only access their own rows

### API Routes (`app/api/`)

All admin API routes call `requireAdmin()` before processing. Key route groups:
- `/api/admin/workspace` — aggregated GET/POST for the admin dashboard
- `/api/admin/clients` — client CRUD
- `/api/admin/invite-client` — sends portal invitations via Resend
- `/api/admin/export` — generates Excel exports (ExcelJS)
- `/api/client/link-profile` — links auth user to their `client_profiles` row
- `/api/contact` — contact form emails via Resend

### Key Libraries

| Purpose | Library |
|---|---|
| Database + Auth | `@supabase/supabase-js`, `@supabase/ssr` |
| Email | `resend` |
| Validation | `zod` |
| Excel export/import | `exceljs`, `xlsx` |
| Styling | Tailwind CSS with CSS variable tokens |

### Tailwind Design System

Custom tokens are defined as CSS variables in `globals.css` and mapped in `tailwind.config.js`:
- Background layers: `canvas`, `surface`, `panel`, `card`
- Text/borders: `ink`, `muted`, `border`, `subtle`
- Brand: `accent` variants
- Fonts: Inter (sans) + Source Serif 4 (headings via `font-heading`)

### Database Migrations

Supabase migrations live in `supabase/migrations/`. Schema covers: `profiles`, `client_profiles`, `client_case_updates`, `appointments`, `service_areas`.

### Environment Variables

Required in `.env.local` (see `.env.local.example`):
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public Supabase credentials
- `SUPABASE_SERVICE_ROLE_KEY` — server-only admin key
- `RESEND_API_KEY` — email sending
- `ADMIN_OWNER_EMAIL`, `TIMEZONE`, `CONSULT_DURATION_MIN` — app configuration
