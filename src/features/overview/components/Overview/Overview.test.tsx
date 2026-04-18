import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import Overview from './Overview';

describe('Overview', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
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
});
