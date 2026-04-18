import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import AddTrxForm from './AddTrxForm';

describe('AddTrxForm', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('renders Add Transaction button', () => {
    // when
    renderWithProviders(<AddTrxForm />);

    // then
    expect(screen.getByText('Add Transaction')).toBeInTheDocument();
  });

  it('opens modal on button click', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByText('Add Transaction'));

    expect(screen.getByText('Add New Transaction')).toBeInTheDocument();
  });

  it('shows income and expense radio buttons', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByText('Add Transaction'));

    expect(screen.getByLabelText('Income')).toBeInTheDocument();
    expect(screen.getByLabelText('Expense')).toBeInTheDocument();
  });

  it('shows title, value, and date fields', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByText('Add Transaction'));

    expect(screen.getByPlaceholderText('Transaction title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Transaction value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select transaction date')).toBeInTheDocument();
  });

  it('shows income categories by default', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByText('Add Transaction'));
    await waitFor(() => {
      expect(screen.getByText('Salary')).toBeInTheDocument();
      expect(screen.getByText('Freelance')).toBeInTheDocument();
    });
  });

  it('closes modal on cancel', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByText('Add Transaction'));

    // and - close modal
    await user.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(screen.queryByText('Add New Transaction')).not.toBeVisible();
    });
  });

  it('switches to expense categories when expense type is selected', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByText('Add Transaction'));
    await waitFor(() => {
      expect(screen.getByText('Salary')).toBeInTheDocument();
    });

    // and - switch to expense
    await user.click(screen.getByText('Expense'));
    await waitFor(() => {
      expect(screen.getByText('Food')).toBeInTheDocument();
      expect(screen.getByText('Rent')).toBeInTheDocument();
      expect(screen.queryByText('Salary')).not.toBeInTheDocument();
    });
  });

  it('submits a new transaction and closes modal', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByText('Add Transaction'));
    await waitFor(() => {
      expect(screen.getByText('Salary')).toBeInTheDocument();
    });

    // and - fill form
    await user.type(screen.getByPlaceholderText('Transaction title'), 'New Income');
    await user.type(screen.getByPlaceholderText('Transaction value'), '500');

    // and - select category
    await user.click(screen.getByText('Salary'));

    // and - submit form
    const submitButtons = screen.getAllByText('Add Transaction');
    await user.click(submitButtons[submitButtons.length - 1]);

    // and - modal closed
    await waitFor(() => {
      expect(screen.queryByText('Add New Transaction')).not.toBeVisible();
    });
  });
});
