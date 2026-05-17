import { renderHook } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useCurrencyStore } from '@/stores/currencyStore';

import {
  CURRENCY_OPTIONS,
  formatCurrency,
  formatNumberInput,
  fromUSD,
  getCurrencySymbol,
  parseNumberInput,
  toUSD,
  useCurrencyFormatter,
  useCurrencySymbol,
  useTransactionDisplayValue,
} from './currency';

describe('currency', () => {
  describe('formatCurrency', () => {
    it('formats a USD value', () => {
      expect(formatCurrency(1234.5, 'USD')).toBe('$1,234.50');
    });

    it('formats an EGP value', () => {
      expect(formatCurrency(100, 'EGP')).toContain('100');
    });
  });

  describe('toUSD', () => {
    const rates = { USD: 1, EGP: 50, EUR: 0.9 };

    it('converts EGP to USD', () => {
      // when / then: 500 / 50 = 10 USD
      expect(toUSD(500, 'EGP', rates)).toBeCloseTo(10);
    });

    it('returns the same value for USD', () => {
      expect(toUSD(100, 'USD', rates)).toBeCloseTo(100);
    });

    it('falls back to 1:1 when rate is missing', () => {
      expect(toUSD(100, 'UNKNOWN', rates)).toBeCloseTo(100);
    });
  });

  describe('fromUSD', () => {
    const rates = { USD: 1, EGP: 50, EUR: 0.9 };

    it('converts USD to EGP', () => {
      // when / then: 10 * 50 = 500 EGP
      expect(fromUSD(10, 'EGP', rates)).toBeCloseTo(500);
    });

    it('returns the same value for USD', () => {
      expect(fromUSD(100, 'USD', rates)).toBeCloseTo(100);
    });

    it('falls back to 1:1 when rate is missing', () => {
      expect(fromUSD(100, 'UNKNOWN', rates)).toBeCloseTo(100);
    });
  });

  describe('formatNumberInput', () => {
    it('formats a whole number with thousands separators', () => {
      expect(formatNumberInput(1234)).toBe('1,234');
    });

    it('formats a decimal number preserving fractional digits', () => {
      expect(formatNumberInput(1234567.89)).toBe('1,234,567.89');
    });

    it('returns the raw input string while the user is typing', () => {
      // given
      const info = { userTyping: true, input: '1234' };

      // when / then
      expect(formatNumberInput(1234, info)).toBe('1234');
    });

    it('returns an empty string for undefined', () => {
      expect(formatNumberInput(undefined)).toBe('');
    });

    it('returns an empty string for an empty string value', () => {
      expect(formatNumberInput('')).toBe('');
    });

    it('returns the raw string value when it cannot be converted to a number', () => {
      expect(formatNumberInput('abc')).toBe('abc');
    });
  });

  describe('parseNumberInput', () => {
    it('strips thousands separator commas', () => {
      expect(parseNumberInput('1,234,567.89')).toBe('1234567.89');
    });

    it('leaves a plain numeric string unchanged', () => {
      expect(parseNumberInput('123.45')).toBe('123.45');
    });

    it('returns an empty string for undefined', () => {
      expect(parseNumberInput(undefined)).toBe('');
    });
  });
});

describe('CURRENCY_OPTIONS', () => {
  it('contains 8 entries', () => {
    expect(CURRENCY_OPTIONS).toHaveLength(8);
  });

  it('includes USD as the first entry', () => {
    expect(CURRENCY_OPTIONS[0].value).toBe('USD');
  });

  it('all entries have value and label properties', () => {
    CURRENCY_OPTIONS.forEach(option => {
      expect(option).toHaveProperty('value');
      expect(option).toHaveProperty('label');
    });
  });
});

describe('getCurrencySymbol', () => {
  it('returns $ for USD', () => {
    expect(getCurrencySymbol('USD')).toBe('$');
  });

  it('returns € for EUR', () => {
    expect(getCurrencySymbol('EUR')).toBe('€');
  });

  it('returns £ for GBP', () => {
    expect(getCurrencySymbol('GBP')).toBe('£');
  });

  it('falls back to currency code for unknown currency', () => {
    expect(getCurrencySymbol('XYZ')).toBe('XYZ');
  });
});

describe('useCurrencyFormatter', () => {
  beforeEach(() => {
    useCurrencyStore.getState().setCurrency('USD');
  });

  it('returns a formatter bound to the store currency', () => {
    // when
    const { result } = renderHook(() => useCurrencyFormatter());

    // then
    expect(result.current(1234.56)).toBe('$1,234.56');
  });

  it('reflects currency changes in the store', () => {
    // given
    useCurrencyStore.getState().setCurrency('GBP');

    // when
    const { result } = renderHook(() => useCurrencyFormatter());

    // then
    expect(result.current(100)).toBe('£100.00');
  });
});

describe('useCurrencySymbol', () => {
  beforeEach(() => {
    useCurrencyStore.getState().setCurrency('USD');
  });

  it('returns $ when store currency is USD', () => {
    // when
    const { result } = renderHook(() => useCurrencySymbol());

    // then
    expect(result.current).toBe('$');
  });

  it('returns £ when store currency is GBP', () => {
    // given
    useCurrencyStore.getState().setCurrency('GBP');

    // when
    const { result } = renderHook(() => useCurrencySymbol());

    // then
    expect(result.current).toBe('£');
  });
});

describe('useTransactionDisplayValue', () => {
  beforeEach(() => {
    useCurrencyStore.getState().setCurrency('USD');
  });

  it('formats originalValue in the given currency when both are provided', () => {
    // when
    const { result } = renderHook(() => useTransactionDisplayValue(100, 'EUR', 200));

    // then
    expect(result.current).toBe('€100.00');
  });

  it('falls back to store currency when originalValue is undefined', () => {
    // when
    const { result } = renderHook(() => useTransactionDisplayValue(undefined, undefined, 200));

    // then
    expect(result.current).toBe('$200.00');
  });

  it('falls back to store currency when currency is undefined', () => {
    // when
    const { result } = renderHook(() => useTransactionDisplayValue(100, undefined, 200));

    // then
    expect(result.current).toBe('$200.00');
  });
});
