import React, { Suspense } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AiOutlineDollar } from 'react-icons/ai';
import { GiCash } from 'react-icons/gi';

import './ReportsCard.css';

// const LineChart = React.lazy(() => import('../charts/LineChart'));
let reportsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'june', 'Jul'];
let reportsData = [100, 150, 200, 300, 325, 250, 350];

class ReportsCard extends React.Component {
	render() {
		return (
			<Container className="main_box">
				<Row className="box_title_row">
					<Col xs={9}>
						<h5 className="box_title text-left">Reports</h5>
					</Col>
					<Col xs={3} className="card_add_col">
						<a href="/" className="h1 card_add text-right">
							+
						</a>
					</Col>
				</Row>
				<Row className="reports_category_item">
					<Col xs={2}>
						<GiCash className="reports_worth_icon" />
					</Col>
					<Col xs={4}>
						<p className="reports_input_item">6969</p>
						<p className="text-muted reports_label_text">Worth</p>
					</Col>

					<Col xs={2}>
						<AiOutlineDollar className="spent_icon" />
					</Col>
					<Col xs={4}>
						<p className="reports_input_item">6969</p>
						<p className="text-muted reports_label_text">Spent</p>
					</Col>
				</Row>
				<Row className="reports_category_item">
					<Col xs={2}>
						<AiOutlineDollar className="earn_icon" />
					</Col>
					<Col xs={4}>
						<p className="reports_input_item">6969</p>
						<p className="text-muted reports_label_text">Earn</p>
					</Col>
				</Row>
				<Row className="reports_category_item">
					<Col className="reports_chart_col">
						<Suspense fallback={<div>Loading...</div>}>
							{/* <LineChart
								labelsArr={reportsLabels}
								data={reportsData}
								width={250}
								height={100}
							/> */}
						</Suspense>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default ReportsCard;
