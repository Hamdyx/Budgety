import type { Category, TransactionFormValues } from '@/types/types';
import type { FormInstance } from 'antd';

import { Alert, DatePicker, Form, Input, InputNumber, Radio, Select, Switch } from 'antd';
import dayjs from 'dayjs';

import { formatNumberInput, parseNumberInput, useCurrencySymbol } from '@/utils/currency';

import styles from './TransactionForm.module.css';

interface TransactionFormProps {
  form: FormInstance<TransactionFormValues>;
  initialValues?: Partial<TransactionFormValues>;
  onFinish: (values: TransactionFormValues) => void;
  categories: Category[];
}

function TransactionForm({ form, initialValues, onFinish, categories }: TransactionFormProps) {
  const currencySymbol = useCurrencySymbol();
  const transactionType = Form.useWatch<string>('type', form) ?? 'inc';
  const isRecurring = Form.useWatch<boolean>('isRecurring', form) ?? false;

  const filteredCategories = categories.filter(category => (transactionType === 'inc' ? category.type === 'income' : category.type === 'expense'));

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish} requiredMark={false}>
      <Form.Item name="type">
        <Radio.Group className={styles.typeRadioGroup} onChange={() => form.setFieldValue('categoryId', undefined)}>
          <Radio.Button value="inc">Income</Radio.Button>
          <Radio.Button value="exp">Expense</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input placeholder="Transaction title" />
      </Form.Item>

      <Form.Item name="value" label="Value" rules={[{ required: true }]}>
        <InputNumber
          className={styles.fullWidth}
          min={0}
          placeholder="Transaction value"
          prefix={currencySymbol}
          formatter={formatNumberInput}
          parser={parseNumberInput}
        />
      </Form.Item>

      <Form.Item name="trxDate" label="Date" rules={[{ required: true }]}>
        <DatePicker
          className={styles.fullWidth}
          format="DD MMM YYYY - HH:mm"
          showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
          placeholder="Select transaction date"
        />
      </Form.Item>

      {filteredCategories.length === 0 ? (
        <Alert
          type="warning"
          showIcon
          title={`No ${transactionType === 'inc' ? 'income' : 'expense'} categories yet - add one first`}
          className={styles.categoryAlert}
        />
      ) : (
        <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
          <Radio.Group className={styles.categoryGroup} data-type={transactionType}>
            {filteredCategories.map(({ id, name }) => (
              <Radio.Button key={id} value={id} className={styles.categoryTag}>
                {name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      )}

      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select
          options={[
            { label: 'Pending', value: 'pending' },
            { label: 'Completed', value: 'completed' },
            { label: 'Cancelled', value: 'cancelled' },
          ]}
        />
      </Form.Item>

      <Form.Item name="isRecurring" label="Recurring" valuePropName="checked">
        <Switch />
      </Form.Item>

      {isRecurring && (
        <Form.Item name="recurrenceRule" label="Recurrence" rules={[{ required: true }]}>
          <Select
            options={[
              { label: 'Weekly', value: 'weekly' },
              { label: 'Monthly', value: 'monthly' },
              { label: 'Yearly', value: 'yearly' },
            ]}
          />
        </Form.Item>
      )}
    </Form>
  );
}

export default TransactionForm;
