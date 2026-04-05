import { PlusOutlined } from '@ant-design/icons';
import { Card, Row, Col, Statistic, Divider, Badge, Button, Typography } from 'antd';

import styles from './BankCard.module.css';

const { Text } = Typography;

const BankCard = () => (
  <Card title="Bank" extra={<Button type="text" icon={<PlusOutlined />} className="card-extra-btn" />} styles={{ body: { padding: '12px 16px' } }}>
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Net Worth" value={25} />
      </Col>
      <Col span={12}>
        <Statistic title="Total Debt" value={25} styles={{ content: { color: '#fd5e53' } }} />
      </Col>
    </Row>
    <Divider className={styles.sectionDivider} />
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
  </Card>
);

export default BankCard;
