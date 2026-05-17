import type { Transaction } from '@/types/types';

import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockTransactions, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import EditTransactionModal from './EditTransactionModal';

describe('EditTransactionModal', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  const transaction = mockTransactions[0];

  it('renders edit button', () => {
    // when
    renderWithProviders(<EditTransactionModal transaction={transaction} />);

    // then
    expect(screen.getByLabelText('Edit transaction')).toBeInTheDocument();
  });

  it('opens modal with pre-filled values on click', async () => {
    // when
    const { user } = renderWithProviders(<EditTransactionModal transaction={transaction} />);

    // then
    await user.click(screen.getByLabelText('Edit transaction'));

    expect(screen.getByText('Edit Transaction')).toBeInTheDocument();
    expect(screen.getByDisplayValue(transaction.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue('3,000')).toBeInTheDocument();
  });

  it('closes modal on cancel', async () => {
    // when
    const { user } = renderWithProviders(<EditTransactionModal transaction={transaction} />);

    // then
    await user.click(screen.getByLabelText('Edit transaction'));

    // and - cancel
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => {
      expect(screen.queryByText('Edit Transaction')).not.toBeInTheDocument();
    });
  });

  it('submits updated values', async () => {
    // when
    const { user } = renderWithProviders(<EditTransactionModal transaction={transaction} />);

    // then
    await user.click(screen.getByLabelText('Edit transaction'));

    // and - edit title
    const titleInput = screen.getByDisplayValue(transaction.title);
    await user.clear(titleInput);
    await user.type(titleInput, 'Updated Title');

    // and - save changes
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));
    await waitFor(() => {
      expect(screen.queryByText('Edit Transaction')).not.toBeInTheDocument();
    });
  });

  it('shows status and recurring fields', async () => {
    // when
    const { user } = renderWithProviders(<EditTransactionModal transaction={transaction} />);

    // then
    await user.click(screen.getByLabelText('Edit transaction'));

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Recurring')).toBeInTheDocument();
  });

  it('submits a recurring transaction with recurrence rule', async () => {
    // given
    const recurringTransaction: Transaction = {
      id: 'trx-recurring',
      type: 'exp',
      title: 'Monthly Rent',
      value: 1500,
      trxDate: '2024-01-01T08:00:00',
      categoryId: 3,
      status: 'completed',
      isRecurring: true,
      recurrenceRule: 'monthly',
      currency: 'USD',
      originalValue: 1500,
    };

    // when
    const { user } = renderWithProviders(<EditTransactionModal transaction={recurringTransaction} />);

    // then
    await user.click(screen.getByLabelText('Edit transaction'));

    expect(screen.getByText('Edit Transaction')).toBeInTheDocument();
    expect(screen.getByText('Recurrence')).toBeInTheDocument();

    // and - submit with recurring enabled
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));
    await waitFor(() => {
      expect(screen.queryByText('Edit Transaction')).not.toBeInTheDocument();
    });
  });

  it('shows error message when update fails', async () => {
    // given
    server.use(http.patch('*/transactions/*', () => HttpResponse.json({ detail: 'error' }, { status: 500 })));

    // when
    const { user } = renderWithProviders(<EditTransactionModal transaction={transaction} />);

    // then
    await user.click(screen.getByLabelText('Edit transaction'));
    await user.click(screen.getByRole('button', { name: 'Save Changes' }));

    // and
    await waitFor(() => {
      expect(screen.getByText('Failed to update transaction')).toBeInTheDocument();
    });
  });
});
