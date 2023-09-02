import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { RootState, useAppDispatch } from 'app/store';
import { updateTrx, selectTrxById } from './budgetSlice';
import CustomFloatingLabel from '../../Components/inputs/CustomFloatingLabel';
import './editTrxModal.css';

export const EditTrxModal = ({ id }: { id: EntityId }) => {
	const trx = useSelector((state: RootState) => selectTrxById(state, id));
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState(trx?.title);
	const [type, setType] = useState(trx?.type);
	const [value, setValue] = useState(trx?.value);
	const [trxDate, setTrxDate] = useState(trx?.trxDate);
	// const [trxTime, setTrxTime] = useState(trx?.trxTime);
	const dispatch = useAppDispatch();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleTrxSumbit = async () => {
		dispatch(
			updateTrx({
				id,
				type,
				title,
				value,
				trxDate,
				//  trxTime
			})
		);
		setType('');
		setTitle('');
		setValue(0);
		setTrxDate('');
		// setTrxTime('');
		handleClose();
	};

	return (
		<>
			<Button variant="primary" className="editTrx-btn" onClick={handleShow}>
				Edit Transaction
			</Button>

			<Modal show={show} onHide={handleClose} className="budget-trx-modal">
				<Modal.Header closeButton>
					<Modal.Title>Edit Transaction</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Col>
								<Button className="newTrx-inc" onClick={() => setType('inc')}>
									INCOME
								</Button>
							</Col>
							<Col>
								<Button className="newTrx-exp" onClick={() => setType('exp')}>
									EXPENSE
								</Button>
							</Col>
						</Row>
						<Row className="editTrxModal-inputRow">
							<Col>
								<CustomFloatingLabel
									type={'text'}
									label={'title'}
									value={title}
									changeFunc={(event: any) => setTitle(event.target.value)}
								/>
								<CustomFloatingLabel
									type={'number'}
									label={'value'}
									value={value}
									changeFunc={(event: any) => setValue(event.target.value)}
								/>
								<CustomFloatingLabel
									type={'datetime-local'}
									label={'date'}
									value={trxDate}
									changeFunc={(event: any) => setTrxDate(event.target.value)}
								/>
							</Col>
							<Col>
								<p className="mt-3">Categories</p>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleTrxSumbit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
