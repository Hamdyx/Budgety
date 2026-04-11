import { Row, Col, Statistic, Divider, Badge, Typography } from 'antd';

import { OverviewCard } from '@/components/common/OverviewCard';

import styles from './BankCard.module.css';

const { Text } = Typography;

const BankCard = () => (
  <OverviewCard title="Bank">
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Net Worth" value={25} />
      </Col>
      <Col span={12}>
        <Statistic title="Total Debt" value={25} styles={{ content: { color: '#fd5e53' } }} />
      </Col>
    </Row>
    <Divider />
    <div className={styles.badgeList}>
      <Text>
        <Badge color="#21bf73" /> Deposits
      </Text>
      <Text>
        <Badge color="#FE5E54" /> Loans
      </Text>
      <Text>
        <Badge color="#F7C025" /> Credit Card
      </Text>
    </div>
  </OverviewCard>
);

export default BankCard;
