import type { Transaction, TransactionFormValues } from '@/types/types';

import { EditOutlined } from '@ant-design/icons';
import { App, Button, Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { TransactionForm } from '@/features/budget/components/TransactionForm';
import { useCategories } from '@/features/category/hooks';

import { useUpdateTransaction } from '../../hooks';

import styles from './EditTransactionModal.module.css';

const EditTransactionModal = ({ transaction }: { transaction: Transaction }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<TransactionFormValues>();
  const updateMutation = useUpdateTransaction();
  const { data: categories = [] } = useCategories();
  const { message } = App.useApp();

  const initialValues: Partial<TransactionFormValues> = {
    type: transaction.type,
    title: transaction.title,
    value: transaction.originalValue,
    trxDate: dayjs(transaction.trxDate),
    categoryId: transaction.categoryId,
    status: transaction.status,
    isRecurring: transaction.isRecurring,
    recurrenceRule: transaction.recurrenceRule ?? undefined,
    currency: transaction.currency,
  };

  const handleUpdate = (values: TransactionFormValues) => {
    updateMutation.mutate(
      {
        id: transaction.id,
        data: {
          type: values.type,
          title: values.title,
          value: values.value,
          trxDate: values.trxDate.format('YYYY-MM-DDTHH:mm:ss'),
          categoryId: values.categoryId,
          status: values.status,
          isRecurring: values.isRecurring,
          recurrenceRule: values.isRecurring ? values.recurrenceRule : undefined,
          currency: values.currency,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
          void message.success('Transaction updated');
        },
        onError: () => void message.error('Failed to update transaction'),
      }
    );
  };

  return (
    <>
      <Button type="text" size="small" icon={<EditOutlined />} title="Edit transaction" aria-label="Edit transaction" onClick={() => setOpen(true)} />
      <Modal
        title="Edit Transaction"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Save Changes"
        cancelButtonProps={{ className: styles.cancelButton }}
        confirmLoading={updateMutation.isPending}
        destroyOnHidden
        afterOpenChange={open => !open && form.resetFields()}
      >
        <TransactionForm form={form} categories={categories} initialValues={initialValues} onFinish={handleUpdate} />
      </Modal>
    </>
  );
};

export default EditTransactionModal;
