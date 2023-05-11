import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosDannyInstance from "app/utils/dannysaxios";
import { toast } from "react-toastify";

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
  cartItem: [],
  shippingAddress: [],
  myAddress: [],
  orderedProducts: {},
  orderLists: [],
};
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (args, { rejectWithValue }) => {
    // console.log("cart args", args);
    try {
      let response = await axiosDannyInstance.put("prd/try/", args);
      // console.log("cart response:  ", response);
      if (response.status === 200) {
        toast("item added to cart", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
        return response.data;
      }
    } catch (err) {
      console.log("error: ", err.response.data);
      return rejectWithValue(err.response?.data);
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (args, { rejectWithValue }) => {
    // console.log("remove from cart args", args);
    try {
      let response = await axiosDannyInstance.delete(`prd/mycartitem/${args}/`);
      console.log("cart response:  ", response);
      if (response.status === 200) {
        toast("item removed to cart", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
        return response.data;
      }
    } catch (err) {
      console.log("error: ", err.response.data);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (id = null, { rejectWithValue }) => {
    // console.log("cart args", args);console.lo
    console.log("u trieeed");
    try {
      let response = await axiosDannyInstance("prd/try/");
      // console.log("cart response:  ", response);
      if (response.status === 200) {
        // toast("item added to cart", {
        //   position: toast.POSITION.BOTTOM_LEFT,
        //   className: "toast-message",
        // });
        return response.data;
      }
    } catch (err) {
      console.log("error: ", err.response.data);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getProductss = createAsyncThunk(
  "commerce/getProductss",
  async (id = null, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.get("prd/myp/");
      // let response = await axiosDannyInstance(baseURL + "api/prd/myp/");
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log("products error: " + err.status);
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getShippingAddress = createAsyncThunk(
  "commerce/getShippingAddress",
  async (id = null, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance("ord/my-shipping/");
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log("products error: " + err.status);
      return rejectWithValue(err.response?.data);
    }
  }
);
export const saveShippingAddress = createAsyncThunk(
  "commerce/saveShippingAddress",
  async (args, { rejectWithValue }) => {
    try {
      let response = await axiosDannyInstance.post("ord/my-shipping/", args);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log("products error: " + err.status);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const orderProducts = createAsyncThunk(
  "cart/orderProducts",
  async (args, { rejectWithValue }) => {
    // console.log("cart args", args);
    try {
      let response = await axiosDannyInstance.put("ord/order-create/", args);
      // console.log("cart response:  ", response);
      if (response.status === 200) {
        toast("Items Ordered Successfully", {
          position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-message",
        });
        return response.data;
      }
    } catch (err) {
      console.log("error: ", err.response.data);
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getOrderProducts = createAsyncThunk(
  "cart/getOrderProducts",
  async (id = null, { rejectWithValue }) => {
    // console.log("cart args", args);
    try {
      let response = await axiosDannyInstance("ord/order-create/");
      // console.log("cart response:  ", response);
      if (response.status === 200) {
        // toast("Items Ordered Successfully", {
        //   position: toast.POSITION.BOTTOM_LEFT,
        //   className: "toast-message",
        // });
        return response.data;
      }
    } catch (err) {
      console.log("error: ", err.response.data);
      return rejectWithValue(err.response?.data);
    }
  }
);

const commerceCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: (state, action) => {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log("cart client: " + JSON.stringify(action.payload));
        state.cartItem = action.payload;
        state.loading = false;
        // state.pageCount = action.payload.count;
        // state.previousPage = action.payload.previous;
        // state.nextPage = action.payload.next;
        // state.totalPages = action.payload.results.length;
        // console.log("previous page:", state.previousPage);
        // console.log("next page:", state.nextPage);
        // // console.log(location.search)
        // console.log("currentPage", state.pageCount);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getCartItems.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItem = action.payload;
        state.loading = false;
        // state.pageCount = action.payload.count;
        // state.previousPage = action.payload.previous;
        // state.nextPage = action.payload.next;
        // state.totalPages = action.payload.results.length;
        // console.log("previous page:", state.previousPage);
        // console.log("next page:", state.nextPage);
        // // console.log(location.search)
        // console.log("currentPage", state.pageCount);
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        console.log("deleted payload", action.data, "state", state);
        // state.cartItem =
        // state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getShippingAddress.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getShippingAddress.fulfilled, (state, action) => {
        state.myAddress = action.payload.results;
        state.loading = false;
        state.pageCount = action.payload.count;
        state.previousPage = action.payload.previous;
        state.nextPage = action.payload.next;
        state.totalPages = action.payload.results.length;
        // console.log("previous page:", state.previousPage);
        // console.log("next page:", state.nextPage);
        // // console.log(location.search)
        // console.log("currentPage", state.pageCount);
      })
      .addCase(getShippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(saveShippingAddress.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(saveShippingAddress.fulfilled, (state, action) => {
        state.shippingAddress = action.payload;
        state.loading = false;
        // state.pageCount = action.payload.count;
        // state.previousPage = action.payload.previous;
        // state.nextPage = action.payload.next;
        // state.totalPages = action.payload.results.length;
        // console.log("previous page:", state.previousPage);
        // console.log("next page:", state.nextPage);
        // // console.log(location.search)
        // console.log("currentPage", state.pageCount);
      })
      .addCase(saveShippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(orderProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(orderProducts.fulfilled, (state, action) => {
        console.log("cart client: " + JSON.stringify(action.payload));
        state.orderedProducts = action.payload;
        state.loading = false;
        // state.pageCount = action.payload.count;
        // state.previousPage = action.payload.previous;
        // state.nextPage = action.payload.next;
        // state.totalPages = action.payload.results.length;
        // console.log("previous page:", state.previousPage);
        // console.log("next page:", state.nextPage);
        // // console.log(location.search)
        // console.log("currentPage", state.pageCount);
      })
      .addCase(orderProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      })
      .addCase(getOrderProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrderProducts.fulfilled, (state, action) => {
        // console.log("cart client: " + JSON.stringify(action.payload));
        state.orderLists = action.payload;
        state.loading = false;
        // state.pageCount = action.payload.count;
        // state.previousPage = action.payload.previous;
        // state.nextPage = action.payload.next;
        // state.totalPages = action.payload.results.length;
        // console.log("previous page:", state.previousPage);
        // console.log("next page:", state.nextPage);
        // // console.log(location.search)
        // console.log("currentPage", state.pageCount);
      })
      .addCase(getOrderProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.errors = action.error.message;
      });
  },
});

export const {} = commerceCartSlice.actions;
export default commerceCartSlice.reducer;
