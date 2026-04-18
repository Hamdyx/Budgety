import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import BudgetCard from './BudgetCard';

describe('BudgetCard', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('shows spinner while loading', () => {
    // when
    renderWithProviders(<BudgetCard />);

    // then
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('renders income and expense sections', async () => {
    // when
    renderWithProviders(<BudgetCard />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Income')).toBeInTheDocument();
      expect(screen.getByText('Expense')).toBeInTheDocument();
    });
  });

  it('renders category items', async () => {
    // when
    renderWithProviders(<BudgetCard />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Salary')).toBeInTheDocument();
      expect(screen.getByText('Food')).toBeInTheDocument();
      expect(screen.getByText('Rent')).toBeInTheDocument();
      expect(screen.getByText('Freelance')).toBeInTheDocument();
    });
  });

  it('shows remaining for categories within budget', async () => {
    // when
    renderWithProviders(<BudgetCard />);

    // then
    await waitFor(() => {
      // Rent: budget 1500, spent 1500, remaining 0 → "available"
      // Food: budget 800, spent 600, remaining 200 → "available"
      const availableTexts = screen.getAllByText('available');
      expect(availableTexts.length).toBeGreaterThan(0);
    });
  });

  it('shows expected for income categories', async () => {
    // when
    renderWithProviders(<BudgetCard />);

    // then
    await waitFor(() => {
      const expectedTexts = screen.getAllByText('expected');
      expect(expectedTexts.length).toBeGreaterThan(0);
    });
  });

  it('shows "over" when income exceeds budget', async () => {
    // given
    // Income budget = 5000 + 2000 = 7000; totalIncome = 8000 → over
    server.use(
      http.get(`*/transactions`, () =>
        HttpResponse.json([{ id: 'trx-1', type: 'inc', title: 'Big Salary', value: 8000, trx_date: '2024-01-15T09:30:00', category_id: 1 }])
      )
    );

    // when
    renderWithProviders(<BudgetCard />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Income')).toBeInTheDocument();
    });
    // Income remaining < 0 → "over"
    const overTexts = screen.getAllByText('over');
    expect(overTexts.length).toBeGreaterThan(0);
  });

  it('shows "over" when expense exceeds budget', async () => {
    // given
    // Expense budget = 800 + 1500 = 2300; totalExpense = 3000 → over
    server.use(
      http.get(`*/transactions`, () =>
        HttpResponse.json([{ id: 'trx-1', type: 'exp', title: 'Big Expense', value: 3000, trx_date: '2024-01-15T09:30:00', category_id: 2 }])
      )
    );

    // when
    renderWithProviders(<BudgetCard />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Expense')).toBeInTheDocument();
    });
    const overTexts = screen.getAllByText('over');
    expect(overTexts.length).toBeGreaterThan(0);
  });

  it('shows "over" for individual categories that exceed budget', async () => {
    // given
    // Category budget = 100, spent = 200 → remaining = -100
    server.use(
      http.get(`*/categories`, () => HttpResponse.json([{ id: 10, category: 'OverCat', type: 'expense', budget: 100, spent: 200 }])),
      http.get(`*/transactions`, () => HttpResponse.json([]))
    );

    // when
    renderWithProviders(<BudgetCard />);

    // then
    await waitFor(() => {
      expect(screen.getByText('OverCat')).toBeInTheDocument();
    });
    expect(screen.getByText('over')).toBeInTheDocument();
  });
});
