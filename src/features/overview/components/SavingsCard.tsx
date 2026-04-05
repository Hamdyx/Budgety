import { DollarOutlined, BankOutlined } from '@ant-design/icons';
import { Row, Col, Statistic } from 'antd';

import OverviewCard from '@/components/common/OverviewCard';

const SavingsCard = () => (
  <OverviewCard title="Savings">
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Today's Deposit" value={3500} prefix={<DollarOutlined style={{ color: '#21bf73' }} />} />
      </Col>
      <Col span={12}>
        <Statistic title="Bank" value={3500} prefix={<BankOutlined style={{ color: '#4d7cfd' }} />} />
      </Col>
    </Row>
  </OverviewCard>
);

export default SavingsCard;
