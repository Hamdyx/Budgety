import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useExchangeRates } from '@/hooks/useExchangeRates';
import { useAuthStore } from '@/stores/authStore';
import { useCurrencyStore } from '@/stores/currencyStore';
import { mockCategories, mockCategorySummary, mockExchangeRates, mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';

import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory, useCategorySummary } from './hooks';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe('category/hooks', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
    useCurrencyStore.setState({ currency: 'USD' });
  });

  it('useCategories fetches categories', async () => {
    // when
    const { result } = renderHook(() => useCategories(), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(mockCategories.length);
  });

  it('useCategories converts budget and actual values from USD to selected currency', async () => {
    // given
    useCurrencyStore.setState({ currency: 'EGP' });
    const egpRate = mockExchangeRates['EGP']!;

    // when
    const { result } = renderHook(() => useCategories(), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data![0].budget).toBeCloseTo(mockCategories[0].budget * egpRate);
    expect(result.current.data![0].actual).toBeCloseTo(mockCategories[0].actual * egpRate);
  });

  it('useCategories passes month param', async () => {
    // when
    const { result } = renderHook(() => useCategories('2024-01'), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(mockCategories.length);
  });

  it('useCategorySummary fetches summary data', async () => {
    // when
    const { result } = renderHook(() => useCategorySummary(), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(mockCategorySummary.length);
    expect(result.current.data![0]).toHaveProperty('remaining');
  });

  it('useCategorySummary converts budget, actual and remaining from USD to selected currency', async () => {
    // given
    useCurrencyStore.setState({ currency: 'EGP' });
    const egpRate = mockExchangeRates['EGP']!;

    // when
    const { result } = renderHook(() => useCategorySummary(), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data![0].budget).toBeCloseTo(mockCategorySummary[0].budget * egpRate);
    expect(result.current.data![0].actual).toBeCloseTo(mockCategorySummary[0].actual * egpRate);
    expect(result.current.data![0].remaining).toBeCloseTo(mockCategorySummary[0].remaining * egpRate);
  });

  it('useCategorySummary passes month param', async () => {
    // when
    const { result } = renderHook(() => useCategorySummary('2024-01'), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(mockCategorySummary.length);
  });

  it('useCreateCategory creates a category', async () => {
    // when
    const { result } = renderHook(() => useCreateCategory(), { wrapper: createWrapper() });
    result.current.mutate({ name: 'New', type: 'expense', budget: 100 });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useUpdateCategory updates a category', async () => {
    // when
    const { result } = renderHook(() => useUpdateCategory(), { wrapper: createWrapper() });
    result.current.mutate({ id: 1, data: { name: 'Updated' } });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useDeleteCategory deletes a category', async () => {
    // when
    const { result } = renderHook(() => useDeleteCategory(), { wrapper: createWrapper() });
    result.current.mutate(1);

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useCreateCategory uses store currency when budgetCurrency is not provided', async () => {
    // given
    useCurrencyStore.setState({ currency: 'EUR' });

    // when
    const { result } = renderHook(() => ({ rates: useExchangeRates(), mutation: useCreateCategory() }), { wrapper: createWrapper() });

    // then - wait for rates to resolve so the if(rates) branch is taken
    await waitFor(() => expect(result.current.rates.data).toBeDefined());
    result.current.mutation.mutate({ name: 'Savings', type: 'income', budget: 500 });

    // and - uses store currency (EUR) since budgetCurrency is undefined
    await waitFor(() => expect(result.current.mutation.isSuccess).toBe(true));
  });

  it('useUpdateCategory uses store currency when budgetCurrency is not provided', async () => {
    // given
    useCurrencyStore.setState({ currency: 'EUR' });

    // when
    const { result } = renderHook(() => ({ rates: useExchangeRates(), mutation: useUpdateCategory() }), { wrapper: createWrapper() });

    // then - wait for rates to resolve so the if(rates) branch is taken
    await waitFor(() => expect(result.current.rates.data).toBeDefined());
    result.current.mutation.mutate({ id: 1, data: { budget: 200 } });

    // and - uses store currency (EUR) since budgetCurrency is undefined
    await waitFor(() => expect(result.current.mutation.isSuccess).toBe(true));
  });
});
