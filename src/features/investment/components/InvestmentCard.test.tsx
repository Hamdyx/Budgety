import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import InvestmentCard from './InvestmentCard';

describe('InvestmentCard', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('renders investment overview card', async () => {
    // when
    renderWithProviders(<InvestmentCard />);

    // then
    expect(await screen.findByText('Investment')).toBeInTheDocument();
  });

  it('renders market value and cash balance', async () => {
    // when
    renderWithProviders(<InvestmentCard />);

    // then
    await screen.findByText('Market Value');
    expect(screen.getByText('Cash Balance')).toBeInTheDocument();
  });

  it('renders portfolio and transactions links', async () => {
    // when
    renderWithProviders(<InvestmentCard />);

    // then
    expect(await screen.findByRole('button', { name: 'Portfolio' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Transactions' })).toBeInTheDocument();
  });

  it('opens modal on add button click', async () => {
    // when
    const { user } = renderWithProviders(<InvestmentCard />);

    // then
    await screen.findByText('Investment');

    // and - open modal
    const addButton = screen.getByRole('button', { name: 'Add' });
    await user.click(addButton);

    expect(screen.getByText('All Transactions')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', async () => {
    // when
    const { user } = renderWithProviders(<InvestmentCard />);

    // then
    await screen.findByText('Investment');

    // and - open modal
    const addButton = screen.getByRole('button', { name: 'Add' });
    await user.click(addButton);
    expect(screen.getByText('All Transactions')).toBeInTheDocument();

    // and - close modal
    await user.click(screen.getByText('Close'));
    await waitFor(() => {
      expect(screen.queryByText('All Transactions')).not.toBeVisible();
    });
  });
});
