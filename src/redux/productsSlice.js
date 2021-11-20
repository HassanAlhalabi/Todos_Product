import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getProducts = createAsyncThunk('products/fetchProducts', async () => {
    return fetch('https://wawinner.its.ae/dev/public/api/v1/front-end/campaign')
    .then(response => response.json())
  });

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [
            {
                "id": 42,
                "max_draw_date": "2023-09-29 00:00:00",
                "product_quantity": 4,
                "quantity_sold": 1,
                "status": "active",
                "code": "12xc",
                "ticket_count": 4,
                "donate_ticket_count": 3,
                "early_bird_count": 4,
                "early_bird_ticket_count": 3,
                "product_price": "4.00",
                "isFavorite": 0,
                "product_id": {
                    "id": 77,
                    "is_prize": 1,
                    "image": "https://wawinner.its.ae/dev/public/storage/products/$2y$10$aV2c8m3K4FzeGE2sH7kEru3UMIONWkC5Z9QVXRgQ6HTCWbnYZxMki.png",
                    "created_at": "2021-09-11T05:42:39.000000Z",
                    "updated_at": "2021-09-11T05:42:39.000000Z",
                    "detail": [],
                    "name": "ÍÐÇÁ",
                    "description": "ddddddddd"
                },
                "prize_id": {
                    "id": 1,
                    "is_prize": 1,
                    "image": "https://wawinner.its.ae/dev/public/storage/products/LS-00044.png",
                    "created_at": "2021-04-11T06:12:32.000000Z",
                    "updated_at": "2021-04-11T06:12:32.000000Z",
                    "detail": [
                        {
                            "id": 1,
                            "product_id": 1,
                            "created_at": "2021-04-11T06:12:33.000000Z",
                            "updated_at": "2021-04-11T06:12:33.000000Z",
                            "title": "ÚäæÇä ÈÇáÚÑÈí",
                            "value": "ÞíãÉ"
                        },
                        {
                            "id": 4,
                            "product_id": 1,
                            "created_at": "2021-04-11T06:12:33.000000Z",
                            "updated_at": "2021-04-11T06:12:33.000000Z",
                            "title": "ÚäæÇä ÈÇáÚÑÈí",
                            "value": "ÞíãÉ"
                        },
                        {
                            "id": 43,
                            "product_id": 1,
                            "created_at": "2021-09-07T06:35:01.000000Z",
                            "updated_at": "2021-09-07T06:35:01.000000Z",
                            "title": "ãØæÑ ÑíÇßÊ",
                            "value": "vvvvvvvvvvvvv"
                        }
                    ],
                    "name": "sfsdfs",
                    "description": "fsfsdfsd"
                },
                "offers": [],
                "created_at": "2021-09-09T08:04:16.000000Z",
                "updated_at": "2021-09-11T05:43:17.000000Z",
                "title": "ÇÎÊÈÇÑ",
                "description": "test"
            }
        ],
        status: 'loading',
        cart: []
    },

    reducers: {
        addToCart: (state,action) => {
            const totalQuantity =  state.products.filter(product => product.product_id.id === action.payload)[0].product_quantity;
            const quantitySold = state.products.filter(product => product.product_id.id === action.payload)[0].quantity_sold;
            const availableQuantity = totalQuantity - quantitySold;
            state.cart.filter(cartItem => cartItem.id === action.payload).length === 0 ?
            state = {
                ...state,
                cart: state.cart.push({
                    id: action.payload,
                    quantity: 1
                })
            }
            :
            state = {
                ...state,
                cart: state.cart.map(cartItem => {
                    if(cartItem.id === action.payload) {
                        if(cartItem.quantity >= 0 && cartItem.quantity <  availableQuantity ) {
                            ++cartItem.quantity;
                        }
                    }
                })
            }
        },
        removeFromCart: (state,action) => {
            const totalQuantity =  state.products.filter(product => product.product_id.id === action.payload)[0].product_quantity;
            const quantitySold = state.products.filter(product => product.product_id.id === action.payload)[0].quantity_sold;
            const availableQuantity = totalQuantity - quantitySold;
            state.cart.filter(cartItem => cartItem.id === action.payload)[0].quantity === 0 ?
                state = {
                    ...state,
                    cart: state.cart.filter(cartItem => cartItem.id !== action.payload)
                }
            :
            state = {
                ...state,
                cart: state.cart.map(cartItem => {
                    if(cartItem.id === action.payload) {
                        if(cartItem.quantity > 0 && cartItem.quantity <= availableQuantity ) {
                            --cartItem.quantity;
                        }
                    }
                })
            }
        }
    },

    extraReducers: {
        [getProducts.pending] : (state,action) => {
            state.status = 'loading';
        },
        [getProducts.fulfilled]: (state,response) => {
            state.products = response.payload.data;
            state.status = 'success';
        },
        [getProducts.rejected]: (state,action) => {
            state.status = 'failed'
        }
    }

})

export const { addToCart, removeFromCart } = productsSlice.actions;

export default productsSlice.reducer;