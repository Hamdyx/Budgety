import { useQuery } from '@tanstack/react-query';

import { getExchangeRates } from '@/api/exchangeRates';

export const EXCHANGE_RATES_QUERY_KEY = ['exchangeRates'] as const;

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function useExchangeRates() {
  return useQuery({
    queryKey: EXCHANGE_RATES_QUERY_KEY,
    queryFn: getExchangeRates,
    staleTime: ONE_DAY_MS,
    gcTime: ONE_DAY_MS,
  });
}
