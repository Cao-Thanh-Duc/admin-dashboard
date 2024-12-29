import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ProductApi } from '../../apis/product.api';
import AddProduct from '../../components/addProduct/AddProduct';
import DataTable from '../../components/dataTable/DataTable';
import './Products.scss';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'image',
    headerName: 'Ảnh ',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.image || '/noavatar.png'} alt='' />;
    },
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'Tên sản phẩm',
    width: 200,
  },
  {
    field: 'description',
    type: 'string',
    headerName: 'Mô tả  ',
    width: 300,
  },
  {
    field: 'unit',
    type: 'string',
    headerName: 'Đơn vị',
    width: 100,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Giá ',
    width: 100,
  },
  {
    field: 'sale_price',
    type: 'string',
    headerName: 'Giá sale',
    width: 100,
  },
  {
    field: 'quantity',
    headerName: 'Tồn kho',
    width: 100,
    type: 'boolean',
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const { data: getProduct } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductApi.getProducts(),
  });

  return (
    <div className='products'>
      <div className='info'>
        <h1>Sản phẩm </h1>
        <button onClick={() => setOpen(true)}>+ Thêm sản phẩm mới </button>
      </div>
      <DataTable slug='products' columns={columns} rows={getProduct?.data || []} />

      {open && <AddProduct slug='product' columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
