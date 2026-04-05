import type { EntityId } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

import { Row, Col, Typography, Space } from 'antd';
import { useSelector } from 'react-redux';

import { selectTrxById } from '../budgetSlice';
import { DeleteTrxModal } from './DeleteTrxModal';
import { EditTrxModal } from './EditTrxModal';

import styles from './TransactionRow.module.css';

const { Text } = Typography;

const TransactionRow = ({ trx_id }: { trx_id: EntityId }) => {
  const trx = useSelector((state: RootState) => selectTrxById(state, String(trx_id)));

  const formatDateTime = (d: string) => {
    const _date = d?.split('T')[0];
    const _time = d?.split('T')[1];
    const _hh = _time?.split(':')[0];
    const _mm = _time?.split(':')[1];
    return `${_date} | ${_hh}:${_mm}`;
  };

  const borderColor = trx?.type === 'inc' ? '#21bf73' : '#fd5e53';

  return (
    <Row align="middle" className={styles.row} style={{ borderLeft: `3px solid ${borderColor}` }}>
      <Col flex="auto">
        <Text strong>{trx?.title}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          {formatDateTime(trx?.trxDate)}
        </Text>
      </Col>
      <Col className={styles.rightCol}>
        <Space size={4}>
          <EditTrxModal id={trx_id} />
          <DeleteTrxModal id={trx_id} />
        </Space>
        <br />
        <Text style={{ color: borderColor }}>${trx?.value}</Text>
      </Col>
    </Row>
  );
};

export default TransactionRow;
