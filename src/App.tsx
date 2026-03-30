import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './app/Sidebar';

import './App.css';
import './style/main.scss';

const Overview = lazy(() => import('./Components/pages/Overview'));
const InvestmentPage = lazy(
	() => import('./features/investment/InvestmentPage')
);
const BankPage = lazy(() => import('./Components/pages/BankPage'));
const BudgetMain = lazy(() =>
	import('./features/budget/BudgetMain').then((module) => ({
		default: module.BudgetMain,
	}))
);

function App() {
	return (
		<Container fluid id="overview_container">
			<Row id="page_container">
				<Col xs={12} sm={12} md={2} id="sidebar_box">
					<Sidebar />
				</Col>
				<Col id="main_content">
					<Suspense fallback={<div>Loading page...</div>}>
						<Routes>
							<Route path="/" element={<Overview />} />
							<Route path="/budget" element={<BudgetMain />} />
							<Route path="/investment" element={<InvestmentPage />} />
							<Route path="/bank" element={<BankPage />} />
							<Route path="*" element={<Overview />} />
						</Routes>
					</Suspense>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
