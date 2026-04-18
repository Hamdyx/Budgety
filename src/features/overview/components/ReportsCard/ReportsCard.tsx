import { DollarOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { Row, Col, Statistic } from 'antd';

import { OverviewCard } from '@/components/OverviewCard';

const ReportsCard = () => (
  <OverviewCard title="Reports">
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
  </OverviewCard>
);

export default ReportsCard;
