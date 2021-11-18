import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo';

export default configureStore({
    reducer: {
        todos: todoReducer
    }
}) 