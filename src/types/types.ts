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
