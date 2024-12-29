import axiosClient from './axios-client';

export const CategoryApi = {
  getCategory: () => {
    const url = '/category-product';
    return axiosClient.get(url);
  },
  addCategory: (data: any) => {
    const url = '/category-product';
    return axiosClient.post(url, data);
  },
  updateCategory: (data: any) => {
    const url = `/category-product/${data.id}`;
    return axiosClient.put(url, data);
  },
  deleteCategory: (id: string) => {
    const url = `/category-product/${id}`;
    return axiosClient.delete(url);
  },
};
