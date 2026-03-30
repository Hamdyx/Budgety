import { useState, type ChangeEvent, type MouseEvent } from 'react';
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

type TradeTabKey =
	| 'pnl'
	| 'targetPrice'
	| 'liquidationPrice'
	| 'maxOpen'
	| 'openPrice';
type TradeType = 'long' | 'short';

export const TradeCalculator = () => {
	const [key, setKey] = useState<TradeTabKey>('pnl');

	return (
		<Container className="trade-calculator">
			<Row>
				<Col className="tabs-col">
					<Tabs
						id="controlled-tab-example"
						activeKey={key}
						onSelect={(nextKey) => {
							if (nextKey) {
								setKey(nextKey as TradeTabKey);
							}
						}}
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
		</Container>
	);
};

const PNLContent = () => (
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

const TargetPrice = () => (
	<Container>
		<h6>Target Price Tab</h6>
	</Container>
);

const LiquidationPrice = () => (
	<Container>
		<h6>Liquidation Price Tab</h6>
	</Container>
);

const MaxOpen = () => (
	<Container>
		<h6>Max Open Tab</h6>
	</Container>
);

const OpenPrice = () => (
	<Container>
		<h6>Open Price Tab</h6>
	</Container>
);

const CalculatorResult = () => (
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

const CalculatorForm = () => {
	const [tradeType, setTradeType] = useState<TradeType>('long');
	const [leverage, setLeverage] = useState<number>(1);
	const [entryPrice, setEntryPrice] = useState<number>(0);
	const [exitPrice, setExitPrice] = useState<number>(0);
	const [quantity, setQuantity] = useState<number>(0);

	const numberFromInput = (ev: ChangeEvent<HTMLInputElement>) =>
		Number(ev.target.value || 0);

	const leverageChanged = (ev: ChangeEvent<HTMLInputElement>) =>
		setLeverage(numberFromInput(ev));
	const entryPriceChanged = (ev: ChangeEvent<HTMLInputElement>) =>
		setEntryPrice(numberFromInput(ev));
	const exitPriceChanged = (ev: ChangeEvent<HTMLInputElement>) =>
		setExitPrice(numberFromInput(ev));
	const quantityChanged = (ev: ChangeEvent<HTMLInputElement>) =>
		setQuantity(numberFromInput(ev));

	const toggleTradeType = (ev: MouseEvent<HTMLButtonElement>) => {
		const buyBtn = document.querySelector(
			'.btn-buy'
		) as HTMLButtonElement | null;
		const sellBtn = document.querySelector(
			'.btn-sell'
		) as HTMLButtonElement | null;
		const nextType = (ev.currentTarget.value || 'long') as TradeType;

		if (nextType === 'long') {
			sellBtn?.classList.remove('active');
			buyBtn?.classList.add('active');
		} else {
			buyBtn?.classList.remove('active');
			sellBtn?.classList.add('active');
		}

		setTradeType(nextType);
	};

	const onCalculate = () => {
		const marginDom = document.querySelector('.margin-result');
		const pnlDom = document.querySelector('.pnl-result');
		const roeDom = document.querySelector('.roe-result');
		if (
			!marginDom ||
			!pnlDom ||
			!roeDom ||
			leverage === 0 ||
			entryPrice === 0
		) {
			return;
		}

		const margin = quantity / leverage;
		const delta =
			tradeType === 'long' ? exitPrice - entryPrice : entryPrice - exitPrice;
		const pnl = (delta / entryPrice) * quantity;
		const roe = (delta / entryPrice) * 100 * leverage;

		marginDom.textContent = `${margin.toFixed(2)} USDT`;
		pnlDom.textContent = `${pnl.toFixed(2)} USDT`;
		roeDom.textContent = `${roe.toFixed(2)} %`;
	};

	return (
		<Container className="content-left">
			<Row>
				<Col>
					<Button
						className="btn-buy"
						active
						value="long"
						onClick={toggleTradeType}
					>
						Long
					</Button>
				</Col>
				<Col>
					<Button className="btn-sell" value="short" onClick={toggleTradeType}>
						Short
					</Button>
				</Col>
			</Row>
			<Row>
				<Col md={9}>
					<Form.Range
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
							value={quantity}
							onChange={quantityChanged}
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
