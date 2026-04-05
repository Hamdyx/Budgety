import type { RootState } from 'app/store';

import { EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Row, Space, Progress } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'app/store';

import { deleteCategory, selectCategoryById, updateCategory } from '../categorySlice';

import styles from './CategoryBox.module.css';

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
    <div className={styles.box}>
      <Row>
        <Form form={form} name="category" initialValues={{ category, spent, budget }} onFinish={onFinish} autoComplete="off" disabled={disabled}>
          <Space>
            <Progress type="circle" percent={pct} size={50} format={() => <FileTextOutlined />} />
            <Form.Item name="category" className={styles.compactItem}>
              <Input />
            </Form.Item>
            <Space size={4}>
              {!disabled && <Button onClick={handleDeleteCategory} disabled={false} danger icon={<DeleteOutlined />} />}
              <Button onClick={editCategory} disabled={false} icon={<EditOutlined />} />
            </Space>
          </Space>
          <Space className={styles.fieldRow}>
            <Form.Item name="spent" className={styles.compactItem}>
              <InputNumber prefix="$" formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} controls={false} variant="borderless" />
            </Form.Item>
            <Form.Item name="budget" className={styles.compactItem}>
              <InputNumber prefix="$" formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} controls={false} variant="borderless" />
            </Form.Item>
          </Space>
        </Form>
      </Row>
    </div>
  );
};

export default CategoryBox;
