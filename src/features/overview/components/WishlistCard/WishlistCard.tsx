import { Row, Col, Statistic, Divider } from 'antd';

import { OverviewCard } from '@/components/OverviewCard';

const WishlistCard = () => (
  <OverviewCard title="Wishlist">
    <Row gutter={16} align="middle">
      <Col span={11}>
        <Statistic title="Value" value={3500} styles={{ content: { color: '#21bf73' } }} />
      </Col>
      <Col span={2}>
        <Divider orientation="vertical" style={{ height: 40 }} />
      </Col>
      <Col span={11}>
        <Statistic title="Spent" value={3500} />
      </Col>
    </Row>
  </OverviewCard>
);

export default WishlistCard;
