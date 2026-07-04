import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { getThemeConfig } from '@/theme/themeConfig';

import { routeConfig } from './routes';

function renderRoutes(initialEntries: string[]) {
  const router = createMemoryRouter(routeConfig, { initialEntries });
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });

  return render(
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ ...getThemeConfig('light'), token: { ...getThemeConfig('light').token, motion: false } }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

describe('Routes', () => {
  it('renders login page on /login route', async () => {
    // when
    renderRoutes(['/login']);

    // then
    expect(await screen.findByText('Sign In')).toBeInTheDocument();
  });

  it('renders register page on /register route', async () => {
    // when
    renderRoutes(['/register']);

    // then
    expect(await screen.findByText('Register')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', async () => {
    // given
    useAuthStore.getState().logout();

    // when
    renderRoutes(['/']);

    // then
    expect(await screen.findByText('Sign In')).toBeInTheDocument();
  });

  it('renders overview when authenticated', async () => {
    // given
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);

    // when
    renderRoutes(['/']);

    // then
    expect(await screen.findByRole('heading', { name: 'Overview' })).toBeInTheDocument();
  });
});
