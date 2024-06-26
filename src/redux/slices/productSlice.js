import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    return data ? data.products : [];
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    productData: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    addNewProduct: (state, action) => {
      state.productData = [action.payload, ...state.productData];
    },
    handleDeleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addNewProduct, handleDeleteProduct } = productSlice.actions;

export default productSlice;
