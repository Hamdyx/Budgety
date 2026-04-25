import type { Transaction } from '@/types/types';

import { EditOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, InputNumber, DatePicker, Radio, Row, Col, Select, Switch } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useCategories } from '@/features/category/hooks';
import { useCurrencySymbol } from '@/utils/formatCurrency';

import { useUpdateTransaction } from '../../hooks';

const EditTransactionModal = ({ transaction }: { transaction: Transaction }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const updateMutation = useUpdateTransaction();
  const isRecurring = Form.useWatch<boolean>('isRecurring', form) ?? false;
  const { data: categories = [] } = useCategories();
  const filteredCategories = categories.filter(category => (transaction.type === 'inc' ? category.type === 'income' : category.type === 'expense'));
  const currencySymbol = useCurrencySymbol();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      updateMutation.mutate(
        {
          id: transaction.id,
          data: {
            type: values.type,
            title: values.title,
            value: values.value,
            trxDate: (values.trxDate as unknown as dayjs.Dayjs).format('YYYY-MM-DDTHH:mm:ss'),
            categoryId: values.categoryId,
            status: values.status,
            isRecurring: values.isRecurring,
            recurrenceRule: values.isRecurring ? values.recurrenceRule : undefined,
          },
        },
        { onSuccess: () => setOpen(false) }
      );
    });
  };

  return (
    <>
      <Button type="text" size="small" icon={<EditOutlined />} title="Edit transaction" aria-label="Edit transaction" onClick={() => setOpen(true)} />
      <Modal
        title="Edit Transaction"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        okText="Save Changes"
        confirmLoading={updateMutation.isPending}
        afterOpenChange={open => !open && form.resetFields()}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: transaction.type ?? 'inc',
            title: transaction.title ?? '',
            value: transaction.value ?? 0,
            trxDate: transaction.trxDate ? dayjs(transaction.trxDate) : dayjs(),
            categoryId: transaction.categoryId ?? undefined,
            status: transaction.status ?? 'pending',
            isRecurring: transaction.isRecurring ?? false,
            recurrenceRule: transaction.recurrenceRule ?? undefined,
          }}
        >
          <Form.Item name="type">
            <Radio.Group optionType="button" buttonStyle="solid">
              <Radio.Button value="inc">INCOME</Radio.Button>
              <Radio.Button value="exp">EXPENSE</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="value" label="Value" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} prefix={currencySymbol} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
            <Select options={filteredCategories.map(({ id, name }) => ({ label: name, value: id }))} placeholder="Select category" />
          </Form.Item>
          <Form.Item name="trxDate" label="Date">
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
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
        </Form>
      </Modal>
    </>
  );
};

export default EditTransactionModal;
