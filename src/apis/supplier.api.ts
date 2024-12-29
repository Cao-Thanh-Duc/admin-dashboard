import axiosClient from './axios-client';

export const SupplierApi = {
  getSuppliers: () => {
    const url = '/supplier';
    return axiosClient.get(url);
  },
  addSupplider: (data: any) => {
    const url = '/supplier';
    return axiosClient.post(url, data);
  },
  updateSupplier: (data: any) => {
    const url = `/supplier/${data.id}`;
    return axiosClient.put(url, data);
  },
  deleteSupplier: (id: string) => {
    const url = `/supplier/${id}`;
    return axiosClient.delete(url);
  },
};
