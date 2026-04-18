import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
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
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Budget')).toBeInTheDocument();
    expect(screen.getByText('Bank')).toBeInTheDocument();
  });

  it('renders logout menu item', () => {
    // when
    renderWithProviders(<Sidebar />);

    // then
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('navigates on menu item click', async () => {
    // when
    const { user } = renderWithProviders(<Sidebar />);

    // then
    await user.click(screen.getByText('Budget'));
    // Navigation happens via react-router
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
    await user.click(screen.getByText('Budget'));
    expect(navigated).toBe(true);
  });

  it('logs out and navigates to login', async () => {
    // when
    const { user } = renderWithProviders(<Sidebar />, { routerProps: { initialEntries: ['/'] } });

    // then
    await user.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(useAuthStore.getState().token).toBeNull();
    });
  });
});
