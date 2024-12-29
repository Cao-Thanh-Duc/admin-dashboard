import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SupplierApi } from '../../apis/supplier.api';
import DataTable from '../../components/dataTable/DataTable';
import './suppliers.scss';
import AddSupplier from '../../components/add/AddSupplier';
import DataTableSupplier from '../../components/dataTableSupplier/DataTableSupplier';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 400 },

  {
    field: 'name',
    type: 'string',
    headerName: 'Tên nhà cung cấp  ',
    width: 800,
  },
];

const Suppliers = () => {
  const [open, setOpen] = useState(false);

  const {
    data: getSupplier,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => SupplierApi.getSuppliers(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading suppliers</div>;

  return (
    <div className='suppliers'>
      <div className='info'>
        <h1>Nhà cung cấp </h1>
        <button onClick={() => setOpen(true)}> + Thêm nhà cung cấp mới </button>
      </div>
      <DataTableSupplier slug='suppliers' columns={columns} rows={getSupplier?.data || []} />

      {open && <AddSupplier slug='nhà cung cấp' columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Suppliers;
