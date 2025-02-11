// src/redux/reducers/productReducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { Product } from '../types';
import { fetchAllProducts, fetchProduct, addProduct, updateProduct, removeProduct } from '../actions/product.action';

type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch products';
    })
    .addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    })
    .addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch product';
    })
    .addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    })
    .addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to add product';
    })
    .addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index >= 0) {
        state.products[index] = action.payload;
      }
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update product';
    })
    .addCase(removeProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(removeProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(p => p.id !== action.payload);
    })
    .addCase(removeProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to remove product';
    });
});