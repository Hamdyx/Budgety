import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import BudgetMain from './BudgetMain';

describe('BudgetMain', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('shows spinner while loading', () => {
    // when
    renderWithProviders(<BudgetMain />);

    // then
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('renders budget title after loading', async () => {
    // when
    renderWithProviders(<BudgetMain />);

    // then
    expect(await screen.findByText('Budget')).toBeInTheDocument();
  });

  it('does not render recent transactions header in left panel', async () => {
    // when
    renderWithProviders(<BudgetMain />);
    await screen.findByText('Budget');

    // then
    expect(screen.queryByText('Recent Transactions')).not.toBeInTheDocument();
  });

  it('renders month picker', async () => {
    // when
    renderWithProviders(<BudgetMain />);

    // then
    await screen.findByText('Budget');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates month when DatePicker value changes', async () => {
    // given
    const user = userEvent.setup();

    // when
    renderWithProviders(<BudgetMain />);

    // then
    await screen.findByText('Budget');

    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, '2024-06');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(input).toHaveValue('2024-06');
    });
  });
});
