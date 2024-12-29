import axiosClient from './axios-client';

export const ProductApi = {
  getProducts: () => {
    const url = '/product';
    return axiosClient.get(url);
  },
  addProduct: (data: any) => {
    const url = '/product';
    return axiosClient.post(url, data);
  },
  updateProduct: (data: any) => {
    const url = `/product/${data.id}`;
    return axiosClient.put(url, data);
  },
  deleteProduct: (id: string) => {
    const url = `/product/${id}`;
    return axiosClient.delete(url);
  },
};
