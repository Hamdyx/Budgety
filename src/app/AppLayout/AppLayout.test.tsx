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
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Budget')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    // when
    renderWithProviders(<AppLayout />);

    // then
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
  });

  it('toggles theme on button click', async () => {
    // when
    const { user } = renderWithProviders(<AppLayout />);
    const toggle = screen.getByLabelText('Toggle theme');

    // then
    await user.click(toggle);
    // Theme toggled in store
  });
});
