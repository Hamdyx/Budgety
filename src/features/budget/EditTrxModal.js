import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateTrx, selectTrxById } from './budgetSlice';

import { Form, Row, Col, Button, Modal, FloatingLabel } from 'react-bootstrap';

import './editTrxModal.css';

export const EditTrxModal = ({ id }) => {
	let trx = useSelector((state) => selectTrxById(state, id));
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState(trx.title);
	const [type, setType] = useState(trx.type);
	const [value, setValue] = useState(trx.value);
	const [trxDate, setTrxDate] = useState(trx.trxDate);
	const [trxTime, setTrxTime] = useState(trx.trxTime);
	const dispatch = useDispatch();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleTrxSumbit = async () => {
		await dispatch(updateTrx({ id, type, title, value, trxDate, trxTime }));
		setType('');
		setTitle('');
		setValue('');
		setTrxDate('');
		setTrxTime('');
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
									placeholder={'transaction title'}
									value={title}
									changeFunc={(event) => setTitle(event.target.value)}
								/>

								<CustomFloatingLabel
									type={'number'}
									placeholder={'transaction value'}
									value={value}
									changeFunc={(event) => setValue(event.target.value)}
								/>

								<CustomFloatingLabel
									type={'datetime-local'}
									placeholder={'transaction date'}
									value={trxDate}
									changeFunc={(event) => setTrxDate(event.target.value)}
								/>

								<CustomFloatingLabel
									type={'time'}
									placeholder={'transaction time'}
									value={trxTime}
									changeFunc={(event) => setTrxTime(event.target.value)}
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

const CustomFloatingLabel = ({ type, placeholder, value, changeFunc }) => {
	return (
		<FloatingLabel controlId="floatingInput-4" label="Time" className="mb-3">
			<Form.Control
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={changeFunc}
				className="trx-moda-input"
			/>
		</FloatingLabel>
	);
};
