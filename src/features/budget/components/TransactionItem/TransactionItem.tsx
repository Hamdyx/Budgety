import type { Transaction } from '@/types/types';

import { DollarOutlined } from '@ant-design/icons';
import { Row, Col, Typography } from 'antd';

import styles from './TransactionItem.module.css';

const { Text } = Typography;

const TransactionItem = ({ trx, categoryName }: { trx: Transaction; categoryName: string }) => {
  const color = trx.type === 'inc' ? 'var(--color-success)' : 'var(--color-danger)';

  return (
    <Row align="middle" className={styles.itemRow}>
      <Col span={3}>
        <DollarOutlined style={{ fontSize: 20, color }} />
      </Col>
      <Col flex="auto">
        <Text>{trx.title}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          {categoryName}
        </Text>
      </Col>
      <Col>
        <Text style={{ color }}>${trx.value.toLocaleString()}</Text>
      </Col>
    </Row>
  );
};

export default TransactionItem;
