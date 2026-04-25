import type { ExchangeRates } from '@/api/exchangeRates';

import { useCurrencyStore } from '@/stores/currencyStore';

export function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

export function useCurrencyFormatter(): (value: number) => string {
  const currency = useCurrencyStore(state => state.currency);
  return (value: number) => formatCurrency(value, currency);
}

export function useCurrencySymbol(): string {
  const currency = useCurrencyStore(state => state.currency);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).formatToParts(0).find(part => part.type === 'currency')?.value ?? currency;
}

/** Convert a value from the user's selected currency to USD for backend storage. */
export function toUSD(value: number, currency: string, rates: ExchangeRates): number {
  const rate = rates[currency] ?? 1;
  return value / rate;
}

/** Convert a USD value from backend storage to the user's selected display currency. */
export function fromUSD(value: number, currency: string, rates: ExchangeRates): number {
  const rate = rates[currency] ?? 1;
  return value * rate;
}
