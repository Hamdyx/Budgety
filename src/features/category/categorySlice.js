import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';

const categoryAdapter = createEntityAdapter({
	// selectId: (item) => item.category,
});

const initialState = categoryAdapter.getInitialState({
	loading: false,
	error: null,
});

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		const response = JSON.parse(localStorage.getItem('categories'));
		return response || [];
	}
);

export const addNewCategory = createAsyncThunk(
	'categories/addNewCategory',
	async (cat) => {
		cat.id = new Date().getTime();
		return cat;
	}
);

export const updateCategory = createAsyncThunk(
	'categories/updateCategory',
	async (cat) => {
		console.log('updateCategory', { cat });
		return cat;
	}
);

export const deleteCategory = createAsyncThunk(
	'categories/deleteCategory',
	async (id) => {
		const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
		const updatedCat = allCategories.filter((el) => el.id !== id);
		localStorage.setItem('categories', JSON.stringify(updatedCat));
		return id;
	}
);

const categorySlice = createSlice({
	name: 'category',
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
			state.status = 'succeeded';
			categoryAdapter.upsertMany(state, action?.payload);
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
			state.status = 'succeeded';
			categoryAdapter.addOne(state, action?.payload);
			localStorage.setItem('categories', JSON.stringify(state?.entities));
		},
		// ****************************** updateCategory ******************************
		[updateCategory.pending]: (state) => {
			state.status = 'loading';
		},
		[updateCategory.rejected]: (state, action) => {
			console.log('updateCategory => rejected', { action });
			state.status = 'failed';
			state.error = action?.error?.message ?? 'error updtaing category';
		},
		[updateCategory.fulfilled]: (state, action) => {
			console.log('updateCategory => fulfilled', {
				action,
				update: action.payload,
			});
			state.status = 'succeeded';
			categoryAdapter.updateOne(state, action?.payload);
			localStorage.setItem('categories', JSON.stringify(state?.entities));
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
	},
});

export default categorySlice.reducer;

export const {
	selectAll: selectAllCategories,
	selectById: selectCategoryById,
	selectIds: selectCategoryIds,
} = categoryAdapter.getSelectors((state) => state.category);
