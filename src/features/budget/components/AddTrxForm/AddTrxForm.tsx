import type { TransactionCreate, TransactionType } from '@/types/types';

import { Button, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Switch } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { useCategories } from '@/features/category/hooks';

import { useCreateTransaction } from '../../hooks';

import styles from './AddTrxForm.module.css';

const AddTrxForm = () => {
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateTransaction();
  const [isAddTrxModalOpen, setIsAddTrxModalOpen] = useState(false);

  const [form] = Form.useForm();
  const trxType = Form.useWatch<TransactionType>('type', form) ?? 'inc';
  const isRecurring = Form.useWatch<boolean>('isRecurring', form) ?? false;

  const filteredCategories = useMemo(
    () => categories.filter(category => (trxType === 'inc' ? category.type === 'income' : category.type === 'expense')),
    [categories, trxType]
  );

  const isIncome = trxType === 'inc';

  const handleClose = () => setIsAddTrxModalOpen(false);
  const handleShow = () => setIsAddTrxModalOpen(true);

  const handleTrxSumbit = async (values: TransactionCreate) => {
    createMutation.mutate(
      {
        type: values.type,
        title: values.title,
        value: values.value,
        trxDate: values.trxDate,
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
      <Button className="addTrx-btn" onClick={handleShow}>
        Add Transaction
      </Button>
      <Modal title="Add New Transaction" open={isAddTrxModalOpen} onCancel={handleClose} footer={null}>
        <Form
          form={form}
          layout="vertical"
          name="add_transaction"
          size="large"
          initialValues={{
            type: 'inc',
            trxDate: dayjs(),
            status: 'pending',
            isRecurring: false,
          }}
          onFinish={handleTrxSumbit}
          requiredMark={false}
        >
          <Form.Item name="type">
            <Radio.Group className={styles.typeRadioGroup} onChange={() => form.setFieldValue('categoryId', undefined)}>
              <Radio.Button value="inc">Income</Radio.Button>
              <Radio.Button value="exp">Expense</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <div className={styles.formFields}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input placeholder="Transaction title" />
            </Form.Item>
            <Form.Item name="value" label="Value" rules={[{ required: true }]}>
              <InputNumber placeholder="Transaction value" min={0} />
            </Form.Item>
            <Form.Item name="trxDate" label="Date" rules={[{ required: true }]}>
              <DatePicker format="DD MMM YYYY - HH:mm" showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }} placeholder="Select transaction date" />
            </Form.Item>
          </div>

          {filteredCategories.length > 0 && (
            <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
              <Radio.Group className={styles.categoryGroup} data-type={trxType}>
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

          <div className={styles.footerRow}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={
                isIncome
                  ? { background: 'var(--color-success)', borderColor: 'var(--color-success)' }
                  : { background: 'var(--color-danger)', borderColor: 'var(--color-danger)' }
              }
            >
              Add Transaction
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddTrxForm;
