import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockTransactions } from '@/tests/fixtures';

import TransactionItem from './TransactionItem';

describe('TransactionItem', () => {
  const incomeTransaction = mockTransactions[0]; // type: 'inc'
  const expenseTransaction = mockTransactions[1]; // type: 'exp'

  it('renders transaction title and category', () => {
    // when
    render(<TransactionItem transaction={incomeTransaction} categoryName="Salary" />);

    // then
    expect(screen.getByText('Monthly Salary')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
  });

  it('renders transaction value', () => {
    // when
    render(<TransactionItem transaction={incomeTransaction} categoryName="Salary" />);

    // then
    expect(screen.getByText('$3,000.00')).toBeInTheDocument();
  });

  it('renders expense transaction', () => {
    // when
    render(<TransactionItem transaction={expenseTransaction} categoryName="Food" />);

    // then
    expect(screen.getByText('Grocery Shopping')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('renders status tag when status is present', () => {
    // when
    render(<TransactionItem transaction={incomeTransaction} categoryName="Salary" />);

    // then
    expect(screen.getByText('completed')).toBeInTheDocument();
  });
});
