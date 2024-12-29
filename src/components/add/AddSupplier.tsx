import React, { useState } from 'react';
import './add.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SupplierApi } from '../../apis/supplier.api';
import { GridColDef } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

type Props = {
  slug?: string;
  columns?: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddSupplier = (props: Props) => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const mutationAddSupplier = useMutation({
    mutationFn: (data: { name: string }) => SupplierApi.addSupplider(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['suppliers']);
      toast.success('Nhà cung cấp đã được thêm thành công!');
      props.setOpen(false);
    },
    onError: () => {
      toast.error('Không thể thêm nhà cung cấp. Vui lòng thử lại.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === '') {
      toast('Tên nhà cung cấp không được để trống.');
      return;
    }
    mutationAddSupplier.mutate({ name });
  };

  return (
    <div className='add'>
      <div className='modal'>
        <span className='close' onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Thêm Nhà Cung Cấp</h1>
        <form onSubmit={handleSubmit}>
          <div className='item'>
            <label htmlFor='name'>Tên nhà cung cấp</label>
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

export default AddSupplier;
