import axiosClient from './axios-client';

export const UserApi = {
  getUsers: () => {
    const url = '/user';
    return axiosClient.get(url);
  },
  addUser: (data: any) => {
    const url = '/user';
    return axiosClient.post(url, data);
  },
  updateUser: (data: any) => {
    const url = `/user/${data.id}`;
    return axiosClient.put(url, data);
  },
  deleteUser: (id: string) => {
    const url = `/user/${id}`;
    return axiosClient.delete(url);
  },
};
