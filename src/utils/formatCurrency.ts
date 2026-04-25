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
