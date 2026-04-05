import type { RootState } from 'app/store';

import { EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Row, Space, Progress } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'app/store';

import { deleteCategory, selectCategoryById, updateCategory } from '../categorySlice';

const CategoryBox = ({ id }: any) => {
  const currCat = useSelector((state: RootState) => selectCategoryById(state, id));
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { category, spent, budget } = currCat as any;

  const editCategory = () => {
    !disabled && form.submit();
    setDisabled(prev => !prev);
  };

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(id));
  };

  const onFinish = (cat: any) => {
    dispatch(updateCategory({ id, ...cat }));
  };

  useEffect(() => {
    if (currCat) {
      const { category, spent, budget } = currCat;
      form.setFieldsValue({ category, spent, budget });
    }
  }, [currCat, form]);

  const pct = budget > 0 ? Math.round((spent / budget) * 100) : 0;

  return (
    <div style={{ background: '#2a2d32', borderRadius: 8, padding: 12 }}>
      <Row>
        <Form form={form} name="category" initialValues={{ category, spent, budget }} onFinish={onFinish} autoComplete="off" disabled={disabled}>
          <Space>
            <Progress type="circle" percent={pct} size={50} format={() => <FileTextOutlined />} />
            <Form.Item name="category" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Space size={4}>
              {!disabled && <Button onClick={handleDeleteCategory} disabled={false} danger icon={<DeleteOutlined />} />}
              <Button onClick={editCategory} disabled={false} icon={<EditOutlined />} />
            </Space>
          </Space>
          <Space style={{ marginTop: 8 }}>
            <Form.Item name="spent" style={{ marginBottom: 0 }}>
              <InputNumber prefix="$" formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} controls={false} variant="borderless" />
            </Form.Item>
            <Form.Item name="budget" style={{ marginBottom: 0 }}>
              <InputNumber prefix="$" formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} controls={false} variant="borderless" />
            </Form.Item>
          </Space>
        </Form>
      </Row>
    </div>
  );
};

export default CategoryBox;
