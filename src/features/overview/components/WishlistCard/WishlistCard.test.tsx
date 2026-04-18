import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import WishlistCard from './WishlistCard';

describe('WishlistCard', () => {
  it('renders wishlist title', () => {
    // when
    renderWithProviders(<WishlistCard />);

    // then
    expect(screen.getByText('Wishlist')).toBeInTheDocument();
  });

  it('renders value and spent statistics', () => {
    // when
    renderWithProviders(<WishlistCard />);

    // then
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Spent')).toBeInTheDocument();
  });
});
