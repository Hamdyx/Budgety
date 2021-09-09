import {
	createSlice,
	nanoid,
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
} from '@reduxjs/toolkit';
import { client } from '../../api/client';

const budgetAdapter = createEntityAdapter({
	// selectId: (budget) => budget.budgetId
});

const initialState = budgetAdapter.getInitialState({
	status: 'idle',
	error: null,
});

const fakeApi = 'https://jsonplaceholder.typicode.com/todos/';

export const fetchTrxs = createAsyncThunk('trx/fetchTrx', async () => {
	console.log('fetchTrx Called');
	const response = await client.get(fakeApi);
	console.log('fetchTrx got response');
	console.log(response);
	return response;
});

export const addNewTrx = createAsyncThunk('trx/addNewTrx', async (initialTrx) => {
	const response = await client.post(fakeApi, { trx: initialTrx });
	console.log('response');
	console.log(response);
	return response.trx;
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
			state.error = action.payload.message;
		},
		[addNewTrx.fulfilled]: budgetAdapter.addOne,
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
} = budgetAdapter.getSelectors((state) => state.trx);
