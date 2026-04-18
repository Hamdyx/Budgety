import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import InvestmentTable from './InvestmentTable';

describe('InvestmentTable', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('renders table headers', async () => {
    // when
    renderWithProviders(<InvestmentTable />);

    // then
    await waitFor(() => {
      expect(screen.getAllByText('Name').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Buy Price').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Buy Amount').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Holdings').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Sell Price').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Sell Amount').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Profit %').length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders investment data rows', async () => {
    // when
    renderWithProviders(<InvestmentTable />);

    // then
    await waitFor(() => {
      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByText('ETH')).toBeInTheDocument();
    });
  });

  it('renders totals summary', async () => {
    // when
    renderWithProviders(<InvestmentTable />);

    // then
    await waitFor(() => {
      expect(screen.getByText(/Total Buy:/)).toBeInTheDocument();
      expect(screen.getByText(/Total Sell:/)).toBeInTheDocument();
      expect(screen.getByText(/Profit:/)).toBeInTheDocument();
    });
  });
});
