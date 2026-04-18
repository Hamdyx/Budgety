import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import AddCategory from './AddCategory';

describe('AddCategory', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  it('renders add button', () => {
    // when
    renderWithProviders(<AddCategory />);

    // then
    expect(document.querySelector('.anticon-plus')).toBeInTheDocument();
  });

  it('opens modal on click', async () => {
    // when
    const { user } = renderWithProviders(<AddCategory />);

    // then
    await user.click(document.querySelector('.anticon-plus')!.closest('button')!);
    expect(screen.getByText('Add Category')).toBeInTheDocument();
  });

  it('shows form fields', async () => {
    // when
    const { user } = renderWithProviders(<AddCategory />);

    // then
    await user.click(document.querySelector('.anticon-plus')!.closest('button')!);
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('Expense')).toBeInTheDocument();
    expect(screen.getByLabelText('Budget')).toBeInTheDocument();
  });

  it('defaults to expense type', async () => {
    // when
    const { user } = renderWithProviders(<AddCategory />);

    // then
    await user.click(document.querySelector('.anticon-plus')!.closest('button')!);
    // Expense radio should be checked by default
    const expenseRadio = screen.getByLabelText('Expense');
    expect(expenseRadio).toBeChecked();
  });

  it('submits form and closes modal', async () => {
    // when
    const { user } = renderWithProviders(<AddCategory />);

    // then
    await user.click(document.querySelector('.anticon-plus')!.closest('button')!);

    await user.type(screen.getByLabelText('Category'), 'Transportation');
    await user.type(screen.getByLabelText('Budget'), '500');
    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.queryByText('Add Category')).not.toBeVisible();
    });
  });
});
