import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { GiCash } from 'react-icons/gi';
import InvestmentModal from './InvestmentModal';
import './InvestmentCard.css';

class InvestmentCard extends React.Component {
	constructor(props) {
		super(props);
		this.wrapperRef = React.createRef();
	}
	componentDidMount() {
		/* console.log('card');
    console.log(this.wrapperRef); */
	}
	render() {
		return (
			<Container className="main_box">
				<Row className="box_title_row">
					<Col xs={9}>
						<h5 className="box_title text-left">Investment</h5>
					</Col>
					<Col xs={3} className="card_add_col">
						{/* <a href="#" className="h1 card_add text-right">
              +
            </a> */}
						<InvestmentModal wrapperRef={this.wrapperRef} />
					</Col>
				</Row>

				<Row className="investment_category_item">
					<Col xs={2}>
						<GiCash className="investment_worth_icon" />
					</Col>
					<Col className="investment_market_value">
						<p className="income_item_text investment_item_input">3500</p>
						<p className="text-muted investment_label_text">market Value</p>
					</Col>

					<Col className="investment_cash_balance">
						<p className="income_item_text investment_item_input">3500</p>
						<p className="text-muted investment_label_text">Cash Balance</p>
					</Col>
				</Row>
				<Row className="investment_category_item">
					<Col>
						<a href="/" className="h6 investment_box_btn">
							Portfolio
						</a>
					</Col>
					<Col className="text-right">
						<a href="/" className="h6 investment_box_btn">
							Transactions
						</a>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default InvestmentCard;
