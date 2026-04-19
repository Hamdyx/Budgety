import type { TransactionStatus, Transaction } from '@/types/types';

import { Row, Col, Typography, Space, Tag } from 'antd';

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
  const formatDateTime = (date: string) => {
    const _date = date?.split('T')[0];
    const _time = date?.split('T')[1];
    const _hh = _time?.split(':')[0];
    const _mm = _time?.split(':')[1];
    return `${_date} | ${_hh}:${_mm}`;
  };

  const borderColor = trx.type === 'inc' ? 'var(--color-success)' : 'var(--color-danger)';

  return (
    <Row align="middle" className={styles.row} style={{ borderLeft: `3px solid ${borderColor}` }}>
      <Col flex="auto">
        <Text strong>{trx.title}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          {formatDateTime(trx.trxDate)}
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
        <Text style={{ color: borderColor }}>${trx.value}</Text>
      </Col>
    </Row>
  );
};

export default TransactionRow;
