import type { ExchangeRates } from '@/api/exchangeRates';

import { useCurrencyStore } from '@/stores/currencyStore';

/**
 * Supported currency options presented in currency selector fields.
 * Shared by TransactionForm and CategoryForm.
 */
export const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
  { value: 'JPY', label: 'JPY — Japanese Yen' },
  { value: 'CAD', label: 'CAD — Canadian Dollar' },
  { value: 'AUD', label: 'AUD — Australian Dollar' },
  { value: 'CHF', label: 'CHF — Swiss Franc' },
  { value: 'EGP', label: 'EGP — Egyptian Pound' },
];

/**
 * Returns the currency symbol for the given ISO 4217 currency code
 * (e.g. `"$"` for USD, `"£"` for GBP). Falls back to the raw code
 * when the `Intl` API cannot resolve a dedicated symbol.
 *
 * @param currency - An ISO 4217 currency code.
 * @returns The currency symbol string.
 */
export function getCurrencySymbol(currency: string): string {
  const symbol = new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })
    .formatToParts(0)
    .find(part => part.type === 'currency')?.value;
  // v8 ignore next
  return symbol ?? currency;
}

/**
 * Formats a numeric value as a localized currency string using the en-US locale.
 *
 * @param value - The numeric amount to format.
 * @param currency - An ISO 4217 currency code (e.g. `'USD'`, `'EGP'`).
 * @returns A formatted string such as `"$1,234.50"`.
 */
export function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

/**
 * React hook that returns a single-argument formatter bound to the user's
 * currently selected currency.
 *
 * Reads the active currency from the currency store so callers do not need to
 * manage the store subscription themselves.
 *
 * @returns A function `(value: number) => string` that formats any amount in
 *   the user's selected currency.
 *
 * @example
 * const formatCurrency = useCurrencyFormatter();
 * return <span>{formatCurrency(transaction.value)}</span>;
 */
export function useCurrencyFormatter(): (value: number) => string {
  const currency = useCurrencyStore(state => state.currency);
  return (value: number) => formatCurrency(value, currency);
}

/**
 * React hook that returns the currency symbol for the user's currently
 * selected currency (e.g. `"$"` for USD, `"£"` for GBP).
 *
 * Falls back to the raw ISO currency code when the `Intl` API cannot resolve
 * a dedicated symbol.
 *
 * @returns The currency symbol string.
 */
export function useCurrencySymbol(): string {
  const currency = useCurrencyStore(state => state.currency);

  return getCurrencySymbol(currency);
}

/**
 * Returns the formatted display value for a transaction.
 *
 * Prefers `originalValue` + `currency` when both are present (the amount the
 * user originally entered), otherwise falls back to the USD-stored `value`
 * converted to the active display currency via `useCurrencyFormatter`.
 *
 * @param originalValue - The value in the original entry currency, if stored.
 * @param currency - The ISO 4217 code for `originalValue`, if stored.
 * @param value - The USD-stored fallback amount.
 * @returns A formatted currency string.
 */
export function useTransactionDisplayValue(originalValue: number | undefined, currency: string | undefined, value: number): string {
  const formatCurrentCurrency = useCurrencyFormatter();
  if (originalValue !== undefined && currency) {
    return formatCurrency(originalValue, currency);
  }

  return formatCurrentCurrency(value);
}

/**
 * Converts a value from the user's selected currency to USD for backend storage.
 *
 * Uses the exchange rate for `currency` relative to USD. Falls back to a 1:1
 * rate when the currency is absent from `rates`.
 *
 * @param value - The amount in the user's display currency.
 * @param currency - An ISO 4217 currency code identifying the source currency.
 * @param rates - A map of ISO currency codes to their USD exchange rates.
 * @returns The equivalent amount in USD.
 */
export function toUSD(value: number, currency: string, rates: ExchangeRates): number {
  const rate = rates[currency] ?? 1;
  return value / rate;
}

/**
 * Formatter for Ant Design `InputNumber` — adds thousands separators using the
 * en-US locale. While the user is actively typing the raw `input` string is
 * returned as-is to avoid interfering with cursor position.
 *
 * Pair with {@link parseNumberInput} as the `parser` prop.
 *
 * @param value - The current numeric value managed by `InputNumber`.
 * @param info - Metadata supplied by `InputNumber` on each keystroke.
 * @returns The formatted display string.
 *
 * @example
 * <InputNumber formatter={formatNumberInput} parser={parseNumberInput} />
 */
export function formatNumberInput(value: number | string | undefined, info?: { userTyping: boolean; input: string }): string {
  if (info?.userTyping) return info.input;
  if (value === undefined || value === null || value === '') return '';
  const num = Number(value);
  return Number.isNaN(num) ? String(value) : new Intl.NumberFormat('en-US').format(num);
}

/**
 * Parser counterpart for {@link formatNumberInput} — strips the en-US
 * thousands-separator commas so `InputNumber` receives a clean numeric string.
 *
 * @param value - The formatted display string from the input.
 * @returns A numeric string with all comma separators removed.
 *
 * @example
 * <InputNumber formatter={formatNumberInput} parser={parseNumberInput} />
 */
export function parseNumberInput(value: string | undefined): string {
  return value?.replaceAll(/,/g, '') ?? '';
}

/**
 * Converts a USD value from backend storage to the user's selected display currency.
 *
 * Uses the exchange rate for `currency` relative to USD. Falls back to a 1:1
 * rate when the currency is absent from `rates`.
 *
 * @param value - The amount in USD.
 * @param currency - An ISO 4217 currency code identifying the target currency.
 * @param rates - A map of ISO currency codes to their USD exchange rates.
 * @returns The equivalent amount in the target display currency.
 */
export function fromUSD(value: number, currency: string, rates: ExchangeRates): number {
  const rate = rates[currency] ?? 1;
  return value * rate;
}
