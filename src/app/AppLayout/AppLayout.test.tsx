import { screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import AppLayout from './AppLayout';

describe('AppLayout', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('renders sidebar navigation', () => {
    // when
    renderWithProviders(<AppLayout />);

    // then
    expect(screen.getByRole('menuitem', { name: /Overview/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Budget/ })).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    // when
    renderWithProviders(<AppLayout />);

    // then
    expect(screen.getByTestId('themeToggleButton')).toBeInTheDocument();
  });

  it('renders sun icon in light mode', () => {
    // given
    useThemeStore.setState({ mode: 'light' });

    // when
    renderWithProviders(<AppLayout />);

    // then
    expect(screen.getByRole('img', { name: 'sun' })).toBeInTheDocument();
  });

  describe('mobile viewport', () => {
    let originalMatchMedia: typeof window.matchMedia;

    beforeEach(() => {
      originalMatchMedia = window.matchMedia;
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: true,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    });

    afterEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: originalMatchMedia,
      });
    });

    it('shows mobile menu button and opens drawer', async () => {
      // when
      const { user } = renderWithProviders(<AppLayout />);

      // then - mobile menu button is visible
      const menuButton = screen.getByRole('button', { name: 'Open menu' });
      expect(menuButton).toBeInTheDocument();

      // and - open the drawer
      await user.click(menuButton);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('closes drawer via close button', async () => {
      // when
      const { user } = renderWithProviders(<AppLayout />);

      // then
      await user.click(screen.getByRole('button', { name: 'Open menu' }));

      // and - drawer is open
      const drawer = document.querySelector('.ant-drawer');
      expect(drawer).toHaveClass('ant-drawer-open');

      // and - click close button
      await user.click(screen.getByRole('button', { name: /close/i }));

      // then - drawer is closed
      expect(drawer).not.toHaveClass('ant-drawer-open');
    });

    it('closes drawer on sidebar navigation', async () => {
      // when
      const { user } = renderWithProviders(<AppLayout />);

      // then
      await user.click(screen.getByRole('button', { name: 'Open menu' }));

      // and - drawer is open
      const drawer = document.querySelector('.ant-drawer');
      expect(drawer).toHaveClass('ant-drawer-open');

      // and - click a sidebar navigation item
      const budgetItems = screen.getAllByRole('menuitem', { name: /Budget/ });
      await user.click(budgetItems[budgetItems.length - 1]);

      // and - drawer is closed
      expect(drawer).not.toHaveClass('ant-drawer-open');
    });
  });
});
