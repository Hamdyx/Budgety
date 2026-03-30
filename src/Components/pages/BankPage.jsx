import React, { Suspense } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './BankPage.css';

let creditLabels = ['limit', 'balance'];
let creditData = [25, 50];
// let creditLabelsContent = creditLabels.map((el, i) => <li key={i}>{el}</li>);
let loanLabels = ['due', 'paid'];
let loanData = [25, 50];
// let loanLabelsContent = creditLabels.map((el, i) => <li key={i}>{el}</li>);
let colors = ['#21bf73', '#FE5E54'];

let analyticsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'june', 'Jul'];
let analyticsData = [100, 150, 200, 300, 325, 250, 350];

let balanceLabels = ['Balance', 'Debt'];
let balanceData = [5, 25];
// const BarChart = React.lazy(() => import('../charts/BarChart'));

// const DoughnutChart = React.lazy(() => import('../charts/DoughnutChart.js'));

// const LineChart = React.lazy(() => import('../charts/LineChart'));
const BankPage = () => {
	return (
		<Container id="bank_page">
			<Row>
				<Col md={6}>
					<Container className="bank_section">
						<Row>
							<Col>
								<h4>Account Stats</h4>
							</Col>
						</Row>
						<Row>
							<Suspense fallback={<div>Loading...</div>}>
								{/* <BarChart labelsArr={balanceLabels} data={balanceData} colors={colors} /> */}
							</Suspense>
						</Row>
					</Container>
				</Col>
				<Col>
					<Container className="bank_section">
						<Row>
							<Col>
								<h4>Analytics</h4>
							</Col>
						</Row>
						<Row>
							<Col>
								<Suspense fallback={<div>Loading...</div>}>
									{/* <LineChart
										labelsArr={analyticsLabels}
										data={analyticsData}
										colors={colors}
									/> */}
								</Suspense>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button active>7 D</Button>
							</Col>
							<Col>
								<Button>30 D</Button>
							</Col>
							<Col>
								<Button>3 M</Button>
							</Col>
							<Col>
								<Button>All</Button>
							</Col>
						</Row>
					</Container>
				</Col>
			</Row>
			<Row>
				<Col md={3}>
					<Container className="bank_section">
						<Row>
							<Col>
								<h4>Loan</h4>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Suspense fallback={<div>Loading...</div>}>
									{/* <LoanChart values={[20000, 24000]} /> */}
									{/* <DoughnutChart labelsArr={loanLabels} data={loanData} colors={colors} /> */}
								</Suspense>
							</Col>
							<Col md={6}>
								<ul id="bank_items" className="text-muted">
									<li className="red_dot">Due</li>
									<li className="green_dot">Paid</li>
								</ul>
							</Col>
						</Row>
					</Container>
				</Col>
				<Col md={3}>
					<Container className="bank_section">
						<Row>
							<Col>
								<h4>Credit Card</h4>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Suspense fallback={<div>Loading...</div>}>
									{/* <LoanChart values={[5000, 500]} /> */}
									{/* <DoughnutChart
										labelsArr={creditLabels}
										data={creditData}
										colors={colors}
									/> */}
								</Suspense>
							</Col>
							<Col md={6}>
								<ul id="bank_items" className="text-muted">
									<li className="red_dot">Limit</li>
									<li className="green_dot">Balance</li>
								</ul>
							</Col>
						</Row>
					</Container>
				</Col>
			</Row>
			<Row>
				<Col>
					<Container className="bank_section">
						<Row>
							<Col>
								<h4>Recent Activity</h4>
							</Col>
						</Row>
						<Row>
							<ul>
								<li>activity 1</li>
								<li>activity 2</li>
								<li>activity 3</li>
							</ul>
						</Row>
					</Container>
				</Col>
			</Row>
		</Container>
	);
};

export default BankPage;
