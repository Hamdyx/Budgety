import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import ComingSoon from './ComingSoon';

describe('ComingSoon', () => {
  it('renders default title and subtitle', () => {
    // when
    renderWithProviders(<ComingSoon />);

    // then
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    expect(screen.getByText('This feature is currently in progress.')).toBeInTheDocument();
  });

  it('renders custom title and subtitle', () => {
    // when
    renderWithProviders(<ComingSoon title="Bank" subtitle="Banking features are under development." />);

    // then
    expect(screen.getByText('Bank')).toBeInTheDocument();
    expect(screen.getByText('Banking features are under development.')).toBeInTheDocument();
  });
});
