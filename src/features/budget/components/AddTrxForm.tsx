import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Radio, Row } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useCategories } from '@/features/category/hooks';

import { useCreateTransaction } from '../hooks';

export const AddTrxForm = () => {
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateTransaction();
  const [isAddTrxModalOpen, setIsAddTrxModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleClose = () => setIsAddTrxModalOpen(false);
  const handleShow = () => setIsAddTrxModalOpen(true);

  const handleTrxSumbit = async (values: Record<string, unknown>) => {
    createMutation.mutate(
      {
        type: values.type as string,
        title: values.title as string,
        value: values.value as number,
        trxDate: (values.trxDate as dayjs.Dayjs).toISOString(),
        categoryId: values.categoryId as number,
      },
      { onSuccess: () => handleClose() }
    );
  };

  return (
    <>
      <Button className="addTrx-btn" onClick={handleShow}>
        Add Transaction
      </Button>
      <Modal
        title="Add New Transaction"
        open={isAddTrxModalOpen}
        onCancel={handleClose}
        className="budget-trx-modal"
        footer={
          <Button type="default" onClick={handleClose}>
            Close
          </Button>
        }
      >
        <Form
          form={form}
          layout={'vertical'}
          name="add_transaction"
          size="large"
          initialValues={{
            type: 'inc',
            trxDate: dayjs(),
          }}
          onFinish={handleTrxSumbit}
          requiredMark={false}
        >
          <Row>
            <Col span={24}>
              <Form.Item name="type">
                <Radio.Group buttonStyle="solid" className="trx_type_radio">
                  <Radio.Button className="radio_inc" value="inc">
                    INCOME
                  </Radio.Button>
                  <Radio.Button className="radio_exp" value="exp">
                    EXPENSE
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row className="mt-3" gutter={12}>
            <Col>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="input transaction title, name" />
              </Form.Item>
              <Form.Item
                name="value"
                label="Value"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber placeholder="input transaction value" />
              </Form.Item>
              <Form.Item
                name="trxDate"
                label="Date"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker format="DD MMM YYYY - HH:mm" showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }} placeholder="select transaction date" />
              </Form.Item>
            </Col>
            <Col>
              {categories.length > 0 && (
                <Form.Item
                  name="categoryId"
                  label="Category"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Radio.Group>
                    {categories.map(({ id, category }) => (
                      <Radio.Button key={id} value={id}>
                        {category}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Form.Item>
              )}
            </Col>
          </Row>
          <Form.Item wrapperCol={{ offset: 17, span: 7 }}>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
