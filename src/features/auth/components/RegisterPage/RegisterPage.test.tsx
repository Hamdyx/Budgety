import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import RegisterPage from './RegisterPage';

const API = import.meta.env.VITE_API_URL;

function renderRegister() {
  return renderWithProviders(
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<div>Login Page</div>} />
    </Routes>,
    { routerProps: { initialEntries: ['/register'] } }
  );
}

describe('RegisterPage', () => {
  it('renders all form fields', () => {
    // when
    renderRegister();

    // then
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('renders sign in link', () => {
    // when
    renderRegister();

    // then
    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/login');
  });

  it('shows validation errors on empty submit', async () => {
    // when
    const { user } = renderRegister();

    // then
    await user.click(screen.getByRole('button', { name: 'Register' }));
    await waitFor(() => {
      expect(screen.getByText('Please enter your email')).toBeInTheDocument();
      expect(screen.getByText('Please enter a username')).toBeInTheDocument();
      expect(screen.getByText('Please enter a password')).toBeInTheDocument();
      expect(screen.getByText('Please confirm your password')).toBeInTheDocument();
    });
  });

  it('shows password mismatch error', async () => {
    // when
    const { user } = renderRegister();

    // then
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'different123');
    await user.click(screen.getByRole('button', { name: 'Register' }));
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });

  it('registers successfully and navigates to login', async () => {
    // when
    const { user } = renderRegister();

    // then
    await user.type(screen.getByLabelText('Email'), 'new@example.com');
    await user.type(screen.getByLabelText('Username'), 'newuser');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  it('shows error message on register failure', async () => {
    // given
    server.use(http.post(`${API}/auth/register`, () => HttpResponse.json({ detail: 'Email already registered' }, { status: 400 })));

    // when
    const { user } = renderRegister();

    // then
    await user.type(screen.getByLabelText('Email'), 'dup@example.com');
    await user.type(screen.getByLabelText('Username'), 'dupuser');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
