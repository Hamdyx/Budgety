import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import AuthLayout from './AuthLayout';

describe('AuthLayout', () => {
  it('renders title and children', () => {
    // when
    renderWithProviders(
      <AuthLayout>
        <div>Login Form</div>
      </AuthLayout>
    );

    // then
    expect(screen.getByText('Budgety')).toBeInTheDocument();
    expect(screen.getByText('Login Form')).toBeInTheDocument();
  });
});
