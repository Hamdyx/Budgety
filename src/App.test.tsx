import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';

import App from './app/App';

vi.mock('./app/Sidebar', () => ({ default: () => <div>Sidebar</div> }));
vi.mock('./components/common/PrivateRoute', async () => {
  const { Outlet } = await import('react-router-dom');
  return { default: () => <Outlet /> };
});
vi.mock('./features/overview/components/Overview', () => ({
  default: () => <div>Overview</div>,
}));
vi.mock('./features/investment/components/InvestmentPage', () => ({
  default: () => <div>Investment</div>,
}));
vi.mock('./features/bank/components/BankPage/BankPage', () => ({
  default: () => <div>Bank</div>,
}));
vi.mock('./features/budget/components/BudgetMain/BudgetMain', () => ({
  default: () => <div>Budget</div>,
}));

test('renders overview navigation link', async () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );

  expect(await screen.findByText(/overview/i)).toBeInTheDocument();
});
