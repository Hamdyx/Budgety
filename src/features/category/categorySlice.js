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
	extraReducers: (builder) => {
		// ****************************** fetchCategories ******************************
		builder
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
				console.log('updateCategory => rejected', { action });
				state.status = 'failed';
				state.error = action?.error?.message ?? 'error updtaing category';
			})
			.addCase(updateCategory.fulfilled, (state, action) => {
				console.log('updateCategory => fulfilled', {
					action,
					update: action.payload,
				});
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
				state.error = action?.error?.message;
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				console.log('deleteCategory.fulfilled', { action });
				state.status = 'succeeded';
			});
	},
});

export default categorySlice.reducer;

export const {
	selectAll: selectAllCategories,
	selectById: selectCategoryById,
	selectIds: selectCategoryIds,
} = categoryAdapter.getSelectors((state) => state.category);
