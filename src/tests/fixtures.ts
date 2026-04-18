import type { AuthResponse, Category, InvestmentCoin, Transaction, User } from '@/types/types';

// ── Users ─────────────────────────────────────────────
export const mockUser: User = {
  id: 'user-1',
  email: 'test@example.com',
  username: 'testuser',
};

// ── Auth ──────────────────────────────────────────────
function createTestJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.test-signature`;
}

export const mockToken = createTestJwt({
  sub: 'user-1',
  email: 'test@example.com',
  username: 'testuser',
  exp: 9999999999,
});

export const mockExpiredToken = createTestJwt({
  sub: 'user-1',
  exp: 1000000000,
});

export const mockAuthResponse: AuthResponse = {
  accessToken: mockToken,
  tokenType: 'bearer',
};

// ── Categories ────────────────────────────────────────
export const mockCategories: Category[] = [
  { id: 1, category: 'Salary', type: 'income', budget: 5000, spent: 3000 },
  { id: 2, category: 'Food', type: 'expense', budget: 800, spent: 600 },
  { id: 3, category: 'Rent', type: 'expense', budget: 1500, spent: 1500 },
  { id: 4, category: 'Freelance', type: 'income', budget: 2000, spent: 1000 },
];

// ── Transactions ──────────────────────────────────────
export const mockTransactions: Transaction[] = [
  {
    id: 'trx-1',
    type: 'inc',
    title: 'Monthly Salary',
    value: 3000,
    trxDate: '2024-01-15T09:30:00',
    categoryId: 1,
  },
  {
    id: 'trx-2',
    type: 'exp',
    title: 'Grocery Shopping',
    value: 150,
    trxDate: '2024-01-16T14:00:00',
    categoryId: 2,
  },
  {
    id: 'trx-3',
    type: 'exp',
    title: 'Monthly Rent',
    value: 1500,
    trxDate: '2024-01-01T08:00:00',
    categoryId: 3,
  },
  {
    id: 'trx-4',
    type: 'inc',
    title: 'Freelance Payment',
    value: 1000,
    trxDate: '2024-01-20T16:45:00',
    categoryId: 4,
  },
  {
    id: 'trx-5',
    type: 'exp',
    title: 'Dinner Out',
    value: 50,
    trxDate: '2024-01-21T19:00:00',
    categoryId: 2,
  },
  {
    id: 'trx-6',
    type: 'inc',
    title: 'Side Project',
    value: 500,
    trxDate: '2024-01-22T10:00:00',
    categoryId: 4,
  },
];

// ── Investments ───────────────────────────────────────
export const mockInvestments: InvestmentCoin[] = [
  {
    id: 1,
    name: 'BTC',
    buyPrice: 40000,
    buyAmount: 2000,
    sellPrice: 45000,
    holdings: 0.05,
    sellAmount: 2250,
    profitPercent: 12.5,
  },
  {
    id: 2,
    name: 'ETH',
    buyPrice: 2500,
    buyAmount: 1000,
    sellPrice: 3000,
    holdings: 0.4,
    sellAmount: 1200,
    profitPercent: 20,
  },
];

// ── Snake-case versions for MSW responses ─────────────
export const mockAuthResponseSnake = {
  access_token: mockAuthResponse.accessToken,
  token_type: mockAuthResponse.tokenType,
};

export const mockCategoriesSnake = mockCategories.map(c => ({
  id: c.id,
  category: c.category,
  type: c.type,
  budget: c.budget,
  spent: c.spent,
}));

export const mockTransactionsSnake = mockTransactions.map(t => ({
  id: t.id,
  type: t.type,
  title: t.title,
  value: t.value,
  trx_date: t.trxDate,
  category_id: t.categoryId,
}));

export const mockInvestmentsSnake = mockInvestments.map(i => ({
  id: i.id,
  name: i.name,
  buy_price: i.buyPrice,
  buy_amount: i.buyAmount,
  sell_price: i.sellPrice,
  holdings: i.holdings,
  sell_amount: i.sellAmount,
  profit_percent: i.profitPercent,
}));
