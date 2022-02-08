import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './WishlistCard.css';

const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			padding: 0,
			height: '3rem',
			width: '0.5rem',
			borderColor: color,
		}}
	/>
);

class WishlistCard extends React.Component {
	/* 	constructor(props) {
		super(props);
	} */

	render() {
		return (
			<Container className="main_box">
				<Row className="box_title_row">
					<Col xs={9}>
						<h5 className="box_title text-left">Wishlist</h5>
					</Col>
					<Col xs={3} className="card_add_col">
						<a href="#" className="h1 card_add text-right">
							+
						</a>
					</Col>
				</Row>
				<Row className="wishlist_category_item">
					<Col className="wishlist_value">
						<p className="income_item_text text-right wishlist_item_input">3500</p>
						<p className="text-muted investment_label_text text-right">Value</p>
					</Col>
					<ColoredLine color="#363a3e" />
					<Col className="wishlist_spent">
						<p className="income_item_text wishlist_item_input">3500</p>
						<p className="text-muted investment_label_text">Spent</p>
					</Col>
				</Row>
				{/* <Row>
					<Col>
						<h4>Test Height</h4>
					</Col>
				</Row> */}
			</Container>
		);
	}
}

export default WishlistCard;
