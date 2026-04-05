import { DollarOutlined, BankOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Row, Col, Statistic, Button } from 'antd';

const SavingsCard = () => (
  <Card title="Savings" extra={<Button type="text" icon={<PlusOutlined />} className="card-extra-btn" />} styles={{ body: { padding: '12px 16px' } }}>
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Today's Deposit" value={3500} prefix={<DollarOutlined style={{ color: '#21bf73' }} />} />
      </Col>
      <Col span={12}>
        <Statistic title="Bank" value={3500} prefix={<BankOutlined style={{ color: '#4d7cfd' }} />} />
      </Col>
    </Row>
  </Card>
);

export default SavingsCard;
