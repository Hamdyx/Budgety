import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockCategories, mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import CategoryBox from './CategoryBox';

describe('CategoryBox', () => {
  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
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

    // then
    const editButton = screen.getByRole('button', { name: 'Edit category' });
    await user.click(editButton);

    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('Expense')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete category' })).toBeInTheDocument();
  });

  it('deletes category on delete click', async () => {
    // when
    const { user } = renderWithProviders(<CategoryBox category={category} />);

    // then
    const editButton = screen.getByRole('button', { name: 'Edit category' });
    await user.click(editButton);

    // and - delete category
    const deleteButton = screen.getByRole('button', { name: 'Delete category' });
    await user.click(deleteButton);
    await waitFor(() => {
      expect(deleteButton).toBeInTheDocument();
    });
  });

  it('shows negative remaining for over-budget category', () => {
    // given
    const overBudget = { ...category, actual: 1000 };

    // when
    renderWithProviders(<CategoryBox category={overBudget} />);

    // then
    expect(screen.getByText('$-200 remaining')).toBeInTheDocument();
  });

  it('submits form on second edit click (saves)', async () => {
    // when
    const { user } = renderWithProviders(<CategoryBox category={category} />);

    // then
    const editButton = screen.getByRole('button', { name: 'Edit category' });
    await user.click(editButton);
    expect(screen.getByText('Income')).toBeInTheDocument();

    // and - save changes
    await user.click(editButton);
    await waitFor(() => {
      expect(screen.queryByText('Income')).not.toBeInTheDocument();
    });
  });

  it('renders "earned" for income categories', () => {
    // given
    const incomeCategory = { ...category, type: 'income' as const, actual: 500 };

    // when
    renderWithProviders(<CategoryBox category={incomeCategory} />);

    // then
    expect(screen.getByText('$500 earned')).toBeInTheDocument();
  });

  it('shows 0% progress when budget is zero', () => {
    // given
    const zeroBudget = { ...category, budget: 0, actual: 0 };

    // when
    renderWithProviders(<CategoryBox category={zeroBudget} />);

    // then
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });
});
