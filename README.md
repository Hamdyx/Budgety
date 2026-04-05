# Budgety

A personal finance dashboard built with React, Redux Toolkit, Ant Design, and Vite.

## Tech Stack

- **React** 19 &nbsp;·&nbsp; **TypeScript** 6
- **Ant Design** 6 &nbsp;·&nbsp; **@ant-design/icons**
- **Redux Toolkit** 2 &nbsp;·&nbsp; **React Router** 7
- **Vite** 8 &nbsp;·&nbsp; **Vitest** + Testing Library
- **CSS Modules** (`.module.css`) &nbsp;·&nbsp; **dayjs**
- **Yarn** 4

## Project Structure

```text
src/
├── app/            # App shell (Sidebar) and Redux store
├── assets/         # Icons and static assets
├── components/
│   ├── charts/     # BarChart, DoughnutChart, LineChart
│   └── common/     # OverviewCard, SectionHeader, ComingSoon
├── features/
│   ├── bank/
│   ├── budget/
│   ├── category/
│   ├── investment/
│   ├── overview/
│   └── scheduler/
├── styles/         # global.css (CSS custom properties)
├── theme/          # Ant Design ConfigProvider theme config
└── types/          # Shared TypeScript types
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
import { Budget } from '@/features/budget/components/Budget';
import { OverviewCard } from '@/components/common/OverviewCard';
```

Configured in `tsconfig.json` and `vite.config.ts`.

- Prefer latest stable versions, and re-run build/tests after upgrades.
- Use Yarn lockfile as the source of truth for reproducible installs.

## Deployment Notes

- Build artifacts are emitted to `dist/`.
- Any static host that supports SPA fallback can serve this app.
- Ensure rewrite rules route unknown paths to `index.html` for React Router.
