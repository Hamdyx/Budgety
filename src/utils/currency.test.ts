import { describe, expect, it } from 'vitest';

import { formatCurrency, formatNumberInput, fromUSD, parseNumberInput, toUSD } from './currency';

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
