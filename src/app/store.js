import { configureStore } from '@reduxjs/toolkit';

import budgetReducer from '../features/budget/budgetSlice';
import categoryReducer from '../features/category/categorySlice';

export const store = configureStore({
	reducer: {
		budget: budgetReducer,
		category: categoryReducer,
	},
});
