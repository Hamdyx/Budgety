import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import PrivateRoute from './PrivateRoute';

describe('PrivateRoute', () => {
  it('renders outlet when authenticated', () => {
    // given
    useAuthStore.setState({ token: mockToken, user: mockUser });

    // when
    renderWithProviders(
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route index element={<div>Protected Content</div>} />
        </Route>
      </Routes>,
      { routerProps: { initialEntries: ['/'] } }
    );

    // then
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    useAuthStore.setState({ token: null, user: null });
  });

  it('redirects to /login when not authenticated', () => {
    // given
    useAuthStore.setState({ token: null, user: null });

    // when
    renderWithProviders(
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route index element={<div>Protected Content</div>} />
        </Route>
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>,
      { routerProps: { initialEntries: ['/'] } }
    );

    // then
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
