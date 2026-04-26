import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import BankPage from './BankPage';

describe('BankPage', () => {
  it('renders coming soon component', () => {
    // when
    renderWithProviders(<BankPage />);

    // then
    expect(screen.getByText('Bank')).toBeInTheDocument();
    expect(screen.getByText('Banking features are under development.')).toBeInTheDocument();
  });
});
