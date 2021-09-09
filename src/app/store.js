import { configureStore } from '@reduxjs/toolkit';

import budgetReducer from '../features/budget/budgetSlice';

export const store = configureStore({
	reducer: {
		budget: budgetReducer,
	},
});
