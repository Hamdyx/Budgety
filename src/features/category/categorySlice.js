import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';

const categoryAdapter = createEntityAdapter({});

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
		cat.spent = 0;
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
		return id;
	}
);

const categorySlice = createSlice({
	name: 'category',
	initialState,
	extraReducers: (builder) => {
		builder
			// ****************************** fetchCategories ******************************
			.addCase(fetchCategories.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.status = 'succeeded';
				categoryAdapter.upsertMany(state, action?.payload);
			})
			// ****************************** addNewCategory ******************************
			.addCase(addNewCategory.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addNewCategory.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message;
			})
			.addCase(addNewCategory.fulfilled, (state, action) => {
				state.status = 'succeeded';
				categoryAdapter.addOne(state, action?.payload);
				localStorage.setItem('categories', JSON.stringify(state?.entities));
			})
			// ****************************** updateCategory ******************************
			.addCase(updateCategory.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateCategory.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message ?? 'error updtaing category';
			})
			.addCase(updateCategory.fulfilled, (state, action) => {
				state.status = 'succeeded';
				categoryAdapter.upsertOne(state, action?.payload); //! updateOne not working
				localStorage.setItem('categories', JSON.stringify(state?.entities));
			})
			// ****************************** deleteCategory ******************************
			.addCase(deleteCategory.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message ?? 'error deleting category';
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.status = 'succeeded';
				categoryAdapter.removeOne(state, action?.payload);
				localStorage.setItem('categories', JSON.stringify(state?.entities));
			});
	},
});

export default categorySlice.reducer;

export const {
	selectAll: selectAllCategories,
	selectById: selectCategoryById,
	selectIds: selectCategoryIds,
} = categoryAdapter.getSelectors((state) => state.category);
