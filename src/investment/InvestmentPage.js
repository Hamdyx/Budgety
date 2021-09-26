import React from 'react';
import { useState, useEffect } from 'react';

import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './InvestmentPage.css';
import TvlChart from '../TvlChart';
import HodlValueChart from '../HodlValueChart';

function HandleFarmData() {
	/* const [data, setData] = useState([]); */
	var data = [];

	const getData = () => {
		fetch('yieldFarming.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(function (response) {
				console.log(response);
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				/* setData(myJson); */
				data = myJson;
				testData(myJson);
				return data;
			});
	};

	//getData();
}

function testData(test) {
	console.log('test');
	console.log(test);
}

class InvestmentPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				XED_BNB: {},
				Auto_CAKE: {},
			},
			currTable: 'XED_BNB',
		};
		this.getHeaders = this.getHeaders.bind(this);
		this.getValues = this.getValues.bind(this);
		this.getData = this.getData.bind(this);
		this.setData = this.setData.bind(this);
		this.getValueRow = this.getValueRow.bind(this);
		this.handleTableToggle = this.handleTableToggle.bind(this);
		this.dataTest = [];
	}
	componentDidMount() {
		/* useEffect(() => {
      getData();
    }, []); */
		this.getData();
		/* var dataTest = this.getData(); */
		/* this.setState({ data: dataTest }); */
		/* console.log(dataTest); */
		document.querySelectorAll('.table_btn').forEach((b) => {
			// console.log(b);
			b.addEventListener('click', this.handleTableToggle);
		});
		HandleFarmData();
	}

	getData() {
		const funcTest = this.setData;
		fetch('yieldFarming.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(function (response) {
				//console.log(response);
				return response.json();
			})
			.then(function (myJson) {
				// console.log(myJson);
				funcTest(myJson);
				/* this.setData(myJson); */
			});
	}

	setData(test) {
		/* console.log('dataset');
    console.log(test); */
		var prevData = this.state.data;
		prevData['XED_BNB'] = test[0]['XED-BNB'];
		prevData['Auto_CAKE'] = test[0]['Auto-CAKE'];
		prevData['BONDLY_BNB'] = test[0]['BONDLY-BNB'];
		prevData['PNT_PBTC'] = test[0]['PNT-PBTC'];
		// console.log(prevData);
		let test2 = Array.from(prevData);
		// console.log(test2);
		this.dataTest = prevData;
		// console.log(this.dataTest);

		//this.setState({ data: test[0][this.state.currTable] });
		this.setState({ data: prevData });

		/* console.log(this.state);
    console.log(this.state.data);
    console.log(this.state.data[this.state.currTable]); */
	}

	getHeaders() {
		// var items = this.state.data;
		var items = this.state.data[this.state.currTable];
		// console.log(items);
		// console.log(items[0]);
		/* items = items[0]; */
		// console.log(items[this.state.currTable]);
		var headersList;
		// console.log(items);

		let headers = Object.keys(items);
		// console.log(headers);

		let data = Object.values(items);
		// console.log(data);
		data = data[0];
		// console.log(data);
		let dataH;
		if (data) {
			dataH = Object.keys(data);
			// console.log(dataH);
			let headersList = dataH.map((i) => <th key={i}>{i}</th>);
			// console.log(headersList);
			return headersList;
		}

		/* console.log(headersList); */
	}

	getValues() {
		var items = this.state.data[this.state.currTable];

		let values = Object.values(items);
		/* console.log('values');
    console.log(values); */

		let valuesList = values.map((k, i) => {
			/* console.log(i);
      console.log(k); */

			return this.getValueRow(k);
		});
		/* console.log('getValues');
    console.log(valuesList); */

		/* console.log('sent values');
    console.log(values);
    console.log(valuesList); */
		return valuesList;
	}

	getValueRow(data) {
		/* console.log('data row');
    console.log(data); */
		let values = Object.values(data);
		values = values.map((r) => {
			return <td>{r}</td>;
		});
		/* console.log(values); */
		return <tr>{values}</tr>;
	}

	handleTableToggle(event) {
		// console.log(event.target.value);
		let curr = event.target.value;
		this.setState({ currTable: curr });
	}

	render() {
		return (
			<Container id="investment_page">
				<Row>
					<Col className="table_btn_col">
						<Button value="Auto_CAKE" className="table_btn">
							Auto CAKE
						</Button>
						<Button value="XED_BNB" className="table_btn">
							XED-BNB
						</Button>
						<Button value="BONDLY_BNB" className="table_btn">
							BONDLY-BNB
						</Button>
						<Button value="PNT_PBTC" className="table_btn">
							PNT-PBTC
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table striped bordered hover>
							<thead>
								<tr>{this.getHeaders()}</tr>
							</thead>
							<tbody>
								{this.getValues()}
								{/* <td>406.7</td>
            <td>0.334391</td>
            <td>0.0008</td>
            <td>1216.26</td>
            <td>30</td>
            <td>May</td>
            <td>2021</td>
            <td>4:40</td>
            <td>PM</td>
            <td>-</td>
            <td>$203</td>
            <td>$0.25100</td>
            <td>$304</td> */}
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col md={6}>
						<TvlChart tvlValues={Object.values(this.state.data[this.state.currTable])} />
					</Col>
					<Col md={6}>
						<HodlValueChart
							values={Object.values(this.state.data[this.state.currTable])}
						/>
					</Col>
				</Row>
				<Row></Row>
			</Container>
		);
	}
}

export default InvestmentPage;
