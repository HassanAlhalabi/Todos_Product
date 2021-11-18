import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getProducts = createAsyncThunk('products/fetchProducts', async () => {
    return fetch('https://wawinner.its.ae/dev/public/api/v1/front-end/campaign')
    .then(response => response.json())
  });

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'loading'
    },

    reducers: {
    },

    extraReducers: {
        [getProducts.pending] : (state,action) => {
            state.status = 'loading';
        },
        [getProducts.fulfilled]: (state,payload) => {
            state.products = payload;
            state.status = 'success';
            console.log(state.products.payload.data)
        },
        [getProducts.rejected]: (state,action) => {
            state.status = 'failed'
        }
    }

})

export default productsSlice.reducer;