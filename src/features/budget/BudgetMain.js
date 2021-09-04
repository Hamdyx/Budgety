import React from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';

import './BudgetMain.css';

import { RiBillLine } from 'react-icons/ri';

export const BudgetMain = () => {
	return (
		<Container className="budget-main" fluid>
			<Row>
				<Col sm={{ span: 8 }}>
					<Row>
						<Col className="header-title">
							<h5>Budget Feature</h5>
						</Col>
						<Col sm={{ span: 8 }} className="align-right">
							<BudgetFrame timeframe="yearly" />
							<BudgetFrame timeframe="monthly" />
							<BudgetFrame timeframe="weekly" />
							<BudgetFrame timeframe="daily" />
						</Col>
					</Row>
					<Row>
						<Col>
							<h5>Categories</h5>
						</Col>
						<Col className="text-right">
							<Button>+</Button>
						</Col>
					</Row>
					<Row className="category-row">
						<Col sm={{ span: 4 }}>
							<Category />
						</Col>
						<Col sm={{ span: 4 }}>
							<Category />
						</Col>
						<Col sm={{ span: 4 }}>
							<Category />
						</Col>
					</Row>
					<Row>
						<Col>
							<h5>Recent Transactions</h5>
						</Col>
					</Row>
					<TransactionSection />
					<TransactionSection />
					<TransactionSection />
				</Col>
				<Col sm={{ span: 4 }}>
					<BudgetSection />
				</Col>
			</Row>
		</Container>
	);
};

const BudgetSection = () => {
	return (
		<Container>
			<Row>
				<Col sm={{ span: 7 }}>
					<DoughnutChart />
				</Col>
				<Col sm={{ span: 5 }}>
					<ul>
						<li>category 1</li>
						<li>category 2</li>
						<li>category 3</li>
					</ul>
				</Col>
			</Row>
			<Row className="inc-exp-row">
				<Col>
					<Button>Expense</Button>
					<Button>Income</Button>
				</Col>
			</Row>
			<TransactionSection />
			<TransactionSection />
			<TransactionSection />
		</Container>
	);
};

const TransactionSection = () => {
	return (
		<Row className="transaction-row">
			<Col>
				<h6>Transaction Title</h6>
				<p>%4 Sep 2021%</p>
			</Col>
			<Col className="text-right">
				<p>%22%$</p>
			</Col>
		</Row>
	);
};

const BudgetFrame = ({ timeframe }) => {
	return (
		<section className="budget-timeframe">
			<h6>{timeframe}</h6>
			<p>$85.45</p>
		</section>
	);
};

const Category = () => {
	return (
		<Container className="category-type" fluid>
			<Row>
				<Col sm={{ span: 4 }} className="category-icon">
					<RiBillLine />
				</Col>
				<Col className="category-text">
					<h6>Category</h6>
					<p>Available: $85.45</p>
					<p>Spent: $85.45</p>
				</Col>
			</Row>
		</Container>
	);
};

const DoughnutChart = () => {
	const _state = {
		data: {
			labels: ['Deposits', 'Loans', 'Credit Card'],
			datasets: [
				{
					label: 'Bank Account',
					data: [5, 25, 10],
					backgroundColor: ['#21bf73', '#FE5E54', '#F7C025'],
					hoverOffset: 4,
					radius: '85%',
					cutout: '65%',
				},
			],
		},
		options: {
			borderWidth: 0,
			indexAxis: 'y',
			maintainAspectRatio: false,

			plugins: {
				title: {
					display: false,
				},
				legend: {
					display: false,

					labels: {
						color: '#2a9a67',
					},
				},
			},
		},
	};

	return (
		<Doughnut data={_state.data} options={_state.options} width={250} height={250} />
	);
};
