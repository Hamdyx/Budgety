import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { useCurrencyStore } from '@/stores/currencyStore';
import { mockExchangeRates, mockRefreshToken, mockToken, mockTransactions, mockUser } from '@/tests/fixtures';

import { useTransactions, useCreateTransaction, useUpdateTransaction, useDeleteTransaction } from './hooks';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe('budget/hooks', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
    useCurrencyStore.setState({ currency: 'USD' });
  });

  it('useTransactions fetches transactions', async () => {
    // when
    const { result } = renderHook(() => useTransactions(), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(mockTransactions.length);
  });

  it('useTransactions converts values from USD to selected currency', async () => {
    // given
    useCurrencyStore.setState({ currency: 'EGP' });

    // when
    const { result } = renderHook(() => useTransactions(), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const egpRate = mockExchangeRates['EGP']!;
    const expectedValue = mockTransactions[0].value * egpRate;
    expect(result.current.data![0].value).toBeCloseTo(expectedValue);
  });

  it('useTransactions fetches with month and status params', async () => {
    // when
    const { result } = renderHook(() => useTransactions({ month: '2024-01', status: 'completed' }), {
      wrapper: createWrapper(),
    });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(mockTransactions.length);
  });

  it('useCreateTransaction creates a transaction', async () => {
    // when
    const { result } = renderHook(() => useCreateTransaction(), { wrapper: createWrapper() });
    result.current.mutate({
      type: 'inc',
      title: 'New',
      value: 100,
      trxDate: '2024-01-01T00:00:00',
      categoryId: 1,
    });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useUpdateTransaction updates a transaction', async () => {
    // when
    const { result } = renderHook(() => useUpdateTransaction(), { wrapper: createWrapper() });
    result.current.mutate({ id: 'trx-1', data: { title: 'Updated' } });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useDeleteTransaction deletes a transaction', async () => {
    // when
    const { result } = renderHook(() => useDeleteTransaction(), { wrapper: createWrapper() });
    result.current.mutate('trx-1');

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
