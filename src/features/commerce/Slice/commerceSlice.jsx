import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosDannyInstance from "app/utils/dannysaxios";
import axios from "axios";

const baseURL = "https://django-server-production-dac4.up.railway.app/";
// const baseURL = "http://127.0.0.1:8000/";

const cartItemFromStorage = JSON.parse(localStorage.getItem("cartItem"))
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [];

const initialState = {
  loading: "",
  error: "",
  errors: {},
  products: {},
  previousPage: "",
  nextPage: "",
  currentPage: Number(""),
  pageCount: Number(""),
  totalPages: Number(""),
  product: {},
  singleProduct: {},
  cartItem: cartItemFromStorage,
};

export const getProducts = createAsyncThunk(
  "commerce/getProducts",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(
        
          `prd/myp/?page=${args.page}&q=${args.query ? args.query : ""}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log("products error: " + err.status);
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getProduct = createAsyncThunk(
  "commerce/getProduct",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get(
        "prd/myp/" + `${args}`
      );
      console.log("response", response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log("products error: " + err.status);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const commerceSlice = createSlice({
  name: "commerce",
  initialState,
  reducers: (state, action) => {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log("action client: " + JSON.stringify(action.payload));
        state.products = action.payload.results;
        state.loading = false;
        state.pageCount = action.payload.count;
        state.previousPage = action.payload.previous;
        state.nextPage = action.payload.next;
        state.totalPages = action.payload.results.length;
        console.log("previous page:", state.previousPage);
        console.log("next page:", state.nextPage);
        // console.log(location.search)
        console.log("currentPage", state.pageCount);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        // console.log("action client: " + JSON.stringify(action.payload));
        console.log("action client: " + action.payload);
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      });
  },
});

export const {} = commerceSlice.actions;
export default commerceSlice.reducer;
