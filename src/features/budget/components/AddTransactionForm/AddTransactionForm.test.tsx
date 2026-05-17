import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockCategoriesSnake, mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';
import { server } from '@/tests/server';

import AddTransactionForm from './AddTransactionForm';

describe('AddTransactionForm', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
  });

  it('renders Add Transaction button', () => {
    // when
    renderWithProviders(<AddTransactionForm />);

    // then
    expect(screen.getByRole('button', { name: 'Add Transaction' })).toBeInTheDocument();
  });

  it('opens modal on button click', async () => {
    // when
    const { user } = renderWithProviders(<AddTransactionForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    expect(screen.getByText('Add New Transaction')).toBeInTheDocument();
  });

  it('shows income and expense radio buttons', async () => {
    // when
    const { user } = renderWithProviders(<AddTransactionForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    expect(screen.getByRole('radio', { name: 'Income' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Expense' })).toBeInTheDocument();
  });

  it('shows title, value, and date fields', async () => {
    // when
    const { user } = renderWithProviders(<AddTransactionForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    expect(screen.getByPlaceholderText('Transaction title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Transaction value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select transaction date')).toBeInTheDocument();
  });

  it('shows income categories by default', async () => {
    // when
    const { user } = renderWithProviders(<AddTransactionForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));
    expect(await screen.findByRole('radio', { name: 'Salary' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Freelance' })).toBeInTheDocument();
  });

  it('closes modal on cancel', async () => {
    // when
    const { user } = renderWithProviders(<AddTransactionForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    // and - close modal
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => {
      expect(screen.queryByText('Add New Transaction')).not.toBeInTheDocument();
    });
  });

  it('switches to expense categories when expense type is selected', async () => {
    // when
    const { user } = renderWithProviders(<AddTransactionForm />);

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
    const { user } = renderWithProviders(<AddTransactionForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Recurring')).toBeInTheDocument();
  });

  it('keeps the modal open when no categories match the selected type', async () => {
    // given
    server.use(http.get('*/categories', () => HttpResponse.json(mockCategoriesSnake.filter(category => category.type === 'expense'))));

    // when
    const { user } = renderWithProviders(<AddTransactionForm />);
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));
    await screen.findByText(/No income categories yet/i);

    // then
    await user.type(screen.getByPlaceholderText('Transaction title'), 'New Income');
    await user.type(screen.getByPlaceholderText('Transaction value'), '500');

    // and - submit stays blocked because category validation still runs
    const submitButtons = screen.getAllByRole('button', { name: 'Add Transaction' });
    await user.click(submitButtons[submitButtons.length - 1]);

    // and - successful mutation would close the modal, so it must remain open here
    await waitFor(() => {
      expect(screen.getByText('Add New Transaction')).toBeInTheDocument();
      expect(screen.getByText(/No income categories yet/i)).toBeInTheDocument();
    });
  });

  it('submits a new transaction and closes modal', async () => {
    // when
    const { user } = renderWithProviders(<AddTransactionForm />);

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
      expect(screen.queryByText('Add New Transaction')).not.toBeInTheDocument();
    });
  });

  it('submits a recurring transaction with recurrence rule', async () => {
    // when
    const { user } = renderWithProviders(<AddTransactionForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));
    await screen.findByRole('radio', { name: 'Salary' });

    // and - fill form
    await user.type(screen.getByPlaceholderText('Transaction title'), 'Recurring Income');
    await user.type(screen.getByPlaceholderText('Transaction value'), '3000');

    // and - select category
    await user.click(screen.getByText('Salary'));

    // and - enable recurring
    await user.click(screen.getByRole('switch'));

    // and - select recurrence rule from dropdown
    const comboboxes = screen.getAllByRole('combobox');
    const recurrenceCombobox = comboboxes[comboboxes.length - 1];
    await user.click(recurrenceCombobox);
    await user.click(await screen.findByTitle('Monthly'));

    // and - submit form
    const submitButtons = screen.getAllByRole('button', { name: 'Add Transaction' });
    await user.click(submitButtons[submitButtons.length - 1]);

    // and - modal closed
    await waitFor(() => {
      expect(screen.queryByText('Add New Transaction')).not.toBeInTheDocument();
    });
  }, 10_000);

  it('shows error message when transaction creation fails', async () => {
    // given
    server.use(http.post('*/transactions', () => HttpResponse.json({ detail: 'error' }, { status: 500 })));

    // when
    const { user } = renderWithProviders(<AddTransactionForm />);

    // then
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));
    await screen.findByRole('radio', { name: 'Salary' });

    await user.type(screen.getByPlaceholderText('Transaction title'), 'Test');
    await user.type(screen.getByPlaceholderText('Transaction value'), '100');
    await user.click(screen.getByText('Salary'));

    const submitButtons = screen.getAllByRole('button', { name: 'Add Transaction' });
    await user.click(submitButtons[submitButtons.length - 1]);

    // and
    await waitFor(() => {
      expect(screen.getByText('Failed to add transaction')).toBeInTheDocument();
    });
  });
});
