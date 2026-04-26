import { screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

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

  it('does not render Settings or Logout menu items', () => {
    // when
    renderWithProviders(<Sidebar />);

    // then
    expect(screen.queryByRole('menuitem', { name: /Settings/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /Logout/ })).not.toBeInTheDocument();
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
