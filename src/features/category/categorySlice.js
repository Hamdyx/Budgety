import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const categoryAdapter = createEntityAdapter({
    selectId: (item) => item.category
});

const initialState = categoryAdapter.getInitialState({
    loading: false,
    error: null,
});


export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = JSON.parse(localStorage.getItem('categories'));
    return response || [];
});

export const addNewCategory = createAsyncThunk('categories/addNewCategory', async (cat) => {
    return cat;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (cat) => {
    const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const updated = allCategories.find(el => el.id === cat.id)
    localStorage.setItem('categories', JSON.stringify(allCategories))
    return updated
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
    const allCategories = JSON.parse(localStorage.getItem('categories')) || [];
    const updatedCat = allCategories.filter(el => el.id !== id)
    localStorage.setItem('categories', JSON.stringify(updatedCat))
    return id;
});

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
            console.log('fetchCategories.fulfilled', { action });
            state.status = 'succeeded';
            categoryAdapter.upsertMany(state, action?.payload)
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
            categoryAdapter.addOne(state, action?.payload)
            localStorage.setItem('categories', JSON.stringify(state?.entities))

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

    },
});

export default categorySlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds,
    // Pass in a selector that returns the trx slice of state
} = categoryAdapter.getSelectors((state) => state.category);
