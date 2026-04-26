import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { server } from '@/tests/server';

import { getExchangeRates } from './exchangeRates';

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY as string;
const EXCHANGE_RATE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

describe('getExchangeRates', () => {
  it('returns conversion rates on success', async () => {
    // given
    server.use(http.get(EXCHANGE_RATE_URL, () => HttpResponse.json({ result: 'success', conversion_rates: { USD: 1, EGP: 49.5, EUR: 0.92 } })));

    // when
    const rates = await getExchangeRates();

    // then
    expect(rates).toEqual({ USD: 1, EGP: 49.5, EUR: 0.92 });
  });

  it('throws an error when the response is not ok', async () => {
    // given
    server.use(http.get(EXCHANGE_RATE_URL, () => new HttpResponse(null, { status: 500 })));

    // when / then
    await expect(getExchangeRates()).rejects.toThrow('Exchange rates fetch failed: 500');
  });
});
