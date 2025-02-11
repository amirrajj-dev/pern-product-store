import { createReducer } from '@reduxjs/toolkit';
import { Product } from '../types';
import { getAllProducts, createProduct, getOneProduct, updateProduct, deleteProduct } from '../actions/product.action';

type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
};

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllProducts, (state, action) => {
      state.products = action.payload;
    })
    .addCase(createProduct, (state, action) => {
      state.products.push(action.payload);
    })
    .addCase(getOneProduct, (state, action) => {
      state.selectedProduct = action.payload;
    })
    .addCase(updateProduct, (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index >= 0) {
        state.products[index] = action.payload;
      }
    })
    .addCase(deleteProduct, (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    });
});