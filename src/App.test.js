import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';

jest.mock('./app/Sidebar', () => () => <div>Sidebar</div>);
jest.mock('./Components/pages/Overview', () => () => <div>Overview</div>);
jest.mock('./features/investment/InvestmentPage', () => () => (
	<div>Investment</div>
));
jest.mock('./Components/pages/BankPage', () => () => <div>Bank</div>);
jest.mock('./features/budget/BudgetMain', () => ({
	BudgetMain: () => <div>Budget</div>,
}));

test('renders overview navigation link', () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<App />
			</MemoryRouter>
		</Provider>
	);

	expect(screen.getByText(/overview/i)).toBeInTheDocument();
});
