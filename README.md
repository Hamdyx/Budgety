# Budgety

Budgety is a personal finance dashboard built with React, Redux Toolkit, Ant Design, Bootstrap, and Vite.

## Tech Stack

- React 19
- React Router 7
- Redux Toolkit 2
- Vite 8
- Vitest + Testing Library
- Sass (SCSS)
- Yarn 4

## Project Structure

- `src/app`: app shell and Redux store
- `src/features`: domain features (`budget`, `category`, `investment`)
- `src/Components`: reusable UI and pages
- `src/style`: global Sass styles
- `public`: static assets

## Prerequisites

- Node.js 20+
- Corepack enabled (`corepack enable`)
- Yarn 4+

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Start the dev server:

```bash
yarn dev
```

3. Open:

```text
http://localhost:5173
```

## Scripts

- `yarn dev`: Run Vite dev server
- `yarn start`: Alias for `yarn dev`
- `yarn build`: Create production bundle in `dist/`
- `yarn preview`: Preview production build locally
- `yarn test`: Run unit tests once with Vitest
- `yarn test:watch`: Run tests in watch mode

## Common Workflow

1. Create a feature branch from `development`.
2. Run `yarn install` after pulling latest changes.
3. Build features inside `src/features/<feature-name>`.
4. Reuse or add shared UI in `src/Components`.
5. Run `yarn test` and `yarn build` before opening a PR.

## Best Practices

### Architecture

- Keep feature logic in feature folders and UI concerns in presentational components.
- Prefer colocating feature-specific state/actions/selectors in the relevant slice.
- Keep route-level code split points in the top app router.

### Performance

- Use route and component lazy loading for heavy screens/cards.
- Avoid importing large modules globally when they can be loaded on-demand.
- Monitor bundle size after major dependency updates.

### Styling

- Use Sass modules (`@use`) over legacy `@import`.
- Keep global styles minimal and feature/component styles localized.
- Avoid deep selector chains when a class-level style is enough.

### State Management

- Use typed selectors and dispatch helpers from the store.
- Keep async side effects in thunks and reducers pure.
- Keep entity IDs normalized and consistent across selectors/actions.

### Testing

- Test behavior, not implementation details.
- Mock heavy route dependencies in fast unit tests where needed.
- Keep test setup centralized in `src/setupTests.js`.

### Dependency Hygiene

- Keep runtime deps in `dependencies` and tooling/types/tests in `devDependencies`.
- Prefer latest stable versions, and re-run build/tests after upgrades.
- Use Yarn lockfile as the source of truth for reproducible installs.

## Deployment Notes

- Build artifacts are emitted to `dist/`.
- Any static host that supports SPA fallback can serve this app.
- Ensure rewrite rules route unknown paths to `index.html` for React Router.
