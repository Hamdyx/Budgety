import type { ChangeEventHandler, ReactNode } from 'react';

export type Transaction = {
	id: string;
	type: string;
	title: string;
	value: number;
	trxDate: string;
	category: number;
};
export type Category = {
	id: number;
	category: string;
	budget: number;
	spent: number;
};

export type TransactionType = 'inc' | 'exp';

export type TransactionItemData = {
	id: string;
	icon: ReactNode;
	iconClass: string;
	labelTxt: string;
	formTxt: string;
};

export type TransactionOptionMap = Record<
	TransactionType,
	Record<string, string[]>
>;

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

export type InvestmentCoin = {
	name: string;
	buyPrice: number;
	buyAmount: number;
	sellPrice: number;
	holdings: number;
	sellAmount: number;
	profitPercent: number;
	price?: number;
	value?: number;
};
