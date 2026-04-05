# Project Guidelines

## Code Style

- **TypeScript strict mode** — no `any`, no type assertions unless unavoidable.
- **Functional components only** — no class components.
- **CSS Modules** (`.module.css`) for component-scoped styles. Never use inline styles.
- **CSS custom properties** in `src/styles/global.css` for shared design tokens (colors, spacing).
- **Import order** enforced by ESLint `import/order`:
  1. Type imports
  2. Built-in / external packages
  3. Internal (`@/…`)
  4. Parent / sibling
  5. CSS module imports (last, separated by blank line)
- **All internal imports use `@/` prefix** — never bare folder aliases.

## Architecture

- **Feature-based folders** under `src/features/<feature>/` — colocate components, slices, styles, and tests.
- **Shared UI** goes in `src/components/common/` (e.g. `OverviewCard`, `SectionHeader`, `ComingSoon`).
- **Chart components** in `src/components/charts/`.
- **Redux Toolkit** for state — one slice per feature with entity adapters where appropriate.
- **Ant Design** for all UI primitives — use `ConfigProvider` theme tokens in `src/theme/themeConfig.ts` for global visual consistency; use CSS Modules for layout and positioning.
- **Route-level code splitting** via `React.lazy` + `Suspense`.

## Build and Test

```bash
yarn dev          # local dev server
yarn build        # production build (must pass with 0 errors)
yarn lint         # ESLint check (must pass with 0 errors/warnings)
yarn lint:fix     # ESLint auto-fix
yarn test         # Vitest — run once
yarn test:watch   # Vitest — watch mode
```

Before committing: `yarn lint && yarn build && yarn test`.

## Conventions

- **Naming**: PascalCase for components/types, camelCase for variables/functions and CSS class names.
- **One component per file** — file name matches the default export.
- **Prefer composition** — wrap Ant Design components (like `OverviewCard` wraps `Card`) instead of duplicating props/styles.
- **No `!important`** — fix specificity at the source instead.
- **Keep slices pure** — async side effects belong in thunks, not reducers.
- **Typed hooks** — use `useAppSelector` / `useAppDispatch` from `src/app/store.ts`.
