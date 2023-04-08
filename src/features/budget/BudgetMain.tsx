import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useAppDispatch } from 'app/store';
import { AddTrxForm } from './AddTrxForm';
import TransactionRow from './TransactionRow';
import CategoryMain from '../category/CategoryMain';
import { fetchTrxs, selectAllTrx, selectTrxIds } from './budgetSlice';

import 'react-circular-progressbar/dist/styles.css';
import './BudgetMain.css';

const ColoredLine = ({ color }: any) => (
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
	const TrxRows = allTrxIds.map((id, i) => (
		<TransactionRow key={i} trx_id={id} />
	));

	const dispatch = useAppDispatch();
	let budgetCircularFrames = {
		yearly: 10,
		monthly: 25,
		weekly: 50,
		daily: 30,
	};

	let budgetCircularContent = Object.entries(budgetCircularFrames).map(
		(el, i) => (
			<Col key={i} sm={{ span: 2 }}>
				<BudgetFrame timeframe={el[0]} value={el[1]} />
			</Col>
		)
	);

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
	const incTrxs = allTrxs.filter((trx: any) => trx.type === 'inc');
	const expTrxs = allTrxs.filter((trx: any) => trx.type === 'exp');
	let content = [];

	if (budgetType === 'inc') {
		content = incTrxs.map((trx: any, i) => (
			<TransactionRow key={i} trx_id={trx.id} />
		));
	} else {
		content = expTrxs.map((trx: any, i) => (
			<TransactionRow key={i} trx_id={trx.id} />
		));
	}

	return (
		<Container className="budget-section">
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

const BudgetFrame = ({ timeframe, value }: { timeframe: any; value: any }) => {
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
