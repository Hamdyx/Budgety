import type { Category, CategoryUpdate } from '@/types/types';

import { EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Radio, Row, Select, Space, Progress, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useCurrencyFormatter } from '@/utils/formatCurrency';

import { useDeleteCategory, useUpdateCategory } from '../../hooks';

import styles from './CategoryBox.module.css';

const { Text } = Typography;

const CategoryBox = ({ category }: { category: Category }) => {
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const { name, type, actual, budget, budgetPeriod } = category;

  const editCategory = () => {
    if (!disabled) form.submit();
    setDisabled(prev => !prev);
  };

  const handleDeleteCategory = () => {
    deleteMutation.mutate(category.id);
  };

  const onFinish = (values: CategoryUpdate) => {
    updateMutation.mutate({ id: category.id, data: values });
  };

  useEffect(() => {
    form.setFieldsValue({ name, type, budget, budgetPeriod });
  }, [category, form, name, type, budget, budgetPeriod]);

  const formatCurrency = useCurrencyFormatter();
  const remaining = budget - actual;
  const percentage = budget > 0 ? Math.round((actual / budget) * 100) : 0;

  return (
    <div className={styles.box}>
      <Row>
        <Form form={form} name="category" initialValues={{ name, type, budget, budgetPeriod }} onFinish={onFinish} autoComplete="off" disabled={disabled}>
          <Space>
            <Progress type="circle" percent={percentage} size={50} format={() => <FileTextOutlined />} />
            <Form.Item name="name" className={styles.compactItem}>
              <Input />
            </Form.Item>
            <Space size={4}>
              {!disabled && <Button onClick={handleDeleteCategory} disabled={false} danger icon={<DeleteOutlined />} aria-label="Delete category" />}
              <Button onClick={editCategory} disabled={false} icon={<EditOutlined />} aria-label="Edit category" />
            </Space>
          </Space>
          {!disabled && (
            <>
              <Form.Item name="type" className={styles.compactItem}>
                <Radio.Group optionType="button" buttonStyle="solid" size="small">
                  <Radio.Button value="income">Income</Radio.Button>
                  <Radio.Button value="expense">Expense</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="budgetPeriod" className={styles.compactItem}>
                <Select
                  size="small"
                  options={[
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' },
                    { value: 'yearly', label: 'Yearly' },
                  ]}
                />
              </Form.Item>
            </>
          )}
          <Space className={styles.fieldRow}>
            <Text type="secondary">
              {formatCurrency(actual)} {type === 'income' ? 'earned' : 'spent'}
            </Text>
            <Form.Item name="budget" className={styles.compactItem}>
              <InputNumber prefix="$" formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} controls={false} variant="borderless" />
            </Form.Item>
          </Space>
          <Text type={remaining >= 0 ? 'success' : 'danger'}>{formatCurrency(remaining)} remaining</Text>
        </Form>
      </Row>
    </div>
  );
};

export default CategoryBox;
