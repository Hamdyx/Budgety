import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import SavingsCard from './SavingsCard';

describe('SavingsCard', () => {
  it('renders savings title', () => {
    // when
    renderWithProviders(<SavingsCard />);

    // then
    expect(screen.getByText('Savings')).toBeInTheDocument();
  });

  it('renders coming soon placeholder', () => {
    // when
    renderWithProviders(<SavingsCard />);

    // then
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });
});
