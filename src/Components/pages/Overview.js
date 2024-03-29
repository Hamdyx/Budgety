import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Overview.css';
import TransactionsCard from '../cards/TransactionsCard';
import ReportsCard from '../cards/ReportsCard';
import SchedulerCard from '../cards/SchedulerCard';
import Savings from '../cards/Savings';
import BankCard from '../cards/BankCard';
import Budget from '../cards/Budget';
import WishlistCard from '../cards/WishlistCard';
import InvestmentCard from '../cards/InvestmentCard';
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
						<Container>
							<div className="grid">
								<Col xs={6} sm={6} md={6} className="overview-box">
									<TransactionsCard />
								</Col>
								<Col xs={6} sm={6} md={6} className="overview-box">
									<ReportsCard />
								</Col>
								<Col xs={6} sm={6} md={6} className="overview-box">
									<SchedulerCard className="container main_box" />
								</Col>
								<Col xs={6} sm={6} md={6} className="overview-box">
									<Savings />
								</Col>
								<Col xs={6} sm={6} md={6} className="overview-box">
									<BankCard />
								</Col>
								<Col xs={6} sm={6} md={6} className="overview-box span-row-2">
									<Budget />
								</Col>

								<Col xs={6} sm={6} md={6} className="overview-box">
									<InvestmentCard />
								</Col>
								<Col xs={6} sm={6} md={6} className="overview-box">
									<WishlistCard />
								</Col>
							</div>
						</Container>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Overview;
