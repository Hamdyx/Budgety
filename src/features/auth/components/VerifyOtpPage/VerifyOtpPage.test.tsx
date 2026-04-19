import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import VerifyOtpPage from './VerifyOtpPage';

describe('VerifyOtpPage', () => {
  const renderWithEmail = () =>
    renderWithProviders(<VerifyOtpPage />, {
      routerProps: { initialEntries: [{ pathname: '/verify-otp', state: { email: 'test@example.com' } }] },
    });

  it('redirects to forgot-password when no email in state', () => {
    // when
    renderWithProviders(<VerifyOtpPage />, {
      routerProps: { initialEntries: ['/verify-otp'] },
    });

    // then
    expect(screen.queryByLabelText('Verification Code')).not.toBeInTheDocument();
  });

  it('renders verification code field and submit button', () => {
    // when
    renderWithEmail();

    // then
    expect(screen.getByLabelText('Verification Code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Verify Code' })).toBeInTheDocument();
  });

  it('shows validation error when code is empty', async () => {
    // when
    const { user } = renderWithEmail();

    // then
    await user.click(screen.getByRole('button', { name: 'Verify Code' }));
    await screen.findByText('Please enter the verification code');
  });

  it('navigates to reset-password on success', async () => {
    // when
    const { user } = renderWithEmail();

    // then
    await user.type(screen.getByLabelText('Verification Code'), '123456');
    await user.click(screen.getByRole('button', { name: 'Verify Code' }));

    // and - shows loading state while verifying
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Verify Code' })).not.toBeDisabled();
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows error on failure', async () => {
    // given
    server.use(http.post('*/auth/verify-reset-otp', () => HttpResponse.json({ detail: 'Invalid OTP' }, { status: 400 })));

    // when
    const { user } = renderWithEmail();

    // then
    await user.type(screen.getByLabelText('Verification Code'), '000000');
    await user.click(screen.getByRole('button', { name: 'Verify Code' }));

    // and - shows error message
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid OTP');
  });

  it('shows generic error on network failure', async () => {
    // given
    server.use(http.post('*/auth/verify-reset-otp', () => HttpResponse.error()));

    // when
    const { user } = renderWithEmail();

    // then
    await user.type(screen.getByLabelText('Verification Code'), '000000');
    await user.click(screen.getByRole('button', { name: 'Verify Code' }));

    // and - shows generic error message
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
  });
});
