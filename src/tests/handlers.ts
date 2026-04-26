import { http, HttpResponse } from 'msw';

import { mockAuthResponseSnake, mockCategoriesSnake, mockCategorySummarySnake, mockExchangeRates, mockTransactionsSnake } from './fixtures';

const API = import.meta.env.VITE_API_URL;
const EXCHANGE_RATE_API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY as string;

export const handlers = [
  // ── Exchange Rates ────────────────────────────────────
  http.get(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/USD`, () =>
    HttpResponse.json({ result: 'success', conversion_rates: mockExchangeRates })
  ),

  // ── Auth ──────────────────────────────────────────
  http.post(`${API}/auth/login`, () => HttpResponse.json(mockAuthResponseSnake)),

  http.post(`${API}/auth/register`, () => HttpResponse.json({ id: 'user-1', email: 'test@example.com', username: 'testuser', is_admin: false })),

  http.post(`${API}/auth/refresh`, () => HttpResponse.json(mockAuthResponseSnake)),

  http.post(`${API}/auth/logout`, () => new HttpResponse(null, { status: 204 })),

  http.delete(`${API}/auth/me`, () => new HttpResponse(null, { status: 204 })),

  http.patch(`${API}/auth/me`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 'user-1', email: 'test@example.com', username: 'testuser', is_admin: false, ...body });
  }),

  http.post(`${API}/auth/change-password`, () => HttpResponse.json({ message: 'Password changed successfully' })),

  http.post(`${API}/auth/forgot-password`, () => HttpResponse.json({ message: 'OTP sent' })),

  http.post(`${API}/auth/verify-reset-otp`, () => HttpResponse.json({ reset_token: 'mock-reset-token' })),

  http.post(`${API}/auth/reset-password`, () => HttpResponse.json({ message: 'Password reset successful' })),

  // ── Transactions ──────────────────────────────────
  http.get(`${API}/transactions`, () => HttpResponse.json(mockTransactionsSnake)),

  http.get(`${API}/transactions/:id`, ({ params }) => {
    const transaction = mockTransactionsSnake.find(transaction => String(transaction.id) === params.id);
    return transaction ? HttpResponse.json(transaction) : new HttpResponse(null, { status: 404 });
  }),

  http.post(`${API}/transactions`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 'trx-new', ...body }, { status: 201 });
  }),

  http.patch(`${API}/transactions/:id`, async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: params.id, ...body });
  }),

  http.delete(`${API}/transactions/:id`, () => new HttpResponse(null, { status: 204 })),

  // ── Categories ────────────────────────────────────
  http.get(`${API}/categories/summary`, () => HttpResponse.json(mockCategorySummarySnake)),

  http.get(`${API}/categories`, () => HttpResponse.json(mockCategoriesSnake)),

  http.get(`${API}/categories/:id`, ({ params }) => {
    const category = mockCategoriesSnake.find(category => String(category.id) === params.id);
    return category ? HttpResponse.json(category) : new HttpResponse(null, { status: 404 });
  }),

  http.post(`${API}/categories`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 99, ...body }, { status: 201 });
  }),

  http.patch(`${API}/categories/:id`, async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: Number(params.id), ...body });
  }),

  http.delete(`${API}/categories/:id`, () => new HttpResponse(null, { status: 204 })),

  // ── Admin ─────────────────────────────────────────
  http.get(`${API}/admin/users`, () =>
    HttpResponse.json([
      { id: 'user-1', email: 'test@example.com', username: 'testuser', is_admin: false },
      { id: 'user-2', email: 'admin@example.com', username: 'admin', is_admin: true },
    ])
  ),

  http.delete(`${API}/admin/users/:id`, () => new HttpResponse(null, { status: 204 })),
];
