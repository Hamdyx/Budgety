import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import TransactionsCard from './TransactionsCard';

describe('TransactionsCard', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('shows spinner while loading', () => {
    // when
    renderWithProviders(<TransactionsCard />);

    // then
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('renders transactions after loading', async () => {
    // when
    renderWithProviders(<TransactionsCard />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Monthly Salary')).toBeInTheDocument();
    });
    expect(screen.getByText('Grocery Shopping')).toBeInTheDocument();
  });

  it('shows empty state when no transactions', async () => {
    // when
    const { queryClient } = renderWithProviders(<TransactionsCard />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Monthly Salary')).toBeInTheDocument();
    });
    queryClient.setQueryData(['transactions'], []);
    await waitFor(() => {
      expect(screen.getByText('No transactions yet')).toBeInTheDocument();
    });
  });

  it('shows max 5 transactions', async () => {
    // when
    renderWithProviders(<TransactionsCard />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Monthly Salary')).toBeInTheDocument();
    });
    // mockTransactions has 6, only 5 shown
    expect(screen.queryByText('Side Project')).not.toBeInTheDocument();
  });

  it('shows category name for each transaction', async () => {
    // when
    renderWithProviders(<TransactionsCard />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Salary')).toBeInTheDocument();
      expect(screen.getAllByText('Food').length).toBeGreaterThanOrEqual(1);
    });
  });

  it('shows "Unknown" for transactions with unmapped category', async () => {
    // given
    server.use(
      http.get(`*/transactions`, () =>
        HttpResponse.json([{ id: 'trx-unknown', type: 'inc', title: 'Mystery', value: 100, trx_date: '2024-01-01T00:00:00', category_id: 9999 }])
      ),
      http.get(`*/categories`, () => HttpResponse.json([]))
    );

    // when
    renderWithProviders(<TransactionsCard />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Unknown')).toBeInTheDocument();
    });
  });
});
