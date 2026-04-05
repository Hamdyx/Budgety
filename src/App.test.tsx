import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';

import App from './app/App';
import { store } from './app/store';

vi.mock('./app/Sidebar', () => ({ default: () => <div>Sidebar</div> }));
vi.mock('./features/overview/components/Overview', () => ({
  default: () => <div>Overview</div>,
}));
vi.mock('./features/investment/components/InvestmentPage', () => ({
  default: () => <div>Investment</div>,
}));
vi.mock('./features/bank/components/BankPage', () => ({
  default: () => <div>Bank</div>,
}));
vi.mock('./features/budget/components/BudgetMain', () => ({
  BudgetMain: () => <div>Budget</div>,
}));

test('renders overview navigation link', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  expect(await screen.findByText(/overview/i)).toBeInTheDocument();
});
