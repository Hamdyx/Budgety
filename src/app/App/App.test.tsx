import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import App from './App';

describe('App', () => {
  it('renders login page on /login route', async () => {
    // when
    renderWithProviders(<App />, { routerProps: { initialEntries: ['/login'] } });

    // then
    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
  });

  it('renders register page on /register route', async () => {
    // when
    renderWithProviders(<App />, { routerProps: { initialEntries: ['/register'] } });

    // then
    await waitFor(() => {
      expect(screen.getByText('Register')).toBeInTheDocument();
    });
  });

  it('redirects to login when not authenticated', async () => {
    // when
    useAuthStore.getState().logout();
    renderWithProviders(<App />, { routerProps: { initialEntries: ['/'] } });

    // then
    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });
  });

  it('renders overview when authenticated', async () => {
    // when
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
    renderWithProviders(<App />, { routerProps: { initialEntries: ['/'] } });

    // then
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument();
    });
  });
});
