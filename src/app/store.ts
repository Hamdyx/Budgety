import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from '../features/budget/budgetSlice';
import categoryReducer from '../features/category/categorySlice';

export const reducer = {
	budget: budgetReducer,
	category: categoryReducer,
};

export const store = configureStore({
	reducer,
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
