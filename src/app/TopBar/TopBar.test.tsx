import { screen, waitFor, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import TopBar from './TopBar';

const defaultProps = {
  isMobile: false,
  onMobileMenuOpen: vi.fn(),
};

describe('TopBar', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
    useThemeStore.setState({ mode: 'light' });
  });

  describe('theme toggle', () => {
    it('renders the theme toggle button', () => {
      // when
      renderWithProviders(<TopBar {...defaultProps} />);

      // then
      expect(screen.getByTestId('themeToggleButton')).toBeInTheDocument();
    });

    it('shows sun icon in light mode', () => {
      // given
      useThemeStore.setState({ mode: 'light' });

      // when
      renderWithProviders(<TopBar {...defaultProps} />);

      // then
      expect(screen.getByRole('img', { name: 'sun' })).toBeInTheDocument();
    });

    it('shows moon icon in dark mode', () => {
      // given
      useThemeStore.setState({ mode: 'dark' });

      // when
      renderWithProviders(<TopBar {...defaultProps} />);

      // then
      expect(screen.getByRole('img', { name: 'moon' })).toBeInTheDocument();
    });

    it('toggles theme mode when clicked', async () => {
      // given
      useThemeStore.setState({ mode: 'light' });

      // when
      const { user } = renderWithProviders(<TopBar {...defaultProps} />);

      // then
      await user.click(screen.getByTestId('themeToggleButton'));

      expect(useThemeStore.getState().mode).toBe('dark');
    });
  });

  describe('mobile menu button', () => {
    it('does not render hamburger button when not on mobile', () => {
      // when
      renderWithProviders(<TopBar isMobile={false} onMobileMenuOpen={vi.fn()} />);

      // then
      expect(screen.queryByRole('button', { name: 'Open menu' })).not.toBeInTheDocument();
    });

    it('renders hamburger button when on mobile', () => {
      // when
      renderWithProviders(<TopBar isMobile={true} onMobileMenuOpen={vi.fn()} />);

      // then
      expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
    });

    it('calls onMobileMenuOpen when hamburger button is clicked', async () => {
      // given
      const onMobileMenuOpen = vi.fn();

      // when
      const { user } = renderWithProviders(<TopBar isMobile={true} onMobileMenuOpen={onMobileMenuOpen} />);

      // then
      await user.click(screen.getByRole('button', { name: 'Open menu' }));

      expect(onMobileMenuOpen).toHaveBeenCalledOnce();
    });
  });

  describe('profile dropdown', () => {
    it('renders avatar button with first letter of username', () => {
      // when
      renderWithProviders(<TopBar {...defaultProps} />);

      // then
      const avatarButton = screen.getByRole('button', { name: 'Open profile menu' });

      expect(avatarButton).toBeInTheDocument();
      expect(within(avatarButton).getByText('T')).toBeInTheDocument();
    });

    it('opens dropdown showing username label, Settings, and Logout', async () => {
      // when
      const { user } = renderWithProviders(<TopBar {...defaultProps} />);

      // then
      await user.click(screen.getByRole('button', { name: 'Open profile menu' }));

      expect(await screen.findByText('testuser')).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /Settings/ })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /Logout/ })).toBeInTheDocument();
    });

    it('clears auth state when Logout is clicked', async () => {
      // when
      const { user } = renderWithProviders(<TopBar {...defaultProps} />);

      // then
      await user.click(screen.getByRole('button', { name: 'Open profile menu' }));
      await screen.findByRole('menuitem', { name: /Logout/ });

      await user.click(screen.getByRole('menuitem', { name: /Logout/ }));

      await waitFor(() => {
        expect(useAuthStore.getState().token).toBeNull();
      });
    });

    it('calls backend logout endpoint when Logout is clicked', async () => {
      // given
      const logoutSpy = vi.fn();
      server.use(
        http.post('*/auth/logout', async ({ request }) => {
          logoutSpy(await request.json());
          return new HttpResponse(null, { status: 204 });
        })
      );

      const { user } = renderWithProviders(<TopBar {...defaultProps} />);
      await user.click(screen.getByRole('button', { name: 'Open profile menu' }));
      await screen.findByRole('menuitem', { name: /Logout/ });

      // when
      await user.click(screen.getByRole('menuitem', { name: /Logout/ }));

      // then
      await waitFor(() => {
        expect(logoutSpy).toHaveBeenCalledWith({ refresh_token: mockRefreshToken });
      });
    });
  });
});
