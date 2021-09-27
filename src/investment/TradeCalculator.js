import React from 'react';
import { useState, useEffect } from 'react';

import {
	Container,
	Row,
	Col,
	Form,
	FloatingLabel,
	Button,
	Tabs,
	Tab,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TradeCalculator.css';

export const TradeCalculator = () => {
	const [key, setKey] = useState('pnl');
	return (
		<Container className="trade-calculator">
			<Row>
				<Col className="tabs-col">
					{/* <Button className="active">PNL</Button>
					<Button>Target Price</Button>
					<Button>Liquidation Price</Button>
					<Button>Max Open</Button>
					<Button>Open Price</Button> */}
					<Tabs
						id="controlled-tab-example"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3"
					>
						<Tab eventKey="pnl" title="PNL">
							<PNLContent />
						</Tab>
						<Tab eventKey="targetPrice" title="Target Price">
							<TargetPrice />
						</Tab>
						<Tab eventKey="liquidationPrice" title="Liquidation Price">
							<LiquidationPrice />
						</Tab>
						<Tab eventKey="maxOpen" title="Max Open">
							<MaxOpen />
						</Tab>
						<Tab eventKey="openPrice" title="Open Price">
							<OpenPrice />
						</Tab>
					</Tabs>
				</Col>
			</Row>
			{/* <Row className="calculator-content">
				<Col>
					<CalculatorForm />
				</Col>
				<Col>
					<CalculatorResult />
				</Col>
			</Row> */}
		</Container>
	);
};

const PNLContent = () => {
	return (
		<Container>
			<Row className="calculator-content">
				<Col>
					<CalculatorForm />
				</Col>
				<Col>
					<CalculatorResult />
				</Col>
			</Row>
		</Container>
	);
};

const TargetPrice = () => {
	return (
		<Container>
			<h6>Target Price Tab</h6>
		</Container>
	);
};
const LiquidationPrice = () => {
	return (
		<Container>
			<h6>Liquidation Price Tab</h6>
		</Container>
	);
};
const MaxOpen = () => {
	return (
		<Container>
			<h6>Max Open Tab</h6>
		</Container>
	);
};
const OpenPrice = () => {
	return (
		<Container>
			<h6>Open Price Tab</h6>
		</Container>
	);
};

const CalculatorResult = () => {
	return (
		<Container>
			<Row>
				<Col>
					<h5>Result</h5>
				</Col>
			</Row>
			<Row>
				<Col>
					<p>Initial Margin</p>
				</Col>
				<Col>
					<p className="margin-result">-BTC</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<p>PNL</p>
				</Col>
				<Col>
					<p className="pnl-result">-BTC</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<p>ROE</p>
				</Col>
				<Col>
					<p className="roe-result">-%</p>
				</Col>
			</Row>
		</Container>
	);
};

const CalculatorForm = () => {
	const [tradeType, setTradeType] = useState('long');
	const [leverage, setleverage] = useState('');
	const [entryPrice, setEntryPrice] = useState('');
	const [exitPrice, setExitPrice] = useState('');
	const [quantitiy, setQuantitiy] = useState('');

	const leverageChanged = (ev) => setleverage(ev.target.value);
	const entryPriceChanged = (ev) => setEntryPrice(ev.target.value);
	const exitPriceChanged = (ev) => setExitPrice(ev.target.value);
	const quantitiyChanged = (ev) => setQuantitiy(ev.target.value);

	const toggleTradeType = (ev) => {
		const buyBtn = document.querySelector('.btn-buy');
		const sellBtn = document.querySelector('.btn-sell');

		let _list = Array.from(ev.target.classList);
		if (ev.target.value === 'long') {
			if (!_list.includes('active')) {
				sellBtn.classList.remove('active');
				buyBtn.classList.add('active');
			}
		} else {
			if (!_list.includes('active')) {
				buyBtn.classList.remove('active');
				sellBtn.classList.add('active');
			}
		}
		setTradeType(ev.target.value);
	};

	const onCalculate = () => {
		console.log(`tradeType: ${tradeType}`);
		console.log(`leverage: ${leverage}`);

		const marginDom = document.querySelector('.margin-result');
		const pnlDom = document.querySelector('.pnl-result');
		const roeDom = document.querySelector('.roe-result');

		let margin, pnl, roe;

		if (tradeType === 'long') {
			margin = quantitiy / leverage;
			pnl = ((exitPrice - entryPrice) / entryPrice) * quantitiy;
			roe = ((exitPrice - entryPrice) / entryPrice) * 100 * leverage;
		} else {
			margin = quantitiy / leverage;
			pnl = ((entryPrice - exitPrice) / entryPrice) * quantitiy;
			roe = ((entryPrice - exitPrice) / entryPrice) * 100 * leverage;
		}

		marginDom.innerHTML = `${margin.toFixed(2)} USDT`;
		pnlDom.innerHTML = `${pnl.toFixed(2)} USDT`;
		roeDom.innerHTML = `${roe.toFixed(2)} %`;
	};

	return (
		<Container className="content-left">
			<Row>
				<Col>
					<Button className="btn-buy" active value={'long'} onClick={toggleTradeType}>
						Long
					</Button>
				</Col>
				<Col>
					<Button className="btn-sell" value={'short'} onClick={toggleTradeType}>
						Short
					</Button>
				</Col>
			</Row>
			<Row>
				<Col md={9}>
					<Form.Range
						type="range"
						list="tickmarks"
						className="leverage-range"
						min={1}
						max={125}
						value={leverage}
						onChange={leverageChanged}
					/>
				</Col>
				<Col>
					<FloatingLabel label="Leverage">
						<Form.Control
							type="number"
							placeholder="Leverage"
							value={leverage}
							onChange={leverageChanged}
							className="calculator-input"
						/>
					</FloatingLabel>
				</Col>
			</Row>
			<Row>
				<Col>
					<FloatingLabel label="Entry Price">
						<Form.Control
							type="number"
							placeholder="Entry Price"
							value={entryPrice}
							onChange={entryPriceChanged}
							className="calculator-input"
						/>
					</FloatingLabel>
				</Col>
			</Row>
			<Row>
				<Col>
					<FloatingLabel label="Exit Price">
						<Form.Control
							type="number"
							placeholder="Exit Price"
							value={exitPrice}
							onChange={exitPriceChanged}
							className="calculator-input"
						/>
					</FloatingLabel>
				</Col>
			</Row>
			<Row>
				<Col>
					<FloatingLabel label="Quantity">
						<Form.Control
							type="number"
							placeholder="Quantity"
							value={quantitiy}
							onChange={quantitiyChanged}
							className="calculator-input"
						/>
					</FloatingLabel>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button onClick={onCalculate} className="mainBg-btn">
						Calculate
					</Button>
				</Col>
			</Row>
		</Container>
	);
};
