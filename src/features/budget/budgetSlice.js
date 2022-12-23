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
	return response || [];
});

export const addNewTrx = createAsyncThunk('trx/addNewTrx', async (trx) => {
	const allTrx = JSON.parse(localStorage.getItem('transactions')) || [];
	const updatedTrx = [...allTrx, trx]
	localStorage.setItem('transactions', JSON.stringify(updatedTrx))
	return trx;
});

export const updateTrx = createAsyncThunk('trx/updateTrx', async (trx) => {
	const allTrx = localStorage.getItem('transactions');
	console.log('updateTrx', { allTrx, trx });
	return trx
});

export const deleteTrx = createAsyncThunk('trx/deleteTrx', async (id) => {
	const allTrx = JSON.parse(localStorage.getItem('transactions')) || [];
	const updatedTrx = allTrx.filter(trx => trx.id !== id)
	localStorage.setItem('transactions', JSON.stringify(updatedTrx))
	return id;
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
		[fetchTrxs.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action?.error?.message;
		},
		[fetchTrxs.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			budgetAdapter.upsertMany(state, action?.payload);
		},
		// ****************************** addNewTrx ******************************
		[addNewTrx.pending]: (state) => {
			state.status = 'loading';
		},
		[addNewTrx.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action?.error?.message;
		},
		[addNewTrx.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			budgetAdapter.addOne(state, action?.payload);
		},
		// ****************************** updateTrx ******************************
		[updateTrx.pending]: (state) => {
			state.status = 'loading';
		},
		[updateTrx.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		[updateTrx.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			budgetAdapter.upsertOne(state, action.payload);
		},
		// ****************************** deleteTrx ******************************
		[deleteTrx.pending]: (state) => {
			state.status = 'loading';
		},
		[deleteTrx.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		[deleteTrx.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			budgetAdapter.removeOne(state, action.payload);
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
