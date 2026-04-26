import type { CategoryCreate } from '@/types/types';

import { screen, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useAuthStore } from '@/stores/authStore';
import { mockRefreshToken, mockToken, mockUser } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import { CategoryForm } from './index';

interface TestWrapperProps {
  onFinish?: (values: CategoryCreate) => void;
  initialValues?: Partial<CategoryCreate>;
}

function TestWrapper({ onFinish = vi.fn(), initialValues }: TestWrapperProps) {
  const [form] = Form.useForm<CategoryCreate>();
  return (
    <>
      <CategoryForm form={form} onFinish={onFinish} initialValues={initialValues} />
      <button type="button" onClick={() => form.submit()}>
        Submit Form
      </button>
    </>
  );
}

describe('CategoryForm', () => {
  const onFinish = vi.fn();

  beforeEach(() => {
    useAuthStore.getState().setAuth(mockToken, mockRefreshToken, mockUser);
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    // when
    renderWithProviders(<TestWrapper />);

    // then
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('Expense')).toBeInTheDocument();
    expect(screen.getByLabelText('Budget')).toBeInTheDocument();
    expect(screen.getByText('Budget Period')).toBeInTheDocument();
  });

  it('applies initialValues when provided', () => {
    // given
    const initialValues: Partial<CategoryCreate> = { type: 'income' };

    // when
    renderWithProviders(<TestWrapper initialValues={initialValues} />);

    // then
    expect(screen.getByLabelText('Income')).toBeChecked();
  });

  it('calls onFinish with validated values when submitted', async () => {
    // when
    const { user } = renderWithProviders(<TestWrapper onFinish={onFinish} initialValues={{ type: 'expense', budgetPeriod: 'monthly' }} />);

    // then
    await user.type(screen.getByLabelText('Category'), 'Transportation');
    await user.type(screen.getByLabelText('Budget'), '500');
    await user.click(screen.getByRole('button', { name: 'Submit Form' }));

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith({
        name: 'Transportation',
        type: 'expense',
        budget: 500,
        budgetPeriod: 'monthly',
      });
    });
  });

  it('does not call onFinish and shows name error when name is missing', async () => {
    // when
    const { user } = renderWithProviders(<TestWrapper onFinish={onFinish} />);

    // then
    await user.click(screen.getByRole('button', { name: 'Submit Form' }));

    await waitFor(() => {
      expect(screen.getByText('Please input your category!')).toBeInTheDocument();
    });
    expect(onFinish).not.toHaveBeenCalled();
  });

  it('does not call onFinish and shows budget error when budget is missing', async () => {
    // when
    const { user } = renderWithProviders(<TestWrapper onFinish={onFinish} initialValues={{ type: 'expense', budgetPeriod: 'monthly' }} />);

    // then
    await user.type(screen.getByLabelText('Category'), 'Transportation');
    await user.click(screen.getByRole('button', { name: 'Submit Form' }));

    await waitFor(() => {
      expect(screen.getByText('Please input your Budget!')).toBeInTheDocument();
    });
    expect(onFinish).not.toHaveBeenCalled();
  });
});
