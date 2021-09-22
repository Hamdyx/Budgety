import React, { Suspense } from 'react';
/* import Utils from 'util';
import ReactDom from 'react-dom'; */
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BankCard.css';

/* import { AiOutlineDollar } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import { FaBitcoin } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri';
import { GiCash } from 'react-icons/gi';
import { Line } from 'react-chartjs-2'; */

import { Doughnut } from 'react-chartjs-2';

import { Bar } from 'react-chartjs-2';
const BankChart = React.lazy(() => import('./BankChart'));

const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 1,
			width: '100%',
			borderColor: color,
			margin: '0.5rem 0 0.5rem 0',
		}}
	/>
);

class BankCard extends React.Component {
	render() {
		return (
			<Container className="main_box">
				<Row className="box_title_row">
					<Col xs={9}>
						<h5 className="box_title text-left">Bank</h5>
					</Col>
					<Col xs={3} className="card_add_col">
						<a href="#" className="h1 card_add text-right">
							+
						</a>
					</Col>
				</Row>
				<Row id="bank_overview">
					<Col xs={6}>
						<h6>Net Worth</h6>
						<small>25</small>
					</Col>
					<Col xs={6}>
						<h6>Total Debt</h6>
						<small>25</small>
					</Col>
				</Row>
				<ColoredLine color="#363a3e" />
				<Row id="bank_chart_row">
					<Col xs={6}>
						{/* <BankChart /> */}
						<Suspense fallback={<div>Loading...</div>}>
							<BankChart />
						</Suspense>
					</Col>
					<Col xs={6}>
						<ul id="bank_items" className="text-muted">
							<li className="green_dot">Deposits</li>
							<li className="red_dot">Loans</li>
							<li className="yellow_dot">Credit Card</li>
						</ul>
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

export default BankCard;
