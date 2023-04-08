import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Category, Transaction } from 'types/types';

const categoryAdapter = createEntityAdapter<Category>({});

const initialState = categoryAdapter.getInitialState({
	loading: false,
	error: '',
});

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		const response = JSON.parse(localStorage.getItem('categories') || '[]');
		return response || [];
	}
);

export const addNewCategory = createAsyncThunk<
	any,
	any,
	{
		state: RootState;
	}
>('categories/addNewCategory', async (cat) => {
	cat.id = new Date().getTime();
	cat.spent = 0;
	return cat;
});

export const updateCategory = createAsyncThunk<
	any,
	{ id: number; newTrx: Transaction },
	{
		state: RootState;
	}
>('categories/updateCategory', async ({ id, newTrx }, thunkapi) => {
	console.log('updateCategory', { id, newTrx });
	const currCat = thunkapi.getState().category.entities[id];
	console.log('updateCategory', { currCat });
	return id;
});

export const deleteCategory = createAsyncThunk<
	any,
	any,
	{
		state: RootState;
	}
>('categories/deleteCategory', async (id) => {
	return id;
});

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// ****************************** fetchCategories ******************************
			.addCase(fetchCategories.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action?.error?.message || 'Error fetching categories';
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.loading = false;
				categoryAdapter.upsertMany(state, action?.payload);
			})
			// ****************************** addNewCategory ******************************
			.addCase(addNewCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(addNewCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action?.error?.message || 'Error creating category';
			})
			.addCase(addNewCategory.fulfilled, (state, action) => {
				state.loading = false;
				categoryAdapter.addOne(state, action?.payload);
				localStorage.setItem('categories', JSON.stringify(state?.entities));
			})
			// ****************************** updateCategory ******************************
			.addCase(updateCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action?.error?.message ?? 'error updtaing category';
			})
			.addCase(updateCategory.fulfilled, (state, action) => {
				state.loading = false;
				categoryAdapter.upsertOne(state, action?.payload); //! updateOne not working
				localStorage.setItem('categories', JSON.stringify(state?.entities));
			})
			// ****************************** deleteCategory ******************************
			.addCase(deleteCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action?.error?.message ?? 'error deleting category';
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.loading = false;
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
} = categoryAdapter.getSelectors((state: RootState) => state.category);
