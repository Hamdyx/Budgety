import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken, mockInvestments } from '@/tests/fixtures';

import { useInvestments, useCreateInvestment, useUpdateInvestment, useDeleteInvestment } from './hooks';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('investment/hooks', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('useInvestments fetches investments', async () => {
    // when
    const { result } = renderHook(() => useInvestments(), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(mockInvestments.length);
  });

  it('useCreateInvestment creates an investment', async () => {
    // when
    const { result } = renderHook(() => useCreateInvestment(), { wrapper: createWrapper() });
    result.current.mutate({ name: 'SOL', buyPrice: 100, buyAmount: 500, sellPrice: 120 });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useUpdateInvestment updates an investment', async () => {
    // when
    const { result } = renderHook(() => useUpdateInvestment(), { wrapper: createWrapper() });
    result.current.mutate({ id: 1, data: { buyPrice: 50000 } });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useDeleteInvestment deletes an investment', async () => {
    // when
    const { result } = renderHook(() => useDeleteInvestment(), { wrapper: createWrapper() });
    result.current.mutate(1);

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
