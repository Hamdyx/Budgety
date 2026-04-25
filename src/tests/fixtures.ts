import type { AuthResponse, Category, CategorySummary, Transaction, User } from '@/types/types';

// ── Users ─────────────────────────────────────────────
export const mockUser: User = {
  id: 'user-1',
  email: 'test@example.com',
  username: 'testuser',
  isAdmin: false,
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
  is_admin: false,
  exp: 9999999999,
});

export const mockExpiredToken = createTestJwt({
  sub: 'user-1',
  exp: 1000000000,
});

export const mockRefreshToken = createTestJwt({
  sub: 'user-1',
  exp: 9999999999,
  type: 'refresh',
});

export const mockAuthResponse: AuthResponse = {
  accessToken: mockToken,
  refreshToken: mockRefreshToken,
  tokenType: 'bearer',
};

// ── Categories ────────────────────────────────────────
export const mockCategories: Category[] = [
  { id: 1, name: 'Salary', type: 'income', budget: 5000, actual: 3000, budgetPeriod: 'monthly' },
  { id: 2, name: 'Food', type: 'expense', budget: 800, actual: 600, budgetPeriod: 'monthly' },
  { id: 3, name: 'Rent', type: 'expense', budget: 1500, actual: 1500, budgetPeriod: 'monthly' },
  { id: 4, name: 'Freelance', type: 'income', budget: 2000, actual: 1000, budgetPeriod: 'monthly' },
];

// ── Category Summary ──────────────────────────────────
export const mockCategorySummary: CategorySummary[] = mockCategories.map(category => ({
  id: category.id,
  name: category.name,
  type: category.type,
  budget: category.budget,
  budgetPeriod: category.budgetPeriod,
  actual: category.actual,
  remaining: category.budget - category.actual,
  userId: 'user-1',
}));

// ── Transactions ──────────────────────────────────────
export const mockTransactions: Transaction[] = [
  {
    id: 'trx-1',
    type: 'inc',
    title: 'Monthly Salary',
    value: 3000,
    trxDate: '2024-01-15T09:30:00',
    categoryId: 1,
    status: 'completed',
    isRecurring: false,
    recurrenceRule: null,
  },
  {
    id: 'trx-2',
    type: 'exp',
    title: 'Grocery Shopping',
    value: 150,
    trxDate: '2024-01-16T14:00:00',
    categoryId: 2,
    status: 'completed',
    isRecurring: false,
    recurrenceRule: null,
  },
  {
    id: 'trx-3',
    type: 'exp',
    title: 'Monthly Rent',
    value: 1500,
    trxDate: '2024-01-01T08:00:00',
    categoryId: 3,
    status: 'completed',
    isRecurring: true,
    recurrenceRule: 'monthly',
  },
  {
    id: 'trx-4',
    type: 'inc',
    title: 'Freelance Payment',
    value: 1000,
    trxDate: '2024-01-20T16:45:00',
    categoryId: 4,
    status: 'completed',
    isRecurring: false,
    recurrenceRule: null,
  },
  {
    id: 'trx-5',
    type: 'exp',
    title: 'Dinner Out',
    value: 50,
    trxDate: '2024-01-21T19:00:00',
    categoryId: 2,
    status: 'pending',
    isRecurring: false,
    recurrenceRule: null,
  },
  {
    id: 'trx-6',
    type: 'inc',
    title: 'Side Project',
    value: 500,
    trxDate: '2024-01-22T10:00:00',
    categoryId: 4,
    status: 'completed',
    isRecurring: false,
    recurrenceRule: null,
  },
];

// ── Snake-case versions for MSW responses ─────────────
export const mockAuthResponseSnake = {
  access_token: mockAuthResponse.accessToken,
  refresh_token: mockAuthResponse.refreshToken,
  token_type: mockAuthResponse.tokenType,
};

export const mockCategoriesSnake = mockCategories.map(category => ({
  id: category.id,
  name: category.name,
  type: category.type,
  budget: category.budget,
  actual: category.actual,
  budget_period: category.budgetPeriod,
}));

export const mockCategorySummarySnake = mockCategorySummary.map(category => ({
  id: category.id,
  name: category.name,
  type: category.type,
  budget: category.budget,
  budget_period: category.budgetPeriod,
  actual: category.actual,
  remaining: category.remaining,
  user_id: category.userId,
}));

export const mockTransactionsSnake = mockTransactions.map(transaction => ({
  id: transaction.id,
  type: transaction.type,
  title: transaction.title,
  value: transaction.value,
  trx_date: transaction.trxDate,
  category_id: transaction.categoryId,
  status: transaction.status,
  is_recurring: transaction.isRecurring,
  recurrence_rule: transaction.recurrenceRule,
}));
