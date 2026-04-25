# Project Guidelines

## Agent Behavior

> These rules apply **by default** — the user should not need to ask for them.

- **Always act as a professional, expert software engineer** — write production-quality code and review every change critically before finalizing it, as if doing a senior code review.
- **Ask clarifying questions before planning or implementing** — never guess at requirements, API contracts, data shapes, or intended behavior. If anything is ambiguous, ask first.
- **Never guess API contracts** — look up the endpoint specification in this document, read the existing API/type files, or ask the user. Do not infer request/response shapes from naming alone.
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
- **API client** — `src/api/client.ts` handles JWT auth, automatic camelCase ↔ snake_case conversion, error handling via `ApiRequestError`, and **automatic token refresh** on 401 responses (uses a module-level mutex to queue concurrent retries behind a single refresh call).
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

## Testing Conventions

- Structure every test body with **`// given` / `// when` / `// then`** comments (add `// and` for additional assertions):

  ```ts
  it('deletes the transaction', async () => {
    // given
    renderWithProviders(<TransactionRow {...props} />);

    // when
    await userEvent.click(screen.getByRole('button', { name: /delete/i }));

    // then
    await waitFor(() => {
      expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
    });
  });
  ```

- Use **Testing Library queries** (`screen.getByRole`, `getByText`, `findByRole`) — avoid `container.querySelector` unless no accessible query exists.
- **Prefer `userEvent`** over `fireEvent` for user interactions.
- **Use `renderWithProviders`** from `@/tests/render` — it wraps QueryClient, MemoryRouter, ConfigProvider, and App context.

## Conventions

- **Naming**: PascalCase for components/types, camelCase for variables/functions and CSS class names.
- **No acronyms in variable or function names** — use full descriptive names. Never use `trx`, `cat`, `t`, `c`, `tx`, `ctx`, or similar shorthands as identifiers. API field names (e.g. `trxDate`, `categoryId`) are kept as-is in type definitions since they reflect the backend contract.
- **One component per file** — file name matches the default export.
- **Barrel files** — every component directory has an `index.ts` with a named re-export. No default re-export from barrels.
- **Prefer composition** — wrap Ant Design components (like `OverviewCard` wraps `Card`) instead of duplicating props/styles.
- **Meaningful iterator names** — use full, descriptive names in array/object callbacks: `categories.map(category => ...)` not `categories.map(cat => ...)`, `transactions.filter(transaction => ...)` not `transactions.filter(t => ...)`.
- **No `!important`** — fix specificity at the source instead.
- **Keep stores pure** — async side effects belong in query/mutation hooks, not in zustand stores.
- **Query keys** — use consistent, descriptive arrays (e.g. `['transactions']`, `['categories']`, `['budget', month]`, `['admin', 'users']`). Month-scoped queries include a `YYYY-MM` string. Invalidate related keys on mutation success.

## API Endpoints

The frontend consumes the following backend endpoints:

- **Auth**: `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh`, `POST /auth/forgot-password`, `POST /auth/verify-reset-otp`, `POST /auth/reset-password`, `PATCH /auth/me`, `POST /auth/change-password`, `DELETE /auth/me`
- **Categories**: `GET /categories`, `POST /categories`, `GET /categories/:id`, `PATCH /categories/:id`, `DELETE /categories/:id`, `GET /categories/summary`
- **Budget**: `GET /budget?month=YYYY-MM`, `POST /budget`, `DELETE /budget/:id`
- **Transactions**: `GET /transactions?month=YYYY-MM`, `POST /transactions`, `GET /transactions/:id`, `PATCH /transactions/:id`, `DELETE /transactions/:id`
- **Admin**: `GET /admin/users`, `DELETE /admin/users/:id`

## Routes

- `/login`, `/register` — public auth pages
- `/forgot-password`, `/verify-otp`, `/reset-password` — password reset flow (state passed via `react-router-dom` location state)
- `/` — Overview (redirects to login if unauthenticated)
- `/budget` — Budget management
- `/bank` — Bank / transactions
- `/scheduler` — Scheduler (coming soon)
- `/settings` — Account settings (delete account)
- `/admin/users` — Admin user management (visible only to `isAdmin` users)

## Types

Key types in `src/types/types.ts`:

- `User` — `id`, `email`, `username`, `isAdmin`, `currency?: string`
- `Category` — `id`, `name`, `type`, `budget`
- `Transaction` — `id`, `title`, `value`, `type`, `trxDate`, `categoryId`, `status?`, `isRecurring?`, `recurrenceRule?`
- `BudgetItem` — `id`, `categoryId`, `actual`, `month`
- `UpdateProfileRequest` — `username?: string`, `email?: string`, `currency?: string`
- `ChangePasswordRequest` — `currentPassword: string`, `newPassword: string`
- `ResetPasswordRequest` — `token: string`, `password: string` (field is `password`, not `newPassword`)

## Feature Folders

- `src/features/auth/` — login, register, password reset flow
- `src/features/budget/` — budget CRUD with month picker
- `src/features/category/` — category CRUD
- `src/features/overview/` — dashboard with month-scoped data
- `src/features/bank/` — transactions
- `src/features/scheduler/` — coming soon placeholder
- `src/features/settings/` — account deletion
- `src/features/admin/` — admin user management (list, delete)
