import type { Transaction, TransactionFormValues } from '@/types/types';

import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { TransactionForm } from '@/features/budget/components/TransactionForm';
import { useCategories } from '@/features/category/hooks';

import { useUpdateTransaction } from '../../hooks';

const EditTransactionModal = ({ transaction }: { transaction: Transaction }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<TransactionFormValues>();
  const updateMutation = useUpdateTransaction();
  const { data: categories = [] } = useCategories();

  const initialValues: Partial<TransactionFormValues> = {
    type: transaction.type ?? 'inc',
    title: transaction.title ?? '',
    value: transaction.value ?? 0,
    trxDate: transaction.trxDate ? dayjs(transaction.trxDate) : dayjs(),
    categoryId: transaction.categoryId ?? undefined,
    status: transaction.status ?? 'pending',
    isRecurring: transaction.isRecurring ?? false,
    recurrenceRule: transaction.recurrenceRule ?? undefined,
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
        },
      },
      { onSuccess: () => setOpen(false) }
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
