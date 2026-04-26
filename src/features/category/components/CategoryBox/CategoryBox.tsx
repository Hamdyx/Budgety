import type { Category, CategoryCreate } from '@/types/types';

import { DeleteOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Popconfirm, Progress, Space, Typography } from 'antd';
import { useState } from 'react';

import { useCurrencyFormatter } from '@/utils/formatCurrency';

import { useDeleteCategory, useUpdateCategory } from '../../hooks';
import { CategoryForm } from '../CategoryForm';

import styles from './CategoryBox.module.css';

const { Text } = Typography;

const CategoryBox = ({ category }: { category: Category }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm<CategoryCreate>();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const { name, type, actual, budget } = category;

  const formatCurrency = useCurrencyFormatter();
  const remaining = budget - actual;
  const percentage = budget > 0 ? Math.round((actual / budget) * 100) : 0;

  const handleUpdate = (values: CategoryCreate) => {
    updateMutation.mutate({ id: category.id, data: values }, { onSuccess: () => setIsEditModalOpen(false) });
  };

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <Space>
          <Progress type="circle" percent={percentage} size={50} format={() => <FileTextOutlined />} />
          <Text strong>{name}</Text>
        </Space>
        <Space size={4}>
          <Button onClick={() => setIsEditModalOpen(true)} icon={<EditOutlined />} size="small" aria-label="Edit category" />
          <Popconfirm
            title="Delete category"
            description="All transactions associated with this category will be deleted too. This action cannot be undone."
            onConfirm={() => deleteMutation.mutate(category.id)}
            okText="Delete"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} size="small" aria-label="Delete category" />
          </Popconfirm>
        </Space>
      </div>
      <div className={styles.stats}>
        <Text type="secondary">
          {formatCurrency(actual)} {type === 'income' ? 'earned' : 'spent'}
        </Text>
        <Text type="secondary">/ {formatCurrency(budget)}</Text>
      </div>
      <Text type={remaining >= 0 ? 'success' : 'danger'}>{formatCurrency(remaining)} remaining</Text>
      <Modal
        title="Edit Category"
        open={isEditModalOpen}
        onOk={() => form.submit()}
        onCancel={() => setIsEditModalOpen(false)}
        okText="Save"
        confirmLoading={updateMutation.isPending}
        cancelButtonProps={{ className: styles.cancelButton }}
        destroyOnHidden
        afterOpenChange={open => !open && form.resetFields()}
      >
        <CategoryForm
          form={form}
          initialValues={{ name: category.name, type: category.type, budget: category.budget, budgetPeriod: category.budgetPeriod }}
          onFinish={handleUpdate}
        />
      </Modal>
    </div>
  );
};

export default CategoryBox;
