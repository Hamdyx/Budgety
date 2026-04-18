import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockTransactions } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import TransactionRow from './TransactionRow';

describe('TransactionRow', () => {
  const incomeTrx = mockTransactions[0];
  const expenseTrx = mockTransactions[1];

  it('renders transaction title', () => {
    // when
    renderWithProviders(<TransactionRow trx={incomeTrx} />);

    // then
    expect(screen.getByText('Monthly Salary')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    // when
    renderWithProviders(<TransactionRow trx={incomeTrx} />);

    // then
    expect(screen.getByText('2024-01-15 | 09:30')).toBeInTheDocument();
  });

  it('renders transaction value', () => {
    // when
    renderWithProviders(<TransactionRow trx={incomeTrx} />);

    // then
    expect(screen.getByText('$3000')).toBeInTheDocument();
  });

  it('renders edit and delete buttons', () => {
    // when
    renderWithProviders(<TransactionRow trx={expenseTrx} />);

    // then
    expect(screen.getByLabelText('Edit transaction')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete transaction')).toBeInTheDocument();
  });
});
