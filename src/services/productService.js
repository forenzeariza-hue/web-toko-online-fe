import axiosClient from '../api/axiosClient.js';

export async function getProducts() {
  const response = await axiosClient.get('/products');
  return response.data.data;
}

export async function getProductById(id) {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data.data;
}
