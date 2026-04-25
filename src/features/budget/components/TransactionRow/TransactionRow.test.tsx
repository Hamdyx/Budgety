import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockTransactions } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import TransactionRow from './TransactionRow';

describe('TransactionRow', () => {
  const incomeTransaction = mockTransactions[0];
  const expenseTransaction = mockTransactions[1];

  it('renders transaction title', () => {
    // when
    renderWithProviders(<TransactionRow transaction={incomeTransaction} />);

    // then
    expect(screen.getByText('Monthly Salary')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    // when
    renderWithProviders(<TransactionRow transaction={incomeTransaction} />);

    // then
    expect(screen.getByText('2024-01-15 | 09:30')).toBeInTheDocument();
  });

  it('renders transaction value', () => {
    // when
    renderWithProviders(<TransactionRow transaction={incomeTransaction} />);

    // then
    expect(screen.getByText('$3,000.00')).toBeInTheDocument();
  });

  it('renders edit and delete buttons', () => {
    // when
    renderWithProviders(<TransactionRow transaction={expenseTransaction} />);

    // then
    expect(screen.getByLabelText('Edit transaction')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete transaction')).toBeInTheDocument();
  });

  it('renders status tag', () => {
    // when
    renderWithProviders(<TransactionRow transaction={incomeTransaction} />);

    // then
    expect(screen.getByText('completed')).toBeInTheDocument();
  });
});
