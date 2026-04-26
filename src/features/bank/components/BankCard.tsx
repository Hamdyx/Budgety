import { Row, Col, Statistic, Divider, Badge, Typography } from 'antd';

import { OverviewCard } from '@/components/OverviewCard';

import styles from './BankCard.module.css';

const { Text } = Typography;

const BankCard = () => (
  <OverviewCard title="Bank">
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Net Worth" value={25} />
      </Col>
      <Col span={12}>
        <Statistic title="Total Debt" value={25} classNames={{ content: styles.debtValue }} />
      </Col>
    </Row>
    <Divider />
    <div className={styles.badgeList}>
      <Text>
        <Badge color="#21bf73" /> Deposits
      </Text>
      <Text>
        <Badge color="#fd5e53" /> Loans
      </Text>
      <Text>
        <Badge color="#f7c025" /> Credit Card
      </Text>
    </div>
  </OverviewCard>
);

export default BankCard;
