import type { Dayjs } from 'dayjs';
import type { ChangeEventHandler } from 'react';

// ── Auth ──────────────────────────────────────────────
export type User = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  currency?: string;
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
  refreshToken: string;
  tokenType: string;
};

export type ApiError = {
  detail: string | Array<{ loc: (string | number)[]; msg: string; type: string }>;
  error?: string;
  message?: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type VerifyResetOtpRequest = {
  email: string;
  otp: string;
};

export type VerifyResetOtpResponse = {
  resetToken: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

export type UpdateProfileRequest = {
  username?: string;
  email?: string;
  currency?: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type LogoutRequest = {
  refreshToken: string;
};

// ── Category ──────────────────────────────────────────
export type CategoryType = 'income' | 'expense';

export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly';

export type Category = {
  id: number;
  name: string;
  type: CategoryType;
  budget: number;
  actual: number;
  budgetPeriod: BudgetPeriod;
  userId?: string;
  budgetCurrency?: string;
  originalBudget?: number;
};

export type CategoryCreate = {
  name: string;
  type: CategoryType;
  budget?: number;
  budgetPeriod?: BudgetPeriod;
  budgetCurrency?: string;
  originalBudget?: number;
};

export type CategoryUpdate = {
  name?: string;
  type?: CategoryType;
  budget?: number;
  budgetPeriod?: BudgetPeriod;
  budgetCurrency?: string;
  originalBudget?: number;
};

export type CategorySummary = {
  id: number;
  name: string;
  type: CategoryType;
  budget: number;
  budgetPeriod: BudgetPeriod;
  actual: number;
  remaining: number;
  userId: string;
  budgetCurrency?: string;
  originalBudget?: number;
};

// ── Transaction ───────────────────────────────────────
export type TransactionType = 'inc' | 'exp';

export type TransactionStatus = 'pending' | 'completed' | 'cancelled';

export type RecurrenceRule = 'weekly' | 'monthly' | 'yearly';

export type Transaction = {
  id: string;
  type: TransactionType;
  title: string;
  value: number;
  trxDate: string;
  categoryId: number;
  status: TransactionStatus;
  isRecurring: boolean;
  recurrenceRule: RecurrenceRule | null;
  userId?: string;
  currency?: string;
  originalValue?: number;
};

export type TransactionCreate = {
  type: TransactionType;
  title: string;
  value: number;
  trxDate: string;
  categoryId: number;
  status?: TransactionStatus;
  isRecurring?: boolean;
  recurrenceRule?: RecurrenceRule;
  currency: string;
  originalValue: number;
};

export type TransactionUpdate = {
  type?: TransactionType;
  title?: string;
  value?: number;
  trxDate?: string;
  categoryId?: number;
  status?: TransactionStatus;
  isRecurring?: boolean;
  recurrenceRule?: RecurrenceRule;
  currency?: string;
  originalValue?: number;
};

export type TransactionFormValues = {
  type: TransactionType;
  title: string;
  value: number;
  trxDate: Dayjs;
  categoryId: number;
  status: TransactionStatus;
  isRecurring: boolean;
  recurrenceRule?: RecurrenceRule;
  currency: string;
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
