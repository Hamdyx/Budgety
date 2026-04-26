import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('renders navigation menu items', () => {
    // when
    renderWithProviders(<Sidebar />);

    // then
    expect(screen.getByRole('menuitem', { name: /Overview/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Budget/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Bank/ })).toBeInTheDocument();
  });

  it('renders logout menu item', () => {
    // when
    renderWithProviders(<Sidebar />);

    // then
    expect(screen.getByRole('menuitem', { name: /Logout/ })).toBeInTheDocument();
  });

  it('navigates on menu item click', async () => {
    // when
    const { user } = renderWithProviders(<Sidebar />, { routerProps: { initialEntries: ['/'] } });
    await user.click(screen.getByRole('menuitem', { name: /Budget/ }));

    // then - Budget menu item becomes selected (active route changed to /budget)
    expect(screen.getByRole('menuitem', { name: /Budget/ })).toHaveClass('ant-menu-item-selected');
  });

  it('calls onNavigate callback on menu click', async () => {
    let navigated = false;

    // when
    const { user } = renderWithProviders(
      <Sidebar
        onNavigate={() => {
          navigated = true;
        }}
      />
    );

    // then
    await user.click(screen.getByRole('menuitem', { name: /Budget/ }));

    expect(navigated).toBe(true);
  });

  it('logs out and navigates to login', async () => {
    // when
    const { user } = renderWithProviders(<Sidebar />, { routerProps: { initialEntries: ['/'] } });

    // then
    await user.click(screen.getByRole('menuitem', { name: /Logout/ }));
    await waitFor(() => {
      expect(useAuthStore.getState().token).toBeNull();
    });
  });

  it('calls backend logout endpoint on logout', async () => {
    // given
    const logoutSpy = vi.fn();
    server.use(
      http.post('*/auth/logout', async ({ request }) => {
        logoutSpy(await request.json());
        return new HttpResponse(null, { status: 204 });
      })
    );

    // when
    const { user } = renderWithProviders(<Sidebar />, { routerProps: { initialEntries: ['/'] } });
    await user.click(screen.getByRole('menuitem', { name: /Logout/ }));

    // then
    await waitFor(() => {
      expect(logoutSpy).toHaveBeenCalledWith({ refresh_token: mockRefreshToken });
    });
  });

  it('renders logout section with light theme styles', () => {
    // given
    useThemeStore.setState({ mode: 'light' });

    // when
    renderWithProviders(<Sidebar />);

    // then
    expect(screen.getByRole('menuitem', { name: /Logout/ })).toBeInTheDocument();
  });

  it('does not show Admin menu item for non-admin users', () => {
    renderWithProviders(<Sidebar />);
    expect(screen.queryByRole('menuitem', { name: /Admin/ })).not.toBeInTheDocument();
  });

  it('shows Admin menu item for admin users', () => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, { ...mockUser, isAdmin: true });
    renderWithProviders(<Sidebar />);
    expect(screen.getByRole('menuitem', { name: /Admin/ })).toBeInTheDocument();
  });
});
