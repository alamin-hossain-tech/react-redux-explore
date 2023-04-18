import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProducts, postProduct } from './productsAPI'

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  postSuccess: false,
  error: ''
}

export const getProducts = createAsyncThunk('products/getProduct', async () => {
  const products = fetchProducts()
  return products
})

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (data) => {
    const products = postProduct(data)
    return products
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = []
        state.isLoading = false
        state.isError = true
        state.error = action.error.message
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.postSuccess = false
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isLoading = false
        state.postSuccess = true
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.postSuccess = false
        state.isLoading = false
        state.isError = true
        state.error = action.error.message
      })
  }
})
export const { togglePostSuccess } = productsSlice.actions
export default productsSlice.reducer
