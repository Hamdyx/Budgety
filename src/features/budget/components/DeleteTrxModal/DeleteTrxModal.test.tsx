import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken, mockTransactions } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import DeleteTrxModal from './DeleteTrxModal';

describe('DeleteTrxModal', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('renders delete button', () => {
    // when
    renderWithProviders(<DeleteTrxModal id={mockTransactions[0].id} />);

    // then
    expect(screen.getByLabelText('Delete transaction')).toBeInTheDocument();
  });

  it('opens modal on click', async () => {
    // when
    const { user } = renderWithProviders(<DeleteTrxModal id={mockTransactions[0].id} />);

    // then
    await user.click(screen.getByLabelText('Delete transaction'));

    expect(screen.getByText('Are you sure you want to delete this transaction?')).toBeInTheDocument();
  });

  it('closes modal on cancel', async () => {
    // when
    const { user } = renderWithProviders(<DeleteTrxModal id={mockTransactions[0].id} />);

    // then
    await user.click(screen.getByLabelText('Delete transaction'));

    // and - cancel
    await user.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(screen.queryByText('Are you sure you want to delete this transaction?')).not.toBeVisible();
    });
  });

  it('deletes transaction on confirm', async () => {
    // when
    const { user } = renderWithProviders(<DeleteTrxModal id={mockTransactions[0].id} />);

    // then
    await user.click(screen.getByLabelText('Delete transaction'));

    // and - confirm deletion
    await user.click(screen.getByText('Delete'));
    await waitFor(() => {
      expect(screen.queryByText('Are you sure you want to delete this transaction?')).not.toBeVisible();
    });
  });
});
