import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';


const budgetAdapter = createEntityAdapter({
	// selectId: (budget) => budget.budgetId
});

const initialState = budgetAdapter.getInitialState({
	status: 'idle',
	error: null,
});


export const fetchTrxs = createAsyncThunk('trx/fetchTrx', async () => {
	const response = JSON.parse(localStorage.getItem('transactions'));
	console.log('fetchTrxs', { response });
	return response || [];
});

export const addNewTrx = createAsyncThunk('trx/addNewTrx', async (trx) => {
	const allTrx = JSON.parse(localStorage.getItem('transactions')) || [];
	console.log('addNewTrx', { allTrx, trx });
	const updatedTrx = [...allTrx, trx]
	console.log('addNewTrx', { updatedTrx });
	const response = localStorage.setItem('transactions', JSON.stringify(updatedTrx))
	console.log('addNewTrx', { response });
	return trx;
});

export const updateTrx = createAsyncThunk('trx/updateTrx', async (trx) => {
	const allTrx = localStorage.getItem('transactions');
	console.log('updateTrx', { allTrx, trx });
	return trx
});

export const deleteTrx = createAsyncThunk('trx/deleteTrx', async (trx) => {
	console.log('deleteTrx', { trx });
	const allTrx = localStorage.getItem('transactions');
	console.log('deleteTrx', { allTrx });
	return trx;
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
		// ****************************** fetchTrxs ******************************
		[fetchTrxs.pending]: (state) => {
			state.status = 'loading';
		},
		[fetchTrxs.fulfilled]: (state, action) => {
			console.log('fetchTrxs.fulfilled', { action });
			state.status = 'succeeded';
			budgetAdapter.upsertMany(state, action?.payload);
		},
		[fetchTrxs.rejected]: (state, action) => {
			console.log('fetchTrxs.rejected', { action });
			state.status = 'failed';
			state.error = action?.error?.message;
		},
		// ****************************** addNewTrx ******************************
		[addNewTrx.pending]: (state) => {
			state.status = 'loading';
		},
		[addNewTrx.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			budgetAdapter.addOne(state, action?.payload);
		},
		[addNewTrx.rejected]: (state, action) => {
			console.log('addNewTrx.rejected', { action });
			state.status = 'failed';
			state.error = action?.error?.message;
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
		[deleteTrx.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			budgetAdapter.removeOne(state, action.payload);
		},
		[deleteTrx.pending]: (state, action) => {
			state.status = 'loading';
		},
		[deleteTrx.rejected]: (state, action) => {
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
