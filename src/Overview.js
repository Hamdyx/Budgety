import React from 'react';
import { Container, Row, Col, Button, Form, Card, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Overview.css';
import BankCard from './BankCard';
import WishlistCard from './WishlistCard';
import TransactionsCard from './Components/TransactionsCard';
import Savings from './Components/Savings';
import ReportsCard from './Components/ReportsCard';
import Budget from './Components/Budget';
import InvestmentCard from './Components/InvestmentCard';
import SchedulerCard from './Components/SchedulerCard';
import { BiSearch } from 'react-icons/bi';
class Overview extends React.Component {
	render() {
		return (
			<Container id="overview_container">
				<Row id="main_header">
					<Col xs={6} className="text-left">
						<h4 className="overview_main_title">Overview</h4>
					</Col>
					<Col
						className="text-right"
						md={{ offset: 4, span: 1 }}
						xs={{ span: 2, offset: 2 }}
					>
						<a href="#" className="overview_search" role="button">
							{/* {this.searchIcon} */}
							<BiSearch className="search_icon" />
						</a>
					</Col>
					<Col xs={2} md={{ offset: 0, span: 1 }} className="text-right">
						<a href="#" className="overview_add" role="button">
							+
						</a>
					</Col>
				</Row>
				<Row>
					<Col>
						<div class="grid">
							<Col sm={4} className="overview-box">
								<TransactionsCard />
							</Col>
							<Col sm={4} className="overview-box">
								<ReportsCard />
							</Col>
							<Col sm={4} className="overview-box">
								<SchedulerCard className="container main_box" />
							</Col>
							<Col sm={4} className="overview-box">
								<Savings />
							</Col>
							<Col sm={4} className="overview-box">
								<BankCard />
							</Col>
							<Col sm={4} className="overview-box span-row-2">
								<Budget />
							</Col>

							<Col sm={4} className="overview-box">
								<InvestmentCard />
							</Col>
							<Col sm={4} className="overview-box">
								<WishlistCard />
							</Col>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Overview;
