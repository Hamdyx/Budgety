import type { TransactionFormValues } from '@/types/types';

import { App, Button, Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { TransactionForm } from '@/features/budget/components/TransactionForm';
import { useCategories } from '@/features/category/hooks';
import { useCurrencyStore } from '@/stores/currencyStore';

import { useCreateTransaction } from '../../hooks';

import styles from './AddTransactionForm.module.css';

const AddTransactionForm = () => {
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateTransaction();
  const userCurrency = useCurrencyStore(state => state.currency);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [form] = Form.useForm<TransactionFormValues>();
  const { message } = App.useApp();

  const initialValues: Partial<TransactionFormValues> = {
    type: 'inc',
    trxDate: dayjs(),
    status: 'pending',
    isRecurring: false,
    currency: userCurrency,
  };

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
        currency: values.currency,
        originalValue: values.value,
      },
      {
        onSuccess: () => {
          handleClose();
          void message.success('Transaction added');
        },
        onError: () => void message.error('Failed to add transaction'),
      }
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
