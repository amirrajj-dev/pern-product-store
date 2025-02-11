import { createAction } from '@reduxjs/toolkit';
import { Product } from '../types';

export const getAllProducts = createAction<Product[]>('GET_ALL_PRODUCTS');
export const createProduct = createAction<Product>('CREATE_PRODUCT');
export const getOneProduct = createAction<Product>('GET_ONE_PRODUCT');
export const updateProduct = createAction<Product>('UPDATE_PRODUCT');
export const deleteProduct = createAction<number>('DELETE_PRODUCT');