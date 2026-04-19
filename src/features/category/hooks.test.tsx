import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockCategories, mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';

import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from './hooks';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe('category/hooks', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('useCategories fetches categories', async () => {
    // when
    const { result } = renderHook(() => useCategories(), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(mockCategories.length);
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
});
