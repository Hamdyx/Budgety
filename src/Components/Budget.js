import React from 'react';
import { Container, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';

import { BsHouse } from 'react-icons/bs';
import { RiBillLine } from 'react-icons/ri';
import { MdLocalGroceryStore } from 'react-icons/md';
import './Budget.css';

const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 0.75,
			width: '100%',
			borderColor: color,
			margin: '0.25rem 0 0.25rem 0',
		}}
	/>
);

class Budget extends React.Component {
	render() {
		return (
			<Container className="main_box">
				<Row id="budget_title_row" className="box_title_row">
					<Col xs={9}>
						<h5 className="text-left">Budget</h5>
					</Col>
					<Col xs={3} className="card_add_col">
						<a href="#" className="h1 card_add text-right">
							+
						</a>
					</Col>
				</Row>

				<Container id="budget_top">
					<Row id="income_container" className="income_category_item">
						<Col>
							<p className="text-left">Income</p>
							<p className="text-muted budget_label_text text-left">
								$58,660.00 of $1,345.54
							</p>
						</Col>
						<Col>
							<p className="text-right budget_item_input">6969.42</p>
							<p className="text-muted budget_label_text text-right">over</p>
						</Col>
					</Row>
					<ColoredLine color="#21bf73" />

					<Row id="expense_container" className="expense_category_item">
						<Col>
							<p className="text-left">Expense</p>
							<p className="text-muted budget_label_text text-left">$696 of $6969</p>
						</Col>
						<Col>
							<p className="text-right budget_item_input">6969.42</p>
							<p className="text-muted budget_label_text text-right">over</p>
						</Col>
					</Row>
				</Container>

				<Container id="budget_items">
					<Row className="budget_category_item">
						<Col md={2}>
							<MdLocalGroceryStore className="budget_category_icon groceries_icon" />
						</Col>
						<Col className="text-left">
							<p>Groceries</p>
							<p className="text-muted transactions_label_text">Food & Drinking</p>
						</Col>
						<Col className="text-right ">
							<p className="income_item_text budget_item_input">6969.42</p>
							<p className="text-muted budget_label_text">Available</p>
						</Col>
					</Row>
					<Row className="budget_category_item">
						<Col md={2}>
							<BsHouse className="budget_category_icon house_icon" />
						</Col>
						<Col className="text-left">
							<p>House Rent</p>
							<p className="text-muted budget_label_text">Utilities</p>
						</Col>
						<Col className="text-right">
							<p className="income_item_text budget_item_input">6969.42</p>
							<p className="text-muted budget_label_text">Available</p>
						</Col>
					</Row>
					<Row className="budget_category_item">
						<Col md={2}>
							<RiBillLine className="bill_icon" />
						</Col>
						<Col className="text-left">
							<p>Internet</p>
							<p className="text-muted budget_label_text">Bills</p>
						</Col>
						<Col className="text-right">
							<p className="income_item_text budget_item_input">6969.42</p>
							<p className="text-muted budget_label_text">Available</p>
						</Col>
					</Row>
				</Container>
			</Container>
		);
	}
}

export default Budget;
