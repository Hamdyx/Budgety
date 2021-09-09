import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewTrx } from './budgetSlice';

import { Form, Row, Col, Button, Modal, FloatingLabel } from 'react-bootstrap';

import './AddTrxForm.css';

export const AddTrxForm = () => {
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('');
	const [value, setValue] = useState('');
	const [trxDate, setTrxDate] = useState('');

	const dispatch = useDispatch();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleTrxSumbit = () => {
		console.log(`title: ${title}\nvalue: ${value}\ndate: ${trxDate}`);
		dispatch(addNewTrx({ id: new Date().toISOString(), title, value, trxDate }));
		setTitle('');
		setValue('');
		setTrxDate('');
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
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
								<FloatingLabel controlId="floatingInput-1" label="Title" className="mb-3">
									<Form.Control
										type="text"
										placeholder="transaction title"
										value={title}
										onChange={(event) => setTitle(event.target.value)}
										className="trx-moda-input"
									/>
								</FloatingLabel>
								<FloatingLabel controlId="floatingInput-2" label="Value" className="mb-3">
									<Form.Control
										type="number"
										placeholder="transaction value"
										value={value}
										onChange={(event) => setValue(event.target.value)}
										className="trx-moda-input"
									/>
								</FloatingLabel>
								<FloatingLabel controlId="floatingInput-3" label="Date" className="mb-3">
									{/* <input type="date" /> */}
									<Form.Control
										type="date"
										placeholder="transaction date"
										value={trxDate}
										onChange={(event) => setTrxDate(event.target.value)}
										className="trx-moda-input"
									/>
								</FloatingLabel>
							</Col>
							<Col>Categories</Col>
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
