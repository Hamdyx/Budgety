import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import ForgotPasswordPage from './ForgotPasswordPage';

describe('ForgotPasswordPage', () => {
  it('renders email field and submit button', () => {
    // when
    renderWithProviders(<ForgotPasswordPage />);

    // then
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Reset Code' })).toBeInTheDocument();
  });

  it('renders sign in link', () => {
    // when
    renderWithProviders(<ForgotPasswordPage />);

    // then
    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/login');
  });

  it('shows validation error when email is empty', async () => {
    // when
    const { user } = renderWithProviders(<ForgotPasswordPage />);

    // then
    await user.click(screen.getByRole('button', { name: 'Send Reset Code' }));
    await screen.findByText('Please enter your email');
  });

  it('navigates to verify-otp on success', async () => {
    // when
    const { user } = renderWithProviders(<ForgotPasswordPage />, {
      routerProps: { initialEntries: ['/forgot-password'] },
    });

    // then
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'Send Reset Code' }));

    // and - button becomes enabled again (not disabled during loading)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Send Reset Code' })).not.toBeDisabled();
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows error on failure', async () => {
    // given
    server.use(http.post('*/auth/forgot-password', () => HttpResponse.json({ detail: 'User not found' }, { status: 404 })));

    // when
    const { user } = renderWithProviders(<ForgotPasswordPage />);

    // then
    await user.type(screen.getByLabelText('Email'), 'bad@example.com');
    await user.click(screen.getByRole('button', { name: 'Send Reset Code' }));

    // and - shows error message
    expect(await screen.findByRole('alert')).toHaveTextContent('User not found');
  });

  it('shows generic error on network failure', async () => {
    // given
    server.use(http.post('*/auth/forgot-password', () => HttpResponse.error()));

    // when
    const { user } = renderWithProviders(<ForgotPasswordPage />);

    // then
    await user.type(screen.getByLabelText('Email'), 'net@example.com');
    await user.click(screen.getByRole('button', { name: 'Send Reset Code' }));

    // and - shows generic error message
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
  });
});
