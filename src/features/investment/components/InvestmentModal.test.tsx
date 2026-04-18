import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/render';

import InvestmentModal from './InvestmentModal';

describe('InvestmentModal', () => {
  it('renders modal when open', () => {
    // when
    renderWithProviders(<InvestmentModal open={true} onClose={() => {}} />);

    // then
    expect(screen.getByText('All Transactions')).toBeInTheDocument();
  });

  it('does not render modal when closed', () => {
    // when
    renderWithProviders(<InvestmentModal open={false} onClose={() => {}} />);

    // then
    expect(screen.queryByText('All Transactions')).not.toBeInTheDocument();
  });

  it('renders Close and Add Transaction buttons', () => {
    // when
    renderWithProviders(<InvestmentModal open={true} onClose={() => {}} />);

    // then
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('Add Transaction')).toBeInTheDocument();
  });

  it('calls onClose when Close button clicked', async () => {
    // given
    let closed = false;

    // when
    const { user } = renderWithProviders(
      <InvestmentModal
        open={true}
        onClose={() => {
          closed = true;
        }}
      />
    );

    // then
    await user.click(screen.getByText('Close'));
    expect(closed).toBe(true);
  });
});
