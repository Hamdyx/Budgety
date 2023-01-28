import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';

const budgetAdapter = createEntityAdapter({});

const initialState = budgetAdapter.getInitialState({
	status: 'idle',
	error: null,
});

export const fetchTrxs = createAsyncThunk('transactions/fetchTrx', async () => {
	const response = JSON.parse(localStorage.getItem('transactions'));
	return response || [];
});

export const addNewTrx = createAsyncThunk(
	'transactions/addNewTrx',
	async (trx) => {
		const allTrx = JSON.parse(localStorage.getItem('transactions')) || [];
		const updatedTrx = [...allTrx, trx];
		localStorage.setItem('transactions', JSON.stringify(updatedTrx));
		return trx;
	}
);

export const updateTrx = createAsyncThunk(
	'transactions/updateTrx',
	async (trx) => {
		const allTrx = JSON.parse(localStorage.getItem('transactions')) || [];
		const updated = allTrx.find((el) => el.id === trx.id);
		Object.assign(updated, trx);
		localStorage.setItem('transactions', JSON.stringify(allTrx));
		return updated;
	}
);

export const deleteTrx = createAsyncThunk(
	'transactions/deleteTrx',
	async (id) => {
		const allTrx = JSON.parse(localStorage.getItem('transactions')) || [];
		const updatedTrx = allTrx.filter((trx) => trx.id !== id);
		localStorage.setItem('transactions', JSON.stringify(updatedTrx));
		return id;
	}
);

const budgetSlice = createSlice({
	name: 'budget',
	initialState,
	extraReducers: (builder) => {
		builder
			// ****************************** fetchTrxs ******************************
			.addCase(fetchTrxs.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTrxs.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message;
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
				state.error = action?.error?.message;
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
				state.error = action.error.message;
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
				state.error = action.error.message;
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
} = budgetAdapter.getSelectors((state) => state.budget);
