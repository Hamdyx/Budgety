import React from 'react';
import { useState, useEffect } from 'react';

import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TradeCalculator.css';

export const TradeCalculator = () => {
	return (
		<Container>
			<Row>
				<Col className="tabs-col">
					<Button className="active">PNL</Button>
					<Button>Target Price</Button>
					<Button>Liquidation Price</Button>
					<Button>Max Open</Button>
					<Button>Open Price</Button>
				</Col>
			</Row>
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
	const [leverage, setleverage] = useState('');
	const [entryPrice, setEntryPrice] = useState('');
	const [exitPrice, setExitPrice] = useState('');
	const [quantitiy, setQuantitiy] = useState('');

	const leverageChanged = (ev) => setleverage(ev.target.value);
	const entryPriceChanged = (ev) => setEntryPrice(ev.target.value);
	const exitPriceChanged = (ev) => setExitPrice(ev.target.value);
	const quantitiyChanged = (ev) => setQuantitiy(ev.target.value);

	const onCalculate = () => {
		console.log('********************');
		console.log(`leverage: ${leverage}`);
		console.log(`entryPrice: ${entryPrice}`);
		console.log(`exitPrice: ${exitPrice}`);
		console.log(`quantitiy: ${quantitiy}`);

		const marginDom = document.querySelector('.margin-result');
		const pnlDom = document.querySelector('.pnl-result');
		const roeDom = document.querySelector('.roe-result');

		let margin = quantitiy / leverage;
		let pnl = ((exitPrice - entryPrice) / entryPrice) * quantitiy;
		let roe = ((exitPrice - entryPrice) / entryPrice) * 100 * leverage;
		console.log(`Initial Margin: ${margin.toFixed(2)}`);
		console.log(`PNL: ${pnl.toFixed(2)}`);
		console.log(`ROE: ${roe.toFixed(2)}%`);
		marginDom.innerHTML = `${margin.toFixed(2)} USDT`;
		pnlDom.innerHTML = `${pnl.toFixed(2)} USDT`;
		roeDom.innerHTML = `${roe.toFixed(2)} %`;
		console.log('********************');
	};

	return (
		<Container className="content-left">
			<Row>
				<Col>
					<Button className="btn-buy">Long</Button>
				</Col>
				<Col>
					<Button className="btn-sell">Short</Button>
				</Col>
			</Row>
			<Row>
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
