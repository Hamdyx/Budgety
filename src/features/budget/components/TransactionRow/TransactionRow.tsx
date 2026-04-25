import type { TransactionStatus, Transaction } from '@/types/types';

import { Row, Col, Typography, Space, Tag } from 'antd';
import dayjs from 'dayjs';

import { useCurrencyFormatter } from '@/utils/formatCurrency';

import { DeleteTrxModal } from '../DeleteTrxModal';
import { EditTrxModal } from '../EditTrxModal';

import styles from './TransactionRow.module.css';

const { Text } = Typography;

const statusColor: Record<TransactionStatus, string> = {
  pending: 'blue',
  completed: 'green',
  cancelled: 'default',
};

const TransactionRow = ({ trx }: { trx: Transaction }) => {
  const formatCurrency = useCurrencyFormatter();
  return (
    <Row align="middle" className={styles.row} data-type={trx.type}>
      <Col flex="auto">
        <Text strong>{trx.title}</Text>
        <br />
        <Text type="secondary" className={styles.dateText}>
          {dayjs(trx.trxDate).format('YYYY-MM-DD | HH:mm')}
        </Text>
        {trx.status && (
          <>
            {' '}
            <Tag color={statusColor[trx.status]}>{trx.status}</Tag>
          </>
        )}
      </Col>
      <Col className={styles.rightCol}>
        <Space size={4}>
          <EditTrxModal trx={trx} />
          <DeleteTrxModal id={trx.id} />
        </Space>
        <br />
        <Text className={styles.valueText} data-type={trx.type}>
          {formatCurrency(trx.value)}
        </Text>
      </Col>
    </Row>
  );
};

export default TransactionRow;
