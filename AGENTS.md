# Project Guidelines

## Agent Behavior

> These rules apply **by default** — the user should not need to ask for them.

- **Always follow best practices and clean code principles** — write production-quality code as a professional software engineer would.
- **Verify library API usage** — before using any component or hook from Ant Design (`antd@6`), React Router (`react-router-dom@7`), TanStack Query (`@tanstack/react-query@5`), or zustand (`zustand@5`), confirm the props/API are current for the installed version. **Do not use deprecated props, hooks, or patterns.** When uncertain, check the library's latest docs.
- **Run `yarn lint && yarn build && yarn test`** after every change set to catch regressions.
- **Prefer small, focused changes** — avoid unrelated refactors, unnecessary abstractions, or speculative features.
- **Read before writing** — understand the existing code, conventions, and file structure before modifying anything.

## Code Style

- **TypeScript strict mode** — avoid `any` and type assertions unless genuinely unavoidable.
- **Functional components only** — no class components.
- **CSS Modules** (`.module.css`) for component-scoped styles. Never use inline styles.
- **CSS custom properties** in `src/styles/global.css` for shared design tokens (colors, spacing, theme-aware values).
- **Import order** enforced by ESLint `import/order`:
  1. Type imports
  2. Built-in / external packages
  3. Internal (`@/…`)
  4. Parent / sibling
  5. CSS module imports (last, separated by blank line)
- **All internal imports use `@/` prefix** — never bare folder aliases.

## Architecture

- **Feature-based folders** under `src/features/<feature>/` — colocate components, hooks, API functions, styles, and tests.
- **Component directories** — each component lives in its own folder (`ComponentName/ComponentName.tsx`) with a barrel file (`index.ts`) that re-exports as a named export:
  ```ts
  // ComponentName/index.ts
  export { default as ComponentName } from './ComponentName';
  ```
  Consumers import via the directory: `import { ComponentName } from '../ComponentName';`
- **Shared UI** goes in `src/components/` (e.g. `OverviewCard`, `SectionHeader`, `ComingSoon`, `SuspenseLayout`).
- **Chart components** in `src/components/charts/`.
- **Zustand** for client state — stores in `src/stores/` (auth, theme). Keep stores minimal and focused.
- **TanStack React Query** for server state — queries and mutations in per-feature `hooks.ts` files. Invalidate related queries on mutation success.
- **Ant Design 6** for all UI primitives — use `ConfigProvider` theme tokens in `src/theme/themeConfig.ts` for global visual consistency; use CSS Modules for layout and positioning.
- **Light/dark theme** — `src/stores/themeStore.ts` (zustand with persist), `src/theme/ThemeProvider.tsx` sets `data-theme` attribute on `<html>`, CSS variables in `src/styles/global.css` respond to `[data-theme="dark"]`.
- **API client** — `src/api/client.ts` handles JWT auth, automatic camelCase ↔ snake_case conversion, and error handling via `ApiRequestError`.
- **Route-level code splitting** via `React.lazy` + `Suspense`. Lazy imports point directly at the source file (not the barrel) since `React.lazy` requires a default export.

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
- **Barrel files** — every component directory has an `index.ts` with a named re-export. No default re-export from barrels.
- **Prefer composition** — wrap Ant Design components (like `OverviewCard` wraps `Card`) instead of duplicating props/styles.
- **No `!important`** — fix specificity at the source instead.
- **Keep stores pure** — async side effects belong in query/mutation hooks, not in zustand stores.
- **Query keys** — use consistent, descriptive arrays (e.g. `['transactions']`, `['categories']`). Invalidate related keys on mutation success.
