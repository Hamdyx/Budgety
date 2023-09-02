import React from 'react';
import { useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { selectTrxById } from './budgetSlice';
import { Row, Col } from 'react-bootstrap';
import { EditTrxModal } from './EditTrxModal';
import { DeleteTrxModal } from './DeleteTrxModal';
import 'react-circular-progressbar/dist/styles.css';

const TransactionSection = ({ trx_id }: { trx_id: EntityId }) => {
	const trx = useSelector((state: RootState) => selectTrxById(state, trx_id));

	const formateDateTime = (d: string) => {
		let _date = d?.split('T')[0];
		let _time = d?.split('T')[1];
		let _hh = _time?.split(':')[0];
		let _mm = _time?.split(':')[1];
		return `${_date} | ${_hh}:${_mm}`;
	};
	return (
		<Row className={`transaction-row-${trx!.type}`}>
			<Col>
				<h6>{trx!.title}</h6>
				<p>{formateDateTime(trx!.trxDate)}</p>
			</Col>
			<Col className="text-right">
				<EditTrxModal id={trx_id} />
				<p>{`$${trx!.value}`}</p>
				<DeleteTrxModal id={trx_id} />
			</Col>
		</Row>
	);
};

export default TransactionSection;
