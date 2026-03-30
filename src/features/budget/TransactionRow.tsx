import type { EntityId } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { selectTrxById } from './budgetSlice';
import { DeleteTrxModal } from './DeleteTrxModal';
import { EditTrxModal } from './EditTrxModal';
import 'react-circular-progressbar/dist/styles.css';

const TransactionSection = ({ trx_id }: { trx_id: EntityId }) => {
	const trx = useSelector((state: RootState) =>
		selectTrxById(state, String(trx_id))
	);

	const formateDateTime = (d: string) => {
		const _date = d?.split('T')[0];
		const _time = d?.split('T')[1];
		const _hh = _time?.split(':')[0];
		const _mm = _time?.split(':')[1];
		return `${_date} | ${_hh}:${_mm}`;
	};
	return (
		<Row className={`transaction-row-${trx?.type}`}>
			<Col>
				<h6>{trx?.title}</h6>
				<p>{formateDateTime(trx?.trxDate)}</p>
			</Col>
			<Col className="text-right">
				<EditTrxModal id={trx_id} />
				<p>{`$${trx?.value}`}</p>
				<DeleteTrxModal id={trx_id} />
			</Col>
		</Row>
	);
};

export default TransactionSection;
