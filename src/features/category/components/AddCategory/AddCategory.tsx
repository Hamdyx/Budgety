import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Modal, Button, Radio, Select } from 'antd';
import { useState } from 'react';

import { useCurrencySymbol } from '@/utils/formatCurrency';

import { useCreateCategory } from '../../hooks';

function AddCategory() {
  const createMutation = useCreateCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const currencySymbol = useCurrencySymbol();

  const handleOk = () => {
    form.validateFields().then(values => {
      createMutation.mutate(values, {
        onSuccess: () => {
          form.resetFields();
          setIsModalOpen(false);
        },
      });
    });
  };

  return (
    <>
      <Button type="primary" shape="circle" icon={<PlusOutlined />} size="small" aria-label="Add category" onClick={() => setIsModalOpen(true)} />
      <Modal
        title="Add Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Submit"
        afterOpenChange={open => !open && form.resetFields()}
      >
        <Form form={form} layout="vertical" autoComplete="off" initialValues={{ type: 'expense', budgetPeriod: 'monthly' }}>
          <Form.Item label="Category" name="name" rules={[{ required: true, message: 'Please input your category!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select a category type!' }]}>
            <Radio.Group optionType="button" buttonStyle="solid">
              <Radio.Button value="income">Income</Radio.Button>
              <Radio.Button value="expense">Expense</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Budget" name="budget" rules={[{ required: true, message: 'Please input your Budget!' }]}>
            <InputNumber style={{ width: '100%' }} min={0} prefix={currencySymbol} />
          </Form.Item>
          <Form.Item label="Budget Period" name="budgetPeriod" rules={[{ required: true, message: 'Please select a budget period!' }]}>
            <Select
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'yearly', label: 'Yearly' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddCategory;
