import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import productsReducer from './productsSlice';

export default configureStore({
    reducer: {
        todos: todosReducer,
        products: productsReducer
    }
}) 