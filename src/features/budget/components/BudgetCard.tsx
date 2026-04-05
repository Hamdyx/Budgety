import { Card, Row, Col, Divider, Button, Typography } from 'antd';
import { HomeOutlined, ShoppingCartOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

const budgetItems = [
  {
    key: 'groceries',
    icon: <ShoppingCartOutlined style={{ fontSize: 20, color: '#f7c025' }} />,
    label: 'Groceries',
    sub: 'Food & Drinking',
    value: '6969.42',
  },
  {
    key: 'house',
    icon: <HomeOutlined style={{ fontSize: 20, color: '#4d7cfd' }} />,
    label: 'House Rent',
    sub: 'Utilities',
    value: '6969.42',
  },
  {
    key: 'internet',
    icon: <FileTextOutlined style={{ fontSize: 20, color: '#fd5e53' }} />,
    label: 'Internet',
    sub: 'Bills',
    value: '6969.42',
  },
];

const BudgetCard = () => (
  <Card
    title="Budget"
    extra={<Button type="text" icon={<PlusOutlined />} style={{ color: '#696c70', fontSize: '1.5rem' }} />}
    styles={{ body: { padding: '12px 16px' } }}
  >
    {/* Income */}
    <Row justify="space-between" align="middle">
      <Col>
        <Text>Income</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          $58,660.00 of $1,345.54
        </Text>
      </Col>
      <Col style={{ textAlign: 'right' }}>
        <Text style={{ color: '#21bf73' }}>6969.42</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          over
        </Text>
      </Col>
    </Row>
    <Divider style={{ borderColor: '#21bf73', margin: '8px 0' }} />

    {/* Expense */}
    <Row justify="space-between" align="middle">
      <Col>
        <Text>Expense</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          $696 of $6969
        </Text>
      </Col>
      <Col style={{ textAlign: 'right' }}>
        <Text style={{ color: '#fd5e53' }}>6969.42</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          over
        </Text>
      </Col>
    </Row>

    <Divider style={{ borderColor: '#363a3e', margin: '12px 0' }} />

    {/* Category items */}
    {budgetItems.map(item => (
      <Row key={item.key} align="middle" style={{ marginBottom: 12 }}>
        <Col span={3}>{item.icon}</Col>
        <Col flex="auto">
          <Text>{item.label}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {item.sub}
          </Text>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Text style={{ color: '#21bf73' }}>{item.value}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            Available
          </Text>
        </Col>
      </Row>
    ))}
  </Card>
);

export default BudgetCard;
