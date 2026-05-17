import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockTransactions, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import DeleteTransactionModal from './DeleteTransactionModal';

describe('DeleteTransactionModal', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('renders delete button', () => {
    // when
    renderWithProviders(<DeleteTransactionModal id={mockTransactions[0].id} />);

    // then
    expect(screen.getByLabelText('Delete transaction')).toBeInTheDocument();
  });

  it('opens modal on click', async () => {
    // when
    const { user } = renderWithProviders(<DeleteTransactionModal id={mockTransactions[0].id} />);

    // then
    await user.click(screen.getByLabelText('Delete transaction'));

    expect(screen.getByText('Are you sure you want to delete this transaction?')).toBeInTheDocument();
  });

  it('closes modal on cancel', async () => {
    // when
    const { user } = renderWithProviders(<DeleteTransactionModal id={mockTransactions[0].id} />);

    // then
    await user.click(screen.getByLabelText('Delete transaction'));

    // and - cancel
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => {
      expect(screen.queryByText('Are you sure you want to delete this transaction?')).not.toBeVisible();
    });
  });

  it('deletes transaction on confirm', async () => {
    // when
    const { user } = renderWithProviders(<DeleteTransactionModal id={mockTransactions[0].id} />);

    // then
    await user.click(screen.getByLabelText('Delete transaction'));

    // and - confirm deletion
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() => {
      expect(screen.queryByText('Are you sure you want to delete this transaction?')).not.toBeVisible();
    });
  });

  it('shows error message when delete fails', async () => {
    // given
    server.use(http.delete('*/transactions/*', () => HttpResponse.json({ detail: 'error' }, { status: 500 })));

    // when
    const { user } = renderWithProviders(<DeleteTransactionModal id={mockTransactions[0].id} />);

    // then
    await user.click(screen.getByLabelText('Delete transaction'));
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    // and
    await waitFor(() => {
      expect(screen.getByText('Failed to delete transaction')).toBeInTheDocument();
    });
  });
});
