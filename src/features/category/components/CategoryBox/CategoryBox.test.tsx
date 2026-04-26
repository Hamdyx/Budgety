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

  it('renders category name', () => {
    // when
    renderWithProviders(<CategoryBox category={category} />);

    // then
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('renders spent amount', () => {
    // when
    renderWithProviders(<CategoryBox category={category} />);

    // then
    expect(screen.getByText('$600.00 spent')).toBeInTheDocument();
  });

  it('renders remaining amount', () => {
    // when
    renderWithProviders(<CategoryBox category={category} />);

    // then
    expect(screen.getByText('$200.00 remaining')).toBeInTheDocument();
  });

  it('opens edit modal on edit button click', async () => {
    // when
    const { user } = renderWithProviders(<CategoryBox category={category} />);

    // then
    await user.click(screen.getByRole('button', { name: 'Edit category' }));

    expect(await screen.findByText('Edit Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
  });

  it('deletes category on confirm', async () => {
    // when
    const { user } = renderWithProviders(<CategoryBox category={category} />);

    // then
    await user.click(screen.getByRole('button', { name: 'Delete category' }));

    // and - confirm delete in popconfirm
    await user.click(await screen.findByRole('button', { name: 'Delete' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Delete category' })).toBeInTheDocument();
    });
  });

  it('shows negative remaining for over-budget category', () => {
    // given
    const overBudget = { ...category, actual: 1000 };

    // when
    renderWithProviders(<CategoryBox category={overBudget} />);

    // then
    expect(screen.getByText('-$200.00 remaining')).toBeInTheDocument();
  });

  it('saves category on modal ok click', async () => {
    // when
    const { user } = renderWithProviders(<CategoryBox category={category} />);

    // then - open modal
    await user.click(screen.getByRole('button', { name: 'Edit category' }));
    await screen.findByText('Edit Category');

    // and - save
    await user.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => {
      expect(screen.queryByText('Edit Category')).not.toBeInTheDocument();
    });
  });

  it('renders "earned" for income categories', () => {
    // given
    const incomeCategory = { ...category, type: 'income' as const, actual: 500 };

    // when
    renderWithProviders(<CategoryBox category={incomeCategory} />);

    // then
    expect(screen.getByText('$500.00 earned')).toBeInTheDocument();
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
