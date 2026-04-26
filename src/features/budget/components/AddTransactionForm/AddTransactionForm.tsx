import type { TransactionFormValues } from '@/types/types';

import { Button, Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { TransactionForm } from '@/features/budget/components/TransactionForm';
import { useCategories } from '@/features/category/hooks';

import { useCreateTransaction } from '../../hooks';

import styles from './AddTransactionForm.module.css';

const initialValues: Partial<TransactionFormValues> = {
  type: 'inc',
  trxDate: dayjs(),
  status: 'pending',
  isRecurring: false,
};

const AddTransactionForm = () => {
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateTransaction();
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [form] = Form.useForm<TransactionFormValues>();

  const handleClose = () => setIsAddTransactionModalOpen(false);
  const handleShow = () => setIsAddTransactionModalOpen(true);

  const handleTransactionSubmit = (values: TransactionFormValues) => {
    createMutation.mutate(
      {
        type: values.type,
        title: values.title,
        value: values.value,
        trxDate: values.trxDate.format('YYYY-MM-DDTHH:mm:ss'),
        categoryId: values.categoryId,
        status: values.status,
        isRecurring: values.isRecurring,
        recurrenceRule: values.isRecurring ? values.recurrenceRule : undefined,
      },
      { onSuccess: () => handleClose() }
    );
  };

  return (
    <>
      <Button type="primary" block onClick={handleShow}>
        Add Transaction
      </Button>
      <Modal
        title="Add New Transaction"
        open={isAddTransactionModalOpen}
        onCancel={handleClose}
        footer={null}
        destroyOnHidden
        afterOpenChange={open => !open && form.resetFields()}
      >
        <TransactionForm form={form} categories={categories} initialValues={initialValues} onFinish={handleTransactionSubmit} />
        <div className={styles.footerRow}>
          <Button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button type="primary" loading={createMutation.isPending} onClick={() => form.submit()}>
            Add Transaction
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddTransactionForm;
