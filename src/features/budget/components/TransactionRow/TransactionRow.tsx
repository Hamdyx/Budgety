import type { Transaction } from '@/types/types';

import { Row, Col, Typography, Space } from 'antd';

import { DeleteTrxModal } from '../DeleteTrxModal/DeleteTrxModal';
import { EditTrxModal } from '../EditTrxModal/EditTrxModal';

import styles from './TransactionRow.module.css';

const { Text } = Typography;

const TransactionRow = ({ trx }: { trx: Transaction }) => {
  const formatDateTime = (d: string) => {
    const _date = d?.split('T')[0];
    const _time = d?.split('T')[1];
    const _hh = _time?.split(':')[0];
    const _mm = _time?.split(':')[1];
    return `${_date} | ${_hh}:${_mm}`;
  };

  const borderColor = trx.type === 'inc' ? '#21bf73' : '#fd5e53';

  return (
    <Row align="middle" className={styles.row} style={{ borderLeft: `3px solid ${borderColor}` }}>
      <Col flex="auto">
        <Text strong>{trx.title}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          {formatDateTime(trx.trxDate)}
        </Text>
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
