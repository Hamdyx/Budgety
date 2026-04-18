import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
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
    renderRoutes(['/login']);

    expect(await screen.findByText('Sign In')).toBeInTheDocument();
  });

  it('renders register page on /register route', async () => {
    renderRoutes(['/register']);

    expect(await screen.findByText('Register')).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', async () => {
    useAuthStore.getState().logout();
    renderRoutes(['/']);

    expect(await screen.findByText('Sign In')).toBeInTheDocument();
  });

  it('renders overview when authenticated', async () => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
    renderRoutes(['/']);

    expect(await screen.findByRole('heading', { name: 'Overview' })).toBeInTheDocument();
  });
});
