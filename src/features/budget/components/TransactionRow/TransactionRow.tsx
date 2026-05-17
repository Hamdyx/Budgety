import type { TransactionStatus, Transaction } from '@/types/types';

import { Row, Col, Typography, Space, Tag } from 'antd';
import dayjs from 'dayjs';

import { useTransactionDisplayValue } from '@/utils/currency';

import { DeleteTransactionModal } from '../DeleteTransactionModal';
import { EditTransactionModal } from '../EditTransactionModal';

import styles from './TransactionRow.module.css';

const { Text } = Typography;

const statusColor: Record<TransactionStatus, string> = {
  pending: 'blue',
  completed: 'green',
  cancelled: 'default',
};

const TransactionRow = ({ transaction }: { transaction: Transaction }) => {
  const displayValue = useTransactionDisplayValue(transaction.originalValue, transaction.currency, transaction.value);

  return (
    <Row align="middle" className={styles.row} data-type={transaction.type}>
      <Col flex="auto">
        <Text strong>{transaction.title}</Text>
        <br />
        <Text type="secondary" className={styles.dateText}>
          {dayjs(transaction.trxDate).format('YYYY-MM-DD | HH:mm')}
        </Text>
        {transaction.status && (
          <>
            {' '}
            <Tag color={statusColor[transaction.status]}>{transaction.status}</Tag>
          </>
        )}
      </Col>
      <Col className={styles.rightCol}>
        <Space size={4}>
          <EditTransactionModal transaction={transaction} />
          <DeleteTransactionModal id={transaction.id} />
        </Space>
        <br />
        <Text className={styles.valueText} data-type={transaction.type}>
          {displayValue}
        </Text>
      </Col>
    </Row>
  );
};

export default TransactionRow;
