import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ProductApi } from '../../apis/product.api';
import { GridColDef } from '@mui/x-data-grid';
import { SupplierApi } from '../../apis/supplier.api';
import { CategoryApi } from '../../apis/category.api';
import { Select } from 'antd';

type Props = {
  slug?: string;
  columns?: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddProduct = (props: Props) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    sale_price: 0,
    unit: '',
    quantity: 0,
    CateID: '',
    SuppID: '',
    image: '',
  });
  const queryClient = useQueryClient();

  const { data: getSupplier } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => SupplierApi.getSuppliers(),
  });

  const { data: getCategory } = useQuery({
    queryKey: ['categorys'],
    queryFn: () => CategoryApi.getCategory(),
  });

  const mutationAddProduct = useMutation({
    mutationFn: (data: typeof productData) => ProductApi.addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Sản phẩm đã được thêm thành công!');
      props.setOpen(false);
    },
    onError: () => {
      toast.error('Không thể thêm sản phẩm. Vui lòng thử lại.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'sale_price' || name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSelectChange = (value: string, field: 'CateID' | 'SuppID') => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !productData.name.trim() ||
      !productData.description.trim() ||
      !productData.CateID.trim() ||
      !productData.SuppID.trim() ||
      !productData.image.trim()
    ) {
      toast.error('Vui lòng điền đầy đủ thông tin sản phẩm.');
      return;
    }
    mutationAddProduct.mutate(productData);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-[36rem]'>
        <button
          aria-label='Close modal'
          className='absolute top-[8.5rem] right-[37rem]  hover:text-black text-black'
          onClick={() => props.setOpen(false)}
        >
          X
        </button>
        <h1 className='text-xl font-bold mb-4 text-black'>Thêm Sản Phẩm</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
              Tên sản phẩm
            </label>
            <input
              id='name'
              name='name'
              type='text'
              value={productData.name}
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
              Mô tả
            </label>
            <textarea
              id='description'
              name='description'
              value={productData.description}
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black'
            ></textarea>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
                Giá
              </label>
              <input
                id='price'
                name='price'
                type='number'
                value={productData.price}
                onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black'
              />
            </div>
            <div>
              <label htmlFor='sale_price' className='block text-sm font-medium text-gray-700'>
                Giá khuyến mãi
              </label>
              <input
                id='sale_price'
                name='sale_price'
                type='number'
                value={productData.sale_price}
                onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div>
              <label htmlFor='unit' className='block text-sm font-medium text-gray-700'>
                Đơn vị
              </label>
              <input
                id='unit'
                name='unit'
                type='text'
                value={productData.unit}
                onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black'
              />
            </div>
            <div>
              <label htmlFor='quantity' className='block text-sm font-medium text-gray-700'>
                Số lượng
              </label>
              <input
                id='quantity'
                name='quantity'
                type='number'
                value={productData.quantity}
                onChange={handleChange}
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black'
              />
            </div>
          </div>
          <div className='mb-4 mt-4'>
            <label htmlFor='CateID' className='block text-sm font-medium text-gray-700'>
              Danh mục
            </label>
            <Select
              id='CateID'
              placeholder='Chọn danh mục'
              value={productData.CateID}
              onChange={(value) => handleSelectChange(value, 'CateID')}
              className='w-full'
              options={getCategory?.data.map((category: { id: string; name: string }) => ({
                value: category.id,
                label: category.name,
              }))}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='SuppID' className='block text-sm font-medium text-gray-700'>
              Nhà cung cấp
            </label>
            <Select
              id='SuppID'
              placeholder='Chọn nhà cung cấp'
              value={productData.SuppID}
              onChange={(value) => handleSelectChange(value, 'SuppID')}
              className='w-full'
              options={getSupplier?.data.map((supplier: { id: string; name: string }) => ({
                value: supplier.id,
                label: supplier.name,
              }))}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
              Hình ảnh
            </label>
            <input
              id='image'
              name='image'
              type='text'
              value={productData.image}
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm text-black'
              placeholder='URL hình ảnh'
            />
          </div>
          <button
            type='submit'
            className={`w-full py-2 px-4 rounded-md text-white ${
              mutationAddProduct.isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={mutationAddProduct.isLoading}
          >
            {mutationAddProduct.isLoading ? 'Đang xử lý...' : 'Thêm sản phẩm'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
