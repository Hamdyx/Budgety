import type { Transaction } from '@/types/types';

import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockTransactions, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

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
    expect(screen.getByDisplayValue(String(transaction.value))).toBeInTheDocument();
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

  it('uses fallback values when transaction fields are missing', async () => {
    // given
    const sparseTransaction = {
      id: 'trx-sparse',
      type: undefined,
      title: undefined,
      value: undefined,
      trxDate: undefined,
      categoryId: 1,
    } as unknown as Transaction;

    // when
    const { user } = renderWithProviders(<EditTransactionModal transaction={sparseTransaction} />);

    // then
    await user.click(screen.getByLabelText('Edit transaction'));

    expect(screen.getByText('Edit Transaction')).toBeInTheDocument();
    // The form should still render with fallback values
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
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
});
