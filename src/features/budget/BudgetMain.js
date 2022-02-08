import React, { useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { AddTrxForm } from './AddTrxForm';
import { selectAllTrx } from './budgetSlice';

import CategoryBox from './CategoryBox';
// import DoughnutChart from '../DoughnutChart';
import 'react-circular-progressbar/dist/styles.css';
import './BudgetMain.css';

const DoughnutChart = React.lazy(() => import('../../Components/charts/DoughnutChart'));

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
	const allTrxRows = allTrxs.map((trx, i) => <TransactionSection key={i} trx={trx} />);

	let budgetCircularFrames = {
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

	budgetCircularFrames = Object.entries(budgetCircularFrames).map((el, i) => (
		<Col sm={{ span: 2 }}>
			<BudgetFrame key={i} timeframe={el[0]} value={el[1]} />
		</Col>
	));

	categories = Object.entries(categories).map((el, i) => (
		<Col sm={{ span: 4 }}>
			<CategoryBox key={i} category={el} />
		</Col>
	));

	return (
		<Container className="budget-main" fluid>
			<Row>
				<Col sm={{ span: 8 }}>
					<Row className="budget-header">
						<Col className="header-title">
							<h5>Budget Feature</h5>
						</Col>
						{budgetCircularFrames}
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
	let labelsContent = labels.map((el, i) => <li key={i}>{el}</li>);

	if (budgetType === 'inc') {
		content = incTrxs.map((trx, i) => <TransactionSection key={i} trx={trx} />);
	} else {
		content = expTrxs.map((trx, i) => <TransactionSection key={i} trx={trx} />);
	}

	return (
		<Container className="budget-section">
			<Row>
				<Col sm={{ span: 7 }}>
					<Suspense fallback={<div>Loading...</div>}>
						<DoughnutChart labelsArr={labels} data={data} colors={colors} />
					</Suspense>
				</Col>
				<Col sm={{ span: 5 }}>
					<ul className="category-chart-items">{labelsContent}</ul>
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
