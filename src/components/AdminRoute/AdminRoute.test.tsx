import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import AdminRoute from './AdminRoute';

describe('AdminRoute', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null, refreshToken: null, user: null });
  });

  it('redirects to / when user is not admin', () => {
    // given
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, { ...mockUser, isAdmin: false });

    // when
    renderWithProviders(
      <Routes>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<div>admin page</div>} />
        </Route>
        <Route path="/" element={<div>home page</div>} />
      </Routes>,
      { routerProps: { initialEntries: ['/admin'] } }
    );

    // then
    expect(screen.getByText('home page')).toBeInTheDocument();
    expect(screen.queryByText('admin page')).not.toBeInTheDocument();
  });

  it('renders outlet when user is admin', () => {
    // given
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, { ...mockUser, isAdmin: true });

    // when
    renderWithProviders(
      <Routes>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<div>admin page</div>} />
        </Route>
        <Route path="/" element={<div>home page</div>} />
      </Routes>,
      { routerProps: { initialEntries: ['/admin'] } }
    );

    // then
    expect(screen.getByText('admin page')).toBeInTheDocument();
    expect(screen.queryByText('home page')).not.toBeInTheDocument();
  });
});
