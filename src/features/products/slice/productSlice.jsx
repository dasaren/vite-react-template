import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import myUserSlice from 'features/redux-users/myUserSlice'
import { useSelector } from 'react-redux'
import axiosDannyInstance from 'utils/dannysaxios'

const baseURL = 'http://localhost:8000/api/base/'
const me = myUserSlice

const cartItemFromStorage = JSON.parse(localStorage.getItem('cartItem'))
  ? JSON.parse(localStorage.getItem('cartItem'))
  : []

const shippingAddressFromStorage = JSON.parse(
  localStorage.getItem('shippingAddress'),
)
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromStorage = JSON.parse(
  localStorage.getItem('paymentMethod'),
)
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : ''

const initialState = {
  loading: '',
  products: [],
  product: {},
  errors: {},
  error: '',
  review: [],
  shippingAddress: shippingAddressFromStorage,
  cartItem: cartItemFromStorage,
  cartItems: [],
  paymentMethod: paymentMethodFromStorage,
  orders: [],
}

// const anotherSlice = rootReducer.getState(myUserReducer)

export const getProducts = createAsyncThunk(
  'products/getProducts',

  async (id = null, { rejectWithValue }) => {
    try {
      let results = await axiosDannyInstance.get('base/product/')

      if (results.status === 200) {
        return results.data.results
      }
    } catch (err) {
      console.log('products error: ', err)
      return rejectWithValue(err.response?.data)
    }
  },
)
export const getProduct = createAsyncThunk(
  'products/getProduct',

  async (args, { rejectWithValue }) => {
    try {
      let results = await axiosDannyInstance.get(`base/product/${args}/`)

      if (results.status === 200) {
        return results.data
      }
    } catch (err) {
      console.log('products error: ' + err.status)
      return rejectWithValue(err.response?.data)
    }
  },
)

export const addToCartAxios = createAsyncThunk(
  'product/addToCartAxios',
  async (args, { rejectWithValue }) => {
    try {
      let results = await axiosDannyInstance.get(`base/product/${args.id}/`)
      if (results.status === 200) {
        return results.data
      }
    } catch (err) {
      console.log('products error: ' + err.data)
      return rejectWithValue(err.response?.data)
    }
  },
)

export const createOrder = createAsyncThunk(
  'products/createOrder',
  async (args, { rejectWithValue }) => {
    try {
      console.log('args', args)
      let results = await axiosDannyInstance.post('order/view', args)
      if (results.status === 201) {
        return results.data
      }
    } catch (err) {
      console.log('products error: ' + err.response.data)
      return rejectWithValue(err.response?.data)
    }
  },
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productListSuccess: (state, action) => {
      ;(state.loading = false), (state.products = action.payload)
    },

    addToCarts: (state, action) => {
      console.log('free', action)
      const item = action.payload
      const seem = JSON.stringify(state.cartItems)
      const seems = JSON.parse(seem)
      console.log('parsed', state.cartItems)
      // const existItem = state.cartItems.filter(
      //   (prd) => prd.id === item.product.id,
      // )

      const getProduct = state.products.find((prd) => prd.id === item.id)
      console.log('free again see:', state.cartItems)
    },
    add_to_cart: (state, action) => {
      console.log('pyload:', action.payload)
      const prd = action.payload
      const item = {
        id: prd.product.id,
        name: prd.product.name,
        image: prd.product.image,
        price: Number(prd.product.price),
        countInStock: prd.product.countInStock,
        qty: Number(prd.qty),
      }

      const existItem = state.cartItem.find((x) => x.id === item.id)

      // localStorage.setItem('cartItem', JSON.stringify(state.cartItem))

      // if (existItem) {
      //   return {
      //     ...state,
      //     cartItem: state.cartItem.map((x) =>
      //       x.id === existItem.id ? item : x,
      //     ),
      //     cartItem: localStorage.setItem(
      //       'cartItem',
      //       JSON.stringify(
      //         state.cartItem.map((x) => (x.id === existItem.id ? item : x)),
      //       ),
      //     ),
      //   }
      // }
      // // localStorage.setItem('cartItem', JSON.stringify(state.cartItem))
      // if (!existItem) {
      //   return {
      //     ...state,
      //     cartItem: [...state.cartItem, item],
      //     cartItem: localStorage.setItem(
      //       'cartItem',
      //       JSON.stringify([...state.cartItem, item]),
      //     ),
      //   }
      // }

      if (existItem) {
        state,
          (state.cartItem = state.cartItem.map((x) =>
            x.id === existItem.id ? item : x,
          )),
          localStorage.setItem('cartItem', JSON.stringify([...state.cartItem]))
        // localStorage.setItem(
        //   'cartItem',
        //   JSON.stringify(
        //     state.cartItem.map((x) => (x.id === existItem.id ? item : x)),
        //   ),
        // )
      }
      // localStorage.setItem('cartItem', JSON.stringify(state.cartItem))
      if (!existItem) {
        state,
          (state.cartItem = [...state.cartItem, item]),
          localStorage.setItem('cartItem', JSON.stringify([...state.cartItem]))
      }
    },

    removeFromCart: (state, action) => {
      state
      const findItem = state.cartItem.filter(
        (prd) => prd.id != action.payload.id,
      )

      state.cartItem = findItem
      localStorage.setItem('cartItem', JSON.stringify([...state.cartItem]))
    },
    saveShippingAddress: (state, action) => {
      state, (state.shippingAddress = action.payload)
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress),
      )
    },
    savePaymentMethod: (state, action) => {
      state, (state.paymentMethod = action.payload)
      localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.log('action', action.payload)
        state.loading = false
        state.error = action.payload
        state.errors = 'something went wrong'
      })
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        console.log('action', action.payload)
        state.loading = true
        state.errors = 'something went wrong'
      })
      .addCase(getProduct.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload
      })
      .addCase(getProduct.rejected, (state, action) => {
        console.log('action', action.error.message)
        state.loading = true
        state.errors = action.payload.error
        state.error = action.payload
      })
      .addCase(addToCartAxios.pending, (state, action) => {
        state.loading = true
      })
      .addCase(addToCartAxios.fulfilled, (state, action) => {
        console.log('add to cart action.pyload', action.payload)

        // payload: {
        //   product= data.id,
        //     name= data.name,
        //     image= data.image
        //   image= data.image,
        //     price = data.price,
        //     countInStock = data.countInStock
        //   qty = data.qty
        // }

        state.loading = false
        // const item = action.payload
        const item = action.payload
        const existItem = state.cartItem.find((x) => x.product === item.product)

        if (existItem) {
          return {
            ...state,
            cartItem: state.cartItem.map((x) =>
              x.product === existItem.product ? item : x,
            ),
          }
        }
        if (!existItem) {
          return {
            ...state,

            cartItem: [...state.cartItem, item],
          }
        }
        localStorageStorage.setItem('cartItem', JSON.stringify(state.cartItem))
      })
      .addCase(addToCartAxios.rejected, (state, action) => {
        console.log('action', action.error.message)
        state.loading = true
        state.errors = action.payload.error
        state.error = action.payload
      })
  },
})

export const {
  addToCarts,
  add_to_cart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = productSlice.actions
export default productSlice.reducer
