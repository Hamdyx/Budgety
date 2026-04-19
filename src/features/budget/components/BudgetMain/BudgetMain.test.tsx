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

  it('renders budget feature title after loading', async () => {
    // when
    renderWithProviders(<BudgetMain />);

    // then
    expect(await screen.findByText('Budget Feature')).toBeInTheDocument();
  });

  it('renders recent transactions header', async () => {
    // when
    renderWithProviders(<BudgetMain />);

    // then
    expect(await screen.findByText('Recent Transactions')).toBeInTheDocument();
  });

  it('renders transaction rows', async () => {
    // when
    renderWithProviders(<BudgetMain />);

    // then
    await screen.findAllByText('Monthly Salary');
    expect(screen.getAllByText('Grocery Shopping').length).toBeGreaterThanOrEqual(1);
  });

  it('renders month picker', async () => {
    // when
    renderWithProviders(<BudgetMain />);

    // then
    await screen.findByText('Budget Feature');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates month when DatePicker value changes', async () => {
    // given
    const user = userEvent.setup();
    renderWithProviders(<BudgetMain />);
    await screen.findByText('Budget Feature');

    // when
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, '2024-06');
    await user.keyboard('{Enter}');

    // then
    await waitFor(() => {
      expect(input).toHaveValue('2024-06');
    });
  });
});
