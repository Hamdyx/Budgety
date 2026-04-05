import { Card, Row, Col, Statistic, Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const WishlistCard = () => (
  <Card
    title="Wishlist"
    extra={<Button type="text" icon={<PlusOutlined />} style={{ color: '#696c70', fontSize: '1.5rem' }} />}
    styles={{ body: { padding: '12px 16px' } }}
  >
    <Row gutter={16} align="middle">
      <Col span={11}>
        <Statistic title="Value" value={3500} styles={{ content: { color: '#21bf73' } }} />
      </Col>
      <Col span={2}>
        <Divider orientation="vertical" style={{ height: 40, borderColor: '#363a3e' }} />
      </Col>
      <Col span={11}>
        <Statistic title="Spent" value={3500} />
      </Col>
    </Row>
  </Card>
);

export default WishlistCard;
