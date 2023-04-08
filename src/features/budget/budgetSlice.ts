import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Transaction } from 'types/types';

const budgetAdapter = createEntityAdapter<Transaction>({});

const initialState = budgetAdapter.getInitialState({
	status: 'idle',
	error: '',
});

export const fetchTrxs = createAsyncThunk('transactions/fetchTrx', async () => {
	const response = JSON.parse(localStorage.getItem('transactions') || '[]');
	return response || [];
});

export const addNewTrx = createAsyncThunk<
	any,
	any,
	{
		state: RootState;
	}
>('transactions/addNewTrx', async (trx) => {
	const allTrx = JSON.parse(localStorage.getItem('transactions') || '[]');
	const updatedTrx = [...allTrx, trx];
	localStorage.setItem('transactions', JSON.stringify(updatedTrx));
	return trx;
});

export const updateTrx = createAsyncThunk<
	any,
	any,
	{
		state: RootState;
	}
>('transactions/updateTrx', async (trx) => {
	const allTrx = JSON.parse(localStorage.getItem('transactions') || '') || [];
	const updated = allTrx.find((el: any) => el.id === trx.id);
	Object.assign(updated, trx);
	localStorage.setItem('transactions', JSON.stringify(allTrx));
	return updated;
});

export const deleteTrx = createAsyncThunk<
	any,
	any,
	{
		state: RootState;
	}
>('transactions/deleteTrx', async (id) => {
	const allTrx = JSON.parse(localStorage.getItem('transactions') || '') || [];
	const updatedTrx = allTrx.filter((trx: any) => trx.id !== id);
	localStorage.setItem('transactions', JSON.stringify(updatedTrx));
	return id;
});

const budgetSlice = createSlice({
	name: 'budget',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// ****************************** fetchTrxs ******************************
			.addCase(fetchTrxs.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTrxs.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message || 'Error fetching transactions';
			})
			.addCase(fetchTrxs.fulfilled, (state, action) => {
				state.status = 'succeeded';
				budgetAdapter.upsertMany(state, action?.payload);
			})
			// ****************************** addNewTrx ******************************
			.addCase(addNewTrx.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addNewTrx.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message || 'Error creating transaction';
			})
			.addCase(addNewTrx.fulfilled, (state, action) => {
				state.status = 'succeeded';
				budgetAdapter.addOne(state, action?.payload);
			})
			// ****************************** updateTrx ******************************
			.addCase(updateTrx.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateTrx.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Error updating transaction';
			})
			.addCase(updateTrx.fulfilled, (state, action) => {
				state.status = 'succeeded';
				budgetAdapter.upsertOne(state, action.payload);
			})
			// ****************************** deleteTrx ******************************
			.addCase(deleteTrx.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(deleteTrx.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Error ';
			})
			.addCase(deleteTrx.fulfilled, (state, action) => {
				state.status = 'succeeded';
				budgetAdapter.removeOne(state, action.payload);
			});
	},
});

export default budgetSlice.reducer;

export const {
	selectAll: selectAllTrx,
	selectById: selectTrxById,
	selectIds: selectTrxIds,
} = budgetAdapter.getSelectors((state: RootState) => state.budget);
