import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockExchangeRates } from '@/tests/fixtures';

import { useExchangeRates } from './useExchangeRates';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useExchangeRates', () => {
  it('fetches and returns exchange rates', async () => {
    // when
    const { result } = renderHook(() => useExchangeRates(), { wrapper: createWrapper() });

    // then
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockExchangeRates);
  });
});
