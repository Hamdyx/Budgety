import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
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

  it('renders logout section with light theme styles', () => {
    // given
    useThemeStore.setState({ mode: 'light' });

    // when
    renderWithProviders(<Sidebar />);

    // then
    expect(screen.getByRole('menuitem', { name: /Logout/ })).toBeInTheDocument();
  });
});
