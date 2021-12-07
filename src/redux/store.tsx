import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        products: productsReducer, 
    },
}); 

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch