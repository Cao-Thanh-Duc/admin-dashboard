import { GridColDef } from '@mui/x-data-grid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { CategoryApi } from '../../apis/category.api';
import './add.scss';

type Props = {
  slug?: string;
  columns?: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCategory = (props: Props) => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const mutationAddCategory = useMutation({
    mutationFn: (data: { name: string }) => CategoryApi.addCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['categorys']);
      toast.success('Danh mục sản phẩm đã được thêm thành công!');
      props.setOpen(false);
    },
    onError: () => {
      toast.error('Không thể thêm danh mục sản phẩm. Vui lòng thử lại.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === '') {
      toast('Tên danh mục sản phẩm không được để trống.');
      return;
    }
    mutationAddCategory.mutate({ name });
  };

  return (
    <div className='add'>
      <div className='modal'>
        <span className='close' onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Thêm Danh Mục Sản Phẩm</h1>
        <form onSubmit={handleSubmit}>
          <div className='item'>
            <label htmlFor='name'>Tên danh mục sản phẩm</label>
            <input
              id='name'
              type='text'
              className='w-[32rem]'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Nhập tên nhà cung cấp'
            />
          </div>
          <button type='submit' className='bg-white rounded-md shadow-md text-black'>
            Xong
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
