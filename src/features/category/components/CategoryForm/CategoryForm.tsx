import type { CategoryCreate } from '@/types/types';
import type { FormInstance } from 'antd';

import { Form, Input, InputNumber, Radio, Select } from 'antd';

import { useCurrencyStore } from '@/stores/currencyStore';
import { CURRENCY_OPTIONS, formatNumberInput, getCurrencySymbol, parseNumberInput } from '@/utils/currency';

import styles from './CategoryForm.module.css';

interface CategoryFormProps {
  form: FormInstance<CategoryCreate>;
  initialValues?: Partial<CategoryCreate>;
  onFinish: (values: CategoryCreate) => void;
}

function CategoryForm({ form, initialValues, onFinish }: CategoryFormProps) {
  const userCurrency = useCurrencyStore(state => state.currency);
  const mergedInitialValues: Partial<CategoryCreate> = {
    ...initialValues,
    budgetCurrency: initialValues?.budgetCurrency ?? userCurrency,
  };
  const selectedCurrency = Form.useWatch<string>('budgetCurrency', form) ?? userCurrency;
  const currencySymbol = getCurrencySymbol(selectedCurrency);

  return (
    <Form form={form} layout="vertical" autoComplete="off" initialValues={mergedInitialValues} onFinish={onFinish}>
      <Form.Item label="Category" name="name" rules={[{ required: true, message: 'Please input your category!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select a category type!' }]}>
        <Radio.Group className={styles.typeRadioGroup} optionType="button">
          <Radio.Button value="income">Income</Radio.Button>
          <Radio.Button value="expense">Expense</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Budget" name="budget" rules={[{ required: true, message: 'Please input your Budget!' }]}>
        <InputNumber className={styles.fullWidth} min={0} prefix={currencySymbol} formatter={formatNumberInput} parser={parseNumberInput} />
      </Form.Item>

      <Form.Item label="Budget Currency" name="budgetCurrency" rules={[{ required: true }]}>
        <Select options={CURRENCY_OPTIONS} />
      </Form.Item>
      <Form.Item label="Budget Period" name="budgetPeriod" rules={[{ required: true, message: 'Please select a budget period!' }]}>
        <Select
          options={[
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'yearly', label: 'Yearly' },
          ]}
        />
      </Form.Item>
    </Form>
  );
}

export default CategoryForm;
