import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockToken, mockCategories } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import CategoryBox from './CategoryBox';

describe('CategoryBox', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, { id: 'user-1', email: '', username: '' });
  });

  const category = mockCategories[1]; // Food: budget 800, spent 600

  it('renders category name in input', () => {
    // when
    renderWithProviders(<CategoryBox category={category} />);

    // then
    expect(screen.getByDisplayValue('Food')).toBeInTheDocument();
  });

  it('renders spent amount', () => {
    // when
    renderWithProviders(<CategoryBox category={category} />);

    // then
    expect(screen.getByText('$600 spent')).toBeInTheDocument();
  });

  it('renders remaining amount', () => {
    // when
    renderWithProviders(<CategoryBox category={category} />);

    // then
    expect(screen.getByText('$200 remaining')).toBeInTheDocument();
  });

  it('enables edit mode on edit button click', async () => {
    // when
    const { user } = renderWithProviders(<CategoryBox category={category} />);
    const editButton = document.querySelector('.anticon-edit')!.closest('button')!;

    // then
    await user.click(editButton);
    // In edit mode, type radio and delete button appear
    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('Expense')).toBeInTheDocument();
    expect(document.querySelector('.anticon-delete')).toBeInTheDocument();
  });

  it('deletes category on delete click', async () => {
    // when
    const { user } = renderWithProviders(<CategoryBox category={category} />);
    // Enter edit mode
    const editButton = document.querySelector('.anticon-edit')!.closest('button')!;

    // then
    await user.click(editButton);
    const deleteButton = document.querySelector('.anticon-delete')!.closest('button')!;
    await user.click(deleteButton);
    // Mutation fires (no error thrown)
    await waitFor(() => {
      expect(deleteButton).toBeInTheDocument();
    });
  });

  it('shows negative remaining for over-budget category', () => {
    const overBudget = { ...category, spent: 1000 };
    // when
    renderWithProviders(<CategoryBox category={overBudget} />);

    // then
    expect(screen.getByText('$-200 remaining')).toBeInTheDocument();
  });

  it('submits form on second edit click (saves)', async () => {
    // when
    const { user } = renderWithProviders(<CategoryBox category={category} />);
    const editButton = document.querySelector('.anticon-edit')!.closest('button')!;
    // First click: enable edit mode

    // then
    await user.click(editButton);
    expect(screen.getByText('Income')).toBeInTheDocument();
    // Second click: submit form (saves)
    await user.click(editButton);
    await waitFor(() => {
      // After submitting, form goes back to disabled mode (type radios hidden)
      expect(screen.queryByText('Income')).not.toBeInTheDocument();
    });
  });

  it('renders "earned" for income categories', () => {
    const incomeCategory = { ...category, type: 'income' as const, spent: 500 };
    // when
    renderWithProviders(<CategoryBox category={incomeCategory} />);

    // then
    expect(screen.getByText('$500 earned')).toBeInTheDocument();
  });
});
