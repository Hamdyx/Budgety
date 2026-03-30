import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Overview.css';
import { BiSearch } from 'react-icons/bi';

const TransactionsCard = React.lazy(() => import('../cards/TransactionsCard'));
const ReportsCard = React.lazy(() => import('../cards/ReportsCard'));
const SchedulerCard = React.lazy(() => import('../cards/SchedulerCard'));
const Savings = React.lazy(() => import('../cards/Savings'));
const BankCard = React.lazy(() => import('../cards/BankCard'));
const Budget = React.lazy(() => import('../cards/Budget'));
const WishlistCard = React.lazy(() => import('../cards/WishlistCard'));
const InvestmentCard = React.lazy(() => import('../cards/InvestmentCard'));

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
							<React.Suspense fallback={<div>Loading overview...</div>}>
								<div className="grid">
									<Col xs={6} sm={6} md={6} className="overview-box">
										<TransactionsCard />
									</Col>
									<Col xs={6} sm={6} md={6} className="overview-box">
										<ReportsCard />
									</Col>
									<Col xs={6} sm={6} md={6} className="overview-box">
										<SchedulerCard />
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
							</React.Suspense>
						</Container>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Overview;
