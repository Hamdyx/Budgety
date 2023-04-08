import React, { useState } from 'react';
import { useAppDispatch } from 'app/store';
import { addNewTrx } from './budgetSlice';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import CustomFloatingLabel from '../../Components/inputs/CustomFloatingLabel';

import './AddTrxForm.css';

export const AddTrxForm = () => {
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('');
	const [type, setType] = useState('inc');
	const [value, setValue] = useState('');
	const [trxDate, setTrxDate] = useState('');
	const [trxTime, setTrxTime] = useState('');

	const dispatch = useAppDispatch();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleTrxSumbit = async () => {
		dispatch(
			addNewTrx({
				id: new Date().toISOString(),
				type,
				title,
				value,
				trxDate,
				trxTime,
			})
		);
		setType('');
		setTitle('');
		setValue('');
		setTrxDate('');
		setTrxTime('');
		handleClose();
	};

	return (
		<>
			<Button variant="primary" className="addTrx-btn" onClick={handleShow}>
				Add Transaction
			</Button>
			<Modal show={show} onHide={handleClose} className="budget-trx-modal">
				<Modal.Header closeButton>
					<Modal.Title>Add New Transaction</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Col>
								<Button
									className={`newTrx-inc ${type === 'inc' ? 'active' : ''}`}
									onClick={() => setType('inc')}
								>
									INCOME
								</Button>
							</Col>
							<Col>
								<Button
									className={`newTrx-exp ${type === 'exp' ? 'active' : ''}`}
									onClick={() => setType('exp')}
								>
									EXPENSE
								</Button>
							</Col>
						</Row>
						<Row className="mt-3">
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
