import { Card, Row, Col, Statistic, Button } from 'antd';
import { DollarOutlined, RiseOutlined, FallOutlined, PlusOutlined } from '@ant-design/icons';

const ReportsCard = () => (
  <Card
    title="Reports"
    extra={<Button type="text" icon={<PlusOutlined />} style={{ color: '#696c70', fontSize: '1.5rem' }} />}
    styles={{ body: { padding: '12px 16px' } }}
  >
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Worth" value={6969} prefix={<DollarOutlined style={{ color: '#21bf73' }} />} />
      </Col>
      <Col span={12}>
        <Statistic title="Spent" value={6969} prefix={<FallOutlined style={{ color: '#fd5e53' }} />} />
      </Col>
    </Row>
    <Row style={{ marginTop: 12 }}>
      <Col span={12}>
        <Statistic title="Earn" value={6969} prefix={<RiseOutlined style={{ color: '#f7c025' }} />} />
      </Col>
    </Row>
  </Card>
);

export default ReportsCard;
