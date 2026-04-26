import type { TransactionFormValues } from '@/types/types';

import { screen, waitFor } from '@testing-library/react';
import { userEvent, PointerEventsCheckLevel } from '@testing-library/user-event';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { mockCategories } from '@/tests/fixtures';
import { renderWithProviders } from '@/tests/render';

import { TransactionForm } from './index';

const incomeCategories = mockCategories.filter(c => c.type === 'income');
const expenseCategories = mockCategories.filter(c => c.type === 'expense');

function Wrapper({
  onFinish,
  initialValues,
  categories = mockCategories,
}: {
  onFinish?: (values: TransactionFormValues) => void;
  initialValues?: Partial<TransactionFormValues>;
  categories?: typeof mockCategories;
}) {
  const [form] = Form.useForm<TransactionFormValues>();
  return (
    <>
      <TransactionForm form={form} categories={categories} initialValues={initialValues} onFinish={onFinish ?? vi.fn()} />
      <button onClick={() => form.submit()}>Submit</button>
    </>
  );
}

describe('TransactionForm', () => {
  const onFinish = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title, value, date, status, and recurring fields', () => {
    // when
    renderWithProviders(<Wrapper />);

    // then
    expect(screen.getByPlaceholderText('Transaction title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Transaction value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select transaction date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Recurring')).toBeInTheDocument();
  });

  it('renders Income and Expense type radio buttons', () => {
    // when
    renderWithProviders(<Wrapper />);

    // then
    expect(screen.getByRole('radio', { name: 'Income' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Expense' })).toBeInTheDocument();
  });

  it('shows income categories when type is inc', () => {
    // when
    renderWithProviders(<Wrapper initialValues={{ type: 'inc' }} />);

    // then
    for (const category of incomeCategories) {
      expect(screen.getByRole('radio', { name: category.name })).toBeInTheDocument();
    }
    for (const category of expenseCategories) {
      expect(screen.queryByRole('radio', { name: category.name })).not.toBeInTheDocument();
    }
  });

  it('shows expense categories when type is exp', () => {
    // when
    renderWithProviders(<Wrapper initialValues={{ type: 'exp' }} />);

    // then
    for (const category of expenseCategories) {
      expect(screen.getByRole('radio', { name: category.name })).toBeInTheDocument();
    }
    for (const category of incomeCategories) {
      expect(screen.queryByRole('radio', { name: category.name })).not.toBeInTheDocument();
    }
  });

  it('switches categories when type radio changes', async () => {
    // given
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    // when
    renderWithProviders(<Wrapper initialValues={{ type: 'inc' }} />);

    // then
    await user.click(screen.getByRole('radio', { name: 'Expense' }));

    // and
    for (const category of expenseCategories) {
      expect(await screen.findByRole('radio', { name: category.name })).toBeInTheDocument();
    }
    for (const category of incomeCategories) {
      expect(screen.queryByRole('radio', { name: category.name })).not.toBeInTheDocument();
    }
  });

  it('shows warning alert when no matching categories exist', () => {
    // when
    renderWithProviders(<Wrapper categories={[]} initialValues={{ type: 'inc' }} />);

    // then
    expect(screen.getByText(/No income categories yet/i)).toBeInTheDocument();
    expect(screen.queryByText('Category')).not.toBeInTheDocument();
  });

  it('shows recurrenceRule field when isRecurring is toggled on', async () => {
    // when
    const { user } = renderWithProviders(<Wrapper />);

    // then
    await user.click(screen.getByRole('switch'));

    // and
    expect(await screen.findByText('Recurrence')).toBeInTheDocument();
  });

  it('hides recurrenceRule field when isRecurring is toggled off', async () => {
    // when
    const { user } = renderWithProviders(<Wrapper initialValues={{ isRecurring: true }} />);
    expect(await screen.findByText('Recurrence')).toBeInTheDocument();

    // then
    await user.click(screen.getByRole('switch'));

    // and
    await waitFor(() => {
      expect(screen.queryByText('Recurrence')).not.toBeInTheDocument();
    });
  });

  it('applies initialValues correctly', () => {
    // given
    const initialValues: Partial<TransactionFormValues> = {
      type: 'exp',
      title: 'Groceries',
      value: 120,
      status: 'completed',
      isRecurring: false,
    };

    // when
    renderWithProviders(<Wrapper initialValues={initialValues} />);

    // then
    expect(screen.getByDisplayValue('Groceries')).toBeInTheDocument();
    expect(screen.getByDisplayValue('120')).toBeInTheDocument();
  });

  it('calls onFinish with correct values on valid submit', async () => {
    // given
    const user = userEvent.setup({
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    // when
    renderWithProviders(
      <Wrapper
        onFinish={onFinish}
        initialValues={{
          type: 'inc',
          trxDate: dayjs('2024-01-15T09:30:00'),
          status: 'pending',
          isRecurring: false,
        }}
        categories={incomeCategories}
      />
    );

    // then
    await user.type(screen.getByPlaceholderText('Transaction title'), 'Salary Payment');
    await user.type(screen.getByPlaceholderText('Transaction value'), '3000');
    await user.click(screen.getByRole('radio', { name: 'Salary' }));
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    // and
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledOnce();
      const submitted = onFinish.mock.calls[0][0] as TransactionFormValues;
      expect(submitted.title).toBe('Salary Payment');
      expect(submitted.value).toBe(3000);
      expect(submitted.type).toBe('inc');
      expect(submitted.categoryId).toBe(1);
      expect(submitted.status).toBe('pending');
      expect(submitted.isRecurring).toBe(false);
    });
  });

  it('does not call onFinish when required fields are empty', async () => {
    // when
    const { user } = renderWithProviders(<Wrapper onFinish={onFinish} />);

    // then
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    // and
    await waitFor(() => {
      expect(onFinish).not.toHaveBeenCalled();
    });
  });
});
