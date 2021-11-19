import { createSlice } from '@reduxjs/toolkit';


const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


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
            // Create Date Required Form
            let currentDate = new Date();
            let dateFormat =    `${months[currentDate.getMonth()]} 
                                ${currentDate.getDate()}th, 
                                ${currentDate.getFullYear()} 
                                ${currentDate.getHours()}:${currentDate.getMinutes()}
                                ${currentDate.toLocaleTimeString().split(' ')[1]}`
            const newTodo = {
                    id: Math.round(Math.random()*1000000)+'',
                    title: action.payload,
                    date: dateFormat,
                    isCompleted: false,
                    isActive: true,
                    isCanceled: false,
                }
            state.todos.push(newTodo)
        },
        deleteTodo: (state,action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        updateTodo: (state,action) => {
            console.log(action)
            const newTodos = state.todos.map(todo => {
                if(todo.id === action.payload.editId) {
                    return {
                        ...todo,
                        title: action.payload.titleInput
                    }
                }
                return todo
            });
            state.todos = newTodos;
        },
        setCanceled: (state,action) => {
            const newTodos = state.todos.map(todo => {
                if(todo.id === action.payload) {
                    return {
                        ...todo,
                        isCanceled: true,
                        isActive: false,
                        isCompleted: false
                    }
                }
                return todo
            });
            state.todos = newTodos;
        },
        setCompleted: (state,action) => {
            const newTodos = state.todos.map(todo => {
                if(todo.id === action.payload) {
                    return {
                        ...todo,
                        isCanceled: false,
                        isActive: false,
                        isCompleted: true
                    }
                }
                return todo
            });
            state.todos = newTodos;
        },
    }

})

export const { addTodo, deleteTodo , updateTodo, setCanceled, setCompleted } = todoSlice.actions;

export default todoSlice.reducer;