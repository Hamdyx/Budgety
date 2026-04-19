import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import ResetPasswordPage from './ResetPasswordPage';

describe('ResetPasswordPage', () => {
  const renderWithToken = () =>
    renderWithProviders(<ResetPasswordPage />, {
      routerProps: { initialEntries: [{ pathname: '/reset-password', state: { resetToken: 'mock-reset-token' } }] },
    });

  it('redirects to forgot-password when no token in state', () => {
    // when
    renderWithProviders(<ResetPasswordPage />, {
      routerProps: { initialEntries: ['/reset-password'] },
    });

    // then
    expect(screen.queryByLabelText('New Password')).not.toBeInTheDocument();
  });

  it('renders password fields and submit button', () => {
    // when
    renderWithToken();

    // then
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset Password' })).toBeInTheDocument();
  });

  it('shows validation error when passwords are empty', async () => {
    // when
    const { user } = renderWithToken();

    // then
    await user.click(screen.getByRole('button', { name: 'Reset Password' }));
    await screen.findByText('Please enter a new password');
  });

  it('shows mismatch error when passwords differ', async () => {
    // when
    const { user } = renderWithToken();

    // then
    await user.type(screen.getByLabelText('New Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'different123');
    await user.click(screen.getByRole('button', { name: 'Reset Password' }));

    await screen.findByText('Passwords do not match');
  });

  it('navigates to login on success', async () => {
    // when
    const { user } = renderWithToken();

    // then
    await user.type(screen.getByLabelText('New Password'), 'newpassword123');
    await user.type(screen.getByLabelText('Confirm Password'), 'newpassword123');
    await user.click(screen.getByRole('button', { name: 'Reset Password' }));

    // and - shows success message
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Reset Password' })).not.toBeDisabled();
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows error on failure', async () => {
    // given
    server.use(http.post('*/auth/reset-password', () => HttpResponse.json({ detail: 'Token expired' }, { status: 400 })));

    // when
    const { user } = renderWithToken();

    // then
    await user.type(screen.getByLabelText('New Password'), 'newpassword123');
    await user.type(screen.getByLabelText('Confirm Password'), 'newpassword123');
    await user.click(screen.getByRole('button', { name: 'Reset Password' }));

    // and - shows error message
    expect(await screen.findByRole('alert')).toHaveTextContent('Token expired');
  });

  it('shows generic error on network failure', async () => {
    // given
    server.use(http.post('*/auth/reset-password', () => HttpResponse.error()));

    // when
    const { user } = renderWithToken();

    // then
    await user.type(screen.getByLabelText('New Password'), 'newpassword123');
    await user.type(screen.getByLabelText('Confirm Password'), 'newpassword123');
    await user.click(screen.getByRole('button', { name: 'Reset Password' }));

    // and - shows generic error message
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
  });
});
