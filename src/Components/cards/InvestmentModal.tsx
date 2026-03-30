import type { InvestmentCoin } from 'types/types';

import { useMemo, useState, type ChangeEvent, type RefObject } from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';

type InvestmentModalProps = {
	wrapperRef?: RefObject<HTMLDivElement | null>;
};

const seedCoins: InvestmentCoin[] = [
	{
		name: 'BNB',
		buyPrice: 350,
		buyAmount: 500,
		sellPrice: 500,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'CAKE',
		buyPrice: 18,
		buyAmount: 500,
		sellPrice: 35,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'ETH',
		buyPrice: 2700,
		buyAmount: 370,
		sellPrice: 3500,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'LINK',
		buyPrice: 32,
		buyAmount: 250,
		sellPrice: 45,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: '1INCH',
		buyPrice: 3.5,
		buyAmount: 250,
		sellPrice: 5.5,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'REEF',
		buyPrice: 0.25,
		buyAmount: 250,
		sellPrice: 0.45,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'SOL',
		buyPrice: 33,
		buyAmount: 250,
		sellPrice: 50,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'SWAP',
		buyPrice: 1.25,
		buyAmount: 250,
		sellPrice: 3.25,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'SUPER',
		buyPrice: 0.8,
		buyAmount: 250,
		sellPrice: 1.75,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'XED',
		buyPrice: 0.31,
		buyAmount: 200,
		sellPrice: 0.6,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'BONDLY',
		buyPrice: 0.22,
		buyAmount: 200,
		sellPrice: 0.45,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'BSCX',
		buyPrice: 3.75,
		buyAmount: 200,
		sellPrice: 10,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'DDIM',
		buyPrice: 16.5,
		buyAmount: 200,
		sellPrice: 40,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'YLD',
		buyPrice: 0.33,
		buyAmount: 150,
		sellPrice: 0.75,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'POLS',
		buyPrice: 1.8,
		buyAmount: 150,
		sellPrice: 3.5,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
	{
		name: 'BTC',
		buyPrice: 37000,
		buyAmount: 150,
		sellPrice: 45000,
		holdings: 0,
		sellAmount: 0,
		profitPercent: 0,
	},
];

const normalizeCoin = (coin: InvestmentCoin): InvestmentCoin => {
	const holdingsRaw = coin.buyPrice > 0 ? coin.buyAmount / coin.buyPrice : 0;
	const holdings = Number(
		coin.name === 'BTC' ? holdingsRaw.toFixed(8) : holdingsRaw.toFixed(6)
	);
	const sellAmount = Number((holdings * coin.sellPrice).toFixed(2));
	const profitPercent =
		coin.buyAmount > 0
			? Number(
					(((sellAmount - coin.buyAmount) / coin.buyAmount) * 100).toFixed(2)
				)
			: 0;
	return { ...coin, holdings, sellAmount, profitPercent };
};

const InvestmentTable = () => {
	const [coins, setCoins] = useState<InvestmentCoin[]>(() =>
		seedCoins.map(normalizeCoin)
	);

	const totals = useMemo(() => {
		const totalBuy = coins.reduce((sum, coin) => sum + coin.buyAmount, 0);
		const totalSell = coins.reduce((sum, coin) => sum + coin.sellAmount, 0);
		const percentage =
			totalBuy > 0 ? ((totalSell - totalBuy) / totalBuy) * 100 : 0;
		return { totalBuy, totalSell, percentage };
	}, [coins]);

	const updateCoin = (
		coinName: string,
		field: 'buyPrice' | 'buyAmount' | 'sellPrice',
		nextValue: number
	) => {
		setCoins((prevCoins) =>
			prevCoins.map((coin) =>
				coin.name === coinName
					? normalizeCoin({
							...coin,
							[field]: Number.isFinite(nextValue) ? nextValue : 0,
						})
					: coin
			)
		);
	};

	const parseInput = (
		ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => Number(ev.target.value || 0);

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Buy Price</th>
					<th>Buy Amount</th>
					<th>Holdings</th>
					<th>Sell Price</th>
					<th>Sell Amount</th>
					<th>Profit %</th>
				</tr>
			</thead>
			<tbody>
				{coins.map((coin, index) => (
					<tr key={coin.name}>
						<td>{index}</td>
						<td>{coin.name}</td>
						<td>
							<Form.Control
								type="number"
								defaultValue={coin.buyPrice}
								onChange={(ev) =>
									updateCoin(coin.name, 'buyPrice', parseInput(ev))
								}
							/>
						</td>
						<td>
							<Form.Control
								type="number"
								defaultValue={coin.buyAmount}
								onChange={(ev) =>
									updateCoin(coin.name, 'buyAmount', parseInput(ev))
								}
							/>
						</td>
						<td>{coin.holdings}</td>
						<td>
							<Form.Control
								type="number"
								defaultValue={coin.sellPrice}
								onChange={(ev) =>
									updateCoin(coin.name, 'sellPrice', parseInput(ev))
								}
							/>
						</td>
						<td>{coin.sellAmount}$</td>
						<td>{coin.profitPercent}%</td>
					</tr>
				))}
				<tr>
					<td>#</td>
					<td colSpan={2}>Total Buy</td>
					<td>{totals.totalBuy.toFixed(2)}$</td>
					<td colSpan={2}>Total Sell</td>
					<td>{totals.totalSell.toFixed(2)}$</td>
					<td>{totals.percentage.toFixed(2)}%</td>
				</tr>
			</tbody>
		</Table>
	);
};

const InvestmentModal = ({ wrapperRef }: InvestmentModalProps) => {
	const [show, setShow] = useState(false);

	return (
		<>
			<button
				type="button"
				className="h1 card_add text-right"
				onClick={() => setShow(true)}
			>
				+
			</button>
			<Modal
				ref={wrapperRef}
				size="lg"
				show={show}
				onHide={() => setShow(false)}
				backdrop="static"
				keyboard={false}
				centered
				id="investment_modal"
			>
				<Modal.Header closeButton>
					<Modal.Title>All Transactions</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container id="inv_modal_body">
						<InvestmentTable />
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Close
					</Button>
					<Button id="inv_add_btn" className="btn-income">
						Add Transaction
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default InvestmentModal;
