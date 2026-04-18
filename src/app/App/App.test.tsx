import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { getThemeConfig } from '@/theme/themeConfig';

import { routeConfig } from '../routes';

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

describe('App', () => {
  it('renders login page on /login route', async () => {
    renderRoutes(['/login']);

    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
  });

  it('renders register page on /register route', async () => {
    renderRoutes(['/register']);

    await waitFor(() => {
      expect(screen.getByText('Register')).toBeInTheDocument();
    });
  });

  it('redirects to login when not authenticated', async () => {
    useAuthStore.getState().logout();
    renderRoutes(['/']);

    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
  });

  it('renders overview when authenticated', async () => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
    renderRoutes(['/']);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument();
    });
  });
});
