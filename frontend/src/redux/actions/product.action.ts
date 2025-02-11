import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../configs/axios';
import { Product } from '../types';

export const fetchAllProducts = createAsyncThunk<Product[]>('products/fetchAll', async () => {
  const response = await axiosInstance.get('/products');
  return response.data.data;
});

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