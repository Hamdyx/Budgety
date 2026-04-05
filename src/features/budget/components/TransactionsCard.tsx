import type { TransactionItemData, TransactionOptionMap, TransactionType } from 'types/types';

import { PlusOutlined, WalletOutlined, BankOutlined, DollarOutlined } from '@ant-design/icons';
import { Card, Row, Col, Button, Modal, Form, Select, Input, InputNumber, DatePicker, TimePicker, Radio, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const { Text } = Typography;

function TransactionsModal() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TransactionType>('inc');
  const [form] = Form.useForm();

  const trxOptions: TransactionOptionMap = {
    inc: {
      work: ['salary', 'bonus', 'freelance-project'],
      savings: ['deposit'],
      investment: ['sell'],
      bank: ['cash-back', 'redeem-points'],
      other: ['other'],
    },
    exp: {
      work: ['work-fees', 'freelance-project-fees', 'tools-subscription'],
      savings: ['withdraw'],
      investment: ['buy'],
      bank: ['loan', 'credit-card'],
      shopping: ['clothes', 'groceries', 'electronics', 'health care'],
      utility: ['electric bill', 'gas bill', 'rent', 'internet bill', 'water bill', 'landline bill', 'mobile bill'],
      other: ['other'],
    },
  };

  const categoryOptions = Object.keys(trxOptions[type]).map(key => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: key,
  }));

  const category = Form.useWatch('category', form);
  const subCategoryOptions = (trxOptions[type][category] ?? ['other']).map(item => ({
    label: item.charAt(0).toUpperCase() + item.slice(1),
    value: item,
  }));

  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log({ type, ...values });
      form.resetFields();
      setOpen(false);
    });
  };

  return (
    <>
      <Button type="text" icon={<PlusOutlined />} onClick={() => setOpen(true)} style={{ color: '#696c70', fontSize: '1.5rem' }} />
      <Modal
        title="All Transactions"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        okText="Add Transaction"
        okButtonProps={{
          style: {
            backgroundColor: type === 'inc' ? '#21bf73' : '#fd5e53',
          },
        }}
      >
        <Radio.Group
          value={type}
          onChange={e => {
            setType(e.target.value);
            form.setFieldValue('category', 'other');
            form.setFieldValue('subCategory', 'other');
          }}
          optionType="button"
          buttonStyle="solid"
          style={{ width: '100%', marginBottom: 16, display: 'flex' }}
        >
          <Radio.Button value="inc" style={{ flex: 1, textAlign: 'center' }}>
            Income
          </Radio.Button>
          <Radio.Button value="exp" style={{ flex: 1, textAlign: 'center' }}>
            Expense
          </Radio.Button>
        </Radio.Group>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            category: 'other',
            subCategory: 'other',
            date: dayjs(),
            time: dayjs(),
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="category" label="Category">
                <Select options={categoryOptions} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="subCategory" label="Sub-Category">
                <Select options={subCategoryOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="value" label="Value" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="date" label="Date">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="time" label="Time">
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="details" label="Details">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const TransactionsCard = () => {
  const items: TransactionItemData[] = [
    {
      id: 'item-1',
      icon: <WalletOutlined style={{ fontSize: 20, color: '#f7c025' }} />,
      iconClass: 'bitcoin_icon',
      labelTxt: 'Yield Farming',
      formTxt: 'Crypto',
    },
    {
      id: 'item-2',
      icon: <BankOutlined style={{ fontSize: 20, color: '#4d7cfd' }} />,
      iconClass: 'bank_icon',
      labelTxt: 'Loan',
      formTxt: 'Bank',
    },
    {
      id: 'item-3',
      icon: <DollarOutlined style={{ fontSize: 20, color: '#21bf73' }} />,
      iconClass: 'take_money_icon',
      labelTxt: 'Clothes',
      formTxt: 'Other',
    },
  ];

  return (
    <Card title="All Transactions" extra={<TransactionsModal />} styles={{ body: { padding: '12px 16px' } }}>
      {items.map(item => (
        <Row key={item.id} align="middle" style={{ marginBottom: 12 }}>
          <Col span={3}>{item.icon}</Col>
          <Col flex="auto">
            <Text>{item.labelTxt}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {item.formTxt}
            </Text>
          </Col>
          <Col>
            <Text style={{ color: '#21bf73' }}>3000</Text>
          </Col>
        </Row>
      ))}
    </Card>
  );
};

export default TransactionsCard;
