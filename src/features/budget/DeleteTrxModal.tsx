import React, { useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/store';
import { deleteTrx } from './budgetSlice';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

export const DeleteTrxModal = ({ id }: { id: EntityId }) => {
	const [show, setShow] = useState(false);
	const dispatch = useAppDispatch();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleTrxDelete = async () => {
		dispatch(deleteTrx(id));
		handleClose();
	};

	return (
		<>
			<Button variant="primary" className="deleteTrx-btn" onClick={handleShow}>
				Delete
			</Button>

			<Modal show={show} onHide={handleClose} className="budget-trx-modal">
				<Modal.Header closeButton>
					<Modal.Title>Delete Transaction</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Row>
							<Col>
								<p>Are you sure you want ot delete this transaction ?</p>
								<p>If deleted you can't recover it again.</p>
							</Col>
						</Row>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button className="CustomSecondary-btn" onClick={handleClose}>
						Close
					</Button>
					<Button className="deleteTrx-btn" onClick={handleTrxDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
