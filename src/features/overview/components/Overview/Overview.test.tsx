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

  it('resets month filter when DatePicker clear button is clicked', async () => {
    // given
    const user = userEvent.setup();
    // when
    const { container } = renderWithProviders(<Overview />);

    // then
    await waitFor(() => {
      expect(screen.getByText('All Transactions')).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText('Filter by month');
    await user.click(input);
    await user.type(input, '2024-01');
    await user.keyboard('{Enter}');
    await waitFor(() => {
      expect(input).toHaveValue('2024-01');
    });

    // and - click the Ant Design DatePicker clear button
    const clearButton = container.querySelector<HTMLElement>('.ant-picker-clear');
    expect(clearButton).not.toBeNull();
    await user.click(clearButton!);

    // and
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
});
