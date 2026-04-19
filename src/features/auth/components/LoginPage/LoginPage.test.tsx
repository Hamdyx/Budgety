import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('renders email, password fields and submit button', () => {
    // when
    renderWithProviders(<LoginPage />);

    // then
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders register link', () => {
    // when
    renderWithProviders(<LoginPage />);

    // then
    expect(screen.getByRole('link', { name: 'Register' })).toHaveAttribute('href', '/register');
  });

  it('shows validation errors when fields are empty', async () => {
    // when
    const { user } = renderWithProviders(<LoginPage />);

    // then
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    await screen.findByText('Please enter your email');
    expect(screen.getByText('Please enter your password')).toBeInTheDocument();
  });

  it('logs in successfully and sets auth state', async () => {
    // when
    const { user } = renderWithProviders(<LoginPage />, {
      routerProps: { initialEntries: ['/login'] },
    });

    // then
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');

    // and - submit
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.token).toBeTruthy();
      expect(state.user).toBeTruthy();
    });
  });

  it('shows error message on login failure', async () => {
    // given
    server.use(http.post('*/auth/login', () => HttpResponse.json({ detail: 'Invalid credentials' }, { status: 401 })));

    // when
    const { user } = renderWithProviders(<LoginPage />);

    // then
    await user.type(screen.getByLabelText('Email'), 'bad@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrongpass');

    // and - submit
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid credentials');
  });

  it('shows generic error on network failure', async () => {
    // given
    server.use(http.post('*/auth/login', () => HttpResponse.error()));

    // when
    const { user } = renderWithProviders(<LoginPage />);

    // then
    await user.type(screen.getByLabelText('Email'), 'net@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrongpass');

    // and - submit
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
  });
});
