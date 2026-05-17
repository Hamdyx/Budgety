# Budgety

A personal finance dashboard built with React, TypeScript, Ant Design, and Vite.

## Tech Stack

- **React** 19 &nbsp;·&nbsp; **TypeScript** 6
- **Ant Design** 6 &nbsp;·&nbsp; **@ant-design/icons**
- **Zustand** 5 (client state) &nbsp;·&nbsp; **TanStack React Query** 5 (server state)
- **React Router** 7 &nbsp;·&nbsp; **dayjs**
- **Vite** 8 &nbsp;·&nbsp; **Vitest** + Testing Library
- **CSS Modules** (`.module.css`) &nbsp;·&nbsp; **Yarn** 4

## Project Structure

```text
src/
├── api/            # HTTP client (JWT auth, camelCase ↔ snake_case, auto token refresh)
├── app/            # App shell (AppLayout/, Sidebar/), routing
├── components/
│   ├── AdminRoute/     # Auth guard for admin-only routes
│   ├── ComingSoon/     # Coming-soon placeholder
│   ├── ErrorBoundary/  # Top-level error boundary
│   ├── OverviewCard/   # Reusable card wrapper (wraps Ant Design Card)
│   ├── PrivateRoute/   # Auth guard for protected routes
│   ├── SectionHeader/  # Shared section title component
│   └── SuspenseLayout/ # Suspense + loading fallback wrapper
├── features/
│   ├── admin/      # Admin user management (list, delete)
│   ├── auth/       # Login, Register, Password reset flow
│   ├── bank/       # Transactions CRUD
│   ├── budget/     # Budget CRUD with month picker
│   ├── category/   # Category management
│   ├── overview/   # Dashboard with month-scoped data
│   └── settings/   # Account settings (profile, password, delete account)
├── stores/         # Zustand stores (auth, theme, currency)
├── styles/         # global.css (CSS custom properties, light/dark)
├── theme/          # Ant Design ConfigProvider theme config
└── types/          # Shared TypeScript types
```

Each component lives in its own directory with a barrel `index.ts`:

```text
BudgetCard/
├── BudgetCard.tsx
├── BudgetCard.module.css
└── index.ts          # export { default as BudgetCard } from './BudgetCard';
```

## Prerequisites

- Node.js 20+
- Corepack enabled (`corepack enable`)
- Yarn 4+

## Getting Started

```bash
yarn install
yarn dev
# → http://localhost:5173
```

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `yarn dev`        | Start Vite dev server            |
| `yarn start`      | Alias for `yarn dev`             |
| `yarn build`      | Production bundle → `dist/`      |
| `yarn preview`    | Preview production build locally |
| `yarn lint`       | Run ESLint                       |
| `yarn lint:fix`   | Run ESLint with auto-fix         |
| `yarn test`       | Run unit tests once (Vitest)     |
| `yarn test:watch` | Run tests in watch mode          |

## Path Aliases

All internal imports use the `@/` prefix:

```ts
import { BudgetCard } from '@/features/budget/components/BudgetCard';
import { OverviewCard } from '@/components/OverviewCard';
```

Configured in `tsconfig.json` and `vite.config.ts`.

## Environment Variables

Create a `.env` file at the project root:

| Variable       | Description                                    | Example                                         |
| -------------- | ---------------------------------------------- | ----------------------------------------------- |
| `VITE_API_URL` | Backend API base URL (must include `https://`) | `https://budgety-api-production.up.railway.app` |

> **Important:** `VITE_API_URL` must include the protocol (`https://`). Omitting it will cause all API requests to fail.

## Features

- **Authentication** — Login, register, logout with JWT access + refresh tokens
- **Password reset** — Forgot password → OTP verification → reset flow
- **Profile editing** — Update username, email, and preferred currency via `PATCH /auth/me`
- **Password change** — Change password in account settings with current password confirmation
- **Budget management** — Month-scoped budget items with category linking
- **Transactions** — CRUD with month filtering and category association
- **Categories** — Income/expense category management with per-category currency and budget allocation
- **Multi-currency support** — Transactions and categories each carry their own currency; values are stored in USD for aggregation and the original entry amount is preserved separately. Supported currencies: USD, EUR, GBP, JPY, CAD, AUD, CHF, EGP
- **Currency initialisation from JWT** — The active display currency is synced from the user's JWT payload on login and on every silent token refresh, with `normalizeCurrency()` as a validation guard
- **Overview dashboard** — Month-scoped summary with charts
- **Admin panel** — User list and deletion; `/admin/users` is protected by `AdminRoute` which redirects non-admin users to `/`
- **Account settings** — Profile editing (including preferred currency), password change, and account deletion
- **Light/dark theme** — Persisted via zustand + CSS custom properties
- **Automatic token refresh** — Transparent 401 retry with mutex for concurrent requests

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repo to [Vercel](https://vercel.com).
2. Set the build command to `yarn build` and the output directory to `dist`.
3. Add `VITE_API_URL` in the Vercel project environment variables.
4. Enable SPA fallback by ensuring Vercel rewrites unknown paths to `index.html`.

### Backend (Railway)

The production API runs on [Railway](https://railway.app) at `https://budgety-api-production.up.railway.app`.

### Notes

- Build artifacts are emitted to `dist/`.
- Any static host that supports SPA fallback can serve this app.
- Ensure rewrite rules route unknown paths to `index.html` for React Router.
- The backend API endpoints are documented in `AGENTS.md`.
