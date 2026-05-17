import type { CategoryCreate } from '@/types/types';

import { PlusOutlined } from '@ant-design/icons';
import { App, Button, Form, Modal } from 'antd';
import { useState } from 'react';

import { useCreateCategory } from '../../hooks';
import { CategoryForm } from '../CategoryForm';

import styles from './AddCategory.module.css';

function AddCategory() {
  const createMutation = useCreateCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<CategoryCreate>();
  const { message } = App.useApp();

  const handleCreate = (values: CategoryCreate) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        form.resetFields();
        setIsModalOpen(false);
        void message.success('Category created');
      },
      onError: () => void message.error('Failed to create category'),
    });
  };

  return (
    <>
      <Button type="primary" shape="circle" icon={<PlusOutlined />} size="small" aria-label="Add category" onClick={() => setIsModalOpen(true)} />
      <Modal
        title="Add Category"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => setIsModalOpen(false)}
        okText="Submit"
        cancelButtonProps={{ className: styles.cancelButton }}
        destroyOnHidden
        afterOpenChange={open => !open && form.resetFields()}
      >
        <CategoryForm form={form} initialValues={{ type: 'expense', budgetPeriod: 'monthly' }} onFinish={handleCreate} />
      </Modal>
    </>
  );
}

export default AddCategory;
