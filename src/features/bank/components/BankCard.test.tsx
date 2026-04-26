import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import BankCard from './BankCard';

describe('BankCard', () => {
  it('renders bank title', () => {
    // when
    renderWithProviders(<BankCard />);

    // then
    expect(screen.getByText('Bank')).toBeInTheDocument();
  });

  it('renders net worth and total debt statistics', () => {
    // when
    renderWithProviders(<BankCard />);

    // then
    expect(screen.getByText('Net Worth')).toBeInTheDocument();
    expect(screen.getByText('Total Debt')).toBeInTheDocument();
  });

  it('renders badge items', () => {
    // when
    renderWithProviders(<BankCard />);

    // then
    expect(screen.getByText('Deposits')).toBeInTheDocument();
    expect(screen.getByText('Loans')).toBeInTheDocument();
    expect(screen.getByText('Credit Card')).toBeInTheDocument();
  });
});
