import React from 'react';
import { Container, Button, Table, Modal, Form } from 'react-bootstrap';

class ModalTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			coins: [
				{
					name: 'BNB',
					buyPrice: 350,
					buyAmount: 500,
					sellPrice: 500,
				},
				{
					name: 'CAKE',
					buyPrice: 18,
					buyAmount: 500,
					sellPrice: 35,
				},
				{
					name: 'ETH',
					buyPrice: 2700,
					buyAmount: 370,
					sellPrice: 3500,
				},
				{
					name: 'LINK',
					buyPrice: 32,
					buyAmount: 250,
					sellPrice: 45,
				},
				{
					name: '1INCH',
					buyPrice: 3.5,
					buyAmount: 250,
					sellPrice: 5.5,
				},
				{
					name: 'REEF',
					buyPrice: 0.25,
					buyAmount: 250,
					sellPrice: 0.45,
				},
				{
					name: 'SOL',
					buyPrice: 33,
					buyAmount: 250,
					sellPrice: 50,
				},
				{
					name: 'SWAP',
					buyPrice: 1.25,
					buyAmount: 250,
					sellPrice: 3.25,
				},
				{
					name: 'SUPER',
					buyPrice: 0.8,
					buyAmount: 250,
					sellPrice: 1.75,
				},
				{
					name: 'XED',
					buyPrice: 0.31,
					buyAmount: 200,
					sellPrice: 0.6,
				},
				{
					name: 'BONDLY',
					buyPrice: 0.22,
					buyAmount: 200,
					sellPrice: 0.45,
				},
				{
					name: 'BSCX',
					buyPrice: 3.75,
					buyAmount: 200,
					sellPrice: 10,
				},

				{
					name: 'DDIM',
					buyPrice: 16.5,
					buyAmount: 200,
					sellPrice: 40,
				},
				{
					name: 'YLD',
					buyPrice: 0.33,
					buyAmount: 150,
					sellPrice: 0.75,
				},
				{
					name: 'POLS',
					buyPrice: 1.8,
					buyAmount: 150,
					sellPrice: 3.5,
				},
				{
					name: 'BTC',
					buyPrice: 37000,
					buyAmount: 150,
					sellPrice: 45000,
				},
			],
		};

		this.getPrice = this.getPrice.bind(this);
		this.getRows = this.getRows.bind(this);
		this.getTotalRow = this.getTotalRow.bind(this);
		this.setHoldings = this.setHoldings.bind(this);
		this.setSellPrice = this.setSellPrice.bind(this);
		this.setAmountSell = this.setAmountSell.bind(this);
		this.setProfitPercent = this.setProfitPercent.bind(this);
		this.getValue = this.getValue.bind(this);
		this.handleSellPrice = this.handleSellPrice.bind(this);
		this.handleBuyPrice = this.handleBuyPrice.bind(this);
		this.handleBuyAmount = this.handleBuyAmount.bind(this);
		this.handleProfitPercent = this.handleProfitPercent.bind(this);
	}

	componentDidMount() {
		/* this.getRows(); */
		this.getValue();
		this.setHoldings();
		this.setAmountSell();
		this.setProfitPercent();
	}

	getPrice(tokens, value) {
		return (value / tokens).toFixed(2);
	}

	setSellPrice() {
		/* let itemList = this.state.coins;
    itemList.map((item) => {
      item.sellPrice = item.profitPercent * item.buyPrice + item.buyPrice;

      item.sellPrice = parseFloat(item.sellPrice);
    });

    this.setState({ coins: itemList }); */
	}

	handleSellPrice(event) {
		let price = event.target.value;
		price = price === '' ? 0 : price;
		let coinName = event.target.id.split('_');
		coinName = coinName[0];
		let prevState = this.state.coins;
		let coinObj = prevState.filter((obj) => obj.name === coinName);
		coinObj[0].sellPrice = parseFloat(price);
		this.setState({ coins: prevState });
		this.setAmountSell();
		this.setProfitPercent();
	}

	handleBuyPrice(event) {
		let price = event.target.value;
		price = price === '' ? 0 : price;
		let coinName = event.target.id.split('_');
		coinName = coinName[0];
		let prevState = this.state.coins;
		let coinObj = prevState.filter((obj) => obj.name === coinName);
		coinObj[0].buyPrice = parseFloat(price);

		this.setState({ coins: prevState });
		this.setHoldings();
		this.setAmountSell();
		this.setProfitPercent();
	}

	handleBuyAmount(event) {
		let amount = event.target.value;
		amount = amount === '' ? 0 : amount;
		let coinName = event.target.id.split('_');
		coinName = coinName[0];
		let prevState = this.state.coins;
		let coinObj = prevState.filter((obj) => obj.name === coinName);
		coinObj[0].buyAmount = parseFloat(amount);
		this.setState({ coins: prevState });
		this.setHoldings();
		this.setAmountSell();
	}

	handleProfitPercent(event) {
		/* let percent = event.target.value;
    percent = percent == '' ? 0 : percent;
    let coinName = event.target.id.split('_');
    coinName = coinName[0];
    let prevState = this.state.coins;
    let coinObj = prevState.filter((obj) => obj.name == coinName);
    coinObj[0].profitPercent = parseFloat(percent);
    this.setState({ coins: prevState });
    this.setSellPrice();
    this.setAmountSell(); */
	}

	setHoldings() {
		let itemList = this.state.coins;
		itemList.map((item) => {
			item.holdings = item.buyAmount / item.buyPrice;
			if (item.name === 'BTC') {
				item.holdings = item.holdings.toFixed(8);
			} else {
				item.holdings = item.holdings.toFixed(6);
			}
			item.holdings = parseFloat(item.holdings);
			return item;
		});

		this.setState({ coins: itemList });
	}

	setAmountSell() {
		let itemList = this.state.coins;
		itemList.map((item) => {
			item.sellAmount = (item.holdings * item.sellPrice).toFixed(2);
			item.sellAmount = parseFloat(item.sellAmount);
			return item;
		});

		this.setState({ coins: itemList });
	}

	setProfitPercent() {
		let itemList = this.state.coins;
		itemList.map((item) => {
			item.profitPercent = (
				((item.sellAmount - item.buyAmount) / item.buyAmount) *
				100
			).toFixed(2);
			item.profitPercent = parseFloat(item.profitPercent);
			return item;
		});

		this.setState({ coins: itemList });
	}

	getValue() {
		let itemsList = this.state.coins;
		itemsList.map((item) => {
			item.value = (item.holdings * item.price).toFixed(2);
			item.value = parseFloat(item.value);
			return item;
		});
		this.setState({ coins: itemsList });
		/* console.log('getValue()');
    console.log(this.state.coins); */
	}

	getRows() {
		var itemList = this.state.coins;

		itemList = itemList.map((item, i) => {
			return (
				<tr key={i}>
					<td>{i}</td>
					<td>{item.name}</td>
					<td>
						<Form.Control
							id={item.name + '_buy_price'}
							type="number"
							defaultValue={item.buyPrice}
							onChange={this.handleBuyPrice}
						/>
					</td>
					<td>
						<Form.Control
							id={item.name + '_buy_anount'}
							type="number"
							defaultValue={item.buyAmount}
							onChange={this.handleBuyAmount}
						/>
					</td>
					<td>{item.holdings}</td>
					<td>
						<Form.Control
							id={item.name + '_sell_price'}
							type="number"
							defaultValue={item.sellPrice}
							onChange={this.handleSellPrice}
						/>
					</td>
					<td>{item.sellAmount + '$'}</td>
					<td>{item.profitPercent + '%'}</td>
				</tr>
			);
		});

		return itemList;
	}

	getTotalRow() {
		var itemList = this.state.coins;
		let totalBuy = 0;
		let totalSell = 0;
		itemList.forEach((i) => {
			totalBuy += i.buyAmount;
		});
		itemList.forEach((i) => {
			totalSell += i.sellAmount;
		});
		let percentage = ((totalSell - totalBuy) / totalBuy) * 100;
		return (
			<tr>
				<td>#</td>
				<td colSpan={2}>Total Buy</td>
				<td>{totalBuy.toFixed(2) + '$'}</td>
				<td colSpan={2}>Total Sell</td>
				<td>{totalSell.toFixed(2) + '$'}</td>
				<td>{percentage.toFixed(2) + '%'}</td>
			</tr>
		);
	}

	getTotal() {}
	render() {
		return (
			<Table stripped="true" bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Buy Price</th>
						<th>Buy Amount</th>
						<th>holdings</th>
						<th>Sell Price</th>
						<th>Sell Amount</th>
						<th>Profit %</th>
					</tr>
				</thead>
				<tbody>
					{this.getRows()}
					{this.getTotalRow()}
				</tbody>
			</Table>
		);
	}
}

class InvestmentModal extends React.Component {
	constructor(props) {
		super(props);
		this.wrapper = props.wrapperRef;
		this.state = {
			show: false,
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}
	componentDidMount() {
		/* console.log(this.wrapper); */
	}

	handleShow() {
		this.setState({ show: true });
	}

	handleClose() {
		this.setState({ show: false });
	}

	render() {
		return (
			<>
				<a
					href="#"
					className="h1 card_add text-right"
					role="button"
					onClick={this.handleShow}
				>
					+
				</a>
				<Modal
					ref={this.wrapper}
					size="lg"
					show={this.state.show}
					onHide={this.handleClose}
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
							<ModalTable />
						</Container>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
						</Button>
						<Button id="inv_add_btn" className="btn-income">
							Add Trasnsaction
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default InvestmentModal;
