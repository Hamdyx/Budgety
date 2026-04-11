import type { Transaction } from '@/types/types';

import { Button, Modal, Form, Input, InputNumber, DatePicker, Radio, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useUpdateTransaction } from '../hooks';

export const EditTrxModal = ({ trx }: { trx: Transaction }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const updateMutation = useUpdateTransaction();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      updateMutation.mutate(
        {
          id: trx.id,
          data: {
            type: values.type,
            title: values.title,
            value: values.value,
            trxDate: values.trxDate,
          },
        },
        { onSuccess: () => setOpen(false) }
      );
    });
  };

  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Modal
        title="Edit Transaction"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        okText="Save Changes"
        confirmLoading={updateMutation.isPending}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: trx.type ?? 'inc',
            title: trx.title ?? '',
            value: trx.value ?? 0,
            trxDate: trx.trxDate ? dayjs(trx.trxDate) : dayjs(),
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
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="trxDate" label="Date">
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
