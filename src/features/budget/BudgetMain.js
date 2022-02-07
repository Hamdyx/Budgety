import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { AddTrxForm } from './AddTrxForm';
import { selectAllTrx } from './budgetSlice';

import DoughnutChart from '../DoughnutChart';
import 'react-circular-progressbar/dist/styles.css';
import './BudgetMain.css';

import { RiBillLine } from 'react-icons/ri';

const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 2,
		}}
	/>
);

export const BudgetMain = () => {
	const allTrxs = useSelector(selectAllTrx);
	const allTrxRows = allTrxs.map((trx) => <TransactionSection trx={trx} />);

	let testFrame = {
		yearly: 10,
		monthly: 25,
		weekly: 50,
		daily: 30,
	};
	let categories = {
		utility: { spent: 100, limit: 400 },
		food: { spent: 50, limit: 150 },
		shopping: { spent: 25, limit: 100 },
	};

	testFrame = Object.entries(testFrame).map((el, i) => (
		<Col sm={{ span: 2 }}>
			<BudgetFrame key={i} timeframe={el[0]} value={el[1]} />
		</Col>
	));

	categories = Object.entries(categories).map((el, i) => {
		console.log(el);
		return (
			<Col sm={{ span: 4 }}>
				<Category key={i} category={el} />
			</Col>
		);
	});

	return (
		<Container className="budget-main" fluid>
			<Row>
				<Col sm={{ span: 8 }}>
					<Row className="budget-header">
						<Col className="header-title">
							<h5>Budget Feature</h5>
						</Col>
						{testFrame}
					</Row>
					<Row>
						<Col sm={{ span: 2 }}>
							<h5>Categories</h5>
						</Col>
						<Col sm={{ span: 1 }}>
							<Button className="budget-add-btn">+</Button>
						</Col>
						<Col>
							<ColoredLine color={'#545963'} />
						</Col>
					</Row>
					<Row className="category-row">{categories}</Row>
					<Row>
						<Col sm={{ span: 4 }}>
							<h5>Recent Transactions</h5>
						</Col>
						<Col>
							<ColoredLine color={'#545963'} />
						</Col>
					</Row>
					{allTrxRows}
				</Col>
				<Col sm={{ span: 4 }} className="budget-section-col">
					<BudgetSection />
				</Col>
			</Row>
		</Container>
	);
};

const BudgetSection = () => {
	const [budgetType, setBudgetType] = useState('inc');
	const allTrxs = useSelector(selectAllTrx);
	const incTrxs = allTrxs.filter((trx) => trx.type === 'inc');
	const expTrxs = allTrxs.filter((trx) => trx.type === 'exp');
	// console.log(allTrxs);
	// console.log(incTrxs);
	// console.log(expTrxs);
	let content = [];

	let labels = ['utility', 'food', 'shopping'];
	let data = [25, 50, 75];
	let colors = ['#21bf73', '#FE5E54', '#F7C025'];

	if (budgetType === 'inc') {
		content = incTrxs.map((trx) => <TransactionSection trx={trx} />);
	} else {
		content = expTrxs.map((trx) => <TransactionSection trx={trx} />);
	}
	return (
		<Container className="budget-section">
			<Row>
				<Col sm={{ span: 7 }}>
					<DoughnutChart labelsArr={labels} data={data} colors={colors} />
				</Col>
				<Col sm={{ span: 5 }}>
					<ul className="category-chart-items">
						<li>category 1</li>
						<li>category 2</li>
						<li>category 3</li>
					</ul>
				</Col>
			</Row>
			<Row className="inc-exp-row">
				<Col>
					<Button className="exp-btn" onClick={() => setBudgetType('exp')}>
						Expense
					</Button>
					<Button className="inc-btn" onClick={() => setBudgetType('inc')}>
						Income
					</Button>
				</Col>
			</Row>
			{content}
			<Row>
				<Col>
					<AddTrxForm />
				</Col>
			</Row>
		</Container>
	);
};

const TransactionSection = ({ trx }) => {
	return (
		<Row className={`transaction-row-${trx.type}`}>
			<Col>
				<h6>{trx.title}</h6>
				<p>{`${trx.trxDate} - ${trx.trxTime}`}</p>
			</Col>
			<Col className="text-right">
				<p>{`$${trx.value}`}</p>
			</Col>
		</Row>
	);
};

const BudgetFrame = ({ timeframe, value }) => {
	return (
		<section className="budget-timeframe" style={{ width: 100, height: 100 }}>
			<CircularProgressbarWithChildren value={value}>
				<div className="budget-circular">
					<h6>{timeframe}</h6>
					<p>{value}%</p>
				</div>
			</CircularProgressbarWithChildren>
		</section>
	);
};

const Category = ({ category }) => {
	const title = category[0];
	const budget = category[1];
	const spent = budget.spent;
	const limit = budget.limit;
	return (
		<Container className="category-type" fluid>
			<Row>
				<Col sm={{ span: 4 }}>
					<section className="category-circular" style={{ width: 50, height: 50 }}>
						<CircularProgressbarWithChildren value={50}>
							<div className="category-icon">
								<RiBillLine />
							</div>
						</CircularProgressbarWithChildren>
					</section>
				</Col>
				<Col className="category-text">
					<h6>{title}</h6>
					<p>
						${spent}/${limit}
					</p>
				</Col>
			</Row>
		</Container>
	);
};
