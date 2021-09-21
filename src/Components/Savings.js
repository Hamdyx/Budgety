import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineDollar } from 'react-icons/ai';
import './Savings.css';

class Savings extends React.Component {
	render() {
		return (
			<Container className="main_box">
				<Row className="box_title_row">
					<Col xs={9}>
						<h5 className="box_title text-left">Savings</h5>
					</Col>
					<Col xs={3} className="card_add_col">
						<a href="/" className="h1 card_add text-right">
							+
						</a>
					</Col>
				</Row>
				<Row id="deposit_box" className="savings_category_item">
					<Col xs={4}>
						<AiOutlineDollar className="savings_icon" />
					</Col>
					<Col>
						<p className="savings_item_input">3500</p>
						<p className="text-muted savings_label_text text-left">Today's Deposit</p>
					</Col>
				</Row>
				<Row id="total_deposit_box" className="savings_category_item">
					<Col xs={4}>
						<AiOutlineDollar className="total_savings_icon" />
					</Col>
					<Col>
						<p className="savings_item_input">3500</p>
						<p className="savings_label_text text-left">Bank</p>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Savings;
