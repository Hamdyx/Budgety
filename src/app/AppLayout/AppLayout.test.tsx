import { screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
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
});
