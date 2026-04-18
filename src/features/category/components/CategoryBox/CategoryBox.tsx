import type { Category, CategoryUpdate } from '@/types/types';

import { EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Radio, Row, Space, Progress, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { useDeleteCategory, useUpdateCategory } from '../../hooks';

import styles from './CategoryBox.module.css';

const { Text } = Typography;

const CategoryBox = ({ category: currCat }: { category: Category }) => {
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const { category, type, spent, budget } = currCat;

  const editCategory = () => {
    if (!disabled) form.submit();
    setDisabled(prev => !prev);
  };

  const handleDeleteCategory = () => {
    deleteMutation.mutate(currCat.id);
  };

  const onFinish = (values: CategoryUpdate) => {
    updateMutation.mutate({ id: currCat.id, data: values });
  };

  useEffect(() => {
    form.setFieldsValue({ category, type, budget });
  }, [currCat, form, category, type, budget]);

  const remaining = budget - spent;
  const percentage = budget > 0 ? Math.round((spent / budget) * 100) : 0;

  return (
    <div className={styles.box}>
      <Row>
        <Form form={form} name="category" initialValues={{ category, type, budget }} onFinish={onFinish} autoComplete="off" disabled={disabled}>
          <Space>
            <Progress type="circle" percent={percentage} size={50} format={() => <FileTextOutlined />} />
            <Form.Item name="category" className={styles.compactItem}>
              <Input />
            </Form.Item>
            <Space size={4}>
              {!disabled && <Button onClick={handleDeleteCategory} disabled={false} danger icon={<DeleteOutlined />} aria-label="Delete category" />}
              <Button onClick={editCategory} disabled={false} icon={<EditOutlined />} aria-label="Edit category" />
            </Space>
          </Space>
          {!disabled && (
            <Form.Item name="type" className={styles.compactItem}>
              <Radio.Group optionType="button" buttonStyle="solid" size="small">
                <Radio.Button value="income">Income</Radio.Button>
                <Radio.Button value="expense">Expense</Radio.Button>
              </Radio.Group>
            </Form.Item>
          )}
          <Space className={styles.fieldRow}>
            <Text type="secondary">
              ${spent.toLocaleString()} {type === 'income' ? 'earned' : 'spent'}
            </Text>
            <Form.Item name="budget" className={styles.compactItem}>
              <InputNumber prefix="$" formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} controls={false} variant="borderless" />
            </Form.Item>
          </Space>
          <Text type={remaining >= 0 ? 'success' : 'danger'}>${remaining.toLocaleString()} remaining</Text>
        </Form>
      </Row>
    </div>
  );
};

export default CategoryBox;
