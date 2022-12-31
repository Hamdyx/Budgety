import React, { useState, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { AddTrxForm } from './AddTrxForm';
import TransactionRow from './TransactionRow';
import CategoryMain from '../category/CategoryMain';
import { fetchTrxs, selectAllTrx, selectTrxIds } from './budgetSlice';

import 'react-circular-progressbar/dist/styles.css';
import './BudgetMain.css';
// const DoughnutChart = React.lazy(() => import('../../Components/charts/DoughnutChart'));

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
	const allTrxIds = useSelector(selectTrxIds);
	const TrxRows = allTrxIds.map((id, i) => <TransactionRow key={i} trx_id={id} />);

	const dispatch = useDispatch();
	let budgetCircularFrames = {
		yearly: 10,
		monthly: 25,
		weekly: 50,
		daily: 30,
	};

	let budgetCircularContent = Object.entries(budgetCircularFrames).map((el, i) => (
		<Col key={i} sm={{ span: 2 }}>
			<BudgetFrame timeframe={el[0]} value={el[1]} />
		</Col>
	));

	useEffect(() => {
		dispatch(fetchTrxs());
	}, [dispatch]);

	return (
		<Container className="budget-main" fluid>
			<Row>
				<Col sm={{ span: 8 }}>
					<Row className="budget-header">
						<Col className="header-title">
							<h5>Budget Feature</h5>
						</Col>
						{budgetCircularContent}
					</Row>
					<CategoryMain />
					<Row>
						<Col sm={{ span: 4 }}>
							<h5>Recent Transactions</h5>
						</Col>
						<Col>
							<ColoredLine color={'#545963'} />
						</Col>
					</Row>
					{TrxRows}
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
	let content = [];

	let labels = ['utility', 'food', 'shopping'];
	// let data = [25, 50, 75];
	// let colors = ['#21bf73', '#FE5E54', '#F7C025'];
	let labelsContent = labels.map((el, i) => <li key={i}>{el}</li>);

	if (budgetType === 'inc') {
		content = incTrxs.map((trx, i) => <TransactionRow key={i} trx_id={trx.id} />);
	} else {
		content = expTrxs.map((trx, i) => <TransactionRow key={i} trx_id={trx.id} />);
	}

	return (
		<Container className="budget-section">
			<Row>
				<Col sm={{ span: 7 }}>
					<Suspense fallback={<div>Loading...</div>}>
						{/* <DoughnutChart labelsArr={labels} data={data} colors={colors} /> */}
					</Suspense>
				</Col>
				<Col sm={{ span: 5 }}>
					<ul className="category-chart-items">{labelsContent}</ul>
				</Col>
			</Row>
			<Row className="inc-exp-row">
				<Col>
					<Button
						className={`exp-btn ${budgetType === 'exp' ? 'active' : ''}`}
						onClick={() => setBudgetType('exp')}
					>
						Expense
					</Button>
					<Button
						className={`inc-btn ${budgetType === 'inc' ? 'active' : ''}`}
						onClick={() => setBudgetType('inc')}
					>
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
