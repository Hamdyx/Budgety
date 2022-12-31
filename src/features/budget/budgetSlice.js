import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const budgetAdapter = createEntityAdapter({});

const initialState = budgetAdapter.getInitialState({
	categories: {
		home: { spent: 0, budget: 100 },
		utility: { spent: 0, budget: 400 },
		food: { spent: 0, budget: 150 },
	},
	status: 'idle',
	error: null,
});

export const fetchTrxs = createAsyncThunk('transactions/fetchTrx', async () => {
	const response = JSON.parse(localStorage.getItem('transactions'));
	return response || [];
});

export const addNewTrx = createAsyncThunk('transactions/addNewTrx', async (trx) => {
	const allTrx = JSON.parse(localStorage.getItem('transactions')) || [];
	const updatedTrx = [...allTrx, trx]
	localStorage.setItem('transactions', JSON.stringify(updatedTrx))
	return trx;
});

export const updateTrx = createAsyncThunk('transactions/updateTrx', async (trx) => {
	const allTrx = JSON.parse(localStorage.getItem('transactions')) || [];
	const updated = allTrx.find(el => el.id === trx.id)
	Object.assign(updated, trx)
	localStorage.setItem('transactions', JSON.stringify(allTrx))
	return updated
});

export const deleteTrx = createAsyncThunk('transactions/deleteTrx', async (id) => {
	const allTrx = JSON.parse(localStorage.getItem('transactions')) || [];
	const updatedTrx = allTrx.filter(trx => trx.id !== id)
	localStorage.setItem('transactions', JSON.stringify(updatedTrx))
	return id;
});

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
	const response = JSON.parse(localStorage.getItem('categories'));
	return response || {};
});

export const addNewCategory = createAsyncThunk('categories/addNewCategory', async (cat) => {
	const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
	const updatedCat = [...allCategories, cat]
	localStorage.setItem('categories', JSON.stringify(updatedCat))
	return cat;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (cat) => {
	const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
	const updated = allCategories.find(el => el.id === cat.id)
	Object.assign(updated, cat)
	localStorage.setItem('categories', JSON.stringify(allCategories))
	return updated
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
	const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
	const updatedCat = allCategories.filter(el => el.id !== id)
	localStorage.setItem('categories', JSON.stringify(updatedCat))
	return id;
});

const budgetSlice = createSlice({
	name: 'budget',
	initialState,
	extraReducers: {
		// ****************************** fetchCategories ******************************
		[fetchCategories.pending]: (state) => {
			state.status = 'loading';
		},
		[fetchCategories.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action?.error?.message;
		},
		[fetchCategories.fulfilled]: (state, action) => {
			console.log('fetchCategories.fulfilled', { action });
			state.status = 'succeeded';
			state.categories = action.payload;
		},
		// ****************************** addNewCategory ******************************
		[addNewCategory.pending]: (state) => {
			state.status = 'loading';
		},
		[addNewCategory.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action?.error?.message;
		},
		[addNewCategory.fulfilled]: (state, action) => {
			console.log('addNewCategory.fulfilled', { action });
			state.status = 'succeeded';
			const allCats = { ...state.categories, ...action?.payload }
			state.categories = allCats
		},
		// ****************************** updateCategory ******************************
		[updateCategory.pending]: (state) => {
			state.status = 'loading';
		},
		[updateCategory.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action?.error?.message;
		},
		[updateCategory.fulfilled]: (state, action) => {
			console.log('updateCategory.fulfilled', { action });
			state.status = 'succeeded';
			const allCats = { ...state.categories, ...action?.payload }
			state.categories = allCats
		},
		// ****************************** deleteCategory ******************************
		[deleteCategory.pending]: (state) => {
			state.status = 'loading';
		},
		[deleteCategory.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action?.error?.message;
		},
		[deleteCategory.fulfilled]: (state, action) => {
			console.log('deleteCategory.fulfilled', { action });
			state.status = 'succeeded';
		},
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

export default budgetSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
	selectAll: selectAllTrx,
	selectById: selectTrxById,
	selectIds: selectTrxIds,
	// Pass in a selector that returns the trx slice of state
} = budgetAdapter.getSelectors((state) => state.budget);
