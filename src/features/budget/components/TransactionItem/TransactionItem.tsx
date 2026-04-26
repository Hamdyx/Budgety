import type { TransactionStatus, Transaction } from '@/types/types';

import { DollarOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Tag } from 'antd';

import { useCurrencyFormatter } from '@/utils/formatCurrency';

import styles from './TransactionItem.module.css';

const { Text } = Typography;

const statusColor: Record<TransactionStatus, string> = {
  pending: 'blue',
  completed: 'green',
  cancelled: 'default',
};

const TransactionItem = ({ transaction, categoryName }: { transaction: Transaction; categoryName: string }) => {
  const color = transaction.type === 'inc' ? 'var(--color-success)' : 'var(--color-danger)';
  const formatCurrency = useCurrencyFormatter();

  return (
    <Row align="middle" className={styles.itemRow}>
      <Col span={3}>
        <DollarOutlined style={{ fontSize: 20, color }} />
      </Col>
      <Col flex="auto">
        <Text>{transaction.title}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          {categoryName}
        </Text>
        {transaction.status && (
          <>
            {' '}
            <Tag color={statusColor[transaction.status]}>{transaction.status}</Tag>
          </>
        )}
      </Col>
      <Col>
        <Text style={{ color }}>{formatCurrency(transaction.value)}</Text>
      </Col>
    </Row>
  );
};

export default TransactionItem;
