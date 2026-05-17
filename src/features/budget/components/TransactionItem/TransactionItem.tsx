import type { TransactionStatus, Transaction } from '@/types/types';

import { DollarOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Tag } from 'antd';

import { useTransactionDisplayValue } from '@/utils/currency';

import styles from './TransactionItem.module.css';

const { Text } = Typography;

const statusColor: Record<TransactionStatus, string> = {
  pending: 'blue',
  completed: 'green',
  cancelled: 'default',
};

const TransactionItem = ({ transaction, categoryName }: { transaction: Transaction; categoryName: string }) => {
  const displayValue = useTransactionDisplayValue(transaction.originalValue, transaction.currency, transaction.value);

  return (
    <Row align="middle" className={styles.itemRow} data-type={transaction.type}>
      <Col span={3}>
        <DollarOutlined className={styles.icon} />
      </Col>
      <Col flex="auto">
        <Text>{transaction.title}</Text>
        <br />
        <Text type="secondary" className={styles.categoryText}>
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
        <Text className={styles.valueText}>{displayValue}</Text>
      </Col>
    </Row>
  );
};

export default TransactionItem;
