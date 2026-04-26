import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import ReportsCard from './ReportsCard';

describe('ReportsCard', () => {
  it('renders reports title', () => {
    // when
    renderWithProviders(<ReportsCard />);

    // then
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  it('renders coming soon placeholder', () => {
    // when
    renderWithProviders(<ReportsCard />);

    // then
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });
});
