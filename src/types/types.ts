export type Transaction = {
	id: string;
	type: string;
	title: string;
	value: string;
	trxDate: string;
	trxTime: string;
};
export type Category = {
	id: number;
	category: string;
	budget: number;
	spent: number;
};
