import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { useCurrencyStore } from '@/stores/currencyStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import SettingsPage from './SettingsPage';

describe('SettingsPage', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  afterEach(() => {
    useCurrencyStore.getState().setCurrency('USD');
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
    // when
    const { user } = renderWithProviders(<SettingsPage />);

    // then
    await user.click(screen.getByRole('button', { name: /delete account/i }));

    // and - confirmation modal should appear
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });

  it('calls delete API and redirects on confirm', async () => {
    // given
    const { user } = renderWithProviders(
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/register" element={<div>register page</div>} />
      </Routes>,
      { routerProps: { initialEntries: ['/settings'] } }
    );

    // when
    await user.click(screen.getByRole('button', { name: /delete account/i }));
    await user.click(screen.getByRole('button', { name: /delete$/i }));

    // then - should log out and navigate to /register
    await waitFor(() => {
      expect(useAuthStore.getState().token).toBeNull();
      expect(screen.getByText('register page')).toBeInTheDocument();
    });
  });

  it('does not delete when cancel is clicked', async () => {
    // when
    const { user } = renderWithProviders(<SettingsPage />);

    // then
    await user.click(screen.getByRole('button', { name: /delete account/i }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    // and - should NOT clear auth (cancelled)
    expect(useAuthStore.getState().token).not.toBeNull();

    // and - confirmation modal should be closed
    await waitFor(() => {
      expect(screen.queryByText(/are you sure/i)).not.toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    // given
    server.use(http.delete('*/auth/me', () => HttpResponse.json({ detail: 'error' }, { status: 500 })));

    // when
    const { user } = renderWithProviders(<SettingsPage />);

    // then
    await user.click(screen.getByRole('button', { name: /delete account/i }));
    await user.click(screen.getByRole('button', { name: /delete$/i }));

    // and - should NOT clear auth on failure
    await waitFor(() => {
      expect(useAuthStore.getState().token).not.toBeNull();
    });
  });

  it('submits profile form and updates user in store', async () => {
    // when
    const { user } = renderWithProviders(<SettingsPage />);

    // then
    const usernameInput = screen.getByLabelText(/username/i);

    // and
    await user.clear(usernameInput);
    await user.type(usernameInput, 'updateduser');
    await user.click(screen.getByRole('button', { name: /save profile/i }));

    await waitFor(() => {
      expect(useAuthStore.getState().user?.username).toBe('updateduser');
    });
  });

  it('submits password form and resets fields on success', async () => {
    // when
    const { user } = renderWithProviders(<SettingsPage />);

    // then
    await user.type(screen.getByLabelText(/current password/i), 'OldPass123');
    await user.type(screen.getByLabelText(/^new password$/i), 'NewPass456');
    await user.type(screen.getByLabelText(/confirm new password/i), 'NewPass456');
    await user.click(screen.getByRole('button', { name: /change password/i }));

    // and - form fields should be cleared after success
    await waitFor(() => {
      expect(screen.getByLabelText(/current password/i)).toHaveValue('');
    });
  });

  it('shows validation error when passwords do not match', async () => {
    // when
    const { user } = renderWithProviders(<SettingsPage />);

    // then
    await user.type(screen.getByLabelText(/current password/i), 'OldPass123');
    await user.type(screen.getByLabelText(/^new password$/i), 'NewPass456');
    await user.type(screen.getByLabelText(/confirm new password/i), 'DifferentPass');
    await user.click(screen.getByRole('button', { name: /change password/i }));

    // and
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('falls back to store currency when update profile response has no currency', async () => {
    // given
    useCurrencyStore.getState().setCurrency('EUR');
    server.use(http.patch('*/auth/me', () => HttpResponse.json({ id: 'user-1', email: 'test@example.com', username: 'testuser', is_admin: false })));

    // when
    const { user } = renderWithProviders(<SettingsPage />);

    // then
    await user.click(screen.getByRole('button', { name: /save profile/i }));

    // then
    await waitFor(() => {
      expect(useCurrencyStore.getState().currency).toBe('EUR');
    });
  });

  it('shows error message when profile update fails', async () => {
    // given
    server.use(http.patch('*/auth/me', () => HttpResponse.json({ detail: 'error' }, { status: 500 })));
    const { user } = renderWithProviders(<SettingsPage />);

    // when
    await user.click(screen.getByRole('button', { name: /save profile/i }));

    // then
    await waitFor(() => {
      expect(screen.getByText('Failed to update profile')).toBeInTheDocument();
    });
  });

  it('shows error message when password change fails', async () => {
    // given
    server.use(http.post('*/auth/change-password', () => HttpResponse.json({ detail: 'error' }, { status: 500 })));
    const { user } = renderWithProviders(<SettingsPage />);

    // when
    await user.type(screen.getByLabelText(/current password/i), 'OldPass123');
    await user.type(screen.getByLabelText(/^new password$/i), 'NewPass456');
    await user.type(screen.getByLabelText(/confirm new password/i), 'NewPass456');
    await user.click(screen.getByRole('button', { name: /change password/i }));

    // then
    await waitFor(() => {
      expect(screen.getByText('Failed to change password')).toBeInTheDocument();
    });
  });
});
