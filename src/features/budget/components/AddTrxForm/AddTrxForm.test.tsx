import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import AddTrxForm from './AddTrxForm';

describe('AddTrxForm', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('renders Add Transaction button', () => {
    // when
    renderWithProviders(<AddTrxForm />);

    // then
    expect(screen.getByRole('button', { name: 'Add Transaction' })).toBeInTheDocument();
  });

  it('opens modal on button click', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    expect(screen.getByText('Add New Transaction')).toBeInTheDocument();
  });

  it('shows income and expense radio buttons', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    expect(screen.getByRole('radio', { name: 'Income' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Expense' })).toBeInTheDocument();
  });

  it('shows title, value, and date fields', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    expect(screen.getByPlaceholderText('Transaction title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Transaction value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select transaction date')).toBeInTheDocument();
  });

  it('shows income categories by default', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));
    expect(await screen.findByRole('radio', { name: 'Salary' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Freelance' })).toBeInTheDocument();
  });

  it('closes modal on cancel', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    // and - close modal
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => {
      expect(screen.queryByText('Add New Transaction')).not.toBeVisible();
    });
  });

  it('switches to expense categories when expense type is selected', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));
    await screen.findByRole('radio', { name: 'Salary' });

    // and - switch to expense
    await user.click(screen.getByText('Expense'));
    await screen.findByRole('radio', { name: 'Food' });
    expect(screen.getByRole('radio', { name: 'Rent' })).toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: 'Salary' })).not.toBeInTheDocument();
  });

  it('shows status and recurring fields', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Recurring')).toBeInTheDocument();
  });

  it('submits a new transaction and closes modal', async () => {
    // when
    const { user } = renderWithProviders(<AddTrxForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));
    await screen.findByRole('radio', { name: 'Salary' });

    // and - fill form
    await user.type(screen.getByPlaceholderText('Transaction title'), 'New Income');
    await user.type(screen.getByPlaceholderText('Transaction value'), '500');

    // and - select category
    await user.click(screen.getByText('Salary'));

    // and - submit form
    const submitButtons = screen.getAllByRole('button', { name: 'Add Transaction' });
    await user.click(submitButtons[submitButtons.length - 1]);

    // and - modal closed
    await waitFor(() => {
      expect(screen.queryByText('Add New Transaction')).not.toBeVisible();
    });
  });
});
