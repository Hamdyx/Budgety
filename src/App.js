import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './app/Sidebar';

import Overview from './Components/pages/Overview';
import InvestmentPage from './features/investment/InvestmentPage';
import BankPage from './Components/pages/BankPage';
import { BudgetMain } from './features/budget/BudgetMain';

import './App.css';
import './style/main.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: <Overview />,
		};
		this.overview = () => <Overview />;
		this.investment = () => <InvestmentPage />;

		this.searchIcon = (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-search"
				viewBox="0 0 16 16"
			>
				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
			</svg>
		);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	handlePageChange() {
		var curr = this.state.currentPage;
		console.log(curr);
		console.log(curr.type.name);
		curr = curr.type.name === 'Overview' ? <InvestmentPage /> : curr;
		this.setState({ currentPage: curr });
	}

	render() {
		return (
			<Container fluid id="overview_container">
				<Row id="page_container">
					<Col xs={12} sm={12} md={2} id="sidebar_box">
						<Sidebar changePage={this.handlePageChange} />
					</Col>
					<Col id="main_content">
						<Routes>
							<Route path="/" exact element={<Overview />} />
							<Route path="/budget" exact element={<BudgetMain />} />
							<Route path="/investment" element={<InvestmentPage />} />
							<Route path="/bank" element={<BankPage />} />
						</Routes>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default App;
