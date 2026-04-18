import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import InvestmentPage from './InvestmentPage';

describe('InvestmentPage', () => {
  it('renders investments header', () => {
    // when
    renderWithProviders(<InvestmentPage />);

    // then
    expect(screen.getByText('Investments')).toBeInTheDocument();
  });

  it('renders investment card', () => {
    // when
    renderWithProviders(<InvestmentPage />);

    // then
    expect(screen.getByText('Investment')).toBeInTheDocument();
  });
});
