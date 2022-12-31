import React, { useState, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addNewCategory, fetchTrxs, selectTrxIds } from './budgetSlice';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { AddTrxForm } from './AddTrxForm';
import { selectAllTrx } from './budgetSlice';

import CategoryBox from './CategoryBox';
import 'react-circular-progressbar/dist/styles.css';
import './BudgetMain.css';

import TransactionRow from './TransactionRow';
import { Form, Input, InputNumber, Modal } from 'antd';

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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const allTrxIds = useSelector(selectTrxIds);
	const categories = useSelector(state => state.budget.categories);
	const TrxRows = allTrxIds.map((id, i) => <TransactionRow key={i} trx_id={id} />);

	const dispatch = useDispatch();
	let budgetCircularFrames = {
		yearly: 10,
		monthly: 25,
		weekly: 50,
		daily: 30,
	};

	// const handleAddCategory = () => {
	// 	console.log('handleAddCategory');
	// }

	let budgetCircularContent = Object.entries(budgetCircularFrames).map((el, i) => (
		<Col key={i} sm={{ span: 2 }}>
			<BudgetFrame timeframe={el[0]} value={el[1]} />
		</Col>
	));

	const categoriesItems = Object.entries(categories).map((el, i) => (
		<Col key={i} sm={{ span: 4 }}>
			<CategoryBox category={el} />
		</Col>
	));

	const onFinish = (values) => {
		console.log('Success:', values);
		const updated = { ...categories, [values.category]: { budget: values.budget } }
		console.log('Success:', updated);
		dispatch(addNewCategory(updated))
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

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
					<Row>
						<Col sm={{ span: 2 }}>
							<h5>Categories</h5>
						</Col>
						<Col sm={{ span: 1 }}>
							<Button className="budget-add-btn" onClick={showModal}>+</Button>
							<Modal title="Add Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
								<Form
									name="basic"
									labelCol={{
										span: 8,
									}}
									wrapperCol={{
										span: 16,
									}}
									initialValues={{
										remember: true,
									}}
									onFinish={onFinish}
									onFinishFailed={onFinishFailed}
									autoComplete="off"
								>
									<Form.Item
										label="Category"
										name="category"
										rules={[
											{
												required: true,
												message: 'Please input your category!',
											},
										]}
									>
										<Input />
									</Form.Item>
									<Form.Item
										label="Budget"
										name="budget"
										rules={[
											{
												required: true,
												message: 'Please input your Budget!',
											},
										]}
									>
										<InputNumber />
									</Form.Item>
									<Form.Item
										wrapperCol={{
											offset: 8,
											span: 16,
										}}
									>
										<Button type="primary" htmlType="submit">
											Submit
										</Button>
									</Form.Item>
								</Form>
							</Modal>
						</Col>
						<Col>
							<ColoredLine color={'#545963'} />
						</Col>
					</Row>
					<Row className="category-row">{categoriesItems}</Row>
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
