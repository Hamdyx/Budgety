import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const axios = require('axios');

const budgetAdapter = createEntityAdapter({
	// selectId: (budget) => budget.budgetId
});

const initialState = budgetAdapter.getInitialState({
	status: 'idle',
	error: null,
});

const myApi = 'http://127.0.0.1:8000/api/v1/budgety';

export const fetchTrxs = createAsyncThunk('trx/fetchTrx', async () => {
	const response = await axios.get(myApi);
	return response.data.data.transactions;
});

export const addNewTrx = createAsyncThunk('trx/addNewTrx', async (initialTrx) => {
	const response = await axios.post(myApi, initialTrx);

	return response.data.data.transaction;
});

export const updateTrx = createAsyncThunk('trx/updateTrx', async (initialTrx) => {
	const response = await axios.patch(`${myApi}/${initialTrx.id}`, initialTrx);
	return response.data.data.transaction;
});

const budgetSlice = createSlice({
	name: 'budget',
	initialState,
	reducers: {
		trxUpdated(state, action) {
			const { id, title } = action.payload;
			const _trx = state.entities[id];
			if (_trx) {
				_trx.title = title;
			}
		},
	},
	extraReducers: {
		[fetchTrxs.pending]: (state, action) => {
			state.status = 'loading';
		},
		[fetchTrxs.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			budgetAdapter.upsertMany(state, action.payload);
		},
		[fetchTrxs.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		[addNewTrx.pending]: (state, action) => {
			state.status = 'loading';
		},
		[addNewTrx.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			budgetAdapter.addOne();
		},
		[addNewTrx.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.payload.error;
		},
		[updateTrx.pending]: (state, action) => {
			state.status = 'loading';
		},
		[updateTrx.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			budgetAdapter.upsertOne(state, action.payload);
		},
		[updateTrx.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
	},
});

export const { trxUpdated } = budgetSlice.actions;

export default budgetSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
	selectAll: selectAllTrx,
	selectById: selectTrxById,
	selectIds: selectTrxIds,
	// Pass in a selector that returns the trx slice of state
} = budgetAdapter.getSelectors((state) => state.budget);
