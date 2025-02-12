import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../configs/axios';
import { Product } from '../types';

export const fetchAllProducts = createAsyncThunk<Product[], void>(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/products');
      return response.data.data;
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        alert("You're making too many requests. Please slow down.");
      }
      return rejectWithValue(error.response?.data?.message || 'Error fetching products');
    }
  }
);

export const fetchProduct = createAsyncThunk<Product, number>('products/fetchOne', async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data.data;
});

export const addProduct = createAsyncThunk<Product, Partial<Product>>('products/add', async (product) => {
  const response = await axiosInstance.post('/products', product);
  return response.data.data;
});

export const updateProduct = createAsyncThunk<Product, { id: number, product: Partial<Product> }>('products/update', async ({ id, product }) => {
  const response = await axiosInstance.put(`/products/${id}`, product);
  return response.data.data;
});

export const removeProduct = createAsyncThunk<number, number>('products/remove', async (id) => {
  await axiosInstance.delete(`/products/${id}`);
  return id;
});