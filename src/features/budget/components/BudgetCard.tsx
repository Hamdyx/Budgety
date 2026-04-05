import { HomeOutlined, ShoppingCartOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Row, Col, Divider, Button, Typography } from 'antd';

import styles from './BudgetCard.module.css';

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
  <Card title="Budget" extra={<Button type="text" icon={<PlusOutlined />} className="card-extra-btn" />} styles={{ body: { padding: '12px 16px' } }}>
    {/* Income */}
    <Row justify="space-between" align="middle">
      <Col>
        <Text>Income</Text>
        <br />
        <Text type="secondary" className={styles.smallText}>
          $58,660.00 of $1,345.54
        </Text>
      </Col>
      <Col className={styles.textRight}>
        <Text className={styles.successText}>6969.42</Text>
        <br />
        <Text type="secondary" className={styles.smallText}>
          over
        </Text>
      </Col>
    </Row>
    <Divider className={styles.incomeDivider} />

    {/* Expense */}
    <Row justify="space-between" align="middle">
      <Col>
        <Text>Expense</Text>
        <br />
        <Text type="secondary" className={styles.smallText}>
          $696 of $6969
        </Text>
      </Col>
      <Col className={styles.textRight}>
        <Text className={styles.dangerText}>6969.42</Text>
        <br />
        <Text type="secondary" className={styles.smallText}>
          over
        </Text>
      </Col>
    </Row>

    <Divider className={styles.sectionDivider} />

    {/* Category items */}
    {budgetItems.map(item => (
      <Row key={item.key} align="middle" className={styles.itemRow}>
        <Col span={3}>{item.icon}</Col>
        <Col flex="auto">
          <Text>{item.label}</Text>
          <br />
          <Text type="secondary" className={styles.smallText}>
            {item.sub}
          </Text>
        </Col>
        <Col className={styles.textRight}>
          <Text className={styles.successText}>{item.value}</Text>
          <br />
          <Text type="secondary" className={styles.smallText}>
            Available
          </Text>
        </Col>
      </Row>
    ))}
  </Card>
);

export default BudgetCard;
