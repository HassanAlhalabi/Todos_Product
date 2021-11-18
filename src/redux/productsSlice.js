import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getProducts = createAsyncThunk('products/fetchProducts', async () => {
    return fetch('https://wawinner.its.ae/dev/public/api/v1/front-end/campaign')
    .then(response => response.json())
    .then(data => console.log(data.data));
  });

export const todoSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: null
    },

    reducers: {
    }

})

export const { addTodo, deleteTodo , updateTodo } = todoSlice.actions;

export default todoSlice.reducer;