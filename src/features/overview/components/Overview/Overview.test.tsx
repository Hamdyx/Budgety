import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import Overview from './Overview';

describe('Overview', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('renders overview title', () => {
    // when
    renderWithProviders(<Overview />);

    // then
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders TransactionsCard', async () => {
    // when
    renderWithProviders(<Overview />);

    // then
    await waitFor(() => {
      expect(screen.getByText('All Transactions')).toBeInTheDocument();
    });
  });

  it('renders BudgetCard', async () => {
    // when
    renderWithProviders(<Overview />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Budget')).toBeInTheDocument();
    });
  });

  it('filters by month when DatePicker value changes', async () => {
    // given
    const user = userEvent.setup();
    renderWithProviders(<Overview />);
    await waitFor(() => {
      expect(screen.getByText('All Transactions')).toBeInTheDocument();
    });

    // when
    const input = screen.getByPlaceholderText('Filter by month');
    await user.click(input);
    await user.type(input, '2024-01');
    await user.keyboard('{Enter}');

    // then
    await waitFor(() => {
      expect(input).toHaveValue('2024-01');
    });
  });

  it('resets month filter when DatePicker is cleared', async () => {
    // given
    const user = userEvent.setup();

    // when
    renderWithProviders(<Overview />);

    // then
    await waitFor(() => {
      expect(screen.getByText('All Transactions')).toBeInTheDocument();
    });

    // and - set a month filter first
    const input = screen.getByPlaceholderText('Filter by month');

    await user.click(input);
    await user.type(input, '2024-01');
    await user.keyboard('{Enter}');
    await waitFor(() => {
      expect(input).toHaveValue('2024-01');
    });

    // and - clear the picker
    await user.clear(input);
    await user.keyboard('{Enter}');

    // and
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
});
