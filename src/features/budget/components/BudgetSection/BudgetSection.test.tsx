import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken, mockTransactions } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import BudgetSection from './BudgetSection';

describe('BudgetSection', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('renders income and expense toggle buttons', () => {
    // when
    renderWithProviders(<BudgetSection transactions={mockTransactions} />);

    // then
    expect(screen.getByRole('button', { name: 'Income' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Expense' })).toBeInTheDocument();
  });

  it('shows income transactions by default', () => {
    // when
    renderWithProviders(<BudgetSection transactions={mockTransactions} />);

    // then
    expect(screen.getByText('Monthly Salary')).toBeInTheDocument();
    expect(screen.getByText('Freelance Payment')).toBeInTheDocument();
  });

  it('switches to expense transactions', async () => {
    // when
    const { user } = renderWithProviders(<BudgetSection transactions={mockTransactions} />);

    // then
    await user.click(screen.getByRole('button', { name: 'Expense' }));
    await waitFor(() => {
      expect(screen.getByText('Grocery Shopping')).toBeInTheDocument();
      expect(screen.getByText('Monthly Rent')).toBeInTheDocument();
    });
  });

  it('switches back to income from expense', async () => {
    // when
    const { user } = renderWithProviders(<BudgetSection transactions={mockTransactions} />);

    // then
    await user.click(screen.getByRole('button', { name: 'Expense' }));
    await waitFor(() => {
      expect(screen.getByText('Grocery Shopping')).toBeInTheDocument();
    });

    // and - switch back to income
    await user.click(screen.getByRole('button', { name: 'Income' }));
    await waitFor(() => {
      expect(screen.getByText('Monthly Salary')).toBeInTheDocument();
      expect(screen.getByText('Freelance Payment')).toBeInTheDocument();
    });
  });

  it('renders Add Transaction button', () => {
    // when
    renderWithProviders(<BudgetSection transactions={mockTransactions} />);

    // then
    expect(screen.getByRole('button', { name: 'Add Transaction' })).toBeInTheDocument();
  });
});
