import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Modal, Button } from 'antd';
import { useState } from 'react';

import { useAppDispatch } from '@/app/store';

import { addNewCategory } from '../categorySlice';

function AddCategory() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      dispatch(addNewCategory(values));
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <Button type="primary" shape="circle" icon={<PlusOutlined />} size="small" onClick={() => setIsModalOpen(true)} />
      <Modal title="Add Category" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)} okText="Submit">
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please input your category!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Budget" name="budget" rules={[{ required: true, message: 'Please input your Budget!' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddCategory;
