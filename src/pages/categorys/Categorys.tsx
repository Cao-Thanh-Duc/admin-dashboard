import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { CategoryApi } from '../../apis/category.api';
import AddCategory from '../../components/addCategory/AddCategory';
import DataTableCategory from '../../components/dataTableCategory/DataTableCategory';
import './categorys.scss';
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 300 },

  {
    field: 'name',
    type: 'string',
    headerName: 'Tên danh mục ',
    width: 750,
  },
];

const Categorys = () => {
  const {
    data: getCategory,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categorys'],
    queryFn: () => CategoryApi.getCategory(),
  });

  const [open, setOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading categorys</div>;
  return (
    <div className='categorys'>
      <div className='info'>
        <h1>Danh mục </h1>
        <button onClick={() => setOpen(true)}> + Thêm danh mục mới </button>
      </div>
      <DataTableCategory slug='categorys' columns={columns} rows={getCategory?.data || []} />

      {open && <AddCategory slug='danh mục' columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Categorys;
