import { Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './app/Sidebar';
import Overview from './Components/pages/Overview';
import InvestmentPage from './features/investment/InvestmentPage';
import BankPage from './Components/pages/BankPage';
import { BudgetMain } from './features/budget/BudgetMain';

import './App.css';
import './style/main.scss';

function App() {
	return (
		<Container fluid id="overview_container">
			<Row id="page_container">
				<Col xs={12} sm={12} md={2} id="sidebar_box">
					<Sidebar />
				</Col>
				<Col id="main_content">
					<Routes>
						<Route path="/" element={<Overview />} />
						<Route path="/budget" element={<BudgetMain />} />
						<Route path="/investment" element={<InvestmentPage />} />
						<Route path="/bank" element={<BankPage />} />
						<Route path="*" element={<Overview />} />
					</Routes>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
