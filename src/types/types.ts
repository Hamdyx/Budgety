import type { ChangeEventHandler } from 'react';

// ── Auth ──────────────────────────────────────────────
export type User = {
  id: string;
  email: string;
  username: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  username: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  tokenType: string;
};

export type ApiError = {
  detail: string | Array<{ loc: (string | number)[]; msg: string; type: string }>;
  error?: string;
  message?: string;
};

// ── Category ──────────────────────────────────────────
export type CategoryType = 'income' | 'expense';

export type Category = {
  id: number;
  category: string;
  type: CategoryType;
  budget: number;
  spent: number;
  userId?: string;
};

export type CategoryCreate = {
  category: string;
  type: CategoryType;
  budget?: number;
};

export type CategoryUpdate = {
  category?: string;
  type?: CategoryType;
  budget?: number;
};

// ── Transaction ───────────────────────────────────────
export type TransactionType = 'inc' | 'exp';

export type Transaction = {
  id: string;
  type: TransactionType;
  title: string;
  value: number;
  trxDate: string;
  categoryId: number;
  userId?: string;
};

export type TransactionCreate = {
  type: TransactionType;
  title: string;
  value: number;
  trxDate: string;
  categoryId: number;
};

export type TransactionUpdate = {
  type?: TransactionType;
  title?: string;
  value?: number;
  trxDate?: string;
  categoryId?: number;
};

// ── Misc ──────────────────────────────────────────────

export type ChartProps = {
  labelsArr: string[];
  data: number[];
  colors: string[];
  width?: number;
  height?: number;
};

export type CustomFloatingLabelProps = {
  type: string;
  label: string;
  value: string | number;
  changeFunc: ChangeEventHandler<HTMLInputElement>;
};

// ── Investment ────────────────────────────────────────
export type InvestmentCoin = {
  id: number;
  name: string;
  buyPrice: number;
  buyAmount: number;
  sellPrice: number;
  holdings: number;
  sellAmount: number;
  profitPercent: number;
  price?: number | null;
  value?: number | null;
  userId?: string;
};

export type InvestmentCoinCreate = {
  name: string;
  buyPrice?: number;
  buyAmount?: number;
  sellPrice?: number;
  holdings?: number;
  sellAmount?: number;
  profitPercent?: number;
  price?: number | null;
  value?: number | null;
};

export type InvestmentCoinUpdate = Partial<InvestmentCoinCreate>;
