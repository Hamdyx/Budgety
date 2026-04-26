import { describe, expect, it } from 'vitest';

import { formatCurrency, toUSD, fromUSD } from './formatCurrency';

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
    // 500 EGP / 50 = 10 USD
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
    // 10 USD * 50 = 500 EGP
    expect(fromUSD(10, 'EGP', rates)).toBeCloseTo(500);
  });

  it('returns the same value for USD', () => {
    expect(fromUSD(100, 'USD', rates)).toBeCloseTo(100);
  });

  it('falls back to 1:1 when rate is missing', () => {
    expect(fromUSD(100, 'UNKNOWN', rates)).toBeCloseTo(100);
  });
});
