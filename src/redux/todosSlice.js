import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [
            {
                id: '1',
                title: 'Todo 1',
                date: 'january 24th, 2021 04:25 PM',
                isCompleted: true,
                isActive: false,
                isCanceled: false,
            },
            {
                id: '2',
                title: 'Todo 2',
                date: 'january 24th, 2021 04:25 PM',
                isCompleted: false,
                isActive: false,
                isCanceled: true
            },
            {
                id: '3',
                title: 'Todo3',
                date: 'january 24th, 2021 04:25 PM',
                isCompleted: false,
                isActive: true,
                isCanceled: false,
            },
        ]
    },
    reducers: {
        addTodo: (state,action) => {
            state.todos.push(action.payload)
        },
        deleteTodo: (state,action) => {
            state.todos = action.payload;
        },
        updateTodo: (state,action) => {
            state.todos = action.payload;
        }
    }

})

export const { addTodo, deleteTodo , updateTodo } = todoSlice.actions;

export default todoSlice.reducer;