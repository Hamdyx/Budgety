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
├── api/            # HTTP client (JWT auth, camelCase ↔ snake_case)
├── app/            # App shell (App/, AppLayout/, Sidebar/), routing
├── assets/         # Icons and static assets
├── components/
│   ├── charts/     # BarChart, DoughnutChart, LineChart
│   └── common/     # OverviewCard/, SectionHeader/, ComingSoon/, PrivateRoute/
├── features/
│   ├── auth/       # Login, Register, JWT auth hooks
│   ├── bank/       # Bank page (coming soon)
│   ├── budget/     # Transactions CRUD, budget cards
│   ├── category/   # Category management
│   ├── investment/ # Crypto portfolio tracker
│   ├── overview/   # Dashboard home
│   └── scheduler/  # Scheduler (coming soon)
├── stores/         # Zustand stores (auth, theme)
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
import { OverviewCard } from '@/components/common/OverviewCard';
```

Configured in `tsconfig.json` and `vite.config.ts`.

## Environment Variables

| Variable       | Description          |
| -------------- | -------------------- |
| `VITE_API_URL` | Backend API base URL |

## Deployment Notes

- Build artifacts are emitted to `dist/`.
- Any static host that supports SPA fallback can serve this app.
- Ensure rewrite rules route unknown paths to `index.html` for React Router.
