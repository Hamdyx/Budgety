import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './InvestmentPage.css';
import { TradeCalculator } from './TradeCalculator';

const InvestmentPage = () => {
	return (
		<Container id="investment_page">
			<Row>
				<TradeCalculator />
			</Row>
		</Container>
	);
};

export default InvestmentPage;
