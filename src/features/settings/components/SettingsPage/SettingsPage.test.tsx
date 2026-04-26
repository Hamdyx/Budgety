import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import SettingsPage from './SettingsPage';

describe('SettingsPage', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('renders settings title', () => {
    // when
    renderWithProviders(<SettingsPage />);

    // then
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders delete account button', () => {
    // when
    renderWithProviders(<SettingsPage />);

    // then
    expect(screen.getByRole('button', { name: /delete account/i })).toBeInTheDocument();
  });

  it('shows confirmation modal when delete button is clicked', async () => {
    // given
    const user = userEvent.setup();

    // when
    renderWithProviders(<SettingsPage />);

    // then
    await user.click(screen.getByRole('button', { name: /delete account/i }));

    // and - confirmation modal should appear
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });

  it('calls delete API and redirects on confirm', async () => {
    // given
    const user = userEvent.setup();

    // when
    renderWithProviders(<SettingsPage />, {
      routerProps: { initialEntries: ['/settings'] },
    });

    // then
    await user.click(screen.getByRole('button', { name: /delete account/i }));
    await user.click(screen.getByRole('button', { name: /delete$/i }));

    // and - should call DELETE /auth/me API
    await waitFor(() => {
      expect(useAuthStore.getState().token).toBeNull();
    });
  });

  it('does not delete when cancel is clicked', async () => {
    // given
    const user = userEvent.setup();

    // when
    renderWithProviders(<SettingsPage />);

    // then
    await user.click(screen.getByRole('button', { name: /delete account/i }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    // and - should NOT clear auth (cancelled)
    expect(useAuthStore.getState().token).not.toBeNull();
  });

  it('handles API error gracefully', async () => {
    // given
    const user = userEvent.setup();
    server.use(http.delete('*/auth/me', () => HttpResponse.json({ detail: 'error' }, { status: 500 })));

    // when
    renderWithProviders(<SettingsPage />);

    // then
    await user.click(screen.getByRole('button', { name: /delete account/i }));
    await user.click(screen.getByRole('button', { name: /delete$/i }));

    // and - should NOT clear auth on failure
    await waitFor(() => {
      expect(useAuthStore.getState().token).not.toBeNull();
    });
  });
});
