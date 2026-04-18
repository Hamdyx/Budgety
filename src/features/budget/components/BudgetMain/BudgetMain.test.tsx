import { screen } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import BudgetMain from './BudgetMain';

describe('BudgetMain', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
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
});
