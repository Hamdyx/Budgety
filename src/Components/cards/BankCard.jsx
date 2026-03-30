import React, { Suspense } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BankCard.css';
import { ColoredLine } from 'Components/common/ColoredLine';

let labels = ['deposits', 'loans', 'credit card'];
let data = [25, 50, 75];
let colors = ['#21bf73', '#FE5E54', '#F7C025'];
// let labelsContent = labels.map((el, i) => <li key={i}>{el}</li>);
// const BankChart = React.lazy(() => import('../charts/DoughnutChart'));

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
							{/* <BankChart /> */}
							{/* <BankChart labelsArr={labels} data={data} colors={colors} /> */}
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
