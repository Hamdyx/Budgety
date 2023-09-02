import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	EntityId,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { updateCategory } from 'features/category/categorySlice';
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
	Transaction,
	{
		state: RootState;
	}
>('transactions/addNewTrx', async (trx, thunkapi) => {
	thunkapi.dispatch(updateCategory({ id: trx.category, newTrx: trx }));
	return trx;
});

export const updateTrx = createAsyncThunk<
	any,
	any,
	{
		state: RootState;
	}
>('transactions/updateTrx', async (trx, thunkapi) => {
	return { id: trx.id, changes: { ...trx } };
});

export const deleteTrx = createAsyncThunk<
	any,
	EntityId,
	{
		state: RootState;
	}
>('transactions/deleteTrx', async (id, thunkapi) => {
	const trx: any = thunkapi.getState().budget.entities[id];

	thunkapi.dispatch(
		updateCategory({
			id: trx!.category,
			newTrx: { ...trx, value: +trx!.value * -1 },
		})
	);
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
				localStorage.setItem('transactions', JSON.stringify(state.entities));
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
				budgetAdapter.updateOne(state, action.payload);
				localStorage.setItem('transactions', JSON.stringify(state.entities));
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
				localStorage.setItem('transactions', JSON.stringify(state.entities));
			});
	},
});

export default budgetSlice.reducer;

export const {
	selectAll: selectAllTrx,
	selectById: selectTrxById,
	selectIds: selectTrxIds,
} = budgetAdapter.getSelectors((state: RootState) => state.budget);
